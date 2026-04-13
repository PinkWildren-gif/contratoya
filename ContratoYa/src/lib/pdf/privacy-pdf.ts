import jsPDF from 'jspdf'
import { MARGIN, COLORS, CONTENT_WIDTH, PAGE_WIDTH, addFooter, formatDate } from './helpers'

function addSection(doc: jsPDF, y: number, title: string, body: string): number {
  if (y > 255) { doc.addPage(); y = MARGIN }

  doc.setFontSize(11)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text(title, MARGIN, y)
  y += 6

  doc.setFontSize(8.5)
  doc.setTextColor(...COLORS.black)
  doc.setFont('helvetica', 'normal')
  const lines = doc.splitTextToSize(body, CONTENT_WIDTH)
  doc.text(lines, MARGIN, y)
  y += lines.length * 4 + 6

  return y
}

export function generatePrivacyPdf(data: Record<string, unknown>): jsPDF {
  const doc = new jsPDF()
  let y = MARGIN

  // --- PRIVACY POLICY ---
  doc.setFontSize(18)
  doc.setTextColor(...COLORS.navy)
  doc.setFont('helvetica', 'bold')
  doc.text('POLÍTICA DE PRIVACIDAD', MARGIN, y + 5)
  y += 10
  doc.setDrawColor(...COLORS.green)
  doc.setLineWidth(1)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 6

  doc.setFontSize(8)
  doc.setTextColor(...COLORS.gray)
  doc.text(`Última actualización: ${formatDate(String(data.last_updated || ''))}`, MARGIN, y)
  doc.text(String(data.website_url || ''), PAGE_WIDTH - MARGIN, y, { align: 'right' })
  y += 10

  // 1. Responsible
  y = addSection(doc, y, '1. RESPONSABLE DEL TRATAMIENTO',
    `Identidad: ${data.business_name || '[nombre]'}\nNIF/CIF: ${data.business_nif || '[NIF]'}\nDomicilio: ${data.business_address || '[dirección]'}\nEmail: ${data.business_email || '[email]'}${data.business_phone ? `\nTeléfono: ${data.business_phone}` : ''}${data.website_url ? `\nWeb: ${data.website_url}` : ''}${data.has_dpo && data.dpo_email ? `\nDelegado de Protección de Datos (DPO): ${data.dpo_email}` : ''}`)

  // 2. Data collected
  const dataTypes: string[] = []
  if (data.collects_contact_forms) dataTypes.push('Datos de contacto (nombre, email, teléfono, mensaje) a través de formularios.')
  if (data.collects_newsletter) dataTypes.push('Dirección de email para envío de comunicaciones comerciales y newsletter.')
  if (data.collects_user_accounts) dataTypes.push('Datos de registro de cuenta (nombre, email, contraseña cifrada).')
  if (data.collects_ecommerce) dataTypes.push('Datos de facturación y envío (nombre, dirección, NIF/CIF, datos de pago).')
  if (data.collects_analytics) dataTypes.push('Datos de navegación y analítica web (páginas visitadas, duración, dispositivo, IP anonimizada).')
  if (data.additional_data) dataTypes.push(String(data.additional_data))

  y = addSection(doc, y, '2. DATOS QUE RECOGEMOS',
    `En el ejercicio de nuestra actividad, tratamos los siguientes datos personales:\n\n${dataTypes.map(d => `• ${d}`).join('\n')}`)

  // 3. Purpose
  y = addSection(doc, y, '3. FINALIDAD DEL TRATAMIENTO',
    `Los datos personales recogidos serán tratados con las siguientes finalidades:\n\n• Gestionar la relación contractual o precontractual con el usuario.\n• Atender consultas y solicitudes de información.\n${data.collects_newsletter ? '• Enviar comunicaciones comerciales sobre productos y servicios (previo consentimiento).\n' : ''}${data.collects_ecommerce ? '• Procesar pedidos, pagos y envíos.\n' : ''}${data.collects_analytics ? '• Analizar el uso de la web para mejorar nuestros servicios.\n' : ''}• Cumplir con las obligaciones legales aplicables.`)

  // 4. Legal basis
  const basisText: Record<string, string> = {
    consent: 'El consentimiento del interesado, otorgado de forma libre, específica, informada e inequívoca.',
    contract: 'La ejecución de un contrato en el que el interesado es parte, o la aplicación de medidas precontractuales.',
    legitimate: 'El interés legítimo del responsable del tratamiento, siempre que no prevalezcan los intereses o derechos y libertades fundamentales del interesado.',
    legal: 'El cumplimiento de una obligación legal aplicable al responsable del tratamiento.',
  }
  y = addSection(doc, y, '4. BASE LEGAL',
    `El tratamiento de sus datos está legitimado por:\n\n${basisText[String(data.legal_basis)] || basisText.consent}\n\nConforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD).`)

  // 5. Retention
  const retentionText: Record<string, string> = {
    while_needed: 'Los datos se conservarán mientras sean necesarios para la finalidad para la que fueron recogidos, y posteriormente durante los plazos legales aplicables.',
    '1year': 'Los datos se conservarán durante un período máximo de 1 año desde su recogida.',
    '2years': 'Los datos se conservarán durante un período máximo de 2 años desde su recogida.',
    '5years': 'Los datos se conservarán durante 5 años para cumplir con las obligaciones fiscales y contables.',
    until_revoked: 'Los datos se conservarán hasta que el usuario revoque su consentimiento.',
  }
  y = addSection(doc, y, '5. CONSERVACIÓN DE DATOS',
    retentionText[String(data.data_retention)] || retentionText.while_needed)

  // 6. Third parties
  if (data.shares_with_third_parties) {
    y = addSection(doc, y, '6. DESTINATARIOS DE LOS DATOS',
      `Sus datos podrán ser comunicados a los siguientes terceros:\n\n${data.third_parties_description || '[Describir terceros]'}\n\nEstos terceros actúan como encargados del tratamiento y están obligados contractualmente a tratar los datos conforme al RGPD.${data.international_transfers ? '\n\nAlgunos de estos proveedores pueden estar ubicados fuera del Espacio Económico Europeo. En tales casos, las transferencias se realizan al amparo de decisiones de adecuación de la Comisión Europea o mediante cláusulas contractuales tipo.' : ''}`)
  }

  // 7. User rights
  y = addSection(doc, y, data.shares_with_third_parties ? '7. DERECHOS DEL USUARIO' : '6. DERECHOS DEL USUARIO',
    `Usted tiene derecho a:\n\n• Acceso: conocer qué datos personales tratamos sobre usted.\n• Rectificación: solicitar la corrección de datos inexactos o incompletos.\n• Supresión: solicitar la eliminación de sus datos cuando ya no sean necesarios.\n• Oposición: oponerse al tratamiento de sus datos en determinadas circunstancias.\n• Limitación: solicitar la limitación del tratamiento en ciertos casos.\n• Portabilidad: recibir sus datos en un formato estructurado y de uso común.\n• Retirada del consentimiento: retirar su consentimiento en cualquier momento.\n\nPara ejercer estos derechos, contacte con nosotros en: ${data.business_email || '[email]'}\n\nTambién tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en www.aepd.es.`)

  // Cookie policy
  if (data.include_cookie_policy) {
    if (y > 200) { doc.addPage(); y = MARGIN }

    y += 4
    doc.setFontSize(15)
    doc.setTextColor(...COLORS.navy)
    doc.setFont('helvetica', 'bold')
    doc.text('POLÍTICA DE COOKIES', MARGIN, y)
    y += 4
    doc.setDrawColor(...COLORS.green)
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
    y += 10

    y = addSection(doc, y, '¿QUÉ SON LAS COOKIES?',
      'Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo. Permiten que el sitio recuerde sus acciones y preferencias durante un período de tiempo.')

    const cookieTypes: string[] = []
    if (data.uses_technical_cookies) cookieTypes.push('Cookies técnicas: necesarias para el funcionamiento básico de la web. No requieren consentimiento.')
    if (data.uses_analytics_cookies) cookieTypes.push('Cookies analíticas: permiten medir y analizar el tráfico y uso de la web (ej. Google Analytics).')
    if (data.uses_marketing_cookies) cookieTypes.push('Cookies de marketing: se utilizan para rastrear visitantes en los sitios web con el fin de mostrar anuncios relevantes.')
    if (data.uses_social_cookies) cookieTypes.push('Cookies de redes sociales: permiten integrar funcionalidades de redes sociales (botones de compartir, widgets).')

    y = addSection(doc, y, 'COOKIES QUE UTILIZAMOS',
      `${cookieTypes.map(c => `• ${c}`).join('\n')}`)

    y = addSection(doc, y, 'GESTIÓN DE COOKIES',
      `Puede configurar su navegador para rechazar las cookies o para recibir un aviso cuando se envíen. Sin embargo, si rechaza las cookies, es posible que algunas funcionalidades de la web no estén disponibles.${data.cookie_consent_tool ? `\n\nUtilizamos ${data.cookie_consent_tool} como herramienta de gestión de consentimiento de cookies.` : ''}`)
  }

  // Legal notice
  if (data.include_legal_notice) {
    if (y > 200) { doc.addPage(); y = MARGIN }

    y += 4
    doc.setFontSize(15)
    doc.setTextColor(...COLORS.navy)
    doc.setFont('helvetica', 'bold')
    doc.text('AVISO LEGAL', MARGIN, y)
    y += 4
    doc.setDrawColor(...COLORS.green)
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
    y += 10

    y = addSection(doc, y, 'IDENTIFICACIÓN DEL TITULAR',
      `En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE):\n\nTitular: ${data.business_name || '[nombre]'}\nNIF/CIF: ${data.business_nif || '[NIF]'}\nDomicilio: ${data.business_address || '[dirección]'}\nEmail: ${data.business_email || '[email]'}${data.registry_info ? `\n${data.registry_info}` : ''}`)

    y = addSection(doc, y, 'PROPIEDAD INTELECTUAL',
      `Todos los contenidos del sitio web ${data.website_url || ''}, incluyendo textos, imágenes, gráficos, logotipos, iconos, software y cualquier otro material, están protegidos por la legislación de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa del titular.`)

    y = addSection(doc, y, 'LIMITACIÓN DE RESPONSABILIDAD',
      'El titular no se hace responsable de los daños que pudieran derivarse del uso de la web, ni de la información contenida en ella. Tampoco garantiza la ausencia de virus u otros elementos que puedan alterar el sistema informático del usuario.')

    y = addSection(doc, y, 'LEGISLACIÓN APLICABLE',
      'El presente aviso legal se rige por la legislación española. Para cualquier controversia derivada del uso de este sitio web, serán competentes los Juzgados y Tribunales del domicilio del titular.')
  }

  addFooter(doc)
  return doc
}
