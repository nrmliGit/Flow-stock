"use client";
import { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductRow from "./ProductRow";
import { useProduct } from "@/app/contexts/ProductProvider";

export default function Products({ search }: { search: string }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const { products } = useProduct();
  const filteredProducts = useMemo(() => {
    setCurrentPage(0);
    return search
      ? products.filter((item) =>
          item.size.toLowerCase().includes(search.toLowerCase())
        )
      : products;
  }, [search, products]);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (products.length === 0)
    return <div className="pl-[25px] pt-[20px]">Loading...</div>;
  else {
    return (
      <div className="w-[95%] flex flex-col mx-auto h-full">
        <div className="flex-grow overflow-y-auto custom-scrollbar flex-shrink-0">
          <table className="w-full border-2 border-gray-300 ">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left text-gray-700 p-3">Size</th>
                <th className="text-left text-gray-700 p-3">Thumbnail</th>
                <th className="text-left text-gray-700 p-3">Price</th>
                <th className="text-left text-gray-700 p-3">BlockNumber</th>
                <th className="text-left text-gray-700 p-3">PieceNumber</th>
                <th className="text-left text-gray-700 p-3">Color</th>
                <th className=" text-gray-700  py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-gray-400">
                    No results found.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <ProductRow key={item.id} item={item} />
                ))
              )}
            </tbody>
          </table>
        </div>
        {pageCount > 1 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center items-center space-x-2 mt-4 mb-4 flex-shrink-0 "
            pageLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-md"
            previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 hover:text-gray-700"
            nextLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 hover:text-gray-700"
            activeLinkClassName="z-10 bg-blue-50 border-blue-300 text-blue-600"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        )}
      </div>
    );
  }
}
