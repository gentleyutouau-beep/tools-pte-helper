'use client'
import { useState } from 'react'
import { WE_TEMPLATE, WE_TEMPLATE_PLAIN } from '@/lib/data'
import { SlotBadge } from './SlotBadge'

const SLOT_EXAMPLES: Record<string, string[]> = {
  '观点句': [
    'this trend is generally beneficial to both individuals and society',
    'a balanced approach is necessary to maximize its benefits and reduce its risks',
    'its advantages outweigh its disadvantages in most situations',
    'it plays an important role in improving people\'s quality of life',
    'this practice should be encouraged because it creates more opportunities',
    'this issue should be carefully managed rather than simply accepted or rejected',
    'this development is necessary for social progress and long-term growth',
    'this policy is reasonable because it protects public interests',
    'this view is convincing because it reflects the needs of modern society',
    'this trend can bring positive results if it is supported by proper rules',
    'this issue requires joint efforts from individuals, businesses and governments',
    'this idea is practical because it helps people deal with real-life challenges',
    'the benefits of this development are more significant than its potential drawbacks',
    'this approach can make society more efficient, fair and sustainable',
  ],
  '两个领域': [
    'education and employment',
    'communication and daily life',
    'the economy and the environment',
    'personal growth and social development',
    'public services and individual wellbeing',
    'transportation and urban planning',
    'technology and information access',
    'health and public safety',
    'tourism and local culture',
    'law and social order',
    'media and public opinion',
    'business development and consumer behavior',
    'family life and personal wellbeing',
    'work efficiency and job satisfaction',
    'environmental protection and economic growth',
    'academic performance and practical skills',
    'cultural exchange and global understanding',
    'community development and social equality',
  ],
  '例子': [
    'many people can save time, reduce pressure and make better decisions in their daily lives',
    'students and workers can gain more useful knowledge and practical skills',
    'communities can become more efficient, convenient and well-organized',
    'people from different backgrounds can have better access to information and opportunities',
    'it allows people to deal with real-life problems in a more effective way',
    'public transportation can reduce traffic congestion and make commuting more affordable',
    'online learning enables students in remote areas to access high-quality educational resources',
    'digital materials can help learners study more flexibly and reduce the cost of printed books',
    'studying abroad allows young people to improve language skills and understand different cultures',
    'formal examinations can encourage students to review systematically and maintain academic discipline',
    'mass media can spread important information quickly during public emergencies',
    'television and online platforms can raise public awareness of social and environmental issues',
    'clear laws can discourage irresponsible behavior and protect vulnerable groups',
    'companies can use marketing to understand consumer needs and improve their services',
    'tourism can create jobs for local residents and support small businesses',
    'better city planning can provide residents with safer roads, cleaner parks and more convenient services',
    'protecting old buildings can help people preserve cultural identity and historical memory',
    'modern buildings can use energy-saving designs and provide safer living conditions',
    'shorter working weeks may help employees stay healthier and become more productive',
    'learning foreign languages can improve communication and increase career opportunities',
    'scientific inventions can solve practical problems in medicine, transport and communication',
    'climate education can encourage people to save energy and support sustainable lifestyles',
    'shopping malls can provide entertainment, employment and convenient services in one place',
    'life experience can help people become more mature, independent and adaptable',
  ],
  '一个领域（人/机构/社会/经济等）': [
    'young people',
    'students',
    'workers',
    'local communities',
    'modern society',
    'the business sector',
    'the education system',
    'families',
    'local residents',
    'urban residents',
    'rural communities',
    'international students',
    'public institutions',
    'private companies',
    'the tourism industry',
    'the transport system',
    'the healthcare system',
    'the legal system',
    'the media industry',
    'the labor market',
    'the local economy',
    'the environment',
  ],
  '机构/人名': [
    'students',
    'employees',
    'local residents',
    'young people',
    'businesses',
    'schools',
    'governments',
    'the general public',
    'parents',
    'teachers',
    'universities',
    'local communities',
    'public institutions',
    'private companies',
    'small businesses',
    'policy makers',
    'media organizations',
    'tourists',
    'commuters',
    'consumers',
    'future generations',
  ],
  '具体领域': [
    'daily life',
    'academic performance',
    'career development',
    'social communication',
    'public safety',
    'economic growth',
    'environmental protection',
    'mental health',
    'time management',
    'personal development',
    'transport efficiency',
    'language ability',
    'cultural understanding',
    'work-life balance',
    'legal awareness',
    'consumer choice',
    'information access',
    'community services',
    'urban development',
    'resource management',
    'public health',
    'family relationships',
    'learning motivation',
    'innovation and creativity',
    'international communication',
  ],
  '具体问题': [
    'financial pressure',
    'mental stress',
    'social inequality',
    'environmental damage',
    'privacy concerns',
    'over-dependence on technology',
    'unfair competition',
    'poor decision-making',
    'traffic congestion',
    'air pollution',
    'noise pollution',
    'high living costs',
    'loss of local culture',
    'a lack of face-to-face communication',
    'misleading information',
    'reduced learning motivation',
    'academic pressure',
    'workplace stress',
    'unemployment risks',
    'a shortage of public resources',
    'weaker family relationships',
    'excessive commercial influence',
    'damage to historical buildings',
    'unequal access to education',
    'public safety risks',
    'a lack of legal awareness',
    'resource waste',
    'poor time management',
  ],
  '人名/机构名': [
    'students',
    'employees',
    'families',
    'local residents',
    'schools',
    'companies',
    'governments',
    'the general public',
    'parents',
    'teachers',
    'universities',
    'local residents',
    'young people',
    'older people',
    'commuters',
    'tourists',
    'consumers',
    'small businesses',
    'public institutions',
    'media organizations',
    'future generations',
  ],
  '建议措施': [
    'proper education and clear regulations',
    'better planning and stronger public awareness',
    'government support and individual responsibility',
    'reasonable rules and effective supervision',
    'public investment and long-term planning',
    'balanced decision-making and practical policies',
    'stricter laws and effective enforcement',
    'public campaigns and community participation',
    'teacher guidance and parental support',
    'better infrastructure and affordable services',
    'technology training and responsible use',
    'environmental protection policies and green technology',
    'transparent information and stronger media responsibility',
    'fair access to resources and targeted financial support',
    'workplace flexibility and reasonable management',
    'cultural protection and sustainable tourism planning',
    'scientific research and international cooperation',
    'clear school rules and practical learning opportunities',
    'consumer education and honest business practices',
    'urban planning and improved public transportation',
    'regular supervision and public feedback',
  ],
  '重申观点句': [
    'this issue should be handled with a balanced and practical approach',
    'this trend brings more benefits than problems when it is properly managed',
    'its positive effects can be maximized through careful planning and responsible use',
    'society can benefit from this issue if its risks are properly controlled',
    'this development should be supported while its possible drawbacks are carefully addressed',
    'this policy can create long-term benefits if governments and individuals work together',
    'this practice is valuable because it improves efficiency, fairness and quality of life',
    'the key is to use this trend wisely instead of ignoring its potential risks',
    'this issue has a positive overall impact when it is guided by clear rules and public awareness',
    'a practical balance between individual needs and social interests is the best solution',
  ],
}

const DEFAULT_SLOT = '观点句'

function InteractiveSlotBadge({
  text,
  active,
  onSelect,
}: {
  text: string
  active: boolean
  onSelect: (slot: string) => void
}) {
  if (!SLOT_EXAMPLES[text]) return <SlotBadge text={text} />

  return (
    <button
      type="button"
      onClick={() => onSelect(text)}
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold border mx-0.5 transition-colors ${
        active
          ? 'bg-emerald-600 text-white border-emerald-600'
          : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
      }`}
    >
      [{text}]
    </button>
  )
}

function renderWeWithSlots(
  text: string,
  slots: string[],
  activeSlot: string,
  setActiveSlot: (slot: string) => void
) {
  if (slots.length === 0) return text
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  for (const slot of slots) {
    const marker = `[${slot}]`
    const idx = remaining.indexOf(marker)
    if (idx === -1) continue
    if (idx > 0) parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>)
    parts.push(
      <InteractiveSlotBadge
        key={key++}
        text={slot}
        active={activeSlot === slot}
        onSelect={setActiveSlot}
      />
    )
    remaining = remaining.slice(idx + marker.length)
  }

  if (remaining) parts.push(<span key={key++}>{remaining}</span>)
  return <>{parts}</>
}

export default function TemplatePage() {
  const [copied, setCopied] = useState(false)
  const [activeSlot, setActiveSlot] = useState(DEFAULT_SLOT)
  const activeExamples = SLOT_EXAMPLES[activeSlot]

  const copy = async () => {
    await navigator.clipboard.writeText(WE_TEMPLATE_PLAIN)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">完整模板</h2>
        <button
          onClick={copy}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          {copied ? '已复制 ✓' : '复制模板'}
        </button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          {WE_TEMPLATE.map(para => (
            <div key={para.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">{para.title}</h3>
              <div className="space-y-3">
                {para.sentences.map((sent, i) => (
                  <p key={i} className="leading-relaxed text-gray-800">
                    {renderWeWithSlots(sent.text, sent.slots, activeSlot, setActiveSlot)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-6 h-fit bg-white border border-emerald-200 rounded-xl p-5">
          <div className="mb-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">点击绿色填空查看例子</p>
            <h3 className="text-base font-bold text-gray-900">[{activeSlot}] 可用表达</h3>
          </div>
          <div className="max-h-[68vh] space-y-2 overflow-y-auto pr-1">
            {activeExamples.map(example => (
              <button
                key={example}
                type="button"
                onClick={() => navigator.clipboard.writeText(example)}
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm leading-relaxed text-gray-800 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">点击任意表达可复制。黄色填空通常按题目改写，绿色填空需要自己发挥。</p>
        </aside>
      </div>
    </div>
  )
}
