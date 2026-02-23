import { useLanguage } from '../contexts/LanguageContext'

export default function SideHustleStep({ formData, onChange }) {
  const { t } = useLanguage()

  const REVENUE_OPTIONS = [
    { id: 'under-25k', label: t('hustle.rev1') },
    { id: '25k-50k', label: t('hustle.rev2') },
    { id: '50k-100k', label: t('hustle.rev3') },
    { id: '100k-250k', label: t('hustle.rev4') },
    { id: '250k-plus', label: t('hustle.rev5') },
  ]
  const inputClass =
    'w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'

  const operatingOptions = [
    {
      id: 'yes',
      label: t('hustle.opt1Label'),
      description: t('hustle.opt1Desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
    {
      id: 'no',
      label: t('hustle.opt2Label'),
      description: t('hustle.opt2Desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
    },
  ]

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {t('hustle.title')}{' '}
          <span className="text-blue-600 italic">{t('hustle.titleHighlight')}</span>
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          {t('hustle.sub')}
        </p>
      </div>

      {/* Q1: Is gig running? */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          {t('hustle.q1')}
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {operatingOptions.map((opt) => {
            const selected = formData.isOperating === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => onChange({ isOperating: opt.id, annualRevenue: '' })}
                className={`p-5 rounded-xl border-2 text-left transition-all
                  ${selected
                    ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                  selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {opt.icon}
                </div>
                <p className="font-semibold text-slate-900 text-sm">{opt.label}</p>
                <p className="text-xs text-slate-500 mt-1">{opt.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Q2: Revenue — appears after selecting operating status */}
      {formData.isOperating && (
        <div className="animate-[fadeIn_0.3s_ease-out]">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            {formData.isOperating === 'yes'
              ? t('hustle.revenueYes')
              : t('hustle.revenueNo')}
          </label>
          <div className="space-y-2">
            {REVENUE_OPTIONS.map((opt) => {
              const selected = formData.annualRevenue === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => onChange({ annualRevenue: opt.id })}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-semibold text-left transition-all
                    ${selected
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                    }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
