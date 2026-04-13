import jsPDF from 'jspdf'
import { MARGIN, COLORS, PAGE_WIDTH, addClause, addFooter, formatCurrency, formatDate } from './helpers'

export function generateContractPdf(data: Record<string, unknown>): jsPDF {
  const doc = new jsPDF()

  let y = MARGIN

  // Title
  doc.setFontSize(18)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text('CONTRATO DE PRESTACIÓN DE SERVICIOS', MARGIN, y + 5)
  y += 10
  doc.setDrawColor(...COLORS.green)
  doc.setLineWidth(1)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 12

  // Preamble
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'normal')

  const preamble = `En ${data.jurisdiction_city || '[ciudad]'}, a ${formatDate(String(data.start_date || ''))}.

REUNIDOS

De una parte, D./Dña. ${data.provider_name || '[nombre prestador]'}, mayor de edad, con NIF ${data.provider_nif || '[NIF]'}, y domicilio en ${data.provider_address || '[dirección]'} (en adelante, el "PRESTADOR").

De otra parte, ${data.client_name || '[nombre cliente]'}, con NIF/CIF ${data.client_nif || '[NIF/CIF]'}, y domicilio en ${data.client_address || '[dirección]'}${data.client_representative ? `, representada por D./Dña. ${data.client_representative}` : ''} (en adelante, el "CLIENTE").

Ambas partes se reconocen mutuamente la capacidad legal necesaria para el otorgamiento del presente contrato y, a tal efecto,

EXPONEN

Que el PRESTADOR es profesional autónomo dedicado a la prestación de servicios profesionales, y que el CLIENTE está interesado en contratar dichos servicios.

Que ambas partes acuerdan suscribir el presente contrato de prestación de servicios, que se regirá por las siguientes:`

  const lines = doc.splitTextToSize(preamble, PAGE_WIDTH - MARGIN * 2)
  doc.text(lines, MARGIN, y)
  y += lines.length * 4.2 + 6

  doc.setFontSize(14)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text('CLÁUSULAS', MARGIN, y)
  y += 10

  const ordinals = ['PRIMERA', 'SEGUNDA', 'TERCERA', 'CUARTA', 'QUINTA', 'SEXTA', 'SÉPTIMA', 'OCTAVA', 'NOVENA', 'DÉCIMA']
  let clauseIdx = 0

  // Clause: Object
  y = addClause(doc, y, ordinals[clauseIdx++], 'OBJETO DEL CONTRATO',
    `El PRESTADOR se compromete a realizar para el CLIENTE los siguientes servicios profesionales:\n\n${data.service_description || '[Descripción de servicios]'}${data.deliverables ? `\n\nEntregables acordados:\n${data.deliverables}` : ''}`)

  // Clause: Duration
  const endDateText = data.end_date ? formatDate(String(data.end_date)) : 'la finalización de los servicios contratados'
  y = addClause(doc, y, ordinals[clauseIdx++], 'DURACIÓN',
    `El presente contrato entrará en vigor en la fecha de su firma (${formatDate(String(data.start_date || ''))}) y se extenderá hasta ${endDateText}.${data.work_location === 'remote' ? ' Los servicios se prestarán de forma remota (teletrabajo).' : data.work_location === 'client' ? ' Los servicios se prestarán en las instalaciones del CLIENTE.' : ''}`)

  // Clause: Payment
  const paymentScheduleText: Record<string, string> = {
    single: 'El pago se realizará en un único abono una vez finalizados y entregados los servicios.',
    advance: 'El pago se realizará en dos plazos: el 50% como anticipo al inicio del proyecto, y el 50% restante a la entrega final.',
    monthly: 'El pago se realizará mediante cuotas mensuales iguales durante la duración del contrato.',
    milestones: 'El pago se realizará por hitos, conforme se vayan completando y entregando los entregables acordados.',
  }
  y = addClause(doc, y, ordinals[clauseIdx++], 'CONTRAPRESTACIÓN ECONÓMICA',
    `El CLIENTE abonará al PRESTADOR la cantidad total de ${data.total_price ? formatCurrency(Number(data.total_price)) : '[importe]'} (más IVA aplicable) por la totalidad de los servicios descritos.\n\n${paymentScheduleText[String(data.payment_schedule)] || ''}${data.payment_term_days ? `\n\nEl plazo de pago será de ${data.payment_term_days} días desde la emisión de la factura correspondiente.` : ''}`)

  // Clause: IP
  const ipText: Record<string, string> = {
    full_transfer: 'Una vez abonada la totalidad del precio, el PRESTADOR cederá al CLIENTE todos los derechos de propiedad intelectual e industrial sobre los trabajos realizados en el marco del presente contrato, incluyendo el derecho de reproducción, distribución, comunicación pública y transformación.',
    license: 'El PRESTADOR conservará la titularidad de los derechos de propiedad intelectual sobre los trabajos realizados, otorgando al CLIENTE una licencia de uso no exclusiva, intransferible e indefinida para el uso de los mismos conforme al propósito del presente contrato.',
    shared: 'Los derechos de propiedad intelectual sobre los trabajos realizados serán compartidos entre ambas partes. Cada parte podrá utilizar los resultados del trabajo para sus propios fines, sin necesidad de autorización previa de la otra parte.',
  }
  y = addClause(doc, y, ordinals[clauseIdx++], 'PROPIEDAD INTELECTUAL',
    ipText[String(data.ip_assignment)] || ipText.full_transfer)

  // Clause: Confidentiality (optional)
  if (data.include_confidentiality) {
    y = addClause(doc, y, ordinals[clauseIdx++], 'CONFIDENCIALIDAD',
      'Ambas partes se comprometen a mantener la más estricta confidencialidad respecto de toda la información a la que tengan acceso como consecuencia de la ejecución del presente contrato. Esta obligación se mantendrá vigente durante la duración del contrato y con posterioridad a su finalización, por un período de dos (2) años.')
  }

  // GDPR clause (optional)
  if (data.include_gdpr) {
    y = addClause(doc, y, ordinals[clauseIdx++], 'PROTECCIÓN DE DATOS',
      'En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPD-GDD), las partes se comprometen a tratar los datos personales a los que tengan acceso exclusivamente para la ejecución del presente contrato, aplicando las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo. A la finalización del contrato, los datos personales serán devueltos o destruidos, según lo acuerde la parte responsable del tratamiento.')
  }

  // Non-compete (optional)
  if (data.include_non_compete) {
    y = addClause(doc, y, ordinals[clauseIdx++], 'NO COMPETENCIA',
      `El PRESTADOR se compromete a no prestar servicios similares a competidores directos del CLIENTE durante un período de ${data.non_compete_months || '6'} meses tras la finalización del presente contrato.`)
  }

  // Termination
  y = addClause(doc, y, ordinals[clauseIdx++], 'RESOLUCIÓN DEL CONTRATO',
    'El presente contrato podrá resolverse por las siguientes causas:\n\na) Por mutuo acuerdo de las partes.\nb) Por incumplimiento de cualquiera de las obligaciones establecidas en el presente contrato.\nc) Por desistimiento unilateral de cualquiera de las partes, con un preaviso mínimo de quince (15) días.\n\nEn caso de resolución anticipada, el CLIENTE abonará al PRESTADOR la parte proporcional de los servicios efectivamente prestados hasta la fecha de resolución.')

  // Jurisdiction
  y = addClause(doc, y, ordinals[clauseIdx++], 'LEGISLACIÓN APLICABLE Y JURISDICCIÓN',
    `El presente contrato se regirá e interpretará conforme a la legislación española. Para la resolución de cualquier controversia derivada del presente contrato, las partes se someten a los Juzgados y Tribunales de ${data.jurisdiction_city || '[ciudad]'}, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.`)

  // Signatures
  if (y > 240) {
    doc.addPage()
    y = MARGIN
  }
  y += 10
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'normal')
  doc.text('Y en prueba de conformidad, las partes firman el presente contrato por duplicado en el lugar y fecha arriba indicados.', MARGIN, y, { maxWidth: PAGE_WIDTH - MARGIN * 2 })
  y += 16

  // Signature blocks
  doc.setFont('helvetica', 'bold')
  doc.text('EL PRESTADOR', MARGIN, y)
  doc.text('EL CLIENTE', PAGE_WIDTH / 2 + 10, y)
  y += 20

  doc.setFont('helvetica', 'normal')
  doc.setDrawColor(...COLORS.lightGray)
  doc.line(MARGIN, y, MARGIN + 60, y)
  doc.line(PAGE_WIDTH / 2 + 10, y, PAGE_WIDTH / 2 + 70, y)
  y += 5
  doc.setFontSize(8)
  doc.text(String(data.provider_name || ''), MARGIN, y)
  doc.text(String(data.client_name || ''), PAGE_WIDTH / 2 + 10, y)

  addFooter(doc)
  return doc
}
