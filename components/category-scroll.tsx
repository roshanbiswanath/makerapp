'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  '3D Printer',
  'Laser Cutting',
  'Vinyl Cutter',
  'CNC Router',
  'Laser Engraver',
  'Wood CNC',
  '3D Scanner',
  'Lathe Machine',
  'PCB Machine',
  'Soldering Station',
  '3D Printer',
  'Laser Cutting',
  'Vinyl Cutter',
  'CNC Router',
  'Laser Engraver',
  'Wood CNC',
  '3D Scanner',
  'Lathe Machine',
  'PCB Machine',
  'Soldering Station',
];

export default function CategoryScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='relative max-w-full mb-8'>
      {showLeftButton && (
        <div className='absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10'>
          <Button
            variant='outline'
            size='icon'
            className='absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full'
            onClick={() => scroll('left')}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
        </div>
      )}
      <div
        ref={scrollRef}
        className='flex space-x-4 overflow-x-auto scrollbar-hide py-4'
        onScroll={checkScroll}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            variant='outline'
            className='whitespace-nowrap hover:bg-[#4CAF50] px-10'
          >
            {category}
          </Button>
        ))}
      </div>
      {showRightButton && (
        <div className='absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10'>
          <Button
            variant='outline'
            size='icon'
            className='absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full'
            onClick={() => scroll('right')}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  );
}
