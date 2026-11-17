import { Link } from "@tanstack/react-router";
import { Coffee, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso text-espresso-foreground">
            <Coffee className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-semibold">Grão &amp; Cia</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium sm:gap-3">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
          >
            Início
          </Link>
          <Link
            to="/cafes"
            className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
          >
            Cafés
          </Link>
          <Link
            to="/carrinho"
            aria-label={`Carrinho com ${count} itens`}
            className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
