import { useMemo, useState } from 'react'
import { localityById, localities, locateRestaurant, type Locality } from './booking/localities'
import {
  asServiceRate,
  formatInr,
  priceQuote,
  type PriceQuote,
  type ServiceRate,
  type TransportMode,
} from './booking/quote'
import {
  formatHours,
  openStatus,
  osmFetchedAt,
  restaurants,
  type Restaurant,
} from './data/restaurants'
import './App.css'

type StatusFilter = 'all' | 'open' | 'closed'
type SortBy = 'listed' | 'total'
type HeldQuote = {
  name: string
  total: number
  party: number
  when: string
  ride: string
}

const PAGE_SIZE = 48
const MODE_LABEL: Record<TransportMode, string> = {
  auto: 'Auto',
  cab: 'Cab',
  metro: 'Metro',
}

function matchesQuery(restaurant: Restaurant, query: string): boolean {
  const haystack = [
    restaurant.name,
    restaurant.cuisine,
    restaurant.area,
    restaurant.address,
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query.trim().toLowerCase())
}

function formatWhen(date: string, time: string): string {
  const [year, month, day] = date.split('-').map(Number)
  const parsed = new Date(year, (month ?? 1) - 1, day ?? 1)
  if (Number.isNaN(parsed.getTime())) return `${date} · ${time}`
  const label = parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  return `${label} · ${time}`
}

function destinationFor(
  restaurant: Restaurant,
  overrides: Record<string, string>,
): Locality | null {
  if (Object.prototype.hasOwnProperty.call(overrides, restaurant.id)) {
    return localityById(overrides[restaurant.id])
  }
  return locateRestaurant(restaurant)
}

function rideSummary(quote: PriceQuote, origin: Locality, destination: Locality | null): string {
  if (quote.transport == null || !destination || quote.roadKm == null) {
    return 'Ride not included'
  }
  const hop = quote.sameNeighbourhood
    ? `short hop in ${destination.name}`
    : `${origin.name} to ${destination.name}`
  return `${MODE_LABEL[quote.mode]} both ways, ${hop}, about ${quote.roadKm} km each way`
}

function App() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [originId, setOriginId] = useState('indiranagar')
  const [party, setParty] = useState(2)
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [time, setTime] = useState('20:00')
  const [mode, setMode] = useState<TransportMode>('auto')
  const [serviceRate, setServiceRate] = useState<ServiceRate>(0)
  const [sortBy, setSortBy] = useState<SortBy>('listed')
  const [overrides, setOverrides] = useState<Record<string, string>>({})
  const [openId, setOpenId] = useState<string | null>(null)
  const [held, setHeld] = useState<HeldQuote | null>(null)

  const origin = localityById(originId) ?? localities[0]
  const placeOptions = useMemo(
    () => [...localities].sort((a, b) => a.name.localeCompare(b.name)),
    [],
  )

  const matched = useMemo(() => {
    return restaurants.filter((restaurant) => {
      if (!matchesQuery(restaurant, query)) {
        return false
      }

      const status = openStatus(restaurant)
      if (statusFilter === 'open') return status === 'open'
      if (statusFilter === 'closed') return status === 'closed'
      return true
    })
  }, [query, statusFilter])

  const ranked = useMemo(() => {
    const rows = matched.map((restaurant) => {
      const destination = destinationFor(restaurant, overrides)
      return {
        restaurant,
        destination,
        quote: priceQuote({
          cuisine: restaurant.cuisine,
          name: restaurant.name,
          origin,
          destination,
          party,
          mode,
          serviceRate,
        }),
      }
    })

    if (sortBy === 'total') {
      rows.sort((a, b) => {
        const aTotal = a.quote.transport == null ? Number.POSITIVE_INFINITY : a.quote.total
        const bTotal = b.quote.transport == null ? Number.POSITIVE_INFINITY : b.quote.total
        if (aTotal !== bTotal) return aTotal - bTotal
        return a.restaurant.name.localeCompare(b.restaurant.name)
      })
    }

    return rows
  }, [matched, origin, party, mode, serviceRate, overrides, sortBy])

  const visible = ranked.slice(0, visibleCount)
  const openCount = restaurants.filter((restaurant) => openStatus(restaurant) === 'open').length
  const fetchedLabel = new Date(osmFetchedAt).toLocaleString()
  const today = new Date().toISOString().slice(0, 10)

  function setNeighbourhood(restaurantId: string, localityId: string) {
    setOverrides((current) => ({ ...current, [restaurantId]: localityId }))
  }

  return (
    <div className="page">
      <header className="hero-bar">
        <p className="eyebrow">city-eats · Bengaluru</p>
        <h1>Pre-book the whole evening</h1>
        <p className="lede">
          The total works like a Booking.com stay price: meal, GST, any service
          charge collected at the restaurant, and the round trip. Listings are an
          OpenStreetMap snapshot from {fetchedLabel}. Hours are only as complete as
          that map.
        </p>
        <p className="stats">
          {openCount} known open of {restaurants.length} mapped places
        </p>
      </header>

      <form className="quote-bar" onSubmit={(event) => event.preventDefault()}>
        <label>
          Leaving from
          <select
            value={origin.id}
            onChange={(event) => setOriginId(event.target.value)}
          >
            {placeOptions.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          People
          <input
            type="number"
            min={1}
            max={12}
            value={party}
            onChange={(event) => setParty(Number(event.target.value) || 1)}
          />
        </label>
        <label>
          Date
          <input
            type="date"
            min={today}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <label>
          Time
          <input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </label>
        <label>
          Service charge
          <select
            value={String(serviceRate)}
            onChange={(event) => setServiceRate(asServiceRate(event.target.value))}
          >
            <option value="0">None</option>
            <option value="0.05">5% at the restaurant</option>
            <option value="0.1">10% at the restaurant</option>
          </select>
        </label>
        <div className="filters quote-modes" role="group" aria-label="Transport">
          {(['auto', 'cab', 'metro'] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={mode === option ? 'chip active' : 'chip'}
              onClick={() => setMode(option)}
            >
              {MODE_LABEL[option]}
            </button>
          ))}
        </div>
        <p className="quote-note">
          Meal bands follow the cuisine. GST is 5%. Auto and cab fares are per
          vehicle, both ways (3 seats in an auto, 4 in a cab). Metro is per person,
          both ways. These are planning numbers, not a live meter or a paid booking.
        </p>
      </form>

      {held ? (
        <div className="held" role="status">
          <p>
            Quote held for <strong>{held.name}</strong>: {formatInr(held.total)} for{' '}
            {held.party} on {held.when}. {held.ride}. This stays on the page until you
            clear it.
          </p>
          <button type="button" className="chip" onClick={() => setHeld(null)}>
            Clear quote
          </button>
        </div>
      ) : null}

      <div className="toolbar">
        <label className="search">
          <span className="sr-only">Search restaurants</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setVisibleCount(PAGE_SIZE)
            }}
            placeholder="Search by name, area, or cuisine"
          />
        </label>
        <div className="filters" role="group" aria-label="Status filter">
          <button
            type="button"
            className={statusFilter === 'all' ? 'chip active' : 'chip'}
            onClick={() => {
              setStatusFilter('all')
              setVisibleCount(PAGE_SIZE)
            }}
          >
            All
          </button>
          <button
            type="button"
            className={statusFilter === 'open' ? 'chip active' : 'chip'}
            onClick={() => {
              setStatusFilter('open')
              setVisibleCount(PAGE_SIZE)
            }}
          >
            Open now
          </button>
          <button
            type="button"
            className={statusFilter === 'closed' ? 'chip active' : 'chip'}
            onClick={() => {
              setStatusFilter('closed')
              setVisibleCount(PAGE_SIZE)
            }}
          >
            Closed
          </button>
          <button
            type="button"
            className={sortBy === 'total' ? 'chip active' : 'chip'}
            onClick={() => {
              setSortBy((current) => (current === 'total' ? 'listed' : 'total'))
              setVisibleCount(PAGE_SIZE)
            }}
          >
            Lowest total
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="empty">No restaurants match that search.</p>
      ) : (
        <>
          <p className="stats">
            Showing {visible.length} of {matched.length}
          </p>
          <ul className="grid">
            {visible.map(({ restaurant, destination, quote }) => {
              const status = openStatus(restaurant)
              const open = openId === restaurant.id
              const listed = locateRestaurant(restaurant)
              const neighbourhoodValue = Object.prototype.hasOwnProperty.call(
                overrides,
                restaurant.id,
              )
                ? overrides[restaurant.id]
                : (listed?.id ?? '')

              return (
                <li key={restaurant.id} className="card">
                  <div className="card-top">
                    <div>
                      <h2>{restaurant.name}</h2>
                      <p className="meta">
                        {restaurant.cuisine} · {restaurant.area}
                      </p>
                    </div>
                    <span
                      className={
                        status === 'open'
                          ? 'badge open'
                          : status === 'closed'
                            ? 'badge closed'
                            : 'badge unknown'
                      }
                    >
                      {status === 'open'
                        ? 'Open'
                        : status === 'closed'
                          ? 'Closed'
                          : 'Hours unknown'}
                    </span>
                  </div>

                  <p className="hours">Today {formatHours(restaurant)}</p>

                  <div className="quote">
                    <p className="quote-total">
                      <span className="quote-total-number">
                        {formatInr(quote.transport == null ? quote.table : quote.total)}
                      </span>
                      <span className="quote-caption">
                        {quote.transport == null
                          ? `at the table for ${party} · add a neighbourhood for the ride`
                          : `total for ${party} · ${MODE_LABEL[mode].toLowerCase()} both ways${
                              destination ? ` · ${destination.name}` : ''
                            }`}
                      </span>
                    </p>

                    {quote.transport == null ? (
                      <label className="neighbourhood">
                        Restaurant neighbourhood
                        <select
                          value={neighbourhoodValue}
                          onChange={(event) =>
                            setNeighbourhood(restaurant.id, event.target.value)
                          }
                        >
                          <option value="">Choose to include the ride</option>
                          {placeOptions.map((place) => (
                            <option key={place.id} value={place.id}>
                              {place.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : null}

                    <div className="quote-actions">
                      <button
                        type="button"
                        className="chip"
                        aria-expanded={open}
                        onClick={() => setOpenId(open ? null : restaurant.id)}
                      >
                        {open ? 'Hide breakdown' : 'Price breakdown'}
                      </button>
                      <button
                        type="button"
                        className="book"
                        disabled={quote.transport == null || !destination}
                        onClick={() => {
                          if (!destination || quote.transport == null) return
                          setHeld({
                            name: restaurant.name,
                            total: quote.total,
                            party,
                            when: formatWhen(date, time),
                            ride: rideSummary(quote, origin, destination),
                          })
                        }}
                      >
                        Pre-book this total
                      </button>
                    </div>

                    {open ? (
                      <dl className="details breakdown">
                        <div>
                          <dt>Meal estimate</dt>
                          <dd>
                            {quote.mealLabel} · {formatInr(quote.perPerson)} × {party}
                          </dd>
                        </div>
                        {quote.service > 0 ? (
                          <div>
                            <dt>Service charge</dt>
                            <dd>
                              {formatInr(quote.service)} · collected at the restaurant
                            </dd>
                          </div>
                        ) : null}
                        <div>
                          <dt>GST 5%</dt>
                          <dd>{formatInr(quote.gst)}</dd>
                        </div>
                        <div>
                          <dt>Transport</dt>
                          <dd>
                            {quote.transport == null || !destination ? (
                              'Pick a neighbourhood'
                            ) : (
                              <>
                                {formatInr(quote.transport)} · {rideSummary(quote, origin, destination)}
                                {quote.mode === 'metro'
                                  ? ` · ${party} tickets each way`
                                  : ` · ${quote.vehicles} ${MODE_LABEL[quote.mode].toLowerCase()}${
                                      quote.vehicles === 1 ? '' : 's'
                                    }`}
                              </>
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt>Neighbourhood</dt>
                          <dd>
                            <select
                              aria-label={`Neighbourhood for ${restaurant.name}`}
                              value={neighbourhoodValue}
                              onChange={(event) =>
                                setNeighbourhood(restaurant.id, event.target.value)
                              }
                            >
                              <option value="">Not mapped</option>
                              {placeOptions.map((place) => (
                                <option key={place.id} value={place.id}>
                                  {place.name}
                                </option>
                              ))}
                            </select>
                          </dd>
                        </div>
                        <div>
                          <dt>Total</dt>
                          <dd className="line-total">
                            {formatInr(quote.transport == null ? quote.table : quote.total)}
                          </dd>
                        </div>
                      </dl>
                    ) : null}
                  </div>

                  <dl className="details">
                    <div>
                      <dt>Address</dt>
                      <dd>{restaurant.address}</dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>
                        {restaurant.phone ? (
                          <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`}>
                            {restaurant.phone}
                          </a>
                        ) : (
                          '—'
                        )}
                      </dd>
                    </div>
                  </dl>
                </li>
              )
            })}
          </ul>
          {visible.length < matched.length ? (
            <button
              type="button"
              className="chip"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              Show more
            </button>
          ) : null}
        </>
      )}
    </div>
  )
}

export default App
