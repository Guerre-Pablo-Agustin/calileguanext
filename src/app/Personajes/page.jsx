"use client";
import { Suspense, useEffect, useState } from "react";
import { useDragonBallStore } from "../../Store/dragonBallStore";
import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Paginacion/Paginacion";
import Filtros from "../../components/Filtros/Filtros";

const Page = () => {
  const characters = useDragonBallStore((state) => state.characters);
  const fetchCharacters = useDragonBallStore((state) => state.fetchCharacters);
  const [loading, setLoading] = useState(true);

  // Paginacion
  const [page, setPage] = useState(1);
  const limit = 8;
  const [hasMore, setHasMore] = useState(true);
  

  // Estados de los filtros
  const [searchname, setSearchname] = useState("");
  const [searchgender, setSearchgender] = useState("");
  const [searchrace, setSearchrace] = useState("");
  const [searchaffiliation, setSearchaffiliation] = useState("");

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        await fetchCharacters(page, limit, {
          name: searchname,
          gender: searchgender,
          race: searchrace,
          affiliation: searchaffiliation,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [fetchCharacters, page, limit, searchname, searchgender, searchrace, searchaffiliation]);

  const handleFilterChange = (filters) => {
    setSearchname(filters.name || "");
    setSearchgender(filters.gender || "");
    setSearchrace(filters.race || "");
    setSearchaffiliation(filters.affiliation || "");
    setPage(1); // Reiniciar a la primera página
  };

  const handleLoadMore = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await fetchCharacters(page + 1, limit, {
        name: searchname,
        gender: searchgender,
        race: searchrace,
        affiliation: searchaffiliation,
      });
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

  return (
    <div className="flex md:flex-row justify-center items-start flex-col gap-6 px-4 mt-8">
      
      {/* Filtros */}
    <div className="flex justify-center items-center flex-col gap-6 px-4 bg-slate-800 md:w-1/4 rounded-lg shadow-lg">
      <Filtros onFilterChange={handleFilterChange} />
    </div>

    {/* Cards */}
    <div className="flex justify-center items-center flex-col gap-6 px-4 bg-slate-800 md:w-3/4 w-full rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-[#fbc02d] hover:text-[#fbc02d]/80 mt-4">
        Dragon Ball Characters
      </h1>
      <Suspense fallback={<div className="text-center">Cargando personajes...</div>}>
        {loading ? (
          <div className="text-center">Cargando personajes...</div>
        ) : (
          <Cards characters={characters} />
        )}
      </Suspense>
  
      {/* Pagination */}
      <Pagination
        page={page}
        setPage={setPage}
        handleLoadMore={handleLoadMore}
        handleGoBack={handleGoBack}
        hasMore={hasMore}
        previousCharactersLength={characters.items.length}
      />
    </div>
  </div>
  
  );
};

export default Page;
