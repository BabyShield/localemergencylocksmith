import type { AddressRegion } from './area-authorities'

export const EVIDENCE_REVIEWED_ON = '2026-08-29'

export interface EvidenceSource {
  id: string
  title: string
  publisher: string
  url: string
  supports: string
  checkedOn: string
}

export const TECHNICAL_EVIDENCE_SOURCES: Record<string, EvidenceSource> = {
  'mla-service-calls': {
    id: 'mla-service-calls',
    title: 'Customer Charter: Service Calls',
    publisher: 'Master Locksmiths Association',
    url: 'https://admin.locksmiths.co.uk/MLA/customerCharters.asp',
    supports: 'Proof-of-authority checks, advance cost information, and explaining cost changes before work proceeds.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
  'warwickshire-lock-advice': {
    id: 'warwickshire-lock-advice',
    title: 'Door and window lock advice',
    publisher: 'Warwickshire Police',
    url: 'https://www.warwickshire.police.uk/cp/crime-prevention/protect-home-crime/door-window-lock-advice/',
    supports: 'How multipoint uPVC locks are operated and the importance of locking doors and windows correctly.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
  'warwickshire-door-security': {
    id: 'warwickshire-door-security',
    title: 'Door security',
    publisher: 'Warwickshire Police',
    url: 'https://www.warwickshire.police.uk/cp/crime-prevention/protect-home-crime/door-security-advice/',
    supports: 'Checking the complete door, frame, hinges and lock; correctly sized cylinders; accredited security products.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
  'warwickshire-forensics': {
    id: 'warwickshire-forensics',
    title: 'Forensic evidence and making a home secure',
    publisher: 'Warwickshire Police',
    url: 'https://www.warwickshire.police.uk/advice/advice-and-information/victim-support/what-happens-after-you-report-crime/forensic-evidence/',
    supports: 'Photographing damage, preserving possible evidence, and securing damaged doors or windows from outside.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
  'west-midlands-lock-advice': {
    id: 'west-midlands-lock-advice',
    title: 'Door and window lock advice',
    publisher: 'West Midlands Police',
    url: 'https://www.westmidlands.police.uk/cp/crime-prevention/protect-home-crime/door-window-lock-advice/',
    supports: 'How multipoint uPVC locks are operated and the importance of locking doors and windows correctly.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
  'west-midlands-door-security': {
    id: 'west-midlands-door-security',
    title: 'Door security',
    publisher: 'West Midlands Police',
    url: 'https://www.westmidlands.police.uk/cp/crime-prevention/protect-home-crime/door-security-advice/',
    supports: 'Checking doors, frames, hinges and locks; correctly sized cylinders; accredited security products and flat fire-safety duties.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
  'west-midlands-forensics': {
    id: 'west-midlands-forensics',
    title: 'Forensic evidence and making a home secure',
    publisher: 'West Midlands Police',
    url: 'https://www.westmidlands.police.uk/advice/advice-and-information/victim-support/what-happens-after-you-report-crime/forensic-evidence/',
    supports: 'Photographing damage, preserving possible evidence, and securing damaged doors or windows from outside.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
}

export const POLICE_SOURCE_IDS: Record<AddressRegion, {
  lockAdvice: string
  doorSecurity: string
  forensics: string
}> = {
  Warwickshire: {
    lockAdvice: 'warwickshire-lock-advice',
    doorSecurity: 'warwickshire-door-security',
    forensics: 'warwickshire-forensics',
  },
  'West Midlands': {
    lockAdvice: 'west-midlands-lock-advice',
    doorSecurity: 'west-midlands-door-security',
    forensics: 'west-midlands-forensics',
  },
}

export function getTechnicalEvidenceSource(id: string): EvidenceSource {
  const source = TECHNICAL_EVIDENCE_SOURCES[id]
  if (!source) throw new Error(`Missing technical evidence source: ${id}`)
  return source
}
