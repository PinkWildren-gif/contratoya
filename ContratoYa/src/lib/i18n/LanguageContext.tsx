import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { getTranslation, type Language, type TranslationKey } from './translations'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('contratoya_lang') as Language
    return saved === 'en' ? 'en' : 'es'
  })

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('contratoya_lang', newLang)
  }, [])

  const t = useCallback((key: TranslationKey) => getTranslation(key, lang), [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
