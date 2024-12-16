'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useAuthStore } from '@/lib/store';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const { loginIdentifier } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginIdentifier }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }

      setIsSubmitted(true);
    } catch (err) {
      // setError('Failed to send reset email. Please try again.');
      console.log(err)
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleOpenEmail = () => {
    window.location.href = `mailto:${loginIdentifier}`;
  };

  return (
    <AuthCard
      title="Forgot Password?"
      description={
        isSubmitted
          ? "No worries, we've sent you a reset email"
          : "No worries, we'll send you reset email."
      }
      footerContent={
        <Link href="/auth/login" className="underline font-medium">
          Back to Login
        </Link>
      }
      onClose={() => router.push('/auth/login/email-login')}
    >
      <form onSubmit={handleSubmit} className="space-y-12 px-8">
        <div className="space-y-4 mt-6">
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
            {isSubmitted && (
              <div className="text-center ">
                <p className="text-sm">Didn&apos;t receive a code yet?</p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-sm underline font-medium hover:opacity-80"
                >
                  Click to Resend
                </button>
              </div>
            )}
          </div>
          {isLoading ? (
            <Loader2 className="h-32 p-4 w-full animate-spin" />
          ) : (
            <div className="h-32 w-full" />
          )}
        </div>
        <Button
          type={isSubmitted ? 'button' : 'submit'}
          onClick={isSubmitted ? handleOpenEmail : undefined}
          className="rounded-full px-10 py-4 mx-auto"
          disabled={isLoading || !loginIdentifier}
        >
          {isSubmitted ? 'Open Email' : 'Reset Password'}
        </Button>
      </form>
    </AuthCard>
  );
}
