import styles from './RoadmapSection.module.css'

const phases = [
  {
    status: 'done',
    label: 'Fase 1 · Hoy',
    title: 'Perfil médico + QR + tarjeta física',
    desc: 'Tu identidad médica de emergencia, lista para usarse.',
  },
  {
    status: 'soon',
    label: 'Fase 2',
    title: 'Conexión con doctores y paramédicos',
    desc: 'Alertas en tiempo real y acceso verificado para profesionales de salud.',
  },
  {
    status: 'soon',
    label: 'Fase 3',
    title: 'Chatbot para carga automática',
    desc: 'Sube tu historial médico conversando con IA — sin formularios complejos.',
  },
  {
    status: 'soon',
    label: 'Fase 4',
    title: 'Wearables y seguros médicos',
    desc: 'Integración con Apple Watch, Garmin y aseguradoras principales.',
  },
]

export function RoadmapSection() {
  return (
    <section className={styles.section} id="roadmap">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>Un ecosistema que crece contigo</h2>
          <p className={styles.sub}>Hoy lanzamos el núcleo. Esto es lo que viene.</p>
        </div>
        <div className={styles.timeline}>
          {phases.map((p, i) => (
            <div key={p.label} className={styles.phaseWrap}>
              <div className={`${styles.phase} ${p.status === 'done' ? styles.done : styles.soon}`}>
                <div className={styles.dot}>
                  {p.status === 'done' ? '✓' : ''}
                </div>
                <div className={styles.phaseLabel}>{p.label}</div>
                <h3 className={styles.phaseTitle}>{p.title}</h3>
                <p className={styles.phaseDesc}>{p.desc}</p>
              </div>
              {i < phases.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
