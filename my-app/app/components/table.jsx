"use client"
import React, { useCallback, useState } from 'react';
import TableCell from './tableCell';
import update from 'immutability-helper';
import TableRow from './tableRow';
import toast, { Toaster } from 'react-hot-toast';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";


const Table = () => {

  const [states, setStates] = useState([{ id: 1, name: '1' }]);
  const [variants, setVariants] = useState([{ id: 1, name: 'Primary Variant' }]);

  // For adding a new row
  const addState = () => {
    const newState = { id: states.length + 1, name: `${states.length + 1}` };
    setStates([...states, newState]);
    toast.success('State added');
  };

  // For removing a row
  const removeState = (id) => {
    setStates(states.filter(state => state.id !== id));
    toast.error('State removed');
  };

  // For adding a new column
  const addVariant = () => {
    const newVariant = { id: variants.length + 1, name: `Variant ${variants.length + 1}` };
    setVariants([...variants, newVariant]);
    toast.success('Variant added');
  };

  // For removing a column
  const removeVariant = (id) => {
    setVariants(variants.filter(variant => variant.id !== id));
    toast.error('Variant removed');
  };

  // For drag and drop
  const moveRow = useCallback((dragIndex, hoverIndex) => {
    setStates((prevStates) =>
      update(prevStates, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevStates[dragIndex]],
        ],
      }),
    )
  }, []);



  return (
    <div className="container mx-auto my-4 bg-[#F9FBFC] p-4 border border-TextGreyLight">
      <div className="overflow-x-auto">
        <table className="max-w-full">
          <thead>
            <tr>
              <TableCell className="sticky-header left-0 border-none w-[80px]">{" "}</TableCell>
              <TableCell className="text-TextGrey w-[300px] sticky-header left-[96px]">Product Filter</TableCell>
              <TableCell className="max-w-[600px]">
                <div className='flex items-center justify-between gap-3'>
                  <div className="flex space-x-4 overflow-x-auto hidden-scrollbar">
                    {variants.map((variant) => (
                      <div key={variant.id} className="min-w-[200px] flex items-center justify-between gap-3 border-r">
                        <p className="text-TextGrey">{variant.name}</p>
                        <button onClick={() => removeVariant(variant.id)} className="cursor-pointer ">
                          <FaRegTrashAlt className='fill-red-600 cursor-pointer ml-10' />
                        </button>
                        <button >
                          <BsThreeDotsVertical alt="Remove" width={20} height={20} className='w-[20px] h-[20px]' />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </TableCell>
            </tr>
          </thead>
          {/* body of table */}
          <tbody>
            {states.map((state, index) => (
              <TableRow
                key={state.id}              
                index={index}
                id={state.id}
                state={state}
                variants={variants}
                removeState={removeState}
                addVariant={addVariant}
                moveRow={moveRow}
              />
            ))}
          </tbody>
          {/* footer of table */}
          <tfoot>
            <tr>
              <TableCell className="sticky-header left-0">
              <button onClick={addState} className="flex m-4 p-2 bg-white rounded-lg shadow-md items-center">
                <FaPlus className="inline" />
              </button>
              </TableCell>
            </tr>
          </tfoot>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default Table;
