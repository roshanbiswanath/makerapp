'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useSignupStore } from '@/lib/store';
import { Separator } from '@/components/ui/separator';
import { updateSignupData } from '@/app/auth';

const purposes = [
  'Learning',
  'Professional',
  'Personal',
  'Business',
  'Research',
  'Other',
];

export default function PurposePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { purpose, setPurpose, userId } = useSignupStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await updateSignupData(userId, { purpose });

      router.push('/home/onboarding');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="What's your primary purpose?"
      description="This helps us recommend relevant resources"
      onClose={() => router.push('/auth/signup/industry')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-x-4 items-center justify-center">
          <div className="text-xs text-gray-900">STEP 1</div>
          <Separator className="w-12 bg-black" />
          <div className="text-xs text-gray-900">STEP 2</div>
          <Separator className="w-12 bg-black" />
          <div className="text-xs text-gray-900">STEP 3</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {purposes.map((purps) => (
            <Button
              key={purps}
              type="button"
              variant={purpose === purps ? 'default' : 'outline'}
              className="rounded-xl py-10 text-sm"
              onClick={() => setPurpose(purps)}
            >
              {purps}
            </Button>
          ))}
        </div>
        <Button
          type="submit"
          className="rounded-full px-10 py-4 mt-4"
          disabled={isLoading || !purpose}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Continue
        </Button>
      </form>
    </AuthCard>
  );
}
