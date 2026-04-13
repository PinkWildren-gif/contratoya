import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { MARGIN, COLORS, CONTENT_WIDTH, PAGE_WIDTH, addFooter, formatCurrency, formatDate } from './helpers'

export function generateQuotePdf(data: Record<string, unknown>): jsPDF {
  const doc = new jsPDF()
  let y = MARGIN

  // Header
  doc.setFontSize(22)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text('PRESUPUESTO', MARGIN, y + 5)

  doc.setFontSize(11)
  doc.setTextColor(...COLORS.green)
  doc.text(String(data.quote_reference || ''), PAGE_WIDTH - MARGIN, y + 5, { align: 'right' })
  y += 12
  doc.setDrawColor(...COLORS.green)
  doc.setLineWidth(1)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 10

  // Two columns: provider / client
  const colWidth = CONTENT_WIDTH / 2 - 5

  doc.setFontSize(8)
  doc.setTextColor(...COLORS.gray)
  doc.text('DE:', MARGIN, y)
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text(String(data.provider_name || ''), MARGIN, y + 5)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.black)
  const providerLines = [
    `NIF: ${data.provider_nif || ''}`,
    String(data.provider_address || ''),
    data.provider_phone ? `Tel: ${data.provider_phone}` : '',
    data.provider_email ? String(data.provider_email) : '',
  ].filter(Boolean)
  doc.text(providerLines, MARGIN, y + 10)

  const clientX = MARGIN + colWidth + 10
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.gray)
  doc.text('PARA:', clientX, y)
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text(String(data.client_name || ''), clientX, y + 5)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.black)
  const clientLines = [
    data.client_nif ? `NIF/CIF: ${data.client_nif}` : '',
    String(data.client_address || ''),
    data.client_email ? String(data.client_email) : '',
  ].filter(Boolean)
  doc.text(clientLines, clientX, y + 10)

  y += 35

  // Date + validity
  doc.setFillColor(245, 247, 250)
  doc.rect(MARGIN, y, CONTENT_WIDTH, 10, 'F')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.gray)
  doc.text('Fecha', MARGIN + 3, y + 4)
  doc.text('Válido hasta', MARGIN + 60, y + 4)
  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'bold')
  doc.text(formatDate(String(data.quote_date || '')), MARGIN + 3, y + 8)
  const validityDays = Number(data.validity_days || 30)
  const quoteDate = data.quote_date ? new Date(String(data.quote_date)) : new Date()
  const expiryDate = new Date(quoteDate.getTime() + validityDays * 86400000)
  doc.text(formatDate(expiryDate.toISOString()), MARGIN + 60, y + 8)
  doc.setFont('helvetica', 'normal')
  y += 16

  // Project description
  if (data.project_description) {
    doc.setFontSize(10)
    doc.setTextColor(...COLORS.navy)
    doc.setFont('helvetica', 'bold')
    doc.text('Descripción del proyecto', MARGIN, y)
    y += 6
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.black)
    doc.setFont('helvetica', 'normal')
    const descLines = doc.splitTextToSize(String(data.project_description), CONTENT_WIDTH)
    doc.text(descLines, MARGIN, y)
    y += descLines.length * 4.5 + 6
  }

  // Items table
  const items: string[][] = []
  let subtotal = 0
  for (let i = 1; i <= 4; i++) {
    const desc = data[`item${i}_description`]
    const price = data[`item${i}_price`]
    if (desc && price) {
      const detail = data[`item${i}_detail`] ? `\n${data[`item${i}_detail`]}` : ''
      items.push([String(desc) + String(detail), formatCurrency(Number(price))])
      subtotal += Number(price)
    }
  }

  autoTable(doc, {
    startY: y,
    head: [['Concepto', 'Importe']],
    body: items,
    theme: 'plain',
    headStyles: {
      fillColor: [26, 31, 54],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      cellPadding: 4,
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 5,
      textColor: [0, 0, 0],
      overflow: 'linebreak',
    },
    columnStyles: {
      0: { cellWidth: 130 },
      1: { cellWidth: 40, halign: 'right' },
    },
    margin: { left: MARGIN, right: MARGIN },
    alternateRowStyles: { fillColor: [249, 250, 251] },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 8

  // Totals
  const ivaRate = Number(data.iva_rate || 21)
  const ivaAmount = subtotal * (ivaRate / 100)
  const total = subtotal + ivaAmount
  const totalsX = PAGE_WIDTH - MARGIN - 70
  const valX = PAGE_WIDTH - MARGIN

  doc.setFontSize(9)
  doc.setTextColor(...COLORS.black)
  doc.text('Subtotal:', totalsX, y)
  doc.text(formatCurrency(subtotal), valX, y, { align: 'right' })
  y += 6
  doc.text(`IVA (${ivaRate}%):`, totalsX, y)
  doc.text(formatCurrency(ivaAmount), valX, y, { align: 'right' })
  y += 4
  doc.setDrawColor(...COLORS.navy)
  doc.line(totalsX, y, valX, y)
  y += 6
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.navy)
  doc.text('TOTAL:', totalsX, y)
  doc.text(formatCurrency(total), valX, y, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  y += 14

  // Conditions
  const conditions: string[] = []
  if (data.payment_schedule) {
    const scheduleText: Record<string, string> = {
      full_advance: '100% por adelantado antes del inicio del proyecto.',
      half_half: '50% al inicio del proyecto y 50% a la entrega.',
      thirds: '33% al inicio, 33% en fase de desarrollo y 33% a la entrega final.',
      on_delivery: '100% a la entrega del proyecto finalizado.',
    }
    conditions.push(`Forma de pago: ${scheduleText[String(data.payment_schedule)] || ''}`)
  }
  if (data.estimated_timeline) {
    conditions.push(`Plazo estimado de ejecución: ${data.estimated_timeline}.`)
  }
  conditions.push(`Este presupuesto tiene una validez de ${validityDays} días desde su fecha de emisión.`)
  if (data.additional_conditions) {
    conditions.push(String(data.additional_conditions))
  }

  if (conditions.length > 0) {
    if (y > 240) { doc.addPage(); y = MARGIN }
    doc.setFontSize(10)
    doc.setTextColor(...COLORS.navy)
    doc.setFont('helvetica', 'bold')
    doc.text('Condiciones', MARGIN, y)
    y += 6
    doc.setFontSize(8)
    doc.setTextColor(...COLORS.black)
    doc.setFont('helvetica', 'normal')
    for (const cond of conditions) {
      const lines = doc.splitTextToSize(`• ${cond}`, CONTENT_WIDTH)
      doc.text(lines, MARGIN, y)
      y += lines.length * 4 + 2
    }
  }

  // Acceptance block
  if (data.include_acceptance) {
    if (y > 230) { doc.addPage(); y = MARGIN }
    y += 8
    doc.setFillColor(245, 247, 250)
    doc.rect(MARGIN, y, CONTENT_WIDTH, 45, 'F')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.navy)
    doc.setFont('helvetica', 'bold')
    doc.text('ACEPTACIÓN DEL PRESUPUESTO', MARGIN + 5, y + 8)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...COLORS.black)
    doc.text('Acepto el presente presupuesto y las condiciones indicadas.', MARGIN + 5, y + 16)

    doc.text('Fecha:', MARGIN + 5, y + 28)
    doc.setDrawColor(...COLORS.lightGray)
    doc.line(MARGIN + 20, y + 28, MARGIN + 65, y + 28)

    doc.text('Firma:', MARGIN + 85, y + 28)
    doc.line(MARGIN + 100, y + 28, MARGIN + CONTENT_WIDTH - 10, y + 28)

    doc.text('Nombre:', MARGIN + 5, y + 38)
    doc.line(MARGIN + 25, y + 38, MARGIN + 65, y + 38)
  }

  addFooter(doc)
  return doc
}
