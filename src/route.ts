import { useEffect, useState } from 'react'

export type Route = { kind: 'list' } | { kind: 'place'; id: string }

function readRoute(): Route {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const path = raw.startsWith('/') ? raw : `/${raw}`
  const match = path.match(/^\/place\/([^/]+)\/?$/)
  if (match) return { kind: 'place', id: decodeURIComponent(match[1]) }
  return { kind: 'list' }
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute)

  useEffect(() => {
    const onChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
