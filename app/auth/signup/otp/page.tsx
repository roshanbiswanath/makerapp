// app/auth/signup/otp/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, MessageCircleMore } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useSignupStore } from '@/lib/store';
import { updateSignupData } from '@/app/auth';

export default function OtpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(45);
  const router = useRouter();
  const { mobile, userId } = useSignupStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setOtpTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // if (verified) {
      await updateSignupData(userId, { mobile });

      console.log('Mobile updated:', mobile);

      router.push('/auth/signup/user-type');
      // } else {
      router.push('/auth/signup/mobile');
      // }
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <AuthCard
      title="Enter OTP"
      description={`Enter the code we've sent via SMS to ${mobile}`}
      onClose={() => router.push('/auth/signup/mobile')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-2xl border-s-0 border-e-0 border-t-0 rounded-none border-b-2 border-black ring-0 focus:border-b-3 text-green-400"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
            />
          ))}
        </div>
        <p className="text-sm text-center">
          Resend OTP in{' '}
          <span className="font-medium text-green-400">
            {String(Math.floor(otpTimer / 60)).padStart(2, '0')}:
            {String(otpTimer % 60).padStart(2, '0')}
          </span>
        </p>
        <Button
          type="submit"
          className="rounded-full px-10 py-4"
          disabled={isLoading || otp.some((digit) => digit === '')}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Verify OTP
        </Button>
        <Button
          variant="link"
          className="w-full text-xs text-muted-foreground font-light flex gap-x-1 items-center justify-center"
          onClick={() => {
            if (otpTimer === 0) {
              setOtpTimer(45);
              // Implement resend OTP logic here
            }
          }}
          disabled={otpTimer > 0}
        >
          <span>
            <MessageCircleMore className="h-4 w-4" />
          </span>{' '}
          <span>{otpTimer > 0 ? 'Resend OTP' : 'Send on Whatsapp'}</span>
        </Button>
      </form>
    </AuthCard>
  );
}
