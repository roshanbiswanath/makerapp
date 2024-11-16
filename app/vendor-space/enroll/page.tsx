'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, ArrowRight, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface FormData {
  type: 'independent' | 'institution' | null;
  purpose: 'rent' | 'membership' | 'events' | null;
  spaceDetails: {
    name: string;
    email: string;
    contact: string;
    inchargeName: string;
    website: string;
    timings: {
      from: string;
      to: string;
    };
    daysOpen: string[];
  };
  address: {
    city: string;
    state: string;
    address: string;
    zipCode: string;
    country: string;
    orgName?: string;
    orgEmail?: string;
  };
  media: {
    images: File[];
    spaceLogo?: File;
    orgLogo?: File;
  };
}

export default function SpaceSubmissionFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    type: null,
    purpose: null,
    spaceDetails: {
      name: '',
      email: '',
      contact: '',
      inchargeName: '',
      website: '',
      timings: { from: '', to: '' },
      daysOpen: [],
    },
    address: {
      city: '',
      state: '',
      address: '',
      zipCode: '',
      country: '',
    },
    media: {
      images: [],
    },
  });

  const steps = [1, 2, 3, 4, 5];
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center max-w-3xl mb-16">
              Are you an independent lab or with an institution?
            </h1>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
              {[
                {
                  type: 'independent',
                  title: 'Independent Lab',
                  description:
                    'Generate revenue by renting out underutilized machines to creators and hobbyists.',
                },
                {
                  type: 'institution',
                  title: 'Inside Institution',
                  description:
                    'Establish a steady income stream and build community loyalty through membership plans.',
                },
              ].map((option) => (
                <button
                  type="button"
                  key={option.type}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      type: option.type as 'independent' | 'institution',
                    })
                  }
                  className={`relative flex-1 p-8 rounded-3xl border-2 text-left transition-all ${
                    formData.type === option.type
                      ? 'border-black'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 ml-auto ${
                      formData.type === option.type
                        ? 'border-gray-400 p-2 bg-black'
                        : 'border-gray-300'
                    }`}
                  />
                  <h2 className="text-2xl font-bold mb-4">{option.title}</h2>
                  <p className="text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center max-w-3xl mb-16">
              What do you want to use this app for?
            </h1>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
              {[
                {
                  type: 'rent',
                  title: 'Rent Machines',
                  description:
                    'Generate revenue by renting out underutilized machines to creators and hobbyists.',
                },
                {
                  type: 'membership',
                  title: 'Offer Memberships',
                  description:
                    'Establish a steady income stream and build community loyalty through membership plans.',
                },
                {
                  type: 'events',
                  title: 'Host Events',
                  description:
                    'Increase exposure and revenue by organizing workshops, meetups, and special events.',
                },
              ].map((option) => (
                  <button
                      type='button'
                  key={option.type}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      purpose: option.type as 'rent' | 'membership' | 'events',
                    })
                  }
                  className={`flex-1 p-8 rounded-3xl border-2 text-left transition-all ${
                    formData.purpose === option.type
                      ? 'border-black'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 ml-auto ${
                      formData.purpose === option.type
                        ? 'border-black bg-black'
                        : 'border-gray-300'
                    }`}
                  />
                  <h2 className="text-2xl font-bold mb-4">{option.title}</h2>
                  <p className="text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Tell us about your Space
            </h1>
            <p className="text-gray-500 mb-16">
              Add details about your space below
            </p>
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="space-name">Name of the space*</Label>
                  <Input
                    id="space-name"
                    placeholder="Enter name of your Makerspace/Fablab"
                    value={formData.spaceDetails.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        spaceDetails: {
                          ...formData.spaceDetails,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Contact number*</Label>
                  <Input
                    id="contact"
                    placeholder="+91"
                    value={formData.spaceDetails.contact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        spaceDetails: {
                          ...formData.spaceDetails,
                          contact: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website*</Label>
                  <Input
                    id="website"
                    placeholder="Add a website link of you Space"
                    value={formData.spaceDetails.website}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        spaceDetails: {
                          ...formData.spaceDetails,
                          website: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="space-email">Email of the space*</Label>
                  <Input
                    id="space-email"
                    type="email"
                    placeholder="Enter email of your space"
                    value={formData.spaceDetails.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        spaceDetails: {
                          ...formData.spaceDetails,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="incharge">Space incharge's name*</Label>
                  <Input
                    id="incharge"
                    placeholder="Enter name of the incharge"
                    value={formData.spaceDetails.inchargeName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        spaceDetails: {
                          ...formData.spaceDetails,
                          inchargeName: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Days Open</Label>
                  <div className="flex flex-wrap gap-2">
                    {days.map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant={
                          formData.spaceDetails.daysOpen.includes(day)
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() => {
                          const newDays =
                            formData.spaceDetails.daysOpen.includes(day)
                              ? formData.spaceDetails.daysOpen.filter(
                                  (d) => d !== day
                                )
                              : [...formData.spaceDetails.daysOpen, day];
                          setFormData({
                            ...formData,
                            spaceDetails: {
                              ...formData.spaceDetails,
                              daysOpen: newDays,
                            },
                          });
                        }}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Tell us more about your Space
            </h1>
            <p className="text-gray-500 mb-16">
              Add details about your space below
            </p>
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="city">Town/City*</Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="address">Complete Address*</Label>
                  <Input
                    id="address"
                    value={formData.address.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          address: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="org-name">
                    Name of the organisation (Optional)
                  </Label>
                  <Input
                    id="org-name"
                    placeholder="Enter name of you university/institution/Legal Name"
                    value={formData.address.orgName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          orgName: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="state">State*</Label>
                  <Input
                    id="state"
                    value={formData.address.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, state: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="zip">Zip Code*</Label>
                  <Input
                    id="zip"
                    value={formData.address.zipCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          zipCode: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="org-email">
                    Email of the organisation (Optional)
                  </Label>
                  <Input
                    id="org-email"
                    type="email"
                    placeholder="Enter email of you university/institution"
                    value={formData.address.orgEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          orgEmail: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Show us your Space
            </h1>
            <p className="text-gray-500 mb-16">Add images of your space</p>
            <div className="w-full max-w-4xl">
              <Label className="mb-4 block">Upload images of your space*</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="aspect-video border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <Label className="mb-4 block">
                    Upload logo of your space
                  </Label>
                  <div className="w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <div className="text-center">
                  <Label className="mb-4 block">
                    Upload organisation's logo (Optional)
                  </Label>
                  <div className="w-24 h-24 border-2 border-dashed rounded-full flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-6 px-20 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Karkhana Logo"
            width={170}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <div className="flex gap-4">
          {steps.map((step) => (
            <div
              key={step}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === currentStep
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {renderStep()}
      </main>

      <footer className="w-full p-6 px-20 flex justify-between items-center border-t">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          BACK
        </Button>
        <Button
          variant={'link'}
          className="flex items-center gap-2 bg-transparent text-black"
          onClick={handleNext}
          disabled={!formData.type && currentStep === 1}
        >
          SAVE AND NEXT
          <ArrowRight className="w-4 h-4" />
        </Button>
      </footer>
    </div>
  );
}
