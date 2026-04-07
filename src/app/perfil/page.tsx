'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import QRCode from 'qrcode'
import profile from '@/data/profile'
import { getProfileUrl } from '@/lib/utils'
import styles from './page.module.css'
import { Allergy, Medication } from '@/types'
import { Logo } from '@/components/Logo'
import { MedicalBadge } from '@/components/Badge'

// ── Removing severity helpers since we use MedicalBadge now ─────────

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

// ── QR Card (frente + reverso CR-80) ─────────
function PhysicalCard({ qrDataUrl }: { qrDataUrl: string }) {
  return (
    <div className={styles.cardWrap}>
      <div className={styles.cardLabel}>
        <span className={styles.cardLabelIcon}>💳</span>
        Tarjeta física CR-80 — Listo para imprimir
      </div>
      <div className={styles.crCards}>
        {/* Frente */}
        <div className={styles.crFront}>
          <div className={styles.crFrontTop}>
            <div className={styles.crAvatar}>
              <Image src="/avatar-demo.png" alt="Foto" width={56} height={56} className={styles.crAvatarImg} />
            </div>
            <div>
              <div className={styles.crName}>{profile.name}</div>
              <div className={styles.crMeta}>
                {profile.age} años · {profile.sex} · {profile.weight} kg
              </div>
            </div>
          </div>
          <div className={styles.crMiddle}>
            <div className={styles.crBloodWrap}>
              <div className={styles.crBloodLabel}>SANGRE</div>
              <div className={styles.crBloodBadge}>{profile.bloodType}</div>
            </div>
            <div className={styles.crAllergyWrap}>
              <div className={styles.crAllergyLabel}>ALERGIA CRÍTICA</div>
              <div className={styles.crAllergyValue}>
                {profile.allergies.find(a => a.severity === 'anafilaxis')?.name ?? profile.allergies[0]?.name}
              </div>
            </div>
          </div>
          {qrDataUrl && (
            <div className={styles.crQr}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="QR" width={64} height={64} />
              <div className={styles.crQrLabel}>human-id.app/p/{profile.slug}</div>
            </div>
          )}
          <div className={styles.crBrand}>
            <Logo variant="dark" />
          </div>
        </div>

        {/* Reverso */}
        <div className={styles.crBack}>
          <div className={styles.crBackHeader}>DATOS MÉDICOS CLAVE</div>
          <div className={styles.crBackRow}>
            <span className={styles.crBackKey}>Tipo sangre</span>
            <span className={styles.crBackVal}>{profile.bloodType}</span>
          </div>
          <div className={styles.crBackRow}>
            <span className={styles.crBackKey}>Alergias</span>
            <span className={styles.crBackVal}>
              {profile.allergies.map(a => a.name).join(', ')}
            </span>
          </div>
          <div className={styles.crBackRow}>
            <span className={styles.crBackKey}>Medicamentos</span>
            <span className={styles.crBackVal}>
              {profile.medications.map(m => m.name).join(', ')}
            </span>
          </div>
          <div className={styles.crBackRow}>
            <span className={styles.crBackKey}>Condiciones</span>
            <span className={styles.crBackVal}>
              {profile.conditions.join(', ')}
            </span>
          </div>
          <div className={styles.crBackDivider} />
          <div className={styles.crBackRow}>
            <span className={styles.crBackKey}>Emergencia</span>
            <span className={styles.crBackVal}>{profile.emergencyContact.name} · {profile.emergencyContact.phone}</span>
          </div>
          {profile.insurance && (
            <div className={styles.crBackRow}>
              <span className={styles.crBackKey}>Seguro</span>
              <span className={styles.crBackVal}>{profile.insurance.provider}</span>
            </div>
          )}
          <div className={styles.crBackFooter}>
            Donador de órganos: {profile.organDonor ? 'SÍ' : 'NO'} · Marcapasos: {profile.hasPacemaker ? 'SÍ' : 'NO'}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────
export default function PerfilPage() {
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'perfil' | 'tarjeta'>('perfil')

  useEffect(() => {
    const url = `https://human-id.app/p/${profile.slug}`
    QRCode.toDataURL(url, {
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

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo variant="light" />
        </Link>
        <nav className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'perfil' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('perfil')}
          >
            Perfil médico
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'tarjeta' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('tarjeta')}
          >
            Tarjeta física
          </button>
        </nav>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline} onClick={handleCopy}>
            {copied ? '✓ Copiado' : 'Copiar enlace'}
          </button>
          <button className={styles.btnPrimary} onClick={handlePrint}>
            Imprimir
          </button>
        </div>
      </header>

      <main className={styles.main}>

        {/* ── TAB: tarjeta física ── */}
        {activeTab === 'tarjeta' && (
          <div className={styles.tabContent}>
            <PhysicalCard qrDataUrl={qrDataUrl} />
          </div>
        )}

        {/* ── TAB: perfil médico completo ── */}
        {activeTab === 'perfil' && (
          <>
            {/* ── Hero banner ── */}
            <div className={styles.heroBanner}>
              <div className={styles.heroLeft}>
                <div className={styles.heroAvatarWrap}>
                  <Image
                    src="/avatar-demo.png"
                    alt={profile.name}
                    width={90}
                    height={90}
                    className={styles.heroAvatar}
                    priority
                  />
                  {profile.organDonor && (
                    <div className={styles.donorBadge} title="Donador de órganos">💙</div>
                  )}
                </div>
                <div>
                  <div className={styles.heroName}>{profile.name}</div>
                  <div className={styles.heroMeta}>
                    {profile.age} años · {profile.sex} · {profile.weight} kg · {profile.height} cm
                  </div>
                  <div className={styles.heroNationality}>
                    🇲🇽 {profile.nationality} · {profile.language}
                  </div>
                  {profile.runner && (
                    <div className={styles.heroRunner}>
                      <span className={styles.runnerBadge}>🏃 Runner</span>
                      {profile.runner.discipline.map((d, i) => (
                        <span key={i} className={styles.disciplineBadge}>{d}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.bloodPanel}>
                <div className={styles.bloodPanelLabel}>SANGRE</div>
                <div className={styles.bloodPanelBadge}>{profile.bloodType}</div>
                <div className={styles.bloodPanelSub}>Tipo sanguíneo</div>
              </div>
            </div>

            {/* ── Contacto de emergencia principal ── */}
            <div className={styles.emergencyStrip}>
              <div className={styles.emergencyStripIcon}>📞</div>
              <div className={styles.emergencyStripInfo}>
                <div className={styles.emergencyStripLabel}>
                  EMERGENCIA · {profile.emergencyContact.relationship}
                </div>
                <div className={styles.emergencyStripName}>{profile.emergencyContact.name}</div>
              </div>
              <a href={`tel:${profile.emergencyContact.phone}`} className={styles.emergencyStripPhone}>
                {profile.emergencyContact.phone}
              </a>
            </div>

            {/* ── Instrucciones especiales ── */}
            {profile.emergencyInstructions && (
              <div className={styles.alertBox}>
                <div className={styles.alertBoxIcon}>⚠️</div>
                <div>
                  <div className={styles.alertBoxTitle}>INSTRUCCIONES PARA PARAMÉDICOS</div>
                  <p className={styles.alertBoxText}>{profile.emergencyInstructions}</p>
                </div>
              </div>
            )}

            {/* ── Cards grid ── */}
            <div className={styles.grid}>

              {/* Alergias */}
              <Section
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#c0392b"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>}
                color="#FCEBEB"
                title="Alergias"
              >
                <div className={styles.allergyList}>
                  {profile.allergies.map((a: Allergy, i: number) => (
                    <div key={i} className={styles.allergyItem}>
                      <span className={styles.allergyName}>{a.name}</span>
                      <MedicalBadge type="allergy">Alergia</MedicalBadge>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Medicamentos */}
              <Section
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#0F6E56"><path d="M6.5 10h-2v5h2v-5zm6 0h-2v5h2v-5zm8.5 7H2v2h19v-2zm-2.5-7h-2v5h2v-5zM11.5 1L2 6v2h19V6l-9.5-5z"/></svg>}
                color="#E1F5EE"
                title="Medicamentos actuales"
              >
                {profile.medications.map((m: Medication, i: number) => (
                  <div key={i} className={styles.medItem}>
                    <MedicalBadge type="meds">{m.name}</MedicalBadge>
                    <div className={styles.medDetail}>{m.dose} · {m.frequency}</div>
                  </div>
                ))}
              </Section>

              {/* Condiciones */}
              <Section
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#534AB7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>}
                color="#EEEDFE"
                title="Condiciones médicas"
              >
                <div className={styles.pills}>
                  {profile.conditions.map((c, i) => (
                    <MedicalBadge key={i} type="chronic">{c}</MedicalBadge>
                  ))}
                </div>
              </Section>

              {/* Info paramédicos */}
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
                    <span className={styles.paraIcon}>{profile.hasProsthesis ? '✅' : '🚫'}</span>
                    <span className={styles.paraLabel}>Prótesis / Implante</span>
                    <span className={styles.paraVal}>{profile.hasProsthesis ? 'SÍ' : 'NO'}</span>
                  </div>
                  <div className={styles.paraItem}>
                    <span className={styles.paraIcon}>{profile.organDonor ? '💙' : '🚫'}</span>
                    <span className={styles.paraLabel}>Donador de órganos</span>
                    <span className={styles.paraVal}>{profile.organDonor ? 'SÍ' : 'NO'}</span>
                  </div>
                  {profile.insurance && (
                    <div className={styles.paraItem}>
                      <span className={styles.paraIcon}>🛡️</span>
                      <span className={styles.paraLabel}>Seguro médico</span>
                      <span className={styles.paraVal}>{profile.insurance.provider}</span>
                    </div>
                  )}
                  {profile.insurance && (
                    <div className={`${styles.paraItem} ${styles.paraItemFull}`}>
                      <span className={styles.paraIcon}>📋</span>
                      <span className={styles.paraLabel}>No. de póliza</span>
                      <span className={styles.paraVal}>{profile.insurance.policyNumber}</span>
                    </div>
                  )}
                </div>
                {profile.insurance?.phone && (
                  <div className={styles.insurancePhone}>
                    Línea de asistencia: <a href={`tel:${profile.insurance.phone}`}>{profile.insurance.phone}</a>
                  </div>
                )}
              </Section>

              {/* Contactos */}
              <Section
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#065F46"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>}
                color="#D1FAE5"
                title="Contactos"
              >
                <div className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactRole}>Emergencia principal · {profile.emergencyContact.relationship}</div>
                    <div className={styles.contactName}>{profile.emergencyContact.name}</div>
                    <a href={`tel:${profile.emergencyContact.phone}`} className={styles.contactPhone}>
                      {profile.emergencyContact.phone}
                    </a>
                  </div>
                  {profile.emergencyContactSecondary && (
                    <div className={styles.contactItem}>
                      <div className={styles.contactRole}>Secundario · {profile.emergencyContactSecondary.relationship}</div>
                      <div className={styles.contactName}>{profile.emergencyContactSecondary.name}</div>
                      <a href={`tel:${profile.emergencyContactSecondary.phone}`} className={styles.contactPhone}>
                        {profile.emergencyContactSecondary.phone}
                      </a>
                    </div>
                  )}
                  {profile.doctor && (
                    <div className={styles.contactItem}>
                      <div className={styles.contactRole}>Médico de cabecera</div>
                      <div className={styles.contactName}>{profile.doctor.name}</div>
                      <div className={styles.contactClinic}>{profile.doctor.clinic}</div>
                      <a href={`tel:${profile.doctor.phone}`} className={styles.contactPhone}>
                        {profile.doctor.phone}
                      </a>
                    </div>
                  )}
                </div>
              </Section>

              {/* Historial médico */}
              <Section
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#1D4ED8"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>}
                color="#DBEAFE"
                title="Historial médico"
              >
                {profile.surgeries && profile.surgeries.length > 0 && (
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
                {profile.hospitalizations && profile.hospitalizations.length > 0 && (
                  <div className={styles.histGroup}>
                    <div className={styles.histGroupTitle}>Hospitalizaciones</div>
                    {profile.hospitalizations.map((h, i) => (
                      <div key={i} className={styles.histItem}>
                        <span className={styles.histDot}>•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
                {profile.vaccines && profile.vaccines.length > 0 && (
                  <div className={styles.histGroup}>
                    <div className={styles.histGroupTitle}>Vacunas</div>
                    <div className={styles.vaccineGrid}>
                      {profile.vaccines.map((v, i) => (
                        <div key={i} className={styles.vaccineItem}>
                          <MedicalBadge type={v.upToDate ? 'ok' : 'chronic'}>{v.name}</MedicalBadge>
                          {v.year && <span className={styles.vaccineYear}>{v.year}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Section>

              {/* Identidad runner */}
              {profile.runner && (
                <Section
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#DC2626"><path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/></svg>}
                  color="#FEE2E2"
                  title="Identidad del runner"
                >
                  <div className={styles.runnerSection}>
                    <div className={styles.runnerAvatarLarge}>
                      <Image
                        src="/avatar-demo.png"
                        alt="Runner"
                        width={120}
                        height={120}
                        className={styles.runnerAvatarImg}
                      />
                    </div>
                    <div className={styles.runnerDetails}>
                      {profile.runner.club && (
                        <div className={styles.runnerClub}>🏃 {profile.runner.club}</div>
                      )}
                      <div className={styles.runnerDisciplines}>
                        {profile.runner.discipline.map((d, i) => (
                          <span key={i} className={styles.disciplineTag}>{d}</span>
                        ))}
                      </div>
                      <div className={styles.runnerEventsLabel}>Eventos habituales</div>
                      <div className={styles.runnerEvents}>
                        {profile.runner.events.map((e, i) => (
                          <div key={i} className={styles.eventItem}>🏅 {e}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Section>
              )}

              {/* Notas adicionales */}
              {profile.notes && (
                <Section
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="#5F5E5A"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>}
                  color="#F1EFE8"
                  title="Notas adicionales"
                >
                  <p className={styles.notesText}>{profile.notes}</p>
                </Section>
              )}

            </div>

            {/* ── QR section ── */}
            <div className={styles.qrSection}>
              {qrDataUrl && (
                <div className={styles.qrBox}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrDataUrl} alt="Código QR del perfil" width={180} height={180} />
                </div>
              )}
              <div className={styles.qrInfo}>
                <p className={styles.qrLabel}>Escanea para ver este perfil médico</p>
                <p className={styles.qrUrl}>human-id.app/p/{profile.slug}</p>
                <p className={styles.qrSub}>Imprime y coloca en tu llavero, pulsera o dorsal</p>
              </div>
            </div>
          </>
        )}

        <div className={styles.footer}>
          <Logo variant="light" />
        </div>
      </main>
    </div>
  )
}
