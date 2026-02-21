import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getListings, setListings, LISTING_CATEGORIES, CAMPUS_OPTIONS } from '../lib/storage'

export default function EditListing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [listings, setListingsState] = useState(() => getListings())
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('textbooks')
  const [description, setDescription] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [campus, setCampus] = useState('')
  const [available, setAvailable] = useState(true)

  const listing = listings.find((l) => l.id === id)

  useEffect(() => {
    if (listing) {
      setTitle(listing.title)
      setCategory(listing.category)
      setDescription(listing.description || '')
      setPricePerDay(String(listing.pricePerDay))
      setCampus(listing.campus)
      setAvailable(listing.available !== false)
    }
  }, [listing])

  if (!user) {
    navigate('/login')
    return null
  }

  if (!listing) {
    return (
      <div className="container-narrow py-16 text-center text-ink-secondary">
        Listing not found.
      </div>
    )
  }

  if (listing.ownerId !== user.id) {
    return (
      <div className="container-narrow py-16 text-center text-ink-secondary">
        You can only edit your own listings.
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const price = parseInt(pricePerDay, 10)
    if (!title.trim() || !category || !description.trim() || !price || price < 1 || !campus) return
    const updated = listings.map((l) =>
      l.id === id
        ? {
            ...l,
            title: title.trim(),
            category,
            description: description.trim(),
            pricePerDay: price,
            campus,
            available,
          }
        : l
    )
    setListings(updated)
    setListingsState(updated)
    navigate('/my-listings')
  }

  return (
    <div className="container-narrow py-8 md:py-12">
      <h1 className="heading-2 mb-2">Edit listing</h1>
      <p className="body-lg mb-8">Update your listing details.</p>
      <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5 animate-fade-in-up">
        <div>
          <label className="block text-sm font-medium text-ink-primary mb-1.5">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-primary mb-1.5">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field" required>
            {LISTING_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-primary mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field min-h-[120px]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-primary mb-1.5">Price per day (₹)</label>
          <input
            type="number"
            min="1"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-primary mb-1.5">Campus</label>
          <select value={campus} onChange={(e) => setCampus(e.target.value)} className="input-field" required>
            {CAMPUS_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3 py-1">
          <input
            type="checkbox"
            id="available"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="rounded border-stone-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="available" className="text-sm font-medium text-ink-primary">Available for rent</label>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" className="btn-primary">Save changes</button>
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  )
}
