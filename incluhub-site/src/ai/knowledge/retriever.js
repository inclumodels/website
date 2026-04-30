import rawKnowledge from '../../../knowledge-base/incluhub_website_kb.md?raw'

function normalize(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
}

function tokenize(text) {
  return normalize(text).split(/\s+/).filter(Boolean)
}

function toSections(markdown) {
  const lines = markdown.split('\n')
  const sections = []
  let current = { title: 'General', body: '' }

  for (const line of lines) {
    if (/^#{2,4}\s+/.test(line)) {
      if (current.body.trim()) sections.push(current)
      current = { title: line.replace(/^#{2,4}\s+/, '').trim(), body: '' }
      continue
    }
    current.body += `${line}\n`
  }

  if (current.body.trim()) sections.push(current)
  return sections
}

const sections = toSections(rawKnowledge)

function scoreSection(section, queryTokens) {
  const text = `${section.title}\n${section.body}`
  const hayTokens = tokenize(text)
  const bag = new Set(hayTokens)

  let score = 0
  for (const token of queryTokens) {
    if (bag.has(token)) score += 1
  }
  // small boost for title matches
  const titleBag = new Set(tokenize(section.title))
  for (const token of queryTokens) {
    if (titleBag.has(token)) score += 1.5
  }
  return score
}

export function retrieveKnowledgeContext({ query, maxSections = 4 }) {
  const queryTokens = tokenize(query).slice(0, 40)
  if (!queryTokens.length) {
    return sections.slice(0, maxSections).map(s => `## ${s.title}\n${s.body.trim()}`).join('\n\n')
  }

  const ranked = sections
    .map(section => ({ section, score: scoreSection(section, queryTokens) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSections)
    .map(item => `## ${item.section.title}\n${item.section.body.trim()}`)

  if (!ranked.length) {
    return sections.slice(0, maxSections).map(s => `## ${s.title}\n${s.body.trim()}`).join('\n\n')
  }

  return ranked.join('\n\n')
}

export function getKnowledgeSourcePath() {
  return 'knowledge-base/incluhub_website_kb.md'
}
