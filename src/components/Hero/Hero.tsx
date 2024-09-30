import Image from 'next/image'
import Link from 'next/link'
import React from 'react'




const Hero = () => {
  return (
    <div className='flex justify-center items-center mt-8 flex-col gap-6'>
      <Image src="/Images/logo_dragonballapi.webp" alt="hero" width={700} height={460}/>
      <Link href="/characters" className='text-3xl font-bold text-[#fbc02d] hover:text-[#fbc02d]/80'>
      Ver personajes
      </Link>
    </div>
  )
}

export default Hero