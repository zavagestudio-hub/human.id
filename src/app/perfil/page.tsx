'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import QRCode from 'qrcode'
import profile from '@/data/profile'
import { getInitials, getProfileUrl } from '@/lib/utils'
import styles from './page.module.css'
import { Logo } from '@/components/Logo'
import CardPrint from './CardPrint'

// ── Severity map ──────────────────────────────
const severityClass: Record<string, string> = {
  leve:       styles.severLeve,
  moderada:   styles.severModerada,
  severa:     styles.severSevera,
  anafilaxis: styles.severAnafilaxis,
}

const severityLabel: Record<string, string> = {
  leve:       'Leve',
  moderada:   'Moderada',
  severa:     'Severa',
  anafilaxis: '⚡ Anafilaxis',
}

// ── Section wrapper ───────────────────────────
function Section({ icon, color, title, children }: {
  icon: React.ReactNode
  color: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionIcon} style={{ background: color }}>
          {icon}
        </div>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  )
}

// ── Main page ─────────────────────────────────
export default function PerfilPage() {
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    QRCode.toDataURL(getProfileUrl(), {
      width: 240,
      margin: 1,
      color: { dark: '#1a1a1a', light: '#ffffff' },
      errorCorrectionLevel: 'H',
    }).then(setQrDataUrl)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(getProfileUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => window.print()

  const initials = getInitials(profile.name)

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo variant="light" />
        </Link>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline} onClick={handleCopy}>
            {copied ? '✓ Copiado' : 'Copiar enlace'}
          </button>
          <button className={styles.btnPrimary} onClick={handlePrint}>
            Imprimir QR
          </button>
        </div>
      </header>

      <main className={styles.main}>

        {/* ── SECCIÓN 1: Banner principal (rojo) ── */}
        <div className={styles.heroBanner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroAvatarWrap}>
              {profile.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photo} alt={profile.name} width={90} height={90} className={styles.heroAvatar} />
              ) : (
                <div className={styles.heroAvatarInitials}>{initials}</div>
              )}
              {profile.organDonor && (
                <div className={styles.donorBadge} title="Donador de órganos">💙</div>
              )}
            </div>
            <div>
              <div className={styles.heroName}>{profile.name}</div>
              <div className={styles.heroMeta}>
                {profile.age} años · {profile.sex} · {profile.weight} kg · {profile.height} cm
              </div>
              <div className={styles.heroNationality}>🇲🇽 {profile.nationality}</div>
              <div className={styles.heroRunner}>
                <span className={styles.runnerBadge}>🏃 Runner</span>
                <span className={styles.disciplineBadge}>{profile.discipline}</span>
              </div>
            </div>
          </div>
          <div className={styles.bloodPanel}>
            <div className={styles.bloodPanelLabel}>SANGRE</div>
            <div className={styles.bloodPanelBadge}>{profile.bloodType}</div>
            <div className={styles.bloodPanelSub}>Tipo sanguíneo</div>
          </div>
        </div>

        {/* ── SECCIÓN 2: Contactos de emergencia (ámbar) ── */}
        <div className={styles.emergencyBlock}>
          <div className={styles.emergencyBlockHeader}>
            <span className={styles.emergencyBlockIcon}>📞</span>
            <span className={styles.emergencyBlockTitle}>CONTACTOS DE EMERGENCIA</span>
          </div>
          <div className={styles.emergencyContactsList}>
            {profile.emergencyContacts.map((c, i) => (
              <div key={i} className={styles.emergencyContactItem}>
                <div className={styles.emergencyContactMeta}>
                  <span className={styles.emergencyContactRelation}>{c.relationship}</span>
                  <span className={styles.emergencyContactName}>{c.name}</span>
                </div>
                <a href={`tel:${c.phone}`} className={styles.emergencyContactPhone}>{c.phone}</a>
              </div>
            ))}
            <div className={styles.emergencyContactItem}>
              <div className={styles.emergencyContactMeta}>
                <span className={styles.emergencyContactRelation}>Médico de cabecera</span>
                <span className={styles.emergencyContactName}>{profile.doctor.name}</span>
                <span className={styles.emergencyDoctorClinic}>{profile.doctor.clinic}</span>
              </div>
              <a href={`tel:${profile.doctor.phone}`} className={styles.emergencyContactPhone}>
                {profile.doctor.phone}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.grid}>

          {/* ── SECCIÓN 3: Alergias (rojo claro) ── */}
          <Section
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#c0392b"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>}
            color="#FCEBEB"
            title="Alergias"
          >
            <div className={styles.allergyList}>
              {profile.allergies.map((a, i) => (
                <div key={i} className={styles.allergyItem}>
                  <span className={styles.allergyName}>{a.name}</span>
                  <span className={`${styles.severityBadge} ${severityClass[a.severity]}`}>
                    {severityLabel[a.severity]}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── SECCIÓN 4: Condiciones y discapacidades ── */}
          <Section
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#534AB7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>}
            color="#EEEDFE"
            title="Condiciones médicas"
          >
            <div className={styles.pills}>
              {profile.conditions.map((c, i) => (
                <span key={i} className={`${styles.pill} ${styles.pillPurple}`}>{c}</span>
              ))}
            </div>
            {profile.disabilities.length > 0 && (
              <>
                <div className={styles.subsectionLabel}>Discapacidades</div>
                <div className={styles.pills}>
                  {profile.disabilities.map((d, i) => (
                    <span key={i} className={`${styles.pill} ${styles.pillGray}`}>{d}</span>
                  ))}
                </div>
              </>
            )}
          </Section>

          {/* ── SECCIÓN 5: Medicamentos ── */}
          <Section
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#0F6E56"><path d="M6.5 10h-2v5h2v-5zm6 0h-2v5h2v-5zm8.5 7H2v2h19v-2zm-2.5-7h-2v5h2v-5zM11.5 1L2 6v2h19V6l-9.5-5z"/></svg>}
            color="#E1F5EE"
            title="Medicamentos actuales"
          >
            {profile.medications.map((m, i) => (
              <div key={i} className={styles.medItem}>
                <span className={styles.medName}>{m.name}</span>
                <div className={styles.medDetail}>{m.dose} · {m.frequency}</div>
              </div>
            ))}
          </Section>

          {/* ── SECCIÓN 6: Historial médico ── */}
          <Section
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#1D4ED8"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>}
            color="#DBEAFE"
            title="Historial médico"
          >
            {profile.surgeries.length > 0 && (
              <div className={styles.histGroup}>
                <div className={styles.histGroupTitle}>Cirugías previas</div>
                {profile.surgeries.map((s, i) => (
                  <div key={i} className={styles.histItem}>
                    <span className={styles.histDot}>•</span>
                    <span>{s.description}</span>
                    <span className={styles.histYear}>{s.year}</span>
                  </div>
                ))}
              </div>
            )}
            {profile.vaccines.length > 0 && (
              <div className={styles.histGroup}>
                <div className={styles.histGroupTitle}>Vacunas</div>
                <div className={styles.pills}>
                  {profile.vaccines.map((v, i) => (
                    <span key={i} className={`${styles.pill} ${styles.pillGreen}`}>{v}</span>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* ── SECCIÓN 7: Info para paramédicos ── */}
          <Section
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#B45309"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>}
            color="#FEF3C7"
            title="Información para paramédicos"
          >
            <div className={styles.paraGrid}>
              <div className={styles.paraItem}>
                <span className={styles.paraIcon}>{profile.hasPacemaker ? '✅' : '🚫'}</span>
                <span className={styles.paraLabel}>Marcapasos</span>
                <span className={styles.paraVal}>{profile.hasPacemaker ? 'SÍ' : 'NO'}</span>
              </div>
              <div className={styles.paraItem}>
                <span className={styles.paraIcon}>{profile.hasProsthetics ? '✅' : '🚫'}</span>
                <span className={styles.paraLabel}>Prótesis / Implante</span>
                <span className={styles.paraVal}>{profile.hasProsthetics ? 'SÍ' : 'NO'}</span>
              </div>
              <div className={styles.paraItem}>
                <span className={styles.paraIcon}>{profile.organDonor ? '💙' : '🚫'}</span>
                <span className={styles.paraLabel}>Donador de órganos</span>
                <span className={styles.paraVal}>{profile.organDonor ? 'SÍ' : 'NO'}</span>
              </div>
              <div className={styles.paraItem}>
                <span className={styles.paraIcon}>🛡️</span>
                <span className={styles.paraLabel}>Seguro médico</span>
                <span className={styles.paraVal}>{profile.insurance.company}</span>
              </div>
              <div className={`${styles.paraItem} ${styles.paraItemFull}`}>
                <span className={styles.paraIcon}>📋</span>
                <span className={styles.paraLabel}>No. de póliza</span>
                <span className={styles.paraVal}>{profile.insurance.policyNumber}</span>
              </div>
            </div>
            {profile.specialInstructions && (
              <div className={styles.alertBox}>
                <div className={styles.alertBoxIcon}>⚠️</div>
                <div>
                  <div className={styles.alertBoxTitle}>INSTRUCCIONES ESPECIALES</div>
                  <p className={styles.alertBoxText}>{profile.specialInstructions}</p>
                </div>
              </div>
            )}
          </Section>

          {/* ── SECCIÓN 8: Identidad runner ── */}
          <Section
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#DC2626"><path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/></svg>}
            color="#FEE2E2"
            title="Identidad del runner"
          >
            <div className={styles.runnerDisciplineWrap}>
              <span className={styles.runnerDisciplineTag}>{profile.discipline}</span>
            </div>
            <div className={styles.runnerEventsLabel}>Eventos habituales</div>
            <div className={styles.pills}>
              {profile.regularEvents.map((e, i) => (
                <span key={i} className={`${styles.pill} ${styles.pillRed}`}>🏅 {e}</span>
              ))}
            </div>
          </Section>

        </div>

        {/* ── SECCIÓN 9: QR ── */}
        <div className={styles.qrSection}>
          {qrDataUrl && (
            <div className={styles.qrBox}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="Código QR del perfil" width={160} height={160} />
            </div>
          )}
          <div className={styles.qrInfo}>
            <p className={styles.qrLabel}>Escanea para ver este perfil médico</p>
            <p className={styles.qrUrl}>human-id.app/perfil</p>
            <p className={styles.qrSub}>Imprime y coloca en tu llavero, pulsera o tarjeta</p>
          </div>
        </div>

        <div className={styles.footer}>
          <Logo variant="light" />
        </div>

      </main>

      {/* ── Tarjeta física — solo visible al imprimir ── */}
      <CardPrint qrDataUrl={qrDataUrl} />

    </div>
  )
}
