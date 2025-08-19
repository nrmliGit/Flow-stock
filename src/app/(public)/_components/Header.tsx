import { MenuIcon } from "lucide-react";
import HeaderActions from "./HeaderActions";

export default function Header({ toggleWidth }: { toggleWidth: () => void }) {
  return (
    <header className="flex shrink-0 justify-between px-[20px] py-[17px] h-14 border-b-2 border-b-gray-200 ">
      <button onClick={toggleWidth} className="cursor-pointer">
        <MenuIcon className="text-blue-600" />
      </button>
      <HeaderActions />
    </header>
  );
}
