import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function SearcField({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center gap-2 h-full py-[5px] px-[15px] w-[300px]  border-2 border-gray-300 rounded-lg">
      <Search className="text-gray-400 w-[16px]" />
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Find products, orders, or customers..."
        className="focus:outline-none  w-full placeholder:text-gray-400 placeholder:text-[13px]"
      />
    </div>
  );
}
