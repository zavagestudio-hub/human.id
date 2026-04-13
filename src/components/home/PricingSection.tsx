import Link from 'next/link'
import styles from './PricingSection.module.css'

const plans = [
  {
    name: 'Basic',
    price: 'Gratis',
    period: '',
    features: [
      'Perfil básico de emergencia',
      'QR digital descargable',
      'Datos esenciales: sangre, alergias, contacto',
    ],
    cta: 'Empezar gratis',
    href: '/registro',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$99',
    period: 'USD / año',
    features: [
      'Historial médico completo',
      'Subida de documentos y estudios',
      'Tarjeta y llavero físico incluidos',
      'Actualizaciones ilimitadas',
      'Soporte prioritario',
    ],
    cta: 'Obtener Pro',
    href: '/registro?plan=pro',
    featured: true,
  },
  {
    name: 'Family',
    price: '$179',
    period: 'USD / año',
    features: [
      'Hasta 4 perfiles Pro',
      'Panel familiar compartido',
      'Kits físicos para todos',
      'Ahorra $217 vs. 4 Pro individuales',
    ],
    cta: 'Plan familiar',
    href: '/registro?plan=family',
    featured: false,
  },
]

export function PricingSection() {
  return (
    <section className={styles.section} id="planes">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>Elige tu plan</h2>
          <p className={styles.sub}>Sin contratos. Cancela cuando quieras.</p>
        </div>
        <div className={styles.grid}>
          {plans.map((p) => (
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
                {p.period && <span className={styles.pricePeriod}>{p.period}</span>}
              </div>
              <ul className={styles.features}>
                {p.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <span className={styles.check}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className={`${styles.cta} ${p.featured ? styles.ctaFeatured : styles.ctaDefault}`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
