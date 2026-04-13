import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { BusinessProfile } from '@/types/database'
import type { BusinessProfileFormData } from '@/types/forms'

export function useProfiles() {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState<BusinessProfile[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProfiles = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) setProfiles(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  const createProfile = async (formData: BusinessProfileFormData) => {
    if (!user) return { error: new Error('No user') }
    const { error } = await supabase
      .from('business_profiles')
      .insert({ ...formData, user_id: user.id })

    if (!error) await fetchProfiles()
    return { error: error ? new Error(error.message) : null }
  }

  const updateProfile = async (id: string, formData: BusinessProfileFormData) => {
    const { error } = await supabase
      .from('business_profiles')
      .update(formData)
      .eq('id', id)

    if (!error) await fetchProfiles()
    return { error: error ? new Error(error.message) : null }
  }

  const deleteProfile = async (id: string) => {
    const { error } = await supabase
      .from('business_profiles')
      .delete()
      .eq('id', id)

    if (!error) await fetchProfiles()
    return { error: error ? new Error(error.message) : null }
  }

  return { profiles, loading, createProfile, updateProfile, deleteProfile, refetch: fetchProfiles }
}
