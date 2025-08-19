"use client";

import { useState } from "react";
import AddCustomerButton from "./AddCustomerButton";
import AddCustomerModal from "./AddCustomerModal";
import SearcField from "@/app/(public)/_components/SearcField";
import Customers from "./Customers";

export default function CustomerPage() {
  const [search, setSearch] = useState<string>("");
  const [isAddCustomerModalOpen, setAddCustomerModalOpen] =
    useState<boolean>(false);
  return (
    <div className="flex flex-col flex-grow">
      <header className="flex justify-between items-center my-[10px] w-[95%] mx-auto flex-shrink-0">
        <span className="font-bold">Customer list</span>
        <div className="flex gap-2">
          <AddCustomerButton openModal={setAddCustomerModalOpen} />
          <SearcField setSearch={setSearch} />
        </div>
      </header>
      <Customers search={search} />
      <AddCustomerModal
        isOpen={isAddCustomerModalOpen}
        onClose={setAddCustomerModalOpen}
      />
    </div>
  );
}
