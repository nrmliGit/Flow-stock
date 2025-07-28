"use client";
import { useState } from "react";
import SearcField from "@/app/(public)/_components/SearcField";
import Products from "./Products";
import AddProductButton from "./AddProductButton";
import AddProductModal from "./AddProductModal";

export default function ProductsPage() {
  const [search, setSearch] = useState<string>("");
  const [isAddProductModalOpen, setAddProductModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <header className="flex  justify-between items-center my-[10px] w-[95%]  mx-auto">
        <span className="font-bold">Products list</span>
        <div className="flex gap-2">
          <AddProductButton openModal={setAddProductModalOpen} />
          <SearcField setSearch={setSearch} />
        </div>
      </header>

      <Products search={search} />
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={setAddProductModalOpen}
      />
    </>
  );
}
