import { useState } from 'react'
import { useToast } from '@/components/ui/Toast'
import { useProfiles } from '@/hooks/useProfiles'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { ProfileForm } from '@/components/profile/ProfileForm'
import type { BusinessProfile } from '@/types/database'
import { Plus, User, Pencil, Trash2, Loader2 } from 'lucide-react'

export function Profile() {
  const { profiles, loading, createProfile, updateProfile, deleteProfile } = useProfiles()
  const { showSuccess } = useToast()
  const { t } = useLanguage()
  const [showForm, setShowForm] = useState(false)
  const [editingProfile, setEditingProfile] = useState<BusinessProfile | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const handleEdit = (profile: BusinessProfile) => {
    setEditingProfile(profile)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setEditingProfile(null)
  }

  const handleDelete = async (id: string) => {
    await deleteProfile(id)
    setDeleteConfirm(null)
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
          <h1 className="text-2xl font-serif font-bold text-navy-800">{t('profile.title')}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {t('profile.subtitle')}
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} size="sm">
          <Plus className="h-4 w-4" />
          {t('profile.add')}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6" padding="lg">
          <h2 className="text-lg font-semibold text-navy-800 mb-4">
            {editingProfile ? t('profile.edit') : t('profile.new')}
          </h2>
          <ProfileForm
            profile={editingProfile}
            onSubmit={async (data) => {
              const result = editingProfile
                ? await updateProfile(editingProfile.id, data)
                : await createProfile(data)
              if (!result.error) showSuccess(editingProfile ? t('profile.saved') : t('profile.created'))
              return result
            }}
            onCancel={handleClose}
          />
        </Card>
      )}

      {profiles.length === 0 && !showForm ? (
        <Card>
          <EmptyState
            icon={<User className="h-12 w-12" />}
            title={t('profile.empty.title')}
            description={t('profile.empty.desc')}
            action={
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4" />
                {t('profile.empty.cta')}
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {profiles.map((profile) => (
            <Card key={profile.id} padding="lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-navy-800">{profile.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">NIF: {profile.nif || '—'}</p>
                  <p className="text-sm text-gray-500">
                    {[profile.address, profile.city, profile.postal_code].filter(Boolean).join(', ') || 'Sin dirección'}
                  </p>
                  {profile.iae_activity && (
                    <p className="text-sm text-gray-500">IAE: {profile.iae_activity}</p>
                  )}
                  {profile.is_new_autonomo && (
                    <span className="inline-block mt-2 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                      Autónomo nuevo (IRPF 7%)
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(profile)}
                    className="p-2 text-gray-400 hover:text-navy-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(profile.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title={t('profile.delete.title')}
      >
        <p className="text-gray-600 mb-6">
          {t('profile.delete.confirm')}
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
