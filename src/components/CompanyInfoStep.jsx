import { US_STATES } from '../data/constants'

export default function CompanyInfoStep({ formData, onChange }) {
  const businessName = formData.entityName || 'your business'

  function handleAddressChange(field, value) {
    onChange({ address: { ...formData.address, [field]: value } })
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Where will {businessName} operate from?
      </h2>
      <p className="text-slate-500 mb-8">
        We need a physical address for your business. This will be used on your formation documents.
      </p>

      <div className="space-y-3">
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-500 mb-1">Street Address</label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder="123 Main St"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Suite / Unit</label>
            <input
              type="text"
              value={formData.address.suite}
              onChange={(e) => handleAddressChange('suite', e.target.value)}
              placeholder="Optional"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">City</label>
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              placeholder="City"
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">State</label>
            <select
              value={formData.address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
            >
              <option value="">State</option>
              {US_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">ZIP Code</label>
            <input
              type="text"
              value={formData.address.zip}
              onChange={(e) => handleAddressChange('zip', e.target.value)}
              placeholder="ZIP Code"
              maxLength={10}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-400 mt-6">
        This can be your home address, office, or wherever you'll be running things from. You can always update it later.
      </p>
    </div>
  )
}
