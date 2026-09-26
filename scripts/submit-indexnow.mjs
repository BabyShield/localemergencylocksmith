// Tell Bing and the other IndexNow engines about every canonical URL.
// The key file must already be live at https://www.localemergencylocksmith.co.uk/{key}.txt

const KEY = 'b7e4c9a1d6f34820a5c17e9b2d84f063'
const HOST = 'www.localemergencylocksmith.co.uk'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP = `https://${HOST}/sitemap.xml`

const sitemapResponse = await fetch(SITEMAP)
if (!sitemapResponse.ok) {
  throw new Error(`Sitemap returned ${sitemapResponse.status}`)
}
const sitemap = await sitemapResponse.text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].trim())
if (urlList.length === 0) throw new Error('Sitemap contained no URLs')

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
})

const body = await response.text()
console.log(`IndexNow ${response.status} for ${urlList.length} URLs${body ? `: ${body}` : ''}`)
if (response.status !== 200 && response.status !== 202) {
  process.exitCode = 1
}
