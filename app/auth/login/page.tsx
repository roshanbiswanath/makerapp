'use client';

import { useState } from 'react';
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
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LogIn() {
  const [loginIdentifier, setLoginIdentifier] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Login with:', loginIdentifier);
  };

  return (
    <div className='min-h-screen min-w-screen bg-white mx-auto'>
      <div className='relative h-screen w-screen flex flex-col items-center justify-center text-center'>
        <Image
          src='/backgroundpage.png'
          alt='Background'
          fill
          className='z-0 object-cover opacity-50'
        />

        <Card className='relative w-full max-w-md z-10 mx-auto rounded-xl p-6'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-2xl font-bold'>
              Login to Karkhana Hub
            </CardTitle>
            <CardDescription className='text-xs'>
              Empowering you to design, learn,
              <br />
              and make an impact.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 mt-6'>
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
            <div className='flex w-full py-2 pb-8 items-center justify-center'>
              <Separator className='w-20 text-black' />
              <span className='bg-background text-xs px-6 text-muted-foreground'>
                or Sign in with
              </span>
              <Separator className='w-20 text-black' />
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
              <Input
                type='text'
                placeholder='Enter your mobile number or Email ID'
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                className='rounded-xl mb-4 p-6'
              />
              <p className='text-[0.5rem] w-56 text-muted-foreground text-center mb-4'>
                We&apos;ll text you to confirm your number. Standard message and
                data rates apply. Privacy Policy and T&C.
              </p>
              <Button
                type='submit'
                className='rounded-full px-10 py-4'
              >
                Continue
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className='text-sm text-center w-full'>
              Don&apos;t have an account?{' '}
              <Link
                href='/signup'
                className='underline font-medium'
              >
                SignUp
              </Link>
            </p>
          </CardFooter>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full absolute top-1 right-1'
          >
            <Link href='/home'>
              <X className='h-4 w-4' />
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
