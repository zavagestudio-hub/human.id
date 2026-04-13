export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getProfileUrl(): string {
  if (typeof window === 'undefined') return 'https://human-id.app/perfil'
  const isProd = window.location.hostname === 'human-id.app'
  return isProd ? 'https://human-id.app/perfil' : `${window.location.origin}/perfil`
}

export function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 40)
  const suffix = Math.random().toString(36).slice(2, 7)
  return `${base}-${suffix}`
}

export function getPublicProfileUrl(slug: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://human-id.app'
  return `${base}/p/${slug}`
}
