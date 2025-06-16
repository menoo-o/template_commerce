'use client';

import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

// This type now only needs the form values
export type DeliveryAddressFormValues = {
  fName: string;  
  lName: string;
  addressLine1: string; 
  addressLine2?: string;
  city: string;
  postcode: string;
  phone: string;
};

interface DeliveryProps {
  register: UseFormRegister<DeliveryAddressFormValues>;
  errors: FieldErrors<DeliveryAddressFormValues>;
}

export default function DeliveryAddressForm({ register, errors }: DeliveryProps) {
  return (
    <div className="space-y-6">
      {/* Country/Region (hardcoded) */}
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

      {/* First + Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-black font-medium">First Name</label>
          <input
            type="text"
            {...register('fName', { required: 'First name is required' })}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
          {errors.fName && <p className="text-red-500">{errors.fName.message}</p>}
        </div>

        <div>
          <label className="text-sm text-black font-medium">Last Name</label>
          <input
            type="text"
            {...register('lName', { required: 'Last name is required' })}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
          {errors.lName && <p className="text-red-500">{errors.lName.message}</p>}
        </div>
      </div>

      {/* Address Line 1 */}
      <div>
        <label className="text-sm text-black font-medium">House Number & Street Address</label>
        <input
          type="text"
          {...register('addressLine1', { required: 'Street address is required' })}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        />
        {errors.addressLine1 && <p className="text-red-500">{errors.addressLine1.message}</p>}
      </div>

      {/* Address Line 2 */}
      <div>
        <label className="text-sm text-black font-medium">
          Address Line 2 <span className="text-gray-500">(optional)</span>
        </label>
        <input
          type="text"
          {...register('addressLine2')}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        />
      </div>

      {/* City + Postcode */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-black font-medium">City</label>
          <input
            type="text"
            {...register('city', { required: 'City is required' })}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>

        <div>
          <label className="text-sm text-black font-medium">Postcode</label>
          <input
            type="text"
            {...register('postcode', { required: 'Postcode is required' })}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
          {errors.postcode && <p className="text-red-500">{errors.postcode.message}</p>}
        </div>
      </div>

      {/* Phone */}
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
          {...register('phone', { required: 'Phone is required' })}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

     
    </div>
  );
}
