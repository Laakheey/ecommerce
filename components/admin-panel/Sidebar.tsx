"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrTransaction } from "react-icons/gr";
import { IoAnalytics, IoSettings } from "react-icons/io5";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";

const menus = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    href: "/admin/dashboard",
  },
  {
    title: "Products",
    icon: <RiShoppingCartLine />,
    href: "/admin/products",
  },
  {
    title: "Accounts",
    icon: <MdManageAccounts />,
    href: "#",
  },
  {
    title: "Transactions",
    icon: <GrTransaction />,
    href: "#",
  },
  {
    title: "Analytics",
    icon: <IoAnalytics />,
    href: "#",
  },
  {
    title: "Setting",
    icon: <IoSettings />,
    href: "#",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-white w-[300px] min-h-screen p-4 shrink-0">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="logo" className="size-12 rounded-lg" />
        <h2 className="text-[20px] font-semibold">ZenithCrafts</h2>
      </div>

      <ul className="space-y-4 mt-6">
        {menus.map((menu, index) => (
          <Link
            href={menu.href}
            key={index}
            className={`flex gap-2 items-center p-4 rounded-lg cursor-pointer hover:bg-pink hover:text-white ${
              pathname === menu.href ? "bg-pink text-white" : "bg-gray-200"
            }`}
          >
            <div className="text-[20px]">{menu.icon}</div>
            <p>{menu.title}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
