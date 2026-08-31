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

const PROMOTION_REVIEWED_ON = '2026-08-30'
const CURRENT_PROMOTION_REVIEWED_ON = '2026-08-31'

interface PairContext {
  localFactIndexes: number[]
  heading?: string
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
  reviewedOn?: string
  contexts: Record<ServiceAreaSlug, PairContext>
}

function localitySource(
  id: string,
  title: string,
  publisher: string,
  url: string,
  supports: string,
  kind: AreaGuideSource['kind'] = 'locality',
  checkedOn: string = EVIDENCE_REVIEWED_ON,
): AreaGuideSource {
  return { id, title, publisher, url, supports, checkedOn, kind }
}

const LOCALITY_SOURCES: Record<string, AreaGuideSource> = {
  'wdc-leamington-plan-page': localitySource('wdc-leamington-plan-page', 'Royal Leamington Spa neighbourhood plan', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1096/royal_leamington_spa', 'The made date, legal planning status and application of the Royal Leamington Spa neighbourhood plan.'),
  'wdc-leamington-plan': localitySource('wdc-leamington-plan', 'Royal Leamington Spa Neighbourhood Plan, June 2020', 'Warwick District Council (host; Royal Leamington Spa Town Council plan)', 'https://www.warwickdc.gov.uk/download/downloads/id/6087/final_rlsndp_for_referendum.pdf', 'The River Leam spatial description and named Milverton, Lillington and Sydenham planning features.'),
  'wdc-leamington-conservation': localitySource('wdc-leamington-conservation', 'A Guide to Conservation Areas: Royal Leamington Spa Conservation Area', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/3081/leamington_-_guide_to_conservation_areas.pdf', 'The mapped Leamington designation and its named New Milverton and Lillington character areas.', 'property-status'),
  'warwick-district-conservation': localitySource('warwick-district-conservation', 'Conservation', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20377/conservation', 'Property-status checks and conservation-area appraisals for Leamington Spa, Warwick and Kenilworth.', 'property-status'),
  'wdc-local-plan': localitySource('wdc-local-plan', 'Warwick District Local Plan 2011-2029, adopted September 2017', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/4623/new_local_plan.pdf', 'The adopted settlement hierarchy, named local centres and conservation-area table for Warwick District.'),
  'wdc-whitnash-plan-page': localitySource('wdc-whitnash-plan-page', 'Whitnash neighbourhood plan', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/964/whitnash_neighbourhood_plan', 'The referendum date and date on which the Whitnash plan was brought into legal force.'),
  'wdc-monitoring-report-2024-25': localitySource('wdc-monitoring-report-2024-25', 'Authority Monitoring Report 2024-25', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/9326/authority_monitoring_report_2024-25.pdf', 'The dated completion and not-started status recorded for elements of Lower Heathcote Local Centre.'),
  'wdc-tachbrook-park': localitySource('wdc-tachbrook-park', 'Facilities planned within the park: Tachbrook Country Park development', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20311/our_parks/2125/tachbrook_country_park_development/3', 'The planned north-west play area described by the council as the Heathcote area.'),
  'wdc-heathcote-community-centre-guide': localitySource('wdc-heathcote-community-centre-guide', 'Your guide to local services in Warwick District', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/9125/guide_to_local_services_booklet.pdf', 'The official guide identifies Heathcote Community Centre at Cressida Close, Heathcote, Warwick, CV34 6DZ.', 'locality', CURRENT_PROMOTION_REVIEWED_ON),
  'wdc-warwick-conservation': localitySource('wdc-warwick-conservation', 'A Guide to Conservation Areas: Warwick Conservation Area', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/3082/warwick_-_guide_to_conservation_areas.pdf', 'The mapped Warwick designation and its fifteen named character sections.', 'property-status'),
  'wcc-warwick-library': localitySource('wcc-warwick-library', 'Warwick Library and Information Centre', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/warwicklibrary', 'The current county page identifies Warwick Library and Information Centre at Shire Hall, Warwick, CV34 4RL.', 'locality', CURRENT_PROMOTION_REVIEWED_ON),
  'wdc-community-parks': localitySource('wdc-community-parks', 'Community parks', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20245/parks_and_green_spaces/215/community_parks', 'The council park records and named access points for Woodloes Park, Chase Meadow and Warwick Gates.'),
  'wdc-asset-list-2026': localitySource('wdc-asset-list-2026', 'Land and building assets, January 2026', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/7190/warwick_district_council_asset_list_pdf.pdf', 'The council register records Lillington Community Centre, the Canalside play area and Chase Meadow Community Centre and states the council interest in each as freehold.', 'property-status', PROMOTION_REVIEWED_ON),
  'wcc-lillington-library': localitySource('wcc-lillington-library', 'Lillington Library and Information Centre', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/lillingtonlibrary', 'The current county page identifies the managed library at Valley Road, Lillington, CV32 7SJ.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-lillington-library-1420766': localitySource('historic-england-lillington-library-1420766', 'Lillington Library, list entry 1420766', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1420766?section=official-list-entry', 'The official list entry identifies the Valley Road library at its statutory address as a Grade II listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'charity-commission-woodloes-park-community-centre-511957': localitySource('charity-commission-woodloes-park-community-centre-511957', 'Woodloes Park Community Centre, charity 511957', 'Charity Commission for England and Wales', 'https://register-of-charities.charitycommission.gov.uk/en/constituency-search/-/charity-details/511957/full-print', 'The current register identifies the community-centre charity and its Woodloes Park Estate area of benefit while stating that it does not own or lease land or property.', 'property-status', PROMOTION_REVIEWED_ON),
  'chase-meadow-community-centre': localitySource('chase-meadow-community-centre', 'How to find us', 'Chase Meadow Community Centre', 'https://www.chasemeadowcc.co.uk/find-us/', 'The centre\'s current directions page gives its visit address as Narrow Hall Meadow, Warwick, CV34 6BT.', 'locality', PROMOTION_REVIEWED_ON),
  'charity-commission-chase-meadow-community-centre-1156393': localitySource('charity-commission-chase-meadow-community-centre-1156393', 'Chase Meadow Community Centre Ltd, charity 1156393', 'Charity Commission for England and Wales', 'https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5044193/governance', 'The current governance record identifies the charitable company and states that it does not own or lease land or property.', 'property-status', PROMOTION_REVIEWED_ON),
  'nhs-chase-meadow-health-centre': localitySource('nhs-chase-meadow-health-centre', 'Chase Meadow Health Centre', 'NHS', 'https://www.nhs.uk/services/gp-surgery/chase-meadow-health-centre/M84063', 'The current NHS service record identifies the surgery at The New Dispensary, 2 Alder Meadow, Warwick, CV34 6JY.', 'locality', PROMOTION_REVIEWED_ON),
  'sdc-stratford-plan-page': localitySource('sdc-stratford-plan-page', 'Stratford-upon-Avon Neighbourhood Plan', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/stratford-upon-avon-neighbourhood-plan.cfm', 'The made date and current development-plan status of the Stratford-upon-Avon neighbourhood plan.'),
  'sdc-stratford-made-plan': localitySource('sdc-stratford-made-plan', 'Stratford-upon-Avon Neighbourhood Development Plan 2011-2031, made version', 'Stratford-on-Avon District Council (host; Stratford-upon-Avon Town Council plan)', 'https://www.stratford.gov.uk/doc/208868/name/Stratford-upon-Avon%20made%20Neighbourhood%20Plan.pdf', 'The River Avon corridor, Tiddington, Bishopton and Shottery policies and site descriptions in the made plan.'),
  'sdc-stratford-park-and-ride': localitySource('sdc-stratford-park-and-ride', 'Stratford-upon-Avon Park and Ride', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/parking-roads-transport/park-and-ride.cfm', 'The current council page identifies the Park and Ride off Bishopton Lane, its CV37 0RJ postcode, more than 700 spaces and passenger terminal.', 'locality', PROMOTION_REVIEWED_ON),
  'charity-commission-bishopton-community-centre-1188894': localitySource('charity-commission-bishopton-community-centre-1188894', 'Bishopton Community Centre CIO, charity 1188894', 'Charity Commission for England and Wales', 'https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5158655/full-print', 'The current register records the CIO, its purpose to rent the Drayton Avenue community centre from Warwickshire County Council and hire the hall to local groups.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-tiddington-roman-settlement-1003741': localitySource('historic-england-tiddington-roman-settlement-1003741', 'Tiddington Roman Settlement, list entry 1003741', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1003741?section=official-list-entry', 'The official list entry identifies the scheduled monument, its Tiddington Road statutory address and its buried Romano-British settlement remains.', 'property-status', PROMOTION_REVIEWED_ON),
  'charity-commission-tiddington-community-centre-1093526': localitySource('charity-commission-tiddington-community-centre-1093526', 'Tiddington Community Centre, charity 1093526', 'Charity Commission for England and Wales', 'https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/3986912/full-print', 'The current register records the community-centre charity, its community-management purpose and a contact address at Touchwood, Beeches Walk.', 'locality', PROMOTION_REVIEWED_ON),
  'sdc-conservation-h-z': localitySource('sdc-conservation-h-z', 'Conservation Areas H-Z', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/conservation-areas-h-z.cfm', 'Published conservation-area maps, reports and appraisal documents for Stratford-upon-Avon and Southam.', 'property-status'),
  'sdc-conservation-review-2026': localitySource('sdc-conservation-review-2026', 'Conservation Area Reviews 2026', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/conservation-areas.cfm', 'The council-commissioned review of eight conservation-area appraisals, including Stratford-upon-Avon and Southam, with formal consultation in 2026.', 'property-status'),
  'sdc-shottery-conservation': localitySource('sdc-shottery-conservation', 'Shottery Conservation Area report', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/doc/175565/name/Shottery.pdf', 'Shottery Conservation Area designation and formal appraisal dates.', 'property-status'),
  'historic-england-anne-hathaways-cottage-1298551': localitySource('historic-england-anne-hathaways-cottage-1298551', "Anne Hathaway's Cottage, list entry 1298551", 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1298551', "The official list entry identifies Anne Hathaway's Cottage on Cottage Lane, Shottery, as a Grade I listed building.", 'property-status', CURRENT_PROMOTION_REVIEWED_ON),
  'wdc-kenilworth-plan-page': localitySource('wdc-kenilworth-plan-page', 'Kenilworth neighbourhood plan', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1006/kenilworth_neighbourhood_plan', 'The referendum, made date and planning use of the Kenilworth neighbourhood plan.'),
  'wdc-kenilworth-conservation': localitySource('wdc-kenilworth-conservation', 'A Guide to Conservation Areas: Kenilworth Conservation Area', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/3080/kenilworth_-_guide_to_conservation_areas.pdf', 'Kenilworth conservation-area designation history and the named 2005 extensions.', 'property-status'),
  'wcc-kenilworth-library': localitySource('wcc-kenilworth-library', 'Kenilworth Library and Information Centre', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/kenilworthlibrary', 'The current county page identifies Kenilworth Library and Information Centre at Smalley Place, Kenilworth, CV8 1QG.', 'locality', CURRENT_PROMOTION_REVIEWED_ON),
  'solihull-balsall-plan-page': localitySource('solihull-balsall-plan-page', 'Balsall Neighbourhood Plan', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/balsall-neighbourhood-plan', 'The made date and decision-making role of the Balsall Parish neighbourhood plan.', 'locality', PROMOTION_REVIEWED_ON),
  'solihull-balsall-made-plan': localitySource('solihull-balsall-made-plan', 'Balsall Parish Neighbourhood Development Plan 2018-2033', 'Solihull Metropolitan Borough Council (host; Balsall Parish Council plan)', 'https://www.solihull.gov.uk/sites/default/files/2021-06/Balsall-Parish-Neighbourhood-Development-Plan.pdf', 'The cross-parish extent of Balsall Common and the plan limit to the Balsall-parish portion.', 'locality', PROMOTION_REVIEWED_ON),
  'solihull-balsall-library': localitySource('solihull-balsall-library', 'Balsall Common Library', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/libraries/balsall-common-library', 'The current council page identifies Balsall Common Library at 283 Kenilworth Road, Balsall Common, Coventry, CV7 7EL.', 'locality', PROMOTION_REVIEWED_ON),
  'solihull-meriden-plan-page': localitySource('solihull-meriden-plan-page', 'Meriden Neighbourhood Plan', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/meriden-neighbourhood-plan', 'The referendum, made date and decision-making role of the Meriden Parish neighbourhood plan.'),
  'solihull-conservation-areas': localitySource('solihull-conservation-areas', 'Conservation Areas', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/conservation-areas', 'The council register entries for Meriden Green and Meriden Hill Conservation Areas.', 'property-status'),
  'solihull-meriden-library': localitySource('solihull-meriden-library', 'Meriden Library', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/libraries/meriden-library', 'The current council page identifies Meriden Library at Arden Cottage, The Green, Meriden, CV7 7LN.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-meriden-church-1031828': localitySource('historic-england-meriden-church-1031828', 'Church of St Lawrence, list entry 1031828', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1031828?section=official-list-entry', 'The official list entry identifies the Church of St Lawrence on Church Lane, Meriden, as a Grade I listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'solihull-hampton-plan-page': localitySource('solihull-hampton-plan-page', 'Hampton-in-Arden neighbourhood plan', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/hampton-arden-neighbourhood-plan', 'The continuing scope of the 2017 plan and withdrawal of the newer submission draft.'),
  'solihull-hampton-history': localitySource('solihull-hampton-history', 'Hampton in Arden history', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/about-solihull/hampton-arden-history', 'The council statement that central Hampton-in-Arden was designated a conservation area in 1968.', 'property-status'),
  'solihull-hampton-library': localitySource('solihull-hampton-library', 'Hampton-in-Arden Library', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/libraries/hampton-arden-library', 'The current council library page identifies the Hampton-in-Arden Library at 39 Fentham Road, Hampton in Arden, B92 0AY.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-hampton-church-1055777': localitySource('historic-england-hampton-church-1055777', 'Church of Saint Mary and Saint Bartholomew, list entry 1055777', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1055777?section=official-list-entry', 'The official list entry identifies the High Street church in Hampton in Arden as a Grade I listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'rbc-wolston-conservation': localitySource('rbc-wolston-conservation', 'Wolston Conservation Area Character Appraisal', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6569677/Wolston_Character_Appraisal.pdf/bc559f87-8d33-e741-9b96-c4797248699b?t=1750866416447', 'The limited conservation area, River Avon relationship and railway bridge separating Wolston and Brandon.', 'property-status', PROMOTION_REVIEWED_ON),
  'rbc-wolston-plan-page': localitySource('rbc-wolston-plan-page', 'Wolston Neighbourhood Plan', 'Rugby Borough Council', 'https://www.rugby.gov.uk/w/wolston-neighbourhood-plan', 'The neighbourhood-area designation, Call for Sites and November 2024 screening determination records published by the council.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-wolston-st-margaret-1185682': localitySource('historic-england-wolston-st-margaret-1185682', 'Church of St Margaret, list entry 1185682', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1185682', 'The official list entry identifies the Church of St Margaret on Main Street, Wolston, as a Grade I listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'rbc-ryton-plan-page': localitySource('rbc-ryton-plan-page', 'Ryton-on-Dunsmore Neighbourhood Plan: plan adoption', 'Rugby Borough Council', 'https://www.rugby.gov.uk/pl/w/ryton-on-dunsmore-neighbourhood-plan-1', 'The made date and development-plan status of the Ryton-on-Dunsmore neighbourhood plan.'),
  'rbc-ryton-made-plan': localitySource('rbc-ryton-made-plan', 'Ryton-on-Dunsmore Neighbourhood Plan, adopted July 2021', 'Rugby Borough Council (host; Ryton-on-Dunsmore Parish Council plan)', 'https://www.rugby.gov.uk/documents/20124/6578033/Ryton_on_Dunsmore_Neighbourhood_Plan__adopted_version___July_2021_.pdf/e2fd154b-c7a7-2df7-ef14-5850fa003c6b?t=1750863717054', 'The civil-parish plan boundary, River Avon valley edges and Main Rural Settlement classification.'),
  'wdc-baginton-plan-page': localitySource('wdc-baginton-plan-page', 'Baginton and Bubbenhall neighbourhood plan', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1129/baginton_and_bubbenhall_neighbourhood_plan', 'The joint parish preparation and referendum result for the made Baginton and Bubbenhall plan.'),
  'coventry-lunt-roman-fort': localitySource('coventry-lunt-roman-fort', 'Lunt Roman Fort', 'Coventry City Council', 'https://www.coventry.gov.uk/directory-record/49594/lunt-roman-fort', 'The current council directory identifies Lunt Roman Fort at Coventry Road, Baginton, Coventry, CV8 3AJ.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-baginton-church-1116539': localitySource('historic-england-baginton-church-1116539', 'Church of Saint John the Baptist, list entry 1116539', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1116539?section=official-list-entry', 'The official list entry identifies the Church of Saint John the Baptist on Church Road, Baginton, as a Grade I listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'rbc-brandon-plan-page': localitySource('rbc-brandon-plan-page', 'Brandon and Bretford Neighbourhood Plan', 'Rugby Borough Council', 'https://www.rugby.gov.uk/w/brandon-and-bretford-neighbourhood-plan', 'The made date and development-plan status of the joint Brandon and Bretford neighbourhood plan.'),
  'rbc-brandon-conservation': localitySource('rbc-brandon-conservation', 'Brandon Conservation Area Character Appraisal', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6569677/Brandon_Character_Appraisal.pdf/9c7d8630-4654-dcde-6287-650846002cb2?t=1750866416443', 'The bounded Brandon conservation context north of Avondale Road and railway-viaduct approach.', 'property-status'),
  'wcc-brandon-hall-approved-venue': localitySource('wcc-brandon-hall-approved-venue', 'Brandon Hall Hotel', 'Warwickshire County Council', 'https://apps.warwickshire.gov.uk/ApprovedVenue/venues/10', 'The current county approved-venue record identifies Brandon Hall Hotel at Main Street, Brandon, CV8 3FW.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-avon-viaduct-1034898': localitySource('historic-england-avon-viaduct-1034898', 'Avon Viaduct, list entry 1034898', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1034898?section=official-list-entry', 'The official list entry records the Avon Viaduct in Brandon and Bretford civil parish as a Grade II listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'rbc-rural-study-2024': localitySource('rbc-rural-study-2024', 'Rugby Borough Council Rural Sustainability Study 2024', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/62894537/CD.3.10%2BAppendix%2B10%2BRugby%2BBorough%2BCouncil%2BRural%2BSustainability%2BStudy%2B2024.pdf/6837df18-54d6-0146-1910-37307fb4a34f?t=1774451299803', 'The council study classifies Shilton as a Rural Village.'),
  'ons-rugby-area-profile': localitySource('ons-rugby-area-profile', 'Rugby area profile', 'Office for National Statistics', 'https://www.ons.gov.uk/explore-local-statistics/areas/E07000220-rugby', 'The official Rugby area profile lists Shilton and Barnacle among the district\'s parishes.'),
  'wcc-shilton-bus': localitySource('wcc-shilton-bus', 'Bus service 74/74A/74B/74C', 'Warwickshire County Council', 'https://apps.warwickshire.gov.uk/BusTimetable/services/1379', 'The live county timetable listing Shilton on the Nuneaton and Coventry corridor.'),
  'rbc-shilton-village-hall-poll-2026': localitySource('rbc-shilton-village-hall-poll-2026', 'Notice of Poll: Wolvey and Shilton, 28 April 2026', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/63178156/Notice%2Bof%2BPoll%2B-%2BWolvey%2Band%2BShilton.pdf/7d4fb52e-8589-71dc-fe10-04a76e076296?t=1777367922287', 'The dated notice names Shilton Village Hall, Wood Lane, Shilton, as polling station 66.', 'locality', CURRENT_PROMOTION_REVIEWED_ON),
  'rbc-brinklow-plan-page': localitySource('rbc-brinklow-plan-page', 'Brinklow Neighbourhood Plan', 'Rugby Borough Council', 'https://www.rugby.gov.uk/w/brinklow-neighbourhood-plan', 'The made date and development-plan status of the Brinklow neighbourhood plan.'),
  'rbc-brinklow-conservation': localitySource('rbc-brinklow-conservation', 'Brinklow Conservation Area Character Appraisal', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6569677/Brinklow_Character_Appraisal.pdf/701c66c7-5596-39a8-e538-ab8daa4f699f?t=1750866416443', 'The partial-village conservation boundary and its inclusion of part of Ell Lane.', 'property-status'),
  'nhs-revel-surgery-brinklow-m84031': localitySource('nhs-revel-surgery-brinklow-m84031', 'Revel Surgery', 'NHS', 'https://www.nhs.uk/services/gp-surgery/revel-surgery/M84031', 'The current NHS service record identifies Revel Surgery at The Surgery, Barr Lane, Brinklow, Rugby, Warwickshire, CV23 0LU.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-brinklow-church-1034957': localitySource('historic-england-brinklow-church-1034957', 'Church of St John the Baptist, list entry 1034957', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1034957?section=official-list-entry', 'The official list entry identifies the Church of St John the Baptist on The Crescent, Brinklow, as a Grade II* listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'sdc-southam-plan-page': localitySource('sdc-southam-plan-page', 'Southam Neighbourhood Plan', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/southam-neighbourhood-plan.cfm', 'The made date and current development-plan role of the Southam neighbourhood plan.'),
  'wcc-southam-library': localitySource('wcc-southam-library', 'Southam Library and Information Centre', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/directory-record/591/southam-library-and-information-centre', 'The current county directory identifies Southam Library and Information Centre at Tithe Place, High Street, Southam, CV47 0HB.', 'locality', CURRENT_PROMOTION_REVIEWED_ON),
  'sdc-parish-plans': localitySource('sdc-parish-plans', 'List of Adopted Parish Plans', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/parish-plans-a-m.cfm', 'The February 2017 adoption entry for the Studley Parish Plan and Action Plan.'),
  'sdc-studley-area-report': localitySource('sdc-studley-area-report', 'Studley Neighbourhood Area Report, 17 January 2018', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/doc/207189/name/Studley%20NDP%20area%20report%20Leader%20of%20Council.pdf/', 'The Studley Parish Council application to designate the whole civil parish as its neighbourhood area.'),
  'wcc-studley-community-library': localitySource('wcc-studley-community-library', 'Studley Community Library', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/studleylibrary', 'The county page identifies Studley Community Library in Studley Village Hall, High Street, Studley, B80 7HJ, and says it is run by Studley Parish Council.', 'locality', CURRENT_PROMOTION_REVIEWED_ON),
  'sdc-designated-neighbourhood-areas': localitySource('sdc-designated-neighbourhood-areas', 'Designated Neighbourhood Plan Areas', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/designated-neighbourhood-plan-areas.cfm', 'The current Studley neighbourhood-area entry and linked confirmation documents.'),
  'sdc-alcester-plan-page': localitySource('sdc-alcester-plan-page', 'Alcester Neighbourhood Plan', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/alcester-neighbourhood-plan.cfm', 'The 2021 made plan and Town Council review consultation recorded from December 2025.'),
  'sdc-conservation-a-g': localitySource('sdc-conservation-a-g', 'Conservation Areas A-G', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/conservation-areas-a-g.cfm', 'The published Alcester Conservation Area map, broadsheet and two-part character appraisal.', 'property-status'),
  'wcc-alcester-library': localitySource('wcc-alcester-library', 'Alcester Library and Information Centre', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/alcesterlibrary', 'The current county page identifies Alcester Library and Information Centre at Globe House, Priory Road, Alcester, B49 5DZ.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-alcester-town-hall-1024606': localitySource('historic-england-alcester-town-hall-1024606', 'Alcester Town Hall, list entry 1024606', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1024606?section=official-list-entry', 'The official list entry identifies Alcester Town Hall on Henley Street as a Grade I listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'dfe-heathcote-primary': localitySource('dfe-heathcote-primary', 'Heathcote Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/144648', 'The official establishment name and Vickers Way, Heathcote address for this specific primary school.', 'locality', CURRENT_PROMOTION_REVIEWED_ON),
  'dfe-milverton-primary': localitySource('dfe-milverton-primary', 'Milverton Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125610', 'The official establishment name and Greatheed Road, Leamington Spa address for this specific primary school.', 'locality', CURRENT_PROMOTION_REVIEWED_ON),
  'historic-england-milverton-house-1381160': localitySource('historic-england-milverton-house-1381160', 'Milverton House, list entry 1381160', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1381160', 'The official list entry identifies Milverton House at its statutory Beauchamp Hill and Milverton Crescent addresses as a Grade II listed building.', 'property-status', CURRENT_PROMOTION_REVIEWED_ON),
  'dfe-sydenham-primary': localitySource('dfe-sydenham-primary', 'Sydenham Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/130868', 'The official establishment name and Calder Walk, Sydenham address for this specific primary school.', 'locality', PROMOTION_REVIEWED_ON),
  'charity-commission-sydenham-neighbourhood-initiatives-1077333': localitySource('charity-commission-sydenham-neighbourhood-initiatives-1077333', 'Sydenham Neighbourhood Initiatives Limited, charity 1077333', 'Charity Commission for England and Wales', 'https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/3951749/full-print', 'The current register describes the SYDNI Centre as a multicultural community centre and gives its Cottage Square contact address.', 'locality', PROMOTION_REVIEWED_ON),
  'wdc-sydenham-play-area': localitySource('wdc-sydenham-play-area', 'Children\'s play areas', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20245/parks/216/play_areas', 'The council list identifies Fallow Hill Play Area on Sydenham Drive among the play areas it maintains.', 'locality', PROMOTION_REVIEWED_ON),
  'dfe-whitnash-primary': localitySource('dfe-whitnash-primary', 'Whitnash Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125560', 'The official establishment name and Langley Road, Whitnash address for this specific primary school.'),
  'dfe-coten-end-primary': localitySource('dfe-coten-end-primary', 'Coten End Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/151505', 'The official establishment name and Coten End, Warwick address for this specific primary school.'),
  'wdc-warwick-gates-community-centre': localitySource('wdc-warwick-gates-community-centre', 'Warwick Gates Community Centre', 'Warwick District Council', 'https://www.warwickdc.gov.uk/directory_record/3052/warwick_gates_community_centre', 'The council facilities-directory record for the specifically named Warwick Gates Community Centre.'),
  'dfe-woodloes-primary': localitySource('dfe-woodloes-primary', 'Woodloes Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/141855', 'The official establishment name and Deansway, Woodloes Park Estate address for this specific primary school.', 'locality', PROMOTION_REVIEWED_ON),
  'dfe-alcester-our-ladys-primary': localitySource('dfe-alcester-our-ladys-primary', "Our Lady's Catholic Primary School", 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/143632', 'The official establishment name and St Faiths Road, Alcester address for this specific primary school.'),
  'dfe-balsall-common-primary': localitySource('dfe-balsall-common-primary', 'Balsall Common Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/138536', 'The official establishment name and Balsall Street East, Balsall Common address for this specific primary school.', 'locality', PROMOTION_REVIEWED_ON),
  'wcc-brandon-bretford-parish-council': localitySource('wcc-brandon-bretford-parish-council', 'Brandon & Bretford - Parish and town councils', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/directory-record/8635/brandon-bretford', 'The county directory record titled Brandon & Bretford and its link to Brandon and Bretford Parish Council.'),
  'wcc-brinklow-parish-council': localitySource('wcc-brinklow-parish-council', 'Brinklow - Parish and town councils', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/directory-record/8636/brinklow', 'The county directory entry for Brinklow Parish Council and its clerk contact record.'),
  'dfe-george-fentham-school': localitySource('dfe-george-fentham-school', 'George Fentham Endowed School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/104094', 'The official establishment name and Fentham Road, Hampton-in-Arden address for this specific primary school.'),
  'dfe-kenilworth-st-nicholas-primary': localitySource('dfe-kenilworth-st-nicholas-primary', 'St Nicholas CofE Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/151107', 'The official establishment name and The Blundells, Kenilworth address for this specific primary school.'),
  'dfe-ryton-provost-williams': localitySource('dfe-ryton-provost-williams', 'Ryton-On-Dunsmore Provost Williams Church of England Academy', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/149518', 'The official establishment name and Sodens Avenue, Ryton-on-Dunsmore address for this specific primary academy.'),
  'dfe-southam-primary': localitySource('dfe-southam-primary', 'Southam Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/143906', 'The official establishment name and St James Road, Southam address for this specific primary school.'),
  'dfe-studley-infants': localitySource('dfe-studley-infants', "Studley Infants' School", 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/148511', 'The official establishment name and High Street, Studley address for this specific infant school.'),
  'dfe-wolston-st-margarets': localitySource('dfe-wolston-st-margarets', "Wolston St Margaret's CofE Primary School", 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125676', 'The official establishment name and Brookside, Main Street, Wolston address for this specific primary school.', 'locality', PROMOTION_REVIEWED_ON),
  'dfe-bishopton-primary': localitySource('dfe-bishopton-primary', 'Bishopton Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125607', 'The official establishment name and Drayton Avenue, Stratford-upon-Avon address for this specific primary school.', 'locality', PROMOTION_REVIEWED_ON),
  'dfe-shottery-st-andrews': localitySource('dfe-shottery-st-andrews', "Shottery St Andrew's CofE Primary School", 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125646', 'The official establishment name and Hathaway Lane, Stratford-upon-Avon address for this specific primary school.'),
  'dfe-alveston-primary-tiddington': localitySource('dfe-alveston-primary-tiddington', 'Alveston CofE Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125623', 'The official establishment name and Knights Lane, Tiddington address for this specific primary school.', 'locality', PROMOTION_REVIEWED_ON),
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
    {
      question: areaName => `How is the price for emergency lockout work in ${areaName} confirmed?`,
      answer: `The caller should provide the complete address, affected entrance and observable symptoms. The expected method, scope and charge are explained from that information and confirmed against the inspected condition before work; any material change needs fresh agreement.`,
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
    {
      question: areaName => `Should a lock be changed after keys are lost in ${areaName}?`,
      answer: `Consider who may hold the missing keys, the required level of key control and the condition of the existing lock. Inspect the exact entrance before agreeing whether a cylinder, another component or the complete lock needs to be changed.`,
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
    {
      question: areaName => `Should I keep forcing a stiff uPVC door handle in ${areaName}?`,
      answer: `Stop if ordinary operation requires excessive force. Record how the handle, key and locking points behave with the door open and closed, then have the complete door set inspected before a repair or replacement is selected.`,
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
    {
      question: areaName => `Is emergency boarding up in ${areaName} a permanent repair?`,
      answer: `No. Boarding is a temporary measure intended to reduce immediate access and exposure. Permanent glazing, joinery, structural work and any lock replacement require separate assessment and authorisation.`,
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
    {
      question: areaName => `Why should multiple external doors in ${areaName} be checked individually?`,
      answer: `Different entrances can use different lock types, dimensions, functions and surrounding hardware. Inspect each affected door and compare compatible, independently certified options instead of applying one product choice to every opening.`,
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
    heading: context.heading ?? `${SERVICE_LABELS[service]} in ${seed.name}`,
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
    reviewedOn: seed.reviewedOn ?? EVIDENCE_REVIEWED_ON,
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
        heading: `Leamington Spa neighbourhood plan made in 2021`,
        text: `Warwick District Council made the Royal Leamington Spa Neighbourhood Development Plan on 12 May 2021 and uses it when considering planning applications in Leamington Spa.`,
        sourceIds: ['wdc-leamington-plan-page'],
        serviceRelevance: `Use the plan as official planning context only; it cannot establish an address, customer authority or locksmith requirement.`,
      },
      {
        heading: `River Leam divides north and south Leamington`,
        text: `The made plan says the River Leam flows through the town centre, separating north and south Royal Leamington Spa, with early development beginning on the southern bank.`,
        sourceIds: ['wdc-leamington-plan'],
        serviceRelevance: `Use the river distinction only as caller-confirmed orientation, never as evidence of route, travel time or service reach.`,
      },
      {
        heading: `Leamington conservation area's named character areas`,
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
        decision: `Where the supplied landmark falls within one of the mapped conservation character areas, that map still says nothing about occupation or access authority. Verify the requester against the particular premises before deciding how an urgent entry instruction may proceed. Inspect the opening, explain the supported method and provide the available price information before work. If the inspected condition changes the charge, obtain fresh agreement before that revised price applies; mapping cannot establish who may instruct entry or which method the lock permits.`,
        checks: [
          `Record the street, building number and doorway; use a caller-confirmed River Leam side only to disambiguate central location.`,
          `Check the requester against the premises; a conservation character-area match cannot establish occupation or authority.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        local: `Leamington's conservation guide divides the designation into character areas rather than applying one undifferentiated status to the town. For a visible lock change, resolve the address against the current map and then establish any building-specific or management approval. Record the reason or objective, such as a fault, damage or lost-key control, because only the inspected door and exact property record can support a repair, adjustment or replacement comparison.`,
        decision: `The neighbourhood plan's made status is planning evidence, not a replacement specification. Inspect the actual entrance, including the lock, door, frame, hinges and keep, before comparing repair with change. Capture readable faceplate or case markings and measure the backset, centres and cylinder dimensions where relevant to compatibility. Keep conservation and separately verified listed status outside the technical decision, documenting retained hardware, keys, fitting, adjustment and any visible fabric work as distinct parts of the authorised proposal.`,
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
    reviewedOn: CURRENT_PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish the bounded New Milverton conservation character area, the Northumberland Road allotments, Milverton Primary School on Greatheed Road and Grade II Milverton House at its statutory Beauchamp Hill and Milverton Crescent addresses.`,
      `Those records identify planning context and three exact sites only. They do not extend New Milverton status across the broader locality or establish a caller's building, entrance, authority, access arrangement, door construction, installed hardware or current condition.`,
    ],
    accessGuidance: `Record the complete Milverton address, building and exact private, shared or managed threshold. Distinguish New Milverton from its Rugby Road and Warwick New Road exclusions and distinguish the allotments, Greatheed Road school and Milverton House before identifying the present person authorised for the opening.`,
    evidenceLimits: `The conservation map, plan policy, school register and list entry cannot be generalised to neighbouring property. The Grade II designation applies only to Milverton House; none of the records proves a current occupier, keyholder, route, access permission, door material, lock mechanism, fault, demand, coverage or response time.`,
    facts: [
      {
        heading: `New Milverton conservation character area`,
        text: `The Royal Leamington Spa Conservation Area key map names New Milverton, excluding Rugby Road and Warwick New Road, as character area 30.`,
        sourceIds: ['wdc-leamington-conservation'],
        serviceRelevance: `Apply conservation wording only after confirming the address lies in that mapped character area rather than broader Milverton.`,
      },
      {
        heading: `Milverton New Allotments protected by plan policy`,
        text: `Neighbourhood Plan Policy RLS10 identifies the Northumberland Road Milverton New Allotments Association site as an allotment area protected in line with district policy.`,
        sourceIds: ['wdc-leamington-plan'],
        serviceRelevance: `Use the named site only as verified locality context, not evidence of proximity, access, property characteristics or work.`,
      },
      {
        heading: `Milverton Primary School on Greatheed Road`,
        text: `The Department for Education records Milverton Primary School as a specific establishment at Greatheed Road, Leamington Spa, CV32 6ES.`,
        sourceIds: ['dfe-milverton-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
      {
        heading: `Grade II Milverton House`,
        text: `Historic England lists Milverton House at its statutory addresses, Milverton House, 11 Beauchamp Hill and Milverton House, Milverton Crescent, at Grade II under entry 1381160.`,
        sourceIds: ['historic-england-milverton-house-1381160'],
        serviceRelevance: `Apply this designation only to the listed asset; it does not establish current use, condition, controller, access, hardware or consent for an unspecified proposal.`,
      },
    ],
    sourceIds: ['wdc-leamington-conservation', 'wdc-leamington-plan', 'dfe-milverton-primary', 'historic-england-milverton-house-1381160'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [1, 2],
        heading: `Resolving Northumberland Road and Greatheed Road in a Milverton lockout`,
        local: `Northumberland Road identifies the Milverton New Allotments site, while the Department for Education places Milverton Primary School on Greatheed Road. These are separate records and neither identifies the doorway in an urgent request. Record the complete address, building or plot reference and exact private, shared or managed threshold, then establish whether the caller's instruction concerns either named site or an unrelated Milverton property.`,
        decision: `The plan and school register publish no live keyholder chain, private route or authority for entry. If an allotment or school opening is involved, identify the current responsible representative directly; otherwise verify the requester's connection to the stated premises. Inspect the particular lock with its door, frame and hinges, explain the supported entry method and expected charge, and obtain fresh agreement if observations change the service-call scope or price.`,
        checks: [
          `Distinguish the Northumberland Road allotments, Greatheed Road school and any unrelated property using the complete address.`,
          `Verify the present authorised person for the exact threshold; neither public record grants access.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 3],
        heading: `A Milverton lock change with New Milverton and listed status separated`,
        local: `New Milverton is a bounded conservation character area that excludes Rugby Road and Warwick New Road, whereas Grade II entry 1381160 applies specifically to Milverton House at its statutory addresses. Resolve the requested property against both records before visible alteration. Record the exact threshold and current controller, and distinguish work confined to an existing lock position from a proposal affecting external door material.`,
        decision: `A character-area result does not prove listing, and the Milverton House designation cannot be transferred to neighbouring buildings. For that listed asset, obtain the building controller's property-specific requirement; elsewhere, verify only the controls applying to the exact address. Inspect leaf, frame, hinges, keep and lock, then document repair versus replacement, measured compatibility, keys, retained components, adjustment and exclusions before recording the authorised instruction.`,
        checks: [
          `Check both the New Milverton boundary and Milverton House list entry for the exact address.`,
          `Separate property controls from a measured replacement and record the current approving controller.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 2],
        heading: `Diagnosing a Milverton multipoint fault without boundary or school assumptions`,
        local: `Neither New Milverton's mapped character area nor the Greatheed Road school record shows that a reported entrance is uPVC, composite, timber or fitted with multipoint locking. Identify the exact property and threshold, then record door material, key movement, handle travel, frame contact and locking-point action. Mark each symptom as reported, safely reproduced or not tested instead of assigning a mechanism from the locality or institution name.`,
        decision: `For a school opening, verify the current authorised facilities contact independently; the establishment record supplies neither hardware nor approval. For any other address, use the boundary only if visible work makes property status relevant. Inspect the handle, cylinder where present, faceplate, keeps, hinges and frame, and use readable markings, centres, backset and locking layout to distinguish adjustment from repair or replacement in the written scope.`,
        checks: [
          `Record the address, material and key, handle, frame and locking-point behaviour without inferring a mechanism.`,
          `Verify a school controller separately and use measurements and readable markings for compatibility.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 3],
        heading: `Temporary boarding at a precisely identified Milverton opening`,
        local: `The Northumberland Road allotments and Grade II Milverton House are different named assets with different unanswered control questions. A damage report must identify the complete address, exact pane, panel, door or frame and responsible person before temporary coverage is proposed. Photograph visible damage and the surrounding material, while leaving hidden condition, support strength and attachment suitability unresolved until the opening can be assessed directly.`,
        decision: `Allotment protection does not establish ownership or permission, and the Milverton House list entry does not name a current controller or supply work authority. Follow any police evidence-preservation instruction, obtain the actual controller's approval and check property-specific requirements for the listed asset. Record opening dimensions, intended temporary coverage, compromised locks and outstanding glazing, joinery or structural work, separating the temporary measure from permanent reinstatement.`,
        checks: [
          `Name the damaged opening and controller and distinguish the allotments from listed Milverton House.`,
          `Preserve evidence and document temporary coverage, attachment approval and later repair separately.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `A Milverton upgrade brief separating three property-status questions`,
        local: `The New Milverton character area, Northumberland Road allotment policy and Grade II Milverton House entry answer three different property-status questions; none demonstrates a security deficiency. Establish the authorised objective for the exact entrance and inspect the whole door assembly: leaf, frame, hinges, keeps, handles, lock engagement, cylinder fit and protective furniture where present. Link each proposed measure to an observed condition rather than to conservation, allotment protection or listed status.`,
        decision: `Use the complete address to decide whether the current character-area boundary or the Milverton House entry applies, and keep any resulting permission check separate from product selection. Compare each option through measured dimensions, compatible fit and relevant product or manufacturer evidence. State which components the proposed scope retains, what fabric or communal work it excludes and which observed weakness it addresses, attributing any manager or insurer specification to its provider without implying authority endorsement.`,
        checks: [
          `Derive the objective from the inspected opening, not conservation, allotment or listed status.`,
          `Resolve address-level controls separately and compare options using measured product evidence.`,
        ],
      },
    },
  },
  {
    slug: 'lillington',
    name: 'Lillington',
    region: 'Warwickshire',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish the Lillington Road North and Lillington Village conservation character areas, Crown Way local centre, Lillington Community Centre on Mason Avenue and Lillington Library on Valley Road. Historic England designates that exact library building at Grade II.`,
      `Those records describe bounded planning areas and three named managed places, not every Lillington address. They do not identify the requested threshold, current occupier or keyholder, customer authority, access route, door construction, installed lock, fault, security need or service availability.`,
    ],
    accessGuidance: `Record the complete address, building and exact private, shared or managed entrance. Distinguish Crown Way, the Mason Avenue community centre and the Valley Road library, then check the current property record and identify the person authorised for that particular opening rather than relying on a locality or organisation name.`,
    evidenceLimits: `Character-area, local-plan, asset-register, library and list-entry records cannot be generalised to neighbouring property. Council freehold interest does not identify the current person authorised to instruct work, and Grade II status at the library neither describes its doors nor determines whether a particular locksmith proposal needs consent.`,
    facts: [
      {
        heading: `Two mapped Lillington conservation character areas`,
        text: `The Royal Leamington Spa Conservation Area key map names Lillington Road North and Lillington Village as character areas 34 and 35; the council's current conservation page directs users to check status for the individual property.`,
        sourceIds: ['wdc-leamington-conservation', 'warwick-district-conservation'],
        serviceRelevance: `Resolve the exact address before raising a visible-alteration question; neither character name makes all Lillington properties conserved or listed.`,
      },
      {
        heading: `Crown Way local shopping centre`,
        text: `The adopted Warwick District Local Plan lists Crown Way, Lillington, as a local shopping centre in paragraph 3.103.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Use Crown Way only to distinguish a caller-supplied location or unit; the planning label does not prove present use, authority, hardware or coverage.`,
      },
      {
        heading: `Council freehold interest at Lillington Community Centre`,
        text: `Warwick District Council's January 2026 asset register records Lillington Community Centre, Mason Avenue, Leamington Spa, CV32 7QE, and states the council interest as freehold.`,
        sourceIds: ['wdc-asset-list-2026'],
        serviceRelevance: `This identifies a council property interest and exact named asset, not the current occupier, authorised instructor, service entrance or lock condition.`,
      },
      {
        heading: `Current Grade II library on Valley Road`,
        text: `Warwickshire County Council places Lillington Library and Information Centre at Valley Road, Lillington, CV32 7SJ; Historic England lists the building at that statutory address at Grade II under entry 1420766.`,
        sourceIds: ['wcc-lillington-library', 'historic-england-lillington-library-1420766'],
        serviceRelevance: `Use the two records to identify this managed listed building only, then verify its current controller, exact entrance and any property-specific requirement directly.`,
      },
    ],
    sourceIds: ['wdc-leamington-conservation', 'warwick-district-conservation', 'wdc-local-plan', 'wdc-asset-list-2026', 'wcc-lillington-library', 'historic-england-lillington-library-1420766'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [1, 2, 3],
        heading: `Resolving Crown Way, Mason Avenue and Valley Road during a Lillington lockout`,
        local: `Crown Way, Lillington Community Centre on Mason Avenue and Lillington Library on Valley Road are three different official references. None identifies the doorway in an urgent request. Record the full postal address, building, floor or unit and exact private, shared or managed threshold, then establish whether the caller represents a home, local-centre unit, council asset or county library rather than matching only a familiar landmark.`,
        decision: `The council's freehold record and the library's public pages do not publish a live keyholder chain or grant entry authority. Verify the requester's connection to the specified opening and, for either managed building, identify the current facilities or property contact. Inspect the lock with its leaf, frame and hinges, then explain and document any change to the supported entry scope separately. Seek fresh agreement solely when the service-call price changes.`,
        checks: [
          `Name Crown Way, Mason Avenue or Valley Road only after recording the full address, building and exact threshold.`,
          `Verify the current authorised person; freehold, library and planning records do not identify a live keyholder.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2, 3],
        heading: `A Lillington lock change with designation and controller separated`,
        local: `Lillington Road North and Lillington Village are bounded character areas, while the Mason Avenue community centre and Grade II Valley Road library are specific managed assets. Resolve which record, if any, applies to the requested entrance before proposing visible change. Record the current controller and whether work concerns a private lock, shared system or managed-building component; neither designation nor freehold interest identifies who can approve it.`,
        decision: `At the library, confirm any property or heritage requirement with the building controller; at the community centre, distinguish the council's freehold interest from the current occupier's operational responsibility. For any other Lillington property, use the address search rather than the locality name. Inspect door, frame, hinges, keep and lock, then document repair versus replacement, measured compatibility, keys, retained parts, adjustment and excluded common or fabric work before authority is recorded.`,
        checks: [
          `Resolve the exact address against the current conservation and listed-building records before any visible alteration.`,
          `Separate freeholder, occupier and facilities authority and specify replacement only from the inspected assembly.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Diagnosing a Lillington uPVC fault without centre or asset assumptions`,
        local: `Crown Way's local-centre status and the council's freehold interest at the Mason Avenue community centre reveal no door material or multipoint mechanism. Identify the exact address and threshold, then record whether the leaf is uPVC, composite, timber or another construction. Capture key movement, handle travel, frame contact and locking-point action, marking each observation as reported, safely reproduced or not tested instead of diagnosing from the site name.`,
        decision: `If the request concerns a managed community-centre opening, confirm the current facilities contact separately from the council's property interest before altering hardware. For Crown Way or another Lillington address, planning geography contributes nothing to part selection. Inspect the cylinder where present, handle, faceplate, keeps, hinges and frame, and use readable markings, centres, backset and locking layout to distinguish adjustment from mechanism repair or replacement in the written scope.`,
        checks: [
          `Record the exact threshold, material and key, handle, frame and locking-point behaviour without inferring a mechanism.`,
          `Verify a managed-site controller separately and use measurements and readable markings for compatibility decisions.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 2, 3],
        heading: `Boarding the exact Lillington opening with property status resolved`,
        local: `A damaged opening described as Lillington could be inside or outside either character area, at the Mason Avenue community centre, at the listed Valley Road library or at an unrelated property. Record the full address, exact pane, panel, door or frame and responsible controller before proposing temporary coverage. Photograph visible damage and surrounding material while leaving hidden condition, support strength and attachment suitability unresolved until direct inspection.`,
        decision: `Before touching the Lillington opening, follow any scene-preservation direction issued by police. If the library is involved, obtain the building controller's property-specific requirement; if the community centre is involved, resolve freeholder, occupier and facilities responsibility rather than treating the asset list as permission. Check the current designation only for the exact address, then document measurements, intended coverage, proposed attachment points, compromised locks and outstanding glazing, joinery or door work separately from permanent reinstatement.`,
        checks: [
          `Name the damaged opening and controller and check designation or listed status only for that exact address.`,
          `Preserve evidence and distinguish temporary coverage, attachment approval and later permanent repair in writing.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2, 3],
        heading: `A Lillington upgrade brief tied to exact site, status and authority`,
        local: `The two character areas, Crown Way local centre, council community-centre asset and listed library are planning or site-identification evidence, not security assessments. Ask the authorised controller for the objective and identify the exact entrance, then inspect the leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where relevant. Link each option to an observed weakness instead of using a Lillington label, managed-building name or designation as evidence of risk.`,
        decision: `Check current conservation or listed status only for the supplied address and verify any visible-work requirement with the relevant property contact. At Mason Avenue and Valley Road, resolve operational authority separately from the council's recorded freehold interest or the designation record; at Crown Way, verify the individual unit and controller. State measurements, product evidence, retained components, key-control outcome and exclusions, keeping manager or insurer requirements attributed and avoiding any implication of council or Historic England endorsement.`,
        checks: [
          `Base the objective on the inspected entrance and authorised controller, not planning, asset or designation labels.`,
          `Attribute every property or insurer requirement and record measured evidence, retained work and exclusions.`,
        ],
      },
    },
  },
  {
    slug: 'sydenham',
    name: 'Sydenham',
    region: 'Warwickshire',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish Sydenham Drive's local shopping centre and Fallow Hill Play Area from Sydenham Industrial Estate, Sydenham Primary School on Calder Walk and the SYDNI Centre on Cottage Square. These are separate named places, not one interchangeable destination.`,
      `The records identify locality, land use and named organisations only. They do not reveal a private address's entrance, public access outside stated arrangements, the current person controlling a door, installed hardware or a locksmith fault.`,
    ],
    accessGuidance: `Record the complete street, building or unit and exact threshold. In particular, distinguish the SYDNI Centre on Cottage Square, Sydenham Primary School on Calder Walk, the industrial estate and the separate Sydenham Drive references before identifying the responsible occupier, owner or manager.`,
    evidenceLimits: `Planning, charity, school and play-area records do not establish ownership of a caller's property, a current keyholder, permission to enter, route conditions, opening hours, door construction, lock mechanism, damage, security need, service coverage or response time.`,
    facts: [
      {
        heading: `Two different Sydenham land-use references`,
        text: `The Royal Leamington Spa Neighbourhood Plan identifies Sydenham Drive as a local shopping centre and separately names Sydenham Industrial Estate as a manufacturing location.`,
        sourceIds: ['wdc-leamington-plan'],
        serviceRelevance: `Use either name to clarify a caller-supplied location only; neither proves a property's present use, unit, entrance or site controller.`,
      },
      {
        heading: `SYDNI Centre on Cottage Square`,
        text: `The Charity Commission records Sydenham Neighbourhood Initiatives Limited, charity 1077333, and describes its SYDNI Centre as a multicultural community centre at Cottage Square, Sydenham, CV31 1PT.`,
        sourceIds: ['charity-commission-sydenham-neighbourhood-initiatives-1077333'],
        serviceRelevance: `The register identifies the charity and contact site, not a current individual keyholder, the requested entrance or permission for locksmith work.`,
      },
      {
        heading: `Sydenham Primary School on Calder Walk`,
        text: `The Department for Education records Sydenham Primary School at Calder Walk, Sydenham, Leamington Spa, CV31 1SA.`,
        sourceIds: ['dfe-sydenham-primary'],
        serviceRelevance: `This identifies one education site only; it neither describes neighbouring properties nor establishes a current contact, access right or door condition.`,
      },
      {
        heading: `Fallow Hill Play Area on Sydenham Drive`,
        text: `Warwick District Council lists Fallow Hill Play Area on Sydenham Drive among the play areas it maintains.`,
        sourceIds: ['wdc-sydenham-play-area'],
        serviceRelevance: `This is an outdoor-site orientation record, not evidence of a building entrance, private route, keyholder or locking system.`,
      },
    ],
    sourceIds: ['wdc-leamington-plan', 'charity-commission-sydenham-neighbourhood-initiatives-1077333', 'dfe-sydenham-primary', 'wdc-sydenham-play-area'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [1, 2],
        heading: `Distinguishing the SYDNI Centre from Sydenham Primary during a lockout`,
        local: `The registered SYDNI Centre on Cottage Square and Sydenham Primary School on Calder Walk are separate managed sites. Neither name identifies the door in an urgent request. Record the full address, organisation, building and exact private, shared or staff threshold, then identify the current representative responsible for that opening. A postcode or landmark can disambiguate the destination but cannot show that the caller controls it.`,
        decision: `The charity and school records establish named sites only; they publish no live keyholder chain or locksmith authority. Verify identity and permission for the requested threshold independently, inspect the lock with its door, frame and hinges, and explain the supported access method and expected charge before work. If the observed condition changes the service-call scope or price, obtain fresh agreement rather than treating either institution's public record as consent.`,
        checks: [
          `Name Cottage Square or Calder Walk, the organisation, building and exact private, shared or staff entrance.`,
          `Verify the present authorised representative; neither public record identifies a live keyholder or grants access.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        heading: `A Sydenham lock change tied to site, controller and measured door`,
        local: `Sydenham Drive's local centre, the industrial estate, the SYDNI Centre and Sydenham Primary are distinct official references. For a change request, record the precise unit or building, the affected entrance and the current occupier, facilities contact or other person entitled to approve that component. The plan does not prove present business use, while the charity and school records do not reveal an authority chain or shared-door responsibility.`,
        decision: `Inspect the particular lock, leaf, frame, hinges and keep before separating repair, adjustment and replacement. Obtain any landlord, freeholder or site requirement directly and match it to that opening; never derive a product from the surrounding land-use label. The proposal should name the measured component, key-control outcome, retained parts, fitting, adjustment and excluded communal work, with the approving controller and evidence recorded before a Sydenham replacement begins.`,
        checks: [
          `Name the exact unit or institution, entrance and current controller and resolve shared-door responsibility.`,
          `Measure the inspected assembly and attribute every landlord, school or facilities requirement to its provider.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 2],
        heading: `Diagnosing a Sydenham multipoint fault without land-use assumptions`,
        local: `Neither the Sydenham Drive and industrial-estate planning labels nor the school address on Calder Walk shows that a reported door is uPVC, composite or fitted with multipoint locking. Identify the exact property and threshold, then record material, key movement, handle travel, frame contact and locking-point action. Mark any safe open-versus-closed comparison as reported, reproduced or not tested rather than assigning a fault from the street or site name.`,
        decision: `The school record identifies one managed site but no fitted mechanism or person authorised to approve repair. At any Sydenham address, inspect the handle, cylinder where present, faceplate, keeps, hinges and frame before narrowing a part. Use readable markings, centres, backset and locking layout as compatibility evidence, keep alignment work separate from mechanism replacement, and document the responsible controller for a school, unit or communal opening directly.`,
        checks: [
          `Record the exact threshold, material, handle, key, frame and locking-point behaviour without inferring a mechanism.`,
          `Use measurements and readable markings to shortlist parts and verify the responsible controller separately.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 3],
        heading: `Temporary boarding at the exact Sydenham site and opening`,
        local: `The industrial estate, SYDNI Centre and Fallow Hill Play Area represent different commercial, managed-building and outdoor contexts. A report near Sydenham Drive must therefore identify the exact property and damaged pane, panel, door or frame rather than borrowing a nearby place name. Confirm the responsible owner or site contact, photograph visible damage and surrounding material, and leave hidden condition and attachment suitability unresolved until the opening is physically assessed.`,
        decision: `Fallow Hill is useful outdoor orientation but supplies no building, private route or permission; the charity record likewise does not name a current keyholder. Separate public-facing, staff, shared and private openings, follow any police evidence-preservation instruction, and obtain approval from the actual controller. Record measurements, temporary coverage, proposed attachment positions, compromised hardware and later glazing, joinery or door work so immediate securing is not presented as permanent reinstatement.`,
        checks: [
          `Name the property and damaged opening; Fallow Hill and the industrial estate are orientation, not authority.`,
          `Preserve evidence, verify the actual controller and document temporary coverage separately from permanent repair.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        heading: `A Sydenham upgrade brief with organisation and threshold resolved`,
        local: `Manufacturing, local-centre, charity and school records do not demonstrate risk or prescribe security hardware. Ask the authorised controller for the objective and identify whether the opening belongs to a private home, industrial unit, SYDNI building, school or shared entrance. Inspect the leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable, linking every proposed measure to one recorded condition instead of to Sydenham's surrounding land use.`,
        decision: `Resolve responsibility for a communal or managed door separately from an occupier's own entrance. Neither the Cottage Square charity record nor Calder Walk school record supplies approval, and Sydenham Drive's planning status is not a standard. Match any documented manager or insurer requirement to the actual assembly, then state product evidence, measurements, retained hardware and excluded work. Keep unverified conditions explicit so the written comparison does not imply endorsement or guaranteed resistance.`,
        checks: [
          `Identify the organisation or property, exact threshold and authorised objective before comparing upgrades.`,
          `Match measured product evidence and documented requirements to the door, keeping shared work and claims explicit.`,
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
        heading: `Whitnash neighbourhood plan brought into force`,
        text: `Warwick District Council brought the Whitnash Neighbourhood Plan into legal force on 27 January 2016 following the 26 November 2015 referendum.`,
        sourceIds: ['wdc-whitnash-plan-page'],
        serviceRelevance: `Use the official plan status only as area planning context, not evidence about a particular property or service.`,
      },
      {
        heading: `Whitnash Church Green and Chapel Green conservation areas`,
        text: `The adopted Warwick District Local Plan conservation table lists Whitnash Church Green and Whitnash Chapel Green as separate conservation areas.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Resolve the exact address against the current boundary and verify listing separately before heritage-related guidance.`,
      },
      {
        heading: `Whitnash Primary School on Langley Road`,
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
    reviewedOn: CURRENT_PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish Lower Heathcote Local Centre's dated 2024-25 status, planned Play Area 2 in the Heathcote part of Tachbrook Country Park, Heathcote Primary School on Vickers Way and Heathcote Community Centre on Cressida Close.`,
      `These records identify one dated project snapshot, one planned facility and two exact managed sites. They do not establish later completion, a caller's address, the relevant entrance, current controller, access arrangements, door construction, installed hardware or condition.`,
    ],
    accessGuidance: `Record the complete Heathcote address, named building and exact private, shared or managed threshold. Distinguish Lower Heathcote Local Centre, the planned park facility, Vickers Way school and Cressida Close community centre, then identify the present responsible person without treating a public address as access permission.`,
    evidenceLimits: `The monitoring report remains a dated snapshot and Play Area 2 remains described as planned. The school and community-centre records identify named sites only; none proves a current keyholder, ownership, site access, route availability, building fabric, door type, lock condition, service demand, coverage or response time.`,
    facts: [
      {
        heading: `Lower Heathcote Local Centre status in the 2024-25 monitoring report`,
        text: `The 2024-25 monitoring report says Lower Heathcote Local Centre retail units, nursery and care home were complete while its office had not started at reporting time.`,
        sourceIds: ['wdc-monitoring-report-2024-25'],
        serviceRelevance: `Preserve the dated status and verify the actual building and responsible party instead of assuming current completion or use.`,
      },
      {
        heading: `Heathcote's planned country park play area`,
        text: `The Tachbrook Country Park development page places planned Play Area 2 in the park's north-west, described specifically as the Heathcote area.`,
        sourceIds: ['wdc-tachbrook-park'],
        serviceRelevance: `Treat the planned facility as managed-site orientation only and recheck its status before any publication or instruction.`,
      },
      {
        heading: `Heathcote Primary School on Vickers Way`,
        text: `The Department for Education records Heathcote Primary School at Vickers Way, Heathcote, Warwick, CV34 7AP.`,
        sourceIds: ['dfe-heathcote-primary'],
        serviceRelevance: `This identifies one education site only; it does not describe neighbouring properties, access rights, door hardware or service conditions.`,
      },
      {
        heading: `Heathcote Community Centre on Cressida Close`,
        text: `Warwick District Council's guide to local services identifies Heathcote Community Centre at Cressida Close, Heathcote, Warwick, CV34 6DZ.`,
        sourceIds: ['wdc-heathcote-community-centre-guide'],
        serviceRelevance: `Use this as an exact named-site address only; it does not establish ownership, the current controller, keyholder, requested entrance, access arrangement, hardware or condition.`,
      },
    ],
    sourceIds: ['wdc-monitoring-report-2024-25', 'wdc-tachbrook-park', 'dfe-heathcote-primary', 'wdc-heathcote-community-centre-guide'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        heading: `Resolving Lower Heathcote and Vickers Way during a lockout`,
        local: `The 2024-25 report describes several Lower Heathcote Local Centre elements at a dated point, while the school register identifies Heathcote Primary on Vickers Way. Neither record identifies the exact affected door, opening or threshold in an urgent request. Record the complete address, unit or institution, entrance position and whether that specific threshold is private, shared or managed before deciding which site, if either, the caller means.`,
        decision: `A report of completion does not name a current occupier or confer authority, and the school record publishes no live keyholder chain. Establish the present representative entitled to request access for the specified opening, or verify the caller independently for an unrelated property. Inspect the lock with its leaf, frame and hinges, explain the supported access method and expected charge, and seek fresh agreement if observations alter scope or price.`,
        checks: [
          `Distinguish Lower Heathcote Local Centre, Vickers Way school and any unrelated property at the complete address.`,
          `Verify the present authorised person for the exact threshold; neither record grants access.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 3],
        heading: `A Heathcote lock change separating local-centre and community-centre authority`,
        local: `Lower Heathcote Local Centre is a multi-element project described by a dated monitoring record; Heathcote Community Centre is a separately named site on Cressida Close. A change request must identify the actual unit or building, exact threshold and present person entitled to approve that component. Do not treat the shared word “centre” as evidence that the two records concern one controller or entrance.`,
        decision: `The monitoring report and services guide provide no hardware specification, key schedule or work authority. Resolve landlord, occupier, facilities and shared-door responsibility directly, then inspect the leaf, frame, hinges, keep and lock. The written proposal should distinguish adjustment, repair and replacement and state measured compatibility, keys, retained parts and excluded communal or fabric work, with the approving controller recorded before any Heathcote change begins.`,
        checks: [
          `Distinguish the local centre from Cressida Close and record the unit, entrance and approving controller.`,
          `Specify the change from the inspected assembly, not a project report or public-services directory.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Diagnosing a Heathcote multipoint fault without park or school assumptions`,
        local: `Planned Play Area 2 in the Heathcote part of Tachbrook Country Park and the Vickers Way school are orientation and site-identification records, not door evidence. Identify the exact property and threshold, then record whether the leaf is uPVC, composite, timber or another material. Capture key movement, handle travel, frame contact and locking-point action, labelling each symptom reported, safely reproduced or not tested.`,
        decision: `If a school opening is involved, verify its current responsible facilities contact; if the caller mentions the park, preserve the facility's planned status and do not infer a building or controlled entrance. At the actual door, inspect handle, cylinder where present, faceplate, keeps, hinges and frame. Use readable markings, centres, backset and locking layout to separate adjustment from mechanism repair or replacement in the documented scope.`,
        checks: [
          `Record the exact threshold, material and key, handle, frame and locking-point behaviour.`,
          `Preserve the park facility's planned status and verify any school controller separately.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 3],
        heading: `Temporary boarding at a named Heathcote managed site`,
        local: `The planned park play area and Heathcote Community Centre on Cressida Close are different public references; neither describes a damaged opening. Record the complete site address, building and exact pane, panel, door or frame, then identify the present controller before proposing temporary coverage. Photograph visible damage and surrounding material while leaving hidden condition, support strength and attachment suitability unresolved pending direct inspection.`,
        decision: `The park record does not prove that Play Area 2 is complete or has a building, while the services guide does not identify a community-centre keyholder or grant work authority. Follow any police evidence-preservation instruction and obtain approval from the actual controller. Document opening measurements, intended temporary coverage, compromised locks and later glazing, joinery or structural work so immediate securing remains separate from permanent reinstatement.`,
        checks: [
          `Distinguish the planned park facility from the Cressida Close centre and name the damaged opening.`,
          `Preserve evidence, verify the actual controller and separate temporary coverage from permanent repair.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 2, 3],
        heading: `A Heathcote upgrade brief across three separately managed places`,
        local: `The dated Lower Heathcote project status, Vickers Way school address and Cressida Close community-centre address identify three separately managed contexts; none demonstrates a security deficiency. Obtain the exact entrance and authorised objective, then inspect frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable. Link each proposed improvement to a recorded condition rather than to reported use or an institutional name.`,
        decision: `Resolve responsibility for a local-centre unit, school opening or community-centre threshold directly because the public records do not publish an authority chain or security specification. Match any documented manager or insurer requirement to the inspected assembly. Present measured compatibility, relevant product evidence, retained hardware and excluded communal or fabric work in writing, keeping the monitoring date and each named-site record outside performance or endorsement claims.`,
        checks: [
          `Name the exact local-centre, school, community-centre or other entrance and its authorised objective.`,
          `Match measured product evidence and documented requirements to that door without inferring endorsement.`,
        ],
      },
    },
  },
  {
    slug: 'warwick',
    name: 'Warwick',
    region: 'Warwickshire',
    reviewedOn: CURRENT_PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish Warwick's fifteen conservation character sections, the district-plan Urban Area, Coten End Primary School and Warwick Library and Information Centre at Shire Hall, CV34 4RL.`,
      `The school and library are exact named sites, while the plan and conservation records operate at wider scales. None identifies a requested threshold, current controller, caller authority, installed lock, door condition, route or service history.`,
    ],
    accessGuidance: `Require the complete Warwick address and exact threshold. Distinguish the Coten End school from the Shire Hall library and verify any conservation result, present site representative and caller authority separately.`,
    evidenceLimits: `The character map, Urban Area classification, school register and library page establish locality or named-site identity only. They do not prove listing, ownership, access, opening hours, hardware, damage, authority, coverage, response or previous locksmith work.`,
    facts: [
      {
        heading: `Fifteen Warwick conservation character sections`,
        text: `Warwick District Council's conservation guide maps fifteen named Warwick Conservation Area character sections, including Coten End–Emscote Road, St Nicholas Park, Priory Park, Castle and Castle Park, and West Street.`,
        sourceIds: ['wdc-warwick-conservation'],
        serviceRelevance: `Use a named section only after resolving the exact address, then check current conservation and listed status separately.`,
      },
      {
        heading: `Warwick classified as an Urban Area`,
        text: `The adopted Warwick District Local Plan lists Warwick as one of the district's four Urban Areas in Table 2.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Treat Urban Area as planning classification only, not evidence of a property's use, hardware or service reach.`,
      },
      {
        heading: `Coten End Primary School in Warwick`,
        text: `The Department for Education records Coten End Primary School at Coten End, Warwick, CV34 4NP.`,
        sourceIds: ['dfe-coten-end-primary'],
        serviceRelevance: `Use the record only to identify this school site; verify its current representative, requested opening and authority independently.`,
      },
      {
        heading: `Warwick Library at Shire Hall`,
        text: `Warwickshire County Council identifies Warwick Library and Information Centre at Shire Hall, Warwick, CV34 4RL.`,
        sourceIds: ['wcc-warwick-library'],
        serviceRelevance: `Use Shire Hall only to identify the library site, not to infer a controller, entrance, access arrangement or installed hardware.`,
      },
    ],
    sourceIds: ['wdc-warwick-conservation', 'wdc-local-plan', 'dfe-coten-end-primary', 'wcc-warwick-library'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [2, 3],
        heading: `Separating Coten End school from Warwick Library in an urgent access call`,
        local: `Coten End Primary School and Warwick Library at Shire Hall are separate named sites, and neither public record identifies a live keyholder or the doorway in an emergency request. Take the complete address, organisation or property name, entrance position and whether the caller means a perimeter gate, shared entrance, staff door or private threshold. A nearby site name cannot substitute for that controlled opening.`,
        decision: `For either institution, identify the current representative entitled to request entry; for another Warwick property, verify the caller's relationship to that premises without borrowing authority from a public listing. Inspect the lock, latch, leaf, frame and hinges before selecting an opening approach. Explain the supported method and available price information before work, and obtain fresh agreement if inspection materially changes the scope or charge.`,
        checks: [
          `Name the Coten End school, Shire Hall library or unrelated property and the exact controlled threshold.`,
          `Verify authority, explain the inspected opening method and confirm price information before work.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 3],
        heading: `Repair or change at a Warwick address with Shire Hall kept site-specific`,
        local: `A Shire Hall reference identifies Warwick Library, while the conservation guide divides a broader designation into character sections. Establish the exact property, leaf and person responsible for the component before discussing replacement. Record whether the request follows lost keys, damage, unreliable operation or a new key-control objective, and whether the affected item belongs to a private, communal or specifically managed entrance.`,
        decision: `Inspect lock operation together with the door, frame, hinges, keep and protective furniture so adjustment or repair is not displaced by an assumed full change. Measure the fitted lock or cylinder, backset, centres, case or faceplate details and any relevant projection before narrowing compatible options. Keep a current boundary or property approval question separate, then document retained parts, supplied keys, fitting, adjustment, exclusions and the approving party.`,
        checks: [
          `Identify the property, door and repair-or-change objective without extending the Shire Hall record elsewhere.`,
          `Measure the inspected assembly and record retained parts, keys, adjustments, exclusions and approval.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Diagnosing a Warwick multipoint fault without Urban Area or school assumptions`,
        local: `The Urban Area classification and the Coten End school record reveal no door material or mechanism. Identify the affected Warwick entrance, then record handle resistance, key rotation, locking-point travel, frame contact and whether operation differs with the leaf safely open and closed. Label each detail as caller-reported, reproduced or not tested, because the location and institution name cannot establish a uPVC assembly or failed component.`,
        decision: `At a school opening, verify the present facilities contact separately from the diagnosis; elsewhere, use the full address only to locate the job. Inspect the handle, cylinder where fitted, complete faceplate, keeps, hinges and frame. Read manufacturer or component markings and measure centres, backset, locking layout and cylinder fit before distinguishing alignment work, furniture, cylinder repair or multipoint replacement in the written scope.`,
        checks: [
          `Classify key, handle, locking-point and frame behaviour as reported, reproduced or untested.`,
          `Use markings and measurements from the door, while verifying a school facilities contact separately.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 3],
        heading: `Recording damage at Shire Hall or another precisely identified Warwick opening`,
        local: `The Shire Hall library address, Warwick's Urban Area status and its character map answer different identity or planning questions; none describes an incident. Record the complete property, elevation and individual window, panel, door or frame, together with the current person authorised to approve temporary work. Photograph visible damage and nearby material without transferring the library record or a conservation label to another Warwick building.`,
        decision: `Follow any police evidence-preservation direction before touching or covering the scene. Once released, inspect accessible surrounding construction, measure the opening and record compromised locks, exposed edges, intended temporary coverage and any condition that remains hidden or unsafe to test. Check address-specific property requirements only where the proposal engages them, and list glazing, joinery, door, lock or structural reinstatement separately so boarding is not presented as a permanent repair.`,
        checks: [
          `Name the Warwick property, damaged opening and authorised contact without transferring Shire Hall status.`,
          `Preserve evidence, define the temporary extent and list every permanent repair still outstanding.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2, 3],
        heading: `A whole-doorset upgrade brief for a named Warwick entrance`,
        local: `The conservation sections, Urban Area, Coten End school and Shire Hall library do not demonstrate that any Warwick door needs new hardware. Start with the responsible customer's stated objective at the exact threshold, such as restoring key control or addressing an observed weakness. Inspect leaf and frame condition, hinges, keeps, handle operation, lock engagement, cylinder fit and existing protective furniture before proposing an alteration.`,
        decision: `For a school or library entrance, obtain the current site requirement directly; neither public page supplies a security standard or authority chain. For any property, compare options through measured compatibility and relevant product documentation, stating which condition each option addresses and which existing parts remain. Verify conservation, listing, lease or management controls only for that address and proposal, then record approvals, key outcome, fabric work and exclusions without implying public-body endorsement.`,
        checks: [
          `Tie the upgrade objective to a complete doorset inspection at the named Warwick threshold.`,
          `Compare measured product evidence and record applicable property approval without implying endorsement.`,
        ],
      },
    },
  },
  {
    slug: 'woodloes-park',
    name: 'Woodloes Park',
    region: 'Warwickshire',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish Reardon Court local centre, the council's Canalside public space, Woodloes Primary School on Deansway and registered charity 511957, Woodloes Park Community Centre. The charity's area of benefit is Woodloes Park Estate, but its register says it does not own or lease land or property.`,
      `These records identify planning context, a council asset, one school and an organisation. They do not locate every address using the Woodloes name, identify the community-centre venue, prove a private route, name a current keyholder or describe any entrance, door material, lock mechanism, fault, demand or service availability.`,
    ],
    accessGuidance: `Record the complete address, organisation and exact private, shared or managed threshold. Distinguish Reardon Court, Canalside, the Deansway school and any request using the community-centre charity name. Published park entrances and the charity's 4 Crane Close contact address must not be treated as routes or proof of the service venue.`,
    evidenceLimits: `The local-plan, parks, asset, school and charity records do not establish a caller's authority, a current occupier, the community-centre premises, private access, parking, door construction, installed hardware, fault, damage, security need, coverage or response time. Council freehold interest at Canalside applies to the named play-area asset, not neighbouring property.`,
    facts: [
      {
        heading: `Reardon Court local shopping centre`,
        text: `The adopted Warwick District Local Plan lists Reardon Court, Woodloes, Warwick, as a local shopping centre.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Use Reardon Court only to clarify a caller-supplied unit or locality; the planning label does not prove current use, authority, hardware or coverage.`,
      },
      {
        heading: `Canalside public access and council property interest`,
        text: `The council places Canalside under Warwick (Woodloes Park) and lists public access from Coventry Road, Greenway, roads south of Deansway, Scar Bank and Lock Lane; its January 2026 asset register records the Canalside play area at Greenway with the council interest as freehold.`,
        sourceIds: ['wdc-community-parks', 'wdc-asset-list-2026'],
        serviceRelevance: `Use the records to identify this public asset only; entrances and freehold interest do not grant a route to private property or authority for work.`,
      },
      {
        heading: `Woodloes Primary School on Deansway`,
        text: `The Department for Education records Woodloes Primary School at Deansway, Woodloes Park Estate, Warwick, CV34 5DF.`,
        sourceIds: ['dfe-woodloes-primary'],
        serviceRelevance: `This identifies one managed education site only; it does not establish a gate, service entrance, current representative, hardware or surrounding property.`,
      },
      {
        heading: `Community-centre charity without a registered property interest`,
        text: `The Charity Commission identifies Woodloes Park Community Centre, charity 511957, gives Woodloes Park Estate as its area of benefit and states that the charity does not own or lease land or property.`,
        sourceIds: ['charity-commission-woodloes-park-community-centre-511957'],
        serviceRelevance: `Use the record to verify the organisation name only; its 4 Crane Close contact is not proven to be the centre venue, entrance or property controller.`,
      },
    ],
    sourceIds: ['wdc-local-plan', 'wdc-community-parks', 'wdc-asset-list-2026', 'dfe-woodloes-primary', 'charity-commission-woodloes-park-community-centre-511957'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [1, 2, 3],
        heading: `Separating Canalside, Deansway school and the centre charity in a Woodloes Park lockout`,
        local: `Canalside, Woodloes Primary School and the registered community-centre charity are three different official references. The charity record does not prove a venue, and the park's public entrances do not identify a property doorway. Record the full address, organisation, building and exact private, shared, school or public-asset threshold, then establish whether the caller represents that opening rather than matching a name or postcode alone.`,
        decision: `For Canalside, identify the current council or facilities contact; for the school, verify the present authorised representative under its site arrangements; for a community-centre request, first establish the actual venue and controller because 4 Crane Close is only a registered contact. Inspect the confirmed lock with its door, frame and hinges, then explain and document any change to the supported entry scope separately. Only a changed service-call price requires fresh customer agreement.`,
        checks: [
          `Name the address, organisation and exact threshold; neither a Canalside entrance nor charity contact identifies it.`,
          `Verify the current public-asset, school or venue representative before inspecting or carrying out urgent entry.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2, 3],
        heading: `A Woodloes Park lock change tied to unit, school or verified centre premises`,
        local: `Reardon Court's planning label, the Deansway school record and the community-centre charity identify different locality or organisation contexts. None identifies the lock to change or a person entitled to approve it. Record the precise unit or managed site, exact entrance, reason for change and whether a private, shared, school or organisational key system is involved, resolving the actual community-centre venue before relying on the charity name.`,
        decision: `For the school or a verified centre premises, obtain the current facilities, occupier, landlord or freeholder requirement directly and match it to the specific opening. Reardon Court supplies no product specification, while the charity's absence of a registered property interest makes assumed ownership especially unsafe. Inspect leaf, frame, hinges, keep and lock, then document repair versus replacement, measured component, keys, retained parts, adjustment and excluded common or fabric work before approval.`,
        checks: [
          `Identify the exact unit or managed premises and current controller; the plan and charity records grant no authority.`,
          `Match every replacement detail and key-control outcome to measurements from the inspected opening.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        heading: `Diagnosing a Woodloes Park multipoint fault without land-use assumptions`,
        local: `Reardon Court, Canalside and Woodloes Primary are useful address distinctions but none shows that a reported door is uPVC, composite or multipoint. Identify the exact threshold and controller, then record material, key movement, handle travel, frame contact and locking-point action. Treat any safe open-versus-closed comparison as reported, reproduced or not tested, and keep the park entrances and school address outside the mechanical diagnosis.`,
        decision: `If the opening belongs to the school or Canalside, verify the present site representative separately from public records before altering components. At another Woodloes address, neither a nearby local centre nor public path supplies a mechanism clue. Inspect the cylinder where present, handle, faceplate, keeps, hinges and frame, and use readable markings, centres, backset and locking layout to distinguish alignment work, repair and compatible replacement in the written scope.`,
        checks: [
          `At Reardon Court or the Deansway school, name the Woodloes Park door and record material, key, handle and frame behaviour.`,
          `Keep Canalside geography outside diagnosis and tie a Woodloes Park part shortlist to observed markings and measurements.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 3],
        heading: `Boarding a verified Woodloes Park opening rather than a park or charity label`,
        local: `A damaged opening described as Canalside or Woodloes Park Community Centre must first be tied to a physical asset and responsible controller. The park record identifies public space, while charity 511957 does not own or lease property and its contact address is not proven to be the venue. Record the complete site, exact pane, panel, door or frame, visible damage and surrounding material without assuming a route, boundary or attachment surface.`,
        decision: `Apply any police evidence-preservation direction before the Woodloes Park opening is touched or covered. For Canalside, obtain the current council or facilities approval; for a community-centre request, verify the actual premises, occupier and property responsibility before proposing coverage. Public entrances and charitable identity grant neither access nor fixing permission. Document measurements, intended temporary material, proposed attachment points, compromised hardware and later glazing, joinery or door work, leaving hidden strength and permanent restoration for direct assessment.`,
        checks: [
          `Tie the damaged opening to a physical site and controller; the charity contact and park entrances are not premises.`,
          `Preserve evidence and record temporary coverage, attachment permission and permanent repair as separate decisions.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 2, 3],
        heading: `A Woodloes Park upgrade brief with premises and authority proved first`,
        local: `Reardon Court's land-use label, the Deansway school address and the community-centre charity do not demonstrate risk or prescribe hardware. Ask the authorised controller for the objective and identify the exact private, shared, school or verified centre entrance. Inspect the leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where relevant, linking every option to observed condition rather than to a Woodloes institution or planning classification.`,
        decision: `Resolve school or community-premises responsibility before comparing products, remembering that charity 511957 reports no owned or leased property and its contact does not prove the venue. At Reardon Court, verify the individual unit and current occupier rather than assuming commercial use. Match documented manager or insurer requirements to the measured assembly, then state product evidence, retained hardware, key-control outcome and excluded work without implying council, school or charity endorsement.`,
        checks: [
          `For a Reardon Court, school or verified centre entrance, name the Woodloes Park controller and written upgrade objective.`,
          `Separate charity property status from premises responsibility while matching Woodloes Park measurements to each option.`,
        ],
      },
    },
  },
  {
    slug: 'chase-meadow',
    name: 'Chase Meadow',
    region: 'Warwickshire',
    summary: [
      `The Warwick District Local Plan names Narrow Hall Meadow as a local shopping centre, while council records separately identify Hickmans Green, The Marrish and the Narrow Hall Meadow community-centre property. The NHS service record places Chase Meadow Health Centre at The New Dispensary on Alder Meadow.`,
      `These records distinguish four local contexts rather than describing every Chase Meadow address. They do not identify a private entrance, current keyholder, safe route, installed hardware, property condition, security need, locksmith demand, service coverage or response time.`,
    ],
    accessGuidance: `Obtain the complete address and distinguish the Narrow Hall Meadow centre and community-centre premises from Hickmans Green, The Marrish, Alder Meadow and other Chase Meadow streets. Verify the current property or facilities contact for any managed site; a public-space name or organisation record is not access permission.`,
    evidenceLimits: `The planning, park, asset, organisation and NHS records identify named places or legal interests only. They are not property surveys, access instructions or service boundaries and cannot establish the correct entrance, current controller, route, parking, door material, lock mechanism, damage, demand, availability or prior work.`,
    reviewedOn: PROMOTION_REVIEWED_ON,
    facts: [
      {
        heading: `Narrow Hall Meadow local shopping centre`,
        text: `The adopted Warwick District Local Plan lists Narrow Hall Meadow, Chase Meadow, Warwick, as a local shopping centre.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Use the planning label only to distinguish a caller-supplied locality; it does not identify a unit, entrance, current use, controller or service requirement.`,
      },
      {
        heading: `Hickmans Green and The Marrish public spaces`,
        text: `Warwick District Council lists Hickmans Green and The Marrish under Warwick south-west and identifies each as a community park in Chase Meadow.`,
        sourceIds: ['wdc-community-parks'],
        serviceRelevance: `Use the names only to distinguish public-space assets from private addresses; the record does not prove a route, boundary, opening or person authorised to instruct work.`,
      },
      {
        heading: `Community-centre property, visit address and separate charity`,
        text: `Warwick District Council's January 2026 asset register records Chase Meadow Community Centre at Narrow Hall Meadow, Warwick, CV34 6BT and the council interest as freehold. The centre's current site gives the same visit address, while the Charity Commission identifies Chase Meadow Community Centre Ltd, charity 1156393, and states that the charity does not own or lease land or property.`,
        sourceIds: ['wdc-asset-list-2026', 'chase-meadow-community-centre', 'charity-commission-chase-meadow-community-centre-1156393'],
        serviceRelevance: `Keep the council's property interest, the centre's visit address and the charity's governance record separate. None identifies a current keyholder, entrance, installed lock or authority for a particular instruction.`,
      },
      {
        heading: `Chase Meadow Health Centre on Alder Meadow`,
        text: `The NHS service record identifies Chase Meadow Health Centre at The New Dispensary, 2 Alder Meadow, Warwick, CV34 6JY.`,
        sourceIds: ['nhs-chase-meadow-health-centre'],
        serviceRelevance: `Use this as the address of one managed health site only; it does not identify the relevant entrance, present facilities representative, access procedure or hardware.`,
      },
    ],
    sourceIds: ['wdc-local-plan', 'wdc-community-parks', 'wdc-asset-list-2026', 'chase-meadow-community-centre', 'charity-commission-chase-meadow-community-centre-1156393', 'nhs-chase-meadow-health-centre'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2, 3],
        heading: `Separating the Chase Meadow centre, community venue and health site during a lockout`,
        local: `Narrow Hall Meadow's planning label, the community centre at CV34 6BT and the health centre at CV34 6JY are different official references. None identifies the locked doorway or person entitled to approve entry. Record the complete address, organisation, building and exact private, shared, community or clinical threshold, then verify the caller against that opening rather than treating “Chase Meadow centre” as a sufficient location or authority statement.`,
        decision: `For the community centre, obtain the current premises or facilities contact and keep the asset register's recorded council freehold interest separate from the charity's governance record. For the health centre, follow the site's current access and representative arrangements; the NHS address is not an authorisation list. Inspect the confirmed door, frame, hinges and lock, then explain and document any change to the supported entry scope separately. Request renewed agreement only for a changed service-call price.`,
        checks: [
          `Name the full address, organisation and exact entrance; the planning, community-centre and NHS records do not identify it.`,
          `Verify the current property or facilities representative before inspecting or carrying out urgent entry at any managed site.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        heading: `A Chase Meadow lock change at Narrow Hall Meadow with the exact premises proved first`,
        local: `The local-centre entry and community-centre records both use Narrow Hall Meadow, but they do not identify the same kind of place or any particular lock. Record the full unit or venue address, exact entrance, reason for changing it and whether a private, shared or organisational key system is involved. For the community centre, distinguish the council's freehold interest from the charity that operates under a separate governance record before deciding who can instruct work.`,
        decision: `Obtain the current occupier, property, landlord or facilities requirement directly and match it to the identified opening. The planning designation supplies no product specification, while the charity record expressly does not show owned or leased property. Inspect the leaf, frame, hinges, keep and lock, then document repair versus replacement, measured component, supplied keys, retained parts, adjustment and any excluded shared-system or fabric work before approval rather than inferring scope from the venue name.`,
        checks: [
          `Identify the Narrow Hall Meadow unit or venue, exact entrance and current authorised controller.`,
          `Match replacement details and key control to measurements and attributed premises requirements, not locality labels.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 3],
        heading: `Diagnosing a Chase Meadow door at Alder Meadow or Narrow Hall Meadow`,
        local: `Neither the Narrow Hall Meadow planning record nor the NHS address for the Alder Meadow health centre shows that a reported entrance is uPVC, composite or multipoint. Identify the complete premises and exact door, then record material, open-or-closed state, key movement, handle travel, frame contact and locking-point action. Keep a symptom reported by a caller separate from one safely reproduced at inspection, especially where a managed clinical site controls access.`,
        decision: `For a health-centre opening, verify the current facilities representative and follow site arrangements before altering a component; the NHS listing supplies only a service address. At Narrow Hall Meadow, identify the actual unit rather than applying the centre label to a door. Inspect the cylinder where present, handle, faceplate, keeps, hinges and frame, using readable markings, centres, backset and locking layout to support alignment, repair or compatible-replacement options in writing.`,
        checks: [
          `At Alder Meadow or Narrow Hall Meadow, name the Chase Meadow door and record its material and mechanical behaviour.`,
          `Verify the health-site or unit representative separately, then support the Chase Meadow part shortlist with measured geometry.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2, 3],
        heading: `Boarding a verified Chase Meadow opening, not a park or institution label`,
        local: `A damaged opening described as Hickmans Green, The Marrish, the community centre or the health centre must first be tied to a physical asset and responsible controller. The park record proves no private boundary; the community-centre sources separate council interest, visit address and charity governance; the NHS record identifies one clinical site only. Record the complete location, exact pane, panel, door or frame, visible damage and surrounding material without assuming an entrance or attachment surface.`,
        decision: `Before handling the Chase Meadow opening, comply with any police instruction for preserving scene evidence. For a park asset, obtain the current council or facilities approval; for the community or health centre, verify the present premises contact and property responsibility. Public-space names and institutional records grant neither access nor fixing permission. Document measurements, proposed temporary material, attachment points, compromised hardware and later glazing, joinery or door work; record hidden substrate strength and permanent restoration as exclusions requiring later assessment by the relevant property controller or trade.`,
        checks: [
          `Tie the damaged opening to a physical asset and current controller; public-space and institution names are insufficient.`,
          `Preserve evidence and record temporary coverage, fixing permission and permanent repair as separate decisions.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        heading: `A Chase Meadow upgrade brief separating centre, parks and community premises`,
        local: `Narrow Hall Meadow's planning classification, the two named parks and the community-centre records do not establish security risk or prescribe hardware. Ask the authorised controller for the objective and identify the exact private, shared, public-space or community-premises entrance. Inspect leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where relevant, linking every option to observed condition rather than to a Chase Meadow place name, property interest or charity identity.`,
        decision: `For a park or community-centre asset, obtain the current facilities and property requirements directly; neither public listing nor freehold evidence alone authorises an alteration. For another Narrow Hall Meadow unit, identify its own occupier or controller. Match documented manager or insurer requirements to the measured assembly, then state relevant product evidence, retained hardware, key-control outcome and exclusions without implying council, centre or charity endorsement, certification or acceptance of a particular option.`,
        checks: [
          `Name the Chase Meadow park, centre or unit threshold and record its controller's specific upgrade objective.`,
          `Link every Chase Meadow option to measured assembly evidence without suggesting council, centre or charity endorsement.`,
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
        heading: `Othello Avenue local shopping centre`,
        text: `The adopted Warwick District Local Plan lists Othello Avenue, Warwick Gates, as a local shopping centre.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Use Othello Avenue to clarify location only, not to infer business use, proximity or an entrance type.`,
      },
      {
        heading: `Cordelia Green and Othello Park access`,
        text: `Warwick District Council lists Cordelia Green and Othello Park under Warwick Gates and names public access from surrounding roads and cycleways.`,
        sourceIds: ['wdc-community-parks'],
        serviceRelevance: `Public park access is not evidence of a route or permission for work at a private or managed opening.`,
      },
      {
        heading: `Council facilities-directory record for Warwick Gates Community Centre`,
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
        heading: `Stratford neighbourhood plan made in 2018`,
        text: `Stratford-on-Avon District Council made the Stratford-upon-Avon Neighbourhood Development Plan on 17 December 2018, making it part of the development plan used within its area.`,
        sourceIds: ['sdc-stratford-plan-page'],
        serviceRelevance: `Use the made plan as formal planning context only, not evidence about an address, customer or locksmith service.`,
      },
      {
        heading: `River Avon biodiversity corridor policy`,
        text: `Made-plan Policy NE2 identifies a River Avon biodiversity corridor and addresses proposals in the river's flood zone that could affect that corridor or its links.`,
        sourceIds: ['sdc-stratford-made-plan'],
        serviceRelevance: `Use the river only as verified spatial context and never infer a route, property flood status or coverage.`,
      },
      {
        heading: `Stratford conservation boundary and appraisal review`,
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
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Current official records distinguish the Tiddington Road scheduled Roman settlement, Alveston CofE Primary School on Knights Lane and the registered Tiddington Community Centre charity. The made Stratford plan separately records the village boundary, strategic gaps and Tiddington Fields policies.`,
      `Each fact is limited to its named site, organisation or planning geography. None identifies a private property's status, the current controller of an entrance, a route across scheduled or allocated land, installed hardware or a locksmith fault.`,
    ],
    accessGuidance: `Use the full Tiddington address, building and threshold. Distinguish the Tiddington Road monument, Knights Lane school, charity contact on Beeches Walk and the mapped Tiddington Fields context, then identify the current person responsible for the actual opening without assuming access across protected or allocated land.`,
    evidenceLimits: `The scheduled record is not a door survey, the school entry does not publish a keyholder, the charity's Beeches Walk address is a registered contact rather than proof of the venue entrance, and planning policies establish no ownership, private route, hardware, damage, service coverage or response.`,
    facts: [
      {
        heading: `Tiddington Roman Settlement scheduled record`,
        text: `Historic England records Tiddington Roman Settlement at Tiddington Road, CV37 7SA, as Scheduled Monument 1003741 containing buried remains of a Romano-British roadside settlement.`,
        sourceIds: ['historic-england-tiddington-roman-settlement-1003741'],
        serviceRelevance: `The scheduling applies to the mapped archaeological site; it neither describes a present building entrance nor establishes public access, condition or work authority.`,
      },
      {
        heading: `Alveston Primary School in Tiddington`,
        text: `The Department for Education records Alveston CofE Primary School at Knights Lane, Tiddington, Stratford-upon-Avon, CV37 7BZ.`,
        sourceIds: ['dfe-alveston-primary-tiddington'],
        serviceRelevance: `This identifies one managed education site only; it does not name a current keyholder, door, access right, installed hardware or fault.`,
      },
      {
        heading: `Tiddington Community Centre charity record`,
        text: `The Charity Commission records Tiddington Community Centre as charity 1093526, describes its community-management purpose and gives a registered contact address at Touchwood, Beeches Walk, Tiddington, CV37 7AT.`,
        sourceIds: ['charity-commission-tiddington-community-centre-1093526'],
        serviceRelevance: `Beeches Walk is the register contact address, not evidence of the venue entrance, present keyholder, caller authority or fitted door hardware.`,
      },
      {
        heading: `Tiddington boundary, strategic gaps and Fields policy`,
        text: `The made Stratford plan records Tiddington as a Category 1 Local Service Village with a built-up-area boundary, maps strategic gaps toward Stratford-upon-Avon and Alveston, and allocates southern Tiddington Fields for community orchards, woodland and open space.`,
        sourceIds: ['sdc-stratford-made-plan'],
        serviceRelevance: `Treat the planning geography as bounded locality context only; it does not prove a route, present land use, private access or service reach.`,
      },
    ],
    sourceIds: ['historic-england-tiddington-roman-settlement-1003741', 'dfe-alveston-primary-tiddington', 'charity-commission-tiddington-community-centre-1093526', 'sdc-stratford-made-plan'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [1, 2],
        heading: `Separating the Tiddington school from the community-centre contact`,
        local: `Alveston CofE Primary School is recorded on Knights Lane, while the Charity Commission gives Touchwood on Beeches Walk as Tiddington Community Centre's registered contact address. Those records identify different references and neither tells which entrance an urgent call concerns. Obtain the complete address, organisation, building and exact private, staff or shared threshold, and ask for the present site representative rather than treating a registered contact as a venue door or keyholder.`,
        decision: `Verify identity and permission for the requested opening through the responsible organisation or property controller. The school and charity entries provide no live access authority, fitted lock or fault diagnosis. Inspect the confirmed door, frame, hinges and locking components before explaining the supported method and expected charge; if findings change the service-call price or scope, obtain fresh agreement. Record any unavailable site contact explicitly instead of substituting a public register entry for consent.`,
        checks: [
          `Distinguish Knights Lane from the Beeches Walk contact and record the exact organisation, building and threshold.`,
          `Verify the present authorised representative; neither the school nor charity record supplies live access permission.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        heading: `A Tiddington lock change with monument and charity limits kept clear`,
        local: `The Tiddington Road scheduled monument is a mapped archaeological site, while the community-centre charity record describes an organisation and registered contact. Neither establishes the status or fabric of another property. Identify the exact building and threshold, obtain the current owner's, occupier's or manager's replacement objective, and check whether any scheduled or managed-site issue actually relates to that address rather than extending either record across Tiddington.`,
        decision: `Inspect the existing lock, leaf, frame, hinges, keeps and shared components before deciding between repair, adjustment and replacement. A legacy or statutory place record cannot specify a modern component, and the charity register cannot authorise a change. The written schedule should name measurements, retained parts, keys, fitting, adjustment and excluded communal work, with any heritage, landlord or site requirement attributed to a current property-specific source and approved by the responsible controller.`,
        checks: [
          `Resolve the precise property against any relevant monument boundary and identify the current entrance controller.`,
          `Specify repair or replacement from the measured assembly and separately evidence every external requirement.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Door-specific uPVC diagnosis at a Tiddington managed site`,
        local: `Neither the Knights Lane school record nor the community-centre charity entry identifies a uPVC door, multipoint mechanism or affected entrance. For a managed-site or private request, record the exact building and threshold, material, handle travel, key movement, frame contact and locking-point action. Label any safe open-versus-closed comparison as reported, reproduced or not tested, and do not infer construction or site authority from the organisation name or registered contact address.`,
        decision: `Confirm the current representative responsible for the opening separately from diagnosing it. Inspect the handle, cylinder where present, faceplate, hinges, keeps and frame; use readable markings, centres, backset and locking layout to narrow compatibility only after that evidence exists. Record alignment, mechanism and cylinder findings as separate questions and preserve photographs and measurements supporting the shortlist, because neither official address record supplies a part number or permission to repair.`,
        checks: [
          `Record the exact building, threshold, material and handle, key, frame and locking-point symptoms.`,
          `Verify the current site controller and use markings and measurements—not an organisation name—to shortlist parts.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 2, 3],
        heading: `Boarding a named Tiddington opening without crossing evidence boundaries`,
        local: `The scheduled Roman settlement, the community-centre charity and the Tiddington Fields planning allocation describe three different contexts. A damaged opening must be tied to a named building and controller rather than to archaeological, charity-contact or open-space geography. Confirm the precise scene and lawful approach, photograph and measure the pane, panel, frame or door, and record visible surrounding damage while leaving hidden condition and attachment capacity unresolved until the material can be inspected safely.`,
        decision: `Follow any police evidence-preservation instruction before temporary work, then obtain approval from the actual property or site controller. Scheduling and strategic-gap policy establish no route across land; the charity record identifies no venue doorway or keyholder. Record intended coverage, attachment positions, compromised hardware and permanent glazing, joinery, door or structural work outstanding. That handover keeps an immediate temporary measure separate from reinstatement and avoids presenting locality records as construction evidence or permission.`,
        checks: [
          `Identify the named building, lawful approach, damaged opening and current controller before specifying coverage.`,
          `Preserve evidence and document attachment and later repairs without treating scheduling, charity or plan records as consent.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        heading: `A measured Tiddington upgrade with site status and authority separated`,
        local: `The Roman settlement, Alveston school and community-centre charity are exact records, but none demonstrates a security weakness or standard for another entrance. Identify the property, building and current controller, then record the authorised objective and inspect the leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable. Connect each proposed measure to an observed condition rather than to scheduled status, institutional use or a charity's contact address.`,
        decision: `For the named monument or a managed site, confirm address-specific status and approval before any visible alteration; do not assume the school and community centre share a controller or threshold. Match a documented insurer, landlord or facilities requirement to the actual assembly. The written comparison should state measurements, product evidence, retained hardware, excluded communal work and dependencies, explaining conditional improvement without implying that one component guarantees the whole entrance.`,
        checks: [
          `Identify the exact site, entrance and authorised objective; official locality records are not security standards.`,
          `Match product evidence and property-specific approvals to the inspected assembly and document exclusions.`,
        ],
      },
    },
  },
  {
    slug: 'bishopton',
    name: 'Bishopton',
    region: 'Warwickshire',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Current official records distinguish Bishopton Community Centre and Bishopton Primary School on Drayton Avenue from Stratford Park and Ride off Bishopton Lane. The made Stratford plan separately identifies Burton Farm at Bishopton Hamlet north of the A46 as a plan-era small-industrial-unit location.`,
      `These records establish named sites and bounded locality context only. They do not identify a current individual keyholder, the requested entrance, public access outside stated arrangements, present use at Burton Farm, fitted hardware or a locksmith fault.`,
    ],
    accessGuidance: `Record the complete Bishopton address, building and threshold. Distinguish the community centre from the primary school on Drayton Avenue, the Park and Ride off Bishopton Lane and any Burton Farm unit, then identify the present occupier, site representative or other person responsible for the exact opening.`,
    evidenceLimits: `The charity, school and visitor-site pages identify organisations or public sites without granting locksmith authority. The made plan is not a current Burton Farm survey. None proves a private route, current keyholder, entrance construction, lock type, condition, service coverage or response time.`,
    facts: [
      {
        heading: `Bishopton Community Centre charity and hall role`,
        text: `The Charity Commission records Bishopton Community Centre CIO, charity 1188894, and describes its purpose as renting the community centre on Drayton Avenue from Warwickshire County Council and hiring the hall to local groups.`,
        sourceIds: ['charity-commission-bishopton-community-centre-1188894'],
        serviceRelevance: `The register identifies the charity and its stated role, not a current individual keyholder, exact entrance, caller authority or installed hardware.`,
      },
      {
        heading: `Bishopton Primary School on Drayton Avenue`,
        text: `The Department for Education records Bishopton Primary School at Drayton Avenue, Stratford-upon-Avon, CV37 9PB.`,
        sourceIds: ['dfe-bishopton-primary'],
        serviceRelevance: `The school is a distinct managed site; the record does not identify a requested door, public access, present keyholder or authority for work.`,
      },
      {
        heading: `Stratford Park and Ride off Bishopton Lane`,
        text: `Stratford-on-Avon District Council locates Stratford Park and Ride off Bishopton Lane near the A46 and A3400 at CV37 0RJ and records more than 700 spaces plus a passenger terminal.`,
        sourceIds: ['sdc-stratford-park-and-ride'],
        serviceRelevance: `This public visitor record is orientation only; it does not identify a private route, controlled entrance, responsible keyholder or door condition.`,
      },
      {
        heading: `Burton Farm industrial units in the made plan`,
        text: `The made Stratford plan identifies Burton Farm at Bishopton Hamlet north of the A46 as a location where small industrial units had been established in converted farm buildings.`,
        sourceIds: ['sdc-stratford-made-plan'],
        serviceRelevance: `For a Burton Farm instruction, verify the present unit, use and authorised manager; plan-era wording cannot establish current control, fabric or access.`,
      },
    ],
    sourceIds: ['charity-commission-bishopton-community-centre-1188894', 'dfe-bishopton-primary', 'sdc-stratford-park-and-ride', 'sdc-stratford-made-plan'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        heading: `Resolving the Drayton Avenue site before a Bishopton lockout`,
        local: `Bishopton Community Centre and Bishopton Primary School are separate managed sites on Drayton Avenue, while Stratford Park and Ride is off Bishopton Lane at CV37 0RJ. An urgent request must name the organisation or property, building and exact private, staff, shared or terminal entrance. Use the postcode only to disambiguate the destination, then identify the present representative responsible for the threshold rather than assuming one Drayton Avenue contact controls another site.`,
        decision: `The charity register, school directory and council visitor page identify sites but no live keyholder or locksmith permission. Verify the requester's identity and authority for the named opening, inspect the lock with its door, frame and hinges, and explain the supported method and expected charge before work. If observations change the service-call scope or price, obtain fresh agreement; public opening information or a registered organisational role is not consent for access.`,
        checks: [
          `Distinguish the community centre, primary school and Park and Ride and name the exact building and threshold.`,
          `Verify the present authorised representative; no public site record supplies a live keyholder or access consent.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 3],
        heading: `A Bishopton lock change with site control and fabric verified`,
        local: `A community-centre hall, primary school and Burton Farm unit have different control arrangements even though official records place each within Bishopton context. Name the precise building and entrance, obtain the present manager's or property controller's replacement objective and resolve shared-door responsibility. The charity's rental purpose, the school address and plan-era converted-farm wording establish neither current occupation nor which person may change a particular lock.`,
        decision: `Inspect the existing lock, leaf, frame, hinges and keep before distinguishing repair, adjustment and replacement. Burton Farm's plan description cannot prove modern fabric, and neither Drayton Avenue record supplies a technical specification. The written schedule should state measured components, key-control outcome, retained parts, fitting, adjustment and excluded communal work, with every facilities, landlord or insurer requirement obtained directly and matched to the inspected threshold before approval.`,
        checks: [
          `Identify the exact community, school or Burton Farm entrance and the current person entitled to approve change.`,
          `Specify the change from measurements and inspected condition and attribute every external requirement.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 3],
        heading: `Bishopton uPVC diagnosis independent of hall or farm-building history`,
        local: `The community-centre charity record and Burton Farm's converted-building description do not show that an affected entrance is uPVC, composite, timber or fitted with multipoint locking. Identify the exact hall, unit, home or shared threshold, then record door material, handle travel, key movement, frame contact and locking-point action. Mark any safe open-versus-closed comparison as reported, reproduced or not tested rather than assigning alignment or mechanism failure from a site's past use.`,
        decision: `Confirm the current controller separately from the mechanical diagnosis. Inspect the handle, cylinder where present, full faceplate, hinges, keeps and frame; use readable codes, centres, backset and locking layout to narrow compatible parts only after direct evidence exists. Record cylinder sizing, alignment work and mechanism replacement as separate questions, preserving photographs and measurements behind the shortlist because neither an organisational purpose nor planning-era conversion supplies a part number or approval.`,
        checks: [
          `Name the exact opening and record its material, handle, key, frame and locking-point behaviour.`,
          `Use faceplate evidence and measurements to shortlist parts and verify present site authority separately.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        heading: `Temporary boarding at the correct Bishopton managed site`,
        local: `The community centre, primary school and Park and Ride are three different managed settings. A damage report must specify the organisation, building and pane, panel, frame or door rather than relying on Drayton Avenue, Bishopton Lane or a nearby landmark. Identify the actual controller, lawful approach and public, staff or shared threshold, then photograph and measure visible damage while leaving hidden condition and attachment capacity unresolved until the surrounding material can be inspected safely.`,
        decision: `Follow any police evidence-preservation instruction before temporary work and obtain approval from the current site or property controller. The charity register does not name a keyholder, the school record grants no access, and visitor information for the Park and Ride is not work authority. Record intended coverage, proposed attachment positions, compromised hardware and permanent glazing, joinery, door or structural work outstanding so immediate securing remains distinct from reinstatement.`,
        checks: [
          `Name the managed site, exact damaged opening, lawful approach and present controller before specifying coverage.`,
          `Preserve evidence and document temporary attachment and follow-on work without treating public records as consent.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `A Bishopton upgrade brief grounded in the inspected entrance`,
        local: `Community-centre use, a school address and Burton Farm's plan-era history do not demonstrate security need or prescribe hardware. Identify the exact premises and current controller, obtain a written objective, and inspect the individual leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable. Connect each proposed measure to an observed condition rather than institutional use, a converted-building description or the broader Bishopton name.`,
        decision: `Separate responsibility for a shared hall, school or unit entrance from any private opening and confirm present Burton Farm use rather than relying on the made plan. Match an approved facilities, landlord or insurer requirement to the actual assembly. The comparison should state product evidence, measurements, retained hardware, excluded communal work and dependencies, explaining conditional improvement without implying endorsement or that one component guarantees the entire door set.`,
        checks: [
          `Identify the exact premises, current controller and written objective before assessing the whole door set.`,
          `Match measured product evidence and direct requirements to the threshold and document shared-work exclusions.`,
        ],
      },
    },
  },
  {
    slug: 'shottery',
    name: 'Shottery',
    region: 'Warwickshire',
    reviewedOn: CURRENT_PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish Shottery Conservation Area, Shottery Fields, Shottery St Andrew's school on Hathaway Lane and Grade I Anne Hathaway's Cottage on Cottage Lane.`,
      `The school and cottage are exact separate assets, and the designations have their own boundaries. None identifies a current site representative, requested opening, caller authority, route, hardware or condition; the list entry's legacy description is not a modern door survey.`,
    ],
    accessGuidance: `Obtain the full Shottery address and exact threshold. Distinguish the Hathaway Lane school, Cottage Lane cottage and Shottery Fields, then verify the current representative and any address-specific status separately.`,
    evidenceLimits: `The conservation and green-space records, school register and Grade I list entry establish bounded context or named-site identity only. They do not prove present control, access, hardware, condition, consent, coverage, response or prior locksmith work.`,
    facts: [
      {
        heading: `Shottery Conservation Area designation and appraisal`,
        text: `Shottery Conservation Area was originally designated in 1969, and the council approved its reviewed appraisal as its formal view on 20 July 1992.`,
        sourceIds: ['sdc-shottery-conservation'],
        serviceRelevance: `Check the current boundary and verify the particular building's status before visible alteration or heritage wording.`,
      },
      {
        heading: `Shottery Fields designated Local Green Space`,
        text: `Made neighbourhood-plan Policy CLW3 identifies Shottery Fields as one of the plan area's designated Local Green Spaces.`,
        sourceIds: ['sdc-stratford-made-plan'],
        serviceRelevance: `Use Shottery Fields as verified locality context only and never infer private-property access across the green space.`,
      },
      {
        heading: `Shottery primary school on Hathaway Lane`,
        text: `The Department for Education records Shottery St Andrew's CofE Primary School at 3 Hathaway Lane, Stratford-upon-Avon, CV37 9BL.`,
        sourceIds: ['dfe-shottery-st-andrews'],
        serviceRelevance: `Use the record only to identify the Hathaway Lane school; verify its present representative, requested opening and work authority directly.`,
      },
      {
        heading: `Grade I Anne Hathaway's Cottage on Cottage Lane`,
        text: `Historic England identifies Anne Hathaway's Cottage on Cottage Lane, Shottery, as a Grade I listed building under entry 1298551.`,
        sourceIds: ['historic-england-anne-hathaways-cottage-1298551'],
        serviceRelevance: `Apply Grade I status only to this exact asset; the entry does not establish current condition, installed hardware, control or permission for work.`,
      },
    ],
    sourceIds: ['sdc-shottery-conservation', 'sdc-stratford-made-plan', 'dfe-shottery-st-andrews', 'historic-england-anne-hathaways-cottage-1298551'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [2, 3],
        heading: `Distinguishing Hathaway Lane school from Cottage Lane during a Shottery urgent call`,
        local: `Shottery St Andrew's school on Hathaway Lane and Anne Hathaway's Cottage on Cottage Lane are separately recorded sites. Neither source identifies the entrance in an urgent request or publishes a live keyholder chain. Record the complete address, named building, door or gate position and whether the threshold is public-facing, staff, shared or private before establishing which site, if either, the caller means.`,
        decision: `For the school or cottage, identify the current person entitled to request entry; for another Shottery property, verify the caller against that premises without transferring authority from either landmark. Inspect the lock, latch, leaf, frame and hinges before choosing an opening approach. Provide the available method and price information before work, and obtain fresh agreement if direct inspection changes the supported scope or charge.`,
        checks: [
          `Separate the Hathaway Lane school, Cottage Lane cottage and any unrelated threshold at the full address.`,
          `Verify authority and explain the inspected opening method and price before work starts.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 3],
        heading: `A Shottery repair-or-change decision with Cottage Lane kept asset-specific`,
        local: `Shottery Conservation Area has a mapped extent, while Grade I status belongs specifically to Anne Hathaway's Cottage. Identify the customer's property and threshold before either record is used. Establish whether the request follows a mechanical fault, lost keys, damage or a key-control change, and confirm the person responsible for approving that component without extending the cottage designation to another Cottage Lane address.`,
        decision: `Inspect the lock with the leaf, frame, hinges, keep and protective furniture to distinguish alignment, serviceable parts and irreparable damage before recommending a change. Capture the lock type, faceplate or case markings, backset, centres, cylinder dimensions and relevant fixings. Document compatible options, retained hardware, keys, fitting, adjustments and exclusions, while routing any proposal-specific listed or conservation requirement through the verified property process separately.`,
        checks: [
          `Confirm the exact property, repair-or-change objective and current approving party.`,
          `Measure the assembly and keep cottage or conservation requirements separate from technical compatibility.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Diagnosing a Shottery multipoint fault without Fields or school assumptions`,
        local: `Shottery Fields and the Hathaway Lane school identify different places but reveal no door material or locking mechanism. Name the exact entrance, then record how the key turns, how far the handle travels, which locking points move and where the leaf meets the frame. Treat each symptom as reported, safely reproduced or untested instead of assuming uPVC, alignment failure or a broken gearbox from the location.`,
        decision: `If the affected opening belongs to the school, verify the present facilities contact independently; a reference to the Fields may be orientation only. Inspect the handle, cylinder where present, faceplate, keeps, hinges and frame. Use readable codes plus centres, backset, locking layout and cylinder fit to separate furniture, alignment, cylinder and multipoint-mechanism questions, preserving the observations that support any repair or compatible replacement shortlist.`,
        checks: [
          `Classify handle, key, locking-point and frame symptoms from the named Shottery opening.`,
          `Verify school responsibility separately and support every component option with markings and measurements.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 2, 3],
        heading: `Securing the identified Shottery school, cottage or other damaged opening`,
        local: `A damage report must distinguish the Hathaway Lane school, Grade I cottage on Cottage Lane and every other property within or outside the current conservation boundary. Record the full address, elevation and individual pane, panel, door or frame, then identify the person currently responsible for temporary work. The school register and list entry report no incident, construction detail, controller or suitable attachment location.`,
        decision: `Follow any police evidence-preservation instruction before disturbing the scene. After release, photograph visible damage, inspect accessible surrounding material, measure the exposed span and mark hidden or unsafe conditions as unresolved. For the cottage, obtain property-specific guidance for the defined temporary proposal; for the school, verify its current representative. State intended coverage, compromised locks and later glazing, joinery, door or structural work separately so temporary boarding is not final reinstatement.`,
        checks: [
          `Name the school, cottage or other Shottery opening and its current authorised contact.`,
          `Preserve evidence, define temporary coverage and record every permanent repair still required.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `A whole-doorset Shottery upgrade with the Grade I asset isolated`,
        local: `The conservation designation, Shottery Fields policy and Anne Hathaway's Cottage entry do not demonstrate a security weakness at an unspecified entrance. Obtain the authorised objective for the named door, then inspect leaf and frame condition, hinge support, keep engagement, handle operation, lock function, cylinder fit where present and existing protective furniture. Connect each possible improvement to the particular observed issue it is intended to address.`,
        decision: `If the cottage is the actual asset, use its current property process for a defined proposal; do not transfer Grade I status or legacy fabric descriptions elsewhere. If Fields infrastructure is involved, identify its responsible manager rather than assuming a domestic door. Compare measured compatibility and relevant product evidence, identify retained parts, key-control outcome and fabric work, and record conservation, listing, lease or management criteria separately without implying official endorsement.`,
        checks: [
          `Tie every upgrade option to the inspected Shottery door and its authorised objective.`,
          `Keep the cottage designation and Fields management separate from measurements and product evidence.`,
        ],
      },
    },
  },
  {
    slug: 'kenilworth',
    name: 'Kenilworth',
    region: 'Warwickshire',
    reviewedOn: CURRENT_PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish Kenilworth's made neighbourhood plan, the conservation designation and named extensions, St Nicholas school at The Blundells and Kenilworth Library and Information Centre at Smalley Place, CV8 1QG.`,
      `The school and library are separate exact sites, while the plan and conservation history operate more broadly. None establishes the requested entrance, current controller, caller authority, installed lock, present condition, private route or service history.`,
    ],
    accessGuidance: `Use the complete Kenilworth address and exact threshold. Distinguish The Blundells school from the Smalley Place library, and verify the current site representative and property status independently.`,
    evidenceLimits: `Plan scope, historic extension names, the school register and library page are locality or named-site evidence only. They do not establish building control, access, listing, door material, hardware, condition, coverage, response, demand or prior work.`,
    facts: [
      {
        heading: `Kenilworth neighbourhood plan made in 2018`,
        text: `Warwick District Council made the Kenilworth Neighbourhood Plan on 16 November 2018 following the 15 November referendum and uses it for planning applications within Kenilworth.`,
        sourceIds: ['wdc-kenilworth-plan-page'],
        serviceRelevance: `Use the plan as formal settlement planning context only, not evidence about a property, entrance or service.`,
      },
      {
        heading: `Kenilworth conservation designation and extensions`,
        text: `The conservation guide says Kenilworth's first conservation area was designated in 1971 and that 2005 extensions included Waverley Road, Station Road and Clarendon Road.`,
        sourceIds: ['wdc-kenilworth-conservation'],
        serviceRelevance: `Resolve the current boundary for the exact address and verify listed status separately before visible changes.`,
      },
      {
        heading: `St Nicholas Primary School in Kenilworth`,
        text: `The Department for Education records St Nicholas CofE Primary School at The Blundells, Kenilworth, CV8 2PE.`,
        sourceIds: ['dfe-kenilworth-st-nicholas-primary'],
        serviceRelevance: `Use the record only to identify this school site; confirm its current representative, affected entrance and authority separately.`,
      },
      {
        heading: `Kenilworth Library at Smalley Place`,
        text: `Warwickshire County Council identifies Kenilworth Library and Information Centre at Smalley Place, Kenilworth, CV8 1QG.`,
        sourceIds: ['wcc-kenilworth-library'],
        serviceRelevance: `Use Smalley Place only to identify the library site, not to infer its controller, access arrangements, hardware or work authority.`,
      },
    ],
    sourceIds: ['wdc-kenilworth-plan-page', 'wdc-kenilworth-conservation', 'dfe-kenilworth-st-nicholas-primary', 'wcc-kenilworth-library'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [2, 3],
        heading: `Resolving The Blundells and Smalley Place during a Kenilworth lockout`,
        local: `St Nicholas school at The Blundells and Kenilworth Library at Smalley Place are two separately recorded sites. Neither page identifies a current keyholder, caller or urgent doorway. Obtain the complete address and building name, then distinguish the particular gate, public entrance, staff door, common threshold or private unit before checking whether either managed site is involved or merely being used as orientation.`,
        decision: `Confirm the requester's identity and authority with the present person entitled to request entry for a school or library opening, or verify both directly against any unrelated Kenilworth premises. Inspect the latch or lock together with the leaf, frame and hinges before choosing a method. Explain the access approach supported by that condition and give available price information in advance; if inspection changes scope or charge, obtain fresh agreement before proceeding.`,
        checks: [
          `Distinguish The Blundells school, Smalley Place library and any unrelated controlled entrance.`,
          `Verify authority and confirm the inspected opening approach and price information before work.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 3],
        heading: `Repair or replacement at Smalley Place or another Kenilworth address`,
        local: `The conservation guide names historic extensions, while the county page identifies one library at Smalley Place. Establish the exact property, door and responsible decision-maker before either record is applied. Record whether the objective is to restore reliable operation, respond to damaged hardware, replace missing-key access or change key control, and whether visible door material or a managed system could fall outside the requested lock work.`,
        decision: `Inspect the existing lock, leaf, frame, hinges, keep and protective furniture before separating adjustment, repair and replacement. Read available markings and measure the case or faceplate, backset, centres, cylinder dimensions and fixings needed for compatibility. Check current conservation, listing or management requirements only against that address and defined proposal, then record retained components, keys, fitting, adjustment, fabric work, exclusions and the person approving the instruction.`,
        checks: [
          `Name the Smalley Place library or other property, its door and the authorised repair-or-change objective.`,
          `Measure the assembly and keep address-level approvals separate from component compatibility.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 2],
        heading: `Diagnosing a Kenilworth multipoint fault without plan or school assumptions`,
        local: `Neither the made plan nor the St Nicholas school address shows that a reported door is uPVC, composite, timber or fitted with a multipoint strip. Identify the precise threshold and record door material, key rotation, handle travel, locking-point movement and contact with the frame. Mark each symptom as caller-reported, safely reproduced or untested rather than treating a Kenilworth or institutional label as a component diagnosis.`,
        decision: `For a school entrance, verify its current facilities representative separately; the establishment record contains no hardware schedule or repair authority. Inspect the handle, cylinder where fitted, faceplate, keeps, hinges and frame at the actual opening. Use readable manufacturer information, centres, backset, locking layout and cylinder fit to distinguish alignment, furniture, cylinder and mechanism questions, and preserve the observations supporting any compatible component shortlist.`,
        checks: [
          `Record the exact door material and key, handle, locking-point and frame behaviour.`,
          `Verify the school contact separately and base the repair shortlist on readable evidence and measurements.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2, 3],
        heading: `Temporary security at the Kenilworth school, library or another damaged opening`,
        local: `The conservation record, The Blundells school and Smalley Place library answer different status or identity questions, but none reports an incident. Identify the complete property, elevation and individual window, panel, leaf or frame, then establish the present contact authorised to approve temporary work. Photograph visible damage and surrounding material without assuming that the school or library page describes construction, scene control or a usable attachment point.`,
        decision: `Observe any police evidence-preservation instruction before inspection or coverage. Once released, measure the exposed opening, inspect accessible surrounding material and record compromised locks, intended temporary extent and conditions that remain hidden or unsafe to test. Resolve conservation, listing or management requirements only for the verified asset and proposal. List outstanding glazing, joinery, door, lock or structural work separately, making clear that temporary boarding is not permanent reinstatement.`,
        checks: [
          `Identify the school, library or other damaged Kenilworth opening and its current authorised contact.`,
          `Preserve scene evidence, define temporary coverage and record permanent follow-up separately.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `A measured Kenilworth upgrade brief with Smalley Place kept site-specific`,
        local: `The neighbourhood plan, conservation history and Smalley Place library record do not show that any Kenilworth entrance needs upgraded hardware. Begin with the authorised controller's stated outcome for the exact door, then inspect leaf and frame condition, hinge support, keep engagement, handle operation, lock function, cylinder fit where present and existing protective furniture. Relate every possible measure to a condition actually recorded at that threshold.`,
        decision: `If the library is involved, obtain its current site requirement rather than treating the county page as a security specification. Elsewhere, verify conservation, listing, lease or management controls only where the defined option engages them. Compare dimensions and relevant product documentation, state the weakness each option addresses and identify retained parts, key-control outcome, fabric work and exclusions, keeping public records outside any claim of certification or endorsement.`,
        checks: [
          `Start with the exact Kenilworth door, complete assembly and authorised upgrade objective.`,
          `Record measured product evidence and applicable property controls without using the library page as endorsement.`,
        ],
      },
    },
  },
  {
    slug: 'balsall-common',
    name: 'Balsall Common',
    region: 'West Midlands',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Solihull Council made the Balsall Parish Neighbourhood Development Plan on 17 June 2021. The plan says Balsall Common straddles Balsall and Berkswell parishes and applies only to the Balsall-parish part of the settlement.`,
      `The Department for Education separately identifies Balsall Common Primary School on Balsall Street East, while Solihull Council places Balsall Common Library at 283 Kenilworth Road. These are two managed sites, not evidence about another address, its controller or entrance.`,
    ],
    accessGuidance: `Obtain the complete Balsall Common address and resolve whether it lies in Balsall or Berkswell parish before using Balsall-plan context. If the instruction concerns the school or library, name the site, exact gate or door and current authorised representative; otherwise keep both public-site records outside the booking.`,
    evidenceLimits: `The Balsall plan does not cover the whole settlement, and the school and library pages identify only their named sites. None proves another property's parish, use, tenure, controller, access, door material, installed hardware, condition, incident, service demand, route, coverage, response time or previous work.`,
    facts: [
      {
        heading: `Balsall parish plan made in 2021`,
        text: `Solihull Metropolitan Borough Council made the Balsall Parish Neighbourhood Development Plan on 17 June 2021 for use in planning decisions within its neighbourhood area.`,
        sourceIds: ['solihull-balsall-plan-page'],
        serviceRelevance: `Use made-plan status only after confirming the address is within the Balsall Parish neighbourhood area.`,
      },
      {
        heading: `Balsall Common spans Balsall and Berkswell`,
        text: `The made plan states that Balsall Common straddles Balsall and Berkswell parishes and expressly applies only to the Balsall-parish portion of the settlement.`,
        sourceIds: ['solihull-balsall-made-plan'],
        serviceRelevance: `Fail closed on parish-plan claims until the exact address is resolved to Balsall rather than Berkswell parish.`,
      },
      {
        heading: `Balsall Common Primary School address`,
        text: `The Department for Education records Balsall Common Primary School at Balsall Street East, Balsall Common, Coventry, CV7 7FS.`,
        sourceIds: ['dfe-balsall-common-primary'],
        serviceRelevance: `At this managed education site, identify the gate, building or door and current authorised representative; the record grants no access or work authority.`,
      },
      {
        heading: `Balsall Common Library on Kenilworth Road`,
        text: `Solihull Metropolitan Borough Council identifies Balsall Common Library at 283 Kenilworth Road, Balsall Common, Coventry, CV7 7EL.`,
        sourceIds: ['solihull-balsall-library'],
        serviceRelevance: `At the library, identify the exact opening and current authorised site contact; the public page supplies no keyholder, access right, hardware or condition evidence.`,
      },
    ],
    sourceIds: ['solihull-balsall-plan-page', 'solihull-balsall-made-plan', 'dfe-balsall-common-primary', 'solihull-balsall-library'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        heading: `Separating the Balsall Common plan area from a school lockout`,
        local: `The made plan identifies a Balsall neighbourhood area, while the Department for Education record identifies one school on Balsall Street East. Neither identifies the caller or a locked opening. Start with the full address, postcode and precise private, shared, gate or building threshold. If the school is involved, record the named block or entrance and obtain a current authorised representative; if it is only a landmark, keep the school record outside the access instruction.`,
        decision: `Confirm the requester's relationship to the exact premises before inspecting the latch, deadlock, door, frame and hinges. The plan can support locality wording only inside its mapped area, and the school page cannot establish a keyholder or facilities authority. Explain the opening approach and price supported by the inspected assembly, recording any drilling, replacement or later repair separately. If the service-call price changes after inspection, obtain fresh agreement before that price applies, without using plan status or a public-school address as permission.`,
        checks: [
          `Record the full Balsall Common address and exact threshold before applying plan or school context.`,
          `At the school, identify the named entrance and current authorised representative rather than relying on its public address.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 3],
        heading: `Resolving the Balsall Common parish and library threshold before a lock change`,
        local: `Balsall Common crosses Balsall and Berkswell parishes, but the cited plan applies only to the Balsall-parish portion. Resolve the complete address before attributing that planning context. A reference to 283 Kenilworth Road identifies Balsall Common Library only; it does not describe another property or name the person responsible for its locks. Record the affected private, shared or managed door, the reason key control must change and the party authorised to approve it.`,
        decision: `At the library, confirm the exact external or internal opening and a current site representative rather than treating the council page as authority. Elsewhere, omit the library fact from the property decision. Inspect both faces of the furniture, the door edge, case or cylinder, keep and alignment, then record readable markings and dimensions. The written scope should distinguish retained parts, measured replacement, supplied keys, fitting, adjustment and any management approval. Parish resolution governs evidence attribution only; it cannot select a component or approve the work.`,
        checks: [
          `Resolve Balsall or Berkswell parish without turning the result into a lock or authority claim.`,
          `At 283 Kenilworth Road, name the library opening and current decision-maker before specifying replacement.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `A Balsall Common uPVC diagnosis tied to one address and school door`,
        local: `The cross-parish settlement record cannot show that a Balsall Common door is uPVC, composite or multipoint. Confirm the address and material directly. If the enquiry concerns Balsall Common Primary School, add the gate, block or exact door and current authorised facilities contact; the DfE address does not describe its installed mechanism. For any threshold, record separate accounts of key rotation, handle travel, locking-point movement and frame contact, marking what was observed and what was only reported.`,
        decision: `Resolve whether the address is in Balsall or Berkswell parish only for accurate locality evidence, not diagnosis. At the identified opening, photograph the complete faceplate and readable marks and measure centres, backset, locking layout, cylinder fit, hinges and keeps. Compare operation safely with the door open and closed where possible, without treating that comparison as proof of a failed part. The repair note should distinguish alignment, gearbox, strip and cylinder questions and retain the measurements supporting any compatible shortlist, independently of the parish or school record.`,
        checks: [
          `Resolve the parish for attribution but identify material and mechanism only at the affected door.`,
          `For school work, name the exact gate or opening and obtain current site authority before removing parts.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [0, 3],
        heading: `Identifying a Balsall Common library or private opening before boarding`,
        local: `A damaged opening must be identified by full address, elevation and doorway. The made Balsall plan supplies neighbourhood-scale context only, while the council's 283 Kenilworth Road record identifies the library as one managed site. If the library is named, confirm that exact premises, the external or internal opening and a current authorised representative. If it is merely nearby, do not transfer the public-site record to the damaged property or assume a route, controller, material or attachment point.`,
        decision: `If police have issued evidence-preservation directions for the Balsall Common scene, follow them before inspecting or moving damaged material. Once released, photograph the point of entry, surviving frame, glazing or door material, damaged hardware and adjacent surfaces before coverage. Measure the authorised opening and record the intended temporary coverage and its limits, leaving concealed support condition unresolved. Neither plan status nor a library address supplies a current controller or work authority. The handover should identify what was covered and separate glazing, joinery, door, lock and structural follow-up from permanent reinstatement, with property-specific approval recorded for the actual site.`,
        checks: [
          `Distinguish the damaged premises and opening from the named Kenilworth Road library.`,
          `After any police direction, document visible material, approved temporary coverage and current authorisation for the opening.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `Keeping Balsall Common plan, parish and library records outside an upgrade specification`,
        local: `The made Balsall plan applies only within its neighbourhood area, and the underlying plan confirms that Balsall Common spans two parishes. Resolve the supplied address before citing either fact, but do not treat that result as a security assessment. If the request concerns Balsall Common Library, name the exact Kenilworth Road threshold and obtain the current site's access, egress and key-management requirements. The council page establishes no existing weakness, hardware type or required product.`,
        decision: `Build the upgrade from a documented objective and inspection of the selected leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable. Record markings and dimensions, then compare correctly sized options against current accredited-product evidence and any written insurer, owner or manager criterion. A Balsall-parish result controls only which plan evidence is relevant; a library reference controls only which managed site is intended. The specification should separate adjustment, reinforcement and replacement, identify retained parts and exclusions, and record approval without promising that one product secures the whole entrance.`,
        checks: [
          `Resolve the parish and plan area without converting either into evidence of security need.`,
          `At the library, obtain threshold-specific management criteria before matching options to measurements.`,
        ],
      },
    },
  },
  {
    slug: 'meriden',
    name: 'Meriden',
    region: 'West Midlands',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `The Meriden Parish Neighbourhood Development Plan was made on 17 June 2021 after the May referendum and is used in planning decisions within its area. Solihull Council separately lists Meriden Green and Meriden Hill Conservation Areas.`,
      `The parish plan, two conservation designations, Arden Cottage library and Grade I Church Lane church are distinct records. They do not establish whether another address lies in a boundary, who controls an entrance or what hardware it contains.`,
    ],
    accessGuidance: `Use the full Meriden address and check whether it lies in Meriden Green, Meriden Hill or neither current conservation boundary. Keep Arden Cottage library and the Church Lane church separate from neighbouring premises, then confirm the exact entrance, current controller and caller authority.`,
    evidenceLimits: `A made parish plan and two named conservation areas cannot be generalised to every Meriden property. The library page and list entry apply only to their named sites; none proves neighbouring status, current control, access, hardware, condition, coverage or response.`,
    facts: [
      {
        heading: `Meriden parish plan made in 2021`,
        text: `The Meriden Parish Neighbourhood Development Plan was made on 17 June 2021 after the 6 May referendum and is used for planning applications in its neighbourhood area.`,
        sourceIds: ['solihull-meriden-plan-page'],
        serviceRelevance: `Use the plan only inside its confirmed area and never as evidence of a property's entrance or service need.`,
      },
      {
        heading: `Meriden Green and Hill conservation areas`,
        text: `Solihull Metropolitan Borough Council's conservation register lists both Meriden Green Conservation Area and Meriden Hill Conservation Area.`,
        sourceIds: ['solihull-conservation-areas'],
        serviceRelevance: `Check the exact address against the relevant current boundary and verify any listed status independently.`,
      },
      {
        heading: `Meriden Library at Arden Cottage`,
        text: `Solihull Metropolitan Borough Council identifies Meriden Library at Arden Cottage, The Green, Meriden, CV7 7LN.`,
        sourceIds: ['solihull-meriden-library'],
        serviceRelevance: `This identifies one managed public site only and supplies no current representative, access authority, door or hardware evidence.`,
      },
      {
        heading: `Grade I Church of St Lawrence on Church Lane`,
        text: `Historic England's official list entry 1031828 identifies the Church of St Lawrence on Church Lane, Meriden, as Grade I listed.`,
        sourceIds: ['historic-england-meriden-church-1031828'],
        serviceRelevance: `The designation belongs to the named church only; verify the precise asset and any alteration control without extending it to neighbouring addresses.`,
      },
    ],
    sourceIds: ['solihull-meriden-plan-page', 'solihull-conservation-areas', 'solihull-meriden-library', 'historic-england-meriden-church-1031828'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        heading: `Separating Arden Cottage from a Meriden lockout address`,
        local: `Meriden's made plan supplies a neighbourhood boundary, while the council's Arden Cottage record identifies one public library on The Green. Neither record identifies a private caller, a keyholder or the doorway requiring entry. Start with the complete address and a description of the exact threshold. If “the library” is offered only as a landmark, do not convert that reference into an instruction concerning the managed site or an assumed approach to another building.`,
        decision: `Separate location confirmation from permission to open. Establish the requester’s relationship to the stated premises and record any shared entrance before examining the lock, frame and hinges at that threshold. The plan can resolve whether an address falls within the neighbourhood area, but it cannot validate identity; the library page confirms a named site, but not its current representative. Explain the opening method and price supported by the inspected assembly, and leave any unverified controller or doorway unresolved rather than borrowing authority from either public record.`,
        checks: [
          `Record the full Meriden address, exact threshold and any shared entrance before assessing access.`,
          `Treat Arden Cottage as a named public site, not evidence of a representative, keyholder or instruction.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 3],
        heading: `Checking Green, Hill and the Church Lane asset before a Meriden lock change`,
        local: `Meriden Green and Meriden Hill are separate conservation areas, while Historic England's Grade I record is for the Church of St Lawrence on Church Lane alone. A lock-change enquiry near either place therefore needs two different checks: boundary mapping for the supplied address and building-specific status for the actual door. Do not transfer the church designation along Church Lane or treat a conservation-area name as proof that the customer’s building is listed.`,
        decision: `Inspect the installed lock, door and frame before defining replacement. Record the measured component, retained parts, key quantity and adjustment needed, then identify who can approve that scope at the premises. If visible work is proposed within a confirmed conservation boundary, ask what address-specific control applies. Consider listed-building consent only for the named or independently verified listed asset and only where alteration could affect special interest. This keeps heritage questions tied to a precise proposal while compatibility remains grounded in direct measurements rather than the Green, Hill or church records.`,
        checks: [
          `Map the address against Meriden Green and Meriden Hill, then check the building itself.`,
          `Apply the Church Lane Grade I entry only to the Church of St Lawrence unless another asset is independently verified.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Diagnosing the stated Meriden door without inferring its mechanism from The Green`,
        local: `The council records both Meriden conservation areas and the library at Arden Cottage, but neither source describes the construction or locking system of the reported door. Ask for photographs of the precise opening and for separate accounts of key, handle and frame behaviour. If the address is described relative to The Green, confirm whether it is the named library or another premises before associating any controller or status with the repair.`,
        decision: `Identify the mechanism from its own evidence: faceplate markings, centres, backset, locking-point layout, cylinder dimensions and any safe open-door comparison. A boundary result can frame a later question about visible external change; it does not diagnose alignment or select a gearbox. Likewise, Arden Cottage's public listing does not establish site authority or installed hardware. Record which code and symptom support each shortlisted part, separate frame adjustment from component replacement, and seek permission from the verified controller only after the repair scope is technically defined.`,
        checks: [
          `Confirm whether a reference to The Green means Arden Cottage or a different premises and opening.`,
          `Measure the mechanism directly; use a conservation boundary only for a proposal-specific permission question.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2, 3],
        heading: `Mapping a damaged Meriden opening before temporary boarding`,
        local: `Temporary boarding in Meriden must distinguish three records that do different jobs: the Green and Hill boundaries, Arden Cottage library, and the Grade I Church of St Lawrence. Establish the damaged opening by address, elevation and doorway, then photograph visible surrounding material before proposing coverage. A nearby named site cannot identify the affected asset, and the church listing cannot be extended to another Church Lane entrance or used to infer attachment permission.`,
        decision: `Where police have given evidence-preservation directions for the Meriden incident, follow them before inspecting the opening. Once released, record its dimensions, intended coverage, visible damage and compromised locks while leaving concealed structure unresolved. Verify the current controller of the exact premises; a library web page does not name one, and a list entry does not confer work authority. Resolve conservation or listed-building questions against that asset and temporary proposal, considering listed-building consent only where work to a verified listed building could affect special interest. Document the permanent repair still outstanding without treating temporary protection as final reinstatement.`,
        checks: [
          `Identify the damaged Meriden opening without transferring the library or church record to a nearby address.`,
          `After any evidence-preservation direction, document visible material, intended temporary coverage and current authorisation for the verified asset.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `Keeping Meriden plan and church status outside the upgrade specification`,
        local: `The made neighbourhood plan, the two conservation areas and the Church Lane Grade I entry are planning and designation evidence, not a Meriden security specification. Begin with the customer’s documented objective and inspect the exact entrance. Record frame condition, hinges, keeps, handle operation, lock engagement and cylinder fit where relevant, linking every recommendation to an observed issue. Neither plan status nor heritage status demonstrates that an upgrade is needed or that a particular product will fit.`,
        decision: `First decide whether the address is within the neighbourhood and either conservation boundary; then check the building’s own status rather than extending the church listing. Define the proposed visible change, measured hardware, retained components and exclusions. Obtain only the permission relevant to that proposal, with listed-building consent considered where alteration to a verified listed asset could affect special interest. Product evidence may support performance claims for the selected item, but it must not be presented as planning approval, insurer acceptance or consent. Preserve the distinction between a mapped context, an inspected weakness and the customer’s authorised scope.`,
        checks: [
          `Build the upgrade schedule from inspected entrance evidence, not Meriden plan or designation labels.`,
          `Keep neighbourhood, Green or Hill boundary, and Church of St Lawrence listing questions separate.`,
        ],
      },
    },
  },
  {
    slug: 'hampton-in-arden',
    name: 'Hampton-in-Arden',
    region: 'West Midlands',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Solihull Council records that the 2017 Hampton-in-Arden plan continues within its previous neighbourhood area and that the newer submission draft was withdrawn. Its current pages separately identify the central conservation designation and Hampton-in-Arden Library at 39 Fentham Road; Historic England identifies the High Street parish church as Grade I.`,
      `These are four different planning, locality and property-status records. None extends the central designation or church listing to another address, identifies the current controller of a library or private entrance, proves access authority, or describes any door, lock, fault or proposed alteration.`,
    ],
    accessGuidance: `Use the complete Hampton-in-Arden address, building and exact threshold. Keep the previous 2017 plan area, central conservation boundary, Fentham Road library and Grade I High Street church distinct, then verify the current controller and property status for the actual opening without treating a public record as permission.`,
    evidenceLimits: `The withdrawn draft is not adopted evidence, the conservation description is central-area only, and the library and church records apply to their named sites. They establish no current keyholder, private route, neighbouring-property status, caller authority, hardware, condition, service coverage, response or demand.`,
    facts: [
      {
        heading: `2017 Hampton-in-Arden plan remains applicable in its previous neighbourhood area`,
        text: `Solihull Council records that the 2017 Hampton-in-Arden plan remains applicable to its previous neighbourhood area after the newer submission draft was withdrawn and examination closed.`,
        sourceIds: ['solihull-hampton-plan-page'],
        serviceRelevance: `Use only the existing 2017 plan for its confirmed prior area and never ingest the withdrawn draft as adopted.`,
      },
      {
        heading: `Central Hampton-in-Arden conservation area designation`,
        text: `Solihull Metropolitan Borough Council states that the central part of Hampton-in-Arden was designated a conservation area in 1968.`,
        sourceIds: ['solihull-hampton-history'],
        serviceRelevance: `Check whether the exact address is in the current central boundary and verify listed status separately.`,
      },
      {
        heading: `Hampton-in-Arden Library on Fentham Road`,
        text: `Solihull Metropolitan Borough Council identifies Hampton-in-Arden Library at 39 Fentham Road, Hampton in Arden, Solihull, B92 0AY.`,
        sourceIds: ['solihull-hampton-library'],
        serviceRelevance: `This identifies one current public-library address only; it does not name a requested doorway, current keyholder, caller authority, installed hardware or neighbouring property.`,
      },
      {
        heading: `Grade I parish church on High Street`,
        text: `Historic England's list entry 1055777 identifies the Church of Saint Mary and Saint Bartholomew on High Street, Hampton in Arden, as a Grade I listed building.`,
        sourceIds: ['historic-england-hampton-church-1055777'],
        serviceRelevance: `The designation applies to the identified church, not surrounding properties, and does not grant work authority or decide consent for an unspecified alteration.`,
      },
    ],
    sourceIds: ['solihull-hampton-plan-page', 'solihull-hampton-history', 'solihull-hampton-library', 'historic-england-hampton-church-1055777'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        heading: `Resolving a Hampton-in-Arden lockout beyond plan and library records`,
        local: `The continuing 2017 plan applies to its previous neighbourhood area, while the current council page identifies Hampton-in-Arden Library at 39 Fentham Road. Those records have different purposes and neither identifies the doorway in a lockout request. Record the full postal address, building, floor or unit and exact private, shared or managed threshold, using the library name only to correct location ambiguity after the actual premises is supplied.`,
        decision: `Verify the requester's identity and authority for that opening independently of the plan and public-library record. Do not use the withdrawn replacement draft as current policy or treat a public address as a live keyholder list. If the request concerns the library, identify the present facilities representative; otherwise identify the responsible property controller. Inspect the confirmed lock with its leaf, frame and hinges, then document the supported method, expected charge and precise threshold covered by the verified instruction.`,
        checks: [
          `Record the full address, building and exact threshold; the plan area and Fentham Road library do not identify it.`,
          `Verify the current authorised person and keep the withdrawn draft and public-library record outside access authority.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 3],
        heading: `Separating Hampton-in-Arden's central designation from the Grade I church entry`,
        local: `Solihull Council describes the central part of Hampton-in-Arden as a conservation area, while Historic England lists the Church of Saint Mary and Saint Bartholomew on High Street at Grade I. The church entry does not confer listed status on another central property, and the central description does not resolve a boundary. Identify the exact address and entrance, then verify current conservation and listed status before treating either record as relevant to visible lock work.`,
        decision: `For the church itself, obtain the present building controller's property-specific requirements; for any other address, do not transfer the church designation or assume consent is required solely from proximity. Inspect the leaf, frame, hinges, keeps, existing lock and protective furniture before comparing repair, adjustment or replacement. The written scope should record the authorised objective, measured component, retained parts, keys, fitting and exclusions, with heritage or management approval attributed separately from compatibility and never inferred from the area name.`,
        checks: [
          `Resolve the exact address against current conservation and list records without extending the church entry to neighbours.`,
          `Identify the present controller and separate property approval from the measured repair-or-replacement specification.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 2],
        heading: `Diagnosing the Hampton-in-Arden door rather than its plan area or library address`,
        local: `Neither the continuing 2017 neighbourhood plan nor the council's 39 Fentham Road library record says that a requested opening is uPVC, composite or fitted with a multipoint lock. Obtain the complete property and threshold, then record the actual leaf material, handle travel, key movement, frame contact and locking-point action. Mark any safe open-versus-closed comparison as reported, reproduced or not tested, rather than assigning a mechanism fault from a Hampton-in-Arden location or public-site name.`,
        decision: `If the affected opening is at the library, confirm the current facilities representative separately from diagnosing the assembly; for another property, the library supplies no comparator. The 2017 plan and withdrawn draft contribute no component evidence. Inspect the handle, cylinder where present, faceplate, hinges, keeps and frame, using readable markings, centres, backset and locking layout to distinguish alignment, mechanism and cylinder questions. Preserve the measurements and photographs that support any compatible repair or replacement shortlist and state what remains unverified.`,
        checks: [
          `Record the exact threshold, material and key, handle, frame and locking-point evidence before diagnosing a fault.`,
          `Verify a managed-site representative separately and use markings and measurements rather than locality records for parts.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2, 3],
        heading: `Boarding a named Hampton-in-Arden opening with site and designation resolved`,
        local: `A damaged opening could be at the Fentham Road library, the Grade I High Street church, another address inside the central conservation boundary or a property outside it. These official records do not identify the affected pane, panel, door or frame, nor the person entitled to approve temporary work. Record the full address, exact opening and current controller, photograph visible damage and surrounding material, and leave hidden construction and attachment capacity unresolved until directly inspected.`,
        decision: `Follow any police evidence-preservation instruction before touching the opening. For the library or church, obtain the current site representative's property-specific requirement; for another address, resolve current conservation or listed status without importing either named site's record. Document observed measurements, intended temporary coverage, proposed attachment positions, compromised hardware and the glazing, joinery, door or structural work still outstanding. Keep temporary securing distinct from permanent reinstatement and record who approved the scope, because public and designation pages provide no live consent or construction evidence.`,
        checks: [
          `Identify the exact opening and current controller and apply library, church or conservation records only to that site.`,
          `Preserve evidence, inspect attachment material and separate temporary coverage from permanent repair and approval.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `A Hampton-in-Arden security upgrade tied to the actual property and current evidence`,
        local: `The continuing 2017 plan, central conservation designation and Grade I High Street church entry are planning and property-status evidence, not security assessments or product standards. Identify the exact Hampton-in-Arden entrance and obtain the authorised controller's written objective. Inspect the leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable, connecting each option to an observed weakness rather than to the previous plan area, central location or appearance of a separately listed building.`,
        decision: `Use the current boundary and list record only for the supplied property, excluding the withdrawn plan draft and never extending the church's designation to another address. If the church is the actual site, confirm its current property requirement with the responsible controller; otherwise verify any landlord, manager or insurer criterion independently. State measurements, product evidence, retained hardware, key-control outcome and exclusions, keeping property approval separate from technical compatibility and avoiding any implication that the council or Historic England endorses a particular security measure.`,
        checks: [
          `Base the objective on the inspected entrance and authorised controller, not the plan, designation or church record.`,
          `Attribute property and insurer requirements separately and record measured evidence, retained work and exclusions.`,
        ],
      },
    },
  },
  {
    slug: 'wolston',
    name: 'Wolston',
    region: 'Warwickshire',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Rugby Borough Council's appraisal says Wolston Conservation Area covers only a limited village section, with most buildings in the designation south of the River Avon and a railway bridge at its northern tip separating Wolston from Brandon. The council's neighbourhood-plan page lists designation, Call for Sites and November 2024 screening records but no made-plan statement.`,
      `The Department for Education identifies Wolston St Margaret's CofE Primary School at Brookside, Main Street, while Historic England separately lists the Church of St Margaret on Main Street at Grade I. Those records apply to two exact sites and do not describe another Wolston entrance or its controller.`,
    ],
    accessGuidance: `Use the full Wolston address and treat the River Avon and railway bridge only as orientation after the address is known. Check the current conservation boundary and latest planning stage. At the school or church, name the exact gate or doorway and current authorised controller rather than treating the Main Street reference as permission.`,
    evidenceLimits: `The appraisal is boundary-limited, the plan page records process stages, the DfE entry identifies one school and list entry 1185682 applies only to one church. None proves another property's designation, use, controller, access, material, installed lock, condition, incident, route, coverage, response time, demand or previous work.`,
    facts: [
      {
        heading: `Wolston Conservation Area mostly south of the River Avon`,
        text: `The Wolston Conservation Area appraisal says the designation covers only a limited part of the village, mostly south of the River Avon, with a railway bridge separating Wolston from Brandon.`,
        sourceIds: ['rbc-wolston-conservation'],
        serviceRelevance: `Use river and railway references only for address clarification and boundary checks, never route or coverage claims.`,
      },
      {
        heading: `Wolston neighbourhood planning records`,
        text: `Rugby Borough Council's Wolston Neighbourhood Plan page hosts neighbourhood-area designation, Call for Sites and November 2024 screening determination records.`,
        sourceIds: ['rbc-wolston-plan-page'],
        serviceRelevance: `Do not describe Wolston's neighbourhood plan as adopted or made without a newer explicit council statement.`,
      },
      {
        heading: `Wolston primary school on Main Street`,
        text: `The Department for Education records Wolston St Margaret's CofE Primary School at Brookside, Main Street, Wolston, CV8 3HH.`,
        sourceIds: ['dfe-wolston-st-margarets'],
        serviceRelevance: `At this managed education site, identify the gate, block or door and current authorised representative; the record supplies no access or work authority.`,
      },
      {
        heading: `Grade I Church of St Margaret on Main Street`,
        text: `Historic England's official list entry 1185682 identifies the Church of St Margaret on Main Street, Wolston, as a Grade I listed building.`,
        sourceIds: ['historic-england-wolston-st-margaret-1185682'],
        serviceRelevance: `Apply the designation only to the named church and verify the actual doorway and proposal; it grants no access, work authority or consent outcome.`,
      },
    ],
    sourceIds: ['rbc-wolston-conservation', 'rbc-wolston-plan-page', 'dfe-wolston-st-margarets', 'historic-england-wolston-st-margaret-1185682'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [1, 2],
        heading: `Keeping Wolston planning records outside a school access decision`,
        local: `The council page records Wolston neighbourhood-area, Call for Sites and November 2024 screening documents, while the DfE record identifies one school at Brookside, Main Street. Neither source identifies a caller or locked entrance. Start with the full address and exact private, shared, gate or building threshold. If the school is involved, add the block or doorway and obtain a current authorised site representative; if it is only a nearby reference, keep the school outside the instruction.`,
        decision: `Use the latest explicit council statement before describing any later plan stage, but do not use planning status to verify occupation. Connect the requester to the precise opening, then inspect the latch, deadlock, key response, door, frame and hinges. The DfE page gives no keyholder or access arrangement. Explain the opening approach and price supported by the actual assembly and record drilling, replacement, reinstatement or follow-on work separately. If the service-call price changes after inspection, obtain fresh agreement before that price applies.`,
        checks: [
          `Record the complete Wolston address and precise opening independently of the planning stage.`,
          `At the Main Street school, identify the gate or door and current authorised representative.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 3],
        heading: `Separating Wolston's conservation boundary from the listed church door`,
        local: `The appraisal says Wolston Conservation Area covers only a limited part of the village; south-of-river location alone does not put an address inside it. Historic England's Grade I record applies specifically to the Church of St Margaret on Main Street. Map the supplied address against the current boundary and check the individual building before visible work. Do not extend the church designation to another Main Street property or use it to infer the condition, hardware or controller of any doorway.`,
        decision: `At the church, identify the exact porch or door, current authorised controller and retained visible fabric. Elsewhere, exclude list entry 1185682 from the property decision. Inspect both hardware faces, edge plate, case or cylinder, keep and alignment, then record markings and measurements. The written scope should name retained parts, measured replacement, keys, fitting and adjustment. Keep component compatibility, customer authority, conservation questions and any proposal-specific listed-building decision separate, considering consent only where alteration to a verified listed asset could affect its special interest.`,
        checks: [
          `Check the exact conservation boundary and building status without generalising from the River Avon.`,
          `Apply list entry 1185682 only to the Church of St Margaret and identify its actual doorway.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 2],
        heading: `Diagnosing one Wolston door without inferring its mechanism from Main Street`,
        local: `The limited conservation-area record and the DfE address for Wolston St Margaret's school do not establish that any entrance is uPVC, composite or multipoint. Confirm the full address, exact door and material directly. If the school is involved, identify the gate, block or opening and current authorised representative. Record key rotation, handle travel, locking-point movement, frame contact and any safe difference between open and closed operation, separating reproduced observations from the caller's report.`,
        decision: `A conservation-boundary result may frame a later question about a defined visible change, but it cannot diagnose the mechanism. The school directory likewise supplies no hardware or facilities authority. Photograph the full faceplate and readable codes and measure centres, backset, locking layout, cylinder fit, hinges and keeps. Treat alignment, gearbox, strip and cylinder condition as separate findings and retain the evidence behind any compatible shortlist. Only after the technical scope is clear should the authorised controller and any address-specific fabric requirement be recorded for that Wolston opening.`,
        checks: [
          `Confirm the Wolston door material and symptoms rather than inferring a mechanism from locality records.`,
          `At the school, name the managed opening and obtain current authority before removing parts.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [2, 3],
        heading: `Distinguishing Wolston's school and Grade I church before boarding`,
        local: `The primary school at Brookside and the Grade I Church of St Margaret are separate Main Street sites with different controllers and possible openings. A boarding instruction must name the actual premises, elevation, gate, window or door and current authorised representative. The school record supplies no facilities authority, while the church listing neither reports an incident nor identifies a safe attachment point. Do not transfer the church's designation to the school or another Main Street property.`,
        decision: `For a Wolston damage report, follow any police evidence-preservation direction before inspecting or covering the opening. After release, make a visual record of the entry point, surviving frame, glazing or door material, damaged hardware and adjoining surfaces. At the church, identify retained visible fabric and obtain proposal-specific property guidance; at the school, confirm the gate, block or opening with the responsible site contact. Measure the authorised opening, state intended coverage and its limits, and list glazing, joinery, door, lock and structural follow-up separately. Leave concealed support condition and permanent reinstatement unresolved until inspected and approved.`,
        checks: [
          `Name the school or church opening and its current authorised controller before proposing coverage.`,
          `After any police direction, record visible fabric, intended temporary coverage and current authorisation.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `Building a Wolston upgrade from inspection, not planning or church status`,
        local: `Wolston's limited conservation area, neighbourhood-planning records and Grade I church entry are three different forms of context; none demonstrates a security weakness or product requirement. Confirm the full address and exact threshold, map only the current boundary relevant to that address and check the latest explicit plan stage. If the work concerns the Church of St Margaret, apply list entry 1185682 only to that site and obtain its current controller's objective rather than inferring need from listed status.`,
        decision: `Inspect the selected leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable. Note each marking and dimension, then evaluate properly sized options using current accredited-product evidence and the exact written criterion supplied by an insurer, owner or manager. Define retained hardware, visible changes, adjustment, reinforcement, replacement and exclusions. Conservation and listed-building questions must attach to the identified property and proposal, with consent considered where alteration to a verified listed building could affect special interest. Keep river, railway and planning-stage references outside the performance specification and avoid promising complete security from one product.`,
        checks: [
          `Tie the upgrade objective to one inspected Wolston threshold, not planning or listed status.`,
          `Keep current boundary, plan stage, church designation and product evidence as separate decisions.`,
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
        heading: `Ryton-on-Dunsmore plan made in 2021`,
        text: `Rugby Borough Council made the Ryton-on-Dunsmore Neighbourhood Plan on 20 July 2021, making it part of the borough development plan used in planning decisions.`,
        sourceIds: ['rbc-ryton-plan-page'],
        serviceRelevance: `Use made-plan status only as planning context within the confirmed area, not evidence of service conditions.`,
      },
      {
        heading: `Ryton parish boundary and rural classification`,
        text: `The adopted plan says its area coincides with the civil parish, describes northern and western boundaries along the River Avon valley and records Ryton as a Main Rural Settlement.`,
        sourceIds: ['rbc-ryton-made-plan'],
        serviceRelevance: `Use parish and river-valley details for verified orientation only and never infer route or property characteristics.`,
      },
      {
        heading: `Ryton academy on Sodens Avenue`,
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
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `The joint Baginton and Bubbenhall Neighbourhood Development Plan was made after the 15 March 2018 yes vote and was prepared by both parish councils. The adopted district plan lists Baginton as a Growth Village and in its conservation-area table.`,
      `The joint-plan geography, village hierarchy, Coventry Road Roman fort and Grade I Church Road church are distinct records. They do not establish another address's boundary, listing, controller, access authority or entrance hardware.`,
    ],
    accessGuidance: `Use the complete Baginton address and keep it distinct from Bubbenhall within the joint plan. Distinguish the Coventry Road Roman fort and Church Road church from neighbouring premises, check the exact property status, then confirm the entrance and person authorised to instruct work.`,
    evidenceLimits: `The joint plan and district classifications are area-scale records, while the fort and church sources apply only to named sites. They do not prove neighbouring status, current control, access, construction, lock condition, service reach, response, demand or previous work.`,
    facts: [
      {
        heading: `Baginton and Bubbenhall plan following the March 2018 yes vote`,
        text: `The joint Baginton and Bubbenhall Neighbourhood Development Plan was made following the 15 March 2018 yes vote and was prepared by the two parish councils.`,
        sourceIds: ['wdc-baginton-plan-page'],
        serviceRelevance: `Keep Baginton distinct from Bubbenhall and use the joint plan only within its confirmed mapped area.`,
      },
      {
        heading: `Baginton growth village and conservation entries`,
        text: `The adopted Warwick District Local Plan places Baginton in the Growth Villages column and separately lists Baginton in its conservation-area table.`,
        sourceIds: ['wdc-local-plan'],
        serviceRelevance: `Treat settlement hierarchy and conservation status as separate checks, neither of which proves an address-level fact.`,
      },
      {
        heading: `Lunt Roman Fort on Coventry Road`,
        text: `Coventry City Council identifies Lunt Roman Fort at Coventry Road, Baginton, Coventry, CV8 3AJ.`,
        sourceIds: ['coventry-lunt-roman-fort'],
        serviceRelevance: `This identifies one named public site only; it supplies no current representative, work authority, entrance or hardware evidence.`,
      },
      {
        heading: `Grade I Church of Saint John the Baptist on Church Road`,
        text: `Historic England's official list entry 1116539 identifies the Church of Saint John the Baptist on Church Road, Baginton, as Grade I listed.`,
        sourceIds: ['historic-england-baginton-church-1116539'],
        serviceRelevance: `The designation belongs to the named church only and must not be transferred to a neighbouring address or treated as consent for work.`,
      },
    ],
    sourceIds: ['wdc-baginton-plan-page', 'wdc-local-plan', 'coventry-lunt-roman-fort', 'historic-england-baginton-church-1116539'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        heading: `Keeping the Lunt landmark outside a Baginton access decision`,
        local: `Baginton's neighbourhood plan is joint with Bubbenhall, whereas the council's Lunt Roman Fort record identifies one Coventry Road site. An emergency request must therefore begin with the complete Baginton address and exact threshold, not the joint plan title or a fort reference used as a landmark. Record any communal and private openings separately. Neither official source identifies the caller, a present keyholder or the door for which access is requested.`,
        decision: `Confirm the requester’s relationship to the stated premises before examining the lock, frame and hinges. The joint plan may help distinguish mapped Baginton from Bubbenhall, but it cannot establish occupation; the fort directory confirms a named public site, but not a current representative or authority. If the instruction concerns that site, verify its controller independently. Otherwise, keep the landmark outside the access decision. Explain the opening method and price supported by inspection of the actual assembly and document which threshold the permission covers.`,
        checks: [
          `Record the full Baginton address and threshold while keeping Bubbenhall outside the instruction.`,
          `Treat Lunt Roman Fort as a named site, not evidence of a caller, keyholder or authorised opening.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 3],
        heading: `Separating Baginton plan tables from the Church Road lock-change scope`,
        local: `Warwick District's adopted plan uses two different Baginton classifications: Growth Village in its settlement table and Baginton in its conservation-area table. Historic England separately lists only the Church of Saint John the Baptist on Church Road at Grade I. For a lock change, map the supplied address against the current conservation boundary and check the individual building. Do not turn settlement terminology into property status or extend the church designation along the road.`,
        decision: `Inspect the door, frame and existing lock, then record the measured replacement, retained parts, number of keys and adjustment proposed. Establish who may approve that particular scope. If visible work is contemplated within a confirmed conservation area, identify the address-specific requirement; consider listed-building consent only for a verified listed asset where alteration could affect special interest. The local-plan tables cannot approve or reject a component, and the church entry cannot describe another entrance. Keep heritage review, customer authority and hardware compatibility as separately evidenced decisions.`,
        checks: [
          `Resolve the Baginton conservation boundary and building status without treating Growth Village as property evidence.`,
          `Apply list entry 1116539 only to the Church of Saint John the Baptist unless another asset is verified.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Measuring a Baginton multipoint fault without borrowing fort-site evidence`,
        local: `Neither Baginton's district-plan classifications nor the Coventry Road fort directory identifies a uPVC door or multipoint mechanism. Confirm the precise premises and opening, especially when the fort is mentioned only to describe location. Obtain photographs and separate accounts of key rotation, handle movement and frame contact. Record faceplate markings and locking-point movement, without treating a safe open-door comparison as proof of which component has failed.`,
        decision: `Build the diagnosis from the assembly itself: centres, backset, locking layout, cylinder dimensions, readable codes and observed alignment. The conservation entry may lead to a later question about a visible external alteration, but it cannot select a gearbox. Likewise, the public-site record does not identify the current controller or installed hardware at Lunt Roman Fort. Verify authority for the supplied address after defining the supported repair, preserve the measurements behind each shortlisted part, and document frame adjustment separately from component replacement so the technical conclusion remains auditable.`,
        checks: [
          `Confirm whether a Coventry Road reference denotes Lunt Roman Fort or another premises and entrance.`,
          `Use direct mechanism measurements for the repair and boundary evidence only for a defined visible change.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2, 3],
        heading: `Identifying the damaged Baginton asset before a boarding proposal`,
        local: `A damaged Baginton opening may be described by the conservation area, Lunt Roman Fort or the Church Road church, but those references identify different contexts. Establish the affected asset by full address, elevation and doorway. Photograph visible surrounding material before proposing temporary coverage. The fort page cannot identify a current site representative, and the Grade I entry applies only to the church; neither supplies authority for a neighbouring opening or proves suitable attachment points.`,
        decision: `Follow police evidence-preservation directions before inspection where they apply. Once the scene is released, record opening dimensions, intended coverage, visible damage, compromised locks and proposed attachment positions, leaving concealed structure unresolved. Verify the controller of the exact premises rather than relying on a public directory or list entry. Check conservation or listed-building implications against the identified asset and temporary proposal, considering listed-building consent only where work to a verified listed building could affect special interest. State the permanent repair still required and do not represent temporary protection as final reinstatement.`,
        checks: [
          `Distinguish the damaged opening from the named fort and church before recording a temporary proposal.`,
          `After any evidence-preservation direction, document visible material and proposed attachment positions for the verified asset.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `Building a Baginton upgrade from inspection rather than village status`,
        local: `The joint neighbourhood plan, Growth Village classification, conservation entry and Church Road listing do not create a Baginton security standard. Begin with a documented customer objective and inspection of the precise entrance, keeping Bubbenhall outside the assessment. Record the frame, hinges, keeps, handle operation, lock engagement and cylinder fit where relevant. Tie each proposed improvement to an observed issue rather than to village planning status or the Grade I designation of a different building.`,
        decision: `Confirm the neighbourhood-plan area, current conservation boundary and building-specific status as separate questions. Do not extend list entry 1116539 beyond the Church of Saint John the Baptist. Define measured hardware, retained components, visible changes and exclusions, then obtain only the permission applicable to that proposal; listed-building consent is a consideration where alteration to a verified listed asset could affect special interest. Product evidence may describe the selected item, but not planning approval, insurer acceptance or consent. Preserve a clear chain from inspected weakness to recommendation and authorised scope.`,
        checks: [
          `Base each Baginton upgrade item on an inspected weakness, not joint-plan or Growth Village terminology.`,
          `Separate the conservation boundary from the named Church Road listing and from product evidence.`,
        ],
      },
    },
  },
  {
    slug: 'brandon',
    name: 'Brandon',
    region: 'Warwickshire',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Rugby Borough Council made the joint Brandon and Bretford plan in 2019, while its appraisal describes a partial Brandon conservation area. Warwickshire County Council separately identifies Brandon Hall Hotel at Main Street, CV8 3FW, and Historic England records the Avon Viaduct in Brandon and Bretford parish at Grade II.`,
      `The joint plan, partial boundary, managed venue and listed viaduct are four distinct records. None establishes a route to private premises, transfers listed status to a nearby address, identifies a current venue representative or caller authority, or describes a requested entrance, installed lock, fault or security need.`,
    ],
    accessGuidance: `Use the full Brandon address, building and exact threshold. Keep Brandon distinct from Bretford and Wolston, distinguish the Main Street venue from the Grade II viaduct, and resolve the current boundary, property controller and authority without treating Avondale Road or either named site as a route instruction.`,
    evidenceLimits: `The appraisal's north-of-Avondale-Road description is not an address-level test, the venue record is not a keyholder list and the viaduct entry applies only to that structure. The sources prove no neighbouring-property status, private access, hardware, condition, service coverage, response or demand.`,
    facts: [
      {
        heading: `Brandon and Bretford plan made in 2019`,
        text: `Rugby Borough Council made the Brandon and Bretford Neighbourhood Development Plan on 4 June 2019, and it forms part of the borough development plan.`,
        sourceIds: ['rbc-brandon-plan-page'],
        serviceRelevance: `Keep Brandon distinct from Bretford and apply the joint plan only within its confirmed mapped area.`,
      },
      {
        heading: `Brandon conservation area and railway viaduct`,
        text: `The Brandon appraisal says its conservation area covers most village buildings north of Avondale Road and that the approach from Wolston is marked by the railway viaduct.`,
        sourceIds: ['rbc-brandon-conservation'],
        serviceRelevance: `Check the precise boundary and use the viaduct only as orientation, never evidence of route or access.`,
      },
      {
        heading: `Brandon Hall Hotel on Main Street`,
        text: `Warwickshire County Council's approved-venue directory identifies Brandon Hall Hotel at Main Street, Brandon, CV8 3FW.`,
        sourceIds: ['wcc-brandon-hall-approved-venue'],
        serviceRelevance: `This identifies one current managed venue and address only; it does not name an affected entrance, current site representative, caller authority, hardware or neighbouring property.`,
      },
      {
        heading: `Grade II Avon Viaduct in Brandon and Bretford parish`,
        text: `Historic England's list entry 1034898 records the Avon Viaduct in Brandon and Bretford civil parish as a Grade II listed building.`,
        sourceIds: ['historic-england-avon-viaduct-1034898'],
        serviceRelevance: `The designation applies to the viaduct itself; it does not extend to nearby property, establish a private route or grant authority for work.`,
      },
    ],
    sourceIds: ['rbc-brandon-plan-page', 'rbc-brandon-conservation', 'wcc-brandon-hall-approved-venue', 'historic-england-avon-viaduct-1034898'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        heading: `Confirming a Brandon lockout beyond the joint plan and hotel record`,
        local: `The made neighbourhood plan covers Brandon and Bretford together, while Warwickshire County Council's venue directory identifies Brandon Hall Hotel at Main Street, CV8 3FW. Neither record identifies the doorway in a lockout request. Obtain the complete Brandon address, building, floor or unit and exact private, shared or managed threshold, keeping Bretford separate and using the hotel name only to distinguish the named venue after the actual premises has been confirmed.`,
        decision: `Verify identity and authority for that opening independently of plan geography or venue-directory presence. If the request concerns Brandon Hall, identify the current site representative and their responsibility for the specified door; for another address, confirm the relevant owner, occupier or manager. Inspect the lock with its leaf, frame and hinges before documenting the supported method and expected charge. Record the threshold covered by the verified instruction, because neither the joint plan nor the venue page supplies occupation or entry permission.`,
        checks: [
          `Record the full Brandon address, building and threshold and keep the joint-plan geography and hotel distinct.`,
          `Verify the current authorised person; neither the plan nor venue directory grants entry permission.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 2, 3],
        heading: `Scoping a Brandon lock change across boundary, venue and viaduct evidence`,
        local: `The Brandon appraisal describes a partial conservation area, the county directory identifies Brandon Hall on Main Street, and Historic England lists the Avon Viaduct at Grade II. Those facts apply at different scales. Resolve the exact address and entrance before deciding which, if any, is relevant. Do not extend the viaduct's listing to the hotel or another property, and do not treat a venue-directory entry as authority to alter a managed opening.`,
        decision: `For Brandon Hall, identify the current facilities or property representative and their approved replacement objective; for the viaduct or another designated property, obtain the applicable property-specific requirement rather than assuming consent from the locality record. Inspect the leaf, frame, hinges, keeps, lock and protective furniture before comparing repair, adjustment and replacement. Record measurements, retained parts, keys, fitting and exclusions, with conservation, listing or management approval attributed separately from technical compatibility and the approving party named.`,
        checks: [
          `Check the exact address against current boundary and list records without transferring the viaduct's status.`,
          `Identify the present controller and keep property approval separate from the measured replacement specification.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Diagnosing a Brandon uPVC door without conservation or venue assumptions`,
        local: `The partial conservation description and the Brandon Hall venue entry disclose no door material, multipoint mechanism or affected threshold. Record the complete address and actual opening, then identify whether the leaf is uPVC, composite, timber or another construction. Capture handle travel, key movement, frame contact and locking-point action, marking any safe open-versus-closed comparison as reported, reproduced or not tested instead of diagnosing from a position north of Avondale Road or from a managed-site name.`,
        decision: `If the opening is at Brandon Hall, verify the current representative responsible for that door separately from the mechanical assessment. For any other address, the venue record supplies no comparable assembly, and conservation geography cannot identify a component. Inspect the handle, cylinder where present, faceplate, hinges, keeps and frame; use readable markings, centres, backset and locking layout to distinguish alignment, mechanism and cylinder questions. Preserve photographs and measurements supporting the compatible shortlist and record any code or condition that remains unverified.`,
        checks: [
          `Record the exact opening, material and handle, key, frame and locking-point evidence before diagnosing a fault.`,
          `Verify any managed-site controller separately and use markings and measurements rather than local records for parts.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2, 3],
        heading: `Boarding the exact Brandon opening with property records kept separate`,
        local: `First establish whether the reported damage belongs to Brandon Hall, the listed Avon Viaduct or another property whose address may sit inside or outside the partial conservation area. A venue entry, appraisal description or list record cannot substitute for that identification. Ask the responsible contact to name every affected pane, panel, leaf or frame and the controlled part of the site, then record visible surrounding damage and dimensions while reserving hidden support condition and attachment suitability for direct inspection.`,
        decision: `Before temporary work, comply with every evidence-preservation direction police have issued for the scene. Confirm Brandon Hall instructions with its present facilities representative; if the viaduct or another designated asset is involved, obtain its current property requirement without extending that status elsewhere. The handover should distinguish proposed coverage, observed dimensions, attachment locations, compromised hardware and later glazing, joinery, door or structural work. Name the person who approved the temporary extent and leave permanent reinstatement separate, since none of the locality records supplies construction evidence or live consent.`,
        checks: [
          `Identify the exact opening and current controller and apply venue, boundary or viaduct records only to that site.`,
          `Preserve evidence, inspect attachment material and distinguish temporary coverage, approval and permanent repair.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `A Brandon upgrade brief without turning local records into hardware rules`,
        local: `The joint Brandon and Bretford plan, partial conservation description and Grade II Avon Viaduct are planning and property-status records, not security assessments. Identify the exact Brandon entrance and obtain the authorised controller's documented objective, keeping Bretford, the conservation boundary and the viaduct's own designation distinct. Inspect the leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable, linking every option to an observed weakness rather than locality, appearance or protected status.`,
        decision: `Resolve current conservation and listed status only for the supplied address and never extend the viaduct entry to a neighbouring property. If the actual structure is designated, confirm its property-specific requirement with the responsible controller; otherwise verify any landlord, manager or insurer criterion independently. State measurements, product evidence, retained hardware, key-control outcome and exclusions, keeping approval separate from compatibility. The made plan must remain outside product selection, and neither council nor Historic England evidence should be represented as endorsing a particular security measure.`,
        checks: [
          `Record the precise Brandon doorway, measured weakness and controller's objective before comparing an upgrade.`,
          `Keep the joint-plan context and viaduct's Grade II record outside product or insurer claims.`,
        ],
      },
    },
  },
  {
    slug: 'shilton',
    name: 'Shilton',
    region: 'Warwickshire',
    reviewedOn: CURRENT_PROMOTION_REVIEWED_ON,
    summary: [
      `Official records classify Shilton as a Rural Village, list Shilton and Barnacle as a parish and include a time-sensitive bus entry. A Rugby Borough Council notice dated 28 April 2026 names Shilton Village Hall on Wood Lane as polling station 66.`,
      `The poll notice is dated location evidence only, not proof of the hall's present use, controller or access. The planning, parish and transport records likewise establish no private route, requested threshold, hardware, condition, authority or locksmith coverage.`,
    ],
    accessGuidance: `Use the complete Shilton address and exact threshold rather than the wider parish name. Treat the Wood Lane hall reference as dated 2026 location evidence and verify current use, representative and authority independently.`,
    evidenceLimits: `Rural Village status, parish identity, the live transport entry and dated poll notice do not prove property type, ownership, current hall use, access, hardware, condition, availability, coverage, response or demand.`,
    facts: [
      {
        heading: `Shilton classified as a Rural Village`,
        text: `Rugby Borough Council's 2024 Rural Sustainability Study classifies Shilton as a Rural Village.`,
        sourceIds: ['rbc-rural-study-2024'],
        serviceRelevance: `Use Rural Village only as an official planning classification, not as evidence about an individual property or access route.`,
      },
      {
        heading: `Shilton listed among Rugby parishes`,
        text: `The Office for National Statistics' Rugby area profile lists Shilton and Barnacle among the district's parishes.`,
        sourceIds: ['ons-rugby-area-profile'],
        serviceRelevance: `The parish name can help clarify an address, but it does not identify the individual settlement, street or doorway.`,
      },
      {
        heading: `Shilton bus routes to Nuneaton and Coventry`,
        text: `Warwickshire County Council's live bus register lists Shilton on routes 74, 74A, 74B and 74C in the Nuneaton and Coventry corridor.`,
        sourceIds: ['wcc-shilton-bus'],
        serviceRelevance: `Recheck the timetable before publication and never infer that an address is close to or reachable from a stop.`,
      },
      {
        heading: `Dated poll notice names Shilton Village Hall`,
        text: `Rugby Borough Council's Notice of Poll dated 28 April 2026 names Shilton Village Hall, Wood Lane, Shilton, as polling station 66.`,
        sourceIds: ['rbc-shilton-village-hall-poll-2026'],
        serviceRelevance: `Use the notice only as dated location evidence; it does not establish the hall's current use, controller, access, entrance or hardware.`,
      },
    ],
    sourceIds: ['rbc-rural-study-2024', 'ons-rugby-area-profile', 'wcc-shilton-bus', 'rbc-shilton-village-hall-poll-2026'],
    factOnlySourceIds: ['wcc-shilton-bus'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [1, 3],
        heading: `Using the Wood Lane hall reference only after a Shilton threshold is named`,
        local: `The parish record covers Shilton and Barnacle, while the April 2026 notice names Shilton Village Hall on Wood Lane for that dated poll. Neither identifies the building or doorway in today's urgent request. Obtain the complete Shilton address, property or site name and precise gate, shared entrance, public door or private threshold, recording whether the hall is involved or only being used as orientation.`,
        decision: `Because the notice does not establish present hall use or a current keyholder, confirm the requester's identity and authority with the person entitled to request entry for that exact opening; at another property, verify both independently. Inspect the latch or lock with the leaf, frame and hinges before selecting an approach. Explain the supported method and available price information before work, obtaining fresh agreement if inspection changes scope or charge.`,
        checks: [
          `Name the Wood Lane hall or other Shilton property and its exact controlled threshold.`,
          `Verify present authority and explain the inspected opening method and price information before work.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 3],
        heading: `A Shilton repair-or-change decision with the poll notice kept dated`,
        local: `Rural Village is a planning category, and the 28 April 2026 notice identifies the Wood Lane hall only for a dated poll. Establish the exact property, leaf and present approving person before considering a lock change. Record whether the objective follows unreliable operation, physical damage, lost keys or revised key control, and do not turn the hall reference into current occupancy, ownership or a hardware requirement.`,
        decision: `Inspect the lock with its door, frame, hinges, keep and protective furniture before distinguishing adjustment, repair and replacement. Capture readable case or faceplate information, backset, centres, cylinder dimensions and relevant fixings so compatibility is measurable. State retained parts, key quantity, fitting, adjustments, fabric work and exclusions, attributing any landlord, insurer or manager instruction directly and keeping the settlement classification outside the technical recommendation.`,
        checks: [
          `Identify the Shilton door, current approving person and the reason for repair or change.`,
          `Measure the assembly and keep the dated hall record outside hardware selection and authority.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: `Diagnosing a Shilton multipoint fault without village or parish assumptions`,
        local: `The Rural Village classification and Shilton and Barnacle parish name do not show that a reported entrance is uPVC, composite, timber or fitted with multipoint locking. Identify the precise door and record key rotation, handle travel, locking-point movement, frame contact and any safe difference between open and closed operation. Mark each symptom reported, reproduced or untested instead of assigning a component from locality labels.`,
        decision: `Inspect the handle, cylinder where fitted, full faceplate, hinges, keeps and frame, treating alignment and mechanical condition as separate questions. Use readable manufacturer or component codes and measure centres, backset, locking layout and cylinder fit before narrowing a repair or compatible replacement. Preserve the observations and photographs supporting the shortlist, and obtain authority from the actual property's responsible person rather than a parish or planning record.`,
        checks: [
          `Classify key, handle, locking-point and frame behaviour at the exact Shilton opening.`,
          `Support every repair option with direct markings, dimensions and property-specific authority.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [3],
        heading: `Temporary security at the precisely identified Wood Lane hall or other Shilton opening`,
        local: `The dated poll notice names Shilton Village Hall on Wood Lane but reports no damage, present controller or usable opening. Confirm whether the incident concerns that hall or another property, then record the full address, elevation and individual pane, panel, leaf or frame. Identify the current person authorised to approve temporary securing and keep the April 2026 polling-station purpose confined to its date.`,
        decision: `Follow any police evidence-preservation instruction before disturbing or covering the scene. Once released, photograph visible damage, measure the exposed span and inspect accessible surrounding material while leaving concealed or unsafe conditions unresolved. Document compromised locks and intended temporary coverage, then list glazing, joinery, door, lock and structural work still required. Temporary boarding must not be presented as permanent reinstatement or as proof that the opening is structurally sound.`,
        checks: [
          `Confirm whether the Wood Lane hall or another Shilton opening is damaged and identify current authority.`,
          `Preserve evidence, define temporary coverage and keep permanent reinstatement separate.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `A whole-doorset Shilton upgrade independent of classification and dated hall use`,
        local: `Rural Village status, the parish name and the April 2026 hall reference do not demonstrate a security need or current standard at any Shilton entrance. Obtain the responsible customer's objective for the exact door, then inspect leaf and frame condition, hinges, keeps, handle operation, lock engagement, cylinder fit where present and protective furniture. Link each possible improvement to a measured issue rather than locality or polling context.`,
        decision: `If the Wood Lane hall is involved, verify its present representative and requirements directly because the poll notice supplies neither. For any property, compare measured compatibility and relevant product documentation, identifying the condition addressed, retained parts, key-control outcome, fabric work and exclusions. Attribute lease, insurer or management criteria to their actual source, and keep parish, settlement and dated polling records outside any product-performance or endorsement claim.`,
        checks: [
          `Tie the Shilton upgrade objective to the exact door and a complete assembly inspection.`,
          `Verify current hall requirements and document measured product evidence without inferring endorsement.`,
        ],
      },
    },
  },
  {
    slug: 'brinklow',
    name: 'Brinklow',
    region: 'Warwickshire',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish Brinklow's made 2022 neighbourhood plan, its partial conservation area, Revel Surgery at The Surgery on Barr Lane and the Grade II* Church of St John the Baptist on The Crescent.`,
      `Those planning and site records apply at different scales. They do not identify the requested doorway, a private route, current site representative, caller authority, neighbouring-property status, door construction, installed hardware, fault, security need or service availability.`,
    ],
    accessGuidance: `Record the complete Brinklow address, building and exact private, shared or managed threshold. Distinguish Revel Surgery on Barr Lane from the listed church on The Crescent, check the current conservation boundary and identify the person authorised for the particular opening.`,
    evidenceLimits: `The conservation area covers only part of Brinklow, and the Grade II* designation belongs only to the named church. The surgery record identifies one managed health site but no current representative or keyholder; none of the sources proves ownership, access, route conditions, door or lock type, damage, coverage, response or demand.`,
    facts: [
      {
        heading: `Brinklow neighbourhood plan made in 2022`,
        text: `Rugby Borough Council made the Brinklow Neighbourhood Plan on 14 December 2022, and it forms part of the borough development plan.`,
        sourceIds: ['rbc-brinklow-plan-page'],
        serviceRelevance: `Use the plan only as formal planning context within its mapped area; it does not establish an address, entrance, authority, hardware or service condition.`,
      },
      {
        heading: `Brinklow Conservation Area includes part of Ell Lane`,
        text: `The Brinklow appraisal states that its conservation area covers only part of the village and includes part of Ell Lane leading to the motte-and-bailey castle.`,
        sourceIds: ['rbc-brinklow-conservation'],
        serviceRelevance: `Check the current boundary and use Ell Lane only as caller-confirmed orientation, never to infer property age, listing, route or access.`,
      },
      {
        heading: `Revel Surgery at The Surgery on Barr Lane`,
        text: `The NHS service record identifies Revel Surgery at The Surgery, Barr Lane, Brinklow, Rugby, Warwickshire, CV23 0LU.`,
        sourceIds: ['nhs-revel-surgery-brinklow-m84031'],
        serviceRelevance: `Apply the record only to the named surgery; it does not identify the requested door, a current facilities representative, caller authority, hardware or another Barr Lane property.`,
      },
      {
        heading: `Grade II* church on The Crescent`,
        text: `Historic England's list entry 1034957 identifies the Church of St John the Baptist on The Crescent, Brinklow, as a Grade II* listed building.`,
        sourceIds: ['historic-england-brinklow-church-1034957'],
        serviceRelevance: `Apply the designation only to the identified church, then verify its current controller, exact entrance and proposal-specific requirements separately.`,
      },
    ],
    sourceIds: ['rbc-brinklow-plan-page', 'rbc-brinklow-conservation', 'nhs-revel-surgery-brinklow-m84031', 'historic-england-brinklow-church-1034957'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        heading: `Resolving a Barr Lane surgery reference before Brinklow entry work`,
        local: `Begin by deciding whether Barr Lane is only being used to describe the locality or whether the request actually concerns Revel Surgery. The NHS record fixes that surgery at The Surgery, CV23 0LU; the made neighbourhood plan supplies broader planning context and cannot identify a door. Ask for the full address and an unambiguous description of the controlled threshold without presuming how the named health site is arranged.`,
        decision: `When Revel Surgery is the stated premises, the directory entry must not stand in for instruction from its present operator. Establish a current representative for the particular opening and record how the requester is connected to that representative. At another Brinklow address, confirm the same authority directly from the supplied premises evidence. Only then examine the keyway, lock response, door leaf, frame and hinge condition to choose an opening approach. Explain that method and the available price information before work; obtain fresh agreement if inspection changes the scope or charge. Keep the NHS locator and neighbourhood-plan record in the address notes, not in the technical justification or evidence that entry may proceed.`,
        checks: [
          `Confirm whether CV23 0LU identifies Revel Surgery or whether Barr Lane is only a locality reference.`,
          `Trace authority to the present controller of the named threshold before selecting an entry method.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 3],
        heading: `Testing Brinklow's Ell Lane boundary against The Crescent list entry`,
        local: `The Brinklow appraisal says that only part of the village is designated and uses part of Ell Lane toward the castle as context. Historic England's separate record attaches Grade II* status to the Church of St John the Baptist on The Crescent. A lock-change enquiry therefore needs two yes-or-no findings: whether the supplied address is inside the current conservation boundary and whether the requested opening belongs to that exact listed church.`,
        decision: `If neither finding applies, leave both heritage references out of the replacement specification. If one does apply, ask the responsible property contact for the requirement governing the proposed visible change rather than guessing from the designation label. Technical selection should start with the reason for change and the observed relationship between lock case, cylinder where present, furniture, keep and door alignment. Set out what can remain, what measurement supports the proposed component and what fabric work is excluded. The castle-facing Ell Lane description remains a map cue and cannot approve the work or narrow the hardware choice.`,
        checks: [
          `Record separate results for the partial conservation boundary and list entry 1034957.`,
          `Ask the responsible property contact for any visible-change constraint before specifying retained and replacement parts.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Keeping Revel Surgery identification outside a Brinklow mechanism diagnosis`,
        local: `The NHS page can establish that Revel Surgery is the Barr Lane site named by a caller, and the appraisal can show whether an address falls within only part of Brinklow's conservation area. Neither source reports a door material or mechanism. Build the fault record from the affected leaf: note what the key and handle do, which locking points move, where the frame makes contact and whether any comparison can be made safely with the door open.`,
        decision: `For a surgery opening, obtain the present facilities contact before carrying the diagnosis into an alteration proposal. Describe every symptom as reported, reproduced or untested, then read the faceplate and collect centres, backset and locking-layout dimensions. Assess hinge position, keeps and cylinder fit as separate contributors instead of naming a failed multipoint part from the initial symptom. Only after the supported remedy is clear should the exact address be checked for a visible-fabric question. An Ell Lane or conservation reference belongs to that later property screen; it provides no clue about component identity, access permission or the surgery's internal responsibility chain.`,
        checks: [
          `Separate the NHS site match from observations of key, handle, locking-point and frame behaviour.`,
          `Escalate a surgery alteration through its current facilities contact and boundary-check only the defined remedy.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2, 3],
        heading: `Assigning control at Brinklow's surgery, church or another damaged site`,
        local: `Site identity changes the authority check but does not reveal the damage. A Barr Lane report may name Revel Surgery, a report from The Crescent may concern the Grade II* church, and an Ell Lane reference may only help test the partial conservation boundary. Write down the complete address and the individual pane, door, panel or frame before associating the incident with any of those records. The official sources do not show attachment surfaces, dimensions or present site control.`,
        decision: `Observe any police instruction for protecting evidence before a survey begins. Route a surgery instruction to its current facilities representative and a church instruction to the person presently responsible for that building; for an address identified only through Ell Lane, resolve the map boundary without treating it as ownership evidence. Record accessible dimensions, exposed edges, adjacent material and hazards that can be seen, while marking concealed support as unknown. The temporary proposal should identify the area to be covered, each proposed attachment position and the authorising contact. List glazing, joinery, door or structural follow-up separately so a temporary measure is not represented as reinstatement.`,
        checks: [
          `Match Barr Lane, The Crescent or Ell Lane evidence only after naming the damaged opening.`,
          `Log visible support evidence, proposed attachment positions and the person approving temporary coverage.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `Screening Brinklow upgrade questions through plan, boundary and church records`,
        local: `Use Brinklow's evidence in a fixed sequence. The made plan confirms formal planning context; the appraisal asks whether the exact address is inside the partial designation; list entry 1034957 applies only if the opening is part of the Church of St John the Baptist. None supplies an upgrade objective. Obtain that objective from the authorised controller and record how the existing leaf, frame, hinges, keeps, locking action and any cylinder protection perform at the stated entrance.`,
        decision: `Where the church is involved, ask its current controller to identify the property rule relevant to the defined proposal. For another address, stop the heritage enquiry once the boundary and listing checks show that those records do not apply. Build the option comparison around the observed weakness, component dimensions, evidence supplied for each product and the effect on key control. Note any hardware retained and any door or frame work outside scope. Keep insurer or manager criteria in attributed documents, and never turn the neighbourhood plan or Ell Lane's castle-facing description into a security rating or compatibility shortcut.`,
        checks: [
          `Record which of the plan, partial boundary and church entry actually applies before considering visible work.`,
          `Compare options against observed operation, component dimensions and the controller's stated key-control aim.`,
        ],
      },
    },
  },
  {
    slug: 'southam',
    name: 'Southam',
    region: 'Warwickshire',
    reviewedOn: CURRENT_PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish Southam's made neighbourhood plan, its published conservation material and 2026 review, Southam Primary School on St James Road and Southam Library at Tithe Place, High Street, CV47 0HB.`,
      `The school and library are exact separate sites, while plan and conservation records have wider boundaries and dates. None identifies the requested opening, current controller, authority, hardware, condition, access route or locksmith history.`,
    ],
    accessGuidance: `Obtain the complete Southam address and exact threshold. Distinguish St James Road school from the Tithe Place library and keep current property evidence separate from 2026 review material.`,
    evidenceLimits: `The plan, conservation documents, school register and library page establish planning context or named-site identity only. They do not prove listing, ownership, access, installed hardware, condition, work authority, coverage, response or demand.`,
    facts: [
      {
        heading: `Southam neighbourhood plan made in 2023`,
        text: `Stratford-on-Avon District Council made the Southam Neighbourhood Plan on 11 July 2023, making it part of the development plan used in planning decisions within the area.`,
        sourceIds: ['sdc-southam-plan-page'],
        serviceRelevance: `Use made-plan status only as formal planning context and not as an address, property or service claim.`,
      },
      {
        heading: `Southam conservation boundary and appraisal review`,
        text: `The council provides Southam Conservation Area boundary and review documents and includes Southam in a conservation-appraisal review programme with consultation scheduled in 2026.`,
        sourceIds: ['sdc-conservation-h-z', 'sdc-conservation-review-2026'],
        serviceRelevance: `Use current formally published records and never treat appraisal-review drafts as adopted replacement evidence.`,
      },
      {
        heading: `Southam Primary School on St James Road`,
        text: `The Department for Education records Southam Primary School at St James Road, Southam, CV47 0QB.`,
        sourceIds: ['dfe-southam-primary'],
        serviceRelevance: `Use the record only to identify this school site; establish its current representative, affected threshold and authority separately.`,
      },
      {
        heading: `Southam Library at Tithe Place`,
        text: `Warwickshire County Council identifies Southam Library and Information Centre at Tithe Place, High Street, Southam, CV47 0HB.`,
        sourceIds: ['wcc-southam-library'],
        serviceRelevance: `Use Tithe Place only to identify the library, not to infer its current controller, access, installed hardware or permission for work.`,
      },
    ],
    sourceIds: ['sdc-southam-plan-page', 'sdc-conservation-h-z', 'sdc-conservation-review-2026', 'dfe-southam-primary', 'wcc-southam-library'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [2, 3],
        heading: `Separating St James Road school from Tithe Place in a Southam lockout`,
        local: `Southam Primary School on St James Road and Southam Library at Tithe Place are different public records and neither names an emergency caller or live keyholder. Take the full address, site or building name and exact gate, public door, staff entrance, shared threshold or private unit. Confirm whether either managed site is actually involved instead of treating a High Street or school reference as access authority.`,
        decision: `Identify the current representative entitled to request entry at the school or library, or verify the caller independently for another Southam property. Inspect the latch or lock with the leaf, frame and hinges before deciding how access may proceed. Explain the method supported by the observed assembly and provide available price information before work; secure fresh agreement if inspection changes the expected scope or charge.`,
        checks: [
          `Distinguish St James Road school, Tithe Place library and any unrelated controlled threshold.`,
          `Verify authority and confirm the inspected access method and available price information before work.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 3],
        heading: `Repair or replacement at Tithe Place or another Southam entrance`,
        local: `The county page identifies the library at Tithe Place, while Southam's conservation material has an address-level boundary and a separate 2026 review. Establish the exact property, controlled leaf and approving person before using either record. Record whether unreliable operation, damage, missing keys or a key-control objective prompted the request and whether visible fabric or communal hardware is outside the proposed lock work.`,
        decision: `Inspect the fitted lock alongside frame, hinges, keep and protective furniture before distinguishing adjustment, component repair and replacement. Record faceplate or case information, backset, centres, cylinder measurements and any relevant fixings needed for a compatible option. Treat review documents as review material, verify only current property requirements for the defined proposal, and state retained parts, keys, fitting, adjustments, fabric effects, exclusions and approval in writing.`,
        checks: [
          `Identify the Tithe Place library or other door, its controller and the repair-or-change objective.`,
          `Measure the assembly and separate current property controls from 2026 review material.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 2],
        heading: `Diagnosing a Southam multipoint fault without plan or school assumptions`,
        local: `The made neighbourhood plan and St James Road school record do not identify the material or mechanism at a reported entrance. Name the exact Southam door and record key rotation, handle travel, locking-point movement, contact at the keeps and any safe difference between open and closed operation. Classify each detail as reported, reproduced or untested instead of converting a plan or institution name into a uPVC diagnosis.`,
        decision: `If the opening is at the school, verify its present facilities contact independently because the establishment record supplies no hardware or repair authority. Inspect handle, cylinder where present, faceplate, hinges, keeps and frame. Use readable codes and measurements of centres, backset, locking layout and cylinder fit to separate alignment, furniture, cylinder and multipoint-mechanism questions, retaining the evidence supporting each repair or replacement option.`,
        checks: [
          `Label key, handle, locking-point and frame behaviour as reported, reproduced or untested.`,
          `Verify school authority separately and support component options with direct markings and measurements.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2, 3],
        heading: `Temporary security at the Southam school, library or another identified scene`,
        local: `Southam's conservation record, St James Road school and Tithe Place library answer separate status or site-identity questions; none describes current damage. Record the full premises, elevation and exact window, panel, leaf or frame, then identify the person authorised to approve temporary securing. Photograph visible damage and surrounding material without inferring construction, scene control or an attachment location from either managed-site page.`,
        decision: `Follow any police evidence-preservation direction before disturbing the opening. After release, inspect accessible surrounding construction, measure the exposed span and record compromised locks, intended temporary coverage and anything hidden or unsafe to test. Use the current property record rather than review proposals for any address-specific question, and list later glazing, joinery, door, lock or structural work separately so boarding remains a bounded temporary measure rather than final repair.`,
        checks: [
          `Name the school, library or other Southam opening and its present authorised contact.`,
          `Preserve evidence, state temporary coverage and separate every permanent repair still needed.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `A whole-doorset Southam upgrade with Tithe Place kept site-specific`,
        local: `The made plan, conservation review and Tithe Place library page do not demonstrate an upgrade need at any Southam door. Begin with the exact threshold and the responsible customer's stated outcome, then inspect leaf and frame condition, hinges, keeps, handle operation, lock engagement, cylinder fit where applicable and existing protective furniture. Link each possible improvement to an observed weakness rather than an area designation or public-site name.`,
        decision: `For a library opening, obtain the present site requirement directly; the county page is not a security specification. For every address, compare measured compatibility and relevant product documentation, identify retained components, key-control outcome, fabric work and exclusions, and keep the 2026 review labelled accurately. Verify conservation, listing, lease, insurer or management criteria only where the defined option engages them, recording their source without implying council endorsement.`,
        checks: [
          `Tie the authorised Southam objective to a complete inspection of the named doorset.`,
          `Compare measured product evidence and current property controls while preserving the review's status.`,
        ],
      },
    },
  },
  {
    slug: 'studley',
    name: 'Studley',
    region: 'Warwickshire',
    reviewedOn: CURRENT_PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish Studley's 2017 Parish Plan and Action Plan, the designated whole-parish neighbourhood area, Studley Infants' School and Studley Community Library in Studley Village Hall.`,
      `The school and library records both use High Street and postcode B80 7HJ, but that text does not establish co-location, a shared building or entrance, ownership or common control. None of the records identifies requested hardware, condition, authority or access.`,
    ],
    accessGuidance: `Use the complete Studley address, building and threshold. Distinguish the infant school from the community library record even though both publish High Street and B80 7HJ, and verify current authority separately.`,
    evidenceLimits: `Planning-stage records and matching address text do not establish that the school and library share premises, access or control. The sources prove no ownership, hardware, condition, work authority, coverage, response, demand or job history.`,
    facts: [
      {
        heading: `Studley parish plan adopted in 2017`,
        text: `Stratford-on-Avon District Council lists Studley's Parish Plan and Action Plan as adopted in February 2017.`,
        sourceIds: ['sdc-parish-plans'],
        serviceRelevance: `Describe the document accurately as a parish plan rather than a made neighbourhood development plan.`,
      },
      {
        heading: `Studley's whole-parish neighbourhood area`,
        text: `Council records show Studley Parish Council applied to designate the whole civil parish as its neighbourhood area, and the current register links the confirmation documents.`,
        sourceIds: ['sdc-studley-area-report', 'sdc-designated-neighbourhood-areas'],
        serviceRelevance: `Describe only the documented neighbourhood-area stage and recheck the council register before stating any later adoption or making.`,
      },
      {
        heading: `Studley Infants' School on High Street`,
        text: `The Department for Education records Studley Infants' School at High Street, Studley, B80 7HJ.`,
        sourceIds: ['dfe-studley-infants'],
        serviceRelevance: `Use the record only to identify the school; shared address text with another record does not prove a shared building, entrance or controller.`,
      },
      {
        heading: `Studley Community Library in the village hall`,
        text: `Warwickshire County Council identifies Studley Community Library in Studley Village Hall, High Street, Studley, B80 7HJ, and says the library is run by Studley Parish Council.`,
        sourceIds: ['wcc-studley-community-library'],
        serviceRelevance: `Use this only to identify the library record and its stated operator; verify the present threshold, representative and work authority directly.`,
      },
    ],
    sourceIds: ['sdc-parish-plans', 'sdc-studley-area-report', 'sdc-designated-neighbourhood-areas', 'dfe-studley-infants', 'wcc-studley-community-library'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [2, 3],
        heading: `Resolving Studley's two High Street records before urgent entry`,
        local: `Studley Infants' School and Studley Community Library both publish High Street and B80 7HJ, but those matching details do not establish one building, shared entrance or common controller. Record the organisation or property, full address, building description and precise gate, public door, staff entrance or private threshold. Ask whether either record is relevant rather than treating the postcode as sufficient authority.`,
        decision: `Identify the current representative entitled to request access at the school or library, or verify the caller independently for another Studley property. Inspect the affected latch or lock with its leaf, frame and hinges before choosing an approach. Explain the method supported by that condition and available price information before work; if direct inspection alters the scope or charge, obtain fresh agreement before continuing.`,
        checks: [
          `Name the school, community library or other property and the exact controlled threshold.`,
          `Do not infer co-location; verify authority and confirm the inspected method and price information.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [0, 3],
        heading: `Repair or change at the Studley library or another identified door`,
        local: `The 2017 Parish Plan supplies locality context, while the county page identifies Studley Community Library in the village hall and names its stated operator. Neither record authorises a lock change. Establish the exact leaf, present responsible person and objective, distinguishing unreliable operation, physical damage, missing-key exposure or a revised key-control need before deciding whether adjustment, repair or replacement should be assessed.`,
        decision: `Inspect the lock together with frame, hinges, keep and protective furniture, then capture readable case or faceplate information, backset, centres, cylinder dimensions and fixings. Compare repair and compatible change options without inferring a specification from the library or parish-plan record. Document retained parts, key quantity, fitting, adjustment, fabric effects, communal exclusions and the approving party, attributing any management or insurer requirement to its actual source.`,
        checks: [
          `Identify the library or other entrance, current responsible person and repair-or-change objective.`,
          `Measure the assembly and record retained parts, keys, adjustments, exclusions and approval.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Diagnosing a Studley multipoint fault without boundary or school assumptions`,
        local: `The neighbourhood-area record and the infant-school address contain no door-material or mechanism evidence. Identify the exact Studley entrance and record key rotation, handle travel, movement of the locking points, frame contact and any safe difference between open and closed operation. Label each detail as reported, reproduced or untested rather than treating a civil-parish boundary, High Street address or institution name as a uPVC diagnosis.`,
        decision: `If the school is involved, verify its current facilities contact separately; the DfE record supplies no component schedule or repair authority. Inspect handle, cylinder where fitted, faceplate, hinges, keeps and frame. Use readable codes with centres, backset, locking layout and cylinder fit to separate alignment, furniture, cylinder and multipoint-mechanism questions, retaining photographs and measurements that support each compatible repair or replacement option.`,
        checks: [
          `Classify key, handle, locking-point and frame symptoms from the exact Studley opening.`,
          `Verify school authority separately and support component options with direct codes and measurements.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 3],
        heading: `Temporary security at Studley Village Hall or another confirmed scene`,
        local: `The neighbourhood-area record sets a parish-scale process, while the library page places Studley Community Library in Studley Village Hall. Neither identifies a damaged opening, safe approach or person authorised for an incident. Record the complete property, building, elevation and individual window, panel, leaf or frame, then confirm the current responsible contact before preparing any temporary securing proposal.`,
        decision: `Follow any police evidence-preservation instruction before inspecting or covering the opening. Once released, photograph visible damage, measure the exposed span and examine accessible surrounding material while marking concealed or unsafe conditions unresolved. If the village hall or library is involved, verify the actual site representative rather than relying on the stated operator alone. Record intended temporary coverage, compromised locks and later glazing, joinery, door or structural work separately from reinstatement.`,
        checks: [
          `Name Studley Village Hall or the other damaged property, opening and current authorised contact.`,
          `Preserve evidence, define temporary coverage and list permanent repairs separately.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2, 3],
        heading: `A whole-doorset Studley upgrade with the High Street records kept separate`,
        local: `The parish plan, neighbourhood area, infant-school record and community-library page do not prove an upgrade need or common premises. Start with the exact door and responsible customer's stated outcome, then inspect leaf and frame condition, hinges, keeps, handle operation, lock engagement, cylinder fit where present and protective furniture. Do not infer shared hardware or control because the school and library publish matching High Street postcode text.`,
        decision: `For a school, library or village-hall threshold, obtain the present site's requirement directly; public records are not security specifications. Compare options using measured compatibility and relevant product evidence, identify the observed issue addressed by each measure and state retained components, key-control result, fabric work and exclusions. Keep planning status, operator wording, lease, insurer and management criteria attributed to their own sources without implying endorsement or shared authority.`,
        checks: [
          `Inspect the named Studley doorset and tie each option to the authorised objective and observed issue.`,
          `Keep the two High Street records separate and document measured product evidence and current controls.`,
        ],
      },
    },
  },
  {
    slug: 'alcester',
    name: 'Alcester',
    region: 'Warwickshire',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Official records distinguish Alcester's made 2021 neighbourhood plan and later review consultation, its mapped conservation area, Alcester Library at Globe House on Priory Road and the Grade I Town Hall on Henley Street.`,
      `Those records describe planning status, a bounded designation and two named sites. They do not identify the requested doorway, current controller or keyholder, caller authority, neighbouring-property status, door construction, installed hardware, fault, security need or service availability.`,
    ],
    accessGuidance: `Record the complete Alcester address, building and exact private, shared or managed threshold. Keep the made plan separate from review material, distinguish the Priory Road library from the Henley Street Town Hall and verify the current boundary, property record and authorised person for the particular opening.`,
    evidenceLimits: `The 2025 review consultation is not a replacement made plan, conservation status is boundary-specific and Grade I status applies only to the Town Hall. The library page identifies one managed public site but no current representative; none of the sources proves ownership, access, route conditions, door or lock type, damage, coverage, response or demand.`,
    facts: [
      {
        heading: `Alcester plan and 2025 review consultation`,
        text: `Stratford-on-Avon District Council made the Alcester Neighbourhood Plan on 12 July 2021 and records that Town Council review consultation began on 15 December 2025.`,
        sourceIds: ['sdc-alcester-plan-page'],
        serviceRelevance: `Use the made 2021 plan as current adopted evidence and label review material accurately until the authority records a replacement as made; neither status proves a property or service fact.`,
      },
      {
        heading: `Alcester conservation boundary and appraisal documents`,
        text: `The council's conservation register provides an Alcester Conservation Area boundary map, broadsheet and two-part character appraisal.`,
        sourceIds: ['sdc-conservation-a-g'],
        serviceRelevance: `Check the exact current boundary and verify listed status separately; the record does not make every Alcester address conserved or listed or decide consent for unspecified work.`,
      },
      {
        heading: `Alcester Library at Globe House on Priory Road`,
        text: `Warwickshire County Council identifies Alcester Library and Information Centre at Globe House, Priory Road, Alcester, B49 5DZ.`,
        sourceIds: ['wcc-alcester-library'],
        serviceRelevance: `Apply the record only to the named library; it does not identify the requested door, a current facilities representative, caller authority, hardware or another Priory Road property.`,
      },
      {
        heading: `Grade I Town Hall on Henley Street`,
        text: `Historic England's list entry 1024606 identifies Alcester Town Hall on Henley Street as a Grade I listed building.`,
        sourceIds: ['historic-england-alcester-town-hall-1024606'],
        serviceRelevance: `Apply the designation only to the identified Town Hall, then verify its current controller, exact entrance and proposal-specific requirements separately.`,
      },
    ],
    sourceIds: ['sdc-alcester-plan-page', 'sdc-conservation-a-g', 'wcc-alcester-library', 'historic-england-alcester-town-hall-1024606'],
    contexts: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        heading: `Keeping Alcester's plan chronology out of a Globe House access check`,
        local: `Two dates matter only to the planning record: the Alcester plan was made in 2021 and the later review consultation began in December 2025. By contrast, the county record identifies Alcester Library at Globe House, Priory Road, B49 5DZ. For a lockout report, write those facts in separate fields. The caller must still supply the precise opening and say whether Globe House is the affected premises or merely a location reference.`,
        decision: `If the library is involved, locate a presently responsible facilities contact through the requester's own authority trail; a county webpage cannot perform that role. If the job is elsewhere on Priory Road, prevent the library address from being carried across to the other premises. Document the requester's connection to the named door, then examine the actual cylinder or lock, surrounding furniture, leaf alignment and frame before setting out an access method. Give the available price information before work and seek fresh agreement if the inspected condition changes the method, scope or charge. The 2025 consultation must remain labelled as review activity and must never be used as newer property evidence, entry permission or support for a mechanical choice.`,
        checks: [
          `Record the 2021 made plan, 2025 review and Globe House address as three different evidence items.`,
          `Confirm the particular Priory Road threshold and its current authority chain before access work is defined.`,
        ],
      },
      'lock-change': {
        localFactIndexes: [1, 3],
        heading: `Separating the Henley Street Town Hall entry from Alcester's wider map`,
        local: `The council publishes a boundary map and appraisal material for Alcester Conservation Area. Historic England goes further only for one named asset: Town Hall, Henley Street, list entry 1024606, Grade I. Resolve the customer's address first and record whether it is the Town Hall, another address inside the current conservation boundary or outside that designation. This prevents a prominent Henley Street record from being treated as the status of surrounding buildings.`,
        decision: `For the Town Hall, the building controller must state what approval process applies to the specific visible alteration under consideration. For a different conserved address, obtain guidance tied to that property rather than borrowing the Town Hall's grade. Once those documentary questions are isolated, decide repair versus change from the entrance itself: describe the existing lock function, key-control reason, fixing arrangement, dimensions, alignment and parts intended to remain. The written recommendation should show why a component fits the inspected assembly and identify any fabric alteration separately, without presenting the map or list entry as technical endorsement.`,
        checks: [
          `Classify the address as Town Hall, another mapped property or outside the current designation.`,
          `Document the existing function, measured fit and controller-supplied alteration requirement independently.`,
        ],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: `Using Globe House to identify an Alcester site, not a uPVC part`,
        local: `Globe House, Priory Road, is verified as the address of Alcester Library, and the council separately supplies conservation mapping. These records can settle site identity and prompt an address-level status check, but they contain no observation of a door. Ask the reporter to distinguish the exact library opening or other property entrance, then capture handle resistance, key rotation, locking-point travel, door-edge markings and contact with the keeps or frame only where this can be done safely.`,
        decision: `Treat the caller's account as a symptom log rather than a parts order. Compare open and closed behaviour if safe, photograph readable faceplate information and measure centres, backset and cylinder projection where applicable. Use those results to separate alignment, furniture, cylinder and multipoint-mechanism questions. If the supported repair would alter visible material at an address confirmed within the conservation boundary, ask for the relevant property instruction at that stage. A request at the library also needs its current facilities representative, but Globe House identification cannot diagnose the fault, select a strip or prove permission to alter the entrance.`,
        checks: [
          `Label each mechanism symptom as caller-reported, safely reproduced or not tested at the named opening.`,
          `Use Globe House and the conservation map only after the component evidence and proposed remedy are clear.`,
        ],
      },
      'boarding-up': {
        localFactIndexes: [1, 2, 3],
        heading: `Recording temporary work at Globe House, Town Hall or another Alcester address`,
        local: `Alcester's records create three distinct status questions for a damaged opening: whether the address falls inside the mapped conservation area, whether it is the county library at Globe House and whether it is the Grade I Town Hall on Henley Street. None describes the incident. Identify the individual sheet of glass, panel, leaf or frame, the person currently responsible for it and any instruction already issued for preserving evidence before making a temporary-work record.`,
        decision: `At Globe House, direct the proposed measure to the library's present facilities authority. At Town Hall, obtain a response specific to that listed building and the material that would be affected. For every other location, use the map result only to decide whether additional property guidance is needed. Survey the exposed span and accessible surrounding construction, noting anything concealed or unsafe to test. Define the temporary coverage and proposed attachment positions in writing, with approval for those positions attributed to the responsible contact. Keep broken hardware and immediate weather exposure observations apart from later glazing, joinery or structural reinstatement so the temporary record does not imply completion.`,
        checks: [
          `Identify whether the damaged asset is Globe House, Town Hall or another boundary-checked address.`,
          `Attribute fixing-point approval and list all permanent reinstatement outside the temporary record.`,
        ],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 3],
        heading: `Freezing Alcester's 2021 plan status before an upgrade comparison`,
        local: `First freeze the evidence date: the 2021 Alcester plan is the made plan, while the December 2025 material records a review consultation rather than a replacement made plan. Then resolve the current conservation boundary and ask whether the entrance is part of the Grade I Town Hall on Henley Street. These steps prevent evolving planning material and one building's listing from being mistaken for evidence that an unspecified Alcester door needs an upgrade.`,
        decision: `The upgrade brief should instead begin with the controller's stated outcome and a condition schedule for that opening. Note engagement at the keeps, hinge support, handle operation, lock function, cylinder fit where present and any protective furniture. Rank possible measures by the observed issue they address, the dimensions they require and the product documentation available, while stating which existing elements would remain. If Town Hall fabric is affected, send the defined proposal through its responsible property process; if only the review is mentioned, retain it as dated planning context. Record external insurer or management criteria verbatim from their source and exclude unsupported risk or performance conclusions.`,
        checks: [
          `State that the 2021 plan remains made evidence and label the December 2025 material as review consultation.`,
          `Link each upgrade option to the entrance condition schedule and route Town Hall fabric questions separately.`,
        ],
      },
    },
  },
]

export const SOUTH_WEST_AREA_GUIDES = Object.fromEntries(
  AREA_SEEDS.map((seed, index) => [seed.slug, buildGuide(seed, index)]),
) as Record<SouthWestAreaSlug, GovernedAreaGuide>
