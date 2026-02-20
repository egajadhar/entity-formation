import { INDUSTRIES } from '../data/constants'

export default function WelcomeStep({ formData, onChange }) {
  function handleContactChange(field, value) {
    onChange({ contact: { ...formData.contact, [field]: value } })
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Let's get to know you!
        </h2>
        <p className="text-slate-500">
          Before we dive in, tell us a little about yourself and what you're looking to build.
        </p>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            What's your name?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={formData.contact.firstName}
              onChange={(e) => handleContactChange('firstName', e.target.value)}
              placeholder="First name"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <input
              type="text"
              value={formData.contact.lastName}
              onChange={(e) => handleContactChange('lastName', e.target.value)}
              placeholder="Last name"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            What's the best email to reach you?
          </label>
          <input
            type="email"
            value={formData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            And a good phone number?
          </label>
          <input
            type="tel"
            value={formData.contact.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            placeholder="(555) 555-5555"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            What type of business are you looking to start?
          </label>
          <select
            value={formData.purpose}
            onChange={(e) => onChange({ purpose: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
          >
            <option value="">Choose one...</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      {formData.contact.firstName && (
        <p className="text-center text-sm text-slate-400 mt-8">
          Great to meet you, {formData.contact.firstName}! Let's get your business off the ground.
        </p>
      )}
    </div>
  )
}
