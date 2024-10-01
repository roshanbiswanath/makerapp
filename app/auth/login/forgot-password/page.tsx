'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useAuthStore } from '@/lib/store';
import { signIn } from 'next-auth/react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { loginIdentifier } = useAuthStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('email', {
        loginIdentifier,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
      console.log('Password reset success:', result);

      router.push('/auth/login/verify-request');
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
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
            <div className="relative w-full">
              <Input
                id="email"
                type="email"
                value={loginIdentifier}
                className="rounded-xl p-6"
                readOnly
              />
              <Check className="absolute right-3 top-6 transform -translate-y-1/2 text-green-500" />
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            We&apos;ll send a password reset link to your email.
          </p>
        </div>
        <Button
          type="submit"
          className="rounded-full px-10 py-4 w-full"
          disabled={isLoading || !loginIdentifier}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Reset Password
        </Button>
      </form>
    </AuthCard>
  );
}
