'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import { useSignupStore } from '@/lib/store';

export default function IndustryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { industry, setIndustry } = useSignupStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/signup/purpose');
    }, 1500);
  };

  return (
    <AuthCard
      title="What industry are you in?"
      description="This helps us tailor your experience"
      onClose={() => router.push('/auth/signup/user-type')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter your industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-xl text-start p-6"
        />
        <Button
          type="submit"
          className="rounded-full px-10 py-4"
          disabled={isLoading || !industry}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Continue
        </Button>
      </form>
    </AuthCard>
  );
}
