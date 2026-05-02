import { GENERATED_VOCABULARY_DETAILS } from './vocabularyGenerated'

export interface VocabularySense {
  partOfSpeech: string
  translation: string
}

export interface VocabularyEntry {
  word: string
  senses: VocabularySense[]
  example: string
}

interface RawVocabularyDetail {
  partOfSpeech: string
  translation: string
  example: string
}

const DETAILS: Record<string, RawVocabularyDetail> = {
  exhaust: { partOfSpeech: 'v./n.', translation: '耗尽；使筋疲力尽；废气', example: 'Long lectures can exhaust students before the final task.' },
  intense: { partOfSpeech: 'adj.', translation: '强烈的；紧张的', example: 'The discussion became intense when the results were announced.' },
  deny: { partOfSpeech: 'v.', translation: '否认；拒绝给予', example: 'The company denied any responsibility for the delay.' },
  nucleus: { partOfSpeech: 'n.', translation: '核心；细胞核；原子核', example: 'The nucleus controls many activities within the cell.' },
  demand: { partOfSpeech: 'n./v.', translation: '需求；要求', example: 'Demand for clean energy has increased rapidly.' },
  understand: { partOfSpeech: 'v.', translation: '理解；懂得', example: 'Students need to understand the main argument first.' },
  intellectual: { partOfSpeech: 'adj./n.', translation: '智力的；知识分子', example: 'The seminar encouraged intellectual debate.' },
  factor: { partOfSpeech: 'n.', translation: '因素；要素', example: 'Cost is an important factor in the decision.' },
  disorder: { partOfSpeech: 'n.', translation: '混乱；疾病；失调', example: 'Sleep disorder can affect memory and concentration.' },
  recycle: { partOfSpeech: 'v.', translation: '回收利用', example: 'Many cities recycle paper, glass and plastic.' },
  conservation: { partOfSpeech: 'n.', translation: '保护；保存', example: 'Wildlife conservation requires long-term funding.' },
  effort: { partOfSpeech: 'n.', translation: '努力；成就', example: 'The project succeeded because of collective effort.' },
  reflect: { partOfSpeech: 'v.', translation: '反映；反射；思考', example: 'The data reflect a clear change in public opinion.' },
  design: { partOfSpeech: 'n./v.', translation: '设计；计划', example: 'Researchers designed a survey to test the hypothesis.' },
  competent: { partOfSpeech: 'adj.', translation: '有能力的；胜任的', example: 'A competent speaker explains complex ideas clearly.' },
  perception: { partOfSpeech: 'n.', translation: '感知；看法', example: 'Public perception of the policy changed over time.' },
  industrial: { partOfSpeech: 'adj.', translation: '工业的；产业的', example: 'Industrial growth often increases energy consumption.' },
  scientific: { partOfSpeech: 'adj.', translation: '科学的', example: 'Scientific evidence supports the new treatment.' },
  critical: { partOfSpeech: 'adj.', translation: '关键的；批判性的；严重的', example: 'Critical thinking is essential in academic writing.' },
  distribution: { partOfSpeech: 'n.', translation: '分配；分布', example: 'The map shows the distribution of rainfall.' },
  capacity: { partOfSpeech: 'n.', translation: '能力；容量', example: 'The stadium has a capacity of fifty thousand people.' },
  vulnerable: { partOfSpeech: 'adj.', translation: '脆弱的；易受伤害的', example: 'Coastal communities are vulnerable to flooding.' },
  technique: { partOfSpeech: 'n.', translation: '技术；技巧；方法', example: 'This technique improves reading speed.' },
  determine: { partOfSpeech: 'v.', translation: '决定；确定', example: 'The study tried to determine the cause of the problem.' },
  species: { partOfSpeech: 'n.', translation: '物种', example: 'Several species disappeared from the region.' },
  financial: { partOfSpeech: 'adj.', translation: '金融的；财务的', example: 'Financial support is necessary for the programme.' },
  observe: { partOfSpeech: 'v.', translation: '观察；遵守', example: 'Scientists observed changes in the animal behaviour.' },
  graduate: { partOfSpeech: 'n./v./adj.', translation: '毕业生；毕业；研究生的', example: 'Many graduate students work as research assistants.' },
  substantial: { partOfSpeech: 'adj.', translation: '大量的；实质性的', example: 'The policy produced substantial benefits.' },
  responsible: { partOfSpeech: 'adj.', translation: '负责的；有责任的', example: 'Local councils are responsible for waste collection.' },
  conclusion: { partOfSpeech: 'n.', translation: '结论', example: 'The conclusion summarizes the main findings.' },
  potential: { partOfSpeech: 'adj./n.', translation: '潜在的；潜力', example: 'The technology has great potential in education.' },
  strategy: { partOfSpeech: 'n.', translation: '策略；战略', example: 'A clear strategy helps students manage time.' },
  analysis: { partOfSpeech: 'n.', translation: '分析', example: 'The analysis revealed a strong pattern.' },
  achievement: { partOfSpeech: 'n.', translation: '成就；成绩', example: 'The award recognized her academic achievement.' },
  evidence: { partOfSpeech: 'n.', translation: '证据', example: 'There is strong evidence for climate change.' },
  environment: { partOfSpeech: 'n.', translation: '环境', example: 'Pollution can damage the natural environment.' },
  resource: { partOfSpeech: 'n.', translation: '资源', example: 'Water is a valuable resource.' },
  regulation: { partOfSpeech: 'n.', translation: '规定；监管', example: 'New regulation reduced industrial emissions.' },
  universal: { partOfSpeech: 'adj.', translation: '普遍的；通用的', example: 'Access to education is a universal concern.' },
  characteristic: { partOfSpeech: 'n./adj.', translation: '特征；典型的', example: 'One characteristic of the species is its bright colour.' },
  executive: { partOfSpeech: 'n./adj.', translation: '主管；行政的；执行的', example: 'The executive approved the new budget.' },
  enhance: { partOfSpeech: 'v.', translation: '提高；增强', example: 'Regular practice can enhance fluency.' },
  rational: { partOfSpeech: 'adj.', translation: '理性的；合理的', example: 'The committee made a rational decision.' },
  creative: { partOfSpeech: 'adj.', translation: '有创造力的', example: 'Creative solutions are needed for complex problems.' },
  global: { partOfSpeech: 'adj.', translation: '全球的', example: 'The issue has become a global concern.' },
  politics: { partOfSpeech: 'n.', translation: '政治；政治学', example: 'Politics influenced the final decision.' },
  efficient: { partOfSpeech: 'adj.', translation: '高效的', example: 'The new system is more efficient.' },
  technology: { partOfSpeech: 'n.', translation: '技术；科技', example: 'Technology has transformed communication.' },
  accurate: { partOfSpeech: 'adj.', translation: '准确的', example: 'Accurate data are essential for good research.' },
  agriculture: { partOfSpeech: 'n.', translation: '农业', example: 'Agriculture depends heavily on water supply.' },
  earthquake: { partOfSpeech: 'n.', translation: '地震', example: 'The earthquake damaged roads and buildings.' },
  economy: { partOfSpeech: 'n.', translation: '经济', example: 'Tourism supports the local economy.' },
  democracy: { partOfSpeech: 'n.', translation: '民主；民主制度', example: 'Free elections are central to democracy.' },
  confidence: { partOfSpeech: 'n.', translation: '信心；自信', example: 'Practice builds confidence in speaking.' },
  solution: { partOfSpeech: 'n.', translation: '解决方案；溶液', example: 'The team proposed a practical solution.' },
  academic: { partOfSpeech: 'adj./n.', translation: '学术的；学者', example: 'Academic writing requires clear evidence.' },
  anxiety: { partOfSpeech: 'n.', translation: '焦虑；担忧', example: 'Exam anxiety can reduce performance.' },
  contribute: { partOfSpeech: 'v.', translation: '贡献；促成', example: 'Transport emissions contribute to air pollution.' },
  satellite: { partOfSpeech: 'n.', translation: '卫星', example: 'The satellite collected images of the storm.' },
  organism: { partOfSpeech: 'n.', translation: '生物；有机体', example: 'Each organism adapts to its environment.' },
  fundamental: { partOfSpeech: 'adj.', translation: '基本的；根本的', example: 'Reading is a fundamental academic skill.' },
}

const SENSE_OVERRIDES: Record<string, VocabularySense[]> = {
  exhaust: [
    { partOfSpeech: 'v.', translation: '耗尽；使筋疲力尽' },
    { partOfSpeech: 'n.', translation: '废气' },
  ],
  demand: [
    { partOfSpeech: 'n.', translation: '需求' },
    { partOfSpeech: 'v.', translation: '要求' },
  ],
  intellectual: [
    { partOfSpeech: 'adj.', translation: '智力的' },
    { partOfSpeech: 'n.', translation: '知识分子' },
  ],
  design: [
    { partOfSpeech: 'n.', translation: '设计；计划' },
    { partOfSpeech: 'v.', translation: '设计' },
  ],
  graduate: [
    { partOfSpeech: 'n.', translation: '毕业生' },
    { partOfSpeech: 'v.', translation: '毕业' },
    { partOfSpeech: 'adj.', translation: '研究生的' },
  ],
  potential: [
    { partOfSpeech: 'adj.', translation: '潜在的' },
    { partOfSpeech: 'n.', translation: '潜力' },
  ],
  characteristic: [
    { partOfSpeech: 'n.', translation: '特征' },
    { partOfSpeech: 'adj.', translation: '典型的' },
  ],
  executive: [
    { partOfSpeech: 'n.', translation: '主管' },
    { partOfSpeech: 'adj.', translation: '行政的；执行的' },
  ],
  academic: [
    { partOfSpeech: 'adj.', translation: '学术的' },
    { partOfSpeech: 'n.', translation: '学者' },
  ],
}

const EXTRA_SENSES: Record<string, VocabularySense[]> = {
  bacteria: [{ partOfSpeech: 'n.', translation: '细菌' }],
  fertiliser: [{ partOfSpeech: 'n.', translation: '肥料' }],
  agenda: [{ partOfSpeech: 'n.', translation: '议程；日程' }],
  reflexion: [{ partOfSpeech: 'n.', translation: '反射；反映' }],
  industrialise: [{ partOfSpeech: 'v.', translation: '使工业化' }],
  maximization: [{ partOfSpeech: 'n.', translation: '最大化' }],
  criteria: [{ partOfSpeech: 'n.', translation: '标准；准则' }],
  globalization: [{ partOfSpeech: 'n.', translation: '全球化' }],
  higher: [{ partOfSpeech: 'adj.', translation: '更高的；高等的' }],
  online: [{ partOfSpeech: 'adj./adv.', translation: '在线的；在线地' }],
  handwrite: [{ partOfSpeech: 'v.', translation: '手写' }],
  rainforest: [{ partOfSpeech: 'n.', translation: '热带雨林' }],
  benchmark: [{ partOfSpeech: 'n.', translation: '基准；标杆' }],
  'non-attendance': [{ partOfSpeech: 'n.', translation: '缺席' }],
  deviance: [{ partOfSpeech: 'n.', translation: '偏差；越轨行为' }],
  malnourish: [{ partOfSpeech: 'v.', translation: '使营养不良' }],
  peacekeeping: [{ partOfSpeech: 'n./adj.', translation: '维和；维持和平的' }],
  capita: [{ partOfSpeech: 'n.', translation: '人；人均用语中的“人”' }],
  sleeplessness: [{ partOfSpeech: 'n.', translation: '失眠；睡不着' }],
  scrutinize: [{ partOfSpeech: 'v.', translation: '仔细检查；审查' }],
  'horse-riding': [{ partOfSpeech: 'n.', translation: '骑马' }],
  'mini-lecture': [{ partOfSpeech: 'n.', translation: '小型讲座' }],
  outscore: [{ partOfSpeech: 'v.', translation: '得分超过' }],
  'weight-lift': [{ partOfSpeech: 'n./v.', translation: '举重；举起重物' }],
  'well-stocked': [{ partOfSpeech: 'adj.', translation: '储备充足的' }],
  unconvinced: [{ partOfSpeech: 'adj.', translation: '不相信的；未被说服的' }],
  longhaul: [{ partOfSpeech: 'adj./n.', translation: '长途的；长期任务' }],
  implicity: [{ partOfSpeech: 'n.', translation: '隐含性；疑似 implicit 拼写变体' }],
  entomophagy: [{ partOfSpeech: 'n.', translation: '食虫；食用昆虫' }],
  representatively: [{ partOfSpeech: 'adv.', translation: '有代表性地' }],
  'micro-computer': [{ partOfSpeech: 'n.', translation: '微型计算机' }],
  'rock-climbing': [{ partOfSpeech: 'n.', translation: '攀岩' }],
  'drop-out': [{ partOfSpeech: 'n.', translation: '辍学生；退出者' }],
  enologist: [{ partOfSpeech: 'n.', translation: '酿酒学家' }],
  palaeontologist: [{ partOfSpeech: 'n.', translation: '古生物学家' }],
  istening: [{ partOfSpeech: 'n.', translation: '疑似 listening 拼写截断' }],
  holistic: [{ partOfSpeech: 'adj.', translation: '整体的；全面的' }],
  genome: [{ partOfSpeech: 'n.', translation: '基因组' }],
  unusable: [{ partOfSpeech: 'adj.', translation: '无法使用的' }],
  macromolecular: [{ partOfSpeech: 'adj.', translation: '大分子的' }],
  reimagine: [{ partOfSpeech: 'v.', translation: '重新构想' }],
  signifier: [{ partOfSpeech: 'n.', translation: '能指；表示符号' }],
  biofuel: [{ partOfSpeech: 'n.', translation: '生物燃料' }],
  fossilise: [{ partOfSpeech: 'v.', translation: '使变成化石；僵化' }],
  toolkit: [{ partOfSpeech: 'n.', translation: '工具包；成套工具' }],
  worksheet: [{ partOfSpeech: 'n.', translation: '练习表；工作表' }],
  sparkiness: [{ partOfSpeech: 'n.', translation: '活力；闪光感' }],
  stabilise: [{ partOfSpeech: 'v.', translation: '使稳定' }],
  uptick: [{ partOfSpeech: 'n.', translation: '小幅上升' }],
  unweldable: [{ partOfSpeech: 'adj.', translation: '不可焊接的' }],
  republica: [{ partOfSpeech: 'n.', translation: '共和国；疑似 republic 拼写变体' }],
  speciman: [{ partOfSpeech: 'n.', translation: '标本；疑似 specimen 拼写变体' }],
  algae: [{ partOfSpeech: 'n.', translation: '藻类' }],
  interdisciplinary: [{ partOfSpeech: 'adj.', translation: '跨学科的' }],
  functionality: [{ partOfSpeech: 'n.', translation: '功能性；功能' }],
  automate: [{ partOfSpeech: 'v.', translation: '使自动化' }],
  variolation: [{ partOfSpeech: 'n.', translation: '人痘接种法' }],
  redouble: [{ partOfSpeech: 'v.', translation: '加倍；进一步加强' }],
  biocontrol: [{ partOfSpeech: 'n.', translation: '生物防治' }],
  gusher: [{ partOfSpeech: 'n.', translation: '喷油井；滔滔不绝的人' }],
  motherese: [{ partOfSpeech: 'n.', translation: '母亲语；对婴儿说话的语体' }],
  malarial: [{ partOfSpeech: 'adj.', translation: '疟疾的' }],
  enterprize: [{ partOfSpeech: 'n.', translation: '企业；事业；enterprise 拼写变体' }],
  'air-bag': [{ partOfSpeech: 'n.', translation: '安全气囊' }],
  imbed: [{ partOfSpeech: 'v.', translation: '嵌入；埋入' }],
  universalise: [{ partOfSpeech: 'v.', translation: '使普遍化' }],
  dramatical: [{ partOfSpeech: 'adj.', translation: '戏剧性的；dramatic 拼写变体' }],
  generalise: [{ partOfSpeech: 'v.', translation: '概括；推广' }],
}

function inferPartOfSpeech(word: string) {
  const lower = word.toLowerCase()
  if (lower.endsWith('tion') || lower.endsWith('sion') || lower.endsWith('ment') || lower.endsWith('ness') || lower.endsWith('ity') || lower.endsWith('ance') || lower.endsWith('ence') || lower.endsWith('ism')) return 'n.'
  if (lower.endsWith('ate') || lower.endsWith('ise') || lower.endsWith('ize') || lower.endsWith('fy')) return 'v.'
  if (lower.endsWith('able') || lower.endsWith('ible') || lower.endsWith('al') || lower.endsWith('ive') || lower.endsWith('ous') || lower.endsWith('ic') || lower.endsWith('less') || lower.endsWith('ful')) return 'adj.'
  if (lower.endsWith('ly')) return 'adv.'
  return 'n./v./adj.'
}

function buildExample(word: string) {
  return `The word "${word}" often appears in academic reading and listening contexts.`
}

function toSenses(word: string, detail: RawVocabularyDetail): VocabularySense[] {
  const override = SENSE_OVERRIDES[word.toLowerCase()]
  if (override) return override

  return [{
    partOfSpeech: detail.partOfSpeech,
    translation: detail.translation,
  }]
}

export function getVocabularyEntry(word: string): VocabularyEntry {
  const key = word.toLowerCase()
  const detail = DETAILS[key]
  const generated = GENERATED_VOCABULARY_DETAILS[key]
  const extra = EXTRA_SENSES[key]

  if (detail) {
    return {
      word,
      senses: toSenses(word, detail),
      example: detail.example,
    }
  }

  if (extra) {
    return {
      word,
      senses: extra,
      example: buildExample(word),
    }
  }

  if (generated) {
    return {
      word,
      senses: generated,
      example: buildExample(word),
    }
  }

  return {
    word,
    senses: [{ partOfSpeech: inferPartOfSpeech(word), translation: '词典未收录，可能是拼写变体或专有词' }],
    example: buildExample(word),
  }
}
