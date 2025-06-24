import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import React from "react";

export default async function ProductPage({
  params,
}: {
  params: { id: any };
}) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });
  const plainProduct = JSON.parse(JSON.stringify(product));
  return (
    <div>
      <div className="flex container mx-auto my-6 items-center justify-center border-b-4 shadow-lg mb-9 border-gray-200">
      <ProductDetail product={plainProduct} />
      </div>

      <div className="border-t-2 border-gray-200 mt-4">
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        </div>
      </div>
    </div>
  );
}
