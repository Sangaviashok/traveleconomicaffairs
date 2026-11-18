import { useEffect, useId, useMemo, useState } from 'react'
import {
  ROOM_GST_LIMIT,
  formatInr,
  sampleTotalShift,
  seasonCalculation,
  seasonHike,
  stayBudget,
  type Arrival,
  type StayBudgetQuote,
} from './budget'
import { monsoonMonths, sampleRoomRates, seasonPeakNote, vacationSeasonMonths, type Place } from './data/places'

export function StayBudget({
  stays,
  selectedId,
  onSelect,
  compareSamples = false,
}: {
  stays: Place[]
  selectedId: string
  onSelect?: (id: string) => void
  compareSamples?: boolean
}) {
  const selected = stays.find((place) => place.id === selectedId) ?? stays[0]
  const rates = selected ? sampleRoomRates(selected) : null
  const nonSeasonInr = rates?.nonSeasonInr ?? selected?.nightlyInr ?? 2800
  const seasonInr = rates?.seasonInr
  const [nights, setNights] = useState(4)
  const [guests, setGuests] = useState(2)
  const [roomPerNight, setRoomPerNight] = useState(nonSeasonInr)
  const [foodPerPersonPerDay, setFoodPerPersonPerDay] = useState(700)
  const [autosPerDay, setAutosPerDay] = useState(1)
  const [arrival, setArrival] = useState<Arrival>('airport-taxi')

  useEffect(() => {
    setRoomPerNight(nonSeasonInr)
  }, [nonSeasonInr, selected?.id])

  const quote = useMemo(
    () =>
      stayBudget({
        nights,
        guests,
        roomPerNight,
        foodPerPersonPerDay,
        arrival,
        autosPerDay,
      }),
    [nights, guests, roomPerNight, foodPerPersonPerDay, arrival, autosPerDay],
  )

  const seasonQuote = useMemo(
    () =>
      seasonInr == null
        ? null
        : stayBudget({
            nights,
            guests,
            roomPerNight: seasonInr,
            foodPerPersonPerDay,
            arrival,
            autosPerDay,
          }),
    [nights, guests, seasonInr, foodPerPersonPerDay, arrival, autosPerDay],
  )

  const nonSeasonQuote = useMemo(
    () =>
      seasonInr == null
        ? null
        : stayBudget({
            nights,
            guests,
            roomPerNight: nonSeasonInr,
            foodPerPersonPerDay,
            arrival,
            autosPerDay,
          }),
    [nights, guests, seasonInr, nonSeasonInr, foodPerPersonPerDay, arrival, autosPerDay],
  )

  if (!selected) return null

  const gstLabel = gstText(quote)
  const hike = seasonInr == null ? null : seasonHike(seasonInr, nonSeasonInr)
  const stayRateNote =
    seasonInr != null && roomPerNight === seasonInr
      ? ' at the season sample.'
      : seasonInr != null && roomPerNight === nonSeasonInr
        ? ' at the monsoon sample.'
        : seasonInr != null
          ? ' at the room rate entered above.'
          : ''

  return (
    <section className="budget" aria-labelledby="budget-heading">
      <div className="budget-copy">
        <h2 id="budget-heading">Overall stay budget</h2>
        <p>
          The total for sleeping at {selected.name}: the room, tax, meals in town,
          and getting to Varkala. Room figures are sample rates for planning, not a
          live or booked tariff. {seasonPeakNote}
        </p>
      </div>
      <form className="budget-form" onSubmit={(event) => event.preventDefault()}>
        {onSelect ? (
          <label>
            Stay
            <select value={selected.id} onChange={(event) => onSelect(event.target.value)}>
              {stays.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <label>
          Nights
          <input
            type="number"
            min={1}
            max={21}
            value={nights}
            onChange={(event) => setNights(Number(event.target.value) || 1)}
          />
        </label>
        <label>
          People
          <input
            type="number"
            min={1}
            max={8}
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value) || 1)}
          />
        </label>
        <label>
          Room per night (₹)
          <input
            type="number"
            min={0}
            step={100}
            value={roomPerNight}
            onChange={(event) =>
              setRoomPerNight(event.target.value === '' ? 0 : Number(event.target.value))
            }
          />
        </label>
        {seasonInr != null ? (
          <div className="filters budget-modes" role="group" aria-label="Sample room rate">
            <button
              type="button"
              className={roomPerNight === seasonInr ? 'chip active' : 'chip'}
              onClick={() => setRoomPerNight(seasonInr)}
            >
              Season sample
            </button>
            <button
              type="button"
              className={roomPerNight === nonSeasonInr ? 'chip active' : 'chip'}
              onClick={() => setRoomPerNight(nonSeasonInr)}
            >
              Monsoon sample
            </button>
          </div>
        ) : null}
        <label>
          Meals per person / day (₹)
          <input
            type="number"
            min={0}
            step={50}
            value={foodPerPersonPerDay}
            onChange={(event) =>
              setFoodPerPersonPerDay(event.target.value === '' ? 0 : Number(event.target.value))
            }
          />
        </label>
        <label>
          Autos around town / day
          <input
            type="number"
            min={0}
            max={6}
            value={autosPerDay}
            onChange={(event) => setAutosPerDay(Number(event.target.value) || 0)}
          />
        </label>
        <div className="filters budget-modes" role="group" aria-label="How you arrived">
          <button
            type="button"
            className={arrival === 'airport-taxi' ? 'chip active' : 'chip'}
            onClick={() => setArrival('airport-taxi')}
          >
            Airport taxi
          </button>
          <button
            type="button"
            className={arrival === 'train-auto' ? 'chip active' : 'chip'}
            onClick={() => setArrival('train-auto')}
          >
            Train and auto
          </button>
        </div>
      </form>
      <div className="budget-total" aria-live="polite">
        <p className="budget-figure">{formatInr(quote.total)}</p>
        <p>
          for {quote.guests} · {quote.nights} nights · {formatInr(Math.round(quote.total / quote.guests))}{' '}
          per person
        </p>
        {hike && seasonInr != null ? (
          <p className="season-calc">{seasonCalculation(seasonInr, nonSeasonInr)}</p>
        ) : null}
        <dl>
          <div>
            <dt>Stay</dt>
            <dd>
              Room {formatInr(quote.room)} + {gstLabel} {formatInr(quote.gst)}
              {stayRateNote}
            </dd>
          </div>
          {!compareSamples && seasonQuote && nonSeasonQuote && hike && seasonInr != null ? (
            <>
              <div>
                <dt>Season sample</dt>
                <dd>
                  {formatRoomLine(seasonQuote)} at {formatInr(seasonInr)} a night, {vacationSeasonMonths}.{' '}
                  {formatInr(hike.amount)} a night higher ({hike.percent}%) than the monsoon sample.
                  {seasonQuote.gstRate === nonSeasonQuote.gstRate
                    ? ''
                    : ` The night is over ${formatInr(ROOM_GST_LIMIT)}, so this room line uses ${gstText(seasonQuote)} instead of ${gstText(nonSeasonQuote)}.`}
                </dd>
              </div>
              <div>
                <dt>Monsoon sample</dt>
                <dd>
                  {formatRoomLine(nonSeasonQuote)} at {formatInr(nonSeasonInr)} a night,{' '}
                  {monsoonMonths}.
                </dd>
              </div>
            </>
          ) : null}
          <div>
            <dt>Local costs</dt>
            <dd>
              Meals {formatInr(quote.foodPerPersonPerDay)} × {quote.guests} × {quote.nights} ={' '}
              {formatInr(quote.food)}
            </dd>
          </div>
          <div>
            <dt>Transportation</dt>
            <dd>
              {quote.arrival === 'airport-taxi'
                ? `Airport taxi ${formatInr(quote.arrivalFare)}, ${quote.arrivalVehicles} car${quote.arrivalVehicles === 1 ? '' : 's'} both ways`
                : `Train ${formatInr(quote.trainFare)} and station auto ${formatInr(quote.stationAutoFare)}`}
              {quote.localRides === 0
                ? '. Walking the cliff.'
                : `. Around town ${formatInr(quote.local)} (${quote.localRides} autos).`}
            </dd>
          </div>
          <div>
            <dt>Overall</dt>
            <dd>
              {formatInr(quote.stay)} stay + {formatInr(quote.localCosts)} local +{' '}
              {formatInr(quote.transport)} transport = {formatInr(quote.total)}
            </dd>
          </div>
          {compareSamples && seasonQuote && nonSeasonQuote ? (
            <>
              <SampleBudgetDetails label="Season sample" quote={seasonQuote} />
              <SampleBudgetDetails label="Monsoon sample" quote={nonSeasonQuote} />
              <div>
                <dt>Price change</dt>
                <dd>{sampleTotalShift(seasonQuote.total, nonSeasonQuote.total)}</dd>
              </div>
            </>
          ) : null}
        </dl>
        {seasonQuote && nonSeasonQuote ? (
          <BudgetChart monsoon={nonSeasonQuote} season={seasonQuote} />
        ) : null}
      </div>
    </section>
  )
}

function BudgetChart({ monsoon, season }: { monsoon: StayBudgetQuote; season: StayBudgetQuote }) {
  const rawId = useId().replace(/:/g, '')
  const glowId = `budget-glow-${rawId}`
  const peakId = `budget-peak-${rawId}`
  const direction = season.total > monsoon.total ? 'up' : season.total < monsoon.total ? 'down' : 'flat'
  const palette =
    direction === 'up'
      ? { room: '#5dff8a', meals: '#1e9a4a', transport: '#0c6a34', line: '#e7ffe9', panel: '#07140f' }
      : direction === 'down'
        ? { room: '#e7b197', meals: '#a85a38', transport: '#6b3a28', line: '#f6d2c4', panel: '#140e0c' }
        : { room: '#9fd4cc', meals: '#3d7a74', transport: '#1d4f4b', line: '#d5f3ef', panel: '#0c1412' }
  const max = Math.max(season.total, monsoon.total, 1)
  const width = 320
  const height = 168
  const plotTop = 22
  const baseline = 132
  const plotH = baseline - plotTop
  const yOf = (value: number) => baseline - (value / max) * plotH
  const barW = 64
  const monsoonX = 78
  const seasonX = 178
  const movement = direction === 'up' ? 'rises' : direction === 'down' ? 'falls' : 'stays level'
  const label = `Sample budget chart. Monsoon total ${formatInr(monsoon.total)}, season total ${formatInr(season.total)}. The line ${movement}. Sample planning rate, not a live tariff.`

  return (
    <figure className="budget-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <title>{label}</title>
        <defs>
          <filter id={glowId} filterUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={peakId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.line} stopOpacity="0.85" />
            <stop offset="100%" stopColor={palette.line} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} rx="12" fill={palette.panel} />
        <StackedBar x={monsoonX} quote={monsoon} yOf={yOf} barW={barW} palette={palette} />
        <StackedBar x={seasonX} quote={season} yOf={yOf} barW={barW} palette={palette} />
        <line
          x1={monsoonX + barW / 2}
          y1={yOf(monsoon.total)}
          x2={seasonX + barW / 2}
          y2={yOf(season.total)}
          stroke={palette.line}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.45"
          filter={`url(#${glowId})`}
        />
        <line
          x1={monsoonX + barW / 2}
          y1={yOf(monsoon.total)}
          x2={seasonX + barW / 2}
          y2={yOf(season.total)}
          stroke={palette.line}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={monsoonX + barW / 2} cy={yOf(monsoon.total)} r="4" fill={palette.line} />
        <circle
          cx={seasonX + barW / 2}
          cy={yOf(season.total)}
          r={direction === 'flat' ? 4 : 11}
          fill={`url(#${peakId})`}
        />
        <circle cx={seasonX + barW / 2} cy={yOf(season.total)} r="4.5" fill={palette.line} />
        <text x={monsoonX + barW / 2} y="154" textAnchor="middle" fill="#c9ddd4" fontSize="12">
          Monsoon
        </text>
        <text x={seasonX + barW / 2} y="154" textAnchor="middle" fill="#c9ddd4" fontSize="12">
          Season
        </text>
      </svg>
      <figcaption>
        Room and tax, meals, and transport, stacked to each total. The line {movement}. Sample planning
        rate, not a live tariff.
      </figcaption>
    </figure>
  )
}

function StackedBar({
  x,
  quote,
  yOf,
  barW,
  palette,
}: {
  x: number
  quote: StayBudgetQuote
  yOf: (value: number) => number
  barW: number
  palette: { room: string; meals: string; transport: string }
}) {
  const parts = [
    { name: 'Transport', value: quote.transport, fill: palette.transport },
    { name: 'Meals', value: quote.food, fill: palette.meals },
    { name: 'Room and tax', value: quote.stay, fill: palette.room },
  ]
  let spent = 0
  return (
    <g>
      {parts.map((part) => {
        const bottom = yOf(spent)
        spent += part.value
        const top = yOf(spent)
        const h = bottom - top
        if (h <= 0) return null
        return (
          <rect key={part.name} x={x} y={top} width={barW} height={h} fill={part.fill}>
            <title>
              {part.name} {formatInr(part.value)}
            </title>
          </rect>
        )
      })}
    </g>
  )
}

function SampleBudgetDetails({ label, quote }: { label: string; quote: StayBudgetQuote }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>
        Room {formatInr(quote.room)} + {gstText(quote)} {formatInr(quote.gst)}. Meals {formatInr(quote.food)}.
        Transport {formatInr(quote.transport)}. Total {formatInr(quote.total)}.
      </dd>
    </div>
  )
}

function gstText(quote: StayBudgetQuote): string {
  return quote.gstRate === 0.18 ? 'GST 18%' : 'GST 5%'
}

function formatRoomLine(quote: StayBudgetQuote): string {
  return `Room ${formatInr(quote.room)} + ${gstText(quote)} ${formatInr(quote.gst)}`
}
