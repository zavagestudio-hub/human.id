import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ProfileRow } from '@/types/database'
import type { HumanProfile } from '@/types/index'
import styles from './page.module.css'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase.from('profiles').select('medical_data').eq('slug', params.slug).single()
  if (!data) return { title: 'Perfil no encontrado — Human ID' }
  const name = (data.medical_data as any)?.name ?? 'Usuario'
  return {
    title: `${name} — Human ID`,
    description: `Perfil médico de emergencia de ${name}. Escanea el QR para ver su información.`,
  }
}

export default async function PublicProfilePage({ params }: Props) {
  const supabase = createClient()
  const { data: row } = await supabase
    .from('profiles')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!row || row.status !== 'active') notFound()

  const p = row as ProfileRow
  const m = p.medical_data as HumanProfile

  const severityColor: Record<string, string> = {
    leve: 'var(--color-chronic)', moderada: 'var(--color-allergy)',
    severa: 'var(--color-allergy)', anafilaxis: 'var(--color-allergy)',
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.emergency}>PERFIL DE EMERGENCIA</div>
          <h1 className={styles.name}>{m.name}</h1>
          <div className={styles.meta}>
            {m.age && <span>{m.age} años</span>}
            {m.sex && <span>{m.sex}</span>}
            {m.nationality && <span>{m.nationality}</span>}
          </div>
        </div>
        {p.blood_type && (
          <div className={styles.blood}>
            <div className={styles.bloodLabel}>TIPO DE SANGRE</div>
            <div className={styles.bloodValue}>{p.blood_type}</div>
          </div>
        )}
      </header>

      <main className={styles.main}>

        {/* Datos físicos */}
        {(m.weight || m.height) && (
          <div className={styles.row}>
            {m.weight && <div className={styles.stat}><span className={styles.statVal}>{m.weight} kg</span><span className={styles.statLbl}>Peso</span></div>}
            {m.height && <div className={styles.stat}><span className={styles.statVal}>{m.height} cm</span><span className={styles.statLbl}>Talla</span></div>}
          </div>
        )}

        {/* Alertas críticas */}
        {m.allergies.length > 0 && (
          <section className={styles.section}>
            <h2 className={`${styles.sectionTitle} ${styles.danger}`}>⚠ Alergias</h2>
            <div className={styles.tagList}>
              {m.allergies.map((a, i) => (
                <span key={i} className={styles.allergyTag} style={{ background: 'var(--color-allergy-light)', borderColor: 'var(--color-allergy)' }}>
                  <strong>{a.name}</strong> — {a.severity}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Condiciones crónicas */}
        {m.conditions.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Condiciones crónicas</h2>
            <ul className={styles.list}>
              {m.conditions.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </section>
        )}

        {/* Medicamentos */}
        {m.medications.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Medicamentos actuales</h2>
            <div className={styles.medList}>
              {m.medications.map((med, i) => (
                <div key={i} className={styles.medCard}>
                  <strong>{med.name}</strong>
                  <span>{med.dose} · {med.frequency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Discapacidades */}
        {m.disabilities.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Discapacidades</h2>
            <ul className={styles.list}>
              {m.disabilities.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </section>
        )}

        {/* Paramédico */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Información para paramédicos</h2>
          <div className={styles.boolRow}>
            <div className={`${styles.boolItem} ${m.hasPacemaker ? styles.boolOn : ''}`}>
              <span>{m.hasPacemaker ? '✓' : '✗'}</span> Marcapasos
            </div>
            <div className={`${styles.boolItem} ${m.hasProsthetics ? styles.boolOn : ''}`}>
              <span>{m.hasProsthetics ? '✓' : '✗'}</span> Prótesis
            </div>
            <div className={`${styles.boolItem} ${m.organDonor ? styles.boolOn : ''}`}>
              <span>{m.organDonor ? '✓' : '✗'}</span> Donador de órganos
            </div>
          </div>
          {m.specialInstructions && (
            <div className={styles.instructions}>
              <strong>Instrucciones especiales:</strong>
              <p>{m.specialInstructions}</p>
            </div>
          )}
        </section>

        {/* Seguro */}
        {m.insurance.company && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Seguro médico</h2>
            <p><strong>{m.insurance.company}</strong> — Póliza: {m.insurance.policyNumber}</p>
          </section>
        )}

        {/* Contactos de emergencia */}
        {m.emergencyContacts.length > 0 && (
          <section className={styles.section}>
            <h2 className={`${styles.sectionTitle} ${styles.danger}`}>Contactos de emergencia</h2>
            {m.emergencyContacts.map((c, i) => (
              <div key={i} className={styles.contactCard}>
                <div className={styles.contactName}>{c.name}</div>
                <div className={styles.contactMeta}>{c.relationship}</div>
                <a href={`tel:${c.phone}`} className={styles.contactPhone}>{c.phone}</a>
              </div>
            ))}
          </section>
        )}

        {/* Médico tratante */}
        {m.doctor.name && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Médico tratante</h2>
            <div className={styles.contactCard}>
              <div className={styles.contactName}>{m.doctor.name}</div>
              <div className={styles.contactMeta}>{m.doctor.clinic}</div>
              {m.doctor.phone && <a href={`tel:${m.doctor.phone}`} className={styles.contactPhone}>{m.doctor.phone}</a>}
            </div>
          </section>
        )}

        {/* Historial */}
        {m.surgeries.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Cirugías previas</h2>
            <ul className={styles.list}>
              {m.surgeries.map((s, i) => <li key={i}>{s.description} ({s.year})</li>)}
            </ul>
          </section>
        )}

      </main>

      <footer className={styles.footer}>
        <p>Perfil generado con <strong>Human ID</strong> · human-id.app</p>
        <p className={styles.footerSub}>Escanea el QR para ver este perfil en tiempo real</p>
      </footer>
    </div>
  )
}
