import { useQuery } from 'convex/react'
import { api } from '@packages/backend/convex/_generated/api'
import PortalButton from './PortalButton'

export default function SubscriptionStatus() {
  const subscription = useQuery(api.stripe.subscriptions.getCurrent)

  if (subscription === undefined) {
    return <div className="text-sm text-gray-500">Loading subscription...</div>
  }

  if (!subscription) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">No active subscription</p>
      </div>
    )
  }

  const status = subscription.status
  const endDate = new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()

  return (
    <div className="p-4 bg-white border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-semibold">Subscription Status</h3>
          <p className="text-sm text-gray-600">
            Status: <span className={`font-medium ${status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
              {status}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            {subscription.cancelAtPeriodEnd
              ? `Cancels on ${endDate}`
              : `Renews on ${endDate}`
            }
          </p>
        </div>
        <PortalButton />
      </div>
    </div>
  )
}
