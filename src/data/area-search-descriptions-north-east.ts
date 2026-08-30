import type { AreaSearchDescriptionRegistry } from './area-search-description-types.ts'

export const NORTH_EAST_AREA_SEARCH_DESCRIPTIONS = {
  nuneaton: {
    description: 'Nuneaton locksmith help for lockouts, repairs and security upgrades, with town-centre conservation-boundary additions confirmed on 15 February 2022.',
    sourceIds: ['gazette-nuneaton-conservation-2022'],
  },
  attleborough: {
    description: 'Attleborough locksmith help for lockouts, repairs and upgrades, with official records identifying selected housing streets and exact heritage checks.',
    sourceIds: ['nbbc-tenant-walkabouts-2026', 'historic-england-holy-trinity-attleborough-1034975'],
  },
  stockingford: {
    description: 'Stockingford locksmith help for lockouts, repairs and upgrades, with current street records and the exact Grade II entry for 350 and 352 Arbury Road.',
    sourceIds: ['wcc-list-of-streets-2026', 'historic-england-arbury-road-350-352-1261649'],
  },
  weddington: {
    description: 'Weddington locksmith help for lockouts, repairs and upgrades, with council housing-address checks and the Grade II Church of St James kept property-specific.',
    sourceIds: ['nbbc-tenant-walkabouts-2026', 'historic-england-st-james-weddington-1185771'],
  },
  'horeston-grange': {
    description: 'Horeston Grange locksmith help for lockouts and repairs, with the adopted plan naming its district centre and the council locating the Co-op on Camborne Drive.',
    sourceIds: ['nbbc-borough-plan-review-2021-2039', 'nbbc-horeston-grange-wellbeing-walk'],
  },
  whitestone: {
    description: 'Whitestone locksmith help for lockouts, repairs and upgrades, with council records identifying HSG9 off Golf Drive and Magyar Crescent repair contacts.',
    sourceIds: ['nbbc-whitestone-hsg9-5yhls-2026', 'nbbc-magyar-crescent-tenancy-team'],
  },
  'camp-hill': {
    description: 'Camp Hill locksmith help for lockouts and repairs, with the 11 August 2026 county register distinguishing Camp Hill Drive\'s locality entry from Camp Hill Road.',
    sourceIds: ['wcc-list-of-streets-2026'],
  },
  'chapel-end': {
    description: "Chapel End locksmith help for lockouts, repairs and lock changes, with Warwickshire's record dating the Congregational Chapel on Coleshill Road to 1840.",
    sourceIds: ['warwickshire-her-chapel-end-chapel'],
  },
  'bermuda-park': {
    description: 'Bermuda Park locksmith help for lockouts, repairs and upgrades, with council heritage records covering 20-118 even and 39-117 odd at Bermuda Village, CV10 7PN.',
    sourceIds: ['nbbc-heritage-spd-2026', 'nbbc-bermuda-village-article-4'],
  },
  'galley-common': {
    description: 'Galley Common locksmith help for lockouts and repairs, with the county street register assigning Chaucer Drive and Orford Rise to Galley Common, Nuneaton.',
    sourceIds: ['wcc-list-of-streets-2026'],
  },
  hartshill: {
    description: 'Hartshill locksmith help for lockouts, repairs and security upgrades, with Historic England recording Hartshill Castle as Scheduled Monument 1011197.',
    sourceIds: ['historic-england-hartshill-castle-1011197'],
  },
  bedworth: {
    description: "Bedworth locksmith help for lockouts and repairs, with the council's 2022 appraisal identifying three character areas in the town-centre conservation area.",
    sourceIds: ['nbbc-bedworth-conservation-2022'],
  },
  bulkington: {
    description: "Bulkington locksmith help for lockouts and repairs, with the borough council recording the Bulkington Conservation Area's 1985 designation.",
    sourceIds: ['nbbc-bulkington-conservation-2022'],
  },
  rugby: {
    description: "Rugby locksmith help for lockouts and repairs, with the borough council's appraisal tracing the town-centre conservation area along the historic road layout.",
    sourceIds: ['rbc-rugby-town-centre-appraisal'],
  },
  hillmorton: {
    description: 'Hillmorton locksmith help for lockouts and repairs, with the borough council defining Hillmorton Locks as a small canal-centred conservation area.',
    sourceIds: ['rbc-hillmorton-locks-appraisal'],
  },
  bilton: {
    description: "Bilton locksmith help for lockouts and repairs, with the borough council's appraisal noting that only part of Bilton lies in the conservation area.",
    sourceIds: ['rbc-bilton-appraisal'],
  },
  brownsover: {
    description: "Brownsover locksmith help for lockouts and repairs; Rugby Borough Council's appraisal identifies Brownsover Hall as Old Brownsover's key landmark building.",
    sourceIds: ['rbc-old-brownsover-appraisal'],
  },
  cawston: {
    description: 'Cawston locksmith help for lockouts, repairs and upgrades, with current council and county records reinforcing exact address, entrance and access checks.',
    sourceIds: ['rbc-south-west-rugby-spd-2024', 'wcc-rugby-bus-map-2025'],
  },
  'long-lawford': {
    description: 'Long Lawford locksmith help for lockouts, repairs and lock changes, with Historic England listing Lawford Hill Farmhouse at Grade II.',
    sourceIds: ['historic-england-lawford-hill-farmhouse-1299648'],
  },
  'new-bilton': {
    description: 'New Bilton locksmith help for lockouts, repairs and upgrades, with council evidence reinforcing exact address, entrance, authority and property-status checks.',
    sourceIds: ['rbc-new-bilton-hmo-article-4', 'rbc-local-centres-study-2024'],
  },
  dunchurch: {
    description: "Dunchurch locksmith help for lockouts and repairs, with the borough council's appraisal mapping the conservation area around the historic crossroads core.",
    sourceIds: ['rbc-dunchurch-appraisal'],
  },
} satisfies AreaSearchDescriptionRegistry
