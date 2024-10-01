'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useSignupStore } from '@/lib/store';
import { Separator } from '@/components/ui/separator';
import { updateSignupData } from '@/app/auth';

const userTypes = ['Student', 'Entrepreneur', 'Employee', 'Freelancer'];

export default function UserTypePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { userType, setUserType, userId } = useSignupStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await updateSignupData(userId, { userType });

      router.push('/auth/signup/industry');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthCard
      title="What best describes you?"
      description="This helps us customize your experience"
      onClose={() => router.push('/auth/signup/mobile')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-x-4 items-center justify-center">
          <div className="text-xs text-gray-900">STEP 1</div>
          <Separator className="w-12 bg-gradient-to-r from-black" />
          <div className="text-xs text-gray-400">STEP 2</div>
          <Separator className="w-12" />
          <div className="text-xs text-gray-400">STEP 3</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {userTypes.map((type) => (
            <Button
              key={type}
              type="button"
              variant={userType === type ? 'default' : 'outline'}
              className="rounded-xl py-10 text-md"
              onClick={() => setUserType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
        <Button
          type="submit"
          className="rounded-full px-10 py-4 mt-6"
          disabled={isLoading || !userType}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Continue
        </Button>
      </form>
    </AuthCard>
  );
}
