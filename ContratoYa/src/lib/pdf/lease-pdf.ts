import jsPDF from 'jspdf'
import { MARGIN, COLORS, PAGE_WIDTH, addClause, addFooter, formatCurrency, formatDate } from './helpers'

export function generateLeasePdf(data: Record<string, unknown>): jsPDF {
  const doc = new jsPDF()
  let y = MARGIN

  // Title
  doc.setFontSize(16)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text('CONTRATO DE ARRENDAMIENTO', MARGIN, y + 5)
  doc.setFontSize(11)
  doc.text('DE LOCAL DE NEGOCIO', MARGIN, y + 12)
  y += 16
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

De una parte, como ARRENDADOR, D./Dña. ${data.landlord_name || '[nombre]'}, con NIF ${data.landlord_nif || '[NIF]'}, y domicilio en ${data.landlord_address || '[dirección]'}.

De otra parte, como ARRENDATARIO, ${data.tenant_name || '[nombre]'}, con NIF/CIF ${data.tenant_nif || '[NIF]'}, y domicilio en ${data.tenant_address || '[dirección]'}.

Ambas partes, en la representación que ostentan, se reconocen recíprocamente capacidad legal suficiente para la celebración del presente contrato de arrendamiento para uso distinto de vivienda, de conformidad con lo dispuesto en la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos (LAU), y en particular su Título III, y a tal efecto,`

  const lines = doc.splitTextToSize(preamble, PAGE_WIDTH - MARGIN * 2)
  doc.text(lines, MARGIN, y)
  y += lines.length * 4.2 + 4

  doc.setFontSize(14)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text('ESTIPULACIONES', MARGIN, y)
  y += 10

  // Clause 1: Object
  y = addClause(doc, y, 'PRIMERA', 'OBJETO',
    `El ARRENDADOR cede en arrendamiento al ARRENDATARIO el local comercial sito en ${data.property_address || '[dirección]'}${data.property_area ? `, con una superficie aproximada de ${data.property_area} m²` : ''}${data.property_registry ? `, con referencia catastral ${data.property_registry}` : ''}.\n\nEl local se destinará exclusivamente a: ${data.permitted_use || '[uso]'}.${data.property_condition === 'good' ? ' El ARRENDATARIO declara conocer y aceptar el estado actual del local, que se encuentra en buen estado de conservación.' : data.property_condition === 'new' ? ' El local se entrega recién reformado / de obra nueva.' : ''}`)

  // Clause 2: Duration
  y = addClause(doc, y, 'SEGUNDA', 'DURACIÓN',
    `El presente contrato tendrá una duración de ${data.duration_years || '[X]'} año(s), comenzando el día ${formatDate(String(data.start_date || ''))}.\n\nLlegado el vencimiento del contrato, este se prorrogará tácitamente por períodos anuales sucesivos, salvo que cualquiera de las partes manifieste su voluntad de no renovarlo con una antelación mínima de ${data.early_termination_months || '1'} mes(es) a la fecha de vencimiento o de cualquiera de sus prórrogas.`)

  // Clause 3: Rent
  const monthlyRent = Number(data.monthly_rent || 0)
  const rentIva = Number(data.rent_iva || 21)
  const rentIvaAmount = monthlyRent * (rentIva / 100)
  const totalMonthly = monthlyRent + rentIvaAmount

  let rentText = `El ARRENDATARIO abonará al ARRENDADOR una renta mensual de ${formatCurrency(monthlyRent)} (más ${rentIva}% de IVA: ${formatCurrency(rentIvaAmount)}), resultando un total de ${formatCurrency(totalMonthly)} mensuales.`
  if (rentIva === 0) {
    rentText = `El ARRENDATARIO abonará al ARRENDADOR una renta mensual de ${formatCurrency(monthlyRent)}, exenta de IVA.`
  }
  rentText += `\n\nEl pago se efectuará dentro de los ${data.payment_day || 'primeros'} días de cada mes, mediante transferencia bancaria a la cuenta designada por el ARRENDADOR.`

  const updateText: Record<string, string> = {
    ipc: 'La renta se actualizará anualmente conforme a la variación del Índice de Precios al Consumo (IPC) publicado por el INE.',
    irav: 'La renta se actualizará anualmente conforme al Índice de Referencia de Arrendamientos de Vivienda (IRAV).',
    fixed: 'La renta se actualizará anualmente en un porcentaje fijo acordado entre las partes.',
    none: 'La renta no se actualizará durante la vigencia del contrato.',
  }
  rentText += `\n\n${updateText[String(data.annual_update)] || ''}`

  y = addClause(doc, y, 'TERCERA', 'RENTA', rentText)

  // Clause 4: Deposit
  const depositMonths = Number(data.deposit_months || 2)
  const depositAmount = monthlyRent * depositMonths
  y = addClause(doc, y, 'CUARTA', 'FIANZA',
    `En cumplimiento del artículo 36 de la LAU, el ARRENDATARIO entrega en este acto la cantidad de ${formatCurrency(depositAmount)}, equivalente a ${depositMonths} mensualidad(es) de renta, en concepto de fianza.\n\nDicha fianza será depositada por el ARRENDADOR en el organismo competente de la Comunidad Autónoma correspondiente, y será devuelta al ARRENDATARIO a la finalización del contrato, una vez verificado el buen estado del local y el cumplimiento de todas las obligaciones contractuales, en el plazo máximo de un mes.`)

  // Clause 5: Use and maintenance
  const maintenanceText: Record<string, string> = {
    tenant: 'Las reparaciones de conservación y mantenimiento ordinario del local serán por cuenta del ARRENDATARIO.',
    landlord: 'Las reparaciones de conservación y mantenimiento serán por cuenta del ARRENDADOR.',
    shared: 'Las pequeñas reparaciones por uso ordinario serán por cuenta del ARRENDATARIO. Las reparaciones necesarias para mantener el local en condiciones de habitabilidad serán por cuenta del ARRENDADOR, conforme al artículo 21 de la LAU.',
  }
  y = addClause(doc, y, 'QUINTA', 'USO Y CONSERVACIÓN',
    `El ARRENDATARIO se obliga a usar el local diligentemente, destinándolo exclusivamente al uso pactado.\n\n${maintenanceText[String(data.maintenance_responsibility)] || maintenanceText.shared}`)

  // Clause 6: Reforms
  if (data.allow_reforms) {
    y = addClause(doc, y, 'SEXTA', 'OBRAS Y MEJORAS',
      'El ARRENDATARIO podrá realizar obras de acondicionamiento del local necesarias para el desarrollo de su actividad, previa comunicación por escrito al ARRENDADOR y siempre que no afecten a la estructura o elementos esenciales del edificio. A la finalización del contrato, el ARRENDATARIO deberá restituir el local a su estado original, salvo acuerdo en contrario entre las partes.')
  }

  // Clause 7: Sublease
  const subleaseClause = data.allow_reforms ? 'SÉPTIMA' : 'SEXTA'
  y = addClause(doc, y, subleaseClause, 'CESIÓN Y SUBARRIENDO',
    data.allow_sublease
      ? 'El ARRENDATARIO podrá subarrendar total o parcialmente el local, previa notificación fehaciente al ARRENDADOR con al menos treinta (30) días de antelación, de conformidad con el artículo 32 de la LAU.'
      : 'Queda expresamente prohibida la cesión o subarriendo, total o parcial, del local sin el consentimiento previo y por escrito del ARRENDADOR.')

  // Clause 8: Termination
  const terminationClause = data.allow_reforms ? 'OCTAVA' : 'SÉPTIMA'
  y = addClause(doc, y, terminationClause, 'RESOLUCIÓN',
    `El presente contrato podrá resolverse por las siguientes causas:\n\na) Por mutuo acuerdo de las partes.\nb) Por incumplimiento de cualquiera de las obligaciones contractuales.\nc) Por falta de pago de la renta o cantidades asimiladas durante dos mensualidades consecutivas.\nd) Por desistimiento anticipado del ARRENDATARIO, con un preaviso mínimo de ${data.early_termination_months || '1'} mes(es).\ne) Por las demás causas previstas en la LAU.`)

  // Clause 9: Jurisdiction
  const jurisdictionClause = data.allow_reforms ? 'NOVENA' : 'OCTAVA'
  y = addClause(doc, y, jurisdictionClause, 'LEGISLACIÓN Y JURISDICCIÓN',
    `El presente contrato se regirá por lo dispuesto en la Ley 29/1994, de Arrendamientos Urbanos, y supletoriamente por el Código Civil. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de ${data.jurisdiction_city || '[ciudad]'}.`)

  // Signatures
  if (y > 230) { doc.addPage(); y = MARGIN }
  y += 10
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'normal')
  doc.text('Y en prueba de conformidad, las partes firman el presente contrato por duplicado.', MARGIN, y, { maxWidth: PAGE_WIDTH - MARGIN * 2 })
  y += 16

  doc.setFont('helvetica', 'bold')
  doc.text('EL ARRENDADOR', MARGIN, y)
  doc.text('EL ARRENDATARIO', PAGE_WIDTH / 2 + 10, y)
  y += 20
  doc.setFont('helvetica', 'normal')
  doc.setDrawColor(...COLORS.lightGray)
  doc.line(MARGIN, y, MARGIN + 60, y)
  doc.line(PAGE_WIDTH / 2 + 10, y, PAGE_WIDTH / 2 + 70, y)
  y += 5
  doc.setFontSize(8)
  doc.text(String(data.landlord_name || ''), MARGIN, y)
  doc.text(String(data.tenant_name || ''), PAGE_WIDTH / 2 + 10, y)

  addFooter(doc)
  return doc
}
