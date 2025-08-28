"use client";

import { useOrders } from "@/app/contexts/OrderProvider";
import { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import OrderRow from "./OrderRow";

export default function Orders({ search }: { search: string }) {
  const { orders, isPending } = useOrders();
  if (isPending) {
    return <>Loading...</>;
  }
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const filteredOrders = useMemo(() => {
    setCurrentPage(0);
    return search
      ? orders.filter((item) =>
          item.customer.name.toLowerCase().includes(search.toLowerCase())
        )
      : orders;
  }, [search, orders]);

  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredOrders.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (orders.length === 0)
    return <div className="pl-[25px] pt-[20px]">Loading...</div>;

  return (
    <div className="w-[95%] flex flex-col mx-auto h-full">
      <div className="w-[95%] flex flex-col mx-auto h-full">
        <div className="flex-grow overflow-y-auto custom-scrollbar flex-shrink-0">
          <table className="w-full border border-gray-100 rounded-lg  shadow-md bg-white">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="text-left text-gray-700 p-3 font-semibold">
                  Customer
                </th>
                <th className="text-left text-gray-700 p-3 font-semibold">
                  Phone
                </th>
                <th className="text-left text-gray-700 p-3 font-semibold">
                  Status
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
                  <OrderRow key={item.id} item={item} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pageCount > 1 && (
        <div className="flex gap-45 justify-center items-center mt-6 mb-4">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-sm text-blue-600">
              Total <span className="font-medium">{filteredOrders.length}</span>{" "}
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
