import { Button } from '@saas-template/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-4">SaaS Template</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Modern, production-ready SaaS starter with Next.js 15, NestJS, and PostgreSQL
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/login">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
