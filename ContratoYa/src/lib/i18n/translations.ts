export type Language = 'es' | 'en'

const translations = {
  // Navbar
  'nav.new': { es: 'Nuevo', en: 'New' },
  'nav.documents': { es: 'Documentos', en: 'Documents' },
  'nav.profile': { es: 'Mi Perfil', en: 'My Profile' },
  'nav.contacts': { es: 'Contactos', en: 'Contacts' },
  'nav.signout': { es: 'Salir', en: 'Sign Out' },
  'nav.login': { es: 'Iniciar sesion', en: 'Sign In' },
  'nav.signup': { es: 'Registrarse', en: 'Sign Up' },
  'nav.enter': { es: 'Entrar', en: 'Enter' },
  'nav.upgrade': { es: 'Mejorar a Pro', en: 'Upgrade to Pro' },
  'nav.newDoc': { es: 'Nuevo documento', en: 'New Document' },
  'nav.myDocs': { es: 'Mis documentos', en: 'My Documents' },

  // Landing
  'landing.hero.title1': { es: 'Documentos legales para autonomos, ', en: 'Legal documents for freelancers, ' },
  'landing.hero.title2': { es: 'sin complicaciones', en: 'without the hassle' },
  'landing.hero.subtitle': {
    es: 'Genera borradores de contratos, facturas y documentos profesionales en minutos. Plantillas basadas en la normativa espanola, listas para revisar con tu abogado.',
    en: 'Generate draft contracts, invoices and professional documents in minutes. Templates based on Spanish regulations, ready to review with your lawyer.',
  },
  'landing.hero.cta': { es: 'Empezar gratis', en: 'Start for free' },
  'landing.hero.existing': { es: 'Ya tengo cuenta', en: 'I have an account' },
  'landing.hero.free': { es: '2 documentos gratis al mes. Sin tarjeta de credito.', en: '2 free documents per month. No credit card required.' },
  'landing.types.title': { es: 'Todo lo que necesitas como autonomo', en: 'Everything you need as a freelancer' },
  'landing.types.subtitle': {
    es: '6 tipos de plantillas esenciales con la estructura y campos que necesitas como punto de partida',
    en: '6 essential template types with the structure and fields you need as a starting point',
  },
  'landing.benefits.title': { es: 'Hecho para autonomos espanoles', en: 'Made for Spanish freelancers' },
  'landing.pricing.title': { es: 'Precios claros y sencillos', en: 'Simple, clear pricing' },
  'landing.pricing.free': { es: 'Gratis', en: 'Free' },
  'landing.pricing.forever': { es: 'para siempre', en: 'forever' },
  'landing.pricing.docsPerMonth': { es: '2 documentos al mes', en: '2 documents per month' },
  'landing.pricing.allTypes': { es: 'Todos los tipos de documento', en: 'All document types' },
  'landing.pricing.pdfDownload': { es: 'Descarga en PDF', en: 'PDF download' },
  'landing.pricing.startFree': { es: 'Empezar gratis', en: 'Start for free' },
  'landing.pricing.popular': { es: 'Popular', en: 'Popular' },
  'landing.pricing.pro': { es: 'Pro', en: 'Pro' },
  'landing.pricing.perMonth': { es: 'al mes', en: 'per month' },
  'landing.pricing.unlimited': { es: 'Documentos ilimitados', en: 'Unlimited documents' },
  'landing.pricing.history': { es: 'Historial completo', en: 'Full history' },
  'landing.pricing.logo': { es: 'Logo personalizado', en: 'Custom logo' },
  'landing.pricing.support': { es: 'Soporte prioritario', en: 'Priority support' },
  'landing.pricing.startTrial': { es: 'Empezar prueba gratuita', en: 'Start free trial' },
  'landing.cta.title': { es: 'Empieza a generar documentos hoy', en: 'Start generating documents today' },
  'landing.cta.subtitle': { es: 'Sin tarjeta de credito. 2 documentos gratis al mes.', en: 'No credit card. 2 free documents per month.' },
  'landing.cta.button': { es: 'Crear mi cuenta gratis', en: 'Create my free account' },
  'landing.cta.terms': {
    es: 'Al registrarte, aceptas nuestras',
    en: 'By signing up, you accept our',
  },
  'landing.cta.and': { es: 'y', en: 'and' },

  // Benefits
  'benefit.1': { es: 'Plantillas basadas en la legislacion espanola', en: 'Templates based on Spanish law' },
  'benefit.2': { es: 'Genera borradores en menos de 5 minutos', en: 'Generate drafts in under 5 minutes' },
  'benefit.3': { es: 'Guarda tus datos y reutilizalos', en: 'Save your data and reuse it' },
  'benefit.4': { es: 'Descarga en PDF profesional', en: 'Professional PDF download' },
  'benefit.5': { es: 'Plantillas revisadas periodicamente', en: 'Regularly reviewed templates' },

  // Features
  'feature.contracts': { es: 'Contratos de Servicios', en: 'Service Contracts' },
  'feature.contracts.desc': { es: 'Plantillas profesionales para autonomos y freelancers', en: 'Professional templates for freelancers' },
  'feature.invoices': { es: 'Facturas', en: 'Invoices' },
  'feature.invoices.desc': { es: 'Con campos de IVA e IRPF para autonomos', en: 'With VAT and income tax fields' },
  'feature.ndas': { es: 'Acuerdos de Confidencialidad', en: 'Non-Disclosure Agreements' },
  'feature.ndas.desc': { es: 'Plantillas de NDA unilaterales o mutuos', en: 'Unilateral or mutual NDA templates' },
  'feature.quotes': { es: 'Presupuestos', en: 'Quotes' },
  'feature.quotes.desc': { es: 'Propuestas profesionales con desglose detallado', en: 'Professional proposals with detailed breakdown' },
  'feature.leases': { es: 'Contratos de Alquiler', en: 'Lease Agreements' },
  'feature.leases.desc': { es: 'Plantillas para locales comerciales basadas en la LAU', en: 'Commercial premises templates based on Spanish LAU' },
  'feature.privacy': { es: 'Politica de Privacidad', en: 'Privacy Policy' },
  'feature.privacy.desc': { es: 'Plantillas basadas en el RGPD y la LOPD-GDD', en: 'Templates based on GDPR and LOPD-GDD' },

  // Auth
  'auth.login.title': { es: 'Iniciar sesion', en: 'Sign In' },
  'auth.login.subtitle': { es: 'Accede a tu cuenta para gestionar tus documentos', en: 'Access your account to manage your documents' },
  'auth.login.email': { es: 'Email', en: 'Email' },
  'auth.login.password': { es: 'Contrasena', en: 'Password' },
  'auth.login.submit': { es: 'Iniciar sesion', en: 'Sign In' },
  'auth.login.forgot': { es: '¿Olvidaste tu contrasena?', en: 'Forgot your password?' },
  'auth.login.noAccount': { es: '¿No tienes cuenta?', en: "Don't have an account?" },
  'auth.login.signupLink': { es: 'Registrate gratis', en: 'Sign up free' },
  'auth.login.error': { es: 'Email o contrasena incorrectos', en: 'Incorrect email or password' },

  'auth.signup.title': { es: 'Crear cuenta', en: 'Create Account' },
  'auth.signup.subtitle': { es: 'Empieza a generar documentos legales en minutos', en: 'Start generating legal documents in minutes' },
  'auth.signup.confirmPassword': { es: 'Confirmar contrasena', en: 'Confirm Password' },
  'auth.signup.submit': { es: 'Crear cuenta gratis', en: 'Create free account' },
  'auth.signup.hasAccount': { es: '¿Ya tienes cuenta?', en: 'Already have an account?' },
  'auth.signup.loginLink': { es: 'Iniciar sesion', en: 'Sign In' },
  'auth.signup.terms': {
    es: 'He leido y acepto las',
    en: 'I have read and accept the',
  },
  'auth.signup.termsLink': { es: 'Condiciones de Uso', en: 'Terms of Service' },
  'auth.signup.privacyLink': { es: 'Politica de Privacidad', en: 'Privacy Policy' },
  'auth.signup.termsDisclaimer': {
    es: 'Entiendo que ContratoYa no es un despacho de abogados y no proporciona asesoramiento juridico.',
    en: 'I understand that ContratoYa is not a law firm and does not provide legal advice.',
  },
  'auth.signup.success.title': { es: '¡Cuenta creada!', en: 'Account Created!' },
  'auth.signup.success.message': { es: 'Revisa tu email para confirmar tu cuenta.', en: 'Check your email to confirm your account.' },
  'auth.signup.success.login': { es: 'Ir a iniciar sesion', en: 'Go to Sign In' },

  'auth.forgot.title': { es: 'Recuperar contrasena', en: 'Reset Password' },
  'auth.forgot.subtitle': { es: 'Introduce tu email y te enviaremos un enlace para restablecer tu contrasena', en: 'Enter your email and we\'ll send you a reset link' },
  'auth.forgot.submit': { es: 'Enviar enlace de recuperacion', en: 'Send reset link' },
  'auth.forgot.back': { es: 'Volver a iniciar sesion', en: 'Back to sign in' },
  'auth.forgot.sent.title': { es: 'Revisa tu email', en: 'Check your email' },
  'auth.forgot.sent.message': { es: 'Si existe una cuenta con ese email, recibiras un enlace para restablecer tu contrasena.', en: 'If an account exists with that email, you\'ll receive a reset link.' },

  'auth.reset.title': { es: 'Nueva contrasena', en: 'New Password' },
  'auth.reset.subtitle': { es: 'Introduce tu nueva contrasena', en: 'Enter your new password' },
  'auth.reset.newPassword': { es: 'Nueva contrasena', en: 'New password' },
  'auth.reset.submit': { es: 'Guardar nueva contrasena', en: 'Save new password' },
  'auth.reset.success.title': { es: 'Contrasena actualizada', en: 'Password Updated' },
  'auth.reset.success.message': { es: 'Redirigiendo a tu panel...', en: 'Redirecting to your dashboard...' },

  // Dashboard
  'dashboard.welcome': { es: 'Bienvenido a ContratoYa', en: 'Welcome to ContratoYa' },
  'dashboard.newDoc': { es: 'Crear nuevo documento', en: 'Create new document' },
  'dashboard.recent': { es: 'Documentos recientes', en: 'Recent documents' },
  'dashboard.viewAll': { es: 'Ver todos', en: 'View all' },
  'dashboard.noDocsTitle': { es: 'Sin documentos todavia', en: 'No documents yet' },
  'dashboard.noDocsDesc': { es: 'Crea tu primer documento seleccionando uno de los tipos de arriba', en: 'Create your first document by selecting a type above' },
  'dashboard.setupProfile': { es: 'Configurar mi perfil primero', en: 'Set up my profile first' },
  'dashboard.profileLink': { es: 'Mi perfil de autonomo', en: 'My freelancer profile' },
  'dashboard.profileDesc': { es: 'Configura tus datos fiscales para reutilizarlos en todos tus documentos', en: 'Set up your tax details to reuse across all documents' },
  'dashboard.contactsLink': { es: 'Directorio de contactos', en: 'Contact directory' },
  'dashboard.contactsDesc': { es: 'Guarda los datos de tus clientes para acceder a ellos rapidamente', en: 'Save client details for quick access' },

  // Documents
  'documents.title': { es: 'Mis documentos', en: 'My Documents' },
  'documents.subtitle': { es: 'Historial de todos tus documentos generados', en: 'History of all your generated documents' },
  'documents.new': { es: 'Nuevo', en: 'New' },
  'documents.noDocsTitle': { es: 'Sin documentos todavia', en: 'No documents yet' },
  'documents.noDocsDesc': { es: 'Genera tu primer documento desde el panel principal', en: 'Generate your first document from the dashboard' },
  'documents.create': { es: 'Crear documento', en: 'Create document' },
  'documents.deleteTitle': { es: 'Eliminar documento', en: 'Delete Document' },
  'documents.deleteConfirm': { es: '¿Estas seguro de que quieres eliminar este documento? Esta accion no se puede deshacer.', en: 'Are you sure you want to delete this document? This action cannot be undone.' },

  // NewDocument
  'newDoc.back': { es: 'Volver al panel', en: 'Back to dashboard' },
  'newDoc.remaining': { es: 'documento(s) gratis este mes', en: 'free document(s) this month' },
  'newDoc.remainingPrefix': { es: 'Te quedan', en: 'You have' },
  'newDoc.limitReached': { es: 'Has alcanzado el limite del plan gratuito', en: 'You\'ve reached the free plan limit' },
  'newDoc.limitTitle': { es: 'Limite mensual alcanzado', en: 'Monthly limit reached' },
  'newDoc.limitDesc': { es: 'documentos gratuitos de este mes. Pasa a Pro para generar documentos ilimitados.', en: 'free documents this month. Upgrade to Pro for unlimited documents.' },
  'newDoc.limitCta': { es: 'Ver planes Pro', en: 'See Pro plans' },
  'newDoc.disclaimer.title': { es: 'Aviso legal importante', en: 'Important Legal Notice' },
  'newDoc.disclaimer.subtitle': { es: 'Lea y acepte antes de continuar', en: 'Read and accept before continuing' },
  'newDoc.disclaimer.p1': {
    es: 'ContratoYa no es un despacho de abogados y no proporciona asesoramiento juridico. Los documentos generados son plantillas orientativas basadas en la informacion que usted proporciona.',
    en: 'ContratoYa is not a law firm and does not provide legal advice. Generated documents are indicative templates based on the information you provide.',
  },
  'newDoc.disclaimer.p2': {
    es: 'Los documentos pueden contener errores, omisiones o imprecisiones. Usted es el unico responsable de revisar y verificar cualquier documento antes de firmarlo o utilizarlo.',
    en: 'Documents may contain errors, omissions or inaccuracies. You are solely responsible for reviewing and verifying any document before signing or using it.',
  },
  'newDoc.disclaimer.p3': {
    es: 'Le recomendamos encarecidamente consultar con un abogado colegiado antes de utilizar cualquier documento generado para fines legales.',
    en: 'We strongly recommend consulting with a licensed attorney before using any generated document for legal purposes.',
  },
  'newDoc.disclaimer.checkbox': {
    es: 'Entiendo y acepto que los documentos generados no constituyen asesoramiento juridico y que debo revisarlos cuidadosamente antes de su uso. Acepto las',
    en: 'I understand and accept that generated documents do not constitute legal advice and that I must review them carefully before use. I accept the',
  },
  'newDoc.disclaimer.continue': { es: 'Continuar con la generacion del documento', en: 'Continue with document generation' },
  'newDoc.generated.title': { es: '¡Documento generado!', en: 'Document Generated!' },
  'newDoc.generated.download': { es: 'Descargar PDF', en: 'Download PDF' },
  'newDoc.generated.preview': { es: 'Vista previa', en: 'Preview' },
  'newDoc.generated.back': { es: 'Volver al panel', en: 'Back to dashboard' },
  'newDoc.generated.edit': { es: 'Editar y regenerar', en: 'Edit and regenerate' },
  'newDoc.download.title': { es: 'Antes de descargar, confirme que ha revisado el documento:', en: 'Before downloading, confirm you have reviewed the document:' },
  'newDoc.download.checkbox': {
    es: 'He revisado este documento y entiendo que ContratoYa no garantiza su exactitud, completitud ni idoneidad legal. Me comprometo a obtener asesoramiento juridico independiente antes de firmarlo o utilizarlo para cualquier proposito legal.',
    en: 'I have reviewed this document and understand that ContratoYa does not guarantee its accuracy, completeness or legal suitability. I commit to obtaining independent legal advice before signing or using it for any legal purpose.',
  },
  'newDoc.unavailable.title': { es: 'Documento no disponible', en: 'Document Unavailable' },
  'newDoc.unavailable.desc': { es: 'Este tipo de documento aun no esta disponible. Estamos trabajando en ello.', en: 'This document type is not yet available. We\'re working on it.' },

  // EditDocument
  'editDoc.back': { es: 'Mis documentos', en: 'My Documents' },
  'editDoc.prefix': { es: 'Editar:', en: 'Edit:' },
  'editDoc.notFound': { es: 'Documento no encontrado', en: 'Document not found' },
  'editDoc.typeNotAvailable': { es: 'Tipo de documento no disponible', en: 'Document type not available' },
  'editDoc.updated': { es: 'Documento actualizado', en: 'Document Updated' },
  'editDoc.backToList': { es: 'Mis documentos', en: 'My Documents' },
  'editDoc.editAgain': { es: 'Editar de nuevo', en: 'Edit again' },

  // Profile
  'profile.title': { es: 'Mi perfil de autonomo', en: 'My Freelancer Profile' },
  'profile.subtitle': { es: 'Tus datos fiscales se rellenaran automaticamente en cada documento', en: 'Your tax details will auto-fill in every document' },
  'profile.add': { es: 'Anadir perfil', en: 'Add profile' },
  'profile.edit': { es: 'Editar perfil', en: 'Edit profile' },
  'profile.new': { es: 'Nuevo perfil de autonomo', en: 'New freelancer profile' },
  'profile.empty.title': { es: 'Sin perfil de autonomo', en: 'No freelancer profile' },
  'profile.empty.desc': { es: 'Anade tu perfil con tus datos fiscales para que se rellenen automaticamente en tus documentos', en: 'Add your profile with tax details to auto-fill in your documents' },
  'profile.empty.cta': { es: 'Crear mi perfil', en: 'Create my profile' },
  'profile.delete.title': { es: 'Eliminar perfil', en: 'Delete Profile' },
  'profile.delete.confirm': { es: '¿Estas seguro de que quieres eliminar este perfil? Esta accion no se puede deshacer.', en: 'Are you sure you want to delete this profile? This action cannot be undone.' },
  'profile.saved': { es: 'Perfil actualizado', en: 'Profile updated' },
  'profile.created': { es: 'Perfil creado', en: 'Profile created' },

  // Contacts
  'contacts.title': { es: 'Contactos', en: 'Contacts' },
  'contacts.subtitle': { es: 'Guarda los datos de tus clientes para reutilizarlos en tus documentos', en: 'Save client details to reuse in your documents' },
  'contacts.add': { es: 'Anadir contacto', en: 'Add contact' },
  'contacts.edit': { es: 'Editar contacto', en: 'Edit contact' },
  'contacts.new': { es: 'Nuevo contacto', en: 'New contact' },
  'contacts.search': { es: 'Buscar por nombre, NIF o email...', en: 'Search by name, NIF or email...' },
  'contacts.empty.title': { es: 'Sin contactos', en: 'No contacts' },
  'contacts.empty.desc': { es: 'Anade a tus clientes para rellenar sus datos automaticamente en contratos y facturas', en: 'Add clients to auto-fill their details in contracts and invoices' },
  'contacts.empty.cta': { es: 'Anadir primer contacto', en: 'Add first contact' },
  'contacts.delete.title': { es: 'Eliminar contacto', en: 'Delete Contact' },
  'contacts.delete.confirm': { es: '¿Estas seguro de que quieres eliminar este contacto? Esta accion no se puede deshacer.', en: 'Are you sure you want to delete this contact? This action cannot be undone.' },
  'contacts.noResults': { es: 'No se encontraron contactos para', en: 'No contacts found for' },
  'contacts.saved': { es: 'Contacto actualizado', en: 'Contact updated' },
  'contacts.created': { es: 'Contacto creado', en: 'Contact created' },

  // Pricing
  'pricing.title': { es: 'Precios claros y sencillos', en: 'Simple, clear pricing' },
  'pricing.subtitle': { es: 'Empieza gratis. Pasa a Pro cuando necesites generar mas documentos.', en: 'Start free. Upgrade to Pro when you need more documents.' },
  'pricing.currentPlan': { es: 'Tu plan actual', en: 'Your current plan' },
  'pricing.free': { es: 'Gratis', en: 'Free' },
  'pricing.forever': { es: 'para siempre', en: 'forever' },
  'pricing.docsPerMonth': { es: 'documentos al mes', en: 'documents per month' },
  'pricing.templateTypes': { es: '6 tipos de plantilla', en: '6 template types' },
  'pricing.pdfDownload': { es: 'Descarga en PDF', en: 'PDF download' },
  'pricing.profileFeature': { es: 'Perfil de autonomo', en: 'Freelancer profile' },
  'pricing.contactsFeature': { es: 'Directorio de contactos', en: 'Contact directory' },
  'pricing.startFree': { es: 'Empezar gratis', en: 'Start free' },
  'pricing.current': { es: 'Plan actual', en: 'Current plan' },
  'pricing.proMonthly': { es: 'Pro Mensual', en: 'Pro Monthly' },
  'pricing.perMonth': { es: 'al mes', en: 'per month' },
  'pricing.unlimited': { es: 'Documentos ilimitados', en: 'Unlimited documents' },
  'pricing.fullHistory': { es: 'Historial completo', en: 'Full history' },
  'pricing.reEdit': { es: 'Re-editar y regenerar', en: 'Re-edit and regenerate' },
  'pricing.customLogo': { es: 'Logo personalizado en PDFs', en: 'Custom logo on PDFs' },
  'pricing.prioritySupport': { es: 'Soporte prioritario', en: 'Priority support' },
  'pricing.subscribe': { es: 'Suscribirme', en: 'Subscribe' },
  'pricing.save': { es: 'Ahorra 33%', en: 'Save 33%' },
  'pricing.proYearly': { es: 'Pro Anual', en: 'Pro Yearly' },
  'pricing.perYear': { es: 'al ano', en: 'per year' },
  'pricing.perMonthShort': { es: '/mes', en: '/mo' },
  'pricing.allMonthly': { es: 'Todo lo del plan mensual', en: 'Everything in monthly plan' },
  'pricing.twoFree': { es: '2 meses gratis', en: '2 months free' },
  'pricing.priceGuarantee': { es: 'Precio garantizado', en: 'Price guaranteed' },
  'pricing.yearlySubscription': { es: 'Suscripcion anual', en: 'Yearly subscription' },
  'pricing.secure': { es: 'Pago seguro con Stripe. Cancela cuando quieras. Sin permanencia.', en: 'Secure payment via Stripe. Cancel anytime. No commitment.' },

  // Common
  'common.cancel': { es: 'Cancelar', en: 'Cancel' },
  'common.delete': { es: 'Eliminar', en: 'Delete' },
  'common.save': { es: 'Guardar cambios', en: 'Save changes' },
  'common.back': { es: 'Volver', en: 'Back' },
  'common.backHome': { es: 'Volver al inicio', en: 'Back to home' },
  'common.termsOfService': { es: 'Condiciones de Uso', en: 'Terms of Service' },
  'common.privacyPolicy': { es: 'Politica de Privacidad', en: 'Privacy Policy' },
  'common.noAddress': { es: 'Sin direccion', en: 'No address' },

  // Footer
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
  'footer.disclaimer': {
    es: 'ContratoYa no es un despacho de abogados y no proporciona asesoramiento juridico. Los documentos generados son plantillas orientativas. Consulte con un abogado colegiado.',
    en: 'ContratoYa is not a law firm and does not provide legal advice. Generated documents are indicative templates. Consult a licensed attorney.',
  },

  // Cookie Banner
  'cookies.message': {
    es: 'Utilizamos cookies esenciales para el funcionamiento de la web y cookies analiticas para mejorar tu experiencia. Puedes aceptar todas o solo las esenciales.',
    en: 'We use essential cookies for the website to function and analytics cookies to improve your experience. You can accept all or only essential ones.',
  },
  'cookies.moreInfo': { es: 'Mas informacion', en: 'More info' },
  'cookies.essential': { es: 'Solo esenciales', en: 'Essential only' },
  'cookies.acceptAll': { es: 'Aceptar todas', en: 'Accept all' },

  // 404
  'notFound.title': { es: 'La pagina que buscas no existe', en: 'The page you\'re looking for doesn\'t exist' },
  'notFound.back': { es: 'Volver al inicio', en: 'Back to home' },

  // Error
  'error.title': { es: 'Algo ha salido mal', en: 'Something went wrong' },
  'error.message': { es: 'Ha ocurrido un error inesperado. Por favor, intentalo de nuevo.', en: 'An unexpected error occurred. Please try again.' },
  'error.reload': { es: 'Recargar pagina', en: 'Reload page' },

  // Questionnaire
  'questionnaire.prev': { es: 'Anterior', en: 'Previous' },
  'questionnaire.next': { es: 'Siguiente', en: 'Next' },
  'questionnaire.generate': { es: 'Generar documento', en: 'Generate document' },
  'questionnaire.required': { es: 'Este campo es obligatorio', en: 'This field is required' },
  'questionnaire.select': { es: 'Seleccionar...', en: 'Select...' },

  // Has to use
  'used': { es: 'Has usado tus', en: "You've used your" },
} as const

export type TranslationKey = keyof typeof translations

export function getTranslation(key: TranslationKey, lang: Language): string {
  const entry = translations[key]
  return entry ? entry[lang] : key
}

export default translations
