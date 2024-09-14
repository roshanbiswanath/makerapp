'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Step =
  | 'initial'
  | 'email'
  | 'phone'
  | 'otp'
  | 'role'
  | 'industry'
  | 'loading'
  | 'complete';

export default function SignupFlow() {
  const [step, setStep] = useState<Step>('initial');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [role, setRole] = useState('');
  const [industry, setIndustry] = useState('');

  const handleContinue = () => {
    switch (step) {
      case 'initial':
        setStep('email');
        break;
      case 'email':
        setStep('phone');
        break;
      case 'phone':
        setStep('otp');
        break;
      case 'otp':
        setStep('role');
        break;
      case 'role':
        setStep('industry');
        break;
      case 'industry':
        setStep('loading');
        setTimeout(() => setStep('complete'), 2000); // Simulate loading
        break;
      default:
        break;
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

  const renderStep = () => {
    switch (step) {
      case 'initial':
        return (
          <>
            <h2 className='text-2xl font-bold text-center mb-2'>
              Create a free account
            </h2>
            <p className='text-center text-gray-600 mb-6'>
              Explore the world of Karkhana
            </p>
            <Button
              variant='outline'
              className='w-full mb-3 flex items-center justify-center rounded-xl p-6'
            >
              <Image
                src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg'
                alt='Google logo'
                width={20}
                height={20}
                className='mr-2'
              />
              Continue with Google
            </Button>

            <Button
              variant='outline'
              className='w-full mb-6 flex items-center justify-center rounded-xl p-6'
            >
              <Image
                src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg'
                alt='LinkedIn logo'
                width={20}
                height={20}
                className='mr-2'
              />
              Continue with LinkedIn
            </Button>
            <div className='flex items-center mb-6'>
              <div className='flex-grow border-t border-gray-300'></div>
              <span className='flex-shrink mx-4 text-gray-600'>OR</span>
              <div className='flex-grow border-t border-gray-300'></div>
            </div>
            <Input
              type='email'
              placeholder='Enter your Email Address'
              className='w-full mb-4 p-6 rounded-xl'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className='text-xs text-gray-500 text-center mb-6'>
              By signing up, I agree to the Karkhana Terms of service
            </p>
            <Button
              className='w-full mb-4 rounded-xl p-6'
              onClick={handleContinue}
            >
              Sign Up
            </Button>
            <p className='text-center text-sm'>
              Already have an account?{' '}
              <Link
                href='/auth/login'
                className='text-blue-500 hover:underline'
              >
                Log In
              </Link>
            </p>
          </>
        );
      case 'email':
        return (
          <>
            <h2 className='text-2xl font-bold text-center mb-2'>
              Create a free account
            </h2>
            <p className='text-center text-gray-600 mb-6'>
              Explore the world of Karkhana
            </p>
            <Input
              type='email'
              value={email}
              readOnly
              className='w-full mb-4 p-6 rounded-xl'
            />
            <Input
              type='text'
              placeholder='Enter full name'
              className='w-full mb-4 p-6 rounded-xl'
            />
            <Input
              type='password'
              placeholder='Use a strong password'
              className='w-full mb-4 p-6 rounded-xl'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='text-xs text-gray-500 text-center mb-6'>
              By signing up, I agree to the Karkhana Terms of service
            </p>
            <Button
              className='w-full mb-4 p-6 rounded-xl'
              onClick={handleContinue}
            >
              Continue
            </Button>
            <p className='text-center text-sm'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='text-blue-500 hover:underline'
              >
                Log In
              </Link>
            </p>
          </>
        );
      case 'phone':
      case 'otp':
        return (
          <>
            <h2 className='text-2xl font-bold text-center mb-2'>
              Create a free account
            </h2>
            <p className='text-center text-gray-600 mb-6'>
              Explore the world of Karkhana
            </p>
            <p className='text-center text-gray-600 mb-4'>
              Confirm Mobile Number
            </p>
            {step === 'phone' ? (
              <Input
                type='tel'
                placeholder='+91 Enter your Phone Number'
                className='w-full mb-6 p-6 rounded-xl'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              <>
                <p className='text-center font-semibold mb-6'>{phoneNumber}</p>
                <p className='text-center text-gray-600 mb-4'>
                  Enter the code we've sent via SMS to
                </p>
                <div className='flex justify-between mb-6'>
                  {otp.map((digit, index) => (
                    <div key={index} className='border-b-2'>
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type='text'
                        maxLength={1}
                        className='w-12 h-12 text-center text-2xl border-none outline-none'
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
            <Button
              className='w-full mb-4 p-6 rounded-xl'
              onClick={handleContinue}
            >
              Continue
            </Button>
            {step === 'otp' && (
              <>
                <Button
                  variant='link'
                  className='w-full mb-4'
                >
                  Send code again
                </Button>
                <div className='flex justify-between text-sm text-gray-500'>
                  <Button
                    variant='link'
                    className='p-0'
                  >
                    Send on Whatsapp
                  </Button>
                  <Button
                    variant='link'
                    className='p-0'
                  >
                    Request a call
                  </Button>
                </div>
              </>
            )}
          </>
        );
      case 'role':
        return (
          <>
            <h2 className='text-2xl font-bold text-center mb-2'>
              What describes you best?
            </h2>
            <div className='grid grid-cols-2 gap-4 my-8'>
              {['Student', 'Entrepreneur', 'Employee', 'Freelancer'].map(
                (r) => (
                  <Button
                    key={r}
                    variant={role === r ? 'default' : 'outline'}
                    className='w-full p-6 rounded-xl'
                    onClick={() => setRole(r)}
                  >
                    {r}
                  </Button>
                )
              )}
            </div>
            <Button
              className='w-full p-6 rounded-xl'
              onClick={handleContinue}
            >
              Continue
            </Button>
          </>
        );
      case 'industry':
        return (
          <>
            <h2 className='text-2xl font-bold text-center mb-2'>
              Which industry are you from?
            </h2>
            <div className='grid grid-cols-3 gap-4 my-8'>
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
              ].map((i) => (
                <Button
                  key={i}
                  variant={industry === i ? 'default' : 'outline'}
                  className='w-full p-6 rounded-xl'
                  onClick={() => setIndustry(i)}
                >
                  {i}
                </Button>
              ))}
            </div>
            <Button
              className='w-full mb-4 p-6 rounded-xl'
              onClick={handleContinue}
            >
              Continue
            </Button>
            <Button
              variant='link'
              className='w-full'
            >
              Skip
            </Button>
          </>
        );
      case 'loading':
        return (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='w-12 h-12 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin'></div>
            <p className='mt-4 text-gray-600'>
              Please wait, we're getting your account ready!
            </p>
          </div>
        );
      case 'complete':
        return (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4'>
              <Check className='w-6 h-6 text-green-600' />
            </div>
            <h2 className='text-2xl font-bold text-center mb-2'>
              Congratulations, your account setup is complete.
            </h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg w-full max-w-md relative'>
        <Link
          href='/'
          className='absolute right-4 top-4'
        >
          <X className='h-6 w-6 text-gray-500 hover:text-gray-700' />
        </Link>
        <div className='p-6'>{renderStep()}</div>
      </div>
    </div>
  );
}
