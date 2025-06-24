import { Carousel } from "@/components/Carousel";
import { ProductList } from "@/components/Product-list";
import { Input } from "@/components/ui/input";
import { stripe } from "@/lib/stripe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Products() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return (
    <div>
      
      <ProductList products={products.data} />
    </div>
  );
}
