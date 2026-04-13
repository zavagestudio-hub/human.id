import Image from 'next/image'

interface LogoProps {
  variant?: 'light' | 'dark'
  className?: string
  height?: number
}

export function Logo({ variant = 'light', className = '', height = 38 }: LogoProps) {
  // light variant: logo original (dark fill) — para fondos claros
  // dark variant: logo invertido a blanco — para fondos oscuros (#0C447C, #2C2C2A)
  const style: React.CSSProperties = variant === 'dark'
    ? { filter: 'brightness(0) invert(1)' }
    : {}

  return (
    <Image
      src="/logo.svg"
      alt="Human ID — Tu perfil médico"
      width={0}
      height={height}
      sizes="100vw"
      style={{ width: 'auto', height: `${height}px`, display: 'block', ...style }}
      className={className}
      priority
    />
  )
}
