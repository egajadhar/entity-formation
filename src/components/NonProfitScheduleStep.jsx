import { useLanguage } from '../contexts/LanguageContext'

export default function NonProfitScheduleStep({ formData, onBack }) {
  const { t } = useLanguage()

  const items = [
    t('nonprofit.i1'),
    t('nonprofit.i2'),
    t('nonprofit.i3'),
    formData.formationState
      ? t('nonprofit.i4State', { state: formData.formationState })
      : t('nonprofit.i4'),
    t('nonprofit.i5'),
  ]

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {t('nonprofit.title')}
        </h2>
        <p className="text-slate-500">
          {t('nonprofit.sub')}
        </p>
      </div>

      {/* What we'll cover */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          {t('nonprofit.coverTitle')}
        </h3>
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Schedule CTA */}
      <a
        href="tel:1-800-222-6868"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all mb-3"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        {t('nonprofit.scheduleBtn')}
      </a>

      <div className="flex items-center gap-3 text-xs text-slate-400 mb-6">
        <div className="flex-1 h-px bg-slate-200" />
        <span>{t('nonprofit.orCall')}</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <a
        href="tel:1-800-222-6868"
        className="w-full flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 px-6 py-4 rounded-xl text-sm font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
        {t('nonprofit.callBtn')}
      </a>

      {/* Back link */}
      <button
        onClick={onBack}
        className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        {t('nonprofit.back')}
      </button>
    </div>
  )
}
