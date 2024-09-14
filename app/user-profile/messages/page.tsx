'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ArrowUpDown, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
};

type Thread = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  date: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'user',
    content:
      'Hi, My booking is for a 3-D Printer on 25th August? What all materials are available?',
    timestamp: '5:25 PM',
  },
  {
    id: 2,
    sender: 'user',
    content: 'How long will it take for 4x4x4 cm print?',
    timestamp: '5:25 PM',
  },
  {
    id: 3,
    sender: 'SOA Fab Lab',
    content:
      'Yes, your booking is confirmed. We have PLA 2 cm wire. It will approximately take 2 hrs to print the entire design.',
    timestamp: '5:30 PM',
  },
  {
    id: 4,
    sender: 'user',
    content: 'Okay, thank you for the information.',
    timestamp: '5:45 PM',
  },
];

const threads: Thread[] = [
  {
    id: 1,
    name: 'SOA Fab lab',
    avatar: '/soa-fab-lab-logo.svg',
    lastMessage: 'Okay, thank you for the information.',
    date: '25 Aug',
  },
  {
    id: 2,
    name: 'Karkhana Support',
    avatar: '/karkhana-logo.svg',
    lastMessage: 'Okay, thank you for the information.',
    date: '25 Aug',
  },
];

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: 'user',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className='flex h-full'>
      <div className='flex-grow flex flex-col'>
        <div className='flex items-center justify-between p-4 border-b'>
          <div className='flex items-center'>
            <Image
              src='/soa-fab-lab-logo.svg'
              alt='SOA Fab Lab'
              width={40}
              height={40}
              className='rounded-full mr-3'
            />
            <h2 className='text-xl font-semibold'>SOA Fab Lab</h2>
          </div>
          <div className='text-sm text-gray-500'>
            We analyze messages for safety, support, product enhancement or
            other purposes. Learn more
          </div>
        </div>
        <div className='flex-grow overflow-y-auto p-4 space-y-4'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                <p>{message.content}</p>
                <span className='text-xs text-gray-400 mt-1 block'>
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className='p-4 border-t'>
          <div className='flex items-center'>
            <Input
              type='text'
              placeholder='Type your message here'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className='flex-grow mr-2'
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className='px-4 py-2'
            >
              Send
            </Button>
            <Button
              variant='ghost'
              className='ml-2'
            >
              <Mic className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
      <div className='w-64 border-l'>
        <div className='p-4 border-b'>
          <Button
            variant='outline'
            className='w-full justify-between'
          >
            All Messages <ChevronDown className='h-4 w-4' />
          </Button>
        </div>
        <div className='p-2'>
          {threads.map((thread) => (
            <div
              key={thread.id}
              className='flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer'
            >
              <Image
                src={thread.avatar}
                alt={thread.name}
                width={40}
                height={40}
                className='rounded-full mr-3'
              />
              <div className='flex-grow'>
                <h3 className='font-semibold'>{thread.name}</h3>
                <p className='text-sm text-gray-500 truncate'>
                  {thread.lastMessage}
                </p>
              </div>
              <span className='text-xs text-gray-400'>{thread.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
