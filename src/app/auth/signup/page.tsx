'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { createClient } from '@/lib/supabase/client'
import styles from '../login/page.module.css'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const supabase = createClient()

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Las contraseñas no coinciden'); return }
    if (password.length < 8) { setError('La contraseña debe tener al menos 8 caracteres'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/registro` },
    })
    if (error) { setError(error.message); setLoading(false); return }
    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.sentIcon}>✉</div>
          <h2 className={styles.title}>Confirma tu correo</h2>
          <p className={styles.sub}>
            Te enviamos un correo a <strong>{email}</strong>.<br />
            Haz clic en el enlace para activar tu cuenta y continuar con tu perfil.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <Link href="/" className={styles.logoWrap}><Logo variant="light" height={32} /></Link>
        <h1 className={styles.title}>Crear tu cuenta</h1>
        <p className={styles.sub}>Paso 1 de 2 — Después llenarás tu perfil médico</p>

        <form onSubmit={handleSignUp} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Correo electrónico</label>
            <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="tu@correo.com" required autoComplete="email" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Contraseña</label>
            <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres" required autoComplete="new-password" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Confirmar contraseña</label>
            <input className={styles.input} type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
              placeholder="Repite tu contraseña" required autoComplete="new-password" />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login" className={styles.footerLink}>Ingresar</Link>
        </p>
      </div>
    </div>
  )
}
