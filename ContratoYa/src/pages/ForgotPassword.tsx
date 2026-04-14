import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { FileText, Mail } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Email no válido'),
})
type FormData = z.infer<typeof schema>

export function ForgotPassword() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setServerError('')
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) {
      setServerError(error.message)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-navy-800 mb-2">
            {t('auth.forgot.sent.title')}
          </h2>
          <p className="text-gray-500 mb-6">
            {t('auth.forgot.sent.message')}
          </p>
          <Link to="/auth/login">
            <Button variant="outline">{t('auth.forgot.back')}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-navy-800">
            <FileText className="h-8 w-8 text-success-500" />
            <span className="text-2xl font-serif font-bold">ContratoYa</span>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-navy-800 mt-6 mb-2">
            {t('auth.forgot.title')}
          </h1>
          <p className="text-gray-500">
            {t('auth.forgot.subtitle')}
          </p>
        </div>

        <div className="card p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">
                {serverError}
              </div>
            )}
            <Input
              label={t('auth.login.email')}
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Button type="submit" loading={isSubmitting} className="w-full">
              {t('auth.forgot.submit')}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link to="/auth/login" className="text-success-600 hover:text-success-700 font-medium">
            {t('auth.forgot.back')}
          </Link>
        </p>
      </div>
    </div>
  )
}
