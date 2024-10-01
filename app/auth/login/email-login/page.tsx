'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useAuthStore } from '@/lib/store';
import { signIn } from 'next-auth/react';

export default function EmailLoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginIdentifier } = useAuthStore();
  const router = useRouter();

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
      title="Login to Karkhana Hub"
      description="Empowering you to design, learn, and make an impact."
      onClose={() => router.push('/')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 text-start">
          <label htmlFor="email" className="text-sm pl-3 font-semibold">
            Email
          </label>
          <div className="relative w-full">
            <Input
              type="email"
              value={loginIdentifier}
              className="rounded-xl mb-4 p-6 ring-1 ring-black focus:ring-0"
              readOnly
            />
            <Check className="absolute right-5 top-6 transform -translate-y-1/2 text-green-500" />
          </div>
        </div>
        <div className="space-y-2 text-start">
          <label htmlFor="password" className="text-sm pl-3 font-semibold">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl p-6"
          />
        </div>
        <div className="space-y-2 text-start">
          <Button
            variant="link"
            className="text-xs pl-3 -mt-3 text-muted-foreground"
            onClick={() => router.push('/auth/login/forgot-password')}
          >
            Forgot Password ?
          </Button>
        </div>
        <Button
          type="submit"
          className="rounded-full px-10 py-4"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Login
        </Button>
      </form>
    </AuthCard>
  );
}
