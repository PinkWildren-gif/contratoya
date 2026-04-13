import jsPDF from 'jspdf'
import { MARGIN, COLORS, PAGE_WIDTH, addClause, addFooter, formatDate, formatCurrency } from './helpers'

export function generateNdaPdf(data: Record<string, unknown>): jsPDF {
  const doc = new jsPDF()
  const isMutual = data.nda_type === 'mutual'

  let y = MARGIN

  // Title
  doc.setFontSize(18)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text('ACUERDO DE CONFIDENCIALIDAD', MARGIN, y + 5)
  y += 8
  doc.setFontSize(11)
  doc.setTextColor(...COLORS.gray)
  doc.setFont('helvetica', 'normal')
  doc.text(isMutual ? '(NDA Mutuo / Bilateral)' : '(NDA Unilateral)', MARGIN, y + 3)
  y += 6
  doc.setDrawColor(...COLORS.green)
  doc.setLineWidth(1)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 12

  // Preamble
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'normal')

  const preamble = `En ${data.jurisdiction_city || '[ciudad]'}, a ${formatDate(String(data.effective_date || ''))}.

REUNIDOS

De una parte, ${data.disclosing_party_name || '[parte reveladora]'}, con NIF/CIF ${data.disclosing_party_nif || '[NIF]'}, y domicilio en ${data.disclosing_party_address || '[dirección]'} (en adelante, ${isMutual ? '"PARTE A"' : 'la "PARTE REVELADORA"'}).

De otra parte, ${data.receiving_party_name || '[parte receptora]'}, con NIF/CIF ${data.receiving_party_nif || '[NIF]'}, y domicilio en ${data.receiving_party_address || '[dirección]'} (en adelante, ${isMutual ? '"PARTE B"' : 'la "PARTE RECEPTORA"'}).

${isMutual ? 'Conjuntamente denominadas las "PARTES".' : ''}

Ambas partes, reconociéndose mutuamente capacidad legal suficiente, acuerdan suscribir el presente Acuerdo de Confidencialidad conforme a las siguientes:`

  const lines = doc.splitTextToSize(preamble, PAGE_WIDTH - MARGIN * 2)
  doc.text(lines, MARGIN, y)
  y += lines.length * 4.2 + 6

  doc.setFontSize(14)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text('CLÁUSULAS', MARGIN, y)
  y += 10

  // Clause 1: Purpose
  y = addClause(doc, y, 'PRIMERA', 'OBJETO Y FINALIDAD',
    `El presente acuerdo tiene por objeto establecer las condiciones bajo las cuales ${isMutual ? 'las PARTES intercambiarán' : 'la PARTE REVELADORA compartirá con la PARTE RECEPTORA'} información de carácter confidencial, con la siguiente finalidad:\n\n${data.purpose || '[Finalidad del acuerdo]'}`)

  // Clause 2: Definition
  y = addClause(doc, y, 'SEGUNDA', 'DEFINICIÓN DE INFORMACIÓN CONFIDENCIAL',
    `A los efectos del presente acuerdo, se considerará "Información Confidencial" toda aquella información, en cualquier formato o soporte (escrito, oral, electrónico, visual o de cualquier otra naturaleza), que ${isMutual ? 'cualquiera de las PARTES' : 'la PARTE REVELADORA'} comunique ${isMutual ? 'a la otra PARTE' : 'a la PARTE RECEPTORA'}, incluyendo pero no limitándose a:\n\n${data.confidential_info_description || 'Planes de negocio, datos de clientes, información financiera, código fuente, estrategias comerciales, secretos industriales y cualquier otra información que por su naturaleza deba ser tratada como confidencial.'}\n\nTambién se considerará Información Confidencial aquella que, aun no estando expresamente identificada como tal, por su naturaleza o por las circunstancias de su revelación deba ser razonablemente considerada como confidencial.`)

  // Clause 3: Obligations
  const partyRef = isMutual ? 'Cada una de las PARTES' : 'La PARTE RECEPTORA'
  y = addClause(doc, y, 'TERCERA', 'OBLIGACIONES DE CONFIDENCIALIDAD',
    `${partyRef} se compromete a:\n\na) Mantener la más estricta confidencialidad respecto de la Información Confidencial recibida.\nb) No divulgar, publicar, ceder ni de cualquier otra forma revelar la Información Confidencial a terceros sin el consentimiento previo y por escrito de ${isMutual ? 'la otra PARTE' : 'la PARTE REVELADORA'}.\nc) Utilizar la Información Confidencial exclusivamente para la finalidad descrita en la cláusula primera.\nd) Adoptar las medidas de seguridad necesarias para proteger la Información Confidencial con al menos el mismo grado de protección que aplica a su propia información confidencial.`)

  // Clause 4: Permitted disclosures
  const disclosureText: Record<string, string> = {
    employees: 'únicamente a aquellos empleados que necesiten conocerla para el cumplimiento de la finalidad del presente acuerdo, quienes deberán ser informados de su carácter confidencial y quedarán sujetos a obligaciones de confidencialidad equivalentes',
    employees_advisors: 'a sus empleados directamente involucrados y a sus asesores profesionales (abogados, contables, auditores), quienes deberán ser informados de su carácter confidencial y quedarán sujetos a obligaciones de confidencialidad equivalentes',
    none: 'a ninguna persona distinta del firmante del presente acuerdo. Cualquier divulgación, incluso a empleados propios, requerirá autorización previa por escrito',
  }
  y = addClause(doc, y, 'CUARTA', 'DIVULGACIONES PERMITIDAS',
    `La Información Confidencial podrá ser revelada ${disclosureText[String(data.permitted_disclosures)] || disclosureText.employees}.\n\nNo se considerará incumplimiento del presente acuerdo la revelación de Información Confidencial cuando sea requerida por ley, resolución judicial o administrativa, siempre que se notifique previamente ${isMutual ? 'a la otra PARTE' : 'a la PARTE REVELADORA'} y se limite la divulgación a lo estrictamente necesario.`)

  // Clause 5: Duration
  y = addClause(doc, y, 'QUINTA', 'DURACIÓN',
    `Las obligaciones de confidencialidad establecidas en el presente acuerdo tendrán una duración de ${data.duration_years || '2'} año(s) a partir de la fecha de firma del mismo, sin perjuicio de que dichas obligaciones se mantengan respecto de aquella Información Confidencial que constituya secreto empresarial conforme a la Ley 1/2019, de 20 de febrero.`)

  // Clause 6: Return/Destroy
  const returnText: Record<string, string> = {
    return: 'devolver a la PARTE REVELADORA toda la Información Confidencial recibida, incluyendo cualquier copia o reproducción de la misma',
    destroy: 'destruir toda la Información Confidencial recibida, incluyendo cualquier copia o reproducción de la misma, y certificar por escrito dicha destrucción',
    both: 'devolver o destruir (según indique la PARTE REVELADORA) toda la Información Confidencial recibida, incluyendo cualquier copia o reproducción de la misma',
  }
  y = addClause(doc, y, 'SEXTA', 'DEVOLUCIÓN O DESTRUCCIÓN',
    `A la finalización del presente acuerdo, o en cualquier momento a solicitud de ${isMutual ? 'la otra PARTE' : 'la PARTE REVELADORA'}, ${isMutual ? 'cada PARTE deberá' : 'la PARTE RECEPTORA deberá'} ${returnText[String(data.return_or_destroy)] || returnText.both}.`)

  // Clause 7: Penalty (optional)
  if (data.include_penalty && data.penalty_amount) {
    y = addClause(doc, y, 'SÉPTIMA', 'PENALIZACIÓN',
      `El incumplimiento de las obligaciones de confidencialidad establecidas en el presente acuerdo dará lugar a una penalización de ${formatCurrency(Number(data.penalty_amount))}, sin perjuicio de la indemnización por los daños y perjuicios adicionales que pudieran acreditarse.`)
  }

  // Final clause: Jurisdiction
  const jurisdictionNum = data.include_penalty ? 'OCTAVA' : 'SÉPTIMA'
  y = addClause(doc, y, jurisdictionNum, 'LEGISLACIÓN APLICABLE Y JURISDICCIÓN',
    `El presente acuerdo se regirá e interpretará conforme a la legislación española. Para la resolución de cualquier controversia derivada del presente acuerdo, las partes se someten a los Juzgados y Tribunales de ${data.jurisdiction_city || '[ciudad]'}, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.`)

  // Signatures
  if (y > 240) {
    doc.addPage()
    y = MARGIN
  }
  y += 10
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'normal')
  doc.text('Y en prueba de conformidad, las partes firman el presente acuerdo por duplicado.', MARGIN, y, { maxWidth: PAGE_WIDTH - MARGIN * 2 })
  y += 16

  doc.setFont('helvetica', 'bold')
  doc.text(isMutual ? 'PARTE A' : 'PARTE REVELADORA', MARGIN, y)
  doc.text(isMutual ? 'PARTE B' : 'PARTE RECEPTORA', PAGE_WIDTH / 2 + 10, y)
  y += 20

  doc.setFont('helvetica', 'normal')
  doc.setDrawColor(...COLORS.lightGray)
  doc.line(MARGIN, y, MARGIN + 60, y)
  doc.line(PAGE_WIDTH / 2 + 10, y, PAGE_WIDTH / 2 + 70, y)
  y += 5
  doc.setFontSize(8)
  doc.text(String(data.disclosing_party_name || ''), MARGIN, y)
  doc.text(String(data.receiving_party_name || ''), PAGE_WIDTH / 2 + 10, y)

  addFooter(doc)
  return doc
}
