
type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  handleLoadMore: () => void;
  handleGoBack: () => void;
  hasMore: boolean;
  previousCharactersLength: number;
};

const Pagination = ({ page, handleLoadMore, handleGoBack, hasMore, previousCharactersLength }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center flex-row gap-6 mt-8 mb-5">
      {page > 1 && previousCharactersLength > 0 && (
        <button
          className="bg-[#fbc02d] hover:bg-[#fbc02d]/80 text-white font-bold py-2 px-4 rounded"
          onClick={handleGoBack}
        >
          Volver
        </button>
      )}
      <p>Página {page}</p>
      {hasMore && (
        <button
          className="bg-[#fbc02d] hover:bg-[#fbc02d]/80 text-white font-bold py-2 px-4 rounded"
          onClick={handleLoadMore}
        >
          Ver más
        </button>
      )}
    </div>
  );
};

export default Pagination;
