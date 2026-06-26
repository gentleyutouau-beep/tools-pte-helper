'use client'
import { useState } from 'react'
import {
  CATEGORY_SLOT_EXAMPLES,
  FIELD_OBJECT_GROUPS,
  SLOT_EXAMPLES,
  TOPIC_CATEGORIES,
  VIEWPOINT_PATTERN_EXAMPLES,
  type TopicCategoryId,
} from './TemplatePage'

type MaterialSection = {
  title: string
  color: string
  items: string[]
}

type MaterialCategoryId = 'common' | TopicCategoryId

const MATERIAL_CATEGORIES: Array<{
  id: MaterialCategoryId
  label: string
  topics: string[]
}> = [
  {
    id: 'common',
    label: '通用素材',
    topics: ['all topics', 'common viewpoints', 'general examples'],
  },
  ...TOPIC_CATEGORIES,
]

function unique(items: string[]) {
  return items.filter((item, index) => item && items.indexOf(item) === index)
}

function categoryExamples(categoryId: TopicCategoryId, slot: string) {
  return CATEGORY_SLOT_EXAMPLES[categoryId][slot] ?? []
}

function buildCommonSections(): MaterialSection[] {
  const fieldItems = unique([
    ...FIELD_OBJECT_GROUPS.flatMap(group => group.examples),
    ...SLOT_EXAMPLES['两个领域'],
    ...SLOT_EXAMPLES['一个领域（人/机构/社会/经济等）'],
    ...SLOT_EXAMPLES['机构/人名'],
    ...SLOT_EXAMPLES['人名/机构名'],
    ...SLOT_EXAMPLES['具体领域'],
  ])

  return [
    {
      title: '通用观点句',
      color: 'border-violet-200 bg-violet-50 text-violet-900',
      items: unique([
        ...VIEWPOINT_PATTERN_EXAMPLES.map(pattern => `${pattern.label}: ${pattern.text}`),
        ...SLOT_EXAMPLES['观点句'],
        ...SLOT_EXAMPLES['重申观点句'],
      ]),
    },
    {
      title: '通用领域 / 人群 / 机构',
      color: 'border-sky-200 bg-sky-50 text-sky-900',
      items: fieldItems,
    },
    {
      title: '通用例子',
      color: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-900',
      items: SLOT_EXAMPLES['例子'],
    },
    {
      title: '通用具体问题',
      color: 'border-rose-200 bg-rose-50 text-rose-900',
      items: SLOT_EXAMPLES['具体问题'],
    },
    {
      title: '通用建议措施',
      color: 'border-orange-200 bg-orange-50 text-orange-900',
      items: SLOT_EXAMPLES['建议措施'],
    },
  ]
}

function buildTopicSections(categoryId: TopicCategoryId): MaterialSection[] {
  const fieldItems = unique([
    ...(CATEGORY_SLOT_EXAMPLES[categoryId]['两个领域'] ?? []),
    ...(CATEGORY_SLOT_EXAMPLES[categoryId]['一个领域（人/机构/社会/经济等）'] ?? []),
    ...(CATEGORY_SLOT_EXAMPLES[categoryId]['机构/人名'] ?? []),
    ...(CATEGORY_SLOT_EXAMPLES[categoryId]['人名/机构名'] ?? []),
    ...(CATEGORY_SLOT_EXAMPLES[categoryId]['具体领域'] ?? []),
  ])

  return [
    {
      title: '主题词 / 改写题目',
      color: 'border-emerald-200 bg-emerald-50 text-emerald-900',
      items: unique(categoryExamples(categoryId, '主题词')),
    },
    {
      title: '观点句',
      color: 'border-violet-200 bg-violet-50 text-violet-900',
      items: unique([...categoryExamples(categoryId, '观点句'), ...categoryExamples(categoryId, '重申观点句')]),
    },
    {
      title: '领域 / 人群 / 机构',
      color: 'border-sky-200 bg-sky-50 text-sky-900',
      items: fieldItems,
    },
    {
      title: '例子',
      color: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-900',
      items: unique(categoryExamples(categoryId, '例子')),
    },
    {
      title: '具体问题',
      color: 'border-rose-200 bg-rose-50 text-rose-900',
      items: unique(categoryExamples(categoryId, '具体问题')),
    },
    {
      title: '建议措施',
      color: 'border-orange-200 bg-orange-50 text-orange-900',
      items: unique(categoryExamples(categoryId, '建议措施')),
    },
  ].filter(section => section.items.length > 0)
}

function buildSections(categoryId: MaterialCategoryId): MaterialSection[] {
  if (categoryId === 'common') return buildCommonSections()
  return buildTopicSections(categoryId)
}

export default function WEMaterialsReviewPage() {
  const [activeCategory, setActiveCategory] = useState<MaterialCategoryId>('common')
  const active = MATERIAL_CATEGORIES.find(category => category.id === activeCategory) ?? MATERIAL_CATEGORIES[0]
  const sections = buildSections(activeCategory)

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-xl font-bold text-gray-900">WE 背素材</h2>
        <p className="mt-2 text-base leading-7 text-gray-500">
          纯文字版素材，适合手机上快速背。先选 topic 分类，再按主题词、观点句、领域、例子、问题和措施记忆。
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {MATERIAL_CATEGORIES.map(category => {
            const selected = activeCategory === category.id
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-base font-bold transition-colors ${
                  selected
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-sm font-bold text-emerald-700">当前分类</p>
        <h3 className="mt-1 text-2xl font-black text-emerald-950">{active.label}</h3>
        <p className="mt-1 text-base leading-7 text-emerald-800">{active.topics.join(' · ')}</p>
      </div>

      <div className="space-y-4">
        {sections.map(section => (
          <section key={section.title} className={`rounded-xl border p-4 ${section.color}`}>
            <h3 className="text-xl font-black">{section.title}</h3>
            <div className="mt-3 space-y-2">
              {section.items.map(item => (
                <p key={item} className="rounded-lg bg-white/70 px-3 py-2 text-lg font-bold leading-8">
                  {item}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
