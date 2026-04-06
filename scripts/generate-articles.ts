import fs from 'fs'
import path from 'path'

// This script generates combinations of long-tail articles for the /near-me/[keyword]/[area]
// and /blog/[areaSlug]/[articleSlug] endpoints.
// Rather than putting them in a massive JSON, we can generate index mapping files or just
// use directories.

const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data', 'articles-generated')

const BLOG_TOPICS = [
  'How to Secure Your uPVC Doors',
  'What to do if your key snaps in the lock',
  'Ultimate Guide to Window Locks',
  'Anti-Snap Cylinders Explained',
  'Do You Need a BS3621 Lock?',
  'Why is my door lock stiff?',
  'Landlord Lock Obligations',
  'How to test your home security',
  'Emergency Boarding Up Basics',
  'Smart Locks vs Traditional Locks',
  'Most Common Burglary Tactics',
  'How to secure a shed or garage',
  'The difference between Mortice and Yale locks',
  'What is a multipoint lock system?',
  'When should you change your locks?'
]

const LONG_TAIL_KEYWORDS = [
  'local locksmith near me 24/7',
  'emergency door opening',
  'cheap locksmith near me',
  'fast response locksmith',
  'upvc door lock repair near me',
  'anti snap lock fitting near me',
  'bs3621 locksmith near me',
  'after hours locksmith near me'
]

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

async function main() {
  console.log('Generating long-tail SEO data and blog matrices...')
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Generate the permutations file for Near Me Long Tails
  const nearMePermutations = LONG_TAIL_KEYWORDS.map(kw => ({
    slug: slugify(kw),
    keyword: kw
  }))
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'near-me-keywords.json'),
    JSON.stringify(nearMePermutations, null, 2)
  )

  // Generate Blog Posts metadata (the actual content can be fed dynamically or via an AI API)
  const blogTemplates = BLOG_TOPICS.map(topic => ({
    slug: slugify(topic),
    titleTemplate: `${topic} in {area}`,
    baseTopic: topic
  }))

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'blog-templates.json'),
    JSON.stringify(blogTemplates, null, 2)
  )

  console.log(`Generated matrix: ${LONG_TAIL_KEYWORDS.length} near-me keywords and ${BLOG_TOPICS.length} blog templates.`)
}

main().catch(console.error)
