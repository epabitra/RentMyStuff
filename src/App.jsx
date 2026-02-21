import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { seedIfEmpty } from './lib/seed'
import Layout from './components/Layout'
import Home from './pages/Home'
import Browse from './pages/Browse'
import ListingDetail from './pages/ListingDetail'
import AddListing from './pages/AddListing'
import EditListing from './pages/EditListing'
import MyListings from './pages/MyListings'
import MyBookings from './pages/MyBookings'
import Login from './pages/Login'
import Profile from './pages/Profile'

seedIfEmpty()

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="listing/:id" element={<ListingDetail />} />
          <Route path="add-listing" element={<AddListing />} />
          <Route path="listing/:id/edit" element={<EditListing />} />
          <Route path="my-listings" element={<MyListings />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
