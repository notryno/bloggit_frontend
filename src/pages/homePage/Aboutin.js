import React from 'react'
import { Link } from 'react-router-dom'

const Aboutin = () => {
  return (
    <div className='bg-[#1f252a] p-2 py-4'>
      <div  >
        <div className='text-6xl text-center font-bold text-white py-6'>

          SUJAL TITLE
        </div>
        <div className='flex flex-col sm:flex-row justify-around items-center py-12'>
          <div className=' text-center'>
            <div className='text-2xl font-semibold text-white'>
              Icon
            </div>
            <div className='text-4xl font-bold text-white'>
              title
            </div>
            <div className='text-xl font-semibold text-white'>
              description
            </div>
          </div>
          <div className=' text-center'>
            <div className='text-2xl font-semibold text-white'>
              the icon
            </div>
            <div className='text-4xl font-bold text-white'>
              title
            </div>
            <div className='text-xl font-semibold text-white'>
              description
            </div>
          </div>
          <div className=' text-center'>
            <div className='text-2xl font-semibold text-white'>
              the icon
            </div>
            <div className='text-4xl font-bold text-white'>
              title
            </div>
            <div className='text-xl font-semibold text-white'>
              description
            </div>
          </div>
        </div>
        <div className='text-center py-4'>
          <Link to='/profile'>
            <button className='bg-[#e97442] py-2 px-5 rounded'>
              Profile of the user
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Aboutin
