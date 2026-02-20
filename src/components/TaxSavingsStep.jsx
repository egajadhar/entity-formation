import { useState, useEffect, useRef } from 'react'

const REVENUE_OPTIONS = [
  { id: 'under-25k', label: 'Under $25k', topValue: 25000 },
  { id: '25k-50k', label: '$25k–$50k', topValue: 50000 },
  { id: '50k-100k', label: '$50k–$100k', topValue: 100000 },
  { id: '100k-250k', label: '$100k–$250k', topValue: 250000 },
  { id: '250k-plus', label: '$250k+', topValue: 250000 },
]

const TEAM_OPTIONS = [
  { id: 'solo', label: 'Just me' },
  { id: '1-2', label: '1–2' },
  { id: '3-5', label: '3–5' },
  { id: '6-plus', label: '6+' },
]

const SE_CAP = 184500

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM',
]

function AnimatedCounter({ target, duration = 1500 }) {
  const [value, setValue] = useState(0)
  const prevTarget = useRef(0)

  useEffect(() => {
    const start = prevTarget.current
    prevTarget.current = target
    const startTime = performance.now()

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(start + (target - start) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [target, duration])

  return <>{value.toLocaleString()}</>
}

export default function TaxSavingsStep({ onBack }) {
  const [revenue, setRevenue] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [taxRate, setTaxRate] = useState(25)
  const [showResults, setShowResults] = useState(false)
  const [showScheduler, setShowScheduler] = useState(false)
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')

  const revenueObj = REVENUE_OPTIONS.find((r) => r.id === revenue)
  const revenueValue = revenueObj?.topValue || 0
  const seRevenue = Math.min(revenueValue, SE_CAP)
  const seSavings = Math.round(seRevenue * 0.153)
  const deductionSavings = Math.round(revenueValue * 0.10 * (taxRate / 100))
  const totalSavings = seSavings + deductionSavings

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  function handleCalculate() {
    setShowResults(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleUnlock() {
    setShowScheduler(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Scheduler page
  if (showScheduler) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Schedule Your Tax Savings Consultation
          </h2>
          <p className="text-slate-500">
            Meet with a Small Business Tax Consultant to learn how to unlock up to <span className="font-semibold text-green-600">${totalSavings.toLocaleString()}/yr</span> in savings.
          </p>
        </div>

        {/* What to expect */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            In your free consultation, your advisor will:
          </h3>
          <ul className="space-y-2.5">
            {[
              'Review your current business structure and tax situation',
              'Identify self-employment tax reduction strategies',
              'Uncover deductions you may be missing',
              'Build a personalized plan to maximize your savings',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Date & Time */}
        <div className="space-y-5">
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
        </div>

        {/* Confirm */}
        <button
          disabled={!scheduleDate || !scheduleTime}
          className="w-full mt-6 bg-blue-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Confirm Consultation
        </button>

        <p className="text-xs text-slate-400 text-center mt-3">
          A Small Business Tax Consultant will reach out to confirm your appointment.
        </p>

        {/* Back */}
        <button
          onClick={() => setShowScheduler(false)}
          className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Savings Estimate
        </button>
      </div>
    )
  }

  // Calculator page
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {showResults ? 'Your estimated tax savings' : "Let's find your hidden tax savings"}
        </h2>
        <p className="text-slate-500">
          {showResults
            ? 'Adjust your answers below to see how your savings change.'
            : "Answer 3 quick questions and we'll estimate how much more you could save."}
        </p>
      </div>

      {/* Results Panel */}
      {showResults && (
        <div className="mb-8 animate-[fadeIn_0.4s_ease-out]">
          {/* Big Counter */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-4">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
              Estimated Annual Savings
            </p>
            <p className="text-5xl font-bold text-green-700">
              $<AnimatedCounter target={totalSavings} />
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Self-Employment Tax Savings</p>
              <p className="text-xl font-bold text-slate-900">
                $<AnimatedCounter target={seSavings} />
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">Additional Deduction Savings</p>
              <p className="text-xl font-bold text-slate-900">
                $<AnimatedCounter target={deductionSavings} />
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Q1: Revenue */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            What's your annual revenue?
          </label>
          {!showResults && (
            <p className="text-sm text-slate-400 mb-3">
              Select the range that best matches your business income.
            </p>
          )}
          <div className="grid grid-cols-1 gap-2 mt-2">
            {REVENUE_OPTIONS.map((opt) => {
              const selected = revenue === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => setRevenue(opt.id)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all text-center
                    ${selected
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                    }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Q2: Team Size */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            How many people work for you?
          </label>
          {!showResults && (
            <p className="text-sm text-slate-400 mb-3">
              Include yourself, employees, and regular contractors.
            </p>
          )}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {TEAM_OPTIONS.map((opt) => {
              const selected = teamSize === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => setTeamSize(opt.id)}
                  className={`py-2.5 px-2 rounded-xl text-sm font-semibold transition-all
                    ${selected
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                    }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Q3: Tax Rate Slider */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            What's your current effective tax rate?
          </label>
          {!showResults && (
            <p className="text-sm text-slate-400 mb-4">
              Best guess is fine — most contractors pay 25%–35%.
            </p>
          )}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-2">
            <div className="text-center mb-4">
              <span className="text-3xl font-bold text-slate-900">{taxRate}%</span>
            </div>
            <input
              type="range"
              min={15}
              max={40}
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>15%</span>
              <span>40%</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      {!showResults ? (
        <button
          onClick={handleCalculate}
          disabled={!revenue || !teamSize}
          className="w-full mt-8 bg-blue-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          Calculate My Tax Savings
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleUnlock}
          className="w-full mt-8 bg-green-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
        >
          Unlock Tax Savings
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </button>
      )}

      {/* Back link */}
      <button
        onClick={onBack}
        className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>
    </div>
  )
}
