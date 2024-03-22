import React from 'react'

const Counter = ({timestamp, title}) => {
  return (
    <div className="counter-box flex flex-col sm:w-32 md:w-40 lg:w-48 xl:w-56">
     <h2 className='timestamp text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'> {timestamp}</h2> 
    
      <h4 className='title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'>{title}</h4> 
    </div>
  )
}

export default Counter