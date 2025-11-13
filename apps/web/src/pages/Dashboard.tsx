import { useQuery } from 'convex/react'
import { api } from '@packages/backend/convex/_generated/api'
import Header from '@/components/Header'
import { useUser } from '@clerk/clerk-react'

export default function Dashboard() {
  const { user } = useUser()
  const hello = useQuery(api.example.hello)
  const currentUser = useQuery(api.example.getCurrentUser)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-2">Clerk User:</h2>
            <p>Name: {user?.fullName || user?.firstName || 'Not set'}</p>
            <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-2">Convex Query:</h2>
            <p>{hello || 'Loading...'}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-2">Convex + Clerk Integration:</h2>
            {currentUser ? (
              <>
                <p>User ID: {currentUser.userId}</p>
                <p>Name: {currentUser.name}</p>
                <p>Email: {currentUser.email}</p>
              </>
            ) : (
              <p>Loading user data from Convex...</p>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 border border-gray-300 rounded">
          <p className="text-sm text-gray-600">
            ✅ Authentication is working (you're signed in)
            <br />
            ✅ Convex is connected and responding
            <br />
            ✅ Type safety is working (imports from backend)
            <br />
            <br />
            You can now start building your app!
          </p>
        </div>
      </main>
    </div>
  )
}
