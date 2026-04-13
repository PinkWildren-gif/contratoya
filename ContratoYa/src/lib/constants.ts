export const DOCUMENT_TYPES = {
  service_contract: {
    id: 'service_contract',
    label: 'Contrato de Prestacion de Servicios',
    description: 'Plantilla de contrato entre autonomo y cliente para servicios profesionales',
    icon: 'FileText',
  },
  invoice: {
    id: 'invoice',
    label: 'Factura',
    description: 'Plantilla de factura con campos de IVA e IRPF',
    icon: 'Receipt',
  },
  nda: {
    id: 'nda',
    label: 'Acuerdo de Confidencialidad (NDA)',
    description: 'Plantilla de NDA para proteger informacion confidencial',
    icon: 'Shield',
  },
  quote: {
    id: 'quote',
    label: 'Presupuesto',
    description: 'Plantilla de propuesta formal con desglose de precios',
    icon: 'Calculator',
  },
  lease: {
    id: 'lease',
    label: 'Contrato de Alquiler de Local',
    description: 'Plantilla de arrendamiento para local comercial',
    icon: 'Building',
  },
  privacy_policy: {
    id: 'privacy_policy',
    label: 'Politica de Privacidad',
    description: 'Plantilla de aviso legal y politica de privacidad basada en el RGPD',
    icon: 'Lock',
  },
} as const

export const TEMPLATE_VERSION = '1.0.0'
export const FREE_TIER_LIMIT = 2
export const PRO_MONTHLY_PRICE = 9.99
export const PRO_YEARLY_PRICE = 79.99
