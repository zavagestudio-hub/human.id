import profile from '@/data/profile'
import { Logo } from '@/components/Logo'
import styles from './CardPrint.module.css'

interface CardPrintProps {
  qrDataUrl: string
}

export default function CardPrint({ qrDataUrl }: CardPrintProps) {
  const mainContact = profile.emergencyContacts[0]
  const topAllergies = profile.allergies.slice(0, 2)

  return (
    <div className={styles.printOnly}>
      <div className={styles.cards}>

        {/* ── Cara frontal ── */}
        <div className={styles.front}>
          <div className={styles.frontTopRow}>
            <Logo variant="dark" />
          </div>
          <div className={styles.frontCenter}>
            <div className={styles.frontName}>{profile.name}</div>
            <div className={styles.frontMeta}>
              {profile.age} años · {profile.sex} · {profile.weight} kg · {profile.height} cm
            </div>
          </div>
          <div className={styles.frontBottomRow}>
            <div className={styles.frontLeft}>
              <div className={styles.frontDomain}>human-id.app</div>
              {qrDataUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrDataUrl} alt="QR" width={120} height={120} className={styles.frontQr} />
              )}
            </div>
            <div className={styles.frontBloodWrap}>
              <div className={styles.frontBloodLabel}>SANGRE</div>
              <div className={styles.frontBloodBadge}>{profile.bloodType}</div>
            </div>
          </div>
        </div>

        {/* ── Cara trasera ── */}
        <div className={styles.back}>
          <div className={styles.backHeader}>
            <span className={styles.backHeaderText}>EN CASO DE EMERGENCIA</span>
          </div>
          <div className={styles.backBody}>
            <div className={styles.backRow}>
              <span className={styles.backKey}>Sangre</span>
              <span className={styles.backVal}>{profile.bloodType}</span>
            </div>
            <div className={styles.backRow}>
              <span className={styles.backKey}>Alergias</span>
              <span className={styles.backVal}>
                {topAllergies.map(a => `${a.name} (${a.severity})`).join(' · ')}
              </span>
            </div>
            <div className={styles.backDivider} />
            <div className={styles.backRow}>
              <span className={styles.backKey}>Emergencia</span>
              <span className={styles.backVal}>
                {mainContact.name} · {mainContact.relationship}
              </span>
            </div>
            <div className={styles.backRow}>
              <span className={styles.backKey}>Tel.</span>
              <span className={`${styles.backVal} ${styles.backPhone}`}>{mainContact.phone}</span>
            </div>
            {profile.specialInstructions && (
              <div className={styles.backInstructions}>
                {profile.specialInstructions.length > 130
                  ? profile.specialInstructions.slice(0, 130) + '…'
                  : profile.specialInstructions}
              </div>
            )}
          </div>
          <div className={styles.backFooter}>
            Escanea el QR para ver el perfil completo · human-id.app
          </div>
        </div>

      </div>
    </div>
  )
}
