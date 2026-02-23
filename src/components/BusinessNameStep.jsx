const TIMELINES = [
  { id: 'asap', label: 'As soon as possible', description: "I'm ready to go" },
  { id: 'this-month', label: 'In a month', description: 'Getting things lined up' },
  { id: 'few-months', label: 'In the next few months', description: 'Still in the planning phase' },
]

export default function BusinessNameStep({ formData, onChange }) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Let's talk about your new business!
        </h2>
        <p className="text-slate-500">
          Every great business starts with a name. Tell us what you have in mind.
        </p>
      </div>

      <div className="space-y-8">
        {/* Business name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            What do you want to name your business?
          </label>
          <p className="text-sm text-slate-400 mb-3">
            We'll check with the Secretary of State to make sure your name is available.
          </p>
          <input
            type="text"
            value={formData.entityName}
            onChange={(e) => onChange({ entityName: e.target.value })}
            placeholder="e.g. Sunrise Consulting Group"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            When do you want to be up and running?
          </label>
          <p className="text-sm text-slate-400 mb-3">
            The sooner you're set up, the sooner you start saving on taxes.
          </p>
          <div className="space-y-3">
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
                    <span className="text-slate-400 text-sm ml-2">— {t.description}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {formData.startTimeline && (
            <p className="text-sm text-blue-600 font-medium mt-3">
              {formData.startTimeline === 'asap' && "We love the urgency — every month you wait is money left on the table. Let's unlock your savings now."}
              {formData.startTimeline === 'this-month' && "Great — we'll get your setup locked in so your tax savings kick in as soon as possible."}
              {formData.startTimeline === 'few-months' && "Smart to plan ahead. We'll make sure your business is optimized so you're saving from day one."}
            </p>
          )}
        </div>
      </div>

      {formData.entityName && formData.startTimeline && (
        <p className="text-center text-sm text-slate-400 mt-8">
          Love the name! Let's keep building out <span className="font-medium text-slate-600">{formData.entityName}</span>.
        </p>
      )}
    </div>
  )
}
