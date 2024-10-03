import React from 'react'
import { Transformation } from '../../Interface/Characters';
import Image from 'next/image';

type Props = {
  transformation: Transformation;
};

const TransformationCard = (props: Props) => {
  const transformation = props.transformation;

  return (
    <div className='flex justify-center items-center flex-col gap-6 p-6 bg-[#272b33] rounded-lg w-[200px] h-[300px] cursor-pointer'>
      <p className="text-xl font-bold text-[#fbc02d] hover:text-[#fbc02d]/80">{transformation.name}</p>
      <Image
        src={transformation.image}
        alt={transformation.name}
        width={150}
        height={100}
        className="h-56 w-64 object-contain transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 hover:duration-300"
      />
    </div>
  );
}

export default TransformationCard;
