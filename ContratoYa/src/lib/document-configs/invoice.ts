import type { DocumentConfig } from '@/types/questionnaire'

export const invoiceConfig: DocumentConfig = {
  id: 'invoice',
  type: 'invoice',
  label: 'Factura',
  description: 'Plantilla de factura con campos de IVA e IRPF',
  generateTitle: (data) => `Factura ${data.invoice_number || ''}`,
  steps: [
    {
      id: 'emitter',
      title: 'Tus datos (emisor)',
      description: 'Los datos de tu negocio que aparecerán en la factura',
      fields: [
        { name: 'emitter_name', label: 'Nombre / Razón social', type: 'text', required: true, width: 'full', placeholder: 'Juan García López' },
        { name: 'emitter_nif', label: 'NIF', type: 'text', required: true, width: 'half', placeholder: '12345678A' },
        { name: 'emitter_email', label: 'Email', type: 'email', width: 'half', placeholder: 'tu@email.com' },
        { name: 'emitter_address', label: 'Dirección', type: 'text', required: true, width: 'full', placeholder: 'Calle Mayor 1, 2ºB' },
        { name: 'emitter_city', label: 'Ciudad', type: 'text', required: true, width: 'half', placeholder: 'Madrid' },
        { name: 'emitter_postal_code', label: 'Código postal', type: 'text', required: true, width: 'half', placeholder: '28001' },
        { name: 'emitter_phone', label: 'Teléfono', type: 'text', width: 'half', placeholder: '612 345 678' },
        { name: 'emitter_iae', label: 'Actividad IAE', type: 'text', width: 'half', placeholder: 'Ej: 861' },
      ],
    },
    {
      id: 'client',
      title: 'Datos del cliente',
      description: 'Los datos del destinatario de la factura',
      fields: [
        { name: 'client_name', label: 'Nombre / Razón social', type: 'text', required: true, width: 'full', placeholder: 'Empresa S.L.' },
        { name: 'client_nif', label: 'NIF/CIF', type: 'text', required: true, width: 'half', placeholder: 'B12345678' },
        { name: 'client_email', label: 'Email', type: 'email', width: 'half', placeholder: 'cliente@empresa.com' },
        { name: 'client_address', label: 'Dirección', type: 'text', required: true, width: 'full', placeholder: 'Av. de la Constitución 10' },
        { name: 'client_city', label: 'Ciudad', type: 'text', required: true, width: 'half', placeholder: 'Barcelona' },
        { name: 'client_postal_code', label: 'Código postal', type: 'text', required: true, width: 'half', placeholder: '08001' },
      ],
    },
    {
      id: 'invoice_details',
      title: 'Detalles de la factura',
      description: 'Número, fecha y condiciones de pago',
      fields: [
        { name: 'invoice_number', label: 'Número de factura', type: 'text', required: true, width: 'half', placeholder: 'FAC-2026-001' },
        { name: 'invoice_date', label: 'Fecha de emisión', type: 'date', required: true, width: 'half' },
        { name: 'due_date', label: 'Fecha de vencimiento', type: 'date', width: 'half' },
        { name: 'payment_method', label: 'Forma de pago', type: 'select', required: true, width: 'half', options: [
          { value: 'transfer', label: 'Transferencia bancaria' },
          { value: 'cash', label: 'Efectivo' },
          { value: 'card', label: 'Tarjeta' },
          { value: 'paypal', label: 'PayPal' },
          { value: 'other', label: 'Otro' },
        ]},
        { name: 'bank_account', label: 'IBAN / Cuenta bancaria', type: 'text', width: 'full', placeholder: 'ES12 1234 5678 9012 3456 7890', helperText: 'Aparecerá en la factura si la forma de pago es transferencia' },
      ],
    },
    {
      id: 'items',
      title: 'Conceptos',
      description: 'Descripción y precio de los servicios o productos facturados',
      fields: [
        { name: 'item1_description', label: 'Concepto 1 - Descripción', type: 'text', required: true, width: 'full', placeholder: 'Diseño de página web corporativa' },
        { name: 'item1_quantity', label: 'Cantidad', type: 'number', required: true, width: 'half', placeholder: '1', defaultValue: 1 },
        { name: 'item1_price', label: 'Precio unitario', type: 'currency', required: true, width: 'half', placeholder: '1500.00' },
        { name: 'item2_description', label: 'Concepto 2 - Descripción', type: 'text', width: 'full', placeholder: 'Mantenimiento mensual (opcional)' },
        { name: 'item2_quantity', label: 'Cantidad', type: 'number', width: 'half', placeholder: '1' },
        { name: 'item2_price', label: 'Precio unitario', type: 'currency', width: 'half', placeholder: '200.00' },
        { name: 'item3_description', label: 'Concepto 3 - Descripción', type: 'text', width: 'full', placeholder: '(opcional)' },
        { name: 'item3_quantity', label: 'Cantidad', type: 'number', width: 'half' },
        { name: 'item3_price', label: 'Precio unitario', type: 'currency', width: 'half' },
      ],
    },
    {
      id: 'taxes',
      title: 'Impuestos y notas',
      description: 'Configuración de IVA e IRPF',
      fields: [
        { name: 'iva_rate', label: 'Tipo de IVA', type: 'select', required: true, width: 'half', options: [
          { value: '21', label: '21% (General)' },
          { value: '10', label: '10% (Reducido)' },
          { value: '4', label: '4% (Superreducido)' },
          { value: '0', label: '0% (Exento)' },
        ]},
        { name: 'apply_irpf', label: 'Aplicar retención de IRPF', type: 'checkbox', width: 'half', defaultValue: true },
        { name: 'irpf_rate', label: 'Tipo de IRPF', type: 'select', width: 'half', options: [
          { value: '15', label: '15% (General)' },
          { value: '7', label: '7% (Nuevo autónomo, primeros 3 años)' },
        ], condition: (data) => data.apply_irpf === true },
        { name: 'notes', label: 'Notas adicionales', type: 'textarea', width: 'full', placeholder: 'Observaciones que aparecerán al pie de la factura...' },
      ],
    },
  ],
}
