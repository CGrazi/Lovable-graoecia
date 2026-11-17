import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/product-card";
import { useCart } from "@/components/store/cart-provider";
import { GRINDS, getProduct, products, type Grind } from "@/data/products";
import { clampQty, formatBRL, MAX_QTY } from "@/lib/cart";

export const Route = createFileRoute("/cafes/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Café não encontrado — Grão & Cia" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    const title = `${p.name} — Grão & Cia`;
    const description = `${p.short} Notas de ${p.notes.join(", ").toLowerCase()}. ${formatBRL(p.price)} (${p.weight}).`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-4xl font-semibold">Café não encontrado</h1>
      <p className="mt-3 text-muted-foreground">Esse café pode ter esgotado ou mudado de nome.</p>
      <Button asChild variant="hero" size="lg" className="mt-8">
        <Link to="/cafes">Ver todos os cafés</Link>
      </Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [grind, setGrind] = useState<Grind>(GRINDS[0]);
  const [qty, setQty] = useState(1);
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const handleAdd = () => {
    addItem({ slug: product.slug, grind, quantity: qty, price: product.price });
    toast.success(`${qty}× ${product.name} no carrinho`, {
      description: grind,
      action: { label: "Ver carrinho", onClick: () => navigate({ to: "/carrinho" }) },
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pt-10">
      <Link to="/cafes" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
        ← Voltar aos cafés
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="overflow-hidden rounded-[2rem] bg-muted shadow-soft">
          <img
            src={product.image}
            alt={`Pacote do café ${product.name}`}
            width={1024}
            height={1024}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <div className="animate-rise">
          <p className="eyebrow text-primary">{product.origin}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{product.short}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.notes.map((n) => (
              <span key={n} className="rounded-full bg-accent/50 px-3 py-1 text-sm font-semibold text-accent-foreground">
                {n}
              </span>
            ))}
          </div>

          <p className="mt-8 font-display text-4xl font-semibold">
            {formatBRL(product.price)}
            <span className="ml-2 font-sans text-base font-normal text-muted-foreground">/ {product.weight}</span>
          </p>

          <div className="mt-8">
            <p className="text-sm font-semibold">Moagem</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {GRINDS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrind(g)}
                  aria-pressed={g === grind}
                  className={
                    g === grind
                      ? "rounded-2xl border-2 border-primary bg-primary/10 px-4 py-3 text-left text-sm font-semibold"
                      : "rounded-2xl border-2 border-border bg-card px-4 py-3 text-left text-sm hover:border-primary/50"
                  }
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-border bg-card">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => setQty((q) => clampQty(q - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-secondary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                disabled={qty >= MAX_QTY}
                onClick={() => setQty((q) => clampQty(q + 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-secondary disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button variant="hero" size="xl" onClick={handleAdd} className="flex-1 sm:flex-none">
              <ShoppingBag /> Adicionar ao carrinho
            </Button>
          </div>

          <p className="mt-10 leading-relaxed text-foreground/85">{product.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 rounded-3xl bg-secondary/60 p-6 text-sm">
            {[
              ["Variedade", product.variety],
              ["Processo", product.process],
              ["Altitude", product.altitude],
              ["Torra", product.roast],
              ["Pontuação SCA", `${product.score} pontos`],
              ["Peso", product.weight],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="text-3xl font-semibold">Você também pode gostar</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
