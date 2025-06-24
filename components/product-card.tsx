import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}
export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="group hover:shadow-2xl transition-shadow duration-300 py-0 h-full flex flex-col ease-in-out">
        {product.images && product.images[0] && (
          <div className="relative w-full h-64 overflow-hidden">
            <Image
              alt={product.name}
              src={product.images[0]}
              width={300}
              height={300}
              className="transition-opacity w-full rounded-t-xl h-64 object-cover duration-300 group-hover:opacity-80 ease-in-out"
            />
          </div>
        )}

        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            {product.name}
          </CardTitle>
          <CardContent className="p-4 flex-grow flex flex-col justify-between">
            {product.description && (
              <p className="text-gray-600 mb-2 text-sm">
                {product.description}
              </p>
            )}

            {price && price.unit_amount && (
              <p className="text-lg font-semibold text-gray-900">
                Price: ${(price.unit_amount / 100).toFixed(2)}
              </p>
            )}
            <Button className="text-sm mt-2">View Details</Button>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
};
