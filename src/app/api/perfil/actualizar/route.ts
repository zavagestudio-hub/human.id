import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const body = await request.json()
  const { formData } = body as { formData: Record<string, unknown> }

  const medicalData = {
    name: formData.name,
    age: formData.age ? Number(formData.age) : null,
    sex: formData.sex,
    weight: formData.weight ? Number(formData.weight) : null,
    height: formData.height ? Number(formData.height) : null,
    nationality: formData.nationality,
    allergies: formData.allergies ?? [],
    medications: formData.medications ?? [],
    conditions: formData.conditions ?? [],
    disabilities: formData.disabilities ?? [],
    surgeries: (formData.surgeries as Array<{description: string; year: string}> ?? [])
      .map(s => ({ description: s.description, year: Number(s.year) })),
    vaccines: formData.vaccines ?? [],
    emergencyContacts: formData.contacts ?? [],
    doctor: { name: formData.doctorName, phone: formData.doctorPhone, clinic: formData.doctorClinic },
    hasPacemaker: formData.hasPacemaker ?? false,
    hasProsthetics: formData.hasProsthetics ?? false,
    organDonor: formData.organDonor ?? false,
    specialInstructions: formData.specialInstructions ?? '',
    insurance: { company: formData.insuranceCompany, policyNumber: formData.insurancePolicyNumber },
    discipline: formData.discipline,
    regularEvents: formData.events ?? [],
  }

  const { error } = await supabase.from('profiles').update({
    blood_type: (formData.bloodType as string) || null,
    medical_data: medicalData,
  }).eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
