'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Plus, Settings, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import ThemeToggle from '@/components/ui/ThemeToggle'
import clsx from 'clsx'

const nav = [
  { href: '/dashboard', label: 'Jobs', icon: LayoutDashboard },
  { href: '/jobs/new', label: 'New Job', icon: Plus },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const sb = createClient()
    await sb.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-56 min-h-screen bg-surface border-r border-border flex flex-col">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <img src="/favicon-32x32.png" alt="Intro Production" className="w-5 h-5" />
          <span className="font-bold text-sm tracking-tight">Intro Production</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
                ? 'bg-accent/10 text-accent'
                : 'text-muted hover:text-text hover:bg-border/50'
            )}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-border space-y-0.5">
        <ThemeToggle />
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full"
          style={{ color: 'var(--muted)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--error)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
