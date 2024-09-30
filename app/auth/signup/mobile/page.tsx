'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Check } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useSignupStore } from '@/lib/store';

export default function MobilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const router = useRouter();
  const { mobile, setMobile } = useSignupStore();

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/;
    setIsValidPhone(re.test(phone));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/signup/otp');
    }, 1500);
  };

  return (
    <AuthCard
      title="What's your mobile number?"
      description="We'll send you a code to verify your number"
      onClose={() => router.push('/auth/signup/name')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="tel"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              validatePhone(e.target.value);
            }}
            className="rounded-xl text-start p-6"
          />
          {isValidPhone && (
            <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          )}
        </div>
        <Button
          type="submit"
          className="rounded-full px-10 py-4"
          disabled={isLoading || !isValidPhone}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Send OTP
        </Button>
      </form>
    </AuthCard>
  );
}
