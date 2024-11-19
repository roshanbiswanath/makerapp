'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  X,
  Check,
  Loader2,
  Clock,
  MessageCircle,
  MapPin,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import TopBar from '@/components/top-bar';
import Footer from '@/components/footer';

type BookingState =
  | 'initial'
  | 'details'
  | 'loading'
  | 'failed'
  | 'success'
  | 'confirmed';

export default function BookingFlow() {
  const [bookingState, setBookingState] =
    React.useState<BookingState>('initial');
  const [selectedDate] = React.useState('3 June 2024');
  const [selectedTime] = React.useState('10:00 a.m. to 12:00 p.m.');
  const [quantity, setQuantity] = React.useState(1);

  const handleProceedToPayment = () => {
    setBookingState('loading');
    // Simulate payment processing
    setTimeout(() => {
      // Randomly succeed or fail for demo
      if (Math.random() > 0.5) {
        setBookingState('success');
      } else {
        setBookingState('failed');
      }
    }, 2000);
  };

  const renderPaymentStatus = () => {
    switch (bookingState) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="mb-4">
              <Loader2 className="h-16 w-16 animate-spin text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">
              Please wait, while we process
            </h2>
            <p className="text-gray-500">your payment</p>
          </div>
        );
      case 'failed':
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="mb-4 rounded-full border-2 border-red-500 p-3">
              <X className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-xl font-medium mb-4">Payment Failed. Retry.</h2>
            <Button onClick={() => setBookingState('initial')}>
              Retry payment
            </Button>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="mb-4 rounded-full border-2 border-green-500 p-3">
              <Check className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-xl font-medium mb-2">
              Congratulations, your payment
            </h2>
            <p className="text-gray-500 mb-4">is completed.</p>
            <Button onClick={() => setBookingState('confirmed')}>
              View Booking
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderBookingConfirmation = () => {
    return (
      <div className="py-6 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Booking Confirmed!</h1>
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-2 border-black border-r-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              4
            </span>
          </div>
        </div>

        <Card className="p-6 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">MACHINE BOOKED</h3>
              <h2 className="text-xl font-medium mb-2">
                3d Printer Creality 333XP
              </h2>
              <p className="text-sm text-gray-600">
                Max Build Vol: 200 X 200 X 200 cm
                <br />
                Material: FDA, ABS, Resin
                <br />
                Nozzle Size: .25mm
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Image
                  src="/placeholder.svg"
                  alt="Lab Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-lg font-medium text-center mb-2">
                SOA FAB Lab
              </h3>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  10 - 6 PM
                </span>
                <Button variant="link" className="text-sm h-auto p-0">
                  Visit Website
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">BOOKING DATE</p>
                <p>{selectedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">BOOKING TIME</p>
                <p>{selectedTime}</p>
              </div>
            </div>

            <div className="mt-4">
              <Image
                src="/placeholder.svg"
                alt="QR Code"
                width={120}
                height={120}
                className="mx-auto"
              />
              <p className="text-sm text-center text-gray-600 mt-2">
                Show this QR code when entering the premises of the lab
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderInitialForm = () => {
    return (
      <div className="py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Confirm and Pay</h1>
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-2 border-black border-r-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              1
            </span>
          </div>
        </div>

        <hr className="mb-2 w-3/5" />
        <div className="flex items-center justify-between gap-x-8">
          <div className="w-2/3">
            <div className="flex gap-4 mb-6">
              <div className="h-20 w-20 bg-gray-100 rounded-lg" />
              <div>
                <h3 className="font-medium">3d Printer Creality 333XP</h3>
                <p className="text-sm text-gray-600">
                  Max Build Vol: 200 X 200 X 200 cm
                  <br />
                  Material: FDA, ABS, Resin
                  <br />
                  Nozzle Size: .25mm
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Button
                variant={quantity === 1 ? 'default' : 'outline'}
                className="h-6 w-6 rounded flex items-center justify-center"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                variant={quantity > 1 ? 'default' : 'outline'}
                className="h-6 w-6 rounded flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
              <span className="ml-auto">₹ 500/hr</span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label>SELECTED DATE</Label>
                <p>{selectedDate}</p>
              </div>
              <div>
                <Label>SELECTED TIME</Label>
                <p>{selectedTime}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-4">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹ 90</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform fee</span>
                  <span>₹ 5</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance</span>
                  <span>₹ 50</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total Cost (INR)</span>
                  <span>₹ 645</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/3 border p-4 rounded-2xl">
            <h3 className="font-medium mb-4">Payment Mode</h3>
            <Select defaultValue="upi">
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="netbanking">Net Banking</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Enter your UPI ID E.g. yourusername@bank"
              className="my-4"
            />
            <div className="flex items-start gap-2 mb-6">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                By selecting the button below, I agree to the Makerspace rules,
                Ground rules for guests, Karkhana Reworking and Refund Policy
                and that Airbnb can charge my payment method if I&apos;m
                responsible for damage. I also agree to the updated Terms of
                Service, Payments Terms of Service and I acknowledge the Privacy
                Policy
              </label>
            </div>
            <Input placeholder="Enter Coupon Code" className="my-4" />

            <div className="mb-6 space-y-2">
              <hr />
              <h3 className="font-medium mb-2">Cancellation</h3>
              <p className="text-sm text-gray-600">
                Cancel before 6hrs of your booking time for a complete refund.
                After that, your refund depends on when you cancel. Learn more
              </p>
              <hr />
            </div>

            <div className="w-full flex justify-end">
              <Button onClick={handleProceedToPayment}>
                Proceed to payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar theme="light" />
      <div className="max-w-7xl pt-20 flex flex-col items-center justify-center mx-auto">
        {bookingState === 'initial' && renderInitialForm()}
        {['loading', 'failed', 'success'].includes(bookingState) &&
          renderPaymentStatus()}
        {bookingState === 'confirmed' && renderBookingConfirmation()}
      </div>
      <hr className="mb-4" />
      <div className="mx-auto flex items-center justify-between px-20 mb-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact the Lab</h2>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-md font-medium mb-2 flex gap-x-1 items-center">
                <MapPin className="h-4 w-4 inline-block" />
                <span>Location</span>
              </h3>
              <p className="text-sm text-gray-600 ml-2">
                SQA University Campus 1, Khandagiri,
                <br />
                Bhubaneswar, Odisha - 751030
              </p>

              <h3 className="text-md font-medium mt-4 mb-2 flex gap-x-1 items-center">
                <Star className="h-4 w-4 inline-block" />
                <span>How to reach us</span>
              </h3>
              <ul className="text-sm text-gray-600 space-y-1 ml-2">
                <li>2km from Bhubaneswar airport</li>
                <li>5km from Bhubaneswar Railway Station</li>
                <li>1km from Khandagiri metro station</li>
                <li>2km from Municipal metro station</li>
              </ul>

              <h3 className="text-md font-medium mt-4 mb-2 flex gap-x-1 items-center">
                <MessageCircle className="h-4 w-4 inline-block" />
                <span>Chat with Lab</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 items-center">
          <div className="bg-yellow-100 rounded-2xl py-1 px-4">
            <Image
              src="/world.svg"
              alt="World Map"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
          <Button
            variant="link"
            className="text-lg"
            onClick={() =>
              window.open('https://maps.app.goo.gl/qjaRb4rr4dzq64NY7', '_blank')
            }
          >
            Find on Map →
          </Button>{' '}
        </div>
      </div>
      <Footer />
    </div>
  );
}
