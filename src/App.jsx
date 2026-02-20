import { useState } from 'react'
import './App.css'
import { INITIAL_FORM_DATA } from './data/constants'
import ProgressBar from './components/ProgressBar'
import BusinessBasicsStep from './components/BusinessBasicsStep'
import EntityQuestionStep from './components/EntityQuestionStep'
import BusinessNameStep from './components/BusinessNameStep'
import OwnerInfoStep from './components/OwnerInfoStep'
import EntityTypeStep from './components/EntityTypeStep'
import CompanyInfoStep from './components/CompanyInfoStep'
import MembersStep from './components/MembersStep'
import PackageStep from './components/PackageStep'
import ReviewStep from './components/ReviewStep'
import CheckoutStep from './components/CheckoutStep'
import NonProfitScheduleStep from './components/NonProfitScheduleStep'
import TaxSavingsStep from './components/TaxSavingsStep'

const TOTAL_STEPS = 10

function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [nonprofitSchedule, setNonprofitSchedule] = useState(false)
  const [showTaxSavings, setShowTaxSavings] = useState(false)
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')

  function updateForm(updates) {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  function next() {
    if (step === 1) {
      setLoading(true)
      setLoadingDone(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        setLoadingDone(true)
      }, 3000)
      setTimeout(() => {
        setLoading(false)
        setLoadingDone(false)
        setStep(2)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 5000)
      return
    }
    // Existing entity: redirect to tax savings screen
    if (step === 2 && formData.hasEntity === 'yes') {
      setShowTaxSavings(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // Pre-fill entity type and formation state when entering step 5
    if (step === 4) {
      if (!formData.entityType) {
        setFormData((prev) => ({ ...prev, entityType: 'llc' }))
      }
      if (!formData.formationState && formData.businessState) {
        setFormData((prev) => ({ ...prev, formationState: formData.businessState }))
      }
    }
    // Non-profit: redirect to scheduling screen instead of continuing flow
    if (step === 5 && formData.entityType === 'nonprofit') {
      setNonprofitSchedule(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // Pre-fill address state when entering step 6 (Company Info)
    if (step === 5) {
      if (!formData.address.state && formData.businessState) {
        setFormData((prev) => ({ ...prev, address: { ...prev.address, state: formData.businessState } }))
      }
    }
    // Pre-fill members from owners when entering step 7 (People)
    if (step === 6) {
      const firstMember = formData.members[0]
      if (!firstMember.firstName && !firstMember.lastName && !firstMember.email) {
        const prefilled = formData.owners.map((o) => ({
          firstName: o.firstName || '',
          lastName: o.lastName || '',
          title: 'Member',
          email: o.email || '',
          ownership: '',
        }))
        setFormData((prev) => ({ ...prev, members: prefilled }))
      }
    }
    if (step < TOTAL_STEPS) setStep(step + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function back() {
    if (step > 1) setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToStep(s) {
    setStep(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSubmit() {
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function canProceed() {
    switch (step) {
      case 1:
        return formData.businessState && formData.purpose
      case 2:
        return !!formData.hasEntity
      case 3:
        return formData.entityName && formData.startTimeline
      case 4:
        return formData.owners.every((o) => o.firstName && o.lastName && o.email && o.phone)
      case 5:
        return formData.entityType && formData.formationState
      case 6:
        return (
          formData.entityName &&
          formData.address.street &&
          formData.address.city &&
          formData.address.state &&
          formData.address.zip
        )
      case 7: {
        const allFilled = formData.members.every(
          (m) => m.firstName && m.lastName && m.title && m.email && m.ownership !== ''
        )
        const totalOwnership = formData.members.reduce(
          (sum, m) => sum + (parseFloat(m.ownership) || 0), 0
        )
        return allFilled && totalOwnership === 100
      }
      case 8:
        return formData.selectedPackage
      case 9:
        return true
      default:
        return true
    }
  }

  // Loading screen
  if (loading) {
    const industryText = formData.purpose && formData.purpose !== 'Other'
      ? `${formData.purpose.toLowerCase()} businesses`
      : 'your business'
    return (
      <div className="min-h-screen bg-white">
        {/* Phone Banner */}
        <div className="bg-blue-600 text-white text-center py-2 sticky top-0 z-20">
          <a href="tel:1-800-222-6868" className="text-sm font-semibold hover:underline flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Need help? Call 1-800-222-6868
          </a>
        </div>
        <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 40px)' }}>
          {!loadingDone ? (
            <>
              <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-6" />
              <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
                Checking {formData.businessState} requirements...
              </h2>
              <p className="text-slate-500 text-center max-w-sm">
                We're reviewing {formData.businessState} laws and regulations for {industryText} to make sure we get everything right.
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center animate-[fadeIn_0.4s_ease-out]">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-[pulse_1s_ease-in-out_infinite]">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
                Got it — research complete!
              </h2>
              <p className="text-slate-500 text-center max-w-sm">
                We've got everything we need for {formData.businessState}. Let's keep going.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Success screen
  if (submitted) {
    const STATUS_STEPS = [
      { label: 'Order Submitted', description: 'Your formation request has been received' },
      { label: 'Processing with State', description: `Filing with the state of ${formData.formationState}` },
      { label: 'Formation Approved', description: 'Your entity is officially registered' },
      { label: 'Subscription Begins', description: 'Your plan services activate' },
      { label: 'Onboarding Call', description: 'Meet with your advisor to get set up' },
    ]
    const TIME_SLOTS = [
      '9:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '1:00 PM', '2:00 PM',
      '3:00 PM', '4:00 PM',
    ]
    const minDate = new Date()
    minDate.setDate(minDate.getDate() + 14)
    const minDateStr = minDate.toISOString().split('T')[0]

    return (
      <div className="min-h-screen bg-white">
        <div className="bg-blue-600 text-white text-center py-2 sticky top-0 z-20">
          <a href="tel:1-800-222-6868" className="text-sm font-semibold hover:underline flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Need help? Call 1-800-222-6868
          </a>
        </div>

        <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Submitted!</h1>
            <p className="text-slate-500">
              Your <span className="font-semibold text-slate-700">{formData.entityName}</span> formation is being processed.
            </p>
            <p className="text-sm text-slate-400 mt-1">
              A confirmation email has been sent to <span className="font-medium text-slate-600">{formData.owners[0]?.email}</span>.
            </p>
          </div>

          {/* Status Tracker */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700">Formation Progress</h3>
            </div>
            <div className="px-5 py-4">
              {STATUS_STEPS.map((s, i) => {
                const isCompleted = i === 0
                const isLast = i === STATUS_STEPS.length - 1
                return (
                  <div key={s.label} className="flex gap-3">
                    {/* Timeline line + dot */}
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-200 text-slate-400'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 my-1 ${isCompleted ? 'bg-green-300' : 'bg-slate-200'}`} />
                      )}
                    </div>
                    {/* Content */}
                    <div className={`pb-4 ${isLast ? 'pb-0' : ''}`}>
                      <p className={`text-sm font-semibold ${isCompleted ? 'text-green-700' : 'text-slate-700'}`}>
                        {s.label}
                      </p>
                      <p className="text-xs text-slate-400">{s.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Onboarding Scheduler */}
          <div className="border border-blue-200 bg-blue-50 rounded-xl overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-blue-200">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Schedule Your Onboarding Call
              </h3>
            </div>
            <div className="px-5 py-4 space-y-4">
              <p className="text-sm text-slate-600">
                Meet with your advisor approximately 20 days after formation to get bookkeeping, tax prep, and compliance running smoothly for <span className="font-semibold text-slate-900">{formData.entityName}</span>.
              </p>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  min={minDateStr}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Preferred Time Slot */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Preferred Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setScheduleTime(slot)}
                      className={`py-2 px-1 rounded-lg text-xs font-medium transition-all
                        ${scheduleTime === slot
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm */}
              <button
                disabled={!scheduleDate || !scheduleTime}
                className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Confirm Onboarding Call
              </button>

              <p className="text-xs text-slate-400 text-center">
                We'll send a calendar invite to {formData.owners[0]?.email} with your call details.
              </p>
            </div>
          </div>

          {/* Start new */}
          <button
            onClick={() => {
              setSubmitted(false)
              setStep(1)
              setFormData(INITIAL_FORM_DATA)
              setScheduleDate('')
              setScheduleTime('')
            }}
            className="w-full text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors text-center"
          >
            Start a new formation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Phone Banner */}
      <div className="bg-blue-600 text-white text-center py-2 sticky top-0 z-20">
        <a href="tel:1-800-222-6868" className="text-sm font-semibold hover:underline flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          Need help? Call 1-800-222-6868
        </a>
      </div>

      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-[40px] z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 text-lg">1-800Accountant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Secure & Encrypted
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <ProgressBar currentStep={step} />

        {/* Step content */}
        <div className="mb-8">
          {nonprofitSchedule ? (
            <NonProfitScheduleStep formData={formData} onBack={() => setNonprofitSchedule(false)} />
          ) : showTaxSavings ? (
            <TaxSavingsStep onBack={() => setShowTaxSavings(false)} />
          ) : (
            <>
              {step === 1 && <BusinessBasicsStep formData={formData} onChange={updateForm} />}
              {step === 2 && <EntityQuestionStep formData={formData} onChange={updateForm} />}
              {step === 3 && <BusinessNameStep formData={formData} onChange={updateForm} />}
              {step === 4 && <OwnerInfoStep formData={formData} onChange={updateForm} />}
              {step === 5 && <EntityTypeStep formData={formData} onChange={updateForm} />}
              {step === 6 && <CompanyInfoStep formData={formData} onChange={updateForm} />}
              {step === 7 && <MembersStep formData={formData} onChange={updateForm} />}
              {step === 8 && <PackageStep formData={formData} onChange={updateForm} />}
              {step === 9 && <ReviewStep formData={formData} onChange={updateForm} goToStep={goToStep} />}
              {step === 10 && <CheckoutStep formData={formData} onChange={updateForm} />}
            </>
          )}
        </div>

        {/* Navigation */}
        {!nonprofitSchedule && !showTaxSavings && (
          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            {step > 1 ? (
              <button
                onClick={back}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
              </button>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS ? (
              <button
                onClick={next}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {step === 1 ? "Let's Go" : step === 2 && formData.hasEntity === 'no' ? 'Start Saving on Taxes' : step === 2 && formData.hasEntity === 'yes' ? 'See My Tax Savings Potential' : step === 9 ? 'Checkout' : 'Continue'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Launch {formData.entityName || 'Your Business'}!
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 mt-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>1-800Accountant Entity Formation Services</span>
          <div className="flex items-center gap-4">
            <span>256-bit SSL Encryption</span>
            <span>Money-Back Guarantee</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
