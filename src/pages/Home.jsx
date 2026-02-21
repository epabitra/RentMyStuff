import { Link } from 'react-router-dom'

const HERO_STATS = [
  { value: '90%', label: 'Savings vs buying' },
  { value: '₹20', label: 'Avg. per day' },
  { value: 'Campus', label: 'Pickup only' },
]

const CATEGORY_ICONS = ['📚', '🔢', '📷', '🔬', '💻']

export default function Home() {
  return (
    <div>
      {/* Hero - gradient + mesh */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-transparent to-primary-800/30" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative container-wide section-padding">
          <div className="grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center min-h-[28rem] lg:min-h-[32rem]">
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <p className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-4">
                Peer-to-peer student rentals
              </p>
              <h1 className="heading-1 text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl mb-5 lg:mb-6 text-balance">
                Rent smarter. Save more. Share better.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-primary-100/95 max-w-xl mb-8 md:mb-10 leading-relaxed">
                The campus marketplace where students list what they own and rent what they need. No shipping—just meet on campus.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/browse"
                  className="inline-flex items-center justify-center rounded-xl bg-white text-primary-800 px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                >
                  Browse listings
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/80 text-white px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-white/15 hover:border-white hover:scale-[1.02]"
                >
                  List your stuff
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end justify-center gap-6 lg:pl-8">
              <div className="flex flex-wrap justify-center lg:justify-end gap-4 w-full max-w-md lg:max-w-none">
                {HERO_STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-5 py-4 min-w-[7.5rem] text-center animate-fade-in-up opacity-0 animate-delay-100"
                    style={{ animationDelay: `${150 + i * 120}ms` }}
                  >
                    <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-primary-200 text-xs sm:text-sm mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center lg:justify-end gap-3">
                {CATEGORY_ICONS.map((icon, i) => (
                  <span
                    key={i}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl sm:text-3xl animate-float"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {icon}
                  </span>
                ))}
              </div>
              <p className="text-primary-200/90 text-sm text-center lg:text-right max-w-xs">
                Textbooks · Calculators · Photo · Lab · Tech
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip - gradient */}
      <section className="bg-gradient-to-r from-primary-50 via-white to-primary-50/80 border-b border-primary-100/60 py-6 sm:py-8">
        <div className="container-wide">
          <p className="text-center text-primary-600/80 text-sm font-medium mb-4">Trusted by students at</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-primary-700/90 text-sm sm:text-base font-medium">
            <span>IIT Delhi</span>
            <span>IIT Bombay</span>
            <span>BITS Pilani</span>
            <span>DU North & South</span>
            <span>JNU · Jamia</span>
          </div>
        </div>
      </section>

      {/* How it works - gradient section + animated cards */}
      <section className="section-padding bg-gradient-to-b from-white to-primary-50/30">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 animate-fade-in-up">
            <h2 className="heading-2 mb-3">How it works</h2>
            <p className="body-lg">Four simple steps from listing to pickup. Built for campus life.</p>
          </div>
          <div className="grid xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { step: '1', title: 'List your items', desc: 'Set your price, availability, and pickup location in minutes.' },
              { step: '2', title: 'Browse & book', desc: 'Find what you need by category or campus. Compare prices and reviews.' },
              { step: '3', title: 'Secure payment', desc: 'In-app flow with instant confirmation for both parties.' },
              { step: '4', title: 'Campus pickup', desc: 'Meet at the library, student center, or residence—no shipping.' },
            ].map(({ step, title, desc }, i) => (
              <div
                key={step}
                className="card p-5 sm:p-6 md:p-7 text-left animate-fade-in-up opacity-0 hover:scale-[1.02] transition-transform duration-300"
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-lg items-center justify-center mb-4 sm:mb-5 shadow-md">
                  {step}
                </span>
                <h3 className="heading-3 mb-2">{title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USPs - gradient background + animated */}
      <section className="section-padding bg-gradient-to-b from-primary-50/40 via-primary-50/20 to-white">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 animate-fade-in-up">
            <h2 className="heading-2 mb-3">Why RentMyStuff</h2>
            <p className="body-lg">Trust, savings, and sustainability—designed for students.</p>
          </div>
          <div className="grid xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: 'Cost-saving', stat: 'Up to 90%', desc: 'Rent instead of buying. Keep more money for what matters.' },
              { title: 'Sustainability', stat: '65%', desc: 'Less waste, smaller footprint. Every rental helps.' },
              { title: 'Community', stat: 'Trust', desc: 'Peer verification and reviews. Campus-only.' },
              { title: 'Campus-centric', stat: 'Local', desc: 'Everything a walk away. No shipping, no wait.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="card p-5 sm:p-6 animate-fade-in-up opacity-0 hover:scale-[1.02] transition-transform duration-300"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <p className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent font-bold text-xl sm:text-2xl mb-1">
                  {item.stat}
                </p>
                <h3 className="heading-3 mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - gradient pills */}
      <section className="section-padding bg-gradient-to-b from-white to-primary-50/20">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="heading-2 mb-3">What you can rent</h2>
            <p className="body-lg">From textbooks to tech—all in one place.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              '📚 Textbooks',
              '🔢 Calculators',
              '📷 Photography & video',
              '🔬 Lab & tools',
              '💻 Tech & accessories',
            ].map((cat, i) => (
              <span
                key={cat}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-white to-primary-50/60 border border-primary-200/60 text-stone-700 font-medium text-sm shadow-sm hover:from-primary-100 hover:to-primary-50 hover:border-primary-300 hover:scale-105 transition-all duration-300"
              >
                {cat}
              </span>
            ))}
          </div>
          <p className="text-center text-stone-500 text-sm mt-6 sm:mt-8 max-w-lg mx-auto">
            Verified student profiles and campus-wide accessibility.
          </p>
        </div>
      </section>

      {/* CTA - gradient */}
      <section className="relative section-padding bg-gradient-cta text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent pointer-events-none" aria-hidden />
        <div className="container-narrow text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            Join the movement
          </h2>
          <p className="text-primary-100 mb-6 sm:mb-8 text-base sm:text-lg">
            Make sharing the new standard—one rental at a time.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center justify-center rounded-xl bg-white text-primary-800 px-6 sm:px-7 py-3.5 sm:py-4 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-[0.98]"
          >
            Start browsing
          </Link>
        </div>
      </section>
    </div>
  )
}
