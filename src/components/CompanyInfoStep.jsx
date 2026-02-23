import { US_STATES } from '../data/constants'
import { useLanguage } from '../contexts/LanguageContext'

export default function CompanyInfoStep({ formData, onChange }) {
  const { t } = useLanguage()

  function handleAddressChange(field, value) {
    onChange({ address: { ...formData.address, [field]: value } })
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        {t('company.title', { name: formData.entityName || 'your business' })}
      </h2>
      <p className="text-slate-500 mb-8">
        {t('company.sub')}
      </p>

      <div className="space-y-3">
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-500 mb-1">{t('company.street')}</label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder={t('company.streetPH')}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">{t('company.suite')}</label>
            <input
              type="text"
              value={formData.address.suite}
              onChange={(e) => handleAddressChange('suite', e.target.value)}
              placeholder={t('company.suitePH')}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">{t('company.city')}</label>
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              placeholder={t('company.cityPH')}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">{t('company.state')}</label>
            <select
              value={formData.address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
            >
              <option value="">{t('company.statePH')}</option>
              {US_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">{t('company.zip')}</label>
            <input
              type="text"
              value={formData.address.zip}
              onChange={(e) => handleAddressChange('zip', e.target.value)}
              placeholder={t('company.zipPH')}
              maxLength={10}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-400 mt-6">
        {t('company.helper')}
      </p>
    </div>
  )
}
