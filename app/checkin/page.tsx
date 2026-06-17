import CheckInTable from '@/components/CheckInTable'
import NavBar from '@/components/NavBar'

export default function CheckInPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <CheckInTable />
      </main>
    </>
  )
}
