import type { DocumentConfig } from '@/types/questionnaire'

export const quoteConfig: DocumentConfig = {
  id: 'quote',
  type: 'quote',
  label: 'Presupuesto',
  description: 'Plantilla de propuesta formal con desglose de precios',
  generateTitle: (data) => `Presupuesto - ${data.client_name || 'Sin nombre'}`,
  steps: [
    {
      id: 'provider',
      title: 'Tus datos',
      description: 'Los datos de tu negocio que aparecerán en el presupuesto',
      fields: [
        { name: 'provider_name', label: 'Nombre / Razón social', type: 'text', required: true, width: 'full', placeholder: 'Juan García López' },
        { name: 'provider_nif', label: 'NIF', type: 'text', required: true, width: 'half', placeholder: '12345678A' },
        { name: 'provider_email', label: 'Email', type: 'email', width: 'half', placeholder: 'tu@email.com' },
        { name: 'provider_address', label: 'Dirección', type: 'text', required: true, width: 'full', placeholder: 'Calle Mayor 1, 2ºB, 28001 Madrid' },
        { name: 'provider_phone', label: 'Teléfono', type: 'text', width: 'half', placeholder: '612 345 678' },
      ],
    },
    {
      id: 'client',
      title: 'Datos del cliente',
      description: 'A quién va dirigido el presupuesto',
      fields: [
        { name: 'client_name', label: 'Nombre / Razón social', type: 'text', required: true, width: 'full', placeholder: 'Empresa S.L.' },
        { name: 'client_nif', label: 'NIF/CIF', type: 'text', width: 'half', placeholder: 'B12345678' },
        { name: 'client_email', label: 'Email', type: 'email', width: 'half', placeholder: 'cliente@empresa.com' },
        { name: 'client_address', label: 'Dirección', type: 'text', width: 'full', placeholder: 'Av. de la Constitución 10, 08001 Barcelona' },
      ],
    },
    {
      id: 'details',
      title: 'Detalles del presupuesto',
      description: 'Referencia, fechas y validez',
      fields: [
        { name: 'quote_reference', label: 'Referencia', type: 'text', required: true, width: 'half', placeholder: 'PRES-2026-001' },
        { name: 'quote_date', label: 'Fecha', type: 'date', required: true, width: 'half' },
        { name: 'validity_days', label: 'Validez (días)', type: 'select', required: true, width: 'half', options: [
          { value: '15', label: '15 días' },
          { value: '30', label: '30 días' },
          { value: '60', label: '60 días' },
          { value: '90', label: '90 días' },
        ]},
        { name: 'project_description', label: 'Descripción del proyecto', type: 'textarea', required: true, width: 'full', placeholder: 'Breve descripción del proyecto o servicios propuestos...' },
      ],
    },
    {
      id: 'items',
      title: 'Partidas del presupuesto',
      description: 'Desglose de servicios o productos',
      fields: [
        { name: 'item1_description', label: 'Partida 1 - Descripción', type: 'text', required: true, width: 'full', placeholder: 'Diseño de identidad visual' },
        { name: 'item1_detail', label: 'Detalle', type: 'textarea', width: 'full', placeholder: 'Incluye logo, paleta de colores, tipografías y manual de marca' },
        { name: 'item1_price', label: 'Precio', type: 'currency', required: true, width: 'half', placeholder: '1500.00' },
        { name: 'item2_description', label: 'Partida 2 - Descripción', type: 'text', width: 'full', placeholder: 'Desarrollo web' },
        { name: 'item2_detail', label: 'Detalle', type: 'textarea', width: 'full', placeholder: 'Web responsive de 5 páginas con CMS' },
        { name: 'item2_price', label: 'Precio', type: 'currency', width: 'half', placeholder: '3000.00' },
        { name: 'item3_description', label: 'Partida 3 - Descripción', type: 'text', width: 'full', placeholder: '(opcional)' },
        { name: 'item3_detail', label: 'Detalle', type: 'textarea', width: 'full' },
        { name: 'item3_price', label: 'Precio', type: 'currency', width: 'half' },
        { name: 'item4_description', label: 'Partida 4 - Descripción', type: 'text', width: 'full', placeholder: '(opcional)' },
        { name: 'item4_detail', label: 'Detalle', type: 'textarea', width: 'full' },
        { name: 'item4_price', label: 'Precio', type: 'currency', width: 'half' },
      ],
    },
    {
      id: 'conditions',
      title: 'Condiciones',
      description: 'Impuestos, forma de pago y condiciones adicionales',
      fields: [
        { name: 'iva_rate', label: 'Tipo de IVA', type: 'select', required: true, width: 'half', options: [
          { value: '21', label: '21% (General)' },
          { value: '10', label: '10% (Reducido)' },
          { value: '4', label: '4% (Superreducido)' },
          { value: '0', label: '0% (Exento)' },
        ]},
        { name: 'payment_schedule', label: 'Condiciones de pago', type: 'select', width: 'half', options: [
          { value: 'full_advance', label: '100% por adelantado' },
          { value: 'half_half', label: '50% inicio + 50% entrega' },
          { value: 'thirds', label: '33% inicio + 33% desarrollo + 33% entrega' },
          { value: 'on_delivery', label: '100% a la entrega' },
        ]},
        { name: 'estimated_timeline', label: 'Plazo de ejecución estimado', type: 'text', width: 'half', placeholder: 'Ej: 4-6 semanas' },
        { name: 'additional_conditions', label: 'Condiciones adicionales', type: 'textarea', width: 'full', placeholder: 'Cualquier condición extra que quieras incluir...' },
        { name: 'include_acceptance', label: 'Incluir bloque de aceptación y firma', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}
