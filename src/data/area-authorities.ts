export type AddressRegion = 'West Midlands' | 'Warwickshire'

export type LocalAuthority =
  | 'Coventry City Council'
  | 'Nuneaton and Bedworth Borough Council'
  | 'North Warwickshire Borough Council'
  | 'Rugby Borough Council'
  | 'Warwick District Council'
  | 'Stratford-on-Avon District Council'
  | 'Solihull Metropolitan Borough Council'

export interface AreaAuthority {
  addressRegion: AddressRegion
  localAuthority: LocalAuthority
}

export const AREA_AUTHORITIES = {
  'coventry-city-centre': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  earlsdon: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'tile-hill': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  canley: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  radford: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  coundon: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  holbrooks: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  foleshill: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  stoke: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  wyken: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  walsgrave: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  binley: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'binley-woods': { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  willenhall: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  cheylesmore: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  whitley: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  finham: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  styvechale: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  allesley: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'allesley-park': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'eastern-green': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  longford: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'bell-green': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'courthouse-green': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'aldermans-green': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'potters-green': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'henley-green': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'wood-end': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  sowe: { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },
  'little-heath': { addressRegion: 'West Midlands', localAuthority: 'Coventry City Council' },

  nuneaton: { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  attleborough: { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  stockingford: { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  weddington: { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  'horeston-grange': { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  whitestone: { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  'camp-hill': { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  'chapel-end': { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  'bermuda-park': { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  'galley-common': { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  hartshill: { addressRegion: 'Warwickshire', localAuthority: 'North Warwickshire Borough Council' },
  bedworth: { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },
  bulkington: { addressRegion: 'Warwickshire', localAuthority: 'Nuneaton and Bedworth Borough Council' },

  rugby: { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  hillmorton: { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  bilton: { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  brownsover: { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  cawston: { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  'long-lawford': { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  'new-bilton': { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  dunchurch: { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },

  'leamington-spa': { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  milverton: { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  lillington: { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  sydenham: { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  whitnash: { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  heathcote: { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  warwick: { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  'woodloes-park': { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  'chase-meadow': { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  'warwick-gates': { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },

  'stratford-upon-avon': { addressRegion: 'Warwickshire', localAuthority: 'Stratford-on-Avon District Council' },
  tiddington: { addressRegion: 'Warwickshire', localAuthority: 'Stratford-on-Avon District Council' },
  bishopton: { addressRegion: 'Warwickshire', localAuthority: 'Stratford-on-Avon District Council' },
  shottery: { addressRegion: 'Warwickshire', localAuthority: 'Stratford-on-Avon District Council' },

  kenilworth: { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  'balsall-common': { addressRegion: 'West Midlands', localAuthority: 'Solihull Metropolitan Borough Council' },
  meriden: { addressRegion: 'West Midlands', localAuthority: 'Solihull Metropolitan Borough Council' },
  'hampton-in-arden': { addressRegion: 'West Midlands', localAuthority: 'Solihull Metropolitan Borough Council' },
  wolston: { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  'ryton-on-dunsmore': { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  baginton: { addressRegion: 'Warwickshire', localAuthority: 'Warwick District Council' },
  brandon: { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  shilton: { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  brinklow: { addressRegion: 'Warwickshire', localAuthority: 'Rugby Borough Council' },
  southam: { addressRegion: 'Warwickshire', localAuthority: 'Stratford-on-Avon District Council' },
  studley: { addressRegion: 'Warwickshire', localAuthority: 'Stratford-on-Avon District Council' },
  alcester: { addressRegion: 'Warwickshire', localAuthority: 'Stratford-on-Avon District Council' },
} as const satisfies Record<string, AreaAuthority>

export type AreaSlug = keyof typeof AREA_AUTHORITIES

export function getAreaAuthority(slug: AreaSlug): AreaAuthority {
  const authority = AREA_AUTHORITIES[slug]
  if (!authority) throw new Error(`Missing authority data for area slug: ${slug}`)
  return authority
}
