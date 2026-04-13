'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import styles from './page.module.css'

/* ─── Types ───────────────────────────────────────────────────────── */
type Severity = 'leve' | 'moderada' | 'severa' | 'anafilaxis'

interface Allergy    { name: string; severity: Severity }
interface Medication { name: string; dose: string; frequency: string }
interface Surgery    { description: string; year: string }
interface Contact    { name: string; phone: string; relationship: string }

interface FD {
  /* Personal */
  name: string; age: string; sex: string
  weight: string; height: string; nationality: string
  /* Médico crítico */
  bloodType: string
  allergies: Allergy[]
  medications: Medication[]
  conditions: string[]
  disabilities: string[]
  /* Historial */
  surgeries: Surgery[]
  vaccines: string[]
  /* Contactos */
  contacts: Contact[]
  doctorName: string; doctorPhone: string; doctorClinic: string
  /* Paramédico */
  hasPacemaker: boolean; hasProsthetics: boolean; organDonor: boolean
  specialInstructions: string
  insuranceCompany: string; insurancePolicyNumber: string
  /* Corredor */
  discipline: string
  events: string[]
}

const INIT: FD = {
  name: '', age: '', sex: '', weight: '', height: '', nationality: 'Mexicana',
  bloodType: '',
  allergies: [], medications: [], conditions: [], disabilities: [],
  surgeries: [], vaccines: [],
  contacts: [{ name: '', phone: '', relationship: '' }],
  doctorName: '', doctorPhone: '', doctorClinic: '',
  hasPacemaker: false, hasProsthetics: false, organDonor: false,
  specialInstructions: '',
  insuranceCompany: '', insurancePolicyNumber: '',
  discipline: '', events: [],
}

const STEPS = [
  'Datos personales',
  'Médico crítico',
  'Historial médico',
  'Contactos',
  'Para paramédicos',
  'Perfil corredor',
]

const BLOOD_TYPES = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

/* ─── Component ───────────────────────────────────────────────────── */
export default function RegistroPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [fd, setFd] = useState<FD>(INIT)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  /* field change */
  const f = (k: keyof FD) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFd(p => ({ ...p, [k]: e.target.value }))

  /* boolean toggles */
  const tog = (k: 'hasPacemaker' | 'hasProsthetics' | 'organDonor') =>
    setFd(p => ({ ...p, [k]: !p[k] }))

  /* string-array helpers */
  type StrKey = 'conditions' | 'disabilities' | 'vaccines' | 'events'
  const addStr  = (k: StrKey) => setFd(p => ({ ...p, [k]: [...p[k], ''] }))
  const setStr  = (k: StrKey, i: number, v: string) =>
    setFd(p => { const a = [...p[k]]; a[i] = v; return { ...p, [k]: a } })
  const delStr  = (k: StrKey, i: number) =>
    setFd(p => { const a = [...p[k]]; a.splice(i, 1); return { ...p, [k]: a } })

  /* allergies */
  const addA = () => setFd(p => ({ ...p, allergies: [...p.allergies, { name: '', severity: 'leve' }] }))
  const setA = (i: number, patch: Partial<Allergy>) =>
    setFd(p => { const a = [...p.allergies]; a[i] = { ...a[i], ...patch }; return { ...p, allergies: a } })
  const delA = (i: number) =>
    setFd(p => { const a = [...p.allergies]; a.splice(i, 1); return { ...p, allergies: a } })

  /* medications */
  const addM = () => setFd(p => ({ ...p, medications: [...p.medications, { name: '', dose: '', frequency: '' }] }))
  const setM = (i: number, patch: Partial<Medication>) =>
    setFd(p => { const a = [...p.medications]; a[i] = { ...a[i], ...patch }; return { ...p, medications: a } })
  const delM = (i: number) =>
    setFd(p => { const a = [...p.medications]; a.splice(i, 1); return { ...p, medications: a } })

  /* surgeries */
  const addS = () => setFd(p => ({ ...p, surgeries: [...p.surgeries, { description: '', year: '' }] }))
  const setSurg = (i: number, patch: Partial<Surgery>) =>
    setFd(p => { const a = [...p.surgeries]; a[i] = { ...a[i], ...patch }; return { ...p, surgeries: a } })
  const delS = (i: number) =>
    setFd(p => { const a = [...p.surgeries]; a.splice(i, 1); return { ...p, surgeries: a } })

  /* contacts */
  const addC = () => {
    if (fd.contacts.length >= 3) return
    setFd(p => ({ ...p, contacts: [...p.contacts, { name: '', phone: '', relationship: '' }] }))
  }
  const setC = (i: number, patch: Partial<Contact>) =>
    setFd(p => { const a = [...p.contacts]; a[i] = { ...a[i], ...patch }; return { ...p, contacts: a } })
  const delC = (i: number) => {
    if (fd.contacts.length <= 1) return
    setFd(p => { const a = [...p.contacts]; a.splice(i, 1); return { ...p, contacts: a } })
  }

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const prev = () => setStep(s => Math.max(s - 1, 0))

  const submit = async () => {
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/perfil/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: fd, addOns: [] }),
      })
      const json = await res.json()
      if (!res.ok) { setSubmitError(json.error ?? 'Error al crear el perfil'); setSubmitting(false); return }
      if (json.checkoutUrl) { window.location.href = json.checkoutUrl; return }
      setDone(true)
    } catch {
      setSubmitError('Error de conexión. Intenta de nuevo.')
      setSubmitting(false)
    }
  }

  const pct = Math.round(((step + 1) / STEPS.length) * 100)

  /* ── Success screen ── */
  if (done) {
    return (
      <div className={styles.successWrap}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>¡Tu perfil fue creado!</h2>
          <p className={styles.successSub}>
            Tu Human ID está listo. En breve recibirás tu QR y tu identificación física.
          </p>
          <div className={styles.successName}>{fd.name || 'Usuario'}</div>
          <Link href="/" className={styles.successBtn}>Volver al inicio</Link>
        </div>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <div className={styles.wrap}>

      {/* Header */}
      <header className={styles.header}>
        <Link href="/"><Logo variant="light" height={28} /></Link>
        <span className={styles.headerStep}>{STEPS[step]}</span>
        <span className={styles.headerCounter}>{step + 1} / {STEPS.length}</span>
      </header>

      {/* Progress bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
      </div>

      {/* Step pills */}
      <div className={styles.pills}>
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={[
              styles.pill,
              i < step  ? styles.pillDone   : '',
              i === step ? styles.pillActive : '',
            ].join(' ')}
          >
            <span className={styles.pillNum}>{i < step ? '✓' : i + 1}</span>
            <span className={styles.pillLabel}>{s}</span>
          </div>
        ))}
      </div>

      {/* Card */}
      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{STEPS[step]}</h2>

          {/* ── Paso 1: Datos personales ── */}
          {step === 0 && (
            <div className={styles.fields}>
              <div className={styles.full}>
                <label className={styles.label}>Nombre completo <span className={styles.req}>*</span></label>
                <input className={styles.input} value={fd.name} onChange={f('name')}
                  placeholder="Ej. Juan Carlos Ramírez López" />
              </div>

              <div className={styles.grid2}>
                <div>
                  <label className={styles.label}>Edad</label>
                  <input className={styles.input} type="number" value={fd.age} onChange={f('age')}
                    placeholder="Años" min={0} max={120} />
                </div>
                <div>
                  <label className={styles.label}>Sexo biológico <span className={styles.req}>*</span></label>
                  <select className={styles.select} value={fd.sex} onChange={f('sex')}>
                    <option value="">Seleccionar</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                    <option value="Prefiero no indicar">Prefiero no indicar</option>
                  </select>
                </div>
              </div>

              <div className={styles.grid2}>
                <div>
                  <label className={styles.label}>Peso <span className={styles.unit}>kg</span></label>
                  <input className={styles.input} type="number" value={fd.weight} onChange={f('weight')}
                    placeholder="Ej. 72" step="0.1" min={0} />
                </div>
                <div>
                  <label className={styles.label}>Talla <span className={styles.unit}>cm</span></label>
                  <input className={styles.input} type="number" value={fd.height} onChange={f('height')}
                    placeholder="Ej. 175" min={0} />
                </div>
              </div>

              <div className={styles.full}>
                <label className={styles.label}>Nacionalidad</label>
                <input className={styles.input} value={fd.nationality} onChange={f('nationality')}
                  placeholder="Ej. Mexicana" />
              </div>
            </div>
          )}

          {/* ── Paso 2: Médico crítico ── */}
          {step === 1 && (
            <div className={styles.fields}>

              {/* Tipo de sangre */}
              <div className={styles.full}>
                <label className={styles.label}>Tipo de sangre <span className={styles.req}>*</span></label>
                <div className={styles.bloodGrid}>
                  {BLOOD_TYPES.map(bt => (
                    <button key={bt} type="button"
                      className={`${styles.bloodBtn} ${fd.bloodType === bt ? styles.bloodBtnActive : ''}`}
                      onClick={() => setFd(p => ({ ...p, bloodType: bt }))}
                    >{bt}</button>
                  ))}
                  <button type="button"
                    className={`${styles.bloodBtn} ${fd.bloodType === 'Desconocido' ? styles.bloodBtnActive : ''}`}
                    onClick={() => setFd(p => ({ ...p, bloodType: 'Desconocido' }))}
                  >No sé</button>
                </div>
              </div>

              {/* Alergias */}
              <div className={styles.full}>
                <div className={styles.listHead}>
                  <label className={styles.label}>Alergias</label>
                  <button type="button" className={styles.addBtn} onClick={addA}>+ Agregar</button>
                </div>
                {fd.allergies.length === 0 && <p className={styles.empty}>Sin alergias registradas.</p>}
                {fd.allergies.map((a, i) => (
                  <div key={i} className={styles.rowInline}>
                    <input className={styles.input} value={a.name}
                      onChange={e => setA(i, { name: e.target.value })}
                      placeholder="Nombre de la alergia (ej. Penicilina, Polen)" />
                    <select className={`${styles.select} ${styles.selectSm}`}
                      value={a.severity}
                      onChange={e => setA(i, { severity: e.target.value as Severity })}>
                      <option value="leve">Leve</option>
                      <option value="moderada">Moderada</option>
                      <option value="severa">Severa</option>
                      <option value="anafilaxis">Anafilaxis</option>
                    </select>
                    <button type="button" className={styles.delBtn} onClick={() => delA(i)}>×</button>
                  </div>
                ))}
              </div>

              {/* Medicamentos */}
              <div className={styles.full}>
                <div className={styles.listHead}>
                  <label className={styles.label}>Medicamentos actuales</label>
                  <button type="button" className={styles.addBtn} onClick={addM}>+ Agregar</button>
                </div>
                {fd.medications.length === 0 && <p className={styles.empty}>Sin medicamentos registrados.</p>}
                {fd.medications.map((m, i) => (
                  <div key={i} className={styles.block}>
                    <div className={styles.blockHead}>
                      <span className={styles.blockLabel}>Medicamento {i + 1}</span>
                      <button type="button" className={styles.delBtn} onClick={() => delM(i)}>×</button>
                    </div>
                    <div className={styles.grid2}>
                      <div>
                        <label className={styles.labelSm}>Nombre del medicamento</label>
                        <input className={styles.input} value={m.name}
                          onChange={e => setM(i, { name: e.target.value })}
                          placeholder="Ej. Metformina" />
                      </div>
                      <div>
                        <label className={styles.labelSm}>Dosis</label>
                        <input className={styles.input} value={m.dose}
                          onChange={e => setM(i, { dose: e.target.value })}
                          placeholder="Ej. 500 mg" />
                      </div>
                    </div>
                    <div>
                      <label className={styles.labelSm}>Frecuencia</label>
                      <input className={styles.input} value={m.frequency}
                        onChange={e => setM(i, { frequency: e.target.value })}
                        placeholder="Ej. 2 veces al día con alimentos" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Condiciones crónicas */}
              <div className={styles.full}>
                <div className={styles.listHead}>
                  <label className={styles.label}>Condiciones crónicas</label>
                  <button type="button" className={styles.addBtn} onClick={() => addStr('conditions')}>+ Agregar</button>
                </div>
                {fd.conditions.length === 0 && <p className={styles.empty}>Sin condiciones registradas.</p>}
                {fd.conditions.map((c, i) => (
                  <div key={i} className={styles.rowInline}>
                    <input className={styles.input} value={c}
                      onChange={e => setStr('conditions', i, e.target.value)}
                      placeholder="Ej. Diabetes tipo 2, Hipertensión, Hipotiroidismo" />
                    <button type="button" className={styles.delBtn} onClick={() => delStr('conditions', i)}>×</button>
                  </div>
                ))}
              </div>

              {/* Discapacidades */}
              <div className={styles.full}>
                <div className={styles.listHead}>
                  <label className={styles.label}>Discapacidades</label>
                  <button type="button" className={styles.addBtn} onClick={() => addStr('disabilities')}>+ Agregar</button>
                </div>
                {fd.disabilities.length === 0 && <p className={styles.empty}>Sin discapacidades registradas.</p>}
                {fd.disabilities.map((d, i) => (
                  <div key={i} className={styles.rowInline}>
                    <input className={styles.input} value={d}
                      onChange={e => setStr('disabilities', i, e.target.value)}
                      placeholder="Ej. Hipoacusia bilateral, Limitación motriz en pierna derecha" />
                    <button type="button" className={styles.delBtn} onClick={() => delStr('disabilities', i)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Paso 3: Historial médico ── */}
          {step === 2 && (
            <div className={styles.fields}>

              {/* Cirugías */}
              <div className={styles.full}>
                <div className={styles.listHead}>
                  <label className={styles.label}>Cirugías previas</label>
                  <button type="button" className={styles.addBtn} onClick={addS}>+ Agregar</button>
                </div>
                {fd.surgeries.length === 0 && <p className={styles.empty}>Sin cirugías registradas.</p>}
                {fd.surgeries.map((s, i) => (
                  <div key={i} className={styles.block}>
                    <div className={styles.blockHead}>
                      <span className={styles.blockLabel}>Cirugía {i + 1}</span>
                      <button type="button" className={styles.delBtn} onClick={() => delS(i)}>×</button>
                    </div>
                    <div className={styles.grid2}>
                      <div>
                        <label className={styles.labelSm}>Descripción</label>
                        <input className={styles.input} value={s.description}
                          onChange={e => setSurg(i, { description: e.target.value })}
                          placeholder="Ej. Apendicectomía laparoscópica" />
                      </div>
                      <div>
                        <label className={styles.labelSm}>Año</label>
                        <input className={styles.input} type="number" value={s.year}
                          onChange={e => setSurg(i, { year: e.target.value })}
                          placeholder="Ej. 2018" min={1900} max={2026} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Vacunas */}
              <div className={styles.full}>
                <div className={styles.listHead}>
                  <label className={styles.label}>Vacunas relevantes</label>
                  <button type="button" className={styles.addBtn} onClick={() => addStr('vaccines')}>+ Agregar</button>
                </div>
                <p className={styles.hint}>Incluye vacunas recientes o que sean relevantes para tu atención médica.</p>
                {fd.vaccines.length === 0 && <p className={styles.empty}>Sin vacunas registradas.</p>}
                {fd.vaccines.map((v, i) => (
                  <div key={i} className={styles.rowInline}>
                    <input className={styles.input} value={v}
                      onChange={e => setStr('vaccines', i, e.target.value)}
                      placeholder="Ej. COVID-19 (2023), Tétanos (2021), Hepatitis B" />
                    <button type="button" className={styles.delBtn} onClick={() => delStr('vaccines', i)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Paso 4: Contactos ── */}
          {step === 3 && (
            <div className={styles.fields}>

              {/* Contactos de emergencia */}
              <div className={styles.full}>
                <div className={styles.listHead}>
                  <label className={styles.label}>
                    Contactos de emergencia <span className={styles.req}>*</span>
                    <span className={styles.labelNote}> máx. 3</span>
                  </label>
                  {fd.contacts.length < 3 && (
                    <button type="button" className={styles.addBtn} onClick={addC}>+ Agregar</button>
                  )}
                </div>
                {fd.contacts.map((c, i) => (
                  <div key={i} className={styles.block}>
                    <div className={styles.blockHead}>
                      <span className={styles.blockLabel}>Contacto {i + 1}</span>
                      {fd.contacts.length > 1 && (
                        <button type="button" className={styles.delBtn} onClick={() => delC(i)}>×</button>
                      )}
                    </div>
                    <div className={styles.grid2}>
                      <div>
                        <label className={styles.labelSm}>Nombre completo</label>
                        <input className={styles.input} value={c.name}
                          onChange={e => setC(i, { name: e.target.value })}
                          placeholder="Ej. María Ramírez" />
                      </div>
                      <div>
                        <label className={styles.labelSm}>Teléfono</label>
                        <input className={styles.input} type="tel" value={c.phone}
                          onChange={e => setC(i, { phone: e.target.value })}
                          placeholder="+52 55 1234 5678" />
                      </div>
                    </div>
                    <div>
                      <label className={styles.labelSm}>Parentesco / Relación</label>
                      <input className={styles.input} value={c.relationship}
                        onChange={e => setC(i, { relationship: e.target.value })}
                        placeholder="Ej. Esposa, Madre, Mejor amigo" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Médico tratante */}
              <div className={styles.full}>
                <label className={styles.label}>Médico tratante</label>
                <div className={styles.block}>
                  <div>
                    <label className={styles.labelSm}>Nombre completo</label>
                    <input className={styles.input} value={fd.doctorName} onChange={f('doctorName')}
                      placeholder="Ej. Dr. Alejandro Torres Gutiérrez" />
                  </div>
                  <div className={styles.grid2}>
                    <div>
                      <label className={styles.labelSm}>Teléfono de contacto</label>
                      <input className={styles.input} type="tel" value={fd.doctorPhone} onChange={f('doctorPhone')}
                        placeholder="+52 55 1234 5678" />
                    </div>
                    <div>
                      <label className={styles.labelSm}>Clínica / Hospital</label>
                      <input className={styles.input} value={fd.doctorClinic} onChange={f('doctorClinic')}
                        placeholder="Ej. Hospital Ángeles Pedregal" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Paso 5: Paramédico ── */}
          {step === 4 && (
            <div className={styles.fields}>
              <div className={styles.full}>
                <p className={styles.hint}>
                  Esta información es visible de inmediato al escanear tu QR — sin apps ni login. Es lo primero que verá un paramédico.
                </p>
              </div>

              {/* Toggles */}
              <div className={styles.full}>
                <label className={styles.label}>Condiciones críticas</label>
                <div className={styles.toggleGroup}>
                  <button type="button"
                    className={`${styles.toggleCard} ${fd.hasPacemaker ? styles.toggleOn : ''}`}
                    onClick={() => tog('hasPacemaker')}>
                    <div className={styles.toggleInfo}>
                      <span className={styles.toggleTitle}>Marcapasos</span>
                      <span className={styles.toggleSub}>Tengo marcapasos o desfibrilador implantado</span>
                    </div>
                    <span className={`${styles.togglePill} ${fd.hasPacemaker ? styles.togglePillOn : ''}`}>
                      {fd.hasPacemaker ? 'Sí' : 'No'}
                    </span>
                  </button>

                  <button type="button"
                    className={`${styles.toggleCard} ${fd.hasProsthetics ? styles.toggleOn : ''}`}
                    onClick={() => tog('hasProsthetics')}>
                    <div className={styles.toggleInfo}>
                      <span className={styles.toggleTitle}>Prótesis</span>
                      <span className={styles.toggleSub}>Tengo alguna prótesis o implante</span>
                    </div>
                    <span className={`${styles.togglePill} ${fd.hasProsthetics ? styles.togglePillOn : ''}`}>
                      {fd.hasProsthetics ? 'Sí' : 'No'}
                    </span>
                  </button>

                  <button type="button"
                    className={`${styles.toggleCard} ${fd.organDonor ? styles.toggleOn : ''}`}
                    onClick={() => tog('organDonor')}>
                    <div className={styles.toggleInfo}>
                      <span className={styles.toggleTitle}>Donador de órganos</span>
                      <span className={styles.toggleSub}>Soy donador de órganos registrado</span>
                    </div>
                    <span className={`${styles.togglePill} ${fd.organDonor ? styles.togglePillOn : ''}`}>
                      {fd.organDonor ? 'Sí' : 'No'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Instrucciones especiales */}
              <div className={styles.full}>
                <label className={styles.label}>Instrucciones especiales para paramédicos</label>
                <textarea className={styles.textarea}
                  value={fd.specialInstructions}
                  onChange={f('specialInstructions')}
                  rows={5}
                  placeholder="Ej. No administrar aspirina. Verificar nivel de glucosa antes de cualquier procedimiento. En caso de convulsión, colocar en posición lateral de seguridad." />
              </div>

              {/* Seguro médico */}
              <div className={styles.full}>
                <label className={styles.label}>Seguro médico</label>
                <div className={styles.grid2}>
                  <div>
                    <label className={styles.labelSm}>Aseguradora</label>
                    <input className={styles.input} value={fd.insuranceCompany} onChange={f('insuranceCompany')}
                      placeholder="Ej. GNP, AXA, IMSS, ISSSTE" />
                  </div>
                  <div>
                    <label className={styles.labelSm}>Número de póliza</label>
                    <input className={styles.input} value={fd.insurancePolicyNumber} onChange={f('insurancePolicyNumber')}
                      placeholder="Ej. GNP-123456789" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Paso 6: Corredor ── */}
          {step === 5 && (
            <div className={styles.fields}>
              <div className={styles.full}>
                <label className={styles.label}>Disciplina principal</label>
                <select className={styles.select} value={fd.discipline} onChange={f('discipline')}>
                  <option value="">Seleccionar disciplina</option>
                  <option value="Trail running">Trail running</option>
                  <option value="Asfalto">Asfalto / Road running</option>
                  <option value="Triatlón">Triatlón</option>
                  <option value="Ciclismo">Ciclismo</option>
                  <option value="Natación">Natación</option>
                  <option value="CrossFit">CrossFit / Funcional</option>
                  <option value="Montañismo">Montañismo / Alpinismo</option>
                  <option value="Ciclismo de montaña">Ciclismo de montaña (MTB)</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className={styles.full}>
                <div className={styles.listHead}>
                  <label className={styles.label}>Eventos habituales</label>
                  <button type="button" className={styles.addBtn} onClick={() => addStr('events')}>+ Agregar</button>
                </div>
                <p className={styles.hint}>Carreras o competencias en las que participas regularmente.</p>
                {fd.events.length === 0 && <p className={styles.empty}>Sin eventos registrados.</p>}
                {fd.events.map((ev, i) => (
                  <div key={i} className={styles.rowInline}>
                    <input className={styles.input} value={ev}
                      onChange={e => setStr('events', i, e.target.value)}
                      placeholder="Ej. Maratón CDMX, Ultra Caballo Blanco, Ironman Cozumel" />
                    <button type="button" className={styles.delBtn} onClick={() => delStr('events', i)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navegación */}
          <div className={styles.nav}>
            {step > 0 ? (
              <button type="button" className={styles.btnPrev} onClick={prev}>← Anterior</button>
            ) : (
              <span />
            )}
            {step < STEPS.length - 1 ? (
              <button type="button" className={styles.btnNext} onClick={next}>Siguiente →</button>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'0.5rem' }}>
                {submitError && <p style={{ fontSize:'0.8rem', color:'var(--color-allergy)' }}>{submitError}</p>}
                <button type="button" className={styles.btnSubmit} onClick={submit} disabled={submitting}>
                  {submitting ? 'Guardando…' : 'Crear mi Human ID'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
