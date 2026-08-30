import type { AreaSlug } from './area-authorities'
import type { AreaGuideSource, GovernedAreaGuide } from './area-guide-types'
import { SERVICE_AREA_SLUGS, type ServiceAreaSlug } from './service-area-types.ts'
import {
  EVIDENCE_REVIEWED_ON,
  POLICE_SOURCE_IDS,
  getTechnicalEvidenceSource,
} from './locksmith-evidence.ts'

const REVIEWED_ON = EVIDENCE_REVIEWED_ON
const PROMOTION_REVIEWED_ON = '2026-08-30'

const LOCAL_SOURCES = {
  'nbbc-nuneaton-town-centre': {
    id: 'nbbc-nuneaton-town-centre',
    title: 'Nuneaton town centre',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/markets-town-centres/town-centres',
    supports: 'The origin of the Nuneaton name, its 1247 market, and the council\'s current pedestrian-core, station and Riversley Park orientation.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'gazette-nuneaton-conservation-2022': {
    id: 'gazette-nuneaton-conservation-2022',
    title: 'Notice of Variation of Nuneaton Town Centre Conservation Area',
    publisher: 'The Gazette, published by authority',
    url: 'https://www.thegazette.co.uk/notice/4289465',
    supports: 'The 15 February 2022 confirmation of defined Nuneaton Town Centre Conservation Area boundary additions.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'warwickshire-her-attleborough-medieval': {
    id: 'warwickshire-her-attleborough-medieval',
    title: 'Attleborough Medieval Settlement, record MWA9489',
    publisher: 'Warwickshire Historic Environment Record',
    url: 'https://timetrail.warwickshire.gov.uk/detail.aspx?monuid=WA9489',
    supports: 'The probable medieval-settlement extent derived from the 1888 Ordnance Survey map and the recorded 1243 manor lease.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-heritage-spd-2026': {
    id: 'nbbc-heritage-spd-2026',
    title: 'Heritage Supplementary Planning Document 2026',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/downloads/file/2503/heritage-supplementary-planning-document-2026-',
    supports: 'The Appendix B local-list entries for 2 Attleborough Road, Former Albion Works at 64-122 Attleborough Road and the exact 20-118 even and 39-117 odd Bermuda Village address ranges, with the document\'s bounded heritage wording.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'nbbc-heritage-spd-adoption-2026': {
    id: 'nbbc-heritage-spd-adoption-2026',
    title: 'Heritage Supplementary Planning Document 2026 adoption statement',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/downloads/file/2504/heritage-supplementary-planning-document-2026-adoption-statement',
    supports: 'Formal adoption of the Heritage Supplementary Planning Document on 29 April 2026.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'historic-england-holy-trinity-attleborough-1034975': {
    id: 'historic-england-holy-trinity-attleborough-1034975',
    title: 'Church of the Holy Trinity, list entry 1034975',
    publisher: 'Historic England',
    url: 'https://historicengland.org.uk/listing/the-list/list-entry/1034975',
    supports: 'The Grade II designation and statutory Attleborough Road address of the Church of the Holy Trinity.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'historic-england-arbury-road-350-352-1261649': {
    id: 'historic-england-arbury-road-350-352-1261649',
    title: '350 and 352 Arbury Road, list entry 1261649',
    publisher: 'Historic England',
    url: 'https://historicengland.org.uk/listing/the-list/list-entry/1261649',
    supports: 'The Grade II designation, Stockingford locality and statutory address of 350 and 352 Arbury Road, Nuneaton CV10 7NE.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'historic-england-st-james-weddington-1185771': {
    id: 'historic-england-st-james-weddington-1185771',
    title: 'Church of St James, list entry 1185771',
    publisher: 'Historic England',
    url: 'https://historicengland.org.uk/listing/the-list/list-entry/1185771',
    supports: 'The Grade II designation, Weddington locality and statutory Church Lane address of the Church of St James.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'nbbc-council-home-alterations': {
    id: 'nbbc-council-home-alterations',
    title: 'Making Changes to Your Council or Former Council Home',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/repairs-maintenance/council-house-modernisation/6',
    supports: 'The prior landlord-permission rule for alterations to council or former council homes, including changes to door handles or locks, and its separation from planning or building approval.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'nbbc-listed-building-consent': {
    id: 'nbbc-listed-building-consent',
    title: 'Listed building consent',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/conservation/conservation-heritage-trees/3',
    supports: 'The requirement to check restrictions and obtain consent before work that affects a listed building\'s character, appearance or historic fabric.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'warwickshire-her-stockingford-galley-manor': {
    id: 'warwickshire-her-stockingford-galley-manor',
    title: 'The Manor of Stockingford, Galley Common, record MWA12426',
    publisher: 'Warwickshire Historic Environment Record',
    url: 'https://timetrail.warwickshire.gov.uk/detail.aspx?monuid=WA12426',
    supports: 'Documentary and map evidence for the former Stockingford manor, Galley Common and associated historic lanes and field names.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-tenant-walkabouts-2026': {
    id: 'nbbc-tenant-walkabouts-2026',
    title: 'Neighbourhood walkabouts and engagement days',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/resident-involvement/tenant-engagement/8',
    supports: 'The council\'s 2026 housing walkabout schedule, its statement that walkabouts cover neighbourhoods where it provides social housing, and the selected Attleborough, Stockingford, Weddington and Camp Hill street groups.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-weddington-meadows-walk': {
    id: 'nbbc-weddington-meadows-walk',
    title: 'Weddington Meadows and Walk',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/directory-record/4358/weddington-meadows-and-walk',
    supports: 'The council directory name and nature-and-wildlife-park classification for Weddington Meadows and Walk.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-horeston-grange-wellbeing-walk': {
    id: 'nbbc-horeston-grange-wellbeing-walk',
    title: 'Well-being walks: Horeston Grange meeting point',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/sports-physical-activity/wellbeing-walks',
    supports: 'The current council schedule naming the Horeston Grange Co-op meeting point at Camborne Drive, Nuneaton CV11 6GU.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-horeston-grange-asset-register-2026': {
    id: 'nbbc-horeston-grange-asset-register-2026',
    title: 'Land and Buildings Assets list',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/downloads/file/1733/assets-list',
    supports: 'The current asset row for St. Nicholas MUGA at Tiverton Drive, Nuneaton CV11 6YL, recorded as freehold land occupied by the local authority and classed as a play area or park.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'wcc-list-of-streets-2026': {
    id: 'wcc-list-of-streets-2026',
    title: 'List of Streets maintained at public expense, produced 11 August 2026',
    publisher: 'Warwickshire County Council',
    url: 'https://api.warwickshire.gov.uk/documents/WCCC-930-12',
    supports: 'The 11 August 2026 county street-to-locality labels, including selected Attleborough, Stockingford, Weddington, Horeston Grange, Whitestone and Camp Hill entries, Tiverton Drive\'s Horeston Grange label, Camp Hill Road\'s blank locality, and Bermuda-labelled roads in Nuneaton.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-whitestone-hsg9-5yhls-2026': {
    id: 'nbbc-whitestone-hsg9-5yhls-2026',
    title: 'Five-Year Housing Land Supply Calculation - 1 April 2026',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/downloads/file/2666/5yhls-calculation-and-housing-trajectory-1st-april-2026',
    supports: 'The dated trajectory row for site 64c001, land off Golf Drive (HSG9), including its U/C status, Whitestone-and-Bulkington ward grouping, total capacity of 621 and 68 completions between 2021/22 and 2025/26.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'nbbc-magyar-crescent-tenancy-team': {
    id: 'nbbc-magyar-crescent-tenancy-team',
    title: 'Magyar Crescent, Nuneaton - Tenancy and neighbourhood teams',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/directory-record/3892/magyar-crescent-nuneaton',
    supports: 'The council directory record for Magyar Crescent, including its published tenancy-management, housing-repair and emergency out-of-hours contact routes.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'wcc-whitestone-infant-school': {
    id: 'wcc-whitestone-infant-school',
    title: 'Whitestone Infant School',
    publisher: 'Warwickshire County Council',
    url: 'https://apps.warwickshire.gov.uk/FindASchool/schools/whitestone-infant-school',
    supports: 'The school directory name, community category and address at Magyar Crescent, Nuneaton, Warwickshire CV11 4SQ.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-queen-elizabeth-road-park': {
    id: 'nbbc-queen-elizabeth-road-park',
    title: 'Queen Elizabeth Road park',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/directory-record/4297/queen-elizabeth-road',
    supports: 'The council directory address, local-park classification and listed facilities at Queen Elizabeth Road.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-chess-centre': {
    id: 'nbbc-chess-centre',
    title: 'The CHESS Centre',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/community-facilities/community-centres-1/4',
    supports: 'The current council record for the multi-room CHESS Centre at 460 Cedar Road, Nuneaton CV10 9DN.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'warwickshire-her-chapel-end-chapel': {
    id: 'warwickshire-her-chapel-end-chapel',
    title: 'Congregational Chapel, Coleshill Road, Chapel End, record MWA2447',
    publisher: 'Warwickshire Historic Environment Record',
    url: 'https://timetrail.warwickshire.gov.uk/detail.aspx?monuid=WA2447',
    supports: 'The chapel location, 1840 construction date, 1853 Sunday-school addition and recorded architectural features.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'wcc-bermuda-park-railway-200': {
    id: 'wcc-bermuda-park-railway-200',
    title: 'Warwickshire County Council joins the Railway 200 celebrations',
    publisher: 'Warwickshire County Council',
    url: 'https://www.warwickshire.gov.uk/news/article/5895/warwickshire-county-council-joins-the-railway-200-celebrations',
    supports: 'Bermuda Park station opening history and the council-reported passenger figures for two past periods.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-borough-plan-review-2021-2039': {
    id: 'nbbc-borough-plan-review-2021-2039',
    title: 'Adopted Borough Plan Review 2021-2039',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://fs-filestore-eu.s3.eu-west-1.amazonaws.com/nuneaton/Documents/Borough%20Plan%20Review%20%282021-2039%29.pdf',
    supports: 'The plan adopted on 10 December 2025, including the Horeston Grange and Camp Hill-Copper Beech Road district-centre entries and Strategic Policy DS5\'s bounded wider Bermuda Park employment context.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-bermuda-village-article-4': {
    id: 'nbbc-bermuda-village-article-4',
    title: 'Article 4 Direction - Bermuda Village',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/downloads/file/741/article-4-direction-bermuda-village',
    supports: 'The Article 4 Direction\'s exact scope of dwellings and curtilages numbered 20-118 even and 39-117 odd at Bermuda Village.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'nbbc-bermuda-phoenix-centre': {
    id: 'nbbc-bermuda-phoenix-centre',
    title: 'Bermuda Phoenix Centre',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/community-facilities/community-centres-1/2',
    supports: 'The current council record for Bermuda Phoenix Centre at Bermuda Road, Nuneaton CV10 7HU, its multiple managed spaces and the separate club on the same site.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'historic-england-hartshill-castle-1011197': {
    id: 'historic-england-hartshill-castle-1011197',
    title: 'Hartshill Castle, list entry 1011197',
    publisher: 'Historic England',
    url: 'https://historicengland.org.uk/listing/the-list/list-entry/1011197',
    supports: 'The scheduled-monument designation, location and recorded development phases of Hartshill Castle.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'nwbc-hartshill-neighbourhood-plan-2017': {
    id: 'nwbc-hartshill-neighbourhood-plan-2017',
    title: 'Hartshill Neighbourhood Plan, adopted March 2017',
    publisher: 'North Warwickshire Borough Council (host; Hartshill Parish Council plan)',
    url: 'https://www.northwarks.gov.uk/downloads/file/18/hartshill-neighbourhood-plan-adopted-march-2017-',
    supports: 'Policy H11 identification of the current Society of Friends Meeting House on Castle Road as a community facility to be enhanced and protected.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-bedworth-conservation-2022': {
    id: 'nbbc-bedworth-conservation-2022',
    title: 'Bedworth Conservation Area Appraisal and Management Plan 2022',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/downloads/file/681/bedworth-conservation-area-appraisal-and-management-plan-supplementary-planning-document-2022-',
    supports: 'The adopted 2022 Bedworth Conservation Area appraisal, its 1986 designation date, mapped core and three appraisal character areas.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'visit-warwickshire-bedworth': {
    id: 'visit-warwickshire-bedworth',
    title: 'Bedworth',
    publisher: 'Warwickshire County Council, Visit Warwickshire',
    url: 'https://visit.warwickshire.gov.uk/towns-villages/bedworth',
    supports: 'Bedworth\'s position between Coventry and Nuneaton, its station on the Coventry-Nuneaton line, Coventry Canal, Miners Welfare Park, and ribbon-weaving and coal-mining heritage.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'nbbc-bulkington-conservation-2022': {
    id: 'nbbc-bulkington-conservation-2022',
    title: 'Bulkington Conservation Area Appraisal and Management Plan 2022',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/downloads/file/682/bulkington-conservation-area-appraisal-and-management-plan-supplementary-planning-document-2022-',
    supports: 'The Bulkington conservation-area review history and dates for two specifically named historic buildings.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'rbc-rugby-town-centre-appraisal': {
    id: 'rbc-rugby-town-centre-appraisal',
    title: 'Rugby Town Centre Conservation Area Appraisal',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/documents/20124/6569677/Rugby_Town_Centre_Character_Appraisal.pdf/9a17bab5-bb82-d284-15b4-08ca3a1a1b39?t=1750866416446',
    supports: 'The mapped central designation, historic road layout and documented nineteenth-century railway development.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'rbc-ragm-modernising': {
    id: 'rbc-ragm-modernising',
    title: 'Modernising and reconfiguring the Rugby Art Gallery and Museum building',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/w/modernising-ragm',
    supports: 'The current description of the purpose-built cultural venue and its borough-gallery, museum and visitor-centre uses alongside the county library lease.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'historic-england-46-chapel-street-1035045': {
    id: 'historic-england-46-chapel-street-1035045',
    title: '46 Chapel Street, list entry 1035045',
    publisher: 'Historic England',
    url: 'https://historicengland.org.uk/listing/the-list/list-entry/1035045',
    supports: 'The Grade II designation, exact statutory address and official description of the named Chapel Street doorway.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'rbc-town-hall-contact': {
    id: 'rbc-town-hall-contact',
    title: 'Contact us',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/pl/contact-us',
    supports: 'The current Town Hall address and the separately described rear cycle-rack approach from the Newbold Road car park.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'rbc-hillmorton-locks-appraisal': {
    id: 'rbc-hillmorton-locks-appraisal',
    title: 'Hillmorton Locks Conservation Area Appraisal',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/documents/20124/6569677/Hillmorton_Locks_Character_Appraisal.pdf/e3288070-673d-cd8e-2acf-45c5eb3bc825?t=1750866416445',
    supports: 'The limited Hillmorton Locks designation, canal setting and appraisal-dated industrial history.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'rbc-hillmorton-recreation-ground': {
    id: 'rbc-hillmorton-recreation-ground',
    title: 'Hillmorton Recreation Ground',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/l/6741483',
    supports: 'The Featherbed Lane location and council-listed facilities at the named recreation ground.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-hillmorton-primary-school': {
    id: 'wcc-hillmorton-primary-school',
    title: 'Hillmorton Primary School',
    publisher: 'Warwickshire County Council',
    url: 'https://apps.warwickshire.gov.uk/FindASchool/schools/hillmorton-primary-school',
    supports: 'The official directory classification and Watts Lane, Rugby CV21 4PE address of the named academy.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'historic-england-81-high-street-hillmorton-1365008': {
    id: 'historic-england-81-high-street-hillmorton-1365008',
    title: '81 High Street, list entry 1365008',
    publisher: 'Historic England',
    url: 'https://historicengland.org.uk/listing/the-list/list-entry/1365008',
    supports: 'The Grade II designation, Hillmorton locality and official legacy description of the named High Street doorway.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'crt-hillmorton-locks-2026': {
    id: 'crt-hillmorton-locks-2026',
    title: 'Volunteers help spruce up Hillmorton Locks',
    publisher: 'Canal & River Trust',
    url: 'https://canalrivertrust.org.uk/news-and-views/news/volunteers-help-spruce-up-hillmorton-locks-the-busiest-lock-flight-in-the-country',
    supports: 'The May 2026 description of six historic lock pairs on the Oxford Canal and their current managed visitor setting.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'rbc-bilton-appraisal': {
    id: 'rbc-bilton-appraisal',
    title: 'Bilton Conservation Area Appraisal',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/documents/20124/6569677/Bilton_Character_Appraisal.pdf/27083593-8756-5f6f-ed65-f0bc7e2f9067?t=1750866416442',
    supports: 'Bilton settlement history, the limited conservation-area extent and dates of named historic buildings.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'rbc-alwyn-road-recreation-ground': {
    id: 'rbc-alwyn-road-recreation-ground',
    title: 'Alwyn Road Recreation Ground',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/l/6729718',
    supports: 'The exact CV22 7RD location, named facilities, 1938 council purchase and Queen Elizabeth II Field designation of the recreation ground.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'rbc-old-brownsover-appraisal': {
    id: 'rbc-old-brownsover-appraisal',
    title: 'Old Brownsover Conservation Area Appraisal',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/documents/20124/6569677/Old_Brownsover_Character_Appraisal.pdf/9d9a8cf5-3463-f265-16b6-f895e398c2c6?t=1750866416445',
    supports: 'The limited Old Brownsover designation, named components and historic canal and highway context.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'charity-commission-brownsover-community-association-1199939': {
    id: 'charity-commission-brownsover-community-association-1199939',
    title: 'Brownsover Community Association, charity 1199939',
    publisher: 'Charity Commission for England and Wales',
    url: 'https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5198357/charity-overview',
    supports: 'The current registered-charity record stating that the association runs Brownsover Community Centre at Bow Fell and supports Brownsover Youth Hut.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'historic-england-st-michael-brownsover-1183659': {
    id: 'historic-england-st-michael-brownsover-1183659',
    title: 'Church of Saint Michael and All Angels, list entry 1183659',
    publisher: 'Historic England',
    url: 'https://historicengland.org.uk/listing/the-list/list-entry/1183659',
    supports: 'The Grade II* designation, Brownsover Lane statutory address, official only-entrance description and legacy-generated history describing the named church as redundant and vested in the Churches Conservation Trust.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'historic-england-brownsover-hall-1365029': {
    id: 'historic-england-brownsover-hall-1365029',
    title: 'Brownsover Hall, list entry 1365029',
    publisher: 'Historic England',
    url: 'https://historicengland.org.uk/listing/the-list/list-entry/1365029',
    supports: 'The Grade II* designation, Leicester Road statutory address and official legacy description of the named hall and entrance front.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'rbc-south-west-rugby-spd-2024': {
    id: 'rbc-south-west-rugby-spd-2024',
    title: 'South West Rugby Masterplan Supplementary Planning Document',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/documents/20124/0/SW%2BRugby%2BMasterplan%2BSPD.pdf/8305efda-13f7-6371-3c68-f341a463d87e?t=1734019021079',
    supports: 'The 11 December 2024 adoption, broad allocation context, multiple ownerships and variable preferred infrastructure locations in South West Rugby.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-rugby-bus-map-2025': {
    id: 'wcc-rugby-bus-map-2025',
    title: 'Rugby Bus Map',
    publisher: 'Warwickshire County Council',
    url: 'https://api.warwickshire.gov.uk/documents/WCCC-222510381-351',
    supports: 'The 30 August 2025 map edition, separate Cawston and New Bilton labels and named-road orientation within Rugby.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'historic-england-lawford-hill-farmhouse-1299648': {
    id: 'historic-england-lawford-hill-farmhouse-1299648',
    title: 'Lawford Hill Farmhouse, list entry 1299648',
    publisher: 'Historic England',
    url: 'https://historicengland.org.uk/listing/the-list/list-entry/1299648',
    supports: 'The Grade II designation, statutory address and recorded construction phases of the named farmhouse.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'historic-england-st-john-long-lawford-1299647': {
    id: 'historic-england-st-john-long-lawford-1299647',
    title: 'Church of St John, list entry 1299647',
    publisher: 'Historic England',
    url: 'https://historicengland.org.uk/listing/the-list/list-entry/1299647',
    supports: 'The Grade II designation, date, architect and statutory address of the named church.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'rbc-local-plan-2011-2031': {
    id: 'rbc-local-plan-2011-2031',
    title: 'Local Plan 2011-2031',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/w/local-plan-2011-2031',
    supports: 'The plan adoption date and its Long Lawford Main Rural Settlement allocation evidence.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'rbc-new-bilton-hmo-article-4': {
    id: 'rbc-new-bilton-hmo-article-4',
    title: 'Article 4 Direction - Houses in Multiple Occupation',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/pl/w/article-4-direction-hmos',
    supports: 'The confirmation date, 23 February 2025 commencement, defined wards including New Bilton and limited C3-to-C4 change-of-use effect.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'property-status',
  },
  'rbc-local-centres-study-2024': {
    id: 'rbc-local-centres-study-2024',
    title: 'Local Centres Study Report',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/documents/20124/62314905/Local%2BCentres%2BStudy%2BReport.pdf/c3f3f817-e99c-eeb5-5c77-d25471afeb29?t=1765546746847',
    supports: 'The September 2024 analytical treatment of New Bilton Inner and New Bilton Outer as separate candidate local-centre areas.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'rbc-dunchurch-appraisal': {
    id: 'rbc-dunchurch-appraisal',
    title: 'Dunchurch Conservation Area Appraisal',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/documents/20124/6569677/Dunchurch_Character_Appraisal.pdf/5ed4617f-c153-7c3d-2a19-7f0c1c4fee3b?t=1750866416444',
    supports: 'The mapped historic-crossroads designation and separately bounded scheduled and registered assets.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
  },
  'rbc-dunchurch-heath-open-space': {
    id: 'rbc-dunchurch-heath-open-space',
    title: 'Dunchurch Heath Open Space',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/l/6741465',
    supports: 'The Heath location and the council parks record for the named village green, including its maintenance wording and memorial plaque.',
    checkedOn: PROMOTION_REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-stockingford-academy': {
    id: 'wcc-stockingford-academy',
    title: 'Stockingford Academy',
    publisher: 'Warwickshire County Council',
    url: 'https://apps.warwickshire.gov.uk/FindASchool/schools/stockingford-academy',
    supports: 'The official school directory name, primary-academy classification and Cross Street address for Stockingford Academy.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-weddington-primary-school': {
    id: 'wcc-weddington-primary-school',
    title: 'Weddington Primary School',
    publisher: 'Warwickshire County Council',
    url: 'https://apps.warwickshire.gov.uk/FindASchool/schools/weddington-primary-school',
    supports: 'The official school directory name, community-school classification and Winchester Avenue address for Weddington Primary School.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-camp-hill-primary-school': {
    id: 'wcc-camp-hill-primary-school',
    title: 'Camp Hill Primary School',
    publisher: 'Warwickshire County Council',
    url: 'https://apps.warwickshire.gov.uk/FindASchool/schools/camp-hill-primary-school',
    supports: 'The official school directory name, primary-academy classification and Holly Stitches Road address for Camp Hill Primary School.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-chapel-end-school-directory': {
    id: 'wcc-chapel-end-school-directory',
    title: 'Warwickshire school admissions directory, 2017/18 to 2019/20',
    publisher: 'Warwickshire County Council',
    url: 'https://api.warwickshire.gov.uk/documents/WCCC-699-836',
    supports: 'The dated directory entry naming Nathaniel Newton Infant School and placing its Victoria Road address in Chapel End, Hartshill.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-nathaniel-newton-infant-school': {
    id: 'wcc-nathaniel-newton-infant-school',
    title: 'Nathaniel Newton Infant School',
    publisher: 'Warwickshire County Council',
    url: 'https://apps.warwickshire.gov.uk/FindASchool/schools/nathaniel-newton-infant-school',
    supports: 'The current official school directory name, community classification and Victoria Road, Nuneaton CV10 0LS address.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-galley-common-infant-school': {
    id: 'wcc-galley-common-infant-school',
    title: 'Galley Common Infant School',
    publisher: 'Warwickshire County Council',
    url: 'https://apps.warwickshire.gov.uk/FindASchool/schools/galley-common-infant-school',
    supports: 'The official school directory name, community-school classification and Plough Hill Road address for Galley Common Infant School.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-bedworth-library': {
    id: 'wcc-bedworth-library',
    title: 'Bedworth Library and Information Centre',
    publisher: 'Warwickshire County Council',
    url: 'https://www.warwickshire.gov.uk/bedworthlibrary',
    supports: 'The official library name and location at 18 High Street, Bedworth CV12 8NF.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-bulkington-library': {
    id: 'wcc-bulkington-library',
    title: 'Bulkington Community Library',
    publisher: 'Warwickshire County Council',
    url: 'https://www.warwickshire.gov.uk/bulkingtonlibrary',
    supports: 'The official library name and location at School Road, Bulkington, Nuneaton CV12 9JB.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-rugby-library': {
    id: 'wcc-rugby-library',
    title: 'Rugby Library and Information Centre',
    publisher: 'Warwickshire County Council',
    url: 'https://www.warwickshire.gov.uk/rugbylibrary',
    supports: 'The official library name and location at Little Elborow Street, Rugby CV21 3BZ.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-bilton-infant-school': {
    id: 'wcc-bilton-infant-school',
    title: 'Bilton Infant School',
    publisher: 'Warwickshire County Council',
    url: 'https://apps.warwickshire.gov.uk/FindASchool/schools/bilton-infant-school',
    supports: 'The official school directory name, community-school classification and Magnet Lane address for Bilton Infant School.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-brownsover-community-school': {
    id: 'wcc-brownsover-community-school',
    title: 'Brownsover Community School',
    publisher: 'Warwickshire County Council',
    url: 'https://apps.warwickshire.gov.uk/FindASchool/schools/brownsover-community-school',
    supports: 'The official school directory name, community-school classification and Webb Drive address for Brownsover Community School.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-dunchurch-library': {
    id: 'wcc-dunchurch-library',
    title: 'Dunchurch Community Library',
    publisher: 'Warwickshire County Council',
    url: 'https://www.warwickshire.gov.uk/dunchurchlibrary',
    supports: 'The official library name, location at The Green, Dunchurch, Rugby CV22 6PA and community-managed status.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
} as const satisfies Record<string, AreaGuideSource>

const warwickshireSourceIds = POLICE_SOURCE_IDS.Warwickshire
const TECHNICAL_SOURCES: AreaGuideSource[] = [
  'mla-service-calls',
  warwickshireSourceIds.lockAdvice,
  warwickshireSourceIds.doorSecurity,
  warwickshireSourceIds.forensics,
].map(id => ({ ...getTechnicalEvidenceSource(id), kind: 'technical' as const }))

type AreaFaq = { q: string; a: string }

const AREA_FAQS: Partial<Record<AreaSlug, [AreaFaq, AreaFaq]>> = {
  nuneaton: [
    { q: 'What do the Nuneaton locality sources establish?', a: `They establish attributed town history and the council's current description of the town-centre core, stations and Riversley Park. They do not establish an individual property's condition.` },
    { q: 'What address details help prepare a Nuneaton booking?', a: `Provide the complete property, building or unit, exact affected threshold and person controlling it, plus photographs of the actual door and visible hardware where safe.` },
  ],
  attleborough: [
    { q: 'Which Attleborough property checks are supported here?', a: `The sources identify selected social-housing engagement streets and three exact heritage entries. They do not assign tenure, status, construction or lock conditions to other Attleborough addresses.` },
    { q: 'When might landlord or listed-building checks affect the scope?', a: `Only after the exact property is confirmed. Council or former-council policy can require landlord permission for lock changes, while work affecting listed character or fabric needs its own check.` },
  ],
  stockingford: [
    { q: 'What do the current Stockingford records establish?', a: `They identify selected street-locality and housing-engagement labels plus the Grade II pair at 350 and 352 Arbury Road. They do not classify other properties or their doors.` },
    { q: 'Which Stockingford control details should accompany an enquiry?', a: `Supply the full address, tenure where relevant, private or shared threshold and authorised controller so landlord, management or exact listed-building checks are applied only where they belong.` },
  ],
  weddington: [
    { q: 'What property context is verified for Weddington?', a: `The sources identify four streets in a housing walkabout, a specific flats meeting point and the Grade II Church of St James. They do not classify every Weddington property.` },
    { q: 'How should a Weddington entrance be identified before work?', a: `Give the full address, block or unit, private or communal threshold, tenure and responsible controller so any landlord or listed-fabric check remains tied to the exact premises.` },
  ],
  'horeston-grange': [
    { q: 'What do the current Horeston Grange records identify?', a: `They distinguish selected streets, the district centre, one named Camborne Drive retailer and one council-controlled Tiverton Drive asset. They prove no lock, door, fault or access right.` },
    { q: 'How should a managed Horeston Grange site be identified?', a: `Give the organisation or business, unit where relevant, complete address, exact affected threshold and authorised contact; the centre or asset name alone does not authorise work.` },
  ],
  whitestone: [
    { q: 'What do the current Whitestone records establish?', a: `They identify selected street labels, a dated HSG9 housing-trajectory row, council contact routes for Magyar Crescent and one school address. They do not establish today's status, tenure, controller, door or fault at another property.` },
    { q: 'What should a Whitestone caller confirm before booking?', a: `Provide the current plot or full postal address, exact affected entrance, whether a completed dwelling, controlled site or confirmed council threshold is involved, and the person authorised for it.` },
  ],
  'camp-hill': [
    { q: 'What do the current Camp Hill address sources establish?', a: `They establish selected county street-locality labels, a 2026 housing-engagement group and two named managed or business contexts, not a complete boundary, tenure record or property diagnosis.` },
    { q: 'How should a managed Camp Hill threshold be identified?', a: `Give the complete address, organisation or unit, exact affected entrance and responsible controller; a district-centre or CHESS Centre reference alone does not authorise work.` },
  ],
  'chapel-end': [
    { q: 'What does the Chapel End heritage record establish?', a: `It describes one chapel at Coleshill Road and its documented construction phases. It does not transfer that building's recorded status or fabric to nearby properties.` },
    { q: 'What present information should a Chapel End caller gather?', a: `Gather the exact address and threshold, controller, door construction, visible lock markings and observable fault rather than using the historic centre boundary or unit count.` },
  ],
  'bermuda-park': [
    { q: 'Why can a Bermuda Park address use Bermuda as its locality?', a: `The county street register labels selected roads as Bermuda, Nuneaton. That highway label does not define every Bermuda Park property or establish access.` },
    { q: 'When does the Bermuda Village heritage evidence apply?', a: `Only the exact 20-118 even and 39-117 odd ranges are cited. Confirm the number, current record and authorised controller before visible alteration.` },
  ],
  'galley-common': [
    { q: 'What does the Galley Common historic record establish?', a: `It records documentary and map research about the former Stockingford manor and Galley Common. It does not describe present premises, entrances or property status.` },
    { q: 'What details should a Galley Common caller prepare?', a: `Prepare the full modern address, precise opening, controller, door photographs and observed symptoms without treating any historic planning-centre name as an access instruction.` },
  ],
  hartshill: [
    { q: 'Does Hartshill Castle status apply to nearby properties?', a: `No. Scheduled Monument 1011197 has a specific official map, and the list entry does not designate surrounding buildings or establish access to them.` },
    { q: 'What should be checked for a Hartshill service address?', a: `Check the exact address and threshold, current property records where relevant, the responsible controller and the actual door and lock evidence before defining work.` },
  ],
  bedworth: [
    { q: 'Which part of Bedworth has verified conservation context?', a: `The source describes a mapped town-centre conservation area with three appraisal character areas. It does not apply that status across every Bedworth address.` },
    { q: 'What booking details matter more than Bedworth landmarks?', a: `The full property, exact affected door, controller, door-edge images, hardware markings and observed symptoms matter; station and park references provide orientation only.` },
  ],
  bulkington: [
    { q: 'Do the Bulkington building dates apply across the village?', a: `No. The thirteenth- and seventeenth-century dates belong to two named assets, while the conservation designation covers a mapped core only.` },
    { q: 'What current evidence should a Bulkington caller provide?', a: `Provide the exact property and threshold, controller, door photographs, component markings and symptoms, and check map status if visible external fabric may be affected.` },
  ],
  rugby: [
    { q: 'What area does the Rugby appraisal describe?', a: `It describes the mapped town-centre conservation area and its historic development. The boundary differs substantially from the full Rugby route represented by the guide.` },
    { q: 'What information prepares a Rugby property booking?', a: `Give the complete address, building and floor where relevant, exact threshold, controller, door images and observable fault rather than relying on railway or centre context.` },
  ],
  hillmorton: [
    { q: 'Is Hillmorton Locks the same as all Hillmorton?', a: `No. The appraisal concerns a small canal-centred conservation area separated from wider housing; its context cannot be applied throughout the route.` },
    { q: 'How should a Hillmorton service address be prepared?', a: `Provide the complete address and entrance, identify whether the Locks map applies, name the responsible controller and record the actual door and hardware evidence.` },
  ],
  bilton: [
    { q: 'How much of Bilton is within the conservation area?', a: `The appraisal expressly says that only part of the former village is designated, so each property must be checked against the current map.` },
    { q: 'What should a Bilton caller gather before booking?', a: `Gather the exact address, affected private or shared threshold, controller, door photographs, lock markings and a clear account of the present symptom.` },
  ],
  brownsover: [
    { q: 'Does Old Brownsover cover the wider Brownsover route?', a: `No. Old Brownsover is a limited mapped hamlet containing named assets and land; wider development must not inherit that conservation description.` },
    { q: 'What details identify a Brownsover service property correctly?', a: `Use the full address, exact entrance and responsible person, then check whether the Old Brownsover map applies and document the actual door and lock.` },
  ],
  cawston: [
    { q: 'What do the current Cawston planning and map sources establish?', a: `They establish an adopted, phased allocation context and dated county orientation labels. They do not establish completed infrastructure, present access or conditions at an individual property.` },
    { q: 'What information should a Cawston caller provide?', a: `Provide the full postal address, building or unit, exact threshold, controller and current gate, parking or roadwork instructions; planning and map records cannot replace them.` },
  ],
  'long-lawford': [
    { q: 'Which Long Lawford properties are verified as listed?', a: `The evidence verifies Lawford Hill Farmhouse and the Church of St John as named Grade II assets, not surrounding Long Lawford premises.` },
    { q: 'What should be prepared for a Long Lawford booking?', a: `Prepare the exact property and door, responsible controller, current status where relevant, hardware photographs, readable markings and observed operation or damage.` },
  ],
  'new-bilton': [
    { q: 'Does New Bilton ward inclusion prove a property is an HMO?', a: `No. The Article 4 record governs one defined planning change within its area; it does not establish any address's tenure, occupancy, shared access or management.` },
    { q: 'How should a New Bilton caller identify the service address?', a: `Provide the full postal address, building or unit, exact private or common threshold and responsible controller; the study's Inner and Outer labels are not booking boundaries.` },
  ],
  dunchurch: [
    { q: 'Are the Dunchurch heritage boundaries interchangeable with each other?', a: `No. The conservation area, scheduled standing cross and registered landscape have different boundaries, so the correct record must be checked for the property.` },
    { q: 'What evidence should accompany a Dunchurch booking?', a: `Supply the complete address and exact threshold, responsible controller, applicable map result, door photographs, hardware markings and a description of the current issue.` },
  ],
}

interface ServiceFaqVariant {
  q: string
  a: string
}

const SERVICE_FAQ_VARIANTS: Record<ServiceAreaSlug, readonly ServiceFaqVariant[]> = {
  'emergency-lockout': [
    {
      q: 'What should I have ready when I am locked out?',
      a: 'Have the complete address, exact door and evidence connecting you to the property ready. Describe what the key, latch and door are doing so the entrance can be assessed.',
    },
    {
      q: 'Will a lockout always require drilling?',
      a: 'No method should be assumed from a telephone description. The lock and complete door set are examined first, and any destructive step or changed price is explained before work continues.',
    },
    {
      q: 'How is an opening method chosen during a lockout?',
      a: 'The decision follows authority checks and inspection of the fitted lock, door, frame and hinges. Local history, a postcode or a nearby landmark cannot select the technique.',
    },
    {
      q: 'Why do I need to prove that I can authorise entry?',
      a: "A location alone does not show who controls an entrance. Verify the requester's identity, connection to the exact property and controlled door before inspection; provide available price information in advance and obtain agreement if the service-call price changes.",
    },
    {
      q: 'Can the lockout method and price be confirmed by phone?',
      a: 'Available price information can be discussed by phone, but the final method and scope depend on the condition found at the entrance. Any variation is explained for approval first.',
    },
  ],
  'lock-change': [
    {
      q: 'Can a faulty door lock be repaired instead of replaced?',
      a: 'The reported symptom does not identify the failed part. The lock, door, frame, hinges and alignment are inspected before repair or replacement is proposed.',
    },
    {
      q: 'What photographs help with a lock repair or replacement?',
      a: 'Where safe, photograph both faces of the door furniture, the door edge, readable markings and the keep. Measurements and direct inspection are still needed before compatible parts are confirmed.',
    },
    {
      q: 'Should I change a lock after keys are lost?',
      a: 'Explain who may still hold keys and the key-control outcome you need. The installed hardware, authority and any written insurer or manager requirement are then checked before work is specified.',
    },
    {
      q: 'Can a replacement cylinder be selected before inspection?',
      a: 'Photographs may narrow the options, but cylinder dimensions, projection, protective furniture and the complete door set must be checked before a compatible replacement is specified from those findings.',
    },
    {
      q: 'Who can approve a lock change on a rented or shared door?',
      a: 'The person entitled to control that entrance must authorise the change. A landlord, building manager or other responsible party may also need to approve shared or managed hardware.',
    },
  ],
  'upvc-lock-repair': [
    {
      q: 'Why does my uPVC door lock work open but not closed?',
      a: 'That difference helps describe the fault but does not identify a component. The locking points, keeps, hinges, frame alignment, handle and key operation must be assessed together.',
    },
    {
      q: 'Does a stiff uPVC handle prove the gearbox has failed?',
      a: 'No. Handle resistance is one symptom among several. Operation with the door open and closed, key movement, alignment and the fitted mechanism all need checking before diagnosis.',
    },
    {
      q: 'What photographs help identify a uPVC door-lock fault?',
      a: 'If safe, photograph the whole entrance, door edge, faceplate markings, locking points and keeps. Images help prepare the inspection but do not establish the failed part by themselves.',
    },
    {
      q: 'Should I lift the handle before locking a multipoint door?',
      a: 'Many multipoint doors require the handle to be lifted before the key is turned. If difficulty remains, the full door set still needs direct inspection rather than a remote diagnosis.',
    },
    {
      q: 'Can a uPVC replacement mechanism be chosen over the phone?',
      a: 'A description alone cannot confirm a compatible mechanism. Readable markings, centres, backset, locking layout, door condition and alignment must be recorded from the installed system.',
    },
  ],
  'boarding-up': [
    {
      q: 'What should I do before boarding up after a break-in?',
      a: 'Follow any police instructions and avoid disturbing possible evidence. Once those requirements are clear, identify each damaged opening and the person authorised to approve temporary securing.',
    },
    {
      q: 'What information is needed for emergency boarding up?',
      a: 'Provide the full address, every damaged door or window, the responsible contact and any safe-access restriction. The temporary scope follows inspection of the opening and surrounding structure.',
    },
    {
      q: 'How is the temporary boarding method chosen?',
      a: "The method depends on the opening's dimensions, surviving frame, surrounding material and safe access. Identify who may authorise the opening, inspect it and explain the proposed attachment, scope and available price information; obtain agreement if the service-call price changes.",
    },
    {
      q: 'Can boarding begin before the police finish their checks?',
      a: 'Possible forensic evidence should remain undisturbed until the relevant police direction is known. Temporary securing can then be planned from the documented damage and authorised instruction.',
    },
    {
      q: 'Who can approve boarding up at a shared or managed site?',
      a: 'Identify the owner, occupier, facilities contact or other person responsible for the exact opening. A nearby public place or general site name does not establish authority.',
    },
  ],
  'lock-upgrade': [
    {
      q: 'Which lock standard is suitable for my door?',
      a: 'The answer depends on the fitted door set and any exact written requirement from an insurer, landlord or manager. A locality or property age cannot select the standard.',
    },
    {
      q: 'Is an anti-snap cylinder a complete door-security upgrade?',
      a: 'A cylinder is only one part of the entrance. Its dimensions, accreditation and protection must be considered with the lock, door, frame, hinges and existing furniture.',
    },
    {
      q: 'What is checked before recommending a lock upgrade?',
      a: "The existing leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection are inspected. The proposed option must fit that assembly and the customer's documented objective.",
    },
    {
      q: 'Can a door-security upgrade be specified from photographs?',
      a: 'Photographs can show visible hardware and existing apertures, but they do not confirm all dimensions, alignment or operation. Final options require the actual entrance and current product evidence.',
    },
    {
      q: 'Does a shared or managed door need approval before an upgrade?',
      a: 'Confirm who controls the exact entrance and any written landlord, lease or management requirements before changing shared hardware. The authorised decision-maker should approve the compatible specification and expected cost.',
    },
  ],
}

const HUB_CONTEXT_ONLY_LOCALITY_PATTERNS: Partial<Record<AreaSlug, RegExp>> = {}

interface HubServiceDecisionContext {
  issue: string
  observations: string
  inspectionItems: string
  controlledSubject: string
  outcomes: string
}

const HUB_CONTEXT_ONLY_PARAGRAPH_FRAMES: Partial<Record<AreaSlug, [
  (serviceLabel: string, checks: readonly string[], context: HubServiceDecisionContext) => string,
  (serviceLabel: string, checks: readonly string[], context: HubServiceDecisionContext) => string,
]>> = {}

const SERVICE_DECISION_LABELS: Record<ServiceAreaSlug, string> = {
  'emergency-lockout': 'lockout',
  'lock-change': 'lock-change',
  'upvc-lock-repair': 'uPVC repair',
  'boarding-up': 'temporary-boarding',
  'lock-upgrade': 'door-upgrade',
}

const SERVICE_DECISION_CONTEXTS: Record<ServiceAreaSlug, HubServiceDecisionContext> = {
  'emergency-lockout': {
    issue: 'the reported lockout symptoms and any existing damage',
    observations: 'key response, latch or deadlock state, door position, frame contact and visible damage',
    inspectionItems: 'the fitted lock, handles, door leaf, frame, hinges and existing damage',
    controlledSubject: 'the locked entrance and its fitted hardware',
    outcomes: 'the supported opening step, any component work and required reinstatement',
  },
  'lock-change': {
    issue: 'the reason for the change, current operation and required key control',
    observations: 'key control, lock operation, component markings, door alignment and measured geometry',
    inspectionItems: 'the cylinder, lock case, keep, furniture, door and frame alignment',
    controlledSubject: 'the affected lock, supplied keys and shared or private entrance',
    outcomes: 'adjustment, repair, cylinder work or measured replacement',
  },
  'upvc-lock-repair': {
    issue: 'the reported key, handle and multipoint-lock symptoms',
    observations: 'key rotation, handle travel, locking-point movement, open-and-closed operation and frame contact',
    inspectionItems: 'the handles, cylinder, faceplate, locking points, keeps, hinges and frame alignment',
    controlledSubject: 'the affected uPVC or composite entrance and its fitted mechanism',
    outcomes: 'alignment work, mechanism repair or a measured compatible component',
  },
  'boarding-up': {
    issue: 'the damaged openings, scene instructions and safe-access restrictions',
    observations: 'opening dimensions, surviving frame, damaged door or glazing, adjacent material and scene restrictions',
    inspectionItems: 'each damaged opening, surviving frame, glazing or door material and safe attachment points',
    controlledSubject: 'the damaged opening and any temporary attachment',
    outcomes: 'the temporary covering method, attachment scope and permanent-repair handover',
  },
  'lock-upgrade': {
    issue: 'the documented security objective and present door-set condition',
    observations: 'door operation, frame and hinge condition, lock engagement, furniture, markings and measured cylinder fit',
    inspectionItems: 'the door leaf, frame, hinges, keeps, handles, lock, cylinder fit and protective furniture',
    controlledSubject: 'the complete private or shared entrance and any visible fabric',
    outcomes: 'adjustment, reinforcement or a correctly sized compatible upgrade',
  },
}

const SERVICE_TECHNICAL_SENTENCE_PATTERNS: Record<ServiceAreaSlug, RegExp> = {
  'emergency-lockout': /\b(?:authority|identity|entrance|threshold|latch|deadlock|key|lock|door|frame|hinge|opening method|drilling|damage|price|scope)\b/i,
  'lock-change': /\b(?:authority|key control|entrance|threshold|cylinder|lock case|keep|alignment|door|frame|hinge|hardware|marking|measurement|replacement|repair|price|scope)\b/i,
  'upvc-lock-repair': /\b(?:uPVC|composite|entrance|threshold|handle|key|locking point|faceplate|backset|centres|gearbox|multipoint|alignment|hinge|keep|frame|measurement|mechanism|repair|scope)\b/i,
  'boarding-up': /\b(?:police|evidence|scene|entrance|threshold|opening|frame|glazing|glass|door|damage|photograph|temporary|board|attachment|joinery|structural|scope|authoris)\b/i,
  'lock-upgrade': /\b(?:entrance|threshold|door|frame|hinge|keep|handle|lock|cylinder|hardware|alignment|measurement|manufacturer|product|accredit|certif|upgrade|reinforcement|replacement|scope)\b/i,
}

const NON_TECHNICAL_CONTEXT_PATTERN = /\b(?:council|source|sources|cited|locality|area-level|area name|area label|local history|historic|heritage|medieval|manor|mapped|map|street|park|station|rail|railway|transport|parish|ward|programme|pilot|recreation ground|public[- ]place|public[- ]space|walkabout|directory|register|schedule|borough|county|selected place|named ground|community plan|questionnaire|property (?:record|status|evidence|information)|current (?:record|status|evidence))\b/i

const HUB_CONTEXT_ONLY_PAIR_CLOSERS: Partial<Record<AreaSlug, Partial<Record<ServiceAreaSlug, string>>>> = {}

const SERVICE_TECHNICAL_CHECK_FALLBACKS: Record<ServiceAreaSlug, string> = {
  'emergency-lockout': 'Record the inspected opening method, affected component and any reinstatement still required.',
  'lock-change': 'Record the measured component, retained hardware, supplied keys and final operation.',
  'upvc-lock-repair': 'Record the safe operating tests, measured mechanism details and confirmed repair scope.',
  'boarding-up': 'Record the damaged opening, temporary attachment, covered material and permanent repair still required.',
  'lock-upgrade': 'Record the inspected assembly, exact product evidence, measured fit and agreed upgrade scope.',
}

const HUB_CONTEXT_ONLY_CHECK_FALLBACK_OVERRIDES: Partial<Record<AreaSlug, Partial<Record<ServiceAreaSlug, string>>>> = {}

function punctuated(sentence: string): string {
  const trimmed = sentence.trim()
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`
}

function hubContextOnlyBody(
  areaSlug: AreaSlug,
  serviceSlug: ServiceAreaSlug,
  body: readonly string[],
  checks: readonly string[],
): [string, string] {
  const localityPattern = HUB_CONTEXT_ONLY_LOCALITY_PATTERNS[areaSlug]
  const frames = HUB_CONTEXT_ONLY_PARAGRAPH_FRAMES[areaSlug]
  if (!localityPattern || !frames) throw new Error(`Missing hub-context-only body policy for ${areaSlug}`)

  const serviceLabel = SERVICE_DECISION_LABELS[serviceSlug]
  const serviceContext = SERVICE_DECISION_CONTEXTS[serviceSlug]
  const checkFallback = HUB_CONTEXT_ONLY_CHECK_FALLBACK_OVERRIDES[areaSlug]?.[serviceSlug]
    ?? SERVICE_TECHNICAL_CHECK_FALLBACKS[serviceSlug]
  const punctuatedChecks = checks.map(check => punctuated(
    NON_TECHNICAL_CONTEXT_PATTERN.test(check)
      ? checkFallback
      : check,
  ))
  const technicalPattern = SERVICE_TECHNICAL_SENTENCE_PATTERNS[serviceSlug]
  return body.map((paragraph, index) => {
    const retainedSentences = paragraph
      .match(/[^.!?]+(?:[.!?]+|$)/g)
      ?.map(sentence => sentence.trim())
      .filter(sentence => (
        sentence
        && technicalPattern.test(sentence)
        && !localityPattern.test(sentence)
        && !NON_TECHNICAL_CONTEXT_PATTERN.test(sentence)
      )) ?? []

    const pairCloser = index === 1 ? HUB_CONTEXT_ONLY_PAIR_CLOSERS[areaSlug]?.[serviceSlug] : undefined
    return `${frames[index](serviceLabel, punctuatedChecks, serviceContext)} ${retainedSentences.join(' ')} ${pairCloser ?? ''}`.trim()
  }) as [string, string]
}

type GuideSeed = Omit<GovernedAreaGuide, 'reviewedOn' | 'sources' | 'faqs' | 'serviceGuidance'> & {
  reviewedOn?: string
  sources: AreaGuideSource[]
  serviceGuidance: Record<
    ServiceAreaSlug,
    Omit<GovernedAreaGuide['serviceGuidance'][ServiceAreaSlug], 'faq'>
  >
}

function makeGuide(seed: GuideSeed): GovernedAreaGuide {
  const faqs = AREA_FAQS[seed.slug]
  if (!faqs) throw new Error(`Missing north-east area FAQs for ${seed.slug}`)

  const areaIndex = Object.keys(AREA_FAQS).indexOf(seed.slug)
  if (areaIndex < 0) throw new Error(`Missing north-east FAQ variant index for ${seed.slug}`)

  const serviceGuidance = Object.fromEntries(
    SERVICE_AREA_SLUGS.map((serviceSlug, serviceIndex) => {
      const variants = SERVICE_FAQ_VARIANTS[serviceSlug]
      const faq = variants[(areaIndex + serviceIndex * 2) % variants.length]
      const authoredGuidance = seed.serviceGuidance[serviceSlug]
      const guidance = seed.serviceEvidenceMode === 'hub-context-only'
        ? {
            ...authoredGuidance,
            body: hubContextOnlyBody(seed.slug, serviceSlug, authoredGuidance.body, authoredGuidance.checks),
            localFactIndexes: [],
          }
        : authoredGuidance

      return [serviceSlug, { ...guidance, faq: { ...faq } }]
    }),
  ) as GovernedAreaGuide['serviceGuidance']

  return {
    ...seed,
    reviewedOn: seed.reviewedOn ?? REVIEWED_ON,
    sources: [...seed.sources, ...TECHNICAL_SOURCES],
    serviceGuidance,
    faqs: [...faqs],
  }
}

export const NORTH_EAST_AREA_GUIDES = {
  nuneaton: makeGuide({
    slug: 'nuneaton',
    summary: [
      `Nuneaton and Bedworth Borough Council traces Nuneaton's name to a twelfth-century Benedictine nunnery and records that its market was established in 1247. These are attributed town-history facts, not evidence about a present building or entrance.`,
      `The council's current town-centre page describes a pedestrian core served by bus and train stations, with Riversley Park a short walk away. A 2022 Gazette notice separately confirms defined additions to the town-centre conservation boundary; neither record identifies a particular property or entrance without the full address.`,
    ],
    accessGuidance: `Give the complete Nuneaton address, building name where relevant, floor and exact affected threshold. The stations, pedestrian core and Riversley Park are orientation context only and do not establish access to a property.`,
    evidenceLimits: `The council page establishes attributed town history and public town-centre orientation, while the Gazette notice records defined 2022 conservation-boundary changes. Neither identifies an individual property's current status, construction, controller, door material, lock type, fault, access route or service circumstances without an address-level check.`,
    facts: [
      {
        heading: 'Nuneaton name derived from a nunnery and market established in 1247',
        text: `The borough council derives Nuneaton's name from a twelfth-century Benedictine nunnery and dates the market's establishment to 1247.`,
        sourceIds: ['nbbc-nuneaton-town-centre'],
        serviceRelevance: `This supports attributed historic context only; it cannot be used to characterise a customer's building, entrance or hardware.`,
      },
      {
        heading: 'Nuneaton pedestrian centre and transport links',
        text: `The council describes Nuneaton's town-centre core as pedestrian, served by bus and train stations, with Riversley Park a short walk away.`,
        sourceIds: ['nbbc-nuneaton-town-centre'],
        serviceRelevance: `These landmarks can assist orientation but cannot identify the customer's building, threshold, property status or access arrangements.`,
      },
      {
        heading: '2022 Nuneaton conservation boundary additions',
        text: `A Gazette notice records that Nuneaton Town Centre Conservation Area boundary additions were confirmed on 15 February 2022, including defined properties west of Queens Road and east of Newdegate and Bridge Streets.`,
        sourceIds: ['gazette-nuneaton-conservation-2022'],
        serviceRelevance: `Use the exact street and building to check current status before visible alterations; the boundary does not establish authority or hardware.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['nbbc-nuneaton-town-centre'],
      LOCAL_SOURCES['gazette-nuneaton-conservation-2022'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [1],
        heading: 'Preparing for a Nuneaton lockout at the correct threshold',
        body: [
          `Because the council names Nuneaton's pedestrian core, bus and train stations and nearby Riversley Park, a central location should be prepared with the precise building and door rather than a landmark alone. State whether the locked point is a street entrance, shared threshold or internal unit, and identify the person controlling it. That information lets the authority check relate to the correct opening before the key, handle, deadlocking and existing damage are examined.`,
          `The town-centre page provides no property-status or door-fabric evidence, so photograph the door face, frame and visible furniture before choosing a method that could remove material. Explain the inspected method and resulting scope without treating either as an MLA requirement. For this access instruction, the MLA source supports verifying identity and authority, providing available price information in advance and obtaining agreement only if the service-call price changes; it does not promise a particular opening technique. Where gaining entry would require drilling or replacing a visible component, define that intervention separately so preservation, reinstatement and any property-specific checks remain tied to the inspected door.`,
        ],
        checks: ['Identify the exact locked Nuneaton threshold', 'Prepare evidence connecting the caller to it', 'Record visible door and frame condition'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Defining a Nuneaton lock change without postcode assumptions',
        body: [
          `Nuneaton's market history and railway-centre geography do not identify a cylinder, mortice case or multipoint mechanism. Preparation should explain whether the need concerns lost key control, wear, damage or a planned change, then show both handle faces, the door edge and readable markings. Treat the lock body, cylinder, keep and alignment as separate inspection questions; any component decision must follow its observed condition, markings and measurements rather than the town's historic narrative.`,
          `The council's public town-centre description does not establish property status or permission for alteration. A component fitted within an existing opening raises a different fabric question from new cutting or replacement of visible furniture. For a shared entrance, the person responsible for the hardware should confirm the keying scope. The written next step should identify retained material, measurements, keys and any external change requiring property-specific owner or authority guidance before it proceeds.`,
        ],
        checks: ['State the reason for changing the lock', 'Photograph markings and surrounding door furniture', 'Check the mapped address before visible alteration'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Diagnosing a Nuneaton multipoint fault from the actual door',
        body: [
          `Neither the 1247 market date nor the station and pedestrian-core description shows that a Nuneaton entrance is uPVC or composite. If the affected door is one of those materials, record key rotation, handle travel and locking-point movement in sequence. When safe access already exists, record open and closed operation as a reproducible symptom for on-site inspection; that comparison does not identify the failed component.`,
          `A central Nuneaton threshold may be private even where another building entrance is shared, and the council's locality page cannot answer that control question. Confirm it independently. Faceplate markings, centres, backset and locking layout support mechanical compatibility; property records become relevant only if the scope would change controlled or visible material. The repair note should list any controller, building-management or fabric question that must be resolved before the work expands.`,
        ],
        checks: ['Describe open and closed operation separately', 'Capture the full faceplate and markings', 'Confirm whether the threshold is shared'],
      },
      'boarding-up': {
        localFactIndexes: [1],
        heading: 'Evidence-aware temporary boarding in central Nuneaton',
        body: [
          `The council's town-centre page can orient a caller by public landmarks, but it cannot describe damage at a particular opening. Follow police directions first, then photograph the point of entry, remaining frame, glazing or door, displaced hardware and surrounding material before covering it. Identify whether the opening belongs to a frontage, shared access point or private unit so the person controlling temporary work is clear.`,
          `Record intact external material before temporary work and check any property-specific constraint raised by the actual address. Define the temporary scope only after inspecting the damaged opening, not from proximity to the station or Riversley Park. The written record should list what was covered and any unresolved lock, glazing, joinery or structural question so a permanent repairer can review the next stage without losing the initial evidence record.`,
        ],
        checks: ['Follow police directions before disturbing damage', 'Photograph all material that will be covered', 'Record the temporary scope and unresolved defects'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'A measured Nuneaton entrance upgrade with mapped checks',
        body: [
          `A security review in Nuneaton should not infer existing resistance from a medieval market origin or rail-centre description. Inspect the door leaf, frame, hinges, keeps, handles, lock engagement and cylinder projection where one is present. The cited police guidance, unlike those locality facts, supports reviewing the whole entrance and considering correctly sized cylinders and accredited products. Markings and measurements can then inform a suitable option while surrounding alignment or frame issues remain visible in the proposed scope.`,
          `Because the public town-centre page supplies no property-level status, photograph visible furniture, existing cut-outs and the relationship between the leaf and frontage before suggesting alteration. Internal component options can be separated from new cutting or an outward substitution that may need address-specific guidance. The final specification should identify retained fabric, current manufacturer documentation, fitting dependencies and the controller of any common threshold, without implying that one component removes every possible entry route.`,
        ],
        checks: ['Inspect the complete door and frame', 'Verify dimensions and independent product evidence', 'Separate internal work from frontage alteration'],
      },
    },
  }),
  attleborough: makeGuide({
    slug: 'attleborough',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `The council's 2026 housing walkabout schedule names selected Attleborough streets in neighbourhoods where it provides social housing. That schedule supports an early tenure and controller question, but it does not show that every property on those streets is council-owned or managed.`,
      `Three exact heritage entries require address-level care: the Grade II Church of the Holy Trinity, 2 Attleborough Road and Former Albion Works at 64-122 Attleborough Road. Their statutory or local status must not be transferred to neighbouring premises.`,
    ],
    accessGuidance: `Provide the complete Attleborough address, postcode and exact private or shared entrance. Confirm whether the premises is council-owned, a former council home, managed or privately controlled, and identify any named heritage entry only after matching the exact address.`,
    evidenceLimits: `The walkabout schedule is not a tenure register, while the statutory and local-list records apply only to their named buildings and address ranges. None establishes another property's controller, construction, door system, lock condition, access rights or service need.`,
    facts: [
      {
        heading: 'Attleborough housing walkabout street group',
        text: `The council's 2026 walkabout schedule names Abbotsford Road, Attleborough Road, Everard Court and Highfield Road within its Attleborough housing-engagement group.`,
        sourceIds: ['nbbc-tenant-walkabouts-2026'],
        serviceRelevance: `Ask for the exact address and tenure before choosing a landlord or management route; the schedule does not classify every property on those streets.`,
      },
      {
        heading: 'Attleborough council-home lock alteration permission',
        text: `The council requires prior landlord permission before alterations to council or former council homes, including changes to door handles or locks.`,
        sourceIds: ['nbbc-council-home-alterations'],
        serviceRelevance: `Apply this rule only after confirming that the exact Attleborough property falls within the policy, and keep landlord permission separate from other approvals.`,
      },
      {
        heading: 'Attleborough Holy Trinity Grade II listing',
        text: `Historic England lists the Church of the Holy Trinity on Attleborough Road at Grade II under list entry 1034975.`,
        sourceIds: ['historic-england-holy-trinity-attleborough-1034975', 'nbbc-listed-building-consent'],
        serviceRelevance: `For that exact church, identify the authorised controller and check restrictions before work affecting listed character or historic fabric; neighbouring premises are not included.`,
      },
      {
        heading: 'Attleborough Road locally listed buildings',
        text: `The Heritage SPD lists 2 Attleborough Road and Former Albion Works at 64-122 Attleborough Road as locally listed buildings outside conservation areas.`,
        sourceIds: ['nbbc-heritage-spd-2026'],
        serviceRelevance: `Match the exact number or unit and seek property-specific guidance before visible alteration; local listing is not statutory Grade II status and proves no fitted hardware.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['nbbc-tenant-walkabouts-2026'],
      LOCAL_SOURCES['nbbc-council-home-alterations'],
      LOCAL_SOURCES['historic-england-holy-trinity-attleborough-1034975'],
      LOCAL_SOURCES['nbbc-listed-building-consent'],
      LOCAL_SOURCES['nbbc-heritage-spd-2026'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 2, 3],
        heading: 'An Attleborough lockout tied to the exact threshold',
        body: [
          `The housing walkabout list names selected Attleborough streets but does not identify the caller's property or tenure. Record the full address, postcode, exact private or common threshold and the caller's connection to it before assessing a lockout. At Everard Court or another block, add the unit and door position. That preparation keeps a neighbourhood label separate from authority and lets the latch state, deadlocking, key response and visible damage be inspected at the correct opening.`,
          `If the address is the Grade II Holy Trinity church, 2 Attleborough Road or a unit within Former Albion Works, match the exact entry and responsible controller before any method could affect visible fabric. Those records do not dictate an opening technique. MLA guidance separately supports identity and authority checks, advance price information and fresh agreement if the service-call price changes. Record the inspected basis for the method, any affected component and any property-status or reinstatement question still requiring approval.`,
        ],
        checks: ['Give the complete current address and postcode', 'Identify the exact private or shared threshold', 'Match any heritage entry before fabric work'],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'An authorised Attleborough lock change with address checks',
        body: [
          `For a lock change on a street named in the Attleborough housing schedule, confirm the exact tenure rather than treating the schedule as an ownership list. The council's published policy requires prior landlord permission for lock changes at council or former council homes within its scope. Record whether the objective is key control, failure or damage, identify who controls shared keys and photograph the fitted hardware. Cylinder, case, keep and alignment remain separate inspection questions until the door is examined.`,
          `At Holy Trinity, 2 Attleborough Road or Former Albion Works, verify the exact building or unit before applying the relevant statutory or local-list context. Document existing apertures and visible furniture and separate a compatible internal component change from work that could affect character or historic fabric. The written proposal should list retained items, measured replacement, keys, fitting, adjustment and every landlord, building-management or property-status approval that remains outstanding; the address sources do not select a product.`,
        ],
        checks: ['Confirm tenure and the key-control objective', 'Record lock markings and measured dimensions', 'List every required controller or property approval'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Attleborough uPVC repair with tenure kept explicit',
        body: [
          `The Attleborough walkabout schedule identifies a housing-engagement group, not the material or mechanism at any one door. Confirm the full address, tenure and whether the affected threshold is private or communal, then verify that it is uPVC or composite. For this door, note the sequence of key rotation, handle travel and locking-point movement plus any safe contrast between open and closed operation. Those observed symptoms guide diagnosis; a street's inclusion in the schedule cannot identify a gearbox, keep, cylinder or alignment fault.`,
          `If the exact premises is a council or former council home covered by the published policy, clarify the repair-versus-alteration scope and obtain the landlord decision needed before changing handles or locks. Do not apply that rule merely because the street appears in a walkabout list. A useful repair record names the controller, fitted faceplate markings, centres, backset, locking layout, alignment findings and proposed component, with any shared-door or landlord dependency resolved before the scope proceeds.`,
        ],
        checks: ['Confirm the exact tenure and door material', 'Compare safe open and closed operation', 'Measure the complete fitted locking arrangement'],
      },
      'boarding-up': {
        localFactIndexes: [0, 2, 3],
        heading: 'Attleborough boarding with exact-site evidence preserved',
        body: [
          `A housing-engagement street label does not identify the damaged opening or the person able to approve temporary work. Follow police directions first, then record the complete Attleborough address, unit where relevant, private or shared threshold and responsible controller. Photograph the point of entry, remaining frame, glazing or door, damaged hardware and adjacent material before it is covered. Those current observations establish dimensions and attachment questions without assigning tenure or incident details from the walkabout schedule.`,
          `When the exact site is Holy Trinity, 2 Attleborough Road or Former Albion Works, match the named heritage record and document surviving visible material before fixing a temporary covering. The entries prove no damage and do not prescribe a boarding method. The completion note should distinguish the temporary attachment and concealed evidence from permanent glazing, joinery, door, lock or structural work, while any consent, landlord or building-controller question remains an explicit next action for the responsible party.`,
        ],
        checks: ['Follow current police scene instructions first', 'Photograph every surface the board will hide', 'Keep heritage checks tied to exact entries'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'Attleborough lock upgrades with permissions separated',
        body: [
          `Before specifying an Attleborough upgrade, confirm whether the exact address is privately controlled, council-owned, a former council home or managed. A street's presence in the walkabout schedule does not answer that question. Where the council-home policy applies, prior landlord permission covers changes to door handles or locks and remains separate from planning or building approval. Inspect the leaf, frame, hinges, keeps, furniture, lock engagement and cylinder fit before comparing measured, accredited options.`,
          `For Holy Trinity, 2 Attleborough Road or Former Albion Works, match the precise heritage entry and photograph existing cut-outs and visible furniture before proposing outward change. Statutory and local listing are different controls, and neither source proves the fitted hardware or appropriate product. The specification should separate adjustment, reinforcement and replacement, identify retained material, exact product evidence and dimensions, and record any landlord, shared-door, listed-building or local-heritage decision that must precede fabric work.`,
        ],
        checks: ['Confirm tenure and the responsible controller', 'Survey the complete door and frame', 'Separate product evidence from property permissions'],
      },
    },
  }),
  stockingford: makeGuide({
    slug: 'stockingford',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `The county's 11 August 2026 street register assigns selected entries including Arbury Road, Ansley Road, Albert Street and Westbury Road to Stockingford, while the council's walkabout schedule separates Stockingford East and West housing-engagement groups. Neither record is a property or tenure inventory.`,
      `Historic England identifies only 350 and 352 Arbury Road, Nuneaton CV10 7NE, as the Grade II pair in list entry 1261649. That exact status, and the council's landlord-permission policy for council or former council homes, must be applied only after the service address and controller are confirmed.`,
    ],
    accessGuidance: `Use the full Stockingford address, number and postcode and name the affected private, communal or managed entrance. Confirm tenure and the responsible controller independently; East or West walkabout labels and highway entries cannot establish ownership or access.`,
    evidenceLimits: `The street and walkabout records support selected address labels only, the landlord policy applies only to properties within its scope, and the Grade II entry covers two exact numbers. None proves another property's construction, hardware, condition, authority or service circumstances.`,
    facts: [
      {
        heading: 'Stockingford streets in the county register',
        text: `The county street register assigns selected entries including Arbury Road, Ansley Road, Albert Street and Westbury Road to Stockingford, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `Use the full number and postcode to disambiguate a booking; the register does not establish a parcel, private access right, tenure or threshold controller.`,
      },
      {
        heading: 'Stockingford East and West walkabouts',
        text: `The 2026 housing walkabout schedule lists separate Stockingford East and Stockingford West groups and names selected streets within each group.`,
        sourceIds: ['nbbc-tenant-walkabouts-2026'],
        serviceRelevance: `Ask whether the exact property is council-owned, former-council, leasehold, managed or private; participation in a housing area does not determine an address's tenure.`,
      },
      {
        heading: 'Stockingford council-home lock alteration permission',
        text: `The council requires prior landlord permission before alterations to council or former council homes, including changes to door handles or locks.`,
        sourceIds: ['nbbc-council-home-alterations'],
        serviceRelevance: `Apply the policy only after confirming the exact Stockingford premises falls within its scope, and keep landlord permission separate from planning or building approval.`,
      },
      {
        heading: 'Stockingford Arbury Road Grade II listing',
        text: `Historic England lists 350 and 352 Arbury Road, Nuneaton CV10 7NE, at Grade II under list entry 1261649 and identifies Stockingford in the entry.`,
        sourceIds: ['historic-england-arbury-road-350-352-1261649', 'nbbc-listed-building-consent'],
        serviceRelevance: `The designation applies only to those two numbers; verify the responsible controller and restrictions before work affecting listed character or historic fabric.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['wcc-list-of-streets-2026'],
      LOCAL_SOURCES['nbbc-tenant-walkabouts-2026'],
      LOCAL_SOURCES['nbbc-council-home-alterations'],
      LOCAL_SOURCES['historic-england-arbury-road-350-352-1261649'],
      LOCAL_SOURCES['nbbc-listed-building-consent'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 3],
        heading: 'A Stockingford lockout with address and authority matched',
        body: [
          `A Stockingford street label or East or West walkabout group does not identify the locked threshold. Record the full number, street and postcode, then distinguish a private door from a common or managed entrance and establish the caller's connection to it. Where a block or shared route is involved, name the unit, floor and controller. Only after that address-and-authority match should the latch state, deadlocking, key response and visible damage guide the mechanical assessment.`,
          `If the call concerns 350 or 352 Arbury Road, match the exact Grade II entry and authorised controller before a method could affect character or historic fabric; the listing does not determine technique. For every other address, do not borrow that status. MLA guidance separately supports identity and authority checks, available price information in advance and new agreement if the service-call price changes. Record the inspected basis for the opening step, affected component, reinstatement and any management or listed-building question left unresolved.`,
        ],
        checks: ['Provide the full number street and postcode', 'Name the exact private or common threshold', 'Keep the Grade II check to two numbers'],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'A Stockingford lock change with the controller identified',
        body: [
          `Begin a Stockingford lock change with the complete address, the reason for changing key control and the person responsible for the threshold. A street-register or housing-group label cannot establish tenure. If the exact premises is a council or former council home covered by the published policy, obtain the required landlord permission before altering handles or locks. Photographs and inspection should then record the cylinder, lock case, keep, furniture and alignment as separate items rather than assuming one failed component.`,
          `At 350 or 352 Arbury Road, verify the Grade II address and distinguish work within existing apertures from any change affecting listed character or fabric. The designation applies nowhere else merely because Arbury Road is assigned to Stockingford. A written proposal should name retained hardware, measured replacement, keys, fitting and adjustment, and list the landlord, shared-key, building-management or listed-building decision needed before the scope expands. Product compatibility must follow markings and measurements, not the locality records.`,
        ],
        checks: ['Define the key-control objective and tenure', 'Photograph markings before component selection', 'Confirm every landlord or shared-key approval'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        heading: 'Stockingford uPVC repair with tenure checked first',
        body: [
          `The current Stockingford street and walkabout records cannot establish that a door is uPVC, composite, private or communal. Confirm the full property and tenure first, then record the material, key rotation, handle travel, locking-point movement and any safe difference between open and closed operation. Those observations belong to the identified door only. Faceplate markings, centres, backset, locking layout, hinges and keeps must still be measured before a mechanism or alignment repair is proposed.`,
        `If the exact property is a council or former council home within the council's policy, distinguish diagnostic work from an alteration and obtain the landlord decision required before changing handles or locks. A Stockingford East or West schedule entry alone cannot trigger that rule. The repair record should name the controller, observed symptoms, safe tests, measured components and next action, plus any shared-door or management dependency. It must not infer mechanism prevalence or failure from the street or housing label.`,
        ],
        checks: ['Confirm the exact property tenure and material', 'Record the complete operating sequence', 'Measure before identifying compatible parts'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 3],
        heading: 'Stockingford boarding with site control documented',
        body: [
          `A Stockingford street or walkabout-group label cannot describe damage, tenure or approval at an opening. Follow police directions first, then record the full number, postcode, exact private or shared threshold and responsible controller. Photograph the point of entry, remaining frame, glazing or door, compromised hardware and adjacent surfaces before covering them. Those scene observations establish dimensions and safe attachment questions without treating a housing-engagement entry as proof that the council owns or manages the premises.`,
          `If the damaged address is 350 or 352 Arbury Road, match the Grade II record and document surviving historic fabric before temporary attachment; the listing itself supplies no incident or structural evidence. At other properties, do not transfer that designation. The handover should identify everything concealed, the temporary fixing scope and each permanent glazing, joinery, door, lock or structural task still open, while landlord, shared-access, building-management or listed-building questions remain allocated to the relevant controller.`,
        ],
        checks: ['Follow police directions before disturbing damage', 'Record the exact threshold and controller', 'Separate temporary work from permanent repair'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'Stockingford upgrades with tenure and status verified',
        body: [
          `For a Stockingford upgrade, record the complete property, tenure, threshold and controller before comparing products. Neither the county street register nor the East and West walkabout groups identify a door set. When the exact premises falls within the council or former council policy, landlord permission for changing handles or locks is a separate prerequisite. Inspect the leaf, frame, hinges, keeps, furniture, lock engagement and cylinder fit and use measurements and current accreditation evidence to define options.`,
          `At 350 or 352 Arbury Road, match the Grade II entry and document existing cut-outs and visible fabric before proposing change; no other Stockingford address inherits that designation. Separate adjustment, reinforcement and replacement, and distinguish work within existing apertures from an alteration that could affect historic character. The specification should name retained items, exact product documentation, measured fit, expected limits and every landlord, building-management or listed-building decision required before implementation, without promising a universal outcome.`,
        ],
        checks: ['Confirm tenure and threshold control first', 'Assess the complete door and frame', 'Document product evidence and property approvals'],
      },
    },
  }),
  weddington: makeGuide({
    slug: 'weddington',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `The current housing walkabout schedule names Carisbrook Road, Cleaver Gardens, Niton Road and Ryde Avenue under Weddington and gives a meeting point at the Cleaver Gardens flats block facing the park. This supports exact block and threshold questions, not a tenure finding for every address.`,
      `Historic England lists the Church of St James on Church Lane at Grade II under entry 1185771. The designation applies to that exact church, while the council's landlord-permission policy applies only after a caller confirms that a property is a council or former council home within its scope.`,
    ],
    accessGuidance: `Provide the complete Weddington address, postcode, block or unit where relevant and exact private or communal entrance. Confirm tenure and the responsible controller independently, and apply the Church of St James designation only to the named building.`,
    evidenceLimits: `The walkabout row is not a property or tenure inventory, the landlord policy is conditional on the exact premises, and the Grade II entry designates one church. None proves another property's ownership, construction, door material, hardware, condition, access or service need.`,
    facts: [
      {
        heading: 'Weddington housing walkabout streets',
        text: `The council's housing walkabout schedule lists Carisbrook Road, Cleaver Gardens, Niton Road and Ryde Avenue under Weddington and names a Cleaver Gardens flats meeting point.`,
        sourceIds: ['nbbc-tenant-walkabouts-2026'],
        serviceRelevance: `For a Cleaver Gardens call, obtain the block, unit, exact private or communal door and controller; the schedule does not prove any property's tenure.`,
      },
      {
        heading: 'Weddington council-home lock alteration permission',
        text: `The council requires prior landlord permission before alterations to council or former council homes, including changes to door handles or locks.`,
        sourceIds: ['nbbc-council-home-alterations'],
        serviceRelevance: `Apply this policy only after confirming the exact Weddington property is within its scope, and keep landlord permission separate from planning or building approval.`,
      },
      {
        heading: 'Weddington St James Grade II listing',
        text: `Historic England lists the Church of St James on Church Lane, Weddington, at Grade II under list entry 1185771.`,
        sourceIds: ['historic-england-st-james-weddington-1185771', 'nbbc-listed-building-consent'],
        serviceRelevance: `For that exact church, identify the authorised controller and check restrictions before work affecting listed character or historic fabric; Church Lane is not designated generally.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['nbbc-tenant-walkabouts-2026'],
      LOCAL_SOURCES['nbbc-council-home-alterations'],
      LOCAL_SOURCES['historic-england-st-james-weddington-1185771'],
      LOCAL_SOURCES['nbbc-listed-building-consent'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        heading: 'A Weddington lockout matched to block and threshold',
        body: [
          `The Weddington walkabout row names four streets and a Cleaver Gardens flats meeting point, but it does not identify a caller's block, unit or locked door. Record the complete address and postcode, then distinguish the private entrance from any communal threshold and identify who controls it. That step is especially important for a block instruction. Only after authority is tied to the exact opening should latch state, deadlocking, key response and existing damage guide the inspection.`,
          `If the booking is for the Grade II Church of St James, match the exact Church Lane building and authorised controller before a method could affect historic character or fabric; the listing supplies no opening technique. MLA guidance separately supports identity-and-authority checks, available price information in advance and fresh agreement if the service-call price changes. Document the inspected basis for the opening step, any component affected, reinstatement and every communal-access or listed-building question that remains outside the immediate scope.`,
        ],
        checks: ['State the complete address block and unit', 'Identify who controls the locked threshold', 'Keep the church designation building-specific'],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        heading: 'A Weddington lock change with authority established',
        body: [
          `A Weddington housing-engagement label cannot establish tenure or authorise a lock change. Record the full property, block and unit where relevant, the private or communal threshold and the purpose of changing key control. If the exact premises is a council or former council home within the published policy, secure the required landlord permission before changing handles or locks. Photographs and inspection should keep the cylinder, lock case, keep, furniture and alignment as separate component questions.`,
          `At the Grade II Church of St James, verify the exact building and responsible controller and distinguish work within existing apertures from a proposal affecting historic character or fabric. Do not transfer that status to the separate hall or another Church Lane property. The written schedule should identify retained parts, measured replacement, keys, fitting and adjustment and list each landlord, shared-key, building-management or listed-building decision required before the scope changes; the locality records cannot select compatible hardware.`,
        ],
        checks: ['Describe the exact key-control and tenure position', 'Photograph markings before product selection', 'Separate component work from property approvals'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Weddington uPVC repair with communal control clarified',
        body: [
          `The Weddington walkabout schedule does not show which doors are uPVC or composite and does not assign tenure. Confirm the full address, block and unit, then identify whether the affected mechanism belongs to a private door or communal entrance. Record key rotation, handle travel, locking-point movement and any safe difference between open and closed operation. Faceplate markings, centres, backset, locking layout, hinges and keeps must be measured before a mechanism or alignment repair is identified.`,
          `Where the exact premises is a council or former council home covered by the council policy, separate diagnosis from an alteration and obtain the landlord decision needed before changing handles or locks. A Cleaver Gardens meeting reference or Weddington street name cannot establish that policy applies. The repair note should name the controller, symptoms, safe tests, measured geometry and proposed next step, while communal-door, management and landlord dependencies remain explicit and no local prevalence or fault claim is inferred.`,
        ],
        checks: ['Record the exact block unit and threshold', 'Compare frame contact only when safe', 'Confirm any landlord or communal controller'],
      },
      'boarding-up': {
        localFactIndexes: [0, 2],
        heading: 'Weddington boarding with block and site evidence preserved',
        body: [
          `The Weddington walkabout row cannot describe damage or authority at a particular opening. Follow police directions first, then record the full address, block and unit where relevant, exact private or communal threshold and responsible controller. Photograph the point of entry, surviving frame, glazing or door, compromised hardware and adjacent surfaces before covering them. Those current observations establish dimensions and attachment questions without treating a housing-engagement meeting point as proof of tenure, access or incident circumstances.`,
          `If the damaged opening belongs to the Grade II Church of St James, match the exact building and document surviving historic fabric before temporary attachment; the listing provides no damage or structural finding. Do not apply it to another Church Lane site. The completion record should distinguish the temporary fixing and concealed material from outstanding glazing, joinery, door, lock or structural work, with any communal-access, landlord, property-status or permanent-alteration decision assigned to the authorised controller.`,
        ],
        checks: ['Follow current police scene instructions', 'Record the exact block threshold and controller', 'Document all concealed and outstanding work'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        heading: 'Weddington upgrades with tenure and fabric checks separated',
        body: [
          `Before a Weddington upgrade, record the full address, block or unit, tenure and controller; the housing walkabout row supplies none of those property findings. If the exact premises falls under the council or former council policy, prior landlord permission for changing handles or locks remains separate from any other approval. Inspect the door leaf, frame, hinges, keeps, furniture, lock engagement and cylinder fit, then use measured dimensions and current accreditation evidence to compare suitable options.`,
          `At the Grade II Church of St James, verify the named building and photograph existing apertures and visible fabric before proposing outward change. The designation does not cover Weddington generally and cannot select a product. Separate adjustment, reinforcement and replacement and identify retained material, exact manufacturer documentation, measured fit and expected limits. The final specification should list every landlord, communal-door, building-management or listed-building decision required before implementation rather than claiming a universal security outcome.`,
        ],
        checks: ['Confirm tenure and threshold control first', 'Inspect hinges keeps and frame condition', 'Separate product evidence from property approvals'],
      },
    },
  }),
  'horeston-grange': makeGuide({
    slug: 'horeston-grange',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Warwickshire County Council's street register, produced on 11 August 2026, assigns Camborne Drive, Crediton Close, Seaton Close, St Ives Way and Tiverton Drive to Horeston Grange, Nuneaton. These selected highway labels are not a complete boundary or property inventory.`,
      `The Borough Plan Review adopted on 10 December 2025 names Horeston Grange as a district centre serving day-to-day shopping and service needs. The council's current well-being-walk schedule separately identifies the Horeston Grange Co-op meeting point at Camborne Drive, Nuneaton CV11 6GU; neither record identifies a unit, entrance or controller for locksmith work.`,
      `A current council asset row gives the named St. Nicholas MUGA parcel on Tiverton Drive freehold and local-authority-occupied status. That exact controller record applies only to CV11 6YL and proves no gate, door, lock, access right, fault or service requirement.`,
    ],
    accessGuidance: `Give the complete Horeston Grange address and exact affected threshold. At the district centre, add the business and unit; at St. Nicholas MUGA, obtain instruction from an authorised council or facilities contact. A street, retailer or asset name alone does not establish authority.`,
    evidenceLimits: `The street register supplies selected highway-locality labels, the plan supplies a centre classification, the walk schedule identifies one current retail meeting point and the asset list identifies one council-controlled parcel. None establishes another property's use, owner, manager, entrance, construction, hardware, condition, access right, incident, demand, route, response time or service history.`,
    facts: [
      {
        heading: 'Horeston Grange county street entries',
        text: `The county street register produced on 11 August 2026 assigns Camborne Drive, Crediton Close, Seaton Close, St Ives Way and Tiverton Drive to Horeston Grange, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `Use the complete number, street and postcode to locate the instruction; selected highway labels establish no property, entrance, controller or access right.`,
      },
      {
        heading: 'Horeston Grange district centre designation',
        text: `The Borough Plan Review adopted on 10 December 2025 lists Horeston Grange as a district centre serving day-to-day shopping and service needs.`,
        sourceIds: ['nbbc-borough-plan-review-2021-2039'],
        serviceRelevance: `At a centre booking, identify the current business, unit, exact affected threshold and authorised contact; the planning label proves none of those details.`,
      },
      {
        heading: 'Camborne Drive Co-op meeting point',
        text: `The council's current well-being-walk schedule names the Horeston Grange Co-op meeting point at Camborne Drive, Nuneaton CV11 6GU.`,
        sourceIds: ['nbbc-horeston-grange-wellbeing-walk'],
        serviceRelevance: `For a call at that retail site, name the business or unit, exact door and authorised manager; a public meeting point supplies no work authority.`,
      },
      {
        heading: 'Council-controlled St Nicholas MUGA land',
        text: `The council asset list records St. Nicholas MUGA at Tiverton Drive, Nuneaton CV11 6YL as freehold land occupied by the local authority.`,
        sourceIds: ['nbbc-horeston-grange-asset-register-2026'],
        serviceRelevance: `Only for that exact asset, obtain instruction from an authorised council or facilities contact; the register proves no gate, door, lock, condition or access right.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['wcc-list-of-streets-2026'],
      LOCAL_SOURCES['nbbc-borough-plan-review-2021-2039'],
      LOCAL_SOURCES['nbbc-horeston-grange-wellbeing-walk'],
      LOCAL_SOURCES['nbbc-horeston-grange-asset-register-2026'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'Identifying the exact Horeston Grange threshold during a lockout',
        body: [
          `A Horeston Grange lockout instruction should begin with the full number, street and postcode because a county locality label does not identify a property or door. At the district centre or the Camborne Drive Co-op site, record the current business, unit and precise private, shared or service entrance. If the request concerns St. Nicholas MUGA on Tiverton Drive, obtain instruction from an authorised council or facilities contact and identify the exact secured point; the asset register itself proves no gate or lock.`,
          `Connect the caller's identity and authority to that threshold before testing the key, latch, deadlocking and visible condition. The centre, retailer and asset records select no opening method and predict no hardware. Use inspection to explain any non-destructive option, component removal, replacement or reinstatement, and record pre-existing damage. MLA guidance separately supports identity-and-authority checks, available price information in advance and fresh agreement if the service-call price changes; it does not promise entry or prescribe a technique.`,
        ],
        checks: ['Resolve the Camborne unit or Tiverton asset', 'Link the caller to the precisely named opening', 'Record latch state before choosing an entry step'],
      },
      'lock-change': {
        localFactIndexes: [1, 2, 3],
        heading: 'Authority and component checks for a Horeston Grange lock change',
        body: [
          `Horeston Grange's district-centre designation does not identify a current occupier, unit or keying system. For the Camborne Drive retail site, name the business, unit and door and obtain the authorised manager's instruction; for St. Nicholas MUGA, use an authorised council or facilities contact for the exact asset. Define whether the change concerns lost key control, failure, damage or another agreed objective, and distinguish a private component from shared or site-controlled hardware before replacement is considered.`,
          `Photograph both faces of the furniture, door edge, readable markings and keep, then inspect cylinder, case, alignment and surrounding condition as separate questions. Neither the plan nor the asset list proves a fitted lock or compatible product. The written scope should identify the diagnosed component, measurements, retained parts, supplied keys, fitting and adjustment, plus any shared-keying or building-management approval. Do not transfer the council's control of one Tiverton Drive parcel to another address or treat a centre name as permission.`,
        ],
        checks: ['Identify the current unit and decision-maker', 'Define the key-control or repair objective', 'Measure the installed component before selection'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'Horeston Grange multipoint diagnosis at the named door',
        body: [
          `Nothing in the county street list, district-centre plan, Co-op meeting-point record or council asset list proves that a Horeston Grange opening is uPVC, composite or fitted with multipoint hardware. Confirm the complete address and actual door first. At a centre unit, name the business and authorised manager; at St. Nicholas MUGA, obtain the council or facilities instruction for the specific asset. Those steps resolve place and control only and must not be used as a remote mechanism diagnosis.`,
          `At the confirmed uPVC or composite door, record whether the handle lifts fully, the key rotates and hooks or rollers move, plus any safe difference between open and closed operation. Photograph the faceplate and readable codes and measure centres, backset and locking layout before a compatible component is proposed. Establish separately whether the threshold is private, shared or managed before dismantling hardware. The repair record should state symptoms, reproduced tests, measurements, proposed part and approvals, without assigning a fault or outcome from locality evidence.`,
        ],
        checks: ['Confirm the complete address door and controller', 'Record the safe operating sequence', 'Measure the complete fitted locking arrangement'],
      },
      'boarding-up': {
        localFactIndexes: [1, 2, 3],
        heading: 'Exact-site preparation for Horeston Grange boarding',
        body: [
          `A boarding request at the Horeston Grange district centre must identify the current business, unit and damaged external or internal opening rather than using the centre name alone. At the Camborne Drive retail site, obtain the authorised manager; at St. Nicholas MUGA, use an authorised council or facilities contact for that exact parcel. The official records do not show damage, safe access, construction or attachment points, and the asset row cannot be treated as proof that a gate, door or window exists.`,
          `Follow any police evidence-preservation instruction before disturbing the scene, then photograph the point of entry, surviving frame, glazing or door material, compromised hardware and adjacent surfaces. Measure only the authorised opening and define temporary coverage after direct inspection of what remains. The handover should identify the fixing and material used, what evidence was concealed, and permanent glazing, joinery, door, lock or structural work still open. Keep site authority, temporary access reduction and full restoration as separate recorded decisions.`,
        ],
        checks: ['Separate Camborne unit damage from Tiverton asset authority', 'Capture every surface hidden by temporary coverage', 'Assign permanent follow-on work to the site controller'],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 2, 3],
        heading: 'A controlled-site security brief for Horeston Grange',
        body: [
          `A Horeston Grange upgrade brief should identify one entrance and its authorised objective. At the district centre or Camborne Drive retail site, record the current business, unit, exact private or shared threshold and responsible manager. If the request concerns St. Nicholas MUGA, obtain the council or facilities requirement for that exact asset. The plan and asset register establish context and one controller record only; they supply no existing security level, door construction, fitted product or need for replacement.`,
          `Inspect the identified leaf or gate, frame, hinges, keeps, handles, lock engagement and cylinder fit where those components are actually present. Record markings and measurements and check any written insurer, landlord, council or site-management condition before comparing correctly sized, accredited options. Photograph existing cut-outs and distinguish adjustment, reinforcement and replacement. The specification should identify retained material, exact manufacturer evidence, fit, dependencies and approving party, without transferring the Tiverton Drive controller fact to other premises or promising that one upgrade removes every entry route.`,
        ],
        checks: ['Tie the objective to one controlled entrance', 'Inspect and measure the complete assembly', 'Record product evidence and approving party'],
      },
    },
  }),
  whitestone: makeGuide({
    slug: 'whitestone',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Warwickshire County Council's street register, produced on 11 August 2026, assigns Fairway, Falcon Close, Falstaff Close, St Andrews Drive, Whitestone Road and Willowfields Road to Whitestone, Nuneaton. These selected highway entries do not create a complete locality boundary.`,
      `Nuneaton and Bedworth Borough Council's housing trajectory at 1 April 2026 records HSG9, land off Golf Drive, with status “U/C” in the Whitestone-and-Bulkington ward grouping. A separate council directory publishes tenancy-management and repair contacts for Magyar Crescent; neither record establishes the present status, tenure or controller of another address.`,
    ],
    accessGuidance: `Give the full Whitestone postal address, current plot or unit where relevant, exact affected entrance and person responsible for it. For HSG9 off Golf Drive, distinguish a completed dwelling from a controlled work site using current information. At a Magyar Crescent address, apply the council tenancy or repair route only after the caller confirms that it governs the premises and threshold.`,
    evidenceLimits: `The street entries do not form a boundary, the housing trajectory is a dated site-level record, and the Magyar Crescent directory is not proof that every address there is council-owned. The school record identifies one facility only. None verifies today's plot status, route, occupation, tenure, controller, construction, hardware, fault, incident, access right or service need at another property.`,
    facts: [
      {
        heading: 'Whitestone county street entries',
        text: `The county street register produced on 11 August 2026 assigns Fairway, Falcon Close, Falstaff Close, St Andrews Drive, Whitestone Road and Willowfields Road to Whitestone, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `These selected street labels can support address checking but cannot be converted into a full boundary, route, property description or controller record.`,
      },
      {
        heading: 'Golf Drive HSG9 housing trajectory',
        text: `The borough's housing trajectory at 1 April 2026 records site 64c001, land off Golf Drive (HSG9), with status “U/C” in the Whitestone-and-Bulkington ward grouping. The row gives total capacity as 621 and records 68 completions between 2021/22 and 2025/26.`,
        sourceIds: ['nbbc-whitestone-hsg9-5yhls-2026'],
        serviceRelevance: `Only for an HSG9 booking, request the current plot or postal address and distinguish a completed dwelling from a controlled site; the dated trajectory supplies neither today's phase nor entrance authority.`,
      },
      {
        heading: 'Magyar Crescent council contact routes',
        text: `The council's tenancy-and-neighbourhood directory publishes a tenancy management officer, housing-repair route and emergency out-of-hours number for Magyar Crescent, Nuneaton.`,
        sourceIds: ['nbbc-magyar-crescent-tenancy-team'],
        serviceRelevance: `Apply those routes only after confirming that a council tenancy or council-controlled threshold is involved; the directory does not assign tenure or door control to every address on the street.`,
      },
      {
        heading: 'Whitestone Infant School address',
        text: `Warwickshire County Council's school directory identifies Whitestone Infant School as a community school at Magyar Crescent, Nuneaton, Warwickshire CV11 4SQ.`,
        sourceIds: ['wcc-whitestone-infant-school'],
        serviceRelevance: `For a booking at the school, identify the named gate or entrance and confirm the person authorised for the site; the directory establishes neither access rights nor hardware.`,
      },
    ],
    factOnlySourceIds: ['wcc-whitestone-infant-school'],
    sources: [
      LOCAL_SOURCES['wcc-list-of-streets-2026'],
      LOCAL_SOURCES['nbbc-whitestone-hsg9-5yhls-2026'],
      LOCAL_SOURCES['nbbc-magyar-crescent-tenancy-team'],
      LOCAL_SOURCES['wcc-whitestone-infant-school'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Current plot and threshold checks for a Whitestone lockout',
        body: [
          `For HSG9 off Golf Drive, the council's 1 April 2026 trajectory records a site-level “U/C” status and some completed dwellings, so a lockout call must identify the current plot or postal address and say whether the threshold is at a completed dwelling or within a controlled site. That dated row cannot show today's phase, route, occupation or person responsible for a door. Elsewhere, Whitestone Road, Willowfields Road and the other county street entries can help check the locality spelling only. The full property, unit or floor and exact locked threshold still have to be recorded.`,
          `Verify the caller's connection to the actual entrance and, where a controlled site is involved, the authorised site contact before an opening method is agreed. Inspect the latch, cylinder, deadlock, door and visible damage rather than infer hardware from a plot or street. MLA evidence supports identity and authority checks, available price information in advance and agreement before a service-call price change. Explain any destructive or replacement step separately, together with the person who may approve it and any reinstatement still required.`,
        ],
        checks: ['Give the current HSG9 plot or full postal address', 'Distinguish a completed dwelling from a controlled site', 'Verify authority for the exact locked threshold'],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        heading: 'Controller and repair-route checks for a Whitestone lock change',
        body: [
          `At Magyar Crescent, the council publishes tenancy-management and housing-repair contacts, but the directory does not prove that every address or threshold is council-controlled. Ask whether an NBBC tenancy actually applies and distinguish a private dwelling door from a communal entrance. If the council route governs the affected hardware, confirm the repair or permission path before changing it; otherwise identify the present owner, occupier or manager. At HSG9, also record the current Golf Drive plot or postal address and whether the dwelling has been completed and handed to the person instructing the work.`,
          `Neither the trajectory nor the directory identifies the fitted lock or who holds its keys. State the key-control or mechanical reason for change and inspect both door faces, the edge plate, cylinder, case, keep and alignment. Use readable markings and measurements to define repair or replacement, key quantity and any adjustment. The written scope should name the approving controller and separate the diagnosed component from new cutting, common-door changes or other work still awaiting property-specific authority.`,
        ],
        checks: ['Confirm whether the Magyar council route actually applies', 'Record the current HSG9 plot or full address', 'Name the controller before changing keys or hardware'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Plot-specific uPVC fault-finding in Whitestone',
        body: [
          `The HSG9 trajectory records a dated site status, not the door material or mechanism at a Golf Drive plot. Give the current plot or postal address and establish whether the threshold belongs to a completed dwelling or a controlled site before arranging access. The Whitestone street labels likewise prove no uPVC or composite entrance. For the actual door, record key rotation, handle lift, locking-point travel and whether operation changes when the sash is open, stopping if resistance increases.`,
          `Treat those observations as a symptom record rather than a remote diagnosis. Photograph the full faceplate and readable markings and measure centres, backset, locking layout and cylinder fit before stating a compatible part. Identify the person controlling a private, shared or site-managed threshold independently of the trajectory and street register. The work record should separate adjustment, cylinder, handle and mechanism questions and list any access, fabric or approval issue that remains unresolved.`,
        ],
        checks: ['Identify the current HSG9 plot and threshold controller', 'Record key, handle and locking-point sequence', 'Photograph markings and measure the fitted mechanism'],
      },
      'boarding-up': {
        localFactIndexes: [1, 2],
        heading: 'Site and council-route checks before Whitestone boarding',
        body: [
          `At HSG9, identify the current Golf Drive plot or postal address and whether the damaged opening is at a completed dwelling or within a controlled site; the April trajectory cannot supply today's access, occupation or site manager. At Magyar Crescent, use the published council repair or out-of-hours route only after confirming that an NBBC-controlled tenancy or threshold is actually involved. Otherwise name the current owner, occupier or manager. Keep those controller checks separate from the police instructions and physical damage evidence for the exact opening.`,
          `Follow any evidence-preservation direction before touching the scene, then photograph the point of entry, frame, glazing or door, damaged lock and adjacent surfaces. Record sound and broken areas and every surface that temporary work will conceal. Inspect and measure only the authorised opening. The handover should identify the temporary material and fixings and list permanent glazing, joinery, door, lock or structural tasks still open, without using a trajectory or tenancy-directory row as evidence of damage or hidden condition.`,
        ],
        checks: ['Identify completed dwelling, controlled site or confirmed council threshold', 'Follow police and site-controller directions', 'Record every component concealed by temporary coverage'],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 2],
        heading: 'Property-control checks for a Whitestone security upgrade',
        body: [
          `For an HSG9 address, record the current Golf Drive plot or postal address, completion or occupation information supplied for that plot, the exact entrance and the person controlling it. The dated trajectory proves none of those present details. At Magyar Crescent, confirm whether a council tenancy or council-controlled common entrance is actually involved before using the published tenancy or repair route. A private occupier, landlord, managing agent or site controller may have different authority, so the approving party must be identified rather than inferred from either record.`,
          `Inspect the leaf, frame, hinges, keeps, handles, lock operation and cylinder fit where those components exist. Record markings and measurements and check the exact written insurer, landlord, council or management requirement before comparing correctly sized, accredited products. The specification should separate adjustment, reinforcement and replacement, cite manufacturer evidence for the selected item and identify any cutting, common-door or fabric question still awaiting approval. Neither new-development status nor a council contact directory establishes existing resistance or a need for replacement.`,
        ],
        checks: ['Confirm the current plot or tenancy context', 'Identify who approves the exact entrance', 'Record full assembly measurements and product evidence'],
      },
    },
  }),
  'camp-hill': makeGuide({
    slug: 'camp-hill',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Warwickshire County Council's List of Streets, produced on 11 August 2026, assigns Camp Hill Drive, Copper Beech Road, Hollystitches Road and selected other entries to Camp Hill, Nuneaton. Camp Hill Road itself appears with Nuneaton as the town and no locality, so the road name alone is not enough to resolve an address.`,
      `Nuneaton and Bedworth Borough Council's 2026 housing walkabout schedule groups selected streets under Camp Hill, while its adopted plan identifies Camp Hill-Copper Beech Road as a district centre. Neither record proves the tenure, use or controller of an individual premises.`,
      `The council separately identifies the CHESS Centre as a multi-room managed venue at 460 Cedar Road, Nuneaton CV10 9DN. That exact facility record can help distinguish a site booking, but it says nothing about other Cedar Road or Camp Hill thresholds.`,
    ],
    accessGuidance: `Use the complete number, street and postcode because the county register distinguishes Camp Hill-labelled streets from Camp Hill Road's blank locality. For Copper Beech Road businesses or the CHESS Centre, also name the organisation, unit or room, exact affected threshold and person authorised to control it.`,
    evidenceLimits: `The street register concerns highways maintainable at public expense, the walkabout is housing-engagement geography, the plan gives a district-centre classification and the CHESS page identifies one managed venue. None supplies a complete service boundary, parcel or tenure record, access right, hardware, condition, incident pattern, demand, route, response time or job history.`,
    facts: [
      {
        heading: 'Camp Hill county street entries',
        text: `The county List of Streets produced on 11 August 2026 assigns Camp Hill Drive, Copper Beech Road and Hollystitches Road to Camp Hill, Nuneaton, while Camp Hill Road has Nuneaton as its town and no locality entry.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `Use the distinction to request the complete number, street and postcode; it establishes neither a service boundary nor property access, ownership, use or condition.`,
      },
      {
        heading: 'Camp Hill housing walkabout streets',
        text: `The council's 2026 housing walkabout schedule groups Almond Avenue, Beechwood Road, Cedar Road, Green Lane, Hillcrest Road, Laburnum Grove and other selected streets under Camp Hill.`,
        sourceIds: ['nbbc-tenant-walkabouts-2026'],
        serviceRelevance: `The housing-engagement grouping can prompt a tenure and responsible-controller question, but it does not prove that any address is council-owned, tenanted, shared or managed.`,
      },
      {
        heading: 'Camp Hill district centre designation',
        text: `The Borough Plan Review adopted on 10 December 2025 names Camp Hill-Copper Beech Road as a district centre.`,
        sourceIds: ['nbbc-borough-plan-review-2021-2039'],
        serviceRelevance: `At a centre address, confirm the business or organisation, unit, affected threshold and authorised contact rather than inferring present use or access from the plan.`,
      },
      {
        heading: 'Camp Hill CHESS Centre address',
        text: `The council identifies the CHESS Centre as a multi-room managed venue at 460 Cedar Road, Nuneaton CV10 9DN.`,
        sourceIds: ['nbbc-chess-centre'],
        serviceRelevance: `Only at the exact CHESS site, distinguish the room or activity space, affected threshold and authorised site contact.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['wcc-list-of-streets-2026'],
      LOCAL_SOURCES['nbbc-tenant-walkabouts-2026'],
      LOCAL_SOURCES['nbbc-borough-plan-review-2021-2039'],
      LOCAL_SOURCES['nbbc-chess-centre'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'Resolve the Camp Hill address and controlled threshold first',
        body: [
          `A Camp Hill lockout instruction should start with the full number, street and postcode because the county register labels Camp Hill Drive but gives Camp Hill Road no locality. Ask whether the caller is an owner, tenant, occupier or authorised site contact; the 2026 walkabout grouping does not answer that question for any house. Link identity and authority to the exact private, shared or managed threshold before testing the key, latch and deadlock or choosing an opening method.`,
          `For a call at the Copper Beech Road district centre or 460 Cedar Road, record the business, organisation, unit or CHESS room and the particular door, not just the centre name. Confirm the person responsible for that opening and any separate site procedure. These locality records select no technique and predict no lock or door condition. Inspection should document the fitted assembly and any pre-existing damage. Give available price information in advance, explain an inspection-led scope change separately and obtain fresh agreement before a changed service-call price applies.`,
        ],
        checks: ['Give the complete number, street and postcode', 'Name the exact private, shared or managed door', 'Connect authority to that threshold'],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'Authority and unit checks before a Camp Hill lock change',
        body: [
          `Before preparing a Camp Hill lock change, resolve the complete address rather than treating Camp Hill Road and Camp Hill Drive as interchangeable. The walkabout schedule is a reason to ask who owns or manages the affected entrance, not evidence that a listed street or property has council tenure. Record why key control must change, who can approve it and whether the door is private, shared or part of a managed system. Only the fitted lock, dimensions and current operating checks can support a repair or replacement decision.`,
          `At the Copper Beech Road centre, capture the business and unit; at CHESS, capture the named space, door and authorised site contact. Neither managed-site fact identifies a cylinder, case or keying arrangement. Photograph both faces of the furniture, door edge, readable marks and keep, then measure the relevant component and check operation. The written scope should distinguish retained parts, adjustment, measured replacement, supplied keys and any building-management approval, without extending district-centre or venue evidence to another Camp Hill address.`,
        ],
        checks: ['Resolve Camp Hill Road versus Camp Hill-labelled streets', 'Identify the keying decision-maker', 'Measure the fitted component before selection'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 3],
        heading: 'Address and controller preparation for Camp Hill uPVC work',
        body: [
          `For a Camp Hill uPVC enquiry, first record the complete number, street and postcode because the county register does not give Camp Hill Road the same locality field as Camp Hill Drive or Hollystitches Road. The 2026 housing schedule cannot identify tenure, so ask whether the affected entrance belongs to one occupier, a landlord, a leaseholder or a shared building and identify the responsible controller. These checks locate the instruction; they do not establish the door material or fault.`,
          `If the booking is for CHESS, specify the room or activity area, exact threshold and authorised site contact rather than assuming one entrance for the venue. At the identified door, confirm uPVC or composite construction directly and record key rotation, handle travel, locking-point movement and safe open-versus-closed operation. Photograph the faceplate and measure centres, backset and locking layout before compatibility is considered. No street, housing or venue source supplies a mechanism diagnosis, condition finding or product choice.`,
        ],
        checks: ['Confirm the complete address and controller', 'Name the exact CHESS threshold when applicable', 'Record and measure the installed mechanism'],
      },
      'boarding-up': {
        localFactIndexes: [0, 2, 3],
        heading: 'Unit-level preparation for Camp Hill boarding',
        body: [
          `A Camp Hill boarding request needs the full number, street and postcode, especially where the caller uses Camp Hill Road as a general location. For Copper Beech Road, add the business and unit; for CHESS, add the room or activity space and exact external or internal opening. Identify the occupier, facilities contact or other person able to approve temporary securing. The centre and venue records help separate thresholds but say nothing about damage, safe access or attachment points.`,
          `Follow any police instruction before disturbing the scene, then photograph each damaged opening, surviving frame, glazing or door material and nearby surface before covering it. Measure and describe the opening that was actually authorised. The temporary proposal should state what will be covered and what remains for glazing, joinery, lock, door or structural follow-up. Do not use the district-centre classification, CHESS address or street register to infer an incident, construction type or local risk.`,
        ],
        checks: ['Name the business, unit or managed space', 'Identify every authorised damaged opening', 'Record temporary and follow-on scopes separately'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'A controlled-threshold upgrade brief for Camp Hill',
        body: [
          `Build the Camp Hill upgrade brief from the complete address and exact threshold, using the street-register distinction to avoid treating Camp Hill Road as proof of the locality. The walkabout grouping should trigger a tenure and controller question only. Where the address is in the Copper Beech Road district centre, record the business and unit; where it is CHESS, record the managed space and authorised site contact. Those sources establish context, not an existing security level or required product.`,
          `Inspect the identified leaf, frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable. Record current markings and measurements and check any written insurer, landlord or manager requirement before comparing correctly sized, accredited options. Obtain the responsible party's approval before changing a shared or managed entrance. The specification should separate adjustment, reinforcement and replacement and cite current product evidence, without inferring door construction, hardware prevalence, condition or likely outcome from Camp Hill's housing, centre or venue records.`,
        ],
        checks: ['Tie the upgrade objective to one threshold', 'Confirm landlord or site authority where relevant', 'Inspect and measure the complete entrance'],
      },
    },
  }),
  'chapel-end': makeGuide({
    slug: 'chapel-end',
    summary: [
      `Warwickshire's Historic Environment Record describes the Congregational Chapel on Coleshill Road, Chapel End, as built in 1840 to replace an earlier chapel of 1807-08. This evidence concerns one named building.`,
      `Warwickshire County Council's street register, produced on 11 August 2026, assigns Alders Lane, Lincoln Avenue and Salisbury Drive to Chapel End, Nuneaton. These selected street labels are not a complete locality boundary.`,
    ],
    accessGuidance: `Provide the exact modern Chapel End address, affected entrance and responsible person. The named historic chapel and selected county street labels cannot establish the full route area, property access or building control.`,
    evidenceLimits: `The sources describe one historic chapel and selected current highway-locality entries. They supply no complete boundary, parcel designation, property type, tenure, opening arrangement, door material, lock system, incident pattern or service demand.`,
    facts: [
      {
        heading: 'Chapel End Congregational Chapel history',
        text: `The Warwickshire record describes the Congregational Chapel on Coleshill Road as built in 1840 to replace a chapel of 1807-08.`,
        sourceIds: ['warwickshire-her-chapel-end-chapel'],
        serviceRelevance: `This building-specific record must not be treated as a description or designation of other Chapel End properties.`,
      },
      {
        heading: 'Chapel End county street entries',
        text: `The county street register produced on 11 August 2026 assigns Alders Lane, Lincoln Avenue and Salisbury Drive to Chapel End, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `The selected highway labels can aid address checking but prove no property condition, entrance, authority or service need.`,
      },
      {
        heading: 'Chapel End infant school record',
        text: `Warwickshire County Council's current directory lists Nathaniel Newton Infant School as a community primary school at Victoria Road, Nuneaton, Warwickshire CV10 0LS; its 2017/18 to 2019/20 admissions directory placed that address in Chapel End, Hartshill.`,
        sourceIds: ['wcc-nathaniel-newton-infant-school', 'wcc-chapel-end-school-directory'],
        serviceRelevance: `These records are limited to the named school and address; they establish no access authority, entrance condition, construction or hardware.`,
      },
    ],
    factOnlySourceIds: ['wcc-nathaniel-newton-infant-school', 'wcc-chapel-end-school-directory'],
    sources: [
      LOCAL_SOURCES['warwickshire-her-chapel-end-chapel'],
      LOCAL_SOURCES['wcc-list-of-streets-2026'],
      LOCAL_SOURCES['wcc-nathaniel-newton-infant-school'],
      LOCAL_SOURCES['wcc-chapel-end-school-directory'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Current-address preparation for a Chapel End lockout',
        body: [
          `The historic chapel record and selected Chapel End street entries do not identify today's locked threshold. Give the complete address, unit or floor if relevant, door position and whether the opening is private or common. The caller's authority must relate to that precise entrance. Only after it is identified should the locksmith examine latch state, deadlocking, key behaviour and prior damage; neither the 1840 building date nor a highway-locality label contributes mechanical evidence.`,
          `The heritage evidence concerns one named chapel, not surrounding addresses. If an opening method could affect visible or apparently older material, photograph it and check present records rather than transferring the chapel's record across Chapel End. Keep any change in method or scope tied to the inspection rather than the chapel record. MLA guidance supports verifying identity and authority, giving available price information in advance and securing agreement only if the service-call price changes. Any drilling, removal or replacement should be explained at component level, with reinstatement and possible external-fabric work recorded separately so the appropriate owner or authority can make the next property-specific decision.`,
        ],
        checks: ['Use the complete Chapel End address', 'Link authority to the exact opening', 'Verify present status before fabric work'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Changing a Chapel End lock from present hardware evidence',
        body: [
          `An 1840 chapel record and county street entries reveal nothing about a different Chapel End door. Start with the reason for change, then record inside and outside furniture, faceplate marks and closing behaviour. Treat the cylinder, case, keep and alignment as separate inspection questions. Any repair or replacement decision must follow observed condition, exact dimensions and desired key control; locality history does not identify a product.`,
          `Confirm the responsible person before altering shared hardware, since the street register says nothing about ownership or keying. If new cutting or a visible substitution is proposed, use current property records and check whether the named chapel record actually applies. The written scope should list retained parts, measured replacement, keys, fitting, adjustment and any separate building-management or external-material question. This preserves a traceable decision sequence without presenting one heritage record as area-wide authority.`,
        ],
        checks: ['State the purpose of the change', 'Photograph hardware and door alignment', 'Confirm responsibility for communal components'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Chapel End uPVC diagnosis independent of centre history',
        body: [
          `The historic chapel and street records do not indicate whether a Chapel End entrance is uPVC or composite. For the door actually affected, document key movement, handle lift, locking-point travel and whether the problem changes when the sash meets the frame. Record a cautious open-door comparison, where safe, as a reproducible symptom; it does not identify the failed component. Markings, backset, centres and layout remain necessary before compatibility can be confirmed.`,
          `The selected street-to-locality labels provide no present authority information. Establish whether the mechanism belongs to a private entrance, a common door or a managed building before parts are removed. If the repair would alter visible fabric, check the exact current property record separately and do not transfer the chapel evidence. The next-step note should state symptoms, tests and measurements, keeping locality history outside the mechanical and building-control conclusions.`,
        ],
        checks: ['Confirm the actual door construction', 'Record safe operation with the door open and closed', 'Identify the responsible building controller'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Temporary boarding at Chapel End with dated facts kept separate',
        body: [
          `The historic chapel and street register cannot describe a damaged Chapel End opening. Follow police guidance first, then photograph the point of entry, broken glazing or door, remaining frame, lock damage and adjacent material before a board hides them. Identify the threshold and person controlling it. Those records support a temporary design from present evidence and avoid turning building-specific history or a highway label into an assertion about this premises.`,
          `Any property-status or external-material constraint needs a current address check, because the heritage record applies only to its named chapel. Record intact material, damage and what temporary work will conceal. The completion note should name every unresolved glazing, joinery, lock, door or structural task. This keeps boarding temporary and evidence-aware while leaving permanent alteration to the appropriate later assessment instead of assuming conditions from locality evidence.`,
        ],
        checks: ['Follow police directions before covering', 'Photograph frame and hardware damage', 'List all outstanding permanent work'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Measured entrance upgrades for Chapel End',
        body: [
          `Chapel End's historic chapel and street records contain no information about the security of another door. Review the entire entrance: leaf, frame, hinges, keeps, handles, lock operation and any cylinder projection. Warwickshire Police guidance supports this complete assessment and correctly sized, accredited products. Markings, measurements and current condition can then support an option, while alignment or surrounding-frame issues remain explicit rather than being hidden behind an area label.`,
          `Before a visible alteration, establish current property status because the cited locality evidence neither grants nor restricts work at an unspecified address. Common or managed shared-door hardware also requires the responsible controller's requirements. The specification should separate adjustment, reinforcement and replacement, cite current manufacturer documentation for the exact product and record any fabric question awaiting further advice. One chapel record cannot justify a uniform recommendation or promise an outcome for Chapel End entrances.`,
        ],
        checks: ['Survey the complete current entrance', 'Verify dimensions and accredited evidence', 'Use current records for visible changes'],
      },
    },
  }),
  'bermuda-park': makeGuide({
    slug: 'bermuda-park',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Warwickshire County Council's List of Streets, produced on 11 August 2026, uses Bermuda as the locality and Nuneaton as the town for Bermuda Road, Bermuda Village, Hazell Way and selected other entries. The register does not use Bermuda Park as the locality for those roads, so a booking needs the exact number, unit and postcode rather than the area label alone.`,
      `Nuneaton and Bedworth Borough Council's Heritage Supplementary Planning Document, adopted on 29 April 2026, locally lists only 20-118 even and 39-117 odd at Bermuda Village, CV10 7PN; its current record and the Article 4 Direction give that same bounded range. The status must not be extended to another Bermuda address.`,
      `The adopted Borough Plan describes the wider Bermuda Park area as an employment location, while the council identifies Bermuda Phoenix Centre at Bermuda Road, Nuneaton CV10 7HU as a multi-space managed venue with a separate club on the same site. These facts support unit and controller checks only.`,
    ],
    accessGuidance: `Confirm whether the address uses Bermuda or Bermuda Park, then record the full number, road, postcode, organisation or unit and exact affected threshold. At Bermuda Phoenix, distinguish the centre, the separate club, the relevant space and the person authorised for that door. Check the exact house number before applying the Bermuda Village heritage records.`,
    evidenceLimits: `The street register concerns highway maintainability, the heritage records cover exact Bermuda Village number ranges, the plan gives wider employment context and the Phoenix page identifies one managed site. None establishes a complete service boundary, access right, current use or controller for another premises, hardware, condition, incident pattern, demand, route, response time or job history.`,
    facts: [
      {
        heading: 'Bermuda county street entries',
        text: `The county List of Streets produced on 11 August 2026 assigns Bermuda Road, Bermuda Village and Hazell Way to the locality Bermuda and town Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `Use the official Bermuda label to check the complete number, road, unit and postcode; it does not define the Bermuda Park service area or property access.`,
      },
      {
        heading: 'Bermuda Village heritage and Article 4 range',
        text: `The Heritage Supplementary Planning Document adopted on 29 April 2026 locally lists 20-118 even and 39-117 odd at Bermuda Village, Nuneaton CV10 7PN, and the Article 4 Direction applies to dwellings and curtilages in that same exact range.`,
        sourceIds: ['nbbc-heritage-spd-2026', 'nbbc-heritage-spd-adoption-2026', 'nbbc-bermuda-village-article-4'],
        serviceRelevance: `Apply the evidence only after matching an exact house number; it does not prove that a door, lock or fitting is original, protected, defective or that a proposed locksmith action requires consent.`,
      },
      {
        heading: 'Wider Bermuda Park employment context',
        text: `The adopted Borough Plan Review describes the wider Bermuda Park area as an employment location.`,
        sourceIds: ['nbbc-borough-plan-review-2021-2039'],
        serviceRelevance: `For a business-site booking, confirm the organisation, unit, building and authorised facilities contact rather than inferring access or control from the planning context.`,
      },
      {
        heading: 'Bermuda Phoenix Centre and club',
        text: `The council lists Bermuda Phoenix Centre at Bermuda Road, Nuneaton CV10 7HU as a managed multi-space venue with a separate Sports and Social Club on the same site.`,
        sourceIds: ['nbbc-bermuda-phoenix-centre'],
        serviceRelevance: `Only at the exact Phoenix site, distinguish centre from club and identify the affected space, door and authorised contact.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['wcc-list-of-streets-2026'],
      LOCAL_SOURCES['nbbc-heritage-spd-2026'],
      LOCAL_SOURCES['nbbc-heritage-spd-adoption-2026'],
      LOCAL_SOURCES['nbbc-bermuda-village-article-4'],
      LOCAL_SOURCES['nbbc-borough-plan-review-2021-2039'],
      LOCAL_SOURCES['nbbc-bermuda-phoenix-centre'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 3],
        heading: 'Exact-address and authority checks for a Bermuda Park lockout',
        body: [
          `A Bermuda Park lockout should be booked against the complete number, road, unit and postcode because the county register uses Bermuda as the locality for Bermuda Road, Bermuda Village and Hazell Way. Confirm the exact private, shared or managed threshold and connect the caller's identity and authority to that opening. If the address falls within 20-118 even or 39-117 odd Bermuda Village, record the number and check current requirements before any visible alteration; do not extend that status beyond the cited range.`,
          `At Bermuda Phoenix, distinguish the centre from the separate club, name the relevant space and door and identify the authorised site contact. The locality and heritage records choose no entry technique and describe no fitted lock or present condition. After authority is established, inspect the latch, deadlock, key response and visible damage at the actual threshold. Give available price information in advance, explain an inspection-led method or scope change and obtain agreement before a changed service-call price.`,
        ],
        checks: ['Use the full Bermuda address and unit', 'Match any heritage check to the exact number', 'Identify the authorised controller for one door'],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'A property-specific Bermuda Park lock-change brief',
        body: [
          `Use the official Bermuda street label only to resolve the full address; it does not show who controls the lock. For a business within the wider employment area, record the organisation, building, unit and facilities contact. For Bermuda Phoenix, distinguish centre, club and space. Then establish whether the change concerns a private door, a shared system or managed hardware and who can approve altered key control. No area or venue source identifies the fitted component.`,
          `For 20-118 even or 39-117 odd Bermuda Village, match the exact number to the current heritage records before proposing visible alteration, without assuming that the lock or door is original or that consent is required. Photograph both faces of the furniture, door edge, marks and keep; measure the cylinder or case and test operation. The scope should state retained parts, adjustment, measured replacement, keys and any owner, manager or council question still unresolved.`,
        ],
        checks: ['Name the organisation, unit and threshold', 'Confirm the key-control decision-maker', 'Check only exact heritage-range addresses'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 3],
        heading: 'Bermuda Park address and managed-door preparation for uPVC repair',
        body: [
          `For a uPVC repair enquiry, capture the complete road, number, postcode and unit because official highway entries use Bermuda rather than Bermuda Park. Ask whether the entrance is privately controlled, shared or managed. At Bermuda Phoenix, specify centre or club, the exact space and door, and the authorised site contact. These details identify the instruction but do not establish that the door is uPVC, composite or fitted with any particular mechanism.`,
          `Confirm the material at the actual threshold, then record key rotation, handle travel, locking-point movement and safe open-versus-closed operation. If the address is within the exact Bermuda Village range, check current heritage requirements only before a visible alteration; the record provides no diagnosis or compatibility evidence. Photograph the faceplate and measure centres, backset and locking layout before parts are considered. Keep the address, authority and status checks separate from the technical finding.`,
        ],
        checks: ['Resolve Bermuda, number, unit and controller', 'Confirm the door material at the threshold', 'Measure the installed locking layout'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'Business, managed-site and heritage checks before Bermuda Park boarding',
        body: [
          `Start a Bermuda boarding instruction with the full address and unit rather than the Bermuda Park label. At an employment site, name the organisation, building, loading or public-facing unit and authorised facilities contact. At Bermuda Phoenix, distinguish the centre from the club and identify the exact damaged opening. If the address is one of the cited Bermuda Village numbers, record that match and check current requirements before temporary work affects visible fabric.`,
          `The sources provide no evidence about an incident or the damaged construction. Follow police direction first, then photograph each opening, surviving frame, glazing or door material and adjacent surface before covering it. Measure only the threshold approved by the responsible person and describe the temporary attachment from what is found there. The handover should identify covered evidence and remaining glazing, joinery, door, lock or structural tasks, without treating wider employment context or the exact heritage range as a condition finding.`,
        ],
        checks: ['Identify the business, unit or managed space', 'Match heritage evidence only to an exact number', 'Document each temporary and permanent task'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2, 3],
        heading: 'Authority and exact-status checks for a Bermuda Park upgrade',
        body: [
          `Prepare the upgrade against the complete Bermuda address, exact organisation or unit and controlled threshold. The wider employment policy supports asking for a facilities contact, while the Phoenix record supports distinguishing centre, club and managed space only at CV10 7HU. If the property number falls within 20-118 even or 39-117 odd Bermuda Village, check the current Article 4 and local-list position before outward alteration. None of these sources establishes an existing security level or product need.`,
          `For the identified Bermuda Park threshold, inspect the leaf and frame together with hinges, keeps, handles, lock engagement and any applicable cylinder fit. Record markings and measurements and obtain any exact written insurer, landlord, owner or manager requirement before comparing correctly sized, accredited products. The authorised decision-maker should approve work on shared or managed hardware. Separate adjustment, reinforcement and replacement in the specification, and do not infer door material, condition, hardware prevalence or expected outcome from the Bermuda locality, employment context, managed venue or heritage range.`,
        ],
        checks: ['Name the unit and responsible facilities contact', 'Verify exact heritage and management requirements', 'Inspect and measure the full door set'],
      },
    },
  }),
  'galley-common': makeGuide({
    slug: 'galley-common',
    summary: [
      `Warwickshire's Historic Environment Record describes documentary and cartographic research into the former Manor of Stockingford and Galley Common, including a 1592 map and the 1842 tithe plan. It is historic evidence.`,
      `Warwickshire County Council's street register, produced on 11 August 2026, assigns Auden Close, Chaucer Drive, Chesterton Drive and Orford Rise to Galley Common, Nuneaton. These are selected highway labels, not a boundary.`,
    ],
    accessGuidance: `Use the complete current Galley Common address and exact affected opening. Historic manor references and selected county street labels may aid orientation, but they do not establish a route boundary or property access.`,
    evidenceLimits: `The evidence is a historic-environment record and current highway register. It proves no complete locality boundary, property status, tenure, building construction, door material, lock type, access condition or service demand.`,
    facts: [
      {
        heading: 'Galley Common in former Manor of Stockingford research',
        text: `The Warwickshire record links Galley Common to documentary and map research into the former Manor of Stockingford, including 1592 and 1842 mapping.`,
        sourceIds: ['warwickshire-her-stockingford-galley-manor'],
        serviceRelevance: `The historic research cannot become a current property-status, construction, access, activity or service-demand claim.`,
      },
      {
        heading: 'Galley Common county street entries',
        text: `The county street register produced on 11 August 2026 assigns Auden Close, Chaucer Drive, Chesterton Drive and Orford Rise to Galley Common, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `These selected street labels can help check an address but cannot define the modern route or property boundaries.`,
      },
      {
        heading: 'Galley Common Infant School address',
        text: `Warwickshire County Council's school directory identifies Galley Common Infant School as a community school at Plough Hill Road, Nuneaton, Warwickshire CV10 9NZ.`,
        sourceIds: ['wcc-galley-common-infant-school'],
        serviceRelevance: `This facility record applies only to the named school; it cannot describe surrounding Galley Common properties, access arrangements, entrances or locks.`,
      },
    ],
    factOnlySourceIds: ['wcc-galley-common-infant-school'],
    sources: [
      LOCAL_SOURCES['warwickshire-her-stockingford-galley-manor'],
      LOCAL_SOURCES['wcc-list-of-streets-2026'],
      LOCAL_SOURCES['wcc-galley-common-infant-school'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Present-threshold checks for a Galley Common lockout',
        body: [
          `The former-manor record and selected Galley Common street labels do not identify today's locked door. Give the full address, unit where relevant, exact threshold and the person who controls it. A common entrance and private door need separate authority even if they share a postcode. The locksmith should assess latch state, deadlocking, key operation and visible damage only after the caller's connection to the correct opening has been established.`,
          `Neither locality source supplies parcel-level property status. If an opening method might disturb visible material, photograph the existing door and use current records rather than presuming a constraint from historic mapping or a highway label. Record the inspection-led method and scope separately from the locality evidence. For the service call, MLA guidance supports identity-and-authority checks, available price information in advance and agreement before a changed price takes effect. Any drilling, removal or replacement should identify the affected component and reinstatement separately, leaving a broader fabric or management issue as a documented next step for the present property controller.`,
        ],
        checks: ['Provide the full Galley Common address', 'Identify private and shared thresholds separately', 'Check current status before material removal'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Galley Common lock changes from present component evidence',
        body: [
          `The 1592 and 1842 map references say nothing about locks at a Galley Common property. Preparation should explain whether the objective is key control, mechanical repair or damage response, then show handle faces, the door edge and readable codes. Record the cylinder, lock case, keep and alignment as separate inspection questions, with retention or replacement based on observed condition. Compatibility follows from geometry and markings, not from former-manor history or surrounding street names.`,
          `The county street register does not establish ownership or current property controls. Confirm who authorises changes to any communal threshold and check address-level status separately if visible external work is proposed. The schedule should name the diagnosed component, dimensions, supplied keys, fitting and adjustment, and list building-management or fabric questions outside that scope. This approach prevents locality evidence from becoming an unsupported shortcut to a building type, lock distribution or authority conclusion.`,
        ],
        checks: ['Define the change objective clearly', 'Capture faceplate marks and dimensions', 'Confirm authority for shared key changes'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Galley Common multipoint diagnosis from symptoms and measurements',
        body: [
          `No uPVC or composite-door fact appears in the Galley Common historic or highway evidence. For an actual affected door, record the sequence of key rotation, handle lift and locking-point movement and whether operation changes when the sash meets the frame. That operating sequence belongs to the present Galley Common door only; neither former-manor mapping nor current street labels identify the failed component. Full faceplate markings, centres, backset and locking layout are still needed before any compatible mechanism or component can be identified.`,
          `The former-manor record and street register cannot reveal who controls a modern entrance. Establish private, shared or managed responsibility and any building-management constraint before hardware is removed. If diagnosis would extend into visible material, consult current property information rather than historic maps. The work record should state tests, measurements and next action, keeping locality history completely separate from claims about door type, mechanism prevalence or repair result.`,
        ],
        checks: ['Verify the door construction at site', 'Record safe open and closed behaviour', 'Measure the complete multipoint layout'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Temporary boarding in Galley Common with current scene evidence',
        body: [
          `Historic manor references and highway-locality labels cannot describe a damaged Galley Common opening. Follow police directions before disturbing it, then photograph the point of entry, remaining frame, glazing or door leaf, compromised lock and surrounding surfaces. Confirm the exact threshold and responsible person. Those scene-specific records document the opening without implying that a historic map or named street says something about this property's construction or incident.`,
          `Because neither source is a current designation map, external-material constraints need separate verification. Record sound material, damage and what temporary work will conceal. The completion note should record the temporary scope, covered components and outstanding glazing, joinery, door, lock or structural assessment. This preserves a recoverable evidence trail for permanent repair while preventing locality evidence from becoming a claim about access, occupancy or the required temporary method.`,
        ],
        checks: ['Follow current police scene-preservation instructions carefully', 'Photograph all concealed damage first', 'Record the temporary scope and permanent next steps'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'A door-specific security review for Galley Common',
        body: [
          `The former-manor and street records provide no evidence of security hardware in Galley Common. An upgrade survey should inspect the door leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. The former-manor maps and street assignments cannot select hardware; the cited police guidance instead supports a whole-entrance review and consideration of correctly sized, accredited products. Actual markings, measurements and condition can then support options, while alignment, frame support or shared control remain separate findings rather than being extrapolated from locality evidence.`,
          `Current property status must be checked before outward alteration because the historic and highway sources are not parcel designations. The responsible building party should define constraints on communal or managed shared-door hardware. A clear specification separates adjustment, reinforcement and replacement, states the current manufacturer documentation and dimensions for proposed products and identifies unresolved material questions. It cannot use locality records to recommend one product across Galley Common or promise complete protection.`,
        ],
        checks: ['Survey leaf, frame and surrounding hardware', 'Verify product evidence and measured fit', 'Check current controls before visible changes'],
      },
    },
  }),
  hartshill: makeGuide({
    slug: 'hartshill',
    summary: [
      `Historic England identifies Hartshill Castle as Scheduled Monument 1011197 between The Green, Holy Trinity parish church and Castle Road. The designation applies to the mapped monument, not surrounding Hartshill properties.`,
      `The official list entry describes a motte-and-bailey castle originating during Henry I's reign and alteration into an enclosure castle around 1330. These phases are monument history, not dates for neighbouring buildings.`,
    ],
    accessGuidance: `Provide the exact Hartshill address and entrance without treating the castle, The Green, church or Castle Road as proof of property access. If the address may intersect the monument, consult the official list map.`,
    evidenceLimits: `The Historic England record establishes one scheduled site, while the March 2017 neighbourhood plan identifies one community facility in a dated policy. Neither establishes the current status, controller, public access, construction, door material, lock mechanism, incident history or service conditions at a booking address.`,
    facts: [
      {
        heading: 'Hartshill Castle scheduled monument',
        text: `Hartshill Castle is Scheduled Monument 1011197, located between The Green, Holy Trinity church and Castle Road.`,
        sourceIds: ['historic-england-hartshill-castle-1011197'],
        serviceRelevance: `The designation requires a map check for the exact site and cannot be extended to neighbouring addresses.`,
      },
      {
        heading: 'Hartshill Castle development phases',
        text: `Historic England records a motte-and-bailey origin during Henry I's reign and enclosure-castle alteration around 1330.`,
        sourceIds: ['historic-england-hartshill-castle-1011197'],
        serviceRelevance: `These phases support attributed monument history only and say nothing about the age or fabric of customer premises.`,
      },
      {
        heading: 'Hartshill Friends Meeting House protection',
        text: `In the adopted March 2017 Hartshill Neighbourhood Plan, Policy H11 lists the current Society of Friends Meeting House on Castle Road among community facilities to be enhanced and protected.`,
        sourceIds: ['nwbc-hartshill-neighbourhood-plan-2017'],
        serviceRelevance: `This identifies one facility in a dated policy; confirm its present identity, responsible controller and exact entrance before booking, and infer nothing about its hardware.`,
      },
    ],
    factOnlySourceIds: ['nwbc-hartshill-neighbourhood-plan-2017'],
    sources: [LOCAL_SOURCES['historic-england-hartshill-castle-1011197'], LOCAL_SOURCES['nwbc-hartshill-neighbourhood-plan-2017']],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0],
        heading: 'Keeping Hartshill Castle status separate from a lockout address',
        body: [
          `Hartshill Castle's scheduled boundary is a specific mapped site, so proximity to The Green or Castle Road does not establish status or identify a customer's door. A lockout call should provide the complete address, exact private or shared threshold and person controlling it. That allows authority to be checked at the correct opening before latch state, deadlocking, key behaviour and damage determine which methods are technically suitable. Monument history supplies no lock evidence.`,
          `If the exact list map shows a relationship to the scheduled site, record visible fabric and seek the appropriate property-specific guidance before a proposed intervention extends beyond the lock component. Explain any method or scope change arising from inspection before work continues. MLA evidence separately supports verifying identity and authority, providing available price information in advance and obtaining agreement if the service-call price changes. At an unrelated address, do not apply monument constraints merely because it is nearby. The opening decision should remain grounded in inspected hardware, verified authority and current building information, with reinstatement or external alteration listed separately.`,
        ],
        checks: ['Confirm the complete Hartshill address', 'Check the official monument map if relevant', 'Photograph visible material before removal'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'A Hartshill lock change without extending monument status',
        body: [
          `The motte-and-bailey and enclosure-castle phases describe Hartshill Castle alone, not the hardware of nearby buildings. A lock-change request should explain its key-control or mechanical purpose and show the door faces, edge plate and readable markings. For the customer door, catalogue the cylinder, case, keep and alignment separately, then measure any proposed component; Hartshill Castle's two recorded development phases answer none of those compatibility questions. The monument's chronology cannot date the customer door, establish ownership or justify a particular product.`,
          `Where the exact address or proposed work intersects scheduled fabric, identify whether the change stays within an existing fitting or alters surrounding material and seek specialist property guidance before that additional scope. Elsewhere, no restriction should be inferred from proximity. A shared threshold still needs its responsible controller identified. The written proposal should list retained elements, dimensions, keys, fitting and adjustment, making monument status, mechanical compatibility and authority three separate evidence questions.`,
        ],
        checks: ['Define the purpose of the lock change', 'Measure and photograph the fitted component', 'Keep monument status specific to this address'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Hartshill uPVC diagnosis from the fitted mechanism',
        body: [
          `A scheduled medieval castle provides no evidence that an affected Hartshill entrance is uPVC, composite or fitted with multipoint hardware. Confirm the door material first, then record key rotation, handle movement, locking-point travel and any difference against the frame. Keep the movement notes as evidence of the individual Hartshill door's behaviour: the castle designation and recorded medieval phases do not identify a failed component. Faceplate markings and measured centres, backset and layout remain required before compatibility can be stated.`,
          `The Historic England map should be consulted only when the exact property or work may relate to the scheduled site; monument proximity alone does not constrain a modern mechanism repair. Separately, identify who controls a communal or managed door before dismantling it. The repair record should distinguish mechanical symptoms, authority and property status, and refer any proposed alteration to scheduled or visible historic material for appropriate advice instead of inferring a rule for all Hartshill addresses.`,
        ],
        checks: ['Identify the actual door system', 'Record movement without forcing hardware', 'Check mapped status only where relevant'],
      },
      'boarding-up': {
        localFactIndexes: [0],
        heading: 'Boarding a Hartshill opening while respecting a specific monument',
        body: [
          `Hartshill Castle's list entry does not describe damage at another address. Follow police directions first, then photograph the point of entry, surviving frame, glazing or door, compromised lock and surrounding surfaces before covering it. Identify the exact opening and responsible person. If the site may overlap the scheduled monument, include the official map in the preparation; otherwise do not project the castle's protected status onto unrelated fabric.`,
          `At a verified scheduled site, temporary work needs specialist property-specific consideration alongside the inspected safety needs. Record intact material, damage and everything the temporary measure will conceal before proceeding within the authorised scope. The completion note should state the temporary scope and unresolved glazing, joinery, door, lock or structural tasks. This preserves both scene evidence and a clear boundary between temporary security and any permanent change to protected material.`,
        ],
        checks: ['Follow police instructions before touching damage', 'Check the monument map for the address', 'Record all board contact points'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Hartshill upgrades with monument boundaries correctly applied',
        body: [
          `Hartshill Castle's scheduled status does not measure security at surrounding entrances. A review should inspect the actual door, frame, hinges, keeps, handles, lock engagement and cylinder projection where relevant. Warwickshire Police supports complete-entrance assessment and correctly sized, accredited products. Product marks, measurements and fit can then support an option, while alignment or frame issues remain explicit and no conclusion is drawn from the castle's medieval development phases.`,
          `If the exact list map places proposed work within scheduled fabric, separate internal compatible changes from new cutting or visible substitution and obtain the appropriate site-specific guidance. At other Hartshill addresses, do not import that designation. Common or managed shared-door hardware also requires its controller's requirements. The specification should identify retained material, current manufacturer documentation, dimensions and unresolved specialist questions without implying that one product eliminates every entry route.`,
        ],
        checks: ['Inspect the complete current entrance', 'Apply scheduled status only to its map', 'Verify measured product compatibility for the entrance'],
      },
    },
  }),
  bedworth: makeGuide({
    slug: 'bedworth',
    summary: [
      `Bedworth Town Centre Conservation Area was designated in 1986. Its 2022 appraisal identifies character areas around Mill Street, Chapel Street and the Almshouses, Bedworth Cemetery, and Miners' Welfare Park within its assessment.`,
      `Warwickshire County Council's visitor service records Bedworth station on the Coventry-Nuneaton line and describes Miners' Welfare Park as a legacy of mining communities. Neither reference establishes property access or hardware.`,
    ],
    accessGuidance: `Provide the full Bedworth address, correct entrance and responsible contact. The station, park and appraisal character-area names can orient the location, but they do not prove access or that a property is designated.`,
    evidenceLimits: `The conservation evidence applies to a mapped core, while the station and park are named points. The sources do not identify an individual property's status, construction, ownership, door material, lock type or service circumstances.`,
    facts: [
      {
        heading: 'Bedworth conservation-area character areas',
        text: `Bedworth Town Centre Conservation Area dates from 1986 and the 2022 appraisal identifies three character areas within it.`,
        sourceIds: ['nbbc-bedworth-conservation-2022'],
        serviceRelevance: `The mapped designation requires an exact-address check before visible external material is treated as protected context.`,
      },
      {
        heading: 'Bedworth station and Miners Welfare Park',
        text: `The county visitor page records Bedworth station on the Coventry-Nuneaton line and Miners Welfare Park's mining-community legacy.`,
        sourceIds: ['visit-warwickshire-bedworth'],
        serviceRelevance: `These named features support attributed orientation and heritage context but cannot establish property access or hardware.`,
      },
      {
        heading: 'Bedworth Library High Street address',
        text: `Warwickshire County Council identifies Bedworth Library and Information Centre at 18 High Street, Bedworth CV12 8NF.`,
        sourceIds: ['wcc-bedworth-library'],
        serviceRelevance: `This public-facility record applies only to the named library; a booking there still requires the exact entrance and an authorised site contact, and it says nothing about other properties.`,
      },
    ],
    factOnlySourceIds: ['wcc-bedworth-library'],
    sources: [
      LOCAL_SOURCES['nbbc-bedworth-conservation-2022'],
      LOCAL_SOURCES['visit-warwickshire-bedworth'],
      LOCAL_SOURCES['wcc-bedworth-library'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'A Bedworth lockout with the mapped core checked precisely',
        body: [
          `The 2022 appraisal separates three character areas within Bedworth's mapped town-centre designation, so the caller should identify the exact building and door rather than merely naming the station or Miners' Welfare Park. State whether the opening is a frontage, common threshold or private unit and who controls it. Authority can then be verified for that door before the locksmith assesses latch state, deadlocking, key movement and existing damage.`,
          `If the address falls inside the conservation boundary, photograph the leaf, frame and visible furniture before selecting a method that could remove material. The 1986 designation informs preservation but does not reveal the lock or guarantee a particular technique. Explain any revised scope from the inspected condition before proceeding. MLA guidance separately supports identity-and-authority verification, available price information in advance and agreement if the service-call price changes. Any destructive entry component and later reinstatement should be recorded separately, with broader external alteration referred using the exact property rather than the Bedworth name alone.`,
        ],
        checks: ['Identify the precise Bedworth threshold', 'Prepare authority evidence for that door', 'Check the current conservation map'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Bedworth lock replacement with character-area context separated',
        body: [
          `Bedworth station and the mining-community history of Miners' Welfare Park do not identify a lock. A change request should state whether it concerns key control, failure or damage, then record both hardware faces, edge markings and closing behaviour. Record the cylinder, lock case, keep and alignment as separate inspection questions; any decision to retain an element must follow its observed condition. Exact dimensions and required keys support a replacement; proximity to a named feature or character area does not.`,
          `Within the mapped conservation core, distinguish a component using an existing aperture from new cutting or a visible furniture change. That scope difference helps preserve documented character and frames any property-specific council question. A communal threshold also requires its controller's authority before shared keys change. The written schedule should list retained parts, measured product, keys, fitting and adjustment, while external-fabric and building-management questions remain separately identified rather than implied by the 1986 designation.`,
        ],
        checks: ['Explain the key-control or failure objective', 'Measure the actual Bedworth component', 'Separate visible change from internal replacement'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Bedworth multipoint fault checks using the individual door',
        body: [
          `Neither the railway line nor the park's heritage context indicates that a Bedworth entrance is uPVC or composite. Confirm the material, then describe key rotation, handle travel, locking-point movement and any change when the sash meets the frame. Use those observations to document the identified Bedworth door, while keeping diagnosis open; the station and Miners Welfare Park history identify no failed component. Faceplate markings, centres, backset and locking layout must still be measured before a compatible part is proposed.`,
          `A later door can sit within the mapped town-centre core without its mechanism being historic, and a prominent entrance may be communal rather than private. Check property status and control as separate questions. If repair reaches visible external fabric, describe that extension and seek address-specific guidance; internal diagnosis remains based on mechanical evidence. The record should state symptoms, tests, measurements and any building-management requirement that controls the next action.`,
        ],
        checks: ['Confirm the door material directly', 'Compare open and closed operation safely', 'Record complete faceplate geometry and markings'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Evidence-aware boarding in Bedworth conservation context',
        body: [
          `Bedworth's station and park references can help identify a location but do not describe the damaged opening. Follow police directions, then photograph the point of entry, frame, glazing or door, broken hardware and surrounding material before covering it. Confirm whether the opening belongs to a frontage, common entrance or private unit and who controls temporary work. These observations establish the board plan without attributing damage or construction to a named town feature.`,
          `When the exact opening lies inside the conservation boundary, record intact character-area material before temporary work. Use the inspected damage, not the area's 1986 designation alone, to define the temporary scope. The completion note should state what was covered and any outstanding glazing, joinery, lock, door or structural tasks. Any permanent alteration to visible fabric remains a separate address-level decision informed by the 2022 appraisal and later specialist assessment.`,
        ],
        checks: ['Preserve scene evidence as directed', 'Check the exact conservation boundary', 'Document covered damage and temporary scope'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'A measured Bedworth upgrade within a mapped setting',
        body: [
          `Bedworth's rail and mining-heritage facts do not establish door security. An upgrade review should inspect the leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. The 1986 designation and transport or mining context cannot select hardware; the cited police guidance supports assessment of the whole entrance, correctly sized cylinders and accredited products. Markings, measurements and operation can then support an option, while alignment, frame condition and common access remain visible in the specification rather than being guessed from locality.`,
          `Inside the mapped town-centre core, photograph visible furniture, existing apertures and character material before suggesting new cutting or substitution. Internal compatible changes and outward alterations should follow separate decision paths, with property-specific guidance where needed. For a communal or managed door, the responsible controller defines additional constraints. The final plan should record retained fabric, product evidence, dimensions and dependencies, explaining conditional resistance improvement without claiming that one certified item makes a Bedworth entrance impervious.`,
        ],
        checks: ['Inspect the full entrance assembly', 'Verify product evidence and sizing', 'Record mapped fabric before alteration'],
      },
    },
  }),
  bulkington: makeGuide({
    slug: 'bulkington',
    summary: [
      `Bulkington Conservation Area was designated in 1985, reviewed in 2008 and reviewed again in 2021 for the borough council's 2022 appraisal. The designation applies to the mapped village core described there.`,
      `The appraisal identifies Grade II* St James Parish Church with surviving thirteenth-century fabric and dates 3-4 Church Street to the early seventeenth century. Those dates belong only to the named assets.`,
    ],
    accessGuidance: `Provide the exact Bulkington property and affected threshold. St James Church and 3-4 Church Street can orient the heritage record, but proximity does not prove designation, access or building age.`,
    evidenceLimits: `The appraisal establishes one mapped conservation area and facts about two named buildings. It does not assign status, age, ownership, construction, door material, lock type, access conditions or service history to other addresses.`,
    facts: [
      {
        heading: 'Bulkington conservation-area review history',
        text: `Bulkington Conservation Area dates from 1985 and was reviewed in 2008 and 2021 for the 2022 appraisal.`,
        sourceIds: ['nbbc-bulkington-conservation-2022'],
        serviceRelevance: `The review history supports a mapped-status check but cannot establish designation or fabric at every village address.`,
      },
      {
        heading: 'Bulkington named historic buildings',
        text: `The appraisal records thirteenth-century fabric at St James Church and an early-seventeenth-century building at 3-4 Church Street.`,
        sourceIds: ['nbbc-bulkington-conservation-2022'],
        serviceRelevance: `The named dates must remain asset-specific and cannot be transferred to a customer's premises or door.`,
      },
      {
        heading: 'Bulkington Community Library address',
        text: `Warwickshire County Council identifies Bulkington Community Library at School Road, Bulkington, Nuneaton CV12 9JB.`,
        sourceIds: ['wcc-bulkington-library'],
        serviceRelevance: `This facility record is limited to the named library and address; it cannot establish access, authority, construction or hardware there or at other Bulkington properties.`,
      },
    ],
    factOnlySourceIds: ['wcc-bulkington-library'],
    sources: [LOCAL_SOURCES['nbbc-bulkington-conservation-2022'], LOCAL_SOURCES['wcc-bulkington-library']],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Bulkington lockouts with the conservation boundary verified',
        body: [
          `The dates attached to St James Church and 3-4 Church Street do not identify another Bulkington entrance. A caller should give the full address, exact private or shared threshold and person controlling it rather than relying on a heritage landmark. That establishes authority for the correct door before latch state, deadlocking, key movement and prior damage are assessed. The conservation appraisal supplies context only after the property is checked against its mapped core.`,
          `For an entrance inside the designation, photograph the leaf, frame and visible furniture before evaluating any method that could remove material. The appraisal's 1985, 2008 and 2021 milestones do not predict the lock or guarantee non-destructive entry. Because those dated milestones cannot choose an entry technique, explain any changed findings, method or scope before work continues. The MLA source supports providing available price information in advance and securing agreement if the service-call price changes. If drilling or component removal is necessary, document the affected part and reinstatement separately, leaving broader visible alteration for property-specific advice grounded in the current map and actual fabric.`,
        ],
        checks: ['Give the exact Bulkington address', 'Verify authority for the correct door', 'Check the mapped conservation core'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Changing a Bulkington lock while keeping asset dates specific',
        body: [
          `The thirteenth- and seventeenth-century dates in the appraisal belong to two named buildings and cannot date a customer's door. Define why the lock needs changing, then photograph inside and outside furniture, the edge plate and readable marks. Record the cylinder, case, keep and alignment as separate inspection questions; retention or replacement must follow observed condition. A compatible replacement follows from dimensions and key-control needs, not proximity to Church Street or the parish church.`,
          `If the exact property falls inside the mapped conservation area, describe whether work uses an existing fitting or changes visible door material. That distinction frames preservation and any council question. A shared threshold also needs its responsible controller to confirm keying. The written schedule should name retained components, measured product, keys, fitting and adjustment, and set any new cutting, building-management issue or outward change apart from the core lock replacement rather than treating appraisal history as blanket authority.`,
        ],
        checks: ['State why the lock is changing', 'Record markings and accurate dimensions', 'Keep named asset dates specific to those properties'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Bulkington multipoint repair without heritage extrapolation',
        body: [
          `A mapped village core and two historic assets do not show whether the affected Bulkington door is uPVC or composite. Confirm the material, then record key rotation, handle lift, locking-point travel and whether contact with the frame changes operation. Treat that movement sequence as a record of the actual Bulkington door, since neither the mapped core nor the dates of the two named assets identify a failed component. Full faceplate marks, centres, backset and layout remain required before any compatible component is identified.`,
          `A later door may occur within older surroundings, but the appraisal does not establish its status or controller. Check the exact address and distinguish private from common or managed shared-door hardware before dismantling it. If repair expands into visible fabric, describe that work separately and obtain property-specific guidance where relevant. The repair record should state symptoms, tests and measurements, ensuring that St James Church or 3-4 Church Street dates are never used as evidence about this mechanism.`,
        ],
        checks: ['Confirm the actual door material', 'Observe mechanism movement in sequence', 'Measure the faceplate and locking layout'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Temporary boarding in Bulkington with mapped-fabric care',
        body: [
          `The conservation appraisal cannot describe damage at a Bulkington opening. Follow police directions, then photograph the point of entry, surviving frame, glazing or door, broken hardware and surrounding surfaces before covering it. Confirm the precise threshold and person controlling the temporary work. Named historic buildings can provide orientation, but their dates do not establish the age, structure or status of the damaged property.`,
          `Where the exact opening is inside the mapped core, distinguish intact visible fabric from damaged material before temporary work. Define the temporary scope from the inspected opening rather than a village-wide assumption. The completion note should identify covered elements and unresolved glazing, joinery, door, lock or structural work. Any permanent alteration to protected fabric remains a separate next decision supported by address-level appraisal evidence and specialist assessment.`,
        ],
        checks: ['Follow current police evidence instructions first', 'Verify the address against the map', 'Record the temporary scope and covered damage'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'A Bulkington entrance review grounded in present fabric',
        body: [
          `Bulkington's conservation review dates and named assets supply no security rating for another entrance. Because the mapped village core and the two named assets say nothing about that entrance, review its leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection as one assembly. The cited police guidance supports that full-entrance approach and consideration of correctly sized, accredited products; Bulkington's review dates do not support a product choice. Markings, measurements and condition can then guide options, while alignment or frame weaknesses remain explicit and no product is selected from village age or heritage proximity.`,
          `Inside the mapped core, photograph visible furniture, existing apertures and surviving material before proposing a cut or substitution. Compatible internal improvements and changes to outward character should be treated separately. The controller of communal or managed shared-door hardware must also define requirements. A final specification should state retained fabric, current manufacturer documentation, measured fit and dependencies without claiming that one product makes every Bulkington entrance secure against all methods.`,
        ],
        checks: ['Inspect frame, hinges and lock together', 'Verify product evidence and exact sizing', 'Separate internal and visible changes'],
      },
    },
  }),
  rugby: makeGuide({
    slug: 'rugby',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Rugby Town Centre Conservation Area covers most of the commercial centre and follows the historic road layout, extending from Edwardian suburbs in the north to Rugby School's boundary in the south.`,
      `Current council records distinguish the multi-occupier Art Gallery and Museum building from the Town Hall, while Historic England identifies one exact listed doorway at 46 Chapel Street. These named records must not be extended to neighbouring premises.`,
    ],
    accessGuidance: `Provide the complete Rugby address, building or unit, floor, exact threshold and responsible contact. The council separately describes a Newbold Road car-park approach to the rear of the Town Hall, showing why a venue name alone cannot identify the required entrance.`,
    evidenceLimits: `The records concern a mapped central designation and three named sites. They do not transfer listed status, management arrangements, door fabric, present condition, access authority or hardware to another Rugby address.`,
    facts: [
      {
        heading: 'Rugby town-centre conservation area',
        text: `Rugby Town Centre Conservation Area covers most of the commercial centre along the historic road layout between defined northern and southern contexts.`,
        sourceIds: ['rbc-rugby-town-centre-appraisal'],
        serviceRelevance: `The mapped extent requires exact-address verification before central townscape context is applied to visible property fabric.`,
      },
      {
        heading: 'Rugby cultural-building responsibility split',
        text: `Rugby Borough Council says the purpose-built Rugby Art Gallery and Museum venue houses its Art Gallery, Museum and Visitor Centre together with Warwickshire County Council's Library under a lease until 2125.`,
        sourceIds: ['rbc-ragm-modernising'],
        serviceRelevance: `At this named multi-occupier venue, identify the exact unit, threshold and responsible facilities contact; the record does not name an authorised keyholder or describe any lock.`,
      },
      {
        heading: '46 Chapel Street listed doorway',
        text: `Historic England records 46 Chapel Street, Rugby CV21 3EB as Grade II and describes a recessed porch, a five-panel door and a rectangular fanlight in the official list entry.`,
        sourceIds: ['historic-england-46-chapel-street-1035045'],
        serviceRelevance: `The description applies only to number 46 and is not a current condition survey; inspect the actual opening and obtain property-specific consent before altering listed fabric.`,
      },
      {
        heading: 'Rugby Town Hall entrance distinction',
        text: `Rugby Borough Council gives the Town Hall address as Evreux Way, Rugby CV21 2RR and separately locates rear cycle racks via the Newbold Road car-park entrance.`,
        sourceIds: ['rbc-town-hall-contact'],
        serviceRelevance: `The civic address and separate rear-approach reference show why a booking at a named complex needs the exact threshold and site contact; they do not provide access permission or a current route for another property.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['rbc-rugby-town-centre-appraisal'],
      LOCAL_SOURCES['rbc-ragm-modernising'],
      LOCAL_SOURCES['historic-england-46-chapel-street-1035045'],
      LOCAL_SOURCES['rbc-town-hall-contact'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [1, 3],
        heading: 'Rugby lockouts at named multi-use civic sites',
        body: [
          `The council records several occupiers inside the Rugby Art Gallery and Museum building and separately publishes the Town Hall address plus a rear cycle-rack approach. A venue name is therefore not enough for a lockout. Give the complete address, gallery, museum, visitor-centre, library, office or other unit, the exact external, common or internal door and the facilities contact responsible for it. The county-library lease at RAGM does not identify an authorised keyholder, and the Town Hall's rear cycle-rack route does not establish the correct service entrance.`,
          `After the threshold and authority are verified, record whether the door merely closed, was deadlocked, has a trapped or broken key, or shows another fault. The lock and door condition determine the opening options; neither civic use nor a named access route guarantees non-destructive entry. MLA guidance supports identity-and-authority checks, available price information in advance and agreement before a service-call price changes. If inspection changes the method or adds drilling, replacement or reinstatement, explain and document that scope separately before continuing.`,
        ],
        checks: ['Name the exact Rugby venue, unit and door', 'Identify the current facilities contact', 'Prepare evidence linking the caller to that threshold'],
      },
      'lock-change': {
        localFactIndexes: [0, 2],
        heading: 'Rugby lock replacement with mapped and listed fabric separated',
        body: [
          `Historic England's record for 46 Chapel Street describes one five-panel door, recessed porch and fanlight; it does not describe any neighbouring Rugby entrance or confirm the named door's present condition. At the booked address, define the key-control or mechanical objective and photograph both hardware faces, the edge plate, existing apertures and readable marks. Inspect cylinder, case, keep and alignment separately. Compatibility must come from present measurements and condition, not from the listed example or the appearance of the street.`,
          `The town-centre conservation-area record and the individual Grade II entry answer different questions. Check the exact address, then separate work within existing apertures from new cutting or visible furniture changes. At number 46 or another verified listed property, obtain controller and property-specific consent before altering protected fabric; elsewhere, do not borrow that listing. The proposal should name retained material, measured product, keys, fitting and adjustment and identify any shared-keying, building-management or consent decision as a separate item.`,
        ],
        checks: ['Define the lock-change objective', 'Check the exact address and designation', 'Record existing apertures, markings and controller'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 3],
        heading: 'Rugby uPVC diagnosis at the exact managed threshold',
        body: [
          `The RAGM occupier list and the Town Hall contact route identify named civic settings, but neither proves that an affected entrance is uPVC, composite or fitted with a multipoint mechanism. Confirm the precise unit and door material first. Then record key rotation, handle travel, locking-point movement and any safe difference between open-door and closed-door operation. Full faceplate marks, centres, backset and locking layout are required before a compatible component can be stated.`,
          `At RAGM, borough services and a county library share one building; at the Town Hall, the council distinguishes the main address from a rear approach. Those facts make controller and threshold checks essential but do not grant permission to dismantle hardware. Identify the current facilities contact and whether the door is private, communal or managed. Keep operating symptoms, measurements, authority and any external-fabric question as separate findings so a venue label never becomes a remote diagnosis.`,
        ],
        checks: ['Confirm the exact Rugby unit and door system', 'Record open and closed behaviour safely', 'Verify the facilities controller before dismantling'],
      },
      'boarding-up': {
        localFactIndexes: [0, 2],
        heading: 'Rugby boarding with one listed doorway kept exact',
        body: [
          `Historic England records a five-panel door and fanlight only at 46 Chapel Street. If damage is reported there, follow police directions and photograph the named doorway, glazing, frame, lock and adjacent surviving material before anything is covered. At any other Rugby address, document the actual opening without importing number 46's construction or listed status. In both cases identify whether the opening is a frontage, common entrance or private unit and who currently authorises temporary work.`,
          `The mapped town-centre conservation area is broader than one listed building and proves neither damage nor suitable temporary attachment. Check the exact property, define the temporary board or closure from the inspected opening and record all material that will be concealed. The completion note should state attachment method, remaining exposure and outstanding glazing, joinery, door, lock or structural assessment. Any permanent change to verified protected fabric remains a separate property-specific decision.`,
        ],
        checks: ['Follow police instructions before work', 'Verify the exact property and listed status', 'Photograph the opening and record every temporary fixing'],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 2, 3],
        heading: 'Rugby security upgrades across civic, shared and listed entrances',
        body: [
          `RAGM's borough-and-county occupation, the Town Hall's distinct rear approach and the listed doorway at 46 Chapel Street represent three different control and fabric questions. None supplies a security rating. At the exact entrance, identify its current controller and inspect the leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports a complete-entrance assessment and correctly sized, accredited products, while actual markings, measurements and operation determine the options.`,
          `At a shared civic building, obtain approval for the precise threshold and keying scope. At number 46 or another verified listed property, photograph visible furniture, existing apertures and surviving material before proposing cuts or substitutions; do not extend number 46's description to nearby doors. The written specification should separate adjustment, reinforcement and replacement, cite current product evidence and measured fit, and list owner, facilities, building-use or consent dependencies without claiming that one product makes the whole entrance secure.`,
        ],
        checks: ['Identify the exact Rugby controller and threshold', 'Inspect and measure the complete entrance', 'Verify listed-fabric and shared-building requirements separately'],
      },
    },
  }),
  hillmorton: makeGuide({
    slug: 'hillmorton',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Current council and county records identify Hillmorton Recreation Ground on Featherbed Lane and Hillmorton Primary School at Watts Lane, while Historic England records one exact Grade II property at 81 High Street.`,
      `Rugby Borough Council's separate appraisal covers only the small Hillmorton Locks conservation area. These four records describe different named places and must not be treated as one boundary, owner or premises type.`,
    ],
    accessGuidance: `Give the complete Hillmorton address, named site or unit, exact affected entrance and current responsible contact. Public access to a recreation ground, an academy directory entry or a Locks landmark does not authorise work on a door.`,
    evidenceLimits: `The sources identify three named sites and one small mapped conservation area. They do not prove current legal title, keyholding, caller authority, adjacent-property status, door material, present condition, hardware or safe access.`,
    facts: [
      {
        heading: 'Hillmorton Recreation Ground site',
        text: `Rugby Borough Council identifies Hillmorton Recreation Ground at Featherbed Lane and lists a car park, play area, skate/BMX facility, informal recreation and a circular walk.`,
        sourceIds: ['rbc-hillmorton-recreation-ground'],
        serviceRelevance: `These are named-site orientation facts only; a call still needs the exact building, gate or opening and the present person authorised to control it.`,
      },
      {
        heading: 'Hillmorton Primary School directory record',
        text: `Warwickshire County Council's directory identifies Hillmorton Primary School as an academy at Watts Lane, Rugby CV21 4PE.`,
        sourceIds: ['wcc-hillmorton-primary-school'],
        serviceRelevance: `The directory identifies a named academy site but not its trust, owner, authorised facilities contact, entrances or installed hardware.`,
      },
      {
        heading: '81 High Street Hillmorton listed door',
        text: `Historic England records 81 High Street, Hillmorton as Grade II and its legacy description identifies a central five-panel door in a ribbed surround.`,
        sourceIds: ['historic-england-81-high-street-hillmorton-1365008'],
        serviceRelevance: `The record applies only to number 81 and is not a present-condition survey; its status and door description cannot be transferred to another High Street property.`,
      },
      {
        heading: 'Hillmorton Locks mapped conservation area',
        text: `Rugby Borough Council's appraisal describes Hillmorton Locks as a small canal-centred conservation area separated from Hillmorton housing by a railway embankment and narrow tunnel.`,
        sourceIds: ['rbc-hillmorton-locks-appraisal'],
        serviceRelevance: `This context applies only inside the mapped Locks settlement and cannot establish access, status or fabric at another Hillmorton address.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['rbc-hillmorton-recreation-ground'],
      LOCAL_SOURCES['wcc-hillmorton-primary-school'],
      LOCAL_SOURCES['historic-england-81-high-street-hillmorton-1365008'],
      LOCAL_SOURCES['rbc-hillmorton-locks-appraisal'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Hillmorton lockouts at two separately identified sites',
        body: [
          `The Recreation Ground record points to Featherbed Lane and the school directory to an academy on Watts Lane. Neither identifies a locked opening. A call must say whether it concerns a site gate or other opening, an academy entrance, an internal room or an unrelated home, and must name the current person responsible for that threshold. Public access to recreation facilities and a school's directory listing do not authorise entry or establish who holds keys.`,
          `Once the exact door and authority are established, record whether it merely closed, was deadlocked, has a trapped key or shows another fault. The installed lock and present damage determine the proportionate options; the site category does not. MLA guidance supports identity-and-authority checks, available price information in advance and agreement before a changed service-call price. If drilling, replacement or reinstatement becomes necessary after inspection, explain and document that work separately before proceeding.`,
        ],
        checks: ['Name the exact Hillmorton site and opening', 'Identify the current facilities or property controller', 'Prepare authority linked to that threshold'],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        heading: 'Hillmorton lock changes at academy or listed-building thresholds',
        body: [
          `The county directory identifies Hillmorton Primary School as an academy but does not identify the trust, facilities authoriser or any lock. For a request at the school, confirm the current responsible contact and exact external, common or internal door. For any Hillmorton address, state whether the change concerns lost key control, failure or damage and capture both hardware faces, the edge plate, existing apertures and readable markings before a product is proposed.`,
          `Historic England's five-panel-door description applies only to Grade II listed 81 High Street and is not a condition report. At that exact property, distinguish a component change within existing apertures from cutting or visible substitution and obtain property-specific authority before altering protected fabric. At another address, do not import number 81's status or construction. The schedule should list retained parts, measured replacement, keys, fitting, adjustment and any controller or consent decision separately.`,
        ],
        checks: ['Confirm the present controller of the named threshold', 'Record actual markings, apertures and geometry', 'Check listed status only for the exact address'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1],
        heading: 'Hillmorton multipoint diagnosis without an academy-door assumption',
        body: [
          `The Hillmorton Primary School directory proves only that the named academy is at Watts Lane; it does not show that any entrance there or elsewhere is uPVC, composite or multipoint. Confirm the exact site, door material and current facilities contact. Then record key rotation, handle lift, hook or roller movement and any safe difference when the leaf meets its frame. The academy label supplies no mechanical diagnosis.`,
          `Photograph the full faceplate and record centres, backset and locking layout before a compatible component is stated. Treat private, shared and managed thresholds as separate controller questions and obtain approval before dismantling hardware. The repair record should label reported and reproduced symptoms, measurements and tests separately, stopping if resistance increases. Any work beyond the mechanism into the leaf or frame must be described as a separate scope.`,
        ],
        checks: ['Verify the precise site and door material', 'Confirm the current facilities controller', 'Record faceplate geometry and frame interaction safely'],
      },
      'boarding-up': {
        localFactIndexes: [0, 2, 3],
        heading: 'Hillmorton boarding across recreation, listed and Locks contexts',
        body: [
          `A report near Featherbed Lane must identify whether the opening belongs to the recreation ground or another property; the facilities list does not identify a building or suitable attachment surface. Follow police directions, confirm the current controller and photograph the point of entry, remaining frame, glazing or door, hardware and adjacent surfaces. At 81 High Street, use the exact Grade II record only for number 81 and record the listed five-panel-door fabric without treating the legacy description as its present condition.`,
          `Hillmorton Locks is a separate small mapped conservation area. If the opening is inside it, verify the boundary and record surviving appraisal-relevant material; do not extend that status to wider Hillmorton. In every context, define the temporary work from inspected damage and document opening measurements, attachment method, concealed evidence and remaining glazing, joinery, door, lock or structural questions. Permanent alteration to verified protected fabric remains a separate decision.`,
        ],
        checks: ['Follow current police evidence instructions first', 'Confirm the exact site, controller and property status', 'Record supports, attachments and concealed damage'],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 2, 3],
        heading: 'Hillmorton upgrades with controller and protected fabric verified',
        body: [
          `An academy directory entry, the listed-door description at 81 High Street and the Hillmorton Locks map answer three different questions; none rates a lock. Identify the exact entrance and current controller, then inspect the leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports a complete-entrance assessment and correctly sized, accredited products, while actual markings, measurements and operation determine the available options.`,
          `At the academy, obtain approval for the precise facilities and keying scope. At number 81 or inside the verified Locks designation, photograph existing apertures and visible material before proposing cuts or substitutions, while keeping the two heritage records separate. The specification should distinguish adjustment, reinforcement and replacement, cite current product evidence and measured fit, record retained fabric, and list owner, academy, building-use, management or consent dependencies without claiming a universal Hillmorton solution.`,
        ],
        checks: ['Identify the current threshold controller', 'Inspect and measure the complete entrance', 'Apply each heritage record only to its exact place'],
      },
    },
  }),
  bilton: makeGuide({
    slug: 'bilton',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Rugby Borough Council records Bilton as a formerly separate village that merged into Rugby during the 1930s. Its conservation area covers only part of that former settlement rather than the whole Bilton route.`,
      `The appraisal's St Mark's Church and Bilton Hall dates apply only to those assets. A separate current council page identifies Alwyn Road Recreation Ground at CV22 7RD and records its named public facilities and Queen Elizabeth II Field designation.`,
    ],
    accessGuidance: `Provide the complete Bilton address, named site, exact affected threshold and present controller. CV22 7RD identifies the recreation ground, not a particular gate, changing room or authorised keyholder.`,
    evidenceLimits: `The sources establish a partial conservation boundary and facts about named historic buildings, a school and a recreation ground. They do not prove current title, caller authority, adjacent-property status, entrance construction, hardware, condition or access.`,
    facts: [
      {
        heading: 'Bilton village and conservation-area extent',
        text: `Bilton was once a separate village, merged into Rugby in the 1930s, and only part lies within the conservation area.`,
        sourceIds: ['rbc-bilton-appraisal'],
        serviceRelevance: `The limited designation requires an address check and cannot be extended to the whole modern Bilton route.`,
      },
      {
        heading: 'Bilton named historic buildings',
        text: `The appraisal records mid-fourteenth-century work at St Mark's Church and dates original Bilton Hall fabric to 1623.`,
        sourceIds: ['rbc-bilton-appraisal'],
        serviceRelevance: `Those asset-specific dates provide heritage anchors but cannot characterise a customer's building, door or hardware.`,
      },
      {
        heading: 'Bilton Infant School address',
        text: `Warwickshire County Council's school directory identifies Bilton Infant School as a community school at Magnet Lane, Rugby, Warwickshire CV22 7NH.`,
        sourceIds: ['wcc-bilton-infant-school'],
        serviceRelevance: `This facility record applies only to the named school; it proves no access authority, entrance arrangement, construction or lock details there or elsewhere in Bilton.`,
      },
      {
        heading: 'Alwyn Road Recreation Ground record',
        text: `Rugby Borough Council identifies Alwyn Road Recreation Ground at Rugby CV22 7RD, says it purchased the site in 1938 and records the 10.9-acre ground as a designated Queen Elizabeth II Field.`,
        sourceIds: ['rbc-alwyn-road-recreation-ground'],
        serviceRelevance: `The named-site record does not prove present title, an authorised keyholder, a particular entrance or hardware; calls there need an exact opening and current controller.`,
      },
    ],
    factOnlySourceIds: ['wcc-bilton-infant-school'],
    sources: [
      LOCAL_SOURCES['rbc-bilton-appraisal'],
      LOCAL_SOURCES['wcc-bilton-infant-school'],
      LOCAL_SOURCES['rbc-alwyn-road-recreation-ground'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 3],
        heading: 'Bilton lockouts with boundary and recreation-site checks',
        body: [
          `Bilton's conservation area covers only part of the former village, while the Alwyn Road page identifies one recreation ground at CV22 7RD. Neither record identifies a caller's locked door. Give the full address or named site, exact private, shared, gate or changing-room threshold and the person currently controlling it. Public recreation use and the council's 1938 purchase statement do not establish today's keyholder or authority for an opening.`,
          `After authority is tied to the exact threshold, record latch state, deadlocking, key behaviour and visible damage. Inside the mapped conservation area, photograph visible fabric before a method that might remove it; at the recreation ground, verify the present site contact rather than assuming council staff control every opening. Provide the available price basis before attendance and obtain agreement if the service-call price later changes, consistent with the cited MLA charter. Record any drilling, replacement and reinstatement as a separate inspected scope.`,
        ],
        checks: ['Give the exact Bilton site and opening', 'Check the conservation map when relevant', 'Identify the current controller, not only the landmark'],
      },
      'lock-change': {
        localFactIndexes: [1, 3],
        heading: 'Bilton lock changes at named heritage and recreation sites',
        body: [
          `St Mark's Church and Bilton Hall have asset-specific dates, while Alwyn Road Recreation Ground has its own named facilities and public-site record. None identifies hardware at the booked door. State the reason for change, photograph both hardware faces, the door edge and readable marks, then inspect cylinder, case, keep and alignment separately. Measurements and key-control needs—not the age or public status of another site—define a compatible replacement.`,
          `For work at a named historic asset or recreation facility, first identify the exact opening and present controller; the council page's purchase history and public-site description are not an individual authorisation. Distinguish an internal component change from fresh cutting or visible furniture substitution where protected fabric is verified. The scope should list retained material, measured product, keys, fitting and adjustment and keep site-management, shared-keying and consent decisions separate.`,
        ],
        checks: ['Define the reason and key-control need', 'Name the exact Bilton asset and controller', 'Record existing apertures, markings and dimensions'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 3],
        heading: 'Bilton multipoint diagnosis beyond map and site labels',
        body: [
          `Neither Bilton's partial conservation map nor the recreation-ground record proves that an entrance is uPVC, composite or fitted with a multipoint system. Confirm the exact address or Alwyn Road facility, door material and current controller. Then record key rotation, handle lift, locking-point travel and any safe difference when the leaf meets the frame. The 1938 purchase and field designation supply no mechanical evidence.`,
          `Capture the full faceplate, centres, backset and locking layout before identifying a compatible component. A later door may stand inside or outside the mapped area, while a recreation-site opening may have separate facilities control; keep those questions apart from diagnosis. If work extends into visible external material, describe it separately for address-specific review. The record should distinguish reported symptoms, reproduced tests and measurements without forcing the mechanism.`,
        ],
        checks: ['Confirm the exact site and door material', 'Record open and closed behaviour safely', 'Verify controller and faceplate geometry'],
      },
      'boarding-up': {
        localFactIndexes: [0, 3],
        heading: 'Bilton boarding with exact site and boundary recorded',
        body: [
          `A report at Alwyn Road must say whether damage affects changing rooms, another recreation-ground feature or an unrelated property. The council's site record supplies no suitable attachment location or current authoriser. Follow police directions, confirm the exact opening and controller, then photograph the point of entry, surviving frame, glazing or door, hardware and adjacent surfaces before covering them.`,
          `Check Bilton's partial conservation boundary for the exact address and record intact visible material when it applies; do not extend the map to the whole route. Define the temporary scope from inspected damage, not the field designation or village history. The completion note should identify attachment method, concealed material and outstanding glazing, joinery, door, lock or structural work. Permanent change to verified protected fabric remains a separate property-specific decision.`,
        ],
        checks: ['Follow police directions before covering damage', 'Confirm the precise site, opening and controller', 'Record map status, fixings and concealed damage'],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 3],
        heading: 'Measured Bilton upgrades without heritage or field assumptions',
        body: [
          `The dates of St Mark's Church and Bilton Hall and Alwyn Road's field designation provide no security rating. At the exact Bilton entrance, identify the controller and inspect the leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports reviewing the complete entrance and correctly sized, accredited products, while present marks, dimensions and condition—not the age or public use of another site—support an option.`,
          `At a named historic building or recreation facility, verify who controls the specific threshold and keying scope. Photograph existing apertures and visible material where protected fabric is confirmed, separating compatible internal work from new cutting or substitution. The specification should distinguish adjustment, reinforcement and replacement, state retained components, measured fit and current product evidence, and list management or consent dependencies without claiming a Bilton-wide solution.`,
        ],
        checks: ['Identify the current Bilton controller', 'Inspect leaf, frame and hardware together', 'Verify protected fabric, exact sizing and product evidence'],
      },
    },
  }),
  brownsover: makeGuide({
    slug: 'brownsover',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `The Old Brownsover appraisal describes a hamlet about one and a half miles north of Rugby whose conservation area includes Brownsover Hall, several houses, St Michael's Church and adjoining undeveloped land.`,
      `Separate official records identify Brownsover Community Association as operator of the Bow Fell community centre and give exact Grade II* entries for St Michael's Church and Brownsover Hall. Those records apply only to the named sites, not wider Brownsover.`,
    ],
    accessGuidance: `Provide the exact Brownsover address, named site or unit, affected entrance and current controller. A registered operator, listed-building entry or conservation map does not identify the individual authorised to approve lock work today.`,
    evidenceLimits: `Old Brownsover's map and the named community-centre, church and hall records are not coterminous with the wider route. They do not prove another property's status, construction, present condition, controller, door material, hardware or access.`,
    facts: [
      {
        heading: 'Old Brownsover conservation-area components',
        text: `Old Brownsover Conservation Area includes Brownsover Hall, a small group of houses, St Michael's Church and adjoining undeveloped land.`,
        sourceIds: ['rbc-old-brownsover-appraisal'],
        serviceRelevance: `The description applies to the mapped hamlet and must not be projected onto wider Brownsover development.`,
      },
      {
        heading: 'Brownsover Community Centre operator',
        text: `The Charity Commission's current register says Brownsover Community Association runs Brownsover Community Centre at Bow Fell, Rugby and supports Brownsover Youth Hut.`,
        sourceIds: ['charity-commission-brownsover-community-association-1199939'],
        serviceRelevance: `The register identifies the charity's role but not an individual authorised keyholder, lease terms, an affected threshold or fitted hardware.`,
      },
      {
        heading: 'St Michael Brownsover only-entrance record',
        text: `Historic England records the Brownsover Lane church of St Michael and All Angels as Grade II*, describes its only entrance as a pointed doorway with a nineteenth-century door and elaborate hinges, and includes legacy-generated history describing the church as redundant and vested in the Churches Conservation Trust.`,
        sourceIds: ['historic-england-st-michael-brownsover-1183659'],
        serviceRelevance: `This named-asset record is not a current condition, lock or operational-control survey; confirm the present authorised site contact independently and protect verified listed fabric.`,
      },
      {
        heading: 'Brownsover Hall exact listed record',
        text: `Historic England records Brownsover Hall at Leicester Road as Grade II* and its legacy description identifies a mid-nineteenth-century Gothic building with a named entrance-front composition and porch.`,
        sourceIds: ['historic-england-brownsover-hall-1365029'],
        serviceRelevance: `The entry applies only to the hall and is not a present-condition, use, access or lock survey; surrounding Brownsover properties do not inherit its status.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['rbc-old-brownsover-appraisal'],
      LOCAL_SOURCES['charity-commission-brownsover-community-association-1199939'],
      LOCAL_SOURCES['historic-england-st-michael-brownsover-1183659'],
      LOCAL_SOURCES['historic-england-brownsover-hall-1365029'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [1, 2],
        heading: 'Brownsover lockouts with operator and listed-door authority checked',
        body: [
          `The Charity Commission says Brownsover Community Association runs the Bow Fell community centre, but it does not name the person authorised to open or alter a particular door. A centre or Youth Hut call must give the exact threshold and current site contact. St Michael's is different again: Historic England records one entrance and includes a legacy statement that the church was vested in the Churches Conservation Trust. Confirm the present controller independently rather than treating that historical statement, public access or occasional use as permission.`,
          `After authority is linked to the correct opening, record latch state, deadlocking, key behaviour and visible damage. The listed church description is not a current lock survey and does not guarantee a non-destructive method. Photograph the door, frame and elaborate hinges before an intervention that might remove material. MLA guidance supports advance price information and agreement before a changed service-call price. Document drilling, replacement and reinstatement separately if inspection makes them necessary.`,
        ],
        checks: ['Name the exact Brownsover site and opening', 'Identify the current site controller independently', 'Prepare authority linked to that threshold'],
      },
      'lock-change': {
        localFactIndexes: [0, 2, 3],
        heading: 'Brownsover lock changes across mapped and individually listed fabric',
        body: [
          `Old Brownsover's mapped boundary, St Michael's only-entrance description and Brownsover Hall's listed entrance front are three distinct records. They do not identify hardware at another address or prove present condition at the two listed assets. Define the key-control or failure objective, then capture both hardware faces, the edge plate, existing apertures and readable marks. Inspect cylinder, case, keep and alignment separately; compatible dimensions and observed condition—not landmark proximity—support replacement.`,
          `At St Michael's, verify the present controller independently of the list entry and protect the recorded doorway and hinges. At Brownsover Hall, verify the exact listed building and present controller without assuming the legacy entrance description remains unchanged. Elsewhere in the mapped hamlet, check property status separately. The proposal should distinguish use of existing apertures from cutting or visible substitution and list retained parts, measured product, keys, fitting, adjustment and any consent or management decision.`,
        ],
        checks: ['State the reason for changing hardware', 'Verify the exact asset, map status and controller', 'Photograph apertures, markings and listed fabric'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: 'Brownsover uPVC diagnosis without operator or church-door assumptions',
        body: [
          `Neither the Brownsover Community Association register nor St Michael's listed doorway proves that an affected entrance is uPVC, composite or multipoint. Confirm the exact Bow Fell, church or other Brownsover threshold, its material and current controller. Then record key rotation, handle travel, locking-point movement and any safe difference when the leaf meets the frame. The charity's operator role and the church's nineteenth-century-door description identify no failed component.`,
          `Photograph the full faceplate and record centres, backset and locking layout before stating compatibility. At the community centre, association operation does not name the authorised facilities person. At St Michael's, the independently verified present site contact and protection of the listed doorway remain separate from mechanism diagnosis. The work record should distinguish reported symptoms, reproduced tests, dimensions, authority and any outward-fabric proposal, stopping rather than forcing resistance.`,
        ],
        checks: ['Verify the exact threshold, material and controller', 'Record locking movement precisely and safely', 'Measure the installed faceplate and layout'],
      },
      'boarding-up': {
        localFactIndexes: [0, 2, 3],
        heading: 'Brownsover boarding with two listed assets kept distinct',
        body: [
          `The Old Brownsover map does not describe damage. St Michael's official entry records one listed doorway and Brownsover Hall's legacy entry records a separate entrance front; neither is a condition survey. Follow police directions, identify the exact property and controller, then photograph the point of entry, remaining frame, glazing or door, hardware and adjacent surfaces. Do not transfer either asset's construction or status to another Brownsover opening.`,
          `At St Michael's, preserve evidence around the doorway and elaborate hinges and confirm the present controller independently of the legacy list-entry history. At Brownsover Hall, verify current condition and controller independently. Elsewhere, check the mapped conservation boundary only for the exact address. Define temporary support and coverage from inspection, record every fixing and concealed element, and list outstanding glazing, joinery, door, lock or structural work. Permanent alteration to verified listed or conservation fabric remains separate.`,
        ],
        checks: ['Follow police scene instructions first', 'Verify the exact listed or mapped property and controller', 'Document fixings, concealed elements and permanent work'],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 2, 3],
        heading: 'Brownsover upgrades with operator and listed-fabric decisions separated',
        body: [
          `The community association's operator role, St Michael's one listed entrance and Brownsover Hall's entrance-front description supply no security rating. Identify the exact threshold and current controller, then inspect the leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports a complete-entrance assessment and correctly sized, accredited products; present markings, measurements and condition determine options.`,
          `At Bow Fell, obtain approval from the person currently responsible for the affected centre or Youth Hut hardware. At St Michael's or Brownsover Hall, verify the exact listed asset and present controller, photograph existing apertures and fabric, and separate compatible internal work from cutting or visible substitution. The specification should distinguish adjustment, reinforcement and replacement, state measured fit and current product evidence, and record retained material, management, site-control or consent dependencies without a Brownsover-wide claim.`,
        ],
        checks: ['Identify the present Brownsover controller', 'Assess and measure the complete entrance', 'Record listed fabric and product evidence separately'],
      },
    },
  }),
  cawston: makeGuide({
    slug: 'cawston',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `The updated South West Rugby Masterplan Supplementary Planning Document became council-adopted planning guidance on 11 December 2024. It provides allocation-level context around Cawston, not the status of an individual address.`,
      `Warwickshire County Council's Rugby Bus Map is dated 30 August 2025 and labels Cawston, Cawston Lane and Cawston Grange Drive. Those labels provide orientation only and do not establish a service entrance or current access.`,
    ],
    accessGuidance: `Provide the complete Cawston postal address, building or unit, exact affected entrance, responsible controller and current gate, parking or roadwork instructions. Neither a planning allocation nor a county map can supply those booking details.`,
    evidenceLimits: `The masterplan describes broad, phased development with details that can change, while the county map supplies dated orientation. Neither source proves completed infrastructure, present routing, journey time, property status, tenure, construction, hardware, condition, demand or locksmith performance.`,
    facts: [
      {
        heading: 'South West Rugby masterplan adoption',
        text: `Rugby Borough Council adopted the updated South West Rugby Masterplan Supplementary Planning Document on 11 December 2024.`,
        sourceIds: ['rbc-south-west-rugby-spd-2024'],
        serviceRelevance: `The document is broad planning context; it cannot provide current access, threshold control or hardware details for an exact service address.`,
      },
      {
        heading: 'South West Rugby ownership and infrastructure',
        text: `The adopted masterplan records multiple ownerships and says preferred infrastructure locations may vary as detailed work and evidence develop.`,
        sourceIds: ['rbc-south-west-rugby-spd-2024'],
        serviceRelevance: `This supports requesting current access instructions only; it cannot identify a property's controller, completed route or attendance time.`,
      },
      {
        heading: 'Cawston bus-map road labels',
        text: `Warwickshire County Council's Rugby Bus Map, dated 30 August 2025, labels Cawston separately and names Cawston Lane and Cawston Grange Drive.`,
        sourceIds: ['wcc-rugby-bus-map-2025'],
        serviceRelevance: `The map is orientation evidence only, so a booking still needs the full street, postcode, unit and affected entrance.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['rbc-south-west-rugby-spd-2024'],
      LOCAL_SOURCES['wcc-rugby-bus-map-2025'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        heading: 'Cawston lockouts with the exact entrance confirmed',
        body: [
          `The county map distinguishes Cawston for orientation but cannot identify the customer's locked opening. Record the complete postal address, building or unit, exact private or shared entrance, live gate or parking instructions and the person controlling that threshold. Verify identity and authority for that opening before assessing latch position, deadlocking, key behaviour, door alignment and visible damage. None of those mechanical findings can be supplied by a map label.`,
          `The adopted masterplan is allocation-level evidence, and its developing infrastructure details cannot establish present access or property status. Ask the caller for current approach restrictions. Before an opening method removes a component or marks surrounding material, photograph the door and state the selected method, affected component and reinstatement. MLA guidance supports verifying identity and authority and giving available price information in advance. Obtain agreement before a changed service-call price applies.`,
        ],
        checks: ['Record the full Cawston address and unit', 'Verify authority for the precise threshold', 'Obtain current gate and access instructions'],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        heading: 'Cawston lock changes tied to one controlled threshold',
        body: [
          `Cawston's position on the county map does not identify a lock, keying arrangement or compatible component. Attach the full address and unit to the exact threshold, define whether the objective is key control, repair or replacement, and photograph both hardware faces, the door edge and readable marks. Inspect the cylinder, lock case, keep, furniture and alignment separately, using measured geometry and observed operation rather than locality to decide what can remain.`,
          `The masterplan's reference to multiple ownerships cannot establish who controls a customer's private or common entrance. Confirm that authority directly before keys or hardware change, and obtain current access instructions for the visit. Keep measured component work separate from any proposed change to the door or frame. The written schedule should identify retained components, measured replacements, supplied keys, fitting, adjustment and any separately approved building-management dependency.`,
        ],
        checks: ['Link the change objective to one entrance', 'Measure each proposed replacement component', 'Confirm the current shared-door controller'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [1, 2],
        heading: 'Cawston multipoint repairs from measured door behaviour',
        body: [
          `Neither the Rugby map nor the masterplan establishes that a Cawston entrance is uPVC, composite or fitted with a multipoint mechanism. Identify the exact unit and door, confirm its material, and record key rotation, handle travel, locking-point movement and the difference between open-door and closed-door operation. Faceplate marks, centres, backset, locking layout and frame contact must be measured before alignment work or a compatible part is proposed.`,
          `Because preferred infrastructure details can change, use the planning source only as a prompt to collect current gate, parking or site-access instructions, never as routing or timing evidence. Establish the present controller of the affected private, communal or managed threshold before removing components. If the repair would extend beyond the mechanism into the door or frame, document that separately. The diagnostic record should separate reported symptoms, safe tests, measurements, authority and the approved repair scope.`,
        ],
        checks: ['Confirm the material at the booked door', 'Compare open and closed locking movement', 'Capture faceplate centres and backset measurements'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        heading: 'Cawston boarding scoped at the identified opening',
        body: [
          `The county map can orient Cawston, but a boarding instruction must identify the complete address, building or unit, damaged opening, responsible controller and live approach restrictions. Follow any police scene directions before measuring or covering material. Photograph the point of entry, surviving frame, door or glazing, damaged hardware and adjacent surfaces, then record safe dimensions and attachment questions. Map labels provide none of this scene-specific evidence.`,
          `The updated masterplan describes planned, phased change and cannot confirm completed roads, present access or an individual property's constraints. Obtain current site instructions and confirm the affected opening and temporary scope with the responsible person. Define the temporary coverage from inspected damage at that opening. The completion note should distinguish concealed material, temporary work and outstanding glazing, joinery, door, lock or structural assessment so permanent decisions remain evidence-led.`,
        ],
        checks: ['Identify every opening at the exact property', 'Preserve scene evidence before temporary covering', 'Record live access and the temporary scope'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 2],
        heading: 'Cawston upgrades specified for the present door set',
        body: [
          `The council planning document and county map provide no security rating for a Cawston entrance. Inspect the booked door leaf, frame, hinges, keeps, handles, lock engagement, protective furniture and cylinder fit as one assembly. Warwickshire Police guidance supports a complete-door review and correctly sized, accredited products, but the option still depends on current markings, dimensions and operation. Locality evidence cannot establish fitted hardware, weakness, condition or a guaranteed outcome.`,
          `Use the adopted masterplan only to recognise that broad planning context is not an address-level property record. Confirm the controller of communal or managed hardware before changing it. The specification should separate adjustment, reinforcement and replacement, cite current manufacturer evidence, state measured fit and record any access or building-management dependency. It must remain specific to the inspected entrance rather than becoming a Cawston-wide product recommendation.`,
        ],
        checks: ['Assess the complete booked door assembly', 'Match accredited evidence to measured fit', 'Confirm control of shared or managed hardware'],
      },
    },
  }),
  'long-lawford': makeGuide({
    slug: 'long-lawford',
    summary: [
      `Historic England lists Lawford Hill Farmhouse at Grade II and records its main range as probably late eighteenth century with wings added around 1835. That designation applies only to the named farmhouse.`,
      `The Grade II Church of St John on Chapel Street is dated 1839 and attributed to William Walker. Rugby Borough Council also includes Long Lawford allocation evidence within its adopted 2011-2031 Local Plan.`,
    ],
    accessGuidance: `Provide the complete Long Lawford address and exact entrance. Lawford Hill Farmhouse, St John's Church and the Main Rural Settlement planning reference are orientation evidence, not property-access instructions or route boundaries.`,
    evidenceLimits: `The list entries designate two named assets, while the planning page records an area-level allocation context. None establishes another property's age, status, tenure, construction, door hardware, access or service circumstances.`,
    facts: [
      {
        heading: 'Lawford Hill Farmhouse Grade II listing',
        text: `Lawford Hill Farmhouse is Grade II listed, with a probably late-eighteenth-century main range and wings added around 1835.`,
        sourceIds: ['historic-england-lawford-hill-farmhouse-1299648'],
        serviceRelevance: `The designation and phases apply only to the named farmhouse and cannot characterise nearby Long Lawford properties.`,
      },
      {
        heading: 'Long Lawford St John Grade II listing',
        text: `The Grade II Church of St John on Chapel Street dates from 1839 and is attributed to William Walker.`,
        sourceIds: ['historic-england-st-john-long-lawford-1299647'],
        serviceRelevance: `The church record provides a named heritage anchor but no evidence about neighbouring buildings, doors or locks.`,
      },
      {
        heading: 'Long Lawford local-plan allocation',
        text: `Rugby Borough Council adopted its Local Plan 2011-2031 in 2019 and lists Long Lawford Main Rural Settlement allocation evidence.`,
        sourceIds: ['rbc-local-plan-2011-2031'],
        serviceRelevance: `The planning classification requires current-map context and cannot establish the status or construction of an individual address.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['historic-england-lawford-hill-farmhouse-1299648'],
      LOCAL_SOURCES['historic-england-st-john-long-lawford-1299647'],
      LOCAL_SOURCES['rbc-local-plan-2011-2031'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1, 2],
        heading: 'Long Lawford lockouts with named listings kept specific',
        body: [
          `The listed farmhouse and church are exact assets, while the Main Rural Settlement reference is planning context; none identifies a caller's locked door. Give the full Long Lawford address, precise private or shared threshold and person controlling it. Authority can then be checked for that opening before latch state, deadlocking, key behaviour and existing damage guide inspection. A nearby listed name or Chapel Street reference supplies no technical access evidence.`,
          `If the address is one of the named listed assets or current records reveal another designation, photograph visible fabric before approving a method that could remove material. Otherwise, do not extend those listings to nearby premises. Explain any scope change found during inspection before work continues at the named asset or other verified address. MLA guidance supports proof of identity and authority, available advance price information and agreement if the service-call price changes. Any drilling or component replacement should be documented with reinstatement separately, and a wider alteration to protected material should remain a property-specific next decision rather than an inference from Long Lawford's planning classification.`,
        ],
        checks: ['Give the exact Long Lawford address', 'Check named listing only when applicable', 'Prepare authority for the specific threshold'],
      },
      'lock-change': {
        localFactIndexes: [0, 1, 2],
        heading: 'Long Lawford lock changes without extending listed status',
        body: [
          `Dates attached to Lawford Hill Farmhouse and St John's Church do not identify hardware elsewhere. Define whether the change concerns lost keys, failure or damage and photograph both hardware faces, the edge plate and readable marks. For the inspected door, assess cylinder, lock case, keep and alignment separately and retain a component only on its observed condition; the two named listings and settlement allocation cannot decide that. Exact measurements and key-control needs support compatibility; the Main Rural Settlement label and named-asset ages support no product choice.`,
          `At a named listed asset or another verified protected property, distinguish a replacement within existing apertures from new cutting or visible furniture change. That frames preservation and specialist advice. A common entrance also requires the person responsible for its keys and hardware. The schedule should list retained elements, measured product, keys, fitting and adjustment and flag any external-fabric or building-management issue separately, avoiding a blanket rule for Long Lawford based on two list entries.`,
        ],
        checks: ['State the key-control or failure purpose', 'Record exact markings and dimensions', 'Apply listings only to named assets'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1, 2],
        heading: 'Long Lawford multipoint diagnosis from present door evidence',
        body: [
          `The listed farmhouse, church and planning allocation do not establish that an affected Long Lawford door is uPVC or composite. Confirm the material, then record key rotation, handle travel, locking-point movement and any change against the frame. Keep that movement sequence as evidence of this Long Lawford door's behaviour; the farmhouse, church and planning allocation identify no failed component. Faceplate marks, centres, backset and locking layout remain required before any compatible part is identified.`,
          `A later door may exist at a listed or unlisted property, so mechanism age and property status must not be conflated. Check the exact address and identify who controls a private, shared or managed threshold before dismantling hardware. If repair reaches visible protected material, describe that extension for appropriate advice. The work record should preserve separate findings for symptoms, measurements, authority and designation, never transferring the farmhouse or church dates to the service door.`,
        ],
        checks: ['Confirm the actual door construction', 'Record operation with the door open and closed safely', 'Check address status and controller separately'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        heading: 'Temporary boarding in Long Lawford with named assets distinguished',
        body: [
          `The farmhouse and church list entries cannot describe damage at another Long Lawford address. If police have issued evidence-preservation directions for the reported scene, follow them before photographing, measuring or covering the point of entry, remaining frame, glazing or door, compromised lock and adjacent material. Confirm the exact threshold, responsible person and whether any named or separately verified designation applies. Those current observations document the opening without converting an area-level planning classification into structure or incident evidence.`,
          `At a listed asset, record surviving protected fabric before temporary work, using property-specific specialist guidance where required. At other addresses, assess the opening on its own evidence. The completion record should distinguish material covered at the actual opening from unresolved glazing, joinery, door, lock or structural work; neither named listing supplies that incident evidence. This keeps temporary security separate from permanent alteration and prevents the two listed examples from becoming a Long Lawford-wide installation assumption.`,
        ],
        checks: ['Follow police evidence guidance first', 'Verify whether a named listing applies', 'Document the temporary scope and concealed damage'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        heading: 'Long Lawford security planning with asset-specific checks',
        body: [
          `The two listed-building records and Main Rural Settlement evidence do not rate security at a Long Lawford entrance. Because the two named listings and settlement allocation do not describe another doorway, review its leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection as one entrance. The cited police guidance supports that complete-entrance review and consideration of correctly sized, accredited products, while the asset dates remain irrelevant to product choice. Current markings, measurements and operation can support options, while alignment, frame condition and shared control remain explicit rather than being inferred from planning or building age.`,
          `At Lawford Hill Farmhouse, St John's Church or another verified protected property, photograph visible hardware and existing apertures before proposing outward change. Internal compatible improvements and fabric alteration should follow separate decisions. Common or managed thresholds also require their controller's constraints. The specification should record retained material, product testing evidence, measured fit and dependencies, explaining conditional resistance gains without implying that one certified product applies throughout Long Lawford or guarantees complete protection.`,
        ],
        checks: ['Assess the entire current entrance', 'Keep list entries specific to their named assets', 'Verify product evidence and measured fit'],
      },
    },
  }),
  'new-bilton': makeGuide({
    slug: 'new-bilton',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Rugby Borough Council confirmed an HMO Article 4 Direction on 25 September 2024, and it came into force on 23 February 2025 within a defined area that includes New Bilton ward.`,
      `The council's September 2024 Local Centres Study analysed New Bilton Inner and New Bilton Outer separately. Those are candidate study areas, not formal service boundaries or evidence about an individual property.`,
    ],
    accessGuidance: `Provide the complete New Bilton postal address, building or unit, exact affected entrance, responsible controller and current access instructions. Neither a ward-level planning control nor the study's Inner and Outer labels can identify the booked threshold.`,
    evidenceLimits: `The Article 4 record concerns a narrowly defined planning change, while the Local Centres Study uses analytical candidate areas. Neither proves that an address is an HMO, rented, shared or managed, or establishes ownership, access, construction, hardware, condition, demand, routing or locksmith performance.`,
    facts: [
      {
        heading: 'New Bilton HMO Article 4 timeline',
        text: `Rugby Borough Council confirmed the HMO Article 4 Direction on 25 September 2024, with effect from 23 February 2025 in a defined area including New Bilton ward.`,
        sourceIds: ['rbc-new-bilton-hmo-article-4'],
        serviceRelevance: `Ward inclusion cannot establish an individual address's use or status, which requires an exact-property check where relevant.`,
      },
      {
        heading: 'New Bilton C3-to-C4 rule in the defined Article 4 area',
        text: `Within the direction's defined area, a proposed change from a C3 dwelling house to a small C4 HMO requires planning permission.`,
        sourceIds: ['rbc-new-bilton-hmo-article-4'],
        serviceRelevance: `This narrow use-control fact does not prove tenure or shared access; authority must be confirmed from the caller's actual circumstances.`,
      },
      {
        heading: 'New Bilton study-area labels',
        text: `The September 2024 Local Centres Study assessed New Bilton Inner and New Bilton Outer as separate candidate locations.`,
        sourceIds: ['rbc-local-centres-study-2024'],
        serviceRelevance: `These analytical labels are not booking boundaries, so the full street, postcode, unit and exact entrance remain necessary.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['rbc-new-bilton-hmo-article-4'],
      LOCAL_SOURCES['rbc-local-centres-study-2024'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 2],
        heading: 'New Bilton lockouts identified by address and entrance',
        body: [
          `The Local Centres Study separates New Bilton Inner and Outer for analysis, but those labels cannot locate a customer's locked door. Record the full postal address, building and unit, exact private or shared entrance, current access instructions and the person controlling that opening. Verify identity and authority for the threshold before comparing latch state, deadlocking, key behaviour, alignment and visible damage. The study supplies no mechanical or property conclusion.`,
          `New Bilton's inclusion in the Article 4 area does not show that a particular address is an HMO, shared, rented or managed. Before an opening method removes a component or marks surrounding material, photograph the actual door. Under the cited MLA service-call guidance, verify identity and authority and communicate available price information in advance. If the service-call price changes, obtain agreement before it applies. Record any drilling, component work and reinstatement, with common-door approval treated as a separate authority check.`,
        ],
        checks: ['Capture the complete New Bilton unit address', 'Verify control of the locked threshold', 'Record component removal and reinstatement'],
      },
      'lock-change': {
        localFactIndexes: [1, 2],
        heading: 'New Bilton lock changes with authority recorded first',
        body: [
          `The Inner and Outer study areas do not identify property type, key control or fitted hardware. Tie the request to the complete New Bilton address, unit and affected threshold, then define whether the objective is lost-key control, repair or replacement. Photograph both faces, the door edge and readable marks. Inspect the cylinder, lock case, keep, furniture and alignment separately, and use measurements plus observed operation to select compatible work.`,
          `The Article 4 rule concerns a proposed C3-to-C4 use change; it does not establish tenure, management or authority for locksmith work. If the caller independently identifies a common or managed entrance, confirm the current controller before changing hardware or keys. Keep component work separate from any proposed change to the door or frame. The written schedule should list retained parts, measured replacements, supplied keys, fitting, adjustment and any separately authorised building-management requirement.`,
        ],
        checks: ['State the key-control reason precisely', 'Measure the hardware at the named unit', 'Obtain approval for common-door changes'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 2],
        heading: 'New Bilton multipoint diagnosis at the booked door',
        body: [
          `Neither the Local Centres Study nor the Article 4 page shows that a New Bilton entrance is uPVC, composite or fitted with a multipoint system. Confirm the material at the exact unit, then record key rotation, handle travel, locking-point movement and differences between open-door and closed-door operation. Capture faceplate markings, centres, backset, locking layout, hinge position and frame contact before diagnosing alignment or identifying a compatible mechanism.`,
          `A ward-level planning control cannot reveal whether the affected threshold is private, communal or managed. Establish that arrangement and the responsible controller directly before components are removed; do not infer HMO use or tenure from the direction. If the repair extends beyond the mechanism into the door or frame, document that separately. The diagnostic record should separate symptoms, safe tests, dimensions, authority and the inspection-supported repair decision.`,
        ],
        checks: ['Verify material at the precise entrance', 'Compare locking movement against the frame', 'Measure the installed multipoint layout'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 2],
        heading: 'New Bilton boarding defined by scene and authority',
        body: [
          `New Bilton Inner and Outer are study labels, not dispatch boundaries. The instruction must give the complete address, building or unit, each damaged opening, live approach restrictions and the person authorising temporary work. Follow police scene directions before measuring or covering material. Photograph the point of entry, surviving frame, door or glazing, compromised hardware and adjacent surfaces, then record dimensions and safe attachment questions for that specific opening.`,
          `The Article 4 direction describes a limited planning control, not damage, construction or access at the scene. Where the caller identifies shared or managed premises, verify the responsible controller instead of inferring an HMO arrangement from the ward. Confirm the affected opening and temporary scope with that controller before covering material. The completion record should distinguish covered evidence, temporary scope and outstanding glazing, joinery, door, lock or structural work requiring later approval.`,
        ],
        checks: ['List each damaged New Bilton opening', 'Confirm current scene and access instructions', 'Separate temporary covering from permanent repair'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1, 2],
        heading: 'New Bilton upgrades matched to one verified entrance',
        body: [
          `The planning direction and Local Centres Study provide no security evidence for New Bilton doors. Assess the identified entrance across its leaf, frame, hinges, keeps, handles, lock engagement, protective furniture and cylinder fit. Warwickshire Police guidance supports reviewing the complete assembly and correctly sized, accredited products, while actual marks, measurements and operation determine the available options. No local hardware, weakness, condition or outcome can be inferred from either council record.`,
          `Article 4 coverage does not show that the property is an HMO or that its entrance is shared; the Inner and Outer labels do not settle that question either. Confirm the responsible controller before changing communal or managed hardware. The specification should separate adjustment, reinforcement and replacement, cite current manufacturer evidence, document measured fit and list access or building-management dependencies requiring distinct approval. Recommendations remain specific to the inspected door set.`,
        ],
        checks: ['Inspect the complete identified door set', 'Match accreditation to measured installation details', 'Verify control of shared or managed hardware'],
      },
    },
  }),
  dunchurch: makeGuide({
    slug: 'dunchurch',
    reviewedOn: PROMOTION_REVIEWED_ON,
    summary: [
      `Dunchurch Conservation Area occupies the historic crossroads core and includes the commercial centre, open spaces and a later housing area to the north. Its mapped extent does not cover the entire route.`,
      `The scheduled standing cross and registered Dunchurch Lodge landscape have separate boundaries. A current council page also identifies Dunchurch Heath at The Heath as a 2.45-acre village green maintained by its Parks and Cemeteries department.`,
    ],
    accessGuidance: `Provide the exact Dunchurch property or named site, affected opening and current controller and check each relevant map separately. The Heath landmark and council maintenance wording do not identify a building entrance or authorise work.`,
    evidenceLimits: `The conservation area, scheduled cross, registered landscape, community library and Heath record describe distinct places. They do not prove legal ownership, caller authority, neighbouring status, construction, hardware, present condition or access.`,
    facts: [
      {
        heading: 'Dunchurch conservation-area extent',
        text: `Dunchurch Conservation Area covers the historic crossroads core, commercial centre, open spaces and a later northern housing area.`,
        sourceIds: ['rbc-dunchurch-appraisal'],
        serviceRelevance: `The mapped extent must be checked for the exact address and cannot be applied across the whole route.`,
      },
      {
        heading: 'Dunchurch standing cross and registered landscape',
        text: `The appraisal identifies the central medieval standing cross as scheduled and part of Dunchurch Lodge's registered landscape to the north-east.`,
        sourceIds: ['rbc-dunchurch-appraisal'],
        serviceRelevance: `The separately bounded assets require their own records and cannot confer status on surrounding buildings.`,
      },
      {
        heading: 'Dunchurch Community Library address',
        text: `Warwickshire County Council identifies Dunchurch Community Library at The Green, Dunchurch, Rugby CV22 6PA and states that it is run by Dunchurch Parish Council.`,
        sourceIds: ['wcc-dunchurch-library'],
        serviceRelevance: `This facility record applies only to the named library; it cannot establish access authority, entrance condition, construction or hardware there or at another Dunchurch property.`,
      },
      {
        heading: 'Dunchurch Heath maintenance record',
        text: `Rugby Borough Council identifies Dunchurch Heath Open Space at The Heath and says its Parks and Cemeteries department maintains the 2.45-acre village green, which the council has looked after since 1971.`,
        sourceIds: ['rbc-dunchurch-heath-open-space'],
        serviceRelevance: `Maintenance wording and a public-space record do not prove legal title, an authorised keyholder, a building or hardware; any site call needs an exact opening and present controller.`,
      },
    ],
    factOnlySourceIds: ['wcc-dunchurch-library'],
    sources: [
      LOCAL_SOURCES['rbc-dunchurch-appraisal'],
      LOCAL_SOURCES['wcc-dunchurch-library'],
      LOCAL_SOURCES['rbc-dunchurch-heath-open-space'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 3],
        heading: 'Dunchurch lockouts with map and Heath site separated',
        body: [
          `The conservation map covers a defined crossroads core, while the council identifies Dunchurch Heath as a separate village green at The Heath. Neither identifies a locked door. Give the complete property or named site, exact private, shared or site threshold and current responsible person. Parks and Cemeteries maintenance of the green is not authority to open an adjacent structure, and the public-space record provides no building or keyholder.`,
          `After authority is linked to the exact opening, record latch state, deadlocking, key behaviour and existing damage. If the address is inside the mapped conservation area, photograph visible fabric before approving a method that could remove it; do not extend that boundary from the Heath landmark. State the available price basis before travelling and seek fresh agreement if the service-call price changes, following the cited MLA charter. Record drilling, replacement and reinstatement separately and reserve protected-fabric changes for property-specific review.`,
        ],
        checks: ['Give the exact Dunchurch site and opening', 'Check the conservation map only for that property', 'Identify the current controller rather than relying on maintenance wording'],
      },
      'lock-change': {
        localFactIndexes: [1, 3],
        heading: 'Dunchurch lock changes with monument and Heath control separated',
        body: [
          `The scheduled standing cross and registered Dunchurch Lodge landscape are separately bounded assets; the Heath page describes maintenance of a village green. None identifies hardware at a service door. State whether the change concerns key control, failure or damage, then photograph both hardware faces, the edge plate, existing apertures and readable marks. Inspect cylinder, case, keep and alignment separately, using present dimensions and condition—not monument or green context—for compatibility.`,
          `For a call at The Heath, identify the exact structure or adjoining property and present controller; Parks and Cemeteries maintenance does not authorise lock changes. At a verified protected address, apply only the correct boundary and distinguish use of existing apertures from new cutting or visible substitution. The written scope should list retained parts, measured product, keys, fitting and adjustment and keep management, landscape, monument or consent questions separate.`,
        ],
        checks: ['Define the lock-change objective', 'Identify the exact site and current controller', 'Record apertures, markings and only the applicable status'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 3],
        heading: 'Dunchurch uPVC diagnosis without map or green assumptions',
        body: [
          `Neither Dunchurch's conservation map nor the Heath open-space record proves that an affected entrance is uPVC, composite or multipoint. Confirm the exact property or site, door material and current controller. Record in order how far the key turns, how the handle travels, whether locking points move and what safely changes as the leaf meets the frame. The council's maintenance and acreage statements identify no building, mechanism or failed component.`,
          `Capture full faceplate marks, centres, backset and locking layout before stating compatibility. A later door may sit inside or outside the historic core, while an opening near The Heath may belong to an unrelated property; check each question directly. If repair extends into visible external material, describe that scope separately for exact-address review. The diagnostic record should separate reported symptoms, reproduced tests, dimensions, authority and map status without forcing the mechanism.`,
        ],
        checks: ['Confirm the exact site and door system', 'Record operation against the frame safely', 'Verify controller, dimensions and relevant boundary separately'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1, 3],
        heading: 'Dunchurch boarding with four contexts kept separate',
        body: [
          `Dunchurch's conservation core, scheduled cross, registered landscape and Heath village green are distinct records and none describes damage. Follow police directions before photographing, measuring or covering the point of entry, surviving frame, glazing or door, hardware and surrounding material. At The Heath, distinguish any damaged site feature from the recorded memorial plaque and adjoining premises and identify the current controller; maintenance wording supplies neither authority nor an attachment assessment.`,
          `Check only the boundary relevant to the exact opening and record intact protected material before temporary work. Define opening measurements, support and attachment from inspection, not the crossroads, monument or green description. The completion record should state what was covered, every fixing, remaining exposure and unresolved glazing, joinery, door, lock or structural work. Permanent alteration remains a separate decision under the correct property or asset record.`,
        ],
        checks: ['Follow current police evidence instructions first', 'Verify the exact site, controller and applicable record', 'Document supports, fixings and concealed damage'],
      },
      'lock-upgrade': {
        localFactIndexes: [1, 3],
        heading: 'Dunchurch upgrades with asset status and maintenance kept distinct',
        body: [
          `The standing cross, registered landscape and council-maintained Heath supply no security rating for a Dunchurch entrance. Identify the exact property or site and current controller, then inspect the leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports complete-entrance assessment and correctly sized, accredited products; current marks, measurements and operation—not monument prominence or open-space maintenance—support options.`,
          `Before an outward change, apply only the designation or asset record relevant to that address. At The Heath, maintenance by a council department does not settle ownership or key authority for a structure; obtain direct approval. Photograph existing apertures and visible material where protected fabric is verified. The specification should separate adjustment, reinforcement and replacement, state retained fabric, measured fit and current product evidence, and list management or consent dependencies without a Dunchurch-wide claim.`,
        ],
        checks: ['Identify the current Dunchurch controller', 'Inspect and measure the complete entrance', 'Keep asset records and product evidence separate'],
      },
    },
  }),
} satisfies Partial<Record<AreaSlug, GovernedAreaGuide>>
