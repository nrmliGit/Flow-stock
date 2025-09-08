"use client";

import { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { useCustomers } from "@/app/contexts/CustomerProvider";
import CustomerRow from "./CustomerRow";

export default function Customers({ search }: { search: string }) {
  const { customers, isPending } = useCustomers();
  if (isPending) {
    return <>Loading...</>;
  }
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const filteredCustomers = useMemo(() => {
    setCurrentPage(0);
    return search
      ? customers.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      : customers;
  }, [search, customers]);

  const pageCount = Math.ceil(filteredCustomers.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredCustomers.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (customers.length === 0) return <div>Loading...</div>;

  return (
    <div className="w-[95%] flex flex-col mx-auto h-full">
      <div className="w-[95%] flex flex-col mx-auto h-full">
        <div className="flex-grow overflow-y-auto custom-scrollbar flex-shrink-0">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="text-left text-gray-700 p-3 font-semibold">
                  Customer Name
                </th>
                <th className="text-left text-gray-700 p-3 font-semibold">
                  Phone
                </th>
                <th className="text-gray-700 p-3 font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-gray-500">
                    No results found.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <CustomerRow key={item.id} item={item} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {pageCount > 1 && (
        <div className="flex gap-45 items-center justify-center mt-6 mb-4">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-sm text-blue-600">
              Total{" "}
              <span className="font-medium">{filteredCustomers.length}</span>{" "}
              Orders
            </span>
            <span className="text-blue-400 mx-1">•</span>
            <span className="text-sm text-blue-600">
              <span className="font-medium">{currentPage + 1}</span> /{" "}
              {pageCount} Page
            </span>
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="flex items-center space-x-1"
            pageLinkClassName={`
        py-1.5 px-3.5 text-sm font-medium
        border border-blue-200 rounded-md
        text-gray-600 hover:bg-blue-50 hover:text-blue-600
        transition-colors duration-200
      `}
            previousLinkClassName={`
        py-1.5 px-3.5 text-sm font-medium
        border border-blue-200 rounded-l-md
        text-gray-600 hover:bg-blue-50 hover:text-blue-600
        transition-colors duration-200
      `}
            nextLinkClassName={`
        py-1.5 px-3.5 text-sm font-medium
        border border-blue-200 rounded-r-md
        text-gray-600 hover:bg-blue-50 hover:text-blue-600
        transition-colors duration-200
      `}
            activeLinkClassName={`
        !bg-blue-100 !border-blue-300 
        !text-blue-700 font-semibold
      `}
            breakClassName={`
        py-1.5 px-3 text-sm text-gray-400
      `}
            disabledLinkClassName={`
        opacity-40 cursor-not-allowed
        hover:bg-white hover:text-gray-600
      `}
          />
        </div>
      )}
    </div>
  );
}
