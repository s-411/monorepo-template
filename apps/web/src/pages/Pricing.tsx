import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '@packages/backend/convex/_generated/api';
import { Link } from 'react-router-dom';
import CheckoutButton from '../components/stripe/CheckoutButton';
import Header from '../components/Header';

export default function Pricing() {
  const { isSignedIn } = useUser();
  const subscription = useQuery(api.stripe.subscriptions.getCurrent);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for you. Cancel anytime.
          </p>
        </div>

        {/* Current Subscription Banner */}
        {subscription && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-800 font-medium">
              ✅ You have an active {subscription.stripePriceId.includes('month') ? 'monthly' : 'annual'} subscription
            </p>
            <Link to="/account" className="text-green-700 underline text-sm">
              Manage your subscription →
            </Link>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Monthly Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Monthly</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-gray-900">$9.99</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">All features included</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Cancel anytime</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Billed monthly</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">No long-term commitment</span>
              </li>
            </ul>

            {isSignedIn ? (
              <CheckoutButton priceKey="PRO_MONTHLY" className="w-full">
                Subscribe Monthly
              </CheckoutButton>
            ) : (
              <Link
                to="/"
                className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Sign In to Subscribe
              </Link>
            )}
          </div>

          {/* Annual Plan - Highlighted */}
          <div className="bg-white border-2 border-blue-600 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative">
            {/* Best Value Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                BEST VALUE
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Annual</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-gray-900">$39.99</span>
                <span className="text-gray-600">/year</span>
              </div>
              <p className="text-green-600 font-semibold mt-2">
                Save $79.89/year (67% off)
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">All features included</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Cancel anytime</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Billed annually</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 font-semibold">Best value - 67% savings</span>
              </li>
            </ul>

            {isSignedIn ? (
              <CheckoutButton priceKey="PRO_YEARLY" className="w-full">
                Subscribe Annually
              </CheckoutButton>
            ) : (
              <Link
                to="/"
                className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Sign In to Subscribe
              </Link>
            )}
          </div>
        </div>

        {/* Test Mode Notice */}
        <div className="max-w-2xl mx-auto p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="font-semibold text-yellow-900 mb-2">🧪 Test Mode Active</p>
          <p className="text-sm text-yellow-800">
            This is a test environment. Use test card <code className="bg-white px-2 py-0.5 rounded font-mono">4242 4242 4242 4242</code> with any future expiry and any CVC.
          </p>
        </div>

        {/* FAQ or Additional Info */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions?</h2>
          <p className="text-gray-600">
            All plans include full access to all features. You can upgrade, downgrade, or cancel your subscription at any time from your{' '}
            <Link to="/account" className="text-blue-600 hover:underline">account page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
