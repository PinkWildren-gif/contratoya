import { Component, type ReactNode } from 'react'
import { Button } from './Button'
import { AlertTriangle } from 'lucide-react'
import { getTranslation, type Language } from '@/lib/i18n/translations'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  private getLang(): Language {
    const saved = localStorage.getItem('contratoya_lang')
    return saved === 'en' ? 'en' : 'es'
  }

  render() {
    if (this.state.hasError) {
      const lang = this.getLang()
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-serif font-bold text-navy-800 mb-2">
              {getTranslation('error.title', lang)}
            </h2>
            <p className="text-gray-500 mb-6">
              {getTranslation('error.message', lang)}
            </p>
            <Button onClick={() => window.location.reload()}>
              {getTranslation('error.reload', lang)}
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
