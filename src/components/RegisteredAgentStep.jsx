import { US_STATES } from '../data/constants'
import { useLanguage } from '../contexts/LanguageContext'

export default function RegisteredAgentStep({ formData, onChange, onSubmit }) {
  const { t } = useLanguage()
  const agent = formData.registeredAgent

  function handleAgentChange(field, value) {
    onChange({ registeredAgent: { ...agent, [field]: value } })
  }

  const canSubmit = agent.useOurs || (agent.name && agent.street && agent.city && agent.state && agent.zip)

  const serviceItems = [
    t('agent.si1'),
    t('agent.si2'),
    t('agent.si3'),
    t('agent.si4'),
    t('agent.si5'),
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">{t('agent.title')}</h2>
      <p className="text-slate-500 mb-8">
        {t('agent.sub')}
      </p>

      {/* Option toggle */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <button
          onClick={() => handleAgentChange('useOurs', true)}
          className={`p-5 rounded-xl border-2 text-left transition-all
            ${agent.useOurs
              ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
              : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${agent.useOurs ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-slate-900">{t('agent.useOursTitle')}</span>
              <span className="ml-2 text-sm font-semibold text-blue-600">{t('agent.useOursPrice')}</span>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            {t('agent.useOursDesc')}
          </p>
          <div className="mt-3 inline-block bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {t('agent.recommended')}
          </div>
        </button>

        <button
          onClick={() => handleAgentChange('useOurs', false)}
          className={`p-5 rounded-xl border-2 text-left transition-all
            ${!agent.useOurs
              ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
              : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${!agent.useOurs ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900">{t('agent.ownTitle')}</span>
          </div>
          <p className="text-sm text-slate-500">
            {t('agent.ownDesc')}
          </p>
        </button>
      </div>

      {/* Our service info */}
      {agent.useOurs && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <h3 className="font-semibold text-slate-900 mb-2">{t('agent.serviceTitle')}</h3>
          <ul className="space-y-2">
            {serviceItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Custom agent form */}
      {!agent.useOurs && (
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {t('agent.agentName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={agent.name}
              onChange={(e) => handleAgentChange('name', e.target.value)}
              placeholder={t('agent.agentNamePH')}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {t('agent.physAddr')} <span className="text-red-500">*</span>
              <span className="text-slate-400 font-normal text-xs ml-1">{t('agent.noPO')}</span>
            </label>
            <div className="space-y-3">
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={agent.street}
                    onChange={(e) => handleAgentChange('street', e.target.value)}
                    placeholder={t('agent.streetPH')}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <input
                  type="text"
                  value={agent.suite}
                  onChange={(e) => handleAgentChange('suite', e.target.value)}
                  placeholder={t('agent.suitePH')}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={agent.city}
                  onChange={(e) => handleAgentChange('city', e.target.value)}
                  placeholder={t('agent.cityPH')}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <select
                  value={agent.state}
                  onChange={(e) => handleAgentChange('state', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                >
                  <option value="">{t('agent.statePH')}</option>
                  {US_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={agent.zip}
                  onChange={(e) => handleAgentChange('zip', e.target.value)}
                  placeholder={t('agent.zipPH')}
                  maxLength={10}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {t('agent.confirmBtn')}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </button>
    </div>
  )
}
