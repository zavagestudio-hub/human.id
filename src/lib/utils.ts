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
