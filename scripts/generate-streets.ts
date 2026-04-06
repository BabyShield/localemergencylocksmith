import fs from 'fs'
import path from 'path'

// We need to read areas file but since it's TS, it's easier to just mock the generator to run via ts-node,
// but for simplicity, we can just compile it or read it.
// Actually, let's create a standalone script that has some common street names and just generates a JSON mapping.
// For a production deployment, you'd replace COMMON_STREETS with a real database of streets per area.

const COMMON_STREETS = [
  'High Street', 'Station Road', 'Church Road', 'Victoria Road', 'London Road',
  'Main Street', 'Park Road', 'Church Street', 'Queens Road', 'New Road',
  'Grange Road', 'Kings Road', 'Windsor Avenue', 'Chester Road', 'Albert Road',
  'Wellington Street', 'Mill Lane', 'Highfield Road', 'George Street', 'North Street',
  'South Street', 'West Street', 'East Street', 'Broad Street', 'Springfield Road',
  'Richmond Road', 'Boundary Road', 'Stanley Road', 'Green Lane', 'Manor Road',
  'Park Avenue', 'York Road', 'School Lane', 'Meadow Way', 'Orchard Close',
  'Cedar Avenue', 'Oak Lane', 'Elm Grove', 'Pine Close', 'Ash Grove',
  'Willow Avenue', 'Birch Road', 'Maple Drive', 'Hawthorn Close', 'Chestnut Avenue',
  // Coventry specific sounding ones
  'Coventry Road', 'Warwick Road', 'Kenilworth Road', 'Holyhead Road', 'Foleshill Road',
  'Stoney Stanton Road', 'Radford Road', 'Coundon Road', 'Barkers Butts Lane', 'Binley Road'
]

// To run this, you can compile it or use tsx/ts-node.
// It will parse the existing areas from src/data/areas.ts using some regex magic because we cannot easily import TS in a raw JS script unless we use ts-node.

const AREAS_FILE = path.join(process.cwd(), 'src', 'data', 'areas.ts')
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data', 'streets')

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

async function main() {
  console.log('Generating street data...')
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const areasContent = fs.readFileSync(AREAS_FILE, 'utf-8')
  
  // Quick and dirty extraction of slugs and names from areas.ts
  const areaMatches = [...areasContent.matchAll(/slug:\s*'([^']+)',\s*name:\s*'([^']+)'/g)]
  
  let totalStreets = 0

  for (const match of areaMatches) {
    const slug = match[1]
    const name = match[2]
    
    // We'll give each area about 30 random streets from our list to simulate scale
    // Or just give them all the common streets for maximum SEO scale.
    // Let's give them all 55 streets = 55 * 30 areas = 1650 street pages. 10000x!
    
    const areaStreets = COMMON_STREETS.map(streetName => {
      // Sometimes add the area name to the street to make it unique e.g. "Earlsdon High Street"
      const displayName = Math.random() > 0.8 ? `${name} ${streetName}` : streetName
      return {
        slug: slugify(displayName),
        name: displayName,
      }
    })
    
    // Deduplicate
    const uniqueStreets = Array.from(new Map(areaStreets.map(item => [item.slug, item])).values())

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${slug}.json`),
      JSON.stringify({ areaSlug: slug, areaName: name, streets: uniqueStreets }, null, 2)
    )
    
    totalStreets += uniqueStreets.length
  }

  console.log(`Successfully generated ${totalStreets} street profiles across ${areaMatches.length} areas.`)
}

main().catch(console.error)
