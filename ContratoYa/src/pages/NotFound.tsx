import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { FileQuestion } from 'lucide-react'

export function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <FileQuestion className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-4xl font-serif font-bold text-navy-800 mb-2">404</h1>
        <p className="text-lg text-gray-500 mb-6">
          {t('notFound.title')}
        </p>
        <Link to="/">
          <Button>{t('notFound.back')}</Button>
        </Link>
      </div>
    </div>
  )
}
