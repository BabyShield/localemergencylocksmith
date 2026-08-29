import type { AreaSlug } from './area-authorities'
import type { AreaGuideSource, GovernedAreaGuide } from './area-guide-types'
import { SERVICE_AREA_SLUGS, type ServiceAreaSlug } from './service-area-types.ts'
import {
  EVIDENCE_REVIEWED_ON,
  POLICE_SOURCE_IDS,
  getTechnicalEvidenceSource,
} from './locksmith-evidence.ts'

const REVIEWED_ON = EVIDENCE_REVIEWED_ON

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
    supports: 'The Appendix B entry for Former Albion Works at 64-122 Attleborough Road, Nuneaton CV11 4JJ as a locally listed building outside a conservation area and a landmark.',
    checkedOn: REVIEWED_ON,
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
    supports: 'The council housing walkabout schedule and the named streets grouped under Attleborough, Stockingford, Camp Hill and Weddington.',
    checkedOn: REVIEWED_ON,
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
    supports: 'Current county street-to-locality and town labels, including Stockingford, Horeston Grange, Whitestone, Chapel End and Galley Common entries.',
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
    title: 'Borough Plan Review 2021-2039',
    publisher: 'Nuneaton and Bedworth Borough Council',
    url: 'https://fs-filestore-eu.s3.eu-west-1.amazonaws.com/nuneaton/Documents/Borough%20Plan%20Review%20%282021-2039%29.pdf',
    supports: 'Strategic Policy DS5 description of the wider Bermuda Park area, including Faultlands and SEA4, as an employment location of regional significance for inward and local investment.',
    checkedOn: REVIEWED_ON,
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
  'rbc-cawston-parish-directory': {
    id: 'rbc-cawston-parish-directory',
    title: 'Cawston parish council details',
    publisher: 'Rugby Borough Council',
    url: 'https://rugby.gov.uk/l/6734048',
    supports: 'The borough directory entry for Cawston Parish Council and its contact location at Cawston Community Hall.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'rbc-cawston-parish-plan-2010': {
    id: 'rbc-cawston-parish-plan-2010',
    title: 'Cawston Parish Plan 2010',
    publisher: 'Cawston Parish Council, hosted by Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/documents/20124/6573495/Cawston_Parish_Plan.pdf/35928dfe-3d3e-a888-19db-e82f4db6cc3b?t=1750866427061',
    supports: 'The parish-plan adoption date, its 2009 questionnaire basis and intended review process.',
    checkedOn: REVIEWED_ON,
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
  'rbc-new-bilton-play-consultation-2025': {
    id: 'rbc-new-bilton-play-consultation-2025',
    title: 'Public consultations launched on play area revamps',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/w/public-consultations-launched-on-play-area-revamps',
    supports: 'The March 2025 consultation proposal for New Bilton Recreation Ground play-area works.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'rbc-cabinet-new-bilton-2024': {
    id: 'rbc-cabinet-new-bilton-2024',
    title: 'Cabinet agenda, 5 February 2024',
    publisher: 'Rugby Borough Council',
    url: 'https://www.rugby.gov.uk/documents/20124/7078207/PUBLIC%2BAGENDA%2BCabinet%2B5%2BFebruary%2B2024.pdf/ccba71dc-0ff9-2f75-1ce8-a1b5339521ca?t=1706305510419&version=1.0',
    supports: 'New Bilton Ward participation in a dated hyperlocal area-action pilot workstream.',
    checkedOn: REVIEWED_ON,
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
  'wcc-cawston-grange-primary-school': {
    id: 'wcc-cawston-grange-primary-school',
    title: 'Cawston Grange Primary School',
    publisher: 'Warwickshire County Council',
    url: 'https://apps.warwickshire.gov.uk/FindASchool/schools/cawston-grange-primary-school',
    supports: 'The official school directory name, primary-academy classification and Scholars Drive address for Cawston Grange Primary School.',
    checkedOn: REVIEWED_ON,
    kind: 'locality',
  },
  'warwickshire-her-new-bilton-corn-mill': {
    id: 'warwickshire-her-new-bilton-corn-mill',
    title: 'Site of corn mill off Lawford Road, New Bilton, record MWA3634',
    publisher: 'Warwickshire Historic Environment Record',
    url: 'https://timetrail.warwickshire.gov.uk/detail.aspx?monuid=WA3634',
    supports: 'The possible corn-mill site off Lawford Road, New Bilton and its Imperial to Industrial period classification.',
    checkedOn: REVIEWED_ON,
    kind: 'property-status',
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
    { q: 'What is supported about Attleborough in this guide?', a: `The Warwickshire record supports a probable medieval-settlement extent based on the 1888 map and a recorded 1243 manor lease, not a blanket designation for modern premises.` },
    { q: 'What should an Attleborough caller identify before booking?', a: `Identify the current address, precise private or shared door, responsible controller and observed lock symptoms; historic mapping cannot substitute for those present facts.` },
  ],
  stockingford: [
    { q: 'What do the Stockingford evidence records establish?', a: `They establish a documentary historic-environment record and selected current street-to-locality labels. They do not define every Stockingford address, property status or entrance.` },
    { q: 'Which Stockingford information should accompany a service enquiry?', a: `Supply the full current address, exact threshold, controller, door photographs and observable hardware behaviour, without relying on the medieval-manor or centre labels.` },
  ],
  weddington: [
    { q: 'Do the Weddington sources define a route boundary?', a: `No. The council sources identify a named park and streets in one housing walkabout schedule; neither source defines the full locality or a property boundary.` },
    { q: 'How should a Weddington entrance be described when booking?', a: `Give the complete address, position of the affected door, whether it is shared and who controls it, together with photographs and observed symptoms where possible.` },
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
    { q: 'What do the Camp Hill council sources establish?', a: `They establish streets in a council housing walkabout schedule and the current Queen Elizabeth Road park record, not a complete locality boundary or property conditions.` },
    { q: 'What preparation is useful for a Camp Hill service enquiry?', a: `State the full address, correct threshold, responsible controller and actual symptoms, and provide door-edge and hardware photographs when it is safe to do so.` },
  ],
  'chapel-end': [
    { q: 'What does the Chapel End heritage record establish?', a: `It describes one chapel at Coleshill Road and its documented construction phases. It does not transfer that building's recorded status or fabric to nearby properties.` },
    { q: 'What present information should a Chapel End caller gather?', a: `Gather the exact address and threshold, controller, door construction, visible lock markings and observable fault rather than using the historic centre boundary or unit count.` },
  ],
  'bermuda-park': [
    { q: 'What does the Bermuda Park railway source actually verify?', a: `It verifies the station's opening history and two dated passenger figures. It does not define the wider route, premises, access or current activity.` },
    { q: 'How should a Bermuda Park property be identified for booking?', a: `Use the complete property and unit address, exact private or shared entrance and responsible person; station proximity alone is not sufficient property information.` },
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
    { q: 'What current Cawston fact does the directory support?', a: `It lists Cawston Parish Council and provides its contact location. That hall address does not define the service route or an administrative boundary.` },
    { q: 'What information should a Cawston caller provide?', a: `Provide the full property and threshold, controller, door images, hardware marks and symptoms; parish, ward and postal labels cannot replace an exact address.` },
  ],
  'long-lawford': [
    { q: 'Which Long Lawford properties are verified as listed?', a: `The evidence verifies Lawford Hill Farmhouse and the Church of St John as named Grade II assets, not surrounding Long Lawford premises.` },
    { q: 'What should be prepared for a Long Lawford booking?', a: `Prepare the exact property and door, responsible controller, current status where relevant, hardware photographs, readable markings and observed operation or damage.` },
  ],
  'new-bilton': [
    { q: 'Do the New Bilton sources describe private properties?', a: `No. They concern a consultation proposal at one recreation ground and a dated ward-level council pilot, not individual premises or building conditions.` },
    { q: 'How should a New Bilton caller identify the service address?', a: `Provide the complete current property and unit, exact affected threshold, controller and actual door evidence rather than using the ward or recreation ground.` },
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
      q: 'Does a managed or protected door need approval before an upgrade?',
      a: "Check the exact building's current listing, conservation, lease or management requirements before visible alteration. The authorised decision-maker must approve the compatible specification and expected cost.",
    },
  ],
}

const HUB_CONTEXT_ONLY_LOCALITY_PATTERNS: Partial<Record<AreaSlug, RegExp>> = {
  attleborough: /\b(?:medieval|manor|1888|1243|domesday|historic environment record|historic-study|historic record|heritage association)\b/i,
  stockingford: /\b(?:manor|medieval|historic map|historic record|street register|street schedule|highway-locality|highway labels|stockingford street labels|locality sources)\b/i,
  weddington: /\b(?:walkabout|engagement streets|meadows|public park|park entry|housing schedule|locality evidence)\b/i,
  'horeston-grange': /\b(?:woodlands walk|public-space|park directory|street register|county register|highway labels|locality records)\b/i,
  'camp-hill': /\b(?:walkabout|queen elizabeth road|public park|park entry|housing streets|housing schedule|locality evidence)\b/i,
  'bermuda-park': /\b(?:station|passenger|railway|rail history|rail chronology|transport history|transport figures|transport record)\b/i,
  cawston: /\b(?:parish|questionnaire|2010|2009|community hall|administrative directory|community plan|action plan|administrative evidence)\b/i,
  'new-bilton': /\b(?:play-area|play area|recreation ground|ward pilot|hyperlocal|consultation|public-space proposal|council pilot)\b/i,
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
  attleborough: [
    (serviceLabel, checks) => `Build the ${serviceLabel} brief as a chronological evidence sequence for the present entrance. ${checks[0]} ${checks[1]} Keep ${serviceLabel} caller reports, photographs and measurements labelled separately so an untested symptom is not mistaken for a finding made at the door.`,
    (serviceLabel, checks) => `Close the ${serviceLabel} decision with a traceable scope boundary. ${checks[2]} State which observation supports the next ${serviceLabel} step, what still needs direct testing, who can approve it and when a changed method or price would require fresh agreement.`,
  ],
  stockingford: [
    (serviceLabel, checks, context) => `Use a component-by-component worksheet for the ${serviceLabel} request instead of one broad description. ${checks[0]} ${checks[1]} Give ${context.inspectionItems} separate entries, marking each item as reported, photographed, measured or awaiting inspection.`,
    (serviceLabel, checks, context) => `Turn that worksheet into a bounded ${serviceLabel} proposal only after responsibility is clear. ${checks[2]} Link ${context.outcomes} to the relevant recorded item, then list retained material, exclusions, follow-on work and any price variation requiring approval.`,
  ],
  weddington: [
    (serviceLabel, checks, context) => `Separate the customer's account from the safe tests used for this ${serviceLabel} assessment. ${checks[0]} ${checks[1]} Record the order of events and changes in ${context.observations}, because a reproducible sequence is more useful than a guessed component or method.`,
    (serviceLabel, checks, context) => `Use the comparison to define what the ${serviceLabel} visit must resolve. ${checks[2]} Identify ${context.controlledSubject}, note any test that could not be completed safely, and connect ${context.outcomes} to the evidence actually available.`,
  ],
  'horeston-grange': [
    (serviceLabel, checks, context) => `Treat the ${serviceLabel} instruction as a threshold-control problem with a named opening and decision-maker. ${checks[0]} ${checks[1]} Identify who controls ${context.controlledSubject} before removal, measurement or temporary attachment, and record which person supplied each instruction.`,
    (serviceLabel, checks, context) => `Make the ${serviceLabel} handover usable to the person controlling that threshold. ${checks[2]} Describe ${context.issue}, the inspection still required and anything excluded from the proposed scope. Record ${context.outcomes}, including later repair or approval questions and the basis of the expected price.`,
  ],
  'camp-hill': [
    (serviceLabel, checks, context) => `Create a present-condition brief before deciding the ${serviceLabel} scope. ${checks[0]} ${checks[1]} Capture ${context.observations} at the identified opening, while keeping supplied photographs and caller descriptions distinct from observations that require attendance.`,
    (serviceLabel, checks, context) => `Convert that ${serviceLabel} brief into explicit decision branches rather than a single assumed outcome. ${checks[2]} Say which finding would support ${context.outcomes}, then record the responsible customer, included material, unresolved dependencies, inspection limits and any agreed price change.`,
  ],
  'bermuda-park': [
    (serviceLabel, checks, context) => `Organise the ${serviceLabel} booking by property, unit, controlled opening and responsible contact. ${checks[0]} ${checks[1]} Add ${context.issue}, safe-access restrictions, photographs and relevant identifiers as separate fields so the instruction does not collapse several entrances into one.`,
    (serviceLabel, checks, context) => `Use those fields to prepare a precise ${serviceLabel} inspection and approval route. ${checks[2]} The resulting proposal should state the observed basis, measurements still required, ${context.outcomes}, exclusions, responsible approver, inspection limits and how any on-site change to work or price will be handled.`,
  ],
  cawston: [
    (serviceLabel, checks, context) => `Keep authority, symptoms and physical evidence in separate parts of the ${serviceLabel} record. ${checks[0]} ${checks[1]} Identify what the customer reports, what photographs show and what must still be checked at the opening, including ${context.observations}.`,
    (serviceLabel, checks, context) => `Resolve those parts in order before agreeing the ${serviceLabel} work. ${checks[2]} First confirm the responsible person, then test or measure ${context.inspectionItems}, and finally document ${context.outcomes}, including limits, follow-on questions and expected price.`,
  ],
  'new-bilton': [
    (serviceLabel, checks, context) => `Work forward from the entrance's present condition when preparing the ${serviceLabel} instruction. ${checks[0]} ${checks[1]} Note ${context.observations}, without turning an address label into a mechanical conclusion.`,
    (serviceLabel, checks, context) => `Set a clear decision point for every proposed ${serviceLabel} action. ${checks[2]} Explain what inspection result would justify ${context.outcomes}, what remains outside the work, who must approve it and when revised findings require a new price agreement.`,
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

const HUB_CONTEXT_ONLY_PAIR_CLOSERS: Partial<Record<AreaSlug, Partial<Record<ServiceAreaSlug, string>>>> = {
  'camp-hill': {
    'lock-change': 'Record separately whether the cylinder, lock case, keep or door alignment supports repair, adjustment or measured replacement before agreeing the final component work list.',
  },
  'new-bilton': {
    'lock-change': 'Retain each serviceable component unless the inspection and key-control objective support its measured replacement.',
    'upvc-lock-repair': 'State whether alignment, the fitted mechanism or both remain in scope after the measured operating comparison.',
  },
}

const SERVICE_TECHNICAL_CHECK_FALLBACKS: Record<ServiceAreaSlug, string> = {
  'emergency-lockout': 'Record the inspected opening method, affected component and any reinstatement still required.',
  'lock-change': 'Record the measured component, retained hardware, supplied keys and final operation.',
  'upvc-lock-repair': 'Record the safe operating tests, measured mechanism details and confirmed repair scope.',
  'boarding-up': 'Record the damaged opening, temporary attachment, covered material and permanent repair still required.',
  'lock-upgrade': 'Record the inspected assembly, exact product evidence, measured fit and agreed upgrade scope.',
}

const HUB_CONTEXT_ONLY_CHECK_FALLBACK_OVERRIDES: Partial<Record<AreaSlug, Partial<Record<ServiceAreaSlug, string>>>> = {
  weddington: {
    'emergency-lockout': 'Record the opening method chosen after safe comparison, the component affected and any reinstatement still required.',
  },
  cawston: {
    'emergency-lockout': 'Link the selected opening method to the inspected condition, then note any affected component and reinstatement work.',
  },
  'new-bilton': {
    'emergency-lockout': 'Document which inspected condition supports the opening method, plus any component work or reinstatement outside it.',
  },
}

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
    reviewedOn: REVIEWED_ON,
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
        text: `The borough council derives Nuneaton's name from a twelfth-century Benedictine nunnery and dates the market's establishment to 1247.`,
        sourceIds: ['nbbc-nuneaton-town-centre'],
        serviceRelevance: `This supports attributed historic context only; it cannot be used to characterise a customer's building, entrance or hardware.`,
      },
      {
        text: `The council describes Nuneaton's town-centre core as pedestrian, served by bus and train stations, with Riversley Park a short walk away.`,
        sourceIds: ['nbbc-nuneaton-town-centre'],
        serviceRelevance: `These landmarks can assist orientation but cannot identify the customer's building, threshold, property status or access arrangements.`,
      },
      {
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
    serviceEvidenceMode: 'hub-context-only',
    summary: [
      `Warwickshire's Historic Environment Record describes the probable extent of Attleborough's medieval settlement by reference to the first-edition 1888 Ordnance Survey map. That record describes historic research, not every modern address.`,
      `The same record says Attleborough is absent from Domesday and records a 1243 lease of its manor by the Prioress of Chaise-Dieu to Nuneaton. These are documentary-history facts, not current property-status evidence.`,
    ],
    accessGuidance: `Provide the complete Attleborough address and identify the working entrance without using the medieval-settlement record or its historic map description as an access boundary. Include the threshold controller and any shared-building instructions.`,
    evidenceLimits: `The Historic Environment Record is not a blanket conservation or listing designation, its map point is expressly illustrative, and the Heritage SPD entry concerns Former Albion Works only. Current status for any other property, ownership, construction, door system, condition and lawful authority require separate evidence.`,
    facts: [
      {
        text: `The Warwickshire record describes the probable Attleborough medieval-settlement extent using the first-edition 1888 Ordnance Survey map.`,
        sourceIds: ['warwickshire-her-attleborough-medieval'],
        serviceRelevance: `This dated mapping can prompt an exact-site check but cannot identify the age, status or fabric of a present entrance.`,
      },
      {
        text: `The record says Attleborough is absent from Domesday and that the Prioress of Chaise-Dieu leased the manor to Nuneaton in 1243.`,
        sourceIds: ['warwickshire-her-attleborough-medieval'],
        serviceRelevance: `The documentary history supplies locality context only and must not be projected onto a modern property, entrance or estate.`,
      },
      {
        text: `The council's Heritage SPD 2026 lists Former Albion Works at 64-122 Attleborough Road, Nuneaton CV11 4JJ among locally listed buildings outside conservation areas and marks it as a landmark.`,
        sourceIds: ['nbbc-heritage-spd-2026'],
        serviceRelevance: `This identifies that named asset only; confirm the exact number or unit, current status and responsible controller before visible work, and do not infer installed hardware.`,
      },
    ],
    factOnlySourceIds: ['nbbc-heritage-spd-2026'],
    sources: [LOCAL_SOURCES['warwickshire-her-attleborough-medieval'], LOCAL_SOURCES['nbbc-heritage-spd-2026']],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'An Attleborough lockout starts with the present entrance',
        body: [
          `Attleborough's recorded medieval extent and 1243 manor lease are historic-study facts, not directions to a customer's door. A lockout booking should name the full current address, exact threshold and whether the opening is private or shared, then identify the caller's connection to it. That prevents an old mapped locality from being confused with present access and lets the locksmith examine the actual latch, deadlocking, key behaviour and damage only after authority is established.`,
          `The Historic Environment Record does not itself designate every property, so preservation questions should remain conditional. If the door or surrounding material appears significant, document it and verify present status before a destructive step affects visible fabric. Explain any inspection-led scope change before work proceeds. Separately, MLA guidance supports checking identity and authority, giving available price information in advance and securing agreement if the service-call price changes. The opening decision should therefore be based on inspected hardware, safety and verified authority, with any wider reinstatement or property-status question recorded as a separate next action.`,
        ],
        checks: ['Give the complete current Attleborough address', 'Identify the private or shared threshold', 'Document older-looking material before intervention'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Component-first lock replacement at an Attleborough address',
        body: [
          `The 1888 mapping basis and 1243 lease illustrate why historic documentary evidence cannot date a present Attleborough door. Before a lock change, state whether the purpose is key control, mechanical failure or damage and supply clear images of the hardware and door edge. Record the cylinder, case, keep and alignment as separate inspection questions; retention or replacement must follow observed condition, markings and measurements instead of the apparent age of the area.`,
          `If an exact-site check reveals a current designation beyond the Historic Environment Record, describe whether the proposed change stays within existing apertures or affects visible material. A shared threshold also needs its responsible controller identified before keys or hardware change. The written scope should list the diagnosed component, items retained, replacement dimensions, keys and fitting work, while any property-status question remains explicitly pending rather than inferred from the medieval-settlement map or manor history.`,
        ],
        checks: ['Explain the purpose of the change', 'Record lock markings and door dimensions', 'Verify current status only for the address'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Attleborough uPVC diagnosis without historic-landscape guesses',
        body: [
          `A mapped medieval settlement and thirteenth-century manor lease do not show whether today's affected entrance is uPVC, composite or another material. Once the actual door is identified, record whether the key turns, the handle lifts, locking points move and operation changes against the frame. Treat the open-and-closed comparison as a symptom record for this Attleborough door: neither the 1888 settlement mapping nor the 1243 manor lease identifies a failed component. A faceplate image can support identification, but backset, centres and layout still need confirmation before a component is specified.`,
          `The historic record is not a parcel-level control, so do not attach a preservation restriction to the repair without a current address check. Equally, a later mechanism does not answer who controls a communal threshold or whether a managed door has separate requirements. The repair record should name the door, controller, symptoms, measurements and scope boundary. If work would extend into visible material with verified status, that alteration can be referred independently from the internal mechanical diagnosis.`,
        ],
        checks: ['Confirm the actual door material first', 'Compare safe open and closed operation', 'Measure the identified multipoint components'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Documenting Attleborough damage before temporary boarding',
        body: [
          `Attleborough's historic settlement map and manor lease provide no evidence about a damaged modern opening. After following police instructions, photograph the point of entry, frame, glazing or door leaf, broken hardware and surrounding material before it is covered. Confirm which present threshold is affected and who controls it. That evidence supports dimensions and a temporary plan without inventing a link between the incident, building construction and the Historic Environment Record.`,
          `If current checking identifies protected fabric at the specific site, record surviving surfaces before temporary work. The plan should preserve the evidence trail and avoid turning an unverified heritage association into an installation assumption. Its completion record should show the temporary scope, covered damage and unresolved glazing, joinery, lock or structural work. A permanent repairer can then review clear documentation while any designation question is addressed from current records rather than the 1888 mapping basis.`,
        ],
        checks: ['Follow the police evidence sequence', 'Photograph the precise damaged opening', 'Keep heritage status specific to the address'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Assessing an Attleborough entrance before upgrading hardware',
        body: [
          `Attleborough's Historic Environment Record supplies no security specification. An upgrade should begin with the actual door, frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable. Warwickshire Police guidance supports assessing the complete entrance and considering correctly sized, accredited products. Measurements and marked evidence can then inform an option, while any misalignment or frame weakness is documented rather than hidden behind a locality-based recommendation.`,
          `The medieval-settlement extent and manor history are not blanket designations. If an upgrade could change outward fabric, check current property status and record the existing cut-outs and furniture before proposing it. For common hardware, identify the responsible building party and any building-management constraint. The final plan should state retained elements, current product documentation and dependencies, without treating historic surroundings as proof of the entrance's present construction or risk.`,
        ],
        checks: ['Survey the whole working entrance', 'Check current property records where relevant', 'Verify dimensions and manufacturer documentation'],
      },
    },
  }),
  stockingford: makeGuide({
    slug: 'stockingford',
    serviceEvidenceMode: 'hub-context-only',
    summary: [
      `Warwickshire's Historic Environment Record describes documentary and cartographic research into the former Manor of Stockingford and Galley Common. It records suggested medieval-settlement evidence rather than a boundary for the modern locality.`,
      `Warwickshire County Council's street register, produced on 11 August 2026, assigns selected entries including Beaumont Place, Beaumont Road and Whitehouse Crescent to Stockingford, Nuneaton. It is not a property inventory.`,
    ],
    accessGuidance: `Use the full Stockingford address and identify the affected entrance directly. The county street-locality labels and historic manor record can help distinguish place names but do not establish a route boundary or property access.`,
    evidenceLimits: `The historic record synthesises documentary research and the current street register lists selected highway labels. Neither source proves parcel boundaries, building age, entrance control, door construction, property status or lock condition.`,
    facts: [
      {
        text: `The Warwickshire record describes documentary and map research into the former Manor of Stockingford and associated Galley Common settlement evidence.`,
        sourceIds: ['warwickshire-her-stockingford-galley-manor'],
        serviceRelevance: `This supports limited historic context only and cannot establish the character or status of the service address.`,
      },
      {
        text: `The county street register produced on 11 August 2026 assigns Beaumont Place, Beaumont Road and Whitehouse Crescent to Stockingford, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `These selected street labels can assist address checking but cannot establish the route boundary, threshold, access or property conditions.`,
      },
      {
        text: `Warwickshire County Council's school directory identifies Stockingford Academy as a primary academy at Cross Street, Nuneaton, Warwickshire CV10 8JH.`,
        sourceIds: ['wcc-stockingford-academy'],
        serviceRelevance: `This record applies only to the named school site; any booking there still requires the exact entrance and an authorised site contact, and it says nothing about surrounding properties or locks.`,
      },
    ],
    factOnlySourceIds: ['wcc-stockingford-academy'],
    sources: [
      LOCAL_SOURCES['warwickshire-her-stockingford-galley-manor'],
      LOCAL_SOURCES['wcc-list-of-streets-2026'],
      LOCAL_SOURCES['wcc-stockingford-academy'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Separating a Stockingford address from dated planning labels',
        body: [
          `The former-manor record and current county street register describe different locality evidence, neither of which identifies a locked door. Preparation should use the complete current address, name the affected private or common threshold and establish who controls it. A listed Stockingford street is useful only for address checking. The authority check and mechanical assessment must still concern the actual latch, deadlocking, key behaviour and existing damage at that opening.`,
          `Because neither cited source provides parcel-level designation, an older-looking Stockingford entrance should be documented without presuming protected status. If an opening method might remove visible material, check current records and explain that additional scope before proceeding. The MLA source separately supports identity-and-authority checks, available price information in advance and agreement before a changed service-call price applies, while the lock inspection supports technique. Keeping those evidence streams separate prevents historic manor research or a highway-locality label from becoming an unsupported claim about the customer's building.`,
        ],
        checks: ['Provide the full current Stockingford address', 'Name the exact private or common door', 'Check present status before fabric removal'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Scoping a Stockingford lock change from component evidence',
        body: [
          `A medieval manor reference and current street schedule cannot select hardware for Stockingford. The change request should record its purpose, images of the handles and edge plate, readable codes and the way the door closes. Record the cylinder, lock case, keep and alignment as separate inspection questions before deciding what should be retained. This avoids turning the historic map research or Stockingford highway labels into assumptions about the door's age, material or mechanism.`,
          `If present-day records reveal a property constraint, define whether the proposed work stays within an existing aperture or changes visible external fabric. The locality sources themselves do not answer that question. A communal door also requires its controller and keying arrangement to be established. The next-step schedule should list the diagnosed component, measured replacement, keys, adjustment and any unresolved property or building-management issue, giving each decision an evidence source rather than treating Stockingford as one uniform building context.`,
        ],
        checks: ['Record why key control must change', 'Inspect the case, keep and alignment', 'Verify the controller of shared hardware'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Testing a Stockingford uPVC fault without area inference',
        body: [
          `The council evidence says nothing about the distribution of uPVC doors in Stockingford. For the specific affected door, record handle travel, key movement, hook or roller operation and any rubbing against the frame. If the leaf is safely open, record operation before it meets the keeps as a reproducible symptom; that sequence does not identify the failed component. Full faceplate markings and measurements remain necessary before compatible parts can be identified.`,
          `The county's selected Stockingford street labels do not define the route boundary or decide who controls an entrance. Confirm whether the mechanism belongs to a private door, shared threshold or managed system, then check any current property status only if visible fabric may be affected. The repair note should list tests, geometry, controller and next diagnostic step. Historic manor evidence remains clearly outside the mechanical conclusion and cannot justify a promised component or repair result.`,
        ],
        checks: ['Describe handle and key movement in order', 'Photograph the complete multipoint faceplate', 'Distinguish private from managed hardware'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'A documented temporary-board plan for Stockingford',
        body: [
          `Neither a medieval-manor record nor the current street register describes a damaged Stockingford opening. Follow police instructions, then photograph the point of entry, remaining frame, glazing or door, broken hardware and surrounding material before covering it. Identify the exact current threshold and responsible person, rather than using a highway-locality label as a substitute. These observations document the opening and preserve evidence for later technical assessment.`,
          `Because the cited sources do not confer blanket property status, define the temporary scope from the inspected damage and any separately verified current designation. Record sound and damaged material and what temporary work will conceal. The completion note should identify the covered damage and outstanding lock, glazing, joinery or structural work. That record gives the permanent repairer a reliable starting point and keeps former-manor research and street labels out of an unrelated property conclusion.`,
        ],
        checks: ['Preserve the scene as police direct', 'Photograph damage before temporary covering', 'Record remaining permanent repair questions'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Building a Stockingford upgrade from present measurements',
        body: [
          `Stockingford's recorded manor and county street labels do not describe an entrance's resistance. A useful upgrade assessment inspects the door leaf, frame, hinges, keeps, handles, lock operation and cylinder projection if present. Warwickshire Police guidance supports looking at that complete assembly and considering correctly sized, accredited products. Markings and dimensions then inform suitable options, while alignment and frame condition remain explicit parts of the diagnosis rather than being obscured by area-level history.`,
          `Before altering outward material, check current property status because neither the historic record nor street register is a parcel designation. For common hardware, establish who controls the threshold and any applicable building-management requirements. The written specification should distinguish adjustment, reinforcement and product replacement, cite current manufacturer documentation for the exact product, and list any fabric question requiring separate advice. This creates a conditional plan without claiming that Stockingford's locality records predict the existing lock or eliminate forced-entry risk.`,
        ],
        checks: ['Assess the complete existing entrance', 'Measure hardware before comparing products', 'Check current constraints for visible work'],
      },
    },
  }),
  weddington: makeGuide({
    slug: 'weddington',
    serviceEvidenceMode: 'hub-context-only',
    summary: [
      `The council's current housing walkabout schedule has a Weddington row naming Carisbrook Road, Cleaver Gardens, Niton Road and Ryde Avenue. It is an engagement schedule for selected housing streets, not a locality boundary.`,
      `A separate council directory classifies Weddington Meadows and Walk as a nature and wildlife park. The named public space supplies orientation context only and says nothing about a customer's building or entrance.`,
    ],
    accessGuidance: `Provide the complete present-day Weddington address, entrance position and responsible contact. Do not use the four scheduled walkabout streets or Weddington Meadows and Walk as proof of the property's route, boundary or access arrangements.`,
    evidenceLimits: `The sources identify selected streets in a council housing engagement schedule and one named public park. They do not verify a complete locality, mapped parcels, property status, tenure, construction, door material, lock system or authority.`,
    facts: [
      {
        text: `The council's housing walkabout schedule lists Carisbrook Road, Cleaver Gardens, Niton Road and Ryde Avenue under Weddington.`,
        sourceIds: ['nbbc-tenant-walkabouts-2026'],
        serviceRelevance: `The selected engagement streets can aid address checking but cannot be used as a complete locality boundary or access description.`,
      },
      {
        text: `The council's parks directory identifies Weddington Meadows and Walk and classifies it as a nature and wildlife park.`,
        sourceIds: ['nbbc-weddington-meadows-walk'],
        serviceRelevance: `The public-space name can aid orientation only; property location, access and entrance conditions need independent checking.`,
      },
      {
        text: `Warwickshire County Council's school directory identifies Weddington Primary School as a community school at Winchester Avenue, Nuneaton, Warwickshire CV10 0DR.`,
        sourceIds: ['wcc-weddington-primary-school'],
        serviceRelevance: `This facility record applies only to the named school; it does not establish access, authority, construction or hardware at the school or any other Weddington address.`,
      },
    ],
    factOnlySourceIds: ['wcc-weddington-primary-school'],
    sources: [
      LOCAL_SOURCES['nbbc-tenant-walkabouts-2026'],
      LOCAL_SOURCES['nbbc-weddington-meadows-walk'],
      LOCAL_SOURCES['wcc-weddington-primary-school'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'A Weddington lockout uses the current address, not public-place labels',
        body: [
          `The Weddington walkabout schedule names only selected housing streets, so it cannot identify which modern threshold a caller means. Prepare the full current address, door position and whether it serves one occupier or a shared route. Weddington Meadows and Walk may help with general orientation, but it proves no access condition. Authority should be tied to the actual opening before latch, key and deadlock behaviour are diagnosed.`,
          `Neither the engagement schedule nor park directory supplies a parcel-level conservation or listing decision. If an opening method could affect older-looking material, photograph the door and verify current property status instead of treating a locality label as protection. Explain any inspection-led change in scope before work continues. The MLA source separately supports confirming identity and authority, giving available price information in advance and obtaining agreement if the service-call price changes. Any drilling or replacement should follow inspection and a documented decision, while possible visible-fabric work remains a separate, address-specific question for the responsible owner or authority.`,
        ],
        checks: ['State the complete current Weddington address', 'Identify who controls the locked threshold', 'Check current status before altering fabric'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Evidence-led lock changes for a Weddington entrance',
        body: [
          `A housing walkabout street or named public park does not identify hardware at a Weddington property. Begin with the reason for the change, then record the door faces, edge plate, lock markings and closing behaviour. Cylinder, case, keep and alignment are separate inspection questions; the reported symptom does not identify which component, if any, requires work. Retention or replacement should follow the observed condition, measurements and key-control requirements, while the locality sources supply no basis for a product choice.`,
          `Because the selected-street schedule is neither an address lookup nor a current designation, any external-fabric issue needs a separate present-day check. A communal threshold also requires the person responsible for its shared keys and hardware to define the scope. The written proposal should identify the exact component, dimensions, retained material, keys and adjustment. If new cutting or visible substitution is contemplated, list it as a distinct next decision rather than attributing permission or restriction to Weddington's public-place labels.`,
        ],
        checks: ['Describe the exact key-control objective', 'Photograph lock markings before selection', 'Separate component work from external alteration'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Diagnosing Weddington multipoint hardware from present symptoms',
        body: [
          `The council's walkabout and park records do not indicate whether any Weddington entrance uses uPVC or composite construction. For the door in question, describe key rotation, handle lift, hook or roller movement and whether contact with the frame changes operation. Keep that comparison attached to the identified Weddington threshold, because neither the named walkabout streets nor Weddington Meadows can identify the failed component. The faceplate, centres, backset and locking layout must still be recorded before compatibility is stated.`,
          `Selected streets in a housing engagement schedule do not establish current ownership of a Weddington threshold. Confirm whether the mechanism is private, communal or managed before removing components. If a proposed repair reaches visible external material, check current property records separately. The job note should keep mechanical findings, authority and property status distinct, with measurements and unresolved building-management or fabric questions controlling the next step rather than the locality labels.`,
        ],
        checks: ['Record key and handle behaviour carefully', 'Compare frame contact only when safe', 'Confirm control of any shared door'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Temporary boarding at a Weddington address with a clear evidence trail',
        body: [
          `The four streets named in the Weddington walkabout schedule and the named public park do not describe a damaged opening. Follow police directions before disturbing the scene, then photograph the frame, glazing or door, broken lock parts and adjacent material. Identify the exact threshold and person controlling it. That current evidence documents the opening while preventing a public-place label from being mistaken for a property, access or construction fact.`,
          `Since neither locality source establishes parcel status, define temporary work from the inspected damage plus any separately verified designation. Record the surface to be covered and each remaining defect. The completion note should state the temporary scope and unresolved glazing, joinery, lock or structural work. This preserves the next specialist's view of the problem and keeps temporary action separate from any permanent alteration requiring current property-specific advice.`,
        ],
        checks: ['Follow current police scene instructions', 'Photograph everything the board will hide', 'Document all permanent work still required'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'A present-condition security review for Weddington',
        body: [
          `The Weddington walkabout and park records provide no evidence about an entrance's existing security. The named walkabout streets and Weddington Meadows cannot narrow the hardware choice, so review the identified entrance as a complete assembly: leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police guidance supports whole-door assessment and correctly sized, accredited products. Current markings and measurements can then support an improvement option, while alignment, weak surrounding material or a shared system remain explicit constraints rather than being guessed from a street or public-space name.`,
          `Before an upgrade changes outward appearance or creates new cuts, verify present property status because neither locality source is a designation. The responsible person should also define the allowable scope for common or managed shared-door hardware. A useful specification separates adjustment, reinforcement and replacement, states the current product documentation and fitting dimensions, and identifies any fabric question for further advice. It must also explain the limits of that documentation rather than claim that one product resolves every possible route through a Weddington entrance.`,
        ],
        checks: ['Inspect hinges, keeps and frame condition', 'Verify marked products against measured fit', 'Use current records for external changes'],
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
    evidenceLimits: `The sources are a public-park directory entry and a current highway-locality register, not parcel or property records. They prove no access arrangement, tenure, building construction, door material, mechanism, service history or demand.`,
    facts: [
      {
        text: `The borough council lists Horestone Grange Woodlands Walk as a local park at Launceston Drive with surfaced footpaths.`,
        sourceIds: ['nbbc-horestone-grange-woodlands-walk'],
        serviceRelevance: `This public-space entry can assist orientation but cannot define a private property, locality boundary or entrance.` ,
      },
      {
        text: `The county street register produced on 11 August 2026 assigns Crediton Close, Seaton Close and St Ives Way to Horeston Grange, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `Those selected highway labels can support address checking but supply no evidence about hardware, access or service needs.`,
      },
      {
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
        text: `The county street register produced on 11 August 2026 assigns Fairway, Falcon Close and Falstaff Close to Whitestone, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `These selected street labels can support address checking but cannot be converted into a full boundary or property description.`,
      },
      {
        text: `The same register assigns St Andrews Drive, Whitestone Road and Willowfields Road to Whitestone, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `The highway-locality entries say nothing about the premises, exact entrance, authority or hardware at an address.`,
      },
      {
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
    serviceEvidenceMode: 'hub-context-only',
    summary: [
      `The council's housing walkabout schedule has a Camp Hill row naming streets including Almond Avenue, Green Lane, Hillcrest Road, Queen Elizabeth Road and Sycamore Road. It covers selected housing locations, not every address.`,
      `The council separately lists Queen Elizabeth Road as a local park at CV10 9BU with a play area, multi-use games area, outdoor gym, seating and surfaced footpaths. This is public-space context only.`,
    ],
    accessGuidance: `Use the complete current Camp Hill address, exact entrance and responsible contact. The selected walkabout streets and Queen Elizabeth Road park can aid orientation but cannot prove a locality boundary or property access.`,
    evidenceLimits: `The locality evidence is a housing engagement schedule and one park directory entry. It does not establish neighbourhood extent, parcel designation, building type, tenure, door construction, lock condition, access rights or service history.`,
    facts: [
      {
        text: `The council housing walkabout schedule names Almond Avenue, Green Lane, Hillcrest Road, Queen Elizabeth Road and Sycamore Road under Camp Hill.`,
        sourceIds: ['nbbc-tenant-walkabouts-2026'],
        serviceRelevance: `The selected housing streets can aid address checking but cannot describe a route boundary, premises, entrance or hardware.`,
      },
      {
        text: `The council directory lists Queen Elizabeth Road as a local park at Nuneaton CV10 9BU and records several public facilities there.`,
        sourceIds: ['nbbc-queen-elizabeth-road-park'],
        serviceRelevance: `The public-space entry supplies orientation only and must not be used to infer a customer's property, entrance or access.`,
      },
      {
        text: `Warwickshire County Council's school directory identifies Camp Hill Primary School as a primary academy at Holly Stitches Road, Nuneaton, Warwickshire CV10 9QA.`,
        sourceIds: ['wcc-camp-hill-primary-school'],
        serviceRelevance: `This facility record applies only to the named school; it proves no access rights, entrance arrangement, construction or lock details there or at surrounding addresses.`,
      },
    ],
    factOnlySourceIds: ['wcc-camp-hill-primary-school'],
    sources: [
      LOCAL_SOURCES['nbbc-tenant-walkabouts-2026'],
      LOCAL_SOURCES['nbbc-queen-elizabeth-road-park'],
      LOCAL_SOURCES['wcc-camp-hill-primary-school'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'A Camp Hill lockout anchored to the current threshold',
        body: [
          `The Camp Hill walkabout street list and Queen Elizabeth Road park cannot identify a customer's door. Prepare the full current address, entrance position and whether the threshold is private or shared, then establish the caller's connection to it. A meeting location or public-space name does not broaden that authority. Inspection of latch state, key movement, deadlocking and damage should begin only after the correct opening is established.`,
          `The council locality sources provide no property-status finding. If the opening method could remove visible material from an older-looking entrance, photograph it and consult current records where relevant rather than assuming a constraint. Any inspection-led scope change should be explained before continuing. MLA guidance supports proof of identity and authority, available price information in advance and agreement if the service-call price changes. A destructive step, if inspection makes one necessary, should identify the exact affected component and reinstatement need, leaving any wider external alteration for a separate decision grounded in present property evidence.`,
        ],
        checks: ['Give the full present Camp Hill address', 'Confirm the exact controlled threshold', 'Check current records before fabric removal'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Camp Hill replacement decisions based on the fitted component',
        body: [
          `The Queen Elizabeth Road park entry does not indicate whether a Camp Hill door uses a cylinder, nightlatch, mortice case or multipoint system. Explain the purpose of the change, then photograph both handle faces, the edge and visible codes. Record the component, alignment and surrounding-frame condition as separate inspection questions. Markings, measurements and key-control needs, rather than a nearby public-space name, should inform what is retained or replaced.`,
          `A shared door requires its hardware controller and keying scope to be confirmed independently of the housing walkabout schedule. If the proposed work would cut or substitute external material, obtain current address-level status because neither council source is a designation. The written next step should list diagnosis, measured product, keys, fitting, adjustment and any held-over fabric or building-management question. That structure prevents selected Camp Hill street references from being misused as present authority or property evidence.`,
        ],
        checks: ['Explain why the lock must change', 'Record faceplate codes and dimensions', 'Identify who controls shared keys'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Camp Hill multipoint diagnosis from door behaviour',
        body: [
          `The walkabout and park records contain no evidence that an affected Camp Hill entrance is uPVC or composite. Confirm the material, then record whether the key rotates, the handle reaches its normal position and the hooks or rollers move. When safe, record operation with the door open and against the frame as a reproducible symptom; the comparison does not identify the failed component. Faceplate markings and exact geometry remain necessary before a part is named.`,
          `The selected housing streets cannot tell whether the mechanism belongs to one occupier or a common entrance. Establish the responsible person and any building-management constraint before dismantling it. A visible-fabric change also requires present property information, not a walkabout or park entry. The repair record should state the threshold, symptoms, tests, centres, backset and locking layout and identify the next diagnostic action, keeping Camp Hill public-place references outside the mechanical conclusion.`,
        ],
        checks: ['Verify the door material directly', 'Describe open and closed operation', 'Measure the complete locking geometry'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Evidence-led temporary boarding for a Camp Hill opening',
        body: [
          `A housing walkabout or park entry cannot explain damage at a Camp Hill address. Follow police directions before moving material, then photograph the precise point of entry, remaining frame, glazing or door, compromised lock and nearby surfaces. Identify whether it is a private opening or shared threshold and who controls temporary work. Those current observations establish dimensions and handling needs without claiming that Queen Elizabeth Road or another scheduled street describes the property.`,
          `Since neither source is a parcel or designation map, possible external-fabric constraints must be verified separately. Record intact and damaged material before temporary work. The completion record should state the temporary scope, covered elements and permanent glazing, joinery, door, lock or structural issues still unresolved. This documentation preserves evidence for the next specialist and prevents a public-place reference from becoming an unsupported access, construction or property-status assertion.`,
        ],
        checks: ['Preserve evidence as police instruct', 'Photograph intact and damaged material', 'Record the temporary scope and covered damage'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'A complete-entrance upgrade review in Camp Hill',
        body: [
          `Camp Hill's housing walkabout and park records say nothing about the resistance of a particular entrance. Inspect leaf and frame condition, hinges, keeps, handles, lock engagement and cylinder fit where applicable. Warwickshire Police supports assessing the full door assembly and considering correctly sized, accredited products. Measurements and visible marks can then support suitable options, while misalignment or frame weakness remains separately recorded rather than being obscured by a general neighbourhood label.`,
          `Check current property information before new cutting or an outward hardware change because the council locality sources create no designation. For managed thresholds, establish the responsible party and requirements first. The specification should distinguish adjustment, reinforcement and replacement, provide current manufacturer documentation and note any external-material question for separate advice. It must explain the limits of that documentation without claiming that one product fits Camp Hill generally or that a named park predicts existing hardware.`,
        ],
        checks: ['Inspect door, frame, hinges and keeps', 'Measure before comparing accredited products', 'Verify current constraints for alterations'],
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
        text: `The Warwickshire record describes the Congregational Chapel on Coleshill Road as built in 1840 to replace a chapel of 1807-08.`,
        sourceIds: ['warwickshire-her-chapel-end-chapel'],
        serviceRelevance: `This building-specific record must not be treated as a description or designation of other Chapel End properties.`,
      },
      {
        text: `The county street register produced on 11 August 2026 assigns Alders Lane, Lincoln Avenue and Salisbury Drive to Chapel End, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `The selected highway labels can aid address checking but prove no property condition, entrance, authority or service need.`,
      },
      {
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
    serviceEvidenceMode: 'hub-context-only',
    summary: [
      `Warwickshire County Council records that Bermuda Park station opened on 18 January 2016 after a fifteen-month build connected with improvements to the Nuneaton-Coventry railway line. This is transport history only.`,
      `The same retrospective reports approximately 28,000 station passengers in 2017/18 and just over 38,000 in 2019/20. Those period figures do not establish current usage, local demand or property context.`,
    ],
    accessGuidance: `Provide the full Bermuda Park property address, building or unit and exact affected entrance. The station is a point feature and cannot be used to infer the route boundary, land use or access to premises.`,
    evidenceLimits: `The railway source concerns one station and historic passenger periods; the adopted plan makes a wider-area employment statement. Neither proves a route boundary, the present use or status of an individual property, construction, tenure, entrance arrangement, lock type or service need.`,
    facts: [
      {
        text: `Bermuda Park station opened on 18 January 2016 after a fifteen-month build on the Nuneaton-Coventry line improvement project.`,
        sourceIds: ['wcc-bermuda-park-railway-200'],
        serviceRelevance: `The exact date supports transport history but cannot imply present road access, proximity or service performance.`,
      },
      {
        text: `The council retrospective reports about 28,000 passengers in 2017/18 and more than 38,000 in 2019/20.`,
        sourceIds: ['wcc-bermuda-park-railway-200'],
        serviceRelevance: `These are period-specific station figures and must not become current usage, footfall, demand or incident claims.`,
      },
      {
        text: `The adopted Borough Plan Review's Strategic Policy DS5 describes the wider Bermuda Park area south of Nuneaton, including Faultlands and SEA4, as an employment location of regional significance for inward and local investment.`,
        sourceIds: ['nbbc-borough-plan-review-2021-2039'],
        serviceRelevance: `For a business-site booking, confirm the exact organisation, unit, building, entrance and authorised facilities contact; the policy establishes neither individual use, access nor hardware.`,
      },
    ],
    factOnlySourceIds: ['nbbc-borough-plan-review-2021-2039'],
    sources: [LOCAL_SOURCES['wcc-bermuda-park-railway-200'], LOCAL_SOURCES['nbbc-borough-plan-review-2021-2039']],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'A Bermuda Park lockout needs a property, not a station reference',
        body: [
          `The verified station opening date identifies a railway point, not the door at a Bermuda Park call. Preparation should give the full property and unit, the exact threshold and whether it is private or shared, plus the person who controls it. Historical passenger totals do not show present occupancy or access. The locksmith should connect authority to that opening before assessing whether the latch closed, the lock was deadlocked or a key or mechanism failed.`,
          `The railway source contains no property-status evidence. If entry might require removal of visible material, photograph the door and frame and check any current constraint separately. Any inspection-led scope change should be explained separately. MLA guidance supports proof of identity and authority, available advance price information and agreement only before a service-call price change. The opening method follows the inspected lock and condition, never passenger counts or station proximity. Any reinstatement, shared-system or external-fabric issue should be recorded as its own next decision for the responsible property party.`,
        ],
        checks: ['Give the full property and unit', 'Identify the exact locked threshold', 'Prepare evidence of lawful connection'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Bermuda Park lock changes based on the actual component',
        body: [
          `A 2016 station opening and historic passenger figures provide no clue to the lock fitted at a Bermuda Park address. State whether the change concerns lost keys, a reported failure, damage or another defined objective. Photographs of both hardware faces, the door edge and readable markings prepare an inspection in which cylinder, case, keep and alignment remain separate questions; the reported symptom does not identify a component. Observed condition, measurements and key requirements should inform any replacement rather than an assumed property type around the station.`,
          `Because the locality source does not define land use, ownership or property status, confirm who controls the threshold and check current building information where visible work is proposed. A private unit and common door can require different authority even at one address. The written schedule should list diagnosed components, retained parts, dimensions, keys, fitting and adjustment, and reserve any building-management or external-material question for the responsible party instead of inferring conditions from the rail project.`,
        ],
        checks: ['Define the reason for changing keys', 'Photograph and measure existing hardware', 'Confirm control of any shared entrance'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Bermuda Park multipoint diagnosis without transport inference',
        body: [
          `The station retrospective cannot establish whether an affected Bermuda Park door is uPVC or composite. After confirming the actual material, record key rotation, handle travel, hook or roller movement and the difference between safe open and closed operation. Treat that sequence as evidence of how the identified door behaves, because the station's 2016 opening and historic passenger totals cannot diagnose its failed component. Faceplate marks and exact backset, centres and layout still determine compatibility; railway dates and usage figures determine none of them.`,
          `A station point also reveals nothing about whether the door is privately controlled, communal or managed. Identify the responsible person and any building-management requirements before dismantling hardware. If diagnosis expands into visible material, consult current property records rather than the transport source. The repair note should capture symptoms, tests, measurements and the next diagnostic step, explicitly avoiding claims about local construction or mechanism prevalence based on the Bermuda Park name or historic passenger totals.`,
        ],
        checks: ['Confirm the actual door material', 'Record mechanism movement without forcing', 'Measure faceplate and locking geometry'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Temporary boarding at Bermuda Park from scene evidence',
        body: [
          `Station history and passenger periods cannot describe damage at a Bermuda Park property. Follow police instructions, then photograph the point of entry, frame, glazing or door leaf, compromised hardware and surrounding surface before covering it. Identify whether the opening is private or common and who controls it. Those scene-specific observations establish dimensions and handling requirements without converting a railway point or old usage figure into evidence about a building or incident.`,
          `The locality source supplies no designation or structural information, so define temporary work only after inspecting the remaining material and checking any current property constraint. Record damaged material and what the temporary measure will conceal. The completion record should give the scope and unresolved glazing, joinery, door, lock or structural tasks. This prepares the permanent repairer while keeping the station retrospective outside decisions it cannot support.`,
        ],
        checks: ['Follow police scene guidance first', 'Photograph every covered damaged element', 'Document temporary support and follow-on work'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'Measured security options for a Bermuda Park entrance',
        body: [
          `The railway retrospective says nothing about security hardware at Bermuda Park properties. An upgrade review should inspect the complete door and frame, hinges, keeps, handles, lock engagement and cylinder fit where applicable. The station dates and passenger counts cannot guide a product decision; the cited police guidance instead supports reviewing the whole entrance and considering correctly sized, accredited products. Current markings, measurements and operation can then support a suitable option, while alignment, frame condition or shared access remain separate findings instead of being inferred from station development.`,
          `Since the station is only a point feature, it cannot establish property type, status or management. Check those facts directly before changing visible fabric or common hardware. The specification should distinguish adjustment, reinforcement and replacement, cite current manufacturer documentation and identify any building-management or material question for further advice. Neither the 2016 opening nor old passenger totals justify an area-wide product choice or security outcome.`,
        ],
        checks: ['Inspect the whole entrance assembly', 'Verify product fit and evidence', 'Check property and management constraints directly'],
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
        text: `The Warwickshire record links Galley Common to documentary and map research into the former Manor of Stockingford, including 1592 and 1842 mapping.`,
        sourceIds: ['warwickshire-her-stockingford-galley-manor'],
        serviceRelevance: `The historic research cannot become a current property-status, construction, access, activity or service-demand claim.`,
      },
      {
        text: `The county street register produced on 11 August 2026 assigns Auden Close, Chaucer Drive, Chesterton Drive and Orford Rise to Galley Common, Nuneaton.`,
        sourceIds: ['wcc-list-of-streets-2026'],
        serviceRelevance: `These selected street labels can help check an address but cannot define the modern route or property boundaries.`,
      },
      {
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
        text: `Hartshill Castle is Scheduled Monument 1011197, located between The Green, Holy Trinity church and Castle Road.`,
        sourceIds: ['historic-england-hartshill-castle-1011197'],
        serviceRelevance: `The designation requires a map check for the exact site and cannot be extended to neighbouring addresses.`,
      },
      {
        text: `Historic England records a motte-and-bailey origin during Henry I's reign and enclosure-castle alteration around 1330.`,
        sourceIds: ['historic-england-hartshill-castle-1011197'],
        serviceRelevance: `These phases support attributed monument history only and say nothing about the age or fabric of customer premises.`,
      },
      {
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
        text: `Bedworth Town Centre Conservation Area dates from 1986 and the 2022 appraisal identifies three character areas within it.`,
        sourceIds: ['nbbc-bedworth-conservation-2022'],
        serviceRelevance: `The mapped designation requires an exact-address check before visible external material is treated as protected context.`,
      },
      {
        text: `The county visitor page records Bedworth station on the Coventry-Nuneaton line and Miners Welfare Park's mining-community legacy.`,
        sourceIds: ['visit-warwickshire-bedworth'],
        serviceRelevance: `These named features support attributed orientation and heritage context but cannot establish property access or hardware.`,
      },
      {
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
        text: `Bulkington Conservation Area dates from 1985 and was reviewed in 2008 and 2021 for the 2022 appraisal.`,
        sourceIds: ['nbbc-bulkington-conservation-2022'],
        serviceRelevance: `The review history supports a mapped-status check but cannot establish designation or fabric at every village address.`,
      },
      {
        text: `The appraisal records thirteenth-century fabric at St James Church and an early-seventeenth-century building at 3-4 Church Street.`,
        sourceIds: ['nbbc-bulkington-conservation-2022'],
        serviceRelevance: `The named dates must remain asset-specific and cannot be transferred to a customer's premises or door.`,
      },
      {
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
        text: `Rugby Town Centre Conservation Area covers most of the commercial centre along the historic road layout between defined northern and southern contexts.`,
        sourceIds: ['rbc-rugby-town-centre-appraisal'],
        serviceRelevance: `The mapped extent requires exact-address verification before central townscape context is applied to visible property fabric.`,
      },
      {
        text: `The London-Birmingham railway opened in 1838 and five additional companies added Rugby routes within the following twelve years.`,
        sourceIds: ['rbc-rugby-town-centre-appraisal'],
        serviceRelevance: `The railway chronology supports attributed history only and cannot imply current access, proximity or service performance.`,
      },
      {
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
        text: `Hillmorton Locks is a small canal-centred conservation area separated from Hillmorton housing by a railway embankment and narrow tunnel.`,
        sourceIds: ['rbc-hillmorton-locks-appraisal'],
        serviceRelevance: `This context applies only to the mapped locks settlement and cannot establish access to another Hillmorton address.`,
      },
      {
        text: `The locks settlement developed around canal workshops, a dry dock and housing, with continuing uses recorded at appraisal time.`,
        sourceIds: ['rbc-hillmorton-locks-appraisal'],
        serviceRelevance: `The canal-industrial history may be attributed but does not date or describe a customer's building or entrance.`,
      },
      {
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
        text: `Bilton was once a separate village, merged into Rugby in the 1930s, and only part lies within the conservation area.`,
        sourceIds: ['rbc-bilton-appraisal'],
        serviceRelevance: `The limited designation requires an address check and cannot be extended to the whole modern Bilton route.`,
      },
      {
        text: `The appraisal records mid-fourteenth-century work at St Mark's Church and dates original Bilton Hall fabric to 1623.`,
        sourceIds: ['rbc-bilton-appraisal'],
        serviceRelevance: `Those asset-specific dates provide heritage anchors but cannot characterise a customer's building, door or hardware.`,
      },
      {
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
        text: `Old Brownsover Conservation Area includes Brownsover Hall, a small group of houses, St Michael's Church and adjoining undeveloped land.`,
        sourceIds: ['rbc-old-brownsover-appraisal'],
        serviceRelevance: `The description applies to the mapped hamlet and must not be projected onto wider Brownsover development.`,
      },
      {
        text: `The appraisal records historic canal and highway connections and identifies Brownsover Hall as the key landmark building.`,
        sourceIds: ['rbc-old-brownsover-appraisal'],
        serviceRelevance: `These are attributed Old Brownsover facts and cannot establish present property access, condition or hardware.`,
      },
      {
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
    serviceEvidenceMode: 'hub-context-only',
    summary: [
      `Rugby Borough Council's current directory lists Cawston Parish Council at Cawston Community Hall on Scholars Drive. The contact location is not a route boundary or proof of administrative extent.`,
      `Cawston Parish Council adopted a parish plan in August 2010 following an autumn 2009 questionnaire, with an action plan intended for regular review. It remains a historical community-planning record for present use.`,
    ],
    accessGuidance: `Provide the exact Cawston address, entrance and responsible contact. Parish, ward and postal boundaries are not interchangeable, and the community hall address cannot establish access to a service property.`,
    evidenceLimits: `The directory confirms current parish administration, while the detailed plan dates from 2010 and its survey from 2009. Neither source proves current amenities, property status, construction, hardware, access or resident views.`,
    facts: [
      {
        text: `The current borough directory lists Cawston Parish Council and locates its contact address at Cawston Community Hall.`,
        sourceIds: ['rbc-cawston-parish-directory'],
        serviceRelevance: `This provides administrative orientation only and cannot define the service route, property boundary or entrance access.`,
      },
      {
        text: `The parish plan was adopted in August 2010 after an autumn 2009 questionnaire and contemplated regular action-plan review.`,
        sourceIds: ['rbc-cawston-parish-plan-2010'],
        serviceRelevance: `The dated community-planning process cannot be presented as current property, amenities, development or resident evidence.`,
      },
      {
        text: `Warwickshire County Council's school directory identifies Cawston Grange Primary School as a primary academy at Scholars Drive, Rugby, Warwickshire CV22 7GU.`,
        sourceIds: ['wcc-cawston-grange-primary-school'],
        serviceRelevance: `This facility record applies only to the named school; it does not define Cawston, prove access authority or describe any entrance or lock.`,
      },
    ],
    factOnlySourceIds: ['wcc-cawston-grange-primary-school'],
    sources: [
      LOCAL_SOURCES['rbc-cawston-parish-directory'],
      LOCAL_SOURCES['rbc-cawston-parish-plan-2010'],
      LOCAL_SOURCES['wcc-cawston-grange-primary-school'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'Cawston lockouts with parish boundaries kept administrative',
        body: [
          `The parish council's community-hall contact and the 2010 plan do not identify a customer's locked entrance. Provide the complete property and unit, exact private or shared threshold and person controlling it. Parish, ward and postal labels must not substitute for that address. Authority can then be linked to the correct opening before the locksmith assesses latch state, deadlocking, key behaviour and any existing damage that affects the technical approach.`,
          `Neither source establishes property designation or construction. If entry could require removing visible material, photograph the door and check current address-level information rather than using the old parish plan. Record any inspection-led change in method or scope separately. MLA guidance supports verifying identity and authority, providing available price information in advance and obtaining agreement before a changed service-call price applies. Any drilling or replacement should identify the component and reinstatement separately, while common-door, building-management or external-fabric questions remain documented next decisions for the current controller, not conclusions drawn from the 2009 questionnaire.`,
        ],
        checks: ['Give the complete current Cawston address', 'Identify private and shared thresholds', 'Use present records for property status'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'Cawston lock changes based on current hardware, not a parish plan',
        body: [
          `A 2009 questionnaire and 2010 action plan supply no information about a Cawston lock. Explain whether the change concerns key control, failure or damage and provide photographs of both hardware faces, the door edge and readable markings. At the customer door, document cylinder, lock case, keep and alignment individually and retain an element only on its observed condition; the 2009 questionnaire and 2010 plan cannot support that decision. Measurements and key needs support compatibility; the parish council's Scholars Drive address does not.`,
          `Confirm who controls the threshold, especially where a common entrance differs from a private door. If proposed work changes outward fabric, check present property records because the parish plan does not establish designation or permission. The written schedule should list retained parts, measured replacement, keys, fitting and adjustment and leave any building-management or visible-material issue as a separate next action. This keeps administrative evidence, authority and mechanical diagnosis in their proper roles.`,
        ],
        checks: ['Define the exact key-control objective', 'Record markings and measured dimensions', 'Confirm current responsibility for the affected threshold'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'Cawston multipoint diagnosis from current door behaviour',
        body: [
          `The parish-council directory and old plan do not establish that an affected Cawston door is uPVC or composite. Confirm the material, then record key rotation, handle travel, locking-point movement and whether the fault changes against the frame. Use the movement notes only to describe the current Cawston door: the parish directory and dated community plan cannot identify a failed component. Full faceplate markings, centres, backset and locking layout remain necessary before compatible parts can be identified.`,
          `Administrative orientation cannot reveal whether the threshold is private, communal, managed. Establish its controller before dismantling hardware and use present property information if repair extends into visible material. The diagnostic note should state safe tests, symptoms, measurements and the next action. It should not carry forward resident views or development conditions from the 2009 questionnaire, because those sources contain no evidence about the individual mechanism or current building.`,
        ],
        checks: ['Confirm uPVC or composite construction', 'Record the operating sequence safely', 'Identify the current door controller'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'Current-scene boarding decisions at a Cawston address',
        body: [
          `The parish directory and 2010 plan cannot describe damage at a Cawston opening. If police have issued directions for the scene, follow them before photographing, measuring or covering the point of entry, remaining frame, glazing or door, damaged hardware and surrounding surfaces. Confirm the exact address, threshold and responsible person without treating the community hall as a boundary marker. Those current observations document the opening and preserve the evidence needed by later repairers.`,
          `Since neither source establishes property status or structure, define temporary work from the inspected damage and any separately verified current constraint. At the identified Cawston opening, record the surviving material, damage and surfaces that temporary work will conceal; neither the hall address nor the 2010 plan describes them. The completion note should state the temporary scope and outstanding glazing, joinery, door, lock or structural tasks. This keeps a temporary measure distinct from permanent work and prevents a dated parish action plan from being used as property evidence.`,
        ],
        checks: ['Follow police evidence directions first', 'Photograph damage before it is hidden', 'Record temporary and permanent scopes'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'A measured Cawston entrance upgrade using current evidence',
        body: [
          `Cawston's administrative directory and historical community plan provide no security rating. Inspect the complete door and frame, hinges, keeps, handles, lock engagement and any cylinder projection. The current directory and 2010 plan cannot select security hardware; the cited police guidance instead supports whole-entrance assessment and correctly sized, accredited products. Current markings, dimensions and operation can then support suitable options, while alignment, frame condition and shared control remain explicit rather than being inferred from parish status or old survey responses.`,
          `Before outward alteration, check current property status and establish the responsible controller of any communal or managed shared-door hardware. The 2010 plan cannot answer either question. A written specification should separate adjustment, reinforcement and replacement, state current manufacturer documentation and measured fit, and list any fabric or building-management dependency for further advice. It cannot make a universal Cawston recommendation or promise a security result.`,
        ],
        checks: ['Inspect leaf, frame and hardware together', 'Verify accredited evidence and sizing', 'Use current building information only'],
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
        text: `Lawford Hill Farmhouse is Grade II listed, with a probably late-eighteenth-century main range and wings added around 1835.`,
        sourceIds: ['historic-england-lawford-hill-farmhouse-1299648'],
        serviceRelevance: `The designation and phases apply only to the named farmhouse and cannot characterise nearby Long Lawford properties.`,
      },
      {
        text: `The Grade II Church of St John on Chapel Street dates from 1839 and is attributed to William Walker.`,
        sourceIds: ['historic-england-st-john-long-lawford-1299647'],
        serviceRelevance: `The church record provides a named heritage anchor but no evidence about neighbouring buildings, doors or locks.`,
      },
      {
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
    serviceEvidenceMode: 'hub-context-only',
    summary: [
      `In March 2025 Rugby Borough Council published consultation plans to refurbish and expand the play area at New Bilton Recreation Ground. The source establishes a proposal at a named site, not completed works.`,
      `A February 2024 cabinet paper named New Bilton Ward as one of two pilot areas for a hyperlocal area-action approach under the council's 2023-2025 delivery plan. This is dated programme evidence.`,
    ],
    accessGuidance: `Provide the complete New Bilton property address, unit and exact entrance. The recreation ground and electoral ward are limited references and cannot define the wider locality, private-property status or access.`,
    evidenceLimits: `The sources concern a consultation proposal at one recreation ground and a dated ward-level council programme. They prove no current project completion, route boundary, property type, construction, hardware, access or service demand.`,
    facts: [
      {
        text: `The council published March 2025 consultation proposals for refurbishment and expansion at New Bilton Recreation Ground's play area.`,
        sourceIds: ['rbc-new-bilton-play-consultation-2025'],
        serviceRelevance: `This is a proposal for one named site and cannot establish implementation, wider conditions or property characteristics.`,
      },
      {
        text: `A February 2024 cabinet paper included New Bilton Ward in a hyperlocal area-action pilot workstream.`,
        sourceIds: ['rbc-cabinet-new-bilton-2024'],
        serviceRelevance: `The dated ward programme cannot define the route, describe every address or support service-performance claims.`,
      },
      {
        text: `The Warwickshire Historic Environment Record identifies the possible site of a corn mill off Lawford Road, New Bilton, Rugby, record MWA3634.`,
        sourceIds: ['warwickshire-her-new-bilton-corn-mill'],
        serviceRelevance: `This site-specific historic record cannot describe another New Bilton property, confer current status or establish present access, construction or hardware.`,
      },
    ],
    factOnlySourceIds: ['warwickshire-her-new-bilton-corn-mill'],
    sources: [
      LOCAL_SOURCES['rbc-new-bilton-play-consultation-2025'],
      LOCAL_SOURCES['rbc-cabinet-new-bilton-2024'],
      LOCAL_SOURCES['warwickshire-her-new-bilton-corn-mill'],
    ],
    serviceGuidance: {
      'emergency-lockout': {
        localFactIndexes: [0, 1],
        heading: 'New Bilton lockouts without treating ward evidence as property evidence',
        body: [
          `The recreation-ground consultation and ward pilot do not identify a locked New Bilton property. A caller should provide the full address, building or unit, exact private or shared threshold and person controlling it. The named ground is not a route boundary, and the ward programme does not prove access. Authority can then be checked for the correct opening before latch state, deadlocking, key behaviour and existing damage guide technical assessment.`,
          `Neither source establishes property status or construction. If entry could remove visible material, photograph the door and consult current address-level records rather than relying on council-programme geography. Explain any change in method or scope from the inspected condition before proceeding. For this service call, MLA guidance supports identity-and-authority verification, advance communication of available price information and agreement only if that price changes. A drilling or replacement decision should identify the affected component and reinstatement, while external-fabric, common-door or building-management issues remain separate next steps for the responsible property party instead of being inferred from the 2024 pilot.`,
        ],
        checks: ['Give the complete New Bilton address', 'Identify the exact controlled entrance', 'Use current property evidence only'],
      },
      'lock-change': {
        localFactIndexes: [0, 1],
        heading: 'New Bilton lock changes from the fitted hardware',
        body: [
          `A proposed play-area project and hyperlocal council pilot reveal nothing about locks at a New Bilton address. Define whether the change concerns keys, failure or damage, then photograph both hardware faces, the door edge and readable markings. At the actual door, record cylinder, case, keep and alignment individually and measure any proposed component; neither the play-area proposal nor ward pilot answers those compatibility questions. The ward or recreation-ground name cannot supply a property type, keying arrangement or compatible replacement.`,
          `Confirm who controls a shared threshold before hardware or keys change, because an electoral programme does not establish ownership. If proposed work affects outward fabric, check present property status separately; the consultation source concerns only a named play area. The written schedule should list retained parts, measured product, keys, fitting and adjustment and reserve any building-management or external-material question for current building evidence and the responsible controller, not area-action assumptions.`,
        ],
        checks: ['Define the reason for the change', 'Record markings and measured geometry', 'Confirm current authority for shared door hardware'],
      },
      'upvc-lock-repair': {
        localFactIndexes: [0, 1],
        heading: 'New Bilton multipoint repair from observed mechanism behaviour',
        body: [
          `The two council sources provide no evidence that a New Bilton entrance is uPVC or composite. Confirm the actual material, then record key rotation, handle lift, locking-point travel and any difference when the leaf meets the frame. Treat the movement sequence as a symptom record for this New Bilton entrance only; the council's recreation-ground and ward workstreams identify no failed component. Compatibility must instead be checked against this door's faceplate markings, centres, backset and locking layout, details absent from both council sources.`,
          `A ward pilot and recreation-ground consultation cannot reveal whether the threshold is private, communal, managed. Establish the responsible person before components are removed and check current property information if repair extends into visible fabric. The diagnostic record should state symptoms, safe tests, measurements and next action, explicitly avoiding claims about local door type or mechanism prevalence from programme geography or a proposed public-space project.`,
        ],
        checks: ['Confirm the actual door material', 'Record key and handle movement', 'Measure the fitted locking arrangement'],
      },
      'boarding-up': {
        localFactIndexes: [0, 1],
        heading: 'New Bilton temporary boarding based on scene evidence',
        body: [
          `The play-area consultation and ward pilot cannot describe damage at a New Bilton opening. If police have issued directions for that scene, follow them before photographing, measuring or covering the point of entry, remaining frame, glazing or door, compromised hardware and adjacent surfaces. Confirm the exact property, threshold and responsible person. Those current observations establish dimensions and handling needs without extending facts about a recreation ground or electoral ward to private premises.`,
          `Since neither source supplies structure or property status, define temporary work from the inspected damage and any separately verified current constraint. At the identified New Bilton opening, record surviving material, damage and anything temporary work will conceal; neither public-space proposal nor ward pilot describes the scene. The completion note should state the temporary scope, concealed components and outstanding glazing, joinery, door, lock or structural assessment. This preserves a recoverable evidence trail and keeps the temporary response independent of whether the 2025 consultation proposal was later implemented.`,
        ],
        checks: ['Follow current police scene directions', 'Photograph all material before covering', 'Record the temporary scope and permanent next steps'],
      },
      'lock-upgrade': {
        localFactIndexes: [0, 1],
        heading: 'New Bilton entrance upgrades using current measured evidence',
        body: [
          `A ward-level action pilot and play-area consultation provide no security information about New Bilton properties. Because the ward pilot and play-area proposal say nothing about private entrances, assess this door across its leaf, frame, hinges, keeps, handles, lock engagement and any cylinder projection. Warwickshire Police supports reviewing the complete entrance and correctly sized, accredited products. Current marks, dimensions and operation can then support an option, while alignment, frame condition and shared control remain explicit instead of being inferred from council programme participation.`,
          `Before changing visible material or communal hardware, establish current property status and the responsible controller directly. Neither dated source answers those questions. The specification should separate adjustment, reinforcement and replacement, cite current manufacturer documentation, record measured fit and list building-management or fabric dependencies for further advice. It cannot use New Bilton's programme or consultation references to recommend one product across the route or promise an outcome.`,
        ],
        checks: ['Inspect the whole present entrance', 'Verify product evidence and exact fit', 'Confirm current property and management constraints'],
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
        text: `Dunchurch Conservation Area covers the historic crossroads core, commercial centre, open spaces and a later northern housing area.`,
        sourceIds: ['rbc-dunchurch-appraisal'],
        serviceRelevance: `The mapped extent must be checked for the exact address and cannot be applied across the whole route.`,
      },
      {
        text: `The appraisal identifies the central medieval standing cross as scheduled and part of Dunchurch Lodge's registered landscape to the north-east.`,
        sourceIds: ['rbc-dunchurch-appraisal'],
        serviceRelevance: `The separately bounded assets require their own records and cannot confer status on surrounding buildings.`,
      },
      {
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
