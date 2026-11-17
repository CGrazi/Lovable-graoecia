import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/data/products";
import { formatBRL, itemKey } from "@/lib/cart";
import { readLastOrder, type PlacedOrder } from "@/lib/order";

export const Route = createFileRoute("/pedido-confirmado")({
  head: () => ({
    meta: [
      { title: "Pedido recebido — Grão & Cia" },
      { name: "description", content: "Recebemos seu pedido de cafés especiais. Obrigado por comprar na Grão & Cia!" },
      { property: "og:title", content: "Pedido recebido — Grão & Cia" },
      { property: "og:description", content: "Obrigado por comprar na Grão & Cia!" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const [order, setOrder] = useState<PlacedOrder | null | undefined>(undefined);
  useEffect(() => setOrder(readLastOrder()), []);

  if (order === undefined) return <div className="min-h-[50vh]" />;

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-4xl font-semibold">Nenhum pedido recente</h1>
        <Button asChild variant="hero" size="xl" className="mt-8">
          <Link to="/cafes">Ver os cafés</Link>
        </Button>
      </div>
    );
  }

  const c = order.customer;
  return (
    <div className="mx-auto max-w-2xl px-5 pt-16">
      <div className="animate-rise text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <p className="eyebrow mt-6 text-primary">Pedido {order.number}</p>
        <h1 className="mt-3 text-5xl font-semibold">Obrigado, {c.name.split(" ")[0]}!</h1>
        <p className="mt-4 text-muted-foreground">
          Recebemos seu pedido. Em breve entraremos em contato por {c.email} ou {c.phone} com o valor
          do frete e as instruções de pagamento via {c.payment.toLowerCase()}.
        </p>
      </div>

      <div className="mt-12 rounded-3xl bg-card p-7 shadow-soft">
        <h2 className="text-2xl font-semibold">Resumo</h2>
        <ul className="mt-5 divide-y divide-border">
          {order.items.map((i) => {
            const p = getProduct(i.slug);
            return (
              <li key={itemKey(i)} className="flex justify-between py-3 text-sm">
                <span>
                  <span className="font-semibold">{i.quantity}× {p?.name ?? i.slug}</span>
                  <span className="block text-muted-foreground">{i.grind}</span>
                </span>
                <span className="font-semibold">{formatBRL(i.price * i.quantity)}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex justify-between border-t border-border pt-4">
          <span className="font-semibold">Total dos cafés</span>
          <span className="font-display text-2xl font-semibold">{formatBRL(order.subtotal)}</span>
        </div>
        <div className="mt-6 rounded-2xl bg-secondary/60 p-5 text-sm">
          <p className="font-semibold">Entrega</p>
          <p className="mt-1 text-muted-foreground">
            {c.street}, {c.number}
            {c.complement ? ` — ${c.complement}` : ""} · {c.district} · {c.city}/{c.state} · CEP {c.cep}
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="espresso" size="xl">
          <Link to="/cafes">Voltar à loja</Link>
        </Button>
      </div>
    </div>
  );
}
