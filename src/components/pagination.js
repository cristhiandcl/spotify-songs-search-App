import React from "react";

function Pagination({
  songsPerPage,
  totalSongs,
  paginateFront,
  paginateBack,
  currentPage,
}) {
  return (
    <div className="">
      <div>
        <p className="text-sm text-green-600 mb-2">
          Showing{" "}
          <span className="font-xl text-blue-300">
            {currentPage * songsPerPage - 10 < 0
              ? 0
              : currentPage * songsPerPage - 10}
          </span>{" "}
          to{" "}
          <span className="font-xl text-blue-300">
            {" "}
            {currentPage * songsPerPage > totalSongs
              ? totalSongs
              : currentPage * songsPerPage}{" "}
          </span>{" "}
          of <span className="font-xl text-blue-300"> {totalSongs} </span>{" "}
          results
        </p>
      </div>
      <div>
        <nav
          className="flex justify-center rounded-md -space-x-px"
          aria-label="Pagination"
        >
          <a
            onClick={() => {
              paginateBack();
            }}
            href="#"
            className="px-2 py-2 rounded-l-md border border-green-600 bg-white text-sm font-medium text-blue-300 hover:bg-gray-50"
          >
            <span>Previous</span>
          </a>

          <a
            onClick={() => {
              paginateFront();
            }}
            href="#"
            className="px-2 py-2 rounded-r-md border border-green-600 bg-white text-sm font-medium text-blue-300 hover:bg-gray-50"
          >
            <span>Next</span>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
