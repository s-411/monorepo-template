import Header from '@/components/Header'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Your App Name</h1>
        <p className="text-xl text-gray-600 mb-8">
          Built with Vite + React + Convex + Clerk
        </p>

        <SignedOut>
          <p className="text-gray-700">
            Sign in to get started
          </p>
        </SignedOut>

        <SignedIn>
          <Link
            to="/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </SignedIn>
      </main>
    </div>
  )
}
