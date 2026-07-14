'use client';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ds/Button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center bg-canvas">
      <Container className="flex flex-col items-start gap-3 pt-12">
        <h1 className="t-display">Something went wrong.</h1>
        <p className="t-body-lg max-w-[480px] text-muted">Please try again.</p>
        <Button onClick={reset} iconRight="arrowRight">
          Try Again
        </Button>
      </Container>
    </div>
  );
}
