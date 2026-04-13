import styles from './HowItWorks.module.css'

const steps = [
  {
    num: '1',
    title: 'Crea tu perfil',
    desc: 'Registra tus datos médicos: alergias, enfermedades, medicamentos y contactos de emergencia.',
  },
  {
    num: '2',
    title: 'Recibe tu QR',
    desc: 'Descarga tu QR o recibe tu tarjeta y llavero físico por correo, sin costo adicional.',
  },
  {
    num: '3',
    title: 'Listo para emergencias',
    desc: 'Cualquier médico o paramédico puede escanearlo sin app ni contraseña, en segundos.',
  },
]

export function HowItWorks() {
  return (
    <section className={styles.section} id="como-funciona">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>Así de simple</h2>
          <p className={styles.sub}>Tres pasos y tu información médica estará lista para cualquier emergencia.</p>
        </div>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s.num} className={styles.stepRow}>
              <div className={styles.step}>
                <div className={styles.stepNum}>{s.num}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.arrow} aria-hidden="true">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
