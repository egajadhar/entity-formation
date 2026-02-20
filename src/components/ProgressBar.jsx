const STEPS = [
  { label: 'Entity Type' },
  { label: 'Address' },
  { label: 'People' },
  { label: 'Package' },
  { label: 'Review' },
  { label: 'Checkout' },
]

export default function ProgressBar({ currentStep }) {
  // Don't show progress bar on intro/conversational screens (steps 1-4)
  if (currentStep <= 4) return null

  // Map actual step number to displayed step (step 5 = displayed 1, etc.)
  const displayStep = currentStep - 4

  return (
    <div className="w-full mb-10">
      {/* Desktop stepper */}
      <div className="hidden md:flex items-center justify-between">
        {STEPS.map((step, i) => {
          const stepNum = i + 1
          const isActive = stepNum === displayStep
          const isCompleted = stepNum < displayStep
          return (
            <div key={i} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                    ${isCompleted ? 'bg-blue-600 text-white' : ''}
                    ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100' : ''}
                    ${!isActive && !isCompleted ? 'bg-slate-200 text-slate-500' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isActive || isCompleted ? 'text-blue-600' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 -mt-5 ${
                    stepNum < displayStep ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile stepper */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-blue-600">
            Step {displayStep} of {STEPS.length}
          </span>
          <span className="text-sm text-slate-500">{STEPS[displayStep - 1].label}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(displayStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
