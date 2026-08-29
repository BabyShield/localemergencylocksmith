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
  localFactIndexes: number[]
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
  factOnlySourceIds?: string[]
  contexts: Record<ServiceAreaSlug, PairContext>
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
  'rbc-rural-study-2024': localitySource('rbc-rural-study-2024', 'Rugby Borough Council Rural Sustainability Study 2024', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/62894537/CD.3.10%2BAppendix%2B10%2BRugby%2BBorough%2BCouncil%2BRural%2BSustainability%2BStudy%2B2024.pdf/6837df18-54d6-0146-1910-37307fb4a34f?t=1774451299803', 'The council study classifies Shilton as a Rural Village.'),
  'ons-rugby-area-profile': localitySource('ons-rugby-area-profile', 'Rugby area profile', 'Office for National Statistics', 'https://www.ons.gov.uk/explore-local-statistics/areas/E07000220-rugby', 'The official Rugby area profile lists Shilton and Barnacle among the district\'s parishes.'),
  'wcc-shilton-bus': localitySource('wcc-shilton-bus', 'Bus service 74/74A/74B/74C', 'Warwickshire County Council', 'https://apps.warwickshire.gov.uk/BusTimetable/services/1379', 'The live county timetable listing Shilton on the Nuneaton and Coventry corridor.'),
  'rbc-brinklow-plan-page': localitySource('rbc-brinklow-plan-page', 'Brinklow Neighbourhood Plan', 'Rugby Borough Council', 'https://www.rugby.gov.uk/w/brinklow-neighbourhood-plan', 'The made date and development-plan status of the Brinklow neighbourhood plan.'),
  'rbc-brinklow-conservation': localitySource('rbc-brinklow-conservation', 'Brinklow Conservation Area Character Appraisal', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6569677/Brinklow_Character_Appraisal.pdf/701c66c7-5596-39a8-e538-ab8daa4f699f?t=1750866416443', 'The partial-village conservation boundary and its inclusion of part of Ell Lane.', 'property-status'),
  'sdc-southam-plan-page': localitySource('sdc-southam-plan-page', 'Southam Neighbourhood Plan', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/southam-neighbourhood-plan.cfm', 'The made date and current development-plan role of the Southam neighbourhood plan.'),
  'sdc-parish-plans': localitySource('sdc-parish-plans', 'List of Adopted Parish Plans', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/parish-plans-a-m.cfm', 'The February 2017 adoption entry for the Studley Parish Plan and Action Plan.'),
  'sdc-studley-area-report': localitySource('sdc-studley-area-report', 'Studley Neighbourhood Area Report, 17 January 2018', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/doc/207189/name/Studley%20NDP%20area%20report%20Leader%20of%20Council.pdf/', 'The Studley Parish Council application to designate the whole civil parish as its neighbourhood area.'),
  'sdc-designated-neighbourhood-areas': localitySource('sdc-designated-neighbourhood-areas', 'Designated Neighbourhood Plan Areas', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/designated-neighbourhood-plan-areas.cfm', 'The current Studley neighbourhood-area entry and linked confirmation documents.'),
  'sdc-alcester-plan-page': localitySource('sdc-alcester-plan-page', 'Alcester Neighbourhood Plan', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/alcester-neighbourhood-plan.cfm', 'The 2021 made plan and Town Council review consultation recorded from December 2025.'),
  'sdc-conservation-a-g': localitySource('sdc-conservation-a-g', 'Conservation Areas A-G', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/conservation-areas-a-g.cfm', 'The published Alcester Conservation Area map, broadsheet and two-part character appraisal.', 'property-status'),
  'dfe-heathcote-primary': localitySource('dfe-heathcote-primary', 'Heathcote Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/144648', 'The official establishment name and Vickers Way, Heathcote address for this specific primary school.'),
  'dfe-lillington-primary': localitySource('dfe-lillington-primary', 'Lillington Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/147642', 'The official establishment name and Cubbington Road, Lillington address for this specific primary school.'),
  'dfe-milverton-primary': localitySource('dfe-milverton-primary', 'Milverton Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125610', 'The official establishment name and Greatheed Road, Leamington Spa address for this specific primary school.'),
  'dfe-sydenham-primary': localitySource('dfe-sydenham-primary', 'Sydenham Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/130868', 'The official establishment name and Calder Walk, Sydenham address for this specific primary school.'),
  'dfe-whitnash-primary': localitySource('dfe-whitnash-primary', 'Whitnash Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125560', 'The official establishment name and Langley Road, Whitnash address for this specific primary school.'),
  'wdc-chase-meadow-centre-solar': localitySource('wdc-chase-meadow-centre-solar', 'Chase Meadow Community Centre benefits from Council grant', 'Warwick District Council', 'https://www.warwickdc.gov.uk/news/article/1331/chase_meadow_community_centre_benefits_from_council_grant', 'The council report that solar panels were installed on the named Chase Meadow Community Centre in Warwick.'),
  'dfe-coten-end-primary': localitySource('dfe-coten-end-primary', 'Coten End Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/151505', 'The official establishment name and Coten End, Warwick address for this specific primary school.'),
  'wdc-warwick-gates-community-centre': localitySource('wdc-warwick-gates-community-centre', 'Warwick Gates Community Centre', 'Warwick District Council', 'https://www.warwickdc.gov.uk/directory_record/3052/warwick_gates_community_centre', 'The council facilities-directory record for the specifically named Warwick Gates Community Centre.'),
  'dfe-woodloes-primary': localitySource('dfe-woodloes-primary', 'Woodloes Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/141855', 'The official establishment name and Deansway, Woodloes Park Estate address for this specific primary school.'),
  'dfe-alcester-our-ladys-primary': localitySource('dfe-alcester-our-ladys-primary', "Our Lady's Catholic Primary School", 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/143632', 'The official establishment name and St Faiths Road, Alcester address for this specific primary school.'),
  'wcc-baginton-parish-council': localitySource('wcc-baginton-parish-council', 'Baginton - Parish and town councils', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/directory-record/8616/baginton', 'The county directory entry for Baginton Parish Council and its clerk contact record.'),
  'dfe-balsall-common-primary': localitySource('dfe-balsall-common-primary', 'Balsall Common Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/138536', 'The official establishment name and Balsall Street East, Balsall Common address for this specific primary school.'),
  'wcc-brandon-bretford-parish-council': localitySource('wcc-brandon-bretford-parish-council', 'Brandon & Bretford - Parish and town councils', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/directory-record/8635/brandon-bretford', 'The county directory record titled Brandon & Bretford and its link to Brandon and Bretford Parish Council.'),
  'wcc-brinklow-parish-council': localitySource('wcc-brinklow-parish-council', 'Brinklow - Parish and town councils', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/directory-record/8636/brinklow', 'The county directory entry for Brinklow Parish Council and its clerk contact record.'),
  'dfe-george-fentham-school': localitySource('dfe-george-fentham-school', 'George Fentham Endowed School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/104094', 'The official establishment name and Fentham Road, Hampton-in-Arden address for this specific primary school.'),
  'dfe-kenilworth-st-nicholas-primary': localitySource('dfe-kenilworth-st-nicholas-primary', 'St Nicholas CofE Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/151107', 'The official establishment name and The Blundells, Kenilworth address for this specific primary school.'),
  'dfe-meriden-primary': localitySource('dfe-meriden-primary', 'Meriden Church of England Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/104087', 'The official establishment name and Fillongley Road, Meriden address for this specific primary school.'),
  'dfe-ryton-provost-williams': localitySource('dfe-ryton-provost-williams', 'Ryton-On-Dunsmore Provost Williams Church of England Academy', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/149518', 'The official establishment name and Sodens Avenue, Ryton-on-Dunsmore address for this specific primary academy.'),
  'dfe-southam-primary': localitySource('dfe-southam-primary', 'Southam Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/143906', 'The official establishment name and St James Road, Southam address for this specific primary school.'),
  'dfe-studley-infants': localitySource('dfe-studley-infants', "Studley Infants' School", 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/148511', 'The official establishment name and High Street, Studley address for this specific infant school.'),
  'dfe-wolston-st-margarets': localitySource('dfe-wolston-st-margarets', "Wolston St Margaret's CofE Primary School", 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125676', 'The official establishment name and Brookside, Main Street, Wolston address for this specific primary school.'),
  'dfe-bishopton-primary': localitySource('dfe-bishopton-primary', 'Bishopton Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125607', 'The official establishment name and Drayton Avenue, Stratford-upon-Avon address for this specific primary school.'),
  'dfe-shottery-st-andrews': localitySource('dfe-shottery-st-andrews', "Shottery St Andrew's CofE Primary School", 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125646', 'The official establishment name and Hathaway Lane, Stratford-upon-Avon address for this specific primary school.'),
  'dfe-alveston-primary-tiddington': localitySource('dfe-alveston-primary-tiddington', 'Alveston CofE Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125623', 'The official establishment name and Knights Lane, Tiddington address for this specific primary school.'),
}

const SERVICE_LABELS: Record<ServiceAreaSlug, string> = {
  'emergency-lockout': 'Confirming the right entrance for emergency access',
  'lock-change': 'Choosing between lock repair and replacement',
  'upvc-lock-repair': 'Diagnosing a uPVC door lock fault',
  'boarding-up': 'Securing a damaged opening',
  'lock-upgrade': 'Choosing a compatible door-security upgrade',
}

const SERVICE_CHECKS: Record<ServiceAreaSlug, string> = {
  'emergency-lockout': 'Verify identity, authority and the controlled entrance.',
  'lock-change': 'Confirm who may authorise the specific replacement.',
  'upvc-lock-repair': 'Record handle, key and open-or-closed door behaviour.',
  'boarding-up': 'Name each damaged opening and authorised contact.',
  'lock-upgrade': 'Document the whole existing door assembly.',
}

interface ServiceFaqCopy {
  question: (areaName: string) => string
  answer: string
}

const SERVICE_FAQS: Record<ServiceAreaSlug, ServiceFaqCopy[]> = {
  'emergency-lockout': [
    {
      question: areaName => `What happens before an emergency locksmith opens a door in ${areaName}?`,
      answer: `The caller's identity, authority, full address and affected entrance are confirmed first. The door set is then inspected, and the proposed work and expected cost are explained before access work begins.`,
    },
    {
      question: areaName => `Will an emergency lockout in ${areaName} automatically require drilling?`,
      answer: `An opening method cannot be selected from the area name or a telephone description alone. Inspect the complete entrance, describe the approach supported by that inspection and provide the expected price before work. If the service-call price changes, obtain agreement before the changed price applies.`,
    },
    {
      question: areaName => `What should I have ready for emergency lockout help in ${areaName}?`,
      answer: `Have the complete address, the precise door and evidence that you may authorise access ready. The likely charge and proposed scope should be discussed before work starts.`,
    },
    {
      question: areaName => `How is the opening method chosen for a lockout in ${areaName}?`,
      answer: `It follows an inspection of the particular lock, door, frame and hinges rather than an assumption about the neighbourhood. The proposed method is explained to the authorised customer before work proceeds.`,
    },
    {
      question: areaName => `Why does an emergency locksmith need the full ${areaName} address?`,
      answer: `The full address identifies the controlled entrance but does not itself prove authority. The caller's connection to the property, the affected door and the observed condition still need to be checked.`,
    },
  ],
  'lock-change': [
    {
      question: areaName => `Does a faulty lock in ${areaName} need repair or replacement?`,
      answer: `That decision depends on the lock's condition, the door, frame, hinges and alignment, and the required outcome. The supported option and expected cost should be explained before work begins.`,
    },
    {
      question: areaName => `What information helps specify a replacement lock in ${areaName}?`,
      answer: `Identify the exact entrance, the reason for the change, who may authorise it and any written insurer or building-management requirement. The final specification must match the inspected door set.`,
    },
    {
      question: areaName => `Can a replacement cylinder be chosen before visiting ${areaName}?`,
      answer: `Photographs can help prepare for inspection, but the cylinder still needs to be matched to the actual door and protective furniture. Size, accreditation, scope and cost are confirmed from that evidence.`,
    },
    {
      question: areaName => `Who can authorise a lock repair or replacement in ${areaName}?`,
      answer: `Identify the person responsible for the particular entrance before a repair or replacement is specified. Record any customer-supplied landlord, manager or other property requirement separately instead of inferring authority from a shared, rented or managed-door description.`,
    },
    {
      question: areaName => `Could a sticking door in ${areaName} need alignment work rather than a new lock?`,
      answer: `A reported symptom does not identify the failed component. The lock, door, frame and hinges should be inspected together before repair or replacement is specified.`,
    },
  ],
  'upvc-lock-repair': [
    {
      question: areaName => `Why does my uPVC door lock work open but not closed in ${areaName}?`,
      answer: `That difference is useful diagnostic information but does not identify the failed part. The mechanism, keeps, alignment, hinges and frame need to be assessed together.`,
    },
    {
      question: areaName => `Does a stiff uPVC door handle in ${areaName} mean the lock needs replacing?`,
      answer: `Handle resistance is a symptom, not a complete diagnosis. Key movement, locking-point behaviour, alignment and operation with the door open and closed should be checked before a repair is specified.`,
    },
    {
      question: areaName => `What photos help with uPVC door lock repair in ${areaName}?`,
      answer: `Where they can be taken safely, images of the affected entrance, door edge, locking points and keeps can help frame the inspection. They do not replace checking the installed assembly.`,
    },
    {
      question: areaName => `Should I lift the handle before locking a uPVC door in ${areaName}?`,
      answer: `Many multipoint doors use a lift-handle-then-turn-key sequence. That operating check cannot diagnose persistent difficulty, which still requires inspection of the complete door set.`,
    },
    {
      question: areaName => `Can a uPVC replacement mechanism be identified from my ${areaName} address?`,
      answer: `No area or planning record identifies the mechanism fitted to an individual door. The exact opening, installed parts and reported handle and key behaviour must be checked directly.`,
    },
  ],
  'boarding-up': [
    {
      question: areaName => `What should I do before emergency boarding up after a break-in in ${areaName}?`,
      answer: `Follow any police instructions and avoid disturbing possible forensic evidence until evidential needs are clear. Then identify every damaged opening and the person authorised to approve temporary securing.`,
    },
    {
      question: areaName => `What details are needed for emergency boarding up in ${areaName}?`,
      answer: `Provide the complete address, each damaged door or window, safe-access information and the authorised contact. The observed construction determines the temporary scope and expected cost.`,
    },
    {
      question: areaName => `How is a damaged opening boarded up in ${areaName}?`,
      answer: `The temporary proposal depends on inspecting the opening, surrounding construction and safe access. Record the authorised property contact, observed damage and proposed temporary extent, then provide the expected price. If the service-call price changes, obtain agreement before the changed price applies.`,
    },
    {
      question: areaName => `Can emergency boarding up begin before police checks in ${areaName}?`,
      answer: `If police issue instructions for a potentially evidential scene, follow them before temporary work. Once those instructions and evidence-preservation needs have been addressed, inspect the damaged opening and describe the proposed temporary measure to the authorised property contact.`,
    },
    {
      question: areaName => `Who can approve boarding up at a shared site in ${areaName}?`,
      answer: `The responsible owner, occupier or site contact for the exact opening must be identified. A nearby public place or planning designation does not establish control of the damaged structure.`,
    },
  ],
  'lock-upgrade': [
    {
      question: areaName => `Which lock upgrade is suitable for a door in ${areaName}?`,
      answer: `The choice follows inspection of the existing door, frame, hinges, lock and protective furniture. Any written insurer, landlord or manager requirement should be checked against that assembly.`,
    },
    {
      question: areaName => `Is an anti-snap cylinder enough to improve door security in ${areaName}?`,
      answer: `A cylinder is one part of the entrance, not a complete security assessment. Its size, accreditation and protection need to be considered with the door, frame, hinges and locking arrangement.`,
    },
    {
      question: areaName => `Do I need BS 3621 or another lock standard in ${areaName}?`,
      answer: `A standard should not be assigned from the area name or assumed insurer wording. Confirm the exact door and obtain any external requirement in writing before specifying compatible hardware.`,
    },
    {
      question: areaName => `Can a door-security upgrade in ${areaName} be planned from photos?`,
      answer: `Photographs can record visible parts and help prepare questions, but they do not establish dimensions, alignment or the complete installed assembly. Final options should follow direct inspection.`,
    },
    {
      question: areaName => `Does a managed or protected property in ${areaName} need approval for a lock upgrade?`,
      answer: `Check the exact property's current listing, conservation, lease or management requirements before altering affected fabric. The authorised customer should approve the compatible specification and expected cost.`,
    },
  ],
}

const AREA_FAQ_VARIANTS: [ServiceFaqCopy, ServiceFaqCopy][] = [
  [
    {
      question: areaName => `Can you identify the lock at my ${areaName} address before a visit?`,
      answer: `An area name cannot identify the fitted lock or the door's condition. Share the complete address and safe photographs if available; the exact entrance and hardware still require direct confirmation.`,
    },
    {
      question: areaName => `What details help you plan locksmith work in ${areaName}?`,
      answer: `Provide the full address, affected entrance, reported problem and the person authorised to instruct work. Include any written landlord, manager or insurer requirement that applies to that specific property.`,
    },
  ],
  [
    {
      question: areaName => `Does my ${areaName} postcode show which door or lock I have?`,
      answer: `No. A postcode or planning designation gives location context, not the construction, mechanism or current condition of an individual entrance. Those details must be established from the door itself.`,
    },
    {
      question: areaName => `Why do you need the exact ${areaName} property and doorway?`,
      answer: `Nearby streets can fall under different boundaries or controls. Identify the precise address, responsible customer and affected opening before an access method, repair, temporary securing measure or alteration is specified.`,
    },
  ],
  [
    {
      question: areaName => `Can local planning records tell you what lock is fitted in ${areaName}?`,
      answer: `Planning and conservation records do not inventory a private door's material, hardware or condition. They can prompt an address-level status check, but the lock decision follows direct evidence from the entrance.`,
    },
    {
      question: areaName => `What should I send before arranging locksmith work in ${areaName}?`,
      answer: `Send the complete address, identify the door, describe the access, damage or locking problem and provide safe photographs where useful. Also confirm who can authorise the requested work.`,
    },
  ],
  [
    {
      question: areaName => `Can a lock or replacement part be chosen from my ${areaName} address?`,
      answer: `The address locates the work but does not specify the installed assembly. Door type, measurements, condition, required outcome and any property controls must be checked before compatible work is proposed.`,
    },
    {
      question: areaName => `What must be confirmed before work at a property in ${areaName}?`,
      answer: `Confirm the full address, exact opening, caller's authority and reported problem. Any listing, conservation, lease, insurer or site-management requirement must relate to that individual property, not the wider locality.`,
    },
  ],
  [
    {
      question: areaName => `Why can't the area guide diagnose my ${areaName} door or lock?`,
      answer: `Its official records describe locality or planning context rather than the physical entrance. Diagnosis requires current information about the actual door, frame, hinges, locking parts and how they behave.`,
    },
    {
      question: areaName => `What helps make a locksmith call in ${areaName} accurate?`,
      answer: `Give the complete address, point out the affected entrance and explain the required outcome. Safe photographs and written property requirements can help, while authority and final scope are confirmed for the specific opening.`,
    },
  ],
]

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
  const faq = SERVICE_FAQS[service][variant % SERVICE_FAQS[service].length]
  return {
    localFactIndexes: context.localFactIndexes,
    heading: `${SERVICE_LABELS[service]} in ${seed.name}`,
    body: [context.local, context.decision],
    checks: [SERVICE_CHECKS[service], ...context.checks],
    faq: {
      q: faq.question(seed.name),
      a: faq.answer,
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
  const areaFaqs = AREA_FAQ_VARIANTS[areaIndex % AREA_FAQ_VARIANTS.length]

  return {
    slug: seed.slug,
    reviewedOn: EVIDENCE_REVIEWED_ON,
    summary: seed.summary,
    accessGuidance: seed.accessGuidance,
    evidenceLimits: seed.evidenceLimits,
    facts: seed.facts,
    factOnlySourceIds: seed.factOnlySourceIds,
    sources: [...seed.sourceIds.map((id) => LOCALITY_SOURCES[id]), ...technicalSources(seed.region)],
    serviceGuidance,
    faqs: [
      {
        q: areaFaqs[0].question(seed.name),
        a: areaFaqs[0].answer,
      },
      {
        q: areaFaqs[1].question(seed.name),
        a: areaFaqs[1].answer,
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
        localFactIndexes: [1, 2],
        local: `The plan's River Leam description can help clarify whether a caller means the north or south side of central Leamington, but it cannot replace a street address, building number and exact doorway. Do not treat the river as evidence of a viable approach route. Use the caller-confirmed river side only to disambiguate the location, then record whether the affected threshold is a street door, common entrance or private unit without inferring an approach from geography.`,
        decision: `Where the supplied landmark falls within one of the mapped conservation character areas, that map still says nothing about occupation or access authority. Verify the requester against the particular premises before deciding how an urgent entry instruction may proceed. Keep proof of connection, the opening assessment and the quoted scope as separate checks: conservation mapping can flag an address question, but cannot establish who may instruct entry or which method the lock permits.`,
        checks: [
          `Record the street, building number and doorway; use a caller-confirmed River Leam side only to disambiguate central location.`,
          `Check the requester against the premises; a conservation character-area match cannot establish occupation or authority.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        local: `Leamington's conservation guide divides the designation into character areas rather than applying one undifferentiated status to the town. For a visible lock change, resolve the address against the current map and then establish any building-specific or management approval. Record whether the proposal remains within existing hardware or changes visible material, because only the inspected door and exact property record can define the next question; the character-area name cannot.`,
        decision: `The neighbourhood plan's made status is planning evidence, not a replacement specification. Inspect the actual entrance and keep the plan, conservation boundary and any separately verified listed status distinct when determining what the observed condition supports. Use observed lock, door, frame and hinge condition to compare repair with a compatible replacement, and refer any external change for address-specific guidance instead of deriving a rule from plan status.`,
        checks: [
          `Resolve the exact address against the current conservation map before planning any visible replacement.`,
          `Inspect the entrance and verify building, management and listed-status controls separately from neighbourhood-plan context.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        local: `Neither the River Leam's north-south division nor the named conservation character areas shows that a Leamington entrance is uPVC or uses multipoint locking. Ask for direct evidence from the affected door instead of translating town geography into a mechanism. Treat the river and character-area references solely as address and status checks; document handle travel, key movement, faceplate details and open-versus-closed behaviour on the individual door before considering a component.`,
        decision: `If the address is described only by a central landmark or river side, first obtain the full postal location and exact opening. Conservation context may affect later visible work, but it cannot diagnose handle, key, alignment or locking-point behaviour. Distinguish observations reproduced at the entrance from symptoms reported by the caller, and keep any later property-status question separate; neither side of town nor a mapped character label narrows multipoint dimensions.`,
        checks: [
          `Collect door material, handle, key and frame symptoms; do not infer a mechanism from river or character-area context.`,
          `Use a central landmark only to resolve the full address, then check conservation permission only for the supported repair.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2],
        local: `A damaged opening in central Leamington needs an exact property reference because the river, town centre and conservation character areas describe overlapping spatial contexts. None identifies the responsible owner, occupier, manager or the construction that requires temporary securing. Where police have issued preservation instructions, follow them before photographing or measuring the individual opening; leave support strength, attachment feasibility and permanent repair for physical inspection rather than inference from town geography.`,
        decision: `Where police have issued an evidence-preservation instruction, follow it before checking whether an external fixing may affect an address inside the current conservation boundary and need property-specific permission. Do not generalise the mapped designation to every property on either side of the River Leam. Record the surface proposed for coverage, damage that remains visible and the person instructing temporary work; the boundary result informs whether address-specific advice is needed, not the opening's condition or a fixing method.`,
        checks: [
          `Identify the property, damaged opening and controller without relying on overlapping river, town-centre or character-area labels.`,
          `Where police issue evidence-preservation instructions, follow them before checking the current boundary and attachment permission.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: `The made neighbourhood plan and conservation guide can identify planning questions for a Leamington address, but neither demonstrates security need or an installed product. An upgrade discussion must begin with the precise doorway and a documented customer or manager objective. Document the door, frame, hinges, existing lock and cylinder fit, then connect each proposed measure to an observed condition while keeping plan extent and river orientation outside the security assessment.`,
        decision: `Where the current boundary check confirms conservation status, establish whether the proposed visible work requires consent; where it does not, do not import that constraint. The River Leam description remains orientation and cannot determine an upgrade standard. Record the mapped result, retained material and any unresolved property requirement beside compatible hardware options; neither plan-making nor a character-area name is evidence that a product is certified for this entrance.`,
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
      `The service area is broader than the guide's New Milverton character-area label. A full address must therefore be checked before using conservation wording, and neither source establishes the building, entrance, hardware, authority or practical access arrangements.`,
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
      {
        text: `The Department for Education records Milverton Primary School as a specific establishment at Greatheed Road, Leamington Spa, CV32 6ES.`,
        sourceIds: ['dfe-milverton-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-leamington-conservation', 'wdc-leamington-plan', 'dfe-milverton-primary'],
    factOnlySourceIds: ['dfe-milverton-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `“Milverton” alone does not say whether the address is inside New Milverton character area 30, on an excluded section of Rugby Road or Warwick New Road, or elsewhere. Record the precise street, number and controlled entrance before considering access. Treat the mapped exclusions as an address check only, and distinguish a private doorway from any shared threshold so the authority evidence and proposed opening relate to the correct part of the building.`,
        decision: `Northumberland Road allotments may confirm a caller's general position, yet the protected site does not establish that a property is adjacent or reachable through it. Verify the actual premises and the requester's connection without using the allotments as an access shortcut. Once the doorway is identified, assess its lock and surrounding door set and explain the intended scope and price from that evidence, without turning site protection into an access method or urgency claim.`,
        checks: [
          `Distinguish New Milverton from the excluded Rugby Road and Warwick New Road sections using the complete address.`,
          `Use the Northumberland Road allotments only for orientation; verify the premises and never assume access through the site.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `The conservation guide's wording is specifically New Milverton and expressly excludes two roads, so a visible replacement must not inherit conservation assumptions from the broader service area. Resolve the supplied address against the current designation before planning alteration. Separate a change confined to measured lock components from work affecting visible door material, and record the exact map result rather than allowing the wider Milverton name to decide either scope.`,
        decision: `Policy protection for the Milverton New Allotments Association site concerns planning context, not the fabric of nearby doors. Specify a change from the inspected entrance and separately obtain any permission that the individual property record requires. The replacement record should name the current lock, door and frame observations, the component proposed and any external work excluded, leaving the allotment reference outside compatibility and approval decisions.`,
        checks: [
          `Check the current New Milverton boundary and both named road exclusions before applying conservation controls.`,
          `Specify the replacement from the inspected entrance; verify address-level permissions separately rather than relying on Northumberland Road allotment policy.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `New Milverton's character-area status does not show whether a reported door is uPVC, composite, timber or fitted with multipoint locking. The Rugby Road and Warwick New Road exclusions reinforce why address-level facts must precede any hardware diagnosis. Ask for a full door-edge image and note key, handle and locking-point behaviour only when safely observable, marking each item as reported or reproduced rather than diagnosing from the mapped area.`,
        decision: `A Northumberland Road reference can locate the conversation but supplies no information about handle travel, key movement, hinges or frame contact. Ask for those door-specific symptoms and keep allotment policy entirely separate from mechanical assessment. Use faceplate markings and measured geometry to narrow any multipoint part after inspection, while a New Milverton boundary result remains relevant only if the supported repair would alter visible external material.`,
        checks: [
          `Confirm the address and door material directly; New Milverton status and road exclusions cannot identify a mechanism.`,
          `Treat Northumberland Road as orientation only and record handle, key, hinge and frame behaviour from the affected door.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `For damaged external fabric, first determine whether the exact Milverton address is actually inside the current New Milverton conservation boundary rather than relying on the locality name. The two named road exclusions must remain visible in that check. Photograph the opening and material likely to be covered without declaring the frame suitable for attachment, and keep evidence preservation, temporary coverage and later reinstatement as separately recorded questions.`,
        decision: `If the report concerns an allotment building or boundary near Northumberland Road, identify the person responsible for that particular asset. The neighbourhood-plan protection does not establish ownership, construction, permission to attach material or safe access. Record who supplied the instruction, the observed dimensions and any condition that could not be checked safely, then refer unresolved glazing, joinery or structural matters rather than using site status to choose a board.`,
        checks: [
          `Resolve the current New Milverton boundary and the two road exclusions for the damaged property's exact address.`,
          `For an allotment asset, identify its controller, inspect the construction, and verify access and attachment permission separately.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `The official evidence distinguishes a bounded New Milverton character area from broader Milverton and records a protected allotment site. Neither fact demonstrates a security deficiency, so any upgrade objective must come from the inspected opening and authorised customer. Record frame, hinges, keeps, lock engagement and cylinder fit where relevant, then rank proposals against those findings instead of treating character-area or allotment protection as evidence of risk.`,
        decision: `Before visible hardware is altered, check whether the address falls within the current designation and what property-specific approval applies. Do not extend conservation controls to excluded roads or convert allotment policy into a product or performance requirement. The written option should state measured dimensions, relevant product evidence, retained hardware and exclusions, allowing the customer to compare compatible work without implying council, manager or insurer endorsement.`,
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
        serviceRelevance: `Use Crown Way only as caller-confirmed orientation; it does not prove a property is nearby or within coverage.`,
      },
      {
        text: `The Department for Education records Lillington Primary School at Cubbington Road, Lillington, Leamington Spa, CV32 7AG.`,
        sourceIds: ['dfe-lillington-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-leamington-conservation', 'wdc-local-plan', 'dfe-lillington-primary'],
    factOnlySourceIds: ['dfe-lillington-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `The official evidence separates Lillington Road North, Lillington Village and the Crown Way local centre. A caller should therefore give the complete address and exact entrance rather than relying on “Lillington” or assuming a landmark identifies the premises. Use the caller's confirmed sub-area only to disambiguate the location, then record the building, floor and affected threshold so identity and authority checks concern the doorway actually requested.`,
        decision: `A Crown Way reference may distinguish part of the locality, but the local-plan label does not show whether an entrance is private, shared or managed. Establish the authorised person for the specified opening independently of the planning designation. Inspect the lock with its door, frame and hinges, describe the opening work supported by that observed condition and advise the expected price. If the service-call price changes, obtain agreement before the changed price applies; the local-centre label supports none of those decisions.`,
        checks: [
          `Use the complete address to distinguish Lillington Road North, Lillington Village, Crown Way and other streets.`,
          `Establish whether the named opening is private, shared or managed and verify its authorised person independently.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `Lillington Road North and Lillington Village are separately named conservation character areas, not proof that every Lillington property is designated. Check the latest boundary for the exact address before deciding whether a visible replacement raises a heritage question. Document whether the proposed change is confined to existing hardware or affects outward material, so the mapped result informs only the relevant property question and never the replacement specification.`,
        decision: `The Crown Way local-centre entry describes planning geography rather than a door set or responsible manager. Inspect the actual opening and obtain the building-specific authority and any necessary approval before a component is selected or changed. Record door and frame condition, readable markings, dimensions, keys and adjustment separately, preventing a planning label from being presented as proof that one product or complete replacement is required.`,
        checks: [
          `Check the latest boundary to determine whether Lillington Road North, Lillington Village or neither designation applies.`,
          `Inspect the opening and obtain building-specific authority; Crown Way's planning label cannot specify hardware or a manager.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither the two conservation character labels nor Crown Way's local-centre status identifies door material or a multipoint mechanism. A Lillington repair report must describe the actual handle, key, frame interaction and affected entrance from direct observation. Photograph the complete faceplate and record open-versus-closed behaviour only where safe, keeping the operating sequence as evidence for inspection rather than proof of alignment or component failure.`,
        decision: `If the caller uses Lillington Village as orientation, preserve the distinction between locality and designation; the map cannot diagnose hardware. Check whether the symptom changes with the door open and base repair decisions on that entrance. Confirm backset, centres and locking layout before naming a compatible multipoint part, and consult the exact property record separately only if the supported work would affect visible material.`,
        checks: [
          `Record the exact entrance, door material and handle, key and frame interaction rather than inferring from local labels.`,
          `If Lillington Village is used for orientation, verify the boundary separately and test whether symptoms change with the door open.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged opening described only as Lillington could lie inside or outside either named character area, or relate to a property around Crown Way. Establish the exact property and responsible party before any temporary external measure is specified. Photograph the damaged pane, panel, frame or door and identify what will be covered, while leaving hidden condition and attachment suitability unconfirmed until the individual opening can be inspected.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before checking whether a mapped conservation context raises an address-specific permission question. Do not assume the designation from a village label, and do not treat the local shopping-centre record as ownership or access authority. The handover should record observed opening measurements, intended temporary material, proposed attachment positions and unresolved permanent work, separating current boundary evidence from the physical decision about the opening.`,
        checks: [
          `Locate the damaged property against both named character areas and Crown Way before defining a temporary external measure.`,
          `Where police issue evidence-preservation instructions, follow them before verifying address-specific permission and ownership.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Lillington's official character areas and local centre can prompt location and permission questions, but they cannot demonstrate current security hardware or need. Start an upgrade with the exact entrance, observed assembly and a documented requirement from its authorised controller. Inspect frame support, hinges, keeps, handle protection, lock engagement and cylinder projection where present, linking each proposed measure to a recorded weakness rather than the neighbourhood name.`,
        decision: `Confirm whether the property is within Lillington Road North, Lillington Village or neither before applying conservation considerations. Crown Way's planning status is not a security standard, so product choices must remain evidence-led and address-specific. State measured dimensions, product markings, retained parts and excluded door work in the proposal, with any visible alteration held to the property-specific route supported by the current map result.`,
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
    evidenceLimits: `Local-centre and manufacturing-location descriptions are planning context only. They do not prove property use at an individual address, ownership, access rights, operating hours, door type, lock mechanism, security need, service coverage or response time.`,
    facts: [
      {
        text: `Royal Leamington Spa Neighbourhood Plan Policy RLS19 identifies Sydenham Drive as one of the plan's local shopping centres.`,
        sourceIds: ['wdc-leamington-plan'],
        serviceRelevance: `Use the named road only to clarify the address, never to infer a commercial property, nearby location or access route.`,
      },
      {
        text: `The neighbourhood plan's spatial portrait names Sydenham Industrial Estate as one of Royal Leamington Spa's manufacturing locations.`,
        sourceIds: ['wdc-leamington-plan'],
        serviceRelevance: `For a named unit, identify the responsible site contact and entrance; the estate label does not prove authority.`,
      },
      {
        text: `The Department for Education records Sydenham Primary School at Calder Walk, Sydenham, Leamington Spa, CV31 1SA.`,
        sourceIds: ['dfe-sydenham-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-leamington-plan', 'dfe-sydenham-primary'],
    factOnlySourceIds: ['dfe-sydenham-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Sydenham Drive local centre and Sydenham Industrial Estate are different official references, so “Sydenham” does not identify the controlled doorway. Obtain the street or unit, building identifier and exact entrance before accepting an urgent access instruction. Record whether the caller means a unit door, common site entrance or private home, because the two plan references can disambiguate place but cannot establish the threshold or the person using it.`,
        decision: `If the call concerns the industrial estate, establish the authorised business or site contact; if it concerns Sydenham Drive, do not infer that the property is commercial from the local-centre designation. In both cases, verify authority at the address. Inspect the named opening with its frame and hinges, then explain the supported access scope and expected charge without allowing a manufacturing or shopping-centre label to imply an opening method.`,
        checks: [
          `Distinguish a Sydenham Drive address from an industrial-estate unit and record the building and exact entrance.`,
          `Verify the authorised business, site or property contact without inferring commercial use from the local-centre label.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `A lock-change request on Sydenham Industrial Estate should identify the individual unit, entrance and manager able to approve work. The plan's manufacturing-location description does not establish current occupation, shared-door responsibilities or a technical specification. Separate hardware controlled by one unit from any estate-wide or communal system, and record the requested key-control or repair outcome before considering a component for that precise door.`,
        decision: `For Sydenham Drive or another street, inspect the particular door rather than applying assumptions from a local shopping-centre label. Any landlord, freeholder or facilities requirement must be obtained directly and matched to the observed opening. The written proposal should identify retained parts, measured replacement, keys, adjustment and excluded shared work, so the land-use description never substitutes for compatibility evidence or approval.`,
        checks: [
          `For the industrial estate, name the unit, entrance and current manager and resolve any shared-door responsibility.`,
          `For Sydenham Drive or elsewhere, inspect the opening and match direct landlord or facilities requirements to it.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `The plan's descriptions of Sydenham Drive and the industrial estate do not show that any entrance uses uPVC, composite construction or multipoint locking. Ask for door-specific symptoms and photographs, with the exact unit or property clearly identified. Record key movement, handle travel and locking-point action in order, noting whether each observation was reproduced with the door open or closed rather than assigning a fault from the site name.`,
        decision: `A manufacturing-location label can help distinguish a site but cannot diagnose a mechanism or identify who may approve repair. Check the handle, key, frame and locking points at the named opening, then confirm the responsible decision-maker. Use readable faceplate information, centres, backset and locking layout to narrow compatibility only after inspection, and keep any common-site access requirement separate from the unit's own repair.`,
        checks: [
          `Identify the exact unit or property and collect door photographs plus handle, key, frame and locking-point symptoms.`,
          `Confirm the responsible decision-maker at the named opening; the manufacturing label cannot diagnose or authorise repair.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `Temporary securing on the industrial estate requires the exact unit and authorised site contact; near Sydenham Drive it requires the precise property, not the local-centre label. The plan does not identify ownership, boundary responsibility or damaged construction. Photograph the particular pane, panel, door or frame and record what is visible without treating a commercial land-use description as evidence that the surrounding material will support an attachment.`,
        decision: `Separate public-facing, staff, shared and private entrances at the supplied address before defining the affected opening. Where police have issued evidence-preservation instructions, follow them before obtaining the relevant owner or manager's approval; Sydenham's land-use description supplies no permission. Record observed opening measurements, intended coverage, proposed attachment positions and unresolved glazing, door or frame work, keeping temporary access reduction distinct from reinstatement or any claim about hidden condition.`,
        checks: [
          `Name the exact unit or property, damaged construction and authorised site contact rather than relying on a land-use label.`,
          `Distinguish public-facing, staff, shared and private openings, preserve evidence and obtain the relevant controller's approval.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Manufacturing and local-shopping-centre descriptions do not establish risk, existing hardware or a required standard at a Sydenham address. Ask the authorised occupier or manager for a written objective and inspect the individual entrance before comparing upgrades. Record frame condition, hinges, keeps, handle protection, lock engagement and cylinder fit where applicable, connecting each option to one observed issue rather than the plan's description of surrounding use.`,
        decision: `Where a unit shares an estate entrance, distinguish responsibility for that opening from the unit's own doors; where an address is on Sydenham Drive, avoid assuming business use. Match any approved requirement to the actual assembly. State product markings, measured dimensions, retained hardware and excluded communal work in the specification, and leave any unverified management or insurer condition explicitly unresolved rather than presenting it as a locality rule.`,
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
      {
        text: `The Department for Education records Whitnash Primary School at Langley Road, Whitnash, Leamington Spa, CV31 2EX.`,
        sourceIds: ['dfe-whitnash-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-whitnash-plan-page', 'wdc-local-plan', 'dfe-whitnash-primary'],
    factOnlySourceIds: ['dfe-whitnash-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `The plan applies at neighbourhood scale, while Church Green and Chapel Green are separate conservation designations. Neither tells which Whitnash entrance is involved, so the request needs a complete address, building identifier and exact controlled doorway. Treat the Green name as caller-supplied orientation only, then distinguish any street entrance, shared access and private unit so the verification applies to the opening actually requested.`,
        decision: `A caller's use of either Green name may orient the address but cannot prove residence, occupation or permission. Verify the requester for the stated property, keeping conservation status separate from the authority needed for urgent access. Assess the actual lock, door, frame and hinges before describing an opening approach, and explain any change in work or price without deriving it from plan status or conservation geography.`,
        checks: [
          `Record the complete address, building and doorway and identify whether Church Green, Chapel Green or neither is relevant.`,
          `Use either Green only for orientation and verify the requester's authority against the stated property.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `Whitnash has two separately listed conservation areas rather than one status applying throughout the town. Check whether the exact address is in Church Green, Chapel Green or outside both before a visible replacement is planned. Record whether the proposed work stays within existing cut-outs and hardware or changes external material, preventing either Green name from becoming an automatic heritage or replacement instruction.`,
        decision: `The neighbourhood plan's legal force does not select hardware or authorise alteration. Inspect the door set and obtain the responsible customer's approval, plus any address-specific conservation or management consent the proposal actually engages; consider listed-building consent only where the proposed alteration would affect special character. Identify the failed or compromised component, what remains serviceable, measured compatibility and the keys or adjustment included, keeping property controls as a separate documented branch of the decision.`,
        checks: [
          `Map the exact address to Church Green, Chapel Green or neither before planning a visible replacement.`,
          `Inspect the door and obtain only the conservation, listed-building or management permission the proposal actually engages.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither Whitnash's made-plan status nor the names Church Green and Chapel Green demonstrate uPVC construction or a multipoint mechanism. The affected door, handle action, key movement and behaviour against the frame must be documented directly. Capture the faceplate and locking layout and label open-versus-closed behaviour as an observation for inspection, stopping before resistance turns the original symptom into additional damage.`,
        decision: `Conservation boundaries may become relevant to visible remedial work, but they cannot diagnose the reported fault. First identify the entrance and mechanism; then check any property-specific permission only if the supported repair would affect controlled fabric. Confirm centres, backset and readable codes before proposing a multipoint component, while cylinder dimensions and any frame adjustment remain separate measured items. Note which visible code supports the shortlist.`,
        checks: [
          `Document the affected door, handle action, key movement and frame behaviour without inferring hardware from area status.`,
          `Identify the mechanism first, then check property permission only if the supported repair affects controlled fabric.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1],
        local: `A damaged opening in Whitnash must be placed accurately because the two conservation areas have separate boundaries and neither covers every address. Confirm the property, scene status and responsible person before planning a temporary external attachment. Record the exposed opening, surrounding damage and material likely to be covered, but leave structural condition and attachment suitability for inspection rather than inferring either from conservation status.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before checking whether current mapping of the opening within Church Green or Chapel Green raises an address-specific approval question. Do not infer listed status or protected fabric from the conservation-area name alone. The temporary-work record should list observed opening measurements, intended coverage, proposed attachment positions, compromised hardware and permanent repair still required, distinguishing mapped context from the physical facts found at that specific opening.`,
        checks: [
          `Locate the damaged property against both separate conservation boundaries and record the scene and responsible person.`,
          `Where police issue evidence-preservation instructions, follow them before verifying address-specific approval and property status.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `The Whitnash plan and conservation table support planning questions, not a claim that an address needs upgraded security. Establish the authorised customer's actual objective and inspect the door rather than assigning a product from either designation. Document the complete entrance, including frame, hinges, keeps, handles, lock engagement and cylinder projection where present, then relate each recommendation to an observed weakness.`,
        decision: `Use the full address to determine whether Church Green, Chapel Green or no cited conservation context applies. Any resulting permission check is separate from selecting compatible hardware against the existing frame, hinges and lock. Present measurements, product evidence, retained components and excluded door work in writing, so neither plan status nor conservation mapping is confused with tested performance or policy acceptance.`,
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
      {
        text: `The Department for Education records Heathcote Primary School at Vickers Way, Heathcote, Warwick, CV34 7AP.`,
        sourceIds: ['dfe-heathcote-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-monitoring-report-2024-25', 'wdc-tachbrook-park', 'dfe-heathcote-primary'],
    factOnlySourceIds: ['dfe-heathcote-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `A Heathcote request may refer to a building at Lower Heathcote Local Centre, another private address or a managed park asset. The dated monitoring record and planned play-area reference cannot identify which, so name the property and doorway. Recheck the current building or facility only to resolve the location, then record the exact threshold and caller's connection without converting development status into evidence of occupation or access.`,
        decision: `For a nursery, care home, retail unit or park facility, establish the authorised organisational contact rather than assuming the caller controls access. Preserve “planned” for Play Area 2 and do not treat a 2024-25 completion snapshot as current authority. After verifying the instruction, assess the lock with the particular door, frame and hinges and explain the supported entry scope and price from those observations.`,
        checks: [
          `Name the property and doorway and distinguish Lower Heathcote Local Centre, a private address and any park asset.`,
          `Verify the current organisational controller and recheck facility status; dated completion and planned records cannot confer authority.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `The monitoring report lists different completion states within Lower Heathcote Local Centre, but none identifies a door or current occupier. A change request must specify the actual unit or building and the manager entitled to approve replacement. Record why the lock is changing, which threshold it controls and whether any shared system is excluded, then inspect the door set before a product or keying scope is proposed.`,
        decision: `If the location is associated with Tachbrook Country Park, verify whether the referenced facility now exists and which body controls it. The planned status supplies no hardware specification, construction detail or permission to alter an entrance. A defensible schedule names the observed component, measurements, retained hardware and written instruction, keeping the dated project record outside both mechanical compatibility and approval.`,
        checks: [
          `Identify the current unit or building, its entrance and the manager entitled to approve replacement.`,
          `For a Tachbrook Country Park facility, verify present existence and controller before assessing its actual door.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Completed retail, nursery and care-home elements in a dated report do not establish that any Heathcote entrance is uPVC or multipoint. Obtain direct photographs and operating symptoms from the named building rather than inferring hardware from development status. Record how the key, handle and locking points behave and whether safe open-door operation differs, treating the sequence as an inspection brief rather than a remote diagnosis.`,
        decision: `A planned play area on the Heathcote side of Tachbrook Country Park is likewise not door evidence. Recheck whether the facility exists, identify the controlled opening and assess its actual handle, key, frame and locking points. Use faceplate information, centres, backset and locking layout to narrow compatibility, and document the responsible building contact separately from the component evidence.`,
        checks: [
          `Collect photographs and operating symptoms from the named building; dated development status cannot identify its hardware.`,
          `For a park facility, confirm it now exists and assess the controlled opening's handle, key, frame and locking points.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `For damage at Lower Heathcote Local Centre, identify the exact unit and authorised facilities contact because the monitoring report covers several uses and dates. For a park asset, confirm current facility status and the responsible public manager. Photograph each affected opening and the material likely to be covered, noting any unsafe or hidden condition without assuming that a completed-use label or planned facility supplies structural evidence.`,
        decision: `Neither the local-centre snapshot nor planned Play Area 2 defines the damaged opening, boundary or safe access. Where police have issued forensic-preservation instructions, follow them before inspecting the opening and obtaining its controller's approval for a proposed temporary measure. Record observed opening measurements, intended coverage, proposed attachment locations, compromised locks and outstanding glazing, door or frame work so the dated development evidence remains only a location check; leave attachment suitability to inspection.`,
        checks: [
          `Identify the exact local-centre unit or current park asset and its authorised facilities contact or public-space manager.`,
          `Where police issue forensic-preservation instructions, follow them before inspecting the damaged opening and seeking its controller's approval.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Development completion status at Lower Heathcote Local Centre is not a security standard. A nursery, care home, retail unit, office or unrelated address may have different responsible parties, so obtain the exact entrance and a written requirement. Inspect door and frame condition, hinges, keeps, handles, lock engagement and cylinder fit, linking any proposed improvement to what is measured rather than to reported site use.`,
        decision: `Do not turn the park's planned facility into evidence of current buildings or risk. If a managed asset is genuinely involved, verify its present status and manager; otherwise base the upgrade only on the observed private entrance and authorised objective. State the selected product evidence, dimensions, retained items and exclusions, leaving unverified management or property conditions as explicit dependencies instead of inferred requirements.`,
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
    accessGuidance: `Require the complete Warwick address and distinguish a named conservation character section from the wider urban area. For a park, castle-related, institutional, commercial or shared property, identify the responsible controller and exact entrance separately.`,
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
      {
        text: `The Department for Education records Coten End Primary School at Coten End, Warwick, CV34 4NP.`,
        sourceIds: ['dfe-coten-end-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-warwick-conservation', 'wdc-local-plan', 'dfe-coten-end-primary'],
    factOnlySourceIds: ['dfe-coten-end-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `“Warwick” spans an adopted Urban Area and fifteen named conservation character sections, so a castle, park or street reference is insufficient. Obtain the full property address and controlled doorway rather than treating a character-area name as an entrance instruction. Record the building, entrance position and any shared threshold before verifying the caller, using a named section solely to distinguish locations and never to infer a route or entitlement.`,
        decision: `Where the caller mentions Castle Park, Priory Park or St Nicholas Park, determine whether the request concerns a managed public asset or a separate nearby building. The conservation map provides orientation but cannot establish the requester's authority. Once the correct opening and instruction are confirmed, inspect the lock with the door, frame and hinges and explain the proposed access scope and price from that evidence.`,
        checks: [
          `Record the full property address and doorway rather than using an Urban Area or character-section label as an instruction.`,
          `Distinguish a managed park asset from a nearby building and verify the requester's authority at the actual premises.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `The conservation guide divides Warwick into fifteen character sections, and that map must be checked at the specific address before visible replacement work. A town-wide Urban Area classification neither confirms designation nor identifies the existing lock. Define whether the change remains within current hardware or affects outward material, then record the exact boundary result without extending one character section's context across the town.`,
        decision: `For an entrance associated with a park, castle setting, institution or business, obtain the relevant owner or manager approval. Inspect the individual door and keep planning status, listed status and technical specification as separate evidence questions. The schedule should identify the observed fault or key-control objective, retained components, measured replacement, keys and adjustment, with unresolved property requirements stated outside the mechanical proposal.`,
        checks: [
          `Resolve the address against the relevant current character section before planning a visible replacement.`,
          `For a park, castle setting, institution or business, inspect the door and obtain its responsible controller's approval.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Warwick's Urban Area classification and conservation character names do not show whether a reported entrance is uPVC, composite, timber or multipoint. Ask for direct door photographs and exact handle, key and frame symptoms. Record the operating sequence and any safe difference between open and closed behaviour as observations for inspection, not as proof that alignment, cylinder or mechanism is responsible.`,
        decision: `A reference such as Coten End, West Street or Castle Park may narrow location but cannot diagnose hardware or current property use. Confirm the building and opening first, then assess the actual assembly without importing historic character. Use full faceplate details, centres, backset and locking layout to support compatibility, while a character-section check is reserved for visible property work rather than component identification.`,
        checks: [
          `Obtain door photographs and exact handle, key and frame symptoms; planning classifications cannot identify the mechanism.`,
          `Use Coten End, West Street or Castle Park only to clarify location, then assess the named opening directly.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged opening near a named Warwick park or castle character section must be tied to the exact property and responsible controller. The conservation guide does not establish whether the affected asset is public, private, listed or even within the boundary. Photograph the opening and material that may be covered, recording visible frame or lock damage while leaving ownership, hidden condition and attachment suitability to property-specific verification and inspection.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before checking address-level status and any property-specific permission for a proposed external attachment that may affect protected fabric. The Urban Area label supplies neither structural details, attachment suitability nor approval for the work. Record observed opening measurements, intended temporary material, proposed attachment positions and defects left for glazing, joinery or door repair, keeping the map result separate from the physical basis of the temporary scope.`,
        checks: [
          `Tie the damaged opening to its exact property and controller and establish whether the asset is public or private.`,
          `Where police issue evidence-preservation instructions, follow them before checking current status and attachment permission.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Neither Warwick's Urban Area status nor the conservation guide demonstrates that a particular entrance needs an upgrade. Establish the authorised objective and inspect the existing assembly, using a character section only to prompt an exact property-status check. Record the frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable, then attach each option to a measured issue rather than the status of the surrounding townscape.`,
        decision: `Where current mapping confirms conservation context, decide separately whether visible hardware change needs approval; listed status requires its own verification. For managed parks, institutional premises or businesses, obtain the responsible body's written specification rather than assuming one. The proposal should state compatible product evidence, dimensions, retained hardware and exclusions so management, planning and technical decisions remain attributable to their own records.`,
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
      `Those planning and park references help distinguish parts of Woodloes Park but do not locate a private address or grant access through public land. They establish no property use, authority, door construction, lock type or condition.`,
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
      {
        text: `The Department for Education records Woodloes Primary School at Deansway, Woodloes Park Estate, Warwick, CV34 5DF.`,
        sourceIds: ['dfe-woodloes-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-local-plan', 'wdc-community-parks', 'dfe-woodloes-primary'],
    factOnlySourceIds: ['dfe-woodloes-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Reardon Court and Canalside are different official Woodloes references, while the park record lists several public access points. A lockout still needs a complete street address and exact doorway; no park access point should be assumed to reach it. Record whether the affected opening belongs to a private property, commercial unit or managed park asset, using the named access points only to reject route assumptions and clarify the caller's description.`,
        decision: `If the request concerns Canalside or another managed public asset, identify the council or responsible contact. If it concerns a property near Reardon Court, the local-centre label does not establish occupation or the caller's authority. Verify the instruction for the named threshold, inspect its lock and surrounding door set, describe the access work supported by those observations and advise the expected price. If the service-call price changes, obtain agreement before the changed price applies; public-site familiarity supplies no substitute.`,
        checks: [
          `Record the complete street address and doorway and do not treat a named Canalside access point as a property route.`,
          `Identify the manager for a public asset or verify the caller at a Reardon Court-area property independently.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `A Reardon Court local-centre entry does not identify the door, unit or current use at a Woodloes address. Name the particular property and inspect its entrance rather than using the planning label as a replacement specification. Define the reason for change and whether a private or shared system is involved, then record door, frame, lock and cylinder evidence before comparing repair with replacement.`,
        decision: `For a park asset at Canalside, public access from Coventry Road, Greenway, Deansway, Scar Bank or Lock Lane does not authorise alterations. Establish the responsible manager and the exact controlled opening before any change. State the retained hardware, compatible component, key quantity, adjustment and exclusions in writing, leaving the access-point list outside product choice and authority. Record who supplied that authority.`,
        checks: [
          `Name the Reardon Court-area property and inspect its entrance without inferring unit use from the planning label.`,
          `For Canalside, identify the controlled opening and responsible manager; public access points cannot authorise alteration.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither Reardon Court's local-centre status nor Canalside's play, games and woodland description establishes uPVC or multipoint hardware. Record the affected Woodloes doorway and operating symptoms directly, even if a park entrance helps orient the caller. Photograph the full faceplate and note key, handle and locking-point movement in sequence, labelling any open-door comparison as observed evidence rather than a diagnosis.`,
        decision: `The council's named Canalside access points relate to public park entry, not a property's door alignment or locking strip. Do not use them as a route promise or mechanism clue; inspect the actual frame, hinges and lock. Confirm centres, backset, strip layout and readable codes before proposing a part, and establish separately whether the named opening is privately or publicly controlled.`,
        checks: [
          `Record the affected Woodloes doorway and its operating symptoms without inferring hardware from Reardon Court or Canalside.`,
          `Use a park entrance only for orientation and inspect the actual frame, hinges and lock at the named property.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A board-up described as Woodloes Park must distinguish a private opening from Canalside park infrastructure and identify the responsible person for that asset. Reardon Court's planning label likewise does not establish ownership or boundary responsibility. Record photographs, opening dimensions and visible surrounding damage without assuming that public-park access information describes the construction or a suitable temporary attachment.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before inspecting the opening and proposing temporary coverage within the verified property permissions. Public access points in the community-parks record do not guarantee vehicle access, attachment rights or a route to the damage. The handover should identify intended coverage, proposed attachment positions, affected locks and permanent work outstanding, with any unsafe or hidden condition left explicitly for the appropriate follow-on inspection.`,
        checks: [
          `Distinguish a private opening from Canalside infrastructure and identify the responsible controller for the actual asset.`,
          `Where police issue evidence-preservation instructions, follow them before recording observed material and proposed attachment locations.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Local shopping-centre and community-park records are not security standards for Woodloes Park. An upgrade requires the exact entrance, existing assembly and a documented objective from its authorised owner, occupier or manager. Inspect the frame, hinges, keeps, handles, lock engagement and cylinder projection where present, connecting any proposal to those observations instead of the nearby centre or park.`,
        decision: `If the opening belongs to Canalside, obtain the public asset manager's specification; if it is near Reardon Court, verify the individual property rather than inferring business use. Named access points cannot determine compatible hardware. Record product markings, dimensions, retained parts and excluded site work, and keep any current insurer or management condition distinct from the evidence supporting the chosen component. Identify who supplied each constraint.`,
        checks: [
          `Document the exact entrance, existing assembly and authorised objective instead of relying on local-centre or park records.`,
          `Obtain a Canalside manager's specification or verify the individual Reardon Court-area property without inferring business use.`,
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
    evidenceLimits: `The local-centre and community-parks records are not property surveys or service boundaries. They cannot establish property type, authority, route, parking, door material, lock mechanism, damage, demand, response time, coverage or previous locksmith activity.`,
    facts: [
      {
        text: `The adopted Warwick District Local Plan lists Narrow Hall Meadow, Chase Meadow, Warwick, as a local shopping centre.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Use Narrow Hall Meadow only to confirm location; its planning status does not establish a property or service fact.`,
      },
      {
        text: `Warwick District Council lists both Hickmans Green and The Marrish under Warwick south-west and identifies each as being in Chase Meadow.`,
        sourceIds: ['wdc-community-parks'],
        serviceRelevance: `Distinguish managed community-space assets from private addresses and establish the responsible party for the exact opening.`,
      },
      {
        text: `Warwick District Council reported on 9 July 2025 that solar panels had been installed on Chase Meadow Community Centre in Warwick.`,
        sourceIds: ['wdc-chase-meadow-centre-solar'],
        serviceRelevance: `This is evidence about one named community-centre building only, not surrounding properties, their access, hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-local-plan', 'wdc-community-parks', 'wdc-chase-meadow-centre-solar'],
    factOnlySourceIds: ['wdc-chase-meadow-centre-solar'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Narrow Hall Meadow, Hickmans Green and The Marrish are three separate official Chase Meadow references, none of which identifies a doorway. Record the complete address and state whether the request concerns a private property or managed community-space asset. Name the exact threshold and any shared access before considering entry, using a park reference only to distinguish the reported place rather than to infer proximity or control.`,
        decision: `A park name may orient the caller but cannot prove an access route or authority. For Hickmans Green or The Marrish, identify the responsible manager; for another address, verify the requester's connection to that specific property. Assess the confirmed door, frame, hinges and lock and explain the supported scope and expected charge from that inspection, not from the familiarity of a community-space name.`,
        checks: [
          `Distinguish Narrow Hall Meadow, Hickmans Green and The Marrish and name the complete address and doorway.`,
          `Identify the manager for a community-space asset or verify the requester against the specific private property.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `The local-plan entry for Narrow Hall Meadow does not establish current use, unit identity or installed hardware. A change request must name the building and entrance, with any landlord or manager requirement obtained directly. Record the reason for replacement, current lock and surrounding door condition, distinguishing private hardware from any shared entrance before the inspection is used to define what remains and what may change.`,
        decision: `Hickmans Green and The Marrish are council-listed community spaces, not evidence about doors in surrounding streets. If a managed asset is involved, confirm its controller; otherwise keep the park reference outside the replacement specification. The quote should identify the measured component, keys, fitting, adjustment and excluded door or common-system work so locality evidence cannot be mistaken for a product requirement.`,
        checks: [
          `Name the Narrow Hall Meadow building and entrance and obtain any landlord or manager requirement directly.`,
          `For Hickmans Green or The Marrish, verify the asset controller; otherwise exclude park context from the specification.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Nothing in the Narrow Hall Meadow or community-parks records shows that a Chase Meadow entrance is uPVC or multipoint. Ask for the exact door, its open-or-closed state and handle, key and frame behaviour instead. Record locking-point movement and faceplate markings only where safely visible, preserving the difference between a reported symptom and a fault reproduced during inspection.`,
        decision: `Hickmans Green and The Marrish may distinguish location but cannot diagnose a mechanism or justify a part choice. If the call concerns infrastructure on either space, identify the manager and assess the actual opening independently. Use centres, backset and locking layout to narrow a compatible mechanism after inspection, and keep park responsibility separate from cylinder or multipoint measurements. Record which measurement supports the selected shortlist.`,
        checks: [
          `Record the exact door's open-or-closed state and handle, key and frame behaviour without inferring its mechanism.`,
          `Use community-space names only for location; for their infrastructure, identify the manager and assess the opening directly.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged opening near Hickmans Green, The Marrish or Narrow Hall Meadow must be tied to a named property and responsible controller. The official records do not show ownership boundaries, safe access, dimensions or construction. Photograph and measure the specific opening, noting exposed edges and visible frame damage without declaring hidden material sound or an attachment method suitable from the community-space record.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before inspecting the actual door or window and documenting a temporary proposal. Do not treat a community-space name as permission to cross land, attach material or act for a neighbouring Chase Meadow property. Record intended temporary coverage, proposed attachment positions, compromised lock and permanent repair questions for the responsible contact, clearly separating access reduction from restoration and leaving attachment suitability to direct inspection.`,
        checks: [
          `Tie the damaged opening to a named property and controller, verify its boundaries, and inspect its dimensions and construction.`,
          `Preserve evidence and obtain explicit access and attachment permission rather than relying on a community-space name.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Chase Meadow's local-centre and community-space entries cannot establish a need for security improvement or a fitted standard. Begin with the individual entrance and written objective, distinguishing managed public assets from private premises. Document frame and hinge condition, keeps, handle protection, lock engagement and cylinder fit where relevant, then relate each proposed item to one observed weakness.`,
        decision: `For Narrow Hall Meadow, identify the specific property and any responsible manager; for Hickmans Green or The Marrish, obtain the asset controller's requirement. In every case, select options from the inspected door rather than nearby land-use labels. State dimensions, relevant product evidence, retained hardware and exclusions in writing so a community-space designation never becomes implied approval, certification or insurer acceptance. Identify the source of every stated constraint.`,
        checks: [
          `Start with the individual entrance and written objective, distinguishing managed community assets from private premises.`,
          `Obtain the relevant property or asset controller's requirement and select options only from the inspected door.`,
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
    evidenceLimits: `Council park access information and a local-centre designation cannot identify private entrances or controlled routes. They do not prove property type, parking, property rights, hardware, damage, security need, locksmith demand, availability or response time.`,
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
      {
        text: `Warwick District Council's facilities directory contains a specific record for Warwick Gates Community Centre.`,
        sourceIds: ['wdc-warwick-gates-community-centre'],
        serviceRelevance: `This identifies one managed facility only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-local-plan', 'wdc-community-parks', 'wdc-warwick-gates-community-centre'],
    factOnlySourceIds: ['wdc-warwick-gates-community-centre'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Othello Avenue, Cordelia Green and Othello Park are distinct Warwick Gates references. Give the full property address and exact doorway; Ophelia Drive, Plantagenet Park, Lady Grey Avenue or a cycleway access point cannot substitute for it. Record whether the caller is outside a private entrance, shared building door or public asset, using each named place only to disambiguate the reported threshold.`,
        decision: `If the opening belongs to a park asset, identify the council or responsible manager. If it belongs to a home or business near one of those spaces, the public access description does not establish the caller's authority or a suitable route. Verify the instruction for the exact opening, then inspect the door, frame, hinges and lock and explain the supported access scope and price from what is found.`,
        checks: [
          `Give the full address and doorway instead of substituting Othello Avenue, Cordelia Green, Othello Park or a public access point.`,
          `Identify the park manager or verify the caller at the nearby property without assuming a route from access records.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `Othello Avenue's local-centre designation does not tell which unit or door is involved or what hardware it carries. Obtain the exact property, authorised decision-maker and any landlord or site requirement before specifying replacement. Define the reason for change, existing key-control arrangement and whether common hardware is excluded, then record the current door set instead of assigning a component from local-centre status.`,
        decision: `Cordelia Green and Othello Park access points are for public-space orientation, not permission to alter an asset. A managed park opening needs its controller's approval; a nearby private entrance must remain separate from the park record. List retained hardware, measured replacement, keys, fitting and adjustment in the proposed scope, leaving road and cycleway references outside compatibility and authority. Name the approving party in the record.`,
        checks: [
          `Identify the exact Othello Avenue property, entrance, decision-maker and any direct landlord or site requirement.`,
          `For Cordelia Green or Othello Park, obtain the asset controller's approval; keep nearby private doors separate.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither the Othello Avenue planning entry nor the park access list indicates uPVC construction or multipoint locking at a Warwick Gates address. Identify the actual door and record its handle, key and frame behaviour directly. Photograph the complete faceplate and note locking-point movement and any safe open-versus-closed difference as evidence to reproduce, not a remote assignment of fault.`,
        decision: `A caller mentioning Cordelia Green or Othello Park may be orienting the address, not describing the property. Do not use road or cycleway access points as mechanical clues or route commitments; assess the stated entrance only. Confirm faceplate details, centres, backset and locking layout before identifying a compatible part, and establish the controller of any shared or public opening separately. Record which markings support the shortlist.`,
        checks: [
          `Identify the actual door and record handle, key and frame behaviour rather than inferring hardware from planning records.`,
          `Treat Cordelia Green, Othello Park and access points only as orientation and assess the stated entrance itself.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1],
        local: `A damaged opening around Warwick Gates needs precise ownership and property identification because public green spaces and private addresses can share nearby names. The community-parks record supplies no construction, boundary responsibility or authorisation. Photograph the individual opening, visible frame damage and material likely to be covered, leaving hidden condition and attachment suitability for inspection rather than inference from the green-space record.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before inspecting the actual door or window and recording the proposed temporary extent for its controller. Do not interpret public access from named roads or cycleways as permission to reach or secure private property. The handover should show observed opening measurements, intended coverage, proposed attachment positions and permanent repair outstanding, keeping temporary security distinct from restoration, attachment suitability or a claim of structural soundness.`,
        checks: [
          `Establish the precise property, ownership and damaged opening where public spaces and private addresses share nearby names.`,
          `Where police issue evidence-preservation instructions, follow them before inspecting the opening and confirming attachment authority.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `A local shopping-centre designation and public park-access list are not evidence that a Warwick Gates entrance needs an upgrade. Obtain the exact opening, current assembly and a written requirement from the authorised property or site controller. Record frame condition, hinges, keeps, handles, lock engagement and cylinder fit where applicable, connecting each recommendation to a measured issue rather than nearby place names.`,
        decision: `For a park asset, follow the responsible manager's approved specification; for a property on Othello Avenue or elsewhere, inspect that door without importing park information. Public route descriptions cannot select a cylinder, lock or security standard. State product evidence, dimensions, retained components and exclusions, allowing any management or insurer criterion to remain a separately supplied requirement rather than an area-wide claim.`,
        checks: [
          `Obtain the exact opening, current assembly and written requirement from the authorised property or site controller.`,
          `Follow a park manager's specification or inspect the private property directly; exclude public-route records from product choice.`,
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
        localFactIndexes: [0, 1, 2],
        local: `The River Avon corridor can orient a Stratford-upon-Avon address, but it does not identify which bank, street, building or entrance the caller controls. Obtain the full location and do not infer a travel route or flood status from Policy NE2. Distinguish the street-facing, shared and private thresholds at the supplied building, using river context only to check the caller's description before authority is verified for the opening requested.`,
        decision: `The town's neighbourhood-plan area and conservation record overlap different planning questions. Neither verifies occupation, so confirm the requester against the particular premises and treat any 2026 conservation-review material as draft rather than current access evidence. Assess the actual lock with its door, frame and hinges, then explain the proposed access work and expected cost without allowing a draft review or river policy to dictate method.`,
        checks: [
          `Record the full street, building and entrance and use the River Avon only as caller-confirmed orientation.`,
          `Verify the requester at the premises and keep 2026 conservation-review material labelled as draft.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        local: `Stratford's conservation record is under appraisal review in 2026, making the latest formally published boundary—not draft review material—the starting point for a visible change question. The exact property's listed status must still be checked separately. Record whether the proposal remains inside existing hardware or alters outward material, so a consultation document cannot silently replace the current address-level evidence.`,
        decision: `Policy NE2 protects a river biodiversity corridor but does not specify door hardware or grant alteration consent. Inspect the entrance, obtain the authorised customer's objective and separate any heritage or property approval from the technical replacement decision. The schedule should identify observed condition, retained parts, measured replacement, keys and adjustment, keeping river-corridor policy outside component compatibility and customer authority. Keep each approval source traceable.`,
        checks: [
          `Use the latest formally published conservation boundary and verify listed status without treating review drafts as adopted.`,
          `Inspect the entrance and separate river-corridor planning context and property permission from the replacement specification.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        local: `Neither the River Avon biodiversity corridor nor Stratford's conservation documents show that a door is uPVC or uses multipoint locking. Ask for the specific entrance, direct images and handle, key and frame symptoms instead of using town context diagnostically. Record locking-point movement and any safely observed open-door difference in sequence, treating those facts as an inspection brief rather than evidence that one component has failed.`,
        decision: `If the caller uses the river or a conservation landmark to explain location, record the full address before proceeding. Review status may affect later visible work, but it cannot identify the mechanism or the cause of a reported fault. Use readable faceplate data, centres, backset and locking layout to narrow compatibility after inspection, and consult the current property record separately only if visible material would change.`,
        checks: [
          `Obtain direct images and handle, key and frame symptoms from the specific entrance rather than planning documents.`,
          `Resolve a river or conservation landmark to the full address, then consider current permission only for supported visible work.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2],
        local: `A damaged opening near the River Avon or within central Stratford must be tied to an exact property; Policy NE2 does not establish flood status, ownership or safe access. Record the responsible party and scene status before temporary work. Photograph the exposed opening and visible damage without using river or conservation context to declare the frame suitable, accessible or structurally sound.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before using the current conservation map to identify any address-specific approval question; rely on formally published records rather than review drafts. Do not infer listed status, construction or attachment suitability from the broader conservation-area entry. Record intended temporary coverage, observed opening measurements, proposed attachment positions, compromised locks and later glazing, joinery or door work, keeping current map evidence distinct from inspection of the damaged material.`,
        checks: [
          `Tie the opening to an exact property and record its responsible party and scene status without inferring flood or access conditions.`,
          `Where police issue evidence-preservation instructions, follow them before checking current property records and attachment permission.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: `Made-plan status, a river biodiversity corridor and conservation review cannot demonstrate that a Stratford entrance needs upgraded security. Start with the individual door and a documented requirement, without converting planning protection into a risk or product claim. Inspect the frame, hinges, keeps, handles, lock engagement and cylinder fit, then relate proposed measures to recorded conditions rather than the area's planning protections.`,
        decision: `Check the current conservation boundary and any management control only for the supplied address. Verify listed status separately and consider listed-building consent only where the proposed alteration would affect special character. Resolve any other address-specific permission that a visible change actually engages; otherwise avoid unsupported heritage assumptions from review material. Name the product evidence, measurements, retained hardware and exclusions in writing, while preserving the difference between current adopted records and draft appraisal work.`,
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
      {
        text: `The Department for Education records Alveston CofE Primary School at Knights Lane, Tiddington, Stratford-upon-Avon, CV37 7BZ.`,
        sourceIds: ['dfe-alveston-primary-tiddington'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['sdc-stratford-made-plan', 'dfe-alveston-primary-tiddington'],
    factOnlySourceIds: ['dfe-alveston-primary-tiddington'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Tiddington's built-up boundary, strategic gaps and Tiddington Fields are planning geometries, not an address. A caller must identify the street, building and controlled entrance rather than relying on Category 1 Local Service Village status. Record any common threshold and the precise door requested, using the mapped field or gap only to correct location ambiguity and never as a route.`,
        decision: `If Tiddington Fields or a strategic gap is mentioned as orientation, do not assume it provides an approach to the property. Verify the requester at the supplied premises and keep allocated open space separate from access authority. Inspect the confirmed lock, door, frame and hinges, describe the access work supported by that inspection and advise the expected price. If the service-call price changes, obtain agreement before the changed price applies; settlement category supplies neither urgency nor method.`,
        checks: [
          `Identify the street, building and doorway rather than relying on settlement category or mapped planning geometry.`,
          `Use Tiddington Fields only for orientation, never as an approach, and verify the requester at the premises.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `A defined built-up boundary does not identify what lock is installed at a Tiddington property or whether an entrance is managed. Inspect the individual door and obtain the authorised owner's, occupier's or manager's stated replacement objective. Record the present lock, frame and hinge condition and whether shared hardware is excluded, then compare repair and replacement only from that entrance-level evidence.`,
        decision: `Policies for strategic separation and future orchard, woodland or open-space use at Tiddington Fields cannot authorise work or specify hardware. If a managed asset is involved, identify its controller; otherwise do not import those land-use policies. The proposed schedule should name measured components, keys, fitting, adjustment and retained parts, leaving future land use outside compatibility and approval. Identify who authorises any shared component.`,
        checks: [
          `Inspect the individual door and obtain the authorised controller's replacement objective; the built-up boundary cannot specify it.`,
          `For a Tiddington Fields asset, identify its manager; otherwise exclude future land-use policies from the change.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Category 1 Local Service Village status supplies no evidence that a Tiddington door is uPVC or multipoint. Document material, handle travel, key movement and frame contact at the exact opening rather than inferring construction from settlement classification. Include faceplate markings and locking-point movement and label any safe open-versus-closed comparison as observed, reported or not tested.`,
        decision: `Tiddington Fields and the mapped strategic gaps may help prevent geographical confusion but cannot diagnose a mechanism or prove access. Keep the planning map outside the repair assessment and use direct evidence from the door set. Confirm centres, backset and locking layout before naming a compatible multipoint part, recording cylinder size and any frame adjustment as separate items. Record the code source used to narrow the shortlist.`,
        checks: [
          `Document material, handle travel, key movement and frame contact at the exact opening.`,
          `Use Tiddington Fields and strategic gaps only to resolve geography and keep them outside the repair diagnosis.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged opening near Tiddington Fields must be distinguished from the allocated orchard, woodland and open-space land and tied to a named building. The plan provides no ownership, boundary, construction or safe-access information for that opening. Photograph and measure the individual door, window or panel, recording visible surrounding damage while leaving hidden condition and support suitability unconfirmed.`,
        decision: `Where police have issued preservation instructions, follow them before obtaining the responsible property or site controller's approval and inspecting the opening. Neither the built-up boundary nor strategic-gap policy establishes permission to cross land or attach a temporary measure. List the area covered, attachment positions, affected lock and permanent repair outstanding, so temporary security is not presented as structural, glazing or joinery reinstatement. Identify who approved each attachment position.`,
        checks: [
          `Tie the damaged opening to a named building and distinguish it from allocated orchard, woodland and open-space land.`,
          `Where police issue evidence-preservation instructions, follow them before inspecting the opening and confirming access and attachment permission.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Settlement category and strategic-gap policy do not demonstrate security need or set a lock standard in Tiddington. An upgrade requires the exact entrance, observed assembly and a documented requirement from the person authorised for that property. Record the frame, hinges, keeps, handles, lock engagement and cylinder fit where present, connecting each option to an inspected weakness rather than the village category.`,
        decision: `If the request concerns an asset on allocated community-orchard, woodland or open-space land, establish its current status and manager. For any other address, keep Tiddington Fields policy separate from technical product selection. State measurements, product evidence, retained hardware and exclusions in the proposal, allowing any site requirement to remain a separately verified constraint. Attribute every external requirement to its provider.`,
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
      {
        text: `The Department for Education records Bishopton Primary School at Drayton Avenue, Stratford-upon-Avon, CV37 9PB.`,
        sourceIds: ['dfe-bishopton-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['sdc-stratford-made-plan', 'dfe-bishopton-primary'],
    factOnlySourceIds: ['dfe-bishopton-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Burton Farm north of the A46, Bishopton Road canal bridge and the SUA.3 allocation north of Bishopton Lane are separate plan references. A caller must name the present building, unit and exact doorway rather than using “Bishopton” alone. Record whether the affected threshold is a unit, common site door or private entrance, and use each planning reference only to eliminate location ambiguity.`,
        decision: `If Burton Farm is involved, confirm the current occupier or site manager because the plan-era industrial-unit description does not prove present control. A future bridge review or housing allocation supplies no route or authority for access. Verify the instruction for the named opening, inspect its lock with the door, frame and hinges, and explain the supported scope and expected charge from present evidence.`,
        checks: [
          `Distinguish Burton Farm, Bishopton Road bridge and SUA.3 and name the present building, unit and doorway.`,
          `Confirm the current occupier or manager and never use a bridge review or housing allocation as route or authority.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `The plan describes small units in converted farm buildings at Burton Farm, but that does not establish current fabric, occupation or hardware. A replacement instruction needs the precise unit, observed entrance and the manager entitled to approve it. Define the reason for change and whether shared site hardware is excluded, then document lock, door and frame condition instead of inferring a specification from conversion history.`,
        decision: `For a property near Bishopton Lane or the canal bridge, do not use allocation or infrastructure policy as a specification. Verify present building status and any site requirement directly before selecting a compatible component. The schedule should name retained parts, measured replacement, keys, fitting, adjustment and exclusions, keeping future planning proposals outside product choice and approval.`,
        checks: [
          `At Burton Farm, identify the current unit, inspect its entrance and verify the manager entitled to approve replacement.`,
          `Near Bishopton Lane or the canal bridge, confirm present building status and direct site requirements before component selection.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `A converted-farm-building description at Burton Farm cannot show whether the affected entrance is uPVC, composite, timber or multipoint. Ask for the exact unit and direct handle, key, frame and locking-point symptoms. Photograph the full faceplate and record any safe open-versus-closed comparison as reported or reproduced evidence, without assigning alignment or mechanism failure remotely.`,
        decision: `The Bishopton Road bridge review and SUA.3 allocation are spatial planning matters, not mechanical evidence. They neither diagnose a door nor prove that development has occurred, so keep them outside the repair decision. Confirm centres, backset, locking layout and readable codes before proposing a component, while site responsibility and cylinder dimensions remain separately documented questions. Preserve the photographs and measurements that justify the resulting component shortlist.`,
        checks: [
          `Name the exact Burton Farm unit and record handle, key, frame and locking-point behaviour at that opening.`,
          `Keep the Bishopton Road bridge review and SUA.3 allocation outside diagnosis and do not assume development occurred.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `Damage at Burton Farm requires a named unit and current authorised site contact; damage near Bishopton Lane or the canal needs the exact property. The plan does not establish ownership, current construction or safe approach. Photograph the particular pane, panel, frame or door and record visible surrounding damage, leaving hidden condition and support suitability for physical inspection.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before inspecting the real opening and documenting the proposed temporary measure for its controller. A future bridge review cannot be treated as an access guarantee, and allocation SUA.3 cannot be treated as a completed building. List observed dimensions, temporary coverage, proposed attachment positions, compromised hardware and permanent repair outstanding so planning-stage evidence never substitutes for a site record. Identify who authorised the recorded temporary scope.`,
        checks: [
          `Name the Burton Farm unit or other exact property and verify its current authorised site contact.`,
          `Where police issue evidence-preservation instructions, follow them before inspecting the opening; bridge review and SUA.3 prove no access.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Industrial-unit history, a bridge project and a housing allocation do not establish security need or current hardware in Bishopton. Obtain a written objective from the authorised occupier or manager and assess the individual door set. Record frame condition, hinges, keeps, handles, lock engagement and cylinder fit where applicable, relating each option to an observed weakness rather than historical or proposed land use.`,
        decision: `Where Burton Farm is named, confirm the present unit and any shared-site responsibilities. Where Bishopton Lane or Bishopton Road is referenced, verify the actual property and do not convert planning proposals into a product standard or permission. State product evidence, measured dimensions, retained hardware and excluded shared work, with any current manager or insurer criterion attributed to its own document.`,
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
      {
        text: `The Department for Education records Shottery St Andrew's CofE Primary School at 3 Hathaway Lane, Stratford-upon-Avon, CV37 9BL.`,
        sourceIds: ['dfe-shottery-st-andrews'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['sdc-shottery-conservation', 'sdc-stratford-made-plan', 'dfe-shottery-st-andrews'],
    factOnlySourceIds: ['dfe-shottery-st-andrews'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Shottery Conservation Area and Shottery Fields Local Green Space are not interchangeable location labels. Obtain the precise street, building and controlled entrance, and do not assume that crossing or approaching through the green space is permitted. Distinguish any common entrance from the private threshold requested, using the green-space name only to clarify location before authority is checked.`,
        decision: `The 1969 designation and 1992 appraisal say nothing about occupation or entry rights at a modern address. Verify the caller against the individual premises and treat a Shottery Fields reference only as orientation. Assess the actual lock, door, frame and hinges and explain the proposed access work and likely charge without allowing historic designation dates to imply a method. Record which threshold the authority covers.`,
        checks: [
          `Distinguish the conservation area from Shottery Fields and record the precise street, building and doorway.`,
          `Verify the caller at the premises and never assume an approach across the Local Green Space.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `A visible replacement within Shottery requires the current conservation boundary and exact building status, not reliance on historic designation dates alone. Listed status, management approval and the existing door set each need separate verification. Record whether the change stays within current hardware or affects visible material, preventing area history from becoming a blanket consent or replacement conclusion.`,
        decision: `Shottery Fields is protected as Local Green Space but that policy neither applies to every property nor specifies hardware. If a managed green-space asset is involved, identify its controller; otherwise exclude the designation from the replacement decision. Name the observed fault or key-control objective, retained components, measured part, keys and adjustment, keeping green-space policy outside technical compatibility. Document the source of any site restriction.`,
        checks: [
          `Check the current conservation boundary, building status and management controls instead of relying on historic dates.`,
          `Identify the controller for a Shottery Fields asset; otherwise exclude Local Green Space policy from the specification.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Conservation-area history does not show that a Shottery entrance is timber, uPVC, composite or multipoint. Record the actual material and symptoms; check heritage permission later only if supported repair would visibly affect controlled fabric. Include the faceplate, handle travel, key movement and locking-point action, distinguishing what was observed safely from what the caller reported.`,
        decision: `Local Green Space status at Shottery Fields cannot diagnose handle or key behaviour and cannot establish access to a nearby address. Use direct evidence from the stated doorway and keep the green-space boundary separate. Confirm centres, backset, strip layout and readable codes before naming a compatible multipoint part, with cylinder fit and frame adjustment recorded independently. Retain the measurements and markings that support the proposed component match.`,
        checks: [
          `Record the actual door material and symptoms and check heritage permission only for supported visible work.`,
          `Use direct evidence from the stated doorway and keep Shottery Fields status outside diagnosis and access assumptions.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged Shottery opening must be located against the present conservation boundary and distinguished from an asset on Shottery Fields. Identify the exact property, current controller and scene status before choosing a temporary attachment. Photograph the opening and visible surrounding damage, leaving construction, hidden condition and suitability for support unconfirmed until inspection.`,
        decision: `Where police have issued forensic-preservation instructions, follow them before verifying property-specific permission for an external attachment that may affect protected fabric. Do not infer listed status from conservation designation or treat Local Green Space as an authorised route to the opening. Record the opening measurements, intended coverage, proposed attachment positions, compromised locks and outstanding permanent work, separating temporary access reduction from glazing, joinery or structural repair. Leave attachment suitability to direct inspection.`,
        checks: [
          `Locate the opening against the current boundary and distinguish a property from a Shottery Fields asset.`,
          `Where police issue forensic-preservation instructions, follow them before verifying attachment permission and property status.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Shottery's conservation history and Local Green Space policy cannot demonstrate risk, need or an installed security standard. An upgrade must answer a documented objective at a particular entrance, supported by inspection of that door set. Record frame, hinges, keeps, handles, lock engagement and cylinder fit where present, tying each recommendation to a measured issue rather than designation.`,
        decision: `Check current designation and listed status only for the supplied building and consider listed-building consent only where the proposed alteration would affect special character. If the request concerns Shottery Fields infrastructure, obtain the responsible manager's specification instead of assuming a residential context. State compatible product evidence, dimensions, retained components and exclusions, allowing conservation and management decisions to remain separately verified conditions. Record who supplied every controlling condition.`,
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
      {
        text: `The Department for Education records St Nicholas CofE Primary School at The Blundells, Kenilworth, CV8 2PE.`,
        sourceIds: ['dfe-kenilworth-st-nicholas-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-kenilworth-plan-page', 'wdc-kenilworth-conservation', 'dfe-kenilworth-st-nicholas-primary'],
    factOnlySourceIds: ['dfe-kenilworth-st-nicholas-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `The made plan covers Kenilworth at neighbourhood scale, while conservation history names particular 2005 extensions. A request still needs the full street address and exact entrance; neither the plan nor an extension road proves where the caller is authorised. Record the affected threshold and any common access before verifying the requester, using a named extension road solely to disambiguate the premises.`,
        decision: `If Waverley Road, Station Road or Clarendon Road is mentioned, use it only to clarify the address. Historical inclusion in an extension does not establish current occupation, access permission or listed status for the individual building. Inspect the confirmed lock with the door, frame and hinges, then explain the access scope and expected price from current condition rather than conservation history.`,
        checks: [
          `Record the full street address and exact entrance; neighbourhood-plan scope and extension roads cannot identify authority.`,
          `Use Waverley Road, Station Road or Clarendon Road only for location and verify the caller at the building.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `Kenilworth's 1971 designation and later extensions make current address-level mapping necessary before visible replacement. Do not assume that every property on a named road, or elsewhere in the plan area, has identical conservation or listed status. Define whether the work remains within existing hardware or changes visible material and record the exact property result before applying any heritage guidance.`,
        decision: `The made neighbourhood plan cannot select a replacement lock. Inspect the actual entrance, obtain the authorised customer's objective and check separately whether the particular building or manager imposes a permission or written specification. The proposal should name observed condition, retained parts, measured component, keys, fitting and adjustment, leaving plan adoption outside compatibility and approval. Attribute each stated constraint to its current source.`,
        checks: [
          `Map the address against the current boundary and verify listed status without generalising from an extension road.`,
          `Inspect the entrance and obtain the authorised objective plus any direct building or manager specification.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither Kenilworth plan status nor conservation-extension history identifies a uPVC door or multipoint mechanism. Ask for the exact opening, images and handle, key and frame behaviour rather than drawing construction conclusions from a road name. Record faceplate markings, locking-point movement and any safe open-door comparison, labelling each item as observed, reported or not tested.`,
        decision: `If the address lies within a current conservation boundary, that fact may prompt a later permission check but cannot diagnose the reported fault. Base the repair assessment on the observed door set and verify listed status separately if relevant. Confirm centres, backset and locking layout before proposing a multipoint part, keeping cylinder dimensions and visible property work as distinct decisions. Preserve the observations supporting the component match.`,
        checks: [
          `Collect images and handle, key and frame behaviour from the exact opening rather than inferring construction from a road.`,
          `Diagnose from the observed door set, then check conservation or listed controls only for the supported work.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged opening on Waverley Road, Station Road, Clarendon Road or another Kenilworth street requires a current property-status check, not reliance on 2005 extension history. Identify the exact building, controller and scene status. Photograph the exposed opening and visible frame damage while leaving hidden condition and attachment suitability for on-site assessment rather than inference from a historic boundary.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before determining whether an external temporary attachment engages address-specific conservation, listing or management controls. The neighbourhood plan itself supplies no construction detail, ownership authority, attachment suitability or securing method. Record the opening measurements, intended coverage, proposed attachment positions, covered material, compromised hardware and permanent repair outstanding so the temporary intervention remains fully bounded. Identify who approved the temporary scope.`,
        checks: [
          `Identify the exact building, controller and scene and use current property status rather than 2005 extension history.`,
          `Where police issue evidence-preservation instructions, follow them before checking address-specific controls and inspecting the opening.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Made-plan status and conservation history do not demonstrate a security need at a Kenilworth entrance. Start with the actual door and a documented objective, using the current boundary only to identify any permission question for visible change. Inspect frame condition, hinges, keeps, handle protection, lock engagement and cylinder fit, then relate each option to a recorded weakness rather than the road's history.`,
        decision: `A property on a named extension road still needs its own status and existing hardware verified. Compare compatible options after inspection and obtain any owner or manager approval that applies, plus listed-building consent only where the proposed alteration would affect special character. State product evidence, measurements, retained hardware and excluded door work in writing, keeping certification, policy and property consent as separate evidence questions. Identify each approval source.`,
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
      {
        text: `The Department for Education records Balsall Common Primary School at Balsall Street East, Balsall Common, Coventry, CV7 7FS.`,
        sourceIds: ['dfe-balsall-common-primary'],
        serviceRelevance: `This identifies one education site only; it does not resolve the wider settlement's parish boundary, neighbouring properties or service conditions.`,
      },
    ],
    sourceIds: ['solihull-balsall-plan-page', 'solihull-balsall-made-plan', 'dfe-balsall-common-primary'],
    factOnlySourceIds: ['dfe-balsall-common-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Balsall Common crosses Balsall and Berkswell parishes, while the cited made plan applies only on the Balsall side. Obtain the full address before using any plan context; if the parish remains unresolved, omit the plan claim entirely. Record the building and exact threshold separately from the parish result, because boundary resolution can validate locality wording but cannot identify the entrance or caller.`,
        decision: `Parish resolution still does not prove who may enter the stated premises. Verify the requester and controlled doorway independently, and never treat settlement continuity across the boundary as evidence of access, proximity or operational coverage. Inspect the confirmed door, frame, hinges and lock, describe the opening work supported by that inspection and advise the expected price. If the service-call price changes, obtain agreement before the changed price applies; plan status supports none of those decisions.`,
        checks: [
          `Resolve the full address to Balsall or Berkswell parish and omit the cited plan if the boundary remains uncertain.`,
          `Verify the requester and doorway independently; settlement continuity cannot prove access, proximity or coverage.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `A Balsall Common address cannot inherit Balsall Parish plan evidence until its side of the Balsall–Berkswell boundary is confirmed. If that check fails, no plan-based local statement should appear in the replacement decision. Define the reason for change and inspect the current door set regardless of parish, so a governance boundary never becomes a lock or key-control assumption.`,
        decision: `Even for an address inside Balsall parish, the made plan does not identify current hardware or approve a change. Inspect the entrance and obtain property-specific authority, specification and any management or statutory permission separately. Record what remains serviceable, measured replacement details, keys, fitting and adjustment, while the verified parish controls only which locality source may be cited. Name the source of each requirement.`,
        checks: [
          `Confirm the address is in Balsall parish before using its plan; otherwise omit that local statement.`,
          `Inspect the entrance and obtain property-specific authority, specification and permission independently of plan status.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `The cross-parish settlement and the Balsall-only plan boundary provide no evidence that a door is uPVC or multipoint. Resolve the address first for accurate locality, then diagnose only from the affected entrance and its reported symptoms. Capture faceplate markings, handle travel, key movement and locking-point action, distinguishing safe observations from the caller's account rather than assigning a fault remotely.`,
        decision: `If the address falls in Berkswell parish, do not cite the Balsall plan as local evidence; if it falls in Balsall parish, do not let plan status become a hardware claim. Either way, inspect the door directly. Use centres, backset and locking layout to narrow compatibility, recording cylinder fit and frame condition as separate evidence from the parish determination. Preserve the supporting markings.`,
        checks: [
          `Resolve the parish for accurate locality and diagnose material and mechanism only from the affected entrance.`,
          `Exclude the Balsall plan for Berkswell addresses and never use it as a hardware claim within Balsall.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `For a damaged Balsall Common opening, identify the exact property and parish before attaching any planning context. An unresolved Balsall–Berkswell boundary requires the parish-plan claim to be withheld, not approximated from the settlement name. Photograph the exposed opening and visible damage, leaving hidden condition, ownership and attachment suitability unconfirmed until the address and structure are checked directly.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before confirming the authorised owner or manager and inspecting the opening. The Balsall plan boundary supplies no property ownership, access right, construction detail, attachment suitability or permission for a temporary external fixing. Record observed opening measurements, intended temporary coverage, proposed attachment positions and unresolved permanent work so the parish decision remains only an evidence-attribution step.`,
        checks: [
          `Identify the exact property and parish and withhold the Balsall plan claim if the boundary is unresolved.`,
          `Where police issue evidence-preservation instructions, follow them before verifying the controller, access and proposed attachment permission.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Balsall Common's split between Balsall and Berkswell prevents a settlement-wide plan claim. Resolve the address to the applicable parish or omit that evidence, and never use made-plan status as a proxy for security need. Inspect frame, hinges, keeps, handles, lock engagement and cylinder fit where present, tying each recommendation to an observed weakness at the exact entrance.`,
        decision: `A verified Balsall-parish address still requires inspection, a documented objective and any property-specific consent; a Berkswell address needs evidence from its own governing records. Product selection cannot follow from either side of the boundary. State compatible product evidence, measurements, retained hardware and exclusions, with parish resolution recorded separately from any customer, manager or policy requirement. Record who supplied each property constraint and date that source.`,
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
      {
        text: `The Department for Education records Meriden Church of England Primary School at Fillongley Road, Meriden, Coventry, CV7 7LW.`,
        sourceIds: ['dfe-meriden-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['solihull-meriden-plan-page', 'solihull-conservation-areas', 'dfe-meriden-primary'],
    factOnlySourceIds: ['dfe-meriden-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Meriden Green and Meriden Hill are separate conservation-area names within a wider parish-plan context. A caller must supply the complete address and doorway; neither designation confirms which property is meant or who may authorise entry. Record any shared and private thresholds at the building, using Green or Hill only to verify the locality rather than infer control or an approach.`,
        decision: `Use a Green or Hill reference only to clarify locality after the address is known. The made plan establishes planning status, not occupation, and conservation registration is unrelated to the identity check required for access. Verify the instruction, inspect the lock with its door, frame and hinges, and explain the supported opening scope and expected price from the individual entrance.`,
        checks: [
          `Record the complete address and doorway and identify whether Meriden Green, Meriden Hill or neither applies.`,
          `Use Green or Hill only for locality and verify identity and authority at the specific premises.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `A Meriden lock change should not assume the same property status across Meriden Green, Meriden Hill and addresses outside both. Resolve the latest boundary and separately check the individual building before a visible replacement is specified. Record whether the proposal remains within current hardware or affects external material, avoiding any automatic consent conclusion from either conservation-area name.`,
        decision: `The parish plan's made status cannot identify the installed lock or approve alteration. Inspect the door and obtain authority, with any conservation, landlord or manager requirement tied to the exact premises and listed-building consent considered only where the proposed alteration would affect special character. The schedule should name observed condition, retained components, measured replacement, keys and adjustment, keeping planning evidence outside technical compatibility. Record the source of every requirement.`,
        checks: [
          `Resolve the latest boundary and individual building status across Meriden Green, Meriden Hill or neither.`,
          `Inspect the door and tie authority and any conservation, listing, landlord or manager requirement to that property.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither Meriden's made plan nor its two conservation-area entries proves that a reported opening is uPVC, composite or multipoint. Collect direct symptoms and photographs from the stated door rather than inferring material from locality. Record the faceplate, handle, key and locking-point sequence and label any safe open-door comparison as observed evidence, not proof of the failed component.`,
        decision: `A confirmed conservation boundary may affect permission for visible remedial work, but it cannot diagnose handle, key or alignment behaviour. Identify the mechanism first and verify any property control only for the supported repair. Confirm centres, backset, locking layout and readable codes before proposing a part, with cylinder dimensions and frame adjustment documented separately. Preserve the markings supporting that shortlist and note which code was legible.`,
        checks: [
          `Collect direct photographs and symptoms from the stated door instead of inferring material from Meriden locality records.`,
          `Identify the mechanism first and verify conservation or property controls only for the supported visible repair.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged Meriden opening needs address-level mapping because Meriden Green and Meriden Hill are distinct designations and neither necessarily covers the property. Record the scene, exact entrance and authorised controller before planning temporary work. Photograph the material likely to be covered and visible surrounding damage, leaving hidden condition and attachment feasibility expressly unresolved for inspection.`,
        decision: `Where police have issued forensic-preservation instructions, follow them before establishing whether current conservation, listing or management permission affects an external attachment. Do not infer building status from the wider parish plan or transfer one conservation-area name to another address. Record intended temporary coverage, observed opening measurements, proposed attachment positions, compromised locks and permanent repair outstanding, separating property mapping from the physical board-up decision. Leave attachment suitability to inspection.`,
        checks: [
          `Map the exact opening against Meriden Green and Meriden Hill and record the scene and authorised controller.`,
          `Where police issue evidence-preservation instructions, follow them before verifying current attachment controls for that address.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Parish-plan status and conservation registration do not demonstrate a security need or standard for Meriden. The upgrade basis must be the observed entrance and a documented requirement, not an assumption attached to Green or Hill. Record frame condition, hinges, keeps, handles, lock engagement and cylinder fit, linking each proposed item to an inspected weakness rather than mapped context.`,
        decision: `Check the exact boundary and any listed or managed status before visible change. Where neither Meriden Green nor Meriden Hill applies, do not import those constraints; where one does, obtain only the permissions relevant to that address, with listed-building consent considered only when the proposed alteration would affect special character. State product evidence, measured dimensions, retained hardware and excluded work so property status is never presented as certification or policy acceptance.`,
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
      `The 2017 Hampton-in-Arden plan continues to apply within its previous neighbourhood area, according to Solihull Council; the later submission draft was withdrawn and its examination closed. The council also records a 1968 conservation designation for the central area.`,
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
      {
        text: `The Department for Education records George Fentham Endowed School at Fentham Road, Hampton-in-Arden, Solihull, B92 0AY.`,
        sourceIds: ['dfe-george-fentham-school'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['solihull-hampton-plan-page', 'solihull-hampton-history', 'dfe-george-fentham-school'],
    factOnlySourceIds: ['dfe-george-fentham-school'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `The 2017 plan continues only for its previous area, and central Hampton's conservation designation does not locate an individual entrance. Obtain the full address; never use the withdrawn replacement plan as current evidence or as an access reference. Record the building and precise threshold, distinguishing any communal door from the requested private entrance before the caller's connection is assessed.`,
        decision: `Whether the address falls inside the old plan area or central conservation boundary says nothing about the caller's right to enter. Verify identity and authority for the specific premises independently of both planning statuses. Inspect the confirmed lock with its door, frame and hinges, then explain the supported access work and expected charge without relying on withdrawn policy or heritage appearance.`,
        checks: [
          `Obtain the full address and use only the applicable 2017 plan area, never the withdrawn replacement draft.`,
          `Verify identity and authority at the specific premises independently of plan-area or central-conservation status.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `For a visible replacement, check the exact address against the current central conservation boundary and the applicable 2017 plan area. Do not rely on policies or boundaries from the withdrawn replacement draft, whose examination has closed. Define whether the work remains inside existing hardware or changes external material, preserving the distinction between current property evidence and an abandoned policy proposal.`,
        decision: `A 1968 central designation does not make every Hampton-in-Arden building protected or listed. Inspect the entrance and obtain property-specific authority and permission, keeping heritage status separate from the technical specification. Record the reason for change, retained parts, measured replacement, keys and adjustment, with any unresolved property question listed outside component compatibility. Identify and date the current source for each constraint.`,
        checks: [
          `Check the address against the current central boundary and applicable 2017 plan area, excluding the withdrawn draft.`,
          `Inspect the entrance and verify property-specific authority, listed status and permission separately from specification.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither the continuing 2017 plan nor the withdrawn newer draft shows whether a Hampton-in-Arden door is uPVC or multipoint. Use only direct evidence from the exact opening to identify material, mechanism and symptoms. Capture faceplate markings and the key, handle and locking-point sequence, treating any safe open-versus-closed difference as an observation to reproduce rather than a diagnosis.`,
        decision: `Central conservation status may prompt a later permission check for visible repair, but it cannot diagnose hardware or apply across the whole settlement. Discard the withdrawn draft from any claim about current property context. Confirm centres, backset, strip layout and readable codes before proposing a multipoint part, recording cylinder fit and any frame work as separate findings. Preserve the evidence supporting the shortlist.`,
        checks: [
          `Identify material, mechanism and symptoms from the exact opening and exclude both plans from diagnosis.`,
          `Check current central-conservation permission only for supported visible work and discard the withdrawn draft entirely.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged Hampton-in-Arden opening must be resolved against the current central conservation map and property record, not the withdrawn replacement plan. Identify the precise premises, scene status and person entitled to approve temporary work. Photograph the exposed opening and visible frame damage while leaving hidden construction and support suitability for direct inspection.`,
        decision: `Where police have issued forensic-preservation instructions, follow them before verifying whether an external attachment needs address-specific consent. The 2017 plan's previous-area limit and 1968 central designation provide no construction detail, attachment suitability or general permission to secure buildings. Record the opening measurements, intended coverage, proposed attachment positions, material covered, compromised hardware and permanent repair outstanding, keeping current status evidence separate from temporary-work feasibility. Identify who approved the temporary scope.`,
        checks: [
          `Resolve the precise premises against current records and identify the scene and person entitled to approve work.`,
          `After protecting evidence, verify address-specific attachment consent and inspect construction rather than relying on historic designation.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `The existing plan, withdrawn draft and central conservation designation do not demonstrate security need or choose products. An upgrade requires the actual Hampton-in-Arden entrance and a written objective from its authorised controller. Inspect frame, hinges, keeps, handles, lock engagement and cylinder fit where present, relating proposals to recorded conditions instead of planning history.`,
        decision: `Use only current evidence: the 2017 plan where its previous boundary applies and the latest conservation map for the address. Do not treat withdrawn policies as requirements, and consider listed-building consent only where the proposed alteration would affect special character; verify any management approval separately. State compatible product evidence, measurements, retained hardware and exclusions, preventing an obsolete draft or central designation from being represented as a performance standard.`,
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
      {
        text: `The Department for Education records Wolston St Margaret's CofE Primary School at Brookside, Main Street, Wolston, CV8 3HH.`,
        sourceIds: ['dfe-wolston-st-margarets'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['rbc-wolston-conservation', 'rbc-wolston-plan-page', 'dfe-wolston-st-margarets'],
    factOnlySourceIds: ['dfe-wolston-st-margarets'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `The River Avon and northern railway bridge can help distinguish a Wolston address from Brandon, but they do not identify a property or access route. Obtain the complete street location and doorway, especially outside the limited conservation section. Record whether the request concerns a street entrance, shared access or private door, using river and railway references only to correct place-name ambiguity.`,
        decision: `Use the latest explicit council record before describing the neighbourhood-plan stage. In any event, area planning records cannot verify occupation, so confirm the requester's permission at the specified premises. Inspect the named lock with its door, frame and hinges and explain the supported entry scope and expected price from current condition rather than planning stage. Record the authorised threshold explicitly.`,
        checks: [
          `Record the complete Wolston street and doorway and use the river and railway bridge only to distinguish Brandon.`,
          `Confirm the latest planning stage and verify the requester at the premises independently of area records.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `Most buildings in the limited conservation designation lie south of the River Avon, but that does not make every southern Wolston address designated. Check the exact current boundary before visible replacement and verify listed status separately. Record whether the proposed change remains within existing hardware or affects outward material, preventing river position from becoming an automatic property-control conclusion.`,
        decision: `Use the council page only for the planning stage it explicitly records. Specify the change from the inspected entrance and property-specific authority, not from a planning-stage inference. The schedule should identify observed condition, retained parts, measured component, keys and adjustment, leaving neighbourhood-plan progression outside mechanical compatibility. Record whether visible material changes and identify the current source of any property approval or written performance criterion.`,
        checks: [
          `Check the exact current boundary and listed status without treating every south-of-river address as designated.`,
          `Specify the change from the inspected entrance and property authority, citing only the council-recorded planning stage.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `A position south of the River Avon or near the railway bridge does not establish that a Wolston door is uPVC or multipoint. Ask for direct handle, key, locking-point and frame evidence from the exact opening. Include full faceplate details and any safe open-versus-closed observation, marking the sequence as reported or reproduced rather than proof of a specific fault.`,
        decision: `The conservation appraisal and neighbourhood screening record cannot diagnose hardware. If visible repair affects controlled fabric, check current property status only after identifying the actual mechanism. Confirm centres, backset, locking layout and readable codes before proposing a part, keeping cylinder size and frame condition separate from locality evidence. Preserve the faceplate observations and measurements supporting the compatible component shortlist after inspection.`,
        checks: [
          `Collect direct handle, key, locking-point and frame evidence without inferring a mechanism from river or railway position.`,
          `Identify the mechanism first and check current property controls only if the visible repair engages them.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged opening near the River Avon, railway bridge or Wolston's limited conservation area requires an exact address and responsible person. Neither river nor rail infrastructure establishes access, ownership or the construction to be secured. Photograph the opening and visible damage without declaring hidden material sound or suitable for attachment from its position relative to the river.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before checking current conservation and property controls for an external attachment. Cite the neighbourhood-plan page only for its documented stage, and do not extend the limited designation across the whole village. Record observed opening measurements, intended coverage, proposed attachment positions, affected locks and permanent work outstanding, keeping planning status separate from the temporary physical scope and leaving attachment suitability to inspection.`,
        checks: [
          `Identify the exact address and responsible person without inferring access, ownership or construction from river or rail context.`,
          `Where police issue evidence-preservation instructions, follow them before verifying current attachment controls and planning stage.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `River, railway and conservation context do not demonstrate security need at a Wolston entrance. The upgrade objective must come from its authorised controller and observed assembly, without relying on neighbourhood-planning stage as a hardware standard. Inspect frame, hinges, keeps, handles, lock engagement and cylinder fit where present, linking each proposal to a recorded weakness.`,
        decision: `Resolve whether the address is inside the limited current conservation boundary and use that mapping only to identify property-specific questions. Keep separation from Brandon, south-of-river orientation and plan-screening status outside the hardware specification itself. State compatible product evidence, measurements, retained components and exclusions, with any management or policy requirement attributed to its own current record and listed-building consent considered only if the proposed alteration would affect special character.`,
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
      {
        text: `The Department for Education records Ryton-On-Dunsmore Provost Williams Church of England Academy at Sodens Avenue, Ryton-on-Dunsmore, CV8 3FF.`,
        sourceIds: ['dfe-ryton-provost-williams'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['rbc-ryton-plan-page', 'rbc-ryton-made-plan', 'dfe-ryton-provost-williams'],
    factOnlySourceIds: ['dfe-ryton-provost-williams'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [1],
        local: `Ryton's plan area matches the civil parish and uses the River Avon valley for parts of its northern and western edges, but those boundaries do not locate a doorway. Require the full address and caller-confirmed entrance. Distinguish any shared threshold from the private door requested, using parish and river-valley descriptions solely to verify the stated locality.`,
        decision: `Main Rural Settlement is a planning-hierarchy term, not proof of occupation or access conditions. Verify the requester at the stated premises and do not turn the river-valley edge into a travel route or response claim. Inspect the confirmed lock, door, frame and hinges before explaining the supported access work and anticipated cost to the authorised caller. State which doorway the instruction covers and note the verifier.`,
        checks: [
          `Require the full address and caller-confirmed entrance rather than using parish or River Avon valley boundaries.`,
          `Verify the requester at the premises and keep settlement hierarchy and river edges out of route claims.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `The made plan confirms parish-scale planning status but does not identify the existing lock or building controller. A Ryton replacement must follow inspection of the exact entrance and a valid instruction from the responsible party. Define the reason for change, existing key-control objective and whether shared hardware is excluded, then document current door and frame condition.`,
        decision: `An address near a mapped River Avon valley boundary still needs its own property and permission checks. Neither parish coincidence nor Main Rural Settlement classification provides a component standard, consent or evidence of door construction. Record retained parts, measured replacement, keys, fitting and adjustment so the planning hierarchy remains outside both compatibility and approval. Identify who supplied each property-specific requirement and who authorised the change.`,
        checks: [
          `Inspect the exact entrance and obtain a valid instruction from its responsible party, independently of plan status.`,
          `For a river-valley-edge address, verify property controls and construction without treating settlement classification as a standard.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1],
        local: `Civil-parish extent, river edges and settlement classification do not show that a Ryton-on-Dunsmore door is uPVC or multipoint. Record the actual entrance, material and operating symptoms without using planning geography as diagnosis. Photograph the full faceplate and note key, handle and locking-point movement, treating any safe open-door comparison as an observation for inspection.`,
        decision: `The River Avon valley can help confirm general location only after the address is known. It supplies no evidence about handle movement, key travel, hinges, frame alignment or safe approach to the property. Confirm centres, backset, strip layout and readable codes before proposing a mechanism, while cylinder fit and any frame work remain separate measured findings. Retain the observations supporting the resulting shortlist and note which code was readable.`,
        checks: [
          `Note the precise doorway, confirmed material and open-or-closed symptoms; exclude the plan geography from the diagnosis.`,
          `Use the River Avon valley only after address confirmation and assess handle, key, hinges and frame directly.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged Ryton opening near the River Avon valley needs an exact building and authorised controller; a parish-boundary description does not establish river proximity, ownership, flood status, safe access or structural details. Photograph and measure the exposed opening, recording visible damage while leaving hidden condition and support suitability unconfirmed for direct inspection.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before inspecting the opening and documenting a temporary proposal at property level. Main Rural Settlement status and made-plan adoption do not authorise attachment or define the dimensions and materials involved. Record observed opening measurements, intended temporary coverage, proposed attachment positions, compromised hardware and permanent repair outstanding, preventing planning classification from becoming a structural, suitability or securing claim. Name the person responsible for that recorded proposal.`,
        checks: [
          `Identify the exact building and controller without inferring river proximity, flood status, access or structure.`,
          `Where police issue evidence-preservation instructions, follow them before recording opening measurements and proposed attachment approval.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Ryton's plan adoption and settlement-hierarchy position cannot demonstrate security need or existing hardware. Start with the precise entrance and a documented customer, landlord or manager objective rather than a village-wide planning category. Record frame condition, hinges, keeps, handles, lock engagement and cylinder fit where relevant, tying each option to a measured issue.`,
        decision: `Use the parish and river-valley boundaries only to verify locality. Compatible upgrade options must follow the observed door set, with any property-specific permission obtained independently of the neighbourhood plan's made status. State product evidence, dimensions, retained hardware and exclusions in writing, leaving planning and policy requirements as separately attributable records. Note which observed weakness each option addresses, identify who supplied every external criterion and date that evidence and approval.`,
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
      {
        text: `Warwickshire County Council's parish and town council directory contains a specific record for Baginton Parish Council.`,
        sourceIds: ['wcc-baginton-parish-council'],
        serviceRelevance: `This verifies the named parish administration only; it does not establish a property boundary, access authority, hardware or service conditions.`,
      },
    ],
    sourceIds: ['wdc-baginton-plan-page', 'wdc-local-plan', 'wcc-baginton-parish-council'],
    factOnlySourceIds: ['wcc-baginton-parish-council'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Baginton shares a neighbourhood plan with Bubbenhall, so the plan title cannot substitute for the specific village, street and doorway. Obtain the complete Baginton address and verify that the request is not being located only by joint-plan geography. Record the exact threshold and any common entrance, using the joint title only to prevent the two villages from being conflated.`,
        decision: `Growth Village and conservation-table entries do not prove occupation, entry rights or current building status. Confirm the requester for the stated property and use conservation context only after an exact boundary check. Assess the lock with its door, frame and hinges, then explain the supported entry scope and expected price without deriving a method from settlement classification. Record the authorised opening.`,
        checks: [
          `Record the complete Baginton street and doorway and keep Bubbenhall separate from the joint-plan title.`,
          `Verify the requester at the property and use conservation context only after checking the exact current boundary.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `The joint plan must not blur a Baginton address with Bubbenhall, and Growth Village status does not identify installed hardware. Inspect the precise door and obtain the responsible customer's replacement objective before selecting a component. Record the current lock, surrounding door condition and any shared-system exclusion so repair and replacement are compared on the same property-specific evidence.`,
        decision: `Because Baginton is separately listed in the district conservation table, check the current address-level boundary and any listed status before visible work. Do not treat that table entry as universal status or automatic refusal or approval. The proposed scope should name retained hardware, measured component, keys, fitting and adjustment, with property questions stated separately from compatibility. Attribute each permission question to the current property record.`,
        checks: [
          `Inspect the precise Baginton door and obtain the responsible customer's objective without substituting Bubbenhall evidence.`,
          `Check the current conservation boundary and listed status without treating the table entry as universal permission or refusal.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither the joint parish plan nor Growth Village classification shows that a Baginton entrance is uPVC or multipoint. Ask for the exact door, images and handle, key and frame symptoms from the property itself. Record faceplate markings, locking-point movement and any safely observed open-door difference, labelling each item as evidence for inspection rather than a cause.`,
        decision: `A conservation-table entry may affect a later visible-change permission check, but it cannot diagnose the mechanism. Keep Baginton and Bubbenhall distinct and base repair only on the observed assembly at the supplied address. Confirm centres, backset, locking layout and readable codes before proposing a part, with cylinder dimensions and frame adjustment kept separate. Preserve the markings and measurements supporting the component shortlist, including the legible code.`,
        checks: [
          `Obtain images and handle, key and frame symptoms from the exact Baginton door rather than planning classifications.`,
          `Diagnose the observed assembly first and check conservation permission only for the supported visible repair.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged Baginton opening requires the actual property and controller, not the joint-plan area or Growth Village label. Establish whether the address is within the current conservation boundary before assuming any heritage-related approval question. Photograph the material likely to be covered and visible surrounding damage, leaving hidden structure and attachment suitability for inspection.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before inspecting the specific opening and documenting a temporary proposal. Neither parish-council cooperation nor settlement hierarchy supplies ownership, safe access, materials, dimensions, attachment suitability or permission for an external fixing. Record observed opening measurements, intended temporary coverage, proposed attachment positions, compromised locks and permanent repair outstanding so locality classification remains outside the physical decision. Name the party responsible for those proposed positions.`,
        checks: [
          `Identify the actual Baginton property and controller and resolve its current conservation boundary before planning work.`,
          `Where police issue evidence-preservation instructions, follow them before inspecting the opening and confirming attachment permission.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Joint-plan status, Growth Village classification and conservation listing do not demonstrate security need in Baginton. An upgrade should follow a documented objective and inspection of the particular entrance, with Bubbenhall evidence not substituted. Record frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable, linking each recommendation to an observed weakness.`,
        decision: `Resolve current conservation and listed status for the address before visible alteration, using the map only to identify questions and considering listed-building consent only where the proposal would affect special character. Keep those questions separate from compatible product selection. The plan and hierarchy do not create a village-wide lock standard. State product evidence, measurements, retained components and exclusions in writing, preventing planning status from implying certification, consent or insurer acceptance.`,
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
      {
        text: `Warwickshire County Council's parish and town council directory has a Brandon & Bretford record linking to Brandon and Bretford Parish Council.`,
        sourceIds: ['wcc-brandon-bretford-parish-council'],
        serviceRelevance: `This verifies the named council directory record only; it does not establish a property boundary, access authority, hardware or service conditions.`,
      },
    ],
    sourceIds: ['rbc-brandon-plan-page', 'rbc-brandon-conservation', 'wcc-brandon-bretford-parish-council'],
    factOnlySourceIds: ['wcc-brandon-bretford-parish-council'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Brandon's joint plan includes Bretford, while its railway viaduct is described on the approach from Wolston. A request must therefore name the Brandon street and exact doorway rather than relying on the plan title or viaduct. Record any shared entrance and the private threshold requested, using the joint-plan and railway references only to prevent place-name confusion.`,
        decision: `An address north of Avondale Road is not automatically confirmed inside the conservation boundary, and the viaduct does not prove a route. Verify the requester at the particular property without importing either assumption. Inspect the confirmed lock with the door, frame and hinges and explain the supported opening scope and expected price from current evidence. Record exactly which threshold the authority covers and note the verifier.`,
        checks: [
          `Name the Brandon street and doorway and keep Bretford and the Wolston-side viaduct distinct.`,
          `Check the exact boundary and verify the requester without assuming designation north of Avondale Road or a viaduct route.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `The appraisal's “most village buildings north of Avondale Road” description still requires a current boundary check at the exact Brandon address. It cannot replace verification of listed status or identify the lock to be changed. Record whether the proposed work remains within existing hardware or affects visible external material, avoiding any automatic conclusion from being north of the road.`,
        decision: `The made Brandon and Bretford plan supplies planning context, not a hardware specification or owner approval. Keep Bretford separate, inspect the actual door and establish any property-specific conservation or management permission before alteration. The schedule should identify observed condition, retained components, measured replacement, keys and adjustment, leaving the joint plan outside compatibility. Name and date the current source of each requirement.`,
        checks: [
          `Check the current boundary and listed status at the exact Brandon address rather than generalising north of Avondale Road.`,
          `Inspect the actual door and obtain property-specific permission without importing Bretford or joint-plan assumptions.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither the railway viaduct nor the partial conservation description shows that a Brandon entrance is uPVC, composite or multipoint. Record door material and handle, key, frame and locking-point behaviour from direct evidence. Photograph the full faceplate and label any safe open-versus-closed comparison as observed, reported or not tested instead of assigning a component fault.`,
        decision: `The joint plan cannot diagnose a mechanism and must not blur Brandon with Bretford. Use the Wolston approach and Avondale Road references only to confirm location after receiving a complete address. Confirm centres, backset, locking layout and readable codes before proposing a part, recording cylinder dimensions and frame condition separately. Preserve the faceplate photographs and measurements that support the compatible component shortlist, noting which code remained legible.`,
        checks: [
          `Record material and handle, key, frame and locking-point behaviour directly from the Brandon entrance.`,
          `Use Wolston and Avondale Road references only after address confirmation and keep them outside mechanism diagnosis.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `Damage near Avondale Road or the railway viaduct needs a precise Brandon property and responsible party. The appraisal does not confirm address-level designation, and the railway landmark does not establish safe access or ownership. Photograph the exposed opening and visible frame damage while leaving hidden construction and attachment suitability for direct inspection.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before checking current conservation and listed status for a proposed external attachment. The joint plan supplies no construction, boundary permission, attachment suitability or temporary-securing method for the particular opening. Record observed opening measurements, intended coverage, proposed attachment positions, affected hardware and permanent work outstanding, keeping current property status separate from the temporary method. Record who approved those proposed attachment positions.`,
        checks: [
          `Identify the precise Brandon property and responsible party without treating Avondale Road or the viaduct as access evidence.`,
          `Where police issue evidence-preservation instructions, follow them before checking current property controls and inspecting the opening.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `A made joint plan, conservation context and railway landmark do not demonstrate security need in Brandon. Begin with the individual entrance and documented objective, keeping Bretford, Wolston and the exact conservation boundary distinct. Inspect frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable, tying each option to an observed weakness.`,
        decision: `Where the current map confirms designation north or south of Avondale Road, use it only to identify the questions applicable to that address; consider listed-building consent only if the proposed alteration would affect special character. The viaduct is orientation and cannot influence hardware choice, risk assessment or route claims. State compatible product evidence, measurements, retained hardware and exclusions, allowing any management or insurer criterion to remain separately sourced.`,
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
      `The council's 2024 study places Shilton in its Rural Village settlement category. The Office for National Statistics lists Shilton and Barnacle among Rugby's parishes, and Warwickshire County Council's live register lists Shilton on bus services 74/74A/74B/74C.`,
      `The planning classification, parish name and timetable entry are context rather than property evidence. The transport record is time-sensitive and must be rechecked before publication; none of the sources establishes private access, hardware or service coverage.`,
    ],
    accessGuidance: `Use the complete Shilton address rather than the broader Shilton and Barnacle parish name, and recheck the live county timetable before mentioning service 74 variants. Never assume a stop is near the property.`,
    evidenceLimits: `Rural Village status and a bus-stop listing do not prove property type, ownership, access, route suitability, timetable permanence, parking, door material, lock type, condition, locksmith availability, coverage, response time or local demand.`,
    facts: [
      {
        text: `Rugby Borough Council's 2024 Rural Sustainability Study classifies Shilton as a Rural Village.`,
        sourceIds: ['rbc-rural-study-2024'],
        serviceRelevance: `Use Rural Village only as an official planning classification, not as evidence about an individual property or access route.`,
      },
      {
        text: `The Office for National Statistics' Rugby area profile lists Shilton and Barnacle among the district's parishes.`,
        sourceIds: ['ons-rugby-area-profile'],
        serviceRelevance: `The parish name can help clarify an address, but it does not identify the individual settlement, street or doorway.`,
      },
      {
        text: `Warwickshire County Council's live bus register lists Shilton on routes 74, 74A, 74B and 74C in the Nuneaton and Coventry corridor.`,
        sourceIds: ['wcc-shilton-bus'],
        serviceRelevance: `Recheck the timetable before publication and never infer that an address is close to or reachable from a stop.`,
      },
    ],
    sourceIds: ['rbc-rural-study-2024', 'ons-rugby-area-profile', 'wcc-shilton-bus'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        local: `The Office for National Statistics lists Shilton and Barnacle as a Rugby parish, but that parish name does not identify the settlement, street or doorway. Require the full Shilton address and do not use Rural Village classification as an access instruction. Record the building and precise threshold, using the parish and classification only to disambiguate locality after the caller supplies the address.`,
        decision: `The county bus entry is live and time-sensitive; even while routes 74 variants list Shilton, that does not show a stop is near the premises or provide an approach. Verify the requester and exact opening independently. Inspect the lock with the door, frame and hinges, then explain the supported access work and anticipated price without using transport availability as an operational claim.`,
        checks: [
          `Require the full Shilton address and doorway rather than treating the ONS parish name as an entrance identifier.`,
          `Recheck the live bus record and never use a listed stop as an approach; verify the requester independently.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        local: `Rural Village is a planning category, not evidence of a Shilton property's construction or fitted lock. Name the individual entrance and obtain the authorised owner, occupier or manager's objective before any replacement is specified. Record the reason for change, current door set and any shared-system exclusion, comparing repair and replacement only from the inspected opening.`,
        decision: `Neither the ONS parish listing nor the current bus corridor supplies a hardware requirement or property permission. If transport is mentioned for orientation, recheck the live timetable and keep it outside the technical decision. The proposal should name retained parts, measured replacement, keys, fitting and adjustment, leaving volatile timetable evidence outside compatibility. Preserve photographed lock markings and identify who authorised both the component and key quantity.`,
        checks: [
          `Name the individual entrance and obtain the authorised owner, occupier or manager's replacement objective.`,
          `Keep civil-parish and bus-corridor context outside specification and recheck transport before using it for orientation.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        local: `Shilton's Rural Village classification and the ONS parish name do not show that a door is uPVC, composite or multipoint. Ask for direct evidence from the stated opening, including handle, key, frame and open-or-closed behaviour. Capture faceplate markings and locking-point movement and distinguish safe observations from the caller's report rather than treating one symptom as diagnosis.`,
        decision: `A service 74 stop listing can help distinguish the place only after it is rechecked; it cannot diagnose a mechanism or prove access to a property. Keep the time-sensitive transport record separate from the repair assessment. Confirm centres, backset, locking layout and readable codes before proposing a multipoint component, with cylinder fit and frame condition documented independently. Retain the faceplate evidence supporting that shortlist.`,
        checks: [
          `Collect handle, key, frame and open-or-closed behaviour directly from the stated Shilton opening.`,
          `Recheck any service 74 reference and keep it outside mechanism diagnosis and property-access assumptions.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        local: `A damaged opening in Shilton must be identified by address and responsible controller, not Rural Village status or the broader parish name listed by ONS. The study and area profile provide no structural or boundary information for a property. Photograph and measure the specific opening, recording visible damage while leaving hidden condition and attachment suitability unconfirmed.`,
        decision: `If police have issued evidence-preservation instructions at the Shilton opening, follow them before inspecting the actual door or window and documenting any temporary proposal. Bus routes 74/74A/74B/74C are volatile orientation data and establish neither safe access, opening measurements, attachment suitability nor permission. Record intended temporary coverage, proposed attachment positions, compromised hardware and permanent repair outstanding, and recheck any transport reference before retaining it as locality context. Name the person responsible for that proposed scope.`,
        checks: [
          `Identify the Shilton address and responsible controller without relying on Rural Village or joint-parish labels.`,
          `Where police issue evidence-preservation instructions, follow them before recording the opening, access evidence and attachment permission.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        local: `Planning classification as a Rural Village cannot demonstrate security need or a current lock standard in Shilton. An upgrade requires the exact entrance, observed assembly and a documented objective from its authorised controller. Record frame, hinges, keeps, handles, lock engagement and cylinder fit where present, linking each proposal to a measured issue.`,
        decision: `Keep the ONS parish listing and live bus timetable out of product selection. If the transport reference is retained as locality context, verify it again and avoid implying that any address is near a stop or covered. State product evidence, dimensions, retained hardware and exclusions, with any customer or policy requirement sourced independently of transport and settlement classification. Record the observed weakness addressed by each item and identify the source of every external criterion.`,
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
      {
        text: `Warwickshire County Council's parish and town council directory contains a specific record for Brinklow Parish Council.`,
        sourceIds: ['wcc-brinklow-parish-council'],
        serviceRelevance: `This verifies the named parish administration only; it does not establish a property boundary, access authority, hardware or service conditions.`,
      },
    ],
    sourceIds: ['rbc-brinklow-plan-page', 'rbc-brinklow-conservation', 'wcc-brinklow-parish-council'],
    factOnlySourceIds: ['wcc-brinklow-parish-council'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Brinklow's conservation designation covers only part of the village, and Ell Lane's link toward the motte-and-bailey castle is historical orientation rather than an entrance instruction. Obtain the complete property address and controlled doorway. Record any common access and the private threshold requested, using the historic route only to clarify the caller's description after the address is supplied.`,
        decision: `The made neighbourhood plan does not prove occupation, while a castle or Ell Lane reference cannot identify authority or a usable approach. Verify the requester against the stated premises and keep public historic context separate. Inspect the actual lock, door, frame and hinges before explaining the supported access scope and expected charge to the authorised caller. Record which threshold that verified authority covers.`,
        checks: [
          `Obtain the complete property address and doorway and use Ell Lane or the castle only for orientation.`,
          `Verify the requester at the stated premises without deriving authority or an approach from historic context.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `A visible replacement in Brinklow requires an exact check against the current partial conservation boundary. Being in the village, on Ell Lane or near the castle reference does not itself confirm designation or listed status. Define whether the proposed work stays within existing hardware or changes outward material, treating the map as an address-and-scope prompt rather than automatic consent advice.`,
        decision: `The made plan cannot select hardware or permit alteration. Inspect the individual entrance, obtain the authorised customer's requirement and verify any property-specific conservation, landlord or manager condition before changing visible components; consider listed-building consent only where the proposal would affect special character. Record retained parts, measured replacement, keys, fitting and adjustment, keeping the castle and plan context outside compatibility. Identify and date each controlling source.`,
        checks: [
          `Check the exact address against the current partial boundary and verify listed status separately.`,
          `Inspect the entrance and obtain the authorised requirement plus applicable conservation, landlord or manager conditions.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Brinklow's plan and conservation appraisal do not show that a door is uPVC or multipoint, and historic Ell Lane context says nothing about current construction. Collect direct material and operating evidence from the exact opening. Photograph the full faceplate and record key, handle and locking-point behaviour, marking any safe open-door comparison as observed evidence rather than component diagnosis.`,
        decision: `If the address is inside the current conservation boundary, that may prompt a permission question for visible remedial work but cannot diagnose a fault. The castle route description must not influence mechanism selection or access claims. Confirm centres, backset, strip layout and readable codes before proposing a part, with cylinder size and frame adjustment recorded separately. Preserve the markings supporting the component shortlist.`,
        checks: [
          `Collect material and operating evidence from the exact opening without inferring construction from Ell Lane history.`,
          `Diagnose first, then check current conservation permission for visible work and exclude the castle route from decisions.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged Brinklow opening must be placed inside or outside the current partial conservation boundary using its exact address. Ell Lane and the motte-and-bailey reference supply no ownership, structure, safe-access or attachment evidence. Photograph the opening and visible surrounding damage while leaving hidden material and support suitability to direct inspection.`,
        decision: `Where police have issued forensic-preservation instructions, follow them before confirming the responsible party and any property-status constraint for external temporary securing. Made-plan status does not authorise work or disclose the door or window's dimensions, materials or attachment suitability. Record observed opening measurements, intended temporary coverage, proposed attachment positions, compromised locks and later glazing, joinery or door work, keeping the boundary result distinct from physical feasibility. Name who approved those proposed attachment locations.`,
        checks: [
          `Place the opening against the current partial boundary and establish ownership, structure and access directly.`,
          `Where police issue evidence-preservation instructions, follow them before verifying the controller and recording opening measurements.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Neighbourhood-plan adoption, partial conservation designation and historic route context cannot demonstrate a security need in Brinklow. Begin with the actual entrance and a documented owner, occupier or manager objective instead. Record frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable, connecting each option to an observed weakness. Describe which inspected entrance and customer objective govern the comparison.`,
        decision: `Check current conservation and listed status at the precise address, using the map only to identify questions and considering listed-building consent only where the proposal would affect special character. Do not transfer Ell Lane or castle history into a product standard, risk claim or assumption about existing hardware. State product evidence, measurements, retained components and exclusions, leaving heritage and policy questions separately attributable. Tie every proposed item to its recorded doorway observation.`,
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
      {
        text: `The Department for Education records Southam Primary School at St James Road, Southam, CV47 0QB.`,
        sourceIds: ['dfe-southam-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['sdc-southam-plan-page', 'sdc-conservation-h-z', 'sdc-conservation-review-2026', 'dfe-southam-primary'],
    factOnlySourceIds: ['dfe-southam-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Southam's made neighbourhood plan and conservation-area records operate at different scales, while 2026 appraisal work remains review material. A lockout requires the complete property address and exact doorway rather than either planning label. Record any common entrance and the private threshold requested, preserving the distinction between current formal records and draft appraisal context.`,
        decision: `Current or draft conservation context cannot verify occupation or permission to enter. Confirm the requester at the stated premises and do not use scheduled consultation, review status or a broad plan area as authority. Inspect the confirmed lock, door, frame and hinges before explaining the supported access work and expected charge, keeping review material outside the method decision. Record the precise threshold and who verified authority for it.`,
        checks: [
          `Record the complete property address and doorway and keep the made plan distinct from 2026 review material.`,
          `Verify the requester at the premises without treating consultation, review status or plan extent as authority.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `For visible replacement in Southam, consult the latest formally published conservation boundary and individual property record. Do not treat documents in the 2026 appraisal review as adopted changes or assume the whole neighbourhood-plan area is designated. Define whether the work remains within existing hardware or affects outward material, using the current map only as an address-and-scope prompt.`,
        decision: `The made plan provides planning weight but no lock specification or customer permission. Inspect the actual door, obtain the authorised objective and verify current conservation or management controls separately before alteration; consider listed-building consent only where the proposal would affect special character. Record observed condition, retained components, measured replacement, keys and adjustment, leaving draft and adopted planning evidence outside compatibility. Identify who supplied and approved each external requirement.`,
        checks: [
          `Use the latest formal boundary and property record and do not treat 2026 review documents as adopted.`,
          `Inspect the door and verify the authorised objective and current conservation, listing or management controls separately.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither Southam's made plan nor its conservation review establishes uPVC, composite or multipoint construction at an address. Diagnose from direct handle, key, frame and locking-point evidence, not from current or draft planning documents. Photograph the full faceplate and mark any safe open-versus-closed comparison as observed, reported or not tested rather than assigning a failure remotely.`,
        decision: `If visible repair could affect controlled fabric, check the present formal boundary and property status after identifying the mechanism. A scheduled consultation cannot be treated as an adopted constraint or as proof about the door. Confirm centres, backset, locking layout and readable codes before proposing a part, with cylinder fit and frame condition documented separately. Preserve the faceplate evidence and measurements supporting the compatible shortlist.`,
        checks: [
          `Diagnose from direct handle, key, frame and locking-point evidence rather than current or draft planning documents.`,
          `Identify the mechanism first, then use present formal records for any controlled-fabric permission check.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged Southam opening needs exact address-level status because neighbourhood-plan extent, current conservation boundaries and 2026 review proposals are not interchangeable. Identify the scene and responsible controller before temporary work. Photograph the exposed opening and visible surrounding damage, leaving hidden condition and support suitability unconfirmed for inspection. Distinguish current mapped status from the review proposal in the scene record.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before using current formal records to identify any property-specific question about an external attachment; do not treat drafts as adopted policy. The sources provide no structural detail, ownership authority, attachment suitability or temporary securing method. Record observed opening measurements, intended coverage, proposed attachment positions, compromised locks and permanent repair outstanding, separating current property evidence from physical feasibility and naming the person who approves the temporary scope.`,
        checks: [
          `Resolve the exact address, scene and controller across plan extent, current boundaries and separate review proposals.`,
          `Where police issue evidence-preservation instructions, follow them before checking current records and inspecting the opening.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Plan adoption and conservation-appraisal review cannot demonstrate security need or a current lock standard in Southam. Start with the individual entrance and written objective, keeping draft planning work outside the product decision. Record frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable, relating every proposal to an inspected weakness.`,
        decision: `Resolve the latest formal conservation boundary, listed status and property management rules only for the supplied address, using the map as a question prompt rather than automatic consent advice. Consider listed-building consent only where the proposal would affect special character, without claiming that the 2026 review has already altered controls. State product evidence, measured dimensions, retained hardware and exclusions, keeping adopted, draft, management and technical records distinct. Link every option to a recorded entrance weakness.`,
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
      `Studley's Parish Plan and Action Plan has a council-recorded adoption date of February 2017. The council also records the whole civil parish as a designated neighbourhood area and publishes the associated confirmation documents.`,
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
      {
        text: `The Department for Education records Studley Infants' School at High Street, Studley, B80 7HJ.`,
        sourceIds: ['dfe-studley-infants'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['sdc-parish-plans', 'sdc-studley-area-report', 'sdc-designated-neighbourhood-areas', 'dfe-studley-infants'],
    factOnlySourceIds: ['dfe-studley-infants'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Studley's whole-parish neighbourhood-area designation locates a planning process but does not identify an address or adopted development plan. Obtain the full property and doorway, describing the 2017 document only as a Parish Plan and Action Plan. Record any shared access and the private threshold requested, using the area designation solely to state the documented planning stage accurately.`,
        decision: `Neither parish-plan adoption nor area designation verifies occupation or entry authority. Confirm the requester at the stated premises and keep later plan status outside the access decision. Inspect the named lock with the door, frame and hinges and explain the supported opening scope and anticipated charge from current physical evidence. Record the exact threshold, the requester's relationship to it and who completed the authority check.`,
        checks: [
          `Obtain the full property and doorway and describe the 2017 records only as a Parish Plan and Action Plan.`,
          `Verify the requester at the premises and keep neighbourhood-area or later plan status outside access authority.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `A Studley replacement decision must not turn planning-stage records into a hardware requirement. The 2017 parish plan and whole-parish area designation cannot identify existing hardware or approve alteration. Define the reason for change and document the current lock, door and frame, distinguishing retained components and shared-system exclusions before comparing options.`,
        decision: `Inspect the exact entrance and obtain the responsible customer's objective and any property-specific approval. If a later council record explicitly makes a plan, review it then; until that point the made-plan flag remains false. The schedule should name the observed condition, retained hardware, measured replacement details, keys, fitting and adjustment, keeping future plan status outside compatibility. Identify the source of the objective and the person approving the final scope, and date that approval.`,
        checks: [
          `Inspect the exact entrance and do not derive hardware requirements from parish-plan or area-designation records.`,
          `Obtain the responsible customer's objective and property approval while retaining the council-recorded planning stage.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `A Parish Plan, Action Plan and designated neighbourhood area say nothing about whether a Studley door is uPVC or multipoint. Record the affected opening and direct handle, key and frame symptoms without turning plan status into a mechanism claim. Include faceplate markings, locking-point movement and any safely observed open-door difference, labelling the sequence as evidence for inspection rather than cause.`,
        decision: `The whole-civil-parish application is boundary-process evidence, not a mechanism diagnosis or property permission. Keep plan status accurate and make the repair decision solely from the observed door and authorised instruction. Confirm centres, backset, strip layout and readable codes before proposing a part, with cylinder size and frame condition kept as separate findings. Preserve the markings supporting that component shortlist and note the legible code.`,
        checks: [
          `Record the affected opening and direct handle, key and frame symptoms without using planning-stage records diagnostically.`,
          `Base repair solely on the observed door and authorised instruction while preserving the accurate planning status.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `For a damaged Studley opening, the exact building, scene and controller matter; a whole-parish neighbourhood-area designation supplies none of them. Describe the 2017 parish documents by their published titles. Photograph and measure the individual opening, recording visible damage while leaving hidden material and attachment suitability to direct inspection. Separate the observed opening condition from the caller's incident account.`,
        decision: `Where police have issued evidence-preservation instructions, follow them before inspecting the opening and documenting the proposed temporary extent for its authorised controller. The designated-area report and register provide no ownership, safe access, construction detail, attachment suitability or consent. Record intended temporary coverage, observed opening measurements, proposed attachment positions, compromised hardware and permanent repair outstanding, keeping process-stage evidence outside the physical decision and naming the person responsible for that proposal.`,
        checks: [
          `Identify the exact building, scene and controller and retain the published titles of the 2017 parish documents.`,
          `Where police issue evidence-preservation instructions, follow them before verifying ownership, access and proposed attachment permission.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Studley's parish documents and neighbourhood-area designation cannot demonstrate security need or an upgrade standard. Begin with the individual entrance and documented objective, keeping planning-stage records outside the specification. Record frame, hinges, keeps, handles, lock engagement and cylinder fit where present, tying each option to a measured issue. Name the supplied objective and the entrance component it concerns.`,
        decision: `Any product and permission decision must follow the observed door and exact property controls, not planning-process status. Revisit the evidence only if a later council source clearly records a neighbourhood development plan as made. State product evidence, dimensions, retained components and exclusions, preserving the difference between a current customer requirement and a future planning record. Attribute each external criterion to its current source.`,
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
      {
        text: `The Department for Education records Our Lady's Catholic Primary School at St Faith's Road, Alcester, B49 6AG.`,
        sourceIds: ['dfe-alcester-our-ladys-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
    ],
    sourceIds: ['sdc-alcester-plan-page', 'sdc-conservation-a-g', 'dfe-alcester-our-ladys-primary'],
    factOnlySourceIds: ['dfe-alcester-our-ladys-primary'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        local: `Alcester's 2021 made plan, later review consultation and conservation boundary are different records, none of which identifies a controlled doorway. Obtain the complete address and do not present draft review material as a newly adopted plan. Record any shared entrance and the private threshold requested, using each source only for the status and geography it actually establishes.`,
        decision: `Current planning or conservation status cannot verify occupation or entry rights. Confirm the requester at the specified premises, using the 2021 plan only for planning context and the conservation map only after address resolution. Inspect the actual lock, door, frame and hinges before explaining the supported access work and expected charge, leaving review consultation outside method. Record the threshold covered by that verified authority.`,
        checks: [
          `Record the complete address and doorway and keep the 2021 made plan distinct from draft review material.`,
          `Verify the requester at the premises and use the conservation map only after resolving the address.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        local: `The 2021 plan remains the made evidence while Alcester's review proceeds, and a visible replacement requires the current conservation boundary rather than a town-wide assumption. Check listed status and building-specific approval independently. Define whether the work remains within existing hardware or changes outward material, treating the map as an address-and-scope prompt rather than blanket consent advice.`,
        decision: `Review consultation does not select hardware or alter the authority needed for a lock change. Inspect the entrance, record the responsible customer's specification and keep draft policy, adopted policy and property consent clearly separated. Consider listed-building consent only where the proposed alteration would affect special character. Record observed condition, retained components, measured replacement, keys, fitting and adjustment, with review status excluded from technical compatibility and the approving party identified.`,
        checks: [
          `Use the current boundary and verify listed status and building approval without generalising across Alcester.`,
          `Inspect the entrance and separate the customer's specification, 2021 adopted policy, draft review and property consent.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        local: `Neither Alcester's made plan, ongoing review nor conservation appraisal shows that a particular door is uPVC or multipoint. Identify the actual material and handle, key, frame and locking-point behaviour from direct evidence. Photograph the full faceplate and mark any safe open-versus-closed comparison as observed, reported or not tested instead of assigning a failed component.`,
        decision: `A current conservation boundary may prompt permission checks if visible repair affects controlled fabric, but cannot diagnose the fault. Do not treat review consultation as adopted change or as evidence about the entrance. Confirm centres, backset, locking layout and readable codes before proposing a part, documenting cylinder fit and frame condition separately. Preserve faceplate photographs and measured identifiers supporting the compatible component shortlist, and mark any unreadable code.`,
        checks: [
          `Identify material and handle, key, frame and locking-point behaviour directly from the particular door.`,
          `Diagnose first, then check current conservation permission for visible work without treating review consultation as adopted.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        local: `A damaged Alcester opening needs exact mapping against the current conservation boundary and individual property record. The made plan and review consultation do not establish ownership, scene status, building construction or attachment rights. Photograph the exposed opening and visible surrounding damage while leaving hidden condition and support suitability for direct inspection.`,
        decision: `Where police have issued forensic-preservation instructions, follow them before inspecting the opening and confirming any property-specific approval for external temporary security. Use the 2021 plan as current adopted context until the authority records a replacement as made. Record intended coverage, observed opening measurements, proposed attachment positions, compromised locks and later glazing, joinery or door work, separating current policy status from temporary feasibility and leaving attachment suitability to direct inspection.`,
        checks: [
          `Map the opening against the current boundary and verify ownership, scene and construction at the property.`,
          `Where police issue evidence-preservation instructions, follow them before obtaining property-specific attachment approval.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        local: `Plan adoption, review consultation and conservation appraisal cannot demonstrate security need or set a lock standard across Alcester. An upgrade requires the actual entrance and a documented objective from the person authorised to control it. Record frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable, linking each proposal to an observed weakness.`,
        decision: `Resolve current conservation and management questions for the supplied property before visible alteration, using mapping as an address-and-scope prompt rather than automatic consent advice. Consider listed-building consent only where the proposal would affect special character. Review material must remain labelled draft, and compatible product selection must follow inspection rather than future-policy assumptions. State product evidence, measured dimensions, retained hardware and exclusions, keeping draft, adopted, property and technical decisions independently attributable. Link each proposed item to its recorded doorway weakness.`,
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
