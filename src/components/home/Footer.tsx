import Link from 'next/link'
import { Logo } from '@/components/Logo'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo variant="dark" />
        </div>
        <nav className={styles.links}>
          <a href="#" className={styles.link}>Privacidad</a>
          <a href="#" className={styles.link}>Términos</a>
          <a href="mailto:hola@human-id.app" className={styles.link}>Contacto</a>
        </nav>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Human ID. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
