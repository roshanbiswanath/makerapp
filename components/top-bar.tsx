'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function TopBar() {
  const [location, setLocation] = useState('Select Location');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const locations = [
    'Delhi',
    'Mumbai',
    'Kolkata',
    'Bengaluru',
    'Chennai',
    'Hyderabad',
    'Ahmedabad',
    'Pune',
    'Surat',
    'Jaipur',
  ];

  return (
    <header className='absolute z-10 top-0 left-0 text-white w-full mx-auto px-4 py-4 lg:px-8'>
      <div className='flex flex-wrap items-center justify-between'>
        <Link
          href='/'
          className='text-2xl font-bold'
        >
          <Image
            src='/logo.svg'
            alt='Karkhana Logo'
            width={120}
            height={40}
          />
        </Link>

        <div className='flex-grow max-w-3xl mx-4 hidden md:block'>
          <div className='flex items-center bg-gray-100 rounded-lg'>
            <div
              className='relative p-4 cursor-pointer flex items-center text-black rounded-xl'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <MapPin className='w-4 h-4 mr-2' />
              <span className='mr-1'>{location}</span>
              <ChevronDown className='w-4 h-4' />
              {isDropdownOpen && (
                <div className='absolute top-full left-0 mt-2 w-48 bg-gray-100 rounded-xl shadow-lg z-10 overflow-hidden'>
                  {locations.map((loc) => (
                    <div
                      key={loc}
                      className='px-4 py-2 hover:bg-gray-300 cursor-pointer'
                      onClick={() => {
                        setLocation(loc);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='h-6 w-px bg-gray-300 mx-2' />
            <Button
              size='icon'
              variant='ghost'
            >
              <Search className='h-4 w-4 text-black' />
              <span className='sr-only'>Search</span>
            </Button>
            <input
              type='text'
              placeholder='HDF board cutting machine'
              className='flex-grow bg-transparent border-none focus:ring-0 py-2 px-4'
            />
          </div>
        </div>

        <div className='flex items-center space-x-4'>
          <Button
            size='icon'
            variant='ghost'
            className='hidden md:inline-flex px-6 underline'
          >
            EN
          </Button>
          <Button
            variant='outline'
            className='hidden md:inline-flex p-6 bg-white text-black rounded-xl font-semibold'
          >
            List your Machines
          </Button>
          <Button variant='link' className='text-white underline text-md'>Login | Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
