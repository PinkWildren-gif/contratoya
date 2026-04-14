import { Outlet, Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export function AppLayout() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-navy-800 text-gray-400 py-8 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} ContratoYa. {t('footer.rights')}</p>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="hover:text-white transition-colors">
                {t('common.termsOfService')}
              </Link>
              <Link to="/privacy" className="hover:text-white transition-colors">
                {t('common.privacyPolicy')}
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center sm:text-left">
            {t('footer.disclaimer')}
          </p>
        </div>
      </footer>
    </div>
  )
}
