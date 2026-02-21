import { getUsers, setUsers, getListings, setListings, getReviews, setReviews, createId } from './storage'

export function seedIfEmpty() {
  const users = getUsers()
  const listings = getListings()
  if (users.length > 0 && listings.length > 0) return

  const demoUsers = [
    { id: createId(), name: 'Priya Sharma', email: 'priya@campus.edu', campus: 'IIT Delhi', avatar: null },
    { id: createId(), name: 'Arjun Singh', email: 'arjun@campus.edu', campus: 'IIT Delhi', avatar: null },
    { id: createId(), name: 'Neha Patel', email: 'neha@campus.edu', campus: 'BITS Pilani', avatar: null },
  ]

  if (users.length === 0) {
    setUsers(demoUsers)
  }

  const u = getUsers()
  if (listings.length === 0 && u.length > 0) {
    const list = [
      { id: createId(), title: 'Engineering Mathematics Textbook', category: 'textbooks', description: 'Like new. Semester 2 syllabus. No highlights.', pricePerDay: 15, ownerId: u[0].id, campus: u[0].campus, available: true, imageUrl: null, createdAt: Date.now() - 86400000 * 5 },
      { id: createId(), title: 'TI-84 Plus Graphing Calculator', category: 'calculators', description: 'Perfect for exams and assignments. With manual.', pricePerDay: 20, ownerId: u[0].id, campus: u[0].campus, available: true, imageUrl: null, createdAt: Date.now() - 86400000 * 3 },
      { id: createId(), title: 'DSLR Camera + 18-55mm Lens', category: 'photography', description: 'Canon entry-level. Great for project videos.', pricePerDay: 100, ownerId: u[1].id, campus: u[1].campus, available: true, imageUrl: null, createdAt: Date.now() - 86400000 * 2 },
      { id: createId(), title: 'Multimeter & Soldering Kit', category: 'lab', description: 'For electronics lab. All leads included.', pricePerDay: 25, ownerId: u[1].id, campus: u[1].campus, available: true, imageUrl: null, createdAt: Date.now() - 86400000 },
      { id: createId(), title: 'USB-C Hub (7-in-1)', category: 'tech', description: 'HDMI, USB 3.0, SD card. Works with Mac and Windows.', pricePerDay: 10, ownerId: u[2].id, campus: u[2].campus, available: true, imageUrl: null, createdAt: Date.now() },
    ]
    setListings(list)
    if (getReviews().length === 0) {
      setReviews([
        { id: createId(), listingId: list[0].id, reviewerId: u[1].id, rating: 5, text: 'Super smooth pickup. Book was in great condition.', createdAt: Date.now() - 86400000 * 4 },
      ])
    }
  }
}
