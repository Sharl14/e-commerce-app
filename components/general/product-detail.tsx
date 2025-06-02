"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart-store";

interface ProductDetailProps {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const { items, addItem, removeItem } = useCartStore();

  const price = product.default_price as Stripe.Price;
  const productImage = product.images?.[0];
  const formattedPrice = price?.unit_amount
    ? (price.unit_amount / 100).toFixed(2)
    : null;

  const handleAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images?.[0] ?? null,
      quantity: 1,
    });
  };

  const handleRemoveItem = () => {
    removeItem(product.id);
  };

  const cartItem = items.find((item) => item.id === product.id);
  const quantityInCart = cartItem?.quantity ?? 0;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {productImage && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            src={productImage}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition duration-300 hover:opacity-90"
          />
        </div>
      )}

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}

        {formattedPrice && (
          <p className="text-lg font-semibold text-gray-900">
            ${formattedPrice}
          </p>
        )}

        <div className="flex items-center space-x-4 mt-4">
          <Button variant="outline" onClick={handleRemoveItem}>
            –
          </Button>
          <span className="text-lg font-semibold">{quantityInCart}</span>
          <Button onClick={handleAddItem}>+</Button>
        </div>
      </div>
    </div>
  );
};
