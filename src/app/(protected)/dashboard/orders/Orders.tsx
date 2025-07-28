"use client";

import { useOrders } from "@/app/contexts/OrderProvider";
import { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import OrderRow from "./OrderRow";

export default function Orders({ search }: { search: string }) {
  const { orders } = useOrders();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const filteredOrders = useMemo(() => {
    setCurrentPage(0);
    return search
      ? orders.filter((item) =>
          item.customerName.toLowerCase().includes(search.toLowerCase())
        )
      : orders;
  }, [search, orders]);

  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredOrders.slice(offset, offset + itemsPerPage);

  //console.log(filteredOrders);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (orders.length === 0)
    return <div className="pl-[25px] pt-[20px]">Loading...</div>;

  return (
    <div className="w-[95%] flex flex-col mx-auto h-full">
      <div className="flex-grow overflow-y-auto custom-scrollbar flex-shrink-0">
        <table className="w-full  border-2 border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left text-gray-700 p-3  bg-gray-200 z-10">
                Customer
              </th>
              <th className="text-left text-gray-700 p-3  bg-gray-200 z-10">
                Status
              </th>
              <th className="text-left text-gray-700 p-3  bg-gray-200 z-10">
                Price
              </th>
              <th className="text-left text-gray-700 p-3  bg-gray-200 z-10">
                Unit
              </th>
              <th className="text-left text-gray-700 p-3  bg-gray-200 z-10">
                Quantity
              </th>

              <th className=" text-gray-700 py-3  bg-gray-200 z-10">Actions</th>
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
              currentItems.map((item) => <OrderRow key={item.id} item={item} />)
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
