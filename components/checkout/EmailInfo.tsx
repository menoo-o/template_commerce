import React from 'react'

function EmailInfo() {
  return (
    <div>
          {/* Contact(email) Info  */}
          <h2 className="text-2xl font-bold text-orange-600">Contact</h2>
             <div>
                  <label className="text-sm text-black font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
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
    </div>
  )
}

export default EmailInfo
