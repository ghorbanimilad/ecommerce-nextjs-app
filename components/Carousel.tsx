"use client";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

interface ProductProps {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: ProductProps) => {
  const [cerrent, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);
  const currentProduct = products[cerrent];

  const price = currentProduct.default_price as Stripe.Price;

  return (
    <div className="flex overflow-x-auto space-x-4 p-4 w-1/2 mx-auto">
    <Card>
      {currentProduct.images && currentProduct.images[0] && (
        <div>
          <Image
            alt={currentProduct.name}
            layout="fill"
            objectFit="cover"
            src={currentProduct.images[0]}
          />
        </div>
      )}
      <CardContent>
        <CardTitle>{currentProduct.name}</CardTitle>
        {price && price.unit_amount && (
          <p>${(price.unit_amount / 100).toFixed(2)}</p>
        )}
      </CardContent>
    </Card>
    </div>
  );
};
