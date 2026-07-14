import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ds/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center bg-hero-tint">
      <Container className="flex flex-col items-start gap-3 pt-12">
        <p className="t-eyebrow">404</p>
        <h1 className="t-display">This page moved on.</h1>
        <p className="t-body-lg max-w-[480px] text-muted">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Button href="/" iconRight="arrowRight">
          Back to Home
        </Button>
      </Container>
    </div>
  );
}
