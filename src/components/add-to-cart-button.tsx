"use client";

import { useCart } from "@/contexts/cart-context";

export interface AddToCardButtonProps {
  productId: number;
}

export function AddToCartButton({ productId }: AddToCardButtonProps) {
  const { addToCart } = useCart();

  function handleOnClickAddToCart() {
    addToCart(productId);
  }

  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white"
      onClick={handleOnClickAddToCart}
    >
      Add to Cart
    </button>
  );
}
