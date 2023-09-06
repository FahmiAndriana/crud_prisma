"use client"

import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Product from './product';
// import { Product } from '@prisma/client';

type Product = {
    id?: number;
    title?: string;
    price?: number;
    brandId?: number;
    brand?: {
        id?: number;
        name?: string;
    };
}




export default function DeleteProduct( {products} : {products : Product}) {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const router = useRouter();
  
    const handleDelete = async (productId: number) => {
    //   setIsLoading(true);
      await axios.delete(`/api/product/${productId}`);
    //   setIsLoading(false);
      router.refresh();
      setIsOpen(false);
    };
  
    const handleModal = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div>
        <button className="btn btn-error btn-sm text-white" onClick={handleModal}>
          Delete
        </button>
  
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are sure to delete {products.title}?
            </h3>
  
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                No
              </button>
              {/* {!isLoading ? ( */}
                <button
                  type="button"
                  onClick={() => handleDelete(products.id!)}
                  className="btn btn-primary"
                >
                  Yes
                </button>
              {/* ) : ( */}
                {/* <button type="button" className="btn loading">
                  Deleting...
                </button> */}
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    );
}
