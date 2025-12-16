import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className=''>
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/50 h-screen flex items-center justify-center rounded-2xl     ">
        <div className="animate-spin text-white ">
            <Loader size={60} />
        </div>
      </div>
    </div>
  )
}
