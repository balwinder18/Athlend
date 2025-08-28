'use client'
import { useState } from 'react'
import { ChevronRight, MapPin, Users, Trophy, Star, CheckCircle, Clock, Shield, DollarSign } from 'lucide-react'
import Newground from '../../components/Newground'

const page = () => {
  const [showForm, setShowForm] = useState(false)

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      title: "Earn Revenue",
      description: "Generate consistent income by hosting sports events and tournaments"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Community Building",
      description: "Connect with local sports enthusiasts and build a vibrant community"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Insurance Coverage",
      description: "Comprehensive insurance protection for all events hosted on your ground"
    },
    {
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      title: "Professional Events",
      description: "Host professional tournaments and leagues with proper management"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      title: "Flexible Booking",
      description: "Set your own availability and pricing for maximum flexibility"
    },
    {
      icon: <Star className="w-6 h-6 text-indigo-500" />,
      title: "Quality Rating",
      description: "Build reputation through our rating system and attract more bookings"
    }
  ]

  const features = [
    "Easy online booking management",
    "Automated payment processing",
    "Marketing support for your ground",
    "Maintenance and equipment assistance",
    "24/7 customer support",
    "Performance analytics and insights"
  ]

  const requirements = [
    "Ground should be minimum 50x30 meters",
    "Proper drainage system",
    "Basic lighting for evening events",
    "Parking space for at least 20 vehicles",
    "Clean restroom facilities",
    "Valid property documents"
  ]

  

  return (
<>
    {showForm ? (
  <Newground/>
) : (
  
   <div className="min-h-screen bg-gradient-to-br pt-20 from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Partner With Us
              <span className="block text-green-600">Transform Your Ground</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our platform and turn your sports ground into a thriving business. 
              Connect with thousands of sports enthusiasts and generate consistent revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Register Your Ground
                <ChevronRight className="w-5 h-5" />
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Collaborate With Us?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the amazing benefits of partnering with us to maximize your ground's potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                {benefit.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Provide</h2>
              <p className="text-lg text-gray-600 mb-8">
                We handle everything so you can focus on maintaining your ground while we bring you the business.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Success Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">500+</div>
                    <div className="text-gray-600">Partner Grounds</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">50K+</div>
                    <div className="text-gray-600">Monthly Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">₹2L+</div>
                    <div className="text-gray-600">Avg Monthly Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">4.8/5</div>
                    <div className="text-gray-600">Partner Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Basic Requirements</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ensure your ground meets these basic requirements for a smooth approval process
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Registration Process</h2>
            <p className="text-xl text-gray-600">Get started in just 3 easy steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Details</h3>
              <p className="text-gray-600">Fill out the registration form with your ground details and upload required documents</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verification</h3>
              <p className="text-gray-600">Our team will review your application and conduct a site visit for verification</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Go Live</h3>
              <p className="text-gray-600">Once approved, your ground goes live and you start receiving bookings immediately</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of ground owners who are already earning with us. 
            Start your registration today and wait for approval.
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white text-green-600 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 mx-auto shadow-lg"
          >
            Upload Ground Details
            <ChevronRight className="w-6 h-6" />
          </button>
          <p className="text-green-100 mt-4 text-sm">
            * Registration is free and approval typically takes 2-3 business days
          </p>
        </div>
      </div>
    </div>
  
 
)}
   
   </>

   
  )
}


export default page;