import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '@packages/backend/convex/_generated/api';
import { Link } from 'react-router-dom';
import SubscriptionStatus from '../components/stripe/SubscriptionStatus';
import Header from '../components/Header';

export default function Account() {
  const { user } = useUser();
  const customer = useQuery(api.stripe.customers.getCurrent);
  const subscription = useQuery(api.stripe.subscriptions.getCurrent);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your profile and subscription</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-900">{user?.fullName || user?.firstName || 'Not set'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-900">{user?.primaryEmailAddress?.emailAddress}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600 font-medium">User ID:</span>
                <span className="text-gray-900 font-mono text-sm">{user?.id}</span>
              </div>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription</h2>

            {subscription === undefined ? (
              // Loading state
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : subscription ? (
              // Has subscription
              <SubscriptionStatus />
            ) : (
              // No subscription
              <div className="text-center py-8">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Subscription</h3>
                <p className="text-gray-600 mb-6">
                  Subscribe to unlock all features and get the most out of your account.
                </p>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Pricing Plans
                </Link>
              </div>
            )}
          </div>

          {/* Stripe Customer Info (for debugging) */}
          {customer && (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Billing Information</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-1">
                  <span className="text-gray-600">Stripe Customer ID:</span>
                  <span className="text-gray-900 font-mono text-xs">{customer.stripeCustomerId}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-gray-600">Customer Email:</span>
                  <span className="text-gray-900">{customer.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/dashboard"
                className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-gray-900">Go to Dashboard</div>
                <div className="text-sm text-gray-600">View your main dashboard</div>
              </Link>
              <Link
                to="/pricing"
                className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-gray-900">View Pricing</div>
                <div className="text-sm text-gray-600">Explore subscription plans</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
