import { Button } from '@/components/ui/button';
import AuthCard from '@/components/auth-card';
import Link from 'next/link';

export default function VerifyRequestPage() {
  return (
    <AuthCard
      title="Check your email"
      description="A sign in link has been sent to your email address."
    >
      <div className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          If you don&apos;t see it, check your spam folder. If you still
          don&apos;t see it, try requesting another link.
        </p>
        <Button asChild className="w-full">
          <Link href="/auth/login">Return to login</Link>
        </Button>
      </div>
    </AuthCard>
  );
}
