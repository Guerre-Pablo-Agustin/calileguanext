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
        // Pasamos los filtros a fetchCharacters
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
    <div className="flex md:flex-row justify-center items-center flex-col gap-6 px-4">
      <div className="flex justify-center items-center flex-col gap-6 px-4 mt-8">
        {/* Filtros */}
        <Filtros onFilterChange={handleFilterChange} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center text-[#fbc02d] hover:text-[#fbc02d]/80 mt-8 px-4">
          Dragon Ball Characters
        </h1>
        <Suspense fallback={<div>Cargando personajes...</div>}>
          {loading ? (
            <div>Cargando personajes...</div>
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
        />
      </div>
    </div>
  );
};

export default Page;
