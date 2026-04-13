import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
      background: 'var(--color-bg-page)',
    }}>
      <div style={{
        background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
        borderRadius: '16px', padding: '3rem 2.5rem', maxWidth: '400px',
        width: '100%', textAlign: 'center',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Error de autenticación
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          El enlace expiró o no es válido. Por favor intenta de nuevo.
        </p>
        <Link href="/auth/login" style={{
          display: 'inline-block', background: 'var(--color-brand-primary)',
          color: '#fff', fontWeight: 700, padding: '0.7rem 1.75rem',
          borderRadius: '8px', textDecoration: 'none',
        }}>
          Volver al login
        </Link>
      </div>
    </div>
  )
}
