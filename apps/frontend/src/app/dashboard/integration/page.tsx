'use client';

import { useIntegrations } from '@/features/integrations/hooks/use-integrations';

export default function FinancialIntegrationPage() {
  const { data: integrations, isLoading } = useIntegrations();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Financial Integration</h1>
      <p className="text-muted-foreground mb-6">Integration with various financial institutions for account syncing.</p>
      
      <div className="grid gap-4">
        {integrations?.map((integration: any) => (
          <div key={integration.id} className="border rounded p-4">
            <pre>{JSON.stringify(integration, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
