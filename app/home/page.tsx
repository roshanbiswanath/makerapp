import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CategoryScroll from '@/components/category-scroll';
import { Calendar, Filter, SortAsc, Star } from 'lucide-react';
import Footer from '@/components/footer';
import TopBar from '@/components/top-bar';

export default function Page() {
  return (
    <div className="min-h-screen min-w-screen bg-white">
      <TopBar theme="dark" />

      <div className="relative h-[400px] sm:h-[500px] flex flex-col items-center justify-end text-center">
        <Image
          src="/makerapp/placeholder-top.png"
          alt="Background"
          fill
          priority
          className="z-0"
        />
        <div className="relative z-10 max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
            Find the Perfect Machine for Every Job, Every Time
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mb-8  mx-auto max-w-sm">
            Book Your Machine Online - Ready for Your Next Big Project When You
            Arrive.
          </p>
          <Button
            size="lg"
            className="mt-14 bg-transparent border text-white hover:text-black hover:bg-white rounded-full"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>SELECT A DATE</span>
          </Button>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/40 dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/40 dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 dark:from-background"></div>
      </div>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <section className="my-6">
          <h2 className="font-semibold text-2xl">Explore Machines</h2>
          <CategoryScroll />
        </section>

        <section className="my-6">
          <div className="flex items-center justify-end gap-x-2 pb-4 p-1">
            <SortAsc className="w-4 h-4 inline-block" />
            <span className="text-sm">Sort</span>
            <Filter className="w-4 h-4 inline-block" />
            <span className="text-sm">Filter</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div
                key={item}
                className="border rounded-xl overflow-hidden hover:shadow-xl shadow-inner"
              >
                <Image
                  src="/makerapp/assetlist.png"
                  alt={`Creality 3-D Printer ${item}`}
                  width={400}
                  height={600}
                  className="w-full object-cover rounded-xl"
                />
                <div className="p-4">
                  <div className="flex justify-between w-full">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Creality, 3-D Printer
                      </h3>
                      <p className="text-xs text-gray-600">
                        SOA Fab Lab, Bhubaneshwar
                      </p>
                    </div>
                    <div className="flex items-start justify-center gap-x-1.5">
                      <span className="text-gray-600 font-semibold text-md">
                        2.5
                      </span>
                      <Star className="w-4 h-4 mt-[3px] text-orange-400 fill-current" />
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm my-2">PLA, ABS ; Volumes</p>
                      <Link href={'/'} className="underline text-xs">
                        Show More
                      </Link>
                    </div>
                    <Button
                      variant="default"
                      className="rounded-lg px-6 hover:bg-green-500 hover:text-black"
                    >
                      <span className="text-xs">BOOK NOW</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="link">View More ---→</Button>
          </div>
        </section>

        <section className="mb-12 mt-6 flex flex-col md:flex-row justify-between gap-x-24">
          <div className="md:w-1/3 py-10 flex flex-col items-start justify-between">
            <article>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Discover a Global Network of 5000+ Maker Spaces
              </h2>
              <p className="text-gray-600 mb-4 max-w-56">
                Find the Perfect Place to Bring Your Ideas to Life
              </p>
            </article>
            <Link href={'/'} className="">
              View on Map ---→
            </Link>
          </div>

          <div className="md:w-1/2 bg-yellow-100 rounded-2xl py-1 px-4">
            <Image
              src="/makerapp/world.svg"
              alt="World Map"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
