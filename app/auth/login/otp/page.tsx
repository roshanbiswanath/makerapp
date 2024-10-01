'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useAuthStore } from '@/lib/store';
import { signIn } from 'next-auth/react';
import { sendOTP, verifyOTP } from '@/lib/otp';

export default function OtpPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(45);
  const router = useRouter();
  const { loginIdentifier } = useAuthStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0 && !otpVerified) {
      interval = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer, otpVerified]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && !isNaN(Number(value))) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== '' && index < 5) {
        (
          document.getElementsByName(`otp-${index + 1}`)[0] as HTMLInputElement
        ).focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    const otpString = otp.join('');
    try {
      const isValid = await verifyOTP(loginIdentifier, otpString);
      if (isValid) {
        setOtpVerified(true);
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await sendOTP(loginIdentifier);
      setOtpTimer(45);
    } catch (error) {
      console.error('OTP resend error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        identifier: loginIdentifier,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      console.log('Login success:', result);

      router.push('/home');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Enter OTP"
      description={`Enter the code we've sent via SMS to ${loginIdentifier}`}
      onClose={() => router.push('/auth/login')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              name={`otp-${index}`}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-12 h-12 text-center text-2xl rounded-xl"
              maxLength={1}
              disabled={otpVerified}
            />
          ))}
        </div>
        {!otpVerified && (
          <>
            <Button
              type="button"
              onClick={handleVerifyOtp}
              className="rounded-full px-10 py-4 w-full"
              disabled={isLoading || otp.some((digit) => digit === '')}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Verify OTP
            </Button>
            <p className="text-sm text-center">
              Resend OTP in{' '}
              <span className="font-medium">
                {String(Math.floor(otpTimer / 60)).padStart(2, '0')}:
                {String(otpTimer % 60).padStart(2, '0')}
              </span>
            </p>
            {otpTimer === 0 && (
              <Button
                type="button"
                variant="link"
                onClick={handleResendOtp}
                className="w-full"
                disabled={isLoading}
              >
                Resend OTP
              </Button>
            )}
          </>
        )}
        {otpVerified && (
          <>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl p-6"
            />
            <Button
              type="submit"
              className="rounded-full px-10 py-4 w-full"
              disabled={isLoading || !password}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Login
            </Button>
          </>
        )}
      </form>
    </AuthCard>
  );
}
