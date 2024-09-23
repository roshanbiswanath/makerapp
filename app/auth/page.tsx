import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="min-h-screen min-w-screen bg-white mx-auto">
      <div className="relative h-screen w-screen flex flex-col items-center justify-center text-center">
        <Image
          src="/makerapp/backgroundpage.png"
          alt="Background"
          fill
          className="z-0 object-cover opacity-50"
        />
        <div className="relative bg-white z-10 p-8 rounded-xl shadow-md w-full max-w-md">
          <Link
            href="/"
            className="mb-8 text-2xl font-bold flex items-center justify-center"
          >
            <Image
              src="/makerapp/Karkhana-logo.png"
              alt="Karkhana Logo"
              width={200}
              height={120}
            />
          </Link>
          <p className="text-center text-gray-600 text-sm">
            Welcome to Karkhana.
          </p>
          <p className="text-center text-gray-600 text-sm">
            Please log in to access your account.
          </p>
          <Link href="/auth/login" passHref>
            <Button className="my-8 rounded-full px-20">Log In</Button>
          </Link>
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-blue-500 underline">
              Sign up
            </Link>
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full absolute top-1 right-1"
          >
            <Link href="/home">
              <X className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/40 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/40 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 dark:from-background"></div>
    </div>
  );
}
