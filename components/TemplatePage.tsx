'use client'
import { useState } from 'react'
import { WE_TEMPLATE, WE_TEMPLATE_PLAIN } from '@/lib/data'

export const SLOT_EXAMPLES: Record<string, string[]> = {
  '主题词': [
    'modern technology',
    'technological development',
    'public transportation',
    'formal education',
    'academic learning',
    'work-life balance',
    'economic development',
    'government policies',
    'public services',
    'environmental protection',
    'sustainable development',
    'social development',
    'mass media',
    'healthy lifestyles',
    'personal development',
  ],
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
    'better public services can help people solve daily problems more efficiently',
    'clear information can help individuals make wiser choices and avoid unnecessary risks',
    'families can enjoy a more stable life when social support is accessible and affordable',
    'schools and communities can work together to create a safer and more supportive environment',
    'governments can use public funding to improve infrastructure and reduce inequality',
    'companies can provide training programs to help employees adapt to rapid changes',
    'local residents can benefit from cleaner neighborhoods, better transport and stronger community ties',
    'young people can build confidence, independence and practical problem-solving skills',
    'public campaigns can encourage people to change harmful habits and make responsible decisions',
    'international cooperation can help countries share knowledge and address global challenges',
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

export const FIELD_OBJECT_SLOTS = new Set([
  '两个领域',
  '一个领域（人/机构/社会/经济等）',
  '机构/人名',
  '人名/机构名',
  '具体领域',
])

export const SLOT_BADGE_STYLES: Record<string, { idle: string; active: string; fallback: string; panel: string; hover: string }> = {
  '主题词': {
    idle: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100',
    active: 'bg-emerald-600 text-white border-emerald-600',
    fallback: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    panel: 'text-emerald-700 border-emerald-200',
    hover: 'hover:border-emerald-300 hover:bg-emerald-50',
  },
  '改写题目+句子': {
    idle: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
    active: 'bg-amber-600 text-white border-amber-600',
    fallback: 'bg-amber-50 text-amber-800 border-amber-200',
    panel: 'text-amber-700 border-amber-200',
    hover: 'hover:border-amber-300 hover:bg-amber-50',
  },
  '观点句': {
    idle: 'bg-violet-50 text-violet-800 border-violet-200 hover:bg-violet-100',
    active: 'bg-violet-600 text-white border-violet-600',
    fallback: 'bg-violet-50 text-violet-800 border-violet-200',
    panel: 'text-violet-700 border-violet-200',
    hover: 'hover:border-violet-300 hover:bg-violet-50',
  },
  '重申观点句': {
    idle: 'bg-violet-50 text-violet-800 border-violet-200 hover:bg-violet-100',
    active: 'bg-violet-600 text-white border-violet-600',
    fallback: 'bg-violet-50 text-violet-800 border-violet-200',
    panel: 'text-violet-700 border-violet-200',
    hover: 'hover:border-violet-300 hover:bg-violet-50',
  },
  '两个领域': {
    idle: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
    active: 'bg-sky-600 text-white border-sky-600',
    fallback: 'bg-sky-50 text-sky-800 border-sky-200',
    panel: 'text-sky-700 border-sky-200',
    hover: 'hover:border-sky-300 hover:bg-sky-50',
  },
  '一个领域（人/机构/社会/经济等）': {
    idle: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
    active: 'bg-sky-600 text-white border-sky-600',
    fallback: 'bg-sky-50 text-sky-800 border-sky-200',
    panel: 'text-sky-700 border-sky-200',
    hover: 'hover:border-sky-300 hover:bg-sky-50',
  },
  '具体领域': {
    idle: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
    active: 'bg-sky-600 text-white border-sky-600',
    fallback: 'bg-sky-50 text-sky-800 border-sky-200',
    panel: 'text-sky-700 border-sky-200',
    hover: 'hover:border-sky-300 hover:bg-sky-50',
  },
  '例子': {
    idle: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200 hover:bg-fuchsia-100',
    active: 'bg-fuchsia-600 text-white border-fuchsia-600',
    fallback: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200',
    panel: 'text-fuchsia-700 border-fuchsia-200',
    hover: 'hover:border-fuchsia-300 hover:bg-fuchsia-50',
  },
  '机构/人名': {
    idle: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
    active: 'bg-sky-600 text-white border-sky-600',
    fallback: 'bg-sky-50 text-sky-800 border-sky-200',
    panel: 'text-sky-700 border-sky-200',
    hover: 'hover:border-sky-300 hover:bg-sky-50',
  },
  '人名/机构名': {
    idle: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
    active: 'bg-sky-600 text-white border-sky-600',
    fallback: 'bg-sky-50 text-sky-800 border-sky-200',
    panel: 'text-sky-700 border-sky-200',
    hover: 'hover:border-sky-300 hover:bg-sky-50',
  },
  '具体问题': {
    idle: 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100',
    active: 'bg-rose-600 text-white border-rose-600',
    fallback: 'bg-rose-50 text-rose-800 border-rose-200',
    panel: 'text-rose-700 border-rose-200',
    hover: 'hover:border-rose-300 hover:bg-rose-50',
  },
  '建议措施': {
    idle: 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100',
    active: 'bg-orange-600 text-white border-orange-600',
    fallback: 'bg-orange-50 text-orange-800 border-orange-200',
    panel: 'text-orange-700 border-orange-200',
    hover: 'hover:border-orange-300 hover:bg-orange-50',
  },
}

const DEFAULT_BADGE_STYLE = {
  idle: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',
  active: 'bg-gray-700 text-white border-gray-700',
  fallback: 'bg-gray-50 text-gray-700 border-gray-200',
  panel: 'text-gray-700 border-gray-200',
  hover: 'hover:border-gray-300 hover:bg-gray-50',
}

function getBadgeStyle(slot: string) {
  return SLOT_BADGE_STYLES[slot] ?? DEFAULT_BADGE_STYLE
}

function areSlotsInSameGroup(a: string, b: string) {
  if (a === b) return true
  if (FIELD_OBJECT_SLOTS.has(a) && FIELD_OBJECT_SLOTS.has(b)) return true
  if ((a === '观点句' || a === '重申观点句') && (b === '观点句' || b === '重申观点句')) return true
  return false
}

export type TopicCategoryId =
  | 'education'
  | 'technology'
  | 'work'
  | 'society'
  | 'media'
  | 'government'
  | 'environment'
  | 'health'

export type TopicCategory = {
  id: TopicCategoryId
  label: string
  topics: string[]
}

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    id: 'education',
    label: 'Education & Learning',
    topics: ['formal education', 'online learning', 'examinations'],
  },
  {
    id: 'technology',
    label: 'Technology',
    topics: ['modern technology', 'artificial intelligence', 'digital devices'],
  },
  {
    id: 'work',
    label: 'Work & Economy',
    topics: ['work-life balance', 'employment', 'business development'],
  },
  {
    id: 'society',
    label: 'Society & Culture',
    topics: ['social development', 'cultural understanding', 'urban life'],
  },
  {
    id: 'media',
    label: 'Media & Communication',
    topics: ['mass media', 'advertising', 'social media'],
  },
  {
    id: 'government',
    label: 'Government, Law & Policy',
    topics: ['government policies', 'legal systems', 'public services'],
  },
  {
    id: 'environment',
    label: 'Environment & Sustainability',
    topics: ['environmental protection', 'sustainable development', 'pollution'],
  },
  {
    id: 'health',
    label: 'Health & Lifestyle',
    topics: ['personal development', 'healthy lifestyles', 'family relationships'],
  },
]

export const CATEGORY_SLOT_EXAMPLES: Record<TopicCategoryId, Partial<Record<string, string[]>>> = {
  education: {
    '主题词': [
      'formal education',
      'schooling',
      'academic learning',
      'online learning',
      'distance education',
      'digital education',
      'school examinations',
      'standardized testing',
      'university education',
      'higher education',
      'vocational training',
      'practical skills training',
      'educational reform',
      'lifelong learning',
    ],
    '观点句': [
      'education should focus on both academic knowledge and practical skills',
      'this policy can improve learning outcomes if it is properly implemented',
      'students benefit more when schools balance discipline, creativity and wellbeing',
    ],
    '两个领域': ['education and career development', 'academic performance and practical skills', 'learning motivation and personal growth'],
    '例子': [
      'students can gain useful knowledge and practical skills for future employment',
      'online courses allow learners in remote areas to access high-quality resources',
      'practical projects can help students connect classroom knowledge with real-life problems',
      'teachers can use digital tools to give students more personalized feedback',
      'schools can reduce academic pressure by combining examinations with practical assessment',
      'universities can provide internships so that graduates become better prepared for the workplace',
      'parents and teachers can support students by encouraging healthy study habits',
      'lifelong learning programs can help adults update their skills in a changing job market',
    ],
    '一个领域（人/机构/社会/经济等）': ['students', 'teachers', 'families', 'educational institutions', 'the education system'],
    '机构/人名': ['students', 'teachers', 'schools', 'universities', 'parents'],
    '具体领域': ['academic performance', 'career development', 'learning motivation', 'practical skills', 'personal growth'],
    '具体问题': ['unequal access to education', 'excessive academic pressure', 'reduced learning motivation', 'high tuition costs'],
    '人名/机构名': ['students', 'parents', 'teachers', 'schools', 'universities'],
    '建议措施': ['effective education programs', 'teacher guidance and parental support', 'fair access to resources and targeted financial support'],
    '重申观点句': [
      'education can create positive outcomes when it combines knowledge, skills and personal development',
      'students and society can benefit from educational reform if it is managed in a balanced way',
    ],
  },
  technology: {
    '主题词': [
      'modern technology',
      'technological development',
      'digital innovation',
      'artificial intelligence',
      'automation',
      'digital devices',
      'smart devices',
      'online platforms',
      'information technology',
      'communication technology',
      'social media',
      'the internet',
      'data privacy',
      'digital services',
    ],
    '观点句': [
      'technology brings more benefits than drawbacks when it is used responsibly',
      'a balanced approach is necessary to maximize technological benefits and reduce potential risks',
      'digital innovation has a generally positive impact on modern society',
    ],
    '两个领域': ['efficiency and productivity', 'communication and daily life', 'education and information access'],
    '例子': [
      'people can save time and improve their daily lives through digital services',
      'companies can improve productivity and customer satisfaction through automation',
      'students can use online platforms to access flexible learning materials',
      'artificial intelligence can help doctors detect diseases more accurately and quickly',
      'mobile applications can make banking, shopping and transport services more convenient',
      'remote working tools allow employees to cooperate with colleagues from different locations',
      'smart devices can help households save energy and manage daily tasks more efficiently',
      'online data systems can help governments deliver public services with fewer delays',
    ],
    '一个领域（人/机构/社会/经济等）': ['individuals', 'students', 'companies', 'modern society', 'the business sector'],
    '机构/人名': ['individuals', 'students', 'employees', 'companies', 'governments'],
    '具体领域': ['work efficiency', 'information access', 'communication', 'innovation and creativity', 'daily life'],
    '具体问题': ['privacy concerns', 'over-reliance on technology', 'misleading information', 'reduced face-to-face communication'],
    '人名/机构名': ['young people', 'employees', 'families', 'companies', 'the general public'],
    '建议措施': ['technology training and responsible use', 'stronger legal frameworks', 'clear regulations and public awareness campaigns'],
    '重申观点句': [
      'technology has a positive overall impact when its risks are controlled by clear rules',
      'the benefits of technology are more significant than its drawbacks if people use it wisely',
    ],
  },
  work: {
    '主题词': [
      'work-life balance',
      'remote work',
      'flexible working arrangements',
      'employment opportunities',
      'job security',
      'career development',
      'economic growth',
      'economic development',
      'business competition',
      'consumer behavior',
      'workplace pressure',
      'professional training',
      'entrepreneurship',
      'the labor market',
    ],
    '观点句': [
      'this approach can improve both productivity and quality of life',
      'economic development should be balanced with employee wellbeing',
      'its advantages outweigh its disadvantages because it creates more opportunities',
    ],
    '两个领域': ['economic growth and employment opportunities', 'work efficiency and job satisfaction', 'productivity and employee wellbeing'],
    '例子': [
      'companies can improve productivity and customer satisfaction through flexible management',
      'shorter working weeks may help employees stay healthier and become more productive',
      'new industries can create jobs and support local economic development',
      'remote work can reduce commuting time and help employees spend more time with their families',
      'small businesses can use online platforms to reach more customers at a lower cost',
      'professional training programs can help workers adapt to automation and industry changes',
      'fair employment policies can improve job satisfaction and reduce staff turnover',
      'economic investment can create better infrastructure and more stable employment opportunities',
    ],
    '一个领域（人/机构/社会/经济等）': ['employees', 'companies', 'small businesses', 'the labor market', 'the local economy'],
    '机构/人名': ['employees', 'businesses', 'companies', 'consumers', 'small businesses'],
    '具体领域': ['career development', 'job satisfaction', 'economic growth', 'time management', 'consumer choice'],
    '具体问题': ['poor work-life balance', 'workplace stress', 'unemployment risks', 'unfair competition', 'high living costs'],
    '人名/机构名': ['employees', 'families', 'companies', 'small businesses', 'consumers'],
    '建议措施': ['workplace flexibility and reasonable management', 'financial support programs', 'balanced implementation and practical policies'],
    '重申观点句': [
      'economic progress is more sustainable when it also protects workers and families',
      'workplace reform can create positive outcomes if it is guided by reasonable policies',
    ],
  },
  society: {
    '主题词': [
      'social development',
      'community development',
      'public transportation',
      'urban transportation',
      'cultural diversity',
      'cultural exchange',
      'urban development',
      'city planning',
      'community services',
      'public facilities',
      'tourism',
      'historic buildings',
      'social equality',
      'public safety',
    ],
    '观点句': [
      'this trend has a generally positive impact on society',
      'this issue should be addressed through practical solutions that protect public interests',
      'social progress depends on both individual responsibility and community cooperation',
    ],
    '两个领域': ['public safety and social order', 'cultural understanding and personal growth', 'community development and social equality'],
    '例子': [
      'communities can become safer and more convenient through better public services',
      'public transportation can reduce traffic congestion and make commuting more affordable',
      'cultural exchange can help individuals develop broader perspectives',
      'well-designed public spaces can encourage social interaction and improve community wellbeing',
      'cultural festivals can help local residents preserve traditions and attract tourism',
      'community programs can support vulnerable groups and reduce social isolation',
      'better urban planning can give residents access to schools, hospitals and parks',
      'volunteer activities can strengthen trust among people from different backgrounds',
    ],
    '一个领域（人/机构/社会/经济等）': ['communities', 'local residents', 'modern society', 'the transport system', 'the tourism industry'],
    '机构/人名': ['local residents', 'commuters', 'tourists', 'communities', 'media organizations'],
    '具体领域': ['public safety', 'cultural understanding', 'transport efficiency', 'community services', 'social communication'],
    '具体问题': ['traffic congestion', 'loss of local culture', 'social inequality', 'misleading information', 'a shortage of public resources'],
    '人名/机构名': ['local residents', 'commuters', 'tourists', 'communities', 'the general public'],
    '建议措施': ['public awareness campaigns', 'community participation', 'urban planning and improved public transportation'],
    '重申观点句': [
      'society can benefit from this development when fairness and public order are protected',
      'this trend can strengthen communities if it is supported by practical solutions',
    ],
  },
  media: {
    '主题词': [
      'mass media',
      'news media',
      'advertising',
      'commercial advertising',
      'social media',
      'online communication',
      'digital communication',
      'news platforms',
      'media literacy',
      'public opinion',
      'consumer information',
      'online information',
      'misleading information',
      'responsible journalism',
    ],
    '观点句': [
      'media and communication tools can benefit society when they are used responsibly',
      'advertising should be properly regulated because it strongly influences public choices',
      'online communication brings more benefits than drawbacks if users can manage information critically',
    ],
    '两个领域': ['media literacy and public awareness', 'communication and consumer behavior', 'information access and social responsibility'],
    '例子': [
      'news platforms can spread important information quickly during public emergencies',
      'advertising can help consumers understand products but may also encourage unnecessary spending',
      'social media allows people to exchange ideas and maintain relationships across long distances',
      'media campaigns can raise public awareness of health, safety and environmental problems',
      'clear advertising rules can protect children from misleading commercial messages',
      'online communication can help small businesses build customer relationships more easily',
      'responsible journalism can help citizens understand social issues and make informed decisions',
      'media literacy education can help young people identify false or biased information',
    ],
    '一个领域（人/机构/社会/经济等）': ['the general public', 'young people', 'consumers', 'media organizations', 'modern society'],
    '机构/人名': ['consumers', 'young people', 'media organizations', 'companies', 'the general public'],
    '具体领域': ['media literacy', 'public awareness', 'consumer choice', 'information access', 'social communication'],
    '具体问题': ['misleading information', 'privacy concerns', 'excessive commercial influence', 'reduced face-to-face communication'],
    '人名/机构名': ['young people', 'consumers', 'families', 'media organizations', 'companies'],
    '建议措施': ['transparent information and stronger media responsibility', 'consumer education and honest business practices', 'media literacy education and clear advertising rules'],
    '重申观点句': [
      'media can create positive outcomes when information is accurate and audiences think critically',
      'communication technology is valuable if its commercial and social risks are properly controlled',
    ],
  },
  government: {
    '主题词': [
      'government policies',
      'public policy',
      'legal systems',
      'law enforcement',
      'public services',
      'public funding',
      'public safety',
      'social order',
      'government regulation',
      'legal punishment',
      'social welfare',
      'public investment',
      'individual freedom',
      'citizen responsibility',
    ],
    '观点句': [
      'this policy can create positive outcomes if properly managed',
      'government action is necessary when individual choices affect public interests',
      'reasonable laws can improve fairness, safety and social stability',
    ],
    '两个领域': ['public safety and social order', 'fairness and public services', 'economic growth and social stability'],
    '例子': [
      'governments can introduce policies to solve social problems',
      'clear laws can discourage irresponsible behavior and protect vulnerable groups',
      'public investment can improve infrastructure and make services more accessible',
      'stricter traffic rules can reduce accidents and improve public safety',
      'financial support programs can help low-income families access education and healthcare',
      'transparent decision-making can increase public trust in government institutions',
      'legal education can help citizens understand their rights and responsibilities',
      'international agreements can help countries deal with environmental and economic challenges',
    ],
    '一个领域（人/机构/社会/经济等）': ['governments', 'public institutions', 'communities', 'society', 'the legal system'],
    '机构/人名': ['governments', 'policy makers', 'public institutions', 'local residents', 'the general public'],
    '具体领域': ['public safety', 'legal awareness', 'social order', 'public services', 'resource management'],
    '具体问题': ['reduced personal freedom', 'a lack of legal awareness', 'unequal access', 'public safety risks', 'poor policy enforcement'],
    '人名/机构名': ['governments', 'policy makers', 'public institutions', 'local residents', 'the general public'],
    '建议措施': ['better government regulation', 'stronger legal frameworks', 'reasonable policies and proper guidance'],
    '重申观点句': [
      'public policy is valuable when it balances social order with individual rights',
      'government regulation can create long-term benefits if it is fair and practical',
    ],
  },
  environment: {
    '主题词': [
      'environmental protection',
      'environmental conservation',
      'climate change',
      'global warming',
      'sustainable development',
      'renewable energy',
      'green technology',
      'pollution control',
      'air pollution',
      'plastic pollution',
      'resource conservation',
      'waste management',
      'energy efficiency',
      'public environmental awareness',
    ],
    '观点句': [
      'environmental protection should be treated as a long-term social priority',
      'this approach brings more benefits than drawbacks because it supports sustainable development',
      'economic growth should not come at the cost of serious environmental damage',
    ],
    '两个领域': ['environmental protection and sustainable development', 'economic growth and resource management', 'public health and future generations'],
    '例子': [
      'communities can reduce pollution and create a healthier living environment',
      'climate education can encourage people to save energy and support sustainable lifestyles',
      'green technology can help businesses reduce waste while maintaining productivity',
      'renewable energy can reduce dependence on fossil fuels and lower carbon emissions',
      'recycling programs can reduce resource waste and protect natural habitats',
      'public transport and cycling lanes can reduce air pollution in large cities',
      'companies can use sustainable materials to reduce environmental damage',
      'environmental laws can encourage industries to control pollution more effectively',
    ],
    '一个领域（人/机构/社会/经济等）': ['the environment', 'future generations', 'local communities', 'governments', 'companies'],
    '机构/人名': ['future generations', 'local residents', 'companies', 'governments', 'communities'],
    '具体领域': ['environmental protection', 'resource management', 'public health', 'sustainable development', 'urban development'],
    '具体问题': ['environmental pollution', 'air pollution', 'resource waste', 'climate change', 'damage to natural habitats'],
    '人名/机构名': ['future generations', 'local residents', 'communities', 'companies', 'governments'],
    '建议措施': ['environmental protection policies and green technology', 'public awareness campaigns', 'cooperation between governments, companies, and individuals'],
    '重申观点句': [
      'environmental protection can create lasting benefits for both society and future generations',
      'sustainable development is achievable when economic activity is guided by clear environmental rules',
    ],
  },
  health: {
    '主题词': [
      'healthy lifestyles',
      'healthy living',
      'mental health',
      'physical health',
      'family relationships',
      'family life',
      'personal development',
      'self-improvement',
      'physical exercise',
      'regular exercise',
      'balanced diets',
      'stress management',
      'leisure activities',
      'sleep quality',
    ],
    '观点句': [
      'this issue has a positive impact when it improves health and family relationships',
      'personal development requires a balance between individual effort and social support',
      'this trend should be encouraged because it improves people\'s quality of life',
    ],
    '两个领域': ['health and family relationships', 'personal growth and social development', 'mental health and daily life'],
    '例子': [
      'individuals can develop better skills and broader perspectives through life experience',
      'healthy habits can reduce pressure and improve people\'s daily performance',
      'strong family relationships can provide emotional support and improve wellbeing',
      'regular exercise can improve physical health and reduce stress',
      'flexible working arrangements can help employees maintain a healthier lifestyle',
      'mental health education can encourage people to seek help at an early stage',
      'balanced diets and community sports programs can reduce long-term healthcare costs',
      'family-friendly policies can help parents spend more quality time with their children',
    ],
    '一个领域（人/机构/社会/经济等）': ['individuals', 'families', 'young people', 'older people', 'the healthcare system'],
    '机构/人名': ['individuals', 'families', 'parents', 'young people', 'healthcare providers'],
    '具体领域': ['mental health', 'family relationships', 'personal development', 'daily life', 'time management'],
    '具体问题': ['excessive pressure', 'poor work-life balance', 'weaker family relationships', 'mental stress', 'poor time management'],
    '人名/机构名': ['individuals', 'families', 'parents', 'young people', 'employees'],
    '建议措施': ['effective education programs', 'balanced implementation', 'public awareness campaigns and individual responsibility'],
    '重申观点句': [
      'this issue can improve quality of life when personal needs and social support are balanced',
      'healthy lifestyles and personal development should be encouraged through practical guidance',
    ],
  },
}

export const GENERAL_FIELD_OBJECT_EXAMPLES = [
  'education and career development',
  'efficiency and productivity',
  'public safety and social order',
  'economic growth and employment opportunities',
  'health and family relationships',
  'cultural understanding and personal growth',
  'environmental protection and sustainable development',
  'communication and information access',
  'public services and social equality',
  'innovation and consumer choice',
  'students',
  'young people',
  'employees',
  'families',
  'local residents',
  'consumers',
  'commuters',
  'tourists',
  'older people',
  'future generations',
  'schools',
  'universities',
  'companies',
  'small businesses',
  'governments',
  'public institutions',
  'media organizations',
  'healthcare providers',
  'local communities',
  'educational institutions',
  'the education system',
  'the business sector',
  'the transport system',
  'the healthcare system',
  'the legal system',
  'the tourism industry',
  'the labor market',
  'the local economy',
  'modern society',
  'the general public',
  'the environment',
]

function getSlotExamples(slot: string, categoryId: TopicCategoryId) {
  if (slot === '观点句' || slot === '重申观点句') {
    return []
  }

  if (FIELD_OBJECT_SLOTS.has(slot)) {
    return [
      ...(CATEGORY_SLOT_EXAMPLES[categoryId]['两个领域'] ?? []),
      ...(CATEGORY_SLOT_EXAMPLES[categoryId]['一个领域（人/机构/社会/经济等）'] ?? []),
      ...(CATEGORY_SLOT_EXAMPLES[categoryId]['机构/人名'] ?? []),
      ...(CATEGORY_SLOT_EXAMPLES[categoryId]['人名/机构名'] ?? []),
      ...(CATEGORY_SLOT_EXAMPLES[categoryId]['具体领域'] ?? []),
      ...SLOT_EXAMPLES['两个领域'],
      ...SLOT_EXAMPLES['一个领域（人/机构/社会/经济等）'],
      ...SLOT_EXAMPLES['机构/人名'],
      ...SLOT_EXAMPLES['人名/机构名'],
      ...SLOT_EXAMPLES['具体领域'],
      ...GENERAL_FIELD_OBJECT_EXAMPLES,
    ].filter((example, index, examples) => examples.indexOf(example) === index)
  }

  return CATEGORY_SLOT_EXAMPLES[categoryId][slot] ?? SLOT_EXAMPLES[slot]
}

export const FIELD_OBJECT_GROUPS = [
  {
    label: '相关领域',
    examples: [
      'education and career development',
      'academic performance and practical skills',
      'efficiency and productivity',
      'communication and information access',
      'public safety and social order',
      'economic growth and employment opportunities',
      'health and family relationships',
      'environmental protection and sustainable development',
    ],
  },
  {
    label: '人群',
    examples: [
      'students',
      'young people',
      'employees',
      'families',
      'local residents',
      'consumers',
      'commuters',
      'future generations',
    ],
  },
  {
    label: '机构',
    examples: [
      'schools',
      'universities',
      'companies',
      'small businesses',
      'governments',
      'public institutions',
      'media organizations',
      'healthcare providers',
    ],
  },
  {
    label: '社会/经济对象',
    examples: [
      'modern society',
      'the general public',
      'the education system',
      'the business sector',
      'the transport system',
      'the healthcare system',
      'the legal system',
      'the local economy',
    ],
  },
]

export const VIEWPOINT_PATTERN_EXAMPLES = [
  {
    label: '同意/不同意',
    text: 'this trend brings more benefits than drawbacks when it is properly managed',
  },
  {
    label: '好处坏处',
    text: 'its advantages outweigh its disadvantages in most situations',
  },
  {
    label: '对比两种观点',
    text: 'both views have valid points, but the first view is more practical in modern society',
  },
  {
    label: '问题与解决',
    text: 'the key lies in practical solutions such as better regulation and public education',
  },
  {
    label: '原因与影响',
    text: 'the root causes and far-reaching effects of this issue deserve careful analysis',
  },
  {
    label: '双重问答',
    text: 'this issue is mainly caused by social and economic factors, and it should be addressed through joint efforts',
  },
]

const EXPRESSION_HIGHLIGHT_TERMS = [
  'students',
  'young people',
  'employees',
  'families',
  'local residents',
  'consumers',
  'communities',
  'governments',
  'companies',
  'schools',
  'universities',
  'media organizations',
  'future generations',
  'education',
  'career development',
  'academic performance',
  'practical skills',
  'productivity',
  'public safety',
  'social order',
  'economic growth',
  'employment opportunities',
  'health',
  'family relationships',
  'environmental protection',
  'sustainable development',
  'public awareness',
  'information access',
  'customer satisfaction',
  'work-life balance',
  'mental health',
  'privacy concerns',
  'social inequality',
  'traffic congestion',
  'pollution',
  'misleading information',
  'public services',
  'legal awareness',
  'financial support',
  'clear regulations',
  'public education',
  'responsible use',
]

const HIGHLIGHT_PATTERN = new RegExp(
  `\\b(${EXPRESSION_HIGHLIGHT_TERMS.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'gi'
)

function renderHighlightedExpression(text: string) {
  const parts = text.split(HIGHLIGHT_PATTERN)
  return parts.map((part, index) => {
    if (!part) return null
    if (EXPRESSION_HIGHLIGHT_TERMS.some(term => term.toLowerCase() === part.toLowerCase())) {
      return (
        <span key={`${part}-${index}`} className="rounded bg-yellow-100 px-1 font-semibold text-gray-950">
          {part}
        </span>
      )
    }
    return <span key={`${part}-${index}`}>{part}</span>
  })
}

function InteractiveSlotBadge({
  text,
  active,
  onSelect,
  categoryId,
}: {
  text: string
  active: boolean
  onSelect: (slot: string) => void
  categoryId: TopicCategoryId
}) {
  const style = getBadgeStyle(text)

  if (!getSlotExamples(text, categoryId)) {
    return (
      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border mx-0.5 ${style.fallback}`}>
        [{text}]
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(text)}
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold border mx-0.5 transition-colors ${
        active
          ? style.active
          : style.idle
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
  setActiveSlot: (slot: string) => void,
  activeCategory: TopicCategoryId
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
        active={areSlotsInSameGroup(activeSlot, slot)}
        onSelect={setActiveSlot}
        categoryId={activeCategory}
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
  const [activeCategory, setActiveCategory] = useState<TopicCategoryId>('education')
  const activeTopicCategory = TOPIC_CATEGORIES.find(category => category.id === activeCategory) ?? TOPIC_CATEGORIES[0]
  const activeExamples = getSlotExamples(activeSlot, activeCategory) ?? []
  const activeSlotStyle = getBadgeStyle(activeSlot)

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
      <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">常见题目 Topic 分类</h3>
            <p className="text-sm text-gray-500">先选择题目类型，再点击模板里的彩色填空，右侧表达会按分类适配。</p>
          </div>
          <p className="text-xs font-semibold text-emerald-700">当前：{activeTopicCategory.label}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOPIC_CATEGORIES.map(category => {
            const active = activeCategory === category.id
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-lg border px-3 py-3 text-left transition-colors ${
                  active
                    ? 'border-emerald-400 bg-emerald-50 ring-1 ring-emerald-300'
                    : 'border-gray-200 bg-gray-50 hover:border-emerald-200 hover:bg-white'
                }`}
              >
                <span className={`block text-sm font-bold ${active ? 'text-emerald-800' : 'text-gray-800'}`}>{category.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-gray-500">{category.topics.join(' · ')}</span>
              </button>
            )
          })}
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          {WE_TEMPLATE.map(para => (
            <div key={para.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">{para.title}</h3>
              <div className="space-y-3">
                {para.sentences.map((sent, i) => (
                  <p key={i} className="leading-relaxed text-gray-800">
                    {renderWeWithSlots(sent.text, sent.slots, activeSlot, setActiveSlot, activeCategory)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <aside className={`lg:sticky lg:top-6 h-fit bg-white border rounded-xl p-5 ${activeSlotStyle.panel}`}>
          <div className="mb-4">
            <p className="text-xs font-semibold mb-1">{activeTopicCategory.label} · 点击彩色填空查看例子</p>
            <h3 className="text-base font-bold text-gray-900">[{activeSlot}] 可用表达</h3>
          </div>
          <div className="max-h-[68vh] space-y-2 overflow-y-auto pr-1">
            {FIELD_OBJECT_SLOTS.has(activeSlot) && (
              <div className="mb-4 space-y-3 rounded-lg border border-sky-100 bg-sky-50/60 p-3">
                {FIELD_OBJECT_GROUPS.map(group => (
                  <div key={group.label}>
                    <p className="mb-1 text-xs font-bold text-sky-800">{group.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.examples.map(example => (
                        <button
                          key={example}
                          type="button"
                          onClick={() => navigator.clipboard.writeText(example)}
                          className="rounded-md border border-sky-200 bg-white px-2 py-1 text-left text-xs leading-relaxed text-sky-900 hover:border-sky-300 hover:bg-sky-50"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeSlot !== '观点句' && activeSlot !== '重申观点句' && activeExamples.map(example => (
              <button
                key={example}
                type="button"
                onClick={() => navigator.clipboard.writeText(example)}
                className={`block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm leading-relaxed text-gray-800 transition-colors ${activeSlotStyle.hover}`}
              >
                {renderHighlightedExpression(example)}
              </button>
            ))}
            {(activeSlot === '观点句' || activeSlot === '重申观点句') && (
              <div>
                <p className="mb-3 text-xs font-semibold text-gray-600">按题型选择一个观点表达</p>
                <div className="space-y-2">
                  {VIEWPOINT_PATTERN_EXAMPLES.map(pattern => (
                    <button
                      key={pattern.label}
                      type="button"
                      onClick={() => navigator.clipboard.writeText(pattern.text)}
                      className={`block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm leading-relaxed text-gray-800 transition-colors ${activeSlotStyle.hover}`}
                    >
                      <span className="mb-1 block text-xs font-bold text-violet-700">{pattern.label}</span>
                      {renderHighlightedExpression(pattern.text)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 text-xs text-gray-500">点击任意表达可复制。相同填空属性使用同一种颜色，方便对应记忆。</p>
        </aside>
      </div>
    </div>
  )
}
