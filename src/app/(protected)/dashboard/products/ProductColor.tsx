"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

export default function ProductColors() {
  const { data: colors } = useSuspenseQuery({
    queryKey: ["getColors"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/api/productcolor");

      return await response.json();
    },
  });

  // console.log(colors);
  return (
    <div className="border-2 border-gray-200 mb-4 mt-2 p-2 rounded-md ">
      <select name="colors" id="colors">
        {colors.map((color: { id: number; name: string }, index: number) => (
          <option key={index} value={color.id}>
            {color.name}
          </option>
        ))}
      </select>
    </div>
  );
}
