'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import AuthCard from '@/components/auth-card';

export default function PasswordChangedPage() {
  const router = useRouter();

  return (
    <AuthCard
      title="Password Changed"
      description="Your password has been successfully reset."
      onClose={() => router.push('/')}
    >
      <div className="flex flex-col items-center">
        <div className="w-44 h-44 rounded-full border-dashed border-2 border-black flex items-center justify-center my-14">
          <Check className="w-24 h-24 text-green-300" />
        </div>
        <Button
          onClick={() => router.push('/auth/login')}
          className="rounded-full px-10 py-4"
        >
          Continue to Login
        </Button>
      </div>
    </AuthCard>
  );
}
