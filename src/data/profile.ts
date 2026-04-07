/**
 * HUMAN ID — Perfil demo del runner
 * Carlos Mendoza Ríos — Perfil de demostración para HumanID
 */

import { HumanProfile } from '@/types'

const profile: HumanProfile = {
  id: 'demo-runner-01',
  slug: 'carlos-mendoza',
  name: 'Carlos Mendoza Ríos',
  age: 34,
  sex: 'Masculino',
  weight: 72,
  height: 178,
  nationality: 'Mexicano',
  language: 'Español',

  bloodType: 'A+',

  allergies: [
    { name: 'Penicilina', severity: 'anafilaxis' },
    { name: 'Ibuprofeno', severity: 'severa' },
    { name: 'Látex', severity: 'moderada' },
    { name: 'Polen', severity: 'leve' },
  ],

  medications: [
    { name: 'Losartán', dose: '50 mg', frequency: 'Una vez al día (mañana)' },
    { name: 'Omeprazol', dose: '20 mg', frequency: 'En ayunas' },
    { name: 'Atorvastatina', dose: '10 mg', frequency: 'Una vez al día (noche)' },
  ],

  conditions: [
    'Hipertensión arterial (controlada)',
    'Hipotiroidismo leve',
    'Asma de esfuerzo (leve)',
  ],

  disabilities: [],

  emergencyContact: {
    name: 'Ana Lucía Ríos',
    phone: '+52 228 159 4723',
    relationship: 'Esposa',
  },

  emergencyContactSecondary: {
    name: 'Roberto Mendoza',
    phone: '+52 55 3312 9080',
    relationship: 'Hermano',
  },

  doctor: {
    name: 'Dr. Javier Herrera Blanco',
    clinic: 'Clínica MedVida — Xalapa, Ver.',
    phone: '+52 228 812 4400',
  },

  surgeries: [
    { description: 'Apendicectomía laparoscópica', year: 2018 },
    { description: 'Artroscopia rodilla derecha (menisco)', year: 2022 },
  ],

  hospitalizations: [
    'Hospitalización por neumonía — Enero 2020 (3 días)',
  ],

  vaccines: [
    { name: 'COVID-19 (Pfizer)', year: 2021, upToDate: true },
    { name: 'Tétanos / Td', year: 2023, upToDate: true },
    { name: 'Influenza', year: 2025, upToDate: true },
    { name: 'Hepatitis B', year: 2019, upToDate: true },
  ],

  hasPacemaker: false,
  hasProsthesis: false,
  organDonor: true,

  emergencyInstructions:
    'En caso de reacción anafiláctica por penicilina, usar EpiPen (bolsa de trail). No administrar AINEs. Paciente hipertenso: monitorear presión. Si inconsciente, posición de recuperación.',

  insurance: {
    provider: 'GNP Seguros',
    policyNumber: 'GNP-4521-MX-00839',
    phone: '800 400 9000',
  },

  runner: {
    discipline: ['Trail Running', 'Asfalto 10K–Media Maratón'],
    events: ['Ultra Trail Pico de Orizaba', 'Maratón CDMX', 'Carrera Veracruz 21K'],
    club: 'Trail Runners Veracruz',
  },

  notes:
    'Lleva EpiPen en cinturón deportivo azul. Asmático de esfuerzo: en situación de dificultad respiratoria post-ejercicio, puede usar inhalador salbutamol (mochila). Diestro. Sin restricción para donación de sangre.',

  createdAt: '2026-01-15T09:00:00.000Z',
}

export default profile
