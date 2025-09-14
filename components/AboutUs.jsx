"use client";

export default function AboutUs() {
  return (
    <section className="px-4 pt-24 py-12 md:px-16 lg:px-24 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          About Us
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-center text-gray-600">
          Welcome to <span className="font-semibold ">athlend.com</span>, 
          your trusted platform for convenient and flexible sports ground bookings after 
          school hours. Athlend (operated by A Plus Technologies, GSTIN: 
          <span className="font-mono"> 06GUXPB9356P1ZG</span>) connects local school 
          grounds with players for hourly bookings. 
          <br className="hidden md:block" /> 
          All payments on this site are processed by a secure third-party payment 
          gateway (e.g., Paytm / PhonePe). We only list grounds authorised by the 
          facility owner via a signed partnership agreement and conduct basic safety 
          checks before listing.
        </p>

        {/* Mission */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to democratize access to sports grounds by bridging the gap 
            between facility owners and players. We aim to empower community sports 
            enthusiasts by providing a simple, reliable, and affordable platform where 
            bookings can be made quickly and seamlessly.
          </p>
        </div>

        {/* What We Do */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">What We Do</h3>
          <p className="text-gray-600 leading-relaxed">
            We solve the common problems of unavailable or underutilized sports grounds 
            by opening up these venues outside school hours. athlend.com offers real-time 
            booking, instant confirmations, and transparent pricing, so players can 
            concentrate on the game rather than logistics. Our platform ensures ground 
            owners get a trusted partner to optimize facility usage, while users enjoy 
            safe and well-maintained playing spaces.
          </p>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Our Values</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              <span className="font-medium text-gray-800">Accessibility:</span> Making 
              sports grounds easy to find and book by anyone.
            </li>
            <li>
              <span className="font-medium text-gray-800">Trust and Transparency:</span> 
              Clear policies, secure payments, and respectful community conduct.
            </li>
            <li>
              <span className="font-medium text-gray-800">Community Building:</span> 
              Encouraging active lifestyles and social connections through shared sports.
            </li>
            <li>
              <span className="font-medium text-gray-800">Innovation:</span> Using 
              technology to simplify and modernize sports venue booking.
            </li>
          </ul>
        </div>

        {/* Vision */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            We envision a future where no sports ground remains unused and every player 
            finds a place to play, fostering a vibrant sporting culture that supports 
            fitness, teamwork, and joy.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-lg font-medium text-gray-700 pt-6 border-t">
          Thank you for choosing <span className=" font-semibold">athlend.com</span> 
          — the place where sports meet community.
        </p>
      </div>
    </section>
  );
}
