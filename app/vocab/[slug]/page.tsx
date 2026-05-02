import { notFound } from 'next/navigation'
import NavBar from '@/components/NavBar'
import VocabularyBookPage from '@/components/VocabularyBookPage'
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
    title: book ? `${book.title} | PTE 备考助手` : '词汇专区 | PTE 备考助手',
  }
}

export default function VocabularyPage({ params }: Props) {
  const book = getVocabularyBook(params.slug)
  if (!book) notFound()

  return (
    <>
      <NavBar />
      <VocabularyBookPage book={book} showBookTabs />
    </>
  )
}
