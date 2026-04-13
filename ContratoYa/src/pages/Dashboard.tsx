import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { DOCUMENT_TYPES } from '@/lib/constants'
import type { Document } from '@/types/database'
import {
  FileText, Receipt, Shield, Calculator, Building, Lock,
  Plus, FolderOpen, Download, Pencil, Loader2
} from 'lucide-react'
import { generatePdf } from '@/lib/pdf'

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-6 w-6" />,
  Receipt: <Receipt className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  Calculator: <Calculator className="h-6 w-6" />,
  Building: <Building className="h-6 w-6" />,
  Lock: <Lock className="h-6 w-6" />,
}

const smallIconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-5 w-5" />,
  Receipt: <Receipt className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Calculator: <Calculator className="h-5 w-5" />,
  Building: <Building className="h-5 w-5" />,
  Lock: <Lock className="h-5 w-5" />,
}

export function Dashboard() {
  const { user } = useAuth()
  const [recentDocs, setRecentDocs] = useState<Document[]>([])
  const [loadingDocs, setLoadingDocs] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchRecent = async () => {
      const { data } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)
      if (data) setRecentDocs(data)
      setLoadingDocs(false)
    }
    fetchRecent()
  }, [user])

  const handleDownload = (doc: Document) => {
    try {
      const pdf = generatePdf(doc.document_type, doc.form_data as Record<string, unknown>)
      pdf.save(`${doc.title || 'documento'}.pdf`)
    } catch {
      alert('Error al descargar el documento.')
    }
  }

  const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(dateStr))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy-800">
          Bienvenido a ContratoYa
        </h1>
        <p className="text-gray-500 mt-1">
          {user?.email}
        </p>
      </div>

      {/* Quick actions */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-navy-800 mb-4">Crear nuevo documento</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(DOCUMENT_TYPES).map((docType) => (
            <Link
              key={docType.id}
              to={`/documents/new/${docType.id}`}
              className="card p-5 hover:shadow-md hover:border-success-200 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-success-50 text-success-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-success-100 transition-colors">
                  {iconMap[docType.icon]}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-navy-800 text-sm">{docType.label}</h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{docType.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent documents */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy-800">Documentos recientes</h2>
          {recentDocs.length > 0 && (
            <Link to="/documents" className="text-sm text-success-600 hover:text-success-700 font-medium">
              Ver todos
            </Link>
          )}
        </div>
        {loadingDocs ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-success-500" />
          </div>
        ) : recentDocs.length === 0 ? (
          <Card>
            <EmptyState
              icon={<FolderOpen className="h-12 w-12" />}
              title="Sin documentos todavia"
              description="Crea tu primer documento seleccionando uno de los tipos de arriba"
              action={
                <Link to="/profile" className="btn-primary inline-flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Configurar mi perfil primero
                </Link>
              }
            />
          </Card>
        ) : (
          <div className="space-y-3">
            {recentDocs.map((doc) => {
              const docTypeInfo = DOCUMENT_TYPES[doc.document_type as keyof typeof DOCUMENT_TYPES]
              return (
                <Card key={doc.id} padding="md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-success-50 text-success-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        {docTypeInfo ? smallIconMap[docTypeInfo.icon] : <FileText className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-navy-800 text-sm">{doc.title || 'Sin titulo'}</h3>
                        <div className="flex gap-3 text-xs text-gray-400 mt-0.5">
                          <span>{docTypeInfo?.label || doc.document_type}</span>
                          <span>{formatDate(doc.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/documents/${doc.id}/edit`}
                        className="p-2 text-gray-400 hover:text-navy-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-2 text-gray-400 hover:text-success-600 hover:bg-success-50 rounded-lg transition-colors"
                        title="Descargar PDF"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/profile" className="card p-5 hover:shadow-md transition-shadow">
          <h3 className="font-medium text-navy-800 mb-1">Mi perfil de autónomo</h3>
          <p className="text-sm text-gray-500">Configura tus datos fiscales para reutilizarlos en todos tus documentos</p>
        </Link>
        <Link to="/contacts" className="card p-5 hover:shadow-md transition-shadow">
          <h3 className="font-medium text-navy-800 mb-1">Directorio de contactos</h3>
          <p className="text-sm text-gray-500">Guarda los datos de tus clientes para acceder a ellos rápidamente</p>
        </Link>
      </div>
    </div>
  )
}
