import type { AreaGuideFact, AreaGuideSource, AreaServiceGuidance, GovernedAreaGuide } from './area-guide-types.ts'
import type { AddressRegion, AreaSlug } from './area-authorities.ts'
import { EVIDENCE_REVIEWED_ON, POLICE_SOURCE_IDS, getTechnicalEvidenceSource } from './locksmith-evidence.ts'
import { SERVICE_AREA_SLUGS, type ServiceAreaSlug } from './service-area-types.ts'

const SOUTH_WEST_AREA_SLUGS = [
  'leamington-spa',
  'milverton',
  'lillington',
  'sydenham',
  'whitnash',
  'heathcote',
  'warwick',
  'woodloes-park',
  'chase-meadow',
  'warwick-gates',
  'stratford-upon-avon',
  'tiddington',
  'bishopton',
  'shottery',
  'kenilworth',
  'balsall-common',
  'meriden',
  'hampton-in-arden',
  'wolston',
  'ryton-on-dunsmore',
  'baginton',
  'brandon',
  'shilton',
  'brinklow',
  'southam',
  'studley',
  'alcester',
] as const satisfies readonly AreaSlug[]

type SouthWestAreaSlug = (typeof SOUTH_WEST_AREA_SLUGS)[number]

interface PairContext {
  local: string
  decision: string
  checks: [string, string]
}

interface AreaGuideSeed {
  slug: SouthWestAreaSlug
  name: string
  region: AddressRegion
  summary: [string, string]
  accessGuidance: string
  evidenceLimits: string
  facts: AreaGuideFact[]
  sourceIds: string[]
  contexts: Record<ServiceAreaSlug, PairContext>
}

interface TechnicalCopy {
  first: string
  second: string
}

const TECHNICAL_COPY: Record<ServiceAreaSlug, TechnicalCopy[]> = {
  'emergency-lockout': [
    {
      first: `The MLA service-call charter makes identification and authority part of the instruction, alongside advance information about the expected charge. Complete those checks before work, even when the caller can identify a nearby official landmark.`,
      second: `At the entrance, assess the door, frame, hinges and lock together. If inspection changes the proposed scope or cost, explain that change before continuing; neither a planning boundary nor a conservation description supplies an opening method.`,
    },
    {
      first: `Urgency does not remove the need to confirm who may authorise access. Record the full address, caller relationship and controlled opening, then provide anticipated cost information before beginning, in line with the MLA service-call principles.`,
      second: `Base the decision on what is found at the door rather than on the locality label. Police guidance treats the lock as part of a complete assembly with its frame and hinges, and any revised work or price should be agreed first.`,
    },
    {
      first: `A recognisable place name is not proof of a right to enter. Establish the requester's identity, connection to the premises and authority over the precise doorway; the MLA charter also supports stating the likely charge before the service starts.`,
      second: `Once authority is clear, inspect the physical entrance as a system, including its frame, hinges and lock. Describe the proposed work from that evidence and pause for approval if the condition at the address requires a different scope or cost.`,
    },
    {
      first: `Treat the address and the authorised person as separate facts to verify. An official locality record can help disambiguate a place, but it cannot identify an occupier; MLA guidance supports confirming authority and giving cost information in advance.`,
      second: `The next step must follow the observed door set, not a general account of the settlement. Review the door, frame, hinges and locking parts together, explain the intended scope, and obtain agreement before any necessary variation.`,
    },
    {
      first: `Before considering access, document the complete address, exact opening and evidence that the caller may instruct the work. This matters where a plan area contains public, commercial or shared sites; advance price information should also be given.`,
      second: `Use an on-site assessment to decide what is appropriate, checking the lock in relation to the door, frame and hinges. Area history cannot predict the condition encountered, so any changed diagnosis, work or charge needs a fresh explanation first.`,
    },
    {
      first: `The person requesting entry should identify both the premises and their authority to control the relevant entrance. MLA service-call guidance also calls for expected costs to be communicated before work, rather than after an intervention has begun.`,
      second: `Examine the complete entrance before settling the scope. Police advice supports considering doors, frames, hinges and locks together; use that observed condition, not nearby planning features, when explaining the work and any alteration to the quoted charge.`,
    },
    {
      first: `Start with a precise address, a named opening and a documented authority check. A council plan or mapped feature cannot demonstrate occupation or consent, while the MLA charter supports making the anticipated cost clear before access work proceeds.`,
      second: `Inspection should cover the door leaf, frame, hinges and lock rather than treating a reported symptom as a diagnosis. If those facts require a different approach, give the reason and revised cost to the authorised customer before continuing.`,
    },
    {
      first: `Do not substitute local familiarity for verification. Confirm the requester, permission, full postal address and controlled doorway; then set out expected charges as the MLA service-call charter requires before any physical work is started.`,
      second: `A defensible scope comes from the particular entrance. Consider the lock with its surrounding door set and describe what the inspection supports. Where that differs from the telephone account, stop and agree the resulting change in work and cost.`,
    },
    {
      first: `Even a time-sensitive access request needs an accountable instruction. Verify identity, authority, address and affected door, and give available cost information in advance; locality evidence alone cannot establish any of those customer-specific facts.`,
      second: `Determine the practical scope only after seeing the entrance, including door, frame, hinges and lock. Explain the evidence behind the proposal and obtain approval for any variation, because a neighbourhood plan cannot prescribe an entry technique.`,
    },
  ],
  'lock-change': [
    {
      first: `A lock change should be specified from the individual opening. Check the existing lock with the door, frame and hinges, establish who controls it, and obtain any written owner, manager or insurer requirement instead of deriving one from local planning context.`,
      second: `Police guidance supports correctly sized cylinders and accredited products where they suit the verified door set. Present the proposed specification and price before fitting, and resolve any address-specific conservation, listed-building or management permission that the alteration may require.`,
    },
    {
      first: `Begin with the reason for replacement and the condition of the complete door assembly, not the apparent character of nearby streets. Authority to change the particular lock and any documented performance requirement must come from the responsible customer or manager.`,
      second: `If a cylinder is relevant, check its dimensions against the door and protective furniture and consider an appropriately accredited product. The authorised person should approve specification and cost, with exact property-status controls checked before visible fabric is altered.`,
    },
    {
      first: `Define the controlled entrance, requested outcome and person entitled to approve a change. Inspect frame, hinges, door and lock together, because official settlement evidence cannot establish which mechanism is fitted or whether another part causes the problem.`,
      second: `Select components only after that assessment. Police material highlights whole-door security, correct cylinder sizing and accredited products; MLA principles require advance cost information and an explanation before scope changes. Obtain any heritage or site consent for the exact address.`,
    },
    {
      first: `Photographs can clarify the question, but a replacement decision still depends on the actual doorway and authority behind the instruction. Record the existing assembly and written objective rather than assigning a standard from a conservation or plan-area label.`,
      second: `Match the proposed lock or cylinder to the verified door set and explain both specification and anticipated cost in advance. Where the opening is communal, managed, listed or within a conservation boundary, confirm the applicable approval rather than assuming permission.`,
    },
    {
      first: `A planning document can trigger useful questions but cannot choose replacement hardware. Identify the exact lock, examine its interaction with frame and hinges, and ask the authorised party for the purpose of change and any external requirements in writing.`,
      second: `Police advice supports assessing the whole door and, when cylinders are involved, checking size and accredited options. Agree what will be fitted and the cost before work, then deal separately with property-specific heritage, lease or management constraints.`,
    },
    {
      first: `Treat each change as an address-level specification. Confirm which entrance is controlled, who may instruct work and what is being requested, then inspect the lock, door, frame and hinges without relying on the settlement's age or planning classification.`,
      second: `A suitable component follows the observed assembly. Consider correctly sized cylinders and accredited products where applicable, provide price and scope before fitting, and verify any consent affecting visible, shared or protected fabric at that particular property.`,
    },
    {
      first: `Do not infer a standard replacement from an area page. The responsible person should identify the precise opening and objective. Lock condition, door movement, hinges and frame alignment remain separate inspection questions, and the reported symptom does not identify which component, if any, requires work. Record any written insurer or site-management criterion.`,
      second: `Use the technical evidence to compare options compatible with the door set, including proper cylinder dimensions and accredited security products when relevant. Secure approval of specification and cost, plus any conservation or building-management permission, before making the change.`,
    },
    {
      first: `The evidence for changing a lock is the existing entrance and a valid instruction. Examine all parts of the door set, clarify the desired outcome and confirm authority; neither a named character area nor an official local centre proves the installed hardware.`,
      second: `Propose a correctly matched solution after inspection, explaining price before work and any later variation before it is undertaken. Check the exact property's listed, conservation, communal or institutional rules wherever the alteration could engage them.`,
    },
    {
      first: `Start by separating a lock fault, an alignment issue and a requested security change. That requires the actual door, frame, hinges and lock, together with authority and any documented requirement; broad locality facts cannot perform this specification work.`,
      second: `Where appropriate, police guidance points to properly sized cylinders and accredited products within a whole-door assessment. Give the authorised decision-maker a clear proposal and advance cost, and establish address-level permission before changing protected or managed elements.`,
    },
  ],
  'upvc-lock-repair': [
    {
      first: `Treat “uPVC lock repair” as a reported symptom until the entrance is identified. Ask what the handle and key do, whether behaviour changes with the door open, and for images of the edge and keeps; a locality source cannot prove material or mechanism.`,
      second: `Police guidance notes that many multipoint doors are locked by lifting the handle before turning the key. That operational check is not a diagnosis: assess the lock, frame, hinges and alignment together, then agree authority, repair scope and likely cost.`,
    },
    {
      first: `No planning classification demonstrates that a particular door is uPVC, composite or multipoint. Record the exact opening, handle travel, key movement, locking-point behaviour and whether the symptom occurs open as well as closed before deciding what requires inspection.`,
      second: `Correct operation may involve raising the handle before turning the key, as the police source explains, but persistent difficulty needs a whole-door assessment. Confirm the authorised requester and explain the proposed work and cost before repair or any revised diagnosis.`,
    },
    {
      first: `A neighbourhood name cannot identify a replacement mechanism. Establish the door material directly, obtain clear photographs where possible and ask the caller to describe handle, key and frame contact precisely, including whether the entrance can currently be opened safely.`,
      second: `Use the police lift-handle-and-turn-key guidance as an operational question, not a conclusion. Inspection should cover hinges, alignment, frame and lock together; MLA service-call principles also require authority and cost information before the agreed repair proceeds.`,
    },
    {
      first: `Do not convert a development date, local-centre label or conservation fact into a hardware claim. Useful evidence is door-specific: exact entrance, visible locking points, key movement, handle movement and any difference between operation while open and while closed.`,
      second: `Many multipoint systems require the handle to be lifted before key locking, but that fact does not identify the fault. Review the full assembly, describe the observed diagnosis, and gain approval for scope and cost from the person authorised to instruct work.`,
    },
    {
      first: `Before selecting any repair part, verify the opening and installed system. Photographs and a careful account of handle resistance, key travel and frame contact can frame the inspection; official area evidence contributes location only and cannot establish door construction.`,
      second: `Police advice describes normal handle-lift operation on many multipoint doors and recommends considering the complete door. Apply those checks to the actual assembly, then communicate the authorised repair and anticipated charge before proceeding or changing the agreed work.`,
    },
    {
      first: `A caller's use of “multipoint” or “uPVC” should be checked against the door itself. Capture the full address, affected opening, current open-or-closed state, handle action, key action and images; nearby planning features are not diagnostic evidence.`,
      second: `Ask whether lifting the handle before turning the key changes operation, consistently with police advice, while avoiding a remote diagnosis. Inspect frame, hinges, alignment and lock as one system and agree the supported scope and cost with the authorised party.`,
    },
    {
      first: `Separate the reported symptom from the eventual diagnosis. Identify the precise door, confirm its material and record how the handle, key and locking points behave on and off the frame; an area-wide source cannot reveal those physical facts.`,
      second: `The published operating advice for many multipoint doors is to lift the handle before key locking. If difficulty remains, examine the whole door set and explain proposed repair, authority basis and price before work, including any change found during inspection.`,
    },
    {
      first: `Use direct evidence rather than choosing a mechanism from the address label. A useful report distinguishes the affected entrance, door position, handle movement, key movement and visible contact with the frame, supported by photographs where they can be obtained safely.`,
      second: `The handle-lift sequence in police guidance can rule out an operating misunderstanding but cannot prove a component failure. Review door, frame, hinges and lock, then state repair scope and expected charge to the verified decision-maker before beginning.`,
    },
    {
      first: `Local heritage or growth context says nothing reliable about a fitted multipoint system. Ask for the exact door and symptoms, including how it behaves when open, whether the handle reaches its usual position and what happens when the key turns.`,
      second: `After checking the normal lift-handle-and-turn-key sequence where applicable, inspect alignment and the complete assembly. The customer who can authorise the work should receive an evidence-based explanation and cost before repair, with later variations agreed separately.`,
    },
  ],
  'boarding-up': [
    {
      first: `Identify the damaged door or window, the person responsible for the premises and whether police need the scene preserved. Police guidance supports photographing damage and avoiding disturbance of possible forensic evidence until the relevant instructions have been obtained.`,
      second: `After evidential needs are addressed, the police source describes securing a damaged opening from outside. The temporary method, safe access, ownership approval and cost must still be agreed for the observed structure; locality evidence cannot select materials or permissions.`,
    },
    {
      first: `A board-up instruction should name every affected opening and the authorised contact. If damage may relate to a reported incident, record it photographically and follow police directions before moving, cleaning or covering anything that could retain evidence.`,
      second: `Once that boundary is clear, consider an outside-applied temporary measure for the actual door or window. Explain what the work includes, its anticipated price and any site constraint, keeping permanent reinstatement separate from the immediate securing decision.`,
    },
    {
      first: `Start with scene status, not with assumptions from the surrounding area. Verify the address, damaged opening and responsible decision-maker, and establish whether an investigation requires photographs or preservation of possible evidence before temporary work can begin.`,
      second: `Police advice supports making the damaged opening secure from the outside after evidence questions are resolved. Choose practical scope from the observed fabric and permissions, state the cost beforehand and confirm any heritage, landlord or management restriction.`,
    },
    {
      first: `The reported damage needs its own record: exact entrance or window, current safety condition, authorised customer and police status. Potential forensic material should be photographed and left undisturbed in accordance with police guidance until securing work is permitted.`,
      second: `Temporary security can then be planned from outside the particular opening. Obtain access and property approval, define what is and is not included and give advance cost information; a park, river or planning boundary does not establish construction.`,
    },
    {
      first: `Do not treat a locality description as a survey of the incident. Confirm which opening is damaged, who controls it and whether police have requested preservation; photographs and an undisturbed scene may be important before any fixing is introduced.`,
      second: `When evidential constraints permit, police information supports external securing of the damaged door or window. Assess the actual structure, agree a temporary scope and price, and check the exact property's ownership, conservation or site-management requirements before attachment.`,
    },
    {
      first: `Separate immediate danger, evidence and authority questions at the outset. The full address, each damaged opening and responsible contact are required, while a possible crime scene should be photographed and preserved until police instructions allow physical security work.`,
      second: `An outside-applied temporary measure may then be considered, consistently with the police source. Its form depends on the observed opening, safe access and permissions; explain the intended result and charge without presenting temporary work as permanent repair.`,
    },
    {
      first: `Before boarding an opening, determine who can instruct work and whether the scene remains evidential. Police guidance supports documenting damage and preserving material that may assist an investigation, so no locality-based urgency claim should override that sequence.`,
      second: `Once cleared, plan external temporary security for the specific door or window. Establish owner or manager consent, access and any status constraint, then agree scope and cost. Official area facts do not reveal materials, dimensions or attachment points.`,
    },
    {
      first: `A request for temporary securing must distinguish the affected premise from nearby public or managed land. Name the exact opening and authorised party, and ask whether police require photographs or undisturbed forensic evidence before anything is moved or covered.`,
      second: `Following that check, police advice is to make the damaged opening secure from outside. Inspection and property permission determine the temporary plan; provide cost information in advance and do not infer the method from a settlement's planning description.`,
    },
    {
      first: `Record the scene before defining the job: full address, damaged door or window, responsible person and investigation status. Where evidence could matter, use photographs and preserve it according to police direction instead of allowing a general area description to drive action.`,
      second: `After clearance, assess an external temporary securing measure against the real opening and site rules. Agree authorised scope and anticipated cost, including any heritage or management check, and identify permanent replacement as a separate later decision.`,
    },
  ],
  'lock-upgrade': [
    {
      first: `An upgrade needs a verified objective at a named entrance. Inspect the door, frame, hinges and current lock, and obtain any written insurer, landlord or manager criterion; an area's history, land use or designation is not a security specification.`,
      second: `Police guidance supports correctly sized cylinders and accredited products as elements of a whole-door review. Compare options against what is installed, agree specification and price, and resolve exact conservation, listed-building, communal-door or site approval before changing visible hardware.`,
    },
    {
      first: `Start the upgrade discussion with the actual opening and authorised customer's documented requirement. A made plan, local-centre description or heritage boundary cannot establish the existing lock, applicable standard or permission to alter it.`,
      second: `Assess lock, frame, hinges and door together, considering cylinder dimensions and accredited products where appropriate. Present compatible options and cost first; if the entrance is protected, shared or managed, obtain address-specific consent before installation.`,
    },
    {
      first: `Avoid selecting hardware from a neighbourhood label or perceived building era. Record the controlled entrance and full door set, clarify the purpose of improvement and request any policy or management condition in writing from the person entitled to approve it.`,
      second: `Use police whole-door principles to assess options, including correctly sized cylinders and accredited products where relevant. Explain the proposed scope and charge, and verify listed-building, conservation, lease, fire or institutional constraints for the particular doorway before work.`,
    },
    {
      first: `A meaningful comparison requires the individual door, not a broad planning profile. Document frame, hinges, lock and protective furniture, then distinguish a voluntary improvement from a written insurer, landlord or facilities requirement supplied by the authorised customer.`,
      second: `Accredited products and proper cylinder sizing are considerations within the complete-door assessment described by police. Match them to the observed assembly, agree the selected specification and price, and secure any consent applying to visible or shared elements.`,
    },
    {
      first: `Use local evidence only to identify questions that need checking. The upgrade basis is the precise entrance, its current components and a documented goal; conservation status, settlement category or nearby land use cannot demonstrate risk or choose hardware.`,
      second: `Police advice considers the door, frame, hinges and lock as a system and points to correctly sized cylinders and accredited products. Apply that evidence at the address, explain options and cost, and confirm property-specific approval before alteration.`,
    },
    {
      first: `Define what the authorised customer wants to achieve and which door is involved before discussing products. Inspect its assembly and obtain any external standard in writing, because official locality facts do not prove current hardware, vulnerability or management responsibility.`,
      second: `Where compatible, assess accredited options and correct cylinder dimensions within a whole-door review. The decision-maker should approve final specification and charge after any conservation, listed, communal, lease or institutional condition for that entrance has been resolved.`,
    },
    {
      first: `An upgrade is an address-specific design decision. Identify the opening, record the existing door, frame, hinges and lock, and establish both authority and exact performance objective without translating an area designation into a security conclusion.`,
      second: `Police technical sources support reviewing the complete door and considering correctly sized cylinders and accredited products. Compare only compatible choices, set out cost and scope in advance, and obtain whatever property or site consent the proposed visible change requires.`,
    },
    {
      first: `Do not use proximity to a landmark, conservation area or development allocation as a proxy for need. The evidence must come from the particular door set and a stated requirement from its authorised owner, occupier or manager.`,
      second: `Assess frame and hinges alongside the lock, checking cylinder fit and accredited options where those are relevant. Explain each compatible specification and price before selection, and verify exact-address heritage, shared-door or management restrictions before fitting.`,
    },
    {
      first: `Separate the customer's desired outcome from assumptions about the settlement. A proper upgrade record names the entrance, current assembly, responsible party and any written insurer or manager condition; official local history cannot supply those property-level facts.`,
      second: `Apply police whole-door guidance to what is actually present, including correct cylinder sizing and accredited products when suitable. Obtain informed approval of proposed work and cost, plus any permission required for protected, communal or institutionally controlled fabric.`,
    },
  ],
}

function localitySource(
  id: string,
  title: string,
  publisher: string,
  url: string,
  supports: string,
  kind: AreaGuideSource['kind'] = 'locality',
): AreaGuideSource {
  return { id, title, publisher, url, supports, checkedOn: EVIDENCE_REVIEWED_ON, kind }
}

const LOCALITY_SOURCES: Record<string, AreaGuideSource> = {
  'wdc-leamington-plan-page': localitySource('wdc-leamington-plan-page', 'Royal Leamington Spa neighbourhood plan', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1096/royal_leamington_spa', 'The made date, legal planning status and application of the Royal Leamington Spa neighbourhood plan.'),
  'wdc-leamington-plan': localitySource('wdc-leamington-plan', 'Royal Leamington Spa Neighbourhood Plan, June 2020', 'Warwick District Council (host; Royal Leamington Spa Town Council plan)', 'https://www.warwickdc.gov.uk/download/downloads/id/6087/final_rlsndp_for_referendum.pdf', 'The River Leam spatial description and named Milverton, Lillington and Sydenham planning features.'),
  'wdc-leamington-conservation': localitySource('wdc-leamington-conservation', 'A Guide to Conservation Areas: Royal Leamington Spa Conservation Area', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/3081/leamington_-_guide_to_conservation_areas.pdf', 'The mapped Leamington designation and its named New Milverton and Lillington character areas.', 'property-status'),
  'wdc-local-plan': localitySource('wdc-local-plan', 'Warwick District Local Plan 2011-2029, adopted September 2017', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/4623/new_local_plan.pdf', 'The adopted settlement hierarchy, named local centres and conservation-area table for Warwick District.'),
  'wdc-whitnash-plan-page': localitySource('wdc-whitnash-plan-page', 'Whitnash neighbourhood plan', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/964/whitnash_neighbourhood_plan', 'The referendum date and date on which the Whitnash plan was brought into legal force.'),
  'wdc-monitoring-report-2024-25': localitySource('wdc-monitoring-report-2024-25', 'Authority Monitoring Report 2024-25', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/9326/authority_monitoring_report_2024-25.pdf', 'The dated completion and not-started status recorded for elements of Lower Heathcote Local Centre.'),
  'wdc-tachbrook-park': localitySource('wdc-tachbrook-park', 'Facilities planned within the park: Tachbrook Country Park development', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20311/our_parks/2125/tachbrook_country_park_development/3', 'The planned north-west play area described by the council as the Heathcote area.'),
  'wdc-warwick-conservation': localitySource('wdc-warwick-conservation', 'A Guide to Conservation Areas: Warwick Conservation Area', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/3082/warwick_-_guide_to_conservation_areas.pdf', 'The mapped Warwick designation and its fifteen named character sections.', 'property-status'),
  'wdc-community-parks': localitySource('wdc-community-parks', 'Community parks', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20245/parks_and_green_spaces/215/community_parks', 'The council park records and named access points for Woodloes Park, Chase Meadow and Warwick Gates.'),
  'sdc-stratford-plan-page': localitySource('sdc-stratford-plan-page', 'Stratford-upon-Avon Neighbourhood Plan', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/stratford-upon-avon-neighbourhood-plan.cfm', 'The made date and current development-plan status of the Stratford-upon-Avon neighbourhood plan.'),
  'sdc-stratford-made-plan': localitySource('sdc-stratford-made-plan', 'Stratford-upon-Avon Neighbourhood Development Plan 2011-2031, made version', 'Stratford-on-Avon District Council (host; Stratford-upon-Avon Town Council plan)', 'https://www.stratford.gov.uk/doc/208868/name/Stratford-upon-Avon%20made%20Neighbourhood%20Plan.pdf', 'The River Avon corridor, Tiddington, Bishopton and Shottery policies and site descriptions in the made plan.'),
  'sdc-conservation-h-z': localitySource('sdc-conservation-h-z', 'Conservation Areas H-Z', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/conservation-areas-h-z.cfm', 'Published conservation-area maps, reports and appraisal documents for Stratford-upon-Avon and Southam.', 'property-status'),
  'sdc-conservation-review-2026': localitySource('sdc-conservation-review-2026', 'Conservation Area Reviews 2026', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/conservation-areas.cfm', 'The council-commissioned review of eight conservation-area appraisals, including Stratford-upon-Avon and Southam, with formal consultation in 2026.', 'property-status'),
  'sdc-shottery-conservation': localitySource('sdc-shottery-conservation', 'Shottery Conservation Area report', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/doc/175565/name/Shottery.pdf', 'Shottery Conservation Area designation and formal appraisal dates.', 'property-status'),
  'wdc-kenilworth-plan-page': localitySource('wdc-kenilworth-plan-page', 'Kenilworth neighbourhood plan', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1006/kenilworth_neighbourhood_plan', 'The referendum, made date and planning use of the Kenilworth neighbourhood plan.'),
  'wdc-kenilworth-conservation': localitySource('wdc-kenilworth-conservation', 'A Guide to Conservation Areas: Kenilworth Conservation Area', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/3080/kenilworth_-_guide_to_conservation_areas.pdf', 'Kenilworth conservation-area designation history and the named 2005 extensions.', 'property-status'),
  'solihull-balsall-plan-page': localitySource('solihull-balsall-plan-page', 'Balsall Neighbourhood Plan', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/balsall-neighbourhood-plan', 'The made date and decision-making role of the Balsall Parish neighbourhood plan.'),
  'solihull-balsall-made-plan': localitySource('solihull-balsall-made-plan', 'Balsall Parish Neighbourhood Development Plan 2018-2033', 'Solihull Metropolitan Borough Council (host; Balsall Parish Council plan)', 'https://www.solihull.gov.uk/sites/default/files/2021-06/Balsall-Parish-Neighbourhood-Development-Plan.pdf', 'The cross-parish extent of Balsall Common and the plan limit to the Balsall-parish portion.'),
  'solihull-meriden-plan-page': localitySource('solihull-meriden-plan-page', 'Meriden Neighbourhood Plan', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/meriden-neighbourhood-plan', 'The referendum, made date and decision-making role of the Meriden Parish neighbourhood plan.'),
  'solihull-conservation-areas': localitySource('solihull-conservation-areas', 'Conservation Areas', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/conservation-areas', 'The council register entries for Meriden Green and Meriden Hill Conservation Areas.', 'property-status'),
  'solihull-hampton-plan-page': localitySource('solihull-hampton-plan-page', 'Hampton-in-Arden neighbourhood plan', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/hampton-arden-neighbourhood-plan', 'The continuing scope of the 2017 plan and withdrawal of the newer submission draft.'),
  'solihull-hampton-history': localitySource('solihull-hampton-history', 'Hampton in Arden history', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/about-solihull/hampton-arden-history', 'The council statement that central Hampton-in-Arden was designated a conservation area in 1968.', 'property-status'),
  'rbc-wolston-conservation': localitySource('rbc-wolston-conservation', 'Wolston Conservation Area Character Appraisal', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6569677/Wolston_Character_Appraisal.pdf/bc559f87-8d33-e741-9b96-c4797248699b?t=1750866416447', 'The limited conservation area, River Avon relationship and railway bridge separating Wolston and Brandon.', 'property-status'),
  'rbc-wolston-plan-page': localitySource('rbc-wolston-plan-page', 'Wolston Neighbourhood Plan', 'Rugby Borough Council', 'https://www.rugby.gov.uk/w/wolston-neighbourhood-plan', 'The neighbourhood-area designation and current screening and consultation-stage records published by the council.'),
  'rbc-ryton-plan-page': localitySource('rbc-ryton-plan-page', 'Ryton-on-Dunsmore Neighbourhood Plan: plan adoption', 'Rugby Borough Council', 'https://www.rugby.gov.uk/pl/w/ryton-on-dunsmore-neighbourhood-plan-1', 'The made date and development-plan status of the Ryton-on-Dunsmore neighbourhood plan.'),
  'rbc-ryton-made-plan': localitySource('rbc-ryton-made-plan', 'Ryton-on-Dunsmore Neighbourhood Plan, adopted July 2021', 'Rugby Borough Council (host; Ryton-on-Dunsmore Parish Council plan)', 'https://www.rugby.gov.uk/documents/20124/6578033/Ryton_on_Dunsmore_Neighbourhood_Plan__adopted_version___July_2021_.pdf/e2fd154b-c7a7-2df7-ef14-5850fa003c6b?t=1750863717054', 'The civil-parish plan boundary, River Avon valley edges and Main Rural Settlement classification.'),
  'wdc-baginton-plan-page': localitySource('wdc-baginton-plan-page', 'Baginton and Bubbenhall neighbourhood plan', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1129/baginton_and_bubbenhall_neighbourhood_plan', 'The joint parish preparation and referendum result for the made Baginton and Bubbenhall plan.'),
  'rbc-brandon-plan-page': localitySource('rbc-brandon-plan-page', 'Brandon and Bretford Neighbourhood Plan', 'Rugby Borough Council', 'https://www.rugby.gov.uk/w/brandon-and-bretford-neighbourhood-plan', 'The made date and development-plan status of the joint Brandon and Bretford neighbourhood plan.'),
  'rbc-brandon-conservation': localitySource('rbc-brandon-conservation', 'Brandon Conservation Area Character Appraisal', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6569677/Brandon_Character_Appraisal.pdf/9c7d8630-4654-dcde-6287-650846002cb2?t=1750866416443', 'The bounded Brandon conservation context north of Avondale Road and railway-viaduct approach.', 'property-status'),
  'rbc-rural-study-2024': localitySource('rbc-rural-study-2024', 'Rugby Borough Council Rural Sustainability Study 2024', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/62894537/CD.3.10%2BAppendix%2B10%2BRugby%2BBorough%2BCouncil%2BRural%2BSustainability%2BStudy%2B2024.pdf/6837df18-54d6-0146-1910-37307fb4a34f?t=1774451299803', 'Shilton Rural Village classification and its place within Shilton and Barnacle civil parish.'),
  'wcc-shilton-bus': localitySource('wcc-shilton-bus', 'Bus service 74/74A/74B/74C', 'Warwickshire County Council', 'https://apps.warwickshire.gov.uk/BusTimetable/services/1379', 'The live county timetable listing Shilton on the Nuneaton and Coventry corridor.'),
  'rbc-brinklow-plan-page': localitySource('rbc-brinklow-plan-page', 'Brinklow Neighbourhood Plan', 'Rugby Borough Council', 'https://www.rugby.gov.uk/w/brinklow-neighbourhood-plan', 'The made date and development-plan status of the Brinklow neighbourhood plan.'),
  'rbc-brinklow-conservation': localitySource('rbc-brinklow-conservation', 'Brinklow Conservation Area Character Appraisal', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6569677/Brinklow_Character_Appraisal.pdf/701c66c7-5596-39a8-e538-ab8daa4f699f?t=1750866416443', 'The partial-village conservation boundary and its inclusion of part of Ell Lane.', 'property-status'),
  'sdc-southam-plan-page': localitySource('sdc-southam-plan-page', 'Southam Neighbourhood Plan', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/southam-neighbourhood-plan.cfm', 'The made date and current development-plan role of the Southam neighbourhood plan.'),
  'sdc-parish-plans': localitySource('sdc-parish-plans', 'List of Adopted Parish Plans', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/parish-plans-a-m.cfm', 'The February 2017 adoption entry for the Studley Parish Plan and Action Plan.'),
  'sdc-studley-area-report': localitySource('sdc-studley-area-report', 'Studley Neighbourhood Area Report, 17 January 2018', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/doc/207189/name/Studley%20NDP%20area%20report%20Leader%20of%20Council.pdf/', 'The Studley Parish Council application to designate the whole civil parish as its neighbourhood area.'),
  'sdc-designated-neighbourhood-areas': localitySource('sdc-designated-neighbourhood-areas', 'Designated Neighbourhood Plan Areas', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/designated-neighbourhood-plan-areas.cfm', 'The current Studley neighbourhood-area entry and linked confirmation documents.'),
  'sdc-alcester-plan-page': localitySource('sdc-alcester-plan-page', 'Alcester Neighbourhood Plan', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/alcester-neighbourhood-plan.cfm', 'The 2021 made plan and Town Council review consultation recorded from December 2025.'),
  'sdc-conservation-a-g': localitySource('sdc-conservation-a-g', 'Conservation Areas A-G', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/conservation-areas-a-g.cfm', 'The published Alcester Conservation Area map, broadsheet and two-part character appraisal.', 'property-status'),
}

const SERVICE_LABELS: Record<ServiceAreaSlug, string> = {
  'emergency-lockout': 'emergency access checks',
  'lock-change': 'evidence-led lock replacement',
  'upvc-lock-repair': 'checking a reported uPVC lock fault',
  'boarding-up': 'temporary security after damage',
  'lock-upgrade': 'planning a door-security upgrade',
}

const SERVICE_CHECKS: Record<ServiceAreaSlug, string> = {
  'emergency-lockout': 'Verify identity, authority and the controlled entrance.',
  'lock-change': 'Confirm who may authorise the specific replacement.',
  'upvc-lock-repair': 'Record handle, key and open-or-closed door behaviour.',
  'boarding-up': 'Name each damaged opening and authorised contact.',
  'lock-upgrade': 'Document the whole existing door assembly.',
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
  const protocols = TECHNICAL_COPY[service]
  const firstProtocol = protocols[variant % protocols.length].first
  const secondProtocol = protocols[Math.floor(variant / protocols.length) % protocols.length].second
  return {
    heading: `${SERVICE_LABELS[service]} for ${seed.name}`,
    body: [`${context.local} ${firstProtocol}`, `${context.decision} ${secondProtocol}`],
    checks: [SERVICE_CHECKS[service], ...context.checks],
    faq: {
      q: `What should I provide for ${SERVICE_LABELS[service]} at an address in ${seed.name}?`,
      a: `${context.local} ${SERVICE_CHECKS[service]} ${context.decision}`,
    },
  }
}

function buildGuide(seed: AreaGuideSeed, areaIndex: number): GovernedAreaGuide {
  const serviceGuidance = Object.fromEntries(
    SERVICE_AREA_SLUGS.map((service, serviceIndex) => [
      service,
      buildServiceGuidance(seed, service, seed.contexts[service], areaIndex + serviceIndex * 11),
    ]),
  ) as Record<ServiceAreaSlug, AreaServiceGuidance>

  return {
    slug: seed.slug,
    reviewedOn: EVIDENCE_REVIEWED_ON,
    summary: seed.summary,
    accessGuidance: seed.accessGuidance,
    evidenceLimits: seed.evidenceLimits,
    facts: seed.facts,
    sources: [...seed.sourceIds.map((id) => LOCALITY_SOURCES[id]), ...technicalSources(seed.region)],
    serviceGuidance,
    faqs: [
      {
        q: `Do the official sources identify the door or lock at my ${seed.name} address?`,
        a: `No. ${seed.evidenceLimits}`,
      },
      {
        q: `Why is the complete ${seed.name} address needed before work is planned?`,
        a: `${seed.facts[0].serviceRelevance} ${seed.facts.at(-1)?.serviceRelevance} That is why the complete ${seed.name} address and exact entrance must be supplied before work is planned.`,
      },
    ],
  }
}

const AREA_SEEDS: AreaGuideSeed[] = [
  {
    slug: 'leamington-spa',
    name: 'Royal Leamington Spa',
    region: 'Warwickshire',
    summary: [
      `Warwick District Council made the Royal Leamington Spa Neighbourhood Development Plan on 12 May 2021. The plan describes the River Leam through the town centre and the council's conservation guide maps named character areas within the designation.`,
      `Those official sources provide town-scale planning, river and conservation context only. They do not establish which side of the river an address occupies, whether it falls inside a current designation, who controls an entrance or what lock is installed.`,
    ],
    accessGuidance: `Obtain the complete address and exact entrance, using a caller-confirmed north or south River Leam distinction only when it genuinely resolves location. Check current conservation boundaries and the responsible person separately before any visible alteration.`,
    evidenceLimits: `The neighbourhood-plan area, river description and conservation character map are not property records. None proves service coverage, route suitability, ownership, access rights, listed status, building fabric, door material, installed hardware or condition at an individual address.`,
    facts: [
      {
        text: `Warwick District Council made the Royal Leamington Spa Neighbourhood Development Plan on 12 May 2021 and uses it when considering planning applications in Leamington Spa.`,
        sourceIds: ['wdc-leamington-plan-page'],
        serviceRelevance: `Use the plan as official planning context only; it cannot establish an address, customer authority or locksmith requirement.`,
      },
      {
        text: `The made plan says the River Leam flows through the town centre, separating north and south Royal Leamington Spa, with early development beginning on the southern bank.`,
        sourceIds: ['wdc-leamington-plan'],
        serviceRelevance: `Use the river distinction only as caller-confirmed orientation, never as evidence of route, travel time or service reach.`,
      },
      {
        text: `Warwick District Council publishes a Royal Leamington Spa Conservation Area guide whose key map divides the designation into named character areas.`,
        sourceIds: ['wdc-leamington-conservation'],
        serviceRelevance: `Check the exact current boundary before conservation guidance and verify listed status independently for the particular building.`,
      },
    ],
    sourceIds: ['wdc-leamington-plan-page', 'wdc-leamington-plan', 'wdc-leamington-conservation'],
    contexts: {
      'emergency-lockout': {
        local: `The plan's River Leam description can help clarify whether a caller means the north or south side of central Leamington, but it cannot replace a street address, building number and exact doorway. Do not treat the river as evidence of a viable approach route.`,
        decision: `Where the supplied landmark falls within one of the mapped conservation character areas, that map still says nothing about occupation or access authority. Verify the requester against the particular premises before deciding how an urgent entry instruction may proceed.`,
        checks: [
          `Record the street, building number and doorway; use a caller-confirmed River Leam side only to disambiguate central location.`,
          `Check the requester against the premises; a conservation character-area match cannot establish occupation or authority.`,
        ],
      },
      'lock-change': {
        local: `Leamington's conservation guide divides the designation into character areas rather than applying one undifferentiated status to the town. For a visible lock change, resolve the address against the current map and then establish any building-specific or management approval.`,
        decision: `The neighbourhood plan's made status is planning evidence, not a replacement specification. Inspect the actual entrance and keep the plan, conservation boundary and any separately verified listed status distinct when agreeing what may be changed.`,
        checks: [
          `Resolve the exact address against the current conservation map before planning any visible replacement.`,
          `Inspect the entrance and verify building, management and listed-status controls separately from neighbourhood-plan context.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither the River Leam's north-south division nor the named conservation character areas shows that a Leamington entrance is uPVC or uses multipoint locking. Ask for direct evidence from the affected door instead of translating town geography into a mechanism.`,
        decision: `If the address is described only by a central landmark or river side, first obtain the full postal location and exact opening. Conservation context may affect later visible work, but it cannot diagnose handle, key, alignment or locking-point behaviour.`,
        checks: [
          `Collect door material, handle, key and frame symptoms; do not infer a mechanism from river or character-area context.`,
          `Use a central landmark only to resolve the full address, then check conservation permission only for the supported repair.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening in central Leamington needs an exact property reference because the river, town centre and conservation character areas describe overlapping spatial contexts. None identifies the responsible owner, occupier, manager or the construction that requires temporary securing.`,
        decision: `If an external fixing may affect an address inside the current conservation boundary, check that status and permission after any police evidence requirement is resolved. Do not generalise the mapped designation to every property on either side of the River Leam.`,
        checks: [
          `Identify the property, damaged opening and controller without relying on overlapping river, town-centre or character-area labels.`,
          `After preserving evidence, check the current boundary and permission before an external fixing; do not generalise it town-wide.`,
        ],
      },
      'lock-upgrade': {
        local: `The made neighbourhood plan and conservation guide can identify planning questions for a Leamington address, but neither demonstrates security need or an installed product. An upgrade discussion must begin with the precise doorway and a documented customer or manager objective.`,
        decision: `Where the current boundary check confirms conservation status, establish whether the proposed visible work requires consent; where it does not, do not import that constraint. The River Leam description remains orientation and cannot determine an upgrade standard.`,
        checks: [
          `Start with the precise doorway and a documented customer or manager objective; planning records cannot demonstrate security need.`,
          `Apply conservation or listed-building controls only after an address-level check; do not derive a standard from the River Leam.`,
        ],
      },
    },
  },
  {
    slug: 'milverton',
    name: 'Milverton',
    region: 'Warwickshire',
    summary: [
      `The Leamington conservation guide identifies New Milverton as character area 30 while expressly excluding Rugby Road and Warwick New Road. The neighbourhood plan separately names the Northumberland Road site of the Milverton New Allotments Association.`,
      `The service-area slug is broader than the guide's New Milverton character-area label. A full address must therefore be checked before using conservation wording, and neither source establishes the building, entrance, hardware, authority or practical access arrangements.`,
    ],
    accessGuidance: `Ask for the full Milverton address and distinguish New Milverton from the broader locality, especially Rugby Road and Warwick New Road exclusions. Treat Northumberland Road allotments as orientation only and confirm property status and authority independently.`,
    evidenceLimits: `A named conservation character area and protected allotment site do not describe every Milverton address. They provide no evidence of property type, listing, door material, lock mechanism, customer permission, route conditions, demand, response or prior work.`,
    facts: [
      {
        text: `The Royal Leamington Spa Conservation Area key map names New Milverton, excluding Rugby Road and Warwick New Road, as character area 30.`,
        sourceIds: ['wdc-leamington-conservation'],
        serviceRelevance: `Apply conservation wording only after confirming the address lies in that mapped character area rather than broader Milverton.`,
      },
      {
        text: `Neighbourhood Plan Policy RLS10 identifies the Northumberland Road Milverton New Allotments Association site as an allotment area protected in line with district policy.`,
        sourceIds: ['wdc-leamington-plan'],
        serviceRelevance: `Use the named site only as verified locality context, not evidence of proximity, access, property characteristics or work.`,
      },
    ],
    sourceIds: ['wdc-leamington-conservation', 'wdc-leamington-plan'],
    contexts: {
      'emergency-lockout': {
        local: `“Milverton” alone does not say whether the address is inside New Milverton character area 30, on an excluded section of Rugby Road or Warwick New Road, or elsewhere. Record the precise street, number and controlled entrance before considering access.`,
        decision: `Northumberland Road allotments may confirm a caller's general position, yet the protected site does not establish that a property is adjacent or reachable through it. Verify the actual premises and the requester's connection without using the allotments as an access shortcut.`,
        checks: [
          `Distinguish New Milverton from the excluded Rugby Road and Warwick New Road sections using the complete address.`,
          `Use the Northumberland Road allotments only for orientation; verify the premises and never assume access through the site.`,
        ],
      },
      'lock-change': {
        local: `The conservation guide's wording is specifically New Milverton and expressly excludes two roads, so a visible replacement must not inherit conservation assumptions from the broader service slug. Resolve the supplied address against the current designation before planning alteration.`,
        decision: `Policy protection for the Milverton New Allotments Association site concerns planning context, not the fabric of nearby doors. Specify a change from the inspected entrance and separately obtain any permission that the individual property record requires.`,
        checks: [
          `Check the current New Milverton boundary and both named road exclusions before applying conservation controls.`,
          `Specify the replacement from the inspected entrance; verify address-level permissions separately rather than relying on Northumberland Road allotment policy.`,
        ],
      },
      'upvc-lock-repair': {
        local: `New Milverton's character-area status does not show whether a reported door is uPVC, composite, timber or fitted with multipoint locking. The Rugby Road and Warwick New Road exclusions reinforce why address-level facts must precede any hardware diagnosis.`,
        decision: `A Northumberland Road reference can locate the conversation but supplies no information about handle travel, key movement, hinges or frame contact. Ask for those door-specific symptoms and keep allotment policy entirely separate from mechanical assessment.`,
        checks: [
          `Confirm the address and door material directly; New Milverton status and road exclusions cannot identify a mechanism.`,
          `Treat Northumberland Road as orientation only and record handle, key, hinge and frame behaviour from the affected door.`,
        ],
      },
      'boarding-up': {
        local: `For damaged external fabric, first determine whether the exact Milverton address is actually inside the current New Milverton conservation boundary rather than relying on the locality name. The two named road exclusions must remain visible in that check.`,
        decision: `If the report concerns an allotment building or boundary near Northumberland Road, identify the person responsible for that particular asset. The neighbourhood-plan protection does not establish ownership, construction, permission to attach material or safe access.`,
        checks: [
          `Resolve the current New Milverton boundary and the two road exclusions for the damaged property's exact address.`,
          `For an allotment asset, identify its controller, inspect the construction, and verify access and attachment permission separately.`,
        ],
      },
      'lock-upgrade': {
        local: `The official evidence distinguishes a bounded New Milverton character area from broader Milverton and records a protected allotment site. Neither fact demonstrates a security deficiency, so any upgrade objective must come from the inspected opening and authorised customer.`,
        decision: `Before visible hardware is altered, check whether the address falls within the current designation and what property-specific approval applies. Do not extend conservation controls to excluded roads or convert allotment policy into a product or performance requirement.`,
        checks: [
          `Derive the upgrade objective from the inspected opening and authorised customer, not the character area or allotment site.`,
          `Apply current address-level permissions without extending conservation controls to excluded roads or turning allotment policy into a standard.`,
        ],
      },
    },
  },
  {
    slug: 'lillington',
    name: 'Lillington',
    region: 'Warwickshire',
    summary: [
      `The Leamington conservation guide names Lillington Road North and Lillington Village as separate character areas 34 and 35. The adopted district local plan also identifies Crown Way, Lillington, as a local shopping centre.`,
      `These are partial designation and planning references, not an address-level survey of Lillington. They do not establish that a property lies in either character area, what use it has, how its entrance is arranged or which hardware is fitted.`,
    ],
    accessGuidance: `Use the full street address to distinguish the two named Lillington conservation character areas, Crown Way and other parts of the locality. Confirm the particular entrance, responsible person and current property status before planning any work.`,
    evidenceLimits: `The conservation key map and local-centre entry cannot be applied to all Lillington addresses. They provide no proof of a building's age, listing, use, access, ownership, door construction, lock type, condition or service availability.`,
    facts: [
      {
        text: `The Royal Leamington Spa Conservation Area key map names Lillington Road North and Lillington Village as character areas 34 and 35.`,
        sourceIds: ['wdc-leamington-conservation'],
        serviceRelevance: `Check the current mapped boundary before using either designation for an address elsewhere in the broader Lillington locality.`,
      },
      {
        text: `The adopted Warwick District Local Plan lists Crown Way, Lillington, as a local shopping centre in paragraph 3.103.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Use Crown Way only as caller-confirmed orientation; it does not prove a premise is nearby or within coverage.`,
      },
    ],
    sourceIds: ['wdc-leamington-conservation', 'wdc-local-plan'],
    contexts: {
      'emergency-lockout': {
        local: `The official evidence separates Lillington Road North, Lillington Village and the Crown Way local centre. A caller should therefore give the complete address and exact entrance rather than relying on “Lillington” or assuming a landmark identifies the premises.`,
        decision: `A Crown Way reference may distinguish part of the locality, but the local-plan label does not show whether an entrance is private, shared or managed. Establish the authorised person for the specified opening independently of the planning designation.`,
        checks: [
          `Use the complete address to distinguish Lillington Road North, Lillington Village, Crown Way and other streets.`,
          `Establish whether the named opening is private, shared or managed and verify its authorised person independently.`,
        ],
      },
      'lock-change': {
        local: `Lillington Road North and Lillington Village are separately named conservation character areas, not proof that every Lillington property is designated. Check the latest boundary for the exact address before deciding whether a visible replacement raises a heritage question.`,
        decision: `The Crown Way local-centre entry describes planning geography rather than a door set or responsible manager. Inspect the actual opening and obtain the building-specific authority and any necessary approval before a component is selected or changed.`,
        checks: [
          `Check the latest boundary to determine whether Lillington Road North, Lillington Village or neither designation applies.`,
          `Inspect the opening and obtain building-specific authority; Crown Way's planning label cannot specify hardware or a manager.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither the two conservation character labels nor Crown Way's local-centre status identifies door material or a multipoint mechanism. A Lillington repair report must describe the actual handle, key, frame interaction and affected entrance from direct observation.`,
        decision: `If the caller uses Lillington Village as orientation, preserve the distinction between locality and designation; the map cannot diagnose hardware. Check whether the symptom changes with the door open and base repair decisions on that entrance.`,
        checks: [
          `Record the exact entrance, door material and handle, key and frame interaction rather than inferring from local labels.`,
          `If Lillington Village is used for orientation, verify the boundary separately and test whether symptoms change with the door open.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening described only as Lillington could lie inside or outside either named character area, or relate to a premise around Crown Way. Establish the exact property and responsible party before any temporary external measure is specified.`,
        decision: `Where the current map confirms conservation context, address-specific permission may need checking after possible evidence is preserved. Do not assume the designation from a village label, and do not treat the local shopping-centre record as ownership or access authority.`,
        checks: [
          `Locate the damaged property against both named character areas and Crown Way before defining a temporary external measure.`,
          `After preserving evidence, verify address-specific permission and ownership without treating village or local-centre labels as authority.`,
        ],
      },
      'lock-upgrade': {
        local: `Lillington's official character areas and local centre can prompt location and permission questions, but they cannot demonstrate current security hardware or need. Start an upgrade with the exact entrance, observed assembly and a documented requirement from its authorised controller.`,
        decision: `Confirm whether the property is within Lillington Road North, Lillington Village or neither before applying conservation considerations. Crown Way's planning status is not a security standard, so product choices must remain evidence-led and address-specific.`,
        checks: [
          `Base the objective on the exact entrance, observed assembly and authorised controller rather than Lillington planning labels.`,
          `Confirm which conservation area, if any, applies and keep Crown Way's local-centre status out of product selection.`,
        ],
      },
    },
  },
  {
    slug: 'sydenham',
    name: 'Sydenham',
    region: 'Warwickshire',
    summary: [
      `The Royal Leamington Spa Neighbourhood Plan identifies Sydenham Drive as a local shopping centre and names Sydenham Industrial Estate among the town's manufacturing locations. These are two official but different land-use references.`,
      `Neither reference identifies a particular Sydenham property, business unit, occupier, entrance or installed locking system. A caller's full address and the responsible private or managed-premises contact remain necessary before any service decision.`,
    ],
    accessGuidance: `Distinguish a Sydenham Drive address from a unit on Sydenham Industrial Estate and from other Sydenham streets. Record the building or unit, exact controlled entrance and person authorised by the occupier, owner or manager.`,
    evidenceLimits: `Local-centre and manufacturing-location descriptions are planning context only. They do not prove premise use at an individual address, ownership, access rights, operating hours, door type, lock mechanism, security need, service coverage or response time.`,
    facts: [
      {
        text: `Royal Leamington Spa Neighbourhood Plan Policy RLS19 identifies Sydenham Drive as one of the plan's local shopping centres.`,
        sourceIds: ['wdc-leamington-plan'],
        serviceRelevance: `Use the named road only to clarify the address, never to infer a commercial premise, nearby location or access route.`,
      },
      {
        text: `The neighbourhood plan's spatial portrait names Sydenham Industrial Estate as one of Royal Leamington Spa's manufacturing locations.`,
        sourceIds: ['wdc-leamington-plan'],
        serviceRelevance: `For a named unit, identify the responsible site contact and entrance; the estate label does not prove authority.`,
      },
    ],
    sourceIds: ['wdc-leamington-plan'],
    contexts: {
      'emergency-lockout': {
        local: `Sydenham Drive local centre and Sydenham Industrial Estate are different official references, so “Sydenham” does not identify the controlled doorway. Obtain the street or unit, building identifier and exact entrance before accepting an urgent access instruction.`,
        decision: `If the call concerns the industrial estate, establish the authorised business or site contact; if it concerns Sydenham Drive, do not infer that the premise is commercial from the local-centre designation. In both cases, verify authority at the address.`,
        checks: [
          `Distinguish a Sydenham Drive address from an industrial-estate unit and record the building and exact entrance.`,
          `Verify the authorised business, site or property contact without inferring commercial use from the local-centre label.`,
        ],
      },
      'lock-change': {
        local: `A lock-change request on Sydenham Industrial Estate should identify the individual unit, entrance and manager able to approve work. The plan's manufacturing-location description does not establish current occupation, shared-door responsibilities or a technical specification.`,
        decision: `For Sydenham Drive or another street, inspect the particular door rather than applying assumptions from a local shopping-centre label. Any landlord, freeholder or facilities requirement must be obtained directly and matched to the observed opening.`,
        checks: [
          `For the industrial estate, name the unit, entrance and current manager and resolve any shared-door responsibility.`,
          `For Sydenham Drive or elsewhere, inspect the opening and match direct landlord or facilities requirements to it.`,
        ],
      },
      'upvc-lock-repair': {
        local: `The plan's descriptions of Sydenham Drive and the industrial estate do not show that any entrance uses uPVC, composite construction or multipoint locking. Ask for door-specific symptoms and photographs, with the exact unit or property clearly identified.`,
        decision: `A manufacturing-location label can help distinguish a site but cannot diagnose a mechanism or identify who may approve repair. Check the handle, key, frame and locking points at the named opening, then confirm the responsible decision-maker.`,
        checks: [
          `Identify the exact unit or property and collect door photographs plus handle, key, frame and locking-point symptoms.`,
          `Confirm the responsible decision-maker at the named opening; the manufacturing label cannot diagnose or authorise repair.`,
        ],
      },
      'boarding-up': {
        local: `Temporary securing on the industrial estate requires the exact unit and authorised site contact; near Sydenham Drive it requires the precise premise, not the local-centre label. The plan does not identify ownership, boundary responsibility or damaged construction.`,
        decision: `Separate public-facing, staff, shared and private entrances at the supplied address before defining the affected opening. Preserve possible evidence first and obtain the relevant owner or manager's approval instead of treating Sydenham's land-use description as permission.`,
        checks: [
          `Name the exact unit or premise, damaged construction and authorised site contact rather than relying on a land-use label.`,
          `Distinguish public-facing, staff, shared and private openings, preserve evidence and obtain the relevant controller's approval.`,
        ],
      },
      'lock-upgrade': {
        local: `Manufacturing and local-shopping-centre descriptions do not establish risk, existing hardware or a required standard at a Sydenham address. Ask the authorised occupier or manager for a written objective and inspect the individual entrance before comparing upgrades.`,
        decision: `Where a unit shares an estate entrance, distinguish responsibility for that opening from the unit's own doors; where an address is on Sydenham Drive, avoid assuming business use. Match any approved requirement to the actual assembly.`,
        checks: [
          `Obtain a written objective from the authorised occupier or manager and inspect the individual entrance.`,
          `Separate responsibility for shared estate entrances from unit doors and never infer business use from Sydenham Drive.`,
        ],
      },
    },
  },
  {
    slug: 'whitnash',
    name: 'Whitnash',
    region: 'Warwickshire',
    summary: [
      `Warwick District Council brought the Whitnash Neighbourhood Plan into legal force on 27 January 2016 after the November 2015 referendum. The adopted district plan separately lists Church Green and Chapel Green as two Whitnash conservation areas.`,
      `Plan status and the two conservation names are locality-scale facts. They do not establish that an address is inside either boundary, whether its building is listed, who controls an entrance or which door and locking components are present.`,
    ],
    accessGuidance: `Use the full Whitnash address and check whether it is inside Church Green, Chapel Green or neither on the current council map. Confirm the exact entrance and authority independently before any access or visible alteration.`,
    evidenceLimits: `The neighbourhood-plan status and district conservation table cannot be generalised across Whitnash. They do not prove property use, age, listing, fabric, ownership, access arrangements, installed locks, condition, operational service reach or response.`,
    facts: [
      {
        text: `Warwick District Council brought the Whitnash Neighbourhood Plan into legal force on 27 January 2016 following the 26 November 2015 referendum.`,
        sourceIds: ['wdc-whitnash-plan-page'],
        serviceRelevance: `Use the official plan status only as area planning context, not evidence about a particular property or service.`,
      },
      {
        text: `The adopted Warwick District Local Plan conservation table lists Whitnash Church Green and Whitnash Chapel Green as separate conservation areas.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Resolve the exact address against the current boundary and verify listing separately before heritage-related guidance.`,
      },
    ],
    sourceIds: ['wdc-whitnash-plan-page', 'wdc-local-plan'],
    contexts: {
      'emergency-lockout': {
        local: `The plan applies at neighbourhood scale, while Church Green and Chapel Green are separate conservation designations. Neither tells which Whitnash entrance is involved, so the request needs a complete address, building identifier and exact controlled doorway.`,
        decision: `A caller's use of either Green name may orient the address but cannot prove residence, occupation or permission. Verify the requester for the stated property, keeping conservation status separate from the authority needed for urgent access.`,
        checks: [
          `Record the complete address, building and doorway and identify whether Church Green, Chapel Green or neither is relevant.`,
          `Use either Green only for orientation and verify the requester's authority against the stated property.`,
        ],
      },
      'lock-change': {
        local: `Whitnash has two separately listed conservation areas rather than one status applying throughout the town. Check whether the exact address is in Church Green, Chapel Green or outside both before a visible replacement is planned.`,
        decision: `The neighbourhood plan's legal force does not select hardware or authorise alteration. Inspect the door set and obtain the responsible customer's approval, plus any address-specific conservation, listed-building or management consent that the proposal actually engages.`,
        checks: [
          `Map the exact address to Church Green, Chapel Green or neither before planning a visible replacement.`,
          `Inspect the door and obtain only the conservation, listed-building or management permission the proposal actually engages.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither Whitnash's made-plan status nor the names Church Green and Chapel Green demonstrate uPVC construction or a multipoint mechanism. The affected door, handle action, key movement and behaviour against the frame must be documented directly.`,
        decision: `Conservation boundaries may become relevant to visible remedial work, but they cannot diagnose the reported fault. First identify the entrance and mechanism; then check any property-specific permission only if the supported repair would affect controlled fabric.`,
        checks: [
          `Document the affected door, handle action, key movement and frame behaviour without inferring hardware from area status.`,
          `Identify the mechanism first, then check property permission only if the supported repair affects controlled fabric.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening in Whitnash must be placed accurately because the two conservation areas have separate boundaries and neither covers every address. Confirm the property, scene status and responsible person before planning a temporary external attachment.`,
        decision: `If the current map places the opening within Church Green or Chapel Green, verify any applicable property approval after evidence-preservation questions are resolved. Do not infer listed status or protected fabric from the conservation-area name alone.`,
        checks: [
          `Locate the damaged property against both separate conservation boundaries and record the scene and responsible person.`,
          `After preserving evidence, verify address-specific approval without inferring listed status or protected fabric from the area name.`,
        ],
      },
      'lock-upgrade': {
        local: `The Whitnash plan and conservation table support planning questions, not a claim that an address needs upgraded security. Establish the authorised customer's actual objective and inspect the door rather than assigning a product from either designation.`,
        decision: `Use the full address to determine whether Church Green, Chapel Green or no cited conservation context applies. Any resulting permission check is separate from selecting compatible hardware against the existing frame, hinges and lock.`,
        checks: [
          `Establish the authorised customer's objective and inspect the door instead of assigning a product from planning designations.`,
          `Determine which conservation context, if any, applies and keep permission checks separate from compatible hardware selection.`,
        ],
      },
    },
  },
  {
    slug: 'heathcote',
    name: 'Heathcote',
    region: 'Warwickshire',
    summary: [
      `Warwick District Council's 2024-25 monitoring report records completed retail units, nursery and care home at Lower Heathcote Local Centre while the office had not started. Its Tachbrook Country Park page describes a planned play area in the Heathcote section.`,
      `Both records are status-sensitive snapshots, not evidence that later work is complete or that a supplied address is part of either project. They establish no property type, entrance, authority, access condition or installed locking system.`,
    ],
    accessGuidance: `Distinguish Lower Heathcote Local Centre from the Heathcote side of Tachbrook Country Park and from other addresses. Identify the exact building or managed asset and responsible contact, and recheck project status before using it.`,
    evidenceLimits: `The monitoring report is dated and the park facility is expressly planned. Neither source proves current completion, private-property access, site ownership, route availability, building fabric, door type, lock condition, service coverage, demand or response time.`,
    facts: [
      {
        text: `The 2024-25 monitoring report says Lower Heathcote Local Centre retail units, nursery and care home were complete while its office had not started at reporting time.`,
        sourceIds: ['wdc-monitoring-report-2024-25'],
        serviceRelevance: `Preserve the dated status and verify the actual building and responsible party instead of assuming current completion or use.`,
      },
      {
        text: `The Tachbrook Country Park development page places planned Play Area 2 in the park's north-west, described specifically as the Heathcote area.`,
        sourceIds: ['wdc-tachbrook-park'],
        serviceRelevance: `Treat the planned facility as managed-site orientation only and recheck its status before any publication or instruction.`,
      },
    ],
    sourceIds: ['wdc-monitoring-report-2024-25', 'wdc-tachbrook-park'],
    contexts: {
      'emergency-lockout': {
        local: `A Heathcote request may refer to a building at Lower Heathcote Local Centre, another private address or a managed park asset. The dated monitoring record and planned play-area reference cannot identify which, so name the premise and doorway.`,
        decision: `For a nursery, care home, retail unit or park facility, establish the authorised organisational contact rather than assuming the caller controls access. Preserve “planned” for Play Area 2 and do not treat a 2024-25 completion snapshot as current authority.`,
        checks: [
          `Name the premise and doorway and distinguish Lower Heathcote Local Centre, a private address and any park asset.`,
          `Verify the current organisational controller and recheck facility status; dated completion and planned records cannot confer authority.`,
        ],
      },
      'lock-change': {
        local: `The monitoring report lists different completion states within Lower Heathcote Local Centre, but none identifies a door or current occupier. A change request must specify the actual unit or building and the manager entitled to approve replacement.`,
        decision: `If the location is associated with Tachbrook Country Park, verify whether the referenced facility now exists and which body controls it. The planned status supplies no hardware specification, construction detail or permission to alter an entrance.`,
        checks: [
          `Identify the current unit or building, its entrance and the manager entitled to approve replacement.`,
          `For a Tachbrook Country Park facility, verify present existence and controller before assessing its actual door.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Completed retail, nursery and care-home elements in a dated report do not establish that any Heathcote entrance is uPVC or multipoint. Obtain direct photographs and operating symptoms from the named building rather than inferring hardware from development status.`,
        decision: `A planned play area on the Heathcote side of Tachbrook Country Park is likewise not door evidence. Recheck whether the facility exists, identify the controlled opening and assess its actual handle, key, frame and locking points.`,
        checks: [
          `Collect photographs and operating symptoms from the named building; dated development status cannot identify its hardware.`,
          `For a park facility, confirm it now exists and assess the controlled opening's handle, key, frame and locking points.`,
        ],
      },
      'boarding-up': {
        local: `For damage at Lower Heathcote Local Centre, identify the exact unit and authorised facilities contact because the monitoring report covers several uses and dates. For a park asset, confirm current facility status and the responsible public manager.`,
        decision: `Neither the local-centre snapshot nor planned Play Area 2 defines the damaged structure, boundary or safe access. After any forensic constraint is cleared, inspect the specific opening and secure approval for the temporary measure from its controller.`,
        checks: [
          `Identify the exact local-centre unit or current park asset and its authorised facilities contact or public-space manager.`,
          `After forensic clearance, inspect the damaged structure and obtain its controller's approval for the temporary measure.`,
        ],
      },
      'lock-upgrade': {
        local: `Development completion status at Lower Heathcote Local Centre is not a security standard. A nursery, care home, retail unit, office or unrelated address may have different responsible parties, so obtain the exact entrance and a written requirement.`,
        decision: `Do not turn the park's planned facility into evidence of current buildings or risk. If a managed asset is genuinely involved, verify its present status and manager; otherwise base the upgrade only on the observed private entrance and authorised objective.`,
        checks: [
          `Name the exact entrance and obtain a written requirement from its current responsible party, regardless of reported use.`,
          `Verify any park asset's present status and manager; otherwise base the upgrade only on the observed private entrance.`,
        ],
      },
    },
  },
  {
    slug: 'warwick',
    name: 'Warwick',
    region: 'Warwickshire',
    summary: [
      `Warwick District Council's conservation guide maps the Warwick Conservation Area in fifteen named character sections, including Coten End–Emscote Road, St Nicholas Park, Priory Park, Castle and Castle Park, and West Street.`,
      `The adopted district plan separately classifies Warwick as an Urban Area. These broad official contexts do not identify a building, its current designation or use, the person authorised for an entrance, its fabric, hardware or access conditions.`,
    ],
    accessGuidance: `Require the complete Warwick address and distinguish a named conservation character section from the wider urban area. For a park, castle-related, institutional, commercial or shared premise, identify the responsible controller and exact entrance separately.`,
    evidenceLimits: `Fifteen mapped character sections and an Urban Area classification are not property-level findings. They do not prove listing, ownership, building type, access permission, door or lock construction, service availability, route, response, demand or previous work.`,
    facts: [
      {
        text: `Warwick District Council's conservation guide maps fifteen named Warwick Conservation Area character sections, including Coten End–Emscote Road, St Nicholas Park, Priory Park, Castle and Castle Park, and West Street.`,
        sourceIds: ['wdc-warwick-conservation'],
        serviceRelevance: `Use a named section only after resolving the exact address, then check current conservation and listed status separately.`,
      },
      {
        text: `The adopted Warwick District Local Plan lists Warwick as one of the district's four Urban Areas in Table 2.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Treat Urban Area as planning classification only, not evidence of a property's use, hardware or service reach.`,
      },
    ],
    sourceIds: ['wdc-warwick-conservation', 'wdc-local-plan'],
    contexts: {
      'emergency-lockout': {
        local: `“Warwick” spans an adopted Urban Area and fifteen named conservation character sections, so a castle, park or street reference is insufficient. Obtain the full property address and controlled doorway rather than treating a character-area name as an entrance instruction.`,
        decision: `Where the caller mentions Castle Park, Priory Park or St Nicholas Park, determine whether the request concerns a managed public asset or a separate nearby building. The conservation map provides orientation but cannot establish the requester's authority.`,
        checks: [
          `Record the full property address and doorway rather than using an Urban Area or character-section label as an instruction.`,
          `Distinguish a managed park asset from a nearby building and verify the requester's authority at the actual premises.`,
        ],
      },
      'lock-change': {
        local: `The conservation guide divides Warwick into fifteen character sections, and that map must be checked at the specific address before visible replacement work. A town-wide Urban Area classification neither confirms designation nor identifies the existing lock.`,
        decision: `For an entrance associated with a park, castle setting, institution or business, obtain the relevant owner or manager approval. Inspect the individual door and keep planning status, listed status and technical specification as separate evidence questions.`,
        checks: [
          `Resolve the address against the relevant current character section before planning a visible replacement.`,
          `For a park, castle setting, institution or business, inspect the door and obtain its responsible controller's approval.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Warwick's Urban Area classification and conservation character names do not show whether a reported entrance is uPVC, composite, timber or multipoint. Ask for direct door photographs and exact handle, key and frame symptoms.`,
        decision: `A reference such as Coten End, West Street or Castle Park may narrow location but cannot diagnose hardware or current property use. Confirm the building and opening first, then assess the actual assembly without importing historic character.`,
        checks: [
          `Obtain door photographs and exact handle, key and frame symptoms; planning classifications cannot identify the mechanism.`,
          `Use Coten End, West Street or Castle Park only to clarify location, then assess the named opening directly.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening near a named Warwick park or castle character section must be tied to the exact premise and responsible controller. The conservation guide does not establish whether the affected asset is public, private, listed or even within the boundary.`,
        decision: `After preserving any evidence, check current address-level designation and permission before attaching an external temporary measure where protected fabric may be involved. The Urban Area label supplies neither structural details nor approval for the work.`,
        checks: [
          `Tie the damaged opening to its exact premise and controller and establish whether the asset is public or private.`,
          `After preserving evidence, check current designation and permission before attaching material to potentially protected fabric.`,
        ],
      },
      'lock-upgrade': {
        local: `Neither Warwick's Urban Area status nor the conservation guide demonstrates that a particular entrance needs an upgrade. Establish the authorised objective and inspect the existing assembly, using a character section only to prompt an exact property-status check.`,
        decision: `Where current mapping confirms conservation context, decide separately whether visible hardware change needs approval; listed status requires its own verification. For managed parks, institutional premises or businesses, obtain the responsible body's written specification rather than assuming one.`,
        checks: [
          `Establish the authorised objective and inspect the assembly; use character sections only to trigger a property-status check.`,
          `Verify conservation, listing and management controls separately and obtain a managed site's written specification where applicable.`,
        ],
      },
    },
  },
  {
    slug: 'woodloes-park',
    name: 'Woodloes Park',
    region: 'Warwickshire',
    summary: [
      `The adopted local plan lists Reardon Court, Woodloes, as a local shopping centre. Warwick District Council's community-parks register separately places Canalside in Warwick (Woodloes Park) and names several public access points.`,
      `Those planning and park references help distinguish parts of Woodloes Park but do not locate a private address or grant access through public land. They establish no premise use, authority, door construction, lock type or condition.`,
    ],
    accessGuidance: `Ask for the full Woodloes Park address and distinguish Reardon Court from Canalside and surrounding streets. Named park access points are orientation only; identify the precise property entrance and authorised controller without assuming a route.`,
    evidenceLimits: `A local-centre entry and public park description do not identify nearby properties, private access, boundary responsibility, building fabric or hardware. The records cannot support service coverage, parking, route suitability, response time, security demand or job history.`,
    facts: [
      {
        text: `The adopted Warwick District Local Plan lists Reardon Court, Woodloes, Warwick, as a local shopping centre.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Use Reardon Court only to clarify an address and do not infer commercial use, proximity or service availability.`,
      },
      {
        text: `The council's community-parks register places Canalside in Warwick (Woodloes Park) and lists access from Coventry Road, Greenway, roads south of Deansway, Scar Bank and Lock Lane.`,
        sourceIds: ['wdc-community-parks'],
        serviceRelevance: `Treat named park access points as public-site context, not proof of a suitable route to a private address.`,
      },
    ],
    sourceIds: ['wdc-local-plan', 'wdc-community-parks'],
    contexts: {
      'emergency-lockout': {
        local: `Reardon Court and Canalside are different official Woodloes references, while the park record lists several public access points. A lockout still needs a complete street address and exact doorway; no park access point should be assumed to reach it.`,
        decision: `If the request concerns Canalside or another managed public asset, identify the council or responsible contact. If it concerns a property near Reardon Court, the local-centre label does not establish occupation or the caller's authority.`,
        checks: [
          `Record the complete street address and doorway and do not treat a named Canalside access point as a property route.`,
          `Identify the manager for a public asset or verify the caller at a Reardon Court-area property independently.`,
        ],
      },
      'lock-change': {
        local: `A Reardon Court local-centre entry does not identify the door, unit or current use at a Woodloes address. Name the particular premise and inspect its entrance rather than using the planning label as a replacement specification.`,
        decision: `For a park asset at Canalside, public access from Coventry Road, Greenway, Deansway, Scar Bank or Lock Lane does not authorise alterations. Establish the responsible manager and the exact controlled opening before any change.`,
        checks: [
          `Name the Reardon Court-area premise and inspect its entrance without inferring unit use from the planning label.`,
          `For Canalside, identify the controlled opening and responsible manager; public access points cannot authorise alteration.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither Reardon Court's local-centre status nor Canalside's play, games and woodland description establishes uPVC or multipoint hardware. Record the affected Woodloes doorway and operating symptoms directly, even if a park entrance helps orient the caller.`,
        decision: `The council's named Canalside access points relate to public park entry, not a property's door alignment or locking strip. Do not use them as a route promise or mechanism clue; inspect the actual frame, hinges and lock.`,
        checks: [
          `Record the affected Woodloes doorway and its operating symptoms without inferring hardware from Reardon Court or Canalside.`,
          `Use a park entrance only for orientation and inspect the actual frame, hinges and lock at the named property.`,
        ],
      },
      'boarding-up': {
        local: `A board-up described as Woodloes Park must distinguish a private opening from Canalside park infrastructure and identify the responsible person for that asset. Reardon Court's planning label likewise does not establish ownership or boundary responsibility.`,
        decision: `After any police evidence issue is settled, choose a temporary method from the observed opening and its permissions. Public access points in the community-parks record do not guarantee vehicle access, attachment rights or a route to the damage.`,
        checks: [
          `Distinguish a private opening from Canalside infrastructure and identify the responsible controller for the actual asset.`,
          `After evidence is cleared, choose from observed construction and permissions without assuming vehicle access or attachment rights.`,
        ],
      },
      'lock-upgrade': {
        local: `Local shopping-centre and community-park records are not security standards for Woodloes Park. An upgrade requires the exact entrance, existing assembly and a documented objective from its authorised owner, occupier or manager.`,
        decision: `If the opening belongs to Canalside, obtain the public asset manager's specification; if it is near Reardon Court, verify the individual premise rather than inferring business use. Named access points cannot determine compatible hardware.`,
        checks: [
          `Document the exact entrance, existing assembly and authorised objective instead of relying on local-centre or park records.`,
          `Obtain a Canalside manager's specification or verify the individual Reardon Court-area premise without inferring business use.`,
        ],
      },
    },
  },
  {
    slug: 'chase-meadow',
    name: 'Chase Meadow',
    region: 'Warwickshire',
    summary: [
      `The Warwick District Local Plan lists Narrow Hall Meadow, Chase Meadow, as a local shopping centre. The council's community-parks record separately identifies Hickmans Green and The Marrish as two Chase Meadow spaces in Warwick's south-west.`,
      `These named features support location clarification but do not describe every Chase Meadow address. They provide no evidence of property use, ownership, entrance arrangements, private access, construction, installed locks, security need or operational service conditions.`,
    ],
    accessGuidance: `Obtain the full address and distinguish Narrow Hall Meadow from Hickmans Green, The Marrish and other Chase Meadow streets. For a community-space asset, identify the responsible manager; do not assume public paths reach a property.`,
    evidenceLimits: `The local-centre and community-parks records are not property surveys or service boundaries. They cannot establish premise type, authority, route, parking, door material, lock mechanism, damage, demand, response time, coverage or previous locksmith activity.`,
    facts: [
      {
        text: `The adopted Warwick District Local Plan lists Narrow Hall Meadow, Chase Meadow, Warwick, as a local shopping centre.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Use Narrow Hall Meadow only to confirm location; its planning status does not establish a premise or service fact.`,
      },
      {
        text: `Warwick District Council lists both Hickmans Green and The Marrish under Warwick south-west and identifies each as being in Chase Meadow.`,
        sourceIds: ['wdc-community-parks'],
        serviceRelevance: `Distinguish managed community-space assets from private addresses and establish the responsible party for the exact opening.`,
      },
    ],
    sourceIds: ['wdc-local-plan', 'wdc-community-parks'],
    contexts: {
      'emergency-lockout': {
        local: `Narrow Hall Meadow, Hickmans Green and The Marrish are three separate official Chase Meadow references, none of which identifies a doorway. Record the complete address and state whether the request concerns a private premise or managed community-space asset.`,
        decision: `A park name may orient the caller but cannot prove an access route or authority. For Hickmans Green or The Marrish, identify the responsible manager; for another address, verify the requester's connection to that specific property.`,
        checks: [
          `Distinguish Narrow Hall Meadow, Hickmans Green and The Marrish and name the complete address and doorway.`,
          `Identify the manager for a community-space asset or verify the requester against the specific private property.`,
        ],
      },
      'lock-change': {
        local: `The local-plan entry for Narrow Hall Meadow does not establish current use, unit identity or installed hardware. A change request must name the building and entrance, with any landlord or manager requirement obtained directly.`,
        decision: `Hickmans Green and The Marrish are council-listed community spaces, not evidence about doors in surrounding streets. If a managed asset is involved, confirm its controller; otherwise keep the park reference outside the replacement specification.`,
        checks: [
          `Name the Narrow Hall Meadow building and entrance and obtain any landlord or manager requirement directly.`,
          `For Hickmans Green or The Marrish, verify the asset controller; otherwise exclude park context from the specification.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Nothing in the Narrow Hall Meadow or community-parks records shows that a Chase Meadow entrance is uPVC or multipoint. Ask for the exact door, its open-or-closed state and handle, key and frame behaviour instead.`,
        decision: `Hickmans Green and The Marrish may distinguish location but cannot diagnose a mechanism or justify a part choice. If the call concerns infrastructure on either space, identify the manager and assess the actual opening independently.`,
        checks: [
          `Record the exact door's open-or-closed state and handle, key and frame behaviour without inferring its mechanism.`,
          `Use community-space names only for location; for their infrastructure, identify the manager and assess the opening directly.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening near Hickmans Green, The Marrish or Narrow Hall Meadow must be tied to a named premise and responsible controller. The official records do not show ownership boundaries, safe access, dimensions or construction.`,
        decision: `Preserve potential evidence and then inspect the actual door or window before agreeing temporary security. Do not treat a community-space name as permission to cross land, attach material or act for a neighbouring Chase Meadow property.`,
        checks: [
          `Tie the damaged opening to a named premise and controller, verify its boundaries, and inspect its dimensions and construction.`,
          `Preserve evidence and obtain explicit access and attachment permission rather than relying on a community-space name.`,
        ],
      },
      'lock-upgrade': {
        local: `Chase Meadow's local-centre and community-space entries cannot establish a need for security improvement or a fitted standard. Begin with the individual entrance and written objective, distinguishing managed public assets from private premises.`,
        decision: `For Narrow Hall Meadow, identify the specific premise and any responsible manager; for Hickmans Green or The Marrish, obtain the asset controller's requirement. In every case, select options from the inspected door rather than nearby land-use labels.`,
        checks: [
          `Start with the individual entrance and written objective, distinguishing managed community assets from private premises.`,
          `Obtain the relevant premise or asset controller's requirement and select options only from the inspected door.`,
        ],
      },
    },
  },
  {
    slug: 'warwick-gates',
    name: 'Warwick Gates',
    region: 'Warwickshire',
    summary: [
      `The adopted local plan lists Othello Avenue, Warwick Gates, as a local shopping centre. Warwick District Council also records Cordelia Green and Othello Park, naming several public access points and cycleways for those spaces.`,
      `The road, park and access-point names may help verify locality but do not provide a route to an individual property. They establish no address-level use, boundary, ownership, authority, door construction, lock mechanism, condition or service coverage.`,
    ],
    accessGuidance: `Ask for the complete Warwick Gates address and distinguish Othello Avenue, Cordelia Green and Othello Park. Treat Ophelia Drive, Plantagenet Park, Lady Grey Avenue and cycleway references only as public-space orientation, never private access.`,
    evidenceLimits: `Council park access information and a local-centre designation cannot identify private entrances or controlled routes. They do not prove premise type, parking, property rights, hardware, damage, security need, locksmith demand, availability or response time.`,
    facts: [
      {
        text: `The adopted Warwick District Local Plan lists Othello Avenue, Warwick Gates, as a local shopping centre.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Use Othello Avenue to clarify location only, not to infer business use, proximity or an entrance type.`,
      },
      {
        text: `Warwick District Council lists Cordelia Green and Othello Park under Warwick Gates and names public access from surrounding roads and cycleways.`,
        sourceIds: ['wdc-community-parks'],
        serviceRelevance: `Public park access is not evidence of a route or permission for work at a private or managed opening.`,
      },
    ],
    sourceIds: ['wdc-local-plan', 'wdc-community-parks'],
    contexts: {
      'emergency-lockout': {
        local: `Othello Avenue, Cordelia Green and Othello Park are distinct Warwick Gates references. Give the full property address and exact doorway; Ophelia Drive, Plantagenet Park, Lady Grey Avenue or a cycleway access point cannot substitute for it.`,
        decision: `If the opening belongs to a park asset, identify the council or responsible manager. If it belongs to a home or business near one of those spaces, the public access description does not establish the caller's authority or a suitable route.`,
        checks: [
          `Give the full address and doorway instead of substituting Othello Avenue, Cordelia Green, Othello Park or a public access point.`,
          `Identify the park manager or verify the caller at the nearby property without assuming a route from access records.`,
        ],
      },
      'lock-change': {
        local: `Othello Avenue's local-centre designation does not tell which unit or door is involved or what hardware it carries. Obtain the exact premise, authorised decision-maker and any landlord or site requirement before specifying replacement.`,
        decision: `Cordelia Green and Othello Park access points are for public-space orientation, not permission to alter an asset. A managed park opening needs its controller's approval; a nearby private entrance must remain separate from the park record.`,
        checks: [
          `Identify the exact Othello Avenue premise, entrance, decision-maker and any direct landlord or site requirement.`,
          `For Cordelia Green or Othello Park, obtain the asset controller's approval; keep nearby private doors separate.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither the Othello Avenue planning entry nor the park access list indicates uPVC construction or multipoint locking at a Warwick Gates address. Identify the actual door and record its handle, key and frame behaviour directly.`,
        decision: `A caller mentioning Cordelia Green or Othello Park may be orienting the address, not describing the premise. Do not use road or cycleway access points as mechanical clues or route commitments; assess the stated entrance only.`,
        checks: [
          `Identify the actual door and record handle, key and frame behaviour rather than inferring hardware from planning records.`,
          `Treat Cordelia Green, Othello Park and access points only as orientation and assess the stated entrance itself.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening around Warwick Gates needs precise ownership and premise identification because public green spaces and private addresses can share nearby names. The community-parks record supplies no construction, boundary responsibility or authorisation.`,
        decision: `After police evidence questions are resolved, inspect the actual door or window and agree the temporary scope with its controller. Do not interpret public access from named roads or cycleways as permission to reach or secure private property.`,
        checks: [
          `Establish the precise premise, ownership and damaged opening where public spaces and private addresses share nearby names.`,
          `After evidence clearance, inspect the structure and obtain access and attachment authority without relying on public routes.`,
        ],
      },
      'lock-upgrade': {
        local: `A local shopping-centre designation and public park-access list are not evidence that a Warwick Gates entrance needs an upgrade. Obtain the exact opening, current assembly and a written requirement from the authorised property or site controller.`,
        decision: `For a park asset, follow the responsible manager's approved specification; for a premise on Othello Avenue or elsewhere, inspect that door without importing park information. Public route descriptions cannot select a cylinder, lock or security standard.`,
        checks: [
          `Obtain the exact opening, current assembly and written requirement from the authorised property or site controller.`,
          `Follow a park manager's specification or inspect the private premise directly; exclude public-route records from product choice.`,
        ],
      },
    },
  },
  {
    slug: 'stratford-upon-avon',
    name: 'Stratford-upon-Avon',
    region: 'Warwickshire',
    summary: [
      `Stratford-on-Avon District Council made the town's neighbourhood plan on 17 December 2018. The made plan identifies a River Avon biodiversity corridor, while the council publishes conservation records and is reviewing the Stratford appraisal during 2026.`,
      `The made plan, river policy and conservation record are area-scale planning evidence. They do not show whether an address is in the flood zone or conservation boundary, whether a building is listed, or how an entrance is controlled.`,
    ],
    accessGuidance: `Obtain the complete Stratford-upon-Avon address and use the River Avon only as caller-confirmed orientation. Check the latest formally published conservation boundary, distinguish adopted records from 2026 review material, and verify the exact entrance and authority.`,
    evidenceLimits: `The neighbourhood area, biodiversity corridor and conservation review do not describe a property or route. They cannot establish flood status, listing, building fabric, ownership, access, door or lock type, condition, coverage, parking, response or demand.`,
    facts: [
      {
        text: `Stratford-on-Avon District Council made the Stratford-upon-Avon Neighbourhood Development Plan on 17 December 2018, making it part of the development plan used within its area.`,
        sourceIds: ['sdc-stratford-plan-page'],
        serviceRelevance: `Use the made plan as formal planning context only, not evidence about an address, customer or locksmith service.`,
      },
      {
        text: `Made-plan Policy NE2 identifies a River Avon biodiversity corridor and addresses proposals in the river's flood zone that could affect that corridor or its links.`,
        sourceIds: ['sdc-stratford-made-plan'],
        serviceRelevance: `Use the river only as verified spatial context and never infer a route, property flood status or coverage.`,
      },
      {
        text: `The council provides a Stratford-upon-Avon conservation boundary map and report and includes the area in its current conservation-appraisal review programme.`,
        sourceIds: ['sdc-conservation-h-z', 'sdc-conservation-review-2026'],
        serviceRelevance: `Use the latest formally published boundary and do not treat review drafts as adopted property-status evidence.`,
      },
    ],
    sourceIds: ['sdc-stratford-plan-page', 'sdc-stratford-made-plan', 'sdc-conservation-h-z', 'sdc-conservation-review-2026'],
    contexts: {
      'emergency-lockout': {
        local: `The River Avon corridor can orient a Stratford-upon-Avon address, but it does not identify which bank, street, building or entrance the caller controls. Obtain the full location and do not infer a travel route or flood status from Policy NE2.`,
        decision: `The town's neighbourhood-plan area and conservation record overlap different planning questions. Neither verifies occupation, so confirm the requester against the particular premises and treat any 2026 conservation-review material as draft rather than current access evidence.`,
        checks: [
          `Record the full street, building and entrance and use the River Avon only as caller-confirmed orientation.`,
          `Verify the requester at the premises and keep 2026 conservation-review material labelled as draft.`,
        ],
      },
      'lock-change': {
        local: `Stratford's conservation record is under appraisal review in 2026, making the latest formally published boundary—not draft review material—the starting point for a visible change question. The exact property's listed status must still be checked separately.`,
        decision: `Policy NE2 protects a river biodiversity corridor but does not specify door hardware or grant alteration consent. Inspect the entrance, obtain the authorised customer's objective and separate any heritage or property approval from the technical replacement decision.`,
        checks: [
          `Use the latest formally published conservation boundary and verify listed status without treating review drafts as adopted.`,
          `Inspect the entrance and separate river-corridor planning context and property permission from the replacement specification.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither the River Avon biodiversity corridor nor Stratford's conservation documents show that a door is uPVC or uses multipoint locking. Ask for the specific entrance, direct images and handle, key and frame symptoms instead of using town context diagnostically.`,
        decision: `If the caller uses the river or a conservation landmark to explain location, record the full address before proceeding. Review status may affect later visible work, but it cannot identify the mechanism or the cause of a reported fault.`,
        checks: [
          `Obtain direct images and handle, key and frame symptoms from the specific entrance rather than planning documents.`,
          `Resolve a river or conservation landmark to the full address, then consider current permission only for supported visible work.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening near the River Avon or within central Stratford must be tied to an exact property; Policy NE2 does not establish flood status, ownership or safe access. Record the responsible party and scene status before temporary work.`,
        decision: `Where the current conservation map applies, verify any address-specific approval after police evidence needs are resolved, using formally published records rather than review drafts. Do not infer listed status or construction from the broader conservation-area entry.`,
        checks: [
          `Tie the opening to an exact property and record its responsible party and scene status without inferring flood or access conditions.`,
          `After preserving evidence, use formal current records for attachment permission and verify listed status separately.`,
        ],
      },
      'lock-upgrade': {
        local: `Made-plan status, a river biodiversity corridor and conservation review cannot demonstrate that a Stratford entrance needs upgraded security. Start with the individual door and a documented requirement, without converting planning protection into a risk or product claim.`,
        decision: `Check the current conservation boundary and any listed or management control only for the supplied address. If a proposed option alters visible fabric, resolve that permission; if it does not, avoid introducing unsupported heritage assumptions from review material.`,
        checks: [
          `Start with the individual door and documented requirement without converting planning protection into a security claim.`,
          `Check current address-level controls and resolve permission only when the proposed option affects visible fabric.`,
        ],
      },
    },
  },
  {
    slug: 'tiddington',
    name: 'Tiddington',
    region: 'Warwickshire',
    summary: [
      `The made Stratford plan gives Tiddington a defined built-up-area boundary and records it as a Category 1 Local Service Village. It also maps strategic gaps and allocates part of Tiddington Fields for community orchards, woodland and open space.`,
      `Those settlement, boundary and land-use policies are not property records. They do not show whether an address lies inside a particular mapped area, who controls it, what its building or entrance contains, or how it may be accessed.`,
    ],
    accessGuidance: `Use the full Tiddington address and distinguish the built-up boundary, strategic gaps and Tiddington Fields from a specific property. For an open-space or managed asset, identify the responsible body; never assume access across allocated land.`,
    evidenceLimits: `Local Service Village status and mapped planning allocations do not prove current land use at an address, ownership, private access, building type, door material, lock mechanism, condition, security need, service coverage or response.`,
    facts: [
      {
        text: `The made Stratford plan gives Tiddington a defined built-up-area boundary and records it as a Category 1 Local Service Village in the Core Strategy.`,
        sourceIds: ['sdc-stratford-made-plan'],
        serviceRelevance: `Use the official settlement classification and boundary only for planning context, not address-level property or service claims.`,
      },
      {
        text: `The plan maps strategic gaps between Stratford-upon-Avon, Tiddington and Alveston and allocates southern Tiddington Fields for community orchards, woodland and open space.`,
        sourceIds: ['sdc-stratford-made-plan'],
        serviceRelevance: `Treat the mapped gaps and fields as locality evidence only and do not infer routes or private-property access.`,
      },
    ],
    sourceIds: ['sdc-stratford-made-plan'],
    contexts: {
      'emergency-lockout': {
        local: `Tiddington's built-up boundary, strategic gaps and Tiddington Fields are planning geometries, not an address. A caller must identify the street, building and controlled entrance rather than relying on Category 1 Local Service Village status.`,
        decision: `If Tiddington Fields or a strategic gap is mentioned as orientation, do not assume it provides an approach to the property. Verify the requester at the supplied premises and keep allocated open space separate from access authority.`,
        checks: [
          `Identify the street, building and doorway rather than relying on settlement category or mapped planning geometry.`,
          `Use Tiddington Fields only for orientation, never as an approach, and verify the requester at the premises.`,
        ],
      },
      'lock-change': {
        local: `A defined built-up boundary does not identify what lock is installed at a Tiddington property or whether an entrance is managed. Inspect the individual door and obtain the authorised owner's, occupier's or manager's stated replacement objective.`,
        decision: `Policies for strategic separation and future orchard, woodland or open-space use at Tiddington Fields cannot authorise work or specify hardware. If a managed asset is involved, identify its controller; otherwise do not import those land-use policies.`,
        checks: [
          `Inspect the individual door and obtain the authorised controller's replacement objective; the built-up boundary cannot specify it.`,
          `For a Tiddington Fields asset, identify its manager; otherwise exclude future land-use policies from the change.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Category 1 Local Service Village status supplies no evidence that a Tiddington door is uPVC or multipoint. Document material, handle travel, key movement and frame contact at the exact opening rather than inferring construction from settlement classification.`,
        decision: `Tiddington Fields and the mapped strategic gaps may help prevent geographical confusion but cannot diagnose a mechanism or prove access. Keep the planning map outside the repair assessment and use direct evidence from the door set.`,
        checks: [
          `Document material, handle travel, key movement and frame contact at the exact opening.`,
          `Use Tiddington Fields and strategic gaps only to resolve geography and keep them outside the repair diagnosis.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening near Tiddington Fields must be distinguished from the allocated orchard, woodland and open-space land and tied to a named building. The plan provides no ownership, boundary, construction or safe-access information for that opening.`,
        decision: `After preserving any possible evidence, obtain the responsible property or site controller's approval and inspect the structure. Neither the built-up boundary nor strategic-gap policy establishes permission to cross land or attach a temporary measure.`,
        checks: [
          `Tie the damaged opening to a named building and distinguish it from allocated orchard, woodland and open-space land.`,
          `After preserving evidence, inspect the structure and obtain explicit land-access and attachment permission from its controller.`,
        ],
      },
      'lock-upgrade': {
        local: `Settlement category and strategic-gap policy do not demonstrate security need or set a lock standard in Tiddington. An upgrade requires the exact entrance, observed assembly and a documented requirement from the person authorised for that property.`,
        decision: `If the request concerns an asset on allocated community-orchard, woodland or open-space land, establish its current status and manager. For any other address, keep Tiddington Fields policy separate from technical product selection.`,
        checks: [
          `Record the exact entrance, observed assembly and authorised requirement without using settlement policy as a security standard.`,
          `For an allocated-land asset, verify current status and manager; otherwise exclude Tiddington Fields policy from product selection.`,
        ],
      },
    },
  },
  {
    slug: 'bishopton',
    name: 'Bishopton',
    region: 'Warwickshire',
    summary: [
      `The made Stratford plan identifies Burton Farm at Bishopton Hamlet north of the A46 as a location with small industrial units in converted farm buildings. It also references Bishopton Road canal bridge and housing allocation SUA.3 north of Bishopton Lane.`,
      `These site and infrastructure references locate different Bishopton contexts but do not establish present building use, completion, ownership, entrance authority, private access or installed hardware. Each request must be resolved to a particular address and opening.`,
    ],
    accessGuidance: `Distinguish Burton Farm north of the A46, Bishopton Road bridge and land north of Bishopton Lane from the supplied property. For an industrial, allocated or infrastructure site, identify the current responsible manager and entrance.`,
    evidenceLimits: `A plan description of converted farm units, a future bridge review and a housing allocation are not current property surveys. They cannot prove present use, access, building fabric, door type, lock condition, coverage, route or response.`,
    facts: [
      {
        text: `The made plan identifies Burton Farm at Bishopton Hamlet north of the A46 as a location with small industrial units established in converted farm buildings.`,
        sourceIds: ['sdc-stratford-made-plan'],
        serviceRelevance: `For a Burton Farm instruction, name the unit, entrance and authorised manager rather than relying on plan-era use.`,
      },
      {
        text: `The plan calls for a future review of Bishopton Road bridge across the canal and identifies housing allocation SUA.3 north of Bishopton Lane.`,
        sourceIds: ['sdc-stratford-made-plan'],
        serviceRelevance: `Use bridge and allocation references only for verified location; they prove neither completion nor an access route.`,
      },
    ],
    sourceIds: ['sdc-stratford-made-plan'],
    contexts: {
      'emergency-lockout': {
        local: `Burton Farm north of the A46, Bishopton Road canal bridge and the SUA.3 allocation north of Bishopton Lane are separate plan references. A caller must name the present building, unit and exact doorway rather than using “Bishopton” alone.`,
        decision: `If Burton Farm is involved, confirm the current occupier or site manager because the plan-era industrial-unit description does not prove present control. A future bridge review or housing allocation supplies no route or authority for access.`,
        checks: [
          `Distinguish Burton Farm, Bishopton Road bridge and SUA.3 and name the present building, unit and doorway.`,
          `Confirm the current occupier or manager and never use a bridge review or housing allocation as route or authority.`,
        ],
      },
      'lock-change': {
        local: `The plan describes small units in converted farm buildings at Burton Farm, but that does not establish current fabric, occupation or hardware. A replacement instruction needs the precise unit, observed entrance and the manager entitled to approve it.`,
        decision: `For a property near Bishopton Lane or the canal bridge, do not use allocation or infrastructure policy as a specification. Verify present building status and any site requirement directly before selecting a compatible component.`,
        checks: [
          `At Burton Farm, identify the current unit, inspect its entrance and verify the manager entitled to approve replacement.`,
          `Near Bishopton Lane or the canal bridge, confirm present building status and direct site requirements before component selection.`,
        ],
      },
      'upvc-lock-repair': {
        local: `A converted-farm-building description at Burton Farm cannot show whether the affected entrance is uPVC, composite, timber or multipoint. Ask for the exact unit and direct handle, key, frame and locking-point symptoms.`,
        decision: `The Bishopton Road bridge review and SUA.3 allocation are spatial planning matters, not mechanical evidence. They neither diagnose a door nor prove that development has occurred, so keep them outside the repair decision.`,
        checks: [
          `Name the exact Burton Farm unit and record handle, key, frame and locking-point behaviour at that opening.`,
          `Keep the Bishopton Road bridge review and SUA.3 allocation outside diagnosis and do not assume development occurred.`,
        ],
      },
      'boarding-up': {
        local: `Damage at Burton Farm requires a named unit and current authorised site contact; damage near Bishopton Lane or the canal needs the exact premise. The plan does not establish ownership, current construction or safe approach.`,
        decision: `After possible evidence is preserved, inspect the real opening and agree temporary work with its controller. A future bridge review cannot be treated as an access guarantee, and allocation SUA.3 cannot be treated as a completed building.`,
        checks: [
          `Name the Burton Farm unit or other exact premise and verify its current authorised site contact.`,
          `After preserving evidence, inspect the real opening without treating bridge review or SUA.3 as access or completion evidence.`,
        ],
      },
      'lock-upgrade': {
        local: `Industrial-unit history, a bridge project and a housing allocation do not establish security need or current hardware in Bishopton. Obtain a written objective from the authorised occupier or manager and assess the individual door set.`,
        decision: `Where Burton Farm is named, confirm the present unit and any shared-site responsibilities. Where Bishopton Lane or Bishopton Road is referenced, verify the actual property and do not convert planning proposals into a product standard or permission.`,
        checks: [
          `Obtain a written objective from the current occupier or manager and assess the individual door set.`,
          `Resolve Burton Farm shared-site responsibilities or the actual Bishopton property without turning proposals into standards or permission.`,
        ],
      },
    },
  },
  {
    slug: 'shottery',
    name: 'Shottery',
    region: 'Warwickshire',
    summary: [
      `Stratford-on-Avon District Council's report records that Shottery Conservation Area was designated in 1969 and that its reviewed appraisal became the council's formal view in 1992. The made town plan separately designates Shottery Fields as Local Green Space.`,
      `The conservation boundary and green-space designation are different planning contexts. Neither establishes that an address lies within them, that a building is listed, who controls an entrance, or what construction and locking system it contains.`,
    ],
    accessGuidance: `Obtain the full Shottery address and distinguish the conservation boundary from Shottery Fields Local Green Space. Check current address-level designation, listed status and the responsible property or land manager before any externally visible work.`,
    evidenceLimits: `Designation and appraisal dates do not describe every Shottery building, and Local Green Space status is not an access route. The sources prove no ownership, property type, fabric, lock, damage, service reach, response or demand.`,
    facts: [
      {
        text: `Shottery Conservation Area was originally designated in 1969, and the council approved its reviewed appraisal as its formal view on 20 July 1992.`,
        sourceIds: ['sdc-shottery-conservation'],
        serviceRelevance: `Check the current boundary and verify the particular building's status before visible alteration or heritage wording.`,
      },
      {
        text: `Made neighbourhood-plan Policy CLW3 identifies Shottery Fields as one of the plan area's designated Local Green Spaces.`,
        sourceIds: ['sdc-stratford-made-plan'],
        serviceRelevance: `Use Shottery Fields as verified locality context only and never infer private-property access across the green space.`,
      },
    ],
    sourceIds: ['sdc-shottery-conservation', 'sdc-stratford-made-plan'],
    contexts: {
      'emergency-lockout': {
        local: `Shottery Conservation Area and Shottery Fields Local Green Space are not interchangeable location labels. Obtain the precise street, building and controlled entrance, and do not assume that crossing or approaching through the green space is permitted.`,
        decision: `The 1969 designation and 1992 appraisal say nothing about occupation or entry rights at a modern address. Verify the caller against the individual premises and treat a Shottery Fields reference only as orientation.`,
        checks: [
          `Distinguish the conservation area from Shottery Fields and record the precise street, building and doorway.`,
          `Verify the caller at the premises and never assume an approach across the Local Green Space.`,
        ],
      },
      'lock-change': {
        local: `A visible replacement within Shottery requires the current conservation boundary and exact building status, not reliance on historic designation dates alone. Listed status, management approval and the existing door set each need separate verification.`,
        decision: `Shottery Fields is protected as Local Green Space but that policy neither applies to every property nor specifies hardware. If a managed green-space asset is involved, identify its controller; otherwise exclude the designation from the replacement decision.`,
        checks: [
          `Check the current conservation boundary, building status and management controls instead of relying on historic dates.`,
          `Identify the controller for a Shottery Fields asset; otherwise exclude Local Green Space policy from the specification.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Conservation-area history does not show that a Shottery entrance is timber, uPVC, composite or multipoint. Record the actual material and symptoms; check heritage permission later only if supported repair would visibly affect controlled fabric.`,
        decision: `Local Green Space status at Shottery Fields cannot diagnose handle or key behaviour and cannot establish access to a nearby address. Use direct evidence from the stated doorway and keep the green-space boundary separate.`,
        checks: [
          `Record the actual door material and symptoms and check heritage permission only for supported visible work.`,
          `Use direct evidence from the stated doorway and keep Shottery Fields status outside diagnosis and access assumptions.`,
        ],
      },
      'boarding-up': {
        local: `A damaged Shottery opening must be located against the present conservation boundary and distinguished from an asset on Shottery Fields. Identify the exact property, current controller and scene status before choosing a temporary attachment.`,
        decision: `After any forensic requirement is cleared, verify property-specific permission where protected fabric may be affected. Do not infer listed status from conservation designation or treat Local Green Space as an authorised route to the opening.`,
        checks: [
          `Locate the opening against the current boundary and distinguish a property from a Shottery Fields asset.`,
          `After forensic clearance, verify attachment permission and listed status without treating the green space as an authorised route.`,
        ],
      },
      'lock-upgrade': {
        local: `Shottery's conservation history and Local Green Space policy cannot demonstrate risk, need or an installed security standard. An upgrade must answer a documented objective at a particular entrance, supported by inspection of that door set.`,
        decision: `Check current designation and listed status only for the supplied building and obtain any required visible-alteration consent. If the request concerns Shottery Fields infrastructure, follow its responsible manager's specification instead of assuming a residential context.`,
        checks: [
          `Use a documented objective and inspection of the particular door set rather than conservation or green-space status.`,
          `Check address-level permissions or follow the Shottery Fields manager's specification when that infrastructure is genuinely involved.`,
        ],
      },
    },
  },
  {
    slug: 'kenilworth',
    name: 'Kenilworth',
    region: 'Warwickshire',
    summary: [
      `Warwick District Council made the Kenilworth Neighbourhood Plan on 16 November 2018 after the preceding day's referendum. Its conservation guide records an initial 1971 designation and later 2005 extensions including Waverley Road, Station Road and Clarendon Road.`,
      `The plan area and conservation history are official locality context, not a current property-status determination. They do not show whether an address is within an extension, listed, controlled by the caller or fitted with any particular entrance hardware.`,
    ],
    accessGuidance: `Use the complete Kenilworth address and check the current conservation map, especially before applying the named Waverley Road, Station Road or Clarendon Road extension history. Verify listed status, exact entrance and authority independently.`,
    evidenceLimits: `Made-plan and conservation-extension dates cannot be applied to every Kenilworth property. The sources do not establish building use, fabric, ownership, access, door or lock type, condition, route, parking, coverage, response or demand.`,
    facts: [
      {
        text: `Warwick District Council made the Kenilworth Neighbourhood Plan on 16 November 2018 following the 15 November referendum and uses it for planning applications within Kenilworth.`,
        sourceIds: ['wdc-kenilworth-plan-page'],
        serviceRelevance: `Use the plan as formal settlement planning context only, not evidence about a property, entrance or service.`,
      },
      {
        text: `The conservation guide says Kenilworth's first conservation area was designated in 1971 and that 2005 extensions included Waverley Road, Station Road and Clarendon Road.`,
        sourceIds: ['wdc-kenilworth-conservation'],
        serviceRelevance: `Resolve the current boundary for the exact address and verify listed status separately before visible changes.`,
      },
    ],
    sourceIds: ['wdc-kenilworth-plan-page', 'wdc-kenilworth-conservation'],
    contexts: {
      'emergency-lockout': {
        local: `The made plan covers Kenilworth at neighbourhood scale, while conservation history names particular 2005 extensions. A request still needs the full street address and exact entrance; neither the plan nor an extension road proves where the caller is authorised.`,
        decision: `If Waverley Road, Station Road or Clarendon Road is mentioned, use it only to clarify the address. Historical inclusion in an extension does not establish current occupation, access permission or listed status for the individual building.`,
        checks: [
          `Record the full street address and exact entrance; neighbourhood-plan scope and extension roads cannot identify authority.`,
          `Use Waverley Road, Station Road or Clarendon Road only for location and verify the caller at the building.`,
        ],
      },
      'lock-change': {
        local: `Kenilworth's 1971 designation and later extensions make current address-level mapping necessary before visible replacement. Do not assume that every property on a named road, or elsewhere in the plan area, has identical conservation or listed status.`,
        decision: `The made neighbourhood plan cannot select a replacement lock. Inspect the actual entrance, obtain the authorised customer's objective and check separately whether the particular building or manager imposes a permission or written specification.`,
        checks: [
          `Map the address against the current boundary and verify listed status without generalising from an extension road.`,
          `Inspect the entrance and obtain the authorised objective plus any direct building or manager specification.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither Kenilworth plan status nor conservation-extension history identifies a uPVC door or multipoint mechanism. Ask for the exact opening, images and handle, key and frame behaviour rather than drawing construction conclusions from a road name.`,
        decision: `If the address lies within a current conservation boundary, that fact may prompt a later permission check but cannot diagnose the reported fault. Base the repair assessment on the observed door set and verify listed status separately if relevant.`,
        checks: [
          `Collect images and handle, key and frame behaviour from the exact opening rather than inferring construction from a road.`,
          `Diagnose from the observed door set, then check conservation or listed controls only for the supported work.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening on Waverley Road, Station Road, Clarendon Road or another Kenilworth street requires a current property-status check, not reliance on 2005 extension history. Identify the exact building, controller and scene status.`,
        decision: `After evidence-preservation requirements are met, determine whether an external temporary attachment engages address-specific conservation, listing or management controls. The neighbourhood plan itself supplies no construction detail, ownership authority or securing method.`,
        checks: [
          `Identify the exact building, controller and scene and use current property status rather than 2005 extension history.`,
          `After preserving evidence, check address-specific controls before an external attachment and inspect the actual construction.`,
        ],
      },
      'lock-upgrade': {
        local: `Made-plan status and conservation history do not demonstrate a security need at a Kenilworth entrance. Start with the actual door and a documented objective, using the current boundary only to identify any permission question for visible change.`,
        decision: `A property on a named extension road still needs its own status and existing hardware verified. Compare compatible options after inspection and obtain any owner, manager, conservation or listed-building approval that specifically applies.`,
        checks: [
          `Start with the actual door and documented objective and use the current boundary only for permission questions.`,
          `Verify status and hardware at the named property before comparing options and obtaining applicable approvals.`,
        ],
      },
    },
  },
  {
    slug: 'balsall-common',
    name: 'Balsall Common',
    region: 'West Midlands',
    summary: [
      `Solihull Council made the Balsall Parish Neighbourhood Development Plan on 17 June 2021. The plan expressly says Balsall Common is one continuous settlement across Balsall and Berkswell parishes but covers only the Balsall-parish portion.`,
      `That boundary limitation is decisive for evidence use: a Balsall Common label does not establish which parish or plan area contains an address. No plan claim may be assigned until that boundary is resolved from the exact location.`,
    ],
    accessGuidance: `Obtain the complete Balsall Common address and resolve whether it lies in Balsall or Berkswell parish before using neighbourhood-plan context. If that cannot be established, omit the parish-plan claim and rely only on property-level information.`,
    evidenceLimits: `The made Balsall Parish plan does not cover the whole Balsall Common settlement. It proves no building type, tenure, ownership, access, door material, lock, condition, demand, coverage or response for either parish or an individual address.`,
    facts: [
      {
        text: `Solihull Metropolitan Borough Council made the Balsall Parish Neighbourhood Development Plan on 17 June 2021 for use in planning decisions within its neighbourhood area.`,
        sourceIds: ['solihull-balsall-plan-page'],
        serviceRelevance: `Use made-plan status only after confirming the address is within the Balsall Parish neighbourhood area.`,
      },
      {
        text: `The made plan states that Balsall Common straddles Balsall and Berkswell parishes and expressly applies only to the Balsall-parish portion of the settlement.`,
        sourceIds: ['solihull-balsall-made-plan'],
        serviceRelevance: `Fail closed on parish-plan claims until the exact address is resolved to Balsall rather than Berkswell parish.`,
      },
    ],
    sourceIds: ['solihull-balsall-plan-page', 'solihull-balsall-made-plan'],
    contexts: {
      'emergency-lockout': {
        local: `Balsall Common crosses Balsall and Berkswell parishes, while the cited made plan applies only on the Balsall side. Obtain the full address before using any plan context; if the parish remains unresolved, omit the plan claim entirely.`,
        decision: `Parish resolution still does not prove who may enter the stated premises. Verify the requester and controlled doorway independently, and never treat settlement continuity across the boundary as evidence of access, proximity or operational coverage.`,
        checks: [
          `Resolve the full address to Balsall or Berkswell parish and omit the cited plan if the boundary remains uncertain.`,
          `Verify the requester and doorway independently; settlement continuity cannot prove access, proximity or coverage.`,
        ],
      },
      'lock-change': {
        local: `A Balsall Common address cannot inherit Balsall Parish plan evidence until its side of the Balsall–Berkswell boundary is confirmed. If that check fails, no plan-based local statement should appear in the replacement decision.`,
        decision: `Even for an address inside Balsall parish, the made plan does not identify current hardware or approve a change. Inspect the entrance and obtain property-specific authority, specification and any management or statutory permission separately.`,
        checks: [
          `Confirm the address is in Balsall parish before using its plan; otherwise omit that local statement.`,
          `Inspect the entrance and obtain property-specific authority, specification and permission independently of plan status.`,
        ],
      },
      'upvc-lock-repair': {
        local: `The cross-parish settlement and the Balsall-only plan boundary provide no evidence that a door is uPVC or multipoint. Resolve the address first for accurate locality, then diagnose only from the affected entrance and its reported symptoms.`,
        decision: `If the address falls in Berkswell parish, do not cite the Balsall plan as local evidence; if it falls in Balsall parish, do not let plan status become a hardware claim. Either way, inspect the door directly.`,
        checks: [
          `Resolve the parish for accurate locality and diagnose material and mechanism only from the affected entrance.`,
          `Exclude the Balsall plan for Berkswell addresses and never use it as a hardware claim within Balsall.`,
        ],
      },
      'boarding-up': {
        local: `For a damaged Balsall Common opening, identify the exact property and parish before attaching any planning context. An unresolved Balsall–Berkswell boundary requires the parish-plan claim to be withheld, not approximated from the settlement name.`,
        decision: `After police evidence needs are handled, confirm the authorised owner or manager and inspect the structure. The Balsall plan boundary supplies no property ownership, access right, construction detail or permission for a temporary external fixing.`,
        checks: [
          `Identify the exact property and parish and withhold the Balsall plan claim if the boundary is unresolved.`,
          `After preserving evidence, verify the controller and access rights, inspect the construction, and obtain attachment permission directly.`,
        ],
      },
      'lock-upgrade': {
        local: `Balsall Common's split between Balsall and Berkswell prevents a settlement-wide plan claim. Resolve the address to the applicable parish or omit that evidence, and never use made-plan status as a proxy for security need.`,
        decision: `A verified Balsall-parish address still requires inspection, a documented objective and any property-specific consent; a Berkswell address needs evidence from its own governing records. Product selection cannot follow from either side of the boundary.`,
        checks: [
          `Resolve the applicable parish or omit the plan evidence and do not convert plan status into security need.`,
          `Inspect the door and obtain a documented objective and property consent before selecting any product.`,
        ],
      },
    },
  },
  {
    slug: 'meriden',
    name: 'Meriden',
    region: 'West Midlands',
    summary: [
      `The Meriden Parish Neighbourhood Development Plan was made on 17 June 2021 after the May referendum and is used in planning decisions within its area. Solihull Council separately lists Meriden Green and Meriden Hill Conservation Areas.`,
      `The parish plan and two conservation designations are distinct locality contexts. They do not establish whether an address lies in either conservation boundary, whether its building is listed, who controls an entrance or what hardware it contains.`,
    ],
    accessGuidance: `Use the full Meriden address and check whether it lies in Meriden Green, Meriden Hill or neither current conservation boundary. Confirm parish-plan scope, exact entrance, caller authority and any building-specific status separately.`,
    evidenceLimits: `A made parish plan and two named conservation areas cannot be generalised to every Meriden property. They do not prove property use, age, listing, ownership, access, door material, lock type, condition, coverage or response.`,
    facts: [
      {
        text: `The Meriden Parish Neighbourhood Development Plan was made on 17 June 2021 after the 6 May referendum and is used for planning applications in its neighbourhood area.`,
        sourceIds: ['solihull-meriden-plan-page'],
        serviceRelevance: `Use the plan only inside its confirmed area and never as evidence of a property's entrance or service need.`,
      },
      {
        text: `Solihull Metropolitan Borough Council's conservation register lists both Meriden Green Conservation Area and Meriden Hill Conservation Area.`,
        sourceIds: ['solihull-conservation-areas'],
        serviceRelevance: `Check the exact address against the relevant current boundary and verify any listed status independently.`,
      },
    ],
    sourceIds: ['solihull-meriden-plan-page', 'solihull-conservation-areas'],
    contexts: {
      'emergency-lockout': {
        local: `Meriden Green and Meriden Hill are separate conservation-area names within a wider parish-plan context. A caller must supply the complete address and doorway; neither designation confirms which property is meant or who may authorise entry.`,
        decision: `Use a Green or Hill reference only to clarify locality after the address is known. The made plan establishes planning status, not occupation, and conservation registration is unrelated to the identity check required for access.`,
        checks: [
          `Record the complete address and doorway and identify whether Meriden Green, Meriden Hill or neither applies.`,
          `Use Green or Hill only for locality and verify identity and authority at the specific premises.`,
        ],
      },
      'lock-change': {
        local: `A Meriden lock change should not assume the same property status across Meriden Green, Meriden Hill and addresses outside both. Resolve the latest boundary and separately check the individual building before a visible replacement is specified.`,
        decision: `The parish plan's made status cannot identify the installed lock or approve alteration. Inspect the door and obtain authority, with any conservation, listed-building, landlord or manager requirement tied to the exact premises.`,
        checks: [
          `Resolve the latest boundary and individual building status across Meriden Green, Meriden Hill or neither.`,
          `Inspect the door and tie authority and any conservation, listing, landlord or manager requirement to that premise.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither Meriden's made plan nor its two conservation-area entries proves that a reported opening is uPVC, composite or multipoint. Collect direct symptoms and photographs from the stated door rather than inferring material from locality.`,
        decision: `A confirmed conservation boundary may affect permission for visible remedial work, but it cannot diagnose handle, key or alignment behaviour. Identify the mechanism first and verify any property control only for the supported repair.`,
        checks: [
          `Collect direct photographs and symptoms from the stated door instead of inferring material from Meriden locality records.`,
          `Identify the mechanism first and verify conservation or property controls only for the supported visible repair.`,
        ],
      },
      'boarding-up': {
        local: `A damaged Meriden opening needs address-level mapping because Meriden Green and Meriden Hill are distinct designations and neither necessarily covers the property. Record the scene, exact entrance and authorised controller before planning temporary work.`,
        decision: `After possible forensic evidence is preserved, establish whether current conservation, listing or management permission affects an external attachment. Do not infer building status from the wider parish plan or transfer one conservation-area name to another address.`,
        checks: [
          `Map the exact opening against Meriden Green and Meriden Hill and record the scene and authorised controller.`,
          `After preserving evidence, verify current attachment controls without transferring one area's status or the parish plan.`,
        ],
      },
      'lock-upgrade': {
        local: `Parish-plan status and conservation registration do not demonstrate a security need or standard for Meriden. The upgrade basis must be the observed entrance and a documented requirement, not an assumption attached to Green or Hill.`,
        decision: `Check the exact boundary and any listed or managed status before visible change. Where neither Meriden Green nor Meriden Hill applies, do not import those constraints; where one does, obtain only the permissions relevant to that address.`,
        checks: [
          `Base the upgrade on the observed entrance and documented requirement, not Meriden planning or conservation labels.`,
          `Check the exact boundary and obtain only address-relevant listed, conservation or management permissions.`,
        ],
      },
    },
  },
  {
    slug: 'hampton-in-arden',
    name: 'Hampton-in-Arden',
    region: 'West Midlands',
    summary: [
      `Solihull Council records that the 2017 Hampton-in-Arden plan remains applicable to its previous neighbourhood area after the newer submission draft was withdrawn and examination closed. The council also records a 1968 conservation designation for the central area.`,
      `The withdrawn replacement must not be treated as adopted evidence, and the 2017 plan applies only to its previous area. Central conservation status does not extend automatically to every address or establish listed status, entrance control or hardware.`,
    ],
    accessGuidance: `Use the complete Hampton-in-Arden address, confirm whether it lies in the previous 2017 plan area and current central conservation boundary, and ignore the withdrawn replacement draft as adopted evidence. Verify authority and building status separately.`,
    evidenceLimits: `The older plan's limited area and central conservation designation cannot be generalised across Hampton-in-Arden. The withdrawn draft proves no current policy, and neither source establishes listing, property use, access, hardware, coverage or response.`,
    facts: [
      {
        text: `Solihull Council records that the 2017 Hampton-in-Arden plan remains applicable to its previous neighbourhood area after the newer submission draft was withdrawn and examination closed.`,
        sourceIds: ['solihull-hampton-plan-page'],
        serviceRelevance: `Use only the existing 2017 plan for its confirmed prior area and never ingest the withdrawn draft as adopted.`,
      },
      {
        text: `Solihull Metropolitan Borough Council states that the central part of Hampton-in-Arden was designated a conservation area in 1968.`,
        sourceIds: ['solihull-hampton-history'],
        serviceRelevance: `Check whether the exact address is in the current central boundary and verify listed status separately.`,
      },
    ],
    sourceIds: ['solihull-hampton-plan-page', 'solihull-hampton-history'],
    contexts: {
      'emergency-lockout': {
        local: `The 2017 plan continues only for its previous area, and central Hampton's conservation designation does not locate an individual entrance. Obtain the full address; never use the withdrawn replacement plan as current evidence or as an access reference.`,
        decision: `Whether the address falls inside the old plan area or central conservation boundary says nothing about the caller's right to enter. Verify identity and authority for the specific premises independently of both planning statuses.`,
        checks: [
          `Obtain the full address and use only the applicable 2017 plan area, never the withdrawn replacement draft.`,
          `Verify identity and authority at the specific premises independently of plan-area or central-conservation status.`,
        ],
      },
      'lock-change': {
        local: `For a visible replacement, check the exact address against the current central conservation boundary and the applicable 2017 plan area. Do not rely on policies or boundaries from the withdrawn replacement draft, whose examination has closed.`,
        decision: `A 1968 central designation does not make every Hampton-in-Arden building protected or listed. Inspect the entrance and obtain property-specific authority and permission, keeping heritage status separate from the technical specification.`,
        checks: [
          `Check the address against the current central boundary and applicable 2017 plan area, excluding the withdrawn draft.`,
          `Inspect the entrance and verify property-specific authority, listed status and permission separately from specification.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither the continuing 2017 plan nor the withdrawn newer draft shows whether a Hampton-in-Arden door is uPVC or multipoint. Use only direct evidence from the exact opening to identify material, mechanism and symptoms.`,
        decision: `Central conservation status may prompt a later permission check for visible repair, but it cannot diagnose hardware or apply across the whole settlement. Discard the withdrawn draft from any claim about current property context.`,
        checks: [
          `Identify material, mechanism and symptoms from the exact opening and exclude both plans from diagnosis.`,
          `Check current central-conservation permission only for supported visible work and discard the withdrawn draft entirely.`,
        ],
      },
      'boarding-up': {
        local: `A damaged Hampton-in-Arden opening must be resolved against the current central conservation map and property record, not the withdrawn replacement plan. Identify the precise premises, scene status and person entitled to approve temporary work.`,
        decision: `After possible forensic evidence is protected, verify whether an external attachment needs address-specific consent. The 2017 plan's previous-area limit and 1968 central designation provide no construction detail or general permission to secure buildings.`,
        checks: [
          `Resolve the precise premises against current records and identify the scene and person entitled to approve work.`,
          `After protecting evidence, verify address-specific attachment consent and inspect construction rather than relying on historic designation.`,
        ],
      },
      'lock-upgrade': {
        local: `The existing plan, withdrawn draft and central conservation designation do not demonstrate security need or choose products. An upgrade requires the actual Hampton-in-Arden entrance and a written objective from its authorised controller.`,
        decision: `Use only current evidence: the 2017 plan where its previous boundary applies and the latest conservation map for the address. Do not treat withdrawn policies as requirements, and verify any listed or management consent separately.`,
        checks: [
          `Inspect the actual entrance and obtain its authorised controller's written objective instead of using planning status.`,
          `Apply the 2017 plan and current conservation map only where relevant and verify separate listed or management consent.`,
        ],
      },
    },
  },
  {
    slug: 'wolston',
    name: 'Wolston',
    region: 'Warwickshire',
    summary: [
      `Rugby Borough Council's appraisal says Wolston Conservation Area covers only a limited village section, mostly south of the River Avon, with a railway bridge at its northern tip separating Wolston from Brandon.`,
      `The council also hosts neighbourhood-area, screening and consultation-stage records for Wolston. These records establish the documented stage reviewed here; any later adoption status must be checked against a newer explicit council statement.`,
    ],
    accessGuidance: `Use the full Wolston address and treat the River Avon and railway bridge only as verified orientation. Check the current conservation boundary, distinguish Wolston from Brandon, and describe the neighbourhood-plan stage only from the latest council record.`,
    evidenceLimits: `The appraisal covers a limited area and the reviewed council record documents planning stages rather than property facts. Neither proves a building's designation, use, access, material, lock, condition, route, coverage or response; river and rail references are not travel claims.`,
    facts: [
      {
        text: `The Wolston Conservation Area appraisal says the designation covers only a limited part of the village, mostly south of the River Avon, with a railway bridge separating Wolston from Brandon.`,
        sourceIds: ['rbc-wolston-conservation'],
        serviceRelevance: `Use river and railway references only for address clarification and boundary checks, never route or coverage claims.`,
      },
      {
        text: `Rugby Borough Council's Wolston Neighbourhood Plan page hosts the neighbourhood-area record, a November 2024 screening opinion and later consultation-stage documents.`,
        sourceIds: ['rbc-wolston-plan-page'],
        serviceRelevance: `Do not describe Wolston's neighbourhood plan as adopted or made without a newer explicit council statement.`,
      },
    ],
    sourceIds: ['rbc-wolston-conservation', 'rbc-wolston-plan-page'],
    contexts: {
      'emergency-lockout': {
        local: `The River Avon and northern railway bridge can help distinguish a Wolston address from Brandon, but they do not identify a property or access route. Obtain the complete street location and doorway, especially outside the limited conservation section.`,
        decision: `Use the latest explicit council record before describing the neighbourhood-plan stage. In any event, area planning records cannot verify occupation, so confirm the requester's permission at the specified premises.`,
        checks: [
          `Record the complete Wolston street and doorway and use the river and railway bridge only to distinguish Brandon.`,
          `Confirm the latest planning stage and verify the requester at the premises independently of area records.`,
        ],
      },
      'lock-change': {
        local: `Most buildings in the limited conservation designation lie south of the River Avon, but that does not make every southern Wolston address designated. Check the exact current boundary before visible replacement and verify listed status separately.`,
        decision: `Use the council page only for the planning stage it explicitly records. Specify the change from the inspected entrance and property-specific authority, not from a planning-stage inference.`,
        checks: [
          `Check the exact current boundary and listed status without treating every south-of-river address as designated.`,
          `Specify the change from the inspected entrance and property authority, citing only the council-recorded planning stage.`,
        ],
      },
      'upvc-lock-repair': {
        local: `A position south of the River Avon or near the railway bridge does not establish that a Wolston door is uPVC or multipoint. Ask for direct handle, key, locking-point and frame evidence from the exact opening.`,
        decision: `The conservation appraisal and neighbourhood screening record cannot diagnose hardware. If visible repair affects controlled fabric, check current property status only after identifying the actual mechanism.`,
        checks: [
          `Collect direct handle, key, locking-point and frame evidence without inferring a mechanism from river or railway position.`,
          `Identify the mechanism first and check current property controls only if the visible repair engages them.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening near the River Avon, railway bridge or Wolston's limited conservation area requires an exact address and responsible person. Neither river nor rail infrastructure establishes access, ownership or the construction to be secured.`,
        decision: `After preserving possible evidence, check current conservation and property controls before an external attachment. Cite the neighbourhood-plan page only for its documented stage, and do not extend the limited designation across the whole village.`,
        checks: [
          `Identify the exact address and responsible person without inferring access, ownership or construction from river or rail context.`,
          `After preserving evidence, verify current attachment controls and retain only the council's documented planning stage.`,
        ],
      },
      'lock-upgrade': {
        local: `River, railway and conservation context do not demonstrate security need at a Wolston entrance. The upgrade objective must come from its authorised controller and observed assembly, without relying on neighbourhood-planning stage as a hardware standard.`,
        decision: `Resolve whether the address is inside the limited current conservation boundary and obtain any relevant property consent. Keep separation from Brandon, south-of-river orientation and plan-screening status outside the hardware specification itself.`,
        checks: [
          `Derive the objective from the authorised controller and observed assembly, not river, railway or planning-stage context.`,
          `Resolve the limited current boundary and property consent while keeping Brandon and south-of-river orientation outside specification.`,
        ],
      },
    },
  },
  {
    slug: 'ryton-on-dunsmore',
    name: 'Ryton-on-Dunsmore',
    region: 'Warwickshire',
    summary: [
      `Rugby Borough Council made the Ryton-on-Dunsmore Neighbourhood Plan on 20 July 2021. The adopted plan says its area coincides with the civil parish, describes northern and western edges along the River Avon valley and records a Main Rural Settlement classification.`,
      `Parish extent, river-valley boundaries and settlement hierarchy are planning-scale facts. They do not determine whether an address is near the river, how it is reached, who controls an entrance, or which building and locking system are present.`,
    ],
    accessGuidance: `Obtain the full Ryton-on-Dunsmore address and use the River Avon valley edge only as caller-confirmed orientation. Confirm the property and controlled entrance rather than treating the civil-parish boundary or settlement category as an access route.`,
    evidenceLimits: `The adopted plan's parish boundary and Main Rural Settlement classification are not property evidence. They establish no river proximity at an address, ownership, access, building type, hardware, damage, coverage, response or locksmith demand.`,
    facts: [
      {
        text: `Rugby Borough Council made the Ryton-on-Dunsmore Neighbourhood Plan on 20 July 2021, making it part of the borough development plan used in planning decisions.`,
        sourceIds: ['rbc-ryton-plan-page'],
        serviceRelevance: `Use made-plan status only as planning context within the confirmed area, not evidence of service conditions.`,
      },
      {
        text: `The adopted plan says its area coincides with the civil parish, describes northern and western boundaries along the River Avon valley and records Ryton as a Main Rural Settlement.`,
        sourceIds: ['rbc-ryton-made-plan'],
        serviceRelevance: `Use parish and river-valley details for verified orientation only and never infer route or property characteristics.`,
      },
    ],
    sourceIds: ['rbc-ryton-plan-page', 'rbc-ryton-made-plan'],
    contexts: {
      'emergency-lockout': {
        local: `Ryton's plan area matches the civil parish and uses the River Avon valley for parts of its northern and western edges, but those boundaries do not locate a doorway. Require the full address and caller-confirmed entrance.`,
        decision: `Main Rural Settlement is a planning-hierarchy term, not proof of occupation or access conditions. Verify the requester at the stated premises and do not turn the river-valley edge into a travel route or response claim.`,
        checks: [
          `Require the full address and caller-confirmed entrance rather than using parish or River Avon valley boundaries.`,
          `Verify the requester at the premises and keep settlement hierarchy and river edges out of route claims.`,
        ],
      },
      'lock-change': {
        local: `The made plan confirms parish-scale planning status but does not identify the existing lock or building controller. A Ryton replacement must follow inspection of the exact entrance and a valid instruction from the responsible party.`,
        decision: `An address near a mapped River Avon valley boundary still needs its own property and permission checks. Neither parish coincidence nor Main Rural Settlement classification provides a component standard, consent or evidence of door construction.`,
        checks: [
          `Inspect the exact entrance and obtain a valid instruction from its responsible party, independently of plan status.`,
          `For a river-valley-edge address, verify property controls and construction without treating settlement classification as a standard.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Civil-parish extent, river edges and settlement classification do not show that a Ryton-on-Dunsmore door is uPVC or multipoint. Record the actual entrance, material and operating symptoms without using planning geography as diagnosis.`,
        decision: `The River Avon valley can help confirm general location only after the address is known. It supplies no evidence about handle movement, key travel, hinges, frame alignment or safe approach to the property.`,
        checks: [
          `Record the actual entrance, material and operating symptoms without using planning geography as diagnosis.`,
          `Use the River Avon valley only after address confirmation and assess handle, key, hinges and frame directly.`,
        ],
      },
      'boarding-up': {
        local: `A damaged Ryton opening near the River Avon valley needs an exact building and authorised controller; a parish-boundary description does not establish river proximity, ownership, flood status, safe access or structural details.`,
        decision: `After preserving possible evidence, inspect the opening and agree temporary work at property level. Main Rural Settlement status and made-plan adoption do not authorise attachment or define the dimensions and materials involved.`,
        checks: [
          `Identify the exact building and controller without inferring river proximity, flood status, access or structure.`,
          `After preserving evidence, inspect dimensions and materials and obtain property-level attachment approval.`,
        ],
      },
      'lock-upgrade': {
        local: `Ryton's plan adoption and settlement-hierarchy position cannot demonstrate security need or existing hardware. Start with the precise entrance and a documented customer, landlord or manager objective rather than a village-wide planning category.`,
        decision: `Use the parish and river-valley boundaries only to verify locality. Compatible upgrade options must follow the observed door set, with any property-specific permission obtained independently of the neighbourhood plan's made status.`,
        checks: [
          `Start with the precise entrance and a documented customer, landlord or manager objective.`,
          `Use parish and river boundaries only for locality, then select from the observed door set and property permissions.`,
        ],
      },
    },
  },
  {
    slug: 'baginton',
    name: 'Baginton',
    region: 'Warwickshire',
    summary: [
      `The joint Baginton and Bubbenhall Neighbourhood Development Plan was made after the 15 March 2018 yes vote and was prepared by both parish councils. The adopted district plan lists Baginton as a Growth Village and in its conservation-area table.`,
      `The joint-plan geography, village hierarchy and conservation entry must not be conflated. They do not establish that an address is inside the designation, whether a building is listed, who controls it, or what entrance hardware exists.`,
    ],
    accessGuidance: `Use the complete Baginton address and keep it distinct from Bubbenhall within the joint plan. Check the current Baginton conservation boundary and exact property status, then confirm the entrance and person authorised to instruct work.`,
    evidenceLimits: `A joint parish plan, Growth Village classification and conservation-table entry are area-scale records. They do not prove property type, listing, ownership, access, construction, lock condition, service reach, response, demand or previous work.`,
    facts: [
      {
        text: `The joint Baginton and Bubbenhall Neighbourhood Development Plan was made following the 15 March 2018 yes vote and was prepared by the two parish councils.`,
        sourceIds: ['wdc-baginton-plan-page'],
        serviceRelevance: `Keep Baginton distinct from Bubbenhall and use the joint plan only within its confirmed mapped area.`,
      },
      {
        text: `The adopted Warwick District Local Plan places Baginton in the Growth Villages column and separately lists Baginton in its conservation-area table.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Treat settlement hierarchy and conservation status as separate checks, neither of which proves an address-level fact.`,
      },
    ],
    sourceIds: ['wdc-baginton-plan-page', 'wdc-local-plan'],
    contexts: {
      'emergency-lockout': {
        local: `Baginton shares a neighbourhood plan with Bubbenhall, so the plan title cannot substitute for the specific village, street and doorway. Obtain the complete Baginton address and verify that the request is not being located only by joint-plan geography.`,
        decision: `Growth Village and conservation-table entries do not prove occupation, entry rights or current building status. Confirm the requester for the stated property and use conservation context only after an exact boundary check.`,
        checks: [
          `Record the complete Baginton street and doorway and keep Bubbenhall separate from the joint-plan title.`,
          `Verify the requester at the property and use conservation context only after checking the exact current boundary.`,
        ],
      },
      'lock-change': {
        local: `The joint plan must not blur a Baginton address with Bubbenhall, and Growth Village status does not identify installed hardware. Inspect the precise door and obtain the responsible customer's replacement objective before selecting a component.`,
        decision: `Because Baginton is separately listed in the district conservation table, check the current address-level boundary and any listed status before visible work. Do not treat that table entry as universal status or automatic refusal or approval.`,
        checks: [
          `Inspect the precise Baginton door and obtain the responsible customer's objective without substituting Bubbenhall evidence.`,
          `Check the current conservation boundary and listed status without treating the table entry as universal permission or refusal.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither the joint parish plan nor Growth Village classification shows that a Baginton entrance is uPVC or multipoint. Ask for the exact door, images and handle, key and frame symptoms from the property itself.`,
        decision: `A conservation-table entry may affect a later visible-change permission check, but it cannot diagnose the mechanism. Keep Baginton and Bubbenhall distinct and base repair only on the observed assembly at the supplied address.`,
        checks: [
          `Obtain images and handle, key and frame symptoms from the exact Baginton door rather than planning classifications.`,
          `Diagnose the observed assembly first and check conservation permission only for the supported visible repair.`,
        ],
      },
      'boarding-up': {
        local: `A damaged Baginton opening requires the actual property and controller, not the joint-plan area or Growth Village label. Establish whether the address is within the current conservation boundary before assuming any heritage-related approval question.`,
        decision: `After police evidence issues are cleared, inspect the specific structure and agree temporary work. Neither parish-council cooperation nor settlement hierarchy supplies ownership, safe access, materials, dimensions or permission to attach boards.`,
        checks: [
          `Identify the actual Baginton property and controller and resolve its current conservation boundary before planning work.`,
          `After evidence clearance, verify access, inspect materials and dimensions, and obtain explicit permission to attach boards.`,
        ],
      },
      'lock-upgrade': {
        local: `Joint-plan status, Growth Village classification and conservation listing do not demonstrate security need in Baginton. An upgrade should follow a documented objective and inspection of the particular entrance, with Bubbenhall evidence not substituted.`,
        decision: `Resolve current conservation and listed status for the address before visible alteration, while keeping that permission check separate from compatible product selection. The plan and hierarchy do not create a village-wide lock standard.`,
        checks: [
          `Use a documented objective and inspection of the Baginton entrance without substituting Bubbenhall or hierarchy evidence.`,
          `Resolve current conservation and listed controls separately from product selection and avoid a village-wide standard.`,
        ],
      },
    },
  },
  {
    slug: 'brandon',
    name: 'Brandon',
    region: 'Warwickshire',
    summary: [
      `Rugby Borough Council made the joint Brandon and Bretford Neighbourhood Development Plan on 4 June 2019. Its Brandon conservation appraisal says the designation covers most village buildings north of Avondale Road and notes the railway viaduct on the approach from Wolston.`,
      `The joint plan, partial conservation boundary and railway landmark describe different scales. They do not establish that an address is designated, listed or accessible by a particular route, nor do they identify ownership, entrance construction or installed hardware.`,
    ],
    accessGuidance: `Use the full Brandon address, keep it distinct from Bretford and Wolston, and use Avondale Road or the railway viaduct only as verified orientation. Check the current conservation boundary, exact entrance and authority separately.`,
    evidenceLimits: `Most village buildings north of Avondale Road is not an address-level designation test, and the viaduct is not route evidence. The sources prove no listing, property type, access, lock, condition, coverage, response or demand.`,
    facts: [
      {
        text: `Rugby Borough Council made the Brandon and Bretford Neighbourhood Development Plan on 4 June 2019, and it forms part of the borough development plan.`,
        sourceIds: ['rbc-brandon-plan-page'],
        serviceRelevance: `Keep Brandon distinct from Bretford and apply the joint plan only within its confirmed mapped area.`,
      },
      {
        text: `The Brandon appraisal says its conservation area covers most village buildings north of Avondale Road and that the approach from Wolston is marked by the railway viaduct.`,
        sourceIds: ['rbc-brandon-conservation'],
        serviceRelevance: `Check the precise boundary and use the viaduct only as orientation, never evidence of route or access.`,
      },
    ],
    sourceIds: ['rbc-brandon-plan-page', 'rbc-brandon-conservation'],
    contexts: {
      'emergency-lockout': {
        local: `Brandon's joint plan includes Bretford, while its railway viaduct is described on the approach from Wolston. A request must therefore name the Brandon street and exact doorway rather than relying on the plan title or viaduct.`,
        decision: `An address north of Avondale Road is not automatically confirmed inside the conservation boundary, and the viaduct does not prove a route. Verify the requester at the particular property without importing either assumption.`,
        checks: [
          `Name the Brandon street and doorway and keep Bretford and the Wolston-side viaduct distinct.`,
          `Check the exact boundary and verify the requester without assuming designation north of Avondale Road or a viaduct route.`,
        ],
      },
      'lock-change': {
        local: `The appraisal's “most village buildings north of Avondale Road” description still requires a current boundary check at the exact Brandon address. It cannot replace verification of listed status or identify the lock to be changed.`,
        decision: `The made Brandon and Bretford plan supplies planning context, not a hardware specification or owner approval. Keep Bretford separate, inspect the actual door and establish any property-specific conservation or management permission before alteration.`,
        checks: [
          `Check the current boundary and listed status at the exact Brandon address rather than generalising north of Avondale Road.`,
          `Inspect the actual door and obtain property-specific permission without importing Bretford or joint-plan assumptions.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither the railway viaduct nor the partial conservation description shows that a Brandon entrance is uPVC, composite or multipoint. Record door material and handle, key, frame and locking-point behaviour from direct evidence.`,
        decision: `The joint plan cannot diagnose a mechanism and must not blur Brandon with Bretford. Use the Wolston approach and Avondale Road references only to confirm location after receiving a complete address.`,
        checks: [
          `Record material and handle, key, frame and locking-point behaviour directly from the Brandon entrance.`,
          `Use Wolston and Avondale Road references only after address confirmation and keep them outside mechanism diagnosis.`,
        ],
      },
      'boarding-up': {
        local: `Damage near Avondale Road or the railway viaduct needs a precise Brandon property and responsible party. The appraisal does not confirm address-level designation, and the railway landmark does not establish safe access or ownership.`,
        decision: `After possible evidence is preserved, check current conservation and listed status before an external attachment where relevant. The joint plan supplies no construction, boundary permission or temporary-securing method for the particular opening.`,
        checks: [
          `Identify the precise Brandon property and responsible party without treating Avondale Road or the viaduct as access evidence.`,
          `After preserving evidence, verify current property controls and inspect construction before choosing an external attachment.`,
        ],
      },
      'lock-upgrade': {
        local: `A made joint plan, conservation context and railway landmark do not demonstrate security need in Brandon. Begin with the individual entrance and documented objective, keeping Bretford, Wolston and the exact conservation boundary distinct.`,
        decision: `Where the current map confirms designation north or south of Avondale Road, obtain only the permissions applicable to that address. The viaduct is orientation and cannot influence hardware choice, risk assessment or route claims.`,
        checks: [
          `Start with the individual Brandon entrance and documented objective while keeping Bretford and Wolston evidence separate.`,
          `Use the current boundary only for applicable permission and exclude the viaduct from hardware, risk and route decisions.`,
        ],
      },
    },
  },
  {
    slug: 'shilton',
    name: 'Shilton',
    region: 'Warwickshire',
    summary: [
      `Rugby Borough Council's 2024 Rural Sustainability Study classifies Shilton as a Rural Village and places it within Shilton and Barnacle civil parish. Warwickshire County Council's live register lists Shilton on bus services 74/74A/74B/74C.`,
      `The planning classification, joint parish name and timetable entry are context rather than property evidence. The transport record is time-sensitive and must be rechecked before publication; neither source establishes private access, hardware or service coverage.`,
    ],
    accessGuidance: `Use the complete Shilton address, keep the Shilton and Barnacle parish context distinct from the individual settlement, and recheck the live county timetable before mentioning service 74 variants. Never assume a stop is near the property.`,
    evidenceLimits: `Rural Village status and a bus-stop listing do not prove property type, ownership, access, route suitability, timetable permanence, parking, door material, lock type, condition, locksmith availability, coverage, response time or local demand.`,
    facts: [
      {
        text: `Rugby Borough Council's 2024 Rural Sustainability Study classifies Shilton as a Rural Village and records it within Shilton and Barnacle civil parish.`,
        sourceIds: ['rbc-rural-study-2024'],
        serviceRelevance: `Use Rural Village only as official planning classification and keep Shilton distinct within the joint parish.`,
      },
      {
        text: `Warwickshire County Council's live bus register lists Shilton on routes 74, 74A, 74B and 74C in the Nuneaton and Coventry corridor.`,
        sourceIds: ['wcc-shilton-bus'],
        serviceRelevance: `Recheck the timetable before publication and never infer that an address is close to or reachable from a stop.`,
      },
    ],
    sourceIds: ['rbc-rural-study-2024', 'wcc-shilton-bus'],
    contexts: {
      'emergency-lockout': {
        local: `Shilton is recorded within the Shilton and Barnacle civil parish, so the parish name does not identify the settlement, street or doorway. Require the full Shilton address and do not use Rural Village classification as an access instruction.`,
        decision: `The county bus entry is live and time-sensitive; even while routes 74 variants list Shilton, that does not show a stop is near the premises or provide an approach. Verify the requester and exact opening independently.`,
        checks: [
          `Require the full Shilton address and doorway and keep Barnacle distinct from the joint civil-parish name.`,
          `Recheck the live bus record and never use a listed stop as an approach; verify the requester independently.`,
        ],
      },
      'lock-change': {
        local: `Rural Village is a planning category, not evidence of a Shilton property's construction or fitted lock. Name the individual entrance and obtain the authorised owner, occupier or manager's objective before any replacement is specified.`,
        decision: `Neither the Shilton and Barnacle parish grouping nor the current bus corridor supplies a hardware requirement or property permission. If transport is mentioned for orientation, recheck the live timetable and keep it outside the technical decision.`,
        checks: [
          `Name the individual entrance and obtain the authorised owner, occupier or manager's replacement objective.`,
          `Keep civil-parish and bus-corridor context outside specification and recheck transport before using it for orientation.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Shilton's Rural Village classification and parish membership do not show that a door is uPVC, composite or multipoint. Ask for direct evidence from the stated opening, including handle, key, frame and open-or-closed behaviour.`,
        decision: `A service 74 stop listing can help distinguish the place only after it is rechecked; it cannot diagnose a mechanism or prove access to a property. Keep the time-sensitive transport record separate from the repair assessment.`,
        checks: [
          `Collect handle, key, frame and open-or-closed behaviour directly from the stated Shilton opening.`,
          `Recheck any service 74 reference and keep it outside mechanism diagnosis and property-access assumptions.`,
        ],
      },
      'boarding-up': {
        local: `A damaged opening in Shilton must be identified by address and responsible controller, not Rural Village status or the broader Shilton and Barnacle parish name. The study provides no structural or boundary information for a premise.`,
        decision: `After any evidence-preservation requirement, inspect the actual door or window and agree temporary work. Bus routes 74/74A/74B/74C are volatile orientation data and establish neither safe access, dimensions nor attachment permission.`,
        checks: [
          `Identify the Shilton address and responsible controller without relying on Rural Village or joint-parish labels.`,
          `After preserving evidence, inspect the opening and dimensions, verify safe access, obtain attachment permission, and exclude volatile bus routes from those findings.`,
        ],
      },
      'lock-upgrade': {
        local: `Planning classification as a Rural Village cannot demonstrate security need or a current lock standard in Shilton. An upgrade requires the exact entrance, observed assembly and a documented objective from its authorised controller.`,
        decision: `Keep the joint civil-parish record and live bus timetable out of product selection. If the transport reference is retained as locality context, verify it again and avoid implying that any address is near a stop or covered.`,
        checks: [
          `Document the exact entrance, observed assembly and authorised objective without deriving need from Rural Village status.`,
          `Exclude parish and bus records from product selection and recheck any transport detail retained solely for locality.`,
        ],
      },
    },
  },
  {
    slug: 'brinklow',
    name: 'Brinklow',
    region: 'Warwickshire',
    summary: [
      `Rugby Borough Council made the Brinklow Neighbourhood Plan on 14 December 2022. Its conservation appraisal states that the designated area covers only part of the village and includes part of Ell Lane leading toward the motte-and-bailey castle.`,
      `The made plan and partial conservation boundary are different scales of evidence. Historic route context does not establish an approach to a property, while neither source identifies listed status, ownership, entrance fabric, hardware or condition.`,
    ],
    accessGuidance: `Use the full Brinklow address and treat Ell Lane and the motte-and-bailey castle only as verified orientation. Check the current partial conservation boundary and exact property status, then confirm the entrance and authorised person.`,
    evidenceLimits: `The conservation area covers only part of Brinklow, and its historic route description is not access evidence. The sources prove no listing, building type, ownership, private route, lock, damage, coverage, response or demand.`,
    facts: [
      {
        text: `Rugby Borough Council made the Brinklow Neighbourhood Plan on 14 December 2022, and it forms part of the borough development plan.`,
        sourceIds: ['rbc-brinklow-plan-page'],
        serviceRelevance: `Use made-plan status as planning context only within the confirmed area, not property or service evidence.`,
      },
      {
        text: `The Brinklow appraisal states that its conservation area covers only part of the village and includes part of Ell Lane leading to the motte-and-bailey castle.`,
        sourceIds: ['rbc-brinklow-conservation'],
        serviceRelevance: `Check the current boundary and use Ell Lane only for orientation, never to infer building age or access.`,
      },
    ],
    sourceIds: ['rbc-brinklow-plan-page', 'rbc-brinklow-conservation'],
    contexts: {
      'emergency-lockout': {
        local: `Brinklow's conservation designation covers only part of the village, and Ell Lane's link toward the motte-and-bailey castle is historical orientation rather than an entrance instruction. Obtain the complete property address and controlled doorway.`,
        decision: `The made neighbourhood plan does not prove occupation, while a castle or Ell Lane reference cannot identify authority or a usable approach. Verify the requester against the stated premises and keep public historic context separate.`,
        checks: [
          `Obtain the complete property address and doorway and use Ell Lane or the castle only for orientation.`,
          `Verify the requester at the stated premises without deriving authority or an approach from historic context.`,
        ],
      },
      'lock-change': {
        local: `A visible replacement in Brinklow requires an exact check against the current partial conservation boundary. Being in the village, on Ell Lane or near the castle reference does not itself confirm designation or listed status.`,
        decision: `The made plan cannot select hardware or permit alteration. Inspect the individual entrance, obtain the authorised customer's requirement and verify any property-specific conservation, listing, landlord or manager condition before changing visible components.`,
        checks: [
          `Check the exact address against the current partial boundary and verify listed status separately.`,
          `Inspect the entrance and obtain the authorised requirement plus applicable conservation, landlord or manager conditions.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Brinklow's plan and conservation appraisal do not show that a door is uPVC or multipoint, and historic Ell Lane context says nothing about current construction. Collect direct material and operating evidence from the exact opening.`,
        decision: `If the address is inside the current conservation boundary, that may prompt a permission question for visible remedial work but cannot diagnose a fault. The castle route description must not influence mechanism selection or access claims.`,
        checks: [
          `Collect material and operating evidence from the exact opening without inferring construction from Ell Lane history.`,
          `Diagnose first, then check current conservation permission for visible work and exclude the castle route from decisions.`,
        ],
      },
      'boarding-up': {
        local: `A damaged Brinklow opening must be placed inside or outside the current partial conservation boundary using its exact address. Ell Lane and the motte-and-bailey reference supply no ownership, structure, safe-access or attachment evidence.`,
        decision: `After potential forensic material is preserved, confirm the responsible party and any property-status constraint before external temporary securing. Made-plan status does not authorise work or disclose the door or window's dimensions and materials.`,
        checks: [
          `Place the opening against the current partial boundary and establish ownership, structure and access directly.`,
          `After preserving evidence, verify the controller and property controls and inspect dimensions and materials before attachment.`,
        ],
      },
      'lock-upgrade': {
        local: `Neighbourhood-plan adoption, partial conservation designation and historic route context cannot demonstrate a security need in Brinklow. Begin with the actual entrance and a documented owner, occupier or manager objective instead.`,
        decision: `Check current conservation and listed status at the precise address, obtaining any consent relevant to visible work. Do not transfer Ell Lane or castle history into a product standard, risk claim or assumption about existing hardware.`,
        checks: [
          `Begin with the actual entrance and a documented owner, occupier or manager objective.`,
          `Check current address-level controls and keep Ell Lane and castle history out of product and risk claims.`,
        ],
      },
    },
  },
  {
    slug: 'southam',
    name: 'Southam',
    region: 'Warwickshire',
    summary: [
      `Stratford-on-Avon District Council made the Southam Neighbourhood Plan on 11 July 2023. The council publishes a Southam conservation boundary map and review documents and includes the area in its 2026 conservation-appraisal review programme.`,
      `The made plan and conservation records support planning context, but review work must not be presented as adopted replacement policy. Neither establishes that an address is designated or listed, who controls its entrance or what hardware is installed.`,
    ],
    accessGuidance: `Obtain the complete Southam address, check the latest formally published conservation boundary and distinguish current adopted records from 2026 appraisal-review material. Verify listed status, exact entrance and responsible party independently before visible work.`,
    evidenceLimits: `The neighbourhood plan and conservation review do not apply uniformly to every Southam building. Draft review material proves no adopted change, and the sources establish no ownership, access, fabric, lock, coverage, response or demand.`,
    facts: [
      {
        text: `Stratford-on-Avon District Council made the Southam Neighbourhood Plan on 11 July 2023, making it part of the development plan used in planning decisions within the area.`,
        sourceIds: ['sdc-southam-plan-page'],
        serviceRelevance: `Use made-plan status only as formal planning context and not as an address, property or service claim.`,
      },
      {
        text: `The council provides Southam Conservation Area boundary and review documents and includes Southam in a conservation-appraisal review programme with consultation scheduled in 2026.`,
        sourceIds: ['sdc-conservation-h-z', 'sdc-conservation-review-2026'],
        serviceRelevance: `Use current formally published records and never treat appraisal-review drafts as adopted replacement evidence.`,
      },
    ],
    sourceIds: ['sdc-southam-plan-page', 'sdc-conservation-h-z', 'sdc-conservation-review-2026'],
    contexts: {
      'emergency-lockout': {
        local: `Southam's made neighbourhood plan and conservation-area records operate at different scales, while 2026 appraisal work remains review material. A lockout requires the complete property address and exact doorway rather than either planning label.`,
        decision: `Current or draft conservation context cannot verify occupation or permission to enter. Confirm the requester at the stated premises and do not use scheduled consultation, review status or a broad plan area as authority.`,
        checks: [
          `Record the complete property address and doorway and keep the made plan distinct from 2026 review material.`,
          `Verify the requester at the premises without treating consultation, review status or plan extent as authority.`,
        ],
      },
      'lock-change': {
        local: `For visible replacement in Southam, consult the latest formally published conservation boundary and individual property record. Do not treat documents in the 2026 appraisal review as adopted changes or assume the whole neighbourhood-plan area is designated.`,
        decision: `The made plan provides planning weight but no lock specification or customer permission. Inspect the actual door, obtain the authorised objective and verify current conservation, listed-building or management controls separately before alteration.`,
        checks: [
          `Use the latest formal boundary and property record and do not treat 2026 review documents as adopted.`,
          `Inspect the door and verify the authorised objective and current conservation, listing or management controls separately.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither Southam's made plan nor its conservation review establishes uPVC, composite or multipoint construction at an address. Diagnose from direct handle, key, frame and locking-point evidence, not from current or draft planning documents.`,
        decision: `If visible repair could affect controlled fabric, check the present formal boundary and property status after identifying the mechanism. A scheduled consultation cannot be treated as an adopted constraint or as proof about the door.`,
        checks: [
          `Diagnose from direct handle, key, frame and locking-point evidence rather than current or draft planning documents.`,
          `Identify the mechanism first, then use present formal records for any controlled-fabric permission check.`,
        ],
      },
      'boarding-up': {
        local: `A damaged Southam opening needs exact address-level status because neighbourhood-plan extent, current conservation boundaries and 2026 review proposals are not interchangeable. Identify the scene and responsible controller before temporary work.`,
        decision: `Once evidence-preservation questions are cleared, use current formal records for any external-attachment permission and disregard drafts as adopted policy. The sources provide no structural detail, ownership authority or temporary securing method.`,
        checks: [
          `Resolve the exact address, scene and controller across plan extent, current boundaries and separate review proposals.`,
          `After preserving evidence, use current formal records for attachment permission and inspect the structure directly.`,
        ],
      },
      'lock-upgrade': {
        local: `Plan adoption and conservation-appraisal review cannot demonstrate security need or a current lock standard in Southam. Start with the individual entrance and written objective, keeping draft planning work outside the product decision.`,
        decision: `Resolve the latest formal conservation boundary, listed status and property management rules only for the supplied address. Obtain any necessary consent before visible change without claiming that the 2026 review has already altered controls.`,
        checks: [
          `Start with the individual entrance and written objective and keep draft appraisal work outside product selection.`,
          `Resolve current address-level conservation, listing and management controls without claiming the 2026 review changed them.`,
        ],
      },
    },
  },
  {
    slug: 'studley',
    name: 'Studley',
    region: 'Warwickshire',
    summary: [
      `Stratford-on-Avon District Council lists Studley's Parish Plan and Action Plan as adopted in February 2017. The council also records the whole civil parish as a designated neighbourhood area and publishes the associated confirmation documents.`,
      `A parish plan and designated neighbourhood area are distinct planning records. They provide locality and process context only, without establishing a building's status, use, access, entrance hardware or service conditions.`,
    ],
    accessGuidance: `Use the complete Studley address and describe the evidence accurately: a February 2017 Parish Plan and Action Plan plus a designated whole-parish neighbourhood area. Recheck the latest council record before describing any later planning stage.`,
    evidenceLimits: `Designation of an area for neighbourhood planning is not plan adoption, and a parish plan is a different instrument. The records prove no property status, ownership, access, fabric, hardware, coverage, response, demand or job history.`,
    facts: [
      {
        text: `Stratford-on-Avon District Council lists Studley's Parish Plan and Action Plan as adopted in February 2017.`,
        sourceIds: ['sdc-parish-plans'],
        serviceRelevance: `Describe the document accurately as a parish plan rather than a made neighbourhood development plan.`,
      },
      {
        text: `Council records show Studley Parish Council applied to designate the whole civil parish as its neighbourhood area, and the current register links the confirmation documents.`,
        sourceIds: ['sdc-studley-area-report', 'sdc-designated-neighbourhood-areas'],
        serviceRelevance: `Describe only the documented neighbourhood-area stage and recheck the council register before stating any later adoption or making.`,
      },
    ],
    sourceIds: ['sdc-parish-plans', 'sdc-studley-area-report', 'sdc-designated-neighbourhood-areas'],
    contexts: {
      'emergency-lockout': {
        local: `Studley's whole-parish neighbourhood-area designation locates a planning process but does not identify an address or adopted development plan. Obtain the full property and doorway, describing the 2017 document only as a Parish Plan and Action Plan.`,
        decision: `Neither parish-plan adoption nor area designation verifies occupation or entry authority. Confirm the requester at the stated premises and keep later plan status outside the access decision.`,
        checks: [
          `Obtain the full property and doorway and describe the 2017 records only as a Parish Plan and Action Plan.`,
          `Verify the requester at the premises and keep neighbourhood-area or later plan status outside access authority.`,
        ],
      },
      'lock-change': {
        local: `A Studley replacement decision must not turn planning-stage records into a hardware requirement. The 2017 parish plan and whole-parish area designation cannot identify existing hardware or approve alteration.`,
        decision: `Inspect the exact entrance and obtain the responsible customer's objective and any property-specific approval. If a later council record explicitly makes a plan, review it then; until that point the made-plan flag remains false.`,
        checks: [
          `Inspect the exact entrance and do not derive hardware requirements from parish-plan or area-designation records.`,
          `Obtain the responsible customer's objective and property approval while retaining the council-recorded planning stage.`,
        ],
      },
      'upvc-lock-repair': {
        local: `A Parish Plan, Action Plan and designated neighbourhood area say nothing about whether a Studley door is uPVC or multipoint. Record the affected opening and direct handle, key and frame symptoms without turning plan status into a mechanism claim.`,
        decision: `The whole-civil-parish application is boundary-process evidence, not a mechanism diagnosis or property permission. Keep plan status accurate and make the repair decision solely from the observed door and authorised instruction.`,
        checks: [
          `Record the affected opening and direct handle, key and frame symptoms without using planning-stage records diagnostically.`,
          `Base repair solely on the observed door and authorised instruction while preserving the accurate planning status.`,
        ],
      },
      'boarding-up': {
        local: `For a damaged Studley opening, the exact building, scene and controller matter; a whole-parish neighbourhood-area designation supplies none of them. Describe the 2017 parish documents by their published titles.`,
        decision: `After preserving possible evidence, inspect the structure and agree temporary scope with its authorised controller. The designated-area report and register provide no ownership, safe access, construction detail or attachment consent.`,
        checks: [
          `Identify the exact building, scene and controller and retain the published titles of the 2017 parish documents.`,
          `After preserving evidence, verify ownership and access, inspect the construction, and obtain explicit attachment consent.`,
        ],
      },
      'lock-upgrade': {
        local: `Studley's parish documents and neighbourhood-area designation cannot demonstrate security need or an upgrade standard. Begin with the individual entrance and documented objective, keeping planning-stage records outside the specification.`,
        decision: `Any product and permission decision must follow the observed door and exact property controls, not planning-process status. Revisit the evidence only if a later council source clearly records a neighbourhood development plan as made.`,
        checks: [
          `Begin with the individual entrance and documented objective and keep planning-stage records outside specification.`,
          `Base product and permission decisions on the observed door and property controls, updating status only from explicit council evidence.`,
        ],
      },
    },
  },
  {
    slug: 'alcester',
    name: 'Alcester',
    region: 'Warwickshire',
    summary: [
      `Stratford-on-Avon District Council made the Alcester Neighbourhood Plan on 12 July 2021 and records a Town Council review consultation beginning in December 2025. The council also publishes a conservation map, broadsheet and two-part appraisal.`,
      `The made 2021 plan remains the evidenced adopted plan while review material proceeds. Its planning area and the separate conservation boundary do not establish address-level designation, listing, property use, entrance authority, fabric or locking system.`,
    ],
    accessGuidance: `Obtain the complete Alcester address, use the made 2021 plan as current adopted evidence and label later review material as draft until a new made plan is recorded. Check the conservation boundary and building status separately.`,
    evidenceLimits: `A plan review does not replace the made 2021 plan until formally completed, and conservation status is boundary-specific. The sources prove no listing, ownership, access, door or lock type, condition, coverage, response or demand.`,
    facts: [
      {
        text: `Stratford-on-Avon District Council made the Alcester Neighbourhood Plan on 12 July 2021 and records that Town Council review consultation began on 15 December 2025.`,
        sourceIds: ['sdc-alcester-plan-page'],
        serviceRelevance: `Use the made 2021 plan as adopted evidence and label review material as draft until officially made.`,
      },
      {
        text: `The council's conservation register provides an Alcester Conservation Area boundary map, broadsheet and two-part character appraisal.`,
        sourceIds: ['sdc-conservation-a-g'],
        serviceRelevance: `Check the exact current boundary and verify listed status separately before any conservation-related property guidance.`,
      },
    ],
    sourceIds: ['sdc-alcester-plan-page', 'sdc-conservation-a-g'],
    contexts: {
      'emergency-lockout': {
        local: `Alcester's 2021 made plan, later review consultation and conservation boundary are different records, none of which identifies a controlled doorway. Obtain the complete address and do not present draft review material as a newly adopted plan.`,
        decision: `Current planning or conservation status cannot verify occupation or entry rights. Confirm the requester at the specified premises, using the 2021 plan only for planning context and the conservation map only after address resolution.`,
        checks: [
          `Record the complete address and doorway and keep the 2021 made plan distinct from draft review material.`,
          `Verify the requester at the premises and use the conservation map only after resolving the address.`,
        ],
      },
      'lock-change': {
        local: `The 2021 plan remains the made evidence while Alcester's review proceeds, and a visible replacement requires the current conservation boundary rather than a town-wide assumption. Check listed status and building-specific approval independently.`,
        decision: `Review consultation does not select hardware or alter the authority needed for a lock change. Inspect the entrance, agree the responsible customer's specification and keep draft policy, adopted policy and property consent clearly separated.`,
        checks: [
          `Use the current boundary and verify listed status and building approval without generalising across Alcester.`,
          `Inspect the entrance and separate the customer's specification, 2021 adopted policy, draft review and property consent.`,
        ],
      },
      'upvc-lock-repair': {
        local: `Neither Alcester's made plan, ongoing review nor conservation appraisal shows that a particular door is uPVC or multipoint. Identify the actual material and handle, key, frame and locking-point behaviour from direct evidence.`,
        decision: `A current conservation boundary may prompt permission checks if visible repair affects controlled fabric, but cannot diagnose the fault. Do not treat review consultation as adopted change or as evidence about the entrance.`,
        checks: [
          `Identify material and handle, key, frame and locking-point behaviour directly from the particular door.`,
          `Diagnose first, then check current conservation permission for visible work without treating review consultation as adopted.`,
        ],
      },
      'boarding-up': {
        local: `A damaged Alcester opening needs exact mapping against the current conservation boundary and individual property record. The made plan and review consultation do not establish ownership, scene status, building construction or attachment rights.`,
        decision: `After potential forensic evidence is preserved, inspect the opening and confirm any property-specific approval for external temporary security. Use the 2021 plan as current adopted context until the authority records a replacement as made.`,
        checks: [
          `Map the opening against the current boundary and verify ownership, scene and construction at the property.`,
          `After preserving evidence, obtain property-specific attachment approval and retain the 2021 plan as adopted context.`,
        ],
      },
      'lock-upgrade': {
        local: `Plan adoption, review consultation and conservation appraisal cannot demonstrate security need or set a lock standard across Alcester. An upgrade requires the actual entrance and a documented objective from the person authorised to control it.`,
        decision: `Resolve current conservation, listed and management constraints for the supplied property before visible alteration. Review material must remain labelled draft, and compatible product selection must follow inspection rather than future-policy assumptions.`,
        checks: [
          `Use the actual entrance and authorised person's documented objective instead of plan or appraisal status.`,
          `Resolve current property controls, label review material as draft and select compatible options only after inspection.`,
        ],
      },
    },
  },
]

export const SOUTH_WEST_AREA_GUIDES = Object.fromEntries(
  AREA_SEEDS.map((seed, index) => [seed.slug, buildGuide(seed, index)]),
) as Record<SouthWestAreaSlug, GovernedAreaGuide>
