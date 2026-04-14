import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Questionnaire } from '@/components/questionnaire/Questionnaire'
import { getDocumentConfig } from '@/lib/document-configs'
import { generatePdf } from '@/lib/pdf'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import type { Document, DocumentType } from '@/types/database'
import { TEMPLATE_VERSION } from '@/lib/constants'
import { ArrowLeft, Download, FileText, Loader2, Eye, AlertTriangle } from 'lucide-react'

export function EditDocument() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null)
  const [downloadConfirmed, setDownloadConfirmed] = useState(false)

  useEffect(() => {
    if (!id) return
    const fetchDoc = async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .single()

      if (!error && data) setDocument(data)
      setLoading(false)
    }
    fetchDoc()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-success-500" />
      </div>
    )
  }

  if (!document) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-serif font-bold text-navy-800 mb-4">{t('editDoc.notFound')}</h1>
        <Link to="/documents"><Button variant="outline">{t('editDoc.backToList')}</Button></Link>
      </div>
    )
  }

  const config = getDocumentConfig(document.document_type as DocumentType)

  if (!config) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-serif font-bold text-navy-800 mb-4">{t('editDoc.typeNotAvailable')}</h1>
        <Link to="/documents"><Button variant="outline">{t('common.back')}</Button></Link>
      </div>
    )
  }

  const handleComplete = async (data: Record<string, unknown>) => {
    setSaving(true)
    setFormData(data)

    try {
      const doc = generatePdf(document.document_type as DocumentType, data)
      setPdfDataUrl(doc.output('datauristring'))

      const title = config.generateTitle(data)
      await supabase
        .from('documents')
        .update({
          form_data: { ...data, _template_version: TEMPLATE_VERSION, _generated_at: new Date().toISOString() },
          title,
          updated_at: new Date().toISOString(),
        })
        .eq('id', document.id)

      setGenerated(true)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    const doc = generatePdf(document.document_type as DocumentType, formData)
    const title = config.generateTitle(formData)
    doc.save(`${title.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ ]/g, '_')}.pdf`)
  }

  if (generated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-navy-800 mb-2">{t('editDoc.updated')}</h1>
        </div>
        <div className="card p-5 mb-8 border-amber-200 bg-amber-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium mb-2">
                {t('newDoc.download.title')}
              </p>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={downloadConfirmed}
                  onChange={(e) => setDownloadConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-success-600 focus:ring-success-500"
                />
                <span className="text-xs text-amber-700 leading-relaxed">
                  {t('newDoc.download.checkbox')}
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button onClick={handleDownload} size="lg" disabled={!downloadConfirmed}>
            <Download className="h-5 w-5" />
            {t('newDoc.generated.download')}
          </Button>
          <Button variant="outline" onClick={() => {
            if (pdfDataUrl) {
              const w = window.open()
              if (w) w.document.write(`<iframe src="${pdfDataUrl}" width="100%" height="100%" style="border:none;position:absolute;inset:0;"></iframe>`)
            }
          }}>
            <Eye className="h-5 w-5" />
            {t('newDoc.generated.preview')}
          </Button>
        </div>
        {pdfDataUrl && (
          <div className="card overflow-hidden mb-8">
            <iframe src={pdfDataUrl} className="w-full h-[600px] border-0" title={t('newDoc.generated.preview')} />
          </div>
        )}
        <div className="flex gap-4 justify-center">
          <Button variant="ghost" onClick={() => navigate('/documents')}>{t('editDoc.backToList')}</Button>
          <Button variant="outline" onClick={() => { setGenerated(false); setPdfDataUrl(null) }}>{t('editDoc.editAgain')}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/documents" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-800 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {t('editDoc.back')}
      </Link>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-navy-800">{t('editDoc.prefix')} {document.title}</h1>
      </div>
      <Questionnaire
        config={config}
        initialData={document.form_data as Record<string, unknown>}
        onComplete={handleComplete}
        loading={saving}
      />
    </div>
  )
}
