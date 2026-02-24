import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'


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

function AnimatedCounter({ target, duration = 1800, startDelay = 0 }) {
  const [value, setValue] = useState(0)
  const prevTarget = useRef(0)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const start = prevTarget.current
    prevTarget.current = target
    const delay = isFirstRender.current ? startDelay : 0
    isFirstRender.current = false

    let rafId
    let timeoutId

    const startAnimation = () => {
      const startTime = performance.now()
      function tick(now) {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(start + (target - start) * eased))
        if (progress < 1) rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)
    }

    if (delay > 0) {
      timeoutId = setTimeout(startAnimation, delay)
    } else {
      startAnimation()
    }

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(rafId)
    }
  }, [target, duration, startDelay])

  return <>{value.toLocaleString()}</>
}

const FIREWORK_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f97316']

function FireworkBurst({ left, top, delay = 0 }) {
  const count = 18
  const particles = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2
    const distance = 48 + (i % 4) * 20
    return {
      x: Math.round(Math.cos(angle) * distance),
      y: Math.round(Math.sin(angle) * distance),
      color: FIREWORK_COLORS[i % FIREWORK_COLORS.length],
      size: [7, 5, 8, 4, 6, 5][i % 6],
      pDelay: delay + (i % 6) * 0.04,
    }
  })

  return (
    <div style={{ position: 'absolute', left, top, pointerEvents: 'none', zIndex: 30 }}>
      {/* Expanding ring */}
      <div style={{
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: '50%',
        border: '2px solid rgba(34,197,94,0.7)',
        animation: `fireworkRing 0.9s ease-out ${delay}s both`,
      }} />
      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: p.color,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
            animation: `fireworkBurst 1s ease-out ${p.pDelay}s both`,
            '--fw-x': `${p.x}px`,
            '--fw-y': `${p.y}px`,
          }}
        />
      ))}
    </div>
  )
}

export default function TaxSavingsStep({ onBack, onContinue, onSavingsCalculated, variant, prefilledRevenue, isOperating }) {
  const { t } = useLanguage()
  const isEstimate = variant === 'estimate'

  const REVENUE_OPTIONS = [
    { id: 'under-25k', label: t('hustle.rev1'), topValue: 25000 },
    { id: '25k-50k', label: t('hustle.rev2'), topValue: 50000 },
    { id: '50k-100k', label: t('hustle.rev3'), topValue: 100000 },
    { id: '100k-250k', label: t('hustle.rev4'), topValue: 250000 },
    { id: '250k-plus', label: t('hustle.rev5'), topValue: 250000 },
  ]
  const [revenue, setRevenue] = useState(prefilledRevenue || '')
  const [teamSize, setTeamSize] = useState('solo')
  const [taxRate, setTaxRate] = useState(25)
  const [showResults, setShowResults] = useState(!!prefilledRevenue)
  const [showFireworks, setShowFireworks] = useState(!!prefilledRevenue)
  const [showScheduler, setShowScheduler] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
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

  const revenueLabel = isOperating === 'yes'
    ? t('tax.revenueYes')
    : isOperating === 'no'
    ? t('tax.revenueNo')
    : t('tax.revenueDefault')

  // Auto-hide fireworks after animation completes
  useEffect(() => {
    if (showFireworks) {
      const timer = setTimeout(() => setShowFireworks(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [showFireworks])

  // Fire savings callback whenever results are showing and values change
  useEffect(() => {
    if (showResults && onSavingsCalculated) {
      onSavingsCalculated({ total: totalSavings, deduction: deductionSavings })
    }
  }, [showResults, totalSavings, deductionSavings])

  function handleCalculate() {
    setShowResults(true)
    setShowFireworks(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleUnlock() {
    if (onContinue) {
      onContinue()
    } else {
      setShowScheduler(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Scheduler page
  if (showScheduler) {
    const schedulerItems = [
      t('tax.scheduler.i1'),
      t('tax.scheduler.i2'),
      t('tax.scheduler.i3'),
      t('tax.scheduler.i4'),
    ]

    return (
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {t('tax.scheduler.title')}
          </h2>
          <p className="text-slate-500">
            {t('tax.scheduler.sub')}{' '}
            <span className="font-semibold text-green-600">${totalSavings.toLocaleString()}/yr</span>
            {t('tax.scheduler.subEnd')}
          </p>
        </div>

        {/* What to expect */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            {t('tax.scheduler.advisorTitle')}
          </h3>
          <ul className="space-y-2.5">
            {schedulerItems.map((item) => (
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
              {t('tax.scheduler.dateLabel')}
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
              {t('tax.scheduler.timeLabel')}
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
          {t('tax.scheduler.confirmBtn')}
        </button>

        <p className="text-xs text-slate-400 text-center mt-3">
          {t('tax.scheduler.confirmNote')}
        </p>

        {/* Back */}
        <button
          onClick={() => setShowScheduler(false)}
          className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          {t('tax.scheduler.back')}
        </button>
      </div>
    )
  }

  // Calculator page
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {showResults ? t('tax.titleResults') : t('tax.titleInitial')}
        </h2>
        <p className="text-slate-500">
          {showResults
            ? t('tax.subResults')
            : isEstimate
              ? t('tax.subEstimate')
              : t('tax.subDefault')}
        </p>
      </div>

      {/* Results Panel */}
      {showResults && (
        <div className="mb-8 animate-[fadeIn_0.4s_ease-out] relative">
          {/* Fireworks */}
          {showFireworks && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', zIndex: 30 }}>
              <FireworkBurst left="50%" top="35%" delay={0.05} />
              <FireworkBurst left="18%" top="55%" delay={0.22} />
              <FireworkBurst left="82%" top="48%" delay={0.38} />
            </div>
          )}

          {/* Big Counter */}
          <div
            className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-4 relative overflow-hidden"
            style={showFireworks ? { animation: 'savingsPulse 0.9s ease-out 0.1s both' } : {}}
          >
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
              {t('tax.annualSavings')}
            </p>
            <p className="text-5xl font-bold text-green-700">
              $<AnimatedCounter target={totalSavings} startDelay={150} />
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t('tax.seSavings')}</p>
              <p className="text-xl font-bold text-slate-900">
                $<AnimatedCounter target={seSavings} startDelay={350} />
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{t('tax.deductionSavings')}</p>
              <p className="text-xl font-bold text-slate-900">
                $<AnimatedCounter target={deductionSavings} startDelay={350} />
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inline questions — only shown before results are calculated */}
      {!showResults && (
        <div className="space-y-8">
          {/* Q1: Revenue */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {revenueLabel}
            </label>
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
              {t('tax.teamLabel')}
            </label>
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
              {t('tax.bracketLabel')}
            </label>
            <p className="text-sm text-slate-400 mb-4">
              {t('tax.bracketHelper')}
            </p>
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
      )}

      {/* Edit assumptions button — only shown when results are visible */}
      {showResults && (
        <button
          onClick={() => setShowEditModal(true)}
          className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
          </svg>
          {t('tax.editAssumptions')}
        </button>
      )}

      {/* CTAs */}
      {!showResults ? (
        <button
          onClick={handleCalculate}
          disabled={!revenue || !teamSize}
          className="w-full mt-8 bg-blue-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {t('tax.calculateBtn')}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      ) : isEstimate ? (
        <button
          onClick={onContinue}
          className="w-full mt-6 bg-green-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
        >
          {t('tax.lockBtn')}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleUnlock}
          className="w-full mt-6 bg-green-600 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
        >
          {t('tax.unlockBtn')}
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
        {t('tax.back')}
      </button>

      {/* Edit Assumptions Side Drawer */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-white w-80 h-full shadow-2xl flex flex-col animate-[slideInRight_0.25s_ease-out]">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0">
              <h3 className="text-base font-bold text-slate-900">{t('tax.editAssumptions')}</h3>
              <button onClick={() => setShowEditModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Drawer body */}
            <div className="overflow-y-auto px-5 py-5 space-y-7">
              {/* Q1: Revenue */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  {revenueLabel}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {REVENUE_OPTIONS.map((opt) => {
                    const selected = revenue === opt.id
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setRevenue(opt.id)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all text-center
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
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  {t('tax.teamLabel')}
                </label>
                <div className="grid grid-cols-4 gap-2">
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
                  {t('tax.bracketLabel')}
                </label>
                <p className="text-xs text-slate-400 mb-4">
                  {t('tax.bracketHelper')}
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
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
            {/* Drawer footer */}
            <div className="px-5 py-4 border-t border-slate-200 flex-shrink-0">
              <button
                onClick={() => setShowEditModal(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all"
              >
                {t('tax.updateBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
