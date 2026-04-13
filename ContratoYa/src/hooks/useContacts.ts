import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { Contact } from '@/types/database'
import type { ContactFormData } from '@/types/forms'

export function useContacts() {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  const fetchContacts = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', user.id)
      .order('name', { ascending: true })

    if (!error && data) setContacts(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const createContact = async (formData: ContactFormData) => {
    if (!user) return { error: new Error('No user') }
    const { error } = await supabase
      .from('contacts')
      .insert({ ...formData, user_id: user.id })

    if (!error) await fetchContacts()
    return { error: error ? new Error(error.message) : null }
  }

  const updateContact = async (id: string, formData: ContactFormData) => {
    const { error } = await supabase
      .from('contacts')
      .update(formData)
      .eq('id', id)

    if (!error) await fetchContacts()
    return { error: error ? new Error(error.message) : null }
  }

  const deleteContact = async (id: string) => {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)

    if (!error) await fetchContacts()
    return { error: error ? new Error(error.message) : null }
  }

  return { contacts, loading, createContact, updateContact, deleteContact, refetch: fetchContacts }
}
