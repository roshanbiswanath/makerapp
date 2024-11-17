import Sidebar from "@/components/side-bar";
import TopBar from "@/components/top-bar";
import Footer from "@/components/footer";
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
import { Bell, ChevronDown, Search, Menu } from 'lucide-react';
import { Separator } from "@/components/ui/separator";


export default function MyApp() {  
  const sections = [
    { id: 1, title: 'Basic Details' },
    { id: 2, title: 'Rooms and Seats' },
    { id: 3, title: 'Lab Mentors' },
    { id: 4, title: 'Amenities' },
    { id: 5, title: 'How to reach your space' },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <div className=" flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="flex-grow flex items-center justify-center">
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
          <Separator className='mt-4' />
        </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
