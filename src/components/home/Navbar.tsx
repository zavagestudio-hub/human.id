'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import styles from './Navbar.module.css'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink}>
          <Logo variant="dark" />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <a href="#como-funciona" className={styles.navLink} onClick={close}>Cómo funciona</a>
          <a href="#planes" className={styles.navLink} onClick={close}>Planes</a>
          <Link href="/perfil" className={styles.navLink} onClick={close}>Demo</Link>
          <Link href="/registro" className={styles.ctaBtn} onClick={close}>Crear mi perfil</Link>
        </nav>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineTop : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineMid : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineBot : ''}`} />
        </button>
      </div>
    </header>
  )
}
