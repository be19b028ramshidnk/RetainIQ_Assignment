import { FaArrowLeft } from "react-icons/fa6";
import React from "react";

export default function Header() {
    return (
        <div className=" w-full border-b border-gray-200 pb-4">

          <div className="flex w-100 items-center">
            <div className="w-5/6">
              <div className='flex m-4 gap-8 items-center'>
                <FaArrowLeft className="flex size-6 fill-dark-300 cursor-pointer" />
                <h1 className='text-3xl font-bold font-reloceta'>
                  Rules creation
                </h1>
              </div>
              <div className="h-0.5 w-96 ml-5 bg-dark-300">
              </div>
            </div>
            <button className="bg-green-100 text-white h-12 px-4 rounded-lg">
              Publish Feed
            </button>
          </div>
          
        </div>
    )
}