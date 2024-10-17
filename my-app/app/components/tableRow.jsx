"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import TableCell from './tableCell';
import { FaPlus, FaGripVertical } from "react-icons/fa6";
import CollectionModal from "./dataPool";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useDrag, useDrop } from 'react-dnd';

export const ItemTypes = {
    CARD: 'card',
};



const TableRow = ({ state, variants, removeState, index, id, addVariant, moveRow }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    row: null,
    column: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setCollectionData(data);
      } catch (e) {
        console.log("Error in fetching data", e);
      }
    };

    fetchData();
  }, []);

  // Function to handle product cell click and open modal
  const handleProductClick = (rowIndex, variantIndex) => {
    setSelectedProduct({ row: rowIndex, column: variantIndex });
    setShowModal(true);
  };

  // Function to update the selected product in the table
  const updateProduct = (selectedVariant) => {
    const updatedData = [...data];

    // Ensure the selected row and column exist before updating
    if (updatedData[selectedProduct.row] && updatedData[selectedProduct.row].variants[selectedProduct.column]) {
      updatedData[selectedProduct.row].variants[selectedProduct.column] = selectedVariant;
    } else {
      // Initialize row/variants if not present
      if (!updatedData[selectedProduct.row]) {
        updatedData[selectedProduct.row] = { id: selectedProduct.row, variants: [] };
      }
      updatedData[selectedProduct.row].variants[selectedProduct.column] = selectedVariant;
    }

    setData(updatedData);
    setShowModal(false); // Close the modal after product selection
  };

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <tr key={state.id} className="h-[200px] group" style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <TableCell className="sticky-header left-0 border-none">
        <button onClick={() => removeState(state.id)} className="cursor-pointer flex-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <FaRegTrashAlt alt="Remove" width={20} height={20} className='fill-red-600  cursor-pointer ml-7 w-[20px] h-[20px]' />
        </button>
        <div className='flex-center gap-3'>
          <h1 className="heading text-3xl md:text-3xl font-bold">{index + 1}</h1>
          <button className="cursor-pointer">
            <FaGripVertical alt="Drag" width={20} height={20} className='w-[20px] h-[20px]' />
          </button>
        </div>
      </TableCell>
      <TableCell className="sticky-header left-[96px] ">
        <div className="flex-center gap-2 border-dashed border-TextGreyLight rounded-md cursor-pointer p-3 custom-shadow w-[300px] h-[160px] bg-white">
          <button className="filterButton flex-center gap-3">
            <FaPlus alt="Add" width={20} height={20} className='w-[20px] h-[20px]' />
            <p className="text-TextGrey">Add Product Filter</p>
          </button>
        </div>
      </TableCell>
      <TableCell colSpan={variants.length}>
        <div className="flex space-x-4 overflow-x-auto hidden-scrollbar">
          {variants.map((variant) => (
            <div key={variant.id} className="min-w-[200px]">
              <div
                className="flex-center gap-2 border-dashed border-TextGreyLight rounded-md cursor-pointer p-3 custom-shadow w-[180px] h-[160px] bg-white relative"
                onClick={() => handleProductClick(state.id, variant.id)}
              >
                {data[state.id] && data[state.id].variants[variant.id] ? (
                  <div className="flex flex-col items-center gap-2">
                    <FaEdit className="absolute bottom-14 left-14 flex size-8 m-4 p-2 bg-white rounded-lg shadow-md items-center opacity-0 group-hover:opacity-100" />
                    <Image
                      src={data[state.id].variants[variant.id].url}
                      alt={data[state.id].variants[variant.id]?.name || "No Name"}
                      width={70}
                      height={70}
                      className="w-[100px] h-[100px] object-cover object-top"
                    />
                    <h6 className="text-TextGrey">
                      {data[state.id].variants[variant.id]?.name?.length > 10
                        ? `${data[state.id].variants[variant.id].name.substring(0, 10)}...`
                        : data[state.id].variants[variant.id]?.name || "No Name"}
                    </h6>
                  </div>
                ) : (
                  <label className="filterButton flex-center gap-3 cursor-pointer bg-white absolute">
                    <FaPlus alt="Add" width={20} height={20} className="w-[20px] h-[20px]" />
                    <p className="text-TextGrey">Add design</p>
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <CollectionModal
            collectionData={collectionData}
            setShowModal={setShowModal}
            onSelectProduct={updateProduct}
          />
        )}
      </TableCell>

      <TableCell className="border-none">
        <button onClick={addVariant} className="flex m-4 p-2 bg-white rounded-lg shadow-md items-center">
          <FaPlus className="inline" />
        </button>
      </TableCell>
    </tr>
  );
};

export default TableRow;

