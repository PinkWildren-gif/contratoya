import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/hooks/useSubscription'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { FileText, LogOut, Menu, X, Crown } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { user, signOut } = useAuth()
  const { tier } = useSubscription()
  const { lang, setLang, t } = useLanguage()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/auth/login')
  }

  return (
    <nav className="bg-navy-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-success-400" />
            <span className="text-xl font-serif font-bold">ContratoYa</span>
          </Link>

          {user ? (
            <>
              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-6">
                <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('nav.new')}
                </Link>
                <Link to="/documents" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('nav.documents')}
                </Link>
                <Link to="/profile" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('nav.profile')}
                </Link>
                <Link to="/contacts" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {t('nav.contacts')}
                </Link>
                {tier === 'pro' ? (
                  <span className="flex items-center gap-1 text-xs bg-success-500/20 text-success-300 px-2 py-1 rounded-full font-medium">
                    <Crown className="h-3 w-3" />
                    Pro
                  </span>
                ) : (
                  <Link to="/pricing" className="flex items-center gap-1 text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full font-medium hover:bg-amber-500/30 transition-colors">
                    {t('nav.upgrade')}
                  </Link>
                )}
                <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-xs bg-navy-700 px-2 py-1 rounded text-gray-300 hover:text-white transition-colors">
                  {lang === 'es' ? 'EN' : 'ES'}
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  {t('nav.signout')}
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-300 hover:text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-xs bg-navy-700 px-2 py-1 rounded text-gray-300 hover:text-white transition-colors">
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
              <Link to="/auth/login" className="hidden sm:inline text-sm text-gray-300 hover:text-white transition-colors">
                {t('nav.login')}
              </Link>
              <Link to="/auth/signup" className="btn-primary text-sm !py-2 !px-4">
                {t('nav.signup')}
              </Link>
              <Link to="/auth/login" className="sm:hidden text-sm text-gray-300 hover:text-white transition-colors">
                {t('nav.enter')}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {user && menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-xs bg-navy-700 px-2 py-1 rounded text-gray-300 hover:text-white transition-colors">
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.newDoc')}
            </Link>
            <Link
              to="/documents"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.myDocs')}
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.profile')}
            </Link>
            <Link
              to="/contacts"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.contacts')}
            </Link>
            {tier === 'free' && (
              <Link
                to="/pricing"
                className="block px-3 py-2 text-amber-300 hover:text-white hover:bg-navy-700 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                {t('nav.upgrade')}
              </Link>
            )}
            <button
              onClick={() => { handleSignOut(); setMenuOpen(false) }}
              className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-lg flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              {t('nav.signout')}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
