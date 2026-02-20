export default function OwnerInfoStep({ formData, onChange }) {
  const businessName = formData.entityName || 'your business'

  function updateOwner(index, field, value) {
    const updated = formData.owners.map((o, i) =>
      i === index ? { ...o, [field]: value } : o
    )
    onChange({ owners: updated })
  }

  function addOwner() {
    onChange({
      owners: [...formData.owners, { firstName: '', lastName: '', email: '', phone: '' }],
    })
  }

  function removeOwner(index) {
    if (formData.owners.length <= 1) return
    onChange({ owners: formData.owners.filter((_, i) => i !== index) })
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Who's running {businessName}?
        </h2>
        <p className="text-slate-500">
          Just need a few details so we know who to keep in the loop as we get things set up.
        </p>
      </div>

      <div className="space-y-4">
        {formData.owners.map((owner, index) => (
          <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-700">
                {index === 0 ? 'Primary Owner' : `Owner ${index + 1}`}
              </span>
              {formData.owners.length > 1 && (
                <button
                  onClick={() => removeOwner(index)}
                  className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  {index === 0 ? "What's your name?" : 'Name'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={owner.firstName}
                    onChange={(e) => updateOwner(index, 'firstName', e.target.value)}
                    placeholder="First name"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="text"
                    value={owner.lastName}
                    onChange={(e) => updateOwner(index, 'lastName', e.target.value)}
                    placeholder="Last name"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  {index === 0 ? 'Best email to reach you?' : 'Email'}
                </label>
                <input
                  type="email"
                  value={owner.email}
                  onChange={(e) => updateOwner(index, 'email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  {index === 0 ? 'And a good number to reach you?' : 'Phone number'}
                </label>
                <input
                  type="tel"
                  value={owner.phone}
                  onChange={(e) => updateOwner(index, 'phone', e.target.value)}
                  placeholder="(555) 555-5555"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addOwner}
        className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
        Add another owner
      </button>

      {formData.owners[0]?.firstName && (
        <p className="text-center text-sm text-slate-400 mt-8">
          Nice to meet you, {formData.owners[0].firstName}! We'll keep you updated every step of the way.
        </p>
      )}
    </div>
  )
}
