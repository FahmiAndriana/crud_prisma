import Image from 'next/image'
import Link from 'next/link'
import Product from './product/product'

export default function Home() {
  return (
    <main className="bg-white w-full h-full">
{/*    
     <p>Hallo</p>
     <Link href="/product"> <a>Product</a></Link> */}
     <Product/>
    </main>
  )
}
