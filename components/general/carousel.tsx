"use client";

import Stripe from "stripe";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

  const product = products[current];
  const price = product.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden rounded-xl border shadow">
      {product.images[0] && (
        <div className="relative h-64 w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-center text-white px-4">
        <CardTitle className="text-2xl font-semibold mb-2">
          {product.name}
        </CardTitle>
        {price?.unit_amount && (
          <p className="text-lg">${(price.unit_amount / 100).toFixed(2)}</p>
        )}
      </CardContent>
    </Card>
  );
};
