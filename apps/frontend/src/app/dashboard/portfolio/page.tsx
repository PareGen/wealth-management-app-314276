'use client';

import { usePortfolios } from '@/features/portfolios/hooks/use-portfolios';

export default function PortfolioManagementPage() {
  const { data: portfolios, isLoading } = usePortfolios();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Portfolio Management</h1>
      <p className="text-muted-foreground mb-6">Management and analysis of user investment portfolio.</p>
      
      <div className="grid gap-4">
        {portfolios?.map((portfolio: any) => (
          <div key={portfolio.id} className="border rounded p-4">
            <pre>{JSON.stringify(portfolio, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
