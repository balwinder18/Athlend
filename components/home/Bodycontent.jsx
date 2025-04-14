

import React from 'react'


const Bodycontent = () => {
  
  return (
    <>



<div className="relative flex justify-center w-full h-[400px]">
  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source src="/images/videosathlend.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  
 
  <div className="absolute inset-0 bg-black bg-opacity-30 z-1"></div>
  <div className="relative z-2 flex flex-col items-center justify-center text-white">
    <h1 className="text-4xl font-bold mb-4">Find Your Perfect Playing Field</h1>
    <p className="text-xl">PAY LESS , PLAY MORE</p>
  </div>
</div>

    </>
  )
}

export default Bodycontent