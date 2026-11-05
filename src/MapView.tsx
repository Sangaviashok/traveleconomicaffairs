import { useEffect, useRef } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Place } from './data/places'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function pinIcon(kind: Place['kind']) {
  return L.divIcon({
    className: 'pin-wrap',
    html: `<span class="pin pin-${kind}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
  })
}

export function MapView({
  places,
  label,
  linked,
}: {
  places: Place[]
  label: string
  linked?: boolean
}) {
  const frame = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = frame.current
    if (!el || places.length === 0) return

    const map = L.map(el, { scrollWheelZoom: false })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map)

    const group = L.featureGroup()
    for (const place of places) {
      const marker = L.marker([place.lat, place.lng], { icon: pinIcon(place.kind) })
      const href = linked ? `#/place/${encodeURIComponent(place.id)}` : ''
      const link = href ? `<br><a href="${href}">Open notes</a>` : ''
      marker.bindPopup(
        `<strong>${escapeHtml(place.name)}</strong><br>${escapeHtml(place.address)}${link}`,
      )
      group.addLayer(marker)
    }
    group.addTo(map)

    if (places.length === 1) {
      map.setView([places[0].lat, places[0].lng], 17)
    } else {
      map.fitBounds(group.getBounds().pad(0.25), { maxZoom: 16 })
    }

    const timer = window.setTimeout(() => map.invalidateSize(), 80)

    return () => {
      window.clearTimeout(timer)
      map.remove()
    }
  }, [places, linked])

  if (places.length === 0) return null

  return (
    <div className="map-block">
      <div
        ref={frame}
        className="map-frame"
        role="region"
        aria-label={label}
      />
      <ul className="legend">
        <li>
          <span className="pin pin-stay" /> Stay
        </li>
        <li>
          <span className="pin pin-cafe" /> Cafe
        </li>
      </ul>
    </div>
  )
}
