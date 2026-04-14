import { useState, useEffect } from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const COOKIE_KEY = 'contratoya_cookies_accepted'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY)
    if (!accepted) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'true')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'essential')
    setVisible(false)
  }

  const { t } = useLanguage()

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1">
          {t('cookies.message')}{' '}
          <Link to="/privacy" className="text-success-600 hover:underline">
            {t('cookies.moreInfo')}
          </Link>
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" size="sm" onClick={decline}>
            {t('cookies.essential')}
          </Button>
          <Button size="sm" onClick={accept}>
            {t('cookies.acceptAll')}
          </Button>
        </div>
      </div>
    </div>
  )
}
