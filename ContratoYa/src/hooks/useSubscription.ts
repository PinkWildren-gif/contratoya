import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { FREE_TIER_LIMIT } from '@/lib/constants'

interface SubscriptionState {
  tier: 'free' | 'pro'
  documentsThisMonth: number
  canGenerate: boolean
  loading: boolean
  remainingDocs: number
  incrementCount: () => Promise<void>
}

export function useSubscription(): SubscriptionState {
  const { user } = useAuth()
  const [tier, setTier] = useState<'free' | 'pro'>('free')
  const [documentsThisMonth, setDocumentsThisMonth] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchSubscription = useCallback(async () => {
    if (!user) return
    const { data } = await supabase
      .from('users')
      .select('subscription_tier, documents_generated_this_month')
      .eq('id', user.id)
      .single()

    if (data) {
      setTier((data.subscription_tier as 'free' | 'pro') || 'free')
      setDocumentsThisMonth(data.documents_generated_this_month || 0)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchSubscription()
  }, [fetchSubscription])

  const canGenerate = tier === 'pro' || documentsThisMonth < FREE_TIER_LIMIT
  const remainingDocs = tier === 'pro' ? Infinity : Math.max(0, FREE_TIER_LIMIT - documentsThisMonth)

  const incrementCount = async () => {
    if (!user) return
    await supabase
      .from('users')
      .update({ documents_generated_this_month: documentsThisMonth + 1 })
      .eq('id', user.id)
    setDocumentsThisMonth((c) => c + 1)
  }

  return { tier, documentsThisMonth, canGenerate, loading, remainingDocs, incrementCount }
}
