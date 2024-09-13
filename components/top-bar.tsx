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
    <header className='container mx-auto px-10 py-4 flex justify-between items-center'>
      <Link
        href='/'
        className='text-2xl font-bold'
      >
        <Image src={'/Karkhana-logo.png'} alt='Logo' width={200} height={200} />
      </Link>

      <div className='relative flex-grow max-w-2xl mx-4'>
        <div className='flex items-center bg-gray-100 rounded-xl p-1 px-2'>
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
          <div className='h-6 w-px bg-gray-300 mx-2' />
          <Button
            size='icon'
            variant='ghost'
          >
            <Search className='h-4 w-4' />
            <span className='sr-only'>Search</span>
          </Button>
          <input
            type='text'
            placeholder='Search Machines, MakerSpaces and MakerEvents'
            className='flex-grow bg-transparent border-none focus:ring-0 py-2 px-3'
          />
        </div>
      </div>

      <div className='flex items-center space-x-4'>
        <Button
          variant='outline'
          className='py-5 rounded-xl'
        >
          Submit a space
        </Button>
        <div className='flex items-center space-x-2 border-2 border-transparent hover:border-gray-300 rounded-xl px-3 py-1.5 transition-colors duration-200'>
          <span>Login | Sign Up</span>
        </div>
        <div className='border p-1 rounded-full'>
          <User className='h-6 w-6' />
        </div>
      </div>
    </header>
  );
}
