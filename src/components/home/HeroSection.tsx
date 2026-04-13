import Link from 'next/link'
import { Logo } from '@/components/Logo'
import styles from './HeroSection.module.css'

export function HeroSection() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.inner}>
        <div className={styles.text}>
          <h1 className={styles.headline}>
            Tu historial médico,<br />
            <span className={styles.accentText}>siempre contigo</span>
          </h1>
          <p className={styles.sub}>
            Un QR en tu llavero o tarjeta que puede salvar tu vida en una emergencia.
            Sin app, sin contraseña — visible para cualquier paramédico al instante.
          </p>
          <div className={styles.ctas}>
            <Link href="/registro" className={styles.btnSolid}>
              Crear mi Human ID
            </Link>
            <Link href="/perfil" className={styles.btnOutline}>
              Ver demo
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardLogo}>
                <Logo variant="dark" height={18} />
              </div>
              <div className={styles.cardBlood}>A+</div>
            </div>

            <div className={styles.qrWrap}>
              <div className={styles.qrGrid}>
                {Array.from({ length: 49 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.qrCell}
                    style={{ opacity: Math.random() > 0.45 ? 1 : 0 }}
                  />
                ))}
              </div>
              <div className={styles.qrCornerTL} />
              <div className={styles.qrCornerTR} />
              <div className={styles.qrCornerBL} />
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.cardName}>Carlos M. R.</div>
              <div className={styles.cardUrl}>human-id.app/p/carlos</div>
            </div>
          </div>

          <div className={styles.floatBadge1}>
            <span className={styles.floatDot} style={{ background: '#E24B4A' }} />
            Alergia: Penicilina
          </div>
          <div className={styles.floatBadge2}>
            ⚡ Sin app necesaria
          </div>
        </div>
      </div>
    </section>
  )
}
