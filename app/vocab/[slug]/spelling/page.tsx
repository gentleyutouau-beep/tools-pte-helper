import { notFound } from 'next/navigation'
import NavBar from '@/components/NavBar'
import SpellingPractice from '@/components/SpellingPractice'
import { getVocabularyBook, VOCABULARY_BOOKS } from '@/lib/vocabulary'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return VOCABULARY_BOOKS.map((book) => ({ slug: book.slug }))
}

export function generateMetadata({ params }: Props) {
  const book = getVocabularyBook(params.slug)
  return {
    title: book ? `${book.title} 拼写练习 | PTE 备考助手` : '拼写练习 | PTE 备考助手',
  }
}

export default function SpellingPracticePage({ params }: Props) {
  const book = getVocabularyBook(params.slug)
  if (!book) notFound()

  return (
    <>
      <NavBar />
      <SpellingPractice book={book} />
    </>
  )
}
