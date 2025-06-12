// components/checkout/DeliveryAddressForm.tsx
'use client';


import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";




export const DeliveryAddressForm = () => (
  <form action="/save-address" method="POST" className="space-y-6">

   

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
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
    
              <div>
                <label className="text-sm text-black font-medium">House Number & Street Address</label>
                <input
                  type="text"
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
                  name="address2"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                />
              </div>
    
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-black font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm text-black font-medium">Postcode</label>
                  <input
                    type="text"
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
                  name="phone"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  required
                />
              </div>
    
             
    

    
  </form>
);