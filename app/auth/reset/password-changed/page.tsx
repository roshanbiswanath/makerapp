'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import AuthCard from '@/components/auth-card';
import Link from 'next/link';

export default function PasswordChangedPage() {
  const router = useRouter();

  return (
    <AuthCard
      title="Password Changed"
      description="Your password has been successfully reset."
      footerContent={
        <Link href="/auth/login" className="underline font-medium">
          Back to Login
        </Link>
      }
      onClose={() => router.push('/')}
    >
      <div className="flex flex-col items-center">
        <div className="w-44 h-44 rounded-full border-dashed border-2 border-black flex items-center justify-center my-14">
          <Check className="w-24 h-24 text-green-300" />
        </div>
        <Button
          onClick={() => router.push('/auth/login')}
          className="rounded-full px-14 py-4"
        >
          Continue
        </Button>
      </div>
    </AuthCard>
  );
}
