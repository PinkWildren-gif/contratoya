import type { DocumentConfig } from '@/types/questionnaire'

export const privacyPolicyConfig: DocumentConfig = {
  id: 'privacy_policy',
  type: 'privacy_policy',
  label: 'Política de Privacidad y Aviso Legal',
  description: 'Plantilla basada en el RGPD y la LOPD-GDD para tu web o app',
  generateTitle: (data) => `Política de Privacidad - ${data.business_name || 'Sin nombre'}`,
  steps: [
    {
      id: 'business',
      title: 'Datos del responsable',
      description: 'El titular de la web o app (responsable del tratamiento)',
      fields: [
        { name: 'business_name', label: 'Nombre / Razón social', type: 'text', required: true, width: 'full', placeholder: 'Juan García López / Empresa S.L.' },
        { name: 'business_nif', label: 'NIF/CIF', type: 'text', required: true, width: 'half', placeholder: '12345678A' },
        { name: 'business_address', label: 'Domicilio social', type: 'text', required: true, width: 'full', placeholder: 'Calle Mayor 1, 2ºB, 28001 Madrid' },
        { name: 'business_email', label: 'Email de contacto', type: 'email', required: true, width: 'half', placeholder: 'info@tuempresa.com' },
        { name: 'business_phone', label: 'Teléfono', type: 'text', width: 'half', placeholder: '612 345 678' },
        { name: 'website_url', label: 'URL de la web', type: 'text', required: true, width: 'half', placeholder: 'https://www.tuempresa.com' },
        { name: 'registry_info', label: 'Datos registrales (si es sociedad)', type: 'text', width: 'full', placeholder: 'Registro Mercantil de Madrid, Tomo X, Folio Y, Hoja Z' },
      ],
    },
    {
      id: 'data_collection',
      title: 'Datos que recoges',
      description: 'Qué datos personales tratas y con qué finalidad',
      fields: [
        { name: 'collects_contact_forms', label: 'Formularios de contacto (nombre, email, mensaje)', type: 'checkbox', defaultValue: true },
        { name: 'collects_newsletter', label: 'Suscripción a newsletter', type: 'checkbox' },
        { name: 'collects_user_accounts', label: 'Cuentas de usuario (registro, login)', type: 'checkbox' },
        { name: 'collects_ecommerce', label: 'Datos de compra (facturación, envío)', type: 'checkbox' },
        { name: 'collects_analytics', label: 'Analítica web (Google Analytics, etc.)', type: 'checkbox', defaultValue: true },
        { name: 'collects_cookies', label: 'Cookies', type: 'checkbox', defaultValue: true },
        { name: 'additional_data', label: 'Otros datos que recojas', type: 'textarea', width: 'full', placeholder: 'Ej: datos de geolocalización, imágenes de perfil, datos de salud...' },
      ],
    },
    {
      id: 'legal_basis',
      title: 'Base legal y terceros',
      description: 'Fundamento jurídico del tratamiento y servicios de terceros',
      fields: [
        { name: 'legal_basis', label: 'Base legal principal', type: 'select', required: true, width: 'full', options: [
          { value: 'consent', label: 'Consentimiento del interesado' },
          { value: 'contract', label: 'Ejecución de un contrato' },
          { value: 'legitimate', label: 'Interés legítimo del responsable' },
          { value: 'legal', label: 'Obligación legal' },
        ]},
        { name: 'data_retention', label: 'Plazo de conservación de datos', type: 'select', required: true, width: 'half', options: [
          { value: 'while_needed', label: 'Mientras sea necesario para la finalidad' },
          { value: '1year', label: '1 año' },
          { value: '2years', label: '2 años' },
          { value: '5years', label: '5 años (obligaciones fiscales)' },
          { value: 'until_revoked', label: 'Hasta que el usuario revoque su consentimiento' },
        ]},
        { name: 'shares_with_third_parties', label: '¿Compartes datos con terceros?', type: 'checkbox' },
        { name: 'third_parties_description', label: 'Terceros con acceso a datos', type: 'textarea', width: 'full', placeholder: 'Ej: Google (Analytics), Mailchimp (email marketing), Stripe (pagos)...', condition: (data) => data.shares_with_third_parties === true },
        { name: 'international_transfers', label: '¿Hay transferencias internacionales de datos?', type: 'checkbox', helperText: 'Ej: si usas servicios de EE.UU. como Google, AWS, Mailchimp' },
      ],
    },
    {
      id: 'cookies',
      title: 'Política de cookies',
      description: 'Tipos de cookies que utiliza tu web',
      fields: [
        { name: 'uses_technical_cookies', label: 'Cookies técnicas (necesarias para el funcionamiento)', type: 'checkbox', defaultValue: true },
        { name: 'uses_analytics_cookies', label: 'Cookies analíticas (Google Analytics, etc.)', type: 'checkbox', defaultValue: true },
        { name: 'uses_marketing_cookies', label: 'Cookies de marketing/publicidad', type: 'checkbox' },
        { name: 'uses_social_cookies', label: 'Cookies de redes sociales (botones compartir, etc.)', type: 'checkbox' },
        { name: 'cookie_consent_tool', label: 'Herramienta de consentimiento de cookies', type: 'text', width: 'full', placeholder: 'Ej: Cookiebot, CookieYes, banner propio...' },
      ],
    },
    {
      id: 'additional',
      title: 'Opciones adicionales',
      description: 'DPO, seguridad y contenido extra',
      fields: [
        { name: 'has_dpo', label: 'Tengo un Delegado de Protección de Datos (DPO)', type: 'checkbox' },
        { name: 'dpo_email', label: 'Email del DPO', type: 'email', width: 'half', placeholder: 'dpo@empresa.com', condition: (data) => data.has_dpo === true },
        { name: 'include_legal_notice', label: 'Incluir Aviso Legal (obligatorio para webs en España)', type: 'checkbox', defaultValue: true },
        { name: 'include_cookie_policy', label: 'Incluir Política de Cookies detallada', type: 'checkbox', defaultValue: true },
        { name: 'last_updated', label: 'Fecha de última actualización', type: 'date', required: true, width: 'half' },
      ],
    },
  ],
}
