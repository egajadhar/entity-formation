import { ENTITY_TYPES } from '../data/constants'
import { useLanguage } from '../contexts/LanguageContext'

const TITLES = {
  llc: ['Member', 'Manager', 'Managing Member'],
  corporation: ['Director', 'President', 'Vice President', 'Secretary', 'Treasurer', 'CEO', 'CFO', 'COO'],
  's-corp': ['Director', 'President', 'Vice President', 'Secretary', 'Treasurer', 'CEO', 'CFO', 'COO'],
  nonprofit: ['Director', 'President', 'Vice President', 'Secretary', 'Treasurer'],
  lp: ['General Partner', 'Limited Partner'],
}

export default function MembersStep({ formData, onChange }) {
  const { t } = useLanguage()
  const entity = ENTITY_TYPES.find((e) => e.id === formData.entityType)
  const titles = TITLES[formData.entityType] || ['Member']
  const totalOwnership = formData.members.reduce((sum, m) => sum + (parseFloat(m.ownership) || 0), 0)
  const hasAnyOwnership = formData.members.some((m) => m.ownership !== '')
  const ownershipValid = totalOwnership === 100

  function updateMember(index, field, value) {
    const updated = formData.members.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    )
    onChange({ members: updated })
  }

  function addMember() {
    onChange({
      members: [
        ...formData.members,
        { firstName: '', lastName: '', title: '', email: '', ownership: '' },
      ],
    })
  }

  function removeMember(index) {
    if (formData.members.length <= 1) return
    onChange({ members: formData.members.filter((_, i) => i !== index) })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        {entity?.memberLabel || 'Members'}
      </h2>
      <p className="text-slate-500 mb-8">
        {t('members.sub', { entity: entity?.fullName || 'entity' })}
      </p>

      <div className="space-y-4">
        {formData.members.map((member, index) => (
          <div
            key={index}
            className="bg-slate-50 border border-slate-200 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-700">
                {t('members.personN', { n: index + 1 })}
              </span>
              {formData.members.length > 1 && (
                <button
                  onClick={() => removeMember(index)}
                  className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  {t('members.remove')}
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {t('members.firstName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.firstName}
                    onChange={(e) => updateMember(index, 'firstName', e.target.value)}
                    placeholder={t('members.firstPH')}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {t('members.lastName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.lastName}
                    onChange={(e) => updateMember(index, 'lastName', e.target.value)}
                    placeholder={t('members.lastPH')}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {t('members.titleRole')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={member.title}
                    onChange={(e) => updateMember(index, 'title', e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">{t('members.titlePH')}</option>
                    {titles.map((title) => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {t('members.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => updateMember(index, 'email', e.target.value)}
                    placeholder={t('members.emailPH')}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="sm:w-1/2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {t('members.ownership')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={member.ownership}
                    onChange={(e) => updateMember(index, 'ownership', e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addMember}
        className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        {t('members.addAnother')}
      </button>

      {hasAnyOwnership && (
        <div className={`mt-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${
          ownershipValid
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {ownershipValid ? (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          )}
          <span>
            {ownershipValid
              ? t('members.ownershipValid')
              : t('members.ownershipInvalid', { total: totalOwnership })}
          </span>
        </div>
      )}
    </div>
  )
}
