/**
 * HUMAN ID — Perfil demo del runner
 * Carlos Mendoza Ríos — Perfil de demostración para HumanID
 */

import { HumanProfile } from '@/types'

const profile: HumanProfile = {
  id: 'demo-runner-01',
  name: 'Carlos Mendoza Ríos',
  photo: '/avatar-demo.png',
  age: 34,
  sex: 'Masculino',
  weight: 72,
  height: 178,
  nationality: 'Mexicano',

  bloodType: 'A+',

  allergies: [
    { name: 'Penicilina', severity: 'severa' },
    { name: 'Aspirina (AAS)', severity: 'moderada' },
    { name: 'Látex', severity: 'leve' },
  ],

  medications: [
    { name: 'Losartán', dose: '50 mg', frequency: 'Una vez al día (mañana)' },
    { name: 'Omeprazol', dose: '20 mg', frequency: 'En ayunas' },
    { name: 'Salbutamol (inhalador)', dose: '100 mcg / 2 puff', frequency: 'Al inicio de síntomas respiratorios' },
  ],

  conditions: [
    'Hipertensión arterial leve (controlada)',
    'Asma de esfuerzo (leve)',
    'Hipotiroidismo leve (compensado)',
  ],

  disabilities: [],

  surgeries: [
    { description: 'Meniscectomía parcial rodilla derecha', year: 2019 },
    { description: 'Apendicectomía laparoscópica', year: 2015 },
  ],

  vaccines: [
    'Tétanos / Td — 2023',
    'COVID-19 Pfizer — 2021',
    'Hepatitis B — 2019',
    'Influenza — 2025',
  ],

  emergencyContacts: [
    { name: 'Ana Lucía Ríos', phone: '+52 228 159 4723', relationship: 'Esposa' },
    { name: 'Roberto Mendoza', phone: '+52 55 3312 9080', relationship: 'Hermano' },
  ],

  doctor: {
    name: 'Dr. Javier Herrera Blanco',
    clinic: 'Clínica MedVida — CDMX, Del. Benito Juárez',
    phone: '+52 55 5280 4400',
  },

  hasPacemaker: false,
  hasProsthetics: false,
  organDonor: true,

  specialInstructions:
    'Paciente hipertenso controlado con Losartán. Monitorear presión arterial en emergencias. NO administrar AINEs (alérgico a Aspirina). NO administrar Penicilina ni derivados. Asmático de esfuerzo: lleva inhalador Salbutamol en cinturón de hidratación. En dificultad respiratoria post-ejercicio: 2 puff y reposo.',

  insurance: {
    company: 'GNP Seguros',
    policyNumber: 'GNP-4521-MX-00839',
  },

  discipline: 'Trail Running',

  regularEvents: [
    'Maratón de la Ciudad de México',
    'Ultra Caballo Blanco (Copper Canyon)',
    'Carrera Veracruz 21K',
    'Trail Pico de Orizaba',
  ],

  createdAt: '2026-01-15T09:00:00.000Z',
}

export default profile
