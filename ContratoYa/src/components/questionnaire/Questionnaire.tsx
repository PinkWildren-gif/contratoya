import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import type { DocumentConfig, FieldConfig } from '@/types/questionnaire'
import { ChevronLeft, ChevronRight, FileDown } from 'lucide-react'

interface QuestionnaireProps {
  config: DocumentConfig
  initialData?: Record<string, unknown>
  onComplete: (data: Record<string, unknown>) => void
  loading?: boolean
}

function StepIndicator({ steps, currentStep }: { steps: { id: string; title: string }[]; currentStep: number }) {
  return (
    <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            index === currentStep
              ? 'bg-success-500 text-white font-medium'
              : index < currentStep
                ? 'bg-success-100 text-success-700'
                : 'bg-gray-100 text-gray-400'
          }`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${
              index === currentStep ? 'border-white' : index < currentStep ? 'border-success-500' : 'border-gray-300'
            }`}>
              {index + 1}
            </span>
            <span className="hidden sm:inline">{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-6 h-0.5 mx-1 ${index < currentStep ? 'bg-success-300' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function renderField(
  field: FieldConfig,
  value: unknown,
  onChange: (name: string, value: unknown) => void,
  errors: Record<string, string>
) {
  const commonProps = {
    label: field.label + (field.required ? ' *' : ''),
    error: errors[field.name],
    helperText: field.helperText,
  }

  switch (field.type) {
    case 'textarea':
      return (
        <div className="space-y-1" key={field.name}>
          <label className="block text-sm font-medium text-navy-700">
            {field.label}{field.required ? ' *' : ''}
          </label>
          <textarea
            value={(value as string) || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={`input-field ${errors[field.name] ? 'border-red-500' : ''}`}
          />
          {errors[field.name] && <p className="text-sm text-red-600">{errors[field.name]}</p>}
          {field.helperText && !errors[field.name] && <p className="text-sm text-gray-500">{field.helperText}</p>}
        </div>
      )

    case 'select':
      return (
        <div className="space-y-1" key={field.name}>
          <label className="block text-sm font-medium text-navy-700">
            {field.label}{field.required ? ' *' : ''}
          </label>
          <select
            value={(value as string) || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={`input-field ${errors[field.name] ? 'border-red-500' : ''}`}
          >
            <option value="">Seleccionar...</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors[field.name] && <p className="text-sm text-red-600">{errors[field.name]}</p>}
        </div>
      )

    case 'checkbox':
      return (
        <div className="flex items-center gap-3" key={field.name}>
          <input
            type="checkbox"
            id={field.name}
            checked={(value as boolean) || false}
            onChange={(e) => onChange(field.name, e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-success-500 focus:ring-success-500"
          />
          <label htmlFor={field.name} className="text-sm text-navy-700">{field.label}</label>
        </div>
      )

    case 'currency':
      return (
        <div className="space-y-1" key={field.name}>
          <label className="block text-sm font-medium text-navy-700">
            {field.label}{field.required ? ' *' : ''}
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="0"
              value={(value as number) ?? ''}
              onChange={(e) => onChange(field.name, e.target.value ? parseFloat(e.target.value) : '')}
              placeholder={field.placeholder}
              className={`input-field pr-10 ${errors[field.name] ? 'border-red-500' : ''}`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">&euro;</span>
          </div>
          {errors[field.name] && <p className="text-sm text-red-600">{errors[field.name]}</p>}
          {field.helperText && !errors[field.name] && <p className="text-sm text-gray-500">{field.helperText}</p>}
        </div>
      )

    default:
      return (
        <Input
          key={field.name}
          {...commonProps}
          type={field.type}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
        />
      )
  }
}

export function Questionnaire({ config, initialData, onComplete, loading }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const defaults: Record<string, unknown> = {}
    for (const step of config.steps) {
      for (const field of step.fields) {
        if (field.defaultValue !== undefined) {
          defaults[field.name] = field.defaultValue
        }
      }
    }
    return { ...defaults, ...initialData }
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const step = config.steps[currentStep]
  const isLastStep = currentStep === config.steps.length - 1
  const visibleFields = step.fields.filter((f) => !f.condition || f.condition(formData))

  const handleChange = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    for (const field of visibleFields) {
      if (field.required) {
        const val = formData[field.name]
        if (val === undefined || val === null || val === '' || (typeof val === 'string' && !val.trim())) {
          newErrors[field.name] = 'Este campo es obligatorio'
        }
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep()) return
    if (isLastStep) {
      onComplete(formData)
    } else {
      setCurrentStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((s) => Math.max(0, s - 1))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <StepIndicator steps={config.steps} currentStep={currentStep} />

      <Card padding="lg">
        <h2 className="text-xl font-serif font-semibold text-navy-800 mb-1">{step.title}</h2>
        {step.description && <p className="text-gray-500 text-sm mb-6">{step.description}</p>}

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleFields.map((field) => (
              <div key={field.name} className={field.width === 'half' ? '' : 'sm:col-span-2'}>
                {renderField(field, formData[field.name], handleChange, errors)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <Button onClick={handleNext} loading={loading}>
            {isLastStep ? (
              <>
                <FileDown className="h-4 w-4" />
                Generar documento
              </>
            ) : (
              <>
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
