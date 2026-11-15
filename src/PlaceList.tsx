import { useMemo, useState } from 'react'
import { city, places, type Place, type PlaceKind } from './data/places'
import {
  compareByHonesty,
  detailLabel,
  leadNote,
  matchesQuery,
  placeScore,
  visibleReviews,
} from './honesty'
import { MapView } from './MapView'
import { StayBudget } from './StayBudget'

type KindFilter = 'all' | PlaceKind

function summary(stays: number, cafes: number): string {
  const stayLabel = stays === 1 ? '1 stay' : `${stays} stays`
  const cafeLabel = cafes === 1 ? '1 cafe' : `${cafes} cafes`
  if (stays && cafes) return `${stayLabel} and ${cafeLabel}`
  if (stays) return stayLabel
  if (cafes) return cafeLabel
  return 'No places'
}

export function PlaceList({ flagged }: { flagged: ReadonlySet<string> }) {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<KindFilter>('all')
  const [budgetId, setBudgetId] = useState(
    () => places.find((place) => place.kind === 'stay')?.id ?? '',
  )
  const stayChoices = places.filter((place) => place.kind === 'stay')

  const stays = useMemo(() => {
    return places
      .filter((place) => place.kind === 'stay' && (kind === 'all' || kind === 'stay'))
      .filter((place) => matchesQuery(place, query, flagged))
      .sort(compareByHonesty(flagged))
  }, [query, kind, flagged])

  const cafes = useMemo(() => {
    return places
      .filter((place) => place.kind === 'cafe' && (kind === 'all' || kind === 'cafe'))
      .filter((place) => matchesQuery(place, query, flagged))
      .sort(compareByHonesty(flagged))
  }, [query, kind, flagged])

  const mapped = useMemo(() => [...stays, ...cafes], [stays, cafes])

  return (
    <>
      <header className="hero">
        <p className="eyebrow">
          {city.name}, {city.region}
        </p>
        <h1>Stays and cafes</h1>
        <p className="lede">
          Where to sleep and where to get coffee. Each pin is the mapped
          location for that address. Notes that read as paid or bot-like stay
          out of the default list.
        </p>
        <p className="city-note">{city.note}</p>
      </header>

      <StayBudget stays={stayChoices} selectedId={budgetId} onSelect={setBudgetId} />

      <div className="toolbar">
        <label className="search">
          <span className="sr-only">Search stays and cafes</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, road, or area"
            autoComplete="off"
          />
        </label>
        <div className="filters" role="group" aria-label="Place type">
          {(
            [
              ['all', 'All'],
              ['stay', 'Stays'],
              ['cafe', 'Cafes'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={kind === value ? 'chip active' : 'chip'}
              aria-pressed={kind === value}
              onClick={() => setKind(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="sort-note">
        {summary(stays.length, cafes.length)}. Sorted by how specific the
        notes are.
      </p>

      {mapped.length === 0 ? (
        <div className="empty">
          <p>No stays or cafes match that.</p>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setQuery('')
              setKind('all')
            }}
          >
            Clear search and filters
          </button>
        </div>
      ) : (
        <div className="browse">
          <div className="results">
            <PlaceGroup title="Where to sleep" places={stays} flagged={flagged} />
            <PlaceGroup title="Cafes" places={cafes} flagged={flagged} />
          </div>
          <div className="map-column">
            <MapView
              places={mapped}
              linked
              label="Map of stays and cafes in Varkala"
            />
          </div>
        </div>
      )}
    </>
  )
}

function PlaceGroup({
  title,
  places,
  flagged,
}: {
  title: string
  places: Place[]
  flagged: ReadonlySet<string>
}) {
  if (places.length === 0) return null

  return (
    <section className="group">
      <h2>{title}</h2>
      <ul className="cards">
        {places.map((place) => {
          const notes = visibleReviews(place, flagged)
          const excerpt = leadNote(place, flagged)
          return (
            <li key={place.id}>
              <a className="card" href={`#/place/${place.id}`}>
                <p className="kicker">
                  <span className={`kind kind-${place.kind}`}>
                    {place.kind === 'stay' ? 'Stay' : 'Cafe'}
                  </span>
                  <span>{place.area}</span>
                </p>
                <h3>{place.name}</h3>
                <p className="address">{place.address}</p>
                <p className="score">
                  {detailLabel(placeScore(place, flagged), notes.length)}
                </p>
                {excerpt ? <p className="excerpt">{excerpt}</p> : null}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
