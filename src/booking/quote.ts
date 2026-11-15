import type { Locality } from './localities'

export type TransportMode = 'auto' | 'cab' | 'metro'
export type ServiceRate = 0 | 0.05 | 0.1

export type PriceQuote = {
  mealLabel: string
  perPerson: number
  party: number
  food: number
  service: number
  serviceRate: ServiceRate
  gst: number
  table: number
  roadKm: number | null
  vehicles: number
  seatsEach: number
  mode: TransportMode
  transport: number | null
  total: number
  sameNeighbourhood: boolean
}

const GST_RATE = 0.05

const MEAL_BANDS: { test: RegExp; perPerson: number; label: string }[] = [
  { test: /coffee|cafe|café|bakery|dessert|ice cream/i, perPerson: 350, label: 'Café' },
  { test: /south indian|udupi|andhra|kerala|vegetarian/i, perPerson: 280, label: 'South Indian' },
  { test: /biryani|mughlai/i, perPerson: 450, label: 'Biryani' },
  { test: /chinese|thai|asian|momo|noodle/i, perPerson: 450, label: 'Asian' },
  { test: /pizza|italian|burger|american/i, perPerson: 550, label: 'Casual' },
  { test: /seafood|coastal/i, perPerson: 800, label: 'Seafood' },
  { test: /japanese|sushi|continental|european|french/i, perPerson: 900, label: 'Sit-down' },
  { test: /north indian|punjabi|tandoor|indian/i, perPerson: 500, label: 'Indian' },
]

export function mealBand(cuisine: string, name = ''): { perPerson: number; label: string } {
  const text = `${cuisine} ${name}`
  for (const band of MEAL_BANDS) {
    if (band.test.test(text)) return { perPerson: band.perPerson, label: band.label }
  }
  return { perPerson: 500, label: 'Restaurant' }
}

function haversineKm(a: Locality, b: Locality): number {
  const earthKm = 6371
  const toRad = (degrees: number) => (degrees * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * earthKm * Math.asin(Math.min(1, Math.sqrt(h)))
}

function roadKmBetween(origin: Locality, destination: Locality): { km: number; same: boolean } {
  if (origin.id === destination.id) return { km: 1.5, same: true }
  const straight = haversineKm(origin, destination)
  return { km: Math.max(1, Math.round(straight * 1.35 * 10) / 10), same: false }
}

function autoOneWay(km: number): number {
  if (km <= 2) return 30
  return Math.round(30 + (km - 2) * 15)
}

function cabOneWay(km: number): number {
  return Math.round(Math.max(80, 50 + km * 18))
}

function metroOneWay(km: number): number {
  const slabs: [number, number][] = [
    [2, 10],
    [4, 20],
    [6, 30],
    [8, 40],
    [10, 50],
    [15, 60],
    [20, 70],
    [25, 80],
    [40, 90],
  ]
  for (const [upto, fare] of slabs) {
    if (km <= upto) return fare
  }
  return 90
}

export function priceQuote(input: {
  cuisine: string
  name?: string
  origin: Locality
  destination: Locality | null
  party: number
  mode: TransportMode
  serviceRate: ServiceRate
}): PriceQuote {
  const party = Math.min(12, Math.max(1, Math.round(input.party)))
  const band = mealBand(input.cuisine, input.name)
  const food = band.perPerson * party
  const service = Math.round(food * input.serviceRate)
  const gst = Math.round((food + service) * GST_RATE)
  const table = food + service + gst

  if (!input.destination) {
    return {
      mealLabel: band.label,
      perPerson: band.perPerson,
      party,
      food,
      service,
      serviceRate: input.serviceRate,
      gst,
      table,
      roadKm: null,
      vehicles: 0,
      seatsEach: 0,
      mode: input.mode,
      transport: null,
      total: table,
      sameNeighbourhood: false,
    }
  }

  const trip = roadKmBetween(input.origin, input.destination)
  let transport = 0
  let vehicles = 1
  let seatsEach = party

  if (input.mode === 'auto') {
    seatsEach = 3
    vehicles = Math.ceil(party / seatsEach)
    transport = autoOneWay(trip.km) * vehicles * 2
  } else if (input.mode === 'cab') {
    seatsEach = 4
    vehicles = Math.ceil(party / seatsEach)
    transport = cabOneWay(trip.km) * vehicles * 2
  } else {
    seatsEach = 1
    vehicles = party
    transport = metroOneWay(trip.km) * party * 2
  }

  return {
    mealLabel: band.label,
    perPerson: band.perPerson,
    party,
    food,
    service,
    serviceRate: input.serviceRate,
    gst,
    table,
    roadKm: trip.km,
    vehicles,
    seatsEach,
    mode: input.mode,
    transport,
    total: table + transport,
    sameNeighbourhood: trip.same,
  }
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatInr(amount: number): string {
  return inr.format(amount)
}

export function asServiceRate(value: string): ServiceRate {
  if (value === '0.1') return 0.1
  if (value === '0.05') return 0.05
  return 0
}
