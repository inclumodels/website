const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
const PHONE_REGEX = /(?:\+?\d[\d\s-]{7,}\d)/g

function uniq(items) {
  return Array.from(new Set(items.filter(Boolean)))
}

export function extractLeadFromText(text) {
  const emails = uniq((text.match(EMAIL_REGEX) || []).map(v => v.trim()))
  const phones = uniq((text.match(PHONE_REGEX) || []).map(v => v.trim()))
  if (!emails.length && !phones.length) return null

  return {
    emails,
    phones,
    capturedAt: new Date().toISOString(),
    source: 'Dedicated Manager Chat',
  }
}

export function persistLead(lead) {
  if (!lead || typeof window === 'undefined') return
  const key = 'incluhub.capturedLeads'
  const existing = JSON.parse(window.localStorage.getItem(key) || '[]')
  existing.push(lead)
  window.localStorage.setItem(key, JSON.stringify(existing.slice(-200)))
}
