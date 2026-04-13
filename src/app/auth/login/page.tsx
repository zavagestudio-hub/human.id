'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { createClient } from '@/lib/supabase/client'
import styles from './page.module.css'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/cuenta'

  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [magicSent, setMagicSent] = useState(false)

  const supabase = createClient()

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push(next)
    router.refresh()
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${next}` },
    })
    if (error) { setError(error.message); setLoading(false); return }
    setMagicSent(true)
    setLoading(false)
  }

  if (magicSent) {
    return (
      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.sentIcon}>✉</div>
          <h2 className={styles.title}>Revisa tu correo</h2>
          <p className={styles.sub}>Te enviamos un enlace mágico a <strong>{email}</strong>. Haz clic en el enlace para ingresar.</p>
          <button className={styles.linkBtn} onClick={() => setMagicSent(false)}>Intentar de nuevo</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <Link href="/" className={styles.logoWrap}><Logo variant="light" height={32} /></Link>
        <h1 className={styles.title}>Ingresar a tu cuenta</h1>

        <div className={styles.modeTabs}>
          <button className={`${styles.modeTab} ${mode === 'password' ? styles.modeTabActive : ''}`} onClick={() => setMode('password')}>
            Contraseña
          </button>
          <button className={`${styles.modeTab} ${mode === 'magic' ? styles.modeTabActive : ''}`} onClick={() => setMode('magic')}>
            Enlace mágico
          </button>
        </div>

        <form onSubmit={mode === 'password' ? handlePassword : handleMagicLink} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Correo electrónico</label>
            <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="tu@correo.com" required autoComplete="email" />
          </div>

          {mode === 'password' && (
            <div className={styles.field}>
              <label className={styles.label}>Contraseña</label>
              <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required autoComplete="current-password" />
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Cargando…' : mode === 'password' ? 'Ingresar' : 'Enviar enlace'}
          </button>
        </form>

        <p className={styles.footer}>
          ¿No tienes cuenta?{' '}
          <Link href="/auth/signup" className={styles.footerLink}>Crear cuenta</Link>
        </p>
      </div>
    </div>
  )
}
