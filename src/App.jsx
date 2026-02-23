import { useState } from 'react'
import './App.css'
import { INITIAL_FORM_DATA } from './data/constants'
import { useLanguage } from './contexts/LanguageContext'
import LandingPage from './components/LandingPage'
import ProgressBar from './components/ProgressBar'
import BusinessBasicsStep from './components/BusinessBasicsStep'
import SideHustleStep from './components/SideHustleStep'
import LocationIndustryStep from './components/LocationIndustryStep'
import EntityQuestionStep from './components/EntityQuestionStep'
import EntityTypeStep from './components/EntityTypeStep'
import CompanyInfoStep from './components/CompanyInfoStep'
import MembersStep from './components/MembersStep'
import PackageStep from './components/PackageStep'
import CheckoutStep from './components/CheckoutStep'
import NonProfitScheduleStep from './components/NonProfitScheduleStep'
import TaxSavingsStep from './components/TaxSavingsStep'
import RegisteredAgentStep from './components/RegisteredAgentStep'

const TOTAL_STEPS = 9

function LanguageDropdown() {
  const { lang, setLang } = useLanguage()
  return (
    <div className="relative ml-3 flex-shrink-0">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="appearance-none bg-blue-700 text-white text-xs font-semibold pl-2 pr-6 py-1 rounded cursor-pointer hover:bg-blue-800 transition-colors focus:outline-none"
      >
        <option value="en" className="text-slate-900 bg-white">EN — English</option>
        <option value="es" className="text-slate-900 bg-white">ES — Español</option>
      </select>
      <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  )
}

function App() {
  const { t } = useLanguage()
  const [showLanding, setShowLanding] = useState(true)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [nonprofitSchedule, setNonprofitSchedule] = useState(false)
  const [showTaxSavings, setShowTaxSavings] = useState(false)
  const [showTaxEstimate, setShowTaxEstimate] = useState(false)
  const [taxSavingsEstimate, setTaxSavingsEstimate] = useState(0)
  const [deductionSavingsEstimate, setDeductionSavingsEstimate] = useState(0)
  const [showRegisteredAgent, setShowRegisteredAgent] = useState(false)
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')

  function updateForm(updates) {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  function next() {
    // Step 3 (Location/Industry) triggers loading screen
    if (step === 3) {
      setLoading(true)
      setLoadingDone(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        setLoadingDone(true)
      }, 3000)
      setTimeout(() => {
        setLoading(false)
        setLoadingDone(false)
        setStep(4)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 5000)
      return
    }
    // Existing entity: redirect to tax savings screen
    if (step === 4 && formData.hasEntity === 'yes') {
      setShowTaxSavings(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // New entity: show tax estimate screen before continuing
    if (step === 4 && formData.hasEntity === 'no' && !showTaxEstimate) {
      setShowTaxEstimate(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setShowTaxEstimate(false)
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
      case 1: {
        const o = formData.owners[0] || {}
        return !!(o.firstName && o.lastName && o.email && o.phone)
      }
      case 2:
        return !!(formData.isOperating && formData.annualRevenue)
      case 3:
        return !!(formData.businessState && formData.purpose)
      case 4:
        return !!(
          formData.hasEntity &&
          formData.entityName &&
          (formData.hasEntity === 'yes' || formData.startTimeline)
        )
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

  // Landing page
  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />
  }

  // Loading screen
  if (loading) {
    const industryText = formData.purpose && formData.purpose !== 'Other'
      ? `${formData.purpose.toLowerCase()} businesses`
      : 'your business'
    return (
      <div className="min-h-screen bg-white">
        {/* Phone Banner */}
        <div className="bg-blue-600 text-white py-2 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <a href="tel:1-800-222-6868" className="text-sm font-semibold hover:underline flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {t('app.helpBanner')}
            </a>
            <LanguageDropdown />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 40px)' }}>
          {!loadingDone ? (
            <>
              <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-6" />
              <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
                {t('loading.scanning', { state: formData.businessState, industry: industryText })}
              </h2>
              <p className="text-slate-500 text-center max-w-sm">
                {t('loading.scanSub', { state: formData.businessState, industry: industryText })}
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
                {t('loading.found')}
              </h2>
              <p className="text-slate-500 text-center max-w-sm">
                {t('loading.foundSub', { state: formData.businessState, industry: industryText })}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Post-submit Registered Agent screen (must be checked before submitted)
  if (showRegisteredAgent) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-blue-600 text-white py-2 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <a href="tel:1-800-222-6868" className="text-sm font-semibold hover:underline flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {t('app.helpBanner')}
            </a>
            <LanguageDropdown />
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
          <RegisteredAgentStep formData={formData} onChange={updateForm} onSubmit={() => setShowRegisteredAgent(false)} />
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => setShowRegisteredAgent(false)}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              {t('agent.backToOrder')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Success screen
  if (submitted) {
    const isExistingBusiness = formData.hasEntity === 'yes'
    const STATUS_STEPS = isExistingBusiness
      ? [
          { label: t('success.status1'), description: t('success.status1SubExisting') },
          { label: t('success.status3'), description: t('success.status3Sub') },
          { label: t('success.status4'), description: t('success.status4Sub') },
        ]
      : [
          { label: t('success.status1'), description: t('success.status1Sub') },
          { label: t('success.status2'), description: t('success.status2Sub') },
          { label: t('success.status3'), description: t('success.status3Sub') },
          { label: t('success.status4'), description: t('success.status4Sub') },
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
        <div className="bg-blue-600 text-white py-2 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <a href="tel:1-800-222-6868" className="text-sm font-semibold hover:underline flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {t('app.helpBanner')}
            </a>
            <LanguageDropdown />
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{t('success.title')}</h1>
            <p className="text-slate-500">
              {t('success.sub', { name: formData.entityName })}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {t('success.emailNote', { email: formData.owners[0]?.email })}
            </p>
          </div>

          {/* Status Tracker */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700">{t('success.progressTitle')}</h3>
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
                {t('success.schedulerTitle')}
              </h3>
            </div>
            <div className="px-5 py-4 space-y-4">
              <p className="text-sm text-slate-600">
                {t('success.schedulerDesc', { name: formData.entityName })}
              </p>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t('success.dateLabel')}
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
                  {t('success.timeLabel')}
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
                {t('success.confirmBtn')}
              </button>

              <p className="text-xs text-slate-400 text-center">
                {t('success.calendarNote', { email: formData.owners[0]?.email })}
              </p>
            </div>
          </div>

          {/* Set up Registered Agent */}
          {!isExistingBusiness && (
            <button
              onClick={() => setShowRegisteredAgent(true)}
              className="w-full mb-3 flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all"
            >
              {t('success.agentBtn')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}

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
            {t('success.newFormation')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Phone Banner */}
      <div className="bg-blue-600 text-white py-2 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="tel:1-800-222-6868" className="text-sm font-semibold hover:underline flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {t('app.helpBanner')}
          </a>
          <LanguageDropdown />
        </div>
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
            {t('app.secure')}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <ProgressBar currentStep={step} />

        {/* Persistent savings reminder — Business Structure through Savings Unlocked */}
        {step >= 5 && step <= 9 && !nonprofitSchedule && !showTaxSavings && !showTaxEstimate && (() => {
          const corpWarning = step === 5 && formData.entityType === 'corporation'
          const lowerPlanSelected = (step === 8 || step === 9) && formData.selectedPackage === 'independent'
          const isWarning = corpWarning || lowerPlanSelected
          const displayAmount = lowerPlanSelected ? deductionSavingsEstimate : taxSavingsEstimate
          const missedSavings = lowerPlanSelected && taxSavingsEstimate > deductionSavingsEstimate
            ? taxSavingsEstimate - deductionSavingsEstimate
            : 0
          if (!displayAmount) return null

          const warningIcon = (
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          )
          const dollarIcon = (
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )

          return (
            <div className={`mb-6 rounded-xl px-5 py-3.5 border transition-all duration-300 ${
              isWarning
                ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300'
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
            }`}>
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isWarning ? 'bg-amber-100' : 'bg-green-100'
                }`}>
                  {isWarning ? warningIcon : dollarIcon}
                </div>

                {/* Amount */}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold uppercase tracking-wide leading-none mb-0.5 ${
                    isWarning ? 'text-amber-600' : 'text-green-600'
                  }`}>
                    {t('banner.label')}
                  </p>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <p className={`text-xl font-extrabold leading-none ${
                      isWarning ? 'text-amber-700' : 'text-green-700'
                    }`}>
                      ${displayAmount.toLocaleString()}
                      <span className={`text-sm font-semibold ml-0.5 ${
                        isWarning ? 'text-amber-600' : 'text-green-600'
                      }`}>/yr</span>
                    </p>
                    {missedSavings > 0 && (
                      <span className="text-sm text-slate-400 line-through leading-none">
                        ${taxSavingsEstimate.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right pill */}
                {isWarning ? (
                  <div className="hidden sm:flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    {corpWarning ? t('banner.warningPill') : t('banner.lessPlans', { amount: missedSavings.toLocaleString() })}
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {t('banner.readyPill')}
                  </div>
                )}
              </div>

              {/* Applied to return & books note */}
              {!isWarning && (
                <p className="mt-2 text-sm text-green-700 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {t('banner.applyNote')}
                </p>
              )}

              {/* Warning message row */}
              {corpWarning && (
                <p className="mt-2.5 text-xs text-amber-700 font-medium flex items-start gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  {t('banner.corpWarning')}
                </p>
              )}
              {missedSavings > 0 && (
                <p className="mt-2.5 text-xs text-amber-700 font-medium flex items-start gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  {t('banner.lowerPlanWarning', { amount: missedSavings.toLocaleString() })}
                </p>
              )}
            </div>
          )
        })()}

        {/* Step content */}
        <div className="mb-8">
          {nonprofitSchedule ? (
            <NonProfitScheduleStep formData={formData} onBack={() => setNonprofitSchedule(false)} />
          ) : showTaxSavings ? (
            <TaxSavingsStep
              onBack={() => setShowTaxSavings(false)}
              isOperating={formData.isOperating}
              prefilledRevenue={formData.annualRevenue}
              onSavingsCalculated={({ total, deduction }) => { setTaxSavingsEstimate(total); setDeductionSavingsEstimate(deduction) }}
              onContinue={() => {
                setShowTaxSavings(false)
                setStep(8)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          ) : showTaxEstimate ? (
            <TaxSavingsStep
              variant="estimate"
              prefilledRevenue={formData.annualRevenue}
              isOperating={formData.isOperating}
              onBack={() => setShowTaxEstimate(false)}
              onContinue={() => {
                setShowTaxEstimate(false)
                setFormData((prev) => ({
                  ...prev,
                  entityType: prev.entityType || 'llc',
                  formationState: prev.formationState || prev.businessState,
                }))
                setStep(5)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              onSavingsCalculated={({ total, deduction }) => { setTaxSavingsEstimate(total); setDeductionSavingsEstimate(deduction) }}
            />
          ) : (
            <>
              {step === 1 && <BusinessBasicsStep formData={formData} onChange={updateForm} />}
              {step === 2 && <SideHustleStep formData={formData} onChange={updateForm} />}
              {step === 3 && <LocationIndustryStep formData={formData} onChange={updateForm} />}
              {step === 4 && <EntityQuestionStep formData={formData} onChange={updateForm} />}
              {step === 5 && <EntityTypeStep formData={formData} onChange={updateForm} taxSavingsEstimate={taxSavingsEstimate} />}
              {step === 6 && <CompanyInfoStep formData={formData} onChange={updateForm} />}
              {step === 7 && <MembersStep formData={formData} onChange={updateForm} />}
              {step === 8 && <PackageStep formData={formData} onChange={updateForm} taxSavingsEstimate={taxSavingsEstimate} deductionSavingsEstimate={deductionSavingsEstimate} />}
              {step === 9 && <CheckoutStep formData={formData} onChange={updateForm} goToStep={goToStep} />}
            </>
          )}
        </div>

        {/* Navigation */}
        {!nonprofitSchedule && !showTaxSavings && !showTaxEstimate && (
          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            {step > 1 ? (
              <button
                onClick={back}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                {t('nav.back')}
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
                {step === 1
                  ? t('nav.letsGo')
                  : step === 2
                  ? t('nav.findSavings')
                  : step === 3
                  ? t('nav.letsGo')
                  : step === 4 && formData.hasEntity === 'no'
                  ? t('nav.startSaving')
                  : step === 4 && formData.hasEntity === 'yes'
                  ? t('nav.seePotential')
                  : t('nav.continue')}
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
                {t('nav.launch', { name: formData.entityName || 'Your Business' })}
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
          <span>{t('app.footer')}</span>
          <div className="flex items-center gap-4">
            <span>{t('app.ssl')}</span>
            <span>{t('app.guarantee')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
