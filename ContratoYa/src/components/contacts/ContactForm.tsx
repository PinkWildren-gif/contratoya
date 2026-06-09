import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/types/forms'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Contact } from '@/types/database'

interface ContactFormProps {
  contact?: Contact | null
  onSubmit: (data: ContactFormData) => Promise<{ error: Error | null }>
  onCancel: () => void
}

export function ContactForm({ contact, onSubmit, onCancel }: ContactFormProps) {
  const { t } = useLanguage()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact ? {
      name: contact.name,
      nif_cif: contact.nif_cif || '',
      address: contact.address || '',
      city: contact.city || '',
      postal_code: contact.postal_code || '',
      email: contact.email || '',
      phone: contact.phone || '',
    } : {},
  })

  const handleFormSubmit = async (data: ContactFormData) => {
    const { error } = await onSubmit(data)
    if (!error) onCancel()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label={t('contactForm.name')}
        placeholder="Empresa S.L. o nombre completo"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label={t('contactForm.nif')}
        placeholder="B12345678"
        error={errors.nif_cif?.message}
        {...register('nif_cif')}
      />

      <Input
        label={t('contactForm.address')}
        placeholder="Calle, número, piso"
        error={errors.address?.message}
        {...register('address')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('contactForm.city')}
          placeholder="Barcelona"
          error={errors.city?.message}
          {...register('city')}
        />
        <Input
          label={t('contactForm.postalCode')}
          placeholder="08001"
          error={errors.postal_code?.message}
          {...register('postal_code')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('contactForm.email')}
          type="email"
          placeholder="contacto@empresa.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label={t('contactForm.phone')}
          placeholder="911 234 567"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isSubmitting}>
          {contact ? t('common.save') : t('contactForm.create')}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  )
}
