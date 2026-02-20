export default function EntityQuestionStep({ formData, onChange }) {
  const options = [
    {
      id: 'no',
      title: "I haven't formed yet — let's save on taxes",
      description: "I'm starting fresh and need to set up a new business entity to start reducing my tax burden.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
    },
    {
      id: 'yes',
      title: 'I already formed — show me how much I can save',
      description: "We'll analyze your current setup and find additional tax savings you might be leaving on the table.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ),
    },
  ]

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          The right business entity can save you thousands in taxes
        </h2>
        <p className="text-slate-500">
          Most 1099 contractors overpay on taxes because they haven't set up the right entity structure. An LLC or S-Corp can dramatically reduce your self-employment tax and unlock deductions you're missing.
        </p>
      </div>

      <div className="space-y-4">
        {options.map((option) => {
          const selected = formData.hasEntity === option.id
          return (
            <button
              key={option.id}
              onClick={() => onChange({ hasEntity: option.id })}
              className={`w-full p-6 rounded-xl border-2 text-left transition-all
                ${selected
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{option.title}</h3>
                  <p className="text-sm text-slate-500">{option.description}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <p className="text-center text-sm text-slate-400 mt-8">
        Not sure if you've already formed a business?{' '}
        <a href="tel:1-800-222-6868" className="text-blue-600 font-semibold hover:underline">
          Give us a call at 1-800-222-6868
        </a>
        {' '}and we'll help you figure it out.
      </p>
    </div>
  )
}
