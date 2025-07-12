"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";

export function CartIcon() {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <Link
      href="/cart"
      className="relative"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <Badge
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          variant="destructive"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
    </Link>
  );
}
