"use client";

import { DndProvider } from "react-dnd";
import Header from "./components/header";
import SideNav from "./components/sideNaveBar";
import Table from "./components/table";
import { HTML5Backend } from 'react-dnd-html5-backend';



export default function Home() {
  return (
    <div className="text-gray-800">
      <SideNav />
      <div className="p-4 pl-20 w-full">
        <Header />
        <DndProvider backend={HTML5Backend}>
          <Table />
        </DndProvider>
      </div>

    </div>
  );
}
