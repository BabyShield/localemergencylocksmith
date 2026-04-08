import Link from 'next/link'
import fs from 'fs'
import path from 'path'

interface Props {
  areaSlug: string
  areaName: string
  parentHierarchy: 'areas' | 'locksmith'
}

function getSafeStreets(areaSlug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'streets', `${areaSlug}.json`)
    const data = fs.readFileSync(filePath, 'utf-8')
    const parsed = JSON.parse(data)
    return parsed.streets || []
  } catch (e) {
    return []
  }
}

// Pseudo-random deterministic shuffle so SSR matches across builds nicely
function deterministicShuffle(array: any[], seed: string) {
  let m = array.length, t, i
  let hash = 0
  for (let c = 0; c < seed.length; c++) {
    hash = Math.imul(31, hash) + seed.charCodeAt(c) | 0
  }
  
  const results = [...array]
  while (m) {
    i = Math.abs(hash % m--)
    hash = Math.imul(31, hash) + 1234567 | 0
    t = results[m]
    results[m] = results[i]
    results[i] = t
  }
  return results
}

export default function InternalLinkingMatrix({ areaSlug, areaName, parentHierarchy }: Props) {
  const allStreets = getSafeStreets(areaSlug)
  if (allStreets.length === 0) return null

  // Grab 18 random streets deterministically to inject PageRank
  const selectedStreets = deterministicShuffle(allStreets, areaSlug).slice(0, 18)

  return (
    <section className="py-12 px-4 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Local {areaName} Street Coverage
        </h3>
        <p className="text-xs text-gray-500 mb-6 max-w-2xl">
          I provide emergency locksmith services across all local streets and estates in {areaName}. 
          If you are locked out or need a lock change anywhere in the area, my response time is highly localized.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
          {selectedStreets.map((street: any) => (
            <Link
              key={street.slug}
              href={`/${parentHierarchy}/${areaSlug}/streets/${street.slug}`}
              className="text-sm text-gray-600 hover:text-[#FFB800] hover:underline"
            >
              Locksmith {street.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
