'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Clock, Link } from 'lucide-react';
import Image from 'next/image';
import TopBar from '@/components/top-bar';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const dates = Array.from({ length: 35 }, (_, i) => i + 1);

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 py-20">
      <TopBar />
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Image
                src="/placeholder.svg?height=50&width=200&text=ALMA+CONNECT"
                alt="Alma Connect Logo"
                className="bg-teal-500 p-2 mb-4 rounded"
                height={40}
                width={120}
              />
              <h2 className="text-sm text-gray-500 mb-1">Dhruv Sogani</h2>
              <h1 className="text-2xl font-bold mb-2">
                AlmaConnect: Alumni Platform Demo
              </h1>
              <div className="flex items-center text-gray-500 mb-4">
                <Clock className="w-4 h-4 mr-2" />
                <span>40 min</span>
              </div>
              <div className="flex items-start text-gray-500">
                <Link className="w-4 h-4 mr-2 mt-1" />
                <p>Web conferencing details provided upon confirmation.</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Select a Date & Time
              </h2>
              <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="font-medium">August 2024</span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {days.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
                {dates.map((date) => (
                  <Button
                    key={date}
                    variant={date === 15 ? 'default' : 'ghost'}
                    className={`p-2 ${date > 31 ? 'invisible' : ''}`}
                  >
                    {date}
                  </Button>
                ))}
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Time zone</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">
                      India Standard Time (3:41pm)
                    </SelectItem>
                    {/* Add more time zones as needed */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-2">
          <Button variant="link" className="text-blue-600">
            Cookie settings
          </Button>
          <Button variant="link" className="text-gray-600">
            Report abuse
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
