'use client'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { EmailFormValues } from '@/lib/types/types'

interface EmailInfoProps {
  register: UseFormRegister<EmailFormValues>
  errors: FieldErrors<EmailFormValues>
}

export default function EmailInfo({ register, errors }: EmailInfoProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-orange-600">Contact</h2>

      <div>
        <label className="text-sm text-black font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 mt-1 border border-gray-300 rounded"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="email-offers"
          className="h-4 w-4"
          {...register('emailOffers')}
        />
        <label htmlFor="email-offers" className="text-sm text-gray-700">
          Email me with news and offers
        </label>
      </div>

      {/* <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-semibold"
      >
        Submit
      </button> */}
    </div>
  )
}