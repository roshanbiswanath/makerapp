import TopBar from '@/components/top-bar';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen min-w-screen bg-white mx-auto">
      <TopBar theme="light" isBg />
      <div className="relative h-screen w-screen flex flex-col items-center justify-center text-center">
        <Image
          src="/makerapp/assetlist.png"
          alt="Background"
          fill
          className="z-0 object-cover opacity-50"
        />
        {children}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/50 backdrop-blur-lg dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/50 backdrop-blur-lg dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 backdrop-blur-lg dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 backdrop-blur-lg dark:from-background"></div>
    </div>
  );
}
