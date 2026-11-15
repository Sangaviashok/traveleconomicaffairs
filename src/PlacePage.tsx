import { useMemo, useState } from 'react'
import { osmUrl, places, type Place, type Review } from './data/places'
import { StayBudget } from './StayBudget'
import { heldReviews, visibleReviews } from './honesty'
import { MapView } from './MapView'

export function PlacePage({
  place,
  flagged,
  flag,
  unflag,
}: {
  place: Place
  flagged: ReadonlySet<string>
  flag: (id: string) => void
  unflag: (id: string) => void
}) {
  const [notice, setNotice] = useState('')
  const pins = useMemo(() => [place], [place])
  const shown = visibleReviews(place, flagged)
  const held = heldReviews(place, flagged)

  return (
    <article className="place">
      <p className="back">
        <a href="#/">All stays and cafes</a>
      </p>
      <p className="kicker">
        <span className={`kind kind-${place.kind}`}>
          {place.kind === 'stay' ? 'Stay' : 'Cafe'}
        </span>
        <span>
          {place.area}, Varkala
        </span>
      </p>
      <h1>{place.name}</h1>
      <p className="address">{place.address}</p>

      {place.kind === 'stay' ? (
        <StayBudget
          stays={places.filter((item) => item.kind === 'stay')}
          selectedId={place.id}
        />
      ) : null}

      <div className="place-layout">
        <div>
          <MapView places={pins} label={`Map of ${place.name}`} />
          <p className="pin-note">{place.pinNote}</p>
          <p className="osm-link">
            <a href={osmUrl(place)} target="_blank" rel="noreferrer">
              Open this place on OpenStreetMap
            </a>
          </p>
        </div>

        <div className="notes">
          <section>
            <h2>Traveler notes</h2>
            <p className="section-lead">
              Specific visits stay in this list. Flag a note if it reads as
              paid or bot-like.
            </p>
            {shown.length === 0 ? (
              <div className="empty">
                <p>No notes in the default list.</p>
              </div>
            ) : (
              <ul className="reviews">
                {shown.map((review) => (
                  <li key={review.id}>
                    <ReviewCard review={review} />
                    <button
                      type="button"
                      className="text-button flag"
                      onClick={() => {
                        flag(review.id)
                        setNotice(
                          `${review.author}'s note was moved out of the default list.`,
                        )
                      }}
                    >
                      Flag {review.author}&apos;s note as paid or bot-like
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {held.length > 0 ? (
            <section className="held-section" aria-labelledby="held-heading">
              <h2 id="held-heading">Kept out of the default list</h2>
              {notice ? (
                <p className="notice" aria-live="polite">
                  {notice}
                </p>
              ) : null}
              <p className="section-lead">
                These notes read as paid or bot-like, or someone flagged them.
              </p>
              <ul className="reviews">
                {held.map((review) => {
                  const userFlagged = flagged.has(review.id) && !review.heldOut
                  return (
                    <li key={review.id}>
                      <ReviewCard review={review} held />
                      {userFlagged ? (
                        <button
                          type="button"
                          className="text-button"
                          onClick={() => {
                            unflag(review.id)
                            setNotice(
                              `${review.author}'s note is back in the default list.`,
                            )
                          }}
                        >
                          Restore {review.author}&apos;s note to the default list
                        </button>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function ReviewCard({ review, held = false }: { review: Review; held?: boolean }) {
  return (
    <article className={held ? 'review held' : 'review'}>
      <header className="review-top">
        <h3>{review.author}</h3>
        <p>{review.visited}</p>
      </header>
      <p className="review-body">{review.body}</p>
      {held ? (
        <div className="signals">
          <p>Why it was kept out</p>
          <ul>
            {(review.heldReasons ?? ['Flagged as paid or bot-like']).map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="signals">
          <p>Why this reads as genuine</p>
          <ul>
            {review.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

export function MissingPlace() {
  return (
    <div className="empty">
      <h1>That place is not on this list</h1>
      <p>The link may be out of date.</p>
      <p>
        <a href="#/">Back to stays and cafes</a>
      </p>
    </div>
  )
}
