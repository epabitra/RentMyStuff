import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { getListings, getUsers, getReviews, getBookings, setBookings, LISTING_CATEGORIES, createId } from '../lib/storage'
import { useAuth } from '../context/AuthContext'

export default function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [listings] = useState(() => getListings())
  const [users] = useState(() => getUsers())
  const [reviews] = useState(() => getReviews())
  const [bookings, setBookingsState] = useState(() => getBookings())

  const listing = listings.find((l) => l.id === id)
  const owner = listing ? users.find((u) => u.id === listing.ownerId) : null
  const listingReviews = listing ? reviews.filter((r) => r.listingId === listing.id) : []
  const reviewAuthors = users.reduce((acc, u) => ({ ...acc, [u.id]: u }), {})

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bookingMessage, setBookingMessage] = useState('')

  if (!listing) {
    return (
      <div className="container-narrow py-16 text-center">
        <p className="text-ink-secondary mb-4">Listing not found.</p>
        <Link to="/browse" className="text-primary-600 font-medium hover:underline">Back to Browse</Link>
      </div>
    )
  }

  const categoryInfo = LISTING_CATEGORIES.find((c) => c.id === listing.category)

  const handleBook = (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    if (user.id === listing.ownerId) {
      setBookingMessage('You cannot book your own listing.')
      return
    }
    if (!startDate || !endDate) {
      setBookingMessage('Please select start and end dates.')
      return
    }
    const newBooking = {
      id: createId(),
      listingId: listing.id,
      renterId: user.id,
      ownerId: listing.ownerId,
      startDate,
      endDate,
      status: 'confirmed',
      createdAt: Date.now(),
    }
    setBookings([...bookings, newBooking])
    setBookingsState([...bookings, newBooking])
    setBookingMessage('Booking confirmed! Check My Bookings.')
    setStartDate('')
    setEndDate('')
  }

  return (
    <div className="container-wide py-8 md:py-12">
      <Link
        to="/browse"
        className="inline-flex items-center gap-1 text-ink-secondary hover:text-primary-600 font-medium text-sm mb-8 transition-colors"
      >
        ← Back to Browse
      </Link>

      <div className="card overflow-hidden animate-fade-in-up">
        <div className="p-6 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-4xl flex-shrink-0 shadow-inner">
              {categoryInfo?.icon || '📦'}
            </div>
            <div className="min-w-0">
              <h1 className="heading-2 mb-1">{listing.title}</h1>
              <p className="text-ink-secondary text-sm">{listing.campus} · {categoryInfo?.label || listing.category}</p>
              <p className="mt-3 font-bold text-2xl">
                <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">₹{listing.pricePerDay}</span>
                <span className="text-ink-tertiary font-normal text-base">/day</span>
              </p>
            </div>
          </div>

          <div className="prose prose-stone max-w-none">
            <p className="text-ink-secondary leading-relaxed whitespace-pre-wrap">{listing.description}</p>
          </div>

          {owner && (
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-br from-stone-50 to-primary-50/40 border border-primary-100/50">
              <p className="text-xs font-medium text-ink-tertiary uppercase tracking-wider mb-1">Listed by</p>
              <p className="font-semibold text-ink-primary">{owner.name}</p>
              <p className="text-sm text-ink-secondary">{owner.campus}</p>
            </div>
          )}

          {listing.available && (
            <form onSubmit={handleBook} className="mt-10 p-6 md:p-7 rounded-2xl border border-primary-100/60 bg-gradient-to-br from-primary-50/50 to-white">
              <h3 className="heading-3 mb-5">Book this item</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-ink-primary mb-1.5">Start date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input-field"
                    min={new Date().toISOString().slice(0, 10)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-primary mb-1.5">End date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input-field"
                    min={startDate || new Date().toISOString().slice(0, 10)}
                  />
                </div>
              </div>
              {user ? (
                <button type="submit" className="btn-primary mt-5">
                  Confirm booking
                </button>
              ) : (
                <Link to="/login" className="btn-primary mt-5 inline-block">
                  Log in to book
                </Link>
              )}
              {bookingMessage && (
                <p className={`mt-4 text-sm ${bookingMessage.startsWith('Booking') ? 'text-primary-600' : 'text-amber-700'}`}>
                  {bookingMessage}
                </p>
              )}
            </form>
          )}

          {!listing.available && (
            <div className="mt-8 px-5 py-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-sm font-medium">
              This item is currently unavailable.
            </div>
          )}

          {listingReviews.length > 0 && (
            <div className="mt-12 pt-10 border-t border-stone-200">
              <h3 className="heading-3 mb-5">Reviews</h3>
              <ul className="space-y-4">
                {listingReviews.map((r) => (
                  <li key={r.id} className="p-5 rounded-xl bg-gradient-to-br from-stone-50 to-primary-50/30 border border-primary-100/40">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-ink-primary">{reviewAuthors[r.reviewerId]?.name || 'Student'}</span>
                      <span className="text-accent-500 text-sm" aria-label={`${r.rating} out of 5 stars`}>
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </span>
                    </div>
                    <p className="text-ink-secondary text-sm leading-relaxed">{r.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
