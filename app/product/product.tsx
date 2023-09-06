
import React from 'react'
import { PrismaClient } from '@prisma/client'
import AddProduct from './addProduct';
import DeleteProduct from './deleteProduct';
import UpdateProduct from './updateProduct';

const prisma = new PrismaClient();

const getProduct  = async ()=> {
    const result = await prisma.product.findMany(
        {
            select: {
                id: true,
                title: true,
                price: true,
                brandId: true,
                brand: true,
            }
        }
    );
    console.log('Hasil Result : ' + result)

    return result;
}
const getBrand  = async ()=> {
    const result = await prisma.brand.findMany(
        
    );
    console.log('Hasil Result : ' + result)

    return result;
}


export default async function Product()  {
    const [products, brands] = await Promise.all(
        [getProduct(), getBrand()]
    );
    // console.log(products);
  return (
    <div>
        <div className="mx-2 my-2 p-2">
            <AddProduct brands ={brands}/>
        </div>
        <table className='table w-full'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th className='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    
                    <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.brand.name}</td>
                    
                    <td>
                        <div className='flex flex-row gap-1 item-center justify-center'>

                        <UpdateProduct product ={product} brands={brands}/>
                        <DeleteProduct products ={product}/>
                        </div>
                        
                        </td>
                </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}
