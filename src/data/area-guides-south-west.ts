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
  'wdc-warwick-conservation': localitySource('wdc-warwick-conservation', 'A Guide to Conservation Areas: Warwick Conservation Area', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/3082/warwick_-_guide_to_conservation_areas.pdf', 'The mapped Warwick designation and its fifteen named character sections.', 'property-status'),
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
  'wdc-kenilworth-plan-page': localitySource('wdc-kenilworth-plan-page', 'Kenilworth neighbourhood plan', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1006/kenilworth_neighbourhood_plan', 'The referendum, made date and planning use of the Kenilworth neighbourhood plan.'),
  'wdc-kenilworth-conservation': localitySource('wdc-kenilworth-conservation', 'A Guide to Conservation Areas: Kenilworth Conservation Area', 'Warwick District Council', 'https://www.warwickdc.gov.uk/download/downloads/id/3080/kenilworth_-_guide_to_conservation_areas.pdf', 'Kenilworth conservation-area designation history and the named 2005 extensions.', 'property-status'),
  'solihull-balsall-plan-page': localitySource('solihull-balsall-plan-page', 'Balsall Neighbourhood Plan', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/balsall-neighbourhood-plan', 'The made date and decision-making role of the Balsall Parish neighbourhood plan.'),
  'solihull-balsall-made-plan': localitySource('solihull-balsall-made-plan', 'Balsall Parish Neighbourhood Development Plan 2018-2033', 'Solihull Metropolitan Borough Council (host; Balsall Parish Council plan)', 'https://www.solihull.gov.uk/sites/default/files/2021-06/Balsall-Parish-Neighbourhood-Development-Plan.pdf', 'The cross-parish extent of Balsall Common and the plan limit to the Balsall-parish portion.'),
  'solihull-meriden-plan-page': localitySource('solihull-meriden-plan-page', 'Meriden Neighbourhood Plan', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/meriden-neighbourhood-plan', 'The referendum, made date and decision-making role of the Meriden Parish neighbourhood plan.'),
  'solihull-conservation-areas': localitySource('solihull-conservation-areas', 'Conservation Areas', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/conservation-areas', 'The council register entries for Meriden Green and Meriden Hill Conservation Areas.', 'property-status'),
  'solihull-hampton-plan-page': localitySource('solihull-hampton-plan-page', 'Hampton-in-Arden neighbourhood plan', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/planning-and-building-control/hampton-arden-neighbourhood-plan', 'The continuing scope of the 2017 plan and withdrawal of the newer submission draft.'),
  'solihull-hampton-history': localitySource('solihull-hampton-history', 'Hampton in Arden history', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/about-solihull/hampton-arden-history', 'The council statement that central Hampton-in-Arden was designated a conservation area in 1968.', 'property-status'),
  'solihull-hampton-library': localitySource('solihull-hampton-library', 'Hampton-in-Arden Library', 'Solihull Metropolitan Borough Council', 'https://www.solihull.gov.uk/libraries/hampton-arden-library', 'The current council library page identifies the Hampton-in-Arden Library at 39 Fentham Road, Hampton in Arden, B92 0AY.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-hampton-church-1055777': localitySource('historic-england-hampton-church-1055777', 'Church of Saint Mary and Saint Bartholomew, list entry 1055777', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1055777?section=official-list-entry', 'The official list entry identifies the High Street church in Hampton in Arden as a Grade I listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'rbc-wolston-conservation': localitySource('rbc-wolston-conservation', 'Wolston Conservation Area Character Appraisal', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6569677/Wolston_Character_Appraisal.pdf/bc559f87-8d33-e741-9b96-c4797248699b?t=1750866416447', 'The limited conservation area, River Avon relationship and railway bridge separating Wolston and Brandon.', 'property-status'),
  'rbc-wolston-plan-page': localitySource('rbc-wolston-plan-page', 'Wolston Neighbourhood Plan', 'Rugby Borough Council', 'https://www.rugby.gov.uk/w/wolston-neighbourhood-plan', 'The neighbourhood-area designation, Call for Sites and November 2024 screening determination records published by the council.'),
  'rbc-ryton-plan-page': localitySource('rbc-ryton-plan-page', 'Ryton-on-Dunsmore Neighbourhood Plan: plan adoption', 'Rugby Borough Council', 'https://www.rugby.gov.uk/pl/w/ryton-on-dunsmore-neighbourhood-plan-1', 'The made date and development-plan status of the Ryton-on-Dunsmore neighbourhood plan.'),
  'rbc-ryton-made-plan': localitySource('rbc-ryton-made-plan', 'Ryton-on-Dunsmore Neighbourhood Plan, adopted July 2021', 'Rugby Borough Council (host; Ryton-on-Dunsmore Parish Council plan)', 'https://www.rugby.gov.uk/documents/20124/6578033/Ryton_on_Dunsmore_Neighbourhood_Plan__adopted_version___July_2021_.pdf/e2fd154b-c7a7-2df7-ef14-5850fa003c6b?t=1750863717054', 'The civil-parish plan boundary, River Avon valley edges and Main Rural Settlement classification.'),
  'wdc-baginton-plan-page': localitySource('wdc-baginton-plan-page', 'Baginton and Bubbenhall neighbourhood plan', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1129/baginton_and_bubbenhall_neighbourhood_plan', 'The joint parish preparation and referendum result for the made Baginton and Bubbenhall plan.'),
  'rbc-brandon-plan-page': localitySource('rbc-brandon-plan-page', 'Brandon and Bretford Neighbourhood Plan', 'Rugby Borough Council', 'https://www.rugby.gov.uk/w/brandon-and-bretford-neighbourhood-plan', 'The made date and development-plan status of the joint Brandon and Bretford neighbourhood plan.'),
  'rbc-brandon-conservation': localitySource('rbc-brandon-conservation', 'Brandon Conservation Area Character Appraisal', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6569677/Brandon_Character_Appraisal.pdf/9c7d8630-4654-dcde-6287-650846002cb2?t=1750866416443', 'The bounded Brandon conservation context north of Avondale Road and railway-viaduct approach.', 'property-status'),
  'wcc-brandon-hall-approved-venue': localitySource('wcc-brandon-hall-approved-venue', 'Brandon Hall Hotel', 'Warwickshire County Council', 'https://apps.warwickshire.gov.uk/ApprovedVenue/venues/10', 'The current county approved-venue record identifies Brandon Hall Hotel at Main Street, Brandon, CV8 3FW.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-avon-viaduct-1034898': localitySource('historic-england-avon-viaduct-1034898', 'Avon Viaduct, list entry 1034898', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1034898?section=official-list-entry', 'The official list entry records the Avon Viaduct in Brandon and Bretford civil parish as a Grade II listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'rbc-rural-study-2024': localitySource('rbc-rural-study-2024', 'Rugby Borough Council Rural Sustainability Study 2024', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/62894537/CD.3.10%2BAppendix%2B10%2BRugby%2BBorough%2BCouncil%2BRural%2BSustainability%2BStudy%2B2024.pdf/6837df18-54d6-0146-1910-37307fb4a34f?t=1774451299803', 'The council study classifies Shilton as a Rural Village.'),
  'ons-rugby-area-profile': localitySource('ons-rugby-area-profile', 'Rugby area profile', 'Office for National Statistics', 'https://www.ons.gov.uk/explore-local-statistics/areas/E07000220-rugby', 'The official Rugby area profile lists Shilton and Barnacle among the district\'s parishes.'),
  'wcc-shilton-bus': localitySource('wcc-shilton-bus', 'Bus service 74/74A/74B/74C', 'Warwickshire County Council', 'https://apps.warwickshire.gov.uk/BusTimetable/services/1379', 'The live county timetable listing Shilton on the Nuneaton and Coventry corridor.'),
  'rbc-brinklow-plan-page': localitySource('rbc-brinklow-plan-page', 'Brinklow Neighbourhood Plan', 'Rugby Borough Council', 'https://www.rugby.gov.uk/w/brinklow-neighbourhood-plan', 'The made date and development-plan status of the Brinklow neighbourhood plan.'),
  'rbc-brinklow-conservation': localitySource('rbc-brinklow-conservation', 'Brinklow Conservation Area Character Appraisal', 'Rugby Borough Council', 'https://www.rugby.gov.uk/documents/20124/6569677/Brinklow_Character_Appraisal.pdf/701c66c7-5596-39a8-e538-ab8daa4f699f?t=1750866416443', 'The partial-village conservation boundary and its inclusion of part of Ell Lane.', 'property-status'),
  'nhs-revel-surgery-brinklow-m84031': localitySource('nhs-revel-surgery-brinklow-m84031', 'Revel Surgery', 'NHS', 'https://www.nhs.uk/services/gp-surgery/revel-surgery/M84031', 'The current NHS service record identifies Revel Surgery at The Surgery, Barr Lane, Brinklow, Rugby, Warwickshire, CV23 0LU.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-brinklow-church-1034957': localitySource('historic-england-brinklow-church-1034957', 'Church of St John the Baptist, list entry 1034957', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1034957?section=official-list-entry', 'The official list entry identifies the Church of St John the Baptist on The Crescent, Brinklow, as a Grade II* listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'sdc-southam-plan-page': localitySource('sdc-southam-plan-page', 'Southam Neighbourhood Plan', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/southam-neighbourhood-plan.cfm', 'The made date and current development-plan role of the Southam neighbourhood plan.'),
  'sdc-parish-plans': localitySource('sdc-parish-plans', 'List of Adopted Parish Plans', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/parish-plans-a-m.cfm', 'The February 2017 adoption entry for the Studley Parish Plan and Action Plan.'),
  'sdc-studley-area-report': localitySource('sdc-studley-area-report', 'Studley Neighbourhood Area Report, 17 January 2018', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/doc/207189/name/Studley%20NDP%20area%20report%20Leader%20of%20Council.pdf/', 'The Studley Parish Council application to designate the whole civil parish as its neighbourhood area.'),
  'sdc-designated-neighbourhood-areas': localitySource('sdc-designated-neighbourhood-areas', 'Designated Neighbourhood Plan Areas', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/designated-neighbourhood-plan-areas.cfm', 'The current Studley neighbourhood-area entry and linked confirmation documents.'),
  'sdc-alcester-plan-page': localitySource('sdc-alcester-plan-page', 'Alcester Neighbourhood Plan', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/alcester-neighbourhood-plan.cfm', 'The 2021 made plan and Town Council review consultation recorded from December 2025.'),
  'sdc-conservation-a-g': localitySource('sdc-conservation-a-g', 'Conservation Areas A-G', 'Stratford-on-Avon District Council', 'https://www.stratford.gov.uk/planning-building/conservation-areas-a-g.cfm', 'The published Alcester Conservation Area map, broadsheet and two-part character appraisal.', 'property-status'),
  'wcc-alcester-library': localitySource('wcc-alcester-library', 'Alcester Library and Information Centre', 'Warwickshire County Council', 'https://www.warwickshire.gov.uk/alcesterlibrary', 'The current county page identifies Alcester Library and Information Centre at Globe House, Priory Road, Alcester, B49 5DZ.', 'locality', PROMOTION_REVIEWED_ON),
  'historic-england-alcester-town-hall-1024606': localitySource('historic-england-alcester-town-hall-1024606', 'Alcester Town Hall, list entry 1024606', 'Historic England', 'https://historicengland.org.uk/listing/the-list/list-entry/1024606?section=official-list-entry', 'The official list entry identifies Alcester Town Hall on Henley Street as a Grade I listed building.', 'property-status', PROMOTION_REVIEWED_ON),
  'dfe-heathcote-primary': localitySource('dfe-heathcote-primary', 'Heathcote Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/144648', 'The official establishment name and Vickers Way, Heathcote address for this specific primary school.'),
  'dfe-milverton-primary': localitySource('dfe-milverton-primary', 'Milverton Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125610', 'The official establishment name and Greatheed Road, Leamington Spa address for this specific primary school.'),
  'dfe-sydenham-primary': localitySource('dfe-sydenham-primary', 'Sydenham Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/130868', 'The official establishment name and Calder Walk, Sydenham address for this specific primary school.', 'locality', PROMOTION_REVIEWED_ON),
  'charity-commission-sydenham-neighbourhood-initiatives-1077333': localitySource('charity-commission-sydenham-neighbourhood-initiatives-1077333', 'Sydenham Neighbourhood Initiatives Limited, charity 1077333', 'Charity Commission for England and Wales', 'https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/3951749/full-print', 'The current register describes the SYDNI Centre as a multicultural community centre and gives its Cottage Square contact address.', 'locality', PROMOTION_REVIEWED_ON),
  'wdc-sydenham-play-area': localitySource('wdc-sydenham-play-area', 'Children\'s play areas', 'Warwick District Council', 'https://www.warwickdc.gov.uk/info/20245/parks/216/play_areas', 'The council list identifies Fallow Hill Play Area on Sydenham Drive among the play areas it maintains.', 'locality', PROMOTION_REVIEWED_ON),
  'dfe-whitnash-primary': localitySource('dfe-whitnash-primary', 'Whitnash Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125560', 'The official establishment name and Langley Road, Whitnash address for this specific primary school.'),
  'dfe-coten-end-primary': localitySource('dfe-coten-end-primary', 'Coten End Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/151505', 'The official establishment name and Coten End, Warwick address for this specific primary school.'),
  'wdc-warwick-gates-community-centre': localitySource('wdc-warwick-gates-community-centre', 'Warwick Gates Community Centre', 'Warwick District Council', 'https://www.warwickdc.gov.uk/directory_record/3052/warwick_gates_community_centre', 'The council facilities-directory record for the specifically named Warwick Gates Community Centre.'),
  'dfe-woodloes-primary': localitySource('dfe-woodloes-primary', 'Woodloes Primary School', 'Department for Education', 'https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/141855', 'The official establishment name and Deansway, Woodloes Park Estate address for this specific primary school.', 'locality', PROMOTION_REVIEWED_ON),
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
    summary: [
      `Warwick District Council's 2024-25 monitoring report records completed retail units, nursery and care home at Lower Heathcote Local Centre while the office had not started. Its Tachbrook Country Park page describes a planned play area in the Heathcote section.`,
      `Both records are status-sensitive snapshots, not evidence that later work is complete or that a supplied address is part of either project. They establish no property type, entrance, authority, access condition or installed locking system.`,
    ],
    accessGuidance: `Distinguish Lower Heathcote Local Centre from the Heathcote side of Tachbrook Country Park and from other addresses. Identify the exact building or managed asset and responsible contact, and recheck project status before using it.`,
    evidenceLimits: `The monitoring report is dated and the park facility is expressly planned. Neither source proves current completion, private-property access, site ownership, route availability, building fabric, door type, lock condition, service coverage, demand or response time.`,
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
    summary: [
      `Stratford-on-Avon District Council's report records that Shottery Conservation Area was designated in 1969 and that its reviewed appraisal became the council's formal view in 1992. The made town plan separately designates Shottery Fields as Local Green Space.`,
      `The conservation boundary and green-space designation are different planning contexts. Neither establishes that an address lies within them, that a building is listed, who controls an entrance, or what construction and locking system it contains.`,
    ],
    accessGuidance: `Obtain the full Shottery address and distinguish the conservation boundary from Shottery Fields Local Green Space. Check current address-level designation, listed status and the responsible property or land manager before any externally visible work.`,
    evidenceLimits: `Designation and appraisal dates do not describe every Shottery building, and Local Green Space status is not an access route. The sources prove no ownership, property type, fabric, lock, damage, service reach, response or demand.`,
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
        heading: `Meriden primary school on Fillongley Road`,
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
    summary: [
      `Rugby Borough Council's appraisal says Wolston Conservation Area covers only a limited village section, mostly south of the River Avon, with a railway bridge at its northern tip separating Wolston from Brandon.`,
      `The council also hosts neighbourhood-area designation, Call for Sites and November 2024 screening determination records for Wolston. These records establish the documented stage reviewed here; any later adoption status must be checked against a newer explicit council statement.`,
    ],
    accessGuidance: `Use the full Wolston address and treat the River Avon and railway bridge only as verified orientation. Check the current conservation boundary, distinguish Wolston from Brandon, and describe the neighbourhood-plan stage only from the latest council record.`,
    evidenceLimits: `The appraisal covers a limited area and the reviewed council record documents planning stages rather than property facts. Neither proves a building's designation, use, access, material, lock, condition, route, coverage or response; river and rail references are not travel claims.`,
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
    summary: [
      `The joint Baginton and Bubbenhall Neighbourhood Development Plan was made after the 15 March 2018 yes vote and was prepared by both parish councils. The adopted district plan lists Baginton as a Growth Village and in its conservation-area table.`,
      `The joint-plan geography, village hierarchy and conservation entry must not be conflated. They do not establish that an address is inside the designation, whether a building is listed, who controls it, or what entrance hardware exists.`,
    ],
    accessGuidance: `Use the complete Baginton address and keep it distinct from Bubbenhall within the joint plan. Check the current Baginton conservation boundary and exact property status, then confirm the entrance and person authorised to instruct work.`,
    evidenceLimits: `A joint parish plan, Growth Village classification and conservation-table entry are area-scale records. They do not prove property type, listing, ownership, access, construction, lock condition, service reach, response, demand or previous work.`,
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
        heading: `Baginton Parish Council directory record`,
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
    summary: [
      `The council's 2024 study places Shilton in its Rural Village settlement category. The Office for National Statistics lists Shilton and Barnacle among Rugby's parishes, and Warwickshire County Council's live register lists Shilton on bus services 74/74A/74B/74C.`,
      `The planning classification, parish name and timetable entry are context rather than property evidence. The transport record is time-sensitive and must be rechecked before publication; none of the sources establishes private access, hardware or service coverage.`,
    ],
    accessGuidance: `Use the complete Shilton address rather than the broader Shilton and Barnacle parish name, and recheck the live county timetable before mentioning service 74 variants. Never assume a stop is near the property.`,
    evidenceLimits: `Rural Village status and a bus-stop listing do not prove property type, ownership, access, route suitability, timetable permanence, parking, door material, lock type, condition, locksmith availability, coverage, response time or local demand.`,
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
        decision: `When Revel Surgery is the stated premises, the directory entry must not stand in for instruction from its present operator. Establish a current representative for the particular opening and record how the requester is connected to that representative. At another Brinklow address, confirm the same authority directly from the supplied premises evidence. Only then examine the keyway, lock response, door leaf, frame and hinge condition to choose an opening approach. Keep the NHS locator and neighbourhood-plan record in the address notes, not in the technical justification or evidence that entry may proceed.`,
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
    summary: [
      `Stratford-on-Avon District Council made the Southam Neighbourhood Plan on 11 July 2023. The council publishes a Southam conservation boundary map and review documents and includes the area in its 2026 conservation-appraisal review programme.`,
      `The made plan and conservation records support planning context, but review work must not be presented as adopted replacement policy. Neither establishes that an address is designated or listed, who controls its entrance or what hardware is installed.`,
    ],
    accessGuidance: `Obtain the complete Southam address, check the latest formally published conservation boundary and distinguish current adopted records from 2026 appraisal-review material. Verify listed status, exact entrance and responsible party independently before visible work.`,
    evidenceLimits: `The neighbourhood plan and conservation review do not apply uniformly to every Southam building. Draft review material proves no adopted change, and the sources establish no ownership, access, fabric, lock, coverage, response or demand.`,
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
        decision: `If the library is involved, locate a presently responsible facilities contact through the requester's own authority trail; a county webpage cannot perform that role. If the job is elsewhere on Priory Road, prevent the library address from being carried across to the other premises. Document the requester's connection to the named door, then examine the actual cylinder or lock, surrounding furniture, leaf alignment and frame before setting out an access method. The 2025 consultation must remain labelled as review activity and must never be used as newer property evidence, entry permission or support for a mechanical choice.`,
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
