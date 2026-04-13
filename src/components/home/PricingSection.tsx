import Link from 'next/link'
import styles from './PricingSection.module.css'

const products = [
  {
    name: 'ID Card',
    price: 'Gratis',
    priceNote: 'con tu anualidad',
    renewal: '$100 reposición antes del año',
    description: 'Tarjeta con tu información médica relevante y QR impreso para acceso al perfil.',
    featured: false,
  },
  {
    name: 'ID Pocket',
    price: '$250',
    priceNote: 'MXN',
    renewal: '$200 al renovar tu anualidad',
    description: 'Tarjeta compacta con información médica relevante, acceso al perfil por QR + NFC.',
    featured: true,
  },
  {
    name: 'ID Token',
    price: '$250',
    priceNote: 'MXN',
    renewal: '$200 al renovar tu anualidad',
    description: 'Llavero o dije con acceso al perfil por QR + NFC. Siempre contigo.',
    featured: false,
  },
]

export function PricingSection() {
  return (
    <section className={styles.section} id="planes">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>Precios</h2>
          <p className={styles.sub}>Activa tu perfil con una sola anualidad.</p>
        </div>

        {/* Anualidad — card principal */}
        <div className={styles.annualCard}>
          <div className={styles.annualLeft}>
            <div className={styles.annualBadge}>Base</div>
            <h3 className={styles.annualName}>Anualidad Human ID</h3>
            <p className={styles.annualDesc}>
              Incluye tu perfil digital, acceso 24/7, actualizaciones ilimitadas y tu ID Card sin costo.
            </p>
            <ul className={styles.annualFeatures}>
              <li><span className={styles.check}>✓</span> Perfil médico digital completo</li>
              <li><span className={styles.check}>✓</span> Acceso 24/7 sin app ni login</li>
              <li><span className={styles.check}>✓</span> Actualizaciones ilimitadas</li>
              <li><span className={styles.check}>✓</span> ID Card física incluida</li>
            </ul>
          </div>
          <div className={styles.annualRight}>
            <div className={styles.annualPriceRow}>
              <span className={styles.annualPrice}>$400</span>
              <span className={styles.annualPeriod}>MXN / año</span>
            </div>
            <Link href="/registro" className={styles.annualCta}>
              Obtener Human ID
            </Link>
          </div>
        </div>

        {/* Identificaciones físicas */}
        <div className={styles.productsHead}>
          <h3 className={styles.productsTitle}>Identificaciones físicas</h3>
          <p className={styles.productsSub}>Elige el formato que mejor se adapte a ti.</p>
        </div>

        <div className={styles.grid}>
          {products.map((p) => (
            <div
              key={p.name}
              className={`${styles.card} ${p.featured ? styles.featured : ''}`}
            >
              {p.featured && (
                <div className={styles.featuredBadge}>Más popular</div>
              )}
              <div className={styles.planName}>{p.name}</div>
              <div className={styles.priceRow}>
                <span className={styles.priceValue}>{p.price}</span>
                <span className={styles.pricePeriod}>{p.priceNote}</span>
              </div>
              <p className={styles.productDesc}>{p.description}</p>
              <div className={styles.renewalRow}>
                <span className={styles.renewalIcon}>↻</span>
                <span className={styles.renewalText}>{p.renewal}</span>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.footnote}>
          Los precios de identificaciones físicas se suman a la anualidad. Consulta paquetes para mayor ahorro.
        </p>
      </div>
    </section>
  )
}
