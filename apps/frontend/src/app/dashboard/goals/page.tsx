'use client';

import { useGoals } from '@/features/goals/hooks/use-goals';

export default function GoalSettingPage() {
  const { data: goals, isLoading } = useGoals();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Goal Setting</h1>
      <p className="text-muted-foreground mb-6">Setting and tracking financial goals.</p>
      
      <div className="grid gap-4">
        {goals?.map((goal: any) => (
          <div key={goal.id} className="border rounded p-4">
            <pre>{JSON.stringify(goal, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
