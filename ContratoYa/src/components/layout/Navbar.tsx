import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/hooks/useSubscription'
import { FileText, LogOut, Menu, X, Crown } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { user, signOut } = useAuth()
  const { tier } = useSubscription()
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
                  Nuevo
                </Link>
                <Link to="/documents" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Documentos
                </Link>
                <Link to="/profile" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Mi Perfil
                </Link>
                <Link to="/contacts" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contactos
                </Link>
                {tier === 'pro' ? (
                  <span className="flex items-center gap-1 text-xs bg-success-500/20 text-success-300 px-2 py-1 rounded-full font-medium">
                    <Crown className="h-3 w-3" />
                    Pro
                  </span>
                ) : (
                  <Link to="/pricing" className="flex items-center gap-1 text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full font-medium hover:bg-amber-500/30 transition-colors">
                    Mejorar a Pro
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Salir
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
              <Link to="/auth/login" className="hidden sm:inline text-sm text-gray-300 hover:text-white transition-colors">
                Iniciar sesión
              </Link>
              <Link to="/auth/signup" className="btn-primary text-sm !py-2 !px-4">
                Registrarse
              </Link>
              <Link to="/auth/login" className="sm:hidden text-sm text-gray-300 hover:text-white transition-colors">
                Entrar
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {user && menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Nuevo documento
            </Link>
            <Link
              to="/documents"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Mis documentos
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Mi Perfil
            </Link>
            <Link
              to="/contacts"
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Contactos
            </Link>
            {tier === 'free' && (
              <Link
                to="/pricing"
                className="block px-3 py-2 text-amber-300 hover:text-white hover:bg-navy-700 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                Mejorar a Pro
              </Link>
            )}
            <button
              onClick={() => { handleSignOut(); setMenuOpen(false) }}
              className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-lg flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
