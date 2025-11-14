import { useQuery } from 'convex/react';
import { api } from '@packages/backend/convex/_generated/api';

export default function SubscriptionBadge() {
  const hasActiveSubscription = useQuery(api.stripe.subscriptions.hasActive);

  if (hasActiveSubscription === undefined) {
    // Loading state
    return null;
  }

  if (!hasActiveSubscription) {
    return null;
  }

  return (
    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
      ✨ Pro
    </span>
  );
}
