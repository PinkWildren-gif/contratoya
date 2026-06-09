import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useToast } from '@/components/ui/Toast'
import { supabase } from '@/lib/supabase'
import { generatePdf } from '@/lib/pdf'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { DOCUMENT_TYPES } from '@/lib/constants'
import type { Document } from '@/types/database'
import { Modal } from '@/components/ui/Modal'
import {
  FolderOpen, Download, Pencil, Plus, Loader2, Trash2,
  FileText, Receipt, Shield, Calculator, Building, Lock
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-5 w-5" />,
  Receipt: <Receipt className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Calculator: <Calculator className="h-5 w-5" />,
  Building: <Building className="h-5 w-5" />,
  Lock: <Lock className="h-5 w-5" />,
}

export function Documents() {
  const { user } = useAuth()
  const { t, lang } = useLanguage()
  const { showError } = useToast()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    const fetchDocs = async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error && data) setDocuments(data)
      setLoading(false)
    }
    fetchDocs()
  }, [user])

  const handleDelete = async (id: string) => {
    await supabase.from('documents').delete().eq('id', id)
    setDocuments((prev) => prev.filter((d) => d.id !== id))
    setDeleteConfirm(null)
  }

  const handleDownload = (doc: Document) => {
    try {
      const pdf = generatePdf(doc.document_type, doc.form_data as Record<string, unknown>)
      pdf.save(`${doc.title || 'documento'}.pdf`)
    } catch {
      showError(t('documents.downloadError'))
    }
  }

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'es-ES', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).format(new Date(dateStr))
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-success-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-navy-800">{t('documents.title')}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {t('documents.subtitle')}
          </p>
        </div>
        <Link to="/dashboard">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            {t('documents.new')}
          </Button>
        </Link>
      </div>

      {documents.length === 0 ? (
        <Card>
          <EmptyState
            icon={<FolderOpen className="h-12 w-12" />}
            title={t('documents.noDocsTitle')}
            description={t('documents.noDocsDesc')}
            action={
              <Link to="/dashboard">
                <Button>
                  <Plus className="h-4 w-4" />
                  {t('documents.create')}
                </Button>
              </Link>
            }
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => {
            const docTypeInfo = DOCUMENT_TYPES[doc.document_type as keyof typeof DOCUMENT_TYPES]
            return (
              <Card key={doc.id} padding="md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-success-50 text-success-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      {docTypeInfo ? iconMap[docTypeInfo.icon] : <FileText className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-800">{doc.title || t('documents.noTitle')}</h3>
                      <div className="flex gap-3 text-sm text-gray-400 mt-0.5">
                        <span>{docTypeInfo?.label || doc.document_type}</span>
                        <span>{formatDate(doc.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/documents/${doc.id}/edit`}
                      className="p-2 text-gray-400 hover:text-navy-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title={t('documents.edit')}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-2 text-gray-400 hover:text-success-600 hover:bg-success-50 rounded-lg transition-colors"
                      title={t('documents.downloadPdf')}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(doc.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title={t('documents.deleteBtn')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Modal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title={t('documents.deleteTitle')}
      >
        <p className="text-gray-600 mb-6">
          {t('documents.deleteConfirm')}
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
            {t('common.cancel')}
          </Button>
          <Button variant="danger" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
            {t('common.delete')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
