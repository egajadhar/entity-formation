import { useState } from 'react'

const PLANS = [
  {
    id: 'independent',
    prefix: 'Independent Operator',
    description: 'Essential formation services to get your business up and running.',
    annualPrice: 398,
    biannualPrice: 199,
    features: [
      'File Your Tax Returns',
      'Manage Your Accounting',
      'Achieve Tax Savings',
      'Register Your Business',
    ],
  },
  {
    id: 'covered',
    prefix: 'Covered',
    popular: true,
    description: 'Comprehensive package with ongoing support and compliance.',
    annualPrice: 598,
    biannualPrice: 299,
    features: [
      'Everything in the Independent Operator Plan',
      'Access to On-Demand Tax Expert',
      'CPA Review of Taxes',
    ],
  },
]

const COMPARISON_ROWS = [
  { label: 'Business Entity Formation', independent: true, covered: true, subItems: ['Name Check Service', 'Business Filing Service'], info: 'Registering your business with the state.' },
  { label: 'Employer Identification Number (EIN)', independent: true, covered: true, info: 'Registration with the IRS for your unique business identifier, used to file your tax returns.' },
  { label: 'Operating Agreement', independent: true, covered: true, info: "Legal document outlining your business' operations and rules of governance." },
  { label: 'Business Tax Preparation', independent: true, covered: true, info: "Preparation and filing of your business' income tax return." },
  { label: 'Monthly Ai Bookkeeping', independent: true, covered: true, info: 'Access to your Ai bookkeeping software — generating your Profit and Loss Statements and categorizing your expenses.', subItems: ['Ai-powered income & expense categorization', 'Auto-generated P&L, Balance Sheets & Ledgers', 'Ai receipt scanning'] },
  { label: 'Quarterly Estimated Tax Compliance', independent: true, covered: true, info: 'Calculations on a quarterly basis on any potential tax liability.' },
  { label: '1099 Issuance for Sub-Contractors', independent: true, covered: true, info: 'Unlimited access to file 1099s for contractors that your business pays.' },
  { label: 'Expert Access: Ai, Webinar', independent: true, covered: true, info: 'Access to tailored business webinars and Ai tools.' },
  { label: 'Personal Tax Preparation', independent: false, covered: true, info: 'Preparation and filing of your personal income tax return.' },
  { label: 'CPA Review of Taxes', independent: false, covered: true, info: 'All your returns reviewed and signed-off by a licensed CPA.' },
  { label: 'Live Expert Access: Hotline', independent: false, covered: true, info: 'Unlimited 30 minute consultations with an accountant regarding your tax compliance.' },
  { label: 'Payroll Setup for Self or Future Employees', independent: false, covered: true, info: 'Registration with the state to hire employees in the future, whenever you need it.' },
]

const STATE_TAX_FILINGS = {
  'Alabama': 'Alabama Business Privilege Tax Filing',
  'Arkansas': 'Arkansas Franchise Tax Filing',
  'California': 'California Franchise Tax Filing',
  'Delaware': 'Delaware Franchise Tax Filing',
  'Tennessee': 'Tennessee Franchise & Excise Tax Filing',
  'Texas': 'Texas Franchise Tax and Public Information Report',
}

const STATE_FILING_FEES = {
  'Alabama': 236, 'Alaska': 250, 'Arizona': 85, 'Arkansas': 45, 'California': 70,
  'Colorado': 50, 'Connecticut': 120, 'Delaware': 110, 'Florida': 125, 'Georgia': 105,
  'Hawaii': 51, 'Idaho': 103, 'Illinois': 153, 'Indiana': 97, 'Iowa': 50,
  'Kansas': 166, 'Kentucky': 40, 'Louisiana': 105, 'Maine': 178, 'Maryland': 155,
  'Massachusetts': 520, 'Michigan': 50, 'Minnesota': 155, 'Mississippi': 53, 'Missouri': 51,
  'Montana': 35, 'Nebraska': 103, 'Nevada': 436, 'New Hampshire': 102, 'New Jersey': 129,
  'New Mexico': 51, 'New York': 205, 'North Carolina': 128, 'North Dakota': 135, 'Ohio': 99,
  'Oklahoma': 104, 'Oregon': 100, 'Pennsylvania': 125, 'Rhode Island': 156, 'South Carolina': 125,
  'South Dakota': 153, 'Tennessee': 307, 'Texas': 300, 'Utah': 59, 'Vermont': 155,
  'Virginia': 100, 'Washington': 200, 'Washington D.C.': 99, 'West Virginia': 130, 'Wisconsin': 130,
  'Wyoming': 103,
}

export default function PackageStep({ formData, onChange, taxSavingsEstimate, deductionSavingsEstimate }) {
  const [showComparison, setShowComparison] = useState(false)
  const industry = formData.purpose && formData.purpose !== 'Other' ? formData.purpose : ''
  const filingFee = STATE_FILING_FEES[formData.formationState] || null
  const industryLabel = industry ? ` ${industry}` : ''
  const stateTaxFiling = STATE_TAX_FILINGS[formData.formationState] || null

  const isExistingBusiness = formData.hasEntity === 'yes'

  // Build dynamic plan features for Independent Operator
  const independentFeatures = [
    ...PLANS[0].features.filter((f) => isExistingBusiness ? f !== 'Register Your Business' : true),
    ...(stateTaxFiling ? [stateTaxFiling] : []),
  ]

  // Covered includes everything in Independent, plus extra for existing businesses
  const coveredFeatures = isExistingBusiness
    ? [...PLANS[1].features, 'Business Tax Optimization']
    : PLANS[1].features

  // Build dynamic comparison rows - insert state tax filing just before covered-only items
  const comparisonRows = stateTaxFiling
    ? [
        ...COMPARISON_ROWS.filter((r) => r.independent),
        {
          label: stateTaxFiling,
          independent: true,
          covered: true,
          info: 'This is a legally required filing in your state. We will file this along with your business tax return.',
        },
        ...COMPARISON_ROWS.filter((r) => !r.independent),
      ]
    : COMPARISON_ROWS

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Get Your Tax Savings Started</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        {PLANS.map((plan) => {
          const selected = formData.selectedPackage === plan.id
          const planName = `${plan.prefix}${industryLabel} Plan`
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
                    Recommended
                  </span>
                </div>
              )}

              <div className="mb-3">
                <h3 className="text-base font-bold text-slate-900">{planName}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold text-slate-900">${plan.biannualPrice}</span>
                  <span className="text-xs text-slate-500">every 6 months</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">${plan.annualPrice}/yr — first payment after formation + state filing fees</p>

                {/* Savings badge — inline to avoid overlap */}
                {plan.id === 'independent' && deductionSavingsEstimate > 0 && (
                  <span className="inline-block mt-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                    Estimated Tax Savings ~${deductionSavingsEstimate.toLocaleString()}
                  </span>
                )}
                {plan.id === 'covered' && taxSavingsEstimate > 0 && (
                  <span className="inline-block mt-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                    Estimated Tax Savings ~${taxSavingsEstimate.toLocaleString()}
                  </span>
                )}
              </div>

              <ul className="space-y-1.5 flex-1">
                {(plan.id === 'independent' ? independentFeatures : coveredFeatures).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className={`mt-4 py-2 rounded-lg text-center text-sm font-semibold transition-colors
                ${selected
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600'
                }`}
              >
                {selected ? 'Selected' : 'Select Plan'}
              </div>
            </button>
          )
        })}
      </div>

      {/* State Filing Fee Bar */}
      {filingFee && (
        <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 flex items-center gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-sm text-slate-700">
            <span className="font-semibold">{formData.formationState} state filing fee: ${filingFee}</span> — due today. Your plan subscription starts after your entity is filed.
          </p>
        </div>
      )}

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
        Compare Plans in Detail
      </button>

      {/* Comparison Chart */}
      {showComparison && (
        <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Feature</th>
                <th className="text-center px-4 py-3 font-semibold text-slate-700 w-28">Independent</th>
                <th className="text-center px-4 py-3 font-semibold text-blue-600 w-28">Covered</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-4 py-2.5 text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <span>{row.label}</span>
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
                    {row.subItems && (
                      <ul className="mt-1 space-y-0.5">
                        {row.subItems.map((sub) => (
                          <li key={sub} className="text-xs text-slate-400 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                            {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="text-center px-4 py-2.5">
                    {row.independent ? (
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
                    {row.covered ? (
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
