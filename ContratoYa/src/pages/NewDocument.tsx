import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Questionnaire } from '@/components/questionnaire/Questionnaire'
import { getDocumentConfig } from '@/lib/document-configs'
import { generatePdf } from '@/lib/pdf'
import { supabase } from '@/lib/supabase'
import { useProfiles } from '@/hooks/useProfiles'
import { useSubscription } from '@/hooks/useSubscription'
import { Button } from '@/components/ui/Button'
import type { DocumentType } from '@/types/database'
import { FREE_TIER_LIMIT, TEMPLATE_VERSION } from '@/lib/constants'
import { ArrowLeft, Download, FileText, Eye, Lock, AlertTriangle } from 'lucide-react'

export function NewDocument() {
  const { type } = useParams<{ type: string }>()
  const { user } = useAuth()
  const { profiles } = useProfiles()
  const { canGenerate, remainingDocs, tier, incrementCount } = useSubscription()
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null)
  const [disclaimerChecked, setDisclaimerChecked] = useState(false)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [downloadConfirmed, setDownloadConfirmed] = useState(false)

  const docType = type as DocumentType
  const config = getDocumentConfig(docType)

  if (!config) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold text-navy-800 mb-2">
          Documento no disponible
        </h1>
        <p className="text-gray-500 mb-6">
          Este tipo de documento aún no está disponible. Estamos trabajando en ello.
        </p>
        <Link to="/dashboard">
          <Button variant="outline">Volver al panel</Button>
        </Link>
      </div>
    )
  }

  // Pre-fill from saved business profile
  const getInitialData = (): Record<string, unknown> => {
    const profile = profiles[0]
    if (!profile) return {}

    const fieldMapping: Record<string, Record<string, string>> = {
      invoice: {
        emitter_name: 'name', emitter_nif: 'nif', emitter_address: 'address',
        emitter_city: 'city', emitter_postal_code: 'postal_code',
        emitter_phone: 'phone', emitter_email: 'email', emitter_iae: 'iae_activity',
      },
      service_contract: {
        provider_name: 'name', provider_nif: 'nif', provider_address: 'address',
        provider_email: 'email', provider_phone: 'phone',
      },
      nda: {
        disclosing_party_name: 'name', disclosing_party_nif: 'nif', disclosing_party_address: 'address',
      },
      quote: {
        provider_name: 'name', provider_nif: 'nif', provider_address: 'address',
        provider_email: 'email', provider_phone: 'phone',
      },
      lease: {},
      privacy_policy: {
        business_name: 'name', business_nif: 'nif', business_address: 'address',
        business_email: 'email', business_phone: 'phone',
      },
    }

    const mapping = fieldMapping[docType]
    if (!mapping) return {}

    const data: Record<string, unknown> = {}
    for (const [formField, profileField] of Object.entries(mapping)) {
      const val = profile[profileField as keyof typeof profile]
      if (val) data[formField] = val
    }

    // Set default tax values for invoices
    if (docType === 'invoice') {
      data.iva_rate = '21'
      data.apply_irpf = true
      data.irpf_rate = profile.is_new_autonomo ? '7' : '15'
    }

    // Build full address for contracts
    if (docType === 'service_contract' && profile.address) {
      data.provider_address = [profile.address, profile.city, profile.postal_code].filter(Boolean).join(', ')
    }
    if (docType === 'nda' && profile.address) {
      data.disclosing_party_address = [profile.address, profile.city, profile.postal_code].filter(Boolean).join(', ')
    }
    if (docType === 'quote' && profile.address) {
      data.provider_address = [profile.address, profile.city, profile.postal_code].filter(Boolean).join(', ')
    }
    if (docType === 'privacy_policy' && profile.address) {
      data.business_address = [profile.address, profile.city, profile.postal_code].filter(Boolean).join(', ')
    }

    return data
  }

  const handleComplete = async (data: Record<string, unknown>) => {
    setLoading(true)
    setFormData(data)

    try {
      // Generate PDF
      const doc = generatePdf(docType, data)
      const pdfUrl = doc.output('datauristring')
      setPdfDataUrl(pdfUrl)

      // Save to database and increment counter
      if (user) {
        const title = config.generateTitle(data)
        await supabase.from('documents').insert({
          user_id: user.id,
          document_type: docType,
          title,
          form_data: { ...data, _template_version: TEMPLATE_VERSION, _generated_at: new Date().toISOString() },
        })
        await incrementCount()
      }

      setGenerated(true)
    } catch (err) {
      console.error('Error generating document:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!formData) return
    const doc = generatePdf(docType, formData)
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
          <h1 className="text-2xl font-serif font-bold text-navy-800 mb-2">
            ¡Documento generado!
          </h1>
          <p className="text-gray-500">
            {config.generateTitle(formData)}
          </p>
        </div>

        {/* Download confirmation disclaimer */}
        <div className="card p-5 mb-8 border-amber-200 bg-amber-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium mb-2">
                Antes de descargar, confirme que ha revisado el documento:
              </p>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={downloadConfirmed}
                  onChange={(e) => setDownloadConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-success-600 focus:ring-success-500"
                />
                <span className="text-xs text-amber-700 leading-relaxed">
                  He revisado este documento y entiendo que ContratoYa <strong>no garantiza su exactitud,
                  completitud ni idoneidad legal</strong>. Me comprometo a obtener asesoramiento juridico
                  independiente antes de firmarlo o utilizarlo para cualquier proposito legal.
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button onClick={handleDownload} size="lg" disabled={!downloadConfirmed}>
            <Download className="h-5 w-5" />
            Descargar PDF
          </Button>
          <Button variant="outline" onClick={() => {
            if (pdfDataUrl) {
              const newWindow = window.open()
              if (newWindow) {
                newWindow.document.write(`<iframe src="${pdfDataUrl}" width="100%" height="100%" style="border:none;position:absolute;top:0;left:0;right:0;bottom:0;"></iframe>`)
              }
            }
          }}>
            <Eye className="h-5 w-5" />
            Vista previa
          </Button>
        </div>

        {/* Inline PDF preview */}
        {pdfDataUrl && (
          <div className="card overflow-hidden mb-8">
            <iframe
              src={pdfDataUrl}
              className="w-full h-[600px] border-0"
              title="Vista previa del documento"
            />
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Link to="/dashboard">
            <Button variant="ghost">Volver al panel</Button>
          </Link>
          <Button variant="outline" onClick={() => { setGenerated(false); setPdfDataUrl(null) }}>
            Editar y regenerar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al panel
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-navy-800">
          {config.label}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{config.description}</p>
        {tier === 'free' && (
          <p className="text-xs text-gray-400 mt-2">
            {remainingDocs > 0
              ? `Te quedan ${remainingDocs} documento(s) gratis este mes`
              : 'Has alcanzado el límite del plan gratuito'}
          </p>
        )}
      </div>

      {!canGenerate ? (
        <div className="card p-8 text-center">
          <Lock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-serif font-bold text-navy-800 mb-2">
            Limite mensual alcanzado
          </h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Has usado tus {FREE_TIER_LIMIT} documentos gratuitos de este mes.
            Pasa a Pro para generar documentos ilimitados.
          </p>
          <Link to="/pricing">
            <Button size="lg">Ver planes Pro</Button>
          </Link>
        </div>
      ) : !disclaimerAccepted ? (
        <div className="card p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-navy-800 mb-1">Aviso legal importante</h2>
              <p className="text-sm text-gray-500">Lea y acepte antes de continuar</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 mb-6 text-sm text-gray-700 space-y-3">
            <p>
              <strong>ContratoYa no es un despacho de abogados</strong> y no proporciona asesoramiento juridico.
              Los documentos generados son plantillas orientativas basadas en la informacion que usted proporciona.
            </p>
            <p>
              Los documentos <strong>pueden contener errores, omisiones o imprecisiones</strong>. Usted es el unico
              responsable de revisar y verificar cualquier documento antes de firmarlo o utilizarlo.
            </p>
            <p>
              <strong>Le recomendamos encarecidamente</strong> consultar con un abogado colegiado antes de
              utilizar cualquier documento generado para fines legales.
            </p>
          </div>
          <label className="flex items-start gap-3 cursor-pointer mb-6">
            <input
              type="checkbox"
              checked={disclaimerChecked}
              onChange={(e) => setDisclaimerChecked(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-success-600 focus:ring-success-500"
            />
            <span className="text-sm text-gray-600">
              Entiendo y acepto que los documentos generados no constituyen asesoramiento juridico y que
              debo revisarlos cuidadosamente antes de su uso. Acepto las{' '}
              <Link to="/terms" className="text-success-600 hover:text-success-700 underline" target="_blank">
                Condiciones de Uso
              </Link>.
            </span>
          </label>
          <Button onClick={() => setDisclaimerAccepted(true)} disabled={!disclaimerChecked} className="w-full">
            Continuar con la generacion del documento
          </Button>
        </div>
      ) : (
        <Questionnaire
          config={config}
          initialData={getInitialData()}
          onComplete={handleComplete}
          loading={loading}
        />
      )}
    </div>
  )
}
