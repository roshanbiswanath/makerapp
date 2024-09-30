'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useSignupStore } from '@/lib/store';

const purposes = [
  'Learning and Skill Development',
  'Professional Projects',
  'Personal Projects',
  'Business Ventures',
  'Research and Development',
  'Other',
];

export default function PurposePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { purpose, setPurpose } = useSignupStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/home'); // Assuming this is the final step
    }, 1500);
  };

  return (
    <AuthCard
      title="What's your primary purpose?"
      description="This helps us recommend relevant resources"
      onClose={() => router.push('/auth/signup/industry')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {purposes.map((p) => (
            <Button
              key={p}
              type="button"
              variant={purpose === p ? 'default' : 'outline'}
              className="rounded-full px-4 py-2 text-sm"
              onClick={() => setPurpose(p)}
            >
              {p}
            </Button>
          ))}
        </div>
        <Button
          type="submit"
          className="rounded-full px-10 py-4 mt-4"
          disabled={isLoading || !purpose}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Finish
        </Button>
      </form>
    </AuthCard>
  );
}
