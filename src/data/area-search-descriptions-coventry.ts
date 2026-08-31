import type { AreaSearchDescriptionRegistry } from './area-search-description-types.ts'

export const COVENTRY_AREA_SEARCH_DESCRIPTIONS = {
  'coventry-city-centre': {
    description: 'Locksmith help in Coventry City Centre for lockouts, repairs and upgrades, with council studies noting ring-road subways and civic buildings.',
    sourceIds: ['coventry-central-civic'],
  },
  earlsdon: {
    description: 'Earlsdon locksmith help for lockouts, repairs and lock changes, with Coventry’s HLC noting the area is bisected by the Coventry–Birmingham railway.',
    sourceIds: ['earlsdon-chapelfields-hlc'],
  },
  'tile-hill': {
    description: 'Tile Hill locksmith guidance separating the council’s JSNA road-and-rail geography, Tile Hill Wood SSSI and Tile Hill Library at Jardine Crescent.',
    sourceIds: ['tile-hill-jsna', 'tile-hill-woods', 'tile-hill-library'],
  },
  canley: {
    description: 'Canley locksmith help for lockouts, repairs and lock changes, with Coventry’s JSNA noting Charter Avenue, the railway and the nearby university.',
    sourceIds: ['canley-jsna'],
  },
  radford: {
    description: 'Radford locksmith help for lockouts, repairs and upgrades, with official records for Radford Road, Radford Common, its school and the Jubilee Crescent GP site.',
    sourceIds: ['coundon-radford-hlc', 'radford-common', 'radford-primary-school', 'radford-gp-group-nhs'],
  },
  coundon: {
    description: 'Coundon locksmith help for lockouts, repairs and lock changes, with Coventry’s HLC recording Coundon Green and Norman Place Road near former commons.',
    sourceIds: ['coundon-radford-hlc'],
  },
  holbrooks: {
    description: 'Holbrooks locksmith help for lockouts, repairs and upgrades, with Coventry City Council locating Holbrook Park on Holbrook Lane amid shops and factories.',
    sourceIds: ['holbrook-park'],
  },
  foleshill: {
    description: 'Foleshill locksmith help for lockouts, repairs and upgrades, with official records for its mixed-use setting, Edgwick Park, Broad Heath and St Lawrence.',
    sourceIds: ['foleshill-hlc', 'foleshill-edgwick-park', 'foleshill-broad-heath-school', 'foleshill-st-lawrence-he'],
  },
  stoke: {
    description: 'Stoke locksmith help for lockouts, repairs and upgrades, with Coventry’s Lower Stoke HLC noting the Coventry–Rugby railway and northern housing.',
    sourceIds: ['lower-stoke-hlc'],
  },
  wyken: {
    description: 'Wyken locksmith help for lockouts, repairs and upgrades, with official records for St Mary Magdalen, Wyken Croft Primary and the nature park.',
    sourceIds: ['wyken-st-mary-magdalen-he', 'wyken-croft-primary-school', 'wyken-croft-nature-park'],
  },
  walsgrave: {
    description: 'Walsgrave locksmith guidance separating village and hospital records, the North Sowe corridor and Walsgrave Church of England Academy, recorded as open.',
    sourceIds: ['woodway-park-hlc', 'north-sowe-hlc', 'walsgrave-ce-academy-dfe'],
  },
  binley: {
    description: 'Binley locksmith help for lockouts, repairs and lock changes, with Coventry’s HLC placing the character area on the south-east fringe by the A46.',
    sourceIds: ['binley-hlc'],
  },
  'binley-woods': {
    description: 'Binley Woods locksmith help for lockouts, repairs and upgrades, with the borough’s Village Design Statement placing it east of Coventry and west of Rugby.',
    sourceIds: ['binley-woods-vds'],
  },
  willenhall: {
    description: 'Willenhall locksmith help for lockouts, repairs and lock changes, with Coventry’s HLC noting the West Coast Main Line divides the local area.',
    sourceIds: ['willenhall-hlc'],
  },
  cheylesmore: {
    description: 'Cheylesmore locksmith guidance separating combined-area history, Poitiers Road library, Ulverscroft Road school and Grade II* Frankpledge Road church.',
    sourceIds: ['cheylesmore-stivichall-hlc', 'coventry-cheylesmore-library', 'cheylesmore-manor-park-primary-dfe', 'cheylesmore-christ-church-he'],
  },
  whitley: {
    description: 'Whitley locksmith help for lockouts and repairs; records cover the Sowe Valley setting, common, Meadow Park School, recorded as open, and listed Abbey Bridge.',
    sourceIds: ['whitley-hlc', 'whitley-common', 'meadow-park-school-dfe', 'whitley-abbey-bridge-he'],
  },
  finham: {
    description: 'Finham locksmith help for lockouts and repairs; records cover its parish boundary, neighbourhood designation, library and Finham Park School, recorded as open.',
    sourceIds: ['finham-parish', 'coventry-neighbourhood-plans', 'finham-library', 'finham-park-school-dfe'],
  },
  styvechale: {
    description: 'Styvechale locksmith help for lockouts, repairs and lock changes, with Coventry’s HLC using the historic spelling Stivichall for the combined character area.',
    sourceIds: ['cheylesmore-stivichall-hlc'],
  },
  allesley: {
    description: 'Allesley locksmith help for lockouts, repairs and upgrades, with official records for the village conservation area, All Saints and Antrim Close school.',
    sourceIds: ['allesley-conservation-areas', 'allesley-all-saints-he', 'allesley-primary-school'],
  },
  'allesley-park': {
    description: 'Allesley Park locksmith help for lockouts, repairs and lock changes, with Coventry City Council describing a historic park between established housing.',
    sourceIds: ['allesley-park-council'],
  },
  'eastern-green': {
    description: 'Eastern Green locksmith help for lockouts and repairs; records cover Guphill Brook, the extension boundary, Church Lane park and school recorded as open.',
    sourceIds: ['eastern-green-hlc', 'eastern-green-investment', 'eastern-green-recreation-ground', 'eastern-green-junior-dfe'],
  },
  longford: {
    description: 'Longford locksmith guidance separating its JSNA geography, Longford Park and park paths from the Grade II Church of St Thomas on Hurst Road.',
    sourceIds: ['foleshill-longford-jsna', 'longford-park', 'longford-st-thomas-he'],
  },
  'bell-green': {
    description: 'Bell Green locksmith help for lockouts, repairs and upgrades, with Coventry’s HLC recording possible medieval settlement and Bell Green Road in 1775.',
    sourceIds: ['aldermans-green-hlc'],
  },
  'courthouse-green': {
    description: "Courthouse Green locksmith guidance separating Centre AT7, the Sewall Highway school's address and open record, and the Austin Drive permit site.",
    sourceIds: ['centre-at7-cvlife', 'courthouse-green-school', 'courthouse-green-primary-dfe', 'courthouse-green-sainsburys-permit'],
  },
  'aldermans-green': {
    description: 'Aldermans Green locksmith help for lockouts, repairs and upgrades, with official records for its primary school, a faith building and Wyken Slough.',
    sourceIds: ['aldermans-green-primary-school', 'aldermans-green-free-methodist', 'wyken-slough'],
  },
  'potters-green': {
    description: 'Potters Green locksmith guidance separating historic Woodway Lane evidence, the Ringwood Highway school and the venue named in a 10 April 2026 polling notice.',
    sourceIds: ['woodway-park-hlc', 'potters-green-school', 'potters-green-polling-notice'],
  },
  'henley-green': {
    description: 'Henley Green locksmith help for lockouts, repairs and upgrades, with the council locating its school and community centre at Wyken Croft, CV2 1HQ.',
    sourceIds: ['henley-green-school-centre'],
  },
  'wood-end': {
    description: 'Locksmith help in Wood End for lockouts and repairs, with Coventry City Council recording a 900-metre Wood End Brookstray route at CV2 1BF.',
    sourceIds: ['wood-end-brookstray'],
  },
  sowe: {
    description: 'Sowe locksmith guidance separating the multi-locality river corridor and Main River status from Woodway Lane Common and the Grade II* Hall Lane church.',
    sourceIds: ['north-sowe-hlc', 'coventry-river-sowe-flooding', 'sowe-common', 'sowe-st-mary-virgin-he'],
  },
  'little-heath': {
    description: 'Little Heath locksmith help for lockouts, repairs and lock changes, with Coventry’s HLC recording a former medieval common and later ribbon weaving.',
    sourceIds: ['foleshill-hlc'],
  },
} satisfies AreaSearchDescriptionRegistry
