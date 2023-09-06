"use client"

import React, { SyntheticEvent, } from 'react'
import { useState } from 'react'
import type  {Brand} from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
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




export default function UpdateProduct( {brands, product} : {brands : Brand[], product : Product}) {

    const [isOpen, setIsOpen] = useState(false);
    const [title, settitle] = useState(product.title);
    const [price, setprice] = useState(product.price);
    const [brand, setbrand] = useState(product.brandId);
    const router = useRouter();
    const handleModal = ()=> {
        setIsOpen(!isOpen);
    }

    const eventUpdate = async (e : SyntheticEvent)=> {
        e.preventDefault();
        console.log(title)
        await axios.patch(`api/product/${product.id}`, {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })

        router.refresh();
        setIsOpen(false);
    }
  return (
    <div>
        <button className="text-white btn btn-info btn-sm" onClick={handleModal}>Edit</button>

        <div className={isOpen ? 'modal modal-open' : 'modal'}>
            <div className="modal-box">
                <div className="font-bold text-lg">{product.title}</div>
                <form action="" onSubmit={eventUpdate}>
                    <div className="form-control w-full">
                        <label  className="label font-bold">Product</label>
                        <input type="text" className="input input-border" placeholder='Product Name' value={title} onChange={(e) => settitle(e.target.value)} />
                    </div>


                    <div className="form-control w-full">
                        <label  className="label font-bold">Price</label>
                        <input type="text" className="input input-border" placeholder='Product Price' value={price} onChange={(e) => setprice(Number(e.target.value))} />
                    </div>

                    <div className="form-control w-full">
                        <label  className="label font-bold">Brand</label>
                        <select  className="select select-border" value={brand} onChange={(e) => setbrand(Number(e.target.value))}>
                            {brands.map((brand) => (
                                <option value={brand.id} key={brand.id}>{brand.name}</option>
                            ))}
                            
                        </select>
                    </div>
                
                <div className="modal-action">
                    <button className="btn" onClick={handleModal}>Close</button>
                    <button className="btn btn-primary" >Save</button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}
