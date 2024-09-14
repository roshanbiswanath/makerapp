'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginModal() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendOtp = () => {
    setIsOtpSent(true);
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

  const handleContinue = () => {
    console.log('Verifying OTP:', otp.join(''));
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl w-full max-w-md relative'>
        <Link
          href='/'
          className='absolute right-4 top-4'
        >
          <X className='h-6 w-6 text-gray-500 hover:text-gray-700' />
        </Link>
        <div className='p-6'>
          <h2 className='text-2xl font-bold text-center mb-2'>Welcome back!</h2>
          <p className='text-center text-gray-600 mb-6'>Log In to Karkhana</p>

          {!isOtpSent ? (
            <>
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

              <div className='mb-4'>
                <Input
                  type='tel'
                  placeholder='Enter your Phone Number'
                  className='w-full rounded-xl p-6'
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>

              <p className='text-xs text-gray-500 text-center mb-6'>
                We'll call or text you to confirm your number. Standard message
                and data rates apply. Privacy Policy
              </p>

              <Button
                className='w-full rounded-xl p-6 bg-gray-200 text-gray-700 hover:bg-gray-300'
                onClick={handleSendOtp}
              >
                {phoneNumber ? 'Send OTP' : 'Continue'}
              </Button>
            </>
          ) : (
            <>
              <p className='text-center text-gray-600 mb-4'>
                Enter the code we've sent via SMS to
              </p>
              <p className='text-center font-semibold mb-6'>{phoneNumber}</p>
              <div className='flex justify-between mb-6'>
                {otp.map((digit, index) => (
                  <div
                    key={index}
                    className='border-b-2'
                  >
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type='text'
                      maxLength={1}
                      className='w-12 h-12 text-center text-2xl border-gray-300 rounded-xl border-none'
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <Button
                variant='link'
                className='w-full mb-6 text-gray-500 hover:text-gray-700'
                onClick={() => setIsOtpSent(false)}
              >
                Send code again
              </Button>
              <Button
                className='w-full mb-4 rounded-xl p-6'
                onClick={handleContinue}
              >
                Continue
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
        </div>
      </div>
    </div>
  );
}
