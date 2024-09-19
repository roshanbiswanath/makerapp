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
import { X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen min-w-screen bg-white mx-auto'>
      <div className='relative h-screen w-screen flex flex-col items-center justify-center text-center'>
        <Image
          src='/makerapp/backgroundpage.png'
          alt='Background'
          fill
          className='z-0 object-cover opacity-50'
        />
        <Card className='relative w-full z-10 max-w-md mx-auto rounded-xl py-4'>
          <CardHeader className='space-y-1 text-center'>
            <div className='flex justify-center items-center'>
              <CardTitle className='text-2xl font-bold'>
                Create a free account
              </CardTitle>
            </div>
            <CardDescription>Explore the world of Karkhana</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className='space-y-6'
            >
              <Input
                type='email'
                placeholder='Enter your Email Address'
                required
                className='rounded-xl text-center p-6'
              />
              <Input
                type='password'
                placeholder='Use a strong password'
                required
                className='rounded-xl text-center p-6'
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
              <div className='flex items-center space-x-2 justify-center pb-4'>
                <label
                  htmlFor='terms'
                  className='text-xs text-gray-600 text-center'
                >
                  By signing up, I agree to the Karkhana{' '}
                  <span className='underline'>Terms of service</span>
                </label>
              </div>
              <Button
                type='submit'
                className='rounded-full px-10 py-4'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className='text-sm text-center w-full'>
              Already have an account?{' '}
              <a
                href='#'
                className='underline font-medium'
              >
                Log In
              </a>
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
