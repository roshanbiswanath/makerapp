'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { X, Check, Loader2, MessageCircleMore } from 'lucide-react';
import { useRouter } from 'next/navigation';

type LoginStep =
  | 'initial'
  | 'email'
  | 'phone'
  | 'otp'
  | 'forgotPassword'
  | 'newPassword'
  | 'passwordChanged';

export default function LoginFlow() {
  const [step, setStep] = useState<LoginStep>('initial');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(45);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (step === 'initial') {
        if (isValidPhone) {
          setStep('otp');
          setOtpTimer(45);
        } else if (isValidEmail) {
          setStep('email');
        }
      } else if (step === 'otp') {
        setStep('initial');
      } else if (step === 'forgotPassword') {
        setStep('newPassword');
      } else if (step === 'newPassword') {
        setStep('passwordChanged');
      }
    }, 1500);
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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(re.test(email));
  };

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/;
    setIsValidPhone(re.test(phone));
  };

  const validatePassword = (password: string) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleIdentifierChange = (value: string) => {
    setLoginIdentifier(value);
    if (isNaN(Number(value))) {
      validateEmail(value);
      setIsValidPhone(false);
    } else {
      validatePhone(value);
      setIsValidEmail(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'initial':
        return (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                Login to Karkhana Hub
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Empowering you to design, learn,
                <br />
                and make an impact.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 py-4 text-xs"
                >
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                    alt="Google logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Sign In with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 py-4 text-xs"
                >
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg"
                    alt="LinkedIn logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Sign In with LinkedIn
                </Button>
              </div>
              <div className="flex w-full py-2 pb-8 items-center justify-center">
                <Separator className="w-20 text-black" />
                <span className="bg-background text-xs px-6 text-muted-foreground">
                  or Sign in with
                </span>
                <Separator className="w-20 text-black" />
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <div className="relative w-full">
                  <Input
                    type="text"
                    placeholder="Enter your mobile number or Email ID"
                    value={loginIdentifier}
                    onChange={(e) => handleIdentifierChange(e.target.value)}
                    className="rounded-xl mb-4 p-6"
                  />
                  {(isValidEmail || isValidPhone) && (
                    <Check className="absolute right-3 top-6 transform -translate-y-1/2 text-green-500" />
                  )}
                </div>
                <p className="text-[0.5rem] w-56 text-muted-foreground text-center mb-4">
                  We&apos;ll text you to confirm your number. Standard message
                  and data rates apply. Privacy Policy and T&C.
                </p>
                <Button
                  type="submit"
                  className="rounded-full px-10 py-4"
                  disabled={isLoading || (!isValidEmail && !isValidPhone)}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isValidPhone ? 'Send OTP' : 'Continue'}
                </Button>
                {isValidPhone && (
                  <Button
                    variant="link"
                    className="text-xs text-muted-foreground font-light flex gap-x-1 items-center justify-center"
                  >
                    <span>
                      <MessageCircleMore className="h-4 w-4" />
                    </span>{' '}
                    <span>Send on Whatsapp</span>
                  </Button>
                )}
              </form>
            </CardContent>
          </>
        );
      case 'email':
        return (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                Login to Karkhana Hub
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Empowering you to design, learn,
                <br />
                and make an impact.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 text-start">
                  <label htmlFor="email" className="text-sm pl-3 font-semibold">
                    Email
                  </label>
                  <div className="relative w-full">
                    <Input
                      type="text"
                      value={loginIdentifier}
                      className="rounded-xl mb-4 p-6 ring-1 ring-black
                      focus:ring-0"
                      readOnly
                    />
                    <Check className="absolute right-5 top-6 transform -translate-y-1/2 text-green-500" />
                  </div>
                </div>
                <div className="space-y-2 text-start">
                  <label
                    htmlFor="password"
                    className="text-sm pl-3 font-semibold"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    className="rounded-xl p-6"
                  />
                </div>
                <div className="space-y-2 text-start">
                  <Button
                    variant="link"
                    className="text-xs pl-3 -mt-3 text-muted-foreground"
                    onClick={() => setStep('forgotPassword')}
                  >
                    Forgot Password ?
                  </Button>
                </div>
                <Button
                  type="submit"
                  className="rounded-full px-10 py-4"
                  disabled={
                    isLoading || !Object.values(passwordStrength).every(Boolean)
                  }
                  onClick={() => router.push('/home')}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Login
                </Button>
              </form>
            </CardContent>
          </>
        );
      case 'otp':
        return (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Enter OTP</CardTitle>
              <CardDescription>
                Enter the code we&apos;ve sent via SMS to
                <br />
                +91 {loginIdentifier}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-20 flex justify-center items-center">
                {isLoading ? (
                  <Loader2 className="h-16 w-16 animate-spin" />
                ) : null}
              </div>
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

                <div className="pt-8">
                  <Button
                    type="submit"
                    className="rounded-full px-10 py-4"
                    disabled={isLoading}
                    onClick={() => router.push('/home')}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {otp.every((digit) => digit === '')
                      ? 'Continue'
                      : 'Verify OTP'}
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
                    <span>
                      {otpTimer > 0 ? 'Resend OTP' : 'Send on Whatsapp'}
                    </span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </>
        );
      case 'forgotPassword':
        return (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                Forgot Password?
              </CardTitle>
              <CardDescription>
                No worries, we&apos;ve sent you a reset email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4 mb-24 mt-6">
                  <div className="space-y-2 text-start">
                    <label
                      htmlFor="email"
                      className="text-sm pl-3 font-semibold"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="rounded-xl p-6"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Didn&apos;t receive a code yet? <br />
                    <Button
                      variant="link"
                      className="font-semibold underline p-0 -m-10"
                      onClick={() => setIsLoading(true)}
                    >
                      Click to Resend
                    </Button>
                  </p>
                </div>
                <Button
                  type="submit"
                  className="rounded-full px-10 py-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Open Email
                </Button>
              </form>
            </CardContent>
          </>
        );
      case 'newPassword':
        return (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                Set a New Password
              </CardTitle>
              <CardDescription className="text-xs px-10">
                Your new password should be different from previously used
                passwords.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4 my-6">
                  <div className="text-start">
                    <label
                      htmlFor="newPassword"
                      className="text-sm font-semibold pl-3"
                    >
                      New Password
                    </label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      placeholder="Enter your new password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="rounded-xl p-6"
                    />
                    <p className="text-xs text-muted-foreground pl-3 mt-1">
                      Must be at least 8 characters
                    </p>
                  </div>
                  <div className="text-start">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-semibold pl-3"
                    >
                      Confirm Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      placeholder="Re-enter your new password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-xl p-6"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="rounded-full px-10 py-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Reset Password{' '}
                </Button>
              </form>
            </CardContent>
          </>
        );
      case 'passwordChanged':
        return (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                Password Changed
              </CardTitle>
              <CardDescription>
                Your password has been successfully reset.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-44 h-44 rounded-full border-dashed border-2 border-black flex items-center justify-center my-14">
                <Check className="w-24 h-24 text-green-300" />
              </div>
              <Button
                onClick={() => setStep('initial')}
                className="rounded-full px-10 py-4"
              >
                Continue
              </Button>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-white mx-auto">
      <div className="relative h-screen w-screen flex flex-col items-center justify-center text-center">
        <Image
          src="/makerapp/backgroundpage.png"
          alt="Background"
          fill
          className="z-0 object-cover opacity-50"
        />
        <Card className="relative w-full max-w-md z-10 mx-auto rounded-xl p-6 mt-8">
          {renderStep()}
          <CardFooter className="flex justify-center">
            <p className="text-sm text-center">
              {!step.includes('forgotPassword') &&
              !step.includes('newPassword') &&
              !step.includes('passwordChanged') ? (
                <>
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" className="underline font-medium">
                    SignUp
                  </Link>
                </>
              ) : (
                <Link href="/auth/login" className="underline font-semibold">
                  Back to Login
                </Link>
              )}
            </p>
          </CardFooter>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => router.push('/')}
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
