import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CategoryScroll from '@/components/category-scroll';
import { Calendar, Star } from 'lucide-react';

export default function Page() {
  return (
    <div className='min-h-screen min-w-screen bg-white'>
      <div className='relative h-[400px] sm:h-[600px] flex flex-col items-center justify-center text-center'>
        <Image
          src='/makerapp/placeholder-top.png'
          alt='Background'
          fill
          className='z-0'
        />
        <div className='relative z-10 max-w-3xl'>
          <h1 className='text-3xl sm:text-5xl font-bold mb-4 text-white'>
            Find the Perfect Machine for Every Job, Every Time
          </h1>
          <p className='text-sm sm:text-base text-gray-200 mb-8'>
            Book Your Machine Online - Ready for Your Next Big Project When You
            Arrive.
          </p>
          <Button
            size='lg'
            className='mt-14 bg-white text-black hover:bg-gray-100 rounded-full'
          >
            <Calendar className='w-4 h-4 mr-2' />
            <span>SELECT A DATE</span>
          </Button>
        </div>
        <div className='pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/40 dark:from-background'></div>
        <div className='pointer-events-none absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/40 dark:from-background'></div>
        <div className='pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 dark:from-background'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 dark:from-background'></div>
      </div>
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 my-10'>
        <section className='my-6'>
          <h2 className='font-semibold text-2xl'>Explore Machines</h2>
          <CategoryScroll />
        </section>

        <section className='my-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div
                key={item}
                className='border rounded-xl overflow-hidden shadow-sm'
              >
                <Image
                  src='/makerapp/assetlist.png'
                  alt={`Creality 3-D Printer ${item}`}
                  width={400}
                  height={600}
                  className='w-full object-cover rounded-xl'
                />
                <div className='p-4'>
                  <div className='flex justify-between w-full'>
                    <div>
                      <h3 className='font-semibold text-lg'>
                        Creality, 3-D Printer
                      </h3>
                      <p className='text-xs text-gray-600'>
                        SOA Fab Lab, Bhubaneshwar
                      </p>
                    </div>
                    <div className='flex items-start justify-center gap-x-1.5'>
                      <span className='text-gray-600 font-semibold text-md'>
                        2.5
                      </span>
                      <Star className='w-4 h-4 mt-[3px] text-orange-400 fill-current' />
                    </div>
                  </div>
                  <div className='flex justify-between items-end'>
                    <div>
                      <p className='text-sm my-2'>PLA, ABS ; Volumes</p>
                      <Link
                        href={'/'}
                        className='underline text-xs'
                      >
                        Show More
                      </Link>
                    </div>
                    <Button
                      variant='default'
                      className='rounded-lg px-6'
                    >
                      <span className='text-xs'>BOOK NOW</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='text-center mt-8'>
            <Button variant='link'>View More →</Button>
          </div>
        </section>

        <section className='mb-12 mt-6 flex flex-col md:flex-row justify-between gap-x-24'>
          <div className='md:w-1/3 py-10 flex flex-col items-start justify-between'>
            <article>
              <h2 className='text-2xl sm:text-3xl font-bold mb-4'>
                Discover a Global Network of 5000+ Maker Spaces
              </h2>
              <p className='text-gray-600 mb-4 max-w-56'>
                Find the Perfect Place to Bring Your Ideas to Life
              </p>
            </article>
            <Link
              href={'/'}
              className=''
            >
              View on Map →
            </Link>
          </div>

          <div className='md:w-1/2 bg-yellow-100 rounded-2xl py-1 px-4'>
            <Image
              src='/makerapp/world.svg'
              alt='World Map'
              width={600}
              height={400}
              className='w-full h-auto'
            />
          </div>
        </section>
      </main>

      <footer className='bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8'>
        <section className='bg-[#63c381] p-8 mx-10 rounded-xl mb-12 flex flex-col md:flex-row items-center justify-between'>
          <div className='max-w-md mb-4 md:mb-0'>
            <h2 className='text-2xl sm:text-3xl font-bold mb-4 text-black'>
              Join Karkhana Newsletter
            </h2>
            <p className='text-sm text-black'>
              Get our weekly updates from the ecosystem of makers, innovation
              and technology. Join our newsletter now.
            </p>
          </div>
          <div className='flex w-1/2 '>
            <Input
              type='email'
              placeholder='Enter your email address here'
              className='flex-grow rounded-r-none px-6'
            />
            <Button className='rounded-l-none bg-white text-black hover:bg-gray-800 hover:text-white'>
              Sign Up →
            </Button>
          </div>
        </section>
        <div className='container mx-auto'>
          <div className='flex'>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8'>
              <div>
                <h3>Contact Us</h3>
                <ul className='text-sm space-y-1'>
                  {['FAQ', 'Report Policy', 'Privacy Policy', 'T & C'].map(
                    (item) => (
                      <li key={item}>{item}</li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h3>About Us</h3>
                <ul className='text-sm space-y-1'>
                  <li>Learning</li>
                  <li>In Press</li>
                  <li>Blogs</li>
                </ul>
              </div>
              <div>
                <h3>Makerspaces</h3>
                <ul className='text-sm space-y-1'>
                  <li>Leadership</li>
                  <li>Build a Makerspace</li>
                </ul>
              </div>

              <Button
                variant='secondary'
                className='rounded-lg px-8 py-6 col-span-3 sm:col-span-1 bg-white text-black font-semibold text-xs'
              >
                List Your Machines
              </Button>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Find us on</h3>
              <div className='flex space-x-2'>
                {['instagram', 'facebook', 'twitter', 'linkedin'].map(
                  (social) => (
                    <Link
                      key={social}
                      href={`#${social}`}
                      className='text-gray-600 hover:text-gray-900'
                    >
                      <span className='sr-only'>{social}</span>
                      <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          <div className='mt-8 flex justify-between items-center'>
            <p className='text-sm text-gray-100'>
              © karkhana 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
