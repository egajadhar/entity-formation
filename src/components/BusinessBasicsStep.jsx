import { useLanguage } from '../contexts/LanguageContext'

export default function BusinessBasicsStep({ formData, onChange }) {
  const { t } = useLanguage()
  const owner = formData.owners[0] || {}

  function updateOwner(field, value) {
    onChange({ owners: [{ ...owner, [field]: value }] })
  }

  const inputClass =
    'w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-4 py-2 rounded-full">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            {t('basics.badge1')}
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            {t('basics.badge2')}
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
          {t('basics.title')}
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          {t('basics.sub')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('basics.firstName')}</label>
            <input
              type="text"
              value={owner.firstName || ''}
              onChange={(e) => updateOwner('firstName', e.target.value)}
              placeholder={t('basics.firstPH')}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('basics.lastName')}</label>
            <input
              type="text"
              value={owner.lastName || ''}
              onChange={(e) => updateOwner('lastName', e.target.value)}
              placeholder={t('basics.lastPH')}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('basics.email')}</label>
          <input
            type="email"
            value={owner.email || ''}
            onChange={(e) => updateOwner('email', e.target.value)}
            placeholder={t('basics.emailPH')}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('basics.phone')}</label>
          <input
            type="tel"
            value={owner.phone || ''}
            onChange={(e) => updateOwner('phone', e.target.value)}
            placeholder={t('basics.phonePH')}
            className={inputClass}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium">{t('basics.ssoOr')}</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Google SSO */}
        <button
          type="button"
          onClick={() => {}}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
        >
          {/* Google "G" logo */}
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t('basics.google')}
        </button>
      </div>

      {owner.firstName && (
        <p className="text-center text-sm text-slate-400 mt-8">
          {t('basics.greeting', { name: owner.firstName })}
        </p>
      )}
    </div>
  )
}
