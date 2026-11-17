import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartLine } from "@/components/store/cart-line";
import { useCart } from "@/components/store/cart-provider";
import { formatBRL, itemKey } from "@/lib/cart";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Seu carrinho — Grão & Cia" },
      { name: "description", content: "Revise os cafés escolhidos antes de finalizar o pedido na Grão & Cia." },
      { property: "og:title", content: "Seu carrinho — Grão & Cia" },
      { property: "og:description", content: "Revise os cafés escolhidos antes de finalizar o pedido." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, count, ready } = useCart();

  if (!ready) return <div className="min-h-[50vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
          <Coffee className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-4xl font-semibold">Seu carrinho está vazio</h1>
        <p className="mt-3 text-muted-foreground">Que tal escolher um café para a próxima manhã?</p>
        <Button asChild variant="hero" size="xl" className="mt-8">
          <Link to="/cafes">Ver os cafés</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-14">
      <h1 className="text-5xl font-semibold">Seu carrinho</h1>
      <p className="mt-2 text-muted-foreground">
        {count} {count === 1 ? "pacote" : "pacotes"}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((i) => (
            <CartLine key={itemKey(i)} item={i} />
          ))}
        </ul>

        <aside className="h-fit rounded-3xl bg-card p-7 shadow-soft lg:sticky lg:top-24">
          <h2 className="text-2xl font-semibold">Resumo</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold">{formatBRL(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Frete</dt>
              <dd>Combinado após o pedido</dd>
            </div>
          </dl>
          <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
            <span className="font-semibold">Total dos cafés</span>
            <span className="font-display text-3xl font-semibold">{formatBRL(subtotal)}</span>
          </div>
          <Button asChild variant="hero" size="xl" className="mt-7 w-full">
            <Link to="/finalizar">Finalizar pedido</Link>
          </Button>
          <Link to="/cafes" className="mt-4 block text-center text-sm font-semibold text-primary hover:underline">
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  );
}
