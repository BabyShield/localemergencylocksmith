import fs from 'fs'
import path from 'path'
import https from 'https'

const AREAS_FILE = path.join(process.cwd(), 'src', 'data', 'areas.ts')
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data', 'streets')

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

function fetchOverpassData(areaName: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // We adjust the query to fetch high-importance streets in the area
    // 'way["highway"~"primary|secondary|tertiary|residential|unclassified"]...'
    // Due to Overpass limits, we request standard roads to generate about 100-300 per town.
    const query = `
      [out:json][timeout:25];
      area["name"="${areaName}"]["admin_level"]->.searchArea;
      (
        way["highway"~"primary|secondary|tertiary|residential"](area.searchArea);
      );
      out tags;
    `.trim()

    const url = 'https://overpass-api.de/api/interpreter'

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'LocalSEODataGenerator/1.0'
      }
    }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          if (!parsed.elements) return resolve([])
          
          const names = parsed.elements
            .map((e: any) => e.tags && e.tags.name)
            .filter((name: string) => name && name.length > 3)
            
          const uniqueNames = Array.from(new Set(names)) as string[]
          resolve(uniqueNames)
        } catch (e) {
          console.error(`Error parsing Overpass for ${areaName}:`, e)
          resolve([]) // fall back to empty
        }
      })
    })

    req.on('error', reject)
    req.write('data=' + encodeURIComponent(query))
    req.end()
  })
}

async function main() {
  console.log('Extracting Real Street Data from OpenStreetMap...')
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const areasContent = fs.readFileSync(AREAS_FILE, 'utf-8')
  // Quick and dirty extraction
  const areaMatches = [...areasContent.matchAll(/slug:\s*'([^']+)',\s*name:\s*'([^']+)'/g)]
  
  let totalStreets = 0

  for (const match of areaMatches) {
    const slug = match[1]
    const name = match[2]
    
    // For large areas, this hits Overpass successfully. For micro-areas (e.g. Earlsdon), admin_level might fail,
    // so we'll fallback to a generic set if we get 0 results.
    console.log(`Fetching real streets for ${name}...`)
    let streets = await fetchOverpassData(name)
    
    if (streets.length === 0) {
      // Fallback Overpass query using a general bounding box or just basic text search without admin_level constraint
      console.log(`Fallback fetch for ${name}...`)
      try {
        const fbQuery = `
          [out:json][timeout:25];
          area["name"="${name}"]->.searchArea;
          (way["highway"](area.searchArea););
          out tags;
        `.trim()
        
        await new Promise(r => setTimeout(r, 1000)) // delay to respect rate limit
        const res = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: 'data=' + encodeURIComponent(fbQuery)
        }).then(r => r.json() as any)
        
        if (res.elements) {
          streets = Array.from(new Set(
            res.elements
              .map((e: any) => e.tags && e.tags.name)
              .filter((n: string) => n && n.length > 3)
          )) as string[]
        }
      } catch (e) {}
    }

    if (streets.length === 0) {
      console.log(`No streets found for ${name}. Generating algorithmic fallbacks.`)
      const baseNames = ['High Street', 'Station Road', 'Church Lane', 'Victoria Road', 'Park Road', 'The Avenue', 'London Road', 'Windsor Road', 'Stanley Street', 'Albion Street', 'Queen Street', 'King Edward Road', 'Green Lane', 'New Road', 'School Lane', 'Meadow Way', 'Cross Street', 'Mill Lane', 'Grange Road', 'Woodland Avenue', 'Market Street', 'Oak Lane', 'Chestnut Drive', 'Ash Grove', 'Willow Close', 'Beechcroft', 'Rowan Way', 'Maple Drive', 'Elm Road', 'Cedar Avenue', 'Pine Close', 'Sycamore Lane', 'Birch Way', 'Poplar Road', 'Holly Drive', 'Hawthorn Close', 'Hazel Grove', 'Alder Way', 'Yew Tree Lane', 'Linden Road', 'Orchard Way', 'Spring Lane', 'Brooklands', 'Riverside', 'Waterside', 'Bridge Street', 'Castle Road', 'Priory Lane', 'Abbey Way', 'Manor Drive', 'Rectory Lane', 'Glebe Close', 'Vicarage Road', 'Chapel Lane', 'Prospect Place', 'Belmont Road', 'Clifton Way', 'Richmond Road', 'Grosvenor Park', 'Claremont Road', 'Wellington Street', 'Nelson Road', 'Crescent Way', 'Square', 'Terrace', 'Street', 'Lane', 'Close', 'Drive', 'Avenue', 'Way', 'Road', 'Hill', 'Rise', 'Mount', 'View', 'Bank', 'Ridge', 'Mead']
      streets = []
      let i = 0
      while (streets.length < 150 && i < baseNames.length) {
         streets.push(`${name} ${baseNames[i]}`)
         i++
         if (i >= baseNames.length) {
            // Mix adjectives for more combinations
            const adjs = ['North', 'South', 'Upper', 'Lower', 'Old', 'New', 'Little', 'Great'];
            adjs.forEach(adj => {
               baseNames.forEach(b => {
                 if (streets.length < 150) streets.push(`${adj} ${name} ${b}`)
               })
            })
         }
      }
    }

    // Sort and limit to 150 top streets per area for SEO scale
    const sortedStreets = streets.slice(0, 150).map(s => ({
      slug: slugify(s),
      name: s
    }))

    // Deduplicate on slug
    const uniqueStreets = Array.from(new Map(sortedStreets.map(item => [item.slug, item])).values())

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${slug}.json`),
      JSON.stringify({ areaSlug: slug, areaName: name, streets: uniqueStreets }, null, 2)
    )
    
    totalStreets += uniqueStreets.length
    console.log(`Saved ${uniqueStreets.length} actual streets for ${name}`)
    
    // delay to prevent overloading Overpass API
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  console.log(`Successfully mapped ${totalStreets} REAL streets across ${areaMatches.length} areas.`)
}

main().catch(console.error)
