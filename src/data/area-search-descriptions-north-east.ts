import type { AreaSearchDescriptionRegistry } from './area-search-description-types.ts'

export const NORTH_EAST_AREA_SEARCH_DESCRIPTIONS = {
  nuneaton: {
    description: 'Nuneaton locksmith help for lockouts, repairs and security upgrades, with town-centre conservation-boundary additions confirmed on 15 February 2022.',
    sourceIds: ['gazette-nuneaton-conservation-2022'],
  },
  attleborough: {
    description: 'Attleborough locksmith guidance separating the Springfield Road recreation ground, Holy Trinity doors and two exact locally listed Attleborough Road assets.',
    sourceIds: ['nbbc-attleborough-recreation-ground', 'historic-england-holy-trinity-attleborough-1034975', 'nbbc-heritage-spd-2026'],
  },
  stockingford: {
    description: 'Stockingford locksmith guidance distinguishing its East and West housing groups, Haunchwood Road centre, Cross Street academy and exact Arbury Road cottages.',
    sourceIds: ['nbbc-tenant-walkabouts-2026', 'nbbc-stockingford-community-centre', 'wcc-stockingford-academy', 'historic-england-arbury-road-350-352-1261649'],
  },
  weddington: {
    description: 'Weddington locksmith guidance distinguishing its named housing group, Meadows and Walk, Winchester Avenue school and asset-specific St James door records.',
    sourceIds: ['nbbc-tenant-walkabouts-2026', 'nbbc-weddington-meadows-walk', 'wcc-weddington-primary-school', 'historic-england-st-james-weddington-1185771'],
  },
  'horeston-grange': {
    description: 'Horeston Grange locksmith help for lockouts and repairs, with the adopted plan naming its district centre and the council locating the Co-op on Camborne Drive.',
    sourceIds: ['nbbc-borough-plan-review-2021-2039', 'nbbc-horeston-grange-wellbeing-walk'],
  },
  whitestone: {
    description: 'Whitestone locksmith guidance separating HSG9 and tenancy routes from the infant-school and current community-centre charity records.',
    sourceIds: ['nbbc-whitestone-hsg9-5yhls-2026', 'nbbc-magyar-crescent-tenancy-team', 'wcc-whitestone-infant-school', 'charity-commission-whitestone-community-centre-508566'],
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
    description: 'Hartshill locksmith guidance separating Holy Trinity library entrances, the current academy and asset-specific church and castle records.',
    sourceIds: ['wcc-hartshill-community-library', 'dfe-hartshill-academy-150453', 'historic-england-holy-trinity-hartshill-1365167'],
  },
  bedworth: {
    description: "Bedworth locksmith help for lockouts and repairs, with the council's 2022 appraisal identifying three character areas in the town-centre conservation area.",
    sourceIds: ['nbbc-bedworth-conservation-2022'],
  },
  bulkington: {
    description: "Bulkington locksmith guidance distinguishing School Road's Village Centre and library, Church Street listed cottages and Bulkington Rec.",
    sourceIds: ['charity-commission-bulkington-village-centre-1071175', 'wcc-bulkington-library', 'historic-england-3-4-church-street-bulkington-1365050', 'nbbc-bulkington-rec'],
  },
  rugby: {
    description: 'Rugby locksmith guidance for lockouts, repairs and upgrades, separating one named shared-use cultural building from an exact listed Chapel Street doorway.',
    sourceIds: ['rbc-ragm-modernising', 'historic-england-46-chapel-street-1035045'],
  },
  hillmorton: {
    description: 'Hillmorton locksmith guidance with exact site-controller, High Street listed-door and Hillmorton Locks boundary checks, each bounded to its named place.',
    sourceIds: ['wcc-hillmorton-primary-school', 'historic-england-81-high-street-hillmorton-1365008', 'rbc-hillmorton-locks-appraisal'],
  },
  bilton: {
    description: 'Bilton locksmith guidance with exact threshold checks for its partial conservation area and the named Alwyn Road recreation site.',
    sourceIds: ['rbc-bilton-appraisal', 'rbc-alwyn-road-recreation-ground'],
  },
  brownsover: {
    description: 'Brownsover locksmith guidance with current community-centre controller checks and exact listed-fabric limits for two Old Brownsover assets.',
    sourceIds: ['charity-commission-brownsover-community-association-1199939', 'historic-england-st-michael-brownsover-1183659', 'historic-england-brownsover-hall-1365029'],
  },
  cawston: {
    description: 'Cawston locksmith help for lockouts, repairs and upgrades, with current council and county records reinforcing exact address, entrance and access checks.',
    sourceIds: ['rbc-south-west-rugby-spd-2024', 'wcc-rugby-bus-map-2025'],
  },
  'long-lawford': {
    description: "Long Lawford locksmith guidance separating Holbrook Road school, King George's Field, current planning status and the listed farmhouse.",
    sourceIds: ['wcc-long-lawford-primary-school', 'charity-commission-king-georges-field-long-lawford-1082855', 'rbc-submission-local-plan-2026', 'historic-england-lawford-hill-farmhouse-1299648'],
  },
  'new-bilton': {
    description: 'New Bilton locksmith help for lockouts, repairs and upgrades, with council evidence reinforcing exact address, entrance, authority and property-status checks.',
    sourceIds: ['rbc-new-bilton-hmo-article-4', 'rbc-local-centres-study-2024'],
  },
  dunchurch: {
    description: 'Dunchurch locksmith guidance with exact historic-core map checks and current controller guidance for the named Heath open space.',
    sourceIds: ['rbc-dunchurch-appraisal', 'rbc-dunchurch-heath-open-space'],
  },
} satisfies AreaSearchDescriptionRegistry
