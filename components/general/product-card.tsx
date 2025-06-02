import Link from "next/link";
import Stripe from "stripe";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  const imageUrl = product.images?.[0];

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border">
        {imageUrl && (
          <div className="relative h-56 w-full">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-t-md transition-opacity duration-300 group-hover:opacity-90"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex flex-col justify-between flex-grow">
          {product.description && (
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          )}
          {price?.unit_amount && (
            <p className="text-base font-semibold">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
          <Button className="mt-4 w-full bg-black text-white">
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};
