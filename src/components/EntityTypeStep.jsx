import { ENTITY_TYPES, US_STATES } from '../data/constants'

const icons = {
  shield: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  building: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  chart: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  heart: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  users: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
}

export default function EntityTypeStep({ formData, onChange }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Choose Your Entity Type</h2>
      <p className="text-slate-500 mb-8">Select the type of business entity you want to form.</p>

      {/* Entity cards */}
      <div className="grid gap-3 mb-8">
        {ENTITY_TYPES.map((entity) => {
          const selected = formData.entityType === entity.id
          return (
            <button
              key={entity.id}
              onClick={() => onChange({ entityType: entity.id })}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all
                ${selected
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
            >
              <div className={`mt-0.5 flex-shrink-0 ${selected ? 'text-blue-600' : 'text-slate-400'}`}>
                {icons[entity.icon]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">{entity.name}</span>
                  <span className="text-xs text-slate-400">{entity.fullName}</span>
                  {entity.id === 'llc' && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{entity.description}</p>
              </div>
              <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selected ? 'border-blue-600' : 'border-slate-300'}`}
              >
                {selected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* State selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          State of Formation
        </label>
        <select
          value={formData.formationState}
          onChange={(e) => onChange({ formationState: e.target.value })}
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
        >
          <option value="">Select a state...</option>
          {US_STATES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
        <p className="text-sm text-slate-400 mt-3">
          Most businesses form their LLC in the same state they operate in. Unless you have a specific reason, we recommend keeping it simple.
        </p>
      </div>
    </div>
  )
}
