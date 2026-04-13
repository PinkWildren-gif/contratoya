import type { DocumentConfig } from '@/types/questionnaire'

export const serviceContractConfig: DocumentConfig = {
  id: 'service_contract',
  type: 'service_contract',
  label: 'Contrato de Prestación de Servicios',
  description: 'Plantilla de contrato entre autonomo y cliente para servicios profesionales',
  generateTitle: (data) => `Contrato - ${data.client_name || 'Sin nombre'}`,
  steps: [
    {
      id: 'provider',
      title: 'Datos del prestador (tú)',
      description: 'Tus datos como profesional que presta los servicios',
      fields: [
        { name: 'provider_name', label: 'Nombre completo', type: 'text', required: true, width: 'full', placeholder: 'Juan García López' },
        { name: 'provider_nif', label: 'NIF', type: 'text', required: true, width: 'half', placeholder: '12345678A' },
        { name: 'provider_address', label: 'Domicilio', type: 'text', required: true, width: 'full', placeholder: 'Calle Mayor 1, 2ºB, 28001 Madrid' },
        { name: 'provider_email', label: 'Email', type: 'email', width: 'half', placeholder: 'tu@email.com' },
        { name: 'provider_phone', label: 'Teléfono', type: 'text', width: 'half', placeholder: '612 345 678' },
      ],
    },
    {
      id: 'client',
      title: 'Datos del cliente',
      description: 'La persona o empresa que contrata tus servicios',
      fields: [
        { name: 'client_name', label: 'Nombre / Razón social', type: 'text', required: true, width: 'full', placeholder: 'Empresa S.L.' },
        { name: 'client_nif', label: 'NIF/CIF', type: 'text', required: true, width: 'half', placeholder: 'B12345678' },
        { name: 'client_address', label: 'Domicilio', type: 'text', required: true, width: 'full', placeholder: 'Av. de la Constitución 10, 08001 Barcelona' },
        { name: 'client_representative', label: 'Representante legal', type: 'text', width: 'half', placeholder: 'Nombre del representante (si es empresa)' },
        { name: 'client_email', label: 'Email', type: 'email', width: 'half', placeholder: 'cliente@empresa.com' },
      ],
    },
    {
      id: 'services',
      title: 'Servicios a prestar',
      description: 'Describe el trabajo que vas a realizar',
      fields: [
        { name: 'service_description', label: 'Descripción de los servicios', type: 'textarea', required: true, width: 'full', placeholder: 'Diseño y desarrollo de página web corporativa responsive, incluyendo...' },
        { name: 'deliverables', label: 'Entregables', type: 'textarea', width: 'full', placeholder: 'Lista de entregables concretos:\n- Diseño mockups\n- Desarrollo frontend\n- Manual de uso' },
        { name: 'start_date', label: 'Fecha de inicio', type: 'date', required: true, width: 'half' },
        { name: 'end_date', label: 'Fecha de finalización', type: 'date', width: 'half' },
        { name: 'work_location', label: 'Lugar de prestación', type: 'select', width: 'half', options: [
          { value: 'remote', label: 'Remoto / Teletrabajo' },
          { value: 'client', label: 'En las instalaciones del cliente' },
          { value: 'provider', label: 'En el domicilio del prestador' },
          { value: 'mixed', label: 'Mixto' },
        ]},
      ],
    },
    {
      id: 'payment',
      title: 'Condiciones económicas',
      description: 'Precio, forma y plazos de pago',
      fields: [
        { name: 'total_price', label: 'Precio total (sin IVA)', type: 'currency', required: true, width: 'half', placeholder: '3000.00' },
        { name: 'payment_schedule', label: 'Forma de pago', type: 'select', required: true, width: 'half', options: [
          { value: 'single', label: 'Pago único al finalizar' },
          { value: 'advance', label: '50% anticipo + 50% al finalizar' },
          { value: 'monthly', label: 'Pagos mensuales' },
          { value: 'milestones', label: 'Por hitos/entregables' },
        ]},
        { name: 'payment_method', label: 'Método de pago', type: 'select', width: 'half', options: [
          { value: 'transfer', label: 'Transferencia bancaria' },
          { value: 'cash', label: 'Efectivo' },
          { value: 'other', label: 'Otro' },
        ]},
        { name: 'payment_term_days', label: 'Plazo de pago (días)', type: 'number', width: 'half', placeholder: '30', helperText: 'Días desde la emisión de la factura' },
      ],
    },
    {
      id: 'clauses',
      title: 'Cláusulas adicionales',
      description: 'Selecciona las cláusulas que aplican a tu contrato',
      fields: [
        { name: 'ip_assignment', label: 'Propiedad intelectual', type: 'select', required: true, width: 'full', options: [
          { value: 'full_transfer', label: 'Cesión total al cliente tras el pago' },
          { value: 'license', label: 'Licencia de uso (el prestador retiene la propiedad)' },
          { value: 'shared', label: 'Propiedad compartida' },
        ]},
        { name: 'include_confidentiality', label: 'Incluir cláusula de confidencialidad', type: 'checkbox', defaultValue: true },
        { name: 'include_gdpr', label: 'Incluir cláusula de protección de datos (RGPD)', type: 'checkbox', defaultValue: true, helperText: 'Recomendado si manejarás datos personales del cliente o sus usuarios' },
        { name: 'include_non_compete', label: 'Incluir cláusula de no competencia', type: 'checkbox' },
        { name: 'non_compete_months', label: 'Duración de no competencia (meses)', type: 'number', width: 'half', placeholder: '6', condition: (data) => data.include_non_compete === true },
        { name: 'penalty_clause', label: 'Incluir cláusula de penalización por retraso', type: 'checkbox' },
        { name: 'jurisdiction_city', label: 'Ciudad de jurisdicción', type: 'text', width: 'half', placeholder: 'Madrid', helperText: 'Juzgados competentes en caso de disputa' },
      ],
    },
  ],
}
