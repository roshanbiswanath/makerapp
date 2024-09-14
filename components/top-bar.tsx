'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function TopBar() {
  const [location, setLocation] = useState('Location');
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
    <header className='container mx-auto px-4 py-4 lg:px-10'>
      <div className='flex flex-wrap items-center justify-center'>
        <Link
          href='/'
          className='text-2xl font-bold mb-2 sm:mb-0'
        >
          <Image
            src={'/Karkhana-logo.png'}
            alt='Logo'
            width={150}
            height={150}
            className='w-28 sm:w-32 md:w-40'
          />
        </Link>

        <div className='relative flex-grow max-w-full md:max-w-2xl mx-0 md:mx-4 mb-4 md:mb-0'>
          <div className='flex items-center bg-gray-100 rounded-xl p-1 px-2 w-full'>
            <div
              className='relative px-3 py-2 cursor-pointer'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className='mr-1'>{location}</span>
              <ChevronDown className='inline-block w-4 h-4' />
              {isDropdownOpen && (
                <div className='absolute top-full left-0 mt-2 w-fit bg-white rounded-md shadow-lg z-10'>
                  {locations.map((loc) => (
                    <div
                      key={loc}
                      className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-xl'
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
            <div className='hidden md:block h-6 w-px bg-gray-300 mx-2' />
            <Button
              size='icon'
              variant='ghost'
              className='hidden md:block'
            >
              <Search className='h-4 w-4' />
              <span className='sr-only'>Search</span>
            </Button>
            <input
              type='text'
              placeholder='Search Machines, MakerSpaces and MakerEvents'
              className='flex-grow bg-transparent border-none focus:ring-0 py-2 px-3 text-sm md:text-base'
            />
          </div>
        </div>

        {/* Mobile menu - collapsible */}
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto order-4 lg:order-3`}
        >
          <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0'>
            <Button
              variant='outline'
              className='py-2 sm:py-3 rounded-xl text-sm sm:text-base w-full sm:w-auto'
            >
              Submit a space
            </Button>
            <Link href='/auth'>
              <Button
                variant='link'
                className='py-2 sm:py-3 rounded-xl text-sm sm:text-base w-full sm:w-auto'
              >
                Login | Sign Up
              </Button>
            </Link>
            <div className='border p-1 rounded-full hidden'>
              <User className='h-6 w-6' />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
