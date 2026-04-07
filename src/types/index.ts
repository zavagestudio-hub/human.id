export interface EmergencyContact {
  name: string
  phone: string
  relationship: string
  secondary?: boolean
}

export interface Medication {
  name: string
  dose: string
  frequency: string
}

export interface Allergy {
  name: string
  severity: 'leve' | 'moderada' | 'severa' | 'anafilaxis'
}

export interface Surgery {
  description: string
  year: number
}

export interface Vaccine {
  name: string
  year?: number
  upToDate?: boolean
}

export interface InsuranceInfo {
  provider: string
  policyNumber: string
  phone?: string
}

export interface RunnerInfo {
  discipline: string[]
  events: string[]
  club?: string
}

export interface HumanProfile {
  id: string
  slug: string
  name: string
  age: number | null
  sex: string
  weight: number | null
  height?: number | null
  nationality?: string
  language?: string
  bloodType: string
  allergies: Allergy[]
  medications: Medication[]
  conditions: string[]
  disabilities?: string[]
  emergencyContact: EmergencyContact
  emergencyContactSecondary?: EmergencyContact
  doctor?: {
    name: string
    clinic: string
    phone: string
  }
  surgeries?: Surgery[]
  hospitalizations?: string[]
  vaccines?: Vaccine[]
  hasPacemaker?: boolean
  hasProsthesis?: boolean
  organDonor?: boolean
  emergencyInstructions?: string
  insurance?: InsuranceInfo
  runner?: RunnerInfo
  notes: string
  createdAt: string
}
