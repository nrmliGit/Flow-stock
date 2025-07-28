"use client";

import Aside from "@/app/(public)/_components/Aside";
import Header from "@/app/(public)/_components/Header";
import { PropsWithChildren, useState } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const toggleWidth = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div
      className={` grid transition-width h-screen ${
        isExpanded ? "grid-cols-[300px_1fr]" : "grid-cols-[0px_1fr] "
      }`}
    >
      <aside className="overflow-hidden h-full sticky top-0 flex-shrink-0">
        <Aside />
      </aside>
      <main className="flex flex-col h-screen overflow-hidden">
        <Header toggleWidth={toggleWidth} />
        {children}
      </main>
    </div>
  );
}
