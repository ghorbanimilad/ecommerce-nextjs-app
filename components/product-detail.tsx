"use client";
import Image from "next/image";
import Stripe from "stripe";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      quantity: 1,
      imageUrl: product.images ? product.images[0] : null,
    });
  };
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-around p-6 space-y-6 md:space-y-0 md:space-x-6">
      {product.images && product.images[0] && (
        <div className="relative h-[350px] shadow-xl overflow-hidden">
          <Image
            alt={product.name}
            src={product.images[0]}
            width={300}
            height={350}
            className="transition-opacity w-full shadow-xl rounded-xl h-[350px] object-cover duration-300 group-hover:opacity-80 ease-in-out"
          />
        </div>
      )}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.description && (
          <p className="text-gray-600 mb-2 text-sm">{product.description}</p>
        )}

        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-900">
            Price: ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        <div className="flex items-center space-x-4 mt-4">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => removeItem(product.id)}
          >
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button className="cursor-pointer" onClick={onAddItem}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
