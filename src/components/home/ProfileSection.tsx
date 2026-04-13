import styles from './ProfileSection.module.css'

const categories = [
  {
    dot: 'var(--color-allergy)',
    bg: 'var(--color-allergy-light)',
    label: 'Alergias',
    example: 'Penicilina, látex, mariscos',
  },
  {
    dot: 'var(--color-chronic)',
    bg: 'var(--color-chronic-light)',
    label: 'Enfermedades crónicas',
    example: 'Diabetes, hipertensión, asma',
  },
  {
    dot: 'var(--color-meds)',
    bg: 'var(--color-meds-light)',
    label: 'Medicamentos actuales',
    example: 'Nombre, dosis y frecuencia',
  },
  {
    dot: 'var(--color-ok)',
    bg: 'var(--color-ok-light)',
    label: 'Vacunas',
    example: 'COVID, tétanos, hepatitis B',
  },
  {
    dot: 'var(--color-brand-primary)',
    bg: 'var(--color-brand-light)',
    label: 'Cirugías y procedimientos',
    example: 'Historial quirúrgico con año',
  },
  {
    dot: 'var(--color-brand-deep)',
    bg: 'var(--color-brand-light)',
    label: 'Contactos de emergencia',
    example: 'Nombre, teléfono y relación',
  },
]

export function ProfileSection() {
  return (
    <section className={styles.section} id="perfil">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>Todo lo que un médico necesita saber</h2>
          <p className={styles.sub}>
            Tu perfil organiza la información crítica de forma clara y jerárquica,
            pensada para que cualquier paramédico la lea en segundos.
          </p>
        </div>
        <div className={styles.grid}>
          {categories.map((c) => (
            <div
              key={c.label}
              className={styles.card}
              style={{ background: c.bg }}
            >
              <div className={styles.dot} style={{ background: c.dot }} />
              <h3 className={styles.cardLabel}>{c.label}</h3>
              <p className={styles.cardExample}>{c.example}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
