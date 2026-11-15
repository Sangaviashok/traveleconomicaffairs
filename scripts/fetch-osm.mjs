import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const OVERPASS_URLS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]
const QUERY = `
[out:json][timeout:90];
(
  node["amenity"="restaurant"]["name"](12.84,77.45,13.12,77.78);
  way["amenity"="restaurant"]["name"](12.84,77.45,13.12,77.78);
  node["amenity"="cafe"]["name"](12.84,77.45,13.12,77.78);
  way["amenity"="cafe"]["name"](12.84,77.45,13.12,77.78);
);
out center tags;
`.trim()

async function queryOverpass() {
  let lastError = new Error('No Overpass endpoint responded')

  for (const url of OVERPASS_URLS) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'city-eats/0.0.0 (Bengaluru restaurant snapshot; local fetch)',
      },
      body: `data=${encodeURIComponent(QUERY)}`,
    })

    if (response.ok) {
      return response.json()
    }

    lastError = new Error(`Overpass HTTP ${response.status} from ${url}`)
  }

  throw lastError
}

const payload = await queryOverpass()
const elements = Array.isArray(payload.elements) ? payload.elements : []

const seen = new Set()
const restaurants = []

for (const element of elements) {
  const tags = element.tags ?? {}
  const name = String(tags.name ?? '').trim()
  if (!name) continue

  const key = `${name.toLowerCase()}|${tags['addr:street'] ?? ''}|${tags['addr:suburb'] ?? ''}`
  if (seen.has(key)) continue
  seen.add(key)

  restaurants.push({
    id: `${element.type}/${element.id}`,
    name,
    cuisine: tags.cuisine ?? '',
    area: tags['addr:suburb'] || tags['addr:neighbourhood'] || tags['addr:district'] || '',
    street: tags['addr:street'] ?? '',
    housenumber: tags['addr:housenumber'] ?? '',
    phone: tags.phone || tags['contact:phone'] || '',
    openingHours: tags.opening_hours ?? '',
  })
}

restaurants.sort((a, b) => a.name.localeCompare(b.name))

const outPath = fileURLToPath(new URL('../src/data/osm-restaurants.json', import.meta.url))
await writeFile(
  outPath,
  `${JSON.stringify({ source: 'OpenStreetMap', fetchedAt: new Date().toISOString(), restaurants }, null, 2)}\n`,
)

console.log(`Wrote ${restaurants.length} places to src/data/osm-restaurants.json`)
