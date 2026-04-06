export interface Review {
  id: string
  authorName: string
  rating: number
  text: string
  date: string
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Sarah Jenkins',
    rating: 5,
    text: 'Absolutely brilliant service. Arrived in 20 minutes when I was locked out at night. Very professional and no hidden fees, exactly as quoted over the phone.',
    date: '2025-10-14',
  },
  {
    id: 'rev-2',
    authorName: 'David H.',
    rating: 5,
    text: 'Fast, reliable, and genuine. Upgraded my front door lock to an anti-snap cylinder after a break-in down my street. Highly recommend to anyone local needing a locksmith.',
    date: '2025-11-02',
  },
  {
    id: 'rev-3',
    authorName: 'Emma R.',
    rating: 5,
    text: 'Great bloke. Got me back into my house without damaging the door or the lock. Super fast response time too!',
    date: '2025-12-18',
  },
  {
    id: 'rev-4',
    authorName: 'Mark T.',
    rating: 5,
    text: 'Replaced a faulty uPVC gearbox on my back door. Price was miles cheaper than the national company I called first. Top tier local service.',
    date: '2026-01-05',
  },
  {
    id: 'rev-5',
    authorName: 'C. Patel',
    rating: 5,
    text: 'Saved the day when my key snapped in the ignition, wait no, my front door! Extracted the key and cut me fresh ones right there. 5 stars.',
    date: '2026-02-11',
  }
]
