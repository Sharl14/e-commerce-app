"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCartIcon, AlignJustify, X } from "lucide-react";
import { Button } from "../ui/button";
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 786) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav className="sticky top-0 z-50 bg-white py-4 shadow p-2">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="hover:text-blue-500 text-2xl">
          Easy Buy
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Link href="/checkout" className="flex items-center gap-0.5">
              <ShoppingCartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <Button
            variant="ghost"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden"
          >
            {mobileOpen ? <X /> : <AlignJustify />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/" className="block hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="block hover:text-blue-600">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};

export default Navbar;
