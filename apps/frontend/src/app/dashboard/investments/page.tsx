'use client';

import { useInvestments } from '@/features/investments/hooks/use-investments';

export default function InvestmentTrackingPage() {
  const { data: investments, isLoading } = useInvestments();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Investment Tracking</h1>
      <p className="text-muted-foreground mb-6">Tracking performance and details of individual investments.</p>
      
      <div className="grid gap-4">
        {investments?.map((investment: any) => (
          <div key={investment.id} className="border rounded p-4">
            <pre>{JSON.stringify(investment, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
