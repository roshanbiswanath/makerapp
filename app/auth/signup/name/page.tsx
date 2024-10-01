// app/auth/signup/name.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useSignupStore } from '@/lib/store';
import AuthCard from '@/components/auth-card';
import { updateSignupData } from '@/app/auth';

export default function NamePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { firstName, lastName, setFirstName, setLastName, userId } =
    useSignupStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await updateSignupData(userId, { firstName, lastName });
      console.log('Name updated:', { firstName, lastName });

      router.push('/auth/signup/mobile');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="What's your name?"
      description="Please enter your full name"
      onClose={() => router.push('/auth/signup')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="rounded-xl text-start p-6"
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="rounded-xl text-start p-6"
        />
        <Button
          type="submit"
          className="px-10 rounded-full"
          disabled={isLoading || !firstName || !lastName}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Continue
        </Button>
      </form>
    </AuthCard>
  );
}
