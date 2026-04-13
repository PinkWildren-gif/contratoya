import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/hooks/useSubscription'
import { Button } from '@/components/ui/Button'
import { Check, Star } from 'lucide-react'
import { FREE_TIER_LIMIT, PRO_MONTHLY_PRICE, PRO_YEARLY_PRICE } from '@/lib/constants'

export function Pricing() {
  const { user } = useAuth()
  const { tier } = useSubscription()

  const handleCheckout = (plan: 'monthly' | 'yearly') => {
    // Payment Links from Stripe Dashboard
    // To create: Stripe Dashboard → Payment Links → + Create
    // Select the monthly or yearly price, then paste the URL below
    const links: Record<string, string> = {
      monthly: import.meta.env.VITE_STRIPE_MONTHLY_LINK || '',
      yearly: import.meta.env.VITE_STRIPE_YEARLY_LINK || '',
    }

    const url = links[plan]
    if (!url) {
      alert('Pagos no disponibles todavía. Configuración en proceso.')
      return
    }

    // Append user ID so we can match the payment to the user
    const separator = url.includes('?') ? '&' : '?'
    window.open(`${url}${separator}client_reference_id=${user?.id}`, '_blank')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-800 mb-4">
          Precios claros y sencillos
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Empieza gratis. Pasa a Pro cuando necesites generar más documentos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Free */}
        <div className={`card p-8 ${tier === 'free' ? 'border-navy-300 border-2' : ''}`}>
          {tier === 'free' && (
            <div className="text-xs font-semibold text-navy-600 bg-navy-50 px-2 py-1 rounded-full inline-block mb-3">
              Tu plan actual
            </div>
          )}
          <h3 className="text-xl font-semibold text-navy-800 mb-2">Gratis</h3>
          <p className="text-4xl font-bold text-navy-800 mb-1">0&euro;</p>
          <p className="text-gray-500 mb-6">para siempre</p>
          <ul className="space-y-3 text-sm text-gray-600 mb-8">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> {FREE_TIER_LIMIT} documentos al mes</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> 6 tipos de plantilla</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> Descarga en PDF</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> Perfil de autónomo</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> Directorio de contactos</li>
          </ul>
          {!user ? (
            <Link to="/auth/signup"><Button variant="outline" className="w-full">Empezar gratis</Button></Link>
          ) : tier === 'free' ? (
            <Button variant="outline" className="w-full" disabled>Plan actual</Button>
          ) : null}
        </div>

        {/* Pro Monthly */}
        <div className={`card p-8 border-2 relative ${tier === 'pro' ? 'border-success-500' : 'border-success-500'}`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="h-3 w-3" /> Popular
          </div>
          {tier === 'pro' && (
            <div className="text-xs font-semibold text-success-600 bg-success-50 px-2 py-1 rounded-full inline-block mb-3">
              Tu plan actual
            </div>
          )}
          <h3 className="text-xl font-semibold text-navy-800 mb-2">Pro Mensual</h3>
          <p className="text-4xl font-bold text-navy-800 mb-1">{PRO_MONTHLY_PRICE}&euro;</p>
          <p className="text-gray-500 mb-6">al mes</p>
          <ul className="space-y-3 text-sm text-gray-600 mb-8">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> Documentos ilimitados</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> Historial completo</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> Re-editar y regenerar</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> Logo personalizado en PDFs</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> Soporte prioritario</li>
          </ul>
          {tier === 'pro' ? (
            <Button className="w-full" disabled>Plan actual</Button>
          ) : (
            <Button className="w-full" onClick={() => handleCheckout('monthly')}>
              Suscribirme
            </Button>
          )}
        </div>

        {/* Pro Yearly */}
        <div className="card p-8">
          <div className="text-xs font-semibold text-success-600 bg-success-50 px-2 py-1 rounded-full inline-block mb-3">
            Ahorra 33%
          </div>
          <h3 className="text-xl font-semibold text-navy-800 mb-2">Pro Anual</h3>
          <p className="text-4xl font-bold text-navy-800 mb-1">{PRO_YEARLY_PRICE}&euro;</p>
          <p className="text-gray-500 mb-6">al año <span className="text-success-600 font-medium">({(PRO_YEARLY_PRICE / 12).toFixed(2)}&euro;/mes)</span></p>
          <ul className="space-y-3 text-sm text-gray-600 mb-8">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> Todo lo del plan mensual</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> 2 meses gratis</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500 flex-shrink-0" /> Precio garantizado</li>
          </ul>
          <Button variant="secondary" className="w-full" onClick={() => handleCheckout('yearly')}>
            Suscripción anual
          </Button>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 mt-8">
        Pago seguro con Stripe. Cancela cuando quieras. Sin permanencia.
      </p>
    </div>
  )
}
