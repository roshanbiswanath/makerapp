'use client';

import { useState } from 'react';
import { PlusCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timePeriod, setTimePeriod] = useState('Monthly');
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className='h-full flex flex-col'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <div className='flex items-center space-x-2'>
          <span className='text-sm text-gray-600'>{formattedDate}</span>
          <Button
            variant='outline'
            size='sm'
          >
            {timePeriod} <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </div>
      <div className='flex-grow flex items-center justify-center bg-gray-100 rounded-lg'>
        <div className='text-center'>
          <PlusCircle className='mx-auto h-12 w-12 text-gray-400 mb-4' />
          <p className='text-gray-500'>Book a Machine now</p>
        </div>
      </div>
    </div>
  );
}
