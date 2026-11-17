import { useEffect, useMemo, useState } from 'react'
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
      </div>
    </section>
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
