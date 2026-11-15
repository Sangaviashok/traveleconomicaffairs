import type { Place, Review } from './data/places'

export function isHeldOut(review: Review, flagged: ReadonlySet<string>): boolean {
  return review.heldOut === true || flagged.has(review.id)
}

export function visibleReviews(place: Place, flagged: ReadonlySet<string>): Review[] {
  return place.reviews.filter((review) => !isHeldOut(review, flagged))
}

export function heldReviews(place: Place, flagged: ReadonlySet<string>): Review[] {
  return place.reviews.filter((review) => isHeldOut(review, flagged))
}

export function placeScore(place: Place, flagged: ReadonlySet<string>): number {
  return visibleReviews(place, flagged).reduce(
    (sum, review) => sum + review.signals.length,
    0,
  )
}

export function matchesQuery(
  place: Place,
  query: string,
  flagged: ReadonlySet<string>,
): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true

  const kindWords = place.kind === 'stay' ? 'stay hotel guesthouse sleep' : 'cafe coffee cake'
  const visible = visibleReviews(place, flagged)
  const haystack = [
    place.name,
    place.area,
    place.address,
    place.kind,
    kindWords,
    place.pinNote,
    ...visible.flatMap((review) => [
      review.author,
      review.visited,
      review.body,
      ...review.signals,
    ]),
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(needle)
}

export function compareByHonesty(flagged: ReadonlySet<string>) {
  return (a: Place, b: Place) => {
    const byScore = placeScore(b, flagged) - placeScore(a, flagged)
    if (byScore !== 0) return byScore
    return a.name.localeCompare(b.name)
  }
}

export function leadNote(place: Place, flagged: ReadonlySet<string>): string | null {
  const visible = visibleReviews(place, flagged)
  if (visible.length === 0) return null
  const best = [...visible].sort((a, b) => b.signals.length - a.signals.length)[0]
  const match = best.body.match(/^.+?[.!]/)
  return match ? match[0] : best.body
}

export function detailLabel(score: number, count: number): string {
  if (count === 0) return 'No notes in the default list'
  const details = score === 1 ? '1 specific detail' : `${score} specific details`
  const notes = count === 1 ? '1 note' : `${count} notes`
  return `${details} in ${notes}`
}
