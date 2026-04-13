import Link from 'next/link'
import styles from './CtaSection.module.css'

export function CtaSection() {
  return (
    <section className={styles.section} id="cta">
      <div className={styles.inner}>
        <h2 className={styles.headline}>Corre lejos. Vive con todo.</h2>
        <p className={styles.sub}>Que siempre sepan quién eres.</p>
        <Link href="/registro" className={styles.btn}>
          Crear mi perfil ahora — es gratis
        </Link>
      </div>
    </section>
  )
}
