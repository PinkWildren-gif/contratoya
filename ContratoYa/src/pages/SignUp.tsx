import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/contexts/AuthContext'
import { signUpSchema, type SignUpFormData } from '@/types/forms'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { FileText } from 'lucide-react'

export function SignUp() {
  const { signUp } = useAuth()
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpFormData) => {
    setServerError('')
    const { error } = await signUp(data.email, data.password)
    if (error) {
      setServerError(error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-navy-800 mb-2">
            ¡Cuenta creada!
          </h2>
          <p className="text-gray-500 mb-6">
            Revisa tu email para confirmar tu cuenta.
          </p>
          <Link to="/auth/login">
            <Button variant="outline">Ir a iniciar sesion</Button>
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
            Crear cuenta
          </h1>
          <p className="text-gray-500">
            Empieza a generar documentos legales en minutos
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
              label="Email"
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="Mínimo 6 caracteres"
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="Repite tu contraseña"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <div className="space-y-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-success-600 focus:ring-success-500"
                  {...register('acceptTerms')}
                />
                <span className="text-xs text-gray-500 leading-relaxed">
                  He leido y acepto las{' '}
                  <Link to="/terms" className="text-success-600 hover:text-success-700 underline" target="_blank">
                    Condiciones de Uso
                  </Link>{' '}
                  y la{' '}
                  <Link to="/privacy" className="text-success-600 hover:text-success-700 underline" target="_blank">
                    Politica de Privacidad
                  </Link>.
                  Entiendo que ContratoYa no es un despacho de abogados y no proporciona asesoramiento juridico.
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-xs ml-7">{errors.acceptTerms.message}</p>
              )}
            </div>

            <Button type="submit" loading={isSubmitting} className="w-full">
              Crear cuenta gratis
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/auth/login" className="text-success-600 hover:text-success-700 font-medium">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
