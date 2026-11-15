import { useEffect } from 'react'
import { places } from './data/places'
import { useFlaggedReviews } from './flags'
import { MissingPlace, PlacePage } from './PlacePage'
import { PlaceList } from './PlaceList'
import { useRoute } from './route'
import './App.css'

function App() {
  const route = useRoute()
  const { flagged, flag, unflag } = useFlaggedReviews()
  useEffect(() => {
    window.scrollTo(0, 0)
    if (route.kind === 'place') {
      const place = places.find((item) => item.id === route.id)
      document.title = place ? `${place.name} · Varkala` : 'Varkala stays and cafes'
      return
    }
    document.title = 'Varkala stays and cafes'
  }, [route])

  const place = route.kind === 'place' ? places.find((item) => item.id === route.id) : undefined

  return (
    <div className="page">
      {route.kind === 'list' ? <PlaceList flagged={flagged} /> : null}
      {route.kind === 'place' && place ? (
        <PlacePage place={place} flagged={flagged} flag={flag} unflag={unflag} />
      ) : null}
      {route.kind === 'place' && !place ? <MissingPlace /> : null}
      <footer className="colophon">
        Notes on this page are examples of how a visit reads. They are not a
        live review feed. Pins and roads are from OpenStreetMap.
      </footer>
    </div>
  )
}

export default App
