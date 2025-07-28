"use client";

import { LayoutDashboard, Receipt, StickyNote, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const asideItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <LayoutDashboard className="w-[18px]" />,
  },
  {
    name: "Orders",
    link: "/dashboard/orders",
    icon: <Receipt className="w-[18px]" />,
  },
  {
    name: "Customers",
    link: "/dashboard/customers",
    icon: <User className="w-[18px]" />,
  },
  {
    name: "Products",
    link: "/dashboard/products",
    icon: <StickyNote className="w-[18px]" />,
  },
];

export default function Aside() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <aside className="h-[100dvh]  border-r-2 border-r-gray-300">
      <div className="pl-[20px] pt-[10px] border-b-2 border-b-gray-300 pb-[15px]">
        <Link href="/">
          <img src="/images/logo.png" alt="logo" />
        </Link>
      </div>
      <ul className="mx-[25px] mt-[20px]">
        {asideItems.map((item, index) => (
          <Link href={item.link} key={index}>
            <li
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer rounded-lg p-[15px] text-[14px] flex gap-[10px]  ${
                activeIndex === index
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-200"
                  : "text-gray-500"
              } hover:bg-gray-100 hover:text-gray-900 transition-colors`}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}
