export type Arrival = 'airport-taxi' | 'train-auto'

export type VarkalaStay = {
  nights: number
  guests: number
  roomPerNight: number
  foodPerPersonPerDay: number
  arrival: Arrival
  autosPerDay: number
}

export type VarkalaQuote = {
  nights: number
  guests: number
  roomPerNight: number
  room: number
  gstRate: number
  gst: number
  foodPerPersonPerDay: number
  food: number
  arrival: Arrival
  arrivalFare: number
  arrivalVehicles: number
  trainFare: number
  stationAutoFare: number
  autosPerDay: number
  localAutoFare: number
  localRides: number
  local: number
  stay: number
  localCosts: number
  transport: number
  total: number
}

export const VARKALA_EXAMPLE: VarkalaStay = {
  nights: 4,
  guests: 2,
  roomPerNight: 2800,
  foodPerPersonPerDay: 700,
  arrival: 'airport-taxi',
  autosPerDay: 1,
}

const ROOM_GST_LIMIT = 7500
const AIRPORT_TAXI_ONE_WAY = 1600
const TAXI_SEATS = 4
const TRAIN_PER_PERSON_ONE_WAY = 50
const STATION_AUTO_ONE_WAY = 250
const AUTO_SEATS = 3
const LOCAL_AUTO = 150

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, Math.round(value)))
}

export function varkalaQuote(input: VarkalaStay): VarkalaQuote {
  const nights = clamp(input.nights, 1, 21)
  const guests = clamp(input.guests, 1, 8)
  const roomPerNight = clamp(input.roomPerNight, 0, 40000)
  const foodPerPersonPerDay = clamp(input.foodPerPersonPerDay, 0, 8000)
  const autosPerDay = clamp(input.autosPerDay, 0, 6)

  const room = roomPerNight * nights
  const gstRate = roomPerNight === 0 ? 0 : roomPerNight <= ROOM_GST_LIMIT ? 0.05 : 0.18
  const gst = Math.round(room * gstRate)
  const food = foodPerPersonPerDay * guests * nights

  const taxiCount = Math.ceil(guests / TAXI_SEATS)
  const stationAutos = Math.ceil(guests / AUTO_SEATS)
  const arrivalFare =
    input.arrival === 'airport-taxi' ? AIRPORT_TAXI_ONE_WAY * 2 * taxiCount : 0
  const trainFare =
    input.arrival === 'train-auto' ? TRAIN_PER_PERSON_ONE_WAY * guests * 2 : 0
  const stationAutoFare =
    input.arrival === 'train-auto' ? STATION_AUTO_ONE_WAY * 2 * stationAutos : 0

  const localRides = autosPerDay * nights
  const local = LOCAL_AUTO * localRides
  const transport = arrivalFare + trainFare + stationAutoFare + local
  const stay = room + gst

  return {
    nights,
    guests,
    roomPerNight,
    room,
    gstRate,
    gst,
    foodPerPersonPerDay,
    food,
    arrival: input.arrival,
    arrivalFare,
    arrivalVehicles: input.arrival === 'airport-taxi' ? taxiCount : stationAutos,
    trainFare,
    stationAutoFare,
    autosPerDay,
    localAutoFare: LOCAL_AUTO,
    localRides,
    local,
    stay,
    localCosts: food,
    transport,
    total: stay + food + transport,
  }
}
