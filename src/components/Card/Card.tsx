import React from 'react'
import { Character } from '../../Interface/Characters';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    character : Character
  };

const Card = (props: Props) => {

  const character = props.character

  console.log(character)

  return (
    <>
    <Link href={`/Detalles/${character.id}`}>
    <div className='flex justify-center items-center flex-col gap-6 p-6 bg-[#272b33] rounded-lg w-[200px] h-[300px] cursor-pointer'>
      <p className="text-xl font-bold text-[#fbc02d] hover:text-[#fbc02d]/80">{character.name}</p>
     <Image src={character.image} alt={character.name} width={150} height={100}
       className="h-56 w-64 object-contain transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 hover:duration-300" />
    </div>
    </Link>
    </>
  )
}

export default Card