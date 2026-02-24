import { useState, useEffect } from 'react'
import { US_STATES, ENTITY_TYPES } from '../data/constants'
import { useLanguage } from '../contexts/LanguageContext'

const PLANS = [
  { id: 'independent', biannualPrice: 199, annualPrice: 398 },
  { id: 'covered', biannualPrice: 299, annualPrice: 598 },
]

const INDUSTRY_T_KEYS = {
  'Construction': 'ind.Construction', 'Consulting / Freelance': 'ind.Consulting',
  'E-Commerce / Retail': 'ind.ECommerce', 'Food & Beverage': 'ind.Food',
  'Real Estate': 'ind.RealEstate', 'Rideshare / Delivery': 'ind.Rideshare',
  'Technology': 'ind.Technology', 'Trucking': 'ind.Trucking', 'Other': 'ind.Other',
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

function ReviewSection({ title, onEdit, children }) {
  const { t } = useLanguage()
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between bg-slate-50 px-5 py-3 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <button
          onClick={onEdit}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          {t('checkout.editInfo')}
        </button>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between py-1.5">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900 text-right max-w-[60%]">{value || '—'}</span>
    </div>
  )
}

export default function CheckoutStep({ formData, onChange, goToStep }) {
  const { t } = useLanguage()
  const [showEditModal, setShowEditModal] = useState(false)

  const ownerName = formData.owners[0]
    ? `${formData.owners[0].firstName} ${formData.owners[0].lastName}`.trim()
    : ''

  const [sameAsOwner, setSameAsOwner] = useState(true)
  const [sameAsAddress, setSameAsAddress] = useState(true)
  const [cardName, setCardName] = useState(ownerName)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [billingStreet, setBillingStreet] = useState(formData.address.street)
  const [billingSuite, setBillingSuite] = useState(formData.address.suite)
  const [billingCity, setBillingCity] = useState(formData.address.city)
  const [billingState, setBillingState] = useState(formData.address.state)
  const [billingZip, setBillingZip] = useState(formData.address.zip)

  const isExistingBusiness = formData.hasEntity === 'yes'
  const filingFee = isExistingBusiness ? 0 : (STATE_FILING_FEES[formData.formationState] || 0)
  const plan = PLANS.find((p) => p.id === formData.selectedPackage)
  const industry = formData.purpose && formData.purpose !== 'Other' ? formData.purpose : ''
  const translatedIndustry = industry && INDUSTRY_T_KEYS[industry] ? t(INDUSTRY_T_KEYS[industry]) : industry
  const planPrefix = plan ? t(`plan.${plan.id}`) : ''
  const planName = plan ? `${planPrefix}${translatedIndustry ? ` ${translatedIndustry}` : ''} Plan` : '—'
  const totalDue = isExistingBusiness
    ? (plan?.biannualPrice || 0)
    : filingFee + (plan?.biannualPrice || 0)

  // Review modal derived values
  const entity = ENTITY_TYPES.find((e) => e.id === formData.entityType)
  const suffix = formData.entityType === 'llc' ? ', LLC' :
    formData.entityType === 'corporation' || formData.entityType === 's-corp' ? ', Inc.' :
    formData.entityType === 'lp' ? ', LP' : ''
  const addr = formData.address
  const fullAddress = [addr.street, addr.suite, addr.city, addr.state, addr.zip].filter(Boolean).join(', ')

  useEffect(() => {
    if (sameAsOwner) setCardName(ownerName)
  }, [sameAsOwner, ownerName])

  useEffect(() => {
    if (sameAsAddress) {
      setBillingStreet(formData.address.street)
      setBillingSuite(formData.address.suite)
      setBillingCity(formData.address.city)
      setBillingState(formData.address.state)
      setBillingZip(formData.address.zip)
    }
  }, [sameAsAddress, formData.address])

  function handleEditAndGo(step) {
    setShowEditModal(false)
    goToStep(step)
  }

  function formatCardNumber(val) {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  function formatExpiry(val) {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
  }

  const inputClass =
    'w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-50 disabled:text-slate-500'

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">{t('checkout.title')}</h2>
      <p className="text-slate-500 mb-8">{t('checkout.sub')}</p>

      {/* Edit Your Information — hidden for existing businesses */}
      {!isExistingBusiness && <button
        onClick={() => setShowEditModal(true)}
        className="w-full mb-6 flex items-center justify-between border border-slate-200 rounded-xl px-5 py-4 bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">{t('checkout.editInfo')}</p>
            <p className="text-xs text-slate-400">{t('checkout.editInfoSub')}</p>
          </div>
        </div>
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>}

      {/* Order Summary */}
      <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-700">{t('checkout.orderSummary')}</h3>
        </div>
        <div className="px-5 py-4 space-y-3">
          {plan && (
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-900">{planName}</p>
                <p className="text-xs text-slate-400">
                  {isExistingBusiness
                    ? t('checkout.firstPayment', { annual: plan.annualPrice })
                    : t('checkout.billedAfter')}
                </p>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                ${plan.biannualPrice}
              </span>
            </div>
          )}

          {filingFee > 0 && (
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-900">{t('checkout.stateFee', { state: formData.formationState })}</p>
                <p className="text-xs text-slate-400">{t('checkout.dueToday')}</p>
              </div>
              <span className="text-sm font-semibold text-slate-900">${filingFee}</span>
            </div>
          )}

          <div className="border-t border-slate-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-900">{t('checkout.dueTodayLabel')}</span>
              <span className="text-lg font-bold text-slate-900">
                ${totalDue > 0 ? totalDue.toLocaleString() : '0.00'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Express Payment Methods */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button type="button" className="border border-slate-200 rounded-xl py-3 flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">Pay</span>
          </button>
          <button type="button" className="border border-slate-200 rounded-xl py-3 flex items-center justify-center gap-1 hover:bg-slate-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">Pay</span>
          </button>
          <button type="button" className="border border-slate-200 rounded-xl py-3 flex items-center justify-center hover:bg-slate-50 transition-colors">
            <span className="text-sm font-bold" style={{ color: '#3D95CE' }}>Venmo</span>
          </button>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex-1 h-px bg-slate-200" />
          <span>{t('checkout.orCard')}</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      </div>

      {/* Card Form */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('checkout.nameOnCard')}</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => { setCardName(e.target.value); if (sameAsOwner) setSameAsOwner(false) }}
            placeholder={t('checkout.namePH')}
            className={inputClass}
            disabled={sameAsOwner}
          />
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
            <input type="checkbox" checked={sameAsOwner} onChange={(e) => setSameAsOwner(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-slate-500">{t('checkout.sameAsOwner')}{ownerName ? ` (${ownerName})` : ''}</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('checkout.cardDetails')}</label>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} placeholder="1234 5678 9012 3456" className={inputClass} inputMode="numeric" />
          <div className="grid grid-cols-2 gap-3 mt-3">
            <input type="text" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" className={inputClass} inputMode="numeric" />
            <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="CVV" className={inputClass} inputMode="numeric" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('checkout.billingAddress')}</label>
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input type="checkbox" checked={sameAsAddress} onChange={(e) => setSameAsAddress(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-slate-500">{t('checkout.sameAsAddress')}</span>
          </label>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <input type="text" value={billingStreet} onChange={(e) => { setBillingStreet(e.target.value); if (sameAsAddress) setSameAsAddress(false) }} placeholder="Street address" className={inputClass} disabled={sameAsAddress} />
              </div>
              <input type="text" value={billingSuite} onChange={(e) => { setBillingSuite(e.target.value); if (sameAsAddress) setSameAsAddress(false) }} placeholder="Suite" className={inputClass} disabled={sameAsAddress} />
            </div>
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-2">
                <input type="text" value={billingCity} onChange={(e) => { setBillingCity(e.target.value); if (sameAsAddress) setSameAsAddress(false) }} placeholder="City" className={inputClass} disabled={sameAsAddress} />
              </div>
              <div className="col-span-2">
                <select value={billingState} onChange={(e) => { setBillingState(e.target.value); if (sameAsAddress) setSameAsAddress(false) }} className={`${inputClass} appearance-none`} disabled={sameAsAddress}>
                  <option value="">State</option>
                  {US_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
                </select>
              </div>
              <input type="text" value={billingZip} onChange={(e) => { setBillingZip(e.target.value.replace(/\D/g, '').slice(0, 5)); if (sameAsAddress) setSameAsAddress(false) }} placeholder="ZIP" className={inputClass} disabled={sameAsAddress} inputMode="numeric" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center mt-6 flex items-center justify-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        {t('checkout.secureNote')}
      </p>

      {/* Edit Information Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-white w-80 h-full shadow-2xl flex flex-col animate-[slideInRight_0.25s_ease-out]">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
              <h3 className="text-base font-bold text-slate-900">{t('checkout.modal.title')}</h3>
              <button onClick={() => setShowEditModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Modal body */}
            <div className="overflow-y-auto px-5 py-4 space-y-4">
              <ReviewSection title={t('checkout.modal.bizStructure')} onEdit={() => handleEditAndGo(5)}>
                <ReviewRow label={t('checkout.modal.entityType')} value={entity?.fullName} />
                <ReviewRow label={t('checkout.modal.stateFormation')} value={formData.formationState} />
              </ReviewSection>

              <ReviewSection title={t('checkout.modal.bizAddress')} onEdit={() => handleEditAndGo(6)}>
                <ReviewRow label={t('checkout.modal.entityName')} value={`${formData.entityName}${suffix}`} />
                <ReviewRow label={t('checkout.modal.address')} value={fullAddress} />
              </ReviewSection>

              <ReviewSection title={entity?.memberLabel || 'Members'} onEdit={() => handleEditAndGo(7)}>
                {formData.members.map((m, i) => (
                  <div key={i} className={i > 0 ? 'border-t border-slate-100 pt-2 mt-2' : ''}>
                    <ReviewRow label={t('checkout.modal.personN', { n: i + 1 })} value={`${m.firstName} ${m.lastName}`} />
                    <ReviewRow label={t('checkout.modal.title2')} value={m.title} />
                    <ReviewRow label={t('checkout.modal.email')} value={m.email} />
                    {m.ownership && <ReviewRow label={t('checkout.modal.ownership')} value={`${m.ownership}%`} />}
                  </div>
                ))}
              </ReviewSection>

              <ReviewSection title={t('checkout.modal.selectedPlan')} onEdit={() => handleEditAndGo(8)}>
                <ReviewRow label={t('checkout.modal.plan')} value={planName} />
                {plan && <ReviewRow label={t('checkout.modal.planCost')} value={`$${plan.biannualPrice} now + $${plan.biannualPrice} after formation ($${plan.annualPrice}/yr)`} />}
                <ReviewRow label={t('checkout.modal.stateFee')} value={filingFee ? `$${filingFee} (${formData.formationState}) — due now` : '—'} />
              </ReviewSection>

              <p className="text-xs text-slate-400 text-center leading-relaxed pb-2">
                {t('checkout.modal.terms')}
              </p>
            </div>
            {/* Modal footer */}
            <div className="px-5 py-4 border-t border-slate-200 flex-shrink-0">
              <button
                onClick={() => setShowEditModal(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all"
              >
                {t('checkout.modal.done')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
