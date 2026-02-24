import { US_STATES, INDUSTRIES } from '../data/constants'
import { useLanguage } from '../contexts/LanguageContext'

const INDUSTRY_ICONS = {
  'Construction': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  'Consulting / Freelance': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
  'E-Commerce / Retail': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  'Food & Beverage': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-3 1.5v-1.5m-6 4.5l1.5.75M21 15.75l-1.5.75M6 10.5l-1.5.75M18 10.5l1.5.75M6 15.75l1.5-.75M18 15.75l-1.5-.75M12 20.25v-1.5" />
    </svg>
  ),
  'Real Estate': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
    </svg>
  ),
  'Rideshare / Delivery': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  'Technology': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
    </svg>
  ),
  'Trucking': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  'Other': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  ),
}

const INDUSTRY_T_KEYS = {
  'Construction': 'ind.Construction',
  'Consulting / Freelance': 'ind.Consulting',
  'E-Commerce / Retail': 'ind.ECommerce',
  'Food & Beverage': 'ind.Food',
  'Real Estate': 'ind.RealEstate',
  'Rideshare / Delivery': 'ind.Rideshare',
  'Technology': 'ind.Technology',
  'Trucking': 'ind.Trucking',
  'Other': 'ind.Other',
}

export default function LocationIndustryStep({ formData, onChange }) {
  const { t } = useLanguage()
  const isOperating = formData.isOperating === 'yes'

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {isOperating ? t('location.titleYes') : t('location.titleNo')}
        </h2>
        <p className="text-slate-500">
          {isOperating ? t('location.subYes') : t('location.subNo')}
        </p>
      </div>

      {/* State */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {t('location.stateLabel')}
        </label>
        <select
          value={formData.businessState}
          onChange={(e) => onChange({ businessState: e.target.value })}
          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
        >
          <option value="">{t('location.statePH')}</option>
          {US_STATES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      {/* Industry */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          {t('location.industryLabel')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {INDUSTRIES.filter((ind) => ind !== 'Other').map((industry) => {
            const selected = formData.purpose === industry
            return (
              <button
                key={industry}
                onClick={() => onChange({ purpose: industry })}
                className={`flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all
                  ${selected
                    ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${
                  selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {INDUSTRY_ICONS[industry]}
                </div>
                <span className="text-xs font-semibold text-slate-700 leading-tight">{t(INDUSTRY_T_KEYS[industry] || industry)}</span>
              </button>
            )
          })}
          {/* Other option */}
          <button
            onClick={() => onChange({ purpose: 'Other' })}
            className={`flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all
              ${formData.purpose === 'Other'
                ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${
              formData.purpose === 'Other' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {INDUSTRY_ICONS['Other']}
            </div>
            <span className="text-xs font-semibold text-slate-700 leading-tight">{t('ind.Other')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
