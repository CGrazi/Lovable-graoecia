import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { formatBRL } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/cafes/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={`Pacote do café ${product.name}`}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">
          Torra {product.roast.toLowerCase()}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-primary">{product.origin}</p>
        <h3 className="mt-2 text-xl font-semibold leading-tight">{product.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{product.notes.join(" · ")}</p>
        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="font-display text-2xl font-semibold">{formatBRL(product.price)}</p>
            <p className="text-xs text-muted-foreground">{product.weight}</p>
          </div>
          <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            Ver café
          </span>
        </div>
      </div>
    </Link>
  );
}
