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
    supports: 'Proof of identity and authority for lockouts, plus advance cost information and agreement before a service-call price changes.',
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
  'mila-door-locks-catalogue': {
    id: 'mila-door-locks-catalogue',
    title: 'Key 08 product catalogue: choosing a door lock',
    publisher: 'Mila Hardware',
    url: 'https://www.milasecure.com/uk/en/documents/product-downloads/full-catalogue/Key-08-Full-Catalogue_Web%20%285%29.pdf',
    supports: 'Pages 195-196 identify faceplate width, backset and PZ centres as door-lock selection details; product tables from page 201 document locking-point configurations.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
  'bsi-bs3621-current': {
    id: 'bsi-bs3621-current',
    title: 'BS 3621:2017+A1:2024 — lock assemblies operated by key from both sides',
    publisher: 'British Standards Institution',
    url: 'https://knowledge.bsigroup.com/products/lock-assemblies-operated-by-key-from-both-the-inside-and-outside-of-the-door-1',
    supports: 'The current BS 3621 edition, its key-operated single-point lock-assembly scope, and the fact that it specifies thief-resistance performance requirements and test methods.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
  'secured-by-design-introduction': {
    id: 'secured-by-design-introduction',
    title: 'Introduction to Secured by Design',
    publisher: 'Secured by Design',
    url: 'https://crimeprevention.securedbydesign.com/introduction',
    supports: 'Secured by Design as the UK Police Service national crime-prevention initiative and its searchable Police Preferred Specification product list.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
  'dhf-ts007-current': {
    id: 'dhf-ts007-current',
    title: 'TS 007-1:2024+A1:2026 publication record',
    publisher: 'Door & Hardware Federation',
    url: 'https://www.dhfonline.org.uk/pg/publications/105.htm',
    supports: 'The current TS 007-1 publication for replacement cylinders and associated protective door hardware.',
    checkedOn: EVIDENCE_REVIEWED_ON,
  },
  'govuk-listed-building-consent': {
    id: 'govuk-listed-building-consent',
    title: 'Historic environment: heritage consent processes',
    publisher: 'Ministry of Housing, Communities and Local Government',
    url: 'https://www.gov.uk/guidance/conserving-and-enhancing-the-historic-environment#heritage-consent-processes',
    supports: 'Listed building consent is required when proposed alteration or extension affects the building\'s special architectural or historic character.',
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
