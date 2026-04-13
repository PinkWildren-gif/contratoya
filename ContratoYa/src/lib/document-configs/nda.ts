import type { DocumentConfig } from '@/types/questionnaire'

export const ndaConfig: DocumentConfig = {
  id: 'nda',
  type: 'nda',
  label: 'Acuerdo de Confidencialidad (NDA)',
  description: 'Plantilla de NDA para proteger informacion confidencial',
  generateTitle: (data) => `NDA - ${data.receiving_party_name || 'Sin nombre'}`,
  steps: [
    {
      id: 'type',
      title: 'Tipo de acuerdo',
      description: 'Selecciona el tipo de NDA y sus parámetros básicos',
      fields: [
        { name: 'nda_type', label: 'Tipo de NDA', type: 'select', required: true, width: 'full', options: [
          { value: 'unilateral', label: 'Unilateral (tú compartes información confidencial)' },
          { value: 'mutual', label: 'Mutuo (ambas partes comparten información)' },
        ]},
        { name: 'effective_date', label: 'Fecha de entrada en vigor', type: 'date', required: true, width: 'half' },
        { name: 'duration_years', label: 'Duración de la obligación (años)', type: 'select', required: true, width: 'half', options: [
          { value: '1', label: '1 año' },
          { value: '2', label: '2 años' },
          { value: '3', label: '3 años' },
          { value: '5', label: '5 años' },
          { value: '10', label: '10 años' },
        ]},
      ],
    },
    {
      id: 'disclosing',
      title: 'Parte reveladora (tú)',
      description: 'La parte que comparte la información confidencial',
      fields: [
        { name: 'disclosing_party_name', label: 'Nombre completo / Razón social', type: 'text', required: true, width: 'full', placeholder: 'Juan García López' },
        { name: 'disclosing_party_nif', label: 'NIF/CIF', type: 'text', required: true, width: 'half', placeholder: '12345678A' },
        { name: 'disclosing_party_address', label: 'Domicilio', type: 'text', required: true, width: 'full', placeholder: 'Calle Mayor 1, 2ºB, 28001 Madrid' },
      ],
    },
    {
      id: 'receiving',
      title: 'Parte receptora',
      description: 'La persona o empresa que recibirá la información confidencial',
      fields: [
        { name: 'receiving_party_name', label: 'Nombre completo / Razón social', type: 'text', required: true, width: 'full', placeholder: 'Empresa S.L.' },
        { name: 'receiving_party_nif', label: 'NIF/CIF', type: 'text', required: true, width: 'half', placeholder: 'B12345678' },
        { name: 'receiving_party_address', label: 'Domicilio', type: 'text', required: true, width: 'full', placeholder: 'Av. de la Constitución 10, 08001 Barcelona' },
      ],
    },
    {
      id: 'scope',
      title: 'Alcance y definiciones',
      description: 'Qué se considera información confidencial',
      fields: [
        { name: 'purpose', label: 'Propósito del acuerdo', type: 'textarea', required: true, width: 'full', placeholder: 'Explorar una posible colaboración comercial para el desarrollo de...' },
        { name: 'confidential_info_description', label: 'Descripción de la información confidencial', type: 'textarea', required: true, width: 'full', placeholder: 'Incluye pero no se limita a: planes de negocio, datos de clientes, código fuente, estrategias comerciales, información financiera...' },
        { name: 'permitted_disclosures', label: 'Divulgaciones permitidas', type: 'select', width: 'full', options: [
          { value: 'employees', label: 'Solo empleados directamente involucrados' },
          { value: 'employees_advisors', label: 'Empleados y asesores profesionales (abogados, contables)' },
          { value: 'none', label: 'Ninguna (solo la parte receptora)' },
        ]},
      ],
    },
    {
      id: 'consequences',
      title: 'Consecuencias y jurisdicción',
      description: 'Qué ocurre en caso de incumplimiento',
      fields: [
        { name: 'include_penalty', label: 'Incluir cláusula de penalización económica', type: 'checkbox' },
        { name: 'penalty_amount', label: 'Importe de la penalización', type: 'currency', width: 'half', placeholder: '10000', condition: (data) => data.include_penalty === true },
        { name: 'return_or_destroy', label: 'Al finalizar, la información debe ser:', type: 'select', required: true, width: 'full', options: [
          { value: 'return', label: 'Devuelta a la parte reveladora' },
          { value: 'destroy', label: 'Destruida por la parte receptora' },
          { value: 'both', label: 'Devuelta o destruida (a elección de la parte reveladora)' },
        ]},
        { name: 'jurisdiction_city', label: 'Ciudad de jurisdicción', type: 'text', width: 'half', placeholder: 'Madrid', required: true },
      ],
    },
  ],
}
