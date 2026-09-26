import { useMemo, useState } from 'react'
import {
  formatHours,
  isOpenNow,
  restaurants,
  type Restaurant,
} from './data/restaurants'
import './App.css'

type StatusFilter = 'all' | 'open' | 'closed'

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

function App() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const visible = useMemo(() => {
    return restaurants.filter((restaurant) => {
      if (!matchesQuery(restaurant, query)) {
        return false
      }

      const open = isOpenNow(restaurant)
      if (statusFilter === 'open') return open
      if (statusFilter === 'closed') return !open
      return true
    })
  }, [query, statusFilter])

  const openCount = restaurants.filter((restaurant) => isOpenNow(restaurant)).length

  return (
    <div className="page">
      <header className="hero-bar">
        <p className="eyebrow">city-eats · sample data</p>
        <h1>Live restaurant status — Bengaluru</h1>
        <p className="lede">
          Open or closed, today’s hours, wait time, and place details for a
          handful of well-known spots. Times use your laptop clock; listings
          are not yet connected to a live API.
        </p>
        <p className="stats">
          {openCount} of {restaurants.length} open now
        </p>
      </header>

      <div className="toolbar">
        <label className="search">
          <span className="sr-only">Search restaurants</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, area, or cuisine"
          />
        </label>
        <div className="filters" role="group" aria-label="Status filter">
          <button
            type="button"
            className={statusFilter === 'all' ? 'chip active' : 'chip'}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={statusFilter === 'open' ? 'chip active' : 'chip'}
            onClick={() => setStatusFilter('open')}
          >
            Open now
          </button>
          <button
            type="button"
            className={statusFilter === 'closed' ? 'chip active' : 'chip'}
            onClick={() => setStatusFilter('closed')}
          >
            Closed
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="empty">No restaurants match that search.</p>
      ) : (
        <ul className="grid">
          {visible.map((restaurant) => {
            const open = isOpenNow(restaurant)

            return (
              <li key={restaurant.id} className="card">
                <div className="card-top">
                  <div>
                    <h2>{restaurant.name}</h2>
                    <p className="meta">
                      {restaurant.cuisine} · {restaurant.area}
                    </p>
                  </div>
                  <span className={open ? 'badge open' : 'badge closed'}>
                    {open ? 'Open' : 'Closed'}
                  </span>
                </div>

                <p className="hours">Today {formatHours(restaurant)}</p>

                <dl className="details">
                  <div>
                    <dt>Wait / busy</dt>
                    <dd>
                      {open
                        ? `${restaurant.waitMinutes} min · ${restaurant.busy}`
                        : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt>Rating</dt>
                    <dd>{restaurant.rating.toFixed(1)} / 5</dd>
                  </div>
                  <div>
                    <dt>Address</dt>
                    <dd>{restaurant.address}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`}>
                        {restaurant.phone}
                      </a>
                    </dd>
                  </div>
                </dl>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default App
