import type { DocumentType } from '@/types/database'
import type { DocumentConfig } from '@/types/questionnaire'
import { invoiceConfig } from './invoice'
import { serviceContractConfig } from './service-contract'
import { ndaConfig } from './nda'
import { quoteConfig } from './quote'
import { leaseConfig } from './lease'
import { privacyPolicyConfig } from './privacy-policy'

const configs: Record<DocumentType, DocumentConfig> = {
  invoice: invoiceConfig,
  service_contract: serviceContractConfig,
  nda: ndaConfig,
  quote: quoteConfig,
  lease: leaseConfig,
  privacy_policy: privacyPolicyConfig,
}

export function getDocumentConfig(type: DocumentType): DocumentConfig | null {
  return configs[type] || null
}

export { invoiceConfig, serviceContractConfig, ndaConfig, quoteConfig, leaseConfig, privacyPolicyConfig }
