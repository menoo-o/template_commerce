// components/checkout/DeliveryAddressForm.tsx
'use client';


import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";


interface DeliveryAddressFormProps {
  placeType: string;
  setPlaceType: (type: string) => void;
}

export const DeliveryAddressForm = ({ placeType, setPlaceType }: DeliveryAddressFormProps) => (
  <form action="/save-address" method="POST" className="space-y-6">
    <div className="space-y-2">
      <label className="font-medium text-black">What kind of place is this going to?</label>
      <div className="flex flex-wrap gap-3">
        {["residential", "office", "restaurant", "other"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setPlaceType(type)}
            className={`px-4 py-2 border rounded-full text-sm capitalize transition ${
              placeType === type
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
        <input type="hidden" name="placeType" value={placeType} />
      </div>
    </div>

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
    
              <div className="flex items-center gap-2">
                <input type="checkbox" id="email-offers" name="emailOffers" />
                <label htmlFor="email-offers" className="text-sm text-gray-700">
                  Email me with news and offers
                </label>
              </div>
    

    <button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold"
    >
      Save Address
    </button>
  </form>
);