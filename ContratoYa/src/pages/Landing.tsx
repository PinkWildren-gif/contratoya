import { Link } from 'react-router-dom'
import { FileText, Shield, Receipt, Calculator, Building, Lock, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const features = [
  { icon: <FileText className="h-6 w-6" />, title: 'Contratos de Servicios', desc: 'Plantillas profesionales para autonomos y freelancers' },
  { icon: <Receipt className="h-6 w-6" />, title: 'Facturas', desc: 'Con campos de IVA e IRPF para autonomos' },
  { icon: <Shield className="h-6 w-6" />, title: 'Acuerdos de Confidencialidad', desc: 'Plantillas de NDA unilaterales o mutuos' },
  { icon: <Calculator className="h-6 w-6" />, title: 'Presupuestos', desc: 'Propuestas profesionales con desglose detallado' },
  { icon: <Building className="h-6 w-6" />, title: 'Contratos de Alquiler', desc: 'Plantillas para locales comerciales basadas en la LAU' },
  { icon: <Lock className="h-6 w-6" />, title: 'Politica de Privacidad', desc: 'Plantillas basadas en el RGPD y la LOPD-GDD' },
]

const benefits = [
  'Plantillas basadas en la legislacion espanola',
  'Genera borradores en menos de 5 minutos',
  'Guarda tus datos y reutilizalos',
  'Descarga en PDF profesional',
  'Plantillas revisadas periodicamente',
]

export function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Documentos legales para autónomos,{' '}
              <span className="text-success-400">sin complicaciones</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Genera borradores de contratos, facturas y documentos profesionales en minutos.
              Plantillas basadas en la normativa espanola, listas para revisar con tu abogado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Empezar gratis
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto !border-gray-500 !text-white hover:!bg-navy-700">
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-4">2 documentos gratis al mes. Sin tarjeta de crédito.</p>
          </div>
        </div>
      </section>

      {/* Document types */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-800 mb-4">
              Todo lo que necesitas como autónomo
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              6 tipos de plantillas esenciales con la estructura y campos que necesitas como punto de partida
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-success-50 text-success-600 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-navy-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-800 mb-12">
              Hecho para autónomos españoles
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 text-left">
                  <div className="w-6 h-6 bg-success-100 text-success-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-lg text-navy-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-800 mb-4">
              Precios claros y sencillos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="card p-8">
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Gratis</h3>
              <p className="text-4xl font-bold text-navy-800 mb-1">0&euro;</p>
              <p className="text-gray-500 mb-6">para siempre</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> 2 documentos al mes</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Todos los tipos de documento</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Descarga en PDF</li>
              </ul>
              <Link to="/auth/signup">
                <Button variant="outline" className="w-full">Empezar gratis</Button>
              </Link>
            </div>
            <div className="card p-8 border-success-500 border-2 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Popular
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">Pro</h3>
              <p className="text-4xl font-bold text-navy-800 mb-1">9,99&euro;</p>
              <p className="text-gray-500 mb-6">al mes</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Documentos ilimitados</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Historial completo</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Logo personalizado</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Soporte prioritario</li>
              </ul>
              <Link to="/auth/signup">
                <Button className="w-full">Empezar prueba gratuita</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-800 text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Empieza a generar documentos hoy
          </h2>
          <p className="text-gray-300 mb-8">
            Sin tarjeta de credito. 2 documentos gratis al mes.
          </p>
          <Link to="/auth/signup">
            <Button size="lg">
              Crear mi cuenta gratis
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-xs text-gray-500 mt-6">
            Al registrarte, aceptas nuestras{' '}
            <Link to="/terms" className="underline hover:text-gray-300">Condiciones de Uso</Link>
            {' '}y{' '}
            <Link to="/privacy" className="underline hover:text-gray-300">Politica de Privacidad</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
