import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import SubscriptionBadge from './SubscriptionBadge'

export default function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              Your App
            </Link>
            <SignedIn>
              <SubscriptionBadge />
            </SignedIn>
          </div>

          <nav className="flex items-center gap-6">
            {/* Pricing link - visible to all users */}
            <Link to="/pricing" className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </Link>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard" className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Dashboard
              </Link>
              <Link to="/account" className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Account
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9"
                  }
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Account"
                    labelIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    }
                    href="/account"
                  />
                  <UserButton.Link
                    label="Billing"
                    labelIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    }
                    href="/account"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  )
}
