# HumanID 🆔

**human-id.app** — Perfil médico de emergencia con código QR.

## Cómo personalizar el perfil

Edita el archivo **`src/data/profile.ts`** con los datos del runner:

```ts
const profile: HumanProfile = {
  id: 'runner-01',
  name: 'Laura Martínez',
  age: 32,
  sex: 'Femenino',
  weight: 58,
  bloodType: 'O+',
  allergies: ['Penicilina'],
  medications: ['Metformina 500mg'],
  conditions: ['Diabetes tipo 2'],
  emergencyContact: {
    name: 'Carlos Martínez',
    phone: '228 123 4567',
    relationship: 'Esposo/a',
  },
  notes: 'Diabética controlada. Llevar glucosa.',
  createdAt: '2026-01-01T00:00:00.000Z',
}
```

Guarda el archivo → el perfil y el QR se actualizan solos.

## Inicio rápido

```bash
npm install
npm run dev
# → http://localhost:3000/perfil
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page |
| `/perfil` | Perfil público con QR (la URL del QR apunta aquí) |

## Deploy en Vercel

```bash
npm i -g vercel
vercel
```

Conecta tu dominio `human-id.app` en el dashboard de Vercel.

## Stack

- Next.js 14 (App Router) · TypeScript · CSS Modules · qrcode

## Próximos pasos

- [ ] Supabase para múltiples perfiles con base de datos
- [ ] Autenticación para editar perfil propio
- [ ] Múltiples idiomas (ES / EN)
- [ ] PDF para imprimir el QR en tamaño llavero
