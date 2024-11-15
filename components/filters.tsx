'use client';

import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const brands = [
  { id: 'formlabs', label: 'Formlabs' },
  { id: 'ultimaker', label: 'UltiMaker' },
  { id: 'creality', label: 'Creality' },
  { id: 'flashforge', label: 'FlashForge' },
  { id: 'craftbot', label: 'CraftBot' },
  { id: 'prusa', label: 'Prusa' },
  { id: 'makerbot', label: 'MakerBot' },
  { id: 'elegoo', label: 'Elegoo' },
  { id: 'bambulab', label: 'Bambu Lab' },
];

export function Filters({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['ultimaker']);
  const [dimensions, setDimensions] = useState({ x: '00', y: '00', z: '00' });
  const [nozzleSize, setNozzleSize] = useState([1]);
  const [priceRange, setPriceRange] = useState([500]);
  const [showMore, setShowMore] = useState(false);

  if (!isOpen) return null;

  const displayedBrands = showMore ? brands : brands.slice(0, 6);

  return (
    <div className="bg-white backdrop-blur-sm border rounded-xl">
      <div className="rounded-t-xl bg-background">
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Filters</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto">
          <div className="space-y-6 p-4">
            {/* Brands */}
            <div className="space-y-4">
              <h3 className="font-medium">Brands</h3>
              <div className="grid grid-cols-2 gap-4">
                {displayedBrands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand.id}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBrands([...selectedBrands, brand.id]);
                        } else {
                          setSelectedBrands(
                            selectedBrands.filter((id) => id !== brand.id)
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={brand.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand.label}
                    </label>
                  </div>
                ))}
              </div>
              <Button
                variant="link"
                className="px-0 text-sm"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Show less' : 'Show more'}
              </Button>
            </div>

            {/* Filament Type */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Filament Type</h3>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <Select defaultValue="pla">
                <SelectTrigger>
                  <SelectValue placeholder="Select filament type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pla">PLA</SelectItem>
                  <SelectItem value="abs">ABS</SelectItem>
                  <SelectItem value="petg">PETG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dimension */}
            <div className="space-y-4">
              <h3 className="font-medium">Dimension</h3>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={dimensions.x}
                  onChange={(e) =>
                    setDimensions({ ...dimensions, x: e.target.value })
                  }
                  className="w-16"
                />
                <span>×</span>
                <Input
                  type="text"
                  value={dimensions.y}
                  onChange={(e) =>
                    setDimensions({ ...dimensions, y: e.target.value })
                  }
                  className="w-16"
                />
                <span>×</span>
                <Input
                  type="text"
                  value={dimensions.z}
                  onChange={(e) =>
                    setDimensions({ ...dimensions, z: e.target.value })
                  }
                  className="w-16"
                />
                <span className="text-sm text-muted-foreground">cm</span>
              </div>
            </div>

            {/* Nozzle Size */}
            <div className="space-y-4">
              <h3 className="font-medium">Nozzle Size</h3>
              <div className="space-y-4">
                <Slider
                  value={nozzleSize}
                  onValueChange={setNozzleSize}
                  min={0.1}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">0.1 mm</span>
                  <span className="text-sm text-muted-foreground">2 mm</span>
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="font-medium">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={100}
                  max={1000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">₹100</span>
                  <span className="text-sm text-muted-foreground">₹1000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
