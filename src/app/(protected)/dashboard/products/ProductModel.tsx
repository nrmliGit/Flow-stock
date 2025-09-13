"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

export default function ProductModels() {
  const { data: models } = useSuspenseQuery({
    queryKey: ["getModels"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/api/productmodel");

      return await response.json();
    },
  });
  return (
    <div className="border-2 border-gray-200 mb-4 mt-2 p-2 rounded-md ">
      <select name="productModelId" id="productModelId">
        {models.map((model: { id: number; name: string }, index: number) => (
          <option key={index} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}
