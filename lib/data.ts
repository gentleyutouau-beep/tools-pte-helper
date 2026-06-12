// ─── Types ───────────────────────────────────────────────────────────────────

export type EssayType = 'agree' | 'pros_cons' | 'two_views' | 'problem_solution' | 'cause_effect'

export interface EssayTypeGuidance {
  type: EssayType | 'all'
  text: string
}

export interface StrategySentence {
  label: string
  template: string
  slots: string[]
  guidance: EssayTypeGuidance[]
}

export interface StrategySection {
  id: string
  title: string
  sentences: StrategySentence[]
}

export interface TemplateParagraph {
  id: string
  title: string
  sentences: { text: string; slots: string[] }[]
}

export interface MaterialCard {
  domain: string
  examples: string[]
}

export interface SimpleTemplate {
  id: string
  label: string
  parts: { label: string; text: string; slots: string[] }[]
  tips: string[]
  note?: string
}

export interface DITypePart {
  label: string
  template: string
  slots: string[]
  note?: string
  strikethrough?: boolean
}

export interface DITypeTemplate {
  id: string
  label: string
  emoji: string
  color: string
  imageSrc?: string
  parts: DITypePart[]
  example: { label: string; text: string }[]
  tips: string[]
}

// ─── Essay Type Labels & Colors ──────────────────────────────────────────────

export const ESSAY_TYPE_META: Record<EssayType | 'all', { label: string; color: string; bg: string; border: string; text: string }> = {
  agree:            { label: '同意/不同意', color: 'blue',   bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-700' },
  pros_cons:        { label: '优缺点',     color: 'green',  bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700' },
  two_views:        { label: '两种观点',   color: 'purple', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  problem_solution: { label: '问题与解决', color: 'amber',  bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-700' },
  cause_effect:     { label: '原因与影响', color: 'red',    bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700' },
  all:              { label: '所有题型',   color: 'gray',   bg: 'bg-gray-50',   border: 'border-gray-200',   text: 'text-gray-600' },
}

// ─── WE Strategy Table ───────────────────────────────────────────────────────

export const WE_STRATEGY: StrategySection[] = [
  {
    id: 'intro',
    title: '引言段 Introduction',
    sentences: [
      {
        label: '句①',
        template: 'There is no doubt that [主题词] has become an inseparable part of our lives, and the question of whether [改写题目] has sparked widespread debate.',
        slots: ['主题词', '改写题目'],
        guidance: [
          { type: 'all', text: '改写题目核心词，用 "no doubt" 引入话题背景，不表明立场' },
        ],
      },
      {
        label: '句②',
        template: 'From my perspective, I firmly believe that [观点句], for the following reasons.',
        slots: ['观点句'],
        guidance: [
          { type: 'agree',            text: '明确表达同意或不同意，如 "this trend brings more benefits than drawbacks"' },
          { type: 'pros_cons',        text: '总结正反权衡立场，如 "the advantages outweigh the disadvantages"' },
          { type: 'two_views',        text: '表明支持其中一种观点，或认为两者均有道理' },
          { type: 'problem_solution', text: '改为 "I believe the key lies in [解决方向]"，不强调个人立场' },
          { type: 'cause_effect',     text: '改为 "the root causes and far-reaching effects of this deserve careful analysis"' },
        ],
      },
      {
        label: '句③',
        template: 'This essay will explore the key aspects of [主题词] and present a well-reasoned argument.',
        slots: ['主题词'],
        guidance: [
          { type: 'all', text: '（可选）过渡句，预告文章结构，在字数不足时使用' },
        ],
      },
    ],
  },
  {
    id: 'body1',
    title: '主体段一 Body Paragraph 1',
    sentences: [
      {
        label: '句①',
        template: 'First and foremost, [主题词] undeniably offers a wide range of benefits across various aspects, including [两个领域].',
        slots: ['主题词', '两个领域'],
        guidance: [
          { type: 'agree',            text: '列举支持立场的核心领域，如 education and economic development' },
          { type: 'pros_cons',        text: '优点段开头，领域可选 productivity, innovation, social wellbeing' },
          { type: 'two_views',        text: '支持观点一的理由，领域围绕该观点展开' },
          { type: 'problem_solution', text: '改为 "The primary challenge posed by [主题词] manifests in [两个领域]"' },
          { type: 'cause_effect',     text: '改为 "The causes of [主题词] can be traced to [两个领域]"' },
        ],
      },
      {
        label: '句②',
        template: 'For instance, it is widely recognized that [具体例子].',
        slots: ['具体例子'],
        guidance: [
          { type: 'all', text: '用真实数据或知名案例支撑上一句论点，如 "UNESCO reports show..."' },
        ],
      },
      {
        label: '句③',
        template: 'Moreover, [主题词] has profoundly impacted [一个领域（人/机构/社会）].',
        slots: ['主题词', '一个领域'],
        guidance: [
          { type: 'agree',            text: '扩展论据，强调深远影响' },
          { type: 'pros_cons',        text: '补充第二个优点维度' },
          { type: 'two_views',        text: '进一步支撑观点一' },
          { type: 'problem_solution', text: '改为 "This challenge has severely impacted [领域]"' },
          { type: 'cause_effect',     text: '改为 "This has significantly affected [领域]，triggering [影响]"' },
        ],
      },
      {
        label: '句④',
        template: 'A notable example is [例子/数据].',
        slots: ['例子/数据'],
        guidance: [
          { type: 'all', text: '用具体例子或研究数据强化句③，保持简短有力' },
        ],
      },
      {
        label: '句⑤',
        template: 'Studies further suggest that [主题词] can yield lasting benefits for [机构/人名], particularly in terms of [具体领域].',
        slots: ['主题词', '机构/人名', '具体领域'],
        guidance: [
          { type: 'agree',            text: '引用研究证明长期效益，增强说服力' },
          { type: 'pros_cons',        text: '从研究角度补充优点论据' },
          { type: 'two_views',        text: '用研究支持己方观点' },
          { type: 'problem_solution', text: '改为 "Experts suggest the solution lies in [措施], especially for [群体]"' },
          { type: 'cause_effect',     text: '改为 "Research indicates the long-term effects include [影响] for [群体]"' },
        ],
      },
      {
        label: '句⑥',
        template: 'Therefore, it is evident that the advantages of [主题词] need to be effectively leveraged to maximize positive impacts.',
        slots: ['主题词'],
        guidance: [
          { type: 'agree',            text: '总结段落，呼应观点，语气肯定' },
          { type: 'pros_cons',        text: '段落收尾，强调充分利用优势' },
          { type: 'two_views',        text: '小结观点一的合理性' },
          { type: 'problem_solution', text: '改为 "Hence, it is crucial to implement [解决方案] without delay"' },
          { type: 'cause_effect',     text: '改为 "Thus, understanding these causes is the first step to addressing the issue"' },
        ],
      },
    ],
  },
  {
    id: 'body2',
    title: '主体段二 Body Paragraph 2',
    sentences: [
      {
        label: '句①',
        template: 'However, despite its advantages, [主题词] is not without limitations.',
        slots: ['主题词'],
        guidance: [
          { type: 'agree',            text: '让步转折，承认反面声音但不动摇立场' },
          { type: 'pros_cons',        text: '缺点段开头，自然过渡' },
          { type: 'two_views',        text: '引入观点二，体现思辨深度' },
          { type: 'problem_solution', text: '改为 "On the other hand, addressing [问题] requires systemic changes"' },
          { type: 'cause_effect',     text: '改为 "The ripple effects of [主题词] are far-reaching and complex"' },
        ],
      },
      {
        label: '句②',
        template: 'Improper use of / over-reliance on [主题词] has led to issues such as [具体问题]. Research indicates that prolonged exposure to [主题词] may create long-term challenges for [人名/机构名].',
        slots: ['主题词', '具体问题', '人名/机构名'],
        guidance: [
          { type: 'agree',            text: '描述反方担忧，随后用句③反驳或给出解决方案' },
          { type: 'pros_cons',        text: '具体描述缺点及其危害' },
          { type: 'two_views',        text: '阐述观点二的核心论据' },
          { type: 'problem_solution', text: '详述问题严重性，为下文解决方案铺垫' },
          { type: 'cause_effect',     text: '详述影响，如 social inequality, mental health issues' },
        ],
      },
      {
        label: '句③',
        template: 'Thus, it is imperative to address these drawbacks through [建议措施] to mitigate negative consequences.',
        slots: ['建议措施'],
        guidance: [
          { type: 'agree',            text: '提出应对措施，展示全面思考' },
          { type: 'pros_cons',        text: '提出缓解缺点的措施，避免悲观' },
          { type: 'two_views',        text: '尝试调和两种观点，或坚守立场' },
          { type: 'problem_solution', text: '核心解决方案句，需具体：policy reform / technological intervention / education' },
          { type: 'cause_effect',     text: '呼吁应对影响，如 "policymakers must act to reverse this trend"' },
        ],
      },
    ],
  },
  {
    id: 'conclusion',
    title: '结论段 Conclusion',
    sentences: [
      {
        label: '句①',
        template: 'In conclusion, the evidence overwhelmingly supports the view that [重申观点句].',
        slots: ['重申观点句'],
        guidance: [
          { type: 'all', text: '重申引言段论点，用不同词汇改写，避免与句②完全相同' },
        ],
      },
      {
        label: '句②',
        template: 'To reach this potential, collaborative efforts among corporations, educational institutions, and policymakers are fundamental.',
        slots: [],
        guidance: [
          { type: 'agree',            text: '呼吁多方协作落实观点，体现社会责任感' },
          { type: 'pros_cons',        text: '强调扬长避短需要各界合作' },
          { type: 'two_views',        text: '超越两种观点的对立，提出共同行动' },
          { type: 'problem_solution', text: '强调解决方案的执行需要跨界合作' },
          { type: 'cause_effect',     text: '呼吁联合应对根本原因及其影响' },
        ],
      },
    ],
  },
]

// ─── WE Full Template ────────────────────────────────────────────────────────

export const WE_TEMPLATE: TemplateParagraph[] = [
  {
    id: 'intro',
    title: '引言段 Introduction',
    sentences: [
      {
        text: 'There is no doubt that [主题词] has become an inseparable part of our lives (社会或某个领域), and the question of whether [改写题目+句子] has sparked widespread debate.',
        slots: ['主题词', '改写题目+句子'],
      },
      {
        text: 'From my perspective, I firmly believe that [观点句], for the following reasons.',
        slots: ['观点句'],
      },
    ],
  },
  {
    id: 'body1',
    title: '主体段一 Body Paragraph 1',
    sentences: [
      {
        text: 'First and foremost, [主题词] undeniably offers a wide range of benefits across various aspects, including [两个领域].',
        slots: ['主题词', '两个领域'],
      },
      {
        text: 'For instance, it is widely recognized that [例子].',
        slots: ['例子'],
      },
      {
        text: 'Moreover, [主题词] has profoundly impacted [一个领域（人/机构/社会/经济等）].',
        slots: ['主题词', '一个领域（人/机构/社会/经济等）'],
      },
      {
        text: 'A notable example is [例子].',
        slots: ['例子'],
      },
      {
        text: 'Studies further suggest that [主题词] can yield lasting benefits for [机构/人名], particularly in terms of [具体领域].',
        slots: ['主题词', '机构/人名', '具体领域'],
      },
      {
        text: 'Therefore, it is evident that the advantages of [主题词] need to be effectively leveraged to maximize positive impacts.',
        slots: ['主题词'],
      },
    ],
  },
  {
    id: 'body2',
    title: '主体段二 Body Paragraph 2',
    sentences: [
      {
        text: 'However, despite its advantages, [主题词] is not without limitations.',
        slots: ['主题词'],
      },
      {
        text: 'Improper use of / over-reliance on [主题词] has led to issues such as [具体问题].',
        slots: ['主题词', '具体问题'],
      },
      {
        text: 'Research indicates that prolonged exposure to [主题词] may create long-term challenges for [人名/机构名].',
        slots: ['主题词', '人名/机构名'],
      },
      {
        text: 'Thus, it is imperative to address these drawbacks through [建议措施] to mitigate negative consequences.',
        slots: ['建议措施'],
      },
    ],
  },
  {
    id: 'conclusion',
    title: '结论段 Conclusion',
    sentences: [
      {
        text: 'In conclusion, the evidence overwhelmingly supports the view that [重申观点句].',
        slots: ['重申观点句'],
      },
      {
        text: 'To reach this potential, collaborative efforts among corporations, educational institutions, and policymakers are fundamental.',
        slots: [],
      },
    ],
  },
]

export const WE_TEMPLATE_PLAIN = `Introduction
There is no doubt that [主题词] has become an inseparable part of our lives (社会或某个领域), and the question of whether [改写题目+句子] has sparked widespread debate. From my perspective, I firmly believe that [观点句], for the following reasons.

Body Paragraph 1
First and foremost, [主题词] undeniably offers a wide range of benefits across various aspects, including [两个领域]. For instance, it is widely recognized that [例子]. Moreover, [主题词] has profoundly impacted [一个领域（人/机构/社会/经济等）]. A notable example is [例子]. Studies further suggest that [主题词] can yield lasting benefits for [机构/人名], particularly in terms of [具体领域]. Therefore, it is evident that the advantages of [主题词] need to be effectively leveraged to maximize positive impacts.

Body Paragraph 2
However, despite its advantages, [主题词] is not without limitations. Improper use of / over-reliance on [主题词] has led to issues such as [具体问题]. Research indicates that prolonged exposure to [主题词] may create long-term challenges for [人名/机构名]. Thus, it is imperative to address these drawbacks through [建议措施] to mitigate negative consequences.

Conclusion
In conclusion, the evidence overwhelmingly supports the view that [重申观点句]. To reach this potential, collaborative efforts among corporations, educational institutions, and policymakers are fundamental.`

// ─── Materials Bank ──────────────────────────────────────────────────────────

export const MATERIALS: MaterialCard[] = [
  { domain: '教育', examples: ["Finland's education system", 'UNESCO reports on literacy', 'PISA scores across nations', 'Online learning post-COVID'] },
  { domain: '科技', examples: ['AI adoption in enterprises', 'Silicon Valley innovation hubs', 'Smartphone usage statistics', 'Automation and job displacement'] },
  { domain: '环境', examples: ['Carbon emissions targets', 'Renewable energy in Denmark', 'Paris Climate Agreement', 'Plastic pollution in oceans'] },
  { domain: '健康', examples: ['WHO global health statistics', 'Mental health crisis post-COVID', 'Obesity epidemic in developed nations', 'Telemedicine expansion'] },
  { domain: '经济', examples: ['GDP growth in developing nations', 'Income inequality (Gini index)', 'Gig economy and labor rights', 'Microfinance in rural Africa'] },
  { domain: '社会', examples: ['Community programs & NGO initiatives', 'Social media and polarization', 'Immigration and cultural diversity', 'Gender pay gap statistics'] },
]

// ─── SWT Templates ───────────────────────────────────────────────────────────

export const SWT_TEMPLATES: SimpleTemplate[] = [
  {
    id: 'swt-1',
    label: '模板一（3句→1句）',
    parts: [
      { label: 'Structure', text: 'While [S1], [S2]; [S3].', slots: ['S1', 'S2', 'S3'] },
    ],
    tips: [
      'S1 = 第一个核心观点（从句）',
      'S2 = 第二个核心观点（主句前半）',
      'S3 = 第三个核心观点（主句后半，用分号连接）',
      '整句必须是一个完整句子，以句号结尾',
    ],
    note: '适用于文章有明确三个论点时',
  },
  {
    id: 'swt-2',
    label: '模板二（4句→1句）',
    parts: [
      { label: 'Structure', text: 'While [S1], [S2]; [S3] and [S4].', slots: ['S1', 'S2', 'S3', 'S4'] },
    ],
    tips: [
      'S1 = 背景或对比信息（从句）',
      'S2、S3 = 主要论点（用分号分隔）',
      'S4 = 补充细节或结论（用 and 连接）',
    ],
    note: '适用于文章信息量较大、有4个关键点',
  },
  {
    id: 'swt-3',
    label: '模板三（对比型）',
    parts: [
      { label: 'Structure', text: '[S1] and [S2], but [S3].', slots: ['S1', 'S2', 'S3'] },
    ],
    tips: [
      'S1, S2 = 正面/现状描述',
      'S3 = 转折、限制或挑战',
      '适合有明显转折的文章',
    ],
    note: '适用于文章有明显正反对比时',
  },
]

export const SWT_RULES = [
  '字数要求：5–75 words（含标点），单句完成',
  '必须是一个完整的单句（One sentence only）',
  '不得抄原文超过3个连续词',
  '涵盖文章主旨，不需要覆盖所有细节',
  '语法错误会直接扣分',
]

// ─── SST Template ────────────────────────────────────────────────────────────

export const SST_TEMPLATE: SimpleTemplate = {
  id: 'sst',
  label: 'SST 模板',
  parts: [
    { label: '主题句', text: 'This lecture mainly talks about [主题/话题].', slots: ['主题/话题'] },
    { label: '要点一', text: 'Firstly, the speaker emphasised that [第一个要点].', slots: ['第一个要点'] },
    { label: '要点二', text: 'Also, he/she mentioned that [第二个要点].', slots: ['第二个要点'] },
    { label: '要点三', text: 'Additionally, it was noted that [第三个要点].', slots: ['第三个要点'] },
    { label: '结论句', text: 'In conclusion, the lecture on the topic of [主题] is very informative.', slots: ['主题'] },
  ],
  tips: [
    '字数要求：50–70 words',
    '边听边记关键词（名词、动词、数字）',
    '不超过4个要点，抓最重要的信息',
    '用自己的词改写，避免直接抄原文',
    '注意人名、地名、专业词汇的拼写',
  ],
}

// ─── DI Type Templates ───────────────────────────────────────────────────────

export const DI_TYPE_TEMPLATES: DITypeTemplate[] = [
  {
    id: 'area',
    label: 'Area Chart',
    emoji: '📈',
    color: 'bg-teal-500',
    imageSrc: '/di/area.png',
    parts: [
      { label: '主题句', template: 'The image given is an area chart that gives information about [主题].', slots: ['主题'] },
      { label: 'X/Y 轴', template: 'The x-axis shows [X轴内容], while the y-axis represents [Y轴内容].', slots: ['X轴内容', 'Y轴内容'] },
      { label: '最高值', template: 'It is evident that [最高值/最明显的数据].', slots: ['最高值/最明显的数据'] },
      { label: '最低值', template: 'Meanwhile, [最低值/最不明显的数据].', slots: ['最低值/最不明显的数据'] },
      { label: '中间值', template: 'What\'s more, [中间值/另一个重要数据].', slots: ['中间值/另一个重要数据'] },
      { label: '总结', template: 'Overall, this image mainly talks about [总结主旨].', slots: ['总结主旨'] },
    ],
    example: [
      { label: '主题句', text: 'The image given is an area chart that gives information about daily screen time by age group hours per day.' },
      { label: 'X/Y 轴', text: 'The x-axis shows the age groups between 10 and 49, while the y-axis represents hours per day from 0 to 12.' },
      { label: '最高值', text: 'It is evident that the 30 to 39 age group has the highest figure for work or study, at almost 8 to 9 hours per day.' },
      { label: '最低值', text: 'Meanwhile, the 40 to 49 age group shows the lowest figure for gaming, at around 1 hour per day.' },
      { label: '中间值', text: 'What\'s more, the 20 to 29 age group spends about 6 hours per day on gaming.' },
      { label: '总结', text: 'Overall, this image mainly talks about daily screen time by age group in hours per day.' },
    ],
    tips: [
      'Area chart 与 bar/line 的通用结构相同：主题句、X/Y 轴、最高值、最低值、中间值、总结',
      'X/Y 轴合并成一句即可，不必额外列类别数量',
      '细节优先选最高值、最低值和一个中间值',
      '数字可用 around / about / almost / approximately 修饰',
    ],
  },
  {
    id: 'bar',
    label: 'Bar Chart',
    emoji: '📊',
    color: 'bg-blue-500',
    imageSrc: '/di/bar.png',
    parts: [
      { label: '主题句', template: 'The image given is a bar chart that gives information about [主题].', slots: ['主题'] },
      { label: 'X/Y 轴', template: 'The x-axis shows [X轴内容], while the y-axis represents [Y轴内容].', slots: ['X轴内容', 'Y轴内容'] },
      { label: '最高值', template: 'It is evident that [最高值/最明显的数据].', slots: ['最高值/最明显的数据'] },
      { label: '最低值', template: 'Meanwhile, [最低值/最不明显的数据].', slots: ['最低值/最不明显的数据'] },
      { label: '中间值', template: 'What\'s more, [中间值/另一个重要数据].', slots: ['中间值/另一个重要数据'] },
      { label: '总结', template: 'Overall, this image mainly talks about [总结主旨].', slots: ['总结主旨'] },
    ],
    example: [
      { label: '主题句', text: 'The image given is a bar chart that gives information about publications of four universities across humanities, science and arts.' },
      { label: 'X/Y 轴', text: 'The x-axis shows the number of publications from zero to 80, while the y-axis represents different universities.' },
      { label: '最高值', text: 'It is evident that Birmingham has the highest figure in arts, at above 80 publications.' },
      { label: '最低值', text: 'Meanwhile, Middlesex has the lowest figure in science, at less than 20 publications.' },
      { label: '中间值', text: 'What\'s more, York records around 50 publications in humanities.' },
      { label: '总结', text: 'Overall, this image mainly talks about the publication counts of four universities across three subject areas.' },
    ],
    tips: [
      'Bar chart 使用和 area/line 相同的通用结构',
      '数字用 approximately / around / close to 修饰，不必精确',
      'Horizontal bar chart 也可以直接说 x-axis shows numbers, y-axis represents categories',
      '若条形太多，只选最高值、最低值和一个中间值',
    ],
  },
  {
    id: 'line',
    label: 'Line Graph',
    emoji: '📉',
    color: 'bg-indigo-500',
    imageSrc: '/di/line.png',
    parts: [
      { label: '主题句', template: 'The image given is a line graph that gives information about [主题].', slots: ['主题'] },
      { label: 'X/Y 轴', template: 'The x-axis shows [X轴内容], while the y-axis represents [Y轴内容].', slots: ['X轴内容', 'Y轴内容'] },
      { label: '最高值', template: 'It is evident that [最高值/最明显的数据].', slots: ['最高值/最明显的数据'] },
      { label: '最低值', template: 'Meanwhile, [最低值/最不明显的数据].', slots: ['最低值/最不明显的数据'] },
      { label: '中间值', template: 'What\'s more, [中间值/另一个重要数据].', slots: ['中间值/另一个重要数据'] },
      { label: '总结', template: 'Overall, this image mainly talks about [总结主旨].', slots: ['总结主旨'] },
    ],
    example: [
      { label: '主题句', text: 'The image given is a line graph that gives information about probability of depression.' },
      { label: 'X/Y 轴', text: 'The x-axis shows the age between 16 and 52, while the y-axis represents depression probability in percentage from 20 to 100.' },
      { label: '最高值', text: 'It is evident that depression probability reaches the highest figure of 100% between the ages of 32 and 34.' },
      { label: '最低值', text: 'Meanwhile, it shows the lowest figure of 20% between the ages of 16 and 18 and also from 50 to 52.' },
      { label: '中间值', text: 'What\'s more, the probability is around 60 to 65% between the ages of 24 and 26 and 42 and 44.' },
      { label: '总结', text: 'Overall, this image mainly talks about probability of depression across different ages.' },
    ],
    tips: [
      'Line graph 使用和 area/bar 相同的通用结构',
      '趋势词汇：rises sharply / drops gradually / peaks at / reaches its lowest point / fluctuates',
      '多条线时，每条线单独描述，用颜色或名称区分',
      '细节优先选最高值、最低值和一个中间值或趋势点',
      '用 "between X and Y" 描述范围，而非精确单点',
    ],
  },
  {
    id: 'pie',
    label: 'Pie Chart',
    emoji: '🥧',
    color: 'bg-orange-500',
    imageSrc: '/di/pie.png',
    parts: [
      { label: '主题句', template: 'The image given is a pie chart that gives information about [主题].', slots: ['主题'] },
      { label: '对比说明', template: 'The image compares [对象/类别] in terms of [指标/数据内容].', slots: ['对象/类别', '指标/数据内容'], note: 'Pie chart 无 X/Y 轴，用 compares 句替代' },
      { label: '最高值', template: 'It is evident that [最高值/最大占比/最明显的数据].', slots: ['最高值/最大占比/最明显的数据'] },
      { label: '最低值', template: 'Meanwhile, [最低值/最小占比/最不明显的数据].', slots: ['最低值/最小占比/最不明显的数据'] },
      { label: '中间值', template: 'What\'s more, [中间值/另一个重要数据].', slots: ['中间值/另一个重要数据'] },
      { label: '总结', template: 'Overall, this image mainly talks about [总结主旨].', slots: ['总结主旨'] },
    ],
    example: [
      { label: '主题句', text: 'The image given is a pie chart that gives information about population age structure in India in 2025.' },
      { label: '对比说明', text: 'The image compares different age groups in terms of population size.' },
      { label: '最高值', text: 'It is evident that adults aged 25 to 54 have the highest figure, at 62 crores.' },
      { label: '最低值', text: 'Meanwhile, middle-aged people aged 55 to 64 have the lowest figure, at 14 crores.' },
      { label: '中间值', text: 'What\'s more, children aged 0 to 14 show 34 crores.' },
      { label: '总结', text: 'Overall, this image mainly talks about population distribution by age group in India.' },
    ],
    tips: [
      'Pie chart 没有 X/Y 轴，用 "compares ... in terms of ..." 替代',
      '不需要说 "There are N categories"，直接进入最高值、最低值和中间值',
      '可用 accounts for / takes up / represents 描述比例',
      '若有百分比数字，直接说出；若无，用 "the largest/smallest slice" 描述',
    ],
  },
  {
    id: 'table',
    label: 'Table',
    emoji: '📋',
    color: 'bg-gray-600',
    imageSrc: '/di/table.png',
    parts: [
      { label: '主题句', template: 'The image given is a table that gives information about [主题].', slots: ['主题'] },
      { label: '对比说明', template: 'The image compares [对象/类别] in terms of [指标/数据内容].', slots: ['对象/类别', '指标/数据内容'], note: 'Table 无 X/Y 轴，用 compares 句替代' },
      { label: '最高值', template: 'It is evident that [最高值/最明显的数据].', slots: ['最高值/最明显的数据'] },
      { label: '最低值', template: 'Meanwhile, [最低值/最不明显的数据].', slots: ['最低值/最不明显的数据'] },
      { label: '中间值', template: 'What\'s more, [中间值/另一个重要数据].', slots: ['中间值/另一个重要数据'] },
      { label: '总结', template: 'Overall, this image mainly talks about [总结主旨].', slots: ['总结主旨'] },
    ],
    example: [
      { label: '主题句', text: 'The image given is a table that gives information about smartphone market share in 2024.' },
      { label: '对比说明', text: 'The image compares different smartphone brands in terms of market share percentage.' },
      { label: '最高值', text: 'It is evident that Apple has the highest figure in quarter three, at 32%.' },
      { label: '最低值', text: 'Meanwhile, OnePlus has the lowest figure in quarter one, at 8%.' },
      { label: '中间值', text: 'What\'s more, Samsung records 26% in quarter one, which is between the highest and lowest figures.' },
      { label: '总结', text: 'Overall, this image mainly talks about smartphone market share by brand in 2024.' },
    ],
    tips: [
      'Table 没有 X/Y 轴，用 "compares ... in terms of ..." 替代',
      '不需要列出所有行列类别，选择最明显的数据即可',
      '重点读最高值、最低值和一个中间值',
      '注意单位（%、$、人数），在第一次提到时说清楚',
    ],
  },
  {
    id: 'map',
    label: 'Map',
    emoji: '🗺️',
    color: 'bg-emerald-600',
    imageSrc: '/di/map.png',
    parts: [
      { label: '主题句', template: 'The image given is a map that gives information about [主题].', slots: ['主题'] },
      { label: '对比说明', template: 'The image compares [地区/区域] in terms of [指标/数据内容].', slots: ['地区/区域', '指标/数据内容'], note: 'Map 无 X/Y 轴，用 compares 句替代' },
      { label: '最高值', template: 'It is evident that [最高值/最明显的数据].', slots: ['最高值/最明显的数据'] },
      { label: '最低值', template: 'Meanwhile, [最低值/最不明显的数据].', slots: ['最低值/最不明显的数据'] },
      { label: '中间值', template: 'What\'s more, [中间值/另一个重要数据].', slots: ['中间值/另一个重要数据'] },
      { label: '总结', template: 'Overall, this image mainly talks about [总结主旨].', slots: ['总结主旨'] },
    ],
    example: [
      { label: '主题句', text: 'The image given is a map that gives information about urbanization rate by province in China.' },
      { label: '对比说明', text: 'The image compares different provinces in terms of urbanization rate in percentage.' },
      { label: '最高值', text: 'It is evident that Beijing has the highest figure, at 89.3%.' },
      { label: '最低值', text: 'Meanwhile, Inner Mongolia has the lowest figure, at 64.1%.' },
      { label: '中间值', text: 'What\'s more, Sichuan records 77.2%, which is between the highest and lowest figures.' },
      { label: '总结', text: 'Overall, this image mainly talks about urbanization rate by province across China.' },
    ],
    tips: [
      'Map 没有 X/Y 轴，用 "compares ... in terms of ..." 替代',
      '不需要列出所有地区，选择最高值、最低值和一个中间值即可',
      '颜色深浅代表数值时，可说 "the darker the shade, the higher the value"',
      '方位词：in the north/south/east/west, located in, adjacent to',
    ],
  },
  {
    id: 'process',
    label: 'Process',
    emoji: '⚙️',
    color: 'bg-green-600',
    imageSrc: '/di/process.png',
    parts: [
      { label: '主题句', template: 'The image given is a process that gives information about [主题].', slots: ['主题'] },
      { label: '步骤总数', template: 'There are [N] main steps in this process.', slots: ['N'] },
      { label: '起点', template: 'According to the image, the process starts with [第一步].', slots: ['第一步'] },
      { label: '中间步骤一', template: 'After that, [第二步].', slots: ['第二步'] },
      { label: '中间步骤二', template: 'Then, [第三步/中间步骤].', slots: ['第三步/中间步骤'], note: '步骤较多时，可继续用 Then / Next / After that 扩展' },
      { label: '终点', template: 'Finally, the process ends with [最后一步].', slots: ['最后一步'] },
      { label: '总结', template: 'Overall, this image mainly talks about [总结主旨].', slots: ['总结主旨'] },
    ],
    example: [
      { label: '主题句', text: 'The image given is a process that gives information about how a car starts.' },
      { label: '步骤总数', text: 'There are five main steps in this process.' },
      { label: '起点', text: 'According to the image, the process starts with pressing the clutch.' },
      { label: '中间步骤一', text: 'After that, the key is put in and turned.' },
      { label: '中间步骤二', text: 'Then, the gear is changed, and the hands are placed on the wheel.' },
      { label: '终点', text: 'Finally, the process ends with the car being ready to go.' },
      { label: '总结', text: 'Overall, this image mainly talks about the process of starting a car.' },
    ],
    tips: [
      'Process 单独一套：主题、总步骤、起点、中间步骤、终点、总结',
      '固定连接词：According to the image / After that / Then / Next / Finally',
      '步骤较多时，中间句可重复使用 Then / Next / After that',
      '总结句用 "the process of ..." 更自然',
    ],
  },
  {
    id: 'photo',
    label: 'Photo',
    emoji: '🖼️',
    color: 'bg-pink-500',
    imageSrc: '/di/photo.png',
    parts: [
      { label: '主题句', template: 'The image is a picture that gives information about [场景/主题描述].', slots: ['场景/主题描述'] },
      { label: '上方', template: 'At the top of the picture, there is/are [上方内容].', slots: ['上方内容'] },
      { label: '中间', template: 'In the middle of the picture, we can see [中间内容].', slots: ['中间内容'] },
      { label: '下方', template: 'At the bottom of the picture, there is/are [下方内容].', slots: ['下方内容'] },
      { label: '补充', template: 'Another thing I notice is [补充细节].', slots: ['补充细节'], note: '如果信息足够，这句可以跳过' },
      { label: '左右-左边', template: 'On the left side of the picture, we can see [左边内容].', slots: ['左边内容'], note: '左右构图时，用这三句替换上方/中间/下方' },
      { label: '左右-右边', template: 'On the right side of the picture, we can see [右边内容].', slots: ['右边内容'] },
      { label: '左右-对比', template: 'The two sides show a clear difference between [A] and [B].', slots: ['A', 'B'] },
      { label: '总结', template: 'Overall, this picture mainly shows [总结印象].', slots: ['总结印象'] },
    ],
    example: [
      { label: '主题句', text: 'The image is a picture that gives information about a metro train station.' },
      { label: '上方', text: 'At the top of the picture, there are signs, lights and part of the station ceiling.' },
      { label: '中间', text: 'In the middle of the picture, we can see a train with people getting in and getting out.' },
      { label: '下方', text: 'At the bottom of the picture, there is a platform with a small number of commuters.' },
      { label: '补充', text: 'Another thing I notice is that the station looks clean and quiet.' },
      { label: '左右例句', text: 'For a left-right picture, we can say: On the left side of the picture, we can see the correct way to use a keyboard. On the right side of the picture, we can see the wrong way to use a keyboard.' },
      { label: '对比例句', text: 'The two sides show a clear difference between healthy and unhealthy typing posture.' },
      { label: '总结', text: 'Overall, this picture mainly shows a quiet metro train station.' },
    ],
    tips: [
      'Photo 按位置顺序描述：top / middle / bottom，减少临场构思压力',
      '如果图片是左右对比，可替换为 left side / right side / middle',
      '某个位置内容不明显时，可以改说人物、物体、颜色、动作或数量',
      '补充句可选；时间不够时直接进入总结',
      '总结句直接回到主题，不需要说 "Each part is very important"',
    ],
  },
]

// ─── SGD Template ────────────────────────────────────────────────────────────

export const SGD_TEMPLATE: SimpleTemplate = {
  id: 'sgd',
  label: 'SGD 模板',
  parts: [
    { label: '开场白', text: 'The discussion was about [话题], and [N] speakers were involved.', slots: ['话题', 'N'] },
    { label: 'Speaker 1 — 句1', text: 'The first speaker mentioned that [观点1].', slots: ['观点1'] },
    { label: 'Speaker 1 — 句2', text: 'Then, the first speaker also said that [补充1].', slots: ['补充1'] },
    { label: 'Speaker 1 — 句3', text: 'In the end, the first speaker talked about [总结1].', slots: ['总结1'] },
    { label: 'Speaker 2 — 句1', text: 'The second speaker mentioned that [观点2].', slots: ['观点2'] },
    { label: 'Speaker 2 — 句2', text: 'Then, the second speaker also said that [补充2].', slots: ['补充2'] },
    { label: 'Speaker 2 — 句3', text: 'In the end, the second speaker talked about [总结2].', slots: ['总结2'] },
    { label: 'Speaker 3 — 句1', text: 'The third speaker mentioned that [观点3].', slots: ['观点3'] },
    { label: 'Speaker 3 — 句2', text: 'Then, the third speaker also said that [补充3].', slots: ['补充3'] },
    { label: 'Speaker 3 — 句3', text: 'In the end, the third speaker talked about [总结3].', slots: ['总结3'] },
    { label: '总结', text: 'In summary, the discussion was about [总主题/各方观点].', slots: ['总主题/各方观点'] },
  ],
  tips: [
    '时间：10秒准备，90秒录音',
    '边听边记每位说话者的核心观点（不需要全部细节）',
    '三个 speaker 使用完全相同的三句结构，降低背诵压力',
    '每位说话者固定说：mentioned that / also said that / talked about',
    '如果只听到两个点，可以跳过第三句或用同一个观点换句话说',
    '不需要表达个人观点，只需客观总结',
    '总结句回到总主题即可，不需要复杂评价',
  ],
}

// ─── RL Template ─────────────────────────────────────────────────────────────

export const RL_TEMPLATE: SimpleTemplate = {
  id: 'rl',
  label: 'RL 模板（新版）',
  parts: [
    { label: '主题句', text: 'The lecture gives information about [主题/话题].', slots: ['主题/话题'] },
    { label: '开头', text: 'In the beginning, the speaker mentioned [开头要点].', slots: ['开头要点'] },
    { label: '发展', text: 'Meanwhile, the speaker explained [中间要点].', slots: ['中间要点'] },
    { label: '延伸', text: 'What\'s more, the speaker talked about [补充信息].', slots: ['补充信息'] },
    { label: '结语', text: 'In conclusion, this lecture mainly talked about [总结/主题].', slots: ['总结/主题'] },
  ],
  tips: [
    '时间：10秒准备，40秒录音',
    '边听边在草稿纸上记3-5个关键词',
    '不需要复述所有细节，抓主旨和1-2个要点即可',
    '开头句要清晰说出 "The lecture gives information about..."',
    '用过去时（mentioned, explained, talked about）',
    '流畅度比内容量更重要',
  ],
}

// ─── RTS Template ────────────────────────────────────────────────────────────

export const RTS_TEMPLATE: SimpleTemplate = {
  id: 'rts',
  label: 'RTS 模板',
  parts: [
    { label: '开场说明', text: 'Hi [称呼], I would like to discuss an issue we have encountered with [相关事项].', slots: ['称呼', '相关事项'] },
    { label: '复述问题', text: 'Here is the situation. [第一人称复述问题].', slots: ['第一人称复述问题'] },
    { label: '请求/方案', text: 'So I was wondering if you could [请求/解决方案].', slots: ['请求/解决方案'] },
    { label: '礼貌结尾', text: 'Thank you for your understanding. I really appreciate your help.', slots: [] },
  ],
  tips: [
    '时间：20秒准备，40秒录音',
    '核心逻辑：题目改成第一人称复述一遍，再说请求或解决方案',
    '复述问题时优先使用题目原信息，注意把 you/he/she 改成 I/we/you',
    '请求句固定用 "I was wondering if you could ..."',
    '语气自然友好，像在真实对话中',
    '发音和流畅度是主要评分维度',
    '时间不够时，优先保留复述问题和请求句',
  ],
}

// ─── Page Meta (for navigation) ──────────────────────────────────────────────

export const PAGE_META = [
  { href: '/we',  label: 'WE',  fullLabel: 'Write Essay',             category: 'Writing',   weight: '31%',    color: 'bg-emerald-500' },
  { href: '/swt', label: 'SWT', fullLabel: 'Summarize Written Text',  category: 'Writing',   weight: '28%+23%', color: 'bg-teal-500' },
  { href: '/sst', label: 'SST', fullLabel: 'Summarize Spoken Text',   category: 'Listening', weight: '18%+10%', color: 'bg-sky-500' },
  { href: '/wfd', label: 'WFD', fullLabel: 'Write From Dictation',     category: 'Listening', weight: '高频213', color: 'bg-indigo-600' },
  { href: '/di',  label: 'DI',  fullLabel: 'Describe Image',          category: 'Speaking',  weight: '31%',    color: 'bg-violet-500' },
  { href: '/sgd', label: 'SGD', fullLabel: 'Summarize Group Discussion', category: 'Speaking', weight: '20%+19%', color: 'bg-pink-500' },
  { href: '/rl',  label: 'RL',  fullLabel: 'Retell Lecture',          category: 'Speaking',  weight: '13%+13%', color: 'bg-orange-500' },
  { href: '/rts', label: 'RTS', fullLabel: 'Respond to a Situation',  category: 'Speaking',  weight: '13%',    color: 'bg-rose-500' },
  { href: '/fib', label: 'FIB', fullLabel: 'Fill in the Blanks',      category: 'Reading',   weight: '25%+20%', color: 'bg-cyan-500' },
  { href: '/ro',  label: 'RO',  fullLabel: 'Re-order Paragraphs',     category: 'Reading',   weight: '9%',     color: 'bg-lime-600' },
  { href: '/vocab', label: '词汇', fullLabel: 'Vocabulary Zone',       category: 'Vocabulary', weight: '5册',     color: 'bg-cyan-600' },
]

// ─── FIB Interfaces ───────────────────────────────────────────────────────────

export interface FIBRule {
  id: string
  pattern: string
  explanation: string
  example: string
  fill: string
}

export interface FIBCategory {
  id: string
  label: string
  emoji: string
  color: string
  bg: string
  border: string
  text: string
  rules: FIBRule[]
}

export interface FIBCollocItem {
  phrase: string
  meaning: string
}

export interface FIBCollocGroup {
  id: string
  label: string
  color: string
  items: FIBCollocItem[]
}

// ─── FIB 28 秒选法则 ────────────────────────────────────────────────────────────

export const FIB_CATEGORIES: FIBCategory[] = [
  {
    id: 'noun',
    label: '名词结构',
    emoji: '🔵',
    color: 'bg-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    rules: [
      {
        id: 'n1',
        pattern: 'adj + ___',
        explanation: '形容词后接名词，空格应填名词',
        example: 'The report highlighted several significant ___ in the data.',
        fill: 'patterns',
      },
      {
        id: 'n2',
        pattern: '(the) noun of (the) ___',
        explanation: '"of" 后通常接名词，表示所属或内容',
        example: 'The development of ___ has transformed communication.',
        fill: 'technology',
      },
      {
        id: 'n3',
        pattern: "(the) noun's ___",
        explanation: '所有格（\'s）后接名词',
        example: "The company's ___ grew by 15% last year.",
        fill: 'revenue',
      },
      {
        id: 'n4',
        pattern: 'adv + adj + ___',
        explanation: '副词修饰形容词，形容词后仍接名词',
        example: 'She gave an extremely detailed ___ of the project.',
        fill: 'description',
      },
      {
        id: 'n5',
        pattern: 'because of ___',
        explanation: '"because of" 为介词短语，后接名词（短语），不接句子',
        example: 'Many flights were delayed because of the heavy ___.',
        fill: 'snowfall',
      },
      {
        id: 'n6',
        pattern: 'there be ___',
        explanation: '"there be" 句型后接名词短语作主语',
        example: 'There is a growing ___ for renewable energy solutions.',
        fill: 'demand',
      },
    ],
  },
  {
    id: 'verb',
    label: '动词结构',
    emoji: '🟢',
    color: 'bg-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    rules: [
      {
        id: 'v1',
        pattern: 'be + ___ + prep',
        explanation: 'be动词后接形容词或过去分词，若后有介词则填过去分词（被动）',
        example: 'The results were ___ by a team of independent researchers.',
        fill: 'verified',
      },
      {
        id: 'v2',
        pattern: 'have + ___ + noun',
        explanation: 'have后接过去分词构成现在完成时',
        example: 'Scientists have ___ a new method for detecting cancer early.',
        fill: 'developed',
      },
      {
        id: 'v3',
        pattern: 'have been + ___',
        explanation: '"have been" 后接过去分词构成完成时被动',
        example: 'The regulations have been ___ to address new challenges.',
        fill: 'updated',
      },
      {
        id: 'v4',
        pattern: 'have sth + ___',
        explanation: '"have sth done" 使役结构，空格填过去分词',
        example: 'She had her thesis ___ before the deadline.',
        fill: 'reviewed',
      },
      {
        id: 'v5',
        pattern: 'modal + ___',
        explanation: '情态动词（can/must/should/will等）后接动词原形',
        example: 'Governments must ___ stricter environmental policies.',
        fill: 'implement',
      },
      {
        id: 'v6',
        pattern: 'that/which + ___',
        explanation: '关系从句中，关系词后接动词，需注意主谓一致',
        example: 'The study that ___ for five years produced remarkable results.',
        fill: 'continued',
      },
      {
        id: 'v7',
        pattern: 'Subject + ___ (主谓一致)',
        explanation: '单数主语用第三人称单数动词；复数/不可数名词用原形',
        example: 'Each of the participants ___ given a questionnaire.',
        fill: 'was',
      },
    ],
  },
  {
    id: 'adj',
    label: '形容词结构',
    emoji: '🟡',
    color: 'bg-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    rules: [
      {
        id: 'a1',
        pattern: 'a/an + ___ + noun',
        explanation: '不定冠词与名词之间填形容词（注意 a/an 选择暗示首字母）',
        example: 'The discovery had an ___ impact on medical research.',
        fill: 'enormous',
      },
      {
        id: 'a2',
        pattern: 'be + ___ + prep',
        explanation: 'be动词后接形容词，再接固定介词（be adj of/in/for/with/about）',
        example: 'Researchers are ___ of the long-term consequences.',
        fill: 'aware',
      },
      {
        id: 'a3',
        pattern: 'stay/remain + ___',
        explanation: '半系动词（stay, remain, become, seem）后接形容词作表语',
        example: 'The patient remained ___ throughout the treatment.',
        fill: 'stable',
      },
      {
        id: 'a4',
        pattern: 'it is ___ that',
        explanation: '"it is... that" 强调结构，空格填形容词',
        example: 'It is ___ that early intervention leads to better outcomes.',
        fill: 'evident',
      },
      {
        id: 'a5',
        pattern: 'noun + be + ___',
        explanation: '主系表结构，主语后接 be 动词，空格填形容词作表语',
        example: 'The findings were ___ with previous studies.',
        fill: 'consistent',
      },
      {
        id: 'a6',
        pattern: 'more/most + ___',
        explanation: '比较级（more）或最高级（most）后接形容词原级',
        example: 'Urban areas tend to be more ___ than rural regions.',
        fill: 'diverse',
      },
    ],
  },
  {
    id: 'adv',
    label: '副词结构',
    emoji: '🟠',
    color: 'bg-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-800',
    rules: [
      {
        id: 'adv1',
        pattern: '___ + adj',
        explanation: '若空格后紧跟形容词，则空格填副词（-ly形式）',
        example: 'The treatment proved ___ effective in clinical trials.',
        fill: 'remarkably',
      },
      {
        id: 'adv2',
        pattern: '___ + verb',
        explanation: '空格在动词前后，需填副词来修饰动词',
        example: 'The population has ___ increased over the past decade.',
        fill: 'significantly',
      },
      {
        id: 'adv3',
        pattern: ', ___ ,（逗号包围）',
        explanation: '空格两侧都有逗号，通常填连接副词或插入语（however, therefore, moreover等）',
        example: 'The data, ___, suggest a strong correlation between the two variables.',
        fill: 'however',
      },
    ],
  },
  {
    id: 'conj',
    label: '连词结构',
    emoji: '🔴',
    color: 'bg-red-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    rules: [
      {
        id: 'c1',
        pattern: 'A and/or ___（并列结构）',
        explanation: '并列连词（and/or/but）要求前后词性和结构相同',
        example: 'The policy benefits both urban ___ rural communities.',
        fill: 'and',
      },
      {
        id: 'c2',
        pattern: '[完整句] ___ [完整句]',
        explanation: '两个完整句子中间填从属连词（although/because/while/whereas）',
        example: '___ the study had limitations, its conclusions were widely accepted.',
        fill: 'Although',
      },
    ],
  },
  {
    id: 'prep',
    label: '介词结构',
    emoji: '🟣',
    color: 'bg-purple-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
    rules: [
      {
        id: 'p1',
        pattern: 'by + ___',
        explanation: '"by" 作方式介词后接动名词（-ing）',
        example: 'Researchers improved efficiency by ___ automation tools.',
        fill: 'using',
      },
      {
        id: 'p2',
        pattern: 'with sth + ___',
        explanation: '"with + 名词 + 过去分词" 构成独立主格，空格填过去分词',
        example: 'With all variables ___, the experiment could proceed.',
        fill: 'controlled',
      },
    ],
  },
  {
    id: 'nonfinite',
    label: '非谓语结构',
    emoji: '⚫',
    color: 'bg-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-800',
    rules: [
      {
        id: 'nf1',
        pattern: 'noun + ___ + prep',
        explanation: '名词之后、介词之前的空格，通常填过去分词作后置定语',
        example: 'The data ___ in the study were collected over two years.',
        fill: 'presented',
      },
      {
        id: 'nf2',
        pattern: ', ___ + noun phrase（句首/逗号后）',
        explanation: '逗号后空格后紧跟名词短语，通常填现在分词（-ing）作状语',
        example: '___ a new approach, the team achieved better results.',
        fill: 'Adopting',
      },
    ],
  },
]

// ─── FIB 机经固定搭配 ──────────────────────────────────────────────────────────

export const FIB_COLLOC_GROUPS: FIBCollocGroup[] = [
  {
    id: 'v-n-prep',
    label: '动词 + 名词 + 介词',
    color: 'bg-blue-500',
    items: [
      { phrase: 'account for', meaning: '占…比例；解释' },
      { phrase: 'contribute to', meaning: '贡献于；导致' },
      { phrase: 'result in', meaning: '导致；造成' },
      { phrase: 'lead to', meaning: '导致；引起' },
      { phrase: 'apply for', meaning: '申请' },
      { phrase: 'benefit from', meaning: '从…中获益' },
      { phrase: 'suffer from', meaning: '受…之苦' },
      { phrase: 'focus on', meaning: '专注于；集中于' },
      { phrase: 'rely on', meaning: '依靠；依赖' },
      { phrase: 'depend on', meaning: '取决于；依赖' },
      { phrase: 'insist on', meaning: '坚持' },
      { phrase: 'work on', meaning: '致力于；研究' },
      { phrase: 'deal with', meaning: '处理；应对' },
      { phrase: 'engage in', meaning: '参与；从事' },
      { phrase: 'participate in', meaning: '参与；加入' },
      { phrase: 'invest in', meaning: '投资于' },
      { phrase: 'result from', meaning: '由…引起；源于' },
      { phrase: 'consist of', meaning: '由…组成' },
      { phrase: 'aim at', meaning: '针对；旨在' },
      { phrase: 'draw on', meaning: '利用；借鉴' },
      { phrase: 'adapt to', meaning: '适应' },
      { phrase: 'respond to', meaning: '回应；应对' },
      { phrase: 'adhere to', meaning: '遵守；坚持' },
      { phrase: 'conform to', meaning: '遵从；符合' },
      { phrase: 'subscribe to', meaning: '赞同；订阅' },
    ],
  },
  {
    id: 'v-prep',
    label: '动词 + 介词',
    color: 'bg-green-500',
    items: [
      { phrase: 'agree with', meaning: '同意；与…一致' },
      { phrase: 'argue for', meaning: '支持；论证' },
      { phrase: 'object to', meaning: '反对' },
      { phrase: 'refer to', meaning: '提及；参考' },
      { phrase: 'translate into', meaning: '翻译成；转化为' },
      { phrase: 'interfere with', meaning: '干扰；妨碍' },
      { phrase: 'cooperate with', meaning: '合作' },
      { phrase: 'comply with', meaning: '遵守；服从' },
      { phrase: 'succeed in', meaning: '在…中成功' },
      { phrase: 'specialise in', meaning: '专门从事' },
      { phrase: 'differ from', meaning: '与…不同' },
      { phrase: 'derive from', meaning: '源于；来自' },
      { phrase: 'stem from', meaning: '源于；起源于' },
      { phrase: 'emerge from', meaning: '从…中出现' },
      { phrase: 'evolve from', meaning: '从…演化' },
      { phrase: 'abstain from', meaning: '戒除；回避' },
      { phrase: 'refrain from', meaning: '克制；避免' },
      { phrase: 'deviate from', meaning: '偏离' },
      { phrase: 'benefit from', meaning: '受益于' },
      { phrase: 'recover from', meaning: '从…中恢复' },
      { phrase: 'proceed with', meaning: '继续进行' },
      { phrase: 'cope with', meaning: '应对；处理' },
      { phrase: 'collaborate with', meaning: '与…合作' },
      { phrase: 'interfere with', meaning: '干涉；阻碍' },
      { phrase: 'equate with', meaning: '等同于' },
    ],
  },
  {
    id: 'v-adv',
    label: '动词 + 副词',
    color: 'bg-teal-500',
    items: [
      { phrase: 'carry out', meaning: '执行；实施' },
      { phrase: 'put forward', meaning: '提出；提议' },
      { phrase: 'give up', meaning: '放弃' },
      { phrase: 'set up', meaning: '建立；创立' },
      { phrase: 'point out', meaning: '指出；说明' },
      { phrase: 'bring about', meaning: '导致；引起' },
      { phrase: 'find out', meaning: '查明；发现' },
      { phrase: 'look into', meaning: '调查；研究' },
      { phrase: 'work out', meaning: '解决；算出' },
      { phrase: 'break down', meaning: '崩溃；分解；故障' },
      { phrase: 'come across', meaning: '偶然发现；遇见' },
      { phrase: 'take up', meaning: '占据；开始从事' },
      { phrase: 'get on', meaning: '相处；进展' },
      { phrase: 'turn out', meaning: '结果是；证明' },
      { phrase: 'show up', meaning: '出现；显现' },
      { phrase: 'draw up', meaning: '起草；制定' },
      { phrase: 'build up', meaning: '积累；增强' },
      { phrase: 'make up', meaning: '构成；组成' },
      { phrase: 'narrow down', meaning: '缩小；限制' },
      { phrase: 'scale up', meaning: '扩大规模' },
    ],
  },
  {
    id: 'be-adj-prep',
    label: 'be + 形容词 + 介词',
    color: 'bg-violet-500',
    items: [
      { phrase: 'be responsible for', meaning: '负责；对…负责' },
      { phrase: 'be aware of', meaning: '意识到；知道' },
      { phrase: 'be capable of', meaning: '有能力做' },
      { phrase: 'be interested in', meaning: '对…感兴趣' },
      { phrase: 'be based on', meaning: '基于；以…为基础' },
      { phrase: 'be involved in', meaning: '参与；涉及' },
      { phrase: 'be concerned with', meaning: '与…有关；关注' },
      { phrase: 'be associated with', meaning: '与…有关联' },
      { phrase: 'be committed to', meaning: '致力于；承诺' },
      { phrase: 'be dedicated to', meaning: '致力于；献身于' },
      { phrase: 'be exposed to', meaning: '暴露于；接触' },
      { phrase: 'be related to', meaning: '与…相关' },
      { phrase: 'be eligible for', meaning: '有资格获得' },
      { phrase: 'be suitable for', meaning: '适合' },
      { phrase: 'be known for', meaning: '以…著名' },
      { phrase: 'be satisfied with', meaning: '对…满意' },
      { phrase: 'be familiar with', meaning: '熟悉' },
      { phrase: 'be consistent with', meaning: '与…一致' },
      { phrase: 'be compatible with', meaning: '与…兼容' },
      { phrase: 'be representative of', meaning: '代表；体现' },
      { phrase: 'be conducive to', meaning: '有助于；有利于' },
      { phrase: 'be attributed to', meaning: '归因于' },
      { phrase: 'be critical of', meaning: '批评；挑剔' },
      { phrase: 'be dependent on', meaning: '依赖于' },
      { phrase: 'be independent of', meaning: '独立于；不依赖' },
    ],
  },
  {
    id: 'n-prep',
    label: '名词 + 介词',
    color: 'bg-orange-500',
    items: [
      { phrase: 'attitude towards/to', meaning: '对…的态度' },
      { phrase: 'awareness of', meaning: '对…的意识' },
      { phrase: 'impact on', meaning: '对…的影响' },
      { phrase: 'influence on', meaning: '对…的影响力' },
      { phrase: 'access to', meaning: '获得…的途径' },
      { phrase: 'approach to', meaning: '处理…的方式' },
      { phrase: 'solution to', meaning: '…的解决方案' },
      { phrase: 'contribution to', meaning: '对…的贡献' },
      { phrase: 'demand for', meaning: '对…的需求' },
      { phrase: 'need for', meaning: '对…的需要' },
      { phrase: 'concern about', meaning: '对…的担忧' },
      { phrase: 'belief in', meaning: '对…的信念' },
      { phrase: 'confidence in', meaning: '对…的信心' },
      { phrase: 'interest in', meaning: '对…的兴趣' },
      { phrase: 'investment in', meaning: '对…的投资' },
      { phrase: 'lack of', meaning: '缺乏' },
      { phrase: 'variety of', meaning: '各种各样的' },
      { phrase: 'combination of', meaning: '…的组合' },
      { phrase: 'understanding of', meaning: '对…的理解' },
      { phrase: 'emphasis on', meaning: '对…的强调' },
      { phrase: 'reliance on', meaning: '对…的依赖' },
      { phrase: 'impact of', meaning: '…的影响' },
      { phrase: 'extent of', meaning: '…的程度' },
      { phrase: 'role of', meaning: '…的作用/角色' },
      { phrase: 'basis for', meaning: '…的基础/依据' },
    ],
  },
  {
    id: 'prep-phrase',
    label: '介词短语',
    color: 'bg-red-500',
    items: [
      { phrase: 'in terms of', meaning: '就…而言；从…角度' },
      { phrase: 'in favour of', meaning: '支持；赞成' },
      { phrase: 'in accordance with', meaning: '按照；与…一致' },
      { phrase: 'in addition to', meaning: '除…之外；另外' },
      { phrase: 'in contrast to', meaning: '与…相反；对比' },
      { phrase: 'in spite of', meaning: '尽管；不顾' },
      { phrase: 'in response to', meaning: '回应；针对' },
      { phrase: 'on behalf of', meaning: '代表' },
      { phrase: 'on the basis of', meaning: '基于；根据' },
      { phrase: 'with regard to', meaning: '关于；就…而言' },
      { phrase: 'with respect to', meaning: '关于；对于' },
      { phrase: 'as a result of', meaning: '由于；因为' },
      { phrase: 'by means of', meaning: '通过；凭借' },
      { phrase: 'at the expense of', meaning: '以…为代价' },
      { phrase: 'for the purpose of', meaning: '为了；以…为目的' },
      { phrase: 'in the light of', meaning: '鉴于；根据' },
      { phrase: 'on the grounds of', meaning: '以…为理由' },
      { phrase: 'by virtue of', meaning: '凭借；由于' },
      { phrase: 'in the context of', meaning: '在…背景下' },
      { phrase: 'in line with', meaning: '与…一致；符合' },
      { phrase: 'as opposed to', meaning: '与…相对；而不是' },
      { phrase: 'in conjunction with', meaning: '与…结合；连同' },
      { phrase: 'with a view to', meaning: '为了；以便' },
      { phrase: 'in the wake of', meaning: '紧随；作为…的结果' },
      { phrase: 'at the heart of', meaning: '在…核心；…的关键' },
    ],
  },
  {
    id: 'v-phrase',
    label: '动词短语',
    color: 'bg-pink-500',
    items: [
      { phrase: 'take into account', meaning: '考虑到；顾及' },
      { phrase: 'bring to light', meaning: '揭露；使公开' },
      { phrase: 'come into effect', meaning: '生效；实施' },
      { phrase: 'take place', meaning: '发生；举行' },
      { phrase: 'make progress', meaning: '取得进展' },
      { phrase: 'make a difference', meaning: '产生影响；有意义' },
      { phrase: 'take part in', meaning: '参与；参加' },
      { phrase: 'give rise to', meaning: '引起；导致' },
      { phrase: 'come to terms with', meaning: '接受；适应' },
      { phrase: 'play a role in', meaning: '在…中扮演角色' },
      { phrase: 'pay attention to', meaning: '注意；关注' },
      { phrase: 'take advantage of', meaning: '利用；占…便宜' },
      { phrase: 'make use of', meaning: '利用；使用' },
      { phrase: 'lose sight of', meaning: '忽视；忘记' },
      { phrase: 'keep track of', meaning: '追踪；记录' },
      { phrase: 'fall short of', meaning: '达不到；不符合' },
      { phrase: 'live up to', meaning: '达到（期望）；不辜负' },
      { phrase: 'call for', meaning: '要求；呼吁' },
      { phrase: 'stand for', meaning: '代表；象征' },
      { phrase: 'account for', meaning: '解释；占（比例）' },
      { phrase: 'give way to', meaning: '让步于；被…取代' },
      { phrase: 'put emphasis on', meaning: '强调；着重' },
      { phrase: 'take effect', meaning: '生效；起作用' },
      { phrase: 'bear in mind', meaning: '记住；牢记' },
      { phrase: 'go hand in hand', meaning: '密切相关；并行' },
    ],
  },
  {
    id: 'n-phrase',
    label: '名词短语',
    color: 'bg-amber-500',
    items: [
      { phrase: 'climate change', meaning: '气候变化' },
      { phrase: 'economic growth', meaning: '经济增长' },
      { phrase: 'social inequality', meaning: '社会不平等' },
      { phrase: 'global warming', meaning: '全球变暖' },
      { phrase: 'public health', meaning: '公共健康' },
      { phrase: 'renewable energy', meaning: '可再生能源' },
      { phrase: 'technological advancement', meaning: '技术进步' },
      { phrase: 'environmental impact', meaning: '环境影响' },
      { phrase: 'sustainable development', meaning: '可持续发展' },
      { phrase: 'human rights', meaning: '人权' },
      { phrase: 'quality of life', meaning: '生活质量' },
      { phrase: 'standard of living', meaning: '生活水平' },
      { phrase: 'carbon emissions', meaning: '碳排放' },
      { phrase: 'artificial intelligence', meaning: '人工智能' },
      { phrase: 'mental health', meaning: '心理健康' },
      { phrase: 'digital technology', meaning: '数字技术' },
      { phrase: 'natural resources', meaning: '自然资源' },
      { phrase: 'cultural diversity', meaning: '文化多样性' },
      { phrase: 'academic achievement', meaning: '学业成就' },
      { phrase: 'critical thinking', meaning: '批判性思维' },
      { phrase: 'scientific research', meaning: '科学研究' },
      { phrase: 'market economy', meaning: '市场经济' },
      { phrase: 'urban development', meaning: '城市发展' },
      { phrase: 'living standards', meaning: '生活标准' },
      { phrase: 'social welfare', meaning: '社会福利' },
    ],
  },
  {
    id: 'v-obj',
    label: '动宾搭配',
    color: 'bg-lime-600',
    items: [
      { phrase: 'conduct research', meaning: '进行研究' },
      { phrase: 'raise awareness', meaning: '提高意识' },
      { phrase: 'achieve goals', meaning: '实现目标' },
      { phrase: 'address issues', meaning: '解决/处理问题' },
      { phrase: 'implement policies', meaning: '实施政策' },
      { phrase: 'develop skills', meaning: '培养技能' },
      { phrase: 'make decisions', meaning: '做决定' },
      { phrase: 'provide opportunities', meaning: '提供机会' },
      { phrase: 'gain experience', meaning: '获得经验' },
      { phrase: 'meet requirements', meaning: '满足要求' },
      { phrase: 'maintain standards', meaning: '维持标准' },
      { phrase: 'reduce risks', meaning: '降低风险' },
      { phrase: 'increase productivity', meaning: '提高生产力' },
      { phrase: 'promote growth', meaning: '促进增长' },
      { phrase: 'support development', meaning: '支持发展' },
      { phrase: 'encourage participation', meaning: '鼓励参与' },
      { phrase: 'ensure compliance', meaning: '确保合规' },
      { phrase: 'facilitate communication', meaning: '促进沟通' },
      { phrase: 'acknowledge contributions', meaning: '承认贡献' },
      { phrase: 'draw conclusions', meaning: '得出结论' },
      { phrase: 'seek solutions', meaning: '寻求解决方案' },
      { phrase: 'pose challenges', meaning: '带来挑战' },
      { phrase: 'bridge gaps', meaning: '弥合差距' },
      { phrase: 'shape outcomes', meaning: '塑造结果' },
      { phrase: 'drive innovation', meaning: '推动创新' },
    ],
  },
  {
    id: 'other',
    label: '其他固定搭配',
    color: 'bg-gray-600',
    items: [
      { phrase: 'in other words', meaning: '换句话说' },
      { phrase: 'on the other hand', meaning: '另一方面' },
      { phrase: 'as a matter of fact', meaning: '事实上' },
      { phrase: 'to a certain extent', meaning: '在一定程度上' },
      { phrase: 'in particular', meaning: '特别是；尤其' },
      { phrase: 'for instance', meaning: '例如' },
      { phrase: 'in general', meaning: '总体而言；一般来说' },
      { phrase: 'as a whole', meaning: '作为整体；总体上' },
      { phrase: 'in the long run', meaning: '从长远来看' },
      { phrase: 'by and large', meaning: '总体来说；大体上' },
      { phrase: 'more or less', meaning: '或多或少；大约' },
      { phrase: 'above all', meaning: '最重要的是；尤其' },
      { phrase: 'after all', meaning: '毕竟；终究' },
      { phrase: 'in turn', meaning: '反过来；依次' },
      { phrase: 'at the same time', meaning: '同时；与此同时' },
      { phrase: 'on the contrary', meaning: '相反；恰恰相反' },
      { phrase: 'needless to say', meaning: '不必说；当然' },
      { phrase: 'all things considered', meaning: '综合考虑；总的来说' },
      { phrase: 'to some extent', meaning: '在某种程度上' },
      { phrase: 'as far as … is concerned', meaning: '就…而言' },
      { phrase: 'it is worth noting that', meaning: '值得注意的是' },
      { phrase: 'there is no doubt that', meaning: '毫无疑问' },
      { phrase: 'it goes without saying', meaning: '不言而喻' },
      { phrase: 'to put it simply', meaning: '简而言之' },
      { phrase: 'by the same token', meaning: '同样地；出于同样的理由' },
    ],
  },
]

// ─── RO Interfaces ────────────────────────────────────────────────────────────

export interface ROSentence {
  key: string
  text: string
  zh: string
}

export interface ROKeyword {
  from: string
  to: string
  word: string
}

export interface ROItem {
  id: number
  title: string
  titleEn: string
  tag: '预测' | '解析' | '不完整'
  order: string[]
  sentences: ROSentence[]
  rhyme?: string
  keywords: ROKeyword[]
  note?: string
}

export const RO_STRATEGY_TIPS = [
  { icon: '🔍', title: '找首句', desc: '首句通常是话题引入句——含有定义、背景介绍，或无代词/指代词，不以 "however/but/this/these" 开头' },
  { icon: '🔗', title: '找连接词', desc: '"however, therefore, in contrast, furthermore, as a result" 等提示逻辑关系，帮助判断前后句' },
  { icon: '👆', title: '找指代词', desc: '"this, these, it, they, such, the + noun" 等指代词指向前文已出现的内容，顺藤摸瓜找前句' },
  { icon: '⏰', title: '找时间词', desc: '时间副词（first, then, later, finally, initially, subsequently）暗示时间或逻辑顺序' },
  { icon: '🔁', title: '找重复词', desc: '相邻句往往有词汇重复或同义替换，如前句出现 "problem" 后句出现 "issue/challenge"' },
  { icon: '📌', title: '排除法', desc: '先确定首句（最有把握），再从剩余句子中找末句（总结句、结论句），中间句按逻辑填入' },
]

export const RO_EXAMPLES: ROItem[] = [
  {
    id: 1,
    title: '工业革命与城市化',
    titleEn: 'Industrial Revolution and Urbanisation',
    tag: '预测',
    order: ['B', 'D', 'A', 'C', 'E'],
    sentences: [
      { key: 'A', text: 'This shift resulted in the rapid growth of cities, as workers moved to urban centres to find employment in factories.', zh: '这一转变导致了城市的快速增长，因为工人们涌向城市中心在工厂寻找工作。' },
      { key: 'B', text: 'The Industrial Revolution, which began in Britain in the late 18th century, fundamentally transformed the way people lived and worked.', zh: '工业革命始于18世纪末的英国，从根本上改变了人们的生活和工作方式。' },
      { key: 'C', text: 'These new urban populations faced significant challenges, including overcrowding, poor sanitation, and unsafe working conditions.', zh: '这些新兴城市人口面临着严峻挑战，包括过度拥挤、卫生条件恶劣和不安全的工作环境。' },
      { key: 'D', text: 'Prior to this period, most people lived in rural areas and were engaged in agricultural work.', zh: '在此之前，大多数人居住在农村地区，从事农业劳动。' },
      { key: 'E', text: 'Governments were eventually forced to introduce reforms to address these social problems and improve living standards.', zh: '政府最终被迫推行改革，以解决这些社会问题并提高生活水平。' },
    ],
    rhyme: '革命开始(B) → 以前状况(D) → 工人移城(A) → 面临挑战(C) → 政府改革(E)',
    keywords: [
      { from: 'B', to: 'D', word: 'prior to this period（时间对照）' },
      { from: 'D', to: 'A', word: 'This shift（指代D中的转变）' },
      { from: 'A', to: 'C', word: 'These new urban populations（指代A中城市工人）' },
      { from: 'C', to: 'E', word: 'these social problems（指代C中各种挑战）' },
    ],
    note: '首句明显：B含 "Industrial Revolution" 定义性引入，无代词。D的 "Prior to this period" 承接B的时间设定。',
  },
  {
    id: 2,
    title: '科学方法的步骤',
    titleEn: 'Steps of the Scientific Method',
    tag: '预测',
    order: ['C', 'A', 'E', 'B', 'D'],
    sentences: [
      { key: 'A', text: 'Once a hypothesis has been formulated, scientists design and conduct experiments to test whether it is correct.', zh: '一旦假设形成，科学家就会设计并进行实验来检验其是否正确。' },
      { key: 'B', text: 'The data gathered from these experiments are then carefully analysed to identify patterns and draw conclusions.', zh: '从这些实验中收集的数据随后被仔细分析，以识别规律并得出结论。' },
      { key: 'C', text: 'The scientific method is a systematic approach used by researchers to investigate natural phenomena and acquire new knowledge.', zh: '科学方法是研究人员用来调查自然现象和获取新知识的系统性方法。' },
      { key: 'D', text: 'If the results support the hypothesis, it may eventually be accepted as a scientific theory after repeated testing.', zh: '如果结果支持假设，经过反复验证后，它最终可能被接受为科学理论。' },
      { key: 'E', text: 'The process begins with observation, which leads to the formation of a hypothesis — a tentative explanation for what has been observed.', zh: '这一过程从观察开始，继而形成假设——对所观察到的现象的初步解释。' },
    ],
    rhyme: '定义方法(C) → 开始观察(E) → 设计实验(A) → 分析数据(B) → 验证理论(D)',
    keywords: [
      { from: 'C', to: 'E', word: 'The process begins（承接C中method的步骤）' },
      { from: 'E', to: 'A', word: 'a hypothesis has been formulated（指代E中hypothesis的下一步）' },
      { from: 'A', to: 'B', word: 'these experiments（指代A中的实验）' },
      { from: 'B', to: 'D', word: 'the results（指代B中的分析结果）' },
    ],
    note: 'C是典型首句（定义句），E含 "The process begins" 标志流程开始，D含 "eventually" 暗示最后一步。',
  },
  {
    id: 3,
    title: '社交媒体对青少年的影响',
    titleEn: 'Impact of Social Media on Adolescents',
    tag: '解析',
    order: ['D', 'B', 'A', 'E', 'C'],
    sentences: [
      { key: 'A', text: 'On the other hand, excessive use of social media has been linked to increased rates of anxiety and depression among young people.', zh: '另一方面，过度使用社交媒体与青少年焦虑和抑郁发病率上升有关联。' },
      { key: 'B', text: 'Platforms such as Instagram and TikTok allow users to connect with others, share creative content, and access educational resources.', zh: 'Instagram和TikTok等平台让用户可以与他人联系、分享创意内容，并获取教育资源。' },
      { key: 'C', text: 'Therefore, a balanced approach to social media use, supported by parental guidance and digital literacy education, is essential.', zh: '因此，在家长引导和数字素养教育的支持下，采用平衡的社交媒体使用方式至关重要。' },
      { key: 'D', text: 'Social media has become an integral part of the daily lives of teenagers around the world.', zh: '社交媒体已成为全球青少年日常生活不可或缺的一部分。' },
      { key: 'E', text: 'Research suggests that the constant need for validation through likes and comments can negatively affect self-esteem.', zh: '研究表明，通过点赞和评论不断寻求认可的需求可能对自尊心产生负面影响。' },
    ],
    rhyme: '引入话题(D) → 正面优点(B) → 转折缺点(A) → 深化影响(E) → 总结建议(C)',
    keywords: [
      { from: 'D', to: 'B', word: 'Platforms（具体展开D中的social media）' },
      { from: 'B', to: 'A', word: 'On the other hand（转折，对比B的正面内容）' },
      { from: 'A', to: 'E', word: 'Research suggests（补充说明A中的负面影响）' },
      { from: 'E', to: 'C', word: 'Therefore（结论词，引出C的建议）' },
    ],
    note: 'C含 "Therefore" 是结论句，确定为末句。A含 "On the other hand" 需要前有正面内容，故B在A之前。',
  },
  {
    id: 4,
    title: '可再生能源的发展',
    titleEn: 'Development of Renewable Energy',
    tag: '预测',
    order: ['A', 'C', 'E', 'B', 'D'],
    sentences: [
      { key: 'A', text: 'The global demand for clean and sustainable energy sources has grown dramatically in recent decades, driven by concerns about climate change.', zh: '近几十年来，受气候变化担忧的驱动，全球对清洁可持续能源的需求急剧增长。' },
      { key: 'B', text: 'Wind energy, similarly, has seen rapid expansion, with offshore wind farms now capable of generating electricity for millions of households.', zh: '风能同样实现了快速扩张，海上风电场如今能够为数百万家庭提供电力。' },
      { key: 'C', text: 'Among the various renewable technologies, solar power has emerged as one of the most promising solutions.', zh: '在各种可再生能源技术中，太阳能已成为最具前景的解决方案之一。' },
      { key: 'D', text: 'Despite these advances, significant challenges remain, including the intermittent nature of renewable sources and the need for improved energy storage systems.', zh: '尽管取得了这些进展，但重大挑战依然存在，包括可再生能源的间歇性特点以及改进储能系统的需求。' },
      { key: 'E', text: 'The cost of solar panels has fallen by over 80% in the past decade, making it increasingly accessible to both individuals and businesses.', zh: '过去十年间，太阳能电池板的成本下降了80%以上，使其对个人和企业越来越触手可及。' },
    ],
    rhyme: '需求背景(A) → 太阳能介绍(C) → 成本下降(E) → 风能类比(B) → 挑战总结(D)',
    keywords: [
      { from: 'A', to: 'C', word: 'renewable technologies（承接A中的clean energy）' },
      { from: 'C', to: 'E', word: 'solar power → solar panels（词汇重复）' },
      { from: 'E', to: 'B', word: 'Wind energy, similarly（similarly与太阳能并列）' },
      { from: 'B', to: 'D', word: 'Despite these advances（对比B/E中的progress）' },
    ],
    note: 'D含 "Despite these advances" 是转折总结句，A无代词且含背景信息，确定为首句。',
  },
  {
    id: 5,
    title: '生物多样性的重要性',
    titleEn: 'Importance of Biodiversity',
    tag: '解析',
    order: ['E', 'B', 'D', 'A', 'C'],
    sentences: [
      { key: 'A', text: 'For example, many pharmaceutical drugs have been derived from compounds found in rainforest plants and marine organisms.', zh: '例如，许多药物是从雨林植物和海洋生物中发现的化合物中提取的。' },
      { key: 'B', text: 'Biodiversity refers to the variety of life forms found on Earth, including plants, animals, fungi, and microorganisms.', zh: '生物多样性是指地球上生命形式的多样性，包括植物、动物、真菌和微生物。' },
      { key: 'C', text: 'Protecting biodiversity is therefore not merely an environmental concern but also a matter of human survival and wellbeing.', zh: '因此，保护生物多样性不仅仅是环境问题，也是人类生存与福祉的问题。' },
      { key: 'D', text: 'This rich variety of species provides essential ecosystem services, such as pollination, water purification, and climate regulation.', zh: '这种丰富的物种多样性提供了必不可少的生态系统服务，如授粉、水净化和气候调节。' },
      { key: 'E', text: 'The natural world supports human life in ways that are often overlooked or taken for granted.', zh: '自然界以人们常常忽视或认为理所当然的方式支撑着人类生活。' },
    ],
    rhyme: '自然支撑(E) → 多样性定义(B) → 生态服务(D) → 药物举例(A) → 保护结论(C)',
    keywords: [
      { from: 'E', to: 'B', word: 'Biodiversity（B给出E中"natural world"的具体定义）' },
      { from: 'B', to: 'D', word: 'This rich variety（指代B中描述的多样性）' },
      { from: 'D', to: 'A', word: 'For example（举例说明D中的ecosystem services）' },
      { from: 'A', to: 'C', word: 'therefore（总结前文，引出保护结论）' },
    ],
    note: 'B是典型定义句（Biodiversity refers to...），但E的铺垫性更强，E→B建立起"自然→生物多样性"的逻辑。',
  },
  {
    id: 6,
    title: '人工智能与就业市场',
    titleEn: 'Artificial Intelligence and the Labour Market',
    tag: '预测',
    order: ['C', 'A', 'D', 'B', 'E'],
    sentences: [
      { key: 'A', text: 'While automation has historically displaced certain types of manual labour, it has also created new industries and job categories.', zh: '虽然自动化历来会取代某些类型的体力劳动，但它也创造了新的行业和职业类别。' },
      { key: 'B', text: 'However, the pace of AI-driven change is unprecedented, raising concerns that many workers will not be able to adapt quickly enough.', zh: '然而，人工智能驱动的变革速度前所未有，引发了人们对许多工人无法足够快速适应的担忧。' },
      { key: 'C', text: 'Artificial intelligence is rapidly transforming the global economy and reshaping the nature of work across nearly every industry.', zh: '人工智能正在迅速改变全球经济，并重塑几乎每个行业的工作性质。' },
      { key: 'D', text: 'The rise of AI-powered tools in fields such as law, medicine, and finance suggests that even highly skilled professions are not immune to disruption.', zh: '人工智能工具在法律、医疗和金融等领域的兴起表明，即使是高技能职业也无法免受颠覆。' },
      { key: 'E', text: 'Addressing this challenge will require investment in education and retraining programmes to equip workers with the skills needed for an AI-driven economy.', zh: '应对这一挑战需要投资教育和再培训项目，为工人配备人工智能驱动经济所需的技能。' },
    ],
    rhyme: '引入AI(C) → 历史对比(A) → 高端也受影响(D) → 但速度太快(B) → 解决建议(E)',
    keywords: [
      { from: 'C', to: 'A', word: 'automation（历史视角回应C中的AI transformation）' },
      { from: 'A', to: 'D', word: 'The rise of AI-powered tools（具体化A中的新行业受冲击）' },
      { from: 'D', to: 'B', word: 'However（转折，B提出更深层担忧）' },
      { from: 'B', to: 'E', word: 'Addressing this challenge（指代B中的concerns）' },
    ],
    note: 'E含 "Addressing this challenge" 和建议性语气，是典型末句。C无代词为首句。',
  },
  {
    id: 7,
    title: '城市热岛效应',
    titleEn: 'Urban Heat Island Effect',
    tag: '解析',
    order: ['D', 'A', 'C', 'E', 'B'],
    sentences: [
      { key: 'A', text: 'This phenomenon occurs because urban surfaces such as concrete and asphalt absorb and retain more heat than natural vegetation.', zh: '这种现象的发生是因为混凝土和沥青等城市表面比天然植被吸收和保留更多的热量。' },
      { key: 'B', text: 'Urban planners are increasingly incorporating green spaces, reflective surfaces, and tree-planting initiatives to combat this problem.', zh: '城市规划者越来越多地纳入绿色空间、反光表面和植树活动来应对这一问题。' },
      { key: 'C', text: 'As a result, city residents experience higher temperatures than those living in surrounding rural areas, particularly during summer months.', zh: '因此，与周边农村地区的居民相比，城市居民经历更高的温度，尤其是在夏季。' },
      { key: 'D', text: 'The urban heat island effect is a well-documented climatic phenomenon in which cities are significantly warmer than nearby rural regions.', zh: '城市热岛效应是一种有据可查的气候现象，城市温度明显高于周边农村地区。' },
      { key: 'E', text: 'The health implications are serious, with increased risks of heat stroke, respiratory problems, and cardiovascular disease among urban populations.', zh: '健康影响十分严峻，城市人口中中暑、呼吸系统疾病和心血管疾病的风险均有所增加。' },
    ],
    rhyme: '定义现象(D) → 原因解释(A) → 因此影响(C) → 健康危害(E) → 应对措施(B)',
    keywords: [
      { from: 'D', to: 'A', word: 'This phenomenon（指代D中定义的现象）' },
      { from: 'A', to: 'C', word: 'As a result（原因A导致结果C）' },
      { from: 'C', to: 'E', word: 'higher temperatures → health implications（逻辑递进）' },
      { from: 'E', to: 'B', word: 'this problem（指代E中的health issues和温度问题）' },
    ],
    note: 'D是定义句（is a well-documented...phenomenon），无代词，是首句。B提出解决措施，是末句。',
  },
  {
    id: 8,
    title: '公共图书馆的演变',
    titleEn: 'Evolution of Public Libraries',
    tag: '预测',
    order: ['B', 'E', 'A', 'D', 'C'],
    sentences: [
      { key: 'A', text: 'Today, public libraries offer far more than books — they provide internet access, digital resources, community programmes, and quiet workspaces.', zh: '如今，公共图书馆提供的远不止书籍——它们还提供互联网接入、数字资源、社区项目和安静的工作空间。' },
      { key: 'B', text: 'Public libraries have long served as important cultural and educational institutions within their communities.', zh: '公共图书馆长期以来一直是社区内重要的文化和教育机构。' },
      { key: 'C', text: 'Rather than becoming obsolete in the digital age, libraries have reinvented themselves as dynamic community hubs.', zh: '图书馆非但没有在数字时代变得过时，反而将自身重塑为充满活力的社区中心。' },
      { key: 'D', text: 'This transformation has been driven by the need to remain relevant as more information becomes freely available online.', zh: '这一转型是由于随着更多信息可在网上免费获取，图书馆需要保持自身价值的驱动。' },
      { key: 'E', text: 'Originally, they served primarily as repositories for books and periodicals, accessible mainly to scholars and the educated elite.', zh: '最初，它们主要作为书籍和期刊的存储库，主要面向学者和受过教育的精英阶层。' },
    ],
    rhyme: '引入图书馆(B) → 最初功能(E) → 当今服务(A) → 转型原因(D) → 总结新角色(C)',
    keywords: [
      { from: 'B', to: 'E', word: 'Originally（时间对比，回看B中的历史角色）' },
      { from: 'E', to: 'A', word: 'Today（时间对比，从E的过去转到现在）' },
      { from: 'A', to: 'D', word: 'This transformation（指代A中描述的变化）' },
      { from: 'D', to: 'C', word: 'reinvented themselves（C总结D中的transformation结果）' },
    ],
    note: 'B含 "have long served" 是历史性概述句，无代词，是首句。C含 "Rather than" 转折总结，是末句。',
  },
  {
    id: 9,
    title: '睡眠与认知功能',
    titleEn: 'Sleep and Cognitive Function',
    tag: '解析',
    order: ['A', 'D', 'C', 'E', 'B'],
    sentences: [
      { key: 'A', text: 'Sleep is a fundamental biological process that plays a critical role in maintaining both physical health and cognitive function.', zh: '睡眠是一个基本的生物学过程，在维持身体健康和认知功能方面起着至关重要的作用。' },
      { key: 'B', text: 'Developing good sleep hygiene practices, such as maintaining a consistent sleep schedule and limiting screen time before bed, can significantly improve sleep quality.', zh: '养成良好的睡眠卫生习惯，如保持规律的睡眠时间表和睡前限制屏幕使用时间，可以显著改善睡眠质量。' },
      { key: 'C', text: 'Studies show that inadequate sleep impairs memory consolidation, reduces attention span, and slows reaction times.', zh: '研究表明，睡眠不足会损害记忆巩固、降低注意力持续时间并减慢反应时间。' },
      { key: 'D', text: 'During sleep, the brain consolidates memories, processes information, and clears metabolic waste products.', zh: '在睡眠期间，大脑会巩固记忆、处理信息并清除代谢废物。' },
      { key: 'E', text: 'Chronic sleep deprivation has also been associated with an increased risk of serious health conditions, including obesity, diabetes, and cardiovascular disease.', zh: '长期睡眠不足还与肥胖、糖尿病和心血管疾病等严重健康问题的风险增加有关。' },
    ],
    rhyme: '睡眠定义(A) → 大脑功能(D) → 睡眠不足危害(C) → 长期影响(E) → 改善建议(B)',
    keywords: [
      { from: 'A', to: 'D', word: 'During sleep（具体说明A中sleep的作用）' },
      { from: 'D', to: 'C', word: 'inadequate sleep（对比D中正常sleep的功能）' },
      { from: 'C', to: 'E', word: 'Chronic sleep deprivation（延伸C中的不足到慢性层面）' },
      { from: 'E', to: 'B', word: 'Developing good sleep hygiene（解决方案，回应前文所有问题）' },
    ],
    note: 'A是定义句（Sleep is a fundamental process），B是建议句（Developing...can...），分别是首末句。',
  },
  {
    id: 10,
    title: '全球化与文化同质化',
    titleEn: 'Globalisation and Cultural Homogenisation',
    tag: '不完整',
    order: ['C', 'E', 'B', 'A', 'D'],
    sentences: [
      { key: 'A', text: 'Critics argue that this dominance of Western culture threatens the survival of local traditions, languages, and customs.', zh: '批评者认为，西方文化的这种主导地位威胁着地方传统、语言和习俗的存续。' },
      { key: 'B', text: 'This process is largely driven by multinational corporations, global media, and the widespread use of the internet.', zh: '这一过程在很大程度上是由跨国公司、全球媒体和互联网的广泛使用推动的。' },
      { key: 'C', text: 'Globalisation has led to the widespread dissemination of cultural products, values, and lifestyles across national borders.', zh: '全球化导致了文化产品、价值观和生活方式在国界之间的广泛传播。' },
      { key: 'D', text: 'Others, however, suggest that globalisation can also promote cross-cultural exchange and a greater appreciation of diversity.', zh: '然而，另一些人认为，全球化也可以促进跨文化交流，使人们更欣赏多元文化。' },
      { key: 'E', text: 'As a result, a form of cultural homogenisation has emerged, with similar brands, music, and media content appearing in cities worldwide.', zh: '因此，一种文化同质化的形式已经出现，类似的品牌、音乐和媒体内容出现在世界各地的城市中。' },
    ],
    rhyme: '全球化传播(C) → 因此同质化(E) → 驱动力(B) → 批评威胁(A) → 反方观点(D)',
    keywords: [
      { from: 'C', to: 'E', word: 'As a result（C是原因，E是结果）' },
      { from: 'E', to: 'B', word: 'This process（指代C+E描述的全球化过程）' },
      { from: 'B', to: 'A', word: 'this dominance（指代B中跨国公司等的影响力）' },
      { from: 'A', to: 'D', word: 'Others, however（转折，引入反方观点）' },
    ],
    note: '此题标记为"不完整"——题目中可能缺少一个句子或选项不完整，备考时仍需熟悉核心逻辑链。C是首句（全球化定义+传播），D是末句（however转折提出另一视角）。',
  },
]
