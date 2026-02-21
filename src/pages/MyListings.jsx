import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getListings, setListings as persistListings } from '../lib/storage'
import ListingCard from '../components/ListingCard'

export default function MyListings() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [listings, setListingsState] = useState(() => getListings())

  if (!user) {
    navigate('/login')
    return null
  }

  const mine = listings.filter((l) => l.ownerId === user.id)

  const toggleAvailable = (listing) => {
    const updated = listings.map((l) =>
      l.id === listing.id ? { ...l, available: !l.available } : l
    )
    persistListings(updated)
    setListingsState(updated)
  }

  return (
    <div className="container-wide py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in-up">
        <div>
          <h1 className="heading-2 mb-2">My listings</h1>
          <p className="body-lg">Manage your listed items.</p>
        </div>
        <Link to="/add-listing" className="btn-primary shrink-0">+ List item</Link>
      </div>

      {mine.length === 0 ? (
        <div className="card-flat p-12 md:p-16 text-center bg-gradient-to-br from-white to-primary-50/30 border-primary-100/60 animate-fade-in-up">
          <p className="text-ink-secondary mb-6">You haven't listed anything yet.</p>
          <Link to="/add-listing" className="btn-primary">List your first item</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {mine.map((listing, i) => (
            <div key={listing.id} className="relative">
              <ListingCard listing={listing} index={i} />
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  to={`/listing/${listing.id}/edit`}
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => toggleAvailable(listing)}
                  className="text-sm font-medium text-ink-tertiary hover:text-ink-primary"
                >
                  {listing.available ? 'Mark unavailable' : 'Mark available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
