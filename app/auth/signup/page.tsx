'use client';

import { useState } from 'react';
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
import { X, Loader2, Check, MessageCircleMore } from 'lucide-react';
import { useRouter } from 'next/navigation';

type SignupStep =
  | 'initial'
  | 'email'
  | 'name'
  | 'mobile'
  | 'otp'
  | 'userType'
  | 'industry'
  | 'purpose'
  | 'onboarding';

export default function SignupFlow() {
  const [step, setStep] = useState<SignupStep>('initial');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    const newcode = [...code];
    newcode[index] = value;
    setCode(newcode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      switch (step) {
        case 'initial':
          setStep('email');
          break;
        case 'email':
          setStep('name');
          break;
        case 'name':
          setStep('mobile');
          break;
        case 'mobile':
          setStep('otp');
          break;
        case 'otp':
          setStep('userType');
          break;
        case 'userType':
          setStep('industry');
          break;
        case 'industry':
          setStep('purpose');
          break;
        case 'purpose':
          setStep('onboarding');
          console.log('Account created');
          break;
      }
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 'initial':
        return (
          <>
            <CardHeader className='mb-3 text-center'>
              <div className='flex justify-center items-center'>
                <CardTitle className='text-3xl font-bold'>
                  Create a free account
                </CardTitle>
              </div>
              <CardDescription>Explore the world of Karkhana</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <form
                onSubmit={handleSubmit}
                className='space-y-4'
              >
                <Input
                  type='email'
                  placeholder='Enter your Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='rounded-xl text-start p-6'
                />
                <Input
                  type='password'
                  placeholder='Use a strong password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='rounded-xl text-start p-6'
                />
                <div className='flex w-full py-2 items-center justify-center'>
                  <Separator className='w-28 text-black' />
                  <span className='bg-background text-xs px-6 text-muted-foreground'>
                    OR
                  </span>
                  <Separator className='w-28 text-black' />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <Button
                    variant='outline'
                    className='w-full rounded-full px-6 py-4 text-xs'
                  >
                    <Image
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg'
                      alt='Google logo'
                      width={20}
                      height={20}
                      className='mr-2'
                    />
                    Sign up with Google
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full rounded-full px-6 py-4 text-xs'
                  >
                    <Image
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg'
                      alt='LinkedIn logo'
                      width={20}
                      height={20}
                      className='mr-2'
                    />
                    Sign Up with LinkedIn
                  </Button>
                </div>
                <div className='pb-4 text-center text-xs text-muted-foreground'>
                  By signing up, I agree to the Karkhana{' '}
                  <Link
                    href='#'
                    className='underline'
                  >
                    Terms of service
                  </Link>
                </div>
                <Button
                  type='submit'
                  className='px-10 rounded-full'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : null}
                  Create Account
                </Button>
              </form>
            </CardContent>
          </>
        );
      case 'email':
        return (
          <>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl font-bold text-center'>
                Verify your email
              </CardTitle>
              <CardDescription className='text-center'>
                We&apos;ve sent a verification code to {email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-28 flex justify-center items-center'>
                {isLoading ? (
                  <Loader2 className=' h-20 w-20 animate-spin' />
                ) : null}
              </div>
              <form
                onSubmit={handleSubmit}
                className='space-y-4'
              >
                <div className='flex justify-between mb-6'>
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type='text'
                      maxLength={1}
                      className='w-12 h-12 text-center text-2xl border-s-0 border-e-0 border-t-0 rounded-none border-b-2 border-black ring-0 focus:border-b-3 text-green-400'
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                    />
                  ))}
                </div>
                <p className='text-sm text-center'>
                  Resend code in{' '}
                  <span className='font-medium text-green-400'>00:45 secs</span>
                </p>
                <Button
                  type='submit'
                  className='px-20 rounded-full'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : null}
                  Verify Email
                </Button>
              </form>
            </CardContent>
          </>
        );
      case 'name':
        return (
          <>
            <CardHeader className='mb-3 text-center'>
              <div className='flex justify-center items-center'>
                <CardTitle className='text-3xl font-bold'>
                  Create a free account
                </CardTitle>
              </div>
              <CardDescription>Explore the world of Karkhana</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type='email'
                placeholder='Enter your Email Address'
                value={email}
                className='rounded-xl text-start p-6'
                readOnly
              />
              <h2 className='text-xl my-4 font-bold text-center'>
                Tell us your full name
              </h2>
              <form onSubmit={handleSubmit}>
                <div className='space-y-4 mb-8'>
                  <Input
                    placeholder='Enter your first name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className='rounded-xl text-start p-6'
                  />
                  <Input
                    placeholder='Enter your last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className='rounded-xl text-start p-6'
                  />
                </div>
                <Button
                  type='submit'
                  className='px-20 rounded-full'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : null}
                  Continue
                </Button>
              </form>
            </CardContent>
          </>
        );
      case 'mobile':
        return (
          <>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl font-bold text-center'>
                Hi {firstName}
              </CardTitle>
              <CardDescription className='text-center'>
                Welcome to Karkhana, your seamless machine booking platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className='space-y-44'
              >
                <Input
                  type='tel'
                  placeholder='Enter your mobile number'
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className='rounded-xl text-start p-6'
                />
                <Button
                  type='submit'
                  className='px-20 rounded-full'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : null}
                  Continue
                </Button>
              </form>
            </CardContent>
          </>
        );
      case 'otp':
        return (
          <>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl font-bold text-center'>
                Enter OTP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type='tel'
                placeholder='Enter your mobile number'
                value={mobile}
                className='rounded-xl text-start p-6'
                readOnly
              />
              <CardDescription className='text-center pt-2 text-muted-foreground'>
                Code sent via SMS
              </CardDescription>
              <div className='h-28 flex justify-center items-center'>
                {isLoading ? (
                  <Loader2 className=' h-20 w-20 animate-spin' />
                ) : null}
              </div>
              <form
                onSubmit={handleSubmit}
                className='space-y-4'
              >
                <div className='flex justify-between mb-6'>
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type='text'
                      maxLength={1}
                      className='w-12 h-12 text-center text-2xl border-s-0 border-e-0 border-t-0 rounded-none border-b-2 border-black ring-0 focus:border-b-3 text-green-400'
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                </div>
                <p className='text-sm text-center'>
                  Resend OTP in{' '}
                  <span className='font-medium text-green-400'>00:45 secs</span>
                </p>
                <div className='pt-8'>
                  <Button
                    type='submit'
                    className='rounded-full px-20'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    ) : null}
                    {otp.every((digit) => digit === '')
                      ? 'Send OTP'
                      : 'Verify OTP'}
                  </Button>
                  <Button
                    variant='link'
                    className='w-full text-xs text-muted-foreground font-light flex gap-x-1 items-center justify-center'
                  >
                    <span>
                      <MessageCircleMore className='h-4 w-4' />
                    </span>{' '}
                    <span>Send on Whatsapp</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </>
        );
      case 'userType':
        return (
          <>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl font-bold text-center'>
                What describes you best?
              </CardTitle>
              <CardDescription className='text-center'>
                Hey {firstName}! You&apos;re just a few steps away from setting
                up your Karkhana account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-center gap-x-4 pb-8'>
                <p className='text-xs'>STEP 1</p>
                <Separator className='w-8' />
                <p className='text-muted-foreground text-xs'>STEP 2</p>
                <Separator className='w-8' />
                <p className='text-muted-foreground text-xs'>STEP 3</p>
              </div>
              <form
                onSubmit={handleSubmit}
                className='space-y-10'
              >
                <div className='grid grid-cols-2 gap-4'>
                  {['Student', 'Entrepreneur', 'Employee', 'Freelancer'].map(
                    (type) => (
                      <Button
                        key={type}
                        variant='outline'
                        className='rounded-xl h-20'
                        onClick={() => handleSubmit}
                      >
                        {type}
                      </Button>
                    )
                  )}
                </div>
                <Button
                  type='submit'
                  className='px-20 rounded-full'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : null}
                  Continue
                </Button>
              </form>
            </CardContent>
          </>
        );
      case 'industry':
        return (
          <>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl font-bold text-center'>
                Which industry are you from?
              </CardTitle>
              <CardDescription className='text-center'>
                Hey {firstName}! You&apos;re just a few steps away from setting up
                your Karkhana account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-center gap-x-4 pb-8'>
                <p className='text-xs'>STEP 1</p>
                <Separator className='w-8' />
                <p className='text-xs'>STEP 2</p>
                <Separator className='w-8' />
                <p className='text-muted-foreground text-xs'>STEP 3</p>
              </div>
              <form
                onSubmit={handleSubmit}
                className='space-y-10'
              >
                <div className='grid grid-cols-3 gap-4'>
                  {[
                    'Manufacturing',
                    'Agriculture',
                    'Energy',
                    'Healthcare',
                    'Education',
                    'Aerospace',
                    'Computer',
                    'Entertainment',
                    'Design',
                  ].map((industry) => (
                    <Button
                      key={industry}
                      variant='outline'
                      className='rounded-xl h-20'
                      onClick={() => handleSubmit}
                    >
                      {industry}
                    </Button>
                  ))}
                </div>
                <Button
                  type='submit'
                  className='px-20 rounded-full'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : null}
                  Continue
                </Button>
              </form>
            </CardContent>
          </>
        );
      case 'purpose':
        return (
          <>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl font-bold text-center'>
                What is your purpose for booking?
              </CardTitle>
              <CardDescription className='text-center'>
                Hey {firstName}! You&apos;re just a few steps away from setting up
                your Karkhana account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-center gap-x-4 pb-8'>
                <p className='text-xs'>STEP 1</p>
                <Separator className='w-8' />
                <p className='text-xs'>STEP 2</p>
                <Separator className='w-8' />
                <p className='text-xs'>STEP 3</p>
              </div>
              <form
                onSubmit={handleSubmit}
                className='space-y-10'
              >
                <div className='grid grid-cols-3 gap-4'>
                  {[
                    'Manufacturing',
                    'Agriculture',
                    'Energy',
                    'Healthcare',
                    'Education',
                    'Aerospace',
                    'Computer',
                    'Entertainment',
                    'Design',
                  ].map((purpose) => (
                    <Button
                      key={purpose}
                      variant='outline'
                      className='rounded-xl h-20'
                      onClick={() => handleSubmit}
                    >
                      {purpose}
                    </Button>
                  ))}
                </div>
                <Button
                  type='submit'
                  className='px-20 rounded-full bg-green-500'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : null}
                  Create Account
                </Button>
              </form>
            </CardContent>
          </>
        );
      default:
            return (
              <Button
                type='submit'
                className='px-20 rounded-full my-10'
                    disabled={isLoading}
                    onClick={() => router.push('/home')}
              >
                {isLoading ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : null}
                Home
              </Button>
            );
    }
  };

  return (
    <div className='min-h-screen min-w-screen bg-white mx-auto'>
      <div className='relative h-screen w-screen flex flex-col items-center justify-center text-center'>
        <Image
          src='/makerapp/backgroundpage.png'
          alt='Background'
          fill
          className='z-0 object-cover opacity-50'
        />{' '}
        <Card className='relative w-full z-10 max-w-lg mx-auto rounded-xl py-4'>
          {renderStep()}
          <CardFooter className='flex justify-center'>
            <p className='text-sm text-center'>
              {!step.includes('userType') &&
              !step.includes('industry') &&
              !step.includes('purpose') ? (
                <>
                  Don&apos;t have an account?{' '}
                  <Link
                    href='/login'
                    className='underline font-medium'
                  >
                    Log In
                  </Link>
                </>
              ) : null}
            </p>
          </CardFooter>
          <Button
            variant='ghost'
            size='icon'
            className='absolute top-2 right-2'
            onClick={() => router.push('/home')}
          >
            <X className='h-4 w-4' />
          </Button>
        </Card>
      </div>
    </div>
  );
}
