"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";

import React from "react";
import { checkoutAcction } from "./checkout-acction";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold my-2">Checkout List</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle>Order Summery</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="border px-4 py-5 border-gray-200 divide-y divide-gray-200">
            {items.map((item, key) => (
              <li
                key={key}
                className="flex flex-col py-2 border-b last:border-0 gap-2"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center space-x-3 mt-7">
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => removeItem(item.id)}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    className="cursor-pointer"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>

                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t pt-4 text-lg font-semibold">
            <h2 className="text-lg font-bold">
              Total: ${(total / 100).toFixed(2)}
            </h2>
          </div>
        </CardContent>
      </Card>

      <form action={checkoutAcction} className="mx-auto mt-6 max-w-md">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" className="w-full cursor-pointer">
          Proceed to payment
        </Button>
      </form>
    </div>
  );
}
