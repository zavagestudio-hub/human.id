import styles from './AudienceSection.module.css'

const cards = [
  {
    icon: '🏃',
    title: 'Runners',
    desc: 'Kilómetros de trail, accidentes imprevistos. Tu perfil médico viaja contigo en cada carrera.',
  },
  {
    icon: '🧗',
    title: 'Senderistas y aventureros',
    desc: 'En lugares remotos, los paramédicos necesitan saber quién eres. Tu QR habla por ti.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Cualquier persona',
    desc: 'Porque las emergencias no avisan. Registra tu historial hoy y quédate tranquilo mañana.',
  },
]

export function AudienceSection() {
  return (
    <section className={styles.section} id="para-quien">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>Diseñado para quienes se aventuran lejos</h2>
          <p className={styles.sub}>Y para todos los que quieren estar preparados.</p>
        </div>
        <div className={styles.grid}>
          {cards.map((c) => (
            <div key={c.title} className={styles.card}>
              <div className={styles.icon}>{c.icon}</div>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardDesc}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
