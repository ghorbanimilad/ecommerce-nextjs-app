import { Carousel } from "@/components/Carousel";
import { stripe } from "@/lib/stripe";
import { Metadata } from "next";
import Image from "next/image";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    
  });

  return (
    <div className="  ">
      <div className="mb-6">
        <div className=" back-header px-16 py-16 space-y-6">
          <p className="text-6xl max-w-[550px] bg-amber-700/40 rounded shadow selection:bg-yellow-700 drop-shadow-amber-400 tracking-tight line-clamp-[15px] font-bold uppercase text-white py-3 px-2">
            milad Ecommerce online website
          </p>
          <div className="flex items-center  gap-3">
            <Link
              href="/products"
              className="hover:bg-amber-900/70 font-semibold text-lg bg-amber-700/70  transition-all text-white border-2 rounded-4xl px-6 py-3"
            >
              Try to purches
            </Link>
            <Link
              href=""
              className="hover:bg-amber-900/70 font-semibold text-lg bg-amber-700/70 transition-all text-white hover:border rounded-4xl px-6 py-3"
            >
              Easy Shop
            </Link>
          </div>
        </div>
      </div>

      <div className="px-16">
        <h2 className="text-3xl font-bold mb-6">Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.data.map((product) => {
            const price = product.default_price;
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg hover:shadow-xl cursor-pointer shadow-md p-4 flex flex-col justify-between items-center"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-t-lg mb-4 object-cover h-48 w-full"
                />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                
                <span className="mb-3 ">{product.description}</span>
                <p className="text-gray-600 mb-4 flex flex-row gap-2 items-center">
                  Price:
                  {price && price.unit_amount  && (
                    <p> ${(price.unit_amount / 100).toFixed(2)}</p>
                  )}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="bg-amber-700 text-white  px-4 py-2 rounded hover:bg-amber-800 transition"
                >
                  View Product
                </Link>
              </div>
            );
          })}
        </div>
       
      </div>
    </div>
  );
}
