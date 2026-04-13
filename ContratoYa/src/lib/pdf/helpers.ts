import jsPDF from 'jspdf'

export const COLORS = {
  navy: [26, 31, 54] as [number, number, number],
  gray: [107, 114, 128] as [number, number, number],
  lightGray: [229, 231, 235] as [number, number, number],
  black: [0, 0, 0] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  green: [34, 197, 94] as [number, number, number],
}

export const MARGIN = 20
export const PAGE_WIDTH = 210
export const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2

export function addHeader(doc: jsPDF, y: number, emitterName: string, subtitle: string): number {
  doc.setFontSize(22)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text(emitterName, MARGIN, y)
  y += 8

  doc.setFontSize(10)
  doc.setTextColor(...COLORS.gray)
  doc.setFont('helvetica', 'normal')
  doc.text(subtitle, MARGIN, y)

  return y + 10
}

export function addSectionTitle(doc: jsPDF, y: number, title: string): number {
  doc.setFontSize(11)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text(title, MARGIN, y)
  y += 1
  doc.setDrawColor(...COLORS.green)
  doc.setLineWidth(0.5)
  doc.line(MARGIN, y, MARGIN + 40, y)
  return y + 6
}

export function addLabelValue(doc: jsPDF, y: number, label: string, value: string, x?: number): number {
  const startX = x || MARGIN
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.gray)
  doc.setFont('helvetica', 'normal')
  doc.text(label, startX, y)
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.black)
  doc.text(value || '—', startX, y + 4)
  return y + 10
}

export function addParagraph(doc: jsPDF, y: number, text: string, fontSize?: number): number {
  doc.setFontSize(fontSize || 9)
  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'normal')
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH)
  doc.text(lines, MARGIN, y)
  return y + lines.length * (fontSize ? fontSize * 0.5 : 4.5) + 2
}

export function addClause(doc: jsPDF, y: number, number: string, title: string, body: string): number {
  if (y > 260) {
    doc.addPage()
    y = MARGIN
  }

  doc.setFontSize(10)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text(`${number}. ${title}`, MARGIN, y)
  y += 6

  doc.setFontSize(9)
  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'normal')
  const lines = doc.splitTextToSize(body, CONTENT_WIDTH)
  doc.text(lines, MARGIN, y)
  y += lines.length * 4.5 + 4

  return y
}

export function addFooter(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)

    // Disclaimer line
    doc.setFontSize(6.5)
    doc.setTextColor(...COLORS.gray)
    doc.setFont('helvetica', 'bold')
    doc.text('BORRADOR — Requiere revision legal profesional', MARGIN, 282)

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(6)
    doc.text(
      'Generado con ContratoYa. Este documento es una plantilla orientativa y NO constituye asesoramiento juridico. ContratoYa no es un despacho de abogados. Se recomienda encarecidamente la revision por un abogado colegiado antes de su firma o uso.',
      MARGIN,
      286,
      { maxWidth: CONTENT_WIDTH - 30 }
    )
    doc.setFont('helvetica', 'normal')
    doc.text(`Pag. ${i}/${pageCount}`, PAGE_WIDTH - MARGIN, 286, { align: 'right' })
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount)
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}
