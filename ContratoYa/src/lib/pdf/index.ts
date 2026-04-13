import type { DocumentType } from '@/types/database'
import { generateInvoicePdf } from './invoice-pdf'
import { generateContractPdf } from './contract-pdf'
import { generateNdaPdf } from './nda-pdf'
import { generateQuotePdf } from './quote-pdf'
import { generateLeasePdf } from './lease-pdf'
import { generatePrivacyPdf } from './privacy-pdf'
import type jsPDF from 'jspdf'

export function generatePdf(type: DocumentType, data: Record<string, unknown>): jsPDF {
  switch (type) {
    case 'invoice':
      return generateInvoicePdf(data)
    case 'service_contract':
      return generateContractPdf(data)
    case 'nda':
      return generateNdaPdf(data)
    case 'quote':
      return generateQuotePdf(data)
    case 'lease':
      return generateLeasePdf(data)
    case 'privacy_policy':
      return generatePrivacyPdf(data)
    default:
      throw new Error(`PDF generation not yet implemented for document type: ${type}`)
  }
}

export function downloadPdf(type: DocumentType, data: Record<string, unknown>, filename: string) {
  const doc = generatePdf(type, data)
  doc.save(`${filename}.pdf`)
}
