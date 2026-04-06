import fs from 'fs'
import path from 'path'

// Missing user areas directly from prompt
const NEW_AREAS = [
  // Nuneaton (Missing)
  { name: 'Chapel End', slug: 'chapel-end', postcode: 'CV10', region: 'Nuneaton', lat: 52.5350, lng: -1.5000, neighbours: ['camp-hill', 'galley-common'] },
  { name: 'Bermuda Park', slug: 'bermuda-park', postcode: 'CV10', region: 'Nuneaton', lat: 52.5050, lng: -1.4850, neighbours: ['nuneaton', 'stockingford'] },
  { name: 'Galley Common', slug: 'galley-common', postcode: 'CV10', region: 'Nuneaton', lat: 52.5250, lng: -1.5200, neighbours: ['chapel-end', 'stockingford'] },
  { name: 'Hartshill', slug: 'hartshill', postcode: 'CV10', region: 'Nuneaton', lat: 52.5450, lng: -1.5150, neighbours: ['chapel-end', 'nuneaton'] },
  { name: 'Bedworth', slug: 'bedworth', postcode: 'CV12', region: 'Bedworth', lat: 52.4750, lng: -1.4800, neighbours: ['nuneaton', 'bulkington', 'exhall'] },
  { name: 'Bulkington', slug: 'bulkington', postcode: 'CV12', region: 'Bedworth', lat: 52.4850, lng: -1.4450, neighbours: ['bedworth', 'nuneaton'] },

  // Rugby
  { name: 'Rugby Town Centre', slug: 'rugby-town-centre', postcode: 'CV21', region: 'Rugby', lat: 52.3700, lng: -1.2600, neighbours: ['hillmorton', 'bilton', 'new-bilton'] },
  { name: 'Hillmorton', slug: 'hillmorton', postcode: 'CV21', region: 'Rugby', lat: 52.3650, lng: -1.2300, neighbours: ['rugby-town-centre', 'dunchurch'] },
  { name: 'Bilton', slug: 'bilton', postcode: 'CV22', region: 'Rugby', lat: 52.3600, lng: -1.2800, neighbours: ['rugby-town-centre', 'cawston', 'dunchurch'] },
  { name: 'Brownsover', slug: 'brownsover', postcode: 'CV21', region: 'Rugby', lat: 52.3850, lng: -1.2500, neighbours: ['rugby-town-centre'] },
  { name: 'Cawston', slug: 'cawston', postcode: 'CV22', region: 'Rugby', lat: 52.3500, lng: -1.2950, neighbours: ['bilton', 'dunchurch'] },
  { name: 'Long Lawford', slug: 'long-lawford', postcode: 'CV23', region: 'Rugby', lat: 52.3750, lng: -1.2950, neighbours: ['new-bilton'] },
  { name: 'New Bilton', slug: 'new-bilton', postcode: 'CV21', region: 'Rugby', lat: 52.3750, lng: -1.2750, neighbours: ['rugby-town-centre', 'long-lawford'] },
  { name: 'Dunchurch', slug: 'dunchurch', postcode: 'CV22', region: 'Rugby', lat: 52.3400, lng: -1.2850, neighbours: ['bilton', 'cawston'] },

  // Leamington Spa
  { name: 'Royal Leamington Spa Town Centre', slug: 'royal-leamington-spa-town-centre', postcode: 'CV32', region: 'Leamington Spa', lat: 52.2850, lng: -1.5300, neighbours: ['milverton', 'lillington'] },
  { name: 'Milverton', slug: 'milverton', postcode: 'CV32', region: 'Leamington Spa', lat: 52.2950, lng: -1.5450, neighbours: ['royal-leamington-spa-town-centre'] },
  { name: 'Lillington', slug: 'lillington', postcode: 'CV32', region: 'Leamington Spa', lat: 52.3000, lng: -1.5200, neighbours: ['royal-leamington-spa-town-centre'] },
  { name: 'Sydenham', slug: 'sydenham', postcode: 'CV31', region: 'Leamington Spa', lat: 52.2750, lng: -1.5150, neighbours: ['whitnash'] },
  { name: 'Whitnash', slug: 'whitnash', postcode: 'CV31', region: 'Leamington Spa', lat: 52.2700, lng: -1.5350, neighbours: ['heathcote', 'sydenham'] },
  { name: 'Heathcote', slug: 'heathcote', postcode: 'CV31', region: 'Leamington Spa', lat: 52.2650, lng: -1.5550, neighbours: ['whitnash'] },

  // Warwick
  { name: 'Warwick Town Centre', slug: 'warwick-town-centre', postcode: 'CV34', region: 'Warwick', lat: 52.2800, lng: -1.5850, neighbours: ['woodloes-park'] },
  { name: 'Woodloes Park', slug: 'woodloes-park', postcode: 'CV34', region: 'Warwick', lat: 52.2950, lng: -1.5800, neighbours: ['warwick-town-centre'] },
  { name: 'Chase Meadow', slug: 'chase-meadow', postcode: 'CV34', region: 'Warwick', lat: 52.2750, lng: -1.6050, neighbours: ['warwick-town-centre'] },
  { name: 'Warwick Gates', slug: 'warwick-gates', postcode: 'CV34', region: 'Warwick', lat: 52.2700, lng: -1.5700, neighbours: ['heathcote'] },

  // Stratford
  { name: 'Stratford-upon-Avon Town Centre', slug: 'stratford-upon-avon-town-centre', postcode: 'CV37', region: 'Stratford', lat: 52.1900, lng: -1.7050, neighbours: ['tiddington', 'shottery'] },
  { name: 'Tiddington', slug: 'tiddington', postcode: 'CV37', region: 'Stratford', lat: 52.2000, lng: -1.6850, neighbours: ['stratford-upon-avon-town-centre'] },
  { name: 'Bishopton', slug: 'bishopton', postcode: 'CV37', region: 'Stratford', lat: 52.2050, lng: -1.7200, neighbours: ['stratford-upon-avon-town-centre'] },
  { name: 'Shottery', slug: 'shottery', postcode: 'CV37', region: 'Stratford', lat: 52.1950, lng: -1.7300, neighbours: ['stratford-upon-avon-town-centre'] },

  // Villages
  { name: 'Kenilworth', slug: 'kenilworth', postcode: 'CV8', region: 'Warwickshire', lat: 52.3450, lng: -1.5850, neighbours: ['finham'] },
  { name: 'Balsall Common', slug: 'balsall-common', postcode: 'CV7', region: 'Warwickshire', lat: 52.3850, lng: -1.6700, neighbours: ['eastern-green'] },
  { name: 'Meriden', slug: 'meriden', postcode: 'CV7', region: 'Warwickshire', lat: 52.4350, lng: -1.6450, neighbours: ['balsall-common'] },
  { name: 'Hampton-in-Arden', slug: 'hampton-in-arden', postcode: 'B92', region: 'Warwickshire', lat: 52.4300, lng: -1.7000, neighbours: ['meriden'] },
  { name: 'Wolston', slug: 'wolston', postcode: 'CV8', region: 'Warwickshire', lat: 52.3750, lng: -1.3950, neighbours: ['brandon'] },
  { name: 'Ryton-on-Dunsmore', slug: 'ryton-on-dunsmore', postcode: 'CV8', region: 'Warwickshire', lat: 52.3600, lng: -1.4150, neighbours: ['wolston'] },
  { name: 'Baginton', slug: 'baginton', postcode: 'CV8', region: 'Warwickshire', lat: 52.3650, lng: -1.4850, neighbours: ['finham'] },
  { name: 'Brandon', slug: 'brandon', postcode: 'CV8', region: 'Warwickshire', lat: 52.3800, lng: -1.4050, neighbours: ['wolston'] },
  { name: 'Shilton', slug: 'shilton', postcode: 'CV7', region: 'Warwickshire', lat: 52.4550, lng: -1.4150, neighbours: ['bulkington'] },
  { name: 'Brinklow', slug: 'brinklow', postcode: 'CV23', region: 'Warwickshire', lat: 52.4100, lng: -1.3550, neighbours: ['rugby'] },
  { name: 'Southam', slug: 'southam', postcode: 'CV47', region: 'Warwickshire', lat: 52.2500, lng: -1.3900, neighbours: ['leamington-spa'] },
  { name: 'Studley', slug: 'studley', postcode: 'B80', region: 'Warwickshire', lat: 52.2700, lng: -1.8900, neighbours: ['alcester'] },
  { name: 'Alcester', slug: 'alcester', postcode: 'B49', region: 'Warwickshire', lat: 52.2150, lng: -1.8650, neighbours: ['stratford'] }
]

function addAreas() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'areas.ts')
  let content = fs.readFileSync(filePath, 'utf-8')

  const additions = NEW_AREAS.map(a => {
    return `
  {
    slug: '${a.slug}',
    name: '${a.name}',
    postcode: '${a.postcode}',
    region: '${a.region}',
    lat: ${a.lat},
    lng: ${a.lng},
    neighbours: ${JSON.stringify(a.neighbours)},
    responseTime: '20-40 minutes',
    uniqueContent: 'Emergency locksmith covering ${a.name} and the wider ${a.postcode} area. I regularly attend lockouts, broken keys, and security upgrades across ${a.region}. With 24/7 availability and zero call-out charges, I ensure residential and commercial properties in ${a.name} are fully secure.',
    housingStock: 'Properties in ${a.name} range from historic older builds with solid wood doors to modern estates utilizing composite doors and multipoint uPVC locks.',
    commonIssues: 'The most frequent requirements in ${a.name} involve upgrading weak euro cylinders, resolving locked or jammed multipoint doors, and emergency non-destructive entry.',
    localDetail: '${a.name} is a key coverage zone in the ${a.region} corridor. I am highly familiar with the surrounding streets, commercial centers, and local estates.',
    faqs: [
      { q: 'How fast can you reach ${a.name}?', a: 'Typically 20-40 minutes depending on traffic in the ${a.region} area.' },
      { q: 'What does a lockout cost in ${a.postcode}?', a: 'From £59, all inclusive. No VAT.' },
      { q: 'Do you replace uPVC locks in ${a.name}?', a: 'Yes, I repair and install replacement cylinders and locking mechanisms every day.' },
      { q: 'Are you available 24/7 in ${a.region}?', a: 'Yes, I provide a genuine round-the-clock emergency service across ${a.name}.' }
    ],
  },`
  }).join('')

  // Insert before the final closing brace of the array
  const insertIndex = content.lastIndexOf(']')
  
  const updatedContent = content.substring(0, insertIndex) + additions + '\n]' + content.substring(insertIndex + 1)

  fs.writeFileSync(filePath, updatedContent)
  console.log(`Successfully injected ${NEW_AREAS.length} new areas to src/data/areas.ts`)
}

addAreas()
