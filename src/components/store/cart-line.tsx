import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { getProduct } from "@/data/products";
import { clampQty, formatBRL, itemKey, MAX_QTY, type CartItem } from "@/lib/cart";
import { useCart } from "./cart-provider";

export function CartLine({ item }: { item: CartItem }) {
  const { setQuantity, removeItem } = useCart();
  const product = getProduct(item.slug);
  if (!product) return null;
  const key = itemKey(item);

  return (
    <li className="flex gap-4 py-6 sm:gap-6">
      <Link to="/cafes/$slug" params={{ slug: product.slug }} className="shrink-0">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-24 w-24 rounded-2xl object-cover sm:h-28 sm:w-28"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div>
            <Link to="/cafes/$slug" params={{ slug: product.slug }} className="font-display text-lg font-semibold hover:text-primary">
              {product.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {item.grind} · {product.weight}
            </p>
          </div>
          <p className="font-semibold">{formatBRL(item.price * item.quantity)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-full border border-border bg-card">
            <button
              type="button"
              aria-label="Diminuir quantidade"
              onClick={() => setQuantity(key, clampQty(item.quantity - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
            <button
              type="button"
              aria-label="Aumentar quantidade"
              disabled={item.quantity >= MAX_QTY}
              onClick={() => setQuantity(key, clampQty(item.quantity + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(key)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" /> Remover
          </button>
        </div>
      </div>
    </li>
  );
}
