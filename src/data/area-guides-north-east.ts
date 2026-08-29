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
  'nbbc-horestone-grange-woodlands-walk': {
    id: 'nbbc-horestone-grange-woodlands-walk',
    title: 'Horestone Grange Woodlands Walk',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://www.nuneatonandbedworth.gov.uk/directory-record/4305/horestone-grange-woodlands-walk',
    supports: 'The council directory address, local-park classification and surfaced-footpath facility for Horestone Grange Woodlands Walk.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'wcc-list-of-streets-2026': {
    id: 'wcc-list-of-streets-2026',
    title: 'List of Streets maintained at public expense, produced 11 August 2026',
    publisher: 'Warwickshire County Council',
    url: 'https://api.warwickshire.gov.uk/documents/WCCC-930-12',
    supports: 'The 11 August 2026 county street-to-locality labels, including selected Attleborough, Stockingford, Weddington, Horeston Grange and Camp Hill entries, Camp Hill Road\'s blank locality, and Bermuda-labelled roads in Nuneaton.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
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
    supports: 'The plan adopted on 10 December 2025, including the Camp Hill-Copper Beech Road district-centre entry and Strategic Policy DS5\'s bounded wider Bermuda Park employment context.',
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
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
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
  'rbc-old-brownsover-appraisal': {
    id: 'rbc-old-brownsover-appraisal',
    title: 'Old Brownsover Conservation Area Appraisal',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/documents/20124/6569677/Old_Brownsover_Character_Appraisal.pdf/9d9a8cf5-3463-f265-16b6-f895e398c2c6?t=1750866416445',
    supports: 'The limited Old Brownsover designation, named components and historic canal and highway context.',
    checkedOn: REVIEWED_ON,
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
  'warwickshire-her-horeston-grange-house': {
    id: 'warwickshire-her-horeston-grange-house',
    title: 'Site of post-medieval or later house at Horeston Grange, record MWA6260',
    publisher: 'Warwickshire Historic Environment Record',
    url: 'https://timetrail.warwickshire.gov.uk/detail.aspx?monuid=WA6260',
    supports: 'The named Horeston Grange historic-environment record, its house-site classification and post-medieval to industrial period.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
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
    { q: 'What do the Horeston Grange records identify?', a: `They identify a council local park at Launceston Drive and several county street-locality entries. They do not establish a property type, entrance arrangement or hardware specification.` },
    { q: 'What current evidence is needed for a Horeston Grange booking?', a: `The exact property and threshold, responsible person, door images, lock markings and observable fault are needed before authority, diagnosis and scope can be assessed.` },
  ],
  whitestone: [
    { q: 'What does the Whitestone street evidence establish?', a: `The county register assigns selected streets to the Whitestone locality in Nuneaton. It does not supply a complete neighbourhood boundary or any property-level facts.` },
    { q: 'What should a Whitestone caller provide instead of a centre name?', a: `Provide the complete current address, exact entrance, controller and hardware photographs, plus a clear sequence of what the key, handle and door are doing.` },
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

const HUB_CONTEXT_ONLY_LOCALITY_PATTERNS: Partial<Record<AreaSlug, RegExp>> = {
  'horeston-grange': /\b(?:woodlands walk|public-space|park directory|street register|county register|highway labels|locality records)\b/i,
}

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
]>> = {
  'horeston-grange': [
    (serviceLabel, checks, context) => `Treat the ${serviceLabel} instruction as a threshold-control problem with a named opening and decision-maker. ${checks[0]} ${checks[1]} Identify who controls ${context.controlledSubject} before any intervention, and record which person supplied each instruction.`,
    (serviceLabel, checks, context) => `Make the ${serviceLabel} handover usable to the person controlling that threshold. ${checks[2]} Describe ${context.issue}, the inspection still required and anything excluded from the proposed scope. Record ${context.outcomes}, including later repair or approval questions and the basis of the expected price.`,
  ],
}

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
    serviceEvidenceMode: 'hub-context-only',
    summary: [
      `Nuneaton and Bedworth Borough Council lists Horestone Grange Woodlands Walk as a local park at Launceston Drive, Nuneaton, with surfaced footpaths. That public-space record does not define the surrounding locality.`,
      `Warwickshire County Council's street register, produced on 11 August 2026, assigns selected entries such as Crediton Close, Seaton Close and St Ives Way to Horeston Grange, Nuneaton. It is not a property inventory.`,
    ],
    accessGuidance: `Give the exact present Horeston Grange address and affected door, not merely the Woodlands Walk or one street from the county register. Identify whether the opening is private, common or managed and who controls it.`,
    evidenceLimits: `The sources are a public-park directory entry, a current highway-locality register and one site-specific historic record, not property-access or tenure records. They prove no access arrangement, building construction, door material, mechanism, service history or demand, and the historic record cannot be transferred to another address.`,
    facts: [
      {
        heading: 'Horestone Grange Woodlands Walk',
        text: `The borough council lists Horestone Grange Woodlands Walk as a local park at Launceston Drive with surfaced footpaths.`,
        sourceIds: ['nbbc-horestone-grange-woodlands-walk'],
        serviceRelevance: `This public-space entry can assist orientation but cannot define a private property, locality boundary or entrance.` ,
      },
      {
        heading: 'Horeston Grange county street entries',
        text: `The county street register produced on 11 August 2026 assigns Crediton Close, Seaton Close and St Ives Way to Horeston Grange, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `Those selected highway labels can support address checking but supply no evidence about hardware, access or service needs.`,
      },
      {
        heading: 'Horeston Grange historic house site',
        text: `The Warwickshire Historic Environment Record identifies a named post-medieval or later house site at Horeston Grange, record MWA6260.`,
        sourceIds: ['warwickshire-her-horeston-grange-house'],
        serviceRelevance: `This site-specific historic record cannot describe another Horeston Grange property, confer designation or establish present access, construction or hardware.`,
      },
    ],
    factOnlySourceIds: ['warwickshire-her-horeston-grange-house'],
    sources: [
      LOCAL_SOURCES['nbbc-horestone-grange-woodlands-walk'],
      LOCAL_SOURCES['wcc-list-of-streets-2026'],
      LOCAL_SOURCES['warwickshire-her-horeston-grange-house'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Identifying the exact Horeston Grange door during a lockout',
        body: [
          `The Woodlands Walk and selected street-locality entries cannot identify a present Horeston Grange entrance. A caller should provide the full address, unit or floor where relevant, door position and responsible contact. That preparation distinguishes a private lock from a common threshold before authority is checked. Only then should the locksmith assess whether the door closed on a latch, was deadlocked or has a key or mechanism failure requiring a different opening decision.`,
          `The park and street sources do not establish heritage status, so visual age should prompt documentation and a current record check rather than an assumption. If opening would remove a lock component or mark surrounding material, explain the exact intervention and its reinstatement separately. Record the resulting method and scope from inspection rather than assigning them to the MLA source. MLA guidance supports identity-and-authority checks, available price information in advance and agreement if that service-call price later changes. The final method follows the inspected hardware and condition, while any external-fabric question remains with present property evidence and the controller.`,
        ],
        checks: ['Identify the exact unit and threshold', 'Prepare proof linked to that entrance', 'Photograph fabric before destructive work'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Horeston Grange lock changes based on mechanism and purpose',
        body: [
          `A public-park record and highway-locality labels say nothing about the lock fitted at a Horeston Grange address. Define whether the change concerns lost keys, a reported failure, damage or another agreed objective. Photographs of the handles, edge plate and readable markings prepare an inspection in which cylinder, case, keep and alignment remain separate questions; the reported symptom does not identify a component. Any decision to retain or replace material should follow observed condition and measurements instead of an assumed building type derived from locality sources.`,
          `For a common entrance, identify the person responsible for shared keying before changing hardware; a unit occupier's authority may relate only to the private threshold. The cited sources provide no current property-status answer, so check separately if the proposal affects visible material. A clear schedule should name the diagnosed part, dimensions, key quantity, fitting and adjustment, and list any building-management or external-fabric decision awaiting the relevant building controller rather than burying it in a general lock-change description.`,
        ],
        checks: ['Define the reason for replacement', 'Measure components after safe access', 'Confirm authority for shared keying'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Horeston Grange multipoint diagnosis from observed movement',
        body: [
          `Nothing in the park or street records proves that a Horeston Grange door uses uPVC, composite construction or a particular mechanism. Once the actual door is confirmed, record whether the handle lifts fully, the key rotates and hooks or rollers move, plus whether the problem appears only against the frame. Use that movement sequence only to describe this Horeston Grange door; Launceston Drive's park entry and the county's three street labels cannot identify a failed component. Faceplate codes and measured geometry are still necessary before a compatible component is proposed.`,
          `The locality sources also cannot show whether the affected threshold is privately controlled or part of a shared system. Establish that responsibility and any building-management status before dismantling hardware. If diagnosis extends into cutting or replacing visible door material, check current property constraints separately. The repair record should state symptoms, tests, markings, measurements and next action, leaving no impression that the Woodlands Walk or street label predicts a mechanism, access condition or repair outcome.`,
        ],
        checks: ['Confirm the door is uPVC or composite', 'Record the full operating sequence', 'Identify the responsible threshold controller'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Temporary security for a damaged Horeston Grange opening',
        body: [
          `The public-park description and street entries have no bearing on the extent or cause of damage at an opening. Follow police instructions, then photograph the point of entry, frame, glazing or door leaf, compromised lock and adjacent surfaces before covering anything. Confirm whether the opening belongs to one unit or shared circulation and who controls it. That record supports a board plan from current evidence without attributing property characteristics to a locality label.`,
          `Because the locality sources are not designation maps, potential heritage constraints must be checked from present property records if visible fabric could be affected. Define the temporary scope only after the remaining structure has been inspected and document it before work. The completion note should identify covered damage and permanent glazing, joinery, door, lock or structural tasks still open. This allows the next contractor to recover the initial condition rather than relying on the Woodlands Walk or a street name.`,
        ],
        checks: ['Follow police instructions at the scene', 'Record shared-opening authority before fixing', 'List each unresolved permanent repair'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Measured security planning for a Horeston Grange entrance',
        body: [
          `The public-park and street records contain no door-security evidence. A Horeston Grange review should inspect leaf and frame condition, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports considering the complete entrance and correctly sized accredited products. Markings, measurements and operation then establish which improvement is compatible, while alignment, building-management duties or weak surrounding material remain separate findings rather than assumptions based on a locality label.`,
          `Any outward alteration needs present property evidence because the Woodlands Walk and highway register are not heritage designations or parcel boundaries. Photograph existing cut-outs and furniture, identify the controller of common hardware and separate adjustment from reinforcement or replacement. The specification should record current manufacturer documentation, exact fit and dependencies, and refer unresolved fabric questions appropriately, without claiming that locality sources describe construction or guarantee an outcome.`,
        ],
        checks: ['Assess hardware within the whole entrance', 'Document product evidence and measurements', 'Verify current constraints before alteration'],
      },
    },
  }),
  whitestone: makeGuide({
    slug: 'whitestone',
    summary: [
      `Warwickshire County Council's street register, produced on 11 August 2026, assigns Fairway, Falcon Close and Falstaff Close to Whitestone, Nuneaton. These selected highway entries do not create a complete locality boundary.`,
      `The same current register assigns St Andrews Drive, Whitestone Road and Willowfields Road to Whitestone, Nuneaton. It provides street-to-locality labels rather than evidence about properties, buildings or entrances.`,
    ],
    accessGuidance: `Give the full Whitestone property address and exact entrance. The county register's selected street-to-locality labels may help verify spelling and locality, but they cannot establish a property boundary, unit or access.`,
    evidenceLimits: `The evidence comprises selected highway entries and one official school directory record, not a complete postcode, ward, route or parcel map. The school record identifies that facility and address only; neither source verifies other properties, tenure, construction, lock type, access control or service circumstances.`,
    facts: [
      {
        heading: 'Whitestone Fairway-area street entries',
        text: `The county street register produced on 11 August 2026 assigns Fairway, Falcon Close and Falstaff Close to Whitestone, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `These selected street labels can support address checking but cannot be converted into a full boundary or property description.`,
      },
      {
        heading: 'Whitestone Road-area street entries',
        text: `The same register assigns St Andrews Drive, Whitestone Road and Willowfields Road to Whitestone, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `The highway-locality entries say nothing about the premises, exact entrance, authority or hardware at an address.`,
      },
      {
        heading: 'Whitestone Infant School address',
        text: `Warwickshire County Council's school directory identifies Whitestone Infant School as a community school at Magyar Crescent, Nuneaton, Warwickshire CV11 4SQ.`,
        sourceIds: ['wcc-whitestone-infant-school'],
        serviceRelevance: `For a booking at the school, identify the named gate or entrance and confirm the person authorised for the site; the directory establishes neither access rights nor hardware.`,
      },
    ],
    factOnlySourceIds: ['wcc-whitestone-infant-school'],
    sources: [LOCAL_SOURCES['wcc-list-of-streets-2026'], LOCAL_SOURCES['wcc-whitestone-infant-school']],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Using the exact address during a Whitestone lockout',
        body: [
          `Because the county register lists individual Whitestone streets without defining each property, a street label should not stand in for a current address. A lockout call should give the complete property, unit or floor, exact locked threshold and person responsible for it. Whitestone Road or Willowfields Road may help verify locality but does not establish access. Authority can then be checked against the real opening before latch, key, deadlock and existing-damage observations guide the technical approach.`,
          `The street register provides no blanket property status. If an older-looking door could be affected by a destructive method, record its face, frame and visible furniture and consult current records where appropriate. Explain any revised scope from the inspection before it proceeds. MLA evidence instead supports verifying identity and authority, providing available price information in advance and obtaining agreement before a service-call price change. The locksmith's inspection determines what opening options are proportionate; the locality labels determine none. Reinstatement or external-fabric work should be described separately so the current owner or relevant authority can make the next decision.`,
        ],
        checks: ['Use the complete Whitestone address', 'Identify the actual locked threshold', 'Verify current status before fabric change'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'A Whitestone lock change separated from planning terminology',
        body: [
          `Whitestone Road and the other county street entries do not identify hardware. Preparation should state the key-control or mechanical reason for change and provide images of both door faces, the edge plate and readable marks. Record the cylinder, case, keep and alignment as separate inspection questions; any retention or replacement decision must follow observed condition, markings and measurements. Neither the street name nor its Whitestone locality label supplies a product specification for the individual entrance.`,
          `If the threshold is shared, establish who controls its keys and hardware before the change; the street register says nothing about that authority. Likewise, check current property status only when proposed work could affect visible external material. The written scope should separate the diagnosed component, fitting, keys and adjustment from any new cutting or frontage alteration. This creates an accountable next step while keeping highway-locality evidence outside mechanical compatibility and present building-control conclusions.`,
        ],
        checks: ['State the key-control or failure reason', 'Capture all readable lock markings', 'Confirm responsibility for common hardware'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Whitestone uPVC fault-finding from mechanism evidence',
        body: [
          `The current street-to-locality labels offer no evidence that a Whitestone property has a uPVC or composite entrance. For the actual door, note the order of key rotation, handle lift and locking-point travel, plus whether the sash rubs or operates differently when open. Keep those observations as the symptom record for the identified Whitestone threshold, not as a diagnosis: the six street-register entries disclose no failed component. A full faceplate image and exact geometry remain essential before any compatible multipoint part can be stated.`,
          `Highway-locality names also cannot establish whether the affected threshold is private, communal or managed. Identify its controller and any building-management status independently. If the repair expands beyond internal hardware into visible material, use current property information rather than the street register. The work record should show symptoms, safe tests, markings, backset, centres and next diagnostic action, ensuring that a Whitestone label is not mistaken for evidence about mechanism type or condition.`,
        ],
        checks: ['Record key, handle and hook sequence', 'Photograph the entire fitted faceplate clearly', 'Establish private or shared responsibility'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Current opening evidence for temporary boarding in Whitestone',
        body: [
          `The selected street entries describe no damage at a Whitestone opening. Follow police directions before touching the scene, then photograph the point of entry, frame, glazing or door, damaged lock and adjacent surfaces. Name the precise private or shared threshold and the responsible person. Those current observations support temporary dimensions and handling, while the county register stays limited to confirming that selected roads carry a Whitestone locality label.`,
          `The street register is not a parcel-status record, so the temporary plan must follow inspected damage and any separately verified current constraint. Mark sound and broken areas and the surfaces that will be concealed. The completion note should state the temporary scope and list permanent glazing, joinery, door, lock or structural tasks still required. This allows later repair to proceed from documented damage without importing assumptions about present premises from a highway-locality entry.`,
        ],
        checks: ['Follow current police evidence-preservation directions carefully', 'Identify the controller of the opening', 'Record every covered component clearly'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Entrance-specific security assessment for Whitestone',
        body: [
          `Whitestone's highway-locality entries do not show a door's construction or resistance. An upgrade review should inspect the leaf, frame, hinges, keeps, handles, lock operation and cylinder fit where applicable. Warwickshire Police supports whole-entrance checks and accurately sized, accredited products. Product markings and measurements can then support a suitable proposal, while alignment, weak surrounding material or a shared system are documented as their own findings instead of being inferred from a street entry.`,
          `Before new cutting or visible substitution, check current address-level status because the street-locality labels are neither designation nor permission. For communal or managed shared-door hardware, the responsible controller should define the scope. The final specification should list adjustment, reinforcement and replacement separately, cite current manufacturer documentation for the exact product and identify unresolved fabric questions. It must explain the limits of that documentation and must not turn the Whitestone name into a universal security recommendation.`,
        ],
        checks: ['Inspect the surrounding frame and hinges', 'Confirm exact product dimensions and evidence', 'Check present status for visible work'],
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
    summary: [
      `Rugby Town Centre Conservation Area covers most of the commercial centre and follows the historic road layout, extending from Edwardian suburbs in the north to Rugby School's boundary in the south.`,
      `The appraisal records the London-Birmingham railway opening in 1838 and five more companies adding routes within twelve years as Rugby developed into a major junction. This is historical transport context.`,
    ],
    accessGuidance: `Provide the complete Rugby address, building name, floor and exact threshold. The historic road layout, Rugby School boundary and railway history can orient context but do not establish modern property access.`,
    evidenceLimits: `The appraisal describes a mapped central designation and historical development. It does not apply to the whole Rugby route or identify an individual property's status, controller, door material, lock type or access conditions.`,
    facts: [
      {
        heading: 'Rugby town-centre conservation area',
        text: `Rugby Town Centre Conservation Area covers most of the commercial centre along the historic road layout between defined northern and southern contexts.`,
        sourceIds: ['rbc-rugby-town-centre-appraisal'],
        serviceRelevance: `The mapped extent requires exact-address verification before central townscape context is applied to visible property fabric.`,
      },
      {
        heading: 'Rugby nineteenth-century railway growth',
        text: `The London-Birmingham railway opened in 1838 and five additional companies added Rugby routes within the following twelve years.`,
        sourceIds: ['rbc-rugby-town-centre-appraisal'],
        serviceRelevance: `The railway chronology supports attributed history only and cannot imply current access, proximity or service performance.`,
      },
      {
        heading: 'Rugby Library Little Elborow Street',
        text: `Warwickshire County Council identifies Rugby Library and Information Centre at Little Elborow Street, Rugby CV21 3BZ.`,
        sourceIds: ['wcc-rugby-library'],
        serviceRelevance: `This public-facility record applies only to the named library; it cannot describe another Rugby property, its entrance, access control, construction or locks.`,
      },
    ],
    factOnlySourceIds: ['wcc-rugby-library'],
    sources: [LOCAL_SOURCES['rbc-rugby-town-centre-appraisal'], LOCAL_SOURCES['wcc-rugby-library']],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Rugby lockouts with the central boundary and threshold distinguished',
        body: [
          `The appraisal's historic road layout and Rugby School boundary help describe the mapped centre, but they cannot identify a locked door. Give the full property, building or unit, exact street-facing, shared or internal threshold and the person controlling it. That permits an authority check for the right opening before the locksmith assesses whether the latch closed, the lock was deadlocked or a key or mechanism failed. Railway history adds no technical information.`,
          `If the address lies within the conservation area, photograph the door face, frame and visible furniture before a method that might remove material is approved. The central designation informs preservation, not a guaranteed technique. Explain any change in the inspected method or scope before proceeding. MLA evidence supports proof of identity and authority, available price information in advance and agreement only if the service-call price changes. Where drilling or replacement becomes necessary after inspection, record the component and reinstatement separately and reserve any broader alteration to the historic frontage for an exact-property decision rather than extending the map across Rugby.`,
        ],
        checks: ['Name the exact Rugby building and door', 'Prepare evidence linked to that threshold', 'Check the current conservation boundary'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Rugby lock replacement based on components, not railway history',
        body: [
          `The 1838 railway opening and later junction development do not indicate what lock is fitted at a Rugby address. Define the key-control or mechanical objective, then photograph both hardware faces, the edge plate and all readable markings. At the customer entrance, document cylinder, case, keep and alignment individually and retain parts only where observed condition supports doing so; Rugby's railway chronology has no bearing on that judgment. Dimensions and key requirements support a compatible replacement, whereas a central or rail-related location supports none.`,
          `Within the mapped conservation area, distinguish a component change within existing apertures from new cutting or visible furniture replacement. This clarifies preservation and any property-specific council question. A communal threshold also needs its controller to approve the shared keying scope. The written proposal should list retained parts, measured product, keys, fitting and adjustment and flag external-fabric or building-management decisions separately, avoiding any claim that all central Rugby doors share one construction.`,
        ],
        checks: ['Define the replacement objective precisely', 'Capture markings and existing apertures', 'Confirm control of shared Rugby hardware'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Rugby uPVC diagnosis from the individual operating sequence',
        body: [
          `A conservation-area appraisal and railway chronology do not establish that a Rugby entrance is uPVC or composite. Once the material is confirmed, record key movement, handle travel, locking-point operation and any difference when the leaf meets its frame. Keep any safe open-and-closed comparison as a symptom record for this Rugby entrance; neither the conservation appraisal nor railway chronology identifies the failed component. Faceplate marks, centres, backset and locking layout remain essential before a compatible part is stated.`,
          `A door in the commercial centre may be private, communal or controlled as part of another system, but the appraisal does not decide that relationship. Identify the responsible party and any building-management condition before components are removed. If repair extends into outward fabric, verify the exact conservation status and describe that extension separately. The work record should keep boundary, authority and mechanical diagnosis distinct, with measurements and observed behaviour governing the next step.`,
        ],
        checks: ['Confirm the door system before diagnosis', 'Record open and closed behaviour safely', 'Measure faceplate and locking points'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Rugby town-centre boarding with evidence and fabric recorded',
        body: [
          `The historic road layout and railway story cannot describe damage at a Rugby opening. Follow police instructions first, then photograph the point of entry, surviving frame, glazing or door, broken hardware and adjacent surfaces before covering them. Identify whether the opening belongs to a commercial frontage, shared entrance or private unit and who controls it. Those observations support temporary dimensions without inferring structure or incident details from central location.`,
          `For an opening inside the conservation area, record intact frontage material before temporary work. Define the temporary scope from the inspected damage, not the map alone. The completion note should state covered damage and outstanding glazing, joinery, lock, door or structural assessment. Any permanent alteration to the mapped townscape remains a separate property-specific decision, allowing the next specialist to recover the original evidence from clear documentation.`,
        ],
        checks: ['Follow police instructions before work', 'Photograph all frontage and lock damage', 'Record the temporary scope and outstanding repairs'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Complete-entrance security review for a Rugby address',
        body: [
          `Rugby's nineteenth-century rail development and central road pattern do not measure an entrance's resistance. Since those locality facts do not rate a door, assess the identified Rugby entrance across its leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports reviewing the complete assembly and considering correctly sized, accredited products. Markings, measured fit and operation can then support options, while alignment, frame weakness and shared control remain explicit rather than being hidden by a town-centre description.`,
          `Inside the mapped conservation area, photograph existing furniture, cut-outs and visible character before suggesting outward changes. Internal compatible improvements can be separated from new cutting or substitution requiring property-specific advice. The controller of common or managed shared-door hardware should define further constraints. A specification should identify retained fabric, current manufacturer documentation, dimensions and dependencies and never imply that one component protects every Rugby entrance from all attack routes.`,
        ],
        checks: ['Inspect the complete Rugby entrance', 'Verify manufacturer documentation and dimensions', 'Record visible character before changes'],
      },
    },
  }),
  hillmorton: makeGuide({
    slug: 'hillmorton',
    summary: [
      `Rugby Borough Council's appraisal describes Hillmorton Locks as a small canal-centred settlement about two miles south-east of Rugby, separated from Hillmorton housing by a railway embankment and narrow tunnel within that assessment.`,
      `The document records development around canal-company workshops, a dry dock and housing. Canal & River Trust reported in May 2026 that the Oxford Canal site contains six historic pairs of locks; both records concern the Locks complex, not every Hillmorton address.`,
    ],
    accessGuidance: `Give the exact Hillmorton address and entrance. The canal, railway embankment and tunnel describe Hillmorton Locks context only and must not be converted into vehicle-access, route or property claims.`,
    evidenceLimits: `The appraisal concerns a small mapped Hillmorton Locks conservation area, not the whole Hillmorton route. It does not identify another property's designation, construction, ownership, door system, lock condition or access.`,
    facts: [
      {
        heading: 'Hillmorton Locks conservation-area setting',
        text: `Hillmorton Locks is a small canal-centred conservation area separated from Hillmorton housing by a railway embankment and narrow tunnel.`,
        sourceIds: ['rbc-hillmorton-locks-appraisal'],
        serviceRelevance: `This context applies only to the mapped locks settlement and cannot establish access to another Hillmorton address.`,
      },
      {
        heading: 'Hillmorton Locks settlement development',
        text: `The locks settlement developed around canal workshops, a dry dock and housing, with continuing uses recorded at appraisal time.`,
        sourceIds: ['rbc-hillmorton-locks-appraisal'],
        serviceRelevance: `The canal-industrial history may be attributed but does not date or describe a customer's building or entrance.`,
      },
      {
        heading: 'Six historic Hillmorton lock pairs',
        text: `Canal & River Trust reported in May 2026 that Hillmorton Locks consists of six historic pairs of locks on the Oxford Canal.`,
        sourceIds: ['crt-hillmorton-locks-2026'],
        serviceRelevance: `For a call at the Locks complex, record the exact land-side entrance and authorised site contact; the landmark does not identify a private doorway or access method.`,
      },
    ],
    sources: [
      LOCAL_SOURCES['rbc-hillmorton-locks-appraisal'],
      LOCAL_SOURCES['crt-hillmorton-locks-2026'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Hillmorton lockouts with Locks context kept within its map',
        body: [
          `The canal, embankment and tunnel describe the small Hillmorton Locks designation, not the location or access of every Hillmorton property. A caller should give the complete address, exact private or shared threshold and responsible person. That identifies the correct opening without relying on a canal landmark. Authority can then be verified before latch state, deadlocking, key movement and prior damage guide inspection of the actual lock.`,
          `If the official map places the door inside Hillmorton Locks, photograph visible fabric and existing hardware before approving a method that could remove material. Canal-industrial history informs preservation but cannot predict technique. Explain any inspection-led scope change before work continues. MLA evidence separately supports verifying identity and authority, communicating available price information in advance and obtaining agreement if the service-call price changes. If entry requires drilling or component replacement, record it and reinstatement separately, leaving any broader alteration to appraisal-recognised fabric for property-specific owner or council guidance rather than extending the designation to wider Hillmorton.`,
        ],
        checks: ['Provide the complete Hillmorton address', 'Distinguish Locks from wider Hillmorton', 'Document fabric before component removal'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Hillmorton lock changes without canal-building assumptions',
        body: [
          `Workshops, a dry dock and appraisal-dated industrial uses do not identify a lock at a Hillmorton address. State whether the change concerns keys, failure or damage, then photograph both hardware faces, the edge plate and markings. For the actual Hillmorton door, consider the cylinder, lock case, keep and alignment separately, retaining a component only where its condition supports that decision; canal workshops and dry-dock history do not. Exact geometry and key needs support the replacement, while canal history cannot be transferred to the customer door's age or construction.`,
          `Inside the small Hillmorton Locks boundary, distinguish an internal component change from fresh cutting or alteration of visible material. That scope defines the preservation question. A shared threshold also requires the person controlling keys and hardware to confirm authority. The written schedule should list retained parts, measured product, key quantity, fitting and adjustment, and hold external-fabric or building-management issues separately for current property-specific advice instead of treating the canal settlement as one uniform premises type.`,
        ],
        checks: ['Define the key or failure objective', 'Record actual component markings and geometry', 'Verify the mapped Locks boundary'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0],
        heading: 'Hillmorton multipoint diagnosis beyond the canal narrative',
        body: [
          `The Hillmorton Locks appraisal does not establish whether a wider-area entrance is uPVC or composite. Confirm the actual material, then record key rotation, handle lift, hook or roller movement and any change when the door closes against its frame. Keep those movements as a symptom record for the identified Hillmorton entrance; the limited Locks appraisal cannot identify the failed component at that entrance. Compatibility still depends on the installed faceplate markings, centres, backset and locking layout, none of which is supplied by the canal appraisal.`,
          `A later mechanism inside the mapped locks settlement and a door elsewhere in Hillmorton present different property-context questions, but neither is answered by the tunnel or canal. Identify private, shared or managed control first. If repair reaches visible external material inside the designation, describe that extension and seek address-specific guidance. The record should keep symptoms, measurements, controller and conservation status separate, with mechanical evidence determining the next diagnostic step.`,
        ],
        checks: ['Verify uPVC or composite construction', 'Record frame interaction without forcing', 'Measure all multipoint reference dimensions'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Temporary boarding at Hillmorton Locks or wider Hillmorton',
        body: [
          `The appraisal's tunnel, canal and dry-dock history cannot describe damage at an opening. Follow police directions, then photograph the point of entry, remaining frame, glazing or door, broken hardware and adjacent surfaces before anything is hidden. Give the exact address and establish whether it lies in Hillmorton Locks or wider Hillmorton, plus who controls the threshold. Those facts support a temporary plan without implying access or construction from the canal setting.`,
          `Within the mapped locks designation, record surviving canal-settlement fabric before temporary work. In either context, define the temporary scope from the inspected damage. The completion note should state covered damage and outstanding glazing, joinery, door, lock or structural work. Any permanent change to appraisal-recognised material remains a separate property-specific decision, and the continuation-of-use statement from the appraisal cannot substitute for present site evidence.`,
        ],
        checks: ['Follow current police evidence-preservation guidance first', 'Confirm Locks or wider-area location', 'Record supports and concealed damage'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Hillmorton upgrades with the small designation respected',
        body: [
          `Hillmorton Locks' canal buildings and industrial history do not provide a security specification for any entrance. Review the door leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports complete-entrance checks and correctly sized, accredited products. Current markings, measurements and operation can then support an option, while frame condition, alignment and shared control remain explicit findings rather than assumptions based on the historic settlement.`,
          `For a door inside the small mapped designation, photograph visible hardware, cut-outs and surviving material before proposing outward change. Compatible internal work should be separated from new cutting or substitution needing property-specific guidance. Wider Hillmorton must not inherit that status. The specification should record measured fit, product evidence, retained fabric and building-management dependencies, explaining any resistance improvement conditionally and avoiding claims that one item secures all doors associated with the Locks name.`,
        ],
        checks: ['Inspect the whole current entrance', 'Apply designation only to its boundary', 'Verify certified products against measurements'],
      },
    },
  }),
  bilton: makeGuide({
    slug: 'bilton',
    summary: [
      `Rugby Borough Council records Bilton as a formerly separate village that merged into Rugby during the 1930s. Its conservation area covers only part of that former settlement rather than the whole Bilton route.`,
      `The appraisal identifies St Mark's Church as Bilton's oldest building, with mid-fourteenth-century work, and dates the original part of Bilton Hall to 1623. Those dates apply only to the named assets.`,
    ],
    accessGuidance: `Provide the complete Bilton address and affected threshold. St Mark's Church and Bilton Hall can orient the appraisal, but their dates and the former-village narrative do not prove property status or access.`,
    evidenceLimits: `The source establishes a partial conservation-area boundary and facts about two named buildings. It does not identify another property's designation, age, ownership, construction, door material, lock mechanism or access arrangements.`,
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
    ],
    factOnlySourceIds: ['wcc-bilton-infant-school'],
    sources: [LOCAL_SOURCES['rbc-bilton-appraisal'], LOCAL_SOURCES['wcc-bilton-infant-school']],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'A Bilton lockout with the partial conservation area checked',
        body: [
          `Bilton's former-village history and the dates of St Mark's Church and Bilton Hall cannot identify the caller's door. Give the complete address, exact private or shared threshold and person controlling it. Because the designation covers only part of Bilton, check the property rather than assuming status from the village name. Authority should be established for that opening before latch state, deadlocking, key behaviour and damage guide the locksmith's assessment.`,
          `At an address inside the mapped area, photograph the leaf, frame and visible furniture before choosing a method that could remove material. Named-asset dates inform no lock technique and do not guarantee preservation without intervention. Explain any changed finding, proposed technique or scope before proceeding; the building dates do not decide those matters. Separately, MLA guidance supports advance cost information and agreement before a revised service-call price applies. If drilling or component replacement becomes necessary, record the affected part and reinstatement separately, leaving broader alteration to visible historic fabric for a property-specific decision based on the appraisal and current records.`,
        ],
        checks: ['Give the exact Bilton property address', 'Check whether it enters the mapped area', 'Prepare authority for the identified threshold'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Bilton lock replacement without borrowing named-building dates',
        body: [
          `A church with medieval work and a hall dating from 1623 do not date a different Bilton entrance or identify its lock. State the reason for change, then photograph both hardware faces, the door edge and readable markings. For the service door, record cylinder, case, keep and alignment separately and retain parts only where observed condition supports doing so; the church and hall dates cannot inform that choice. Measurements and key-control needs define a compatible replacement; the named assets provide no product or construction evidence for surrounding addresses.`,
          `Where the property is within Bilton's limited conservation area, distinguish a component using existing apertures from new cutting or a visible furniture change. For a common entrance, identify the person responsible for shared keying. The written scope should list retained material, measured product, keys, fitting and adjustment and identify any building-management or outward-fabric issue separately. This keeps mechanical compatibility and preservation tied to the actual door rather than generalising the former village's heritage.`,
        ],
        checks: ['Define the reason and key-control need', 'Record existing apertures and markings', 'Verify shared-door responsibility before change'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Bilton multipoint diagnosis independent of village age',
        body: [
          `The appraisal's settlement history does not establish whether an affected Bilton door is uPVC or composite. Confirm the material, then record key rotation, handle lift, hook or roller movement and any difference when the leaf enters the frame. Keep those movements as the symptom record for the particular Bilton entrance; the settlement history and named-building dates identify no failed component. Faceplate marks, centres, backset and locking layout remain necessary before a compatible part can be identified.`,
          `A later replacement door may stand within or outside the partial conservation area, and that mapped status is separate from mechanism diagnosis. Identify the exact threshold, its controller and any building-management requirement before dismantling hardware. If repair extends into visible external fabric, describe that proposal for address-specific review. The work record should state observed movement and measurements, never projecting the age of St Mark's Church or Bilton Hall onto the fitted multipoint system.`,
        ],
        checks: ['Confirm actual material and mechanism', 'Record open and closed behaviour', 'Measure all relevant faceplate geometry'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Temporary boarding in Bilton with the exact boundary recorded',
        body: [
          `Bilton's former-village narrative and named heritage assets do not describe damage at a service address. Follow police directions, then photograph the point of entry, surviving frame, glazing or door, broken hardware and adjacent surfaces before covering them. Confirm the precise threshold and responsible person, and check whether it lies in the limited conservation area. Those facts support a board plan without assuming property age from nearby landmarks.`,
          `Inside the mapped area, distinguish intact visible material from damaged material before temporary work. Define the temporary scope from the inspected opening rather than designation alone. The completion note should state what was concealed and any outstanding glazing, joinery, door, lock or structural work. Any permanent change to appraisal-recognised fabric remains a separate property-specific decision, allowing the next specialist to reconstruct the original condition from the photographs.`,
        ],
        checks: ['Follow police directions before covering damage', 'Verify the partial conservation boundary', 'Record the temporary scope and covered damage'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Measured security improvements for a Bilton entrance',
        body: [
          `Bilton's merger history and two named building dates provide no security assessment. Inspect the actual door leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports reviewing the complete entrance and considering correctly sized, accredited products. Current marks, dimensions and condition can then support options, while alignment and frame weaknesses remain separately visible rather than being inferred from the former village's architectural history.`,
          `For an address inside the partial designation, photograph visible furniture, existing cuts and surviving fabric before proposing an outward change. Compatible internal improvements can be considered separately from alterations needing property-specific guidance. A shared or managed threshold also requires its controller's requirements. The specification should state retained elements, measured fit, current manufacturer documentation and dependencies without suggesting that one component is suitable for every Bilton property.`,
        ],
        checks: ['Inspect leaf, frame and hardware together', 'Verify exact sizing and product evidence', 'Apply conservation context only when mapped'],
      },
    },
  }),
  brownsover: makeGuide({
    slug: 'brownsover',
    summary: [
      `The Old Brownsover appraisal describes a hamlet about one and a half miles north of Rugby whose conservation area includes Brownsover Hall, several houses, St Michael's Church and adjoining undeveloped land.`,
      `The appraisal identifies canal and highway connections as part of Old Brownsover's historic transport context and names Brownsover Hall as its key landmark. These facts apply to Old Brownsover, not all development.`,
    ],
    accessGuidance: `Provide the exact Brownsover address and entrance and state whether it is within Old Brownsover only after checking the map. Canal, highway and hall references do not establish present access to premises.`,
    evidenceLimits: `Old Brownsover's mapped conservation area is not coterminous with the wider route. The appraisal does not identify another property's status, construction, controller, door material, lock type, modern access or service circumstances.`,
    facts: [
      {
        heading: 'Old Brownsover conservation-area components',
        text: `Old Brownsover Conservation Area includes Brownsover Hall, a small group of houses, St Michael's Church and adjoining undeveloped land.`,
        sourceIds: ['rbc-old-brownsover-appraisal'],
        serviceRelevance: `The description applies to the mapped hamlet and must not be projected onto wider Brownsover development.`,
      },
      {
        heading: 'Brownsover canal, highway and hall context',
        text: `The appraisal records historic canal and highway connections and identifies Brownsover Hall as the key landmark building.`,
        sourceIds: ['rbc-old-brownsover-appraisal'],
        serviceRelevance: `These are attributed Old Brownsover facts and cannot establish present property access, condition or hardware.`,
      },
      {
        heading: 'Brownsover Community School address',
        text: `Warwickshire County Council's school directory identifies Brownsover Community School as a community school at Webb Drive, Rugby, Warwickshire CV23 0UP.`,
        sourceIds: ['wcc-brownsover-community-school'],
        serviceRelevance: `This facility record applies only to the named school and cannot describe other Brownsover properties, their access, entrances, construction or hardware.`,
      },
    ],
    factOnlySourceIds: ['wcc-brownsover-community-school'],
    sources: [LOCAL_SOURCES['rbc-old-brownsover-appraisal'], LOCAL_SOURCES['wcc-brownsover-community-school']],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Brownsover lockouts with Old Brownsover identified correctly',
        body: [
          `Brownsover Hall, St Michael's Church and the canal context identify the mapped hamlet, not every Brownsover entrance. A caller should give the complete address, exact private or common threshold and responsible person, then confirm Old Brownsover status only from the map. That allows lawful authority to be checked for the correct door before latch state, deadlocking, key behaviour and visible damage determine which technical options can be considered.`,
          `At an opening inside the conservation area, photograph the door, frame and furniture before a method that might remove material is selected. Historic transport connections do not reveal the lock or property access. Explain any scope change arising from the inspected condition before continuing. MLA evidence supports identity-and-authority checks, available price information in advance and agreement only if the service-call price changes. If drilling or replacement follows inspection, identify the component and reinstatement separately and reserve any wider alteration of appraisal-recognised fabric for property-specific advice, without extending Old Brownsover's status to later development represented by the route.`,
        ],
        checks: ['Provide the full Brownsover address', 'Check Old Brownsover map status', 'Link authority to the exact threshold'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Brownsover lock changes separated from hamlet context',
        body: [
          `A named hall, church and historic canal connection do not identify hardware at another Brownsover property. Define the change objective, then capture inside and outside furniture, the edge plate, visible codes and closing behaviour. Record the cylinder, case, keep and alignment as separate inspection questions; any retained part must be justified by its observed condition. Compatible dimensions and key-control needs, not proximity to Brownsover Hall, should support the replacement decision.`,
          `If the exact door lies within Old Brownsover's designation, distinguish an internal component change from new cutting or visible furniture substitution. That scope difference informs preservation. For shared hardware, the current controller must confirm keying and authority. The written proposal should list retained components, measured product, keys, fitting and adjustment and flag any outward-fabric or building-management issue separately, ensuring that the small hamlet description never becomes a general rule for the wider route.`,
        ],
        checks: ['State the reason for changing hardware', 'Photograph markings and closing alignment', 'Verify whether Old Brownsover applies'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Brownsover uPVC fault diagnosis without canal assumptions',
        body: [
          `The Old Brownsover appraisal contains no evidence that a customer door is uPVC or composite. Confirm its material, then record key rotation, handle travel, locking-point movement and any difference when it enters the frame. Treat the movement sequence as evidence about the particular Brownsover door only; Old Brownsover's mapped hamlet, canal and road context identify no failed component. Faceplate markings, centres, backset and layout remain essential before any compatible component is stated, regardless of canal or highway context.`,
          `A modern Brownsover door may fall outside the small hamlet designation, while a later mechanism can also exist within older fabric. Check the exact map and identify private, shared or managed control independently. If repair expands into visible external material inside Old Brownsover, describe that extension for property-specific advice. The diagnostic record should keep operating symptoms, measurements, authority and conservation status distinct, avoiding any inference from Brownsover Hall or St Michael's Church.`,
        ],
        checks: ['Verify the actual door system', 'Record locking point movement precisely and safely', 'Confirm map and threshold responsibility'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Boarding a Brownsover opening with hamlet fabric preserved',
        body: [
          `The Old Brownsover transport history does not describe a damaged opening. Follow police directions first, then photograph the point of entry, remaining frame, glazing or door, compromised hardware and adjacent surfaces. Identify the exact address, threshold and controller and establish whether the mapped hamlet applies. These current observations guide dimensions and temporary handling without assuming structure or access from the canal, highway or landmark references.`,
          `Inside the conservation area, record intact visible material before temporary work. Define the temporary scope from the inspected damage, not the designation alone. The completion note should state covered damage and outstanding glazing, joinery, lock, door or structural work. Any permanent change to Old Brownsover fabric remains a separate property-specific decision, while wider Brownsover addresses are assessed from their own evidence rather than the hamlet appraisal.`,
        ],
        checks: ['Follow police scene instructions first', 'Confirm whether Old Brownsover applies', 'Document the temporary scope and concealed elements'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'A Brownsover upgrade based on the complete entrance',
        body: [
          `Old Brownsover's named assets and transport history provide no security specification. Inspect the actual leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports reviewing the full entrance and correctly sized, accredited products. Present markings, measurements and condition can then support options, while alignment, frame weaknesses and shared control remain explicit instead of being inferred from the age or landmark status of the hamlet.`,
          `For an address within the mapped area, photograph visible furniture, existing apertures and appraisal-recognised material before suggesting outward alteration. Internal compatible improvements can follow a separate path from cutting or substitution needing property-specific guidance. A communal or managed threshold also requires its controller's constraints. The specification should record retained fabric, measured fit, current manufacturer documentation and dependencies, never applying one recommendation across Old and wider Brownsover.`,
        ],
        checks: ['Assess the complete entrance condition', 'Verify measured fit and product evidence', 'Distinguish Old from wider Brownsover'],
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
    summary: [
      `Dunchurch Conservation Area occupies the historic crossroads core and includes the commercial centre, open spaces and a later housing area to the north. Its mapped extent does not cover the entire route.`,
      `The appraisal records the medieval standing cross at the centre as a scheduled monument and places part of the registered Dunchurch Lodge park and garden to the north-east. Their boundaries differ.`,
    ],
    accessGuidance: `Provide the exact Dunchurch property and entrance and check each relevant map separately. The crossroads, standing cross and registered landscape can orient context but do not establish access or shared boundaries.`,
    evidenceLimits: `The conservation area, scheduled cross and registered landscape are distinct mapped contexts. The appraisal does not assign status, age, ownership, construction, door material, lock type or access arrangements to every Dunchurch address.`,
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
    ],
    factOnlySourceIds: ['wcc-dunchurch-library'],
    sources: [LOCAL_SOURCES['rbc-dunchurch-appraisal'], LOCAL_SOURCES['wcc-dunchurch-library']],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Dunchurch lockouts with three mapped contexts separated',
        body: [
          `The historic crossroads, scheduled standing cross and registered landscape do not identify a customer's locked door, and their boundaries are not interchangeable. Give the complete Dunchurch address, exact private or shared threshold and responsible person. Check the relevant map only for that property. Authority can then be established for the correct opening before latch state, deadlocking, key behaviour and existing damage guide the locksmith's technical assessment.`,
          `If the entrance lies within a verified protected context, photograph the leaf, frame and visible furniture before approving a method that could remove material. The appraisal informs preservation but does not reveal the lock or guarantee technique. Explain any inspection-led change in method or scope before continuing. MLA guidance supports identity-and-authority verification, available price information in advance and agreement only if the service-call price changes. Any drilling or component replacement should be recorded with reinstatement separately, while broader alteration to conservation, scheduled or registered fabric remains a property- and asset-specific next decision.`,
        ],
        checks: ['Give the exact Dunchurch address', 'Check each applicable map separately', 'Prepare authority for the affected threshold'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Dunchurch lock changes with asset boundaries kept distinct',
        body: [
          `The crossroads core and standing cross do not identify hardware at another Dunchurch address. State whether the change concerns key control, mechanical failure or damage, then photograph handle faces, the edge plate and readable markings. For the actual Dunchurch door, examine cylinder, lock case, keep and alignment separately and retain an element only where its condition supports that choice; the three mapped contexts do not. Measurements and key requirements support compatibility, whereas the appraisal's scheduled and registered assets support no product choice.`,
          `At an address within the conservation area or another verified designation, distinguish a component change within existing apertures from new cutting or visible substitution. Check the correct boundary rather than combining asset records. A communal threshold also needs its controller's keying authority. The written scope should list retained parts, measured product, keys, fitting and adjustment and identify any building-management or protected-fabric issue separately for appropriate property-specific guidance.`,
        ],
        checks: ['Define the lock-change objective clearly', 'Record markings and existing apertures', 'Apply only the correct mapped status'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Dunchurch uPVC diagnosis without crossroads assumptions',
        body: [
          `The conservation appraisal does not establish that an affected Dunchurch entrance is uPVC or composite. Confirm the material, then record key rotation, handle travel, locking-point movement and whether the fault changes when the leaf enters the frame. Keep the movement sequence as evidence about this Dunchurch door only; the conservation core, standing cross and registered landscape identify no failed component. Full faceplate marks, centres, backset and locking layout remain essential before compatible parts can be identified.`,
          `A later door may exist within or outside the historic core, while the scheduled cross and registered landscape have different boundaries again. Check only the applicable record and identify private, shared or managed control before dismantling hardware. If repair extends into visible protected material, describe that extension separately. The diagnostic note should preserve distinct findings for operation, dimensions, authority and property status, with no mechanism inference drawn from the crossroads setting.`,
        ],
        checks: ['Confirm the individual door system', 'Record operation against the frame', 'Check the relevant boundary only'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Dunchurch boarding with conservation and monument maps separated',
        body: [
          `The appraisal's three mapped contexts cannot describe damage at an opening. If police have issued evidence-preservation directions for the Dunchurch scene, follow them before photographing, measuring or covering the point of entry, surviving frame, glazing or door, compromised hardware and surrounding material. Identify the exact threshold and controller and determine which boundary, if any, applies. Those scene observations document the opening while avoiding an assumption that the scheduled cross or registered landscape extends to the property.`,
          `Where verified protected fabric is involved, record intact surfaces and obtain any appropriate property-specific guidance before temporary work. Define the temporary scope from the inspected damage. The completion record should separate what was covered at the inspected opening from unresolved glazing, joinery, door, lock or structural work; none is described by the three mapped contexts. Any permanent alteration remains a separate decision under the correct conservation, scheduled or registered record rather than a blended Dunchurch-wide rule.`,
        ],
        checks: ['Follow current police evidence-preservation guidance first', 'Verify the exact applicable designation', 'Document supports and concealed damage'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Dunchurch entrance upgrades with mapped status applied precisely',
        body: [
          `The historic crossroads and named protected assets provide no security rating for a Dunchurch entrance. Because the conservation core, standing cross and registered landscape do not rate a private entrance, review its leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection as one assembly. Warwickshire Police supports full-entrance assessment and correctly sized, accredited products. Current marks, measurements and operation can then support options, while alignment, frame condition and shared control remain explicit and no product is selected from heritage prominence.`,
          `Before an outward change, identify whether the address is inside the conservation area, relates to scheduled fabric or intersects the registered landscape; those records cannot be substituted for one another. Photograph existing apertures and visible material and identify the controller of common or managed shared-door hardware. The specification should state retained fabric, measured fit, current manufacturer documentation and dependencies without claiming that one component suits every Dunchurch doorway or eliminates all entry routes.`,
        ],
        checks: ['Inspect the complete existing entrance', 'Keep the separate designation boundaries distinct', 'Verify product evidence and dimensions'],
      },
    },
  }),
} satisfies Partial<Record<AreaSlug, GovernedAreaGuide>>
