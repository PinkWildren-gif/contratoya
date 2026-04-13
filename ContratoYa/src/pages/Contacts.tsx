import { useState, useMemo } from 'react'
import { useToast } from '@/components/ui/Toast'
import { useContacts } from '@/hooks/useContacts'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { ContactForm } from '@/components/contacts/ContactForm'
import type { Contact } from '@/types/database'
import { Plus, Users, Pencil, Trash2, Search, Loader2 } from 'lucide-react'

export function Contacts() {
  const { contacts, loading, createContact, updateContact, deleteContact } = useContacts()
  const { showSuccess } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts
    const q = searchQuery.toLowerCase()
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.nif_cif?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q)
    )
  }, [contacts, searchQuery])

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setEditingContact(null)
  }

  const handleDelete = async (id: string) => {
    await deleteContact(id)
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
          <h1 className="text-2xl font-serif font-bold text-navy-800">Contactos</h1>
          <p className="text-gray-500 text-sm mt-1">
            Guarda los datos de tus clientes para reutilizarlos en tus documentos
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} size="sm">
          <Plus className="h-4 w-4" />
          Añadir contacto
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6" padding="lg">
          <h2 className="text-lg font-semibold text-navy-800 mb-4">
            {editingContact ? 'Editar contacto' : 'Nuevo contacto'}
          </h2>
          <ContactForm
            contact={editingContact}
            onSubmit={async (data) => {
              const result = editingContact
                ? await updateContact(editingContact.id, data)
                : await createContact(data)
              if (!result.error) showSuccess(editingContact ? 'Contacto actualizado' : 'Contacto creado')
              return result
            }}
            onCancel={handleClose}
          />
        </Card>
      )}

      {contacts.length > 0 && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, NIF o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      )}

      {contacts.length === 0 && !showForm ? (
        <Card>
          <EmptyState
            icon={<Users className="h-12 w-12" />}
            title="Sin contactos"
            description="Añade a tus clientes para rellenar sus datos automáticamente en contratos y facturas"
            action={
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4" />
                Añadir primer contacto
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} padding="md">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-navy-800">{contact.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                    {contact.nif_cif && <span>NIF/CIF: {contact.nif_cif}</span>}
                    {contact.email && <span>{contact.email}</span>}
                    {contact.phone && <span>{contact.phone}</span>}
                  </div>
                  {contact.city && (
                    <p className="text-sm text-gray-400 mt-1">
                      {[contact.address, contact.city, contact.postal_code].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="p-2 text-gray-400 hover:text-navy-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(contact.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
          {searchQuery && filteredContacts.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No se encontraron contactos para &quot;{searchQuery}&quot;
            </p>
          )}
        </div>
      )}

      <Modal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Eliminar contacto"
      >
        <p className="text-gray-600 mb-6">
          ¿Estás seguro de que quieres eliminar este contacto? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  )
}
