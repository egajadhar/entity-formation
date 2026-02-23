import { useLanguage } from '../contexts/LanguageContext'

export default function EntityQuestionStep({ formData, onChange }) {
  const { t } = useLanguage()
  const inputClass =
    'w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'

  const TIMELINES = [
    { id: 'asap', label: t('entity.tl1'), sub: t('entity.tl1Sub') },
    { id: 'this-month', label: t('entity.tl2'), sub: t('entity.tl2Sub') },
    { id: 'few-months', label: t('entity.tl3'), sub: t('entity.tl3Sub') },
  ]

  const options = [
    {
      id: 'no',
      title: t('entity.opt1Title'),
      description: t('entity.opt1Desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
      badge: t('entity.opt1Badge'),
    },
    {
      id: 'yes',
      title: t('entity.opt2Title'),
      description: t('entity.opt2Desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ),
      badge: t('entity.opt2Badge'),
    },
  ]

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {t('entity.title1')}{' '}
          <span className="text-blue-600 italic">{t('entity.title2')}</span>{' '}
          {t('entity.title3')}
        </h2>
        <p className="text-slate-500">
          {t('entity.sub')}
        </p>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="flex flex-col items-center text-center bg-blue-50 border border-blue-100 rounded-xl p-4 opacity-0" style={{ animation: 'popIn 0.5s ease-out 0.1s forwards' }}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-lg font-extrabold text-blue-700 leading-tight">{t('entity.stat1')}</span>
          <span className="text-xs font-medium text-slate-500 mt-1">{t('entity.stat1Label')}</span>
        </div>

        <div className="flex flex-col items-center text-center bg-blue-50 border border-blue-100 rounded-xl p-4 opacity-0" style={{ animation: 'popIn 0.5s ease-out 0.25s forwards' }}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <span className="text-lg font-extrabold text-blue-700 leading-tight">{t('entity.stat2')}</span>
          <span className="text-xs font-medium text-slate-500 mt-1">{t('entity.stat2Label')}</span>
        </div>

        <div className="flex flex-col items-center text-center bg-blue-50 border border-blue-100 rounded-xl p-4 opacity-0" style={{ animation: 'popIn 0.5s ease-out 0.4s forwards' }}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <span className="text-lg font-extrabold text-blue-700 leading-tight">{t('entity.stat3')}</span>
          <span className="text-xs font-medium text-slate-500 mt-1">{t('entity.stat3Label')}</span>
        </div>
      </div>

      {/* Formally registered question */}
      <p className="text-sm font-semibold text-slate-700 mb-3">
        {t('entity.q1')}
      </p>
      <div className="space-y-3 mb-6">
        {options.map((option) => {
          const selected = formData.hasEntity === option.id
          return (
            <button
              key={option.id}
              onClick={() => onChange({ hasEntity: option.id, entityName: '', startTimeline: '' })}
              className={`w-full p-5 rounded-xl border-2 text-left transition-all
                ${selected
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-0.5 text-sm">{option.title}</h3>
                  <p className="text-xs text-slate-500">{option.description}</p>
                  <div className="flex items-center gap-1.5 mt-2.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.499z" />
                    </svg>
                    {option.badge}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Conditional: already registered — ask business name */}
      {formData.hasEntity === 'yes' && (
        <div className="animate-[fadeIn_0.3s_ease-out] space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {t('entity.nameYesLabel')}
            </label>
            <input
              type="text"
              value={formData.entityName}
              onChange={(e) => onChange({ entityName: e.target.value })}
              placeholder={t('entity.namePHYes')}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Conditional: not registered — ask desired name + timeline */}
      {formData.hasEntity === 'no' && (
        <div className="animate-[fadeIn_0.3s_ease-out] space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {t('entity.nameNoLabel')}
            </label>
            <p className="text-xs text-slate-400 mb-2">
              {t('entity.nameNoHelper')}
            </p>
            <input
              type="text"
              value={formData.entityName}
              onChange={(e) => onChange({ entityName: e.target.value })}
              placeholder={t('entity.namePHNo')}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {t('entity.timelineLabel')}
            </label>
            <p className="text-xs text-slate-400 mb-3">
              {t('entity.timelineHelper')}
            </p>
            <div className="space-y-2">
              {TIMELINES.map((t) => {
                const selected = formData.startTimeline === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => onChange({ startTimeline: t.id })}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all
                      ${selected
                        ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selected ? 'border-blue-600' : 'border-slate-300'
                    }`}>
                      {selected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                    </div>
                    <div>
                      <span className="font-medium text-slate-900 text-sm">{t.label}</span>
                      {selected && (
                        <p className="text-xs text-blue-600 font-medium mt-0.5">{t.sub}</p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-slate-400 mt-8">
        {t('entity.helpText')}{' '}
        <a href="tel:1-800-222-6868" className="text-blue-600 font-semibold hover:underline">
          {t('entity.helpCall')}
        </a>
        {' '}{t('entity.helpEnd')}
      </p>
    </div>
  )
}
