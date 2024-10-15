"use client";

import Header from "./components/header";
import SideNav from "./components/sideNaveBar";
import Table from "./components/table";


export default function Home() {
  return (
    <div className="text-gray-800">
      <SideNav />
      <div className="p-4 pl-20 w-full">
        <Header />
        <Table />
      </div>

    </div>
  );
}
