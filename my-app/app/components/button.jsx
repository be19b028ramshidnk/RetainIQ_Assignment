"use client";

import React from "react";
import { FaPlus } from "react-icons/fa6";
const button = ({label="",toggle,design=true,r,c,rowIndexfn,colmIndexfn}) => {
  const getIndex=()=>{
    toggle(true)
    rowIndexfn(r)
    if(design){
      colmIndexfn(c)
    }
  }
  return (
    
      <button className="flex m-4 p-2 bg-white rounded-lg shadow-md items-center" onClick={getIndex}>
        <FaPlus className="inline" />
         &nbsp;{label}
      </button>
  );
};

export default button;

