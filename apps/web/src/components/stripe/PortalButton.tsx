import { useAction } from 'convex/react'
import { api } from '@packages/backend/convex/_generated/api'
import { useState } from 'react'

interface PortalButtonProps {
  children?: React.ReactNode
  className?: string
}

export default function PortalButton({ children, className }: PortalButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const createPortal = useAction(api.stripe.checkout.createPortalSession)

  const handlePortal = async () => {
    try {
      setIsLoading(true)
      const { url } = await createPortal({})
      window.location.href = url
    } catch (error) {
      console.error('Failed to create portal session:', error)
      alert('Failed to open customer portal. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handlePortal}
      disabled={isLoading}
      className={className || 'px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50'}
    >
      {isLoading ? 'Loading...' : (children || 'Manage Subscription')}
    </button>
  )
}
