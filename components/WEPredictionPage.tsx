'use client'
import { useState } from 'react'
import type { ReactNode } from 'react'

type Category =
  | 'Education & Learning'
  | 'Technology'
  | 'Work & Economy'
  | 'Society & Culture'
  | 'Media & Communication'
  | 'Government, Law & Policy'
  | 'Environment & Sustainability'
  | 'Health & Lifestyle'

interface EssayData {
  id: string
  category: Category
  title: string
  prompt: string
  topic: string
  question: string
  thesis: string
  domains: string
  example: string
  affected: string
  secondExample: string
  beneficiary: string
  field: string
  issue: string
  challengeGroup: string
  solution: string
  restatement: string
}

const CATEGORIES: Category[] = [
  'Education & Learning',
  'Technology',
  'Work & Economy',
  'Society & Culture',
  'Media & Communication',
  'Government, Law & Policy',
  'Environment & Sustainability',
  'Health & Lifestyle',
]

const HIGHLIGHT_STYLE: Record<string, string> = {
  topic: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  thesis: 'bg-violet-100 text-violet-900 border-violet-200',
  field: 'bg-sky-100 text-sky-900 border-sky-200',
  example: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200',
  issue: 'bg-rose-100 text-rose-900 border-rose-200',
  solution: 'bg-orange-100 text-orange-900 border-orange-200',
}

const ESSAYS: EssayData[] = [
  {
    id: 'public-transport-roads',
    category: 'Society & Culture',
    title: 'Public Transport vs More Roads',
    prompt: 'As cities expand, governments should create better public transport networks rather than building more roads for car owners. To what extent do you agree or disagree?',
    topic: 'better public transportation',
    question: 'cities should focus on public transport rather than building more roads',
    thesis: 'this approach brings more benefits than drawbacks for urban residents',
    domains: 'transport efficiency and public services',
    example: 'buses and trains can move many people at the same time and reduce traffic jams',
    affected: 'commuters and local communities',
    secondExample: 'students and workers can spend less time travelling every day',
    beneficiary: 'urban residents',
    field: 'daily life and travel costs',
    issue: 'high construction costs and possible delays',
    challengeGroup: 'taxpayers and small businesses',
    solution: 'careful planning and fair government funding',
    restatement: 'public transport should be the main priority in growing cities',
  },
  {
    id: 'climate-responsibility',
    category: 'Environment & Sustainability',
    title: 'Climate Change Responsibility',
    prompt: 'Climate change is a concerning global issue. Who has the main responsibility to take action, governments, large companies, or individuals?',
    topic: 'climate change',
    question: 'who should take the main responsibility for solving climate change',
    thesis: 'governments and large companies should take the main responsibility, while individuals should also support change',
    domains: 'environmental protection and public policy',
    example: 'governments can make laws to control pollution and invest in renewable energy',
    affected: 'companies and ordinary people',
    secondExample: 'large companies can reduce waste and use cleaner production methods',
    beneficiary: 'future generations',
    field: 'health and sustainable development',
    issue: 'weak regulation and slow public action',
    challengeGroup: 'local communities',
    solution: 'stronger laws, green technology and public education',
    restatement: 'climate change needs leadership from governments and companies, supported by individual action',
  },
  {
    id: 'formal-exams',
    category: 'Education & Learning',
    title: 'Formal Written Examinations',
    prompt: 'Many education systems assess students using formal written examinations. Those exams are a valid method. To what extent do you agree or disagree?',
    topic: 'formal written examinations',
    question: 'written exams are a valid method to assess students',
    thesis: 'written exams are useful, but they should be combined with other forms of assessment',
    domains: 'academic performance and practical skills',
    example: 'exams encourage students to review knowledge carefully before the end of a course',
    affected: 'students and teachers',
    secondExample: 'in my experience, exams helped me find weak points in grammar and vocabulary',
    beneficiary: 'schools',
    field: 'learning discipline and academic standards',
    issue: 'excessive pressure and limited creativity',
    challengeGroup: 'young students',
    solution: 'balanced assessment, projects and teacher feedback',
    restatement: 'exams are valuable if schools use them in a balanced way',
  },
  {
    id: 'mass-communications',
    category: 'Media & Communication',
    title: 'Information Revolution',
    prompt: 'The information revolution brought by modern mass communications has both positive and negative consequences for individuals and society. To what extent do you agree?',
    topic: 'modern mass communications',
    question: 'modern mass communications have both positive and negative consequences',
    thesis: 'this statement is reasonable because communication technology creates both opportunities and risks',
    domains: 'information access and social communication',
    example: 'people can receive news, study materials and public information very quickly',
    affected: 'individuals and modern society',
    secondExample: 'social media also allows families and friends to stay connected across long distances',
    beneficiary: 'the general public',
    field: 'daily communication and public awareness',
    issue: 'misleading information and privacy concerns',
    challengeGroup: 'young people',
    solution: 'media literacy education and responsible use',
    restatement: 'mass communication is useful when people manage information carefully',
  },
  {
    id: 'shopping-malls',
    category: 'Work & Economy',
    title: 'Shopping Malls and Local Shops',
    prompt: 'In many towns and cities large shopping malls are replacing small local shops. Some people say that this is a positive development. To what extent do you agree?',
    topic: 'large shopping malls',
    question: 'shopping malls replacing small shops is a positive development',
    thesis: 'this trend has benefits, but local shops should still be protected',
    domains: 'consumer choice and local employment',
    example: 'shopping malls provide many services, restaurants and entertainment in one place',
    affected: 'consumers and small businesses',
    secondExample: 'families can shop more conveniently, especially on weekends',
    beneficiary: 'local residents',
    field: 'convenience and job opportunities',
    issue: 'loss of local culture and pressure on small shops',
    challengeGroup: 'small business owners',
    solution: 'reasonable city planning and support for local stores',
    restatement: 'shopping malls are positive only when small local businesses can still survive',
  },
  {
    id: 'media-young-people',
    category: 'Media & Communication',
    title: 'Mass Media and Young People',
    prompt: 'Mass media such as TV, radio and newspapers influence people, especially teenagers and young people. To what extent do you agree?',
    topic: 'mass media',
    question: 'mass media strongly shapes the opinions of young people',
    thesis: 'mass media has a strong influence on young people and should be used responsibly',
    domains: 'public opinion and personal values',
    example: 'teenagers often learn about fashion, social issues and lifestyles from television and online news',
    affected: 'teenagers and young adults',
    secondExample: 'positive programs can encourage healthy habits and social responsibility',
    beneficiary: 'young people',
    field: 'media literacy and personal development',
    issue: 'biased information and excessive commercial influence',
    challengeGroup: 'teenagers',
    solution: 'parental guidance and media education at school',
    restatement: 'media can guide young people well if it is accurate and responsible',
  },
  {
    id: 'work-life-balance',
    category: 'Work & Economy',
    title: 'Work-life Balance',
    prompt: 'It is increasingly difficult to maintain the right balance between work and other aspects of life. How important is this balance and why is it hard to achieve?',
    topic: 'work-life balance',
    question: 'maintaining balance between work and private life is important but difficult',
    thesis: 'work-life balance is very important because it protects health and family relationships',
    domains: 'mental health and family life',
    example: 'people who have enough rest can work more efficiently and make better decisions',
    affected: 'employees and families',
    secondExample: 'parents need time to communicate with children and support their education',
    beneficiary: 'workers',
    field: 'health and job satisfaction',
    issue: 'long working hours and workplace pressure',
    challengeGroup: 'employees',
    solution: 'flexible work arrangements and reasonable management',
    restatement: 'a healthy balance between work and life should be taken seriously',
  },
  {
    id: 'parents-legal-responsibility',
    category: 'Government, Law & Policy',
    title: 'Parents and Children’s Actions',
    prompt: 'Should parents be held legally responsible for the actions of their children?',
    topic: 'parental responsibility',
    question: 'parents should be legally responsible for the actions of their children',
    thesis: 'parents should take some responsibility, but punishment should depend on the child’s age and situation',
    domains: 'family education and public safety',
    example: 'parents can teach children basic rules about honesty, respect and safety',
    affected: 'children and local communities',
    secondExample: 'if a young child damages public property, parents should help repair the damage',
    beneficiary: 'families',
    field: 'legal awareness and social order',
    issue: 'unfair punishment when parents cannot fully control older children',
    challengeGroup: 'parents and teenagers',
    solution: 'clear legal standards and education programs',
    restatement: 'parental responsibility is necessary, but it must be fair and practical',
  },
  {
    id: 'workers-decision-making',
    category: 'Work & Economy',
    title: 'Workers in Decision-making',
    prompt: 'Some companies involve workers in the decision-making process about products and services. What are the advantages and disadvantages?',
    topic: 'employee involvement in decision-making',
    question: 'workers should be involved in decisions about products and services',
    thesis: 'this policy has more advantages than disadvantages if it is managed well',
    domains: 'product quality and job satisfaction',
    example: 'workers often understand customer problems because they deal with daily tasks directly',
    affected: 'employees and companies',
    secondExample: 'staff may feel respected and become more willing to improve their work',
    beneficiary: 'businesses',
    field: 'productivity and teamwork',
    issue: 'slow decision-making and possible disagreement',
    challengeGroup: 'managers and employees',
    solution: 'clear discussion rules and final leadership decisions',
    restatement: 'employee involvement is useful when companies keep the process organized',
  },
  {
    id: 'experiential-learning',
    category: 'Education & Learning',
    title: 'Experiential Learning',
    prompt: 'Some people think experiential learning can work well in formal education, while others prefer traditional teaching. Do you think it works well in high schools or colleges?',
    topic: 'experiential learning',
    question: 'learning by doing can work well in formal education',
    thesis: 'experiential learning works well when it is combined with traditional teaching',
    domains: 'practical skills and academic knowledge',
    example: 'science students can understand theories better by doing experiments',
    affected: 'students and teachers',
    secondExample: 'business students can learn teamwork through projects and presentations',
    beneficiary: 'high schools and colleges',
    field: 'learning motivation and problem-solving skills',
    issue: 'limited time and uneven student participation',
    challengeGroup: 'teachers',
    solution: 'careful course design and teacher guidance',
    restatement: 'learning by doing is effective if schools balance it with classroom teaching',
  },
  {
    id: 'law-changes-behavior',
    category: 'Government, Law & Policy',
    title: 'Law and Human Behavior',
    prompt: 'Some people think the law changes our behavior. Do you agree or disagree?',
    topic: 'the law',
    question: 'laws can change human behavior',
    thesis: 'laws can change behavior, especially when they are clear and fairly enforced',
    domains: 'public safety and social order',
    example: 'traffic laws make many drivers wear seat belts and follow speed limits',
    affected: 'citizens and communities',
    secondExample: 'smoking bans have encouraged people to avoid smoking in public places',
    beneficiary: 'the general public',
    field: 'safety and legal awareness',
    issue: 'weak enforcement and lack of public understanding',
    challengeGroup: 'policy makers',
    solution: 'strong enforcement and public education',
    restatement: 'law is an important tool for changing behavior, but education is also needed',
  },
  {
    id: 'late-submission',
    category: 'Education & Learning',
    title: 'Late Submission Penalties',
    prompt: 'Some universities deduct marks from students’ work if it is given late. What is your opinion? What other actions do you recommend?',
    topic: 'late submission penalties',
    question: 'universities should deduct marks for late work',
    thesis: 'deducting marks is reasonable, but universities should also offer guidance and support',
    domains: 'academic discipline and time management',
    example: 'deadlines help students plan their study and avoid delaying important tasks',
    affected: 'students and universities',
    secondExample: 'in my experience, clear deadlines made group projects more organized',
    beneficiary: 'students',
    field: 'responsibility and study habits',
    issue: 'unexpected illness or family problems',
    challengeGroup: 'students under pressure',
    solution: 'extension applications and teacher feedback',
    restatement: 'late penalties are fair if universities also consider special situations',
  },
  {
    id: 'medical-technology',
    category: 'Health & Lifestyle',
    title: 'Medical Technology and Life Expectancy',
    prompt: 'Medical technology is responsible for increasing the average life expectancy. Is it a curse or a blessing?',
    topic: 'medical technology',
    question: 'medical technology increasing life expectancy is a blessing or a curse',
    thesis: 'it is mainly a blessing because it improves health and quality of life',
    domains: 'public health and family relationships',
    example: 'new treatments can help patients recover from diseases that were once very dangerous',
    affected: 'patients and families',
    secondExample: 'older people can spend more years with their children and grandchildren',
    beneficiary: 'society',
    field: 'healthcare and personal wellbeing',
    issue: 'high medical costs and pressure on hospitals',
    challengeGroup: 'older people and governments',
    solution: 'affordable healthcare and better public health planning',
    restatement: 'medical technology is a blessing if society manages its costs properly',
  },
  {
    id: 'building-design',
    category: 'Society & Culture',
    title: 'Building Design',
    prompt: 'Do you think the design of buildings affects, positively or negatively, where people live and work?',
    topic: 'building design',
    question: 'building design affects where people live and work',
    thesis: 'building design clearly affects people’s comfort, safety and productivity',
    domains: 'daily life and work efficiency',
    example: 'bright classrooms and offices can help people stay focused and feel less tired',
    affected: 'residents and workers',
    secondExample: 'safe buildings with good public areas can improve community life',
    beneficiary: 'urban residents',
    field: 'comfort and public safety',
    issue: 'high costs and poor planning',
    challengeGroup: 'families and small businesses',
    solution: 'practical design standards and long-term city planning',
    restatement: 'good building design can improve both living and working conditions',
  },
  {
    id: 'too-much-work',
    category: 'Work & Economy',
    title: 'Too Much Time at Work',
    prompt: 'People who devote too much time to their job leave little time for personal life. How widespread is the problem and what problems will it cause?',
    topic: 'excessive working time',
    question: 'working too much leaves little time for private life',
    thesis: 'this problem is widespread and has a negative impact on health and families',
    domains: 'mental health and family relationships',
    example: 'many office workers answer messages after work and cannot fully relax',
    affected: 'employees and families',
    secondExample: 'children may feel less supported if parents are always busy with work',
    beneficiary: 'workers',
    field: 'wellbeing and job satisfaction',
    issue: 'stress, poor sleep and weaker family communication',
    challengeGroup: 'working parents',
    solution: 'reasonable working hours and workplace flexibility',
    restatement: 'too much work should be controlled because private life is also important',
  },
  {
    id: 'global-problems',
    category: 'Environment & Sustainability',
    title: 'Most Pressing Global Problem',
    prompt: 'Governments and international organizations face many global problems. Which is the most pressing problem and what is the solution?',
    topic: 'climate change',
    question: 'which global problem is the most pressing and how it can be solved',
    thesis: 'climate change is the most pressing problem because it affects health, food and safety',
    domains: 'environmental protection and international cooperation',
    example: 'extreme weather can damage homes, farms and transport systems',
    affected: 'countries and local communities',
    secondExample: 'poor countries may suffer more because they have fewer resources',
    beneficiary: 'future generations',
    field: 'public health and sustainable development',
    issue: 'slow policy action and dependence on fossil fuels',
    challengeGroup: 'governments and companies',
    solution: 'renewable energy, global agreements and public awareness',
    restatement: 'climate change should be treated as the most urgent global challenge',
  },
  {
    id: 'old-plays-theatre',
    category: 'Education & Learning',
    title: 'Old Plays in High School',
    prompt: 'What are the problems and benefits for high school students of studying plays and theatre works written centuries ago?',
    topic: 'studying old plays',
    question: 'high school students should study plays written centuries ago',
    thesis: 'old plays are useful, although teachers need to make them easier to understand',
    domains: 'cultural understanding and language ability',
    example: 'students can learn about history, values and human emotions from classic stories',
    affected: 'high school students',
    secondExample: 'performing scenes in class can improve confidence and speaking skills',
    beneficiary: 'schools',
    field: 'literature and personal growth',
    issue: 'difficult language and old social contexts',
    challengeGroup: 'teenage students',
    solution: 'modern explanations, films and group activities',
    restatement: 'classic theatre is valuable if it is taught in a practical way',
  },
  {
    id: 'libraries-digital-media',
    category: 'Education & Learning',
    title: 'Libraries and Digital Media',
    prompt: 'With more digital media online, the role of libraries has become obsolete. Universities should only buy digital media rather than update textbooks. Discuss advantages and disadvantages.',
    topic: 'digital media in universities',
    question: 'universities should buy digital media instead of updating textbooks',
    thesis: 'digital media is useful, but universities should not completely give up textbooks and libraries',
    domains: 'information access and academic learning',
    example: 'students can search digital materials quickly and study from home',
    affected: 'students and universities',
    secondExample: 'online journals are often updated faster than printed textbooks',
    beneficiary: 'university students',
    field: 'research and flexible learning',
    issue: 'unequal access to devices and unreliable online information',
    challengeGroup: 'students with limited resources',
    solution: 'a balanced library system with both digital and printed resources',
    restatement: 'digital media should support libraries rather than replace them completely',
  },
  {
    id: 'age-restrictions',
    category: 'Government, Law & Policy',
    title: 'Age Restrictions',
    prompt: 'Age restrictions are placed on many activities. Give an example, state the minimum age you think it should be and share your experience.',
    topic: 'age restrictions',
    question: 'people should wait until the right age to do certain activities',
    thesis: 'age restrictions are necessary for activities that require judgment and responsibility',
    domains: 'public safety and personal responsibility',
    example: 'driving should have a minimum age because young drivers need maturity and road knowledge',
    affected: 'teenagers and families',
    secondExample: 'in my experience, driving safely requires patience and respect for rules',
    beneficiary: 'society',
    field: 'safety and legal awareness',
    issue: 'different maturity levels among young people',
    challengeGroup: 'teenagers',
    solution: 'age limits, training and practical tests',
    restatement: 'age rules are useful when they protect people from serious risks',
  },
  {
    id: 'experience-best-teacher',
    category: 'Education & Learning',
    title: 'Experience as the Best Teacher',
    prompt: 'Some people argue that life experience teaches people more effectively than books or formal education. How far do you agree?',
    topic: 'life experience',
    question: 'experience teaches people more effectively than books or formal education',
    thesis: 'experience is a powerful teacher, but books and education are also necessary',
    domains: 'personal growth and practical skills',
    example: 'part-time jobs can teach young people communication and responsibility',
    affected: 'students and workers',
    secondExample: 'however, formal education gives people basic knowledge before they enter society',
    beneficiary: 'young people',
    field: 'maturity and problem-solving skills',
    issue: 'learning only from experience can be slow and risky',
    challengeGroup: 'students',
    solution: 'combining classroom learning with real-life practice',
    restatement: 'experience is valuable, but it works best with education',
  },
  {
    id: 'study-and-employment',
    category: 'Education & Learning',
    title: 'Study and Employment',
    prompt: 'Effective study requires time, comfort and peace. It is impossible to combine student learning with employment. To what extent is this realistic?',
    topic: 'combining study with employment',
    question: 'students cannot combine learning with employment effectively',
    thesis: 'combining study and work is difficult, but it is possible with good time management',
    domains: 'academic performance and career development',
    example: 'part-time work can help students pay living costs and learn practical skills',
    affected: 'students',
    secondExample: 'in my experience, a small number of work hours can improve responsibility',
    beneficiary: 'university students',
    field: 'time management and independence',
    issue: 'tiredness and reduced study time',
    challengeGroup: 'students with financial pressure',
    solution: 'reasonable work hours and flexible school support',
    restatement: 'study and employment can be combined if students avoid excessive work',
  },
  {
    id: 'cheaper-public-transport',
    category: 'Society & Culture',
    title: 'Cheaper Public Transportation',
    prompt: 'What are the advantages and problems of cheaper public transportation?',
    topic: 'cheaper public transportation',
    question: 'public transportation should be cheaper',
    thesis: 'cheaper public transportation has many benefits, but funding must be managed carefully',
    domains: 'transport efficiency and social equality',
    example: 'low fares help students, workers and older people travel more easily',
    affected: 'commuters and local residents',
    secondExample: 'more people may choose buses and trains instead of private cars',
    beneficiary: 'cities',
    field: 'traffic congestion and daily costs',
    issue: 'financial pressure on governments and crowded services',
    challengeGroup: 'taxpayers and transport operators',
    solution: 'targeted subsidies and better service planning',
    restatement: 'cheap public transport is positive if cities can support its cost',
  },
  {
    id: 'climate-area-focus',
    category: 'Environment & Sustainability',
    title: 'Climate Change Study Area',
    prompt: 'Imagine you have been assigned to study climate change. Which area will you focus on and why?',
    topic: 'climate change education',
    question: 'which area of climate change should be studied',
    thesis: 'I would focus on how climate change affects daily life because it is easy for people to understand',
    domains: 'public awareness and community health',
    example: 'heat waves can affect older people, outdoor workers and children',
    affected: 'local communities',
    secondExample: 'floods and storms can damage houses, roads and food supply',
    beneficiary: 'ordinary people',
    field: 'risk awareness and preparation',
    issue: 'low public attention and limited local planning',
    challengeGroup: 'families and local governments',
    solution: 'climate education and community emergency plans',
    restatement: 'studying daily impacts can make climate change more real to the public',
  },
  {
    id: 'marketing-reputation-discounts',
    category: 'Work & Economy',
    title: 'Marketing Reputation or Discounts',
    prompt: 'Should marketing in consumer goods companies emphasize company reputation or short-term strategies like discounts and special offers?',
    topic: 'marketing strategies',
    question: 'companies should emphasize reputation rather than short-term discounts',
    thesis: 'company reputation is more important, although discounts can be useful sometimes',
    domains: 'consumer trust and business development',
    example: 'customers are more likely to buy food and clothing from companies they trust',
    affected: 'consumers and companies',
    secondExample: 'discounts may attract attention, but they do not always build loyalty',
    beneficiary: 'businesses',
    field: 'brand image and customer satisfaction',
    issue: 'misleading promotions and short-term thinking',
    challengeGroup: 'consumers',
    solution: 'honest marketing and good product quality',
    restatement: 'long-term reputation should be the main focus of marketing',
  },
  {
    id: 'tourism-less-developed',
    category: 'Society & Culture',
    title: 'Tourism in Less Developed Countries',
    prompt: 'For a less developed country, the disadvantages of tourism are as great as the advantages. Discuss and explain your opinion.',
    topic: 'tourism in less developed countries',
    question: 'tourism has disadvantages as great as its advantages',
    thesis: 'tourism brings important benefits, but its problems must be controlled',
    domains: 'economic growth and cultural exchange',
    example: 'tourism can create jobs for local residents and support small businesses',
    affected: 'local communities',
    secondExample: 'visitors can also learn about local culture and history',
    beneficiary: 'less developed countries',
    field: 'employment and local income',
    issue: 'environmental damage and loss of local culture',
    challengeGroup: 'local residents',
    solution: 'sustainable tourism planning and cultural protection',
    restatement: 'tourism is positive when governments manage its risks carefully',
  },
  {
    id: 'new-invention',
    category: 'Technology',
    title: 'A New Invention',
    prompt: 'In our technological world, new inventions appear daily. Describe a new invention and decide whether it has a beneficial or detrimental impact on society.',
    topic: 'artificial intelligence translation tools',
    question: 'a new invention has a beneficial or harmful impact on society',
    thesis: 'AI translation tools are mainly beneficial because they improve communication',
    domains: 'language communication and information access',
    example: 'people can use translation apps when travelling or reading foreign websites',
    affected: 'students and workers',
    secondExample: 'small companies can communicate with international customers more easily',
    beneficiary: 'ordinary users',
    field: 'global communication and study efficiency',
    issue: 'over-reliance on technology and inaccurate translation',
    challengeGroup: 'language learners',
    solution: 'responsible use and basic language learning',
    restatement: 'AI translation is helpful if people understand its limits',
  },
  {
    id: 'television-functions',
    category: 'Media & Communication',
    title: 'Useful Functions of Television',
    prompt: 'Television helps people relax, learn, and can be a companion for the lonely. To what extent do you agree?',
    topic: 'television',
    question: 'television serves many useful functions',
    thesis: 'television is useful when people choose programs wisely and control screen time',
    domains: 'entertainment and public education',
    example: 'documentaries can help people learn about science, history and culture',
    affected: 'families and older people',
    secondExample: 'news programs can inform citizens about public events and safety issues',
    beneficiary: 'the general public',
    field: 'relaxation and information access',
    issue: 'too much screen time and low-quality programs',
    challengeGroup: 'children and lonely people',
    solution: 'healthy viewing habits and media guidance',
    restatement: 'television has value if it is used in a balanced way',
  },
  {
    id: 'fewer-working-hours',
    category: 'Work & Economy',
    title: 'Fewer Working Hours in the Future',
    prompt: 'In the future, people will work fewer hours at their jobs than they do now. Do you agree?',
    topic: 'shorter working hours',
    question: 'people will work fewer hours in the future',
    thesis: 'people may work fewer hours in some jobs because technology can improve productivity',
    domains: 'work efficiency and quality of life',
    example: 'automation can complete repeated tasks faster than humans',
    affected: 'employees and companies',
    secondExample: 'remote work also reduces commuting time for many office workers',
    beneficiary: 'workers',
    field: 'job satisfaction and family life',
    issue: 'unequal benefits between different industries',
    challengeGroup: 'manual workers and service workers',
    solution: 'fair labor policies and skills training',
    restatement: 'shorter working hours are possible, but not for every job immediately',
  },
  {
    id: 'famous-privacy',
    category: 'Media & Communication',
    title: 'Privacy of Famous People',
    prompt: 'Famous entertainers or sportspeople should give up the right to privacy as the price of fame. To what extent do you agree?',
    topic: 'the privacy of famous people',
    question: 'famous people should give up privacy as the price of fame',
    thesis: 'famous people should accept public attention, but they should not lose basic privacy',
    domains: 'media responsibility and personal rights',
    example: 'fans may be interested in a singer’s work, but family life should be respected',
    affected: 'celebrities and young fans',
    secondExample: 'too much media pressure can harm mental health',
    beneficiary: 'public figures',
    field: 'personal freedom and public trust',
    issue: 'online harassment and irresponsible reporting',
    challengeGroup: 'entertainers and sportspeople',
    solution: 'clear media rules and public respect',
    restatement: 'fame does not mean a person should lose all privacy',
  },
  {
    id: 'youth-unemployment-short-week',
    category: 'Work & Economy',
    title: 'Youth Unemployment and Shorter Week',
    prompt: 'Youth unemployment is serious. One solution is to shorten the working week. What are the advantages and disadvantages? Should it apply to young workers or the whole workforce?',
    topic: 'a shorter working week',
    question: 'a shorter working week can reduce youth unemployment',
    thesis: 'a shorter working week may help, but it should apply carefully to the whole workforce',
    domains: 'employment opportunities and work-life balance',
    example: 'if employees work fewer hours, companies may need to hire more workers',
    affected: 'young people and employers',
    secondExample: 'workers may also have more time for family and training',
    beneficiary: 'the labor market',
    field: 'employment and productivity',
    issue: 'lower income and higher business costs',
    challengeGroup: 'small companies',
    solution: 'trial programs and government support',
    restatement: 'shorter working weeks can help if they are introduced gradually',
  },
  {
    id: 'foreign-language-compulsory',
    category: 'Education & Learning',
    title: 'Compulsory Foreign Language',
    prompt: 'Some people think learning a foreign language at school should be compulsory. To what extent do you agree?',
    topic: 'foreign language learning',
    question: 'learning a foreign language at school should be compulsory',
    thesis: 'foreign language learning should be compulsory at a basic level because it brings many benefits',
    domains: 'communication and career development',
    example: 'students who learn English can access more books, websites and study opportunities',
    affected: 'students',
    secondExample: 'in my experience, language learning also helps people understand different cultures',
    beneficiary: 'young people',
    field: 'international communication and personal growth',
    issue: 'learning pressure and limited teaching resources',
    challengeGroup: 'students with different abilities',
    solution: 'practical lessons and flexible levels',
    restatement: 'foreign language learning is useful if schools teach it in a practical way',
  },
  {
    id: 'historic-buildings',
    category: 'Society & Culture',
    title: 'Historic Buildings and Housing',
    prompt: 'Many countries spend money restoring historic buildings rather than on modern housing. To what extent do you agree? What are advantages and disadvantages?',
    topic: 'restoring historic buildings',
    question: 'countries should spend money on historic buildings rather than modern housing',
    thesis: 'historic buildings should be protected, but housing needs should not be ignored',
    domains: 'cultural identity and urban development',
    example: 'old buildings help people remember history and attract tourists',
    affected: 'local residents and tourists',
    secondExample: 'restoration can support local jobs in tourism and construction',
    beneficiary: 'communities',
    field: 'culture and local economy',
    issue: 'high costs and shortage of affordable housing',
    challengeGroup: 'low-income families',
    solution: 'balanced public spending and careful city planning',
    restatement: 'historic buildings are valuable, but modern housing is also necessary',
  },
  {
    id: 'children-21st-century',
    category: 'Society & Culture',
    title: 'Children Growing Up Today',
    prompt: 'It is harder for children to grow up in the 21st century than in the past. How far do you agree?',
    topic: 'growing up in the 21st century',
    question: 'children today face more difficulties than children in the past',
    thesis: 'children today have more opportunities, but they also face stronger pressure',
    domains: 'education and mental health',
    example: 'children can use the internet to learn many subjects outside school',
    affected: 'children and families',
    secondExample: 'however, social media and exams can create stress and comparison',
    beneficiary: 'young people',
    field: 'personal development and emotional wellbeing',
    issue: 'academic pressure and online risks',
    challengeGroup: 'children and parents',
    solution: 'family support, school guidance and healthy technology use',
    restatement: 'modern childhood is not simply harder, but it needs better support',
  },
  {
    id: 'maximum-wage',
    category: 'Work & Economy',
    title: 'Maximum Wage',
    prompt: 'Many people say there should be a maximum wage for high-paying jobs because some people are paid too much. Do you support that?',
    topic: 'a maximum wage',
    question: 'there should be a maximum wage for high-paying jobs',
    thesis: 'a strict maximum wage is not the best solution, but income inequality should be reduced',
    domains: 'economic fairness and work motivation',
    example: 'high salaries may encourage people to take difficult jobs and accept responsibility',
    affected: 'workers and companies',
    secondExample: 'however, very large pay gaps can create social dissatisfaction',
    beneficiary: 'society',
    field: 'fairness and economic stability',
    issue: 'reduced motivation and possible talent loss',
    challengeGroup: 'businesses and skilled workers',
    solution: 'fair taxation and better minimum wages',
    restatement: 'income gaps should be managed without a simple maximum wage',
  },
  {
    id: 'city-or-countryside',
    category: 'Society & Culture',
    title: 'City or Countryside',
    prompt: 'Some people prefer to live in cities, while others prefer the countryside. Which is better for you?',
    topic: 'city life',
    question: 'living in cities or the countryside is better',
    thesis: 'city life is better for me because it offers more opportunities and services',
    domains: 'education and employment opportunities',
    example: 'cities usually have more schools, hospitals and public transport options',
    affected: 'students and workers',
    secondExample: 'young people can find internships and jobs more easily in large cities',
    beneficiary: 'urban residents',
    field: 'career development and convenience',
    issue: 'high living costs and traffic congestion',
    challengeGroup: 'young workers',
    solution: 'better city planning and affordable housing',
    restatement: 'cities suit my needs better, although countryside life is quieter',
  },
  {
    id: 'ai-translation-language',
    category: 'Technology',
    title: 'AI Translation and Language Learning',
    prompt: 'Artificial intelligence allows computers to translate foreign languages, making language learning unnecessary. To what extent do you agree?',
    topic: 'AI translation',
    question: 'AI translation makes learning a foreign language unnecessary',
    thesis: 'AI translation is helpful, but it cannot fully replace language learning',
    domains: 'communication and cultural understanding',
    example: 'translation apps can help tourists ask for directions or read simple signs',
    affected: 'students and travelers',
    secondExample: 'real language learning helps people understand culture, humor and emotion',
    beneficiary: 'language learners',
    field: 'international communication and personal growth',
    issue: 'inaccurate translation and over-reliance on technology',
    challengeGroup: 'students',
    solution: 'using AI as a tool while still learning basic language skills',
    restatement: 'AI translation supports language learning but should not replace it',
  },
]

function Highlight({ type, children }: { type: keyof typeof HIGHLIGHT_STYLE; children: ReactNode }) {
  return (
    <strong className={`rounded border px-1.5 py-0.5 font-bold ${HIGHLIGHT_STYLE[type]}`}>
      {children}
    </strong>
  )
}

function paragraphText(essay: EssayData) {
  return [
    `There is no doubt that ${essay.topic} has become an inseparable part of our lives, and the question of whether ${essay.question} has sparked widespread debate. From my perspective, I firmly believe that ${essay.thesis}, for the following reasons.`,
    `First and foremost, ${essay.topic} undeniably offers a wide range of benefits across various aspects, including ${essay.domains}. For instance, it is widely recognized that ${essay.example}. Moreover, ${essay.topic} has profoundly impacted ${essay.affected}. A notable example is that ${essay.secondExample}. Studies further suggest that ${essay.topic} can yield lasting benefits for ${essay.beneficiary}, particularly in terms of ${essay.field}. Therefore, it is evident that the advantages of ${essay.topic} need to be effectively leveraged to maximize positive impacts.`,
    `However, despite its advantages, ${essay.topic} is not without limitations. Improper use of or over-reliance on ${essay.topic} has led to issues such as ${essay.issue}. Research indicates that prolonged exposure to this problem may create long-term challenges for ${essay.challengeGroup}. Thus, it is imperative to address these drawbacks through ${essay.solution} to mitigate negative consequences.`,
    `In conclusion, the evidence overwhelmingly supports the view that ${essay.restatement}. To reach this potential, collaborative efforts among individuals, educational institutions, companies and policymakers are fundamental.`,
  ].join(' ')
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function EssayBody({ essay }: { essay: EssayData }) {
  return (
    <div className="space-y-5 text-base leading-8 text-gray-800 sm:text-[17px] sm:leading-9">
      <p>
        There is no doubt that <Highlight type="topic">{essay.topic}</Highlight> has become an inseparable part of our lives, and the question of whether <Highlight type="topic">{essay.question}</Highlight> has sparked widespread debate. From my perspective, I firmly believe that <Highlight type="thesis">{essay.thesis}</Highlight>, for the following reasons.
      </p>
      <p>
        First and foremost, <Highlight type="topic">{essay.topic}</Highlight> undeniably offers a wide range of benefits across various aspects, including <Highlight type="field">{essay.domains}</Highlight>. For instance, it is widely recognized that <Highlight type="example">{essay.example}</Highlight>. Moreover, <Highlight type="topic">{essay.topic}</Highlight> has profoundly impacted <Highlight type="field">{essay.affected}</Highlight>. A notable example is that <Highlight type="example">{essay.secondExample}</Highlight>. Studies further suggest that <Highlight type="topic">{essay.topic}</Highlight> can yield lasting benefits for <Highlight type="field">{essay.beneficiary}</Highlight>, particularly in terms of <Highlight type="field">{essay.field}</Highlight>. Therefore, it is evident that the advantages of <Highlight type="topic">{essay.topic}</Highlight> need to be effectively leveraged to maximize positive impacts.
      </p>
      <p>
        However, despite its advantages, <Highlight type="topic">{essay.topic}</Highlight> is not without limitations. Improper use of or over-reliance on <Highlight type="topic">{essay.topic}</Highlight> has led to issues such as <Highlight type="issue">{essay.issue}</Highlight>. Research indicates that prolonged exposure to this problem may create long-term challenges for <Highlight type="field">{essay.challengeGroup}</Highlight>. Thus, it is imperative to address these drawbacks through <Highlight type="solution">{essay.solution}</Highlight> to mitigate negative consequences.
      </p>
      <p>
        In conclusion, the evidence overwhelmingly supports the view that <Highlight type="thesis">{essay.restatement}</Highlight>. To reach this potential, collaborative efforts among individuals, educational institutions, companies and policymakers are fundamental.
      </p>
    </div>
  )
}

export default function WEPredictionPage() {
  const availableCategories = CATEGORIES.filter(category => ESSAYS.some(essay => essay.category === category))
  const [activeCategory, setActiveCategory] = useState<Category>(availableCategories[0])
  const activeEssays = ESSAYS.filter(essay => essay.category === activeCategory)

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-xl font-bold text-gray-900">6月 WE 预测题范文</h2>
        <p className="mt-2 text-base leading-7 text-gray-500">
          按题目 topic 分类整理，范文沿用当前 WE 四段模板。彩色加粗部分是模板填充内容，整体表达保持普通大学英语水平，字数控制在 250-300 左右。重复题目已合并展示。
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
          <span className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-emerald-800">主题/改写题目</span>
          <span className="rounded border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-violet-800">观点句</span>
          <span className="rounded border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-sky-800">领域/对象</span>
          <span className="rounded border border-fuchsia-200 bg-fuchsia-50 px-2.5 py-1.5 text-fuchsia-800">例子</span>
          <span className="rounded border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-rose-800">问题</span>
          <span className="rounded border border-orange-200 bg-orange-50 px-2.5 py-1.5 text-orange-800">措施</span>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {availableCategories.map(category => {
            const active = activeCategory === category
            const count = ESSAYS.filter(essay => essay.category === category).length

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-base font-bold transition-colors ${
                  active
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
                <span className={`ml-2 ${active ? 'text-gray-300' : 'text-gray-400'}`}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">{activeCategory}</h3>
          <span className="text-base font-semibold text-gray-500">{activeEssays.length} 篇</span>
        </div>
        <div className="space-y-5">
          {activeEssays.map(essay => (
            <article key={essay.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 border-b border-gray-100 pb-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <h4 className="text-xl font-bold text-gray-900">{essay.title}</h4>
                  <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600">
                    {wordCount(paragraphText(essay))} words
                  </span>
                </div>
                <p className="mt-2 text-base leading-7 text-gray-500">{essay.prompt}</p>
              </div>
              <EssayBody essay={essay} />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
