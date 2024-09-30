'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth-card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Implement forgot password logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/login/new-password');
    }, 1500);
  };

  return (
    <AuthCard
      title="Forgot Password?"
      description="No worries, we'll send you reset instructions."
      onClose={() => router.push('/')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 mb-24 mt-6">
          <div className="space-y-2 text-start">
            <label htmlFor="email" className="text-sm pl-3 font-semibold">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl p-6"
              placeholder="Enter your email address"
            />
          </div>
          <p className="text-sm text-center text-muted-foreground">
            We&apos;ll send a password reset link to your email.
          </p>
        </div>
        <Button
          type="submit"
          className="rounded-full px-10 py-4 w-full"
          disabled={isLoading || !email}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Reset Password
        </Button>
      </form>
    </AuthCard>
  );
}
