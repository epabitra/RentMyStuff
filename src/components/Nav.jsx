import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Nav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 shadow-sm'
        : 'text-stone-600 hover:from-primary-50 hover:to-primary-100/50 hover:text-primary-700'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700'
        : 'text-stone-700 hover:bg-gradient-to-r hover:from-stone-100 hover:to-primary-50/30'
    }`

  return (
    <header className="sticky top-0 z-50 bg-gradient-nav shadow-md border-b border-primary-100/60 backdrop-blur-sm">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-[4.25rem]">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 shrink-0 group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 text-white font-bold text-sm shadow-md group-hover:from-primary-500 group-hover:to-primary-400 transition-all duration-300">
              R
            </span>
            <span className="hidden sm:block font-bold text-stone-900 text-lg tracking-tight">
              RentMyStuff
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            <NavLink to="/browse" className={navLinkClass}>
              Browse
            </NavLink>
            {user ? (
              <>
                <NavLink to="/add-listing" className={navLinkClass} end>
                  List item
                </NavLink>
                <NavLink to="/my-listings" className={navLinkClass} end>
                  My listings
                </NavLink>
                <NavLink to="/my-bookings" className={navLinkClass} end>
                  My bookings
                </NavLink>
                <NavLink to="/profile" className={navLinkClass} end>
                  Profile
                </NavLink>
                <div className="ml-2 h-6 w-px bg-gradient-to-b from-transparent via-primary-200 to-transparent" aria-hidden />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="ml-2 px-3 py-2 rounded-lg text-sm font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-all duration-200"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-button hover:from-primary-700 hover:to-primary-600 hover:shadow-button-hover transition-all duration-300"
              >
                Log in
              </Link>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-stone-600 hover:bg-gradient-to-r hover:from-stone-100 hover:to-primary-50 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-primary-100/60 bg-gradient-to-b from-white to-primary-50/40 px-4 py-5 shadow-inner">
          <nav className="flex flex-col gap-1 max-w-xs mx-auto sm:mx-0 sm:max-w-none">
            <NavLink to="/browse" className={mobileLinkClass} onClick={closeMenu}>
              Browse
            </NavLink>
            {user ? (
              <>
                <NavLink to="/add-listing" className={mobileLinkClass} onClick={closeMenu} end>List item</NavLink>
                <NavLink to="/my-listings" className={mobileLinkClass} onClick={closeMenu} end>My listings</NavLink>
                <NavLink to="/my-bookings" className={mobileLinkClass} onClick={closeMenu} end>My bookings</NavLink>
                <NavLink to="/profile" className={mobileLinkClass} onClick={closeMenu} end>Profile</NavLink>
                <div className="my-2 border-t border-primary-100/60" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-stone-600 hover:bg-stone-200/60 w-full text-left transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="mt-3 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-3.5 text-base font-semibold text-white shadow-button hover:from-primary-700 hover:to-primary-600 transition-all duration-300"
                onClick={closeMenu}
              >
                Log in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
