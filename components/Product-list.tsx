"use client";
import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { Input } from "./ui/input";
import { useState } from "react";

interface Props {
  products: Stripe.Product[];
}
export const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });
  return (
    <div>
      <div className="flex items-center justify-center border-b-4 shadow-lg mb-9 border-gray-200">
        <h1 className="px-16 py-6 text-3xl font-bold">All Products</h1>
        <div className="w-2/3">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4"
            placeholder="Search Prodcuts...."
          />
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 transition-shadow">
        {filteredProducts.map((product, key) => {
          return (
            <li key={key}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
