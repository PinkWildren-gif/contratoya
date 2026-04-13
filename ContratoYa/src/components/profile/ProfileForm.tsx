import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { businessProfileSchema, type BusinessProfileFormData } from '@/types/forms'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { BusinessProfile } from '@/types/database'

interface ProfileFormProps {
  profile?: BusinessProfile | null
  onSubmit: (data: BusinessProfileFormData) => Promise<{ error: Error | null }>
  onCancel: () => void
}

export function ProfileForm({ profile, onSubmit, onCancel }: ProfileFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BusinessProfileFormData>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: profile ? {
      name: profile.name,
      nif: profile.nif || '',
      address: profile.address || '',
      city: profile.city || '',
      postal_code: profile.postal_code || '',
      iae_activity: profile.iae_activity || '',
      phone: profile.phone || '',
      email: profile.email || '',
      is_new_autonomo: profile.is_new_autonomo,
    } : {
      is_new_autonomo: false,
    },
  })

  const handleFormSubmit = async (data: BusinessProfileFormData) => {
    const { error } = await onSubmit(data)
    if (!error) onCancel()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Nombre completo o razón social *"
        placeholder="Juan García López"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="NIF *"
        placeholder="12345678A"
        error={errors.nif?.message}
        {...register('nif')}
      />

      <Input
        label="Dirección *"
        placeholder="Calle Mayor 1, 2ºB"
        error={errors.address?.message}
        {...register('address')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Ciudad *"
          placeholder="Madrid"
          error={errors.city?.message}
          {...register('city')}
        />
        <Input
          label="Código postal *"
          placeholder="28001"
          error={errors.postal_code?.message}
          {...register('postal_code')}
        />
      </div>

      <Input
        label="Actividad IAE"
        placeholder="Ej: 861 - Pintores, escultores..."
        helperText="Epígrafe de tu actividad económica"
        error={errors.iae_activity?.message}
        {...register('iae_activity')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Teléfono"
          placeholder="612 345 678"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_new_autonomo"
          className="h-4 w-4 rounded border-gray-300 text-success-500 focus:ring-success-500"
          {...register('is_new_autonomo')}
        />
        <label htmlFor="is_new_autonomo" className="text-sm text-navy-700">
          Soy autónomo nuevo (menos de 3 años) — retención IRPF al 7%
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isSubmitting}>
          {profile ? 'Guardar cambios' : 'Crear perfil'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
