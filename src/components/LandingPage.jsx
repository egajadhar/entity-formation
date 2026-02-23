export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Nav */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-slate-900 text-lg">1-800Accountant</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#how" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#why" className="hover:text-slate-900 transition-colors">Why Us</a>
            <a href="#stats" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="tel:1-800-222-6868" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              (800) 222-6868
            </a>
          </nav>
          <button
            onClick={onStart}
            className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
          >
            Get Started Free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a5b4fc, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c4b5fd, transparent)' }} />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold px-4 py-2 rounded-full mb-8">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Built exclusively for 1099 contractors
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
          You're a{' '}
          <span style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Gig Worker.
          </span>
          <br />
          You're a business.
        </h1>

        <p className="text-slate-500 text-lg mb-3">You just might not know it yet.</p>

        <p className="text-slate-500 max-w-lg mb-10">
          We don't just form your business — we set it up <em>right</em> with an accountant so you{' '}
          <strong className="text-slate-700">actually save money on taxes</strong>. That's the whole point.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <button
            onClick={onStart}
            className="flex items-center gap-2 text-base font-semibold text-white px-8 py-4 rounded-full transition-all hover:opacity-90 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
          >
            Get My Savings Started
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <a
            href="#stats"
            className="flex items-center gap-2 text-base font-semibold text-slate-700 px-8 py-4 rounded-full border border-slate-300 hover:bg-slate-50 transition-all"
          >
            See How It Works
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No surprise fees
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            4.8/5 from 10,000+ clients
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Setup in under 10 minutes
          </span>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-slate-950 py-20 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-5xl font-extrabold text-white mb-2">$7,200</p>
            <p className="text-slate-400 text-sm">Average self-employment tax saved per year</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-white mb-2">10,000+</p>
            <p className="text-slate-400 text-sm">1099 contractors trust 1-800Accountant</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-white mb-2">30%+</p>
            <p className="text-slate-400 text-sm">Average effective tax rate reduction</p>
          </div>
        </div>
      </section>

    </div>
  )
}
