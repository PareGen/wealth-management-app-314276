'use client';

import { useReports } from '@/features/reports/hooks/use-reports';

export default function ReportingAndAnalyticsPage() {
  const { data: reports, isLoading } = useReports();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Reporting and Analytics</h1>
      <p className="text-muted-foreground mb-6">Generating reports and analytics for portfolio and investments.</p>
      
      <div className="grid gap-4">
        {reports?.map((report: any) => (
          <div key={report.id} className="border rounded p-4">
            <pre>{JSON.stringify(report, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
