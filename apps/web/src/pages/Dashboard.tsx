import { useQuery } from 'convex/react'
import { api } from '@packages/backend/convex/_generated/api'
import Header from '@/components/Header'
import SubscriptionStatus from '@/components/stripe/SubscriptionStatus'
import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useUser()
  const hello = useQuery(api.example.hello)
  const currentUser = useQuery(api.example.getCurrentUser)
  const subscription = useQuery(api.stripe.subscriptions.getCurrent)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'there'}!
          </h1>
          <p className="text-gray-600">Here's an overview of your account and system status.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Subscription Status Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription Status</h2>
            {subscription === undefined ? (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : subscription ? (
              <SubscriptionStatus />
            ) : (
              <div>
                <p className="text-gray-600 mb-4">You don't have an active subscription yet.</p>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Pricing Plans
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/pricing"
                className="block w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">View Pricing</div>
                    <div className="text-sm text-gray-600">Explore subscription plans</div>
                  </div>
                </div>
              </Link>
              <Link
                to="/account"
                className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Account Settings</div>
                    <div className="text-sm text-gray-600">Manage your profile and billing</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* System Status Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">System Status</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Clerk Authentication
              </h3>
              <p className="text-sm text-green-800">Name: {user?.fullName || user?.firstName || 'Not set'}</p>
              <p className="text-sm text-green-800">Email: {user?.primaryEmailAddress?.emailAddress}</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Convex Backend
              </h3>
              <p className="text-sm text-blue-800">{hello || 'Loading...'}</p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Type Safety
              </h3>
              {currentUser ? (
                <>
                  <p className="text-sm text-purple-800">User ID: {currentUser.userId.substring(0, 12)}...</p>
                  <p className="text-sm text-purple-800">Synced: {currentUser.name}</p>
                </>
              ) : (
                <p className="text-sm text-purple-800">Loading...</p>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700 font-medium mb-2">✅ All Systems Operational</p>
            <p className="text-xs text-gray-600">
              Authentication, database, and type safety are all working correctly. You're ready to build your app!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
