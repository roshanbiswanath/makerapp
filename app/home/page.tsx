'use client';

import Footer from '@/components/footer';
import TopBar from '@/components/top-bar';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import Makerspace from './makerspace';
import Machine from './machine';
import Event from './events';

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeSegment, setActiveSegment] = useState('makerspaces');

  return (
    <div className="relative">
      <div className="min-h-screen min-w-screen bg-white">
        <TopBar theme="dark" />

        <div className="relative h-[400px] sm:h-[500px] flex flex-col items-center justify-end text-center">
          <Image
            src="/placeholder-top.png"
            alt="Background"
            fill
            priority
            className="z-0"
          />
          <div className="relative z-10 max-w-3xl mb-8">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
              Find the Perfect Machine for Every Job, Every Time
            </h1>
            <p className="text-sm sm:text-base text-gray-200 mb-8  mx-auto max-w-sm">
              Book Your Machine Online - Ready for Your Next Big Project When
              You Arrive.
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="lg"
                  className="mt-14 bg-transparent border text-white hover:text-black hover:bg-white rounded-full"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>SELECT A DATE</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-xl border"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/40 dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/40 dark:from-background"></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 dark:from-background"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 dark:from-background"></div>
        </div>
        {activeSegment === 'makerspaces' && <Makerspace />}
        {activeSegment === 'machine' && <Machine />}
        {activeSegment === 'events' && <Event />}
        <Footer />
      </div>
      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-20 inline-flex rounded-full bg-gray-800 text-white p-1">
        <Button
          variant="ghost"
          className={`rounded-l-full p-6 text-sm font-medium transition-colors ${
            activeSegment === 'makerspaces'
              ? 'bg-gray-400 text-white shadow'
              : 'text-gray-500 hover:text-gray-500'
          }`}
          onClick={() => setActiveSegment('makerspaces')}
        >
          Find Makerspaces
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none p-6 text-sm font-medium transition-colors ${
            activeSegment === 'machines'
              ? 'bg-gray-400 text-white shadow'
              : 'text-gray-500 hover:text-gray-500'
          }`}
          onClick={() => setActiveSegment('machine')}
        >
          Book a Machine
        </Button>
        <Button
          variant="ghost"
          className={`rounded-r-full p-6 text-sm font-medium transition-colors ${
            activeSegment === 'events'
              ? 'bg-gray-400 text-white shadow'
              : 'text-gray-500 hover:text-gray-500'
          }`}
          onClick={() => setActiveSegment('events')}
        >
          Explore Events
        </Button>
      </div>
    </div>
  );
}
