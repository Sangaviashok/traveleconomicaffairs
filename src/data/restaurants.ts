export type BusyLevel = 'Quiet' | 'Moderate' | 'Busy' | 'Packed'

export type Restaurant = {
  id: string
  name: string
  cuisine: string
  area: string
  address: string
  phone: string
  rating: number
  open: string
  close: string
  waitMinutes: number
  busy: BusyLevel
}

export const restaurants: Restaurant[] = [
  {
    id: 'toit-indiranagar',
    name: 'Toit Brewpub',
    cuisine: 'Pub · Continental',
    area: 'Indiranagar',
    address: '298, 100 Feet Road, Indiranagar, Bengaluru',
    phone: '+91 80 4211 8078',
    rating: 4.4,
    open: '12:00',
    close: '23:30',
    waitMinutes: 25,
    busy: 'Busy',
  },
  {
    id: 'truffles-koramangala',
    name: 'Truffles',
    cuisine: 'Cafe · Burgers',
    area: 'Koramangala',
    address: '93, 5th Avenue, Koramangala 5th Block, Bengaluru',
    phone: '+91 80 4111 4444',
    rating: 4.3,
    open: '11:00',
    close: '23:00',
    waitMinutes: 18,
    busy: 'Moderate',
  },
  {
    id: 'ctr-malleshwaram',
    name: 'CTR (Sri Sagar)',
    cuisine: 'South Indian',
    area: 'Malleshwaram',
    address: '7th Cross, Margosa Road, Malleshwaram, Bengaluru',
    phone: '+91 80 2331 2345',
    rating: 4.6,
    open: '07:30',
    close: '12:30',
    waitMinutes: 40,
    busy: 'Packed',
  },
  {
    id: 'mtr-lalbagh',
    name: 'MTR 1924',
    cuisine: 'South Indian',
    area: 'Lalbagh',
    address: '14, Lalbagh Road, Near Lalbagh West Gate, Bengaluru',
    phone: '+91 80 2222 0022',
    rating: 4.5,
    open: '08:00',
    close: '21:00',
    waitMinutes: 22,
    busy: 'Busy',
  },
  {
    id: 'vidyarthi-bhavan',
    name: 'Vidyarthi Bhavan',
    cuisine: 'South Indian',
    area: 'Basavanagudi',
    address: '32, Gandhi Bazaar Main Road, Basavanagudi, Bengaluru',
    phone: '+91 80 2667 7588',
    rating: 4.5,
    open: '06:30',
    close: '11:30',
    waitMinutes: 35,
    busy: 'Packed',
  },
  {
    id: 'karavalli',
    name: 'Karavalli',
    cuisine: 'Coastal · Seafood',
    area: 'Ashok Nagar',
    address: 'The Gateway Hotel, 66, Residency Road, Bengaluru',
    phone: '+91 80 6660 4545',
    rating: 4.6,
    open: '12:30',
    close: '23:00',
    waitMinutes: 10,
    busy: 'Quiet',
  },
  {
    id: 'empire-koramangala',
    name: 'Hotel Empire',
    cuisine: 'Indian · Kebabs',
    area: 'Koramangala',
    address: '36, Church Street / Koramangala 5th Block, Bengaluru',
    phone: '+91 80 2559 2040',
    rating: 4.1,
    open: '11:00',
    close: '02:00',
    waitMinutes: 15,
    busy: 'Moderate',
  },
  {
    id: 'windmills-whitefield',
    name: 'Windmills Craftworks',
    cuisine: 'Brewery · Continental',
    area: 'Whitefield',
    address: '331, Road 5B, EPIP Zone, Whitefield, Bengaluru',
    phone: '+91 80 4965 3333',
    rating: 4.4,
    open: '12:00',
    close: '23:30',
    waitMinutes: 20,
    busy: 'Busy',
  },
]

function minutesSinceMidnight(hhmm: string): number {
  const [hours, minutes] = hhmm.split(':').map(Number)
  return hours * 60 + minutes
}

export function isOpenNow(restaurant: Restaurant, now = new Date()): boolean {
  const current = now.getHours() * 60 + now.getMinutes()
  const openAt = minutesSinceMidnight(restaurant.open)
  const closeAt = minutesSinceMidnight(restaurant.close)

  if (closeAt > openAt) {
    return current >= openAt && current < closeAt
  }

  return current >= openAt || current < closeAt
}

export function formatHours(restaurant: Restaurant): string {
  return `${restaurant.open} – ${restaurant.close}`
}
