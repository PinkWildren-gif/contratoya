import { z } from 'zod'

export const businessProfileSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  nif: z.string().min(1, 'El NIF es obligatorio').regex(/^[0-9]{8}[A-Z]$|^[A-Z][0-9]{7}[A-Z0-9]$/, 'Formato de NIF no válido'),
  address: z.string().min(1, 'La dirección es obligatoria'),
  city: z.string().min(1, 'La ciudad es obligatoria'),
  postal_code: z.string().regex(/^[0-9]{5}$/, 'El código postal debe tener 5 dígitos'),
  iae_activity: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email no válido').optional().or(z.literal('')),
  is_new_autonomo: z.boolean(),
})

export type BusinessProfileFormData = z.infer<typeof businessProfileSchema>

export const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  nif_cif: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().regex(/^[0-9]{5}$/, 'El código postal debe tener 5 dígitos').optional().or(z.literal('')),
  email: z.string().email('Email no válido').optional().or(z.literal('')),
  phone: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const loginSchema = z.object({
  email: z.string().email('Email no válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const signUpSchema = z.object({
  email: z.string().email('Email no válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, {
    message: 'Debes aceptar las condiciones de uso y la politica de privacidad',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export type SignUpFormData = z.infer<typeof signUpSchema>
