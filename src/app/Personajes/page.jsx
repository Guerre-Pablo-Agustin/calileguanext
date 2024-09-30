"use client";
import { Suspense, useEffect, useState } from "react";
import { useDragonBallStore } from "../../Store/dragonBallStore";
import Cards from "../../components/Cards/Cards";

const Page = () => {
  const characters = useDragonBallStore((state) => state.characters);
  const fetchCharacters = useDragonBallStore((state) => state.fetchCharacters);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [hasMore, setHasMore] = useState(true);
  const [previousCharacters, setPreviousCharacters] = useState([]);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        await fetchCharacters(page, limit);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [fetchCharacters, page, limit]);

  const handleLoadMore = async () => {
    if (loading) return; // Si ya se están cargando personajes, no hagas nada

    setLoading(true);
    try {
      setPreviousCharacters(characters.items); // Almacena los personajes actuales antes de cargar los nuevos
      await fetchCharacters(page + 1, limit);
      setPage(page + 1);
      if (characters.items.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setPage(page - 1);
  };

  console.log(characters);

  return (
    <div className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-bold text-center text-[#fbc02d] hover:text-[#fbc02d]/80 mt-8 px-4">
        Dragon Ball Characters
      </h1>
      <Suspense fallback={<div> Cargando personajes...</div>}>
        {loading ? (
          <div>Cargando personajes...</div>
        ) : (
          <Cards characters={characters} />
        )}
      </Suspense>

      <div className="flex justify-center items-center flex-row gap-6 mt-8 mb-5">
        {page > 1 && previousCharacters.length > 0 && (
          <button
            className="bg-[#fbc02d] hover:bg-[#fbc02d]/80 text-white font-bold py-2 px-4 rounded"
            onClick={handleGoBack}
          >
            Volver
          </button>
        )}
        {hasMore && (
          <button
            className="bg-[#fbc02d] hover:bg-[#fbc02d]/80 text-white font-bold py-2 px-4 rounded"
            onClick={handleLoadMore}
          >
            Ver mas
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
