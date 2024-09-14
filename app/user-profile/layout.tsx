'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TopBar from '@/components/top-bar';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { name: 'Bookings', href: '/user-profile/bookings' },
  { name: 'Messages', href: '/user-profile/messages' },
  { name: 'Wishlist', href: '/user-profile/wishlist' },
  { name: 'Dashboard', href: '/user-profile/dashboard' },
  { name: 'My Profile', href: '/user-profile/my-profile' },
  { name: 'Help Desk', href: '/user-profile/help-desk' },
  { name: 'Settings', href: '/user-profile/settings' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className='min-h-screen bg-gray-100'>
      <TopBar />
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row gap-8'>
          <aside className='w-full md:w-64 bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center mb-6'>
              <div className='w-12 h-12 bg-gray-200 rounded-full mr-4'></div>
              <div>
                <h2 className='font-semibold'>Nigga</h2>
                <p className='text-sm text-gray-600'>4.2 ★</p>
              </div>
            </div>
            <nav>
              <ul>
                {sidebarItems.map((item) => (
                  <li
                    key={item.name}
                    className='mb-2'
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-2 px-4 rounded-md transition-colors',
                        pathname === item.href
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              className='w-full text-left py-2 px-4 rounded-md text-gray-600 hover:bg-gray-100 transition-colors mt-4'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Log Out
            </button>
          </aside>
          <main className='flex-1 bg-white rounded-lg shadow-md p-6'>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
