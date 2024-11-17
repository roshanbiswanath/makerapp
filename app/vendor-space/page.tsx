'use client';

import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import TopBar from '@/components/top-bar';
import Image from 'next/image';

const faqs = [
  {
    question: 'What are Real-Time Settlements?',
    preview:
      'Real-Time Settlement is one of the functions of payment service...',
    answer:
      'Real-Time Settlement is one of the functions of payment service providers that enables merchants to receive payments from their customers instantaneously into their bank account.',
  },
  {
    question: 'How does the payment process work?',
    preview: 'The payment process is secure and straightforward...',
    answer:
      'The payment process is secure and straightforward, involving multiple layers of verification and instant transfer capabilities. It ensures that funds are moved safely and quickly between accounts.',
  },
  {
    question: 'What kind of support do you offer?',
    preview: 'We offer 24/7 customer support through multiple channels...',
    answer:
      'We offer 24/7 customer support through multiple channels including chat, email, and phone. Our team is always ready to assist you with any queries, ensuring you have a smooth experience with our services.',
  },
];
export default function footer() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar button={false} theme="light" />

      <main className="flex-grow">
        <section className="relative h-[600px] bg-gray-900 text-white flex items-center justify-center m-20 rounded-xl overflow-hidden">
          <div className="flex flex-col items-center justify-center border w-full h-full text-center relative">
            <Image
              src="/placeholder-top.png"
              alt="Background"
              fill
              priority
              className="z-0"
            />
            <div className="relative z-10 max-w-3xl text-yellow-300">
              <h1 className="text-7xl font-bold mb-32">
                Maximize your
                <br />
                Makerspace Potential
              </h1>
              <Link
                href="https://calendly.com/roshanbiswanathpatra/karkahana-onboarding"
                className="hover:text-white text-yellow-500 text-xl"
              >
                Request a Demo now! &nbsp;&nbsp;&nbsp;→
              </Link>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/40 dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/40 dark:from-background"></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 dark:from-background"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 dark:from-background"></div>
        </section>

        <section className="my-20 px-4 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">
            Be a part of India&apos;s
            <br />
            first maker-movement
          </h2>
          <div className="bg-white rounded-2xl max-w-5xl w-full mx-auto">
            <div className="flex items-center justify-between px-12 py-8 border border-gray-100 rounded-2xl hover:bg-gray-400 hover:border-gray-400 text-black hover:shadow-xl shadow-gray-800">
              <h3 className="text-xl font-bold">Rent Machines</h3>
              <p className="max-w-md">
                Generate revenue by renting out underutilized machines to
                creators and hobbyists.
              </p>
            </div>
            <div className="flex items-center justify-between px-12 py-8 border border-gray-100 rounded-2xl hover:bg-gray-400 hover:border-gray-400 text-black hover:shadow-2xl shadow-gray-800">
              <h3 className="text-xl font-bold">Offer Memberships</h3>
              <p className="max-w-md">
                Establish a steady income stream and build community loyalty
                through membership plans.
              </p>
            </div>
            <div className="flex items-center justify-between px-12 py-8 border border-gray-100 rounded-2xl hover:bg-gray-400 hover:border-gray-400 text-black hover:shadow-xl shadow-gray-800">
              <h3 className="text-xl font-bold">Host Events</h3>
              <p className="max-w-md">
                Increase exposure and revenue by organizing workshops, meetups,
                and special events.
              </p>
            </div>
          </div>
        </section>

        <section className="my-20 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 max-w-md">
              <h2 className="text-5xl font-bold mb-4">
                Offer a unique hands-on learning experience
              </h2>
              <p className="mb-4">
                By registering your makerspace on our platform, you can provide
                creators and hobbyists with access to cutting-edge tools,
                expert-led workshops, and a collaborative environment, enhancing
                their learning journey and skill development.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-8 grid grid-cols-2 gap-3">
              <div className="aspect-[5/6] bg-gray-300 rounded-3xl"></div>
              <div className="aspect-[2] rounded-3xl"></div>
              <div className="aspect-[2] rounded-3xl"></div>
              <div className="aspect-[5/6] -mt-32 bg-gray-300 rounded-3xl"></div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 items-center">
              <h2 className="text-5xl max-w-sm font-bold text-start col-span-2 pl-8">
                Take a closer look
              </h2>
              {[
                'Event Listings',
                '24/7 Customer Support',
                'Customizable Membership Plans',
                'Feedback and Rating System',
                'Integrated Payment Options',
                'Location-Based Search',
                'Reservation Screening',
                'Machine Inventory',
                'Maker Identity Verification',
                'Insurance Coverage',
              ].map((feature, index) => (
                <div
                  key={index}
                  className="text-start bg-white h-36 p-8 rounded-3xl"
                >
                  <h3 className="font-semibold mb-2">{feature}</h3>
                  <p className="text-sm text-gray-600">
                    Feature description goes here.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="my-44 px-8 text-center mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold mb-16">
            Become a part of the largest network of makerspaces
          </h2>
          <Link
            href="https://calendly.com/roshanbiswanathpatra/karkahana-onboarding"
            className="rounded-full bg-gray-500 py-4 px-12 text-white hover:bg-gray-400"
          >
            Request a Demo
          </Link>
        </section>

        <section className="my-20 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto bg-gray-50/50 rounded-3xl p-8 md:p-10 flex flex-col justify-between md:flex-row gap-8 md:gap-10">
            <div className="md:w-2/5">
              <h2 className="text-3xl md:text-5xl font-bold text-start leading-tight">
                Some frequently asked questions
              </h2>
            </div>
            <div className="md:w-2/5">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-gray-200"
                  >
                    <AccordionTrigger className="text-lg md:text-xl font-medium text-start hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <div className="mb-4 -mt-2 text-sm text-gray-400">
                      {faq.preview}
                    </div>
                    <AccordionContent className="text-gray-700 mb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button
                variant="link"
                className="mt-24 text-lg p-0 h-auto font-medium"
              >
                Read More →
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
