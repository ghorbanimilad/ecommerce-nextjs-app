"use client";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import React, { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="container mx-auto text-center px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment successfull!</h1>
      <p className="text-gray-800 mb-4">
        Thank you for your purchese. Your order is being processed.
      </p>

      <Link href={"/products"} className="hover:text-blue-600 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}
