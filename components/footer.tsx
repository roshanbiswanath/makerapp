import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
      <section className="bg-[#63c381] p-8 mx-auto rounded-xl mb-12 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-md mb-4 md:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black">
            Join Karkhana Newsletter
          </h2>
          <p className="text-sm text-black">
            Get our weekly updates from the ecosystem of makers, innovation and
            technology. Join our newsletter now.
          </p>
        </div>
        <div className="flex w-1/2 ">
          <Input
            type="email"
            placeholder="Enter your email address here"
            className="flex-grow rounded-r-none px-6"
          />
          <Button className="rounded-l-none bg-white text-black hover:bg-gray-800 hover:text-white">
            Sign Up →
          </Button>
        </div>
      </section>
      <div className="container mx-auto px-8">
        <div className="flex">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            <div>
              <h3>Contact Us</h3>
              <ul className="text-sm space-y-1">
                {['FAQ', 'Report Policy', 'Privacy Policy', 'T & C'].map(
                  (item) => (
                    <li key={item}>{item}</li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3>About Us</h3>
              <ul className="text-sm space-y-1">
                <li>Learning</li>
                <li>In Press</li>
                <li>Blogs</li>
              </ul>
            </div>
            <div>
              <h3>Makerspaces</h3>
              <ul className="text-sm space-y-1">
                <li>Leadership</li>
                <li>Build a Makerspace</li>
              </ul>
            </div>

            <Button
              variant="secondary"
              className="rounded-lg px-8 py-6 col-span-3 sm:col-span-1 bg-white text-black font-semibold text-xs"
            >
              List Your Machines
            </Button>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Find us on</h3>
            <div className="flex space-x-2">
              {['instagram', 'facebook', 'twitter', 'linkedin'].map(
                (social) => (
                  <Link
                    key={social}
                    href={`#${social}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-sm text-gray-100">
            © karkhana 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
