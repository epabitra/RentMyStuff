import { useState, useMemo } from 'react'
import { getListings } from '../lib/storage'
import { LISTING_CATEGORIES, CAMPUS_OPTIONS } from '../lib/storage'
import ListingCard from '../components/ListingCard'

export default function Browse() {
  const [listings] = useState(() => getListings())
  const [category, setCategory] = useState('')
  const [campus, setCampus] = useState('')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (category && l.category !== category) return false
      if (campus && l.campus !== campus) return false
      if (search) {
        const q = search.toLowerCase()
        if (!l.title.toLowerCase().includes(q) && !(l.description || '').toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [listings, category, campus, search])

  return (
    <div className="container-wide py-6 sm:py-8 md:py-12">
      <div className="mb-6 sm:mb-8 animate-fade-in-up">
        <h1 className="heading-2 mb-2">Browse listings</h1>
        <p className="body-lg">Find what you need by category, campus, or search.</p>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white to-primary-50/40 border border-primary-100/60 shadow-card">
        <input
          type="search"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field flex-1 min-w-[200px] max-w-md"
          aria-label="Search listings"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field w-full sm:w-auto sm:min-w-[180px]"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {LISTING_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
          ))}
        </select>
        <select
          value={campus}
          onChange={(e) => setCampus(e.target.value)}
          className="input-field w-full sm:w-auto sm:min-w-[180px]"
          aria-label="Filter by campus"
        >
          <option value="">All campuses</option>
          {CAMPUS_OPTIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <p className="text-ink-secondary text-sm mb-6">
        {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'} found
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {filtered.map((listing, i) => (
          <ListingCard key={listing.id} listing={listing} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card-flat p-12 text-center bg-gradient-to-br from-white to-primary-50/30 border-primary-100/60">
          <p className="text-ink-tertiary mb-4">No listings match your filters.</p>
          <p className="text-sm text-ink-secondary">Try a different category or campus.</p>
        </div>
      )}
    </div>
  )
}
