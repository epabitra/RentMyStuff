/**
 * localStorage keys and helpers for RentMyStuff.
 * Works on GitHub Pages / any static hosting.
 */

const KEYS = {
  USERS: 'rentmystuff_users',
  LISTINGS: 'rentmystuff_listings',
  BOOKINGS: 'rentmystuff_bookings',
  REVIEWS: 'rentmystuff_reviews',
  CURRENT_USER: 'rentmystuff_current_user',
}

function get(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return defaultValue
    return JSON.parse(raw)
  } catch {
    return defaultValue
  }
}

function set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function getUsers() {
  return get(KEYS.USERS, [])
}

export function setUsers(users) {
  return set(KEYS.USERS, users)
}

export function getListings() {
  return get(KEYS.LISTINGS, [])
}

export function setListings(listings) {
  return set(KEYS.LISTINGS, listings)
}

export function getBookings() {
  return get(KEYS.BOOKINGS, [])
}

export function setBookings(bookings) {
  return set(KEYS.BOOKINGS, bookings)
}

export function getReviews() {
  return get(KEYS.REVIEWS, [])
}

export function setReviews(reviews) {
  return set(KEYS.REVIEWS, reviews)
}

export function getCurrentUser() {
  return get(KEYS.CURRENT_USER)
}

export function setCurrentUser(user) {
  return set(KEYS.CURRENT_USER, user)
}

export function clearCurrentUser() {
  try {
    localStorage.removeItem(KEYS.CURRENT_USER)
    return true
  } catch {
    return false
  }
}

export const LISTING_CATEGORIES = [
  { id: 'textbooks', label: 'Textbooks & Course Materials', icon: '📚' },
  { id: 'calculators', label: 'Calculators', icon: '🔢' },
  { id: 'photography', label: 'Photography & Video', icon: '📷' },
  { id: 'lab', label: 'Lab & Specialized Tools', icon: '🔬' },
  { id: 'tech', label: 'Tech & Accessories', icon: '💻' },
]

export const CAMPUS_OPTIONS = [
  'IIT Delhi', 'IIT Bombay', 'BITS Pilani', 'DU North Campus', 'DU South Campus',
  'JNU', 'Jamia', 'Other Campus',
]

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
