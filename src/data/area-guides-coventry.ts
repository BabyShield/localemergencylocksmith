import type { AreaGuideFact, AreaGuideSource, AreaServiceGuidance, GovernedAreaGuide } from './area-guide-types.ts'
import type { AddressRegion, AreaSlug } from './area-authorities.ts'
import { EVIDENCE_REVIEWED_ON, POLICE_SOURCE_IDS, getTechnicalEvidenceSource } from './locksmith-evidence.ts'
import { SERVICE_AREA_SLUGS, type ServiceAreaSlug } from './service-area-types.ts'

const COVENTRY_AREA_SLUGS = [
  'coventry-city-centre',
  'earlsdon',
  'tile-hill',
  'canley',
  'radford',
  'coundon',
  'holbrooks',
  'foleshill',
  'stoke',
  'wyken',
  'walsgrave',
  'binley',
  'binley-woods',
  'willenhall',
  'cheylesmore',
  'whitley',
  'finham',
  'styvechale',
  'allesley',
  'allesley-park',
  'eastern-green',
  'longford',
  'bell-green',
  'courthouse-green',
  'aldermans-green',
  'potters-green',
  'henley-green',
  'wood-end',
  'sowe',
  'little-heath',
] as const satisfies readonly AreaSlug[]

type CoventryAreaSlug = (typeof COVENTRY_AREA_SLUGS)[number]

interface PairContext {
  local: string
  decision: string
  checks: [string, string]
  localFactIndexes: number[]
}

interface AreaGuideSeed {
  slug: CoventryAreaSlug
  name: string
  region: AddressRegion
  summary: [string, string]
  accessGuidance: string
  evidenceLimits: string
  facts: AreaGuideFact[]
  factOnlySourceIds?: string[]
  sources: AreaGuideSource[]
  contexts: Record<ServiceAreaSlug, PairContext>
}

interface TechnicalCopy {
  first: string
  second: string
}

const TECHNICAL_COPY: Record<ServiceAreaSlug, TechnicalCopy[]> = {
  'emergency-lockout': [
    {
      first: 'Before any entry is attempted, the person giving instructions should be identified and their authority to control the address checked. The exact affected entrance matters because an area name does not show whether the call concerns a private home, communal door or managed site.',
      second: 'The door, frame, hinges and lock should be considered together before the scope is agreed. The expected charge and any reason that it may change should be explained before work proceeds, rather than selecting an intervention from the neighbourhood or apparent age of the surroundings.',
    },
    {
      first: 'An urgent access request still needs a clear authority check. Record the full address, the caller\'s relationship to it and which opening is involved; locality evidence cannot establish occupation, ownership or permission to enter, even when a named landmark makes the general location recognisable.',
      second: 'Assessment should stay with the actual door assembly: lock, frame, hinges and visible condition. Agree the proposed scope and cost information in advance, pausing if the facts at the entrance differ from the telephone description. No response or access method follows from the postcode alone.',
    },
    {
      first: 'Treat identification and authority as part of the access decision, not as an afterthought. A complete street address and a precise entrance description are needed because official area sources describe broad geographies and cannot identify the caller, the occupier or a particular controlled doorway.',
      second: 'Once authority is established, inspect the whole entrance rather than assuming that the lock is the only relevant component. Explain the intended work and cost before starting, and explain any changed scope before continuing if the door, frame or hardware presents a different condition on inspection.',
    },
    {
      first: 'The first practical question is who is authorised to request entry at the stated address. Confirm the building and affected entrance separately, especially where public, commercial, institutional and residential premises can share the same locality label. An area profile cannot answer that question.',
      second: 'A decision at the door should follow inspection of the lock in its frame and the surrounding door set. The caller should receive advance cost information and a clear explanation of any variation; neither historic context nor a modern development label is evidence for a particular opening technique.',
    },
    {
      first: 'Do not let urgency replace verification. Establish the full address, the exact door and the requester\'s authority before access work is considered. Statistical areas, heritage character areas and named facilities are useful for orientation, but none confirms who may lawfully instruct work.',
      second: 'Use the condition found at the entrance to determine the scope, looking at the door, frame, hinges and lock as one system. Give the customer the anticipated cost before work and discuss any necessary change before it is made; avoid conclusions based only on locality descriptions.',
    },
    {
      first: 'A locality name is not proof of entitlement to enter. The instruction should include a complete address, a description of the controlled opening and evidence that the caller may authorise access. This remains necessary for homes, workplaces, community buildings and other managed sites.',
      second: 'After those checks, base the next step on the physical entrance that is present. Reviewing the door, frame, hinges and lock avoids treating an uncertain symptom as a diagnosis. Scope and cost should be set out before work, with changes explained if inspection reveals different facts.',
    },
  ],
  'lock-change': [
    {
      first: 'A replacement decision should start with the existing opening, not with assumptions about buildings in the wider area. Check the door, frame, hinges and lock together, then record the reason for change and any written requirement supplied by the owner, manager or insurer.',
      second: 'Where a cylinder is involved, its size should match the door and protective furniture; accredited products can then be considered against the verified need. Confirm authority, proposed specification and price before fitting, and check exact heritage or consent status when external fabric may be affected.',
    },
    {
      first: 'Changing a lock is a property-specific specification exercise. Identify the precise door, examine its frame and hinges, and separate a lock fault from alignment or wider door-set concerns. Neither a development date nor a neighbourhood description proves which hardware is installed.',
      second: 'If the assessed solution uses a cylinder, correct sizing is part of the door-security guidance, alongside choosing an appropriately accredited product. The responsible person should approve the stated scope and cost first; listed, conservation or managed-property controls must be checked at the actual address.',
    },
    {
      first: 'The supplied address and the current door set are the evidence for a lock-change plan. Inspect how the lock works with the frame and hinges, and ask for the customer\'s documented objective rather than inferring a standard from the surrounding streets or local history.',
      second: 'Product selection should follow that inspection. Police guidance points to correctly sized cylinders and accredited security products, while the service-call charter supports authority and advance-cost checks. Any external alteration at a designated or managed building needs separate approval based on its exact status.',
    },
    {
      first: 'Begin by defining which lock is to change, who controls it and what outcome has actually been requested. A complete examination of door, frame, hinges and lock is more reliable than assigning hardware from a broad planning character area or a named development phase.',
      second: 'Only after that review should an appropriate, correctly dimensioned replacement be proposed. Explain the specification and anticipated price to the authorised person before fitting. If the entrance belongs to a listed, conservation, communal or institutional setting, confirm the applicable permissions rather than assuming them.',
    },
    {
      first: 'Area evidence can prompt questions, but it cannot specify a replacement lock. Use photographs or an on-site inspection to record the door, frame, hinges, existing lock and any visible damage, while confirming the requester\'s authority and the purpose of the proposed change.',
      second: 'Consider accredited products and correct cylinder projection only where they fit the verified door set. Set out the planned work and price before proceeding. Heritage designations, tenancy duties or site rules must come from the exact property records and responsible party, not the locality name.',
    },
    {
      first: 'A sound change specification is built from the individual entrance. Establish the controlled door, inspect the full assembly and obtain any written performance requirement from the authorised customer. Broad statements about an area\'s age or land use cannot identify an installed lock.',
      second: 'Police advice supports considering the complete door and using correctly sized, accredited components. Match those principles to the observed opening, explain the proposed cost, and resolve any listed-building, conservation or management approval before altering visible fabric or shared security arrangements.',
    },
  ],
  'upvc-lock-repair': [
    {
      first: 'Do not infer a uPVC or multipoint mechanism from the locality or an area-scale development period. Ask what the handle and key do, whether the symptom changes with the door open, and obtain a clear image of the edge and keeps before treating the call as a mechanism fault.',
      second: 'Police guidance explains that many multipoint doors require the handle to be lifted before the key is turned. Diagnosis should still examine the full door, frame, hinges, alignment and lock. Agree authority, scope and likely cost before repair, because the observed assembly—not the postcode—controls the decision.',
    },
    {
      first: 'The locality name cannot establish that a door is uPVC, composite or fitted with multipoint locking. Capture the exact entrance and symptoms: handle movement, key movement, whether the door is open or shut, and any visible change in alignment or frame contact.',
      second: 'Correct operation may include lifting the handle before turning the key, as police guidance notes, but that check is not a diagnosis. Inspect the door set as a whole and explain the proposed work and cost to the authorised requester before proceeding or changing the agreed scope.',
    },
    {
      first: 'Treat “uPVC lock repair” as a reported symptom until the actual door has been identified. A photograph, full address and account of the handle, key and locking points are more useful than local building history, which cannot prove material, mechanism or condition.',
      second: 'A multipoint system may depend on lifting the handle before locking, but persistent difficulty calls for assessment of lock, door, frame and hinges together. Confirm who may authorise the work and provide advance cost information; do not prescribe a mechanism or component from area context.',
    },
    {
      first: 'Ask the caller to distinguish the affected entrance and describe exactly what happens during operation. The official locality evidence may separate streets, corridors or development phases, but none of it shows that a particular door uses uPVC, a cylinder or a multipoint strip.',
      second: 'Operational guidance includes lifting the handle before turning the key on many multipoint doors. If that does not resolve the symptom, the whole door set should be checked for interaction between hardware, frame and hinges. Scope, authority and price remain address-specific decisions made before repair.',
    },
    {
      first: 'No repair part should be selected from a neighbourhood label. Verify the door material and opening, record what the key and handle are doing, and check whether the behaviour differs when the door is open. Images can help define the question but do not replace inspection.',
      second: 'Police material describes the normal lift-handle-and-turn-key sequence for many multipoint locks and also stresses the complete door assembly. Use those principles to test the observed system, then explain the authorised scope and cost. Avoid turning a planning-era statement into a hardware claim.',
    },
    {
      first: 'A reported multipoint problem needs evidence from the entrance itself. Establish the full address, door position, handle travel, key movement and any contact with the frame; an official profile of the surrounding area cannot identify the fitted mechanism or its failure mode.',
      second: 'Check correct operation, including lifting the handle before turning the key where applicable, and review the lock with the frame, hinges and door. The responsible person should understand the proposed repair and anticipated charge in advance, with any changed diagnosis explained before additional work.',
    },
  ],
  'boarding-up': [
    {
      first: 'A damaged-opening instruction should identify the exact door or window, the responsible person and whether police have been asked to examine the scene. If an incident may be evidential, photograph damage and follow police directions before touching or rearranging possible evidence.',
      second: 'Police guidance describes securing a damaged door or window from outside after evidence considerations have been addressed. The practical plan must still be agreed for the particular opening, ownership and site rules, with the scope and cost explained before work rather than inferred from area context.',
    },
    {
      first: 'Before temporary securing work, establish who controls the premises and which opening is unsafe. Ask whether the damage relates to a reported incident; possible evidence should be photographed and preserved in accordance with police instructions instead of being disturbed for convenience.',
      second: 'Once any evidential constraint is cleared, the guidance is to make the damaged opening secure from the outside. Access, materials, boundary responsibility and approval remain specific to the address. Set out the proposed temporary scope and price, and distinguish it from any later permanent repair.',
    },
    {
      first: 'Record the precise damaged opening and the caller\'s authority before planning a board-up. Where police attendance or an investigation is relevant, preserve the scene, take photographs and obtain direction before moving items that may carry evidence.',
      second: 'Temporary security can then be considered from the outside of the affected door or window, consistent with police advice. Confirm site ownership, safe access and the agreed limits of work at that address. Neither a neighbourhood feature nor a building-era statement determines the securing method.',
    },
    {
      first: 'A board-up request needs a scene-specific sequence: verify the address and authorised contact, identify every damaged opening, and establish whether evidence must remain untouched. Police guidance supports photographing the damage and preserving potential forensic material before security work begins.',
      second: 'After the relevant clearance, secure the opening from outside and agree what the temporary measure is intended to achieve. Explain the scope and anticipated cost in advance, while checking any landlord, council, school, business or heritage approval that applies to the actual premises.',
    },
    {
      first: 'Do not treat the locality description as a survey of damage. Obtain the exact entrance or window, photographs where appropriate, the responsible party\'s authority and the status of any police report. Potential evidence should not be cleaned, moved or covered before police instructions are understood.',
      second: 'The police source advises making a damaged opening secure from outside once evidence needs have been considered. Choose the temporary plan from the observed structure and permissions, state what is included and give cost information before proceeding; permanent reinstatement is a separate decision.',
    },
    {
      first: 'The first task is to separate immediate safety, authority and evidence questions. Confirm the full address, affected opening and authorised decision-maker. If the damage may form part of an investigation, photograph it and preserve possible evidence until police guidance permits securing work.',
      second: 'When that boundary is clear, consider an outside-applied temporary security measure for the specific door or window. Agree access, scope and price with the responsible party, and verify any site-management or conservation constraint. Broad local history cannot determine the construction being secured.',
    },
  ],
  'lock-upgrade': [
    {
      first: 'An upgrade should answer a verified requirement at a particular entrance. Inspect the door, frame, hinges and existing lock together, and ask for any written insurer, landlord or site-management criterion. Do not translate an area\'s history, land use or perceived risk into a specification.',
      second: 'Police guidance supports correctly sized cylinders and accredited security products as part of a complete-door review. Present options against the inspected assembly, confirm the authorised choice and price, and resolve any listed-building, conservation, communal-door or building-management approval before changing visible hardware.',
    },
    {
      first: 'Start an upgrade discussion with the actual door set and the customer\'s documented objective. Area-scale heritage counts or development dates are not evidence of the fitted lock and do not establish what an insurer, freeholder or manager will accept.',
      second: 'Review frame, hinges, lock and door as a system; where a cylinder is relevant, check that its dimensions suit the hardware and consider accredited products. Agree specification and cost in advance, while obtaining address-specific consent for visible or shared-door alterations where required.',
    },
    {
      first: 'Avoid recommending hardware from the neighbourhood name alone. Identify the exact opening, its current components and the reason for improvement, then obtain any external requirement in writing. A source describing a conservation area or housing phase cannot select a lock for an individual address.',
      second: 'The technical evidence points to a whole-door assessment, correctly sized cylinders and accredited products. Apply those checks to what is actually present, explain the proposed scope and price, and verify permissions before changes to listed fabric, managed premises, communal entrances or other controlled assets.',
    },
    {
      first: 'A meaningful upgrade comparison depends on inspection rather than a generic area label. Document the door, frame, hinges and existing lock, clarify the authorised customer\'s goal, and separate a voluntary improvement from any written policy or management requirement.',
      second: 'Consider accredited security products only in a specification that fits the observed assembly; correct cylinder size is one element, not the whole decision. Set out cost and scope before work, and check property-specific heritage, lease, fire or site rules wherever they could affect approval.',
    },
    {
      first: 'Treat local context as a prompt to verify, never as a shortcut to a security claim. The upgrade basis should be the individual entrance, the condition of its door set and a documented requirement supplied by the person entitled to authorise work.',
      second: 'Police advice emphasises door, frame, hinges and lock together, plus properly sized cylinders and accredited products. Match options to that inspection, explain price before fitting and obtain any necessary conservation, listed-building, communal or institutional consent for the exact address and proposed alteration.',
    },
    {
      first: 'Define the requested outcome before selecting an upgrade: which entrance, what existing assembly and whose standard must be met. Neither broad property history nor proximity to a named site proves current hardware, risk or permission to alter it.',
      second: 'Use the complete-door principles in police guidance, checking frame and hinges as well as lock and considering correct cylinder sizing and accredited products where applicable. The authorised decision-maker should approve the stated specification and cost after any heritage or management constraints are confirmed.',
    },
  ],
}

const SERVICE_HEADINGS: Record<ServiceAreaSlug, (areaName: string) => string> = {
  'emergency-lockout': areaName => `What to Check During a Lockout in ${areaName}`,
  'lock-change': areaName => `Choosing a Lock Repair or Replacement in ${areaName}`,
  'upvc-lock-repair': areaName => `Checking a Faulty uPVC Door Lock in ${areaName}`,
  'boarding-up': areaName => `Making a Damaged Door or Window Safe in ${areaName}`,
  'lock-upgrade': areaName => `Choosing a Door-Security Upgrade in ${areaName}`,
}

const SERVICE_CHECKS: Record<ServiceAreaSlug, string> = {
  'emergency-lockout': 'Confirm the full address and exact entrance.',
  'lock-change': 'Inspect the complete door set.',
  'upvc-lock-repair': 'Record handle, key and door-position symptoms.',
  'boarding-up': 'Identify every damaged opening and authorised contact.',
  'lock-upgrade': 'Document the current door, frame, hinges and lock.',
}

const SERVICE_FAQS: Record<ServiceAreaSlug, {
  question: (areaName: string) => string
  answer: (areaName: string) => string
}> = {
  'emergency-lockout': {
    question: areaName => `Can an emergency locksmith help with a lockout in ${areaName}?`,
    answer: areaName => `Call with the full ${areaName} address, the exact door and evidence that you are authorised to enter. Describe what the key, lock and door are doing; the opening method and final scope depend on the condition found at that entrance.`,
  },
  'lock-change': {
    question: areaName => `Can a door lock be repaired or replaced in ${areaName}?`,
    answer: areaName => `A ${areaName} lock can be assessed for repair or replacement after the door, frame, hinges and existing hardware are identified. Explain why the change is needed, provide clear photographs where possible and confirm who can authorise the work.`,
  },
  'upvc-lock-repair': {
    question: areaName => `Can you repair a uPVC door lock in ${areaName}?`,
    answer: areaName => `Describe how the ${areaName} door behaves while open and closed, what the handle and key do, and any visible faceplate markings. A compatible repair depends on the actual door, alignment and fitted mechanism, so the part cannot be selected from the area name alone.`,
  },
  'boarding-up': {
    question: areaName => `Can you board up a damaged door or window in ${areaName}?`,
    answer: areaName => `Identify every damaged opening at the ${areaName} address and the person authorised to approve temporary work. If the damage may be evidence, follow police directions before anything is moved or covered; the safe temporary scope depends on the condition found.`,
  },
  'lock-upgrade': {
    question: areaName => `Which lock upgrade is suitable for my door in ${areaName}?`,
    answer: areaName => `The suitable ${areaName} upgrade depends on the complete door set, cylinder fit and any written insurer, landlord or manager requirement. Provide photographs and the exact requirement where possible; options can then be compared against the inspected entrance.`,
  },
}

const TECHNICAL_WORDING_STYLES: ReadonlyArray<ReadonlyArray<readonly [string, string]>> = [
  [],
  [
    ['exact', 'precise'], ['full', 'complete'], ['actual', 'verified'], ['particular', 'specific'],
    ['entrance', 'doorway'], ['scope', 'service extent'],
    ['cost', 'pricing'], ['explain', 'describe'], ['confirm', 'verify'],
    ['identify', 'establish'], ['inspect', 'examine'],
    ['current', 'existing'],
  ],
  [
    ['exact', 'specified'], ['full', 'entire'], ['actual', 'physical'], ['particular', 'individual'],
    ['entrance', 'opening'], ['scope', 'service plan'],
    ['cost', 'charge'], ['explain', 'set out'], ['confirm', 'establish'], ['identify', 'determine'],
    ['inspect', 'evaluate'], ['current', 'present'],
  ],
  [
    ['exact', 'stated'], ['full', 'complete'], ['actual', 'specified'], ['particular', 'named'],
    ['entrance', 'access point'], ['scope', 'task definition'],
    ['cost', 'pricing'], ['explain', 'clarify'], ['confirm', 'check'], ['identify', 'specify'],
    ['inspect', 'look over'],
  ],
  [
    ['exact', 'defined'], ['full', 'complete'], ['actual', 'identified'], ['particular', 'given'],
    ['entrance', 'controlled opening'], ['scope', 'work plan'], ['cost', 'pricing'],
    ['explain', 'outline'], ['confirm', 'establish'],
    ['identify', 'pinpoint'], ['inspect', 'assess'],
    ['current', 'existing'],
  ],
]

function applyTechnicalStyle(value: string, variant: number): string {
  const style = TECHNICAL_WORDING_STYLES[Math.floor((variant % 30) / 6)]
  const styled = style.reduce((copy, [from, to]) => {
    const pattern = new RegExp(`\\b${from}\\b`, 'gi')
    return copy.replace(pattern, (match) => (
      /^[A-Z]/.test(match)
        ? `${to[0].toUpperCase()}${to.slice(1)}`
        : to
    ))
  }, value)

  return styled
    .replace(/\ba individual\b/g, 'an individual')
    .replace(/\bA individual\b/g, 'An individual')
}

function technicalSources(region: AddressRegion): AreaGuideSource[] {
  const police = POLICE_SOURCE_IDS[region]
  return ['mla-service-calls', police.lockAdvice, police.doorSecurity, police.forensics].map((id) => ({
    ...getTechnicalEvidenceSource(id),
    kind: 'technical' as const,
  }))
}

function buildServiceGuidance(
  seed: AreaGuideSeed,
  service: ServiceAreaSlug,
  context: PairContext,
  variant: number,
): AreaServiceGuidance {
  const protocolVariant = variant % 30
  const firstProtocol = TECHNICAL_COPY[service][protocolVariant % TECHNICAL_COPY[service].length]
  const secondProtocol = TECHNICAL_COPY[service][Math.floor(protocolVariant / 6)]
  const protocol = {
    first: applyTechnicalStyle(firstProtocol.first, variant),
    second: applyTechnicalStyle(secondProtocol.second, variant),
  }
  const faq = SERVICE_FAQS[service]
  return {
    heading: SERVICE_HEADINGS[service](seed.name),
    body: [
      `${context.local} ${protocol.first}`,
      `${context.decision} ${protocol.second}`,
    ],
    checks: [
      SERVICE_CHECKS[service],
      ...context.checks,
    ],
    localFactIndexes: context.localFactIndexes,
    faq: {
      q: faq.question(seed.name),
      a: faq.answer(seed.name),
    },
  }
}

function buildGuide(seed: AreaGuideSeed, variant: number): GovernedAreaGuide {
  const serviceGuidance = Object.fromEntries(
    SERVICE_AREA_SLUGS.map((service, serviceIndex) => [
      service,
      buildServiceGuidance(seed, service, seed.contexts[service], variant + serviceIndex * 7),
    ]),
  ) as Record<ServiceAreaSlug, AreaServiceGuidance>
  const guideFaqs = [
    {
      q: `What should I have ready before calling a locksmith in ${seed.name}?`,
      a: `Have the full ${seed.name} address, the exact door or window and evidence that you can authorise the work. Describe the symptoms and send clear photographs where practical; for a managed building, also identify the responsible site or facilities contact.`,
    },
    {
      q: `Can the right locksmith work be confirmed before my ${seed.name} door is inspected?`,
      a: `Photographs and a clear symptom description can narrow the options, but the method, compatible parts and final scope depend on the actual door, frame, hinges and lock. Any landlord, insurer, conservation or site requirement must also be checked for that address.`,
    },
  ]

  return {
    slug: seed.slug,
    reviewedOn: EVIDENCE_REVIEWED_ON,
    summary: seed.summary,
    accessGuidance: seed.accessGuidance,
    evidenceLimits: seed.evidenceLimits,
    facts: seed.facts,
    factOnlySourceIds: seed.factOnlySourceIds,
    sources: [...seed.sources, ...technicalSources(seed.region)],
    serviceGuidance,
    faqs: guideFaqs,
  }
}

const CANONICAL_LOCALITY_SOURCE_OVERRIDES: Record<string, Pick<AreaGuideSource, 'supports' | 'kind'>> = {
  'coundon-radford-hlc': {
    supports: 'Radford and Coundon settlement and road history, Holbrooks industrial context, development phases, predominant land uses and character-area designation totals.',
    kind: 'property-status',
  },
  'wyken-upper-stoke-hlc': {
    supports: 'Upper Stoke housing and River Sowe context, medieval Wyken settlement and character-area heritage-designation totals.',
    kind: 'property-status',
  },
  'south-sowe-hlc': {
    supports: 'The South Sowe river-valley route through Stoke, Wyken, Binley, Whitley and other named Coventry neighbourhoods.',
    kind: 'locality',
  },
  'coventry-neighbourhood-plans': {
    supports: 'Designation and approval records for the Willenhall, Finham and Allesley neighbourhood-planning areas and their applicant bodies.',
    kind: 'locality',
  },
  'cheylesmore-stivichall-hlc': {
    supports: 'Cheylesmore and Stivichall spelling and geography, housing chronology, former deer-park history and character-area heritage totals.',
    kind: 'property-status',
  },
  'allesley-coundon-hlc': {
    supports: 'Allesley village origins, historic Birmingham Road buildings, village-core conservation status, medieval park evidence, earthworks and wider designation totals.',
    kind: 'property-status',
  },
  'aldermans-green-hlc': {
    supports: 'Aldermans Green setting and road history, possible medieval Bell Green settlement, Courthouse Green Works and character-area designations.',
    kind: 'property-status',
  },
  'north-sowe-hlc': {
    supports: 'The North Sowe river-valley corridor, its named localities, protected green spaces and relationship to the wider River Sowe course.',
    kind: 'locality',
  },
  'woodway-park-hlc': {
    supports: 'Walsgrave and Potters Green settlement history, hospital redevelopment, and housing development at Henley Green and Wood End.',
    kind: 'property-status',
  },
  'bell-green-wehm-jsna': {
    supports: 'Separate Bell Green and Wood End, Henley Green and Manor Farm statistical geographies and their ward context.',
    kind: 'locality',
  },
  'foleshill-longford-jsna': {
    supports: 'The component Longford, Little Heath, Foleshill West and Foleshill East MSOAs and the profile boundary distinction from Bell Green.',
    kind: 'locality',
  },
  'foleshill-hlc': {
    supports: 'Foleshill mixed use, railway and canal context, Coventry Canal Conservation Area, and Little Heath settlement and industrial history.',
    kind: 'property-status',
  },
}

function localitySource(
  id: string,
  title: string,
  publisher: string,
  url: string,
  supports: string,
  kind: AreaGuideSource['kind'] = 'locality',
): AreaGuideSource {
  const override = CANONICAL_LOCALITY_SOURCE_OVERRIDES[id]
  return {
    id,
    title,
    publisher,
    url,
    supports: override?.supports ?? supports,
    checkedOn: EVIDENCE_REVIEWED_ON,
    kind: override?.kind ?? kind,
  }
}

const COVENTRY_LOCAL_LIST_SOURCE = localitySource(
  'coventry-local-list',
  'Local list of buildings of architectural or historic interest',
  'Coventry City Council',
  'https://www.coventry.gov.uk/downloads/file/17245/local-list-of-buildings-of-architectural-or-historic-interest',
  'The official locally listed heritage-asset entries, including the cited DCT635 and DCT673 records.',
  'property-status',
)

const AREA_SEEDS: AreaGuideSeed[] = [
  {
    slug: 'coventry-city-centre',
    name: 'Coventry City Centre',
    region: 'West Midlands',
    summary: [
      'Coventry City Council divides the city centre into distinct historic-landscape areas rather than treating it as one uniform setting. Its evidence separates an eastern civic and university area, the Hill Top religious core and a western commercial core.',
      'Those official descriptions help locate a request, but they do not identify a particular building, entrance, occupier or designation. Address-level authority and property-status checks remain necessary before any locksmith decision.',
    ],
    accessGuidance: 'Obtain the full address, exact entrance and caller authority. If the request concerns civic, university, commercial or religious premises, identify the responsible site contact; if visible alterations are proposed in the historic core, verify the building itself.',
    evidenceLimits: '“City centre” spans several official character areas. The cited records do not prove a particular building\'s use, listed or conservation status, entrance arrangement, installed hardware, access permission or service conditions.',
    facts: [
      {
        text: 'The Central Civic character area covers the eastern city-centre section and predominantly contains council offices and university buildings; its report highlights elevated ring-road sections, junctions, flyovers and pedestrian subways.',
        sourceIds: ['coventry-central-civic'],
        serviceRelevance: 'Use the exact building and entrance rather than a city-centre landmark, and establish the authorised contact for managed premises.',
      },
      {
        text: 'The Hill Top/Central Religious Core is the historic city-centre core around the medieval and modern cathedrals of St Michael and Holy Trinity Church; the character-area report records one conservation area and twelve listed buildings.',
        sourceIds: ['coventry-central-religious'],
        serviceRelevance: 'Check address-level designation and permission before an externally visible alteration in the historic core.',
      },
      {
        text: 'The Central Commercial Core covers the western city-centre section, is predominantly shops and offices, and follows the ring road along its western boundary.',
        sourceIds: ['coventry-central-commercial'],
        serviceRelevance: 'For a commercial instruction, identify the precise unit, controlled entrance and person authorised to approve work.',
      },
    ],
    sources: [
      localitySource('coventry-central-civic', 'Central Civic Character Area, HLC Area 5', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17416/hlc-area-5-central-civic-character-area', 'The eastern civic/university character area, its predominant uses and ring-road infrastructure.'),
      localitySource('coventry-central-religious', 'Central Religious Core Character Area, HLC Area 6', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17417/hlc-area-6-central-religious-core-character-area', 'The Hill Top religious core and character-area conservation/listed-building totals.', 'property-status'),
      localitySource('coventry-central-commercial', 'Central Commercial Core Character Area, HLC Area 16', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17441/hlc-area-16-central-commercial-core-character-area', 'The western commercial core, predominant shops/offices and ring-road boundary.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'The council evidence separates civic and university buildings in the east from the commercial core in the west, so “city centre” is not a sufficient access instruction. Record the named building or unit and the exact controlled doorway.',
        decision: 'Where a cathedral precinct, council building, university facility or shop is involved, the authorised site contact must be established independently; the character-area description supplies orientation, not permission to enter.',
        checks: [
          'Record the named building or unit and exact controlled doorway; do not use “city centre” as the full access instruction.',
          'Establish the authorised site contact for cathedral, council, university or shop premises; character-area descriptions provide orientation, not entry permission.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'A lock-change request near Hill Top needs a property check because the religious-core report records listed buildings and a conservation area at character-area scale. That total does not show whether the supplied address is designated.',
        decision: 'In the western commercial core, identify the particular unit and any landlord or facilities approval; in the eastern civic area, identify the responsible institution. These are separate contexts despite sharing a city-centre label.',
        checks: [
          'Check the exact property\'s designation before visible work near Hill Top; character-area heritage totals do not establish address-level status.',
          'Identify the unit and landlord or facilities approval in the commercial core, or the responsible institution in the civic area.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 2],
        local: 'The elevated ring road, flyovers and pedestrian subways described in the civic report may help distinguish an approach, but they provide no evidence about a door material or locking mechanism. The affected opening must be documented directly.',
        decision: 'A report from the shops-and-offices core should distinguish a shopfront, staff entrance, office suite and any shared building door. The council\'s predominant-use statement cannot identify which of those entrances is affected.',
        checks: [
          'Document the affected opening directly; ring-road, flyover and subway context provides no evidence of door material or locking mechanism.',
          'Distinguish the shopfront, staff entrance, office suite or shared door; predominant commercial use does not identify the affected entrance.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'The central sources describe civic, university, religious and commercial settings, each of which can have a different responsible authority. A damage report should therefore name the building, unit and opening rather than relying on a nearby landmark.',
        decision: 'If the opening sits in the Hill Top historic core, verify the exact building\'s designation and obtain the relevant property approval before an external temporary fixing. The area-wide designation count is only a prompt for that check.',
        checks: [
          'Name the premises, unit and damaged opening, then identify the responsible authority for its civic, university, religious or commercial setting.',
          'Before an external temporary fixing in Hill Top, verify the exact building\'s designation and obtain the relevant property approval.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'The Hill Top report records one conservation area and twelve listed buildings within its character area, making exact status a necessary question for visible upgrade work. It does not justify labelling every central property as protected.',
        decision: 'For offices, shops, civic sites or university buildings identified by the other reports, request the written site specification and authorised approver. A predominant land-use description is not a security standard for an individual entrance.',
        checks: [
          'Verify the individual property\'s status before visible upgrade work; do not treat every central property as protected.',
          'Request the written site specification and authorised approver for offices, shops, civic sites or university buildings.',
        ],
      },
    },
  },
  {
    slug: 'earlsdon',
    name: 'Earlsdon',
    region: 'West Midlands',
    summary: [
      'Coventry City Council\'s combined Earlsdon and Chapelfields character-area report places the area south-west of the city centre, bisected by the Coventry–Birmingham railway, and identifies the streets of the original Earlsdon development.',
      'A later council appraisal supports the designation of an Earlsdon Conservation Area and identifies an Article 4 direction used in its management. Only the current boundary and full address can establish whether those controls are relevant.',
    ],
    accessGuidance: 'Use the complete address to distinguish Earlsdon from adjacent Chapelfields and to identify the exact entrance. Confirm authority for the property and check address-level listed or conservation status before any visible change.',
    evidenceLimits: 'The historic-landscape area and the later conservation-area boundary are different records. Neither establishes an individual building\'s status, age, construction, entrance arrangement, lock type or condition without an address-level check.',
    facts: [
      {
        text: 'The Earlsdon and Chapelfields character area lies south-west of Coventry city centre and is bisected by the Coventry–Birmingham railway line.',
        sourceIds: ['earlsdon-chapelfields-hlc'],
        serviceRelevance: 'A full street address is needed because a broad area description and railway division do not identify the affected property or entrance.',
      },
      {
        text: 'The report identifies Earlsdon Street, Poplar Road, Providence Street, Cromwell Street, Warwick Street, Clarendon Street and Moor Street as the original Earlsdon development associated with the Freehold Land Society movement.',
        sourceIds: ['earlsdon-chapelfields-hlc'],
        serviceRelevance: 'Historic-development context should trigger address-level checks, not assumptions about the fabric or hardware at a building.',
      },
      {
        text: 'Coventry City Council\'s Earlsdon Conservation Area Appraisal supports the area\'s designation and identifies an Article 4 direction that removes specified permitted-development rights within its management.',
        sourceIds: ['earlsdon-conservation-appraisal'],
        serviceRelevance: 'Check the current boundary and any applicable Article 4 control for the exact address before planning an externally visible alteration.',
      },
    ],
    sources: [
      localitySource('earlsdon-chapelfields-hlc', 'Earlsdon and Chapelfields Character Area, HLC Area 17', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17430/hlc-area-17-earlsdon-and-chapelfields-character-area', 'The combined character-area geography, original Earlsdon streets, railway division and the status recorded when the HLC was published.', 'property-status'),
      localitySource('earlsdon-conservation-appraisal', 'Earlsdon Conservation Area Appraisal', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/39167/earlsdon-conservation-area-appraisal', 'The Earlsdon Conservation Area designation, mapped boundary and Article 4 management context.', 'property-status'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: 'The official report combines Earlsdon and Chapelfields and notes that the railway bisects the character area. Give the complete street address and the actual side or entrance involved instead of using either historic-core name as shorthand.',
        decision: 'The named streets of original Earlsdon are historic context only. They do not establish occupation or entry rights, so the requester\'s connection to the particular property must be verified before an urgent access decision.',
        checks: [
          'Record the complete street address and actual entrance, because the combined Earlsdon–Chapelfields area is divided by the railway.',
          'Verify the requester\'s connection to the property; original Earlsdon street history does not establish occupation or entry rights.',
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        local: 'The later council appraisal supports an Earlsdon Conservation Area and Article 4 direction, superseding the older HLC as the current status reference. A proposed visible change should be checked against the current boundary and exact address.',
        decision: 'Even on Earlsdon Street, Poplar Road or another street named in the original development, the report does not identify the current door or lock. Inspect the individual opening and obtain any relevant property approval.',
        checks: [
          'Check the exact address against the current Earlsdon boundary and any applicable Article 4 control before visible work.',
          'Inspect the individual opening and obtain relevant property approval, even on a street named in the original Earlsdon development.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: 'The Freehold Land Society history attached to the original Earlsdon streets does not demonstrate what material or mechanism is present at a modern entrance. Ask for door-specific symptoms and images before classifying the reported fault.',
        decision: 'Because the combined character area crosses the Coventry–Birmingham railway and includes two different historic cores, use the address to locate the call accurately. Neither side of that division supplies a hardware diagnosis.',
        checks: [
          'Ask for door-specific symptoms and images; Freehold Land Society history does not establish the entrance material or mechanism.',
          'Use the address to distinguish the two historic cores across the railway; neither side provides a hardware diagnosis.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 2],
        local: 'A damaged opening in the combined Earlsdon and Chapelfields character area needs precise property identification because the current conservation boundaries do not follow every wider historic-landscape reference.',
        decision: 'If a temporary external fixing could affect protected fabric, confirm the address-level designation and the responsible owner or manager before proceeding. The character-area report cannot supply either permission for the premises or a construction detail.',
        checks: [
          'Identify the precise property and damaged opening and verify which current conservation boundary, if any, contains it.',
          'Before external temporary work on protected fabric, confirm address-level designation and the responsible owner or manager.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 2],
        local: 'The current Earlsdon conservation appraisal and Article 4 direction should shape address-level permission questions, not the product choice. Check the building and boundary before treating a control as relevant.',
        decision: 'For an entrance on one of the original Earlsdon streets, request the actual door-set details and any written requirements. Historic association with the Freehold Land Society movement does not establish current security hardware or an upgrade standard.',
        checks: [
          'Check the building and current boundary before treating conservation or Article 4 controls as relevant.',
          'Request actual door-set details and written requirements; Freehold Land Society history does not establish current hardware or an upgrade standard.',
        ],
      },
    },
  },
  {
    slug: 'tile-hill',
    name: 'Tile Hill',
    region: 'West Midlands',
    summary: [
      'Coventry\'s JSNA defines a west-Coventry Tile Hill study area using Broad Lane, Tile Hill Lane, Torrington Avenue and the railway in its description. Coventry City Council separately identifies Tile Hill Wood as a Site of Special Scientific Interest.',
      'Those are statistical and protected-site facts, not a property survey. They help prevent geographical confusion but cannot establish the use, ownership, entrance, fabric or lock at an individual Tile Hill address.',
    ],
    accessGuidance: 'Ask for the complete address and precise entrance rather than relying on “Tile Hill” or CV4. For a council, woodland or other managed asset, obtain the relevant manager\'s authority before accepting instructions.',
    evidenceLimits: 'The JSNA boundary is a statistical study area, and the SSSI statement concerns Tile Hill Wood only. Neither source proves a property\'s construction, designation, access route, hardware or service availability.',
    facts: [
      {
        text: 'The council JSNA describes Tile Hill as a west-Coventry neighbourhood with Broad Lane along its north and Tile Hill Lane dividing Tile Hill North from Tile Hill South.',
        sourceIds: ['tile-hill-jsna'],
        serviceRelevance: 'Use the street address because Tile Hill North, Tile Hill South and the broader statistical area are not one address-level instruction.',
      },
      {
        text: 'The JSNA places Canley to the south, using Torrington Avenue and the railway line as the division in its profile geography.',
        sourceIds: ['tile-hill-jsna'],
        serviceRelevance: 'Confirm which side and which entrance is involved rather than inferring location from a broad neighbourhood label.',
      },
      {
        text: 'Coventry City Council identifies Tile Hill Wood as a Site of Special Scientific Interest for native flora representing local Arden-type woodland.',
        sourceIds: ['tile-hill-woods'],
        serviceRelevance: 'A request involving the named woodland or another council asset requires the responsible manager and must not be conflated with nearby residential addresses.',
      },
    ],
    sources: [
      localitySource('tile-hill-jsna', 'Tile Hill place-based profile: Demographics and Communities', 'Coventry City Council', 'https://www.coventry.gov.uk/facts-coventry/tile-hill-place-based-profile/3', 'The JSNA study geography, Tile Hill North/South division and boundary references.'),
      localitySource('tile-hill-woods', 'Woodland management', 'Coventry City Council', 'https://www.coventry.gov.uk/woods', 'Tile Hill Wood\'s Site of Special Scientific Interest status and Arden-type woodland reason.', 'property-status'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'The JSNA uses Tile Hill Lane to distinguish north and south and uses Torrington Avenue and the railway in its Canley boundary description. A lockout instruction needs the full street address and the particular entrance, not “Tile Hill” alone.',
        decision: 'Tile Hill Wood is a council-identified SSSI rather than evidence about surrounding homes. If the request involves that site or another managed asset, identify the authorised manager; otherwise keep the woodland designation separate from the property call.',
        checks: [
          'Record the full street address and particular entrance, distinguishing Tile Hill North, Tile Hill South and the broader statistical area.',
          'If Tile Hill Wood or another managed asset is involved, identify the authorised manager and keep its designation separate from nearby properties.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'Broad Lane, Tile Hill Lane, Torrington Avenue and the railway define parts of the JSNA study geography, but they do not specify a door. Use the actual address, photographs and property authority to plan a change.',
        decision: 'The protected status cited by the council applies to Tile Hill Wood. It should not be transferred to another Tile Hill address, although work on a council or protected asset would require its own manager and permissions.',
        checks: [
          'Use the actual address, photographs and property authority; JSNA roads and railway boundaries do not specify a door.',
          'Apply Tile Hill Wood\'s protected status only to that asset, and obtain its manager\'s permissions when relevant.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither the Tile Hill North/South distinction nor the JSNA\'s railway boundary gives evidence that an entrance uses uPVC or multipoint locking. Ask for the door material, handle behaviour, key movement and exact opening.',
        decision: 'A reference to Tile Hill Wood may identify a nearby landmark, yet its Arden woodland and SSSI status say nothing about a building\'s mechanism. Diagnosis must remain tied to the observed door set.',
        checks: [
          'Record the door material, handle behaviour, key movement and exact opening; north–south geography provides no uPVC or multipoint evidence.',
          'Treat Tile Hill Wood only as a possible landmark; diagnose the mechanism from the observed door set.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 2],
        local: 'A board-up near Tile Hill Wood should first distinguish a residential address from the named SSSI or another council-managed asset. The official sources support that distinction but do not establish who can authorise work.',
        decision: 'North/south statistical labels do not identify a damaged opening. Record the precise door or window and responsible party, then check any landowner or manager rules if access crosses or affects protected or managed land.',
        checks: [
          'Distinguish a residential address from Tile Hill Wood or another council-managed asset, then verify the responsible party.',
          'Record the precise damaged opening and check applicable landowner or manager rules where protected or managed land is affected.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'The Tile Hill profile\'s road and railway boundaries are useful for locating a full address, not for assigning a security specification. Any upgrade must be based on the individual door set and a documented requirement.',
        decision: 'Tile Hill Wood\'s SSSI designation applies to the woodland and does not imply planning status for a nearby property. If the proposed alteration concerns a managed asset, obtain that manager\'s approval; otherwise avoid importing the site designation.',
        checks: [
          'Use road and railway boundaries only to locate the address; base the upgrade on the individual door set and documented requirement.',
          'Do not transfer Tile Hill Wood\'s SSSI designation to nearby property; obtain manager approval if the alteration concerns a managed asset.',
        ],
      },
    },
  },
  {
    slug: 'canley',
    name: 'Canley',
    region: 'West Midlands',
    summary: [
      'Coventry\'s JSNA and Historic Landscape Characterisation place Canley between the railway, A45, industrial land, woodland and the University of Warwick, with Charter Avenue running east–west through the neighbourhood description.',
      'The HLC also records archaeological sites within its wider character area. Those references do not establish a particular property\'s use, ownership, designation, access route, door or locking system.',
    ],
    accessGuidance: 'Use the full address to distinguish a private dwelling from university, industrial or other managed premises, identify the exact entrance, and confirm the occupier or manager who may authorise work.',
    evidenceLimits: 'Proximity to the university, A45, railway, woodland, industrial units or archaeological sites does not establish a property\'s use, owner, heritage status, access arrangement, fabric or hardware.',
    facts: [
      {
        text: 'The council JSNA describes Canley with Charter Avenue running east–west, the railway and Tile Hill South to the north, Westwood Heath to the south and the University of Warwick nearby.',
        sourceIds: ['canley-jsna'],
        serviceRelevance: 'The full address is needed to distinguish the statistical neighbourhood from nearby university and adjoining areas.',
      },
      {
        text: 'The Canley HLC uses the railway as its northern boundary, the A45 to the east, industrial units to the west, and woodland and the university to the south.',
        sourceIds: ['canley-hlc'],
        serviceRelevance: 'Confirm the property or site type and the responsible party rather than inferring them from an edge location.',
      },
      {
        text: 'The HLC records More Hall/Canley Moat and buried remains of the deserted medieval village of Fletchamstead within the wider character area.',
        sourceIds: ['canley-hlc'],
        serviceRelevance: 'Archaeological context should prompt an exact property-status check if external fabric is affected; it is not evidence about every address.',
      },
    ],
    sources: [
      localitySource('canley-jsna', 'Canley place-based profile: Demographics and communities', 'Coventry City Council', 'https://www.coventry.gov.uk/facts-coventry/canley-place-based-profile/3', 'The JSNA study area, Charter Avenue and adjoining railway, neighbourhood and university context.'),
      localitySource('canley-hlc', 'Canley Character Area, HLC Area 15a', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17427/hlc-area-15a-canley-character-area', 'Character-area boundaries and the recorded More Hall/Canley Moat and Fletchamstead sites.', 'property-status'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: 'Canley\'s official profiles place university, industrial, woodland and residential contexts around the railway and A45. The call should name the building and entrance so that a private address is not confused with a managed campus or industrial site.',
        decision: 'Charter Avenue can help orient the address, but neither that road nor the wider JSNA area proves who occupies a building. Establish the requester\'s authority and any institutional contact before considering access.',
        checks: [
          'Name the premises and exact entrance, distinguishing a private address from a managed university or industrial site.',
          'Establish requester authority and any institutional contact; Charter Avenue and the wider JSNA area do not prove occupancy.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'The HLC records archaeological sites in the wider Canley character area, including More Hall/Canley Moat and Fletchamstead remains. If a proposed change affects external fabric, check the exact property rather than assuming those constraints apply everywhere.',
        decision: 'At a university or industrial site near the stated boundaries, obtain the responsible manager\'s specification and approval. At a private address, use the observed door; proximity to those land uses cannot select replacement hardware.',
        checks: [
          'If visible work may affect external fabric, check the exact property rather than applying wider archaeological context.',
          'Obtain the responsible manager\'s approval at university or industrial premises; at a private address, inspect the observed door.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: 'The railway, A45, industrial units, woodland and university define edges in the Canley evidence, but none reveals a door material. A reported uPVC fault requires entrance photographs and precise handle-and-key symptoms.',
        decision: 'Whether the address lies north or south of Charter Avenue does not identify the installed mechanism. Keep geographical orientation separate from diagnosis, and verify whether a university, industrial or residential authority controls the opening.',
        checks: [
          'Obtain entrance photographs and precise handle-and-key symptoms; the railway, A45, industrial land and university do not identify door material.',
          'Keep geographic orientation separate from diagnosis, and verify whether university, industrial or residential authority controls the opening.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'A damaged opening near the university or western industrial units must be tied to a named building and authorised site contact. The Canley sources describe adjacent uses but cannot establish ownership or management at the supplied address.',
        decision: 'If the location may overlap recorded archaeological context, a temporary external intervention still requires an exact site-status check. More Hall/Canley Moat and Fletchamstead are wider-area records, not evidence about every Canley property.',
        checks: [
          'Tie the damaged opening to a named building and authorised site contact; adjacent land uses do not establish ownership.',
          'Where recorded archaeological context may be relevant, verify the exact site status before an external temporary intervention.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'Canley\'s mixed edge context makes a written requirement important: a university, industrial manager and private occupier may control different doors. Obtain the relevant instruction instead of inferring a standard from the locality.',
        decision: 'The archaeological entries and boundary descriptions can trigger address verification but cannot specify security hardware. Base an upgrade on the actual entrance, and confirm any property or institutional approval before visible alteration.',
        checks: [
          'Obtain the written requirement from the private occupier, university or industrial manager who controls the exact entrance.',
          'Inspect the actual entrance and confirm property or institutional approval; boundary and archaeological records do not specify hardware.',
        ],
      },
    },
  },
  {
    slug: 'radford',
    name: 'Radford',
    region: 'West Midlands',
    summary: [
      'Coventry\'s Coundon and Radford character-area report describes a predominantly residential area west of the city centre, with a small light-industrial area in the north and an ancient Radford hamlet on both sides of Radford Road.',
      'The report gives designation totals for the entire character area, including listed and locally listed buildings but no conservation area. These totals do not identify the age, status, use or entrance of a particular Radford address.',
    ],
    accessGuidance: 'Ask for the exact street, building and entrance and verify caller authority. Where visible work concerns an older or potentially designated building, check its individual record rather than relying on the historic road or area totals.',
    evidenceLimits: 'The HLC character area and the Radford service locality are not interchangeable. The report\'s predominant use, light-industrial pocket, hamlet history and designation totals do not establish a property\'s use, age, protected status, access or hardware.',
    facts: [
      {
        text: 'The Coundon and Radford character area is west of Coventry city centre, predominantly residential, and includes a small light-industrial area in the north.',
        sourceIds: ['coundon-radford-hlc'],
        serviceRelevance: 'Identify whether the supplied address is residential or managed industrial premises and obtain the appropriate authority.',
      },
      {
        text: 'The report identifies part of the ancient hamlet of Radford on both sides of Radford Road, described as a medieval route that was later turnpiked.',
        sourceIds: ['coundon-radford-hlc'],
        serviceRelevance: 'Historic-road context supports exact property-status questions but not assumptions about a building or its lock.',
      },
      {
        text: 'At character-area scale, the report records nine listed buildings, nineteen locally listed buildings and no conservation area.',
        sourceIds: ['coundon-radford-hlc'],
        serviceRelevance: 'Check the individual building before externally visible work; an area total does not prove designation.',
      },
      {
        text: 'Coventry City Council\'s local list records DCT635, Radford public house (formerly Radford House), as a Locally Listed Building.',
        sourceIds: ['coventry-local-list'],
        serviceRelevance: 'This identifies the named local-list asset only; confirm the exact address, current status and relevant approval before visible work.',
      },
    ],
    factOnlySourceIds: ['coventry-local-list'],
    sources: [
      localitySource('coundon-radford-hlc', 'Coundon and Radford Character Area, HLC Area 40', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17412/hlc-area-40-coundon-and-radford-character-area', 'Predominant area use, northern light-industry, Radford hamlet and road history, and character-area designation totals.', 'property-status'),
      COVENTRY_LOCAL_LIST_SOURCE,
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: 'The HLC distinguishes a predominantly residential character area from a small light-industrial pocket in the north. An urgent Radford instruction should therefore identify the actual property or site and doorway, not rely on the neighbourhood label.',
        decision: 'Radford Road\'s history as a medieval route later turnpiked is useful context but no evidence of present occupation. Verify the requester and the controlled entrance independently before making an access decision.',
        checks: [
          'Identify the actual premises and doorway, distinguishing a residential address from the northern light-industrial part of the character area.',
          'Verify the requester independently; Radford Road\'s historic route does not establish present occupation or authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        local: 'Nine listed and nineteen locally listed buildings are recorded across the broad character area, while no conservation area is recorded there. Those totals require an address-level check and do not establish the status of a Radford property.',
        decision: 'For the northern light-industrial pocket, identify any facilities or landlord approval; for a residence, confirm the responsible occupier. The HLC\'s predominant-use statement cannot specify the existing lock in either setting.',
        checks: [
          'Check the exact address for listed or locally listed status; character-area totals do not establish an individual property\'s designation.',
          'Identify facilities or landlord approval for industrial premises, or the responsible occupier for a residence, before inspecting the current lock.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: 'The ancient-hamlet evidence on both sides of Radford Road does not imply old or new door hardware at a supplied address. Ask for the individual door material, operating symptoms and photographs instead of converting road history into a mechanism assumption.',
        decision: 'Because the wider HLC includes residential and light-industrial land, also establish whether the opening is private or managed. That distinction affects authority, while diagnosis still depends entirely on the actual door set.',
        checks: [
          'Record the individual door material, operating symptoms and photographs; Radford Road\'s hamlet history does not identify installed hardware.',
          'Establish whether the opening is private or managed, while keeping diagnosis tied to the actual door set.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 2],
        local: 'A damage report from Radford should distinguish a private address from a site in the northern light-industrial area and identify the responsible person. The character-area description cannot supply site ownership or entry arrangements.',
        decision: 'If external temporary work may affect one of the listed or locally listed buildings recorded area-wide, confirm the exact designation first. The absence of an area conservation designation does not remove building-specific controls.',
        checks: [
          'Distinguish a private address from northern light-industrial premises and identify the responsible person for the damaged opening.',
          'Confirm exact designation before external temporary work; the absence of an area conservation designation does not remove building-specific controls.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 2],
        local: 'Historic Radford Road and the ancient-hamlet record can justify checking property status, but they do not establish current risk or hardware. An upgrade specification must come from the observed entrance and a documented customer requirement.',
        decision: 'The character-area designation figures identify a mixed heritage context rather than any particular building. Confirm the address record and responsible approver before visible changes, especially where locally listed or listed status may apply.',
        checks: [
          'Base the specification on the observed entrance and a documented customer requirement, not Radford Road history or assumed hardware.',
          'Confirm the address record and responsible approver before visible changes where listed or locally listed status may apply.',
        ],
      },
    },
  },
  {
    slug: 'coundon',
    name: 'Coundon',
    region: 'West Midlands',
    summary: [
      'Coventry\'s Coundon and Radford HLC records medieval assarts and settlement around commons near present-day Coundon Green and Norman Place Road, agricultural fields along much of the western edge, and several later development phases.',
      'Its chronology describes the broad character area, not the fabric or hardware of one building. A full Coundon address and direct inspection are required before drawing any property or service conclusion.',
    ],
    accessGuidance: 'Capture the exact street, entrance and caller authority, with a clear description or photograph of the opening. Do not use the wider area\'s development period or western agricultural edge to predict access, property status or hardware.',
    evidenceLimits: 'The HLC boundary is broader than Coundon and contains different development periods. Its historic landscape and edge descriptions do not prove any address\'s age, construction, designation, entrance, lock or service conditions.',
    facts: [
      {
        text: 'The HLC places present-day Coundon Green and Norman Place Road in a landscape where medieval assarts and settlement around commons were recorded.',
        sourceIds: ['coundon-radford-hlc'],
        serviceRelevance: 'Use historical context only to prompt an exact property check, never to infer an entrance or installed lock.',
      },
      {
        text: 'The report states that most of the wider character area\'s western side borders agricultural fields.',
        sourceIds: ['coundon-radford-hlc'],
        serviceRelevance: 'A western-edge description may help locate an address but does not show its property type or access arrangement.',
      },
      {
        text: 'The HLC describes extensive inter-war development across much of the area and later pockets around Everdon Road, Forland Way and Madeira Croft.',
        sourceIds: ['coundon-radford-hlc'],
        serviceRelevance: 'Mixed development periods mean hardware and door construction must be identified at the individual opening.',
      },
      {
        text: 'Coventry City Council\'s local list records DCT673, Coundon Court School \'Old House\' and Coundon Court Lodge (also known as Holly Lodge), as a Locally Listed Building.',
        sourceIds: ['coventry-local-list'],
        serviceRelevance: 'This identifies the named local-list asset only; confirm the exact address, current status and relevant approval before visible work.',
      },
    ],
    factOnlySourceIds: ['coventry-local-list'],
    sources: [
      localitySource('coundon-radford-hlc', 'Coundon and Radford Character Area, HLC Area 40', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17412/hlc-area-40-coundon-and-radford-character-area', 'Coundon Green and Norman Place Road history, the agricultural western edge, and broad development phases.'),
      COVENTRY_LOCAL_LIST_SOURCE,
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'Coundon\'s HLC extends from historic Coundon Green context towards agricultural land on much of its western edge. That broad description cannot locate a controlled opening, so an urgent request needs the exact street, number and entrance.',
        decision: 'Later development pockets are specifically identified around Everdon Road, Forland Way and Madeira Croft, but a development phase is not evidence of occupancy. Confirm the caller\'s authority at the named address before access.',
        checks: [
          'Record the exact street, number and entrance; Coundon\'s historic core and western agricultural edge cannot locate a controlled opening.',
          'Verify caller authority at the named address; later development pockets do not establish occupancy.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        local: 'The report records extensive inter-war development as well as later pockets, showing why one Coundon-era assumption is unsafe. The existing lock and door must be identified at the particular opening before replacement is planned.',
        decision: 'Medieval landscape evidence around Coundon Green and Norman Place Road does not establish designation or building fabric today. If visible work may affect an older asset, check the exact property record and permissions.',
        checks: [
          'Identify the existing lock and door at the particular opening; inter-war and later development phases do not specify hardware.',
          'Where visible work may affect an older asset, check the exact property record and applicable permissions.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither the inter-war character of much of the wider area nor later development near named roads proves that a supplied entrance is uPVC or uses multipoint locking. Record its material and operating symptoms directly.',
        decision: 'An address near the western agricultural edge still requires the same door-specific evidence as one nearer Coundon Green. Landscape position cannot diagnose handle, key, alignment or mechanism behaviour.',
        checks: [
          'Record the entrance material and operating symptoms directly; neither inter-war character nor later development proves uPVC or multipoint locking.',
          'Use door-specific evidence near both the western edge and Coundon Green; landscape position cannot diagnose mechanism behaviour.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: 'For damage near Coundon\'s western edge, use the full address and identify whether the opening belongs to a private property or another managed asset. The HLC\'s agricultural boundary statement does not establish land or building ownership.',
        decision: 'Near the historic Coundon Green context, confirm any address-level designation before an external temporary fixing. Medieval assart and common history describes the area and is not itself proof of protected fabric.',
        checks: [
          'Use the full address and distinguish private property from another managed asset; the agricultural-edge description does not establish ownership.',
          'Before external temporary work near Coundon Green, check exact designation rather than treating medieval landscape history as protected-fabric evidence.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 2],
        local: 'Coundon\'s recorded inter-war development and later pockets demonstrate variation, not a universal door type. Inspect the individual frame, hinges and lock and obtain the customer\'s written objective before comparing upgrade options.',
        decision: 'If the address is around Coundon Green or Norman Place Road, the medieval-landscape reference is a reason to verify status, not to assume it. Any required consent must come from the exact property evidence.',
        checks: [
          'Inspect the individual frame, hinges and lock, then obtain the customer\'s written objective before comparing options.',
          'Verify the exact property\'s status and required consent around Coundon Green or Norman Place Road; do not assume either.',
        ],
      },
    },
  },
  {
    slug: 'holbrooks',
    name: 'Holbrooks',
    region: 'West Midlands',
    summary: [
      'Coventry City Council locates Holbrook Park on Holbrook Lane and describes open land among nearby shops and factories. Its wider HLC also records First World War industrial hostels north of Holbrooks Park and later area development.',
      'A park record and broad industrial history do not identify the use, owner, construction or entrance of another Holbrooks address. Private-address and managed-site instructions must be separated through direct verification.',
    ],
    accessGuidance: 'Distinguish the named park, a shop, factory and residential address when recording the call. Obtain the full address, exact gate or entrance and the authorised owner, occupier or site manager.',
    evidenceLimits: 'The council park page concerns one named asset, while the HLC covers a larger historic landscape. Neither source establishes an individual property\'s use, ownership, age, fabric, access or installed hardware.',
    facts: [
      {
        text: 'Coventry City Council locates Holbrook Park on Holbrook Lane, CV6 4BY, and describes it as open land amid shops and factories on Holbrook Lane.',
        sourceIds: ['holbrook-park'],
        serviceRelevance: 'A request using the park as a landmark must still identify whether it concerns the council site, a business or a separate address.',
      },
      {
        text: 'The Coundon and Radford HLC records First World War industrial hostels called Monks Park Cottages north of Holbrooks Park, built for workers at a munitions factory outside the character area.',
        sourceIds: ['coundon-radford-hlc'],
        serviceRelevance: 'Historic industrial context cannot identify the present use, fabric or door at a supplied address.',
      },
      {
        text: 'The same HLC states that the wider character area was completely built up by the Second World War while retaining distinct earlier schemes and later pockets.',
        sourceIds: ['coundon-radford-hlc'],
        serviceRelevance: 'Development chronology is not a substitute for inspecting the entrance and confirming current control of the premises.',
      },
    ],
    sources: [
      localitySource('holbrook-park', 'Holbrook Park', 'Coventry City Council', 'https://www.coventry.gov.uk/holbrookspark', 'The council park\'s name, address and setting among shops and factories.'),
      localitySource('coundon-radford-hlc', 'Coundon and Radford Character Area, HLC Area 40', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17412/hlc-area-40-coundon-and-radford-character-area', 'Monks Park Cottages and broad development chronology around Holbrooks.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: 'Holbrook Park, nearby shops and factories are all present in the council\'s Holbrook Lane description. A caller should name the actual property and entrance so that a park gate, business door and home are not confused.',
        decision: 'The historic Monks Park Cottages record adds industrial context but no modern authority information. For any workplace or managed site, identify the facilities contact; for a private address, verify the occupier independently.',
        checks: [
          'Name the actual property and entrance, distinguishing a park gate, business door and home around Holbrook Lane.',
          'Identify the facilities contact for a managed site or verify the private occupier; industrial history supplies no modern authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        local: 'A location “near Holbrook Park” does not specify whether the change concerns a council asset, shop, factory or residence. Record the exact controlled opening and the party entitled to approve a replacement.',
        decision: 'The HLC says the wider area retained different early schemes and later pockets, so one building-era assumption is unsupported. Inspect the current door and avoid deriving its hardware from the area chronology.',
        checks: [
          'Record the exact controlled opening and approving party; “near Holbrook Park” does not distinguish council, commercial and residential premises.',
          'Inspect the current door rather than deriving its hardware from the wider area\'s different development periods.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: 'The council\'s reference to shops and factories around Holbrook Park gives land-use context only. It cannot demonstrate that an affected business or home has a uPVC door, so obtain images and operating symptoms from the entrance.',
        decision: 'First World War hostel history north of the park is likewise not a mechanism clue. Identify the actual frame, handle, key action and locking points before deciding whether the report is a multipoint-lock issue.',
        checks: [
          'Obtain entrance images and operating symptoms; shops and factories around Holbrook Park do not establish a uPVC door.',
          'Identify the actual frame, handle, key action and locking points; First World War hostel history provides no mechanism evidence.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 2],
        local: 'A damaged opening on Holbrook Lane needs a precise building or site description because the official page places parkland among shops and factories. Confirm the council, business or private responsible party before arranging temporary securing.',
        decision: 'The broad HLC development record does not reveal wall, door or window construction at the scene. Use direct photographs and inspection, and obtain any site-manager permission rather than relying on the wider-area development chronology.',
        checks: [
          'Identify the precise Holbrook Lane premises and confirm whether the council, business or private party controls the damaged opening.',
          'Use direct photographs and inspection, then obtain site-manager permission; broad development history does not reveal the opening\'s construction.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 2],
        local: 'Holbrooks includes a named council park setting alongside commercial and industrial references in the official evidence. Each managed context can have its own written approval route, which must be obtained for the exact entrance.',
        decision: 'Area-wide development before and after the Second World War does not establish a current lock standard. Compare upgrades only after documenting the individual door set and the authorised owner\'s or manager\'s requirement.',
        checks: [
          'Identify who can approve changes to the exact council, commercial, industrial or private entrance, and obtain any written requirement.',
          'Document the individual door set and authorised requirement before comparing upgrades; area-wide development chronology establishes no current lock standard.',
        ],
      },
    },
  },
  {
    slug: 'foleshill',
    name: 'Foleshill',
    region: 'West Midlands',
    summary: [
      'Coventry\'s Foleshill HLC describes a mixed residential and industrial character area north of the city centre, following the Coventry–Bedworth railway and shaped by the Coventry Canal.',
      'The report places much of the Coventry Canal Conservation Area within the wider character area. Canal proximity, mixed use and character-area designation do not establish the use, status or entrance of an individual address.',
    ],
    accessGuidance: 'Record the full address, property or site type, exact entrance and authorised decision-maker. For an address near the canal conservation corridor or a historic industrial building, verify its own designation before external alteration.',
    evidenceLimits: 'The HLC is a broad mixed-use area and says only that much of a conservation area lies within it. It does not prove that a property is industrial, residential, beside the canal, designated, accessible or fitted with any lock type.',
    facts: [
      {
        text: 'The Foleshill character area is a mixed residential and industrial area north of Coventry city centre, following the Coventry–Bedworth railway line.',
        sourceIds: ['foleshill-hlc'],
        serviceRelevance: 'Distinguish homes from industrial or other managed premises and verify the responsible party for the actual entrance.',
      },
      {
        text: 'The HLC identifies the Coventry Canal as the predominant landscape feature and a reason for the area\'s industrial development.',
        sourceIds: ['foleshill-hlc'],
        serviceRelevance: 'Canal and industrial history may orient an address but cannot determine building status or access.',
      },
      {
        text: 'The report records one conservation area and states that much of the Coventry Canal Conservation Area lies within the wider Foleshill character area.',
        sourceIds: ['foleshill-hlc'],
        serviceRelevance: 'Check whether the individual property lies within a designated boundary before visible changes.',
      },
    ],
    sources: [
      localitySource('foleshill-hlc', 'Foleshill Character Area, HLC Area 24', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17449/hlc-area-24-foleshill-character-area', 'Mixed residential/industrial use, railway and canal context, and the Coventry Canal Conservation Area within the HLC.', 'property-status'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: 'Foleshill\'s official character area combines residential and industrial land along the railway, so the locality name does not tell whether a home, workshop or managed site is involved. State the building and controlled entrance.',
        decision: 'The Coventry Canal is the report\'s predominant landscape feature, but proximity to it supplies neither permission nor a route into a property. Confirm the authorised occupier or manager for the exact address.',
        checks: [
          'State the building and controlled entrance, distinguishing a home, workshop or other managed premises within Foleshill\'s mixed-use area.',
          'Confirm the authorised occupier or manager at the exact address; canal proximity supplies neither permission nor property access.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'Much of the Coventry Canal Conservation Area lies within the broader Foleshill HLC. A visible lock or door change near that corridor needs an address-level designation check instead of assuming every Foleshill building shares that status.',
        decision: 'For industrial premises identified within the mixed-use area, obtain site or landlord approval; for a residence, confirm the controlling customer. The railway and canal history cannot specify existing hardware.',
        checks: [
          'Check address-level designation before a visible change near the Coventry Canal conservation corridor; do not apply its status across Foleshill.',
          'Obtain site or landlord approval for industrial premises, or confirm the controlling resident; railway and canal history do not specify hardware.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: 'A mixed residential and industrial HLC does not reveal whether a Foleshill entrance is uPVC, steel, timber or another construction. Ask for photographs and exact handle, key and closing symptoms from the affected doorway.',
        decision: 'The railway-following geography and canal history are useful for locality context only. They should not be converted into a diagnosis, a lock-type claim or an assumption about how a managed industrial entrance operates.',
        checks: [
          'Request photographs and exact handle, key and closing symptoms; mixed land use does not reveal an entrance\'s material.',
          'Keep railway and canal context separate from diagnosis; do not infer lock type or managed-door operation from locality history.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'Damage near the canal or railway should be tied to the precise property and opening because the character area includes different residential and industrial contexts. Identify the responsible occupier, landlord or site manager.',
        decision: 'Where temporary external work could affect a building in the Coventry Canal Conservation Area, confirm the exact boundary and permissions first. The report\'s area-scale conservation statement cannot decide status for the scene.',
        checks: [
          'Identify the precise property, damaged opening and responsible occupier, landlord or site manager near the canal or railway.',
          'Before external temporary work, verify the exact conservation boundary and applicable permissions rather than relying on the area-scale designation.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'Foleshill\'s combined residential and industrial context means an upgrade request should include the property or site type and any written owner or site standard. The locality alone cannot establish a suitable security specification.',
        decision: 'If the entrance is near the canal conservation corridor or within a historic industrial building, check property status and approval for visible changes. Canal-driven development history is not evidence of the door set now present.',
        checks: [
          'Record the property or site type and any written owner or site standard; Foleshill alone does not establish a security specification.',
          'Check property status and approval near the canal corridor or a historic industrial building, then inspect the current door set.',
        ],
      },
    },
  },
  {
    slug: 'stoke',
    name: 'Stoke',
    region: 'West Midlands',
    summary: [
      'Coventry\'s HLC does not use one undifferentiated Stoke profile: it separates Lower Stoke, Wyken and Upper Stoke, and the South Sowe river corridor. Their descriptions include light-industrial, housing, railway and river-valley contexts.',
      'Because “Stoke” covers more than those official evidence units, the full address, property or site type and caller authority are essential. No single report establishes the facts of a particular Stoke property.',
    ],
    accessGuidance: 'Capture the complete address, exact entrance, property or site type and caller authority. Use it to distinguish Lower Stoke, Upper Stoke and river-corridor contexts rather than applying one official profile to the whole locality.',
    evidenceLimits: '“Stoke” is less precise than the council\'s separate Lower Stoke, Upper Stoke/Wyken and South Sowe profiles. None proves an individual address\'s use, age, designation, construction, access or hardware.',
    facts: [
      {
        text: 'The Lower Stoke HLC describes a light-industrial character area traversed by the Coventry–Rugby railway, with housing development in its northern part.',
        sourceIds: ['lower-stoke-hlc'],
        serviceRelevance: 'Identify whether a request concerns industrial, managed or residential premises and confirm the correct authority.',
      },
      {
        text: 'The separate Wyken and Upper Stoke HLC describes an east-Coventry area with mid-20th-century housing and the River Sowe as its eastern boundary.',
        sourceIds: ['wyken-upper-stoke-hlc'],
        serviceRelevance: 'Do not transfer Upper Stoke development context or a river boundary to every address carrying a Stoke label.',
      },
      {
        text: 'The South Sowe HLC says its river-valley corridor passes through Stoke and several other named neighbourhoods.',
        sourceIds: ['south-sowe-hlc'],
        serviceRelevance: 'A river-corridor reference requires a full street address and cannot define a property or service-route boundary.',
      },
    ],
    sources: [
      localitySource('lower-stoke-hlc', 'Lower Stoke Character Area, HLC Area 3', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17415/hlc-area-3-lower-stoke-character-area', 'Lower Stoke\'s light-industrial, railway and northern housing context.'),
      localitySource('wyken-upper-stoke-hlc', 'Wyken and Upper Stoke Character Area, HLC Area 44', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17421/hlc-area-44-wyken-and-upper-stoke-character-area', 'Upper Stoke housing context and eastern River Sowe boundary.'),
      localitySource('south-sowe-hlc', 'South Sowe Character Area, HLC Area 28', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17439/hlc-area-28-south-sowe-character-area', 'The South Sowe river-valley corridor through Stoke.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'An instruction saying only “Stoke” could fall within official evidence for Lower Stoke, Upper Stoke or the South Sowe corridor. Give the complete address and entrance so industrial and residential contexts are not conflated.',
        decision: 'The railway through Lower Stoke and River Sowe edge of Upper Stoke help explain the different profiles but do not establish who controls a building. Verify the authorised person at the supplied property.',
        checks: [
          'Record the complete address and entrance, distinguishing Lower Stoke, Upper Stoke and South Sowe contexts before identifying the premises.',
          'Verify the authorised person at the supplied property; railway and River Sowe boundaries do not establish control.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'Lower Stoke is described as light-industrial with housing in its north, while Upper Stoke is treated with Wyken and mid-20th-century housing. Neither area-level description identifies the existing lock at a particular door.',
        decision: 'Use the address to select the applicable property and approval route. A river-corridor reference may prompt a land or site check, but it supplies no replacement specification for the entrance.',
        checks: [
          'Inspect the particular door and existing lock; Lower Stoke and Upper Stoke descriptions do not identify address-level hardware.',
          'Use the address to establish the property and approval route; a river-corridor reference provides no replacement specification.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: 'The different HLCs demonstrate why “Stoke housing” cannot be used as evidence for uPVC or multipoint hardware. Ask for the door material, locking points, key response and frame interaction at the exact opening.',
        decision: 'A call from the Lower Stoke industrial area may involve managed premises, whereas an Upper Stoke address may not. Control of the premises must be confirmed separately from the mechanical diagnosis in both cases.',
        checks: [
          'Record door material, locking points, key response and frame interaction; “Stoke housing” does not establish uPVC or multipoint hardware.',
          'Confirm whether the premises are private or managed separately from the mechanical diagnosis.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'A damaged Stoke opening needs an address-level description because the council evidence separates industrial Lower Stoke, housing in Upper Stoke and the river-valley corridor. Those contexts can involve different responsible parties.',
        decision: 'If the site is close to the Sowe corridor, confirm land boundaries and the actual building before temporary work. The river character area cannot establish ownership, construction or consent for a door or window.',
        checks: [
          'Identify the exact address, damaged opening and responsible party across industrial Lower Stoke, residential Upper Stoke or the river corridor.',
          'Near the Sowe corridor, confirm land boundaries and the actual building; river context establishes neither ownership nor construction.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'No single HLC supports a uniform Stoke upgrade recommendation. Determine whether the address is a home, industrial unit or another managed site, then obtain the authorised party\'s written requirement.',
        decision: 'Mid-20th-century housing context in Upper Stoke and railway-linked industry in Lower Stoke are broad history, not hardware evidence. Inspect the complete entrance and treat the River Sowe reference only as a location check.',
        checks: [
          'Determine whether the entrance serves a home, industrial unit or other managed premises, then obtain the authorised party\'s written requirement.',
          'Inspect the complete entrance and use River Sowe only as a location check; area history does not establish hardware.',
        ],
      },
    },
  },
  {
    slug: 'wyken',
    name: 'Wyken',
    region: 'West Midlands',
    summary: [
      'The Wyken and Upper Stoke HLC places the River Sowe at the eastern boundary and records medieval Wyken settlement around St Mary Magdalene at Wyken Croft, alongside several area-scale heritage designations.',
      'Those designations and historic-settlement facts apply across a broad character area. They do not make every Wyken property scheduled, listed, old or subject to the same entrance and hardware conditions.',
    ],
    accessGuidance: 'Use the exact property and entrance, confirm owner or occupier authority, and check the individual designation record before visible work. Do not infer protected status from the Wyken name or character-area totals.',
    evidenceLimits: 'The River Sowe boundary, medieval-settlement history and counts of scheduled, archaeological and listed assets are character-area facts. They do not establish any individual building\'s status, construction, access or lock.',
    facts: [
      {
        text: 'The Wyken and Upper Stoke HLC is east of Coventry city centre and is bounded by the River Sowe on its eastern side.',
        sourceIds: ['wyken-upper-stoke-hlc'],
        serviceRelevance: 'The river boundary can orient an address but cannot establish the property, entrance or responsible party.',
      },
      {
        text: 'The report records medieval Wyken settlement clustered around the 12th-century church of St Mary Magdalene at Wyken Croft.',
        sourceIds: ['wyken-upper-stoke-hlc'],
        serviceRelevance: 'Historic-core context should lead to address-level status checks before external alteration.',
      },
      {
        text: 'The wider character area records two scheduled monuments, eleven archaeological constraint areas and eight listed buildings; the South Sowe HLC also names Wyken on the river-valley route.',
        sourceIds: ['wyken-upper-stoke-hlc', 'south-sowe-hlc'],
        serviceRelevance: 'Area totals cannot identify a protected building; verify the exact asset and proposed work.',
      },
    ],
    sources: [
      localitySource('wyken-upper-stoke-hlc', 'Wyken and Upper Stoke Character Area, HLC Area 44', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17421/hlc-area-44-wyken-and-upper-stoke-character-area', 'River Sowe boundary, medieval Wyken settlement and character-area designation totals.', 'property-status'),
      localitySource('south-sowe-hlc', 'South Sowe Character Area, HLC Area 28', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17439/hlc-area-28-south-sowe-character-area', 'Wyken\'s place on the wider South Sowe river-valley corridor.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'The official Wyken evidence spans a river-edge character area and a historic settlement around St Mary Magdalene at Wyken Croft. Neither identifies the requested building, so record the full address and precise doorway.',
        decision: 'Scheduled, archaeological and listed assets are counted across the wider HLC, but those totals do not prove a caller\'s property status or entitlement. Confirm both the individual address and the authorised requester.',
        checks: [
          'Record the full address and precise doorway across Wyken\'s river-edge character area and historic settlement.',
          'Confirm both the individual property and authorised requester; area-wide scheduled, archaeological and listed totals establish neither status nor entitlement.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'Before any visible or external change near the historic Wyken settlement, check the exact designation because the wider character area includes listed and scheduled assets. Do not turn those area-wide records into a blanket heritage assumption for Wyken.',
        decision: 'An address near the River Sowe boundary still needs direct inspection of its door and current hardware. River-corridor context cannot select a replacement or show that an external alteration is permitted.',
        checks: [
          'Check the exact designation before visible work near historic Wyken; do not apply area-wide heritage records to every address.',
          'Inspect the door and current hardware directly; River Sowe context cannot select a replacement or establish permission.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither the 12th-century church context nor the character-area designation totals provide evidence that a particular Wyken door is timber, uPVC or multipoint. Record the actual door and its key-and-handle behaviour.',
        decision: 'The River Sowe boundary and route can help disambiguate location, but they do not explain a mechanism fault. Keep the geographic check separate from inspection of the frame, hinges, alignment and lock.',
        checks: [
          'Record the actual door, handle and key behaviour; church history and designation totals do not identify material or mechanism.',
          'Keep River Sowe location checks separate from inspection of the frame, hinges, alignment and lock.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'If a damaged opening is described as near Wyken Croft or the historic church, identify the exact building and check whether its designation is one of those recorded area-wide. Do not transfer status by proximity.',
        decision: 'For a site on the River Sowe edge, confirm the property boundary and authorised responsible party before temporary securing. The South Sowe corridor source does not establish ownership or access for the affected opening.',
        checks: [
          'Identify the exact building near Wyken Croft and verify its designation; do not transfer protected status by proximity.',
          'At the River Sowe edge, confirm the property boundary and authorised responsible party before temporary securing.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'Because Wyken\'s area-wide totals include eight listed buildings, verify whether the individual address has protected status before visible changes. The two scheduled monuments and eleven archaeological constraint areas are also area context, not an upgrade specification.',
        decision: 'At other addresses, the historic settlement and river boundary remain context only. Use the actual door set and the owner\'s documented requirement to compare hardware, without inferring risk or construction from the locality.',
        checks: [
          'Verify the individual address\'s protected status before visible changes; area-wide heritage totals do not provide an upgrade specification.',
          'Use the actual door set and owner\'s documented requirement; historic settlement and river context do not establish construction or risk.',
        ],
      },
    },
  },
  {
    slug: 'walsgrave',
    name: 'Walsgrave',
    region: 'West Midlands',
    summary: [
      'Coventry\'s Woodway Park HLC records medieval Walsgrave, then called Sowe, around the church, surviving historic buildings on Hall Lane and Hinckley Road, and major redevelopment of the hospital site around 2005.',
      'A separate North Sowe report places Walsgrave on the river-valley corridor. Village, hospital and river contexts are distinct and cannot establish the property or site type, status or entrance at a supplied address.',
    ],
    accessGuidance: 'Distinguish a private address from the hospital or another managed site and identify the authorised contact and entrance. Around the historic village core, verify the exact building\'s status before external changes.',
    evidenceLimits: 'The historic village, hospital site and North Sowe corridor are separate evidence contexts. None proves an individual Walsgrave property\'s use, ownership, designation, construction, access or lock type.',
    facts: [
      {
        text: 'The Woodway Park HLC says medieval settlement was concentrated around Walsgrave village, then known as Sowe, clustered around the church.',
        sourceIds: ['woodway-park-hlc'],
        serviceRelevance: 'Historic-village context should prompt an exact designation check, not an assumption about a building or lock.',
      },
      {
        text: 'The report records surviving historic buildings on Hall Lane and Hinckley Road and states that the hospital site was extensively redeveloped around 2005.',
        sourceIds: ['woodway-park-hlc'],
        serviceRelevance: 'Use the full address to distinguish a historic-road property from the hospital or other managed premises.',
      },
      {
        text: 'The North Sowe river-valley character area explicitly passes through Walsgrave.',
        sourceIds: ['north-sowe-hlc'],
        serviceRelevance: 'River-corridor evidence helps with location only and cannot define a property or access arrangement.',
      },
    ],
    sources: [
      localitySource('woodway-park-hlc', 'Woodway Park Character Area, HLC Area 42', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17413/hlc-area-42-woodway-park-character-area', 'Medieval Walsgrave/Sowe, historic Hall Lane and Hinckley Road buildings, and hospital-site redevelopment.', 'property-status'),
      localitySource('north-sowe-hlc', 'North Sowe Character Area, HLC Area 26', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17438/hlc-area-26-north-sowe-character-area', 'Walsgrave\'s position on the North Sowe river-valley corridor.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'Walsgrave evidence includes a historic village, surviving buildings on Hall Lane and Hinckley Road, and a redeveloped hospital site. A lockout must name the actual building or site and entrance rather than use one of those landmarks.',
        decision: 'Hospital or other managed-site instructions need an authorised site contact, while a private address needs occupier verification. The North Sowe corridor does not establish control of either kind of opening.',
        checks: [
          'Name the actual premises and entrance, distinguishing the historic village, Hall Lane or Hinckley Road properties and the hospital site.',
          'At the hospital, obtain the authorised facilities contact; elsewhere, verify the requester against the exact premises because the North Sowe corridor does not establish control.',
        ],
      },
      'lock-change': {
        localFactIndexes: [1],
        local: 'Historic buildings survive on Hall Lane and Hinckley Road, but the HLC does not say every property there is designated. Check the exact building and external scope before treating heritage permissions as relevant.',
        decision: 'At the hospital site redeveloped around 2005, obtain the responsible facilities specification; elsewhere, inspect the individual entrance. The redevelopment date cannot identify a lock or approve a replacement.',
        checks: [
          'Check the exact building and external scope on Hall Lane or Hinckley Road before treating heritage permissions as relevant.',
          'At the hospital, obtain the facilities specification; elsewhere, inspect the individual entrance because the redevelopment date does not identify a lock.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither medieval Walsgrave history nor the hospital\'s circa-2005 redevelopment shows what mechanism is installed at a reported door. Record whether the property is managed and capture the actual handle, key and frame symptoms.',
        decision: 'A River Sowe reference may help locate the address, but it is not evidence for uPVC, composite construction or multipoint locking. Diagnosis remains specific to the identified entrance and its operating condition.',
        checks: [
          'Record whether the premises are managed and capture actual handle, key and frame symptoms; local history does not identify the mechanism.',
          'Use River Sowe only to locate the address; diagnose uPVC, composite or multipoint claims from the identified entrance.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2],
        local: 'A damaged opening at the hospital requires the authorised facilities contact and exact building, while one near historic Hall Lane needs an individual status check. The Walsgrave label does not distinguish those cases.',
        decision: 'If the address is described by the North Sowe corridor, establish the real property boundary and responsible party before securing it. A river-valley character area supplies no construction or access evidence.',
        checks: [
          'At the hospital, identify the authorised facilities contact and building; near Hall Lane, check the exact property\'s status.',
          'Confirm the real property boundary and responsible party near North Sowe; river context supplies no construction or access evidence.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'Walsgrave\'s official evidence separates a historic village core from a redeveloped hospital site, so a single local upgrade specification would be unsupported. Obtain the requirement from the actual owner or manager.',
        decision: 'Historic buildings on named roads warrant exact property-status checks; the hospital warrants its own site approval. For either, inspect the complete entrance and do not derive hardware from its period or riverside context.',
        checks: [
          'Obtain the requirement from the actual owner or manager; historic-village and hospital contexts do not support one local specification.',
          'Check property status or site approval, then inspect the complete entrance without deriving hardware from period or riverside context.',
        ],
      },
    },
  },
  {
    slug: 'binley',
    name: 'Binley',
    region: 'West Midlands',
    summary: [
      'Coventry\'s Binley HLC places a commercial and industrial character area on the city\'s south-east fringe, bounded by the A46, with Binley Business Park in the north and the former colliery landscape in the south.',
      'The council\'s JSNA uses a wider Binley and Willenhall ward, while the South Sowe report names Binley on its river corridor. These different geographies cannot establish the use or status of one property.',
    ],
    accessGuidance: 'Confirm whether the supplied address is residential, business-park, industrial or another managed site. Record the exact entrance and responsible party before access, replacement or temporary work.',
    evidenceLimits: '“Binley” is wider than the HLC commercial/industrial area and differs from the combined ward and river corridor. The sources do not prove any address\'s use, owner, construction, designation, access or lock.',
    facts: [
      {
        text: 'The Binley HLC places its character area on Coventry\'s south-east fringe, bounded by the A46 to the south-east and dominated at report date by industrial and commercial uses with smaller open areas.',
        sourceIds: ['binley-hlc'],
        serviceRelevance: 'Identify the current property or site and manager rather than assuming business use from the broader HLC.',
      },
      {
        text: 'The report identifies Binley Business Park in the north and records the former Binley Colliery landscape in the south.',
        sourceIds: ['binley-hlc'],
        serviceRelevance: 'North/south context can help locate the address but cannot establish building access or hardware.',
      },
      {
        text: 'The council JSNA defines a combined Binley and Willenhall ward, while the South Sowe HLC names Binley on the river-valley corridor.',
        sourceIds: ['binley-willenhall-jsna', 'south-sowe-hlc'],
        serviceRelevance: 'Do not treat ward or river-corridor geography as a property or service-route boundary.',
      },
    ],
    sources: [
      localitySource('binley-hlc', 'Binley Character Area, HLC Area 8', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17418/hlc-area-8-binley-character-area', 'A46 boundary, predominant commercial/industrial use, Business Park and former colliery context.'),
      localitySource('binley-willenhall-jsna', 'Binley and Willenhall place-based profile', 'Coventry City Council', 'https://www.coventry.gov.uk/facts-coventry/binley-willenhall-place-based-profile/print', 'The combined Binley and Willenhall ward geography.'),
      localitySource('south-sowe-hlc', 'South Sowe Character Area, HLC Area 28', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17439/hlc-area-28-south-sowe-character-area', 'Binley\'s place on the South Sowe river-valley corridor.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'The Binley HLC is dominated by commercial and industrial uses, yet the wider Binley name and combined ward extend beyond that evidence unit. Name the business, home or managed site and its controlled entrance.',
        decision: 'Binley Business Park in the north and the former colliery landscape in the south can orient the address but cannot prove authority. Confirm the responsible occupier or site contact before access.',
        checks: [
          'Name the business, home or managed site and its controlled entrance; the Binley HLC does not cover every use.',
          'Confirm the responsible occupier or site contact; Business Park and former colliery geography do not prove authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'For a Business Park instruction, obtain the unit and facilities approval; for a residential address in the wider Binley name, confirm the owner or occupier. The HLC\'s predominant commercial use cannot decide either case.',
        decision: 'The A46 boundary and former colliery context supply no door specification. Inspect the actual entrance, and treat the combined Binley and Willenhall ward as statistical geography rather than property evidence.',
        checks: [
          'Obtain unit and facilities approval for Business Park premises, or verify the owner or occupier for a residential address.',
          'Inspect the actual entrance; the A46 boundary, former colliery and combined ward provide no lock specification.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Commercial and industrial land use in the Binley HLC does not establish a door material or mechanism, and the wider ward adds no such evidence. Obtain photographs and exact operational symptoms from the identified opening.',
        decision: 'A location near the Business Park, A46 or South Sowe corridor should be used only to clarify the address and responsible manager. It must not substitute for examining the door, frame, hinges and lock.',
        checks: [
          'Obtain photographs and exact operational symptoms; commercial, industrial and ward geography does not establish door material or mechanism.',
          'Use Business Park, A46 or South Sowe references only to clarify the address and manager, then examine the complete door set.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2],
        local: 'A damage report from Binley Business Park needs the specific unit and authorised manager; one from the wider residential area needs the actual occupier or owner. The area name alone cannot distinguish them.',
        decision: 'The former colliery landscape and River Sowe corridor are geographic context, not evidence of construction or ownership at the damaged opening. Confirm boundary, access and any site approval directly.',
        checks: [
          'Identify the specific Business Park unit and manager, or the actual owner or occupier for residential damage.',
          'Confirm the property boundary, access and site approval directly; colliery and river-corridor context does not establish construction or ownership.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 2],
        local: 'Binley\'s business, industrial, residential and river-edge contexts make a generic local upgrade claim unsafe. Ask the responsible person for the exact entrance and any written business, landlord or owner requirement.',
        decision: 'Neither the HLC\'s A46 boundary nor the ward geography specifies a lock. Compare options only after inspecting the complete door set and confirming who may approve changes at the individual premises.',
        checks: [
          'Ask the responsible person for the exact entrance and written business, landlord or owner requirement.',
          'Inspect the complete door set and confirm who may approve changes; HLC and ward boundaries specify no lock.',
        ],
      },
    },
  },
  {
    slug: 'binley-woods',
    name: 'Binley Woods',
    region: 'Warwickshire',
    summary: [
      'Rugby Borough Council\'s Village Design Statement describes Binley Woods as a twentieth-century settlement on former Binley Common woodland and explains its Coventry–Rugby parish boundary history. Historic England separately records one named listed barn.',
      'The settlement statement and Old Lodge Farm listing are not evidence that another Binley Woods address is historic, listed or built in a particular way. Parish, settlement and property boundaries must be checked separately.',
    ],
    accessGuidance: 'Use the full address to distinguish Binley Woods parish from Coventry\'s Binley area. Confirm the exact entrance and caller authority; if work concerns Old Lodge Farm or another designated asset, establish status and consent before changing fabric.',
    evidenceLimits: 'The Village Design Statement is settlement-scale and the Historic England entry applies only to Old Lodge Farm\'s named barn. Neither supports a heritage, construction, access or hardware claim for another property.',
    facts: [
      {
        text: 'Rugby Borough Council\'s Village Design Statement places Binley Woods about four miles east of central Coventry and seven miles west of Rugby and records the parish boundary change made in 1994.',
        sourceIds: ['binley-woods-vds'],
        serviceRelevance: 'Use the full address to distinguish the Warwickshire parish and village from Coventry\'s separate Binley area.',
      },
      {
        text: 'The statement says the developed village largely occupies former Binley Common woodland auctioned after the Coombe Abbey estate break-up in the early 1920s and describes distinct twentieth-century development phases.',
        sourceIds: ['binley-woods-vds'],
        serviceRelevance: 'Settlement history cannot identify the construction or lock at an individual entrance.',
      },
      {
        text: 'Historic England records the barn at Old Lodge Farm in Binley Woods parish as Grade II listed, list entry 1034897.',
        sourceIds: ['binley-woods-old-lodge-barn'],
        serviceRelevance: 'The listing is asset-specific and should not be transferred to another village address.',
      },
    ],
    sources: [
      localitySource('binley-woods-vds', 'Binley Woods Village Design Statement', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6573843/Binley_Woods_Village_Design_Statement.pdf/b5223d67-ed64-56e2-4f4b-ecba8b44d724?t=1750866464443', 'Village/parish location, 1994 boundary history, former Binley Common and development phases.'),
      localitySource('binley-woods-old-lodge-barn', 'Old Lodge Farm barn, list entry 1034897', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1034897', 'Grade II status for the specifically named Old Lodge Farm barn.', 'property-status'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        local: 'The Village Design Statement distinguishes Binley Woods parish from Coventry and Rugby and records a 1994 boundary alteration. A caller should give the full Warwickshire address so it is not confused with Coventry\'s Binley.',
        decision: 'The listed Old Lodge Farm barn entry identifies one asset only and supplies no access authority for it or nearby premises. Verify the requester and exact controlled opening independently for every instruction.',
        checks: [
          'Record the full Warwickshire address to distinguish Binley Woods parish from Coventry\'s separate Binley area.',
          'Verify the requester and exact controlled opening independently; the Old Lodge Farm barn listing identifies only one asset.',
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        local: 'Binley Woods developed in phases on former Binley Common, but that settlement history cannot reveal the current lock at one property. Inspect the door and avoid assigning hardware from a twentieth-century area description.',
        decision: 'If the request concerns Old Lodge Farm\'s listed barn, its specific Historic England record must inform permission checks. No listed status should be inferred for another address in the parish.',
        checks: [
          'Inspect the individual door; Binley Woods development phases on former Binley Common do not identify current hardware.',
          'If the listed Old Lodge Farm barn is involved, use its specific record for permission checks; infer no status elsewhere.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'A twentieth-century settlement profile still does not demonstrate that a Binley Woods entrance is uPVC or uses multipoint locking. Ask for the actual material, handle travel, key action and frame contact.',
        decision: 'The Coventry–Rugby boundary history helps prevent a location error but cannot diagnose hardware. Even close to the named listed barn, the affected door and its authority must be established as a separate property.',
        checks: [
          'Record the actual material, handle travel, key action and frame contact; settlement history does not establish uPVC or multipoint locking.',
          'Use boundary history only to prevent location error, then establish the affected door and authority as a separate property.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'Before securing damage in Binley Woods, confirm the parish address, site boundary and responsible party. The settlement\'s origins on former Binley Common do not show who owns or manages a present opening.',
        decision: 'Where Old Lodge Farm\'s listed barn is the affected asset, verify consent and fabric constraints for that exact entry. Its designation must not be extended to neighbouring buildings or the wider village.',
        checks: [
          'Confirm the parish address, site boundary and responsible party; former Binley Common origins do not establish present ownership.',
          'For the listed Old Lodge Farm barn, verify exact consent and fabric constraints; do not extend its designation to neighbours.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'The Village Design Statement records distinct development phases, which argues against one Binley Woods hardware assumption. Base any upgrade on the individual entrance and the authorised customer\'s documented goal.',
        decision: 'For the named Grade II barn, resolve the asset-specific permission before visible change; for other addresses, check their own status. Parish geography and proximity to Coventry do not provide a security standard.',
        checks: [
          'Base the upgrade on the individual entrance and authorised customer\'s documented goal; settlement phases support no single hardware assumption.',
          'Resolve asset-specific permission for the listed barn, while checking every other address against its own status.',
        ],
      },
    },
  },
  {
    slug: 'willenhall',
    name: 'Willenhall',
    region: 'West Midlands',
    summary: [
      'Coventry\'s Willenhall HLC describes a predominantly residential southern-edge area divided by the West Coast Main Line, with the River Sowe and A46 at its edges, and records two early English Radburn-planned estates.',
      'The council also records a designated neighbourhood area and approved plan. These area and layout sources do not establish a particular property\'s orientation, ownership, entrance or hardware.',
    ],
    accessGuidance: 'Use the full address and describe the operative entrance rather than assuming it faces the postal road. In a managed or Radburn-style setting, identify the responsible occupier or manager and any route or gate instructions.',
    evidenceLimits: 'The HLC contains pockets of different layouts and periods. Radburn planning, railway/river boundaries and neighbourhood-plan status do not prove any individual property\'s orientation, owner, access, construction or lock.',
    facts: [
      {
        text: 'The Willenhall HLC describes a predominantly residential area on Coventry\'s southern edge, divided by the West Coast Main Line, with the River Sowe to the west and A46 immediately south-east.',
        sourceIds: ['willenhall-hlc'],
        serviceRelevance: 'Use the address and exact entrance because infrastructure boundaries do not identify the controlled opening.',
      },
      {
        text: 'The report records two estates completed in 1960 as early English examples of Radburn planning, separating vehicular and pedestrian routes.',
        sourceIds: ['willenhall-hlc'],
        serviceRelevance: 'Ask for entrance and route instructions rather than assuming the postal frontage is the operative door.',
      },
      {
        text: 'Coventry City Council designated the Willenhall Neighbourhood Area in 2013 and approved its Neighbourhood Plan in 2018; the JSNA places Willenhall in a combined Binley and Willenhall ward.',
        sourceIds: ['coventry-neighbourhood-plans', 'binley-willenhall-jsna'],
        serviceRelevance: 'Planning and statistical boundaries are not property, ownership or service-route boundaries.',
      },
    ],
    sources: [
      localitySource('willenhall-hlc', 'Willenhall Character Area, HLC Area 7', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17419/hlc-area-7-willenhall-character-area', 'Railway, River Sowe and A46 context, and the two 1960 Radburn-planned estates.'),
      localitySource('coventry-neighbourhood-plans', 'Neighbourhood Plans', 'Coventry City Council', 'https://www.coventry.gov.uk/neighbourhoodplanning', 'Willenhall Neighbourhood Area designation and plan approval dates.'),
      localitySource('binley-willenhall-jsna', 'Binley and Willenhall place-based profile', 'Coventry City Council', 'https://www.coventry.gov.uk/facts-coventry/binley-willenhall-place-based-profile/print', 'The combined Binley and Willenhall ward geography.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: 'Willenhall\'s Radburn-planned estates separated pedestrian and vehicular routes, so the postal frontage may not describe the operative entrance in every case. Ask for the actual door, path or gate and a precise meeting point.',
        decision: 'The railway divides the official character area, with the River Sowe and A46 at other edges. Those features orient the address but do not prove occupation, so verify the requester\'s authority separately.',
        checks: [
          'Ask for the actual door, path or gate and a precise meeting point within any Radburn-planned setting.',
          'Verify requester authority separately; the railway, River Sowe and A46 orient the address but do not prove occupation.',
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        local: 'A Radburn layout can make entrance orientation an important question, but the HLC does not say every Willenhall property follows that form. Inspect the specified door and establish any communal or management approval.',
        decision: 'Neighbourhood-plan designation and combined ward geography are planning and statistical facts, not lock specifications. Replacement selection must use the current door set and the responsible person\'s authorised requirement.',
        checks: [
          'Inspect the specified door and establish communal or management approval; not every Willenhall property follows a Radburn layout.',
          'Use the current door set and authorised requirement; neighbourhood-plan and ward geography are not lock specifications.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: 'The two 1960 Radburn estates are layout evidence only and cannot establish uPVC, multipoint locking or component age. Obtain the exact entrance and describe handle, key and closing behaviour at that door.',
        decision: 'Railway, A46 and River Sowe boundaries can prevent a location misunderstanding, but none diagnoses alignment or mechanism failure. The reported symptoms must be assessed against the observed frame and hardware.',
        checks: [
          'Obtain the exact entrance and describe its handle, key and closing behaviour; Radburn layout evidence does not identify hardware.',
          'Assess symptoms against the observed frame and hardware; railway, A46 and River Sowe boundaries provide no diagnosis.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2],
        local: 'In a Radburn-style part of Willenhall, a damaged opening may not be approached from the postal road. Record the safe pedestrian or vehicle route and verify the property or site manager who controls access.',
        decision: 'The approved neighbourhood plan does not grant permission for temporary work. Confirm the actual building, boundary and any communal responsibility, especially where the opening fronts shared paths or managed space.',
        checks: [
          'Record the operative pedestrian or vehicular approach and verify the property or site manager controlling the damaged opening.',
          'Confirm the actual building, boundary and communal responsibility; the approved neighbourhood plan grants no temporary-work permission.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'Willenhall\'s layout history is relevant to finding and identifying an entrance, not to assigning a lock standard. Inspect the individual door and ask whether shared-space or estate management approval applies.',
        decision: 'The neighbourhood area, combined ward and HLC boundary differ, so none should be treated as a universal property profile. Use the authorised customer\'s written requirement and the complete door set to plan an upgrade.',
        checks: [
          'Inspect the individual door and ask whether shared-space or estate-management approval applies; layout history sets no lock standard.',
          'Use the authorised customer\'s written requirement and complete door set; differing planning and statistical boundaries are not property profiles.',
        ],
      },
    },
  },
  {
    slug: 'cheylesmore',
    name: 'Cheylesmore',
    region: 'West Midlands',
    summary: [
      'The Cheylesmore and Stivichall HLC describes extensive housing developed rapidly between 1936 and 1955 and records the former medieval deer park of Cheylesmore Manor in the north-west of the combined area.',
      'It also gives heritage-designation totals for the whole character area but records no conservation area. Development periods and area totals cannot establish the age, status, entrance or hardware of an individual Cheylesmore property.',
    ],
    accessGuidance: 'Obtain the exact address, entrance and caller authority. If a visible alteration may affect a listed, scheduled or other designated asset, verify the building itself; do not select hardware from the area\'s development period.',
    evidenceLimits: 'The HLC combines Cheylesmore and Stivichall. Its 1936–1955 development description, deer-park history and heritage totals are area-scale and do not prove property status, fabric, access or lock type.',
    facts: [
      {
        text: 'The Cheylesmore and Stivichall character area lies south of Coventry city centre and is described as extensive housing developed rapidly between 1936 and 1955.',
        sourceIds: ['cheylesmore-stivichall-hlc'],
        serviceRelevance: 'The broad development period cannot select or prove door construction or installed hardware.',
      },
      {
        text: 'The north-west of the character area falls within the former medieval deer park of Cheylesmore Manor, with some present road alignments reflecting its boundary.',
        sourceIds: ['cheylesmore-stivichall-hlc'],
        serviceRelevance: 'Historic-landscape context can prompt an exact property check but does not establish designation or access.',
      },
      {
        text: 'At character-area scale the report records one scheduled monument, twelve archaeological constraint areas, ten listed buildings and one registered park and garden, but no conservation area.',
        sourceIds: ['cheylesmore-stivichall-hlc'],
        serviceRelevance: 'Verify the individual building before external changes; totals neither confer nor remove property-specific controls.',
      },
    ],
    sources: [
      localitySource('cheylesmore-stivichall-hlc', 'Cheylesmore and Stivichall Character Area, HLC Area 10', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17423/hlc-area-10-cheylesmore-and-stivichall-character-area', 'Housing development period, former Cheylesmore Manor deer park and character-area heritage totals.', 'property-status'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: 'The official report combines Cheylesmore with Stivichall and describes a broad 1936–1955 housing phase. A lockout still needs the full address and exact entrance because the combined character area is not an occupation record.',
        decision: 'Road alignments may reflect the former Cheylesmore Manor deer-park boundary, but that history gives no access entitlement. Verify the caller and property independently before acting on an urgent request.',
        checks: [
          'Record the full address and exact entrance; the combined Cheylesmore–Stivichall character area does not establish occupation.',
          'Verify the caller and property independently; former deer-park road alignments provide no access entitlement.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        local: 'One scheduled monument, ten listed buildings and other designated assets are counted across the combined character area. Check the exact Cheylesmore property before visible work rather than assigning protected status from an area total.',
        decision: 'The rapid 1936–1955 development statement does not prove a door\'s construction or current lock. Inspect the entrance and obtain any property-specific consent even though no conservation area is recorded across the HLC.',
        checks: [
          'Check the exact property before visible work; character-area scheduled, listed and archaeological totals do not establish protected status.',
          'Inspect the entrance and obtain property-specific consent; the 1936–1955 development period does not prove door construction or current hardware.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Cheylesmore\'s area-scale development period cannot establish that an individual entrance is uPVC or fitted with a multipoint mechanism. Ask what the handle and key do and identify the actual frame and locking points.',
        decision: 'The former deer-park boundary and designation totals concern landscape and heritage, not mechanical symptoms. They should prompt location or status verification only, while the repair diagnosis remains door-specific.',
        checks: [
          'Record handle and key behaviour, frame and locking points; the area\'s development period does not establish uPVC or multipoint hardware.',
          'Use deer-park and heritage context only for location or status verification, keeping diagnosis specific to the actual door.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 2],
        local: 'A damaged opening in the combined Cheylesmore and Stivichall HLC needs an exact address before heritage implications can be assessed. The report\'s scheduled, listed and archaeological totals do not identify the scene.',
        decision: 'If external temporary work could affect a designated asset or registered park context, confirm its specific status and responsible authority. The absence of a character-area conservation designation is not a blanket permission.',
        checks: [
          'Identify the exact address and damaged opening before assessing any heritage implications across the combined character area.',
          'Confirm specific designation and responsible authority before external temporary work; absence of area conservation status is not blanket permission.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 2],
        local: 'The 1936–1955 housing description is broad chronology, not evidence of one Cheylesmore door or risk level. Document the complete entrance and any written owner, manager or insurer requirement before selecting an upgrade.',
        decision: 'Heritage assets occur within the combined area even though no conservation area is recorded. Resolve address-level designation and approval for visible work, rather than drawing either permission or prohibition from the area totals.',
        checks: [
          'Document the complete entrance and written owner, manager or insurer requirement; broad housing chronology does not establish a risk level.',
          'Resolve address-level designation and approval for visible work; area totals provide neither permission nor prohibition.',
        ],
      },
    },
  },
  {
    slug: 'whitley',
    name: 'Whitley',
    region: 'West Midlands',
    summary: [
      'Coventry\'s Whitley HLC describes a settlement south of the city centre, with industry to the north and west and the River Sowe Valley to the south and east. It records medieval and country-house history alongside later development.',
      'The South Sowe HLC also places Whitley on the river corridor. These mixed edge contexts and broad periods do not prove the use, ownership, status, construction or entrance of a particular Whitley address.',
    ],
    accessGuidance: 'Identify the full address, actual entrance and whether the property is residential, industrial or part of a managed institutional site. Verify caller authority, and check exact designation before external work on an older building.',
    evidenceLimits: 'The Whitley character area contains distinct edge uses and development periods, while the river corridor is a separate evidence layer. The locality name proves none of those conditions for an individual property.',
    facts: [
      {
        text: 'The Whitley HLC describes a settlement south of Coventry city centre, with industry to its north and west and the River Sowe Valley to its south and east.',
        sourceIds: ['whitley-hlc'],
        serviceRelevance: 'Confirm whether the address is residential, industrial or another managed site and identify the responsible party.',
      },
      {
        text: 'The report records medieval settlement south of Abbey Road, a later Whitley Abbey country house and park, and predominantly 1925–1955 development in the modern character area.',
        sourceIds: ['whitley-hlc'],
        serviceRelevance: 'Different historical phases require property-specific checks and do not establish current door fabric or hardware.',
      },
      {
        text: 'The South Sowe character-area report explicitly names Whitley on the river-valley route.',
        sourceIds: ['south-sowe-hlc'],
        serviceRelevance: 'River-corridor context may help orient the address but cannot define ownership, access or a service boundary.',
      },
    ],
    sources: [
      localitySource('whitley-hlc', 'Whitley Character Area, HLC Area 2', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17410/hlc-area-2-whitley-character-area', 'Industrial and River Sowe edges, medieval settlement, Whitley Abbey and broad development period.', 'property-status'),
      localitySource('south-sowe-hlc', 'South Sowe Character Area, HLC Area 28', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17439/hlc-area-28-south-sowe-character-area', 'Whitley\'s place on the South Sowe river-valley route.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: 'Whitley\'s official edges include industry to the north and west and the Sowe Valley to the south and east. An urgent instruction should identify the named building and entrance so those different contexts are not conflated.',
        decision: 'Medieval settlement and Whitley Abbey history south of Abbey Road do not establish current occupancy or property control. Verify the person requesting entry and any industrial or institutional site contact independently.',
        checks: [
          'Name the Whitley building and exact entrance so industrial, institutional, residential and river-edge contexts are not conflated.',
          'Verify the requester and any site contact directly; Abbey Road and Whitley Abbey history cannot establish occupancy or control.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'The HLC records medieval, country-house and predominantly 1925–1955 development phases, but none identifies the lock on a supplied Whitley door. Inspect the opening and verify its actual status before replacement.',
        decision: 'At an industrial or managed site on the described edges, obtain facilities approval; near an older asset, check designation. The South Sowe corridor adds location context but no replacement specification.',
        checks: [
          'Inspect the supplied Whitley opening; the recorded development phases do not identify its lock, door fabric or current status.',
          'Obtain any facilities or heritage approval required at the exact premises; the South Sowe corridor supplies no replacement specification.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: 'Whitley\'s 1925–1955 area-scale development statement is not evidence that a particular door is uPVC or multipoint. Record the actual material, handle movement, key action and relationship with the frame.',
        decision: 'A site beside industry or the Sowe Valley may need clearer access directions and management authority, but that edge context does not diagnose hardware. Keep geographical identification separate from the mechanical assessment.',
        checks: [
          'Record the Whitley entrance material, handle movement, key action and frame contact rather than inferring a mechanism from development dates.',
          'Confirm any managed-site authority separately; industrial and Sowe Valley edge context cannot diagnose the reported hardware fault.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: 'Damage in Whitley should be tied to an exact residential, industrial or institutional property because the HLC contains all of those edge contexts. Identify the responsible decision-maker and precise door or window.',
        decision: 'If an older building around Abbey Road or Whitley Abbey context is involved, check its individual heritage status before external temporary work. The medieval and park history does not confer designation by proximity.',
        checks: [
          'Identify the exact Whitley property, damaged door or window and responsible decision-maker before defining temporary work.',
          'Check the individual heritage status before external fixing; Abbey Road and Whitley Abbey history does not confer designation by proximity.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'No uniform Whitley upgrade follows from its mixed industrial, river-edge and residential contexts. Obtain a written objective from the actual owner or site manager and inspect the complete entrance before comparing options.',
        decision: 'The HLC\'s development chronology and South Sowe route can prompt property and access questions, but cannot establish risk or hardware. Resolve any institutional or heritage permission at the exact address.',
        checks: [
          'Obtain the owner or site manager\'s written objective and inspect the complete Whitley entrance before comparing upgrades.',
          'Resolve institutional or heritage permission at the exact address; development chronology and the South Sowe route establish neither risk nor hardware.',
        ],
      },
    },
  },
  {
    slug: 'finham',
    name: 'Finham',
    region: 'West Midlands',
    summary: [
      'Coventry City Council defines Finham Parish using the A45, Howes Lane, the city boundary and the railway near Gretna Road. It records the parish\'s 2016 foundation and a Finham Neighbourhood Area designated in 2017.',
      'Parish and neighbourhood-plan records describe governance and planning geographies. They do not identify an individual property\'s construction, protected status, access arrangement, door or lock.',
    ],
    accessGuidance: 'Use the complete address to test whether an instruction relates to the parish or neighbourhood area and to identify the exact entrance. Confirm the responsible owner, occupier or manager rather than using “Finham” as a mapped substitute.',
    evidenceLimits: 'The A45, Howes Lane, city-boundary and railway references define official geographies only. Parish foundation and neighbourhood designation do not establish property type, status, ownership, entrance or hardware.',
    facts: [
      {
        text: 'Coventry City Council states that Finham Parish lies south of Coventry and is bounded by the A45, Howes Lane, the city boundary and the railway line adjacent to Gretna Road.',
        sourceIds: ['finham-parish'],
        serviceRelevance: 'Use the full address because a parish boundary description cannot identify a property entrance or responsible party.',
      },
      {
        text: 'The council records that Finham Parish was founded in 2016.',
        sourceIds: ['finham-parish'],
        serviceRelevance: 'Governance history supplies no evidence about building age, access or installed hardware.',
      },
      {
        text: 'Coventry City Council designated the Finham Neighbourhood Area on 16 March 2017, with Finham Parish Council as the applicant body.',
        sourceIds: ['coventry-neighbourhood-plans'],
        serviceRelevance: 'A neighbourhood-plan boundary is not a property or service-route boundary and cannot authorise work.',
      },
    ],
    sources: [
      localitySource('finham-parish', 'Finham Parish Council', 'Coventry City Council', 'https://www.coventry.gov.uk/council-democracy/finham-parish-council', 'Parish boundary description and 2016 foundation date.'),
      localitySource('coventry-neighbourhood-plans', 'Neighbourhood Plans', 'Coventry City Council', 'https://www.coventry.gov.uk/neighbourhoodplanning', 'Finham Neighbourhood Area designation date and applicant body.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'Finham Parish is officially described using the A45, Howes Lane, the city boundary and the railway near Gretna Road. Those lines cannot locate a particular controlled opening, so provide the full street address and entrance.',
        decision: 'The parish was founded in 2016 and the neighbourhood area designated in 2017, but neither governance fact identifies an occupier. Verify the requester\'s authority directly at the supplied property.',
        checks: [
          'Provide the full Finham street address and entrance; the A45, Howes Lane and railway boundaries cannot locate a controlled opening.',
          'Verify the requester at the supplied property; parish foundation and neighbourhood designation do not identify an occupier or access authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        local: 'A Finham neighbourhood-plan boundary is not a building record and cannot show what lock is fitted. Use the exact door, frame and current hardware to define a replacement rather than a parish label.',
        decision: 'Where an address lies near the stated city or parish edges, confirm which owner or manager controls the entrance. The A45 and railway boundary references supply no product or consent information.',
        checks: [
          'Define the Finham replacement from the exact door, frame and current hardware, not from the neighbourhood-plan boundary.',
          'Confirm the owner or manager controlling the entrance; A45 and railway boundary references supply no product or consent information.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 2],
        local: 'No parish or neighbourhood-planning source establishes that a Finham door uses uPVC or multipoint locking. Ask for the material, handle travel, key response and whether the symptom changes with the door position.',
        decision: 'The Howes Lane, A45 and Gretna Road railway references can help verify location only. They cannot diagnose alignment or mechanism condition, and they do not establish authority over the opening.',
        checks: [
          'Record the Finham door material, handle travel, key response and open-versus-closed behaviour before identifying the mechanism.',
          'Use the Howes Lane, A45 and railway references for location only; they establish neither diagnosis nor authority over the opening.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'A damaged opening described only as “Finham” needs a complete address because parish, neighbourhood and city boundaries are not interchangeable property maps. Identify the precise door or window and responsible party.',
        decision: 'Neither the parish\'s foundation nor neighbourhood designation grants permission for temporary securing. Any council, landlord or managed-site approval must be obtained for the actual premises before exterior work.',
        checks: [
          'Obtain the complete Finham address, precise damaged opening and responsible party instead of relying on parish or neighbourhood boundaries.',
          'Secure any council, landlord or managed-site approval for the actual premises; governance records grant no temporary-work permission.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'Finham\'s official evidence concerns governance geography, not risk, construction or current locks. Base an upgrade conversation on the individual entrance and a written requirement from the person entitled to approve it.',
        decision: 'Use the parish edges only to disambiguate the address. A railway or A45 boundary cannot supply a security standard, product choice or permission to alter shared or externally visible hardware.',
        checks: [
          'Base the Finham upgrade on the individual entrance and a written requirement from the person entitled to approve it.',
          'Use parish edges only to clarify the address; railway and A45 boundaries supply no security standard, product choice or alteration permission.',
        ],
      },
    },
  },
  {
    slug: 'styvechale',
    name: 'Styvechale',
    region: 'West Midlands',
    summary: [
      'Coventry\'s official sources use the historic spelling “Stivichall” in HLC and listed-building records. The council identifies Kenilworth Road woodlands within a 1968 conservation area, and Historic England lists the specifically named Stivichall Grange.',
      'The Styvechale locality label does not map one-to-one to those records. Woodland designation and the listed entry do not establish the status, fabric or entrance of another address.',
    ],
    accessGuidance: 'Check both Styvechale and official Stivichall references when verifying the exact address. For property in or beside the Kenilworth Road conservation area or a listed asset, establish status and consent before altering external fabric.',
    evidenceLimits: 'The route spelling and official “Stivichall” records are not a mapped one-to-one area. The conservation statement concerns specified woodlands, and list entry 1342919 applies only to Stivichall Grange.',
    facts: [
      {
        text: 'Coventry sources use the historic spelling “Stivichall” in the HLC and listed-building record; the combined Cheylesmore and Stivichall character area lies south of the city centre.',
        sourceIds: ['cheylesmore-stivichall-hlc'],
        serviceRelevance: 'Search both spellings and use the full address so locality records are not missed or misapplied.',
      },
      {
        text: 'Coventry City Council says the Kenilworth Road woodlands are within a conservation area designated in 1968, including Wainbody Wood, Stivichall Common and Kenilworth Road Spinney, all local nature reserves.',
        sourceIds: ['kenilworth-road-woodlands'],
        serviceRelevance: 'Work affecting a named protected or managed site requires exact land and authority checks.',
      },
      {
        text: 'Historic England records Stivichall Grange on Lonscale Drive as a Grade II listed building, list entry 1342919.',
        sourceIds: ['stivichall-grange'],
        serviceRelevance: 'The listing is specific to the named property and should not be applied to another Styvechale address.',
      },
    ],
    sources: [
      localitySource('cheylesmore-stivichall-hlc', 'Cheylesmore and Stivichall Character Area, HLC Area 10', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17423/hlc-area-10-cheylesmore-and-stivichall-character-area', 'Official Stivichall spelling and combined character-area context.'),
      localitySource('kenilworth-road-woodlands', 'Kenilworth Road woodlands', 'Coventry City Council', 'https://www.coventry.gov.uk/heritage-ecology-trees/kenilworth-road-woodlands', 'The 1968 conservation area, named woodlands and their local-nature-reserve status.', 'property-status'),
      localitySource('stivichall-grange', 'Stivichall Grange, list entry 1342919', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1342919', 'Grade II status for Stivichall Grange on Lonscale Drive.', 'property-status'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'Because council and Historic England records use “Stivichall” while the route uses “Styvechale,” a lockout instruction should include the full address rather than relying on spelling. Identify the actual building and entrance.',
        decision: 'A reference to Stivichall Common, Wainbody Wood or Kenilworth Road Spinney may concern protected council-managed land, not a residence. Establish the responsible authority and never transfer the Grange listing to another property.',
        checks: [
          'Give the full Styvechale address, actual building and entrance so official Stivichall records are applied to the correct property.',
          'Establish the responsible authority for named woodland assets and never transfer the Stivichall Grange listing to another address.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'Stivichall Grange is individually Grade II listed, and the Kenilworth Road woodlands sit within a conservation area. A visible change requires exact property identification because neither status applies across all Styvechale addresses.',
        decision: 'For an address outside those named assets, the official spelling and combined HLC still provide no lock specification. Inspect the existing door and confirm its own permissions instead of relying on nearby designations.',
        checks: [
          'Identify the exact Styvechale property before applying the Grange listing or Kenilworth Road woodland conservation status to a visible change.',
          'Inspect the existing door and confirm its own permissions; nearby named designations provide no replacement specification.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither the Stivichall spelling variant nor the conservation-area woodland record tells whether a supplied entrance is uPVC or multipoint. Capture the actual door material and precise handle, key and frame symptoms.',
        decision: 'If the request concerns Stivichall Grange, its listed status is relevant to property permissions but still not to mechanical diagnosis. For every other address, keep that named listing entirely separate.',
        checks: [
          'Capture the Styvechale door material and precise handle, key and frame symptoms; spelling and woodland records identify no mechanism.',
          'Apply the Grange listing only to that named property and keep heritage permission separate from mechanical diagnosis.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'Damage at a site described by the protected Kenilworth Road woodlands requires identification of the council-managed asset and correct authority. Damage at a private Styvechale address needs a separate property and entrance check.',
        decision: 'For Grade II listed Stivichall Grange, or another building whose listed status is verified, confirm any required consent and fabric constraints before external temporary fixing. The route spelling alone cannot prove that a heritage control applies.',
        checks: [
          'Distinguish a council-managed Kenilworth Road woodland asset from a private Styvechale address and identify the correct authority and damaged opening.',
          'Confirm verified listed status, consent and fabric constraints before external fixing; the route spelling alone proves no heritage control.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 2],
        local: 'An upgrade near Stivichall Common or the Kenilworth Road conservation area must start with the exact property boundary and proposed visible change. The protected woodland status does not attach automatically to nearby homes.',
        decision: 'Historic England\'s Grade II listed entry is confined to Stivichall Grange. Confirm any listed-building consent required before visible change there; elsewhere, inspect the individual entrance and obtain its owner\'s requirements. Search both locality spellings only to ensure accurate address-level verification.',
        checks: [
          'Resolve the exact Styvechale property boundary before applying Stivichall Common or Kenilworth Road conservation context to an upgrade.',
          'Apply the Grade II entry only to Stivichall Grange; elsewhere inspect the entrance and obtain the owner\'s written requirements.',
        ],
      },
    },
  },
  {
    slug: 'allesley',
    name: 'Allesley',
    region: 'West Midlands',
    summary: [
      'Coventry\'s HLC describes medieval or possibly Anglo-Saxon origins for Allesley village, historic houses and cottages along Birmingham Road, All Saints Church and a conservation area around the village core.',
      'The council also designated a wider Allesley Neighbourhood Area in 2016. Neither the HLC nor planning geography makes every Allesley address historic, listed or inside the conservation boundary.',
    ],
    accessGuidance: 'Use the complete address to distinguish the village core from the wider neighbourhood geography. Check the exact listed or conservation status and caller authority before external changes at a historic address.',
    evidenceLimits: 'The HLC and neighbourhood area extend beyond any one street. The medieval origins, Birmingham Road buildings and village conservation area do not establish another property\'s age, designation, access or hardware.',
    facts: [
      {
        text: 'The Allesley Park and Coundon Wedge HLC says Allesley village has medieval or possibly Anglo-Saxon origins and includes 16th- to 19th-century houses and cottages along Birmingham Road, many listed.',
        sourceIds: ['allesley-coundon-hlc'],
        serviceRelevance: 'Check the precise Birmingham Road or village property before visible alteration; nearby history does not prove status.',
      },
      {
        text: 'The report identifies medieval All Saints Church and describes the historic core of Allesley Village as a conservation area.',
        sourceIds: ['allesley-coundon-hlc'],
        serviceRelevance: 'Use an address-level conservation check rather than applying the historic-core status to the whole locality.',
      },
      {
        text: 'Coventry City Council designated the Allesley Neighbourhood Area on 4 May 2016 following an application by Allesley Parish Council.',
        sourceIds: ['coventry-neighbourhood-plans'],
        serviceRelevance: 'Neighbourhood-plan geography is not a property, access or service-route boundary.',
      },
    ],
    sources: [
      localitySource('allesley-coundon-hlc', 'Allesley Park and Coundon Wedge Character Area, HLC Area 18', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17429/hlc-area-18-allesley-park-and-coundon-wedge-character-area', 'Village origins, Birmingham Road historic buildings, All Saints Church and the village-core conservation area.', 'property-status'),
      localitySource('coventry-neighbourhood-plans', 'Neighbourhood Plans', 'Coventry City Council', 'https://www.coventry.gov.uk/neighbourhoodplanning', 'Allesley Neighbourhood Area designation date and applicant.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'Allesley Village\'s historic core is a conservation area, while the neighbourhood-plan geography is wider. A lockout instruction needs the full address and exact doorway so those evidence boundaries are not confused.',
        decision: 'All Saints Church and historic Birmingham Road properties are locality context, not proof of occupancy. Confirm the requester\'s authority for the named building, especially where a church or other managed site is involved.',
        checks: [
          'Give the full Allesley address and exact doorway so the village conservation core is not confused with the wider neighbourhood area.',
          'Confirm the requester for the named building; All Saints Church and Birmingham Road history do not prove occupancy or access authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'Many 16th- to 19th-century houses and cottages are recorded along Birmingham Road, but the HLC does not designate every building. Verify the specific listing and conservation position before a visible lock or door change.',
        decision: 'Outside the village core, the 2016 neighbourhood area still cannot specify installed hardware. Inspect the individual entrance and obtain any owner, landlord or manager approval for the proposed replacement.',
        checks: [
          'Verify the specific Birmingham Road property\'s listing and conservation position before a visible lock or door change.',
          'Inspect the individual entrance and obtain owner, landlord or manager approval; neighbourhood geography specifies no installed hardware.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Medieval origins and historic Birmingham Road buildings do not demonstrate that the affected Allesley entrance uses traditional or modern hardware. Ask for the actual door material and handle, key and closing symptoms.',
        decision: 'The village conservation boundary and wider neighbourhood area are different geographies, neither of which diagnoses a multipoint fault. Use them only to verify location and any property-specific permission.',
        checks: [
          'Record the Allesley door material and handle, key and closing symptoms; medieval and Birmingham Road history identifies no hardware.',
          'Use village and neighbourhood boundaries only for location and property permission, never to diagnose a multipoint fault.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'If damage occurs in the historic village core, confirm the exact building and conservation or listed status before an external temporary fixing. The area source does not provide blanket designation for Allesley.',
        decision: 'At All Saints Church or another managed site, identify the authorised representative and affected opening. The neighbourhood-area designation supplies no ownership or approval for temporary securing.',
        checks: [
          'Confirm the exact Allesley building and verified conservation or listed status before external temporary fixing in the historic core.',
          'At All Saints Church or another managed site, identify the authorised representative and opening; neighbourhood designation grants no approval.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'A Birmingham Road property may require an exact heritage check because the report records many listed historic houses and cottages there. That possibility cannot be extended to every Allesley upgrade enquiry.',
        decision: 'Within or outside the conservation core, base the specification on the observed entrance and written customer requirement. The medieval village and neighbourhood-plan history are not evidence of current lock condition or risk.',
        checks: [
          'Check the exact Birmingham Road property\'s heritage status instead of extending recorded historic-building context to every Allesley upgrade.',
          'Base the specification on the observed entrance and written requirement; medieval and neighbourhood-plan history establishes neither lock condition nor risk.',
        ],
      },
    },
  },
  {
    slug: 'allesley-park',
    name: 'Allesley Park',
    region: 'West Midlands',
    summary: [
      'Coventry City Council identifies Allesley Park as a historic park on Allesley Hall Drive between established housing developments. Its HLC records medieval deer-park earthworks and broader heritage-designation totals.',
      'The council park, surrounding residential locality, Allesley Village conservation area and wider character area are distinct. No status, property fact or access arrangement transfers automatically among them.',
    ],
    accessGuidance: 'Ask whether “Allesley Park” means the council park, surrounding residences or another managed site. Record the exact address, gate or entrance and obtain the relevant owner or manager authority before work.',
    evidenceLimits: 'The park, residential locality, village conservation area and broader HLC are separate evidence units. Area-scale medieval features and designation totals do not prove an individual building\'s status, construction, access or lock.',
    facts: [
      {
        text: 'Coventry City Council gives Allesley Park\'s address as Allesley Hall Drive, Coventry CV5 9AD and describes it as a historic park between established housing developments.',
        sourceIds: ['allesley-park-council'],
        serviceRelevance: 'Clarify whether the request concerns the council park, a nearby home or another managed property.',
      },
      {
        text: 'The HLC records the park as part of a larger medieval deer park, with surviving park-pale, ridge-and-furrow and earthworks associated with Allesley Castle.',
        sourceIds: ['allesley-coundon-hlc'],
        serviceRelevance: 'Historic landscape evidence requires exact asset and manager checks and does not describe a residential entrance.',
      },
      {
        text: 'The wider HLC contains a scheduled monument, a conservation area, 33 listed buildings and eight locally listed buildings, while locating the conservation area in Allesley Village rather than the whole park or estate name.',
        sourceIds: ['allesley-coundon-hlc'],
        serviceRelevance: 'Verify the individual asset and do not apply village conservation status to every Allesley Park address.',
      },
    ],
    sources: [
      localitySource('allesley-park-council', 'Allesley Park', 'Coventry City Council', 'https://www.coventry.gov.uk/allesleypark', 'The park\'s address, historic-park description and position between housing developments.'),
      localitySource('allesley-coundon-hlc', 'Allesley Park and Coundon Wedge Character Area, HLC Area 18', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17429/hlc-area-18-allesley-park-and-coundon-wedge-character-area', 'Medieval deer-park evidence, earthworks and wider designation totals and locations.', 'property-status'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: '“Allesley Park” can mean the council park on Allesley Hall Drive or the housing locality around it. An urgent request must name the property or park asset and identify the exact gate or doorway.',
        decision: 'The medieval deer-park earthworks do not establish current access authority. For the council park obtain the responsible manager; for a nearby home verify the occupier without transferring park status to it.',
        checks: [
          'State whether the request concerns the Allesley Hall Drive council park or a nearby property, then identify the exact gate or doorway.',
          'Obtain the park manager or verify the occupier directly; medieval earthworks and park status establish no access authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        local: 'The wider HLC records listed and scheduled assets, but its conservation area is in Allesley Village rather than automatically across Allesley Park. Check the exact building before treating heritage controls as applicable.',
        decision: 'A lock change at a council facility requires management approval, while one at a surrounding residence requires property authority. The park\'s historic designation does not identify the lock at either entrance.',
        checks: [
          'Check the exact Allesley Park building before applying listed, scheduled or Allesley Village conservation controls.',
          'Obtain council-facility or residential property approval as applicable; the park\'s historic designation identifies no existing lock.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: 'The council describes established housing around the park but gives no door-material evidence. A reported uPVC fault at a residence needs photographs and operating symptoms; a park facility must first be identified as a managed asset.',
        decision: 'Ridge-and-furrow, park-pale and castle earthworks are landscape history, not clues to a locking mechanism. Keep those features separate from inspection of the actual frame, hinges, handle and lock.',
        checks: [
          'Identify a park facility as a managed asset or record the residence photographs and operating symptoms before diagnosing the reported fault.',
          'Inspect the actual frame, hinges, handle and lock; recorded earthworks provide no clue to the locking mechanism.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'Damage described as “at Allesley Park” needs immediate clarification between the public park, a park building and a surrounding home. The correct council manager or property owner must authorise the specific opening.',
        decision: 'If temporary work could affect recorded historic earthworks or a verified designated asset, check its status and obtain property-specific guidance before work. Area-wide heritage counts are not property-specific consent.',
        checks: [
          'Distinguish the public park, a park building and a surrounding home, then identify the council manager or property owner.',
          'Verify any designated asset and obtain property-specific guidance before temporary work; area-wide heritage counts do not provide consent.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 2],
        local: 'A council park asset and a residential entrance have different approval routes, even though both may be described as Allesley Park. Obtain the responsible party\'s written requirement for the exact opening.',
        decision: 'The HLC\'s scheduled, listed and locally listed totals require individual verification; the village conservation area should not be imported into the park locality. Inspect the door set before specifying any upgrade.',
        checks: [
          'Identify whether the opening is a council park asset or residence and obtain the responsible party\'s written upgrade requirement.',
          'Verify each designation individually and inspect the door set; do not import Allesley Village conservation status into the park locality.',
        ],
      },
    },
  },
  {
    slug: 'eastern-green',
    name: 'Eastern Green',
    region: 'West Midlands',
    summary: [
      'Coventry\'s Eastern Green HLC describes a west-Coventry residential area crossed by Guphill Brook, with principal 1950s and 1960s development phases and earlier pockets on named lanes.',
      'A separate council investment page describes a proposed mixed-use extension and explicitly distinguishes it from the existing neighbourhood. Neither planning context establishes the use, status, entrance or hardware of a particular address.',
    ],
    accessGuidance: 'Capture the full address and whether it is an occupied property, construction or development site, or another managed site. Confirm the authorised contact and check exact status before visible work at an older pocket.',
    evidenceLimits: 'The existing neighbourhood, HLC boundary and 176-hectare extension site are different geographies. Development phases, brook and A45 context do not support an individual property, access, construction or lock claim.',
    facts: [
      {
        text: 'The Eastern Green HLC describes a west-Coventry residential area crossed east–west by Guphill Brook, with housing around it and farmland and Allesley Park to the north.',
        sourceIds: ['eastern-green-hlc'],
        serviceRelevance: 'Use the full address and property boundary; brook and farmland context cannot identify an entrance or owner.',
      },
      {
        text: 'The report records principal housing phases south of Broad Lane in the 1950s and north of it in the 1960s, with earlier pockets on Dial House Lane and Lower Eastern Green Lane.',
        sourceIds: ['eastern-green-hlc'],
        serviceRelevance: 'Mixed development periods require door-specific inspection and cannot establish hardware.',
      },
      {
        text: 'The council describes a 176-hectare residential-led mixed-use urban extension at the built-up area\'s western edge and states that the existing Eastern Green neighbourhood lies further south and west of the site\'s southern boundary.',
        sourceIds: ['eastern-green-investment'],
        serviceRelevance: 'Distinguish an occupied address from the extension or construction site and identify the responsible manager.',
      },
    ],
    sources: [
      localitySource('eastern-green-hlc', 'Eastern Green Character Area, HLC Area 39', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17452/hlc-area-39-eastern-green-character-area', 'Guphill Brook, surrounding land and the principal and earlier development phases.'),
      localitySource('eastern-green-investment', 'Eastern Green Coventry: key investment and development site', 'Coventry City Council', 'https://www.coventry.gov.uk/directory-record/50147/eastern-green-coventry', 'The 176-hectare extension and its distinction from the existing Eastern Green neighbourhood.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'The council distinguishes the existing Eastern Green neighbourhood from a 176-hectare extension site. A lockout instruction must identify whether it concerns an occupied address or a managed development site and name the exact entrance.',
        decision: 'Guphill Brook, Broad Lane and the nearby farmland can orient a location but do not establish occupancy. Verify the requester or construction-site contact directly before considering access.',
        checks: [
          'Distinguish an occupied Eastern Green address from the managed extension site and name the exact entrance.',
          'Verify the requester or construction-site contact directly; Guphill Brook, Broad Lane and farmland establish no occupancy or access authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        local: 'The HLC records 1950s development south of Broad Lane, 1960s development north of it and earlier lane-side pockets. These phases demonstrate variation and cannot specify the current lock at any one property.',
        decision: 'At the extension site, obtain developer or site-management approval; in the existing neighbourhood, confirm the property owner or occupier. Use the observed entrance rather than the planning site description.',
        checks: [
          'Inspect the Eastern Green entrance; recorded development phases demonstrate variation but specify no current lock.',
          'Obtain developer or site approval for the extension, or property authority in the existing neighbourhood, before replacement.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither the 1950s/1960s chronology nor the proposed mixed-use extension proves that an Eastern Green entrance is uPVC or multipoint. Record the actual door material, handle movement and key behaviour.',
        decision: 'Earlier pockets on Dial House Lane and Lower Eastern Green Lane provide historic context only. They cannot diagnose a lock, and Guphill Brook\'s route adds no mechanical evidence.',
        checks: [
          'Record the Eastern Green door material, handle movement and key behaviour; development chronology and extension plans identify no mechanism.',
          'Keep Dial House Lane, Lower Eastern Green Lane and Guphill Brook context separate from the mechanical diagnosis.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'A damaged opening on the Eastern Green extension requires the authorised site contact, while one in the existing neighbourhood requires the responsible property party. The official page explicitly separates those locations.',
        decision: 'For a site near Guphill Brook, farmland or earlier lane-side fabric, confirm boundary and property status before external temporary work. Area landscape evidence does not establish ownership or construction.',
        checks: [
          'Identify the authorised extension-site contact or existing-property controller and the exact damaged Eastern Green opening.',
          'Confirm the property boundary and status before external work near Guphill Brook or older lanes; landscape evidence establishes no ownership or construction.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 2],
        local: 'Eastern Green\'s distinct development phases and separate extension site do not support a universal upgrade. Identify the individual door set and obtain the written requirement from the owner, landlord or site manager.',
        decision: 'If an older pocket on Dial House Lane or Lower Eastern Green Lane is involved, verify its exact status before visible alteration. Its age context cannot select a lock or establish risk.',
        checks: [
          'Identify the Eastern Green door set and obtain the owner, landlord or site manager\'s written upgrade requirement.',
          'Verify any older lane-side property\'s exact status before visible alteration; age context selects no lock and establishes no risk.',
        ],
      },
    },
  },
  {
    slug: 'longford',
    name: 'Longford',
    region: 'West Midlands',
    summary: [
      'Coventry\'s JSNA places Longford within a study area containing several MSOAs and explicitly distinguishes Bell Green from the Longford part. The council separately records Longford Park on Longford Road as its largest Area Park.',
      'The park\'s river walk and paths are features of that named public asset. They do not establish the ownership, status, access route or hardware of a residential or business address elsewhere in Longford.',
    ],
    accessGuidance: 'Distinguish a Longford residential or business address from Longford Park or another managed site. Record the full address, exact gate or entrance and the person authorised to instruct work.',
    evidenceLimits: 'The JSNA is best-fit statistical geography, and the park page concerns one public asset. Neither defines every Longford property, a service-route boundary, building construction, access arrangement or lock type.',
    facts: [
      {
        text: 'The Foleshill and Longford JSNA contains the Longford, Little Heath, Foleshill West and Foleshill East MSOAs and explicitly excludes Bell Green from the Longford part used in that profile.',
        sourceIds: ['foleshill-longford-jsna'],
        serviceRelevance: 'Use the full address and do not merge Longford and Bell Green statistical geographies.',
      },
      {
        text: 'Coventry City Council locates Longford Park on Longford Road, Longford, CV6 6DW and identifies it as the city\'s largest Area Park.',
        sourceIds: ['longford-park'],
        serviceRelevance: 'Clarify whether the request concerns the public park or a separate Longford property and identify the manager where needed.',
      },
      {
        text: 'The Longford Park page describes a tree-lined river walk and footpath system alongside recreation and ecological areas.',
        sourceIds: ['longford-park'],
        serviceRelevance: 'Park paths and river context are not vehicle, property or entrance instructions for another address.',
      },
    ],
    sources: [
      localitySource('foleshill-longford-jsna', 'Foleshill and Longford place-based profile: Demographics and communities', 'Coventry City Council', 'https://www.coventry.gov.uk/facts-coventry/foleshill-longford/3', 'The JSNA\'s component MSOAs and the distinction between Longford and Bell Green.'),
      localitySource('longford-park', 'Longford Park', 'Coventry City Council', 'https://www.coventry.gov.uk/longfordpark', 'The park\'s address, Area Park status, river walk and paths.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: 'Longford Park is a named council asset on Longford Road, while the JSNA describes a wider statistical area. A lockout report should state whether it concerns the park, a home or another site and identify the exact entrance.',
        decision: 'The profile explicitly keeps Bell Green outside its Longford component, so a broad locality label can be misleading. Verify the full address and the authorised occupier or park/site manager before access.',
        checks: [
          'State whether the Longford request concerns the council park, a home or another site and identify the exact entrance.',
          'Verify the full address and authorised occupier or park manager; the statistical boundary and Bell Green distinction grant no access authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'A request at Longford Park needs the responsible council or site authority; one elsewhere on Longford Road needs the actual property controller. The park\'s status does not transfer to nearby buildings.',
        decision: 'The JSNA\'s MSOAs are statistical units and reveal no existing lock. Inspect the individual door and do not use park paths, river features or a Longford-versus-Bell Green boundary as a specification.',
        checks: [
          'Obtain council authority for Longford Park or the property controller elsewhere on Longford Road; park status does not transfer.',
          'Inspect the individual door; MSOAs, park paths, river features and the Bell Green boundary supply no replacement specification.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither the Longford statistical area nor the council park page says that a supplied door is uPVC or multipoint. Record its material, locking points and exact handle-and-key symptoms at the named entrance.',
        decision: 'A tree-lined river walk and footpath system describe recreation within Longford Park, not access to a residence or business. Obtain direct route and authority information for the actual property.',
        checks: [
          'Record the Longford entrance material, locking points and exact handle-and-key symptoms; statistical and park records identify no mechanism.',
          'Obtain property-specific directions and authority; Longford Park river walks and footpaths provide no residential or business access evidence.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2],
        local: 'Damage at Longford Park requires identification of the park structure, gate or facility and an authorised manager. Damage at a separate Longford property needs its own owner or occupier and should not inherit park assumptions.',
        decision: 'The river walk and ecological areas may affect how a park asset is managed, but they do not reveal construction or consent for temporary securing. Confirm the precise opening and site rules.',
        checks: [
          'Identify the Longford Park structure and manager, or the separate property opening and controller, without transferring park assumptions.',
          'Confirm the precise opening and site rules; river-walk and ecological records reveal neither construction nor temporary-securing consent.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'The JSNA\'s Longford and Little Heath components and exclusion of Bell Green are boundary cautions, not security evidence. An upgrade must start with the exact door and its properly authorised responsible customer.',
        decision: 'For a council park asset, obtain its written management requirement; for another address, use the owner\'s or landlord\'s instruction. Longford Park\'s river and path features cannot determine hardware.',
        checks: [
          'Start the Longford upgrade with the exact door and authorised customer; JSNA boundaries provide no security evidence.',
          'Obtain the park manager\'s written requirement or the property owner\'s instruction; river and path features determine no hardware.',
        ],
      },
    },
  },
  {
    slug: 'bell-green',
    name: 'Bell Green',
    region: 'West Midlands',
    summary: [
      'Coventry\'s JSNA treats Bell Green as one MSOA, separate from the combined Wood End, Henley Green and Manor Farm MSOA. The HLC records earlier Bell Green settlement and road history, while the council lists a named library and community hub.',
      'Those statistical, historical and facility records are different evidence units. They do not establish the use, age, designation, ownership or entrance of another Bell Green address.',
    ],
    accessGuidance: 'For a library, community hub, business or other managed site, identify the authorised contact and exact entrance. For any older-address question, verify property status rather than relying on the Bell Green Road history.',
    evidenceLimits: 'The MSOA, HLC and named library record do not share one property boundary. None proves another Bell Green property\'s use, age, designation, access route, construction or hardware.',
    facts: [
      {
        text: 'The council JSNA treats Bell Green as one MSOA and Wood End, Henley Green and Manor Farm as a separate combined MSOA, placing Bell Green in Longford ward.',
        sourceIds: ['bell-green-wehm-jsna'],
        serviceRelevance: 'Keep the statistical areas distinct and rely on the street address for the actual property.',
      },
      {
        text: 'The Alderman\'s Green HLC records possible medieval settlement at Bell Green and says Bell Green Road was recorded in the 1775 Foleshill Inclosure survey.',
        sourceIds: ['aldermans-green-hlc'],
        serviceRelevance: 'Historic road context can prompt an address-level status check but cannot establish building fabric or locks.',
      },
      {
        text: 'Coventry City Council locates Bell Green Library at Park Edge Community Hub, Roseberry Avenue, CV2 1NE.',
        sourceIds: ['bell-green-library'],
        serviceRelevance: 'A library or community-hub instruction requires its authorised manager and exact controlled opening.',
      },
    ],
    sources: [
      localitySource('bell-green-wehm-jsna', 'Bell Green and Wood End, Henley Green, Manor Farm place-based profile', 'Coventry City Council', 'https://www.coventry.gov.uk/facts-coventry/wood-end-henley-green-manor-farm-wehm-bell-green-place-based-profile/print', 'Separate Bell Green and WEHM MSOAs and Bell Green\'s ward context.'),
      localitySource('aldermans-green-hlc', 'Alderman\'s Green Character Area, HLC Area 41', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17411/hlc-area-41-aldermans-green-character-area', 'Possible medieval Bell Green settlement and Bell Green Road in the 1775 survey.'),
      localitySource('bell-green-library', 'Bell Green Library', 'Coventry City Council', 'https://www.coventry.gov.uk/directory-record/50150/bell-green-library', 'The library\'s location in Park Edge Community Hub on Roseberry Avenue.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'Bell Green Library sits within Park Edge Community Hub on Roseberry Avenue, so an access request there needs the authorised facility contact and exact controlled door. A nearby private address requires separate occupier verification.',
        decision: 'The JSNA separates Bell Green from the WEHM MSOA, but a statistical boundary still cannot prove ownership. Use the full address and do not treat Bell Green Road\'s historic record as access entitlement.',
        checks: [
          'For Park Edge Community Hub, identify the authorised facility contact and exact door; verify a nearby private occupier separately.',
          'Use the full Bell Green address; JSNA boundaries and Bell Green Road history establish neither ownership nor access entitlement.',
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        local: 'A change at the library or community hub needs its management approval; a change at a home or business needs that property\'s responsible party. The named facility does not represent all Bell Green premises.',
        decision: 'Possible medieval settlement and the 1775 record for Bell Green Road are reasons to verify exact status where visible work affects older fabric. They are not evidence that any supplied building is historic or designated.',
        checks: [
          'Obtain hub management approval or the home or business controller\'s authority; the named facility does not represent all Bell Green premises.',
          'Verify exact property status before visible work on older fabric; settlement and 1775 road history prove no designation.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither the Bell Green MSOA nor the historic road record identifies the material or mechanism of a particular entrance. Ask for the actual door, handle movement, key response and closing behaviour.',
        decision: 'If Park Edge Community Hub is involved, confirm which internal or external door and the responsible manager. Its council directory address supplies location, not a diagnosis or permission to repair.',
        checks: [
          'Record the Bell Green door material, handle movement, key response and closing behaviour; statistical and historic-road records identify no mechanism.',
          'For Park Edge Community Hub, identify the internal or external door and manager; its directory entry supplies neither diagnosis nor repair permission.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2],
        local: 'A damaged opening at Bell Green Library or Park Edge Community Hub must be distinguished from one at another Roseberry Avenue address. Identify the site manager and exact door or window before temporary securing.',
        decision: 'For an older property near Bell Green Road, check address-level status before external fixing. The possible medieval settlement and 1775 survey evidence do not prove protected fabric at the scene.',
        checks: [
          'Distinguish Bell Green Library or Park Edge Community Hub from another Roseberry Avenue address, then identify the manager and damaged opening.',
          'Check an older Bell Green Road property\'s exact status before external fixing; historic evidence proves no protected fabric at the scene.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'Bell Green and the WEHM area are separate statistical units, but neither supplies a security requirement. Obtain the exact building, entrance and written objective from the owner or authorised site manager.',
        decision: 'At the community hub, follow the facility approval route; elsewhere, verify the individual property. Bell Green Road\'s history should prompt a status check only and cannot select upgraded hardware.',
        checks: [
          'Obtain the exact Bell Green building, entrance and written objective from the owner or authorised site manager.',
          'Follow hub approval or verify the individual property; Bell Green Road history may prompt a status check but selects no hardware.',
        ],
      },
    },
  },
  {
    slug: 'courthouse-green',
    name: 'Courthouse Green',
    region: 'West Midlands',
    summary: [
      'Coventry\'s HLC records the former Courthouse Green Works and later redevelopment of that site as an out-of-town shopping centre. The council also lists Courthouse Green school on Sewall Highway with a defined admissions catchment.',
      'A former works, current retail site, school address and admissions geography are distinct. None establishes the use, ownership, boundary, entrance or hardware of another Courthouse Green property.',
    ],
    accessGuidance: 'For a school, retail site or other managed site, name the building, gate or unit and identify the authorised contact. Do not use the school catchment as a locality, property or service boundary.',
    evidenceLimits: 'The historic works/site and current school directory concern named sites. The published catchment is an admissions geography and does not prove another address\'s use, owner, construction, access or lock.',
    facts: [
      {
        text: 'The Alderman\'s Green HLC records Courthouse Green Works as a 1930s motor works west of the character area and says the site was later redeveloped as an out-of-town shopping centre.',
        sourceIds: ['aldermans-green-hlc'],
        serviceRelevance: 'Identify the present unit or property; historic works and retail redevelopment do not establish current control of an entrance.',
      },
      {
        text: 'Coventry City Council\'s school directory locates Courthouse Green at 736 Sewall Highway, CV6 7JJ.',
        sourceIds: ['courthouse-green-school'],
        serviceRelevance: 'A school request needs the authorised school contact and exact gate or door.',
      },
      {
        text: 'The directory lists a school catchment containing parts of Sewall Highway, Bell Green Road, Henley Road, Riley Square and other streets; this is an admissions geography rather than a locality boundary.',
        sourceIds: ['courthouse-green-school'],
        serviceRelevance: 'Do not infer property identity, service geography or authority from the catchment street list.',
      },
    ],
    sources: [
      localitySource('aldermans-green-hlc', 'Alderman\'s Green Character Area, HLC Area 41', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17411/hlc-area-41-aldermans-green-character-area', 'The 1930s Courthouse Green Works and later shopping-centre redevelopment.'),
      localitySource('courthouse-green-school', 'Courthouse Green: schools and contact details', 'Coventry City Council', 'https://www.coventry.gov.uk/directory-record/43078/courthouse-green', 'The school\'s Sewall Highway address and defined admissions catchment.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: '“Courthouse Green” may point to a school, a retail setting related to the former works site or another address. An urgent call should name the building, unit, gate or door and its authorised contact.',
        decision: 'The school catchment includes parts of several roads but is only an admissions geography. It cannot confirm that an address is the school, belongs to the locality or gives the caller permission to enter.',
        checks: [
          'Name the Courthouse Green building, retail unit, school gate or door and identify its authorised contact.',
          'Verify the actual address and requester; the school catchment is admissions geography and grants no entry permission.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: 'At Courthouse Green school, the council directory establishes the site address but not who may approve a lock change. Obtain the authorised school or estate contact and identify the precise controlled opening.',
        decision: 'The former 1930s motor works and later shopping-centre redevelopment do not specify hardware at a present unit. Inspect the actual door and obtain landlord or facilities permission where relevant.',
        checks: [
          'Identify the precise Courthouse Green school opening and obtain the authorised school or estate contact before replacement.',
          'Inspect the present unit\'s door and obtain landlord or facilities permission; redevelopment history specifies no hardware.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither a school catchment nor the history of Courthouse Green Works shows whether the reported entrance is uPVC or multipoint. Ask for material, handle, key and alignment details from the particular door.',
        decision: 'A retail unit and a school gate can have different management routes, which must be identified from the current premises. The HLC\'s former-use narrative cannot diagnose either mechanism.',
        checks: [
          'Record material, handle, key and alignment details from the Courthouse Green door; catchment and works history identify no mechanism.',
          'Identify the current manager for a retail unit or school gate; former-use records cannot diagnose either entrance.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'Damage at the school requires its authorised contact and exact gate or building; damage at the shopping site requires the relevant unit and facilities manager. The locality name does not distinguish those premises.',
        decision: 'The Sewall Highway catchment street list cannot locate a damaged opening or prove responsibility. Record the scene directly and keep admissions boundaries separate from temporary securing decisions.',
        checks: [
          'Identify the authorised school contact and gate, or the shopping unit and facilities manager, for the exact damaged opening.',
          'Record the Courthouse Green scene directly; the Sewall Highway catchment locates no damage and proves no responsibility.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'A school, retail unit and other Courthouse Green property each need an address-specific upgrade requirement and approver. The former motor-works history and current school directory do not supply a shared standard.',
        decision: 'Use the observed entrance and current management arrangements, not the admissions catchment or redevelopment date. Any landlord, school-estate or unit-level permission must be documented before the proposed change.',
        checks: [
          'Obtain an address-specific Courthouse Green upgrade requirement and approver for the school, retail unit or other property.',
          'Document landlord, school-estate or unit permission from current management; catchment and redevelopment records supply no shared standard.',
        ],
      },
    },
  },
  {
    slug: 'aldermans-green',
    name: 'Aldermans Green',
    region: 'West Midlands',
    summary: [
      'The Alderman\'s Green HLC describes a residential character area north-east of Coventry city centre, with the River Sowe to the east and mixed residential and industrial land to the west. It also records historic Alderman\'s Green Road.',
      'The HLC and North Sowe report give area-scale designation and river-corridor context. They do not identify an individual building\'s listed status, use, ownership, access or hardware.',
    ],
    accessGuidance: 'Use the full address, exact entrance and responsible party, particularly near the river corridor or mixed-use western edge. Verify the individual building\'s listed or local status before external alterations.',
    evidenceLimits: 'Historic-road evidence and character-area designation totals do not identify a particular property. River, residential and industrial context cannot prove use, status, construction, access or lock type at an address.',
    facts: [
      {
        text: 'The Alderman\'s Green HLC describes a residential character area north-east of Coventry city centre, bounded by the River Sowe to the east and mixed residential and industrial land to the west.',
        sourceIds: ['aldermans-green-hlc'],
        serviceRelevance: 'Confirm the property or site type and the responsible party rather than inferring them from the mixed-use edge.',
      },
      {
        text: 'The report records Alderman\'s Green Road as “Le Redway” in an early-15th-century record and as part of the 1775 landscape.',
        sourceIds: ['aldermans-green-hlc'],
        serviceRelevance: 'Historic road context is not evidence of property age, designation or installed hardware.',
      },
      {
        text: 'The North Sowe HLC places its river valley through Aldermans Green; the Alderman\'s Green HLC records three listed and fourteen locally listed buildings but no conservation area at character-area scale.',
        sourceIds: ['north-sowe-hlc', 'aldermans-green-hlc'],
        serviceRelevance: 'Check the exact building before visible work and do not infer status from area totals or lack of a conservation area.',
      },
    ],
    sources: [
      localitySource('aldermans-green-hlc', 'Alderman\'s Green Character Area, HLC Area 41', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17411/hlc-area-41-aldermans-green-character-area', 'Mixed-use and river-edge setting, historic Alderman\'s Green Road and area-scale designations.', 'property-status'),
      localitySource('north-sowe-hlc', 'North Sowe Character Area, HLC Area 26', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17438/hlc-area-26-north-sowe-character-area', 'The North Sowe river-valley route through Aldermans Green.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: 'The official character area is residential but has mixed residential and industrial land to the west and the River Sowe to the east. An urgent request must identify the actual property or site and controlled entrance.',
        decision: 'Alderman\'s Green Road\'s early documentary history gives no evidence of present occupation. Confirm the requester\'s authority, especially where an industrial or other managed site is involved.',
        checks: [
          'Identify the actual Aldermans Green property or site and entrance rather than inferring use from residential, industrial or River Sowe edge context.',
          'Confirm the requester and any managed-site contact; Alderman\'s Green Road history provides no evidence of present occupation.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'Three listed and fourteen locally listed buildings are recorded across the HLC, with no conservation area at that scale. Verify the exact property because neither the totals nor absence of an area designation determine its status.',
        decision: 'At the mixed-use western edge, obtain any site or landlord approval; elsewhere, confirm the property controller. The River Sowe boundary and road history cannot specify a replacement lock.',
        checks: [
          'Verify the exact Aldermans Green property; area-wide listed totals and no HLC-scale conservation area do not determine its status.',
          'Obtain site, landlord or property-controller approval; the River Sowe boundary and road history specify no replacement lock.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: 'Historic references to Alderman\'s Green Road as Le Redway and in the 1775 landscape do not identify modern door material. Capture the affected entrance and exact handle, key and alignment symptoms.',
        decision: 'Residential, industrial and river-edge contexts may change directions or authority checks but do not diagnose a multipoint mechanism. Inspect the actual door set rather than using the HLC description.',
        checks: [
          'Capture the Aldermans Green entrance and exact handle, key and alignment symptoms; historic road records identify no modern door material.',
          'Inspect the actual door set; residential, industrial and river-edge context cannot diagnose a multipoint mechanism.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 2],
        local: 'A damaged opening near the western mixed-use edge needs a named building and responsible manager; one near the Sowe requires the actual property boundary. The locality evidence cannot supply either automatically.',
        decision: 'Before external temporary work, check whether the building is one of the listed or locally listed assets recorded area-wide. No conservation area at HLC scale is not proof that the address has no controls.',
        checks: [
          'Name the Aldermans Green building, manager, damaged opening and boundary instead of relying on mixed-use or Sowe edge context.',
          'Check the individual listed or locally listed status before external work; no HLC-scale conservation area proves no property controls.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'Aldermans Green\'s river edge, industrial edge and historic road are not security or hardware evidence. Obtain the individual door-set details and the authorised customer\'s documented objective.',
        decision: 'Area designation totals should prompt a precise property search where visible work is proposed. After that, base the specification on the entrance itself, not the age suggested by Alderman\'s Green Road history.',
        checks: [
          'Obtain the Aldermans Green door-set details and authorised customer\'s written objective; local edges provide no security evidence.',
          'Verify exact property status before visible work, then specify from the entrance rather than historic road age.',
        ],
      },
    },
  },
  {
    slug: 'potters-green',
    name: 'Potters Green',
    region: 'West Midlands',
    summary: [
      'Coventry\'s Woodway Park HLC records historic settlement at Potters Green on Woodway Lane and earlier cottages near the present school area. The council separately lists Potters Green school on Ringwood Highway with an admissions catchment.',
      'Archaeological potential, road history and a school catchment are different evidence layers. None proves a building\'s age, construction, boundary, entrance, ownership or lock.',
    ],
    accessGuidance: 'Use the exact address and identify the authorised occupier or manager, especially for the school or another managed site. Verify property status before treating historic-settlement evidence as relevant to external work.',
    evidenceLimits: 'The HLC describes settlement and archaeological context, while the directory concerns one school and its admissions geography. These sources do not establish an individual property\'s fabric, use, status, access or hardware.',
    facts: [
      {
        text: 'The Woodway Park HLC records settlement at Potters Green on Woodway Lane with possible medieval ceramic-production associations.',
        sourceIds: ['woodway-park-hlc'],
        serviceRelevance: 'Possible archaeological context should prompt an exact site check and cannot establish a present building or lock.',
      },
      {
        text: 'The report says cottages west of the present Cardinal Wiseman schools appear on a 1778 estate survey, while Potters Green Road itself was not named on that survey.',
        sourceIds: ['woodway-park-hlc'],
        serviceRelevance: 'Historic road-area evidence does not prove the age, status or hardware of a supplied address.',
      },
      {
        text: 'Coventry City Council locates Potters Green school at Ringwood Highway, CV2 2GF and publishes a catchment including Potters Green Road, Ringwood Highway and parts of Woodway Lane.',
        sourceIds: ['potters-green-school'],
        serviceRelevance: 'A school instruction requires the authorised site contact; its admissions catchment is not a property or service boundary.',
      },
    ],
    sources: [
      localitySource('woodway-park-hlc', 'Woodway Park Character Area, HLC Area 42', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17413/hlc-area-42-woodway-park-character-area', 'Potters Green settlement, possible ceramic-production association and 1778 cottage/road context.', 'property-status'),
      localitySource('potters-green-school', 'Potters Green: schools and contact details', 'Coventry City Council', 'https://www.coventry.gov.uk/directory-record/43021/potters-green', 'The school\'s Ringwood Highway address and published admissions catchment.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        local: 'Potters Green school is a named managed site on Ringwood Highway, while its catchment includes several roads and parts of Woodway Lane. A lockout call must identify the actual building and entrance, not the catchment.',
        decision: 'The possible medieval settlement and ceramic-production association provide no access entitlement. Confirm the authorised school contact, occupier or property manager independently at the supplied address.',
        checks: [
          'Identify the actual Potters Green building and entrance rather than using the Ringwood Highway school catchment.',
          'Confirm the school contact, occupier or property manager at the address; settlement history provides no access entitlement.',
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        local: 'Cottages near the present school area appear on a 1778 survey, but this area-level history does not date or designate a specific property. Verify status before a visible change and inspect the actual door.',
        decision: 'At Potters Green school, obtain the authorised estate specification; elsewhere, confirm the owner or occupier. The Ringwood Highway catchment list cannot identify existing hardware or approve replacement.',
        checks: [
          'Verify the exact Potters Green property status and inspect its door; the 1778 cottage record dates or designates no supplied address.',
          'Obtain the school estate specification or property controller\'s approval; the Ringwood Highway catchment identifies no hardware.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither the 1778 cottage evidence nor the possible medieval Potters Green settlement establishes a door material or mechanism. Ask for the actual entrance, frame, handle action, key movement and locking-point symptoms.',
        decision: 'The school directory may locate a managed call but supplies no diagnosis. If Ringwood Highway or Woodway Lane is given through a catchment reference, verify the full property rather than assuming it is the school.',
        checks: [
          'Record the Potters Green entrance, frame, handle, key and locking-point symptoms; historic evidence establishes no door material or mechanism.',
          'Verify the full Ringwood Highway or Woodway Lane property; the school directory supplies location only, not diagnosis.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'Damage at Potters Green school requires the responsible site contact and exact gate, door or window. A property elsewhere in the admissions catchment is separate and needs its own owner or occupier.',
        decision: 'Where the opening lies near recorded historic settlement or earlier cottages, check the individual site before exterior temporary work. Archaeological potential is area context, not proof of protected fabric.',
        checks: [
          'Identify the Potters Green school contact and damaged gate, door or window, or verify the separate property controller.',
          'Check the individual site before exterior work near historic settlement; archaeological context does not prove protected fabric.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'An upgrade at the school should follow its written estate approval, while one at another Potters Green address should follow that property\'s requirement. The admissions catchment provides no shared security standard.',
        decision: 'Historic settlement and 1778 survey evidence should prompt address verification only. Inspect the complete current entrance and do not infer hardware, risk or permission from Woodway Lane or Potters Green Road history.',
        checks: [
          'Obtain written school-estate approval or the individual Potters Green property requirement; the admissions catchment supplies no shared standard.',
          'Inspect the complete entrance and use historic records only to verify the address, never to infer hardware, risk or permission.',
        ],
      },
    },
  },
  {
    slug: 'henley-green',
    name: 'Henley Green',
    region: 'West Midlands',
    summary: [
      'Coventry\'s JSNA groups Henley Green with Wood End and Manor Farm in the WEHM MSOA, separate from Bell Green. HLC evidence records development by 1967 and places Henley Green on the North Sowe corridor.',
      'The council also lists a named school and community centre on Wyken Croft. Statistics, development history, river geography and that managed facility do not establish another property\'s type, status or entrance.',
    ],
    accessGuidance: 'Confirm whether the property is private, a school or community facility, or otherwise managed, and record the authorised contact and exact entrance. Use the full address rather than a WEHM or river-corridor label.',
    evidenceLimits: 'The WEHM MSOA, HLC development history, North Sowe corridor and named school are separate evidence layers. None proves an individual address\'s property type, ownership, construction, access or lock.',
    facts: [
      {
        text: 'The JSNA groups Henley Green with Wood End and Manor Farm in the WEHM MSOA in Henley ward and treats it separately from Bell Green.',
        sourceIds: ['bell-green-wehm-jsna'],
        serviceRelevance: 'Use the street address and do not merge WEHM and Bell Green statistical areas.',
      },
      {
        text: 'The Woodway Park HLC says large areas of housing had been built at Wood End and Henley Green by 1967; the North Sowe HLC names Henley Green on the river-valley corridor.',
        sourceIds: ['woodway-park-hlc', 'north-sowe-hlc'],
        serviceRelevance: 'Broad development and river context cannot establish a door, lock or access arrangement.',
      },
      {
        text: 'Coventry City Council locates Henley Green School and Community Centre at Wyken Croft, CV2 1HQ.',
        sourceIds: ['henley-green-school-centre'],
        serviceRelevance: 'A school or community-centre instruction needs its authorised contact and exact controlled opening.',
      },
    ],
    sources: [
      localitySource('bell-green-wehm-jsna', 'Bell Green and Wood End, Henley Green, Manor Farm place-based profile', 'Coventry City Council', 'https://www.coventry.gov.uk/facts-coventry/wood-end-henley-green-manor-farm-wehm-bell-green-place-based-profile/print', 'The WEHM MSOA, ward context and separation from Bell Green.'),
      localitySource('woodway-park-hlc', 'Woodway Park Character Area, HLC Area 42', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17413/hlc-area-42-woodway-park-character-area', 'Housing development at Henley Green by 1967.'),
      localitySource('north-sowe-hlc', 'North Sowe Character Area, HLC Area 26', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17438/hlc-area-26-north-sowe-character-area', 'Henley Green on the North Sowe river-valley corridor.'),
      localitySource('henley-green-school-centre', 'Henley Green School and Community Centre', 'Coventry City Council', 'https://www.coventry.gov.uk/directory-record/43061/henley-green-school-and-community-centre', 'The school and community centre\'s Wyken Croft address.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        local: 'Henley Green School and Community Centre is a named managed site on Wyken Croft, while other Henley Green addresses sit within the WEHM statistical geography. State which property or site and controlled entrance is involved.',
        decision: 'The JSNA keeps WEHM separate from Bell Green, but that boundary gives no access authority. Verify the responsible school contact, community-centre manager or private occupier for the exact address.',
        checks: [
          'State whether the Henley Green request concerns the Wyken Croft school, community centre or another address and name the entrance.',
          'Verify the school contact, centre manager or occupier at the exact address; the WEHM boundary grants no access authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'Housing was recorded at Henley Green by 1967, but that broad date cannot specify the lock at a particular entrance. Inspect the current door and avoid treating the HLC chronology as a hardware record.',
        decision: 'At the school and community centre, obtain site approval; at another property, confirm its controller. The North Sowe corridor and WEHM label add no replacement specification.',
        checks: [
          'Inspect the current Henley Green door; the 1967 housing record supplies no lock or replacement specification.',
          'Obtain school or community-centre approval, or confirm the property controller; North Sowe and WEHM context add no specification.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'The 1967 development statement does not prove that a Henley Green entrance is uPVC or has a multipoint strip. Record the actual material, handle travel, key response and interaction with the frame.',
        decision: 'A Wyken Croft call must distinguish the named school/community site from other addresses and identify its manager. River-corridor or MSOA context cannot diagnose the affected mechanism.',
        checks: [
          'Record the Henley Green entrance material, handle travel, key response and frame interaction; the 1967 record identifies no mechanism.',
          'Distinguish the Wyken Croft school or community site and manager from other addresses; river and MSOA context cannot diagnose the fault.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'Damage at Henley Green School and Community Centre needs the authorised site contact and exact opening. A private address in WEHM needs its own owner or occupier and should not inherit facility assumptions.',
        decision: 'For a site near the North Sowe corridor, confirm the actual property boundary and access. The river-valley record and 1967 housing context provide no evidence of construction or temporary-fixing permission.',
        checks: [
          'Identify the Henley Green school or centre contact and opening, or verify the separate private property controller.',
          'Confirm the actual property boundary and access near North Sowe; river and housing records establish no construction or fixing permission.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'A school or community-centre upgrade needs its written estate requirement, while a private Henley Green property needs an owner or manager instruction. The WEHM grouping supplies no universal standard.',
        decision: 'The HLC\'s housing date and North Sowe geography should remain background only. Inspect the complete door set and verify any communal, institutional or property approval before changing hardware.',
        checks: [
          'Obtain the school or centre estate requirement, or the private Henley Green owner or manager\'s written instruction.',
          'Inspect the complete door set and verify approval; the housing date and North Sowe geography remain background only.',
        ],
      },
    },
  },
  {
    slug: 'wood-end',
    name: 'Wood End',
    region: 'West Midlands',
    summary: [
      'Coventry\'s JSNA places Wood End in the combined WEHM MSOA. The HLC records housing there by 1967 among green space, the North Sowe report names it on the river corridor, and the council lists Wood End Brookstray as a marked open-space route.',
      'Those statistical, landscape and open-space records are not property evidence. They do not identify the use, owner, construction, boundary, entrance or lock at another Wood End address.',
    ],
    accessGuidance: 'Ask whether “Wood End” refers to a private address, Wood End Brookstray or another managed site. Record the full address, exact entrance or access point and the authorised responsible person.',
    evidenceLimits: 'The WEHM geography, HLC history, North Sowe corridor and Brookstray directory record cover different units. None establishes property characteristics, ownership, service boundaries, access arrangements or hardware.',
    facts: [
      {
        text: 'The council JSNA places Wood End within the combined Wood End, Henley Green and Manor Farm (WEHM) MSOA in Henley ward.',
        sourceIds: ['bell-green-wehm-jsna'],
        serviceRelevance: 'Use the full address because an MSOA is not a property or service-route boundary.',
      },
      {
        text: 'The Woodway Park HLC says housing had been built at Wood End by 1967 and describes post-war estates among green space; the North Sowe HLC names Wood End on its river corridor.',
        sourceIds: ['woodway-park-hlc', 'north-sowe-hlc'],
        serviceRelevance: 'Development and river context cannot establish current door construction or access.',
      },
      {
        text: 'Coventry City Council records Wood End Brookstray at CV2 1BF with a 900-metre marked route on footpaths and grass.',
        sourceIds: ['wood-end-brookstray'],
        serviceRelevance: 'Clarify whether a request concerns this open space or a separate property and identify the responsible manager.',
      },
    ],
    sources: [
      localitySource('bell-green-wehm-jsna', 'Bell Green and Wood End, Henley Green, Manor Farm place-based profile', 'Coventry City Council', 'https://www.coventry.gov.uk/facts-coventry/wood-end-henley-green-manor-farm-wehm-bell-green-place-based-profile/print', 'Wood End within the combined WEHM MSOA and Henley ward.'),
      localitySource('woodway-park-hlc', 'Woodway Park Character Area, HLC Area 42', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17413/hlc-area-42-woodway-park-character-area', 'Housing at Wood End by 1967 and green-space context.'),
      localitySource('north-sowe-hlc', 'North Sowe Character Area, HLC Area 26', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17438/hlc-area-26-north-sowe-character-area', 'Wood End on the North Sowe river-valley corridor.'),
      localitySource('wood-end-brookstray', 'Wood End Brookstray', 'Coventry City Council', 'https://www.coventry.gov.uk/directory-record/57160/wood-end-brookstray', 'The open space\'s CV2 1BF record and 900-metre marked route.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'Wood End Brookstray is a named open space with a marked footpath route, while Wood End also appears in the WEHM statistical area. A lockout needs a real property address and doorway, not an open-space or MSOA label.',
        decision: 'If a managed Brookstray asset is involved, obtain the council or site contact; for a home, verify the occupier. The North Sowe corridor does not establish access authority for either.',
        checks: [
          'Give the real Wood End property address and doorway instead of a Brookstray open-space or WEHM statistical label.',
          'Obtain the Brookstray site contact or verify the home occupier; the North Sowe corridor grants no access authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'Housing at Wood End was recorded by 1967, but that development date supplies no current lock or door specification. Identify and inspect the particular opening before any replacement is proposed.',
        decision: 'A council open-space asset has a different approval route from a residence in WEHM. The 900-metre Brookstray path record and green-space history cannot authorise or define a change.',
        checks: [
          'Identify and inspect the Wood End opening; the 1967 housing record supplies no current lock or door specification.',
          'Obtain the council asset or residential approval as applicable; Brookstray path and green-space records cannot authorise a change.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        local: 'Post-war housing context does not prove that a Wood End door uses uPVC or multipoint locking. Ask for the actual entrance material, handle movement, key response and frame contact instead of relying on the 1967 date.',
        decision: 'A reference to Brookstray or the Sowe corridor may help locate a call but adds no mechanical evidence. Distinguish an open-space facility from a private address and assess its hardware directly.',
        checks: [
          'Record the Wood End entrance material, handle movement, key response and frame contact; post-war context identifies no mechanism.',
          'Distinguish a Brookstray facility from a private address and assess its hardware directly; Sowe context adds no diagnosis.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2],
        local: 'Damage at Wood End Brookstray requires the responsible site authority and exact structure, whereas damage at a residence requires the property controller. The open-space record cannot represent the wider locality.',
        decision: 'Near the Sowe corridor or green space, confirm the actual boundary and access before temporary securing. Neither the HLC nor the marked-route record describes the construction of the damaged opening.',
        checks: [
          'Identify the Brookstray site authority and structure, or the separate Wood End residence and property controller.',
          'Confirm the boundary and access near Sowe or green space; HLC and route records describe no damaged-opening construction.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'The WEHM MSOA, 1967 housing history and Brookstray route do not provide a Wood End security standard. Obtain the exact entrance and written objective from the owner or authorised asset manager.',
        decision: 'Inspect the current door set without inferring hardware from “post-war estate.” If a council open-space structure or communal asset is involved, document its management permission separately from the residential locality.',
        checks: [
          'Obtain the exact Wood End entrance and written objective from the owner or authorised asset manager.',
          'Inspect the current door set and document management permission for any council or communal asset; post-war context specifies no hardware.',
        ],
      },
    },
  },
  {
    slug: 'sowe',
    name: 'Sowe',
    region: 'West Midlands',
    summary: [
      'Coventry City Council\'s official evidence defines the River Sowe and its North and South historic-landscape corridors, not one standalone modern Sowe neighbourhood. The North Sowe report follows the river through several separately named areas.',
      'The council\'s flood guidance says the River Sowe is largely designated Main River and drains much of eastern Coventry. These are river-system facts only; a complete street address is required for every property or service decision.',
    ],
    accessGuidance: 'Require a full street address, property description, exact entrance and authorised contact. “Sowe” may refer to the river, a historic Walsgrave/Sowe reference, Sowe Common or a modern informal label, and these are not interchangeable.',
    evidenceLimits: 'No opened official source defines one standalone modern residential locality or service boundary matching the Sowe area label. River, flood-management and named-open-space evidence cannot support property, coverage, access, construction or hardware claims.',
    facts: [
      {
        text: 'The North Sowe HLC describes the Sowe River Valley east of Coventry, states that the full river course is divided into North and South character areas, and names Aldermans Green, Wood End, Bell Green, Henley Green and Walsgrave on its northern route.',
        sourceIds: ['north-sowe-hlc'],
        serviceRelevance: 'The evidence defines a river corridor through several localities, not a standalone Sowe property or service boundary.',
      },
      {
        text: 'Coventry City Council\'s flood guidance states that the River Sowe is largely designated Main River and drains much of eastern Coventry.',
        sourceIds: ['coventry-river-sowe-flooding'],
        serviceRelevance: 'Flood-management status is about the river system and cannot establish any building, ownership, entrance or lock condition.',
      },
      {
        text: 'Coventry City Council records the named Sowe Common at Woodway Lane.',
        sourceIds: ['sowe-common'],
        serviceRelevance: 'A named common is one public-site reference and must not be treated as a boundary for a wider residential locality.',
      },
    ],
    sources: [
      localitySource('north-sowe-hlc', 'North Sowe Character Area, HLC Area 26', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17438/hlc-area-26-north-sowe-character-area', 'The River Sowe valley, the split into North and South character areas, and named northern corridor localities.'),
      localitySource('coventry-river-sowe-flooding', 'Flooding advice: rivers in Coventry', 'Coventry City Council', 'https://www.coventry.gov.uk/water-management-flooding/flooding-advice/3', 'The River Sowe\'s largely Main River designation and eastern Coventry drainage context.'),
      localitySource('sowe-common', 'Sowe Common', 'Coventry City Council', 'https://www.coventry.gov.uk/directory-record/57167/sowe-common', 'The named Sowe Common public-space record at Woodway Lane.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        local: 'Official sources define the River Sowe corridor through Aldermans Green, Wood End, Bell Green, Henley Green and Walsgrave, but not a standalone modern Sowe neighbourhood. A lockout must therefore begin with a full street address and actual entrance.',
        decision: 'A reference to Sowe Common on Woodway Lane or to the river is not proof of a private property or access authority. Identify the real building and person entitled to control it before proceeding.',
        checks: [
          'Begin a Sowe request with the full street address and actual entrance; official sources define a river corridor, not one neighbourhood.',
          'Identify the real building and authorised controller; Sowe Common and river references prove neither private property nor access authority.',
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: 'The North and South Sowe character areas describe the river course, not a uniform stock of doors or locks. No replacement can be specified from the name “Sowe” without an exact address and door inspection.',
        decision: 'If Sowe Common or another managed riverside asset is involved, obtain its responsible authority. The River Sowe\'s Main River status concerns flood management and supplies no property permission or hardware requirement.',
        checks: [
          'Inspect the exact Sowe address and door; North and South river character areas describe no uniform lock stock.',
          'Obtain authority for Sowe Common or another managed asset; Main River status supplies no property permission or hardware requirement.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'River-corridor and flood-management evidence cannot show that a reported Sowe entrance is uPVC, composite or multipoint. Record the actual street address, material, handle movement, key response and frame interaction.',
        decision: 'The five named northern-corridor localities illustrate the ambiguity of “Sowe.” Resolve that ambiguity before diagnosis, and keep the Sowe Common directory record separate from any residential or business door.',
        checks: [
          'Record the Sowe street address, door material, handle movement, key response and frame interaction before identifying the mechanism.',
          'Resolve whether Sowe means a named locality, Common or river context; keep those records separate from the mechanical diagnosis.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: 'A damaged opening reported only as “Sowe” cannot be located safely from the official evidence. Establish whether the caller means a property in a named neighbourhood, a riverside asset or Sowe Common, then identify the opening.',
        decision: 'Main River status and eastern-Coventry drainage context do not establish land ownership or permission for a temporary fixing. Obtain the exact property or site authority and keep flood-management evidence within its limited purpose.',
        checks: [
          'Establish whether Sowe means a named-neighbourhood property, riverside asset or Sowe Common, then identify the damaged opening.',
          'Obtain the exact property or site authority; Main River and drainage records grant no temporary-fixing permission.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'No standalone Sowe neighbourhood profile supports an area-based upgrade recommendation. The River Sowe sources provide corridor and flood-management facts only, so the individual entrance and written customer requirement are essential.',
        decision: 'For Sowe Common or another managed public asset, obtain the relevant manager; for a street address, verify its actual locality and controller. Do not convert the river route into a risk, property or hardware claim.',
        checks: [
          'Obtain the individual Sowe entrance and written customer requirement; river sources provide corridor and flood-management facts only.',
          'Verify the public-asset manager or street-address controller; never convert the river route into a risk or hardware claim.',
        ],
      },
    },
  },
  {
    slug: 'little-heath',
    name: 'Little Heath',
    region: 'West Midlands',
    summary: [
      'Coventry\'s JSNA includes Little Heath as one MSOA in its Foleshill and Longford study geography. The Foleshill HLC records a medieval common, later roadside settlement and former industrial sites in the wider area.',
      'The council also lists Little Heath school on Spring Road with an admissions catchment. Statistical, historic, industrial and school evidence do not prove a particular building\'s use, construction, entrance or lock.',
    ],
    accessGuidance: 'Distinguish a residential instruction from the named school, former or active managed land, and use the full address rather than a catchment or MSOA label. Verify caller or site-manager authority for the exact entrance.',
    evidenceLimits: 'The historic common, HLC industrial context, Little Heath MSOA and school catchment are different evidence layers. None establishes an individual property\'s use, age, ownership, construction, access or hardware.',
    facts: [
      {
        text: 'The Foleshill and Longford JSNA explicitly includes Little Heath as one of four MSOAs in its study geography.',
        sourceIds: ['foleshill-longford-jsna'],
        serviceRelevance: 'An MSOA is statistical geography and cannot identify a property, entrance, owner or service route.',
      },
      {
        text: 'The Foleshill HLC records a medieval common called Little Heath, later roadside settlement associated with mid-19th-century ribbon weaving, and former industrial sites within the wider character area.',
        sourceIds: ['foleshill-hlc'],
        serviceRelevance: 'Historic settlement and industry should prompt exact property verification, not assumptions about current use or hardware.',
      },
      {
        text: 'Coventry City Council locates Little Heath school on Spring Road, CV6 7FN and publishes a defined admissions catchment street list.',
        sourceIds: ['little-heath-school'],
        serviceRelevance: 'A school request requires the authorised site contact; its catchment is not a locality or property boundary.',
      },
    ],
    sources: [
      localitySource('foleshill-longford-jsna', 'Foleshill and Longford place-based profile: Demographics and communities', 'Coventry City Council', 'https://www.coventry.gov.uk/facts-coventry/foleshill-longford/3', 'Little Heath as an MSOA within the JSNA study geography.'),
      localitySource('foleshill-hlc', 'Foleshill Character Area, HLC Area 24', 'Coventry City Council', 'https://www.coventry.gov.uk/downloads/file/17449/hlc-area-24-foleshill-character-area', 'The medieval common, roadside settlement and former industrial sites associated with Little Heath.'),
      localitySource('little-heath-school', 'Little Heath: schools and contact details', 'Coventry City Council', 'https://www.coventry.gov.uk/directory-record/43049/little-heath', 'The school\'s Spring Road address and published admissions catchment.'),
    ],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: 'Little Heath school is a named site on Spring Road, while Little Heath also appears as an MSOA and historic common. A lockout call must identify the real building, gate or doorway rather than use any of those broader labels.',
        decision: 'For the school or another managed site, confirm the authorised contact; for a residence, verify the occupier. The admissions catchment and medieval-common history confer no right of entry.',
        checks: [
          'Identify the real Little Heath building, gate or doorway rather than using the school, MSOA or historic-common label.',
          'Confirm the school contact or residence occupier; admissions catchment and medieval-common history confer no entry right.',
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        local: 'The HLC records roadside settlement and former industrial sites in the wider Little Heath context, but that history does not identify a current lock. Inspect the individual entrance and verify its present use.',
        decision: 'A change at Little Heath school requires school or estate approval, while another Spring Road property is separate. The catchment street list cannot specify hardware or transfer authority.',
        checks: [
          'Inspect the Little Heath entrance and verify its present use; settlement and former-industry history identify no current lock.',
          'Obtain school estate approval or the separate Spring Road property authority; the catchment specifies no hardware.',
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: 'Neither the mid-19th-century ribbon-weaving context nor the MSOA proves that a Little Heath door is uPVC or multipoint. Ask for the actual material, handle action, key movement and frame behaviour.',
        decision: 'If the school is named, establish which controlled opening and manager are involved; if a former industrial site is referenced, verify its current use. Historical land use cannot diagnose the mechanism.',
        checks: [
          'Record the Little Heath door material, handle action, key movement and frame behaviour; historical context identifies no mechanism.',
          'Identify the school opening and manager or verify the former industrial site\'s current use before diagnosis.',
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2],
        local: 'Damage at Little Heath school needs the responsible site contact and precise door or window. Damage at a residence or managed industrial site needs its own authority and must not be located through the school catchment.',
        decision: 'The medieval common and former industrial sites are area history, not evidence of present construction or ownership. Confirm the exact scene and any property-specific controls before exterior temporary work.',
        checks: [
          'Identify the Little Heath school contact and opening, or verify the separate residential or managed-site authority.',
          'Confirm the exact scene and property controls before external work; common and industrial history establish no present construction or ownership.',
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: 'Little Heath\'s MSOA, school catchment and historic landscape do not provide a local security specification. Begin with the individual entrance and a written requirement from the authorised owner or site manager.',
        decision: 'At the school, follow the facility approval route; elsewhere, verify current property use rather than inferring it from former industry or roadside settlement. Inspect the complete door set before comparing hardware.',
        checks: [
          'Begin with the Little Heath entrance and a written requirement from the authorised owner or site manager.',
          'Follow school approval or verify the property\'s current use, then inspect the door set without inferring from former land use.',
        ],
      },
    },
  },
]

const COVENTRY_GUIDES = Object.fromEntries(
  AREA_SEEDS.map((seed, index) => [seed.slug, buildGuide(seed, index)]),
) as Record<CoventryAreaSlug, GovernedAreaGuide>

export const COVENTRY_AREA_GUIDES: Partial<Record<AreaSlug, GovernedAreaGuide>> = COVENTRY_GUIDES
