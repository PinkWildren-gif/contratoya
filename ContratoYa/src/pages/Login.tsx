import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/contexts/AuthContext'
import { loginSchema, type LoginFormData } from '@/types/forms'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { FileText } from 'lucide-react'

export function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [serverError, setServerError] = useState('')
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setServerError('')
    const { error } = await signIn(data.email, data.password)
    if (error) {
      setServerError('Email o contraseña incorrectos')
    } else {
      navigate(from, { replace: true })
    }
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
            Iniciar sesión
          </h1>
          <p className="text-gray-500">
            Accede a tu cuenta para gestionar tus documentos
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
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" loading={isSubmitting} className="w-full">
              Iniciar sesión
            </Button>

            <div className="text-center">
              <Link to="/auth/forgot-password" className="text-sm text-gray-500 hover:text-success-600 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/auth/signup" className="text-success-600 hover:text-success-700 font-medium">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
