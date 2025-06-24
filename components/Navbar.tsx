"use client";
import { useCartStore } from "@/store/cart-store";
import { MenuIcon, ShoppingCartIcon, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md dark:bg-black border-b border-black/[.08] dark:border-white/[.145]">
      <div className="container flex mx-auto py-3 items-center justify-between px-3">
        <Link
          href="/"
          className="text-lg p-1 font-bold md:text-2xl hover:text-green-600 hover:rotate-x-360 transition-all duration-1000"
        >
          Ecommerce - Tutorial
        </Link>

        <div className=" space-x-6 mx-auto hidden md:flex">
          <Link
            href="/"
            className="hover:text-green-600 font-semibold text-gray-700 hover:hue-rotate-180 transition-all duration-500 p-1"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-green-600 font-semibold text-gray-700 hover:hue-rotate-180 transition-all duration-500 p-1"
          >
            Products
          </Link>
          <Link
            href="/checkout"
            className="hover:text-green-600 font-semibold text-gray-700 hover:hue-rotate-180 transition-all duration-500 p-1"
          >
            Check Out
          </Link>
        </div>
        <div className="flex items-center space-x-6 md:space-x-8">
          <Link href="/checkout">
            <span className="relative flex items-center justify-center text-center mx-auto">
              <ShoppingCartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 left-3.5 text-center text-sm font-bold h-5 w-5 bg-red-600/60 rounded-full text-white">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <MenuIcon className="h-8 w-8" />
            )}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md dark:bg-black border-t border-black/[.08] dark:border-white/[.145]">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link href="/" className="block hover:text-green-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-green-700">
                Products
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="block hover:text-green-700">
                Check Out
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
