// app/auth/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSignupStore } from '@/lib/store';
import { signIn } from 'next-auth/react';
import AuthCard from '@/components/auth-card';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const router = useRouter();
  const { email, password, setEmail, setPassword } = useSignupStore();

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(input));
  };

  const validatePassword = (input: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsValidPassword(passwordRegex.test(input));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/signup/name');
    }, 1500);
  };

  return (
    <AuthCard
      title="Create a free account"
      description="Explore the world of Karkhana"
      footerContent={
        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline font-medium">
            Log In
          </Link>
        </p>
      }
      onClose={() => router.push('/')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            className="rounded-xl text-start p-6"
          />
          {isValidEmail && (
            <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          )}
        </div>
        <Input
          type="password"
          placeholder="Use a strong password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          className="rounded-xl text-start p-6"
        />
        <div className="flex w-full py-2 items-center justify-center">
          <Separator className="w-28 text-black" />
          <span className="bg-background text-xs px-6 text-muted-foreground">
            OR
          </span>
          <Separator className="w-28 text-black" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="w-full rounded-full px-6 py-4 text-xs"
            onClick={() =>
              signIn('google', { callbackUrl: '/auth/signup/name' })
            }
          >
            <Image
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full px-6 py-4 text-xs"
            onClick={() =>
              signIn('linkedin', { callbackUrl: '/auth/signup/name' })
            }
          >
            <Image
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with LinkedIn
          </Button>
        </div>
        <div className="pb-4 text-center text-xs text-muted-foreground">
          By signing up, I agree to the Karkhana{' '}
          <Link href="#" className="underline">
            Terms of service
          </Link>
        </div>
        <Button
          type="submit"
          className="px-10 rounded-full"
          disabled={isLoading || !isValidEmail || !isValidPassword}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Create Account
        </Button>
      </form>
    </AuthCard>
  );
}
