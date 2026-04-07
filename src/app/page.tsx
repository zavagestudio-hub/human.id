'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import styles from './page.module.css'
import { Logo } from '@/components/Logo'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Logo variant="dark" />
      </Link>
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        <a href="#como-funciona" className={styles.navLink} onClick={() => setMenuOpen(false)}>Cómo funciona</a>
        <a href="#kit" className={styles.navLink} onClick={() => setMenuOpen(false)}>El kit</a>
        <a href="#demo" className={styles.navLink} onClick={() => setMenuOpen(false)}>Demo</a>
        <a href="#precio" className={styles.navLink} onClick={() => setMenuOpen(false)}>Precio</a>
      </nav>
      <div className={styles.headerRight}>
        <Link href="/perfil" className={styles.headerCta}>Ver demo</Link>
        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          <span className={menuOpen ? styles.menuIconOpen : styles.menuIcon} />
        </button>
      </div>
    </header>
  )
}

function Step({ number, icon, title, description }: { number: string; icon: string; title: string; description: string }) {
  return (
    <div className={styles.step}>
      <div className={styles.stepNum}>{number}</div>
      <div className={styles.stepIcon}>{icon}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDesc}>{description}</p>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>

        {/* HERO */}
        <section className={styles.hero} id="inicio">
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} />
                Identidad médica de emergencia
              </div>
              <h1 className={styles.heroTitle}>
                Tu vida,<br />en un <span className={styles.accent}>escaneo</span>.
              </h1>
              <p className={styles.heroDesc}>
                En caso de accidente, cualquier persona o paramédico puede escanear
                tu código QR y acceder al instante a tu tipo de sangre, alergias,
                medicamentos y contacto de emergencia — sin app, sin contraseña.
              </p>
              <div className={styles.heroCtas}>
                <a href="#precio" className={styles.btnPrimary}>Obtener mi HumanID</a>
                <Link href="/perfil" className={styles.btnSecondary}>Ver perfil demo →</Link>
              </div>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statValue}>&lt; 3 seg</div>
                  <div className={styles.statLabel}>para ver tu perfil</div>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <div className={styles.statValue}>Sin app</div>
                  <div className={styles.statLabel}>ni descarga</div>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <div className={styles.statValue}>$400</div>
                  <div className={styles.statLabel}>MXN / año</div>
                </div>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroImageWrap}>
                <DotLottieReact
                  src="https://lottie.host/a5f66c08-5e92-4495-b021-12f456dd66d8/MdqNp111tJ.lottie"
                  loop
                  autoplay
                  style={{ width: '420px', height: '420px', position: 'relative', zIndex: 2 }}
                />
                <div className={styles.heroBlob} />
              </div>
            </div>
          </div>
        </section>

        {/* PARA QUIEN ES */}
        <section className={styles.section} id="para-quien">
          <div className={styles.sectionInner}>
            <div className={styles.whoHeader}>
              <div className={styles.whoHeaderLeft}>
                <span className={styles.sectionBadge}>Para quién es</span>
                <h2 className={styles.whoTitle}>Control total de tu información médica, cuando más importa.</h2>
              </div>
              <div className={styles.whoHeaderRight}>
                <a href="#precio" className={styles.btnPrimary}>¿Qué incluye el kit?</a>
              </div>
            </div>
            
            <div className={styles.whoGrid}>
              {/* Col 1 */}
              <div className={styles.whoCol}>
                <div className={styles.whoNum}>[1]</div>
                <h3 className={styles.whoColTitle}>Personas comunes</h3>
                <p className={styles.whoColDesc}>Obtén información clave sobre tu corazón, metabolismo y salud en general. Control total de tu información médica para tu vida diaria.</p>
                <div className={styles.whoImageWrap}>
                  <div className={`${styles.whoImagePlaceholder} ${styles.whoBgEveryday}`}>
                     <div className={styles.whoGlassCard}>
                        <div className={styles.whoGlassTitle}>Tu Salud</div>
                        <div className={styles.whoGlassRow}>
                          <div className={styles.whoGlassIcon}>❤️</div>
                          <div>Metabolismo</div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
              {/* Col 2 */}
              <div className={styles.whoCol}>
                <div className={styles.whoNum}>[2]</div>
                <h3 className={styles.whoColTitle}>Adultos mayores</h3>
                <p className={styles.whoColDesc}>La edad cronológica es solo un número. Facilita la información vital para médicos y asegura la tranquilidad de tus seres queridos.</p>
                <div className={styles.whoImageWrap}>
                  <div className={`${styles.whoImagePlaceholder} ${styles.whoBgSenior}`}>
                     <div className={styles.whoGlassCard}>
                        <div className={styles.whoGlassTitle}>Datos Vitales</div>
                        <div className={styles.whoGlassRow}>
                          <div className={styles.whoGlassIcon}>💊</div>
                          <div>4 Medicamentos</div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
              {/* Col 3 */}
              <div className={styles.whoCol}>
                <div className={styles.whoNum}>[3]</div>
                <h3 className={styles.whoColTitle}>Runners y deportistas</h3>
                <p className={styles.whoColDesc}>Analizamos y estructuramos tus riesgos. Lleva tus contactos de emergencia y tipo de sangre a cada rodada, carrera o sesión de senderismo.</p>
                <div className={styles.whoImageWrap}>
                  <div className={`${styles.whoImagePlaceholder} ${styles.whoBgAthlete}`}>
                     <div className={styles.whoGlassCard}>
                        <div className={styles.whoGlassTitle}>ID Atleta</div>
                        <div className={styles.whoGlassRow}>
                          <div className={styles.whoGlassIcon}>🩸</div>
                          <div>Sangre O+</div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className={styles.section} id="como-funciona">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionBadge}>Proceso simple</span>
              <h2 className={styles.sectionTitle}>¿Cómo funciona?</h2>
              <p className={styles.sectionDesc}>Tres pasos y tu información médica estará lista para cualquier emergencia.</p>
            </div>
            <div className={styles.steps}>
              <Step number="01" icon="📦" title="Recibe tu kit" description="Te enviamos tu tarjeta, llavero o colgante HumanID directamente a casa. Físicos, duraderos, siempre contigo." />
              <div className={styles.stepArrow}>→</div>
              <Step number="02" icon="📝" title="Crea tu perfil" description="Llena tu información médica en minutos: tipo de sangre, alergias, medicamentos, contactos de emergencia y más." />
              <div className={styles.stepArrow}>→</div>
              <Step number="03" icon="✅" title="¡Listo! Ya estás cubierto" description="Una vez confirmado tu pago, tu perfil se publica. El QR de tu kit ya enlaza a tu información. Sin pasos extra." />
            </div>
          </div>
        </section>

        {/* KIT FÍSICO */}
        <section className={styles.sectionAlt} id="kit">
          <div className={styles.sectionInner}>
            <div className={styles.kitGrid}>
              <div className={styles.kitText}>
                <span className={styles.sectionBadge}>Producto físico incluido</span>
                <h2 className={styles.sectionTitle}>Tu kit HumanID</h2>
                <p className={styles.kitDesc}>Nosotros nos encargamos de fabricar y entregarte tu identificador físico. Elige el que mejor se adapte a tu estilo de vida:</p>
                <div className={styles.kitItems}>
                  <div className={styles.kitItem}>
                    <span className={styles.kitItemIcon}>💳</span>
                    <div>
                      <div className={styles.kitItemTitle}>Tarjeta CR-80</div>
                      <div className={styles.kitItemDesc}>Tamaño cartera, perfecta para tu billetera o dorsal de carrera</div>
                    </div>
                  </div>
                  <div className={styles.kitItem}>
                    <span className={styles.kitItemIcon}>🔑</span>
                    <div>
                      <div className={styles.kitItemTitle}>Llavero metálico</div>
                      <div className={styles.kitItemDesc}>En acero inoxidable con QR grabado láser. Resistente y elegante</div>
                    </div>
                  </div>
                  <div className={styles.kitItem}>
                    <span className={styles.kitItemIcon}>🪬</span>
                    <div>
                      <div className={styles.kitItemTitle}>Colgante / dije</div>
                      <div className={styles.kitItemDesc}>Para correr, andar en bici o llevar siempre en tu mochila</div>
                    </div>
                  </div>
                </div>
                <div className={styles.kitNote}>✦ El kit se incluye en la suscripción anual — sin costo adicional por envío</div>
              </div>
              <div className={styles.kitImageWrap}>
                <Image src="/product-kit.png" alt="Kit HumanID: tarjeta, llavero y brazalete" width={480} height={480} className={styles.kitImage} />
              </div>
            </div>
          </div>
        </section>

        {/* DEMO */}
        <section className={styles.section} id="demo">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionBadge}>Ejemplo real</span>
              <h2 className={styles.sectionTitle}>Así se ve tu perfil</h2>
              <p className={styles.sectionDesc}>Esto es lo que ve el paramédico en segundos al escanear tu QR. Un perfil completo, claro y sin fricciones.</p>
            </div>
            <div className={styles.demoCard}>
              <div className={styles.demoBrowser}>
                <div className={styles.demoBrowserBar}>
                  <div className={styles.demoBrowserDots}><span /><span /><span /></div>
                  <div className={styles.demoBrowserUrl}>human-id.app/p/carlos-mendoza</div>
                </div>
                <div className={styles.demoPreview}>
                  <div className={styles.demoBanner}>
                    <div className={styles.demoLeft}>
                      <div className={styles.demoAvatar}>
                        <Image src="/avatar-demo.png" alt="Demo" width={52} height={52} className={styles.demoAvatarImg} />
                      </div>
                      <div>
                        <div className={styles.demoName}>Carlos Mendoza Ríos</div>
                        <div className={styles.demoMeta}>34 años · Masculino · 72 kg</div>
                        <div className={styles.demoBadges}>
                          <span className={styles.demoRunnerBadge}>🏃 Runner</span>
                          <span className={styles.demoDiscipline}>Trail Running</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.demoBlood}>
                      <div className={styles.demoBloodLabel}>SANGRE</div>
                      <div className={styles.demoBloodBadge}>A+</div>
                    </div>
                  </div>
                  <div className={styles.demoEmergency}>
                    📞 &nbsp;<strong>Emergencia:</strong> Ana Lucía Ríos &nbsp;·&nbsp;
                    <span className={styles.demoPhone}>+52 228 159 4723</span>
                  </div>
                  <div className={styles.demoGrid}>
                    <div className={styles.demoSection}>
                      <div className={styles.demoSecLabel}>ALERGIAS</div>
                      <div className={styles.demoPills}>
                        <span className={`${styles.demoPill} ${styles.demoPillAnafi}`}>⚡ Penicilina — Anafilaxis</span>
                        <span className={`${styles.demoPill} ${styles.demoPillSev}`}>Ibuprofeno — Severa</span>
                        <span className={`${styles.demoPill} ${styles.demoPillMod}`}>Látex — Moderada</span>
                      </div>
                    </div>
                    <div className={styles.demoSection}>
                      <div className={styles.demoSecLabel}>MEDICAMENTOS</div>
                      <div className={styles.demoMedList}>
                        <div>Losartán · 50 mg · 1/día</div>
                        <div>Omeprazol · 20 mg · en ayunas</div>
                        <div>Atorvastatina · 10 mg · noche</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.demoActions}>
                <p className={styles.demoActionText}>¿Quieres ver el perfil completo con historial médico, vacunas, tarjeta imprimible y más?</p>
                <Link href="/perfil" className={styles.btnPrimary} id="btn-ver-demo">Ver perfil completo →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className={styles.sectionAlt} id="beneficios">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionBadge}>Los beneficios</span>
              <h2 className={styles.sectionTitle}>Por qué HumanID</h2>
            </div>
            <div className={styles.featsGrid}>
              {[
                { icon: '⚡', color: '#FEF2F2', title: 'Información crítica al instante', desc: 'En los primeros minutos de una emergencia, conocer el tipo de sangre y alergias puede salvar una vida.' },
                { icon: '📱', color: '#EFF6FF', title: 'Sin app, sin registro', desc: 'Cualquier persona con cámara puede escanear el QR. No se necesita instalar nada ni crear una cuenta.' },
                { icon: '🏃', color: '#F0FDF4', title: 'Perfecto para runners y atletas', desc: 'Ideal para carreras, trail, ciclismo o cualquier deporte donde llevas poco encima y el riesgo es mayor.' },
                { icon: '🔒', color: '#F5F3FF', title: 'Tú controlas tu perfil', desc: 'Puedes editar tu información médica en cualquier momento. El QR siempre apunta a la versión más actualizada.' },
                { icon: '👨‍⚕️', color: '#FFF7ED', title: 'Diseñado para paramédicos', desc: 'Jerarquía visual pensada para que los datos críticos (sangre, alergias, instrucciones) sean lo primero que se ve.' },
                { icon: '🌍', color: '#ECFDF5', title: 'Funciona en cualquier parte', desc: 'Sin importar el país, idioma o sistema de salud. Cualquier teléfono puede escanearlo.' },
              ].map((f, i) => (
                <div key={i} className={styles.feat}>
                  <div className={styles.featIcon} style={{ background: f.color }}>{f.icon}</div>
                  <h3 className={styles.featTitle}>{f.title}</h3>
                  <p className={styles.featDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRECIO */}
        <section className={styles.section} id="precio">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionBadge}>Suscripción anual</span>
              <h2 className={styles.sectionTitle}>Un precio, todo incluido</h2>
              <p className={styles.sectionDesc}>Sin sorpresas. Un solo pago al año cubre tu kit físico, tu perfil en línea y todas las actualizaciones.</p>
            </div>
            <div className={styles.pricingWrap}>
              <div className={styles.pricingCard}>
                <div className={styles.pricingBadge}>Más popular</div>
                <div className={styles.pricingName}>HumanID Anual</div>
                <div className={styles.pricingAmount}>
                  <span className={styles.pricingCurrency}>$</span>
                  <span className={styles.pricingNumber}>400</span>
                  <span className={styles.pricingPeriod}>MXN / año</span>
                </div>
                <div className={styles.pricingNote}>Menos de $35 pesos al mes</div>
                <ul className={styles.pricingFeatures}>
                  {[
                    'Kit físico incluido (tarjeta + llavero o colgante)',
                    'Envío a domicilio sin costo adicional',
                    'Perfil médico digital completo',
                    'QR único e irrepetible',
                    'Actualizaciones ilimitadas de tu perfil',
                    'Accesible desde cualquier dispositivo',
                    'Sin app, sin contraseña para consultarlo',
                    'Soporte por WhatsApp',
                  ].map((f, i) => (
                    <li key={i} className={styles.pricingFeature}>
                      <span className={styles.pricingCheck}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="mailto:hola@human-id.app?subject=Quiero%20mi%20HumanID" className={styles.btnPricingCta} id="btn-get-humanid">
                  Quiero mi HumanID
                </a>
                <p className={styles.pricingDisclaimer}>Al hacer clic te contactaremos para coordinar tu pedido y datos de envío.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaBloodBadge}>A+</div>
            <h2 className={styles.ctaTitle}>
              Un accidente no avisa.<br />Tu perfil debería estar listo.
            </h2>
            <p className={styles.ctaDesc}>Únete a los que ya tienen su HumanID y corren (y viven) con tranquilidad.</p>
            <div className={styles.ctaBtns}>
              <a href="mailto:hola@human-id.app?subject=Quiero%20mi%20HumanID" className={styles.btnCtaPrimary} id="btn-cta-final">
                Obtener mi HumanID — $400 MXN/año
              </a>
              <Link href="/perfil" className={styles.btnCtaSecondary}>Ver perfil demo</Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <Logo variant="dark" />
            <div className={styles.footerLinks}>
              <a href="#como-funciona">Cómo funciona</a>
              <a href="#kit">El kit</a>
              <a href="#demo">Demo</a>
              <a href="#precio">Precio</a>
              <a href="mailto:hola@human-id.app">Contacto</a>
            </div>
            <div className={styles.footerMeta}>© {new Date().getFullYear()} HumanID · human-id.app · Hecho con ❤️ en México</div>
          </div>
        </footer>

      </main>
    </>
  )
}
