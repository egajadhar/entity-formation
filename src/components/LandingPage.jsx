import { useLanguage } from '../contexts/LanguageContext'

function LanguageDropdown() {
  const { lang, setLang } = useLanguage()
  return (
    <div className="relative flex-shrink-0">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="appearance-none bg-slate-100 text-slate-700 text-xs font-semibold pl-2 pr-6 py-1.5 rounded cursor-pointer hover:bg-slate-200 transition-colors focus:outline-none border border-slate-200"
      >
        <option value="en">EN — English</option>
        <option value="es">ES — Español</option>
      </select>
      <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  )
}

export default function LandingPage({ onStart }) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Nav */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-slate-900 text-lg">1-800Accountant</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#how" className="hover:text-slate-900 transition-colors">{t('landing.navHow')}</a>
            <a href="#why" className="hover:text-slate-900 transition-colors">{t('landing.navWhy')}</a>
            <a href="#stats" className="hover:text-slate-900 transition-colors">{t('landing.navPricing')}</a>
            <a href="tel:1-800-222-6868" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {t('landing.navPhone')}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageDropdown />
            <button
              onClick={onStart}
              className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
            >
              {t('landing.navCta')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
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
          {t('landing.badge')}
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
          {t('landing.headline1')}{' '}
          <span style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t('landing.headline2')}
          </span>
          <br />
          {t('landing.headline3')}
        </h1>

        <p className="text-slate-500 text-lg mb-3">{t('landing.sub1')}</p>

        <p className="text-slate-500 max-w-lg mb-10">
          {t('landing.sub2')} <em>{t('landing.sub2b')}</em> {t('landing.sub2c')}{' '}
          <strong className="text-slate-700">{t('landing.sub2d')}</strong>{t('landing.sub2e')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <button
            onClick={onStart}
            className="flex items-center gap-2 text-base font-semibold text-white px-8 py-4 rounded-full transition-all hover:opacity-90 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
          >
            {t('landing.ctaPrimary')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <a
            href="#stats"
            className="flex items-center gap-2 text-base font-semibold text-slate-700 px-8 py-4 rounded-full border border-slate-300 hover:bg-slate-50 transition-all"
          >
            {t('landing.ctaSecondary')}
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('landing.trust1')}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {t('landing.trust2')}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('landing.trust3')}
          </span>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-slate-950 py-20 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-5xl font-extrabold text-white mb-2">{t('landing.stat1')}</p>
            <p className="text-slate-400 text-sm">{t('landing.stat1Sub')}</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-white mb-2">{t('landing.stat2')}</p>
            <p className="text-slate-400 text-sm">{t('landing.stat2Sub')}</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-white mb-2">{t('landing.stat3')}</p>
            <p className="text-slate-400 text-sm">{t('landing.stat3Sub')}</p>
          </div>
        </div>
      </section>

    </div>
  )
}
