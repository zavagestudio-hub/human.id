import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import type { ProfileRow, SubscriptionRow } from '@/types/database'
import { getPublicProfileUrl } from '@/lib/utils'
import styles from './page.module.css'

export default async function CuentaPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/cuenta')

  const [{ data: profile }, { data: sub }] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user.id).single(),
    supabase.from('subscriptions').select('*').eq('user_id', user.id).single(),
  ])

  const p = profile as ProfileRow | null
  const s = sub as SubscriptionRow | null
  const name = (p?.medical_data as any)?.name ?? user.email

  const statusLabel: Record<string, string> = {
    active: 'Activa', incomplete: 'Pendiente de pago',
    past_due: 'Pago vencido', canceled: 'Cancelada', unpaid: 'Sin pagar',
  }
  const statusColor: Record<string, string> = {
    active: 'var(--color-ok)', incomplete: 'var(--color-chronic)',
    past_due: 'var(--color-allergy)', canceled: 'var(--color-text-secondary)', unpaid: 'var(--color-allergy)',
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <Link href="/"><Logo variant="light" height={28} /></Link>
        <nav className={styles.nav}>
          <Link href="/cuenta/editar" className={styles.navLink}>Editar perfil</Link>
          <Link href="/cuenta/membresia" className={styles.navLink}>Membresía</Link>
          <form action="/api/auth/signout" method="post">
            <Link href="/auth/logout" className={styles.navLinkOut}>Salir</Link>
          </form>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroName}>Hola, {name?.split(' ')[0]}</h1>
          <p className={styles.heroSub}>Este es tu panel de Human ID</p>
        </div>

        <div className={styles.grid}>
          {/* Estado de membresía */}
          <div className={styles.card}>
            <div className={styles.cardLabel}>Membresía</div>
            <div className={styles.cardValue} style={{ color: statusColor[s?.status ?? 'incomplete'] }}>
              {statusLabel[s?.status ?? 'incomplete'] ?? 'Sin plan'}
            </div>
            {s?.current_period_end && (
              <p className={styles.cardNote}>
                Renueva el {new Date(s.current_period_end).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
            {!s && (
              <Link href="/registro" className={styles.cardCta}>Activar Human ID</Link>
            )}
            {s && s.status !== 'active' && (
              <Link href="/cuenta/membresia" className={styles.cardCta}>Ver detalles</Link>
            )}
          </div>

          {/* Perfil público */}
          {p && (
            <div className={styles.card}>
              <div className={styles.cardLabel}>Tu perfil público</div>
              <div className={styles.cardValue} style={{ fontSize: '1rem', wordBreak: 'break-all' }}>
                human-id.app/p/{p.slug}
              </div>
              {p.status === 'active' ? (
                <Link href={`/p/${p.slug}`} target="_blank" className={styles.cardCta}>Ver perfil →</Link>
              ) : (
                <p className={styles.cardNote}>Activa tu membresía para que sea visible</p>
              )}
            </div>
          )}

          {/* Tipo de sangre destacado */}
          {p?.blood_type && (
            <div className={`${styles.card} ${styles.cardBlood}`}>
              <div className={styles.cardLabel}>Tipo de sangre</div>
              <div className={styles.bloodType}>{p.blood_type}</div>
            </div>
          )}

          {/* Accesos rápidos */}
          <div className={styles.card}>
            <div className={styles.cardLabel}>Acciones</div>
            <div className={styles.actions}>
              <Link href="/cuenta/editar" className={styles.actionBtn}>Editar perfil médico</Link>
              <Link href="/cuenta/membresia" className={styles.actionBtn}>Gestionar membresía</Link>
              {p && <Link href={getPublicProfileUrl(p.slug)} target="_blank" className={styles.actionBtn}>Ver QR público</Link>}
            </div>
          </div>
        </div>

        {/* Resumen médico */}
        {p && (
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Resumen de tu perfil</h2>
            <div className={styles.summaryGrid}>
              {[(p.medical_data as any)?.allergies?.length > 0 && `${(p.medical_data as any).allergies.length} alergia(s)`,
                (p.medical_data as any)?.medications?.length > 0 && `${(p.medical_data as any).medications.length} medicamento(s)`,
                (p.medical_data as any)?.conditions?.length > 0 && `${(p.medical_data as any).conditions.length} condición(es) crónica(s)`,
                (p.medical_data as any)?.emergencyContacts?.length > 0 && `${(p.medical_data as any).emergencyContacts.length} contacto(s) de emergencia`,
              ].filter(Boolean).map((item, i) => (
                <div key={i} className={styles.summaryItem}>{item as string}</div>
              ))}
            </div>
            <Link href="/cuenta/editar" className={styles.editLink}>Editar información →</Link>
          </div>
        )}

        {!p && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>Aún no has creado tu perfil médico.</p>
            <Link href="/registro" className={styles.emptyBtn}>Crear mi Human ID</Link>
          </div>
        )}
      </main>
    </div>
  )
}
