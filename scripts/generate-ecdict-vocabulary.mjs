import fs from 'node:fs'

const vocabSource = fs.readFileSync('lib/vocabulary.ts', 'utf8')
const dictionary = JSON.parse(fs.readFileSync('node_modules/ecdict/data/dict.json', 'utf8'))

const dict = new Map()
for (const entry of dictionary) {
  if (entry.word && entry.translation) {
    dict.set(entry.word.toLowerCase(), entry)
  }
}

const words = []
const seen = new Set()
for (const section of vocabSource.matchAll(/words:\s*\[(.*?)\]/gs)) {
  for (const match of section[1].matchAll(/'([^']+)'/g)) {
    const word = match[1]
    const key = word.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      words.push(word)
    }
  }
}

const POS_MAP = new Map([
  ['n', 'n.'],
  ['v', 'v.'],
  ['vi', 'v.'],
  ['vt', 'v.'],
  ['a', 'adj.'],
  ['adj', 'adj.'],
  ['ad', 'adv.'],
  ['adv', 'adv.'],
  ['prep', 'prep.'],
  ['conj', 'conj.'],
  ['pron', 'pron.'],
  ['num', 'num.'],
  ['int', 'int.'],
  ['interj', 'interj.'],
  ['abbr', 'abbr.'],
])

function cleanText(text) {
  return text
    .replace(/\[网络\].*$/u, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/[,，]\s*/g, '；')
    .replace(/\s+/g, '')
    .replace(/；{2,}/g, '；')
    .replace(/^；|；$/g, '')
}

function parseTranslation(translation) {
  const senses = []
  const merged = new Map()
  for (const rawLine of translation.split(/(?:\n|\\n)+/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('[网络]')) continue

    const match = line.match(/^([a-z.]+)\s*(.+)$/i)
    if (!match) continue
    const rawPos = match[1].replace(/\.$/, '').toLowerCase()
    const partOfSpeech = POS_MAP.get(rawPos)
    if (!partOfSpeech) continue
    const text = cleanText(match[2])
    if (!text) continue

    const current = merged.get(partOfSpeech)
    merged.set(partOfSpeech, current ? `${current}；${text}` : text)
  }

  for (const [partOfSpeech, text] of merged) {
    const translation = text.split('；').filter(Boolean).slice(0, 4).join('；')
    if (translation) senses.push({ partOfSpeech, translation })
  }

  return senses.slice(0, 4)
}

function resolveEntry(word) {
  const lower = word.toLowerCase()
  const candidates = [
    lower,
    lower.replace(/-/g, ''),
    lower.replace(/-/g, ' '),
  ]

  for (const candidate of candidates) {
    const entry = dict.get(candidate)
    if (entry) return entry
  }
  return undefined
}

function escapeTs(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

const records = []
const missing = []
for (const word of words) {
  const entry = resolveEntry(word)
  const senses = entry ? parseTranslation(entry.translation) : []
  if (senses.length === 0) {
    missing.push(word)
    continue
  }
  records.push({ word, senses })
}

const lines = [
  'import type { VocabularySense } from \'./vocabularyDetails\'',
  '',
  'export const GENERATED_VOCABULARY_DETAILS: Record<string, VocabularySense[]> = {',
]

for (const record of records) {
  const senses = record.senses
    .map((sense) => `{ partOfSpeech: '${escapeTs(sense.partOfSpeech)}', translation: '${escapeTs(sense.translation)}' }`)
    .join(', ')
  lines.push(`  '${escapeTs(record.word.toLowerCase())}': [${senses}],`)
}

lines.push('}')
lines.push('')
fs.writeFileSync('lib/vocabularyGenerated.ts', lines.join('\n'), 'utf8')
fs.writeFileSync('scripts/ecdict-missing-vocabulary.txt', missing.join('\n'), 'utf8')

console.log(`Generated ${records.length} entries`)
console.log(`Missing ${missing.length} entries`)
