import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getListings, setListings, LISTING_CATEGORIES, CAMPUS_OPTIONS, createId } from '../lib/storage'

export default function AddListing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [listings, setListingsState] = useState(() => getListings())
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('textbooks')
  const [description, setDescription] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [campus, setCampus] = useState(user?.campus || '')

  if (!user) {
    navigate('/login')
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const price = parseInt(pricePerDay, 10)
    if (!title.trim() || !category || !description.trim() || !price || price < 1 || !campus) return
    const newListing = {
      id: createId(),
      title: title.trim(),
      category,
      description: description.trim(),
      pricePerDay: price,
      ownerId: user.id,
      campus,
      available: true,
      imageUrl: null,
      createdAt: Date.now(),
    }
    const next = [...listings, newListing]
    setListings(next)
    setListingsState(next)
    navigate('/my-listings')
  }

  return (
    <div className="container-narrow py-8 md:py-12">
      <h1 className="heading-2 mb-2">List an item</h1>
      <p className="body-lg mb-8">Add details so renters can find and book your item.</p>
      <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5 animate-fade-in-up">
        <div>
          <label className="block text-sm font-medium text-ink-primary mb-1.5">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Engineering Mathematics Textbook"
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
            placeholder="Condition, what's included, pickup details..."
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
            placeholder="20"
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-primary mb-1.5">Campus / Pickup location</label>
          <select value={campus} onChange={(e) => setCampus(e.target.value)} className="input-field" required>
            <option value="">Select campus</option>
            {CAMPUS_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" className="btn-primary">Create listing</button>
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  )
}
