import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CuentaLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login?next=/cuenta')

  return <>{children}</>
}
