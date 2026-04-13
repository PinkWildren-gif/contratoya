import type { DocumentConfig } from '@/types/questionnaire'

export const leaseConfig: DocumentConfig = {
  id: 'lease',
  type: 'lease',
  label: 'Contrato de Alquiler de Local',
  description: 'Plantilla de arrendamiento para local comercial basada en la LAU',
  generateTitle: (data) => `Alquiler - ${data.property_address || 'Sin dirección'}`,
  steps: [
    {
      id: 'landlord',
      title: 'Datos del arrendador (propietario)',
      description: 'Quien cede el local en alquiler',
      fields: [
        { name: 'landlord_name', label: 'Nombre completo / Razón social', type: 'text', required: true, width: 'full', placeholder: 'María Fernández Ruiz' },
        { name: 'landlord_nif', label: 'NIF/CIF', type: 'text', required: true, width: 'half', placeholder: '12345678A' },
        { name: 'landlord_address', label: 'Domicilio', type: 'text', required: true, width: 'full', placeholder: 'Calle del Arco 5, 28005 Madrid' },
        { name: 'landlord_phone', label: 'Teléfono', type: 'text', width: 'half', placeholder: '612 345 678' },
        { name: 'landlord_email', label: 'Email', type: 'email', width: 'half', placeholder: 'propietario@email.com' },
      ],
    },
    {
      id: 'tenant',
      title: 'Datos del arrendatario (inquilino)',
      description: 'Quien alquila el local',
      fields: [
        { name: 'tenant_name', label: 'Nombre completo / Razón social', type: 'text', required: true, width: 'full', placeholder: 'Empresa S.L.' },
        { name: 'tenant_nif', label: 'NIF/CIF', type: 'text', required: true, width: 'half', placeholder: 'B12345678' },
        { name: 'tenant_address', label: 'Domicilio actual', type: 'text', required: true, width: 'full', placeholder: 'Av. de la Constitución 10, 08001 Barcelona' },
        { name: 'tenant_phone', label: 'Teléfono', type: 'text', width: 'half', placeholder: '611 222 333' },
        { name: 'tenant_email', label: 'Email', type: 'email', width: 'half', placeholder: 'inquilino@empresa.com' },
      ],
    },
    {
      id: 'property',
      title: 'Datos del inmueble',
      description: 'Identificación del local comercial',
      fields: [
        { name: 'property_address', label: 'Dirección del local', type: 'text', required: true, width: 'full', placeholder: 'Calle Gran Vía 22, Local 3, 28013 Madrid' },
        { name: 'property_registry', label: 'Referencia catastral', type: 'text', width: 'half', placeholder: '1234567AB1234N0001XX' },
        { name: 'property_area', label: 'Superficie (m²)', type: 'number', width: 'half', placeholder: '85' },
        { name: 'permitted_use', label: 'Uso permitido', type: 'text', required: true, width: 'full', placeholder: 'Ej: Oficina, comercio minorista, restauración...' },
        { name: 'property_condition', label: 'Estado del local', type: 'select', width: 'half', options: [
          { value: 'good', label: 'Buen estado' },
          { value: 'needs_reform', label: 'Necesita reforma' },
          { value: 'new', label: 'Obra nueva / recién reformado' },
        ]},
      ],
    },
    {
      id: 'terms',
      title: 'Condiciones económicas',
      description: 'Renta, fianza y duración del contrato',
      fields: [
        { name: 'monthly_rent', label: 'Renta mensual (sin IVA)', type: 'currency', required: true, width: 'half', placeholder: '1200.00' },
        { name: 'rent_iva', label: 'IVA sobre la renta', type: 'select', required: true, width: 'half', options: [
          { value: '21', label: '21% (General)' },
          { value: '0', label: 'Exento de IVA' },
        ]},
        { name: 'deposit_months', label: 'Fianza (meses)', type: 'select', required: true, width: 'half', options: [
          { value: '2', label: '2 meses (mínimo legal para uso distinto de vivienda)' },
          { value: '3', label: '3 meses' },
          { value: '4', label: '4 meses' },
          { value: '6', label: '6 meses' },
        ]},
        { name: 'payment_day', label: 'Día de pago mensual', type: 'select', width: 'half', options: [
          { value: '1', label: 'Día 1 de cada mes' },
          { value: '5', label: 'Día 5 de cada mes' },
          { value: '10', label: 'Día 10 de cada mes' },
          { value: '15', label: 'Día 15 de cada mes' },
        ]},
        { name: 'start_date', label: 'Fecha de inicio', type: 'date', required: true, width: 'half' },
        { name: 'duration_years', label: 'Duración', type: 'select', required: true, width: 'half', options: [
          { value: '1', label: '1 año' },
          { value: '2', label: '2 años' },
          { value: '3', label: '3 años' },
          { value: '5', label: '5 años' },
          { value: '10', label: '10 años' },
        ]},
        { name: 'annual_update', label: 'Actualización anual de renta', type: 'select', width: 'half', options: [
          { value: 'ipc', label: 'Según IPC' },
          { value: 'irav', label: 'Según IRAV (Índice de Referencia de Arrendamientos)' },
          { value: 'fixed', label: 'Porcentaje fijo' },
          { value: 'none', label: 'Sin actualización' },
        ]},
      ],
    },
    {
      id: 'clauses',
      title: 'Cláusulas adicionales',
      description: 'Obras, subarriendo y otras condiciones',
      fields: [
        { name: 'allow_reforms', label: 'Permitir obras de acondicionamiento por el inquilino', type: 'checkbox', defaultValue: true },
        { name: 'allow_sublease', label: 'Permitir subarriendo (total o parcial)', type: 'checkbox' },
        { name: 'maintenance_responsibility', label: 'Mantenimiento y reparaciones menores', type: 'select', width: 'full', options: [
          { value: 'tenant', label: 'A cargo del arrendatario' },
          { value: 'landlord', label: 'A cargo del arrendador' },
          { value: 'shared', label: 'Compartido según naturaleza de la reparación' },
        ]},
        { name: 'early_termination_months', label: 'Preaviso para rescisión anticipada (meses)', type: 'select', width: 'half', options: [
          { value: '1', label: '1 mes' },
          { value: '2', label: '2 meses' },
          { value: '3', label: '3 meses' },
          { value: '6', label: '6 meses' },
        ]},
        { name: 'jurisdiction_city', label: 'Ciudad de jurisdicción', type: 'text', width: 'half', placeholder: 'Madrid', required: true },
      ],
    },
  ],
}
