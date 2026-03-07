import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-[#030014]">
      <DashboardSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto lg:ml-60">
        {children}
      </main>
    </div>
  )
}
