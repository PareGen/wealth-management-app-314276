'use client';

import { useNotifications } from '@/features/notifications/hooks/use-notifications';

export default function NotificationsAndAlertsPage() {
  const { data: notifications, isLoading } = useNotifications();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications and Alerts</h1>
      <p className="text-muted-foreground mb-6">View and manage notifications and alerts related to investments.</p>
      
      <div className="grid gap-4">
        {notifications?.map((notification: any) => (
          <div key={notification.id} className="border rounded p-4">
            <pre>{JSON.stringify(notification, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
