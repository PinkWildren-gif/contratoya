import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { AppLayout } from '@/components/layout/AppLayout'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { ToastProvider } from '@/components/ui/Toast'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { SignUp } from '@/pages/SignUp'
import { ForgotPassword } from '@/pages/ForgotPassword'
import { ResetPassword } from '@/pages/ResetPassword'
import { Dashboard } from '@/pages/Dashboard'
import { Profile } from '@/pages/Profile'
import { Contacts } from '@/pages/Contacts'
import { NewDocument } from '@/pages/NewDocument'
import { Documents } from '@/pages/Documents'
import { EditDocument } from '@/pages/EditDocument'
import { Pricing } from '@/pages/Pricing'
import { TermsOfService } from '@/pages/TermsOfService'
import { AppPrivacyPolicy } from '@/pages/AppPrivacyPolicy'
import { NotFound } from '@/pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <ScrollToTop />
            <Routes>
              <Route element={<AppLayout />}>
                {/* Public routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<AppPrivacyPolicy />} />

                {/* Protected routes */}
                <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
                <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
                <Route path="/contacts" element={<AuthGuard><Contacts /></AuthGuard>} />
                <Route path="/documents" element={<AuthGuard><Documents /></AuthGuard>} />
                <Route path="/documents/new/:type" element={<AuthGuard><NewDocument /></AuthGuard>} />
                <Route path="/documents/:id/edit" element={<AuthGuard><EditDocument /></AuthGuard>} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <CookieBanner />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  )
}
