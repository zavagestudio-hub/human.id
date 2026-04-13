'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

export default function MembresiаPage() {
  const [loading, setLoading] = useState(false)

  async function openPortal() {
    setLoading(true)
    const res = await fetch('/api/cuenta/portal', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(false)
  }

  async function buyAddOn(item: string) {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [item] }),
    })
    const { checkoutUrl } = await res.json()
    if (checkoutUrl) window.location.href = checkoutUrl
    else setLoading(false)
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <Link href="/cuenta" className={styles.back}>← Mi cuenta</Link>
        <h1 className={styles.title}>Membresía y pedidos</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Tu suscripción</h2>
          <p className={styles.sectionSub}>Gestiona pagos, facturas y cancelaciones desde el portal de Stripe.</p>
          <button className={styles.portalBtn} onClick={openPortal} disabled={loading}>
            {loading ? 'Cargando…' : 'Abrir portal de facturación'}
          </button>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Identificaciones físicas</h2>
          <p className={styles.sectionSub}>Agrega una nueva identificación física a tu plan.</p>
          <div className={styles.addOnGrid}>
            <div className={styles.addOnCard}>
              <div className={styles.addOnName}>ID Pocket</div>
              <div className={styles.addOnPrice}>$250 MXN</div>
              <p className={styles.addOnDesc}>Tarjeta con QR + NFC para llevar en tu cartera.</p>
              <button className={styles.addOnBtn} onClick={() => buyAddOn('id_pocket')} disabled={loading}>
                Agregar
              </button>
            </div>
            <div className={styles.addOnCard}>
              <div className={styles.addOnName}>ID Token</div>
              <div className={styles.addOnPrice}>$250 MXN</div>
              <p className={styles.addOnDesc}>Llavero o dije con QR + NFC. Siempre contigo.</p>
              <button className={styles.addOnBtn} onClick={() => buyAddOn('id_token')} disabled={loading}>
                Agregar
              </button>
            </div>
            <div className={styles.addOnCard}>
              <div className={styles.addOnName}>Reposición ID Card</div>
              <div className={styles.addOnPrice}>$100 MXN</div>
              <p className={styles.addOnDesc}>Reemplaza tu ID Card física antes de la renovación.</p>
              <button className={styles.addOnBtn} onClick={() => buyAddOn('id_card_replacement')} disabled={loading}>
                Pedir reposición
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
