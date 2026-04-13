import Link from 'next/link'

export default function PagoCanceladoPage() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', background:'var(--color-bg-page)' }}>
      <div style={{ background:'var(--color-bg-card)', border:'1px solid var(--color-border)', borderRadius:'16px', padding:'3.5rem 2.5rem', maxWidth:'440px', width:'100%', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.25rem' }}>
        <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'var(--color-border)', color:'var(--color-text-secondary)', fontSize:'2rem', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</div>
        <h1 style={{ fontFamily:'var(--font-title)', fontSize:'1.75rem', fontWeight:900, color:'var(--color-text-primary)' }}>Pago cancelado</h1>
        <p style={{ fontSize:'0.95rem', color:'var(--color-text-secondary)', lineHeight:1.6 }}>
          No se realizó ningún cargo. Puedes intentarlo nuevamente cuando quieras.
        </p>
        <Link href="/registro" style={{ display:'inline-block', background:'var(--color-brand-primary)', color:'#fff', fontWeight:700, padding:'0.75rem 2rem', borderRadius:'8px', textDecoration:'none', marginTop:'0.5rem' }}>
          Intentar de nuevo
        </Link>
        <Link href="/" style={{ fontSize:'0.875rem', color:'var(--color-text-secondary)' }}>Volver al inicio</Link>
      </div>
    </div>
  )
}
