import React from "react";
import { stripe } from "@/lib/stripe";
import { ProductList } from "@/components/general/product-list";
const Products = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return (
    <section className="py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-foreground">
        All Products
      </h1>
      <ProductList products={products.data} />
    </section>
  );
};

export default Products;
