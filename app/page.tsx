'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCityStore } from '@/lib/store';
import TopBar from '@/components/top-bar';
import { cities } from '@/lib/constants';

export default function Home() {
  const { selectedCity, setSelectedCity } = useCityStore();
  return (
    <div className="min-h-screen min-w-screen bg-white mx-auto">
      <TopBar theme="light" />
      <div className="relative h-screen w-screen flex flex-col items-center justify-center text-center">
        <Image
          src="/makerapp/backgroundpage.png"
          alt="Background"
          fill
          className="z-0 object-cover opacity-50"
        />
        <div className="relative bg-white mt-10 z-10 rounded-xl shadow-lg px-6 py-10 w-full max-w-xl">
          <h2 className="text-3xl font-bold mb-10 ">Select your city</h2>
          <Button
            variant="ghost"
            className="absolute top-2 right-0 text-gray-500 hover:text-gray-700"
          >
            <Link href="/home">
              <X size={24} />
            </Link>
          </Button>
          <div className="grid grid-cols-3 gap-4 mb-12">
            {cities.map((city) => (
              <Button
                variant={selectedCity === city ? 'default' : 'outline'}
                key={city}
                className={`${
                  selectedCity === city ? 'text-white' : 'text-gray-300'
                } py-8 rounded-xl text-sm font-medium transition-colors hover:bg-black/80 hover:text-white`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </Button>
            ))}
          </div>
          <Link
            href="/home"
            className={
              selectedCity === 'Select Location'
                ? 'pointer-events-none bg-black text-white py-3 font-medium transition-colors px-16 rounded-full'
                : 'bg-emerald-500 text-black py-3 font-medium hover:bg-emerald-600 transition-colors px-16 rounded-full'
            }
          >
            Confirm
          </Link>
          <Button
            variant="link"
            className="w-full text-xs text-gray-500 mt-4 hover:text-gray-700 underline underline-offset-1"
            onClick={() => {
              setSelectedCity('Select Location');
              window.location.href = '/home';
            }}
          >
            SKIP
          </Button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white/40 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-gradient-to-l from-white/40 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/40 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/40 dark:from-background"></div>
    </div>
  );
}
