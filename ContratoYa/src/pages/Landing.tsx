import { Link } from 'react-router-dom'
import { FileText, Shield, Receipt, Calculator, Building, Lock, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export function Landing() {
  const { t } = useLanguage()

  const features = [
    { icon: <FileText className="h-6 w-6" />, title: t('feature.contracts'), desc: t('feature.contracts.desc') },
    { icon: <Receipt className="h-6 w-6" />, title: t('feature.invoices'), desc: t('feature.invoices.desc') },
    { icon: <Shield className="h-6 w-6" />, title: t('feature.ndas'), desc: t('feature.ndas.desc') },
    { icon: <Calculator className="h-6 w-6" />, title: t('feature.quotes'), desc: t('feature.quotes.desc') },
    { icon: <Building className="h-6 w-6" />, title: t('feature.leases'), desc: t('feature.leases.desc') },
    { icon: <Lock className="h-6 w-6" />, title: t('feature.privacy'), desc: t('feature.privacy.desc') },
  ]

  const benefits = [
    t('benefit.1'),
    t('benefit.2'),
    t('benefit.3'),
    t('benefit.4'),
    t('benefit.5'),
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              {t('landing.hero.title1')}{' '}
              <span className="text-success-400">{t('landing.hero.title2')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  {t('landing.hero.cta')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto !border-gray-500 !text-white hover:!bg-navy-700">
                  {t('landing.hero.existing')}
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-4">{t('landing.hero.free')}</p>
          </div>
        </div>
      </section>

      {/* Document types */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-800 mb-4">
              {t('landing.types.title')}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {t('landing.types.subtitle')}
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
              {t('landing.benefits.title')}
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
              {t('landing.pricing.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="card p-8">
              <h3 className="text-xl font-semibold text-navy-800 mb-2">{t('landing.pricing.free')}</h3>
              <p className="text-4xl font-bold text-navy-800 mb-1">0&euro;</p>
              <p className="text-gray-500 mb-6">{t('landing.pricing.forever')}</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> {t('landing.pricing.docsPerMonth')}</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> {t('landing.pricing.allTypes')}</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> {t('landing.pricing.pdfDownload')}</li>
              </ul>
              <Link to="/auth/signup">
                <Button variant="outline" className="w-full">{t('landing.pricing.startFree')}</Button>
              </Link>
            </div>
            <div className="card p-8 border-success-500 border-2 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {t('landing.pricing.popular')}
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">{t('landing.pricing.pro')}</h3>
              <p className="text-4xl font-bold text-navy-800 mb-1">9,99&euro;</p>
              <p className="text-gray-500 mb-6">{t('landing.pricing.perMonth')}</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> {t('landing.pricing.unlimited')}</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> {t('landing.pricing.history')}</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> {t('landing.pricing.logo')}</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> {t('landing.pricing.support')}</li>
              </ul>
              <Link to="/auth/signup">
                <Button className="w-full">{t('landing.pricing.startTrial')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-800 text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-serif font-bold mb-4">
            {t('landing.cta.title')}
          </h2>
          <p className="text-gray-300 mb-8">
            {t('landing.cta.subtitle')}
          </p>
          <Link to="/auth/signup">
            <Button size="lg">
              {t('landing.cta.button')}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-xs text-gray-500 mt-6">
            {t('landing.cta.terms')}{' '}
            <Link to="/terms" className="underline hover:text-gray-300">{t('common.termsOfService')}</Link>
            {' '}{t('landing.cta.and')}{' '}
            <Link to="/privacy" className="underline hover:text-gray-300">{t('common.privacyPolicy')}</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
