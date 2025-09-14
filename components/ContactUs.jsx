
export default function ContactUs() {
  return (
    <section className="px-6 pt-24 py-12 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-10">
          We’re here to help and connect. Please use the appropriate contact below based on your needs:
        </p>

        {/* Contact Categories */}
        <div className="space-y-8">
          {/* Investors */}
          <div>
            <h3 className="text-xl font-semibold mb-2">For Investors and B2B Event Inquiries</h3>
            <p>
              Email us at:{" "}
              <a href="mailto:team@athlend.com" className="text-blue-600 hover:underline">
                team@athlend.com
              </a>
            </p>
          </div>

          {/* Schools */}
          <div>
            <h3 className="text-xl font-semibold mb-2">For Schools and Sports Ground Partnerships</h3>
            <p>
              Interested schools and ground owners can reach us at:{" "}
              <a href="mailto:partnership@athlend.com" className="text-blue-600 hover:underline">
                partnership@athlend.com
              </a>
            </p>
          </div>

          {/* User Support */}
          <div>
            <h3 className="text-xl font-semibold mb-2">For User Support and Assistance</h3>
            <p>
              For help with bookings or platform support, contact:{" "}
              <a href="mailto:support@athlend.com" className="text-blue-600 hover:underline">
                support@athlend.com
              </a>
            </p>
          </div>

          {/* Gmail Option */}
          <div>
            <h3 className="text-xl font-semibold mb-2">For Users Preferring Gmail Contact</h3>
            <p>
              Write to:{" "}
              <a href="mailto:athlendconnect@gmail.com" className="text-blue-600 hover:underline">
                athlendconnect@gmail.com
              </a>
            </p>
          </div>

          {/* Phone & Address */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Phone Contact</h3>
            <p className="mb-2">Call us at: <span className="font-medium">+91 95821 72100</span></p>
            <p className="mb-2">
              <span className="font-semibold">Registered Office:</span> A Plus Technologies, FCA 3878
              First Floor, SGM Nagar, Faridabad
            </p>
            <p><span className="font-semibold">Company GSTIN:</span> 06GUXPB9356P1ZG</p>
          </div>

          {/* Grievance Officer */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Grievance Officer</h3>
            <p>
              Garv Behl, Email:{" "}
              <a href="mailto:support@athlend.com" className="text-blue-600 hover:underline">
                support@athlend.com
              </a>
            </p>
            <p className="text-sm text-gray-600">
              Complaints acknowledged within 48 hours and resolved within 30 days (per law).
            </p>
          </div>

          {/* Founders */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Meet Our Founders on LinkedIn</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Parth Bhatia:{" "}
                <a
                  href="https://in.linkedin.com/in/parth-bhatia-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </li>
              <li>
                Garv Behl:{" "}
                <a
                  href="https://in.linkedin.com/in/garv-behl-2b644a239"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </li>
              <li>
                Balwinder Singh:{" "}
                <a
                  href="https://in.linkedin.com/in/balwinder-singh-32a884254"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
