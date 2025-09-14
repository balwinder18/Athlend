export default function RefundPolicy() {
  return (
    <section className="px-6 pt-24 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Refund and Cancellation Policy
        </h2>

        {/* How to Request */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">How to Request Cancellation or Rescheduling</h3>
          <ul className="list-disc list-inside space-y-3">
            <li>Log in to your account on <span className="font-medium">athlend.com</span>.</li>
            <li>Go to the <span className="font-medium">“My Profile”</span> section.</li>
            <li>Select <span className="font-medium">“My Bookings”</span> to view your active and past bookings.</li>
            <li>Click on the booking you wish to manage.</li>
            <li>Choose the <span className="font-medium">“Cancel”</span> option available.</li>
            <li>Follow on-screen instructions to complete the request.</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            * Cancellation options are available only through the website; requests via phone or other channels are not accepted.
          </p>
        </div>

        {/* Refund Structure */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Refund Structure for Cancellations</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Time Before Booking</th>
                  <th className="border px-4 py-2 text-left">Refund Percentage (after fees)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">More than 24 hours</td>
                  <td className="border px-4 py-2">90%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">24 to 12 hours</td>
                  <td className="border px-4 py-2">50%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">12 to 6 hours</td>
                  <td className="border px-4 py-2">25%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Less than 6 hours</td>
                  <td className="border px-4 py-2">No refund</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Payment gateway or banking fees will be deducted from approved refunds.</li>
            <li>“No-shows” and early departures are not eligible for refunds.</li>
          </ul>
        </div>

        {/* Rescheduling */}
        {/* <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Rescheduling Policy</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Rescheduling is allowed up to 24 hours before your original slot.</li>
            <li>Availability of new slots for rescheduling is not guaranteed.</li>
          </ul>
        </div> */}

        {/* Refund Processing */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Refund Processing</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Refunds, where applicable, will be processed to your original payment method.</li>
            <li>Refunds will be completed within 7–10 business days.</li>
          </ul>
        </div>

        {/* Special Circumstances */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Special Circumstances</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>If <span className="font-medium">athlend.com</span> or the facility owner cancels your booking, you will receive a full refund.</li>
            <li>Special event bookings may have separate policies communicated during booking.</li>
          </ul>
        </div>

        {/* Policy Updates */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Policy Updates and Contact</h3>
          <p className="mb-2">This policy may be updated; changes will be posted on our website.</p>
          <p>
            For queries or assistance, email{" "}
            <a href="mailto:support@athlend.com" className="text-blue-600 hover:underline">
              support@athlend.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
