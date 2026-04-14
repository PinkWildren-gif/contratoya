import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { FileText, Check } from 'lucide-react'

const schema = z.object({
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})
type FormData = z.infer<typeof schema>

export function ResetPassword() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setServerError('')
    const { error } = await supabase.auth.updateUser({ password: data.password })
    if (error) {
      setServerError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 2000)
    }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-navy-800 mb-2">
            {t('auth.reset.success.title')}
          </h2>
          <p className="text-gray-500">{t('auth.reset.success.message')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <FileText className="h-8 w-8 text-success-500 mx-auto" />
          <h1 className="text-2xl font-serif font-bold text-navy-800 mt-4 mb-2">
            {t('auth.reset.title')}
          </h1>
          <p className="text-gray-500">{t('auth.reset.subtitle')}</p>
        </div>

        <div className="card p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">{serverError}</div>
            )}
            <Input
              label={t('auth.reset.newPassword')}
              type="password"
              placeholder="Mínimo 6 caracteres"
              error={errors.password?.message}
              {...register('password')}
            />
            <Input
              label={t('auth.signup.confirmPassword')}
              type="password"
              placeholder="Repite tu contraseña"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Button type="submit" loading={isSubmitting} className="w-full">
              {t('auth.reset.submit')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
