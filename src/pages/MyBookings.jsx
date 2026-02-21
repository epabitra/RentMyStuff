import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getBookings, getListings, getUsers, LISTING_CATEGORIES } from '../lib/storage'

export default function MyBookings() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [bookings] = useState(() => getBookings())
  const listings = getListings()
  const users = getUsers()

  if (!user) {
    navigate('/login')
    return null
  }

  const mine = bookings.filter((b) => b.renterId === user.id || b.ownerId === user.id)
  const getListing = (id) => listings.find((l) => l.id === id)
  const getUser = (id) => users.find((u) => u.id === id)
  const getCategoryIcon = (catId) => LISTING_CATEGORIES.find((c) => c.id === catId)?.icon || '📦'

  return (
    <div className="container-wide py-8 md:py-12 max-w-4xl">
      <h1 className="heading-2 mb-2 animate-fade-in-up">My bookings</h1>
      <p className="body-lg mb-8">View and manage your rentals.</p>

      {mine.length === 0 ? (
        <div className="card-flat p-12 md:p-16 text-center bg-gradient-to-br from-white to-primary-50/30 border-primary-100/60 animate-fade-in-up">
          <p className="text-ink-secondary mb-6">No bookings yet.</p>
          <Link to="/browse" className="btn-primary">Browse listings</Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {mine.map((b) => {
            const listing = getListing(b.listingId)
            const other = b.renterId === user.id ? getUser(b.ownerId) : getUser(b.renterId)
            const isRenter = b.renterId === user.id
            return (
              <li key={b.id} className="card p-6 transition-all duration-300 hover:scale-[1.01]">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                    {listing ? getCategoryIcon(listing.category) : '📦'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-ink-primary">
                      {listing?.title || 'Unknown item'}
                    </h3>
                    <p className="text-sm text-ink-tertiary mt-0.5">
                      {isRenter ? `From ${other?.name || 'owner'}` : `Rented by ${other?.name || 'renter'}`}
                    </p>
                    <p className="text-sm text-ink-secondary mt-1">
                      {b.startDate} → {b.endDate} · <span className="capitalize">{b.status}</span>
                    </p>
                  </div>
                  <Link
                    to={`/listing/${b.listingId}`}
                    className="text-sm font-medium text-primary-600 hover:underline shrink-0"
                  >
                    View listing
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
