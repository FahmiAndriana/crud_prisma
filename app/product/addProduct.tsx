"use client"

import React, { SyntheticEvent, } from 'react'
import { useState } from 'react'
import type  {Brand} from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation';



export default function AddProduct( {brands} : {brands : Brand[]}) {

    const [isOpen, setIsOpen] = useState(false);
    const [title, settitle] = useState('');
    const [price, setprice] = useState('');
    const [brand, setbrand] = useState('');
    const router = useRouter();
    const handleModal = ()=> {
        setIsOpen(!isOpen);
    }

    const eventSubmit = async (e : SyntheticEvent)=> {
        e.preventDefault();
        console.log(title)
        await axios.post('api/product', {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })

        settitle('');
        setprice('');
        setbrand('');
        router.refresh();
        setIsOpen(false);
    }
  return (
    <div>
        <button className="btn" onClick={handleModal}>Add New</button>

        <div className={isOpen ? 'modal modal-open' : 'modal'}>
            <div className="modal-box">
                <div className="font-bold text-lg">Add New Product</div>
                <form action="" onSubmit={eventSubmit}>
                    <div className="form-control w-full">
                        <label  className="label font-bold">Product</label>
                        <input type="text" className="input input-border" placeholder='Product Name' value={title} onChange={(e) => settitle(e.target.value)} />
                    </div>


                    <div className="form-control w-full">
                        <label  className="label font-bold">Price</label>
                        <input type="text" className="input input-border" placeholder='Product Price' value={price} onChange={(e) => setprice(e.target.value)} />
                    </div>

                    <div className="form-control w-full">
                        <label  className="label font-bold">Brand</label>
                        <select  className="select select-border" value={brand} onChange={(e) => setbrand(e.target.value)}>
                            <option value="" disabled>Select Brand</option>
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
