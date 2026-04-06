import fs from 'fs'
import path from 'path'

const AREAS_FILE = path.join(process.cwd(), 'src', 'data', 'areas.ts')
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data', 'articles-generated')

// Basic spintax parser
function spin(text: string): string {
  const spintaxRegex = /\{([^{}]+)\}/g
  let spun = text
  while (spintaxRegex.test(spun)) {
    spun = spun.replace(spintaxRegex, (match, contents) => {
      const choices = contents.split('|')
      return choices[Math.floor(Math.random() * choices.length)]
    })
  }
  return spun
}

const TOPICS = [
  { slug: 'upvc-door-locks', name: 'uPVC Door Locks' },
  { slug: 'emergency-lockout', name: 'Emergency Lockout Assistance' },
  { slug: 'bs3621-anti-snap', name: 'BS3621 & Anti-Snap Cylinder Upgrades' },
  { slug: 'commercial-locksmith', name: 'Commercial Security' },
  { slug: 'window-locks', name: 'Window Locks & Security' }
]

const INTRO_SPINTAX = `{Are you|Are you currently|If you find yourself} {looking for|searching for|in need of} {reliable|trustworthy|fast and professional} {topic} in {area}? {Look no further.|You've come to the right place.|I can help.} {As a local expert|As an independent locksmith|Operating locally in {postcode}}, I {provide|offer|deliver} {top-notch|high-quality|expert} {topic.lower} {services|solutions}. {Unlike national call centres, I charge no VAT|I offer a zero VAT service|My prices are transparent with no call-out fee}.`

const PARAGRAPH_SPINTAX = [
  `{When it comes to|Regarding|For} {topic}, {it is crucial|it's highly important|you must ensure} to have the {right|correct|best} {expertise|knowledge|specialist on hand}. {Many properties in {area} |Homes across {area} |Residents in {postcode}} {frequently|often} {require|need} this {service|assistance}. {My response time is typical {response}|I can usually be with you in {response}|I aim to reach you in {response}}.`,
  `{Choosing|Selecting|Hiring} a {local|nearby|community} locksmith for your {topic.lower} {means|ensures|guarantees} {faster|quicker|rapid} {service|results}. {I carry most parts on my van|My van is fully stocked|I have the required tools with me}, meaning {most jobs in {area} are completed in one visit|I can finish the job promptly|your property is secured immediately}.`,
  `{If you live near|If you're based around|For those in} {area}, {don't hesitate|feel free} to call. {I offer|I provide} {free quotes|no obligation estimates} over the phone.`
]

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

async function main() {
  console.log('Generating algorithmic blog content via Spintax engine...')
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const areasContent = fs.readFileSync(AREAS_FILE, 'utf-8')
  const areaMatches = [...areasContent.matchAll(/slug:\s*'([^']+)',\s*name:\s*'([^']+)',\s*postcode:\s*'([^']+)',\s*responseTime:\s*'([^']+)'/g)]
  
  // We'll generate a massive map of articles for each Area + Topic
  const articleDatabase: Record<string, any> = {}

  let count = 0
  for (const match of areaMatches) {
    const [_, slug, name, postcode, responseTime] = match
    
    for (const topic of TOPICS) {
      const articleKey = `${slug}/${topic.slug}`
      
      const vars = {
        topic: topic.name,
        'topic.lower': topic.name.toLowerCase(),
        area: name,
        postcode,
        response: responseTime
      }

      let intro = INTRO_SPINTAX
      let p1 = PARAGRAPH_SPINTAX[0]
      let p2 = PARAGRAPH_SPINTAX[1]
      let p3 = PARAGRAPH_SPINTAX[2]

      // Replace variables before spinning
      for (const [k, v] of Object.entries(vars)) {
        intro = intro.replace(new RegExp(`\\{${k}\\}`, 'g'), v)
        p1 = p1.replace(new RegExp(`\\{${k}\\}`, 'g'), v)
        p2 = p2.replace(new RegExp(`\\{${k}\\}`, 'g'), v)
        p3 = p3.replace(new RegExp(`\\{${k}\\}`, 'g'), v)
      }

      articleDatabase[articleKey] = {
        title: `${topic.name} in ${name}`,
        intro: spin(intro),
        content: [
          spin(p1),
          spin(p2),
          spin(p3)
        ]
      }
      count++
    }
  }

  // To prevent the Next.js bundle from loading a 50MB file, we write it to JSON
  // and load it dynamically in the page.tsx component.
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'algorithmic-blogs.json'),
    JSON.stringify(articleDatabase, null, 2)
  )

  console.log(`Generated ${count} unique algorithmic articles.`)
}

main().catch(console.error)
