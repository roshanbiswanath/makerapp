import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TopBar from '@/components/top-bar';
import CategoryScroll from '@/components/category-scroll';

export default function Home() {
  return (
    <div className='min-h-screen bg-white'>
      <TopBar />

      <main className='container mx-auto mt-8 px-10'>
        <div className='h-96 flex flex-col items-center justify-center'>
          <h1 className='text-4xl font-bold text-center mb-2'>
            Discover - Book - Fabricate
          </h1>
          <p className='text-center text-gray-600 mb-8'>
            Your Journey into Innovation Begins Here!
          </p>
        </div>

        <CategoryScroll />
        <section className='my-12'>
          <h2 className='text-2xl font-bold mb-4'>Explore Makerspaces</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className='border rounded-lg p-4'
              >
                <div className='bg-gray-200 h-40 mb-4 rounded'></div>
                <h3 className='font-semibold'>SOA Fab Lab</h3>
                <p className='text-sm text-gray-600'>Bhubaneswar, Odisha</p>
                <p className='text-sm text-gray-600'>₹599 per entry</p>
              </div>
            ))}
          </div>
          <div className='text-center mt-4'>
            <Button variant='link'>Check out all Makerspaces here →</Button>
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>Explore ToolsRooms</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className='border rounded-lg p-4'
              >
                <div className='bg-gray-200 h-40 mb-4 rounded'></div>
                <h3 className='font-semibold'>SOA Fab Lab</h3>
                <p className='text-sm text-gray-600'>Bhubaneswar, Odisha</p>
                <p className='text-sm text-gray-600'>₹599 per entry</p>
              </div>
            ))}
          </div>
          <div className='text-center mt-4'>
            <Button variant='link'>Check out all Toolrooms here →</Button>
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>Explore Events</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className='border rounded-lg p-4'
              >
                <div className='bg-gray-200 h-40 mb-4 rounded'></div>
                <h3 className='font-semibold'>SOA Fab Lab</h3>
                <p className='text-sm text-gray-600'>Bhubaneswar, Odisha</p>
                <p className='text-sm text-gray-600'>₹599 per entry</p>
              </div>
            ))}
          </div>
          <div className='text-center mt-4'>
            <Button variant='link'>Check out all events near you →</Button>
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>Around the world</h2>
          <div className='bg-gray-200 h-2/3 rounded-lg overflow-hidden'>
            <Image
              src={'/world-map.svg'}
              height={2046}
              width={2046}
              alt={'world-map'}
            />
          </div>
          <div className='text-center mt-4'>
            <Button variant='link'>View Makerspaces, Fablabs and more</Button>
          </div>
        </section>
      </main>

      <footer className='bg-gray-100 py-8 px-10'>
        <section className='bg-gray-300 p-8 rounded-xl mb-12 2xl:mx-28 flex items-center justify-between'>
          <div className='max-w-md'>
            <h2 className='text-4xl font-bold mb-4'>The Weekly Dispatch</h2>
            <p className='mb-4 text-xs'>
              Get our weekly updates from the ecosystem of makers,
              <br /> innovators and technology, and our community news.
            </p>
          </div>
          <div className='flex border w-full max-w-screen-sm rounded-xl overflow-hidden'>
            <Input
              type='email'
              placeholder='Enter your email address here'
              className='flex-grow border-none'
            />
            <Button className='rounded-s-none'>Sign Up →</Button>
          </div>
        </section>
        <div className='container mx-auto grid grid-cols-5 w-full'>
          <div>
            <h3 className='font-semibold mb-2'>Contact Us</h3>
            <ul className='text-sm space-y-1'>
              <li>FAQ</li>
              <li>Report Policy</li>
              <li>Privacy Policy</li>
              <li>T & C</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Makerspaces</h3>
            <ul className='text-sm space-y-1'>
              <li>Events</li>
              <li>Programs</li>
              <li>Toolrooms</li>
              <li>Build a makerspace</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-2'>About Us</h3>
            <ul className='text-sm space-y-1'>
              <li>Leadership</li>
              <li>Investors</li>
              <li>Careers</li>
              <li>Blogs</li>
            </ul>
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
          <Button
            variant='outline'
            className='rounded-2xl py-6'
          >
            Submit a space
          </Button>
        </div>

        <div className='container mx-auto mt-8 flex justify-between items-center'>
          <p className='text-sm text-gray-600'>
            © karkhana 2024. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
