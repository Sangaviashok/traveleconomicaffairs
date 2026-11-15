import osmSnapshot from './osm-restaurants.json'

export type OpenStatus = 'open' | 'closed' | 'unknown'

export type Restaurant = {
  id: string
  name: string
  cuisine: string
  area: string
  address: string
  phone: string
  rating: number | null
  open: string | null
  close: string | null
  hoursLabel: string
  waitMinutes: number | null
}

type OsmPlace = {
  id: string
  name: string
  cuisine: string
  area: string
  street: string
  housenumber: string
  phone: string
  openingHours: string
}

const DAY_CODES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const

function prettyCuisine(raw: string): string {
  if (!raw.trim()) return 'Restaurant'
  return raw
    .split(/[;,]/)
    .map((part) => part.trim().replaceAll('_', ' '))
    .filter(Boolean)
    .join(' · ')
}

function prettyAddress(place: OsmPlace): string {
  const parts = [place.housenumber, place.street, place.area, 'Bengaluru'].filter(
    (part) => part.trim(),
  )
  return parts.join(', ')
}

function padTime(value: string): string {
  const [hours, minutes] = value.split(':')
  return `${hours.padStart(2, '0')}:${minutes}`
}

function ruleCoversToday(rule: string, dayCode: string): boolean {
  const trimmed = rule.trim()
  if (/^24\/7$/i.test(trimmed) || trimmed.toLowerCase() === 'open') {
    return true
  }

  if (trimmed.includes(dayCode) || /\b(Mo|Tu|We|Th|Fr|Sa|Su)\b/.test(trimmed) === false) {
    if (trimmed.includes('-') && /\b(Mo|Tu|We|Th|Fr|Sa|Su)\b/.test(trimmed)) {
      const range = trimmed.match(/\b(Mo|Tu|We|Th|Fr|Sa|Su)\s*-\s*(Mo|Tu|We|Th|Fr|Sa|Su)/)
      if (range) {
        const start = DAY_CODES.indexOf(range[1] as (typeof DAY_CODES)[number])
        const end = DAY_CODES.indexOf(range[2] as (typeof DAY_CODES)[number])
        const today = DAY_CODES.indexOf(dayCode as (typeof DAY_CODES)[number])
        if (start <= end) return today >= start && today <= end
        return today >= start || today <= end
      }
    }
    if (trimmed.includes(dayCode)) return true
    if (/\b(Mo|Tu|We|Th|Fr|Sa|Su)\b/.test(trimmed) === false) return true
  }

  return trimmed.includes(dayCode)
}

function parseHours(
  openingHours: string,
  now = new Date(),
): { open: string | null; close: string | null; label: string } {
  const raw = openingHours.trim()
  if (!raw) {
    return { open: null, close: null, label: 'Hours not listed on OSM' }
  }

  if (/24\/7/i.test(raw)) {
    return { open: '00:00', close: '23:59', label: 'Open 24 hours' }
  }

  const dayCode = DAY_CODES[now.getDay()]
  const rules = raw.split(';')
  const todaysRule = rules.find((rule) => ruleCoversToday(rule, dayCode)) ?? raw
  const times = todaysRule.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/)

  if (!times) {
    return { open: null, close: null, label: raw }
  }

  return {
    open: padTime(times[1]),
    close: padTime(times[2]),
    label: `${padTime(times[1])} – ${padTime(times[2])}`,
  }
}

export const osmFetchedAt = osmSnapshot.fetchedAt

export const restaurants: Restaurant[] = (osmSnapshot.restaurants as OsmPlace[]).map(
  (place) => {
    const hours = parseHours(place.openingHours)
    return {
      id: place.id,
      name: place.name,
      cuisine: prettyCuisine(place.cuisine),
      area: place.area || 'Bengaluru',
      address: prettyAddress(place),
      phone: place.phone,
      rating: null,
      open: hours.open,
      close: hours.close,
      hoursLabel: hours.label,
      waitMinutes: null,
    }
  },
)

function minutesSinceMidnight(hhmm: string): number {
  const [hours, minutes] = hhmm.split(':').map(Number)
  return hours * 60 + minutes
}

export function isOpenNow(restaurant: Restaurant, now = new Date()): boolean | null {
  if (!restaurant.open || !restaurant.close) {
    return null
  }

  const current = now.getHours() * 60 + now.getMinutes()
  const openAt = minutesSinceMidnight(restaurant.open)
  const closeAt = minutesSinceMidnight(restaurant.close)

  if (closeAt > openAt) {
    return current >= openAt && current < closeAt
  }

  return current >= openAt || current < closeAt
}

export function openStatus(restaurant: Restaurant): OpenStatus {
  const open = isOpenNow(restaurant)
  if (open === null) return 'unknown'
  return open ? 'open' : 'closed'
}

export function formatHours(restaurant: Restaurant): string {
  return restaurant.hoursLabel
}
