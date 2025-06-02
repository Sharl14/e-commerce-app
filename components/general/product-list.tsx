"use client";

import Stripe from "stripe";
import { useState } from "react";
import { ProductCard } from "./product-card";
interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  const [search, setSearch] = useState("");
  const filtered = products.filter((product) => {
    const term = search.toLowerCase();
    const name = product.name.toLowerCase();
    const desc = product.description?.toLowerCase() || "";

    return name.includes(term) || desc.includes(term);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
