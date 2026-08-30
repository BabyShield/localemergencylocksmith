import type { AreaSearchDescriptionRegistry } from './area-search-description-types.ts'

export const SOUTH_WEST_AREA_SEARCH_DESCRIPTIONS = {
  'leamington-spa': {
    description: 'Locksmith services in Royal Leamington Spa for lockouts, repairs and upgrades, with the River Leam running through the town centre as local context.',
    sourceIds: ['wdc-leamington-plan'],
  },
  milverton: {
    description: "Locksmith help in Milverton for lockouts, lock repairs and upgrades, noting the council guide's New Milverton conservation character area.",
    sourceIds: ['wdc-leamington-conservation'],
  },
  lillington: {
    description: 'Lillington locksmith help for lockouts, repairs and upgrades, with official records for Crown Way, Mason Avenue community centre and Valley Road library.',
    sourceIds: ['wdc-local-plan', 'wdc-asset-list-2026', 'wcc-lillington-library', 'historic-england-lillington-library-1420766'],
  },
  sydenham: {
    description: 'Sydenham locksmith guidance distinguishing the SYDNI Centre on Cottage Square, Calder Walk school and separate Sydenham Drive sites.',
    sourceIds: ['charity-commission-sydenham-neighbourhood-initiatives-1077333', 'dfe-sydenham-primary', 'wdc-sydenham-play-area'],
  },
  whitnash: {
    description: 'Locksmith services in Whitnash for lockouts, repairs and upgrades, where the local plan lists Church Green and Chapel Green as separate conservation areas.',
    sourceIds: ['wdc-local-plan'],
  },
  heathcote: {
    description: "Locksmith help in Heathcote for lockouts, lock repairs and upgrades, with Lower Heathcote Local Centre recorded in the council's 2024-25 monitoring report.",
    sourceIds: ['wdc-monitoring-report-2024-25'],
  },
  warwick: {
    description: 'Locksmith services in Warwick for lockouts, repairs and upgrades, with the council conservation guide mapping fifteen named character sections.',
    sourceIds: ['wdc-warwick-conservation'],
  },
  'woodloes-park': {
    description: 'Woodloes Park locksmith help for lockouts, repairs and upgrades, with official records for Reardon Court, Canalside, Deansway school and the centre charity.',
    sourceIds: ['wdc-local-plan', 'wdc-community-parks', 'dfe-woodloes-primary', 'charity-commission-woodloes-park-community-centre-511957'],
  },
  'chase-meadow': {
    description: 'Chase Meadow locksmith help for lockouts, repairs and upgrades, with records for Narrow Hall Meadow, local parks, the community centre and health centre.',
    sourceIds: ['wdc-local-plan', 'wdc-community-parks', 'chase-meadow-community-centre', 'nhs-chase-meadow-health-centre'],
  },
  'warwick-gates': {
    description: 'Locksmith help in Warwick Gates for lockouts, lock repairs and upgrades, with Othello Avenue recorded in the local plan as a local shopping centre.',
    sourceIds: ['wdc-local-plan'],
  },
  'stratford-upon-avon': {
    description: 'Locksmith services in Stratford-upon-Avon for lockouts, repairs and upgrades, where the made plan identifies a River Avon biodiversity corridor.',
    sourceIds: ['sdc-stratford-made-plan'],
  },
  tiddington: {
    description: 'Tiddington locksmith guidance distinguishing the scheduled Roman settlement, Knights Lane school and registered community-centre charity.',
    sourceIds: ['historic-england-tiddington-roman-settlement-1003741', 'dfe-alveston-primary-tiddington', 'charity-commission-tiddington-community-centre-1093526'],
  },
  bishopton: {
    description: 'Bishopton locksmith guidance distinguishing its Drayton Avenue community centre and school, Park and Ride and Burton Farm context.',
    sourceIds: ['charity-commission-bishopton-community-centre-1188894', 'dfe-bishopton-primary', 'sdc-stratford-park-and-ride', 'sdc-stratford-made-plan'],
  },
  shottery: {
    description: 'Locksmith help in Shottery for lockouts, lock repairs and upgrades, with its conservation area originally designated in 1969 in council records.',
    sourceIds: ['sdc-shottery-conservation'],
  },
  kenilworth: {
    description: 'Locksmith services in Kenilworth for lockouts, repairs and upgrades, where the council guide dates its first conservation-area designation to 1971.',
    sourceIds: ['wdc-kenilworth-conservation'],
  },
  'balsall-common': {
    description: 'Locksmith help in Balsall Common for lockouts, lock repairs and upgrades, with the made plan noting the settlement spans Balsall and Berkswell parishes.',
    sourceIds: ['solihull-balsall-made-plan'],
  },
  meriden: {
    description: 'Meriden locksmith guidance distinguishing its made parish plan, Green and Hill boundaries, Arden Cottage library and Grade I Church Lane church.',
    sourceIds: ['solihull-meriden-plan-page', 'solihull-conservation-areas', 'solihull-meriden-library', 'historic-england-meriden-church-1031828'],
  },
  'hampton-in-arden': {
    description: 'Hampton-in-Arden locksmith guidance distinguishing the continuing 2017 plan, central conservation area, Fentham Road library and Grade I High Street church.',
    sourceIds: ['solihull-hampton-plan-page', 'solihull-hampton-history', 'solihull-hampton-library', 'historic-england-hampton-church-1055777'],
  },
  wolston: {
    description: 'Locksmith services in Wolston for lockouts, repairs and upgrades, with the conservation appraisal limiting its boundary mostly south of the River Avon.',
    sourceIds: ['rbc-wolston-conservation'],
  },
  'ryton-on-dunsmore': {
    description: 'Locksmith help in Ryton-on-Dunsmore for lockouts, lock repairs and upgrades, with the adopted plan recording it as a Main Rural Settlement.',
    sourceIds: ['rbc-ryton-made-plan'],
  },
  baginton: {
    description: 'Baginton locksmith guidance distinguishing the joint parish plan, conservation record, Coventry Road Roman fort and Grade I Church Road church.',
    sourceIds: ['wdc-baginton-plan-page', 'wdc-local-plan', 'coventry-lunt-roman-fort', 'historic-england-baginton-church-1116539'],
  },
  brandon: {
    description: 'Brandon locksmith guidance distinguishing the joint plan, partial conservation area, Main Street ceremony venue and Grade II Avon Viaduct.',
    sourceIds: ['rbc-brandon-plan-page', 'rbc-brandon-conservation', 'wcc-brandon-hall-approved-venue', 'historic-england-avon-viaduct-1034898'],
  },
  shilton: {
    description: "Locksmith services in Shilton for lockouts, repairs and upgrades, with the council's 2024 study classifying Shilton as a Rural Village.",
    sourceIds: ['rbc-rural-study-2024'],
  },
  brinklow: {
    description: 'Brinklow locksmith guidance distinguishing its made plan, partial conservation area, Barr Lane surgery and Grade II* church on The Crescent.',
    sourceIds: ['rbc-brinklow-plan-page', 'rbc-brinklow-conservation', 'nhs-revel-surgery-brinklow-m84031', 'historic-england-brinklow-church-1034957'],
  },
  southam: {
    description: 'Locksmith services in Southam for lockouts, repairs and upgrades, with its neighbourhood plan made by the district council on 11 July 2023.',
    sourceIds: ['sdc-southam-plan-page'],
  },
  studley: {
    description: 'Locksmith help in Studley for lockouts, lock repairs and upgrades, with the Parish Plan and Action Plan recorded as adopted in February 2017.',
    sourceIds: ['sdc-parish-plans'],
  },
  alcester: {
    description: 'Alcester locksmith guidance distinguishing the made 2021 plan, conservation record, Priory Road library and Grade I Henley Street Town Hall.',
    sourceIds: ['sdc-alcester-plan-page', 'sdc-conservation-a-g', 'wcc-alcester-library', 'historic-england-alcester-town-hall-1024606'],
  },
} satisfies AreaSearchDescriptionRegistry
