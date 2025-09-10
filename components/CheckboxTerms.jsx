import { useState } from "react";

export default function CheckboxTerms({ checked, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      {/* Checkbox */}
      <input
        type="checkbox"
        id="terms"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
      />
      <label htmlFor="terms" className="text-sm text-gray-700">
        I agree to{" "}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-green-600 underline hover:text-green-800"
        >
          Terms and Conditions
        </button>
      </label>

      {/* Popup */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
            <div className="space-y-4 text-gray-700 text-sm">
              <p>
                Welcome to <strong>athlend.com</strong>, a platform operated by A Plus Technologies for booking and renting sports grounds.
              </p>

              <h3 className="font-semibold">1. Booking and Use</h3>
              <p>The sports grounds booked through athlend.com are for the specified date, time, and purpose agreed upon during booking.</p>
              <p>Users must adhere strictly to the rules and regulations of the respective sports grounds and facilities.</p>
              <p>The platform is only a facilitator; the actual facility owners manage the premises.</p>

              <h3 className="font-semibold">2. Damage and Liability</h3>
              <p>Users accept full responsibility for any damage caused to the sports grounds, equipment, or property during their booking period.</p>
              <p>athlend.com and A Plus Technologies disclaim all liability for any injuries, damages, losses, or claims arising from the use of the premises.</p>
              <p>Users agree to indemnify and hold harmless athlend.com, A Plus Technologies, and the facility owners against any claims resulting from their use.</p>

              <h3 className="font-semibold">3. Equipment</h3>
              <p>Users may bring and use their own sports equipment during bookings.</p>
              <p>Users must ensure equipment use does not violate facility rules or cause damage.</p>

              <h3 className="font-semibold">4. User Conduct</h3>
              <p>Users shall conduct themselves responsibly and respectfully while using the sports grounds.</p>
              <p>Any behavior deemed inappropriate by the facility owners may result in termination of booking without refund.</p>

              <h3 className="font-semibold">5. Payment</h3>
              <p>All payments made via athlend.com must be completed at the time of booking unless otherwise specified.</p>
              <p>Prices include applicable GST taxes as required by law.</p>

              <h3 className="font-semibold">6. Cancellation and Refund Policy</h3>
              <p>Cancellations made at least 72 hours before the booked slot will be eligible for a full refund minus any payment gateway fees.</p>
              <p>Cancellations made less than 72 hours before the booking will not be refunded.</p>
              <p>Rescheduling requests are subject to availability and must be made at least 48 hours before the original booking.</p>
              <p>Refunds, if applicable, will be processed within 7-10 business days to the original payment method.</p>

              <h3 className="font-semibold">7. Age and Responsibility</h3>
              <p>Bookings can be made by any person, but users take full responsibility for themselves or any minors under their supervision.</p>

              <h3 className="font-semibold">8. Privacy and Data Protection</h3>
              <p>User data collected during registration and payment will be securely stored and handled as per our Privacy Policy.</p>

              <h3 className="font-semibold">9. Changes to Terms</h3>
              <p>athlend.com reserves the right to change these terms and conditions at any time without prior notice.</p>
              <p>Users will be notified of material changes via email or website notification.</p>

              <h3 className="font-semibold">10. Dispute Resolution (Optional)</h3>
              <p>Any disputes arising from use of the platform or bookings will be addressed first through mediation.</p>
              <p>If unresolved, disputes will be subject to the jurisdiction of courts in Faridabad, India.</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
