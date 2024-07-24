"use client";

import Login from "@/components/admin-panel/Login";
import Sidebar from "@/components/admin-panel/Sidebar";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const isLoading = useAppSelector((store) => store.loadingReducer);
  const { data: session } = useSession();

  if (!session?.user) {
    return <Login />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-full">
        {/* <Navbar/> */}
        <div className="bg-gray-200 p-4 h-[calc(100vh-64px)]">{children}</div>
        {isLoading && <>Loading...</>}
      </div>
    </div>
  );
};

export default AdminLayout;
