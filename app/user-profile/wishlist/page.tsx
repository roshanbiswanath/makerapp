'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bookmark, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Machine = {
  id: number;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
};

const machines: Machine[] = [
  {
    id: 1,
    name: 'Creality 333XP',
    location: 'SOA Fab Lab, Bhubaneshwar',
    rating: 2.5,
    imageUrl: '/placeholder.svg',
  },
  {
    id: 2,
    name: 'Lathe Machine 333XP',
    location: 'SOA Fab Lab, Bhubaneshwar',
    rating: 2.5,
    imageUrl: '/placeholder.svg',
  },
];

export default function Wishlist() {
  const [activeTab, setActiveTab] = useState('Machines');
  const [timePeriod, setTimePeriod] = useState('Monthly');

  const tabs = ['Machines', 'Events', 'Memberships'];

  return (
    <div className='h-full flex flex-col'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex space-x-4'>
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
        <div className='flex items-center space-x-2'>
          <span className='text-sm text-gray-600'>
            {new Date().toLocaleString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </span>
          <Button
            variant='outline'
            size='sm'
          >
            {timePeriod} <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {machines.map((machine) => (
          <div
            key={machine.id}
            className='bg-white rounded-lg shadow-md overflow-hidden'
          >
            <div className='relative h-48'>
              <Image
                src={machine.imageUrl}
                alt={machine.name}
                layout='fill'
                objectFit='cover'
              />
              <Button
                variant='ghost'
                size='sm'
                className='absolute top-2 right-2 bg-white rounded-full p-1'
              >
                <Bookmark className='h-5 w-5' />
              </Button>
            </div>
            <div className='p-4'>
              <h3 className='font-semibold text-lg mb-1'>{machine.name}</h3>
              <p className='text-sm text-gray-600 mb-2'>{machine.location}</p>
              <div className='flex items-center'>
                <Star className='h-4 w-4 text-yellow-400 mr-1' />
                <span>{machine.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
