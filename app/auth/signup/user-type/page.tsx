'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useSignupStore } from '@/lib/store';

const userTypes = [
  'Maker',
  'Business Owner',
  'Student',
  'Professional',
  'Hobbyist',
  'Other',
];

export default function UserTypePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { userType, setUserType } = useSignupStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/signup/industry');
    }, 1500);
  };

  return (
    <AuthCard
      title="What best describes you?"
      description="This helps us customize your experience"
      onClose={() => router.push('/auth/signup/mobile')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {userTypes.map((type) => (
            <Button
              key={type}
              type="button"
              variant={userType === type ? 'default' : 'outline'}
              className="rounded-full px-4 py-2 text-sm"
              onClick={() => setUserType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
        <Button
          type="submit"
          className="rounded-full px-10 py-4 mt-4"
          disabled={isLoading || !userType}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Continue
        </Button>
      </form>
    </AuthCard>
  );
}
