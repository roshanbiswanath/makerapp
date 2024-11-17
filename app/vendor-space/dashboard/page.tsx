'use client';

import * as React from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/footer';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  const sections = [
    { id: 1, title: 'Basic Details' },
    { id: 2, title: 'Rooms and Seats' },
    { id: 3, title: 'Lab Mentors' },
    { id: 4, title: 'Amenities' },
    { id: 5, title: 'How to reach your space' },
  ];

  const navItems = [
    'Dashboard',
    'Machines',
    'Events',
    'Memberships',
    'My Space',
    'Revenue',
    'Messages',
  ];

  const utilityItems = ['Help Desk', 'Settings', 'Log Out'];

  const activeIndex = navItems.indexOf('Dashboard');

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-10 p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Karkhana Logo"
            width={170}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <div className="flex items-center gap-x-4">
          <Bell className="h-4 w-4" />
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits" />
            <AvatarFallback>
              <Search className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex gap-x-8 items-start">
        <aside className="h-[80vh] bg-gray-300 w-1/6 ml-8 rounded-3xl mb-6 pt-4 pb-4 pl-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-x-4 pl-4 my-6">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="SQA FAB Lab" />
                <AvatarFallback>SQ</AvatarFallback>
              </Avatar>
              <h2 className="text-sm font-medium">SQA FAB Lab</h2>
            </div>
            <Separator />
          </div>

          <nav className="flex-1 space-y-0 py-4 relative">
            {navItems.map((item, index) => {
              const isActive = index === activeIndex;
              const isPrevious = index === activeIndex - 1;
              const isNext = index === activeIndex + 1;

              return (
                <div key={item} className="relative">
                  {isPrevious && (
                    <div className="absolute bottom-0 right-0 t-0 h-6 w-6 bg-white">
                      <div className="absolute bottom-0 right-0 h-6 w-6 bg-gray-300 rounded-br-3xl" />
                    </div>
                  )}
                  {isNext && (
                    <div className="absolute top-0 right-0 h-6 w-6 bg-white">
                      <div className="absolute top-0 right-0 h-6 w-6 bg-gray-300 rounded-tr-3xl" />
                    </div>
                  )}
                  <Link
                    href="#"
                    className={`block p-4 text-sm transition-colors relative ${
                      isActive
                        ? 'bg-white rounded-l-3xl'
                        : 'hover:bg-white/50 rounded-l-3xl'
                    }`}
                  >
                    {item}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div>
            <Separator />
            <div className="space-y-0 pt-4">
              {utilityItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block py-2 px-4 text-sm rounded-l-3xl hover:bg-white/50 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </aside>

        <section className="w-4/5 mr-10 mt-10">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex w-full max-w-md items-center rounded-xl border bg-white px-4">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                className="border-0 bg-transparent"
                placeholder="Search for more"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Mon 5 Aug, 4:11 PM</span>
              <Select defaultValue="monthly">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Status:</span>
                <Switch defaultChecked />
                <span className="text-sm text-green-600">Open</span>
              </div>
            </div>
          </header>

          <div className="space-y-4">
            {sections.map((section) => (
              <Collapsible key={section.id}>
                <CollapsibleTrigger className="flex w-full items-center justify-between border-t bg-white p-4 hover:bg-gray-50">
                  <span className="text-lg font-medium">
                    {section.id}. {section.title}
                  </span>
                  <ChevronDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4">
                  <p className="text-gray-600">Content for {section.title}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
          <Separator className="mt-4" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
