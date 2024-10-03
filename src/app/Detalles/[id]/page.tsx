"use client";
import Image from "next/image";
import { useDragonBallStore } from "../../../Store/dragonBallStore";
import { useEffect } from "react";
import Link from "next/link";
import TransformationCard from "../../../components/TransformationCard/TransformationCard";

type Params = {
  id: string;
};

const Page = ({ params }: { params: Params }) => {
  const { id } = params;
  const fetchCharactersById = useDragonBallStore(
    (state) => state.fetchCharactersById
  );
  const characters = useDragonBallStore((state) => state.characters.items);

  useEffect(() => {
    if (id) {
      fetchCharactersById(id);
    } else {
      console.error("ID no válido");
    }
  }, [id, fetchCharactersById]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gray-500 p-12">
        <Link href={"/Personajes"} className="absolute top-5 left-5">
        <button className="text-lg font-bold bg-[#fbc02d] hover:bg-[#fbc02d]/80 rounded-lg px-4 py-2">Volver</button>
        </Link>
      <h1 className="mt-5 text-3xl font-bold text-[#fbc02d]">{characters?.[0]?.name}</h1>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-2 grid items-center justify-center rounded-xl p-6">
          <Image
            src={characters?.[0]?.image}
            alt={characters?.[0]?.name}
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <div className="col-span-2 grid rounded-xl gap-4 p-6">
          <p className="text-sm font-bold text-[#fbc02d] gap-4">
            {characters?.[0]?.race} - {characters?.[0]?.gender}
          </p>
          <p className="text-sm font-bold text-[#fbc02d]">
            ki: {characters?.[0]?.ki} - Ki Máximo: {characters?.[0]?.maxKi}
          </p>
          <p className="text-sm font-bold text-[#fbc02d]">
            Afiliación: {characters?.[0]?.affiliation}
          </p>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-bold text-[#fbc02d]">
              Planeta origen: {characters?.[0]?.originPlanet?.name}
            </p>
            <Image
              src={characters?.[0]?.originPlanet?.image}
              alt={characters?.[0]?.name}
              width={200}
              height={200}
            />
          </div>
          <br />
          <p className="text-sm font-bold">
            Descripción del personaje :{characters?.[0]?.description}
          </p>
        </div>
      </div>

      {/* transformaciones */}
      <div className="cards-container grid grid-cols-1 gap-20 p-20 md:grid-cols-2 lg:grid-cols-4">
        {characters.length > 0 && characters[0].transformations ? (
          characters[0].transformations.map((transformation) => (
            <TransformationCard key={transformation.id} transformation={transformation} />
          ))
        ) : (
          <p>No hay transformaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
