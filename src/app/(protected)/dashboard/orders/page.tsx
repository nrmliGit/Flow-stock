"use client";
import { useState } from "react";
import SearcField from "../../../(public)/_components/SearcField";
import Orders from "./Orders";
import AddOrderButton from "./AddOrderButton";
import AddOrderModal from "./AddOrderModal";

export default function OrderPage() {
  const [search, setSearch] = useState<string>("");
  const [isAddOrderModalOpen, setAddOrderModalOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col flex-grow">
      <header className="flex justify-between items-center my-[10px] w-[95%] mx-auto flex-shrink-0">
        <span className="font-bold">Order list</span>
        <div className="flex gap-2">
          <AddOrderButton openModal={setAddOrderModalOpen} />
          <SearcField setSearch={setSearch} />
        </div>
      </header>
      <Orders search={search} />
      <AddOrderModal
        isOpen={isAddOrderModalOpen}
        onClose={setAddOrderModalOpen}
      />
    </div>
  );
}
