// Evidence-governed service-area content.
//
// A pair is indexable only when it has an explicit record in this file. Missing
// area/service pairs are intentionally redirected to their canonical area hub.
// Local claims below are limited to what the linked primary sources support;
// technical advice is phrased conditionally because a town name does not prove
// the construction, lock type, planning status, or access arrangements at a
// particular address.

import {
  EVIDENCE_REVIEWED_ON,
  TECHNICAL_EVIDENCE_SOURCES,
  type EvidenceSource,
} from './locksmith-evidence.ts'
import { SERVICE_AREA_SLUGS, type ServiceAreaSlug } from './service-area-types.ts'
import type { AreaSlug } from './area-authorities.ts'

export { SERVICE_AREA_SLUGS }
export type { ServiceAreaSlug }

export type { EvidenceSource } from './locksmith-evidence'

interface LocalServiceNote {
  heading: string
  body: string
  details: [string, string]
  checks: string[]
  faq: { q: string; a: string }
}

interface AreaEvidenceProfile {
  slug: AreaSlug
  name: string
  summary: string
  planningNote: string
  contactPrep: string
  contextGuidance: string[]
  faqScope: [string, string, string]
  priceScope: string
  metaDifferentiator: string
  sources: EvidenceSource[]
  serviceNotes: Record<ServiceAreaSlug, LocalServiceNote>
}

export interface TownServiceContent {
  service: ServiceAreaSlug
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string[]
  localAngleHeading: string
  localAngleBody: string
  commonJobs: string[]
  faqs: { q: string; a: string }[]
  priceNote: string
  evidenceSummary: string
  contextGuidance: string[]
  preparationSteps: string[]
  sources: EvidenceSource[]
  reviewedOn: string
}

const REVIEWED_ON = EVIDENCE_REVIEWED_ON
const TECHNICAL_SOURCES = TECHNICAL_EVIDENCE_SOURCES

const AREA_SOURCES: Record<string, EvidenceSource> = {
  'visit-nuneaton': {
    id: 'visit-nuneaton',
    title: 'Nuneaton',
    publisher: 'Warwickshire County Council',
    url: 'https://visit.warwickshire.gov.uk/towns-villages/nuneaton',
    supports: 'Nuneaton town-centre, industrial-heritage, canal, rail and road context.',
    checkedOn: REVIEWED_ON,
  },
  'nbbc-conservation': {
    id: 'nbbc-conservation',
    title: 'Supplementary Planning Documents',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/downloads/download/106/supplementary-planning-documents',
    supports: 'The council lists adopted conservation-area appraisals for Nuneaton Town Centre and Bedworth.',
    checkedOn: REVIEWED_ON,
  },
  'visit-bedworth': {
    id: 'visit-bedworth',
    title: 'Bedworth',
    publisher: 'Warwickshire County Council',
    url: 'https://visit.warwickshire.gov.uk/towns-villages/bedworth',
    supports: 'Bedworth rail, canal, green-space and industrial-heritage context.',
    checkedOn: REVIEWED_ON,
  },
  'bedworth-appraisal': {
    id: 'bedworth-appraisal',
    title: 'Bedworth Conservation Area Appraisal and Management Plan',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/downloads/file/681/bedworth-conservation-area-appraisal-and-management-plan-supplementary-planning-document-2022-',
    supports: 'The adopted 2022 appraisal and management plan for Bedworth Conservation Area.',
    checkedOn: REVIEWED_ON,
  },
  'visit-rugby': {
    id: 'visit-rugby',
    title: 'Rugby',
    publisher: 'Warwickshire County Council',
    url: 'https://visit.warwickshire.gov.uk/towns-villages/rugby',
    supports: 'Rugby town-centre, Market Place, railway, Georgian and Victorian townscape context.',
    checkedOn: REVIEWED_ON,
  },
  'rugby-conservation': {
    id: 'rugby-conservation',
    title: 'Conservation areas and character appraisals',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/pl/w/conservation-areas-and-character-appraisals',
    supports: 'The borough lists 19 conservation areas, including Rugby Town Centre and several named local centres.',
    checkedOn: REVIEWED_ON,
  },
  'visit-leamington': {
    id: 'visit-leamington',
    title: 'Royal Leamington Spa',
    publisher: 'Warwickshire County Council',
    url: 'https://visit.warwickshire.gov.uk/towns-villages/royal-leamington-spa',
    supports: 'The Parade, Regency townscape, river, rail and town-centre context.',
    checkedOn: REVIEWED_ON,
  },
  'warwick-district-conservation': {
    id: 'warwick-district-conservation',
    title: 'Conservation',
    publisher: 'Warwick District Council',
    url: 'https://www.warwickdc.gov.uk/info/20377/conservation',
    supports: 'Property-status checks and conservation-area appraisals for Leamington Spa, Warwick and Kenilworth.',
    checkedOn: REVIEWED_ON,
  },
  'visit-warwick': {
    id: 'visit-warwick',
    title: 'Warwick',
    publisher: 'Warwickshire County Council',
    url: 'https://visit.warwickshire.gov.uk/towns-villages/warwick',
    supports: 'Warwick town-centre, medieval, timber-framed and Georgian townscape context.',
    checkedOn: REVIEWED_ON,
  },
  'visit-kenilworth': {
    id: 'visit-kenilworth',
    title: 'Kenilworth',
    publisher: 'Warwickshire County Council',
    url: 'https://visit.warwickshire.gov.uk/towns-villages/kenilworth',
    supports: 'Kenilworth Old Town, High Street, Castle Hill, rail and road context.',
    checkedOn: REVIEWED_ON,
  },
  'visit-stratford': {
    id: 'visit-stratford',
    title: 'Stratford-upon-Avon',
    publisher: 'Warwickshire County Council',
    url: 'https://visit.warwickshire.gov.uk/towns-villages/stratford-upon-avon',
    supports: 'Stratford town-centre, medieval street pattern, timber-framed buildings, rail and park-and-ride context.',
    checkedOn: REVIEWED_ON,
  },
  'stratford-conservation': {
    id: 'stratford-conservation',
    title: 'Conservation Areas',
    publisher: 'Stratford-on-Avon District Council',
    url: 'https://www.stratford.gov.uk/planning-building/conservation-areas.cfm',
    supports: 'The district conservation-area register and the current Stratford-on-Avon appraisal review.',
    checkedOn: REVIEWED_ON,
  },
}

const serviceNotes = (
  emergency: LocalServiceNote,
  change: LocalServiceNote,
  upvc: LocalServiceNote,
  boarding: LocalServiceNote,
  upgrade: LocalServiceNote,
): Record<ServiceAreaSlug, LocalServiceNote> => ({
  'emergency-lockout': emergency,
  'lock-change': change,
  'upvc-lock-repair': upvc,
  'boarding-up': boarding,
  'lock-upgrade': upgrade,
})

const AREA_PROFILES: Record<string, AreaEvidenceProfile> = {
  nuneaton: {
    slug: 'nuneaton',
    name: 'Nuneaton',
    summary: 'Warwickshire County Council describes Nuneaton as a north-Warwickshire market town shaped by ribbon weaving, coal mining and brickmaking. Its official guide identifies the town centre, River Anker, Coventry Canal and railway junction as distinct parts of the local setting.',
    planningNote: 'Nuneaton and Bedworth Borough Council separately lists an adopted Nuneaton Town Centre Conservation Area appraisal. That status applies to the defined area, not every CV11 address, so the exact property and proposed work must be checked before assuming planning or heritage constraints.',
    contactPrep: 'For a town-centre or station-side address, give the exact entrance, floor and any controlled-access instructions when calling. For a house, a clear photo of the outside handle and door edge usually identifies more than the postcode alone.',
    contextGuidance: [
      'The county guide places Nuneaton around the River Anker, Coventry Canal and a rail junction, with a town centre and neighbourhoods extending beyond it. Those features are useful for confirming which entrance and access route a caller means, particularly where a building has street, rear or shared access. They are not evidence that a locksmith is already nearby, so the live ETA is confirmed from the actual starting point before a booking is accepted.',
      'The borough council lists a specific Nuneaton Town Centre Conservation Area appraisal. A central address should therefore be checked against the council record before visible historic fabric is altered, but work on a lock component is not automatically the same as replacing a door or changing a frontage. The decision depends on the mapped address, property status and proposed work, with council advice used where those facts make it relevant.',
      'Nuneaton\'s industrial and transport history does not identify a modern customer\'s door. A useful remote description separates timber, uPVC, composite and communal entrances; records visible faceplate markings; and explains whether the key, handle and locking points move. That evidence narrows the inspection without converting a CV11 location, building appearance or neighbouring property into an unsupported lock specification.',
      'For a central Nuneaton building, confirm whether the caller controls the street door, an internal unit or both. A leaseholder, tenant, shop occupier and managing agent may each have authority over different hardware. This is especially important before changing a shared lock, ordering access-system parts or fixing a temporary board. Proof of a connection to the affected entrance protects the customer and neighbours as well as the locksmith.',
      'Keep the local and mechanical evidence separate in the quote. The Nuneaton sources can support town-centre and conservation context; the inspection supports the fault and part choice; the customer supplies access authority and any written policy. Recording those strands makes it clear when a price covers entry only, when keys or parts are additional, and when a council, owner, glazier or door specialist must make the next decision.',
    ],
    faqScope: [
      'For Nuneaton, the actual entrance and any mapped town-centre status are checked separately; neither the CV11 label nor industrial history identifies the hardware or method.',
      'A Nuneaton communal or commercial threshold also needs authority from the person responsible for that opening, even when the caller can prove a connection to an internal unit.',
      'The Nuneaton record should separate the agreed attendance, parts, keys and follow-on work, while any council, police, owner or insurer requirement remains attributable to its own source.',
    ],
    priceScope: 'A central building with several thresholds may need a separate authority and access check for each affected door.',
    metaDifferentiator: 'town-centre and CV11 property guidance',
    sources: [AREA_SOURCES['visit-nuneaton'], AREA_SOURCES['nbbc-conservation']],
    serviceNotes: serviceNotes(
      {
        heading: 'Lockout decisions for Nuneaton town-centre and CV11 addresses',
        body: 'Nuneaton\'s official town guide identifies a busy rail-connected centre as well as residential streets extending beyond it. That makes the entrance type more useful than a broad postcode: say whether the problem is a private front door, a shared block entrance, a shop door, or an internal flat door. If the address is within the town-centre conservation area, a careful opening method helps preserve the existing door and frame, but conservation status does not guarantee that any lock can be opened without drilling. Proof that you are entitled to enter is still required.',
        details: [
          `The county guide verifies a Nuneaton centre shaped by the River Anker, Coventry Canal and railway junction. For a lockout, those features help distinguish the intended building and threshold when a caller can see more than one entrance; they do not diagnose the lock. Preparation should identify the full address, whether the affected door faces the street or an internal route, and whether it serves only the caller or several occupiers. That lets the locksmith verify the caller's connection to the correct opening before examining key movement, handle position, deadlocking and any earlier damage.`,
          `The borough record identifies a defined Nuneaton Town Centre Conservation Area rather than a rule for every CV11 property. If the locked door may form part of that mapped frontage, the first inspection should record the existing door, frame and visible furniture before an opening method is selected. A low-damage option can be considered where the hardware and failure allow it, but property context cannot promise that result. If entry would require cutting or replacing visible material, the proposed scope should be separated from immediate access and referred for property-specific advice before that extra work proceeds.`,
        ],
        checks: ['Identify the exact entrance if the address has shared or rear access', 'Photograph the keyway, outside handle and door edge if it is safe to do so', 'Keep identification or another proof of connection to the address available'],
        faq: { q: 'Does Nuneaton town-centre conservation status change a lockout?', a: 'It can make avoiding unnecessary damage to an older door especially important, but the status applies only within the mapped conservation area and does not identify the lock type. The lock and door are assessed on site, and any destructive step should be explained before it is taken.' },
      },
      {
        heading: 'Repairing or replacing a lock in Nuneaton without guessing the door type',
        body: 'Nuneaton includes a historic town-centre conservation area and substantial development outside it. A CV11 postcode therefore cannot tell a locksmith whether the door is timber, uPVC, composite or part of a managed building. The useful first step is to identify the failed component: cylinder, nightlatch, mortice case, handle, keep or multipoint mechanism. At a protected property, ask the council about consent if the proposed solution would alter the external door or its character; a lock-body or cylinder decision should still be based on the actual door, written policy requirements and available certification.',
        details: [
          `Nuneaton's documented industrial and transport history describes the town, not the hardware at an address. A lock-change enquiry should therefore arrive with a photograph of both sides of the handle set, the door edge and any faceplate lettering, together with the reason for the change. Lost key control, a mechanism that binds and a damaged case lead to different diagnostic questions. On inspection, the cylinder, lock body, keep and alignment can be assessed separately, so a sound door or mechanism is not automatically included in the replacement scope merely because one component has failed.`,
          `For an address in the council's mapped town-centre conservation area, preparation also includes identifying whether the affected item is concealed within the door or visibly contributes to the frontage. That distinction helps preserve existing material while the mechanical remedy is considered. Where a shared street door is involved, the person responsible for that threshold should confirm the permitted scope before keys or components are changed. The written next step can then specify what will be retained, what dimensions and markings support a compatible replacement, and whether any proposed alteration to visible fabric needs separate advice from the council or building controller.`,
        ],
        checks: ['Confirm whether the problem is failure, lost keys, a move, or planned upgrading', 'Check the door material and every marking visible on the lock faceplate', 'Separate a like-for-like lock change from any proposal to replace or alter the door'],
        faq: { q: 'Do all Nuneaton town-centre lock changes need planning permission?', a: 'No blanket rule can be inferred from the town name. The council maps a defined conservation area, and listed status or an Article 4 direction can create different controls. Check the exact address and the scope of work with the council if the external appearance or historic fabric would change.' },
      },
      {
        heading: 'uPVC lock diagnosis for Nuneaton addresses',
        body: 'Local heritage information does not establish that a particular Nuneaton door is uPVC. If it is, describe the symptom before ordering parts: whether the handle lifts, the key turns with the door open, the hooks move, or the door needs to be pulled into the frame. Those observations help distinguish alignment, cylinder, handle and gearbox faults. On a managed flat or commercial unit near the centre, also confirm whether the problem affects the private door or a shared entrance, because communal systems may need authority from the owner or managing agent.',
        details: [
          `The county source confirms Nuneaton's centre, canal and rail setting, but none of those facts establishes that a particular entrance uses a multipoint system. Preparation for this repair should begin with the actual door: record whether it is uPVC or composite, photograph the full faceplate, and describe the order in which the key, handle and locking points stop moving. If the door is already open safely, comparing operation before and after it meets the frame can help the inspection distinguish alignment from an internal mechanism fault without ordering a gearbox solely from a postcode or streetscape.`,
          `A central Nuneaton property may also fall inside the separately mapped conservation area or form part of a managed building. Those are distinct checks. Property status matters if diagnosis expands into cutting, replacing or visibly altering the door; management responsibility matters when the hardware belongs to a common entrance rather than a private unit. The next-step record should therefore name the threshold, observed symptom, measurements still required and person controlling the hardware. A compatible cylinder, handle or mechanism can then be considered from physical evidence, while any change to protected external material remains a separate property-specific decision.`,
        ],
        checks: ['Test the lock gently with the door open only when it is already safe and accessible', 'Do not keep forcing a handle that has become stiff or stopped lifting', 'Send the faceplate markings and a full-height photo of the door edge where possible'],
        faq: { q: 'Does an older Nuneaton building rule out a uPVC lock repair?', a: 'No. The age or status of the surrounding building does not prove the material of a later door. The actual door and mechanism must be identified, and any heritage or management restriction is checked separately from the mechanical repair.' },
      },
      {
        heading: 'Boarding damaged openings in Nuneaton while preserving evidence',
        body: 'For burglary damage, police guidance takes priority over speed of repair: report the incident, photograph the damage, and avoid disturbing possible evidence unless officers advise otherwise. Nuneaton\'s town-centre conservation appraisal is also relevant when a damaged opening forms part of a protected frontage. Boarding is a temporary security and weather measure, not a claim that the original frame, glazing or door has been permanently repaired. The board position and fixings should be chosen to minimise further damage while leaving a clear record for the owner, police, glazier or insurer.',
        details: [
          `Nuneaton's official guide identifies a town centre alongside the River Anker, canal and railway setting, so an incident description should identify the damaged opening rather than rely on a nearby feature. Before boarding, record whether the damage is to a street-facing window, door panel, complete door or another threshold, and follow police directions about contact with the scene. Photographs should capture the opening, surrounding frame, displaced hardware and material that will be covered. This creates a usable baseline for selecting a temporary arrangement without treating locality information as evidence about the cause, structure or remaining strength of the opening.`,
          `If the opening is within the council's Nuneaton Town Centre Conservation Area, the appraisal is a prompt to check the exact property and preserve surviving external fabric. The temporary fixing plan should distinguish sound material from damaged or sacrificial material and avoid enlarging the permanent repair unnecessarily. Boarding can then be documented by dimensions, board position, fixings and any lock or glazing defect left unresolved. That record gives the owner, glazier, joiner or door specialist a clear next-step brief, while questions about protected material are referred separately instead of being answered from the CV11 address alone.`,
        ],
        checks: ['Follow police instructions before moving broken glass or touching the entry point', 'Record whether the opening is a window, door panel, full door or shopfront', 'Tell the locksmith if the property is listed, managed or within the mapped conservation area'],
        faq: { q: 'Should a broken Nuneaton shopfront be boarded before police attend?', a: 'Follow the police instructions for the incident. Warwickshire Police advises photographing damage and preserving possible evidence; when another person secures the property, it advises working carefully and securing doors or windows from outside. Emergency danger always comes before property work.' },
      },
      {
        heading: 'A door-by-door security review for Nuneaton',
        body: 'An area name is not a lock specification. Across Nuneaton, the correct upgrade depends on the actual door, frame, cylinder projection, hinges and how the door is used. Warwickshire Police advises checking the complete entrance and using correctly sized, accredited products. In the mapped town-centre conservation area, retainable historic fabric may change the practical options, while a modern multipoint door needs its cylinder, handle and mechanism considered together. Any insurance requirement should come from the customer\'s current written policy, not a generic claim about CV11 homes.',
        details: [
          `The county guide's account of Nuneaton's industrial past and transport setting provides no shortcut to an upgrade specification. Preparation should instead capture the complete working entrance: door material, frame condition, hinges, keeps, handle protection, lock markings and any cylinder projection. How the door closes and how each locking point engages should be observed before a product is proposed. This door-by-door diagnosis separates a sizing problem, worn component or frame weakness from a broader replacement decision, and it allows any independently certified option to be discussed for the hardware actually present rather than attributed to Nuneaton homes generally.`,
          `Within the mapped Nuneaton Town Centre Conservation Area, an upgrade review should also record which visible elements appear integral to the frontage and which components can be accessed without disturbing them. The council record establishes the need for an address check, not the answer for a particular door. If the proposed work would cut older material or alter outward appearance, that part can be paused for property-specific guidance while compatible internal options are assessed separately. The resulting specification should state retained fabric, verified dimensions, product evidence and any unresolved frame or authority question so the next decision has a traceable basis.`,
        ],
        checks: ['Inspect the complete door and frame rather than rating the cylinder in isolation', 'Measure cylinder projection before choosing a replacement', 'Check written insurance wording and any property-specific heritage controls'],
        faq: { q: 'Which security standard is right for a Nuneaton home?', a: 'There is no town-wide answer. Warwickshire Police discusses accredited products and correctly sized cylinders, but the choice depends on the actual door and any written policy requirement. A protected or managed property may also have separate constraints.' },
      },
    ),
  },
  bedworth: {
    slug: 'bedworth',
    name: 'Bedworth',
    summary: 'Warwickshire County Council describes Bedworth as a town between Coventry and Nuneaton with rail links, the Coventry Canal, Miners\' Welfare Park and an industrial history in ribbon weaving and mining. Those are verified place facts; they do not establish the lock fitted at any particular address.',
    planningNote: 'Nuneaton and Bedworth Borough Council has an adopted 2022 Bedworth Conservation Area appraisal and management plan. Check the mapped boundary and the property itself before treating heritage guidance as relevant to a repair or replacement.',
    contactPrep: 'Bedworth addresses can have canal-side, town-centre, estate or managed-building access. Give the complete address and explain whether the affected entrance is private, communal, front, rear or reached from a service yard.',
    contextGuidance: [
      'The official Bedworth guide records the town\'s position between Coventry and Nuneaton, together with its railway, Coventry Canal and Miners\' Welfare Park context. For a service call, the safe operational use of that information is address confirmation: give the full postcode, building name where applicable, correct entrance and any access instructions. It should never be converted into a guaranteed journey time; current traffic, the locksmith\'s starting point and site access all matter.',
      'Bedworth has a council-published conservation appraisal dated 2022. The document concerns a defined conservation area and its character, not every property in CV12. If proposed work would affect an external door, shopfront or older material within that boundary, property status and the alteration should be checked. A cylinder, lock case, frame repair and full-door replacement are materially different scopes and should not be described as interchangeable.',
      'Canal, railway and industrial-history references establish place context but not the type or condition of a lock. Before a Bedworth visit, observable symptoms are more useful: whether a key enters and turns, whether a handle lifts, whether a multipoint door works while open, and whether damage followed an incident. Photos and markings support a component-first diagnosis while leaving final compatibility and safe method to the on-site inspection.',
      'At a Bedworth flat or business, say which threshold has failed and who can approve work to it. The front of a building, a resident\'s door and a rear service entrance may not share an owner or a system. That distinction prevents a private lock booking from being mistaken for communal access work and gives the managing agent or landlord a chance to confirm fire-door and key-control requirements before hardware is disturbed.',
      'A clear Bedworth scope should record the reported symptom, what the inspection finds, the chosen repair or temporary measure, parts and keys supplied, and any work still outstanding. The conservation appraisal can inform care around a defined frontage, but it cannot certify security or compatibility. Police, insurer and owner instructions also remain separate evidence; none should be claimed from a town guide or a postcode.',
    ],
    faqScope: [
      'At a Bedworth address, the mapped conservation context and the mechanical condition are separate checks; photos and inspection matter more than the CV12 label for choosing a method or part.',
      'Where a Bedworth entrance is shared, managed or fire-rated, the responsible owner or agent should confirm authority and any building-specific requirement before a change is made.',
      'A Bedworth estimate should identify labour, components, keys, adjustment and unresolved permanent work so that locality context is not mistaken for a fixed outcome or all-inclusive promise.',
    ],
    priceScope: 'Rear, private and common entrances are scoped separately whenever different people control the affected hardware.',
    metaDifferentiator: 'Bedworth conservation and access guidance',
    sources: [AREA_SOURCES['visit-bedworth'], AREA_SOURCES['bedworth-appraisal']],
    serviceNotes: serviceNotes(
      {
        heading: 'Getting the right entrance open in Bedworth',
        body: 'Bedworth\'s official guide highlights a compact town, railway, canal and connected walking routes. For a lockout, the practical issue is the exact entrance rather than the general CV12 location. A rear door near a canal-side route, a shared block entrance and a private timber front door require different authority and access checks. If the address lies within the council\'s mapped conservation area, preserving an existing door may be particularly important, but the safest opening method still depends on the lock in front of the locksmith. Identification or proof of connection should be ready.',
        details: [
          `The county guide establishes Bedworth's position between Coventry and Nuneaton, with railway and Coventry Canal context. During a lockout, those facts are useful for confirming which property and entrance the caller means, especially where a building has front, rear and shared thresholds. Preparation should state the full address, door position, floor if relevant and the caller's relationship to that precise opening. The locksmith can then separate a communal access problem from a private lock failure and inspect the actual keyway, handle and door condition only after the authority check relates to the correct entrance.`,
          `Bedworth's adopted 2022 conservation appraisal applies to a defined area, so it changes preparation only after the address is checked against that boundary. If the locked entrance contributes to the mapped frontage, existing surfaces and hardware should be recorded before a method is chosen. The priority is to avoid unnecessary disturbance while remaining clear that the lock's construction and condition determine what is technically possible. When opening would require cutting or replacement beyond the immediate access task, that new scope should be explained, documented and separated for property-specific owner or council guidance where visible material could be affected.`,
        ],
        checks: ['State whether access is from the street, rear passage, car park or shared hall', 'Say whether the door merely closed or the key/lock failed', 'Have proof of address, tenancy or owner authority available'],
        faq: { q: 'Can conservation status tell you how a Bedworth lock will open?', a: 'No. It can flag that the door or frontage deserves extra care, but it does not reveal the lock construction. The exact property boundary, door, lock and failure still need to be assessed.' },
      },
      {
        heading: 'Bedworth lock changes: identify the component before replacing it',
        body: 'The council\'s conservation appraisal covers a defined part of Bedworth, while the wider town contains many other settings. Avoid choosing a replacement from the postcode or building age alone. A lost-key cylinder change, failed nightlatch repair and mortice case replacement are different jobs. Where an external historic door may be affected, check whether the work changes protected fabric or appearance. Where it is a managed building, confirm who authorises work to communal hardware. The agreed specification should name the product, keys supplied, labour and any necessary adjustment.',
        details: [
          `Bedworth's verified railway, canal and industrial-history context cannot identify a lock case or cylinder. A useful change request starts with why key control or operation needs to change, followed by images of the door edge, handles and visible markings. During diagnosis, the locksmith should test whether the fault belongs to the lock, cylinder, keep or alignment before defining replacement work. That sequence preserves serviceable components and prevents a general CV12 description from becoming a parts assumption. It also produces the measurements needed to describe a compatible component and the number of keys within the proposed scope.`,
          `The borough's 2022 appraisal makes the mapped property and proposed alteration relevant when external Bedworth fabric may be involved. A concealed component change and a cut to visible door material should be documented as different decisions. For a communal threshold, the building representative who controls that hardware should also be identified before the keying arrangement changes. The final next-step note can show the observed failure, components retained, exact item proposed and any frame adjustment still under consideration. If appearance or historic material would be altered, that element remains pending property-specific guidance rather than being inferred from conservation-area context alone.`,
        ],
        checks: ['Identify the failed or compromised component instead of assuming a whole-door replacement', 'Confirm who owns or manages any communal entrance', 'Check the mapped conservation status before changing external fabric'],
        faq: { q: 'Is a new door normally required for a Bedworth lock change?', a: 'A lock problem does not by itself prove that the door needs replacing. The lock, door and frame should be assessed separately, with any conservation or management constraint checked for the exact address.' },
      },
      {
        heading: 'Diagnosing a Bedworth multipoint or euro-cylinder fault',
        body: 'A Bedworth address does not prove a door is uPVC or composite, so start with observable symptoms. A mechanism that works with the door open but not closed points to a different investigation from a key that will not turn at all. Note whether the handle lifts, whether the door has dropped, and whether the cylinder projects beyond the handle. For a flat or managed entrance, distinguish the resident\'s own door from the shared entry system before booking, because ownership, fire-safety and authority arrangements may differ.',
        details: [
          `Although the official guide records Bedworth's canal, rail and industrial setting, it supplies no evidence about a door's material or multipoint manufacturer. Preparation should name the affected threshold and describe the failure in sequence: key insertion, rotation, handle lift, movement of hooks or rollers, and the point at which the sash meets the frame. A full-height faceplate image and visible code can guide the inspection, but final measurements remain necessary. Comparing open and closed behaviour only when safe helps decide whether to investigate alignment, cylinder, handle or gearbox before any compatible part is proposed.`,
          `For a Bedworth flat or business, the private door and shared entry system may sit under different control even within one building. That authority boundary should be established before a multipoint case, cylinder or handle is removed. If the address is within the adopted conservation area, a second check asks whether the repair remains within later hardware or would affect visible external fabric. The next-step record should keep those findings separate: mechanical symptoms and measurements support part selection, the responsible person confirms the threshold in scope, and the mapped property context determines whether a proposed alteration needs separate guidance.`,
        ],
        checks: ['Describe what changes when the door is tested open versus closed', 'Record visible faceplate names or codes without dismantling the door', 'Confirm whether the lock is private or part of a shared entrance system'],
        faq: { q: 'Can you select a Bedworth uPVC gearbox from the postcode?', a: 'No. Multipoint systems use different backsets, centres, faceplates and locking layouts. Markings and measurements from the actual mechanism are needed before a compatible part can be confirmed.' },
      },
      {
        heading: 'Temporary boarding for Bedworth homes and premises',
        body: 'After a forced entry or smashed pane, protect people first and follow police instructions about the scene. Warwickshire Police advises photographing the damage and avoiding contamination of areas that may hold evidence. Bedworth\'s mapped conservation area adds a property-specific question: whether temporary fixings could damage a protected frontage. A board should reduce access and weather exposure until a glazier, door specialist or owner arranges the permanent repair; it should never be described as making an opening impossible to breach.',
        details: [
          `Bedworth's official locality record distinguishes the town through its railway, canal and civic green-space setting, but an incident report still needs the exact opening. Before temporary work, identify whether damage affects a window, glazed panel, door leaf, frame or shared frontage, and follow police instructions about preserving the scene. Photographs taken before covering should show the damaged component, surrounding material and any displaced lock hardware. Those observations guide board dimensions and handling while leaving questions about the event and the remaining structure to the appropriate evidence and later specialist assessment, not to assumptions drawn from location.`,
          `Where the opening falls inside Bedworth's adopted conservation area, the 2022 appraisal prompts an address and fabric check before temporary fixings are selected. Existing sound material should be distinguished from broken sections so the board does not unnecessarily enlarge the permanent repair. A completion record should identify dimensions, support points, materials covered and defects left visible or unresolved. That information prepares the next glazier, joiner or door specialist to inspect what remains. Any question about changing protected frontage material can then be referred with photographs and a defined proposal rather than answered from the CV12 postcode.`,
        ],
        checks: ['Report criminal damage and preserve evidence as police direct', 'Measure the opening and note whether the surrounding frame remains sound', 'Flag conservation, listed or landlord control before fixings are chosen'],
        faq: { q: 'Is boarding the permanent repair for a damaged Bedworth door?', a: 'No. It is a temporary measure intended to secure and protect the opening. The door, frame, glazing and locks still need a separate permanent-repair decision.' },
      },
      {
        heading: 'Bedworth security upgrades based on the actual entrance',
        body: 'Industrial history, a conservation area and modern transport links describe Bedworth, but none specifies a resident\'s lock. A useful upgrade review measures the cylinder, checks handles and hinges, confirms that a multipoint mechanism engages correctly, and looks at the door-frame fixing. On a timber door it may instead involve a mortice lock, nightlatch and frame reinforcement. If an address is inside the mapped conservation area, the least disruptive compliant option may be preferable. The customer\'s written policy remains the authority on any insurance condition.',
        details: [
          `Bedworth's industrial past and transport links are verified place facts, not evidence that one security product fits its entrances. The review should begin by documenting how the particular door closes, which locking points engage, the condition of hinges and keeps, and any cylinder projection or frame weakness. Door material and marked hardware then determine which product categories can sensibly be compared. This preparation makes the diagnosis specific enough to distinguish adjustment, reinforcement and component replacement, while independently certified options can be considered for their tested properties without implying that a certification removes every route of forced entry.`,
          `The council's conservation appraisal adds a preservation step for addresses inside its mapped Bedworth boundary. Visible furniture, door surfaces and frame material should be photographed before the upgrade scope is drawn, allowing retainable elements to be separated from components that can be changed without altering the frontage. If cutting or a visible substitution is proposed, obtain property-specific guidance before that part proceeds. The upgrade note should state actual measurements, product evidence, retained fabric and the person responsible for any shared threshold. Unresolved frame, fire-door or heritage questions remain explicit next steps rather than being concealed within a general security package.`,
        ],
        checks: ['Match the product to the door construction and measured dimensions', 'Check the frame, keeps and hinges as well as the lock', 'Separate police crime-prevention guidance from insurer-specific requirements'],
        faq: { q: 'Does every Bedworth home need the same anti-snap cylinder?', a: 'No. Some doors do not use euro cylinders, and cylinder size and surrounding hardware matter. Inspect the complete entrance and check any written policy wording before choosing an upgrade.' },
      },
    ),
  },
  rugby: {
    slug: 'rugby',
    name: 'Rugby',
    summary: 'Warwickshire County Council\'s official guide describes Rugby\'s Market Place, railway, Rugby School area, Georgian and Victorian buildings and later growth. Rugby Borough Council lists 19 separate conservation areas, including Rugby Town Centre, Rugby School and several nearby local centres.',
    planningNote: 'Those conservation areas have defined boundaries. A Rugby address, CV21 postcode or older-looking door is not enough to decide whether special controls apply; check the council map and the exact work proposed.',
    contactPrep: 'For a central address, include the street, building name, floor and access route. Outside the centre, describe the door and lock rather than relying on a broad Rugby or CV21 label.',
    contextGuidance: [
      'Warwickshire\'s official guide describes Rugby\'s Market Place, railway role and a townscape containing Georgian and Victorian buildings. That mix makes precise identification more reliable than assuming one lock type from the town name. A caller can help by distinguishing a private house door, flat entrance, shared door or commercial frontage and by stating whether the problem is access, mechanical failure, damage or a planned security review.',
      'Rugby Borough Council publishes a register of conservation areas and character appraisals, including the town centre. The register is a prompt to check the exact address where visible external work or historic material may be involved; it does not make every central door protected, and it does not dictate a lock product. Listed status, conservation controls, fire-door duties, management rules and insurance wording are separate questions that should be checked with the relevant authority.',
      'Rail and central-market references may help describe an address, but they do not justify an arrival promise. The current ETA is given only after the full postcode, entrance and starting point are known. For the technical decision, photographs of both sides of the hardware and the full door edge are stronger evidence than architectural age. Measurements and markings are confirmed before a compatible cylinder, lock case or multipoint component is promised.',
      'In a central Rugby building, establish whether the affected door belongs to the public frontage, a shared circulation route or a private occupier. Permission to enter a unit does not necessarily authorise changes to a communal lock, and a fire-rated door can carry separate duties. Giving the building name, floor, contact person and entrance position at the outset makes the visit more precise without making unsupported assumptions about the premises.',
      'The service record should distinguish what Rugby\'s locality sources establish from what the locksmith observes. Council material can identify a mapped conservation context; photos and inspection identify the hardware; written owner or policy documents set customer-specific requirements. The quote can then name labour, parts, keys, adjustment and follow-on work, avoiding a vague town-price promise or a claim that one certified product solves every entrance.',
    ],
    faqScope: [
      'For Rugby, town-centre or conservation context prompts an address check but does not specify the lock; the door, markings, measurements and reported symptom provide the mechanical evidence.',
      'A Rugby shared entrance may be controlled by a manager or freeholder, so private occupancy alone does not automatically authorise work to communal, master-keyed or fire-rated hardware.',
      'The Rugby work record should show what was inspected, retained and supplied, with policy, planning and follow-on specialist questions recorded separately rather than implied by the town name.',
    ],
    priceScope: 'Building name, entrance position and management responsibility can change the scope even when the outward code is the same.',
    metaDifferentiator: 'Rugby town-centre and conservation guidance',
    sources: [AREA_SOURCES['visit-rugby'], AREA_SOURCES['rugby-conservation']],
    serviceNotes: serviceNotes(
      {
        heading: 'Rugby lockouts: separate town-centre access from the lock fault',
        body: 'Rugby\'s official guide identifies a rail-connected centre, Market Place and historic streets around Rugby School. In a lockout, say whether the problem is the street-facing door, a shared entrance, an internal flat door or an outlying house. That avoids treating a building-access issue as a private lock fault. Several Rugby conservation areas are separately mapped, so an older door should be handled carefully, but no locality can guarantee non-destructive entry. The lock type, existing damage, deadlocking and proof of authority determine the lawful, proportionate opening approach.',
        details: [
          `The county guide verifies Rugby's Market Place, railway and historic townscape, so a central lockout must be prepared around the named building and threshold rather than the town label. The caller should identify whether the locked point is a street door, common entrance, internal unit or house door and who controls it. That information lets the locksmith check authority for the correct opening before diagnosing whether the door merely closed, was deadlocked or suffered a key or mechanism failure. Architectural surroundings can clarify location, but the observed lock and door condition determine which opening options can be considered.`,
          `Rugby Borough Council lists 19 separate conservation areas, which makes the exact mapped boundary important. If a locked door may form part of one of those areas, photograph its existing face, frame and furniture before any method that could mark or remove material is agreed. Preservation is a planning input, not a prediction that the lock can be opened in one particular way. If access cannot be achieved without a destructive step, explain the proposed intervention separately and decide whether immediate entry can be limited while the owner or council addresses any additional change to visible protected fabric.`,
        ],
        checks: ['Name the precise entrance and any concierge or managing-agent contact', 'Explain whether the key is lost, trapped, turning, or snapped', 'Check the Rugby Borough map if the door forms part of a protected frontage'],
        faq: { q: 'Are all older doors near Rugby School in the same conservation area?', a: 'No assumption should be made from proximity alone. Rugby Borough Council publishes separate mapped conservation areas, and the exact address and work need checking.' },
      },
      {
        heading: 'Lock repair and replacement across Rugby\'s varied townscape',
        body: 'The official sources confirm historic central buildings and multiple conservation areas, not a single Rugby-wide door type. Before replacing anything, identify whether the fault sits in a cylinder, lever lock, nightlatch, handle, keep or multipoint case. At a protected frontage, retaining serviceable fabric and using a compatible lock may be preferable to altering the door. At a modern entrance, dimensions and certification may be the main questions. A quote should distinguish repair, product replacement, extra keys and any door alignment so the scope is clear.',
        details: [
          `Rugby's documented Georgian and Victorian townscape sits alongside later growth, so building period cannot select a replacement lock. Preparation should capture the reason for intervention, photographs of the hardware on both faces, the door edge and all readable markings. The inspection can then isolate a worn cylinder, lock case, nightlatch, keep or alignment problem before deciding whether repair or replacement is justified. Recording dimensions and key-control needs at this stage produces a defined component scope and avoids treating Market Place context, a CV21 code or the apparent age of neighbouring buildings as a mechanical diagnosis.`,
          `Because the borough identifies multiple conservation areas rather than one Rugby-wide designation, property status must be checked at the address where visible work is contemplated. A compatible internal component may present a different preservation question from cutting the door edge or replacing external furniture. For a shared building, the controller of that threshold should also confirm the intended keying and hardware scope. The written next step should list what inspection found, what remains serviceable, the marked replacement under consideration and any alteration held for council or building-specific guidance, keeping conservation and mechanical decisions traceable but separate.`,
        ],
        checks: ['Read the lock faceplate and measure only after the door is safely open', 'Check whether a repair or adjustment resolves the fault before replacing parts', 'Confirm conservation or listed status for work that changes external fabric'],
        faq: { q: 'Does a Rugby conservation area prevent a lock replacement?', a: 'Not automatically. Controls depend on the exact property and work. A like-for-like internal mechanism change is different from replacing or materially altering a protected external door, so check the council when the fabric or appearance may change.' },
      },
      {
        heading: 'uPVC and composite-door checks for Rugby',
        body: 'Rugby\'s mixture of historic and later development means the town name cannot identify a mechanism. On an actual uPVC or composite door, note whether the key turns when open, whether the handle reaches its normal position, and whether hooks or rollers line up with their keeps. A dropped door can overload a sound gearbox; a failed cylinder can mimic a mechanism fault. Identifying that distinction before parts are ordered reduces avoidable replacement. Shared entrances also require confirmation of ownership and any fire-door responsibilities.',
        details: [
          `The official Rugby guide confirms both historic buildings and later town growth, which is precisely why locality cannot prove that an affected door is uPVC or composite. Remote preparation should show the complete door edge and faceplate and describe whether the key and handle behave differently while the door is open and when it meets the frame. During inspection, those observations support separate checks of sash alignment, keeps, cylinder, handles and gearbox. Backset, centres and locking layout still require measurement before compatibility is stated, preventing the broad architectural character of Rugby from becoming an unsupported parts catalogue.`,
          `A Rugby multipoint repair also needs two non-mechanical checks when relevant. First, the borough's separate conservation maps should be consulted if the proposed repair would extend into visible external material; being near Rugby School or Market Place is not enough. Second, the responsible person must be identified when the door serves common circulation rather than one private occupier. The next-step note should therefore record the exact threshold, property-status result, observed movement and dimensions. It can then distinguish adjustment from component investigation and reserve any alteration to protected or shared fabric for a separately authorised, property-specific decision.`,
        ],
        checks: ['Compare operation open and closed without forcing the handle', 'Photograph the whole faceplate and every visible marking', 'Tell the locksmith if the door is communal, fire-rated or managed'],
        faq: { q: 'Do Rugby\'s newer districts all use the same multipoint lock?', a: 'No. Door age or neighbourhood does not establish the manufacturer or dimensions. The faceplate, centres, backset and locking points on the actual door must be identified.' },
      },
      {
        heading: 'Burglary boarding in Rugby: evidence first, temporary work second',
        body: 'Warwickshire Police advises photographing damage, preserving possible forensic evidence and securing a damaged door or window from outside where possible. That sequence is important in Rugby whether the opening is at a home, flat or business. In a mapped conservation area, fixings also need to avoid unnecessary damage to the surrounding frontage. Boarding reduces immediate access and weather exposure; it does not replace structural, glazing or joinery work, and it should be documented so the permanent repairer can see what was covered.',
        details: [
          `Rugby's Market Place and historic central streets can help identify a premises, but the boarding plan must start with the precise damaged opening. Following police directions, take photographs that show the point of entry, surrounding frame, glazing, lock and any material that will disappear beneath a board. State whether the opening belongs to a private unit, shared threshold or frontage so the responsible person can be identified before fixings are placed. These observations support a temporary design and preserve a useful record without drawing conclusions about the incident, construction or remaining strength from the building's location.`,
          `Rugby Borough Council's register requires an address-specific check because the borough contains 19 distinct conservation areas. Where damaged material lies inside a mapped boundary, the temporary arrangement should protect surviving frontage and use support points selected from what the inspection finds, not from the area's name. Record board size, fixing positions, covered components and any compromised door or frame section. That handover allows a glazier, joiner or door specialist to plan the permanent stage and gives the owner a defined proposal if council advice is needed before removing or altering visible historic material.`,
        ],
        checks: ['Follow the attending force\'s instructions before repairs begin', 'Photograph frame, glass, lock and surrounding damage', 'Record the temporary materials, fixings and remaining permanent work'],
        faq: { q: 'Can boarding start immediately after a Rugby burglary?', a: 'Only when it is safe and consistent with police instructions. Preserve possible evidence first, then secure the opening in the way advised for the scene.' },
      },
      {
        heading: 'Choosing a Rugby lock upgrade without postcode assumptions',
        body: 'Rugby Borough\'s separate conservation areas and the town\'s mix of building periods call for an entrance-by-entrance review. Warwickshire Police advises looking at the door, frame, hinges and correctly sized cylinder, not only a product label. A timber final-exit door, a modern multipoint door and a managed flat entrance need different assessments. If a written insurance policy names a standard, match the marked product and installation to that wording; do not assume every Rugby property has the same requirement.',
        details: [
          `Rugby's verified Georgian, Victorian and later development makes a whole-entrance survey more informative than any town-wide upgrade label. The review should document door and frame material, hinge and keep condition, lock engagement, handle protection and cylinder fit where a cylinder is present. Product markings and measurements then support comparison with independently certified options suited to that specific construction. An upgrade can improve resistance within its tested scope, but the diagnosis should still identify alignment or surrounding-frame issues that a new lock alone would not address and should avoid projecting one door's needs across CV21.`,
          `The council's 19 conservation areas create several possible property contexts, so the upgrade plan must record which boundary, if any, contains the address. On a protected frontage, visible furniture and retainable material should be photographed before proposing cuts or substitutions. A managed entrance also requires the person responsible for common hardware to define the allowable scope. The resulting specification should distinguish adjustment, reinforcement and product replacement, cite dimensions and certification, and list any external-fabric or fire-door question as a separate next step. That keeps local character relevant to preservation without using it as evidence of existing security.`,
        ],
        checks: ['Inspect door, frame, hinges, keeps, handles and cylinder together', 'Use measured, independently evidenced product specifications', 'Check property controls and written policy wording before work is agreed'],
        faq: { q: 'Is a three-star cylinder the answer for every Rugby door?', a: 'No. Warwickshire Police discusses correctly sized cylinders and accredited products, but not every door uses a euro cylinder. The complete entrance and actual policy requirements must be assessed.' },
      },
    ),
  },
  'leamington-spa': {
    slug: 'leamington-spa',
    name: 'Royal Leamington Spa',
    summary: 'Warwickshire County Council describes Royal Leamington Spa\'s centre around the Parade as a Regency townscape beside the River Leam. Warwick District Council publishes conservation guidance and appraisals for Leamington Spa and provides a property-status search.',
    planningNote: 'Regency character does not mean every CV31 or CV32 address is listed or within one control regime. Check the property search and the scope of any external alteration before drawing a planning conclusion.',
    contactPrep: 'For a central flat, shop or converted building, identify the private and communal entrances separately and provide floor or access details. For other addresses, send door and lock photographs rather than relying on the Leamington label.',
    contextGuidance: [
      'The county guide identifies the Parade, Regency townscape, River Leam and railway as elements of Royal Leamington Spa. For a locksmith booking, this is useful context only when it clarifies the building and correct entrance. A street-facing shop door, a shared converted-building entrance and a resident\'s private flat door can involve different ownership and access permissions even when they share a central address.',
      'Warwick District Council provides conservation information, appraisals and a property-status search. The responsible step is to check the particular Leamington address when visible door furniture, external appearance or older fabric could change. Conservation status alone neither proves that a door is historic nor prevents all repair. A concealed mechanism repair, like-for-like component and replacement external door should be treated as different proposals rather than placed under one blanket rule.',
      'Regency character cannot be used to guess whether the working entrance has a mortice lock, nightlatch, euro cylinder or multipoint mechanism. Describe the door material, access arrangements and exact symptom; photograph markings and the door edge; and identify any managing agent or fire-door status. This gives the customer a more useful initial scope while keeping part selection, consent and safe method tied to evidence from the actual property.',
      'For a Leamington conversion or block, identify the boundary between communal and private responsibility before booking a change. The resident may control the flat lock while a freeholder or managing agent controls the main entrance, closer, intercom or master-key arrangement. This authority check is separate from conservation status and prevents work on one threshold from being presented as a solution for a different shared-access problem.',
      'A useful Leamington work record identifies the reported failure, inspection result, retained components, supplied parts, key quantity and any adjustment. The district property search can inform a question about protected fabric, but it does not prove a mechanical diagnosis or policy compliance. If glazing, joinery, access control or listed-building advice is still required, that next step should remain visible rather than being hidden inside a broad locksmith claim.',
    ],
    faqScope: [
      'In Royal Leamington Spa, Regency surroundings and the district property search inform care around fabric, but the working entrance still needs its own hardware and condition assessment.',
      'For a Leamington flat or conversion, communal and private locks can have different owners, fire duties and permissions, which should be established before any shared component is changed.',
      'The Leamington quote should distinguish diagnosis, labour, parts, keys and remaining joinery or glazing, while an insurer or council remains responsible for confirming its own written requirement.',
    ],
    priceScope: 'Communal access, private-door work and protected external fabric remain distinct items where they involve different responsibilities.',
    metaDifferentiator: 'Regency-centre and property-status guidance',
    sources: [AREA_SOURCES['visit-leamington'], AREA_SOURCES['warwick-district-conservation']],
    serviceNotes: serviceNotes(
      {
        heading: 'Leamington lockouts in private, shared and historic entrances',
        body: 'The official visitor guide identifies the Parade and surrounding Regency centre, while the council provides address-level conservation checks. If you are locked out, explain whether the affected door is a private flat entrance, a communal door, a shopfront entrance or a house door. Shared access may require a managing agent, and a protected door may justify extra care with existing fabric. Neither point guarantees a particular opening technique: the locksmith must inspect the lock, confirm authority and explain any destructive step before proceeding.',
        details: [
          `The county guide verifies the Parade, River Leam and Regency centre as parts of Royal Leamington Spa's setting. For a central lockout, that context makes entrance identification more important than an architectural label. The caller should provide the building, floor and exact locked threshold and say whether a separate common door remains accessible. This prepares the locksmith to establish the caller's connection to a private flat, shared entrance, shopfront or house door before testing the actual lock. Key movement, handle position, deadlocking and prior damage then guide the opening assessment; Regency surroundings do not reveal those facts.`,
          `Warwick District Council's property search provides the relevant address-level check when a Leamington door appears to form part of older external fabric. Before selecting an opening method, record the door face, frame, visible furniture and any later additions. That evidence helps minimise avoidable disturbance while leaving the technical decision to the hardware and failure found. If entry would require cutting or replacing a visible component, describe that step separately from gaining access. The owner or council can then address any property-specific preservation question without treating every CV31 or CV32 doorway as subject to the same status.`,
        ],
        checks: ['Confirm whether another communal or secondary entrance is also affected', 'Use the council property search when the door appears historic or protected', 'Have identification, tenancy evidence or owner authority ready'],
        faq: { q: 'Does a Regency Leamington door always need a specialist opening method?', a: 'The townscape alone is not enough to identify the door or lock. Check the actual property status and hardware; the aim is to avoid unnecessary damage while being honest that some failed or high-security locks may require a destructive method.' },
      },
      {
        heading: 'Leamington lock changes that respect the actual building',
        body: 'A lock change on the Parade or another protected frontage may raise different questions from a cylinder change elsewhere in Leamington. First identify what is being changed and why: key control after a move, mechanical failure, a damaged lock, or a planned security upgrade. Then check the door material, markings, dimensions and council property status. A lock can often be addressed without replacing the door, but no consent assumption should be made for work that alters historic fabric or external appearance. Managed and fire doors need their own approval and safety checks.',
        details: [
          `Leamington's official Regency description cannot determine whether the working lock is original, later or part of a converted building. Preparation should state the reason for changing it and provide images of both handle faces, the edge plate and the wider door. Inspection can then separate key-control needs from a fault in the cylinder, case, keep or alignment. This component-first sequence protects serviceable material and establishes the measurements for a compatible proposal. It also avoids assuming that a Parade address, riverside setting or period-looking facade dictates a particular lock type or requires the complete door to be replaced.`,
          `The district property search becomes relevant if the proposed Leamington work could alter visible fabric. Record whether the component sits within the door, changes external furniture or requires fresh cutting, because those scopes have different preservation implications. In a conversion or block, identify who controls the private threshold and who controls any common door before the keying arrangement is changed. A clear next-step schedule should state what remains, what is proposed, the dimensions and markings supporting compatibility, and any frontage or fire-door question awaiting property-specific guidance from the responsible council, owner or building specialist.`,
        ],
        checks: ['Separate key-control, repair and security objectives', 'Check property status before cutting or replacing external fabric', 'Confirm management and fire-door responsibilities in converted or purpose-built flats'],
        faq: { q: 'Can a lock be changed on a listed Leamington property?', a: 'Possibly, but the answer depends on the exact property and proposed alteration. Warwick District Council provides a property-status search; seek its advice where historic fabric or external appearance may change.' },
      },
      {
        heading: 'Diagnosing a Leamington uPVC door without assuming its age',
        body: 'Leamington\'s Regency identity says nothing about a particular replacement or rear door. If the actual door is uPVC or composite, describe the mechanical symptom: key movement, handle travel, hook engagement, rubbing or a gap around the sash. Test open-versus-closed operation only gently. A shared flat entrance may not be a domestic uPVC system at all and can involve management or fire-safety controls. Photos of the faceplate and full door edge are more reliable than an estimate based on the street or period of the building.',
        details: [
          `A Regency townscape beside the River Leam is verified local context, but it does not date a rear or replacement door. For a claimed uPVC fault, preparation should capture the whole sash and frame, the full faceplate and any maker's code, then describe what changes between open and closed operation when testing is safe. The locksmith can use that sequence to examine alignment, keeps, cylinder movement, handle travel and the multipoint case separately. Measurements remain essential before a gearbox or other component is named, preventing the age of the main building from substituting for evidence from the working entrance.`,
          `In a Leamington flat or converted building, a later uPVC door may be private while the prominent Regency-facing entrance is communal, or the reverse may apply; neither arrangement follows from locality alone. The booking should identify the exact threshold and the person responsible for its hardware. If a repair would extend beyond internal multipoint parts into visible external material, use the district property search and describe that extra scope before proceeding. The repair note can then separate mechanical findings, authority and property status, stating measurements still required and any management, fire-door or conservation question that controls the next decision.`,
        ],
        checks: ['Do not infer the mechanism from the age of the main building', 'Record operation with the door open and closed where safe', 'Distinguish a private rear/replacement door from the main communal entrance'],
        faq: { q: 'Can a uPVC repair be carried out in a Leamington conservation area?', a: 'Conservation status and mechanical repair are separate questions. Identify the actual door and property status first, and ask the council if proposed work would alter protected external fabric or appearance.' },
      },
      {
        heading: 'Boarding a damaged Leamington opening without losing evidence',
        body: 'For forced entry or vandalism, photograph the damage and follow police instructions before the scene is disturbed. This is especially important at a shared entrance or shopfront where several parties may need the record. In Leamington\'s protected centre, temporary fixings should also avoid needless harm to historic surrounds. Boarding can reduce access and weather exposure, but the owner still needs a permanent glazing, joinery, door or frame repair. Document what was covered and any compromised lock so that follow-on work is properly scoped.',
        details: [
          `Leamington's Parade and Regency centre can help identify a damaged premises, but the technical preparation begins with the individual opening. Follow police directions, then photograph the glazing or door, remaining frame, lock damage and surrounding material before anything is covered. For a shared entrance or shopfront, record which person controls the frontage and which users depend on the threshold. This evidence guides the temporary dimensions and supports a later diagnosis without asserting what caused the damage or whether hidden structure remains sound. The river, railway and town-centre setting do not answer those site-specific questions.`,
          `Where Warwick District Council's search shows relevant property status, the board design should preserve as much surviving Leamington frontage material as the inspected opening permits. Fixing positions, backing surfaces and vulnerable decorative elements should be recorded before installation, particularly where later repairers will need to see what was concealed. The handover should list board size, covered damage, compromised hardware and outstanding glazing, joinery, door or structural assessment. If removal or alteration of older external fabric is contemplated, that proposal can be referred separately with photographs rather than being treated as an automatic consequence of temporary boarding.`,
        ],
        checks: ['Preserve the point of entry as police advise', 'Confirm ownership or managing-agent authority for shared frontages', 'Record conservation status and the condition of surrounding fabric'],
        faq: { q: 'Is a Leamington shopfront board enough for reopening?', a: 'Boarding is only a temporary security measure. The business owner, landlord, insurer and permanent repairer still need to decide when the frontage is safe and compliant for normal use.' },
      },
      {
        heading: 'Leamington upgrades for timber, multipoint and managed doors',
        body: 'Warwickshire Police recommends considering the whole entrance: door, frame, hinges, lock and surrounding hardware. That is particularly useful in Leamington, where an address may be in a Regency building, a later house, a managed conversion or a modern block. A marked mortice lock, correctly sized cylinder or accredited door product solves different problems. Property-status and fire-door checks can constrain alterations, while an insurer\'s current written wording determines any policy condition. The town or postcode alone decides none of these.',
        details: [
          `The county source confirms Leamington's Regency centre but does not assign a construction to any individual entrance. An upgrade survey should document whether the affected door is private or common, then inspect the frame, hinges, keeps, lock engagement, handles and cylinder fit where relevant. Markings and measurements provide the basis for comparing suitable independently certified products. This complete-entrance approach can reveal when alignment, surrounding timber or management requirements must be addressed before hardware selection, and it avoids presenting a mortice lock, euro cylinder or multipoint option as appropriate merely because the address is in a particular Leamington street.`,
          `For an address returned by Warwick District Council's property search, preparation includes photographs of visible furniture, door faces and frame details that the proposed upgrade might affect. Retaining sound material can then be considered alongside the mechanical objective, while any new cut or external substitution is isolated for property-specific advice. In a managed conversion, the responsible person should define the shared threshold and any fire-door constraints. The final specification should name observed weaknesses, verified dimensions, product evidence, retained elements and unresolved specialist questions, providing a sequenced decision record rather than one broad recommendation for every Regency or CV32 property.`,
        ],
        checks: ['Identify whether the door is historic, managed, fire-rated or privately controlled', 'Measure and inspect before choosing a standard or product', 'Ask the council or manager where the change affects protected or shared fabric'],
        faq: { q: 'What is the best lock for a Leamington flat?', a: 'There is no single answer. The flat entrance may be a fire door or part of a managed building, and the existing lock, door certification and escape requirements must be checked before an upgrade.' },
      },
    ),
  },
  warwick: {
    slug: 'warwick',
    name: 'Warwick',
    summary: 'Warwickshire County Council describes Warwick as a historic county town with medieval timber-framed buildings and Georgian brick frontages. Warwick District Council publishes a conservation property search and appraisals for Warwick.',
    planningNote: 'Historic character is concentrated in defined places and does not prove that every CV34 door is protected. Listed status, conservation boundaries and the exact alteration must be checked separately.',
    contactPrep: 'For the historic centre, provide the exact street, entrance and access restrictions. Elsewhere, describe the door construction, lock markings and whether the problem is private or communal.',
    contextGuidance: [
      'Warwickshire\'s guide describes Warwick through its medieval, timber-framed and Georgian townscape. That evidence supports care around older fabric, but it also shows why a town-wide lock assumption is unreliable. A caller should identify the exact building and entrance, explain whether the door appears old or is a later replacement, and state who controls the opening when it serves flats, a business or a managed property.',
      'The district council\'s conservation pages provide appraisals and an address-level property search. Use those records before proposing work that could affect a protected frontage or historic material. They do not replace inspection of the lock and door, and they do not mean every repair needs the same permission. Visible alteration, listed-building considerations, fire performance and managing-agent authority each have their own scope.',
      'A complete Warwick assessment records the door, frame, hinges, keeps, lock body and any cylinder rather than treating a branded component as the whole entrance. For a fault, note what happens with the door open and closed without forcing it. For damage, follow police evidence instructions first. For an upgrade, bring the current written policy or management requirement so the proposal can be tested against an actual document instead of a generic location claim.',
      'Within Warwick\'s historic centre, describe the entrance material and its relationship to the frontage before temporary or permanent work is proposed. Fixing a board to sacrificial material, adjusting a lock, cutting a keep and replacing a complete door have different effects. The safest appropriate option can be discussed only after the remaining frame and authority are known; the townscape description alone cannot approve a fixing method.',
      'Warwick documentation should keep source, diagnosis and promise in their proper places. The council record supports an address-status check, police guidance governs evidence after crime, and the physical inspection supports the repair. A written estimate should separately identify entry, parts, keys, alignment and unresolved joinery or glazing. That trail is more useful than claiming experience or response performance merely because the address falls within CV34.',
    ],
    faqScope: [
      'At a Warwick property, historic appearance is a reason to inspect carefully and check the address, not proof of a particular lock, consent route or suitable opening technique.',
      'A Warwick frontage, communal threshold and private unit may sit under different authority; fire-door, management and heritage questions should be resolved for the affected entrance.',
      'The Warwick service note should itemise the observed fault, agreed action, components, keys and unfinished specialist work instead of treating a CV34 location or product badge as a guarantee.',
    ],
    priceScope: 'Any work affecting older frontage material is distinguished from the lock component and recorded before the method is agreed.',
    metaDifferentiator: 'historic-centre and property-status guidance',
    sources: [AREA_SOURCES['visit-warwick'], AREA_SOURCES['warwick-district-conservation']],
    serviceNotes: serviceNotes(
      {
        heading: 'Warwick lockouts: protect the door, confirm the right entrance',
        body: 'Warwick\'s official guide confirms a townscape that ranges from timber-framed medieval buildings to Georgian frontages, while the council offers property-status checks. In a lockout, that makes an address-level description essential. State whether the door is historic-looking, a later replacement, a shared entrance or a private house door. Proof of authority is required, and the opening method depends on the lock and existing failure. Preserving old fabric is a sensible priority, but no honest locksmith can promise that every Warwick lock will open without drilling.',
        details: [
          `Warwick's county guide verifies medieval timber-framed buildings and Georgian brick frontages within the townscape, but appearance cannot establish the lock behind a door. A lockout call should identify the precise opening and whether it belongs to a private home, common entrance or business, then describe what happened immediately before access failed. That preparation supports an authority check tied to the correct threshold and a diagnosis based on key, handle, latch and deadlock behaviour. A later door within an old frontage and an older door elsewhere can present different hardware, so neither CV34 nor visual age selects the method.`,
          `Warwick District Council's property search should be used when the locked door may include protected external material. Photograph the existing leaf, frame and visible ironmongery before any intervention that could remove or mark them. This preservation record informs method selection without promising that all components can remain untouched. If gaining access would require a destructive step, explain which lock part or surrounding material is affected and separate that decision from later replacement. Any further alteration to a protected frontage can then be considered with the owner or council using an exact proposal rather than a general description of Warwick's historic centre.`,
        ],
        checks: ['Give the precise entrance and any pedestrian-only or managed access detail', 'Check property status when the door appears to form part of a protected frontage', 'Explain whether the door slammed, deadlocked, jammed or has a broken key'],
        faq: { q: 'Can you guarantee not to damage an old Warwick door?', a: 'No blanket guarantee is credible. A non-destructive method should be considered first where appropriate, but the lock, deadlocking, failure and prior damage determine what is possible. Any destructive step should be explained before work.' },
      },
      {
        heading: 'Repair versus replacement on Warwick doors',
        body: 'A Warwick lock decision starts with the component, not the architectural label. Timber doors may use mortice or rim hardware; later doors may use cylinders and multipoint mechanisms; managed entrances can have separate controls. Where a protected frontage is involved, check whether cutting, door replacement or visible hardware changes need advice from Warwick District Council. A serviceable door should not be condemned just because a lock has failed. The written quote should identify repair, product, keys, fitting and any frame or alignment work separately.',
        details: [
          `The verified mixture of timber-framed medieval and Georgian buildings in Warwick argues for inspection, not an age-based parts choice. Before changing a lock, record why the work is requested, the door material, inside and outside furniture, edge markings and how the leaf meets the frame. Diagnosis can then test the case, cylinder, latch, keep and alignment as separate elements. A failed component does not by itself condemn an older door, and a later-looking entrance does not prove standard dimensions. The proposed replacement should follow measurements and observable condition, with retained parts and new key quantities made explicit.`,
          `When Warwick District Council's search identifies relevant property status, describe whether the change stays within an existing lock pocket or affects visible furniture, timber or brick frontage. That difference shapes preservation and the next referral even though the final mechanical choice still depends on compatibility. At a communal entrance, establish the person responsible for shared keys and hardware before changing the system. The written schedule should distinguish repair, replacement, adjustment and any new cutting, record what will be retained, and mark property or fire-door questions that need separate guidance before the wider alteration is accepted.`,
        ],
        checks: ['Inspect the lock body, cylinder, handles, keeps and door alignment', 'Use the council search for listed or conservation status', 'Get manager approval for communal or fire-door work'],
        faq: { q: 'Does Warwick\'s historic centre require like-for-like locks?', a: 'The correct approach depends on the exact property and alteration. Check listed and conservation status with the council; a hidden mechanism repair is not the same as changing a visible historic door or its character.' },
      },
      {
        heading: 'Warwick uPVC repairs: diagnose the actual mechanism',
        body: 'The presence of historic buildings in Warwick does not establish the material of a customer\'s door. For a uPVC or composite door, useful evidence is whether the mechanism operates while open, whether the sash rubs, where the handle stops and what is printed on the faceplate. Those details distinguish alignment, handle, cylinder and gearbox faults. If the door is part of a managed conversion, confirm whether it is a fire door and who authorises hardware changes before work begins.',
        details: [
          `Warwick's medieval and Georgian context does not exclude a later uPVC or composite door, nor does it prove one exists at the address. Preparation should photograph the complete door edge and faceplate, capture readable markings and describe key rotation, handle travel and locking-point movement in order. If the door is safely open, the difference between free operation and operation against the frame can direct inspection toward alignment or internal components. Backset, centres and locking layout still need measurement before a gearbox is identified, keeping the diagnosis rooted in the actual mechanism rather than the surrounding townscape.`,
          `A replacement or rear uPVC door within a Warwick conversion may sit under different responsibility from the principal historic entrance. Identify the exact threshold, its controller and any fire-door status before parts are removed. If the repair would alter outward appearance or cut surrounding fabric, check the district property record and isolate that proposed work from the internal diagnosis. The next-step report should state observed symptoms, confirmed measurements, components tested and the boundary between private and shared hardware. Any property-status or building-safety question can then be resolved by the responsible party before an otherwise compatible repair expands in scope.`,
        ],
        checks: ['Use symptoms and measurements rather than the street\'s apparent age', 'Stop forcing a stiff handle to avoid worsening a fault', 'Check management and fire-door duties for flat entrances'],
        faq: { q: 'Are multipoint parts standard across Warwick composite doors?', a: 'No. Mechanisms differ in dimensions and locking layouts. The actual faceplate, centres, backset and locking points need identifying before a replacement is confirmed.' },
      },
      {
        heading: 'Securing burglary damage in Warwick\'s historic setting',
        body: 'Police evidence guidance applies before boarding: report the incident, photograph the point of entry and avoid disturbing material that officers may need. At a protected Warwick frontage, the temporary fixing method should also minimise further damage to stone, timber or historic joinery. Boarding is used to reduce immediate access and exposure until a glazier, joiner or door specialist completes the permanent repair. It does not certify the structure, and any damaged lock or frame should be recorded rather than hidden from the follow-on contractor.',
        details: [
          `Warwick's historic-centre description helps place the incident but cannot establish what has failed. After following police directions, photograph the damaged opening, adjacent timber or masonry, broken glazing, lock components and any material likely to be covered. Identify whether the threshold is private, communal or part of a business frontage so the person controlling temporary work is clear. Those records support an opening-specific board plan and later assessment while avoiding conclusions about the event or concealed structural condition. The medieval or Georgian character of surrounding buildings is relevant only when verified fabric at this address may need preservation.`,
          `If the council property search shows that the Warwick opening has protected context, the temporary method should distinguish intact historic material from damaged sections and any sacrificial support. Record proposed fixing points before installation and document what remains visible afterward. The handover should name board dimensions, covered surfaces, compromised locks and outstanding glazing, joinery, door or structural checks. This gives the permanent repairer a reliable baseline and allows any proposed removal or alteration of old fabric to be referred with photographs. Boarding remains a temporary stage; it does not answer those later technical or property-status questions.`,
        ],
        checks: ['Follow police directions on evidence and scene access', 'Tell the contractor about listed, conservation or landlord control', 'Photograph both the opening and the completed temporary board'],
        faq: { q: 'Can boarding be fixed to a historic Warwick frontage?', a: 'A temporary solution may be possible, but the fixing method must respond to the actual structure and any property controls. Avoid unnecessary damage and seek council or owner advice when protected fabric is involved.' },
      },
      {
        heading: 'Security upgrades for Warwick\'s different door constructions',
        body: 'Warwickshire Police advises reviewing the whole entrance, and Warwick\'s documented mix of historic and later buildings makes that especially relevant. A projection issue on a euro cylinder, a weak timber frame, a worn mortice case and poorly aligned multipoint hooks are not solved by the same product. Property controls may favour retaining a sound historic door, while modern certification may matter on a replacement door. Match the solution to measurements and any written policy wording instead of marketing one product as universally best.',
        details: [
          `Warwick's verified timber-framed, medieval and Georgian townscape makes construction diversity visible, but only an entrance survey can define an upgrade. Record the door and frame material, hinge security, keeps, lock engagement, handles and cylinder projection where applicable. Marked standards and exact dimensions then allow independently certified products to be compared against the component actually present. This diagnosis should also identify when adjustment or frame reinforcement is a prerequisite, since replacing a lock cannot correct every surrounding weakness. The result is a measured proposal for one entrance, not a universal recommendation derived from Warwick's historic character.`,
          `The district property search adds a preservation branch when visible Warwick fabric may change. Photograph original-looking ironmongery, existing cut-outs and the relationship between door and frontage so retainable material is explicit before a modern component is proposed. For a common or fire-rated entrance, the building controller should define the hardware and performance constraints. The final schedule should separate adjustment, reinforcement and replacement; name verified dimensions and product evidence; and flag any external alteration for specialist or council review. That sequence allows security resistance to be improved conditionally while keeping heritage and shared-building decisions with the appropriate evidence and authority.`,
        ],
        checks: ['Assess the door and frame before selecting the lock', 'Check marked standards and current certification for the exact product', 'Respect property-status, fire-door and insurer-specific constraints'],
        faq: { q: 'Can one high-security cylinder secure every Warwick entrance?', a: 'No. A cylinder is only one part of some door systems, and many doors use different lock types. The complete entrance and its constraints must be inspected.' },
      },
    ),
  },
  kenilworth: {
    slug: 'kenilworth',
    name: 'Kenilworth',
    summary: 'Warwickshire County Council\'s official guide identifies Kenilworth\'s Old Town, High Street, Castle Hill, Abbey Fields, rail station and A46 setting. Warwick District Council publishes conservation appraisals and a property-status search for Kenilworth.',
    planningNote: 'Old Town context is not a substitute for checking an address. A property can be outside the conservation boundary, separately listed, managed, or entirely modern; each condition changes the questions but not automatically the answer.',
    contactPrep: 'State whether the entrance is in Old Town, a central business, a managed building or another residential street only when that helps access. Door photographs and exact lock markings remain the key mechanical evidence.',
    contextGuidance: [
      'The official Kenilworth guide distinguishes Old Town, High Street, Castle Hill, Abbey Fields and the wider road and rail setting. Those references can help a caller identify the property and correct entrance, but proximity to a landmark does not establish planning status, lock type or priority. The full address and access instructions are still required, and the current ETA is confirmed from real travel conditions rather than a fixed town-wide promise.',
      'Warwick District Council publishes conservation appraisals and a property-status search for address-level checking. An older-looking door near Old Town may be protected, unprotected, later fabric or part of a separately listed building. Before visible alteration, establish that status and describe the proposed scope. Retaining a door while repairing a compatible lock component is a different decision from cutting historic material or replacing the complete entrance.',
      'Kenilworth\'s documented history cannot select a part for a customer. Photographs should show the whole outside and inside hardware, the door edge and any manufacturer markings; measurements are confirmed before supply. If the entrance is communal, managed or fire-rated, identify the responsible person before hardware is changed. These checks make the guidance specific to the job without claiming that all properties in the same street share a construction or security level.',
      'For an Old Town or High Street address, explain whether the affected opening is part of the principal frontage, a side or rear door, a shared threshold or a tenant\'s private entrance. That description helps separate conservation, management and access questions. It does not grant permission, but it identifies who may need to approve visible work and which surfaces should be protected during diagnosis or temporary security.',
      'A Kenilworth quote should trace each conclusion to its evidence: council records for property context, customer documents for policy or management conditions, and inspection for the lock and door. Entry, repair, replacement, adjustment, keys and future specialist work should be listed separately. This avoids turning Old Town character, a CV8 postcode or a product badge into a guarantee about compatibility, planning consent, insurance or resistance to attack.',
    ],
    faqScope: [
      'For Kenilworth, Old Town or Castle Hill context does not establish the door status or lock; the council search, actual fabric, measurements and markings answer different questions.',
      'A managed Kenilworth entrance requires the relevant owner or agent to approve shared hardware work, independently of a resident proving authority for access to a private unit.',
      'The Kenilworth record should distinguish entry, repair, adjustment, parts and keys, and should preserve any separate council, policy, glazing or joinery decision for the responsible party.',
    ],
    priceScope: 'Old Town context prompts an address check but does not add an automatic product, consent or heritage charge.',
    metaDifferentiator: 'Old Town and property-status guidance',
    sources: [AREA_SOURCES['visit-kenilworth'], AREA_SOURCES['warwick-district-conservation']],
    serviceNotes: serviceNotes(
      {
        heading: 'Kenilworth lockouts in Old Town and beyond',
        body: 'Kenilworth\'s official guide distinguishes Old Town, High Street and Castle Hill from the wider town. For a lockout, give the exact entrance and say whether it is private, shared or commercial. A door in a protected setting may warrant particular care, but it does not reveal whether the lock is a nightlatch, mortice case, euro cylinder or multipoint system. Proof of authority comes first; inspection determines whether a non-destructive technique is suitable; and any drilling or replacement should be agreed before it begins.',
        details: [
          `The county guide identifies Kenilworth's Old Town, High Street, Castle Hill and wider rail and road setting. Those references can help distinguish the intended building, but a lockout still requires the complete address and exact threshold. Preparation should state whether the affected door is a principal frontage, side entrance, common door or private unit and who controls it. The locksmith can then relate the caller's authority to that opening before assessing whether the door slammed, was deadlocked or has a key or mechanism fault. Landmark proximity supplies no evidence about the lock or suitable technique.`,
          `Warwick District Council's property-status search is the relevant check if the Kenilworth door may form part of protected fabric. Record the existing leaf, frame, visible hardware and any later alterations before choosing an opening method that could affect them. That preservation step informs, but does not predetermine, the technical approach. If access would require drilling or removal, explain the precise component and distinguish immediate entry from later reinstatement. A broader change to visible Old Town or High Street material can then be referred with an address-specific proposal instead of assuming that every entrance near Castle Hill has identical status.`,
        ],
        checks: ['Provide exact access instructions rather than a landmark alone', 'Photograph visible hardware without attempting to dismantle it', 'Use the council search if the door forms part of an older frontage'],
        faq: { q: 'Is every door near Kenilworth Castle protected?', a: 'No. Proximity to a landmark does not establish listed or conservation status. Warwick District Council provides address-level checks, and the actual door and proposed work must be considered.' },
      },
      {
        heading: 'Kenilworth lock changes: retain what works, replace what failed',
        body: 'A lock change should address a defined need such as lost-key control, failure, a move or an agreed upgrade. In Kenilworth Old Town, check the property status before altering visible historic hardware or external fabric. Elsewhere, do not assume a modern lock from the neighbourhood alone. Inspect the lock case, cylinder, handles, frame and alignment, then distinguish a repair from a component or whole-lock replacement. Managed and fire-door entrances need approval from the responsible person as well as a mechanically compatible solution.',
        details: [
          `Kenilworth's documented Old Town and High Street context does not reveal whether a particular lock is original, replaced or mechanically compatible with a new part. A change request should begin with its purpose, followed by photographs of inside and outside furniture, the door edge and every readable marking. Inspection can then separate cylinder, lock-case, keep and alignment findings and identify serviceable material worth retaining. Dimensions and key-control needs support the proposed component, while the castle-area setting and apparent age of a neighbouring property remain locality facts rather than reasons to replace an entire door or select a product.`,
          `For a Kenilworth address returned by the district property search, the work description should identify whether replacement remains inside an existing opening or changes visible door material or furniture. That boundary helps preserve fabric and frames the right question if council advice is needed. Where the threshold is shared, the responsible building party should confirm which keys and components are within scope. The next-step schedule can then list retained hardware, measured replacement, fitting or alignment work and any external alteration held separately. This keeps mechanical diagnosis, authority and property context distinct while allowing them to inform the sequence of work.`,
        ],
        checks: ['Define the reason for change and who must lose key access', 'Check whether the door or visible hardware is protected', 'Confirm product, key quantity, fitting and adjustment in the quote'],
        faq: { q: 'Can the lock be changed without replacing a Kenilworth period door?', a: 'Often a lock component can be addressed separately, but the actual door and property status decide what is appropriate. Seek council advice if protected fabric or appearance may change.' },
      },
      {
        heading: 'Kenilworth uPVC and composite-door fault checks',
        body: 'Kenilworth\'s historic identity cannot identify a later door or rear entrance. If the affected door is uPVC or composite, note exactly when it fails: open, closed, while lifting the handle, or only when turning the key. Check for rubbing or a visible gap without forcing it. A cylinder can be replaced independently of a sound mechanism in some cases; in others, alignment or gearbox failure is the real cause. Measurements and faceplate markings are necessary before a compatible part is promised.',
        details: [
          `Old Town, High Street and Castle Hill are verified Kenilworth contexts, but none confirms the material of a side, rear or replacement entrance. For a uPVC or composite repair, photograph the whole door edge, faceplate and handles and record key, handle and locking-point movement in sequence. If safe access already exists, comparing the mechanism while open with its behaviour in the frame helps direct inspection toward alignment, cylinder or gearbox. Final backset, centres and locking-layout measurements are still required before naming a compatible part, preventing local historic character from becoming an unsupported mechanical assumption.`,
          `A later Kenilworth door can sit within a building covered by the district property search, so the mechanical and property-status questions should be run in parallel. Identify whether work stays within replaceable multipoint hardware or would alter visible external fabric, and record the exact threshold if the building also has a common entrance. The responsible person should be known before shared or fire-rated hardware is disturbed. A useful next-step note states the symptom, tests completed, confirmed markings, measurements still needed and any proposed material change. It refers only that additional change for address-specific guidance rather than treating Old Town context as a repair restriction.`,
        ],
        checks: ['Compare open and closed operation only if the door is safely open already', 'Record handle, key and hook behaviour in order', 'Send full faceplate and door-edge images for part identification'],
        faq: { q: 'Does Kenilworth\'s Old Town rule out a uPVC door repair?', a: 'No town label determines the door. Check the actual property and door; if it is protected and the proposed work changes external appearance or fabric, ask the council for property-specific advice.' },
      },
      {
        heading: 'Kenilworth boarding with heritage and evidence in mind',
        body: 'After burglary or vandalism, preserve evidence as Warwickshire Police directs and photograph the damage before it is covered. Around Old Town or another protected Kenilworth frontage, a temporary board should avoid unnecessary cutting or damage to surrounding historic material. The aim is limited: reduce access and weather exposure until permanent glazing, joinery or door work is arranged. Record the opening size, frame condition, compromised locks and fixings so the owner and permanent repairer can make an informed next decision.',
        details: [
          `Kenilworth's official guide can help identify whether a reported opening is in Old Town, High Street or another part of the town, but site evidence must define the temporary work. Follow police directions before touching the point of entry, then photograph the frame, glazing or door, damaged locks and surrounding material. State whether the opening is private, common or commercial and identify the person controlling it. These records establish board dimensions and safe handling needs without making claims about the event, hidden construction or remaining strength from proximity to Castle Hill, Abbey Fields or the rail station.`,
          `When Warwick District Council's search indicates relevant property status, the board plan should show how surviving Kenilworth frontage material will be preserved. Separate damaged sections from usable support, record fixing positions and avoid obscuring the scope of later inspection more than necessary. The completion note should identify what was covered, temporary materials used and any unresolved lock, glazing, joinery or structural issue. That prepares the permanent specialist to assess the opening after removal. If older visible fabric may need cutting or replacement, the owner can seek property-specific advice using the documented damage rather than a generic Old Town assumption.`,
        ],
        checks: ['Do not disturb the point of entry contrary to police advice', 'Check the council property status when historic fabric is present', 'Treat boarding as temporary and document the remaining repair'],
        faq: { q: 'Will boarding make a damaged Kenilworth opening fully secure?', a: 'No temporary board can guarantee that. It is intended to reduce immediate access and exposure while the permanent repair is organised.' },
      },
      {
        heading: 'A measured security upgrade for Kenilworth doors',
        body: 'Warwickshire Police recommends checking the door, frame, hinges and lock together. In Kenilworth that avoids two opposite mistakes: fitting unsuitable modern hardware to protected fabric, or assuming an older-looking property cannot use an accredited improvement. Inspect the actual entrance, measure any cylinder, identify the lock standard and check door alignment. Then match the proposal to the customer\'s written policy and any council or management constraints. Certification is evidence of testing, not a promise that burglary is impossible.',
        details: [
          `Kenilworth's Old Town and Castle Hill identity does not determine an entrance's current resistance or hardware. An upgrade survey should record the door and frame, hinge and keep condition, handle protection, lock engagement and any cylinder projection. Existing marks and accurate measurements create the basis for considering independently certified components compatible with that construction. The survey should also identify whether adjustment, frame work or retained hardware affects the proposal, since changing one lock cannot address every entrance weakness. This produces a testable specification for the particular door rather than an upgrade justified by neighbourhood character or a CV8 label.`,
          `The district council's address search changes the preservation branch when a Kenilworth upgrade would touch visible external material. Photograph existing furniture, cut-outs and frame details, then separate internal component options from changes that would alter the frontage. If the entrance is managed or fire-rated, the responsible building party should define constraints before product selection. The resulting schedule should state measured dimensions, certification evidence, retained fabric, installation dependencies and any heritage or fire-door question awaiting specialist guidance. It can explain how an option may improve tested resistance without promising that the upgraded opening eliminates all attack routes or resolves unrelated structural conditions.`,
        ],
        checks: ['Retain sound historic fabric where a compatible solution is available', 'Verify dimensions and certification for the specific product', 'Do not convert area prestige or property age into a security claim'],
        faq: { q: 'What is the strongest lock for a Kenilworth property?', a: 'Strength cannot be judged from the town or property value. The correct choice depends on the door system, fit, surrounding hardware, certification and any written policy or heritage constraint.' },
      },
    ),
  },
  'stratford-upon-avon': {
    slug: 'stratford-upon-avon',
    name: 'Stratford-upon-Avon',
    summary: 'Warwickshire County Council\'s official guide describes Stratford-upon-Avon\'s medieval street pattern, timber-framed townscape, river, railway and park-and-ride access. Stratford-on-Avon District Council lists the town conservation area and is reviewing its appraisal and management plan.',
    planningNote: 'The conservation area is mapped and property-specific controls can differ. Do not infer listed status, door construction or permission requirements solely from a CV37 postcode or a timber-framed neighbouring building.',
    contactPrep: 'For a central address, provide the street, entrance and any restricted-access or rear-service instructions. For flats and businesses, distinguish the shared frontage from the private door before work is booked.',
    contextGuidance: [
      'Warwickshire\'s official guide records Stratford-upon-Avon\'s medieval street pattern, timber-framed townscape, river, railway and park-and-ride context. In practical service terms, central buildings may have more than one plausible entrance, so the customer should identify the street-facing, rear, communal or internal door and any person controlling access. Those place facts do not establish that the locksmith can park at the door or arrive within a fixed time.',
      'Stratford-on-Avon District Council maintains the conservation-area record and is reviewing the town appraisal. A mapped central location is a reason to check the exact property before altering visible fabric, not a reason to label every CV37 door historic. Listed status, conservation controls, landlord consent, management rules and fire-door responsibilities can overlap or differ. The proposed repair, component replacement, temporary board or full-door change must therefore be described precisely.',
      'A timber-framed neighbour is not evidence about the lock at the call address. For a Stratford job, photos of the actual door, edge, handles and markings provide the useful technical starting point. After burglary, police directions and evidence preservation come before covering damage. For planned work, written insurer or owner requirements should be available. This separates verified local context from the mechanical and legal facts that only the address and inspection can establish.',
      'At a Stratford shop, flat or visitor accommodation, clarify which person controls the frontage, common entrance and private unit. A booking made by an occupier does not automatically authorise changes to every shared component. Stating the door position, floor, manager contact and lawful connection before attendance helps avoid disturbing the wrong opening and lets fire, master-key or heritage requirements be raised before parts are selected.',
      'The final Stratford record should state what was observed before work, what temporary or permanent action was agreed, which parts and keys were supplied, and what remains for a glazier, joiner, manager or council adviser. The locality sources explain the mapped historic setting; they cannot verify the individual lock or an insurance outcome. Keeping that boundary visible produces more dependable guidance than copying a generic CV37 security claim.',
    ],
    faqScope: [
      'In Stratford-upon-Avon, medieval-centre context supports an address and fabric check but cannot identify the lock, approve an alteration or promise an opening outcome.',
      'A Stratford frontage, common entrance and private accommodation door can have different controllers, so authority, fire safety and any master-key arrangement must be checked for the actual threshold.',
      'The Stratford work record should state the observed damage or failure, agreed temporary or permanent action, parts and keys, while outstanding council, glazier, joiner or insurer decisions remain explicit.',
    ],
    priceScope: 'Frontage, communal and private-door tasks are separated where authority, fabric or permanent follow-on work differs.',
    metaDifferentiator: 'medieval-centre and conservation guidance',
    sources: [AREA_SOURCES['visit-stratford'], AREA_SOURCES['stratford-conservation']],
    serviceNotes: serviceNotes(
      {
        heading: 'Stratford lockouts in a busy historic centre',
        body: 'Stratford\'s official guide confirms a recognisable medieval street pattern and a busy visitor centre, while the district council maps a conservation area. For a lockout, precise access information matters: identify the street-facing, rear, communal or internal door and any manager who controls it. Historic surroundings justify care but do not identify the lock or guarantee non-destructive entry. A lawful opening still requires proof of connection, inspection of the actual hardware and agreement before any destructive method or replacement is used.',
        details: [
          `The county guide verifies Stratford-upon-Avon's medieval street pattern, timber-framed townscape, river and railway context. In a central lockout, those facts make precise threshold identification essential because one address may present a frontage, common door, rear entrance and private unit. The caller should name the affected opening and the person controlling it, then describe whether the door closed normally, was deadlocked or developed a key or mechanism fault. That preparation lets the locksmith establish authority for the correct threshold before inspection. The street's historic appearance cannot identify the lock or determine an opening method.`,
          `Stratford-on-Avon District Council's conservation record supplies an address-specific property check, not a universal rule for CV37. If the locked door may contain protected external fabric, photograph the leaf, frame and visible furniture before any intervention that could remove or mark them. The method should aim to preserve sound material where the hardware and failure allow, without promising a particular result. If access requires a destructive step, define the affected component and separate entry from later reinstatement. A proposed change to the frontage can then be referred using the exact address and scope rather than surrounding timber-framed buildings.`,
        ],
        checks: ['Give the full address and correct entrance rather than only a landmark', 'Confirm whether the door is private, communal, commercial or managed', 'Check property status if the door or frontage appears historic'],
        faq: { q: 'Can a Stratford conservation-area lock always be picked open?', a: 'No. Conservation status concerns place and character, not the internal design or condition of a lock. The actual hardware determines the options, and any destructive step should be discussed first.' },
      },
      {
        heading: 'Stratford lock replacement without harming historic fabric',
        body: 'A timber-framed street does not make every door historic, but the district conservation record means address-level checks are sensible before visible external work. Identify whether the requirement is new key control, repair, burglary damage or upgrading. Then inspect the lock, door, frame and markings. A compatible component may solve the problem without changing the door; a managed or fire-rated entrance can require separate authority. When protected fabric or appearance could change, seek council advice rather than relying on a generic claim about Stratford properties.',
        details: [
          `Stratford's documented timber-framed townscape cannot show whether the lock at a particular address is historic, later or mechanically sound. Preparation should explain the reason for change and supply photographs of the door face, handles, edge and visible lock markings. Inspection can then distinguish key-control requirements from faults in the cylinder, case, keep or alignment and identify components that can remain. Exact measurements support compatibility, while a neighbouring medieval building or the CV37 postcode does not. This preserves the option of a focused repair or component change rather than treating the complete entrance as one undifferentiated replacement.`,
          `The district conservation record makes the relationship between component and frontage important. A lock fitting within an existing opening, a new cut in timber and replacement of visible furniture should be recorded as different scopes. For a shared or commercial Stratford threshold, identify the person who controls the hardware and keying before work is agreed. The next-step schedule should list retained material, diagnosed failure, dimensions, proposed component and any alignment work. If external appearance or older fabric would change, that proposal remains a separate address-level question for the owner or council instead of an assumption based on the wider historic centre.`,
        ],
        checks: ['Confirm the exact property status and proposed alteration', 'Separate a lock component from the surrounding door and frame', 'Obtain owner or managing-agent authority where required'],
        faq: { q: 'Must a Stratford period door keep its original lock?', a: 'There is no universal answer. Listed status, conservation controls, significance and the proposed work all matter. Ask the district council when historic fabric or appearance may be affected.' },
      },
      {
        heading: 'uPVC repairs at Stratford homes, flats and rear entrances',
        body: 'Stratford\'s historic core does not rule out later uPVC or composite doors, especially at rear or altered entrances, but neither does it prove them. Diagnose the actual system: note handle movement, key rotation, hook engagement and whether the door works open but binds when closed. A commercial or shared entrance may use different hardware and approval arrangements. Before promising a gearbox, use the faceplate markings and measurements; before replacing a cylinder, check its size, projection and surrounding handle.',
        details: [
          `The official Stratford guide confirms a medieval street pattern and timber-framed buildings, yet a rear, altered or internal entrance may use entirely later materials. A uPVC enquiry should therefore include a full door-edge photograph, faceplate markings and a sequence of what the key, handle, hooks and rollers do. When the door is already open safely, comparing free mechanism movement with operation in the frame helps separate alignment from cylinder, handle or gearbox faults. Backset, centres and locking layout must still be measured, so the historic character of the street never substitutes for identification of the actual system.`,
          `At a Stratford flat, visitor premises or shop, the uPVC door under repair may be private while another entrance forms the protected frontage or common route. The exact threshold and its responsible controller should be established before hardware is removed. If diagnosis leads to a proposal affecting visible external material, check the district conservation record and describe that extension separately from the internal mechanism work. A useful next-step record states observed symptoms, safe tests, measurements, possible compatible components and any shared-door or property-status issue still unresolved. It does not infer those constraints from a timber-framed neighbour.`,
        ],
        checks: ['Describe the symptom and the sequence that triggers it', 'Photograph the entire door edge and visible markings', 'Check conservation or management constraints separately from the mechanical diagnosis'],
        faq: { q: 'Can a Stratford uPVC mechanism be identified from a photograph?', a: 'A clear full-length faceplate image and markings can narrow the options, but compatible parts may still require measurements and on-site confirmation. The postcode alone is not evidence.' },
      },
      {
        heading: 'Boarding damage in Stratford\'s conservation area',
        body: 'At a burglary scene, follow police instructions, photograph damage and preserve possible evidence before the opening is covered. In Stratford\'s mapped conservation area, the temporary fixing method also needs to avoid unnecessary harm to historic timber, masonry or shopfront material. Boarding should reduce immediate access and weather exposure while permanent specialists are arranged. It is not a substitute for glazing, structural or joinery repair, and it should be documented for the owner, police, insurer and follow-on contractor.',
        details: [
          `Stratford's medieval street pattern and timber-framed centre help identify a reported premises but do not define the damage. After following police instructions, photograph the precise point of entry, remaining frame, glazing or door material, displaced lock parts and everything likely to be hidden by boarding. Confirm whether the affected opening belongs to the frontage, a common entrance or a private unit and identify the person responsible for it. This evidence supports dimensions and temporary handling decisions while avoiding unsupported conclusions about the incident, construction or concealed condition based on the town-centre setting.`,
          `Where the district record places the Stratford opening within a conservation area, surviving timber, masonry and shopfront material should be mapped before fixings are selected. The temporary plan can distinguish damaged substrate from material suitable for support and avoid increasing the later repair without inspection-based need. Document board size, fixing locations, components covered and remaining glazing, lock, joinery or structural questions. That handover lets the permanent specialist understand what lies behind the board. If protected fabric may need removal or alteration, the owner can present a precise documented proposal for advice rather than treating temporary security as approval for permanent change.`,
        ],
        checks: ['Prioritise personal safety and police scene directions', 'Flag listed or conservation status before fixings are selected', 'Record the opening, damaged lock, frame and completed temporary work'],
        faq: { q: 'Can a damaged Stratford historic frontage be boarded?', a: 'A temporary solution may be possible, but it must respond to the actual structure and property controls. Use the least damaging safe fixing approach and seek owner or council input where protected fabric is involved.' },
      },
      {
        heading: 'Stratford security upgrades based on evidence, not appearance',
        body: 'Warwickshire Police advises assessing the entire entrance, including door, frame, hinges, lock and cylinder fit. That avoids assuming a timber-framed Stratford building has original hardware or that a later door is automatically secure. Measure and identify what is present, check product certification, and compare the proposal with any current written insurance wording. Within the conservation area, an upgrade may also need to preserve visible character or existing fabric. No accredited product removes all forced-entry risk.',
        details: [
          `Stratford's timber-framed townscape is a verified visual context, not a measure of any entrance's hardware or resistance. An upgrade review should inspect the door leaf, frame, hinges, keeps, lock engagement, handles and cylinder projection where present. Readable markings and dimensions allow independently certified options to be compared with the actual construction. The same inspection may show that adjustment, frame support or retained components belong in the scope before a new lock is selected. This creates an address-specific diagnosis and avoids assuming either original hardware or adequate security from the medieval surroundings, railway access or CV37 label.`,
          `The district conservation record adds a preservation decision if proposed Stratford work would alter the outward door or frontage. Photograph existing furniture, cut-outs, timber and adjacent material, then separate compatible internal changes from visible substitutions or new cutting. A manager should define the scope where the opening is communal or fire-rated. The final specification can name measured products, certification evidence, retained fabric and dependencies, with any heritage or building-safety question listed for separate guidance. Independently certified hardware may improve resistance within its tested conditions, but the record should not imply that one component controls every possible route through the entrance.`,
        ],
        checks: ['Inspect and measure the complete entrance', 'Verify exact product certification and correct fit', 'Check insurer, fire-door, management and conservation requirements independently'],
        faq: { q: 'Do Stratford conservation properties need a special lock standard?', a: 'Conservation status does not create one universal lock standard. The door, protected fabric, product evidence and any written policy or building-management requirement must all be considered.' },
      },
    ),
  },
}

interface ServiceBlueprint {
  name: string
  shortName: string
  priceFrom: number
  metaTitle: (area: string) => string
  metaDescription: (area: AreaEvidenceProfile) => string
  h1: (area: string) => string
  intro: (area: string) => string
  scenarios: string[]
  preparation: string[]
  faqs: (area: string) => { q: string; a: string }[]
  sourceIds: string[]
}

const SERVICE_BLUEPRINTS: Record<ServiceAreaSlug, ServiceBlueprint> = {
  'emergency-lockout': {
    name: 'Emergency Locksmith',
    shortName: 'Emergency Lockout',
    priceFrom: 59,
    metaTitle: area => `Emergency Locksmith ${area} | Lockout From £59`,
    metaDescription: area => `Locked out in ${area.name}? Locksmith from £59, with ${area.metaDifferentiator}, authority checks and price agreed before travel.`,
    h1: area => `Emergency Locksmith for Lockouts in ${area}`,
    intro: area => `If you are locked out in ${area}, call with the exact address, entrance type and a short description of what the key, handle and door are doing. I will confirm the current estimated arrival time and the price basis before travelling. On arrival I verify your authority to enter, inspect the lock and start with an appropriate low-damage method where the lock and circumstances allow. Non-destructive entry is an aim, not a guarantee; if drilling or replacement becomes necessary, I explain why and agree it first.`,
    scenarios: ['Slammed door where the lock has not been deadlocked', 'Lost or stolen keys requiring entry and a separate key-control decision', 'A key snapped or trapped in the lock', 'A failed lock or mechanism leaving the authorised occupier outside'],
    preparation: ['Move to a safe, well-lit place if you feel at risk', 'Do not force the key or handle and worsen the fault', 'Prepare identification or other evidence connecting you to the address', 'Ask for the total price basis and current ETA before attendance'],
    faqs: area => [
      { q: `What proof do I need for a lockout in ${area}?`, a: 'Photo identification showing the address is useful. If it is unavailable, other evidence of occupancy or owner/manager authority may be considered. Entry is refused when a lawful connection to the property cannot be established.' },
      { q: 'Will the lock definitely open without drilling?', a: 'No honest assessment can guarantee that before the lock is inspected. A suitable non-destructive method is considered first, but lock design, deadlocking, failure and earlier damage can make drilling or replacement necessary.' },
      { q: 'How is the lockout price confirmed?', a: 'The starting price is shown on the page. The likely total is discussed from the information you provide; if the on-site diagnosis changes the required work, the revised scope and cost should be agreed before it proceeds.' },
    ],
    sourceIds: ['mla-service-calls'],
  },
  'lock-change': {
    name: 'Door Lock Repair & Replacement',
    shortName: 'Lock Repair & Replacement',
    priceFrom: 59,
    metaTitle: area => `Lock Repair & Replacement ${area} | From £59`,
    metaDescription: area => `Lock repair and replacement in ${area.name}. Euro-cylinder replacement from £59. ${area.metaDifferentiator}. No VAT/call-out fee.`,
    h1: area => `Door Lock Repair & Replacement in ${area}`,
    intro: area => `For a failed, worn or compromised door lock in ${area}, the first decision is whether the lock can be adjusted or repaired, whether one component needs replacing, or whether the complete lock is unsuitable. I inspect the door, frame, lock markings, cylinder or mechanism before agreeing the remedy. A move, lost keys and mechanical failure create different key-control and repair needs. Product, keys, fitting and any alignment work are explained in the price so a headline replacement figure is not confused with a diagnosis.`,
    scenarios: ['Broken or unreliable mortice lock, nightlatch or cylinder', 'Lost-key or moving-home key-control change', 'Door alignment causing a sound lock to bind', 'Replacement after damage, wear or an agreed security review'],
    preparation: ['Explain why the lock is being changed or repaired', 'Photograph visible markings and the outside/inside hardware', 'Find any written insurer, landlord or managing-agent requirements', 'Do not buy a part from the postcode or door appearance alone'],
    faqs: area => [
      { q: `Can just the cylinder be changed in ${area}?`, a: 'Sometimes. On a compatible cylinder-operated door, changing the correctly sized cylinder can restore key control without replacing the whole mechanism. Other lock types and mechanical failures need a different repair.' },
      { q: 'Should every lock be changed after moving?', a: 'The key-control risk should be reviewed because the new occupier may not know who holds copies. Which doors or components to change depends on the actual locks, access arrangements and customer decision.' },
      { q: 'Will a replacement satisfy my insurance policy?', a: 'Only the insurer can confirm cover. Check the current written policy, then ask for a correctly marked product and invoice that describe the installed work; do not rely on a generic area or trade claim.' },
    ],
    sourceIds: ['warwickshire-door-security', 'mla-service-calls'],
  },
  'upvc-lock-repair': {
    name: 'uPVC Door & Window Lock Repair',
    shortName: 'uPVC Lock Repair',
    priceFrom: 59,
    metaTitle: area => `uPVC Door Lock Repair ${area} | From £59`,
    metaDescription: area => `uPVC door lock diagnosis in ${area.name} from £59. Alignment, cylinder, handle and multipoint checks with ${area.metaDifferentiator}.`,
    h1: area => `uPVC Door Lock Repair in ${area}`,
    intro: area => `A stiff handle, key that will not turn, hooks that miss their keeps, or a door that locks open but not closed can have different causes. For a uPVC or composite door in ${area}, I check alignment, handle movement, cylinder operation and the multipoint mechanism before proposing parts. Continuing to force a binding handle can turn an alignment issue into mechanism damage. Compatibility must be established from markings and measurements; the town, estate or apparent door age is not a reliable parts catalogue.`,
    scenarios: ['Door locks while open but binds or fails when closed', 'Handle is stiff, loose, floppy or will not lift fully', 'Key or euro cylinder turns badly or not at all', 'Multipoint hooks, rollers or gearbox fail to move correctly'],
    preparation: ['Stop forcing a stiff handle or key', 'Note whether operation changes with the door open', 'Photograph the full faceplate and any printed code', 'Mention if the entrance is communal, managed or fire-rated'],
    faqs: area => [
      { q: `Do I need a whole new uPVC door in ${area}?`, a: 'A lock fault does not by itself prove the door needs replacing. Alignment, handles, cylinders, gearboxes and some full mechanisms can be assessed as separate components, subject to condition and compatible parts.' },
      { q: 'Why does the door lock while open but not when closed?', a: 'That symptom often directs the inspection toward alignment between the sash and frame keeps, but hinges, keeps and mechanism condition still need checking. Do not keep forcing the handle.' },
      { q: 'Can any multipoint gearbox be fitted?', a: 'No. Backset, centres, faceplate, spindle and locking layout vary. Markings and measurements are required to confirm compatibility.' },
    ],
    sourceIds: ['warwickshire-lock-advice', 'warwickshire-door-security'],
  },
  'boarding-up': {
    name: 'Emergency Boarding Up & Burglary Repairs',
    shortName: 'Boarding Up & Burglary Repairs',
    priceFrom: 79,
    metaTitle: area => `Emergency Boarding Up ${area} | From £79`,
    metaDescription: area => `Boarding up in ${area.name} from £79. Evidence-aware temporary security for damaged doors or windows, with ${area.metaDifferentiator}.`,
    h1: area => `Emergency Boarding Up & Burglary Repairs in ${area}`,
    intro: area => `If a door or window in ${area} has been forced or broken, protect people first and follow police instructions about the scene. Photograph damage and avoid disturbing possible evidence unless told otherwise. Boarding is a temporary measure intended to reduce immediate access and weather exposure while glazing, joinery, door or structural repairs are arranged. I assess the opening, remaining frame and compromised locks, explain what the temporary work can and cannot do, and record any permanent work still required.`,
    scenarios: ['Broken window or glazed door panel requiring temporary cover', 'Forced door or frame needing temporary external security', 'Damaged commercial or communal opening with owner authority', 'Boarding followed by a separately agreed lock or hardware repair'],
    preparation: ['Call 999 if an offender may still be present or anyone is in danger', 'Follow police advice on preserving the point of entry', 'Photograph damage before it is covered', 'Confirm owner, landlord or managing-agent authority for the work'],
    faqs: area => [
      { q: `What should I do before boarding in ${area}?`, a: 'Prioritise safety, report the incident as appropriate, and follow police instructions. Photograph damage and preserve possible evidence before repair work begins.' },
      { q: 'Is boarding a permanent repair?', a: 'No. It is temporary protection. Glazing, door, frame, joinery or structural work may still be needed, and damaged locks are assessed separately.' },
      { q: 'Can a temporary board guarantee no one will enter?', a: 'No. Correctly fitted boarding can reduce immediate access and weather exposure, but no temporary material can make a guarantee against determined entry.' },
    ],
    sourceIds: ['warwickshire-forensics', 'mla-service-calls'],
  },
  'lock-upgrade': {
    name: 'Lock Upgrade & Security',
    shortName: 'Lock Upgrade',
    priceFrom: 59,
    metaTitle: area => `Lock Upgrades ${area} | Anti-Snap & BS3621`,
    metaDescription: area => `Lock upgrades in ${area.name} from £59 for a compatible anti-snap cylinder. ${area.metaDifferentiator}; check written requirements.`,
    h1: area => `Lock Upgrades & Security Review in ${area}`,
    intro: area => `A useful security upgrade in ${area} starts with the complete entrance, not a product slogan. I inspect the door, frame, hinges, keeps, handles, existing lock and cylinder fit. Warwickshire Police advises correctly sized cylinders and accredited products, but a euro-cylinder solution does not apply to every door. If an insurer, landlord or managing agent specifies a standard, use the current written wording and match the marked product and installation to it. Certification indicates tested resistance; it does not make a door attack-proof or guarantee an insurance outcome.`,
    scenarios: ['Cylinder projection, weak handles or incomplete multipoint engagement', 'Worn or unmarked lock considered against a written requirement', 'Door-frame, hinge or keep weaknesses found during an entrance review', 'Planned upgrade after a move, key loss or damage'],
    preparation: ['Collect written insurer or landlord requirements', 'Photograph the door edge, handles, cylinder and frame', 'Check whether the entrance is fire-rated, managed or protected', 'Ask for the exact certification and dimensions of proposed products'],
    faqs: area => [
      { q: `Do all homes in ${area} need an anti-snap cylinder?`, a: 'No. Not every door uses a euro cylinder, and the cylinder is only one part of the entrance. Inspect the actual door, fit and surrounding hardware before choosing an upgrade.' },
      { q: 'What do TS007 and BS3621 mean?', a: 'They apply to different product categories and evidence tested requirements. The marked product still needs to suit the door and be correctly fitted; check any exact policy wording with the insurer.' },
      { q: 'Can an upgraded lock guarantee security?', a: 'No. Accredited and correctly fitted hardware can improve resistance to tested attack methods, but no lock removes every route of forced entry or guarantees a claim outcome.' },
    ],
    sourceIds: ['warwickshire-lock-advice', 'warwickshire-door-security'],
  },
}

function uniqueSources(sources: EvidenceSource[]): EvidenceSource[] {
  return [...new Map(sources.map(source => [source.id, source])).values()]
}

function buildContent(area: AreaEvidenceProfile, service: ServiceAreaSlug): TownServiceContent {
  const blueprint = SERVICE_BLUEPRINTS[service]
  const local = area.serviceNotes[service]
  const serviceIndex = SERVICE_AREA_SLUGS.indexOf(service)
  const contextIndexes = service === 'emergency-lockout'
    ? [serviceIndex, 2]
    : service === 'lock-change'
      ? [serviceIndex, 4]
      : [serviceIndex]
  const serviceContext = contextIndexes.map(index => area.contextGuidance[index])

  return {
    service,
    metaTitle: blueprint.metaTitle(area.name),
    metaDescription: blueprint.metaDescription(area),
    h1: blueprint.h1(area.name),
    intro: [
      `${area.summary} ${area.planningNote}`,
      blueprint.intro(area.name),
      `The advertised starting price is £${blueprint.priceFrom}. I confirm the current ETA and price basis from the actual symptoms and access details before travelling; there is no VAT or separate call-out fee.`,
    ],
    localAngleHeading: local.heading,
    localAngleBody: local.body,
    commonJobs: [...local.checks, ...blueprint.scenarios],
    faqs: [
      local.faq,
      ...blueprint.faqs(area.name).map((faq, index) => ({
        q: faq.q,
        a: `${faq.a} ${area.faqScope[index]}`,
      })),
    ],
    priceNote: `${blueprint.shortName} in ${area.name} starts from £${blueprint.priceFrom}. The agreed price depends on the diagnosed work and parts, with no VAT or separate call-out fee. ${area.priceScope}`,
    evidenceSummary: `${area.contactPrep} Local context was checked against the sources below on ${REVIEWED_ON}. The sources support place, planning and general technical guidance; they do not prove the lock type or job history at an individual address.`,
    contextGuidance: [...serviceContext, ...local.details],
    preparationSteps: blueprint.preparation,
    sources: uniqueSources([
      ...area.sources,
      ...blueprint.sourceIds.map(id => TECHNICAL_SOURCES[id]),
    ]),
    reviewedOn: REVIEWED_ON,
  }
}

export const TOWN_SERVICES: Record<string, TownServiceContent[]> = Object.fromEntries(
  Object.values(AREA_PROFILES).map(area => [
    area.slug,
    SERVICE_AREA_SLUGS.map(service => buildContent(area, service)),
  ]),
)

export const TOWN_SLUGS = Object.values(AREA_PROFILES).map(area => ({ slug: area.slug, name: area.name }))

export const TOWN_SERVICE_PARAMS = Object.entries(TOWN_SERVICES).flatMap(([slug, services]) =>
  services.map(service => ({ slug, serviceSlug: service.service })),
)

export function getTownService(areaSlug: string, serviceSlug: string): TownServiceContent | undefined {
  return TOWN_SERVICES[areaSlug]?.find(service => service.service === serviceSlug)
}

export function hasTownService(areaSlug: string, serviceSlug: string): boolean {
  return getTownService(areaSlug, serviceSlug) !== undefined
}

export function getAreaServicePublicationStatus(areaSlug: string, serviceSlug: string): 'indexable' | 'redirect' {
  return hasTownService(areaSlug, serviceSlug) ? 'indexable' : 'redirect'
}
