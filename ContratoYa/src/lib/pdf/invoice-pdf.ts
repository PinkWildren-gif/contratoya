import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { MARGIN, COLORS, CONTENT_WIDTH, PAGE_WIDTH, addFooter, formatCurrency, formatDate } from './helpers'

export function generateInvoicePdf(data: Record<string, unknown>): jsPDF {
  const doc = new jsPDF()

  let y = MARGIN

  // Header - Invoice title + number
  doc.setFontSize(24)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text('FACTURA', MARGIN, y + 5)

  doc.setFontSize(12)
  doc.setTextColor(...COLORS.green)
  doc.text(String(data.invoice_number || ''), PAGE_WIDTH - MARGIN, y + 5, { align: 'right' })

  y += 12
  doc.setDrawColor(...COLORS.green)
  doc.setLineWidth(1)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)

  y += 10

  // Two-column: Emitter / Client
  const colWidth = CONTENT_WIDTH / 2 - 5

  // Emitter
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.gray)
  doc.text('DE:', MARGIN, y)
  doc.setFontSize(10)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text(String(data.emitter_name || ''), MARGIN, y + 5)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.black)
  const emitterLines = [
    `NIF: ${data.emitter_nif || ''}`,
    String(data.emitter_address || ''),
    `${data.emitter_city || ''} ${data.emitter_postal_code || ''}`,
    data.emitter_phone ? `Tel: ${data.emitter_phone}` : '',
    data.emitter_email ? String(data.emitter_email) : '',
  ].filter(Boolean)
  doc.text(emitterLines, MARGIN, y + 10)

  // Client
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
    `NIF/CIF: ${data.client_nif || ''}`,
    String(data.client_address || ''),
    `${data.client_city || ''} ${data.client_postal_code || ''}`,
    data.client_email ? String(data.client_email) : '',
  ].filter(Boolean)
  doc.text(clientLines, clientX, y + 10)

  y += 35

  // Invoice details row
  doc.setFillColor(245, 247, 250)
  doc.rect(MARGIN, y, CONTENT_WIDTH, 12, 'F')

  doc.setFontSize(8)
  doc.setTextColor(...COLORS.gray)
  const detailsY = y + 4
  doc.text('Fecha de emisión', MARGIN + 3, detailsY)
  doc.text('Vencimiento', MARGIN + 50, detailsY)
  doc.text('Forma de pago', MARGIN + 100, detailsY)

  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'bold')
  doc.text(formatDate(String(data.invoice_date || '')), MARGIN + 3, detailsY + 5)
  doc.text(data.due_date ? formatDate(String(data.due_date)) : '—', MARGIN + 50, detailsY + 5)
  const paymentLabels: Record<string, string> = {
    transfer: 'Transferencia', cash: 'Efectivo', card: 'Tarjeta', paypal: 'PayPal', other: 'Otro',
  }
  doc.text(paymentLabels[String(data.payment_method)] || '—', MARGIN + 100, detailsY + 5)
  doc.setFont('helvetica', 'normal')

  y += 20

  // Line items table
  const items: (string | number)[][] = []
  for (let i = 1; i <= 3; i++) {
    const desc = data[`item${i}_description`]
    const qty = data[`item${i}_quantity`]
    const price = data[`item${i}_price`]
    if (desc && qty && price) {
      const subtotal = Number(qty) * Number(price)
      items.push([String(desc), String(qty), formatCurrency(Number(price)), formatCurrency(subtotal)])
    }
  }

  autoTable(doc, {
    startY: y,
    head: [['Concepto', 'Cant.', 'Precio/ud.', 'Subtotal']],
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
      cellPadding: 4,
      textColor: [0, 0, 0],
    },
    columnStyles: {
      0: { cellWidth: 85 },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 35, halign: 'right' },
    },
    margin: { left: MARGIN, right: MARGIN },
    alternateRowStyles: { fillColor: [249, 250, 251] },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 8

  // Totals — calculate from raw data, not formatted strings
  let baseImponible = 0
  for (let i = 1; i <= 3; i++) {
    const qty = Number(data[`item${i}_quantity`] || 0)
    const price = Number(data[`item${i}_price`] || 0)
    if (data[`item${i}_description`] && qty && price) {
      baseImponible += qty * price
    }
  }
  const ivaRate = Number(data.iva_rate || 21)
  const ivaAmount = baseImponible * (ivaRate / 100)
  const applyIrpf = data.apply_irpf === true
  const irpfRate = applyIrpf ? Number(data.irpf_rate || 15) : 0
  const irpfAmount = baseImponible * (irpfRate / 100)
  const total = baseImponible + ivaAmount - irpfAmount

  const totalsX = PAGE_WIDTH - MARGIN - 70
  const valX = PAGE_WIDTH - MARGIN

  doc.setFontSize(9)
  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'normal')

  doc.text('Base imponible:', totalsX, y)
  doc.text(formatCurrency(baseImponible), valX, y, { align: 'right' })
  y += 6

  doc.text(`IVA (${ivaRate}%):`, totalsX, y)
  doc.text(formatCurrency(ivaAmount), valX, y, { align: 'right' })
  y += 6

  if (applyIrpf) {
    doc.text(`IRPF (-${irpfRate}%):`, totalsX, y)
    doc.text(`-${formatCurrency(irpfAmount)}`, valX, y, { align: 'right' })
    y += 6
  }

  y += 2
  doc.setDrawColor(...COLORS.navy)
  doc.setLineWidth(0.5)
  doc.line(totalsX, y, valX, y)
  y += 6

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...COLORS.navy)
  doc.text('TOTAL:', totalsX, y)
  doc.text(formatCurrency(total), valX, y, { align: 'right' })

  y += 14

  // Bank account
  if (data.payment_method === 'transfer' && data.bank_account) {
    doc.setFontSize(8)
    doc.setTextColor(...COLORS.gray)
    doc.text('Datos bancarios para transferencia:', MARGIN, y)
    doc.setTextColor(...COLORS.black)
    doc.setFont('helvetica', 'bold')
    doc.text(String(data.bank_account), MARGIN, y + 5)
    doc.setFont('helvetica', 'normal')
    y += 14
  }

  // Notes
  if (data.notes) {
    doc.setFontSize(8)
    doc.setTextColor(...COLORS.gray)
    doc.text('Notas:', MARGIN, y)
    doc.setTextColor(...COLORS.black)
    const noteLines = doc.splitTextToSize(String(data.notes), CONTENT_WIDTH)
    doc.text(noteLines, MARGIN, y + 5)
  }

  addFooter(doc)
  return doc
}
