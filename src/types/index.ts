export interface EmergencyContact {
  name: string
  phone: string
  relationship: string
}

export interface HumanProfile {
  id: string

  // Personal
  name: string
  photo?: string           // URL opcional de foto
  age: number | null
  sex: string
  weight: number | null    // kg
  height: number | null    // cm
  nationality: string

  // Médico crítico
  bloodType: string
  allergies: Array<{
    name: string
    severity: 'leve' | 'moderada' | 'severa' | 'anafilaxis'
  }>
  medications: Array<{
    name: string
    dose: string
    frequency: string
  }>
  conditions: string[]
  disabilities: string[]

  // Historial
  surgeries: Array<{ description: string; year: number }>
  vaccines: string[]

  // Contactos
  emergencyContacts: EmergencyContact[]   // mínimo 1, máximo 3
  doctor: {
    name: string
    phone: string
    clinic: string
  }

  // Paramédico
  hasPacemaker: boolean
  hasProsthetics: boolean
  organDonor: boolean
  specialInstructions: string
  insurance: {
    company: string
    policyNumber: string
  }

  // Runner identity
  discipline: string          // ej. "Trail running", "Asfalto", "Triatlón"
  regularEvents: string[]     // ej. ["Maratón CDMX", "Ultra Caballo Blanco"]

  createdAt: string
}
