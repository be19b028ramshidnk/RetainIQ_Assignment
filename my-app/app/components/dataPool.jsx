"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";

export  function ContentCenter({ className, children }) {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        {children}
      </div>
    );
  }

  export default function CollectionModal({
    collectionData,
    setShowModal,
    onSelectProduct,
  }) {
    return (
      <ContentCenter className="fixed top-0 left-0 h-screen w-full bg-black bg-opacity-70 p-4 z-30">
        <div className="w-2/3 md:w-2/5 max-w-lg bg-white shadow rounded relative">
          <button
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            <MdCancel />
          </button>
          <div className="p-4 border-b border-gray-200">
            Select a design to link
          </div>
          <div className="p-4 grid grid-cols-4 gap-3">
            {collectionData.map((product, index) => (
              <div
                className="w-full flex flex-col gap-1 cursor-pointer"
                key={index}
                onClick={() => 
                  onSelectProduct({
                    url: product.img, 
                    name: product.text || "Unnamed", // Fallback to "Unnamed" if text is missing
                  })
                }
              >
                <div className="h-28 relative">
                  <Image
                    src={product.img}
                    alt="Product"
                    fill={true}
                    className="rounded object-cover object-top"
                    sizes="10rem"
                  />
                </div>
                <div className="text-sm font-medium">{product.text}</div>
              </div>
            ))}
          </div>
        </div>
      </ContentCenter>
    );
  }
