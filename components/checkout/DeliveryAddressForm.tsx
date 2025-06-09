// components/checkout/DeliveryAddressForm.tsx
'use client';

import { useState } from 'react';
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

    <button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold"
    >
      Save Address
    </button>
  </form>
);