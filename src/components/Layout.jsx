import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Nav from './Nav'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gradient-footer text-stone-400">
        <div className="container-wide py-10 sm:py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-white font-bold text-lg mb-3 group">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-extrabold shadow-lg">
                  R
                </span>
                RentMyStuff
              </Link>
              <p className="text-stone-400 text-sm max-w-xs">
                Peer-to-peer rentals for students. Save money, reduce waste, build community.
              </p>
            </div>
            <div className="flex flex-wrap gap-8 md:gap-12">
              <div>
                <p className="text-primary-300/80 text-xs font-semibold uppercase tracking-wider mb-3">Product</p>
                <ul className="space-y-2">
                  <li><Link to="/browse" className="text-sm hover:text-white transition-colors">Browse</Link></li>
                  <li><Link to="/add-listing" className="text-sm hover:text-white transition-colors">List an item</Link></li>
                  <li><Link to="/login" className="text-sm hover:text-white transition-colors">Log in</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-primary-300/80 text-xs font-semibold uppercase tracking-wider mb-3">Company</p>
                <p className="text-sm">Rent smarter. Save more. Share better.</p>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-primary-800/60 text-stone-500 text-sm">
            © {new Date().getFullYear()} RentMyStuff. For students, by students.
          </div>
        </div>
      </footer>
    </div>
  )
}
