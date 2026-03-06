import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const PLANS = [
  {
    id: 'independent',
    monthlyPrice: 19,
    annualPrice: 228,
  },
  {
    id: 'covered',
    popular: true,
    monthlyPrice: 29,
    annualPrice: 348,
  },
]

const COMPARISON_ROWS_NEW = [
  { tKey: 'cmp.bizFormation', label: 'Business Formation', basic: true, pro: true, info: 'Registering your business with the state.' },
  { tKey: 'cmp.ein', label: 'Employer Identification Number (EIN)', basic: true, pro: true, info: 'Registration with the IRS for your unique business identifier, used to file your tax returns.' },
  { tKey: 'cmp.aiBizTax', label: 'Ai Business Tax Return', basic: true, pro: true, info: 'Preparation and filing of your business income tax return.' },
  { tKey: 'cmp.aiBookkeeping', label: 'Ai Bookkeeping', basic: true, pro: true, info: 'AI-powered bookkeeping generating your Profit and Loss Statements and categorizing expenses.' },
  { tKey: 'cmp.taxExtension', label: 'Complimentary Business Tax Extension', basic: true, pro: true, info: 'A complimentary extension filed for your business tax return when needed.' },
  { tKey: 'cmp.unlimited1099', label: 'Unlimited 1099 Issuing and Filing', basic: true, pro: true, info: 'Unlimited access to file 1099s for contractors your business pays.' },
  { tKey: 'cmp.aiPersonalTax', label: 'Ai Personal Tax Preparation', basic: false, pro: true, info: 'Preparation and filing of your personal income tax return.' },
  { tKey: 'cmp.quarterlyTax', label: 'Quarterly Estimated Tax Compliance', basic: false, pro: true, info: 'Calculations on a quarterly basis on any potential tax liability.' },
  { tKey: 'cmp.cpaReview', label: 'CPA Review of Taxes', basic: false, pro: true, info: 'All your returns reviewed and signed-off by a licensed CPA.' },
  { tKey: 'cmp.payrollSetup', label: 'Payroll Set Up', basic: false, pro: true, info: 'Registration with the state to hire employees in the future, whenever you need it.' },
  { tKey: 'cmp.onDemandExpert', label: 'Access to On-Demand Tax Expert', basic: false, pro: true, info: 'Unlimited consultations with an accountant regarding your tax compliance.' },
]

const COMPARISON_ROWS_EXISTING = [
  { tKey: 'cmp.aiBizTax', label: 'Ai Business Tax Return', basic: true, pro: true, info: 'Preparation and filing of your business income tax return.' },
  { tKey: 'cmp.aiBookkeeping', label: 'Ai Bookkeeping', basic: true, pro: true, info: 'AI-powered bookkeeping generating your Profit and Loss Statements and categorizing expenses.' },
  { tKey: 'cmp.taxExtension', label: 'Complimentary Business Tax Extension', basic: true, pro: true, info: 'A complimentary extension filed for your business tax return when needed.' },
  { tKey: 'cmp.unlimited1099', label: 'Unlimited 1099 Issuing and Filing', basic: true, pro: true, info: 'Unlimited access to file 1099s for contractors your business pays.' },
  { tKey: 'cmp.taxOptimizationSCorp', label: 'Business Tax Optimization (S-Corporation)', basic: false, pro: true, info: 'Restructuring your business as an S-Corporation to reduce self-employment taxes.' },
  { tKey: 'cmp.aiPersonalTax', label: 'Ai Personal Tax Preparation', basic: false, pro: true, info: 'Preparation and filing of your personal income tax return.' },
  { tKey: 'cmp.quarterlyTax', label: 'Quarterly Estimated Tax Compliance', basic: false, pro: true, info: 'Calculations on a quarterly basis on any potential tax liability.' },
  { tKey: 'cmp.cpaReview', label: 'CPA Review of Taxes', basic: false, pro: true, info: 'All your returns reviewed and signed-off by a licensed CPA.' },
  { tKey: 'cmp.payrollSetup', label: 'Payroll Set Up', basic: false, pro: true, info: 'Registration with the state to hire employees in the future, whenever you need it.' },
  { tKey: 'cmp.onDemandExpert', label: 'Access to On-Demand Tax Expert', basic: false, pro: true, info: 'Unlimited consultations with an accountant regarding your tax compliance.' },
]

const STATE_TAX_FILINGS = {
  'Alabama': 'Alabama Business Privilege Tax Filing',
  'Arkansas': 'Arkansas Franchise Tax Filing',
  'California': 'California Franchise Tax Filing',
  'Delaware': 'Delaware Franchise Tax Filing',
  'Tennessee': 'Tennessee Franchise & Excise Tax Filing',
  'Texas': 'Texas Franchise Tax and Public Information Report',
}

const INDUSTRY_T_KEYS = {
  'Construction': 'ind.Construction', 'Consulting / Freelance': 'ind.Consulting',
  'E-Commerce / Retail': 'ind.ECommerce', 'Food & Beverage': 'ind.Food',
  'Real Estate': 'ind.RealEstate', 'Rideshare / Delivery': 'ind.Rideshare',
  'Technology': 'ind.Technology', 'Trucking': 'ind.Trucking', 'Other': 'ind.Other',
}

export default function PackageStep({ formData, onChange, taxSavingsEstimate, deductionSavingsEstimate }) {
  const { t } = useLanguage()
  const [showComparison, setShowComparison] = useState(false)

  const industry = formData.purpose && formData.purpose !== 'Other' ? formData.purpose : ''
  const stateTaxFiling = STATE_TAX_FILINGS[formData.formationState] || null
  const isExistingBusiness = formData.hasEntity === 'yes'

  const FEATURE_LABELS = {
    'Business Formation': t('planf.bizFormation'),
    'Employer Identification Number (EIN)': t('planf.ein'),
    'Ai Business Tax Return': t('planf.aiBizTax'),
    'Ai Bookkeeping': t('planf.aiBookkeeping'),
    'Complimentary Business Tax Extension': t('planf.taxExtension'),
    'Unlimited 1099 Issuing and Filing': t('planf.unlimited1099'),
    'Everything in Basic': t('planf.everythingBasic'),
    'Ai Personal Tax Preparation': t('planf.aiPersonalTax'),
    'Quarterly Estimated Tax Compliance': t('planf.quarterlyTax'),
    'CPA Review of Taxes': t('planf.cpaReview'),
    'Payroll Set Up': t('planf.payroll'),
    'Access to On-Demand Tax Expert': t('planf.onDemandExpert'),
    'Business Tax Optimization (S-Corporation)': t('planf.taxOptimizationSCorp'),
  }

  const translatedIndustry = industry && INDUSTRY_T_KEYS[industry] ? t(INDUSTRY_T_KEYS[industry]) : industry

  const basicFeatures = isExistingBusiness
    ? [
        'Ai Business Tax Return',
        'Ai Bookkeeping',
        'Complimentary Business Tax Extension',
        'Unlimited 1099 Issuing and Filing',
      ]
    : [
        'Business Formation',
        'Employer Identification Number (EIN)',
        'Ai Business Tax Return',
        'Ai Bookkeeping',
        'Complimentary Business Tax Extension',
        'Unlimited 1099 Issuing and Filing',
      ]

  const proFeatures = isExistingBusiness
    ? [
        'Everything in Basic',
        'Business Tax Optimization (S-Corporation)',
        'Ai Personal Tax Preparation',
        'Quarterly Estimated Tax Compliance',
        'CPA Review of Taxes',
        'Payroll Set Up',
        'Access to On-Demand Tax Expert',
      ]
    : [
        'Everything in Basic',
        'Ai Personal Tax Preparation',
        'Quarterly Estimated Tax Compliance',
        'CPA Review of Taxes',
        'Payroll Set Up',
        'Access to On-Demand Tax Expert',
      ]

  const baseComparisonRows = isExistingBusiness ? COMPARISON_ROWS_EXISTING : COMPARISON_ROWS_NEW
  const comparisonRows = stateTaxFiling && !isExistingBusiness
    ? [
        ...COMPARISON_ROWS_NEW.filter((r) => r.basic),
        { tKey: null, label: stateTaxFiling, basic: true, pro: true, info: 'This is a legally required filing in your state. We will file this along with your business tax return.' },
        ...COMPARISON_ROWS_NEW.filter((r) => !r.basic),
      ]
    : baseComparisonRows

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">{t('package.title')}</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        {PLANS.map((plan) => {
          const selected = formData.selectedPackage === plan.id
          const planPrefix = t(`plan.${plan.id}`)
          const planName = `${planPrefix}${translatedIndustry ? ` ${translatedIndustry}` : ''} Plan`
          const features = plan.id === 'independent' ? basicFeatures : proFeatures
          return (
            <button
              key={plan.id}
              onClick={() => onChange({ selectedPackage: plan.id })}
              className={`relative flex flex-col p-5 rounded-xl border-2 text-left transition-all
                ${selected
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {t('package.recommended')}
                  </span>
                </div>
              )}

              <div className="mb-3">
                <h3 className="text-base font-bold text-slate-900">{planName}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold text-slate-900">${plan.monthlyPrice}</span>
                  <span className="text-xs text-slate-500">{t('package.perMonth')}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isExistingBusiness
                    ? t('package.annualNoteExisting', { price: plan.annualPrice })
                    : t('package.annualNote', { price: plan.annualPrice })}
                </p>

                {plan.id === 'independent' && deductionSavingsEstimate > 0 && (
                  <span className="inline-block mt-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                    {t('package.savingsBadge', { amount: deductionSavingsEstimate.toLocaleString() })}
                  </span>
                )}
                {plan.id === 'covered' && taxSavingsEstimate > 0 && (
                  <span className="inline-block mt-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                    {t('package.savingsBadge', { amount: taxSavingsEstimate.toLocaleString() })}
                  </span>
                )}
              </div>

              <ul className="space-y-1.5 flex-1">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {FEATURE_LABELS[feature] || feature}
                  </li>
                ))}
              </ul>

              <div className={`mt-4 py-2 rounded-lg text-center text-sm font-semibold transition-colors
                ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {selected ? t('package.selected') : t('package.selectPlan')}
              </div>
            </button>
          )
        })}
      </div>

      {/* Compare Plans Toggle */}
      <button
        onClick={() => setShowComparison(!showComparison)}
        className="mt-6 mx-auto flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
      >
        <svg
          className={`w-4 h-4 transition-transform ${showComparison ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        {t('package.comparePlans')}
      </button>

      {/* Comparison Chart */}
      {showComparison && (
        <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">{t('package.colFeature')}</th>
                <th className="text-center px-4 py-3 font-semibold text-slate-700 w-28">{t('package.colBasic')}</th>
                <th className="text-center px-4 py-3 font-semibold text-blue-600 w-28">{t('package.colPro')}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-4 py-2.5 text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <span>{row.tKey ? t(row.tKey) : row.label}</span>
                      {row.info && (
                        <span className="relative group flex-shrink-0 mt-0.5 cursor-help">
                          <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                          </svg>
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white text-xs rounded-lg px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
                            {row.info}
                            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                          </span>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-center px-4 py-2.5">
                    {row.basic ? (
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </td>
                  <td className="text-center px-4 py-2.5">
                    {row.pro ? (
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
