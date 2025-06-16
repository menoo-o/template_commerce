// components/checkout/DeliveryAddressForm.tsx
'use client';

interface DeliveryAddressFormProps {
  fName: string;
  setFName: (fName: string) => void;
  lName: string;
  setLName: (lName: string) => void;
  addressLine1: string;
  setAddressLine1: (addressLine1: string) => void;
  addressLine2?: string;
  setAddressLine2?: (addressLine2: string) => void;
  city: string;
  setCity: (city: string) => void;
  postcode: string;
  setPostcode: (postcode: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  onSubmit: (e: FormEvent) => void; // Submit handler from parent
}

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { FormEvent } from 'react';


export default function DeliveryAddressForm({
  fName,
  setFName,
  lName,
  setLName,
  addressLine1,
  setAddressLine1,
  addressLine2,
  setAddressLine2,
  city,
  setCity,
  postcode,
  setPostcode,
  phone,
  setPhone,
  onSubmit, // Submit handler from parent
}: DeliveryAddressFormProps) {

  return(
   <form onSubmit={onSubmit} method="POST" className="space-y-6">


    {/* Rest of the form fields */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm text-black font-medium">Country/Region</label>
        <input
          type="text"
          defaultValue="United Kingdom"
          className="w-full p-2 mt-1 border border-gray-300 rounded"
          readOnly
        />
      </div>
    </div>

    {/* ... other form fields ... */}
      
    
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-black font-medium">First Name</label>
                  <input
                    type="text"
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                    name="firstName"
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-black font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
    
              <div>
                <label className="text-sm text-black font-medium">House Number & Street Address</label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  name="street"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  required
                />
              </div>
    
              <div>
                <label className="text-sm text-black font-medium">
                  Address Line 2 <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2?.(e.target.value)}
                  name="address2"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                />
              </div>
    
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-black font-medium">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    name="city"
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-black font-medium">Postcode</label>
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    name="postcode"
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
    
              <div>
                <label className="text-sm text-black font-medium flex items-center gap-2">
                  UK Phone Number
                  <Popover>
                    <PopoverTrigger>
                      <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="text-sm text-gray-700 max-w-xs">
                      In case we need to contact you about your delivery.
                    </PopoverContent>
                  </Popover>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  name="phone"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  required
                />
              </div>
    
             <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-semibold"
      >
        Submit
      </button>

  </form>
)

}