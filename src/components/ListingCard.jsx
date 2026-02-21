import { Link } from 'react-router-dom'
import { LISTING_CATEGORIES } from '../lib/storage'

function getCategoryIcon(categoryId) {
  return LISTING_CATEGORIES.find((c) => c.id === categoryId)?.icon || '📦'
}

export default function ListingCard({ listing, index = 0 }) {
  const icon = getCategoryIcon(listing.category)

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="card block overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex gap-4 p-5 md:p-6">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-2xl md:text-3xl flex-shrink-0 shadow-inner transition-all duration-300 group-hover:from-primary-200 group-hover:to-primary-100">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-ink-primary truncate pr-2 group-hover:text-primary-700 transition-colors">
            {listing.title}
          </h3>
          <p className="text-sm text-ink-tertiary mt-0.5">{listing.campus}</p>
          <p className="mt-3 font-semibold">
            <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">₹{listing.pricePerDay}</span>
            <span className="text-ink-tertiary font-normal text-sm">/day</span>
          </p>
        </div>
      </div>
      {!listing.available && (
        <div className="px-5 pb-4 md:px-6 md:pb-5">
          <span className="inline-block text-xs font-medium text-amber-800 bg-gradient-to-r from-amber-100 to-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
            Unavailable
          </span>
        </div>
      )}
    </Link>
  )
}
