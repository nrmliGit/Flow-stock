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
    <aside className="h-[100dvh] border-r-2 border-r-gray-200 bg-white">
      <div className="pl-5 pt-3 border-b-2 border-b-gray-200 pb-4">
        <Link href="/">
          <img src="/images/logo.png" alt="logo" className="h-7" />
        </Link>
      </div>

      <ul className="mx-5 mt-5 space-y-1">
        {asideItems.map((item, index) => (
          <Link href={item.link} key={index}>
            <li
              onClick={() => setActiveIndex(index)}
              className={`
                cursor-pointer rounded-lg p-3 text-sm flex gap-3 items-center
                transition-all duration-200 ease-in-out
                ${
                  activeIndex === index
                    ? "bg-blue-50 text-blue-600 border-r-4 border-r-blue-500" // Aktif öğe stili
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600" // Normal/hover stili
                }
                hover:shadow-[inset_0_-1px_0_0_rgba(59,130,246,0.2),inset_0_1px_0_0_rgba(59,130,246,0.1)] 
                relative overflow-hidden
                group
              `}
            >
              {/* Border Efekti (Hover/Active durumunda alt ve sağ kenar) */}
              <div
                className={`
                absolute bottom-0 right-0 w-full h-0.5 bg-blue-400 
                ${
                  activeIndex === index
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }
                transition-opacity
              `}
              />
              <div
                className={`
                absolute top-0 right-0 w-0.5 h-full bg-blue-400 
                ${
                  activeIndex === index
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }
                transition-opacity
              `}
              />

              {/* İkon ve Metin */}
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}
