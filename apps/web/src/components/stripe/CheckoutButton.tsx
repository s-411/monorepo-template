import { useAction } from 'convex/react'
import { api } from '@packages/backend/convex/_generated/api'
import { useState } from 'react'

interface CheckoutButtonProps {
  priceKey: 'PRO_MONTHLY' | 'PRO_YEARLY'
  children?: React.ReactNode
  className?: string
}

export default function CheckoutButton({ priceKey, children, className }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const createCheckout = useAction(api.stripe.checkout.createCheckoutSession)

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      const { url } = await createCheckout({ priceKey })
      window.location.href = url
    } catch (error) {
      console.error('Failed to create checkout session:', error)
      alert('Failed to start checkout. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={className || 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50'}
    >
      {isLoading ? 'Loading...' : (children || 'Subscribe')}
    </button>
  )
}
