export interface FieldConfig {
  name: string
  label: string
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'date' | 'checkbox' | 'currency'
  placeholder?: string
  helperText?: string
  required?: boolean
  options?: { value: string; label: string }[]
  defaultValue?: string | number | boolean
  width?: 'full' | 'half'
  condition?: (formData: Record<string, unknown>) => boolean
}

export interface StepConfig {
  id: string
  title: string
  description?: string
  fields: FieldConfig[]
}

export interface DocumentConfig {
  id: string
  type: string
  label: string
  description: string
  steps: StepConfig[]
  generateTitle: (data: Record<string, unknown>) => string
}
