'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { VocabularyBook } from '@/lib/vocabulary'
import { getVocabularyEntry } from '@/lib/vocabularyDetails'
import { useSyncedProgress } from '@/lib/useSyncedProgress'

type MasteryFilter = 'all' | 'known' | 'unknown'
type PracticeFilter = 'all' | 'known' | 'unknown' | 'practiced' | 'unpracticed'
type ExerciseMode = 'dictation' | 'meaning'
type Feedback = 'correct' | 'incorrect'

const VOCABULARY_STORAGE_KEY = 'pte-vocabulary-status-v1'
const SPELLING_PRACTICE_STORAGE_KEY = 'pte-spelling-practice-v1'

function shuffle<T>(items: T[]) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[nextIndex]] = [result[nextIndex], result[index]]
  }
  return result
}

export default function SpellingPractice({ book }: { book: VocabularyBook }) {
  const { statusMap: manualStatusMap } = useSyncedProgress(VOCABULARY_STORAGE_KEY, 'vocabulary', 'vocabulary')
  const { statusMap: practicedMap, updateStatus: updatePracticedStatus } = useSyncedProgress(
    SPELLING_PRACTICE_STORAGE_KEY,
    'spelling-practice',
    'spelling practice',
    true
  )
  const [masteryFilter, setMasteryFilter] = useState<MasteryFilter>('all')
  const [practiceFilter, setPracticeFilter] = useState<PracticeFilter>('all')
  const [exerciseMode, setExerciseMode] = useState<ExerciseMode>('dictation')
  const [questions, setQuestions] = useState<string[] | null>(null)
  const [position, setPosition] = useState(0)
  const [reviewQueue, setReviewQueue] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [wrongWords, setWrongWords] = useState<string[]>([])
  const [completedWords, setCompletedWords] = useState<string[]>([])

  const filteredWords = useMemo(() => book.words.filter((word) => {
    const key = word.toLowerCase()
    const manualStatus = manualStatusMap[key]?.status
    const practiceStatus = practicedMap[key]?.status
    const hasPracticed = Boolean(practicedMap[key])

    const matchesMastery =
      masteryFilter === 'all' ||
      manualStatus === masteryFilter
    const matchesPractice =
      practiceFilter === 'all' ||
      (practiceFilter === 'known' && practiceStatus === 'known') ||
      (practiceFilter === 'unknown' && practiceStatus === 'unknown') ||
      (practiceFilter === 'practiced' && hasPracticed) ||
      (practiceFilter === 'unpracticed' && !hasPracticed)

    return matchesMastery && matchesPractice
  }), [book.words, manualStatusMap, masteryFilter, practiceFilter, practicedMap])

  const activeQuestions = questions ?? []
  const currentWord = activeQuestions[position] ?? reviewQueue[0]
  const isReview = position >= activeQuestions.length
  const totalCompleted = completedWords.length
  const totalQuestions = activeQuestions.length
  const isComplete = questions !== null && !currentWord
  const entry = currentWord ? getVocabularyEntry(currentWord) : null

  const playWord = useCallback((word: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }, [])

  useEffect(() => {
    if (!questions || !currentWord || exerciseMode !== 'dictation') return

    playWord(currentWord)
    return () => window.speechSynthesis?.cancel()
  }, [currentWord, exerciseMode, playWord, questions])

  const startPractice = () => {
    setQuestions(shuffle(filteredWords))
    setPosition(0)
    setReviewQueue([])
    setInput('')
    setFeedback(null)
    setWrongWords([])
    setCompletedWords([])
  }

  const moveToNextQuestion = () => {
    if (feedback === 'incorrect' && currentWord && !isReview) {
      setReviewQueue((queue) => [...queue, currentWord])
    }

    if (isReview) {
      setReviewQueue((queue) => queue.slice(1))
    } else {
      setPosition((current) => current + 1)
    }

    if (currentWord) {
      setCompletedWords((words) => [...words, currentWord])
    }
    setInput('')
    setFeedback(null)
  }

  const submitAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!currentWord || !input.trim() || feedback) return

    if (input.trim().toLocaleLowerCase() === currentWord.toLocaleLowerCase()) {
      updatePracticedStatus(currentWord, 'known')
      setFeedback('correct')
      return
    }

    updatePracticedStatus(currentWord, 'unknown')
    setFeedback('incorrect')
    setWrongWords((words) => (words.includes(currentWord) ? words : [...words, currentWord]))
  }

  const tryAgain = () => {
    setInput('')
    setFeedback(null)
  }

  if (isComplete) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Link href={`/vocab/${book.slug}`} className="text-sm text-teal-700 hover:text-teal-900">← 返回词书</Link>
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-teal-700">本轮完成</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">拼写练习结果</h1>
          <p className="mt-4 text-gray-600">完成 {totalCompleted} 次作答，其中 {wrongWords.length} 个词曾拼错。</p>

          {wrongWords.length > 0 ? (
            <div className="mt-6 rounded-xl bg-rose-50 p-4">
              <h2 className="font-semibold text-rose-900">本轮错词</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {wrongWords.map((word) => (
                  <li key={word} className="rounded-lg bg-white px-3 py-2 text-sm text-gray-800">{word}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-emerald-800">这轮没有拼错的单词。</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={startPractice} className="rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800">再练一轮</button>
            <Link href={`/vocab/${book.slug}`} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">返回词书</Link>
          </div>
        </section>
      </main>
    )
  }

  if (!questions) {
    const masteryOptions: Array<{ value: MasteryFilter; label: string }> = [
      { value: 'all', label: `全部 ${book.words.length}` },
      { value: 'known', label: '会的' },
      { value: 'unknown', label: '不会的' },
    ]
    const practiceOptions: Array<{ value: PracticeFilter; label: string }> = [
      { value: 'all', label: '全部' },
      { value: 'known', label: '听写会' },
      { value: 'unknown', label: '听写不会' },
      { value: 'practiced', label: '已练习' },
      { value: 'unpracticed', label: '未练习' },
    ]

    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Link href={`/vocab/${book.slug}`} className="text-sm text-teal-700 hover:text-teal-900">← 返回词书</Link>
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-teal-700">{book.title}</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">拼写练习</h1>
          <p className="mt-3 text-gray-600">听写模式只播放英文单词，不显示文字提示；答错后只显示正确拼写，不提供逐字提示。</p>

          <fieldset className="mt-7">
            <legend className="text-sm font-semibold text-gray-900">练习方式</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => setExerciseMode('dictation')} className={`rounded-xl border p-4 text-left ${exerciseMode === 'dictation' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <span className="block font-semibold text-gray-900">听写模式</span>
                <span className="mt-1 block text-sm text-gray-500">播放英文读音，听音拼写</span>
              </button>
              <button type="button" onClick={() => setExerciseMode('meaning')} className={`rounded-xl border p-4 text-left ${exerciseMode === 'meaning' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <span className="block font-semibold text-gray-900">释义拼写</span>
                <span className="mt-1 block text-sm text-gray-500">根据中文释义拼写，不展示例句</span>
              </button>
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-gray-900">自己标记</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {masteryOptions.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMasteryFilter(value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${masteryFilter === value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-sm font-semibold text-gray-900">听写结果</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {practiceOptions.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPracticeFilter(value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${practiceFilter === value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <p className="mt-4 text-sm text-gray-500">将练习筛选出的全部 {filteredWords.length} 个词，顺序随机。</p>

          <button type="button" onClick={startPractice} disabled={filteredWords.length === 0} className="mt-8 w-full rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-300">开始练习</button>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <Link href={`/vocab/${book.slug}`} className="text-sm text-teal-700 hover:text-teal-900">← 退出练习</Link>
        <p className="text-sm font-mono text-gray-500">{Math.min(position + 1, totalQuestions)} / {totalQuestions}{isReview ? ' · 错词复习' : ''}</p>
      </div>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-teal-700">{exerciseMode === 'dictation' ? '听音拼写这个单词' : '请拼写这个单词'}</p>
        {exerciseMode === 'dictation' ? (
          <div className="mt-5 rounded-xl bg-gray-50 p-5 text-center">
            <p className="text-sm text-gray-500">音频已自动播放，可按需重复播放。</p>
            <button type="button" onClick={() => playWord(currentWord)} className="mt-3 rounded-lg border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50">🔊 再听一次</button>
          </div>
        ) : (
          <div className="mt-5">
            <p className="text-lg text-gray-800">
              {entry?.senses.map((sense, index) => (
                <span key={`${sense.partOfSpeech}-${sense.translation}`}>
                  {index > 0 && <span className="mx-2 text-gray-300">|</span>}
                  <span className="font-semibold text-gray-500">{sense.partOfSpeech}</span>
                  <span className="mx-1">·</span>{sense.translation}
                </span>
              ))}
            </p>
          </div>
        )}

        <form onSubmit={submitAnswer} className="mt-7">
          <label className="sr-only" htmlFor="spelling-answer">输入英文单词</label>
          <input
            id="spelling-answer"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={feedback !== null}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            autoFocus
            placeholder="输入完整英文单词"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50"
          />
          {!feedback && <button type="submit" disabled={!input.trim()} className="mt-3 w-full rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-300">提交（Enter）</button>}
        </form>

        {feedback === 'correct' && (
          <div className="mt-5 rounded-xl bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-800">拼写正确</p>
            <button type="button" onClick={moveToNextQuestion} className="mt-3 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">下一题</button>
          </div>
        )}

        {feedback === 'incorrect' && (
          <div className="mt-5 rounded-xl bg-rose-50 p-4">
            <p className="font-semibold text-rose-900">正确拼写：<span className="font-mono">{currentWord}</span></p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button type="button" onClick={tryAgain} className="rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-800 hover:bg-rose-100">再试一次</button>
              <button type="button" onClick={moveToNextQuestion} className="rounded-lg bg-rose-700 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800">下一题</button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
