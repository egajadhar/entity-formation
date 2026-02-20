import { ENTITY_TYPES } from '../data/constants'

const PLANS = [
  { id: 'independent', prefix: 'Independent Operator', biannualPrice: 199, annualPrice: 398 },
  { id: 'covered', prefix: 'Covered', biannualPrice: 299, annualPrice: 598 },
]

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

function Section({ title, onEdit, children }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between bg-slate-50 px-5 py-3 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <button
          onClick={onEdit}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Edit
        </button>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-1.5">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900 text-right max-w-[60%]">{value || '—'}</span>
    </div>
  )
}

export default function ReviewStep({ formData, onChange, goToStep }) {
  const entity = ENTITY_TYPES.find((e) => e.id === formData.entityType)
  const plan = PLANS.find((p) => p.id === formData.selectedPackage)
  const industry = formData.purpose && formData.purpose !== 'Other' ? formData.purpose : ''
  const planName = plan ? `${plan.prefix}${industry ? ` ${industry}` : ''} Plan` : '—'
  const filingFee = STATE_FILING_FEES[formData.formationState] || null
  const suffix = formData.entityType === 'llc' ? ', LLC' :
    formData.entityType === 'corporation' || formData.entityType === 's-corp' ? ', Inc.' :
    formData.entityType === 'lp' ? ', LP' : ''

  const addr = formData.address
  const fullAddress = [addr.street, addr.suite, addr.city, addr.state, addr.zip]
    .filter(Boolean)
    .join(', ')


  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Review & Submit</h2>
      <p className="text-slate-500 mb-8">
        Please review your information before submitting your order.
      </p>

      <div className="space-y-4">
        {/* Entity */}
        <Section title="Entity Type & State" onEdit={() => goToStep(5)}>
          <Row label="Entity Type" value={entity?.fullName} />
          <Row label="State of Formation" value={formData.formationState} />
        </Section>

        {/* Company */}
        <Section title="Business Address" onEdit={() => goToStep(6)}>
          <Row label="Entity Name" value={`${formData.entityName}${suffix}`} />
          <Row label="Address" value={fullAddress} />
        </Section>

        {/* Members */}
        <Section title={entity?.memberLabel || 'Members'} onEdit={() => goToStep(7)}>
          {formData.members.map((m, i) => (
            <div key={i} className={i > 0 ? 'border-t border-slate-100 pt-2 mt-2' : ''}>
              <Row label={`Person ${i + 1}`} value={`${m.firstName} ${m.lastName}`} />
              <Row label="Title" value={m.title} />
              <Row label="Email" value={m.email} />
              {m.ownership && <Row label="Ownership" value={`${m.ownership}%`} />}
            </div>
          ))}
        </Section>

        {/* Plan */}
        <Section title="Selected Plan" onEdit={() => goToStep(8)}>
          <Row label="Plan" value={planName} />
          {plan && (
            <Row label="Plan Cost" value={`$${plan.biannualPrice} x 2 payments ($${plan.annualPrice}/yr) — billed after filing`} />
          )}
          <Row
            label="State Filing Fee"
            value={filingFee ? `$${filingFee} (${formData.formationState}) — due now` : '—'}
          />
        </Section>

        {/* Terms */}
        <p className="text-xs text-slate-400 text-center leading-relaxed">
          By submitting this order, you agree to our Terms of Service and Privacy Policy.
          Formation processing times vary by state, typically 1-4 weeks for standard filing.
        </p>
      </div>
    </div>
  )
}
