import { US_STATES } from '../data/constants'

export default function RegisteredAgentStep({ formData, onChange, onSubmit }) {
  const agent = formData.registeredAgent

  function handleAgentChange(field, value) {
    onChange({ registeredAgent: { ...agent, [field]: value } })
  }

  const canSubmit = agent.useOurs || (agent.name && agent.street && agent.city && agent.state && agent.zip)

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Registered Agent</h2>
      <p className="text-slate-500 mb-8">
        Every business needs a registered agent to receive legal documents on its behalf.
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
              <span className="font-semibold text-slate-900">Use Our Service</span>
              <span className="ml-2 text-sm font-semibold text-blue-600">$99/yr</span>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            We'll serve as your registered agent for $99 a year, billed annually after formation.
          </p>
          <div className="mt-3 inline-block bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            Recommended
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
            <span className="font-semibold text-slate-900">I'll Provide My Own</span>
          </div>
          <p className="text-sm text-slate-500">
            Designate your own registered agent. Must have a physical address in the state of formation.
          </p>
        </button>
      </div>

      {/* Our service info */}
      {agent.useOurs && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <h3 className="font-semibold text-slate-900 mb-2">Our Registered Agent Service Includes:</h3>
          <ul className="space-y-2">
            {[
              'Dedicated physical address in your state of formation',
              'Receive and forward all legal correspondence',
              'Same-day digital notification of served documents',
              'Compliance reminders for annual reports & deadlines',
              'Online dashboard to view all documents',
            ].map((item) => (
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
              Agent Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={agent.name}
              onChange={(e) => handleAgentChange('name', e.target.value)}
              placeholder="Full name or company name"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Physical Address <span className="text-red-500">*</span>
              <span className="text-slate-400 font-normal text-xs ml-1">(No P.O. boxes)</span>
            </label>
            <div className="space-y-3">
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={agent.street}
                    onChange={(e) => handleAgentChange('street', e.target.value)}
                    placeholder="Street address"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <input
                  type="text"
                  value={agent.suite}
                  onChange={(e) => handleAgentChange('suite', e.target.value)}
                  placeholder="Suite / Unit"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={agent.city}
                  onChange={(e) => handleAgentChange('city', e.target.value)}
                  placeholder="City"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <select
                  value={agent.state}
                  onChange={(e) => handleAgentChange('state', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                >
                  <option value="">State</option>
                  {US_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={agent.zip}
                  onChange={(e) => handleAgentChange('zip', e.target.value)}
                  placeholder="ZIP Code"
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
        Confirm Registered Agent
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </button>
    </div>
  )
}
