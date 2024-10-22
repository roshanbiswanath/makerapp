'use client';

import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import TopBar from '@/components/top-bar';

export default function footer() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] bg-gray-900 text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-50"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">
              Maximize your
              <br />
              Makerspace Potential
            </h1>
            <Link href="/vendor-space/schedule-request">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Request a Demo →
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Be a part of India's
            <br />
            first maker-movement
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Rent Machines',
                description:
                  'Generate revenue by renting out underutilized machines to creators and hobbyists.',
              },
              {
                title: 'Offer Memberships',
                description:
                  'Establish a steady income stream and build community loyalty through membership plans.',
              },
              {
                title: 'Host Events',
                description:
                  'Increase exposure and revenue by organizing workshops, meetups, and special events.',
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Experience Section */}
        <section className="py-16 px-4 bg-gray-100">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                Offer a unique
                <br />
                hands-on learning
                <br />
                experience
              </h2>
              <p className="mb-4">
                By registering your makerspace on our platform, you can provide
                creators and hobbyists with access to cutting-edge tools,
                expert-led workshops, and a collaborative environment, enhancing
                their learning journey and skill development.
              </p>
              <Button>Learn More</Button>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="aspect-video bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Take a closer look
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
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
              ].map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{feature}</h3>
                    <p className="text-sm text-gray-600">
                      Feature description goes here.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-100 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Become a part of the largest
            <br />
            network of makerspaces
          </h2>
          <Button size="lg">Request a Demo</Button>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Some frequently asked questions
          </h2>
          <Accordion type="single" collapsible>
            {[
              'What are Real-Time Settlements?',
              'How does the payment process work?',
              'What kind of support do you offer?',
            ].map((question, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>
                  Answer to the question goes here. This would typically be a
                  detailed explanation of the topic.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <Footer />
    </div>
  );
}
