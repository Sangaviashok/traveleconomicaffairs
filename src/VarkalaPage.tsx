import { useMemo, useState } from 'react'
import { formatInr } from './booking/quote'
import { VARKALA_EXAMPLE, varkalaQuote, type Arrival, type VarkalaStay } from './varkala/quote'
import './App.css'

function addNights(isoDate: string, nights: number): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, (month ?? 1) - 1, day ?? 1)
  if (Number.isNaN(date.getTime())) return ''
  date.setDate(date.getDate() + nights)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatDay(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, (month ?? 1) - 1, day ?? 1)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function VarkalaPage() {
  const [checkIn, setCheckIn] = useState(() => new Date().toISOString().slice(0, 10))
  const [stay, setStay] = useState<VarkalaStay>(VARKALA_EXAMPLE)
  const quote = useMemo(() => varkalaQuote(stay), [stay])
  const checkOutLabel = addNights(checkIn, quote.nights)
  const gstLabel = quote.gstRate === 0.18 ? 'GST 18%' : 'GST 5%'

  function patch(next: Partial<VarkalaStay>) {
    setStay((current) => ({ ...current, ...next }))
  }

  return (
    <div className="page">
      <header className="hero-bar">
        <p className="eyebrow">Varkala</p>
        <h1>Travel Economic Affairs</h1>
        <p className="lede">
          Example of a cliff stay in Varkala: the room, the tax on the room, meals
          in town, and getting there. Change the nights and the room to the days
          you were there. The total is the whole trip, not just the nightly rate.
        </p>
      </header>

      <div className="stay-layout">
        <form className="quote-bar" onSubmit={(event) => event.preventDefault()}>
          <label>
            Check-in
            <input
              type="date"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
            />
          </label>
          <label>
            Nights
            <input
              type="number"
              min={1}
              max={21}
              value={stay.nights}
              onChange={(event) => patch({ nights: Number(event.target.value) || 1 })}
            />
          </label>
          <label>
            People
            <input
              type="number"
              min={1}
              max={8}
              value={stay.guests}
              onChange={(event) => patch({ guests: Number(event.target.value) || 1 })}
            />
          </label>
          <label>
            Room per night (₹)
            <input
              type="number"
              min={0}
              step={100}
              value={stay.roomPerNight}
              onChange={(event) =>
                patch({ roomPerNight: event.target.value === '' ? 0 : Number(event.target.value) })
              }
            />
          </label>
          <label>
            Meals per person / day (₹)
            <input
              type="number"
              min={0}
              step={50}
              value={stay.foodPerPersonPerDay}
              onChange={(event) =>
                patch({
                  foodPerPersonPerDay: event.target.value === '' ? 0 : Number(event.target.value),
                })
              }
            />
          </label>
          <label>
            Autos around town / day
            <input
              type="number"
              min={0}
              max={6}
              value={stay.autosPerDay}
              onChange={(event) => patch({ autosPerDay: Number(event.target.value) || 0 })}
            />
          </label>
          <div className="filters quote-modes" role="group" aria-label="How you arrived">
            <button
              type="button"
              className={stay.arrival === 'airport-taxi' ? 'chip active' : 'chip'}
              onClick={() => patch({ arrival: 'airport-taxi' satisfies Arrival })}
            >
              Airport taxi
            </button>
            <button
              type="button"
              className={stay.arrival === 'train-auto' ? 'chip active' : 'chip'}
              onClick={() => patch({ arrival: 'train-auto' satisfies Arrival })}
            >
              Train and auto
            </button>
          </div>
          <p className="quote-note">
            North Cliff to Papanasam beach is a walk. The auto count is for extra
            hops, at ₹{quote.localAutoFare} each. Airport taxi is a planning fare of
            ₹1,600 one way for one car (4 seats) from Trivandrum, both ways. The
            train is ₹50 a person each way to Varkala Sivagiri, then ₹250 for the
            auto up to the cliff. Room tax on this page is 5% up to ₹7,500 a night,
            and 18% above that.
          </p>
          <button
            type="button"
            className="chip"
            onClick={() => setStay(VARKALA_EXAMPLE)}
          >
            Reset to the 4-night example
          </button>
        </form>

        <article className="receipt" aria-live="polite">
          <p className="eyebrow">North Cliff · Varkala</p>
          <p className="quote-total">
            <span className="quote-total-number">{formatInr(quote.total)}</span>
            <span className="quote-caption">
              total for {quote.guests} · {quote.nights} nights · {formatDay(checkIn)} to{' '}
              {checkOutLabel}
            </span>
          </p>
          <p className="quote-caption">
            {formatInr(Math.round(quote.total / quote.guests))} per person ·{' '}
            {formatInr(Math.round(quote.total / quote.nights))} per night for the group
          </p>

          <h2 className="receipt-heading">Stay</h2>
          <dl className="details">
            <div>
              <dt>Room</dt>
              <dd>
                {formatInr(quote.roomPerNight)} × {quote.nights} nights · {formatInr(quote.room)}
              </dd>
            </div>
            <div>
              <dt>{gstLabel}</dt>
              <dd>{formatInr(quote.gst)} · on the room</dd>
            </div>
          </dl>

          <h2 className="receipt-heading">Local costs</h2>
          <dl className="details">
            <div>
              <dt>Meals in town</dt>
              <dd>
                {formatInr(quote.foodPerPersonPerDay)} × {quote.guests} × {quote.nights} days ·{' '}
                {formatInr(quote.food)}
              </dd>
            </div>
          </dl>

          <h2 className="receipt-heading">Transportation</h2>
          <dl className="details">
            {quote.arrival === 'airport-taxi' ? (
              <div>
                <dt>Airport taxi</dt>
                <dd>
                  {formatInr(quote.arrivalFare)} · Trivandrum to the cliff, both ways ·{' '}
                  {quote.arrivalVehicles} car{quote.arrivalVehicles === 1 ? '' : 's'}
                </dd>
              </div>
            ) : (
              <>
                <div>
                  <dt>Train</dt>
                  <dd>
                    {formatInr(quote.trainFare)} · {quote.guests} to Varkala Sivagiri, both ways
                  </dd>
                </div>
                <div>
                  <dt>Auto from the station</dt>
                  <dd>
                    {formatInr(quote.stationAutoFare)} · up to the cliff, both ways ·{' '}
                    {quote.arrivalVehicles} auto{quote.arrivalVehicles === 1 ? '' : 's'}
                  </dd>
                </div>
              </>
            )}
            <div>
              <dt>Around Varkala</dt>
              <dd>
                {quote.localRides === 0
                  ? `${formatInr(0)} · walking the cliff`
                  : `${formatInr(quote.local)} · ${quote.localRides} autos at ${formatInr(quote.localAutoFare)}`}
              </dd>
            </div>
          </dl>

          <dl className="details breakdown">
            <div>
              <dt>Stay</dt>
              <dd>{formatInr(quote.stay)}</dd>
            </div>
            <div>
              <dt>Local costs</dt>
              <dd>{formatInr(quote.localCosts)}</dd>
            </div>
            <div>
              <dt>Transportation</dt>
              <dd>{formatInr(quote.transport)}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd className="line-total">{formatInr(quote.total)}</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  )
}

export default VarkalaPage
