import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/store/product-card";
import { products, type Roast } from "@/data/products";

export const Route = createFileRoute("/cafes/")({
  head: () => ({
    meta: [
      { title: "Nossos cafés especiais — Grão & Cia" },
      {
        name: "description",
        content: "Catálogo de cafés especiais torrados: do frutado e floral ao encorpado e achocolatado.",
      },
      { property: "og:title", content: "Nossos cafés especiais — Grão & Cia" },
      {
        property: "og:description",
        content: "Escolha entre torras claras, médias e escuras de microlotes brasileiros.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});

const filters: { label: string; roasts: Roast[] | null }[] = [
  { label: "Todos", roasts: null },
  { label: "Torras claras", roasts: ["Clara", "Média-clara"] },
  { label: "Torras médias", roasts: ["Média"] },
  { label: "Torras escuras", roasts: ["Média-escura", "Escura"] },
];

function Catalog() {
  const [active, setActive] = useState(0);
  const roasts = filters[active]?.roasts ?? null;
  const list = roasts ? products.filter((p) => roasts.includes(p.roast)) : products;

  return (
    <div className="mx-auto max-w-6xl px-5 pt-14">
      <p className="eyebrow text-primary">Catálogo</p>
      <h1 className="mt-2 text-5xl font-semibold">Nossos cafés</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Todos os pacotes têm 250 g e são torrados na semana do envio. Você escolhe a moagem na
        página de cada café.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f, i) => (
          <button
            key={f.label}
            onClick={() => setActive(i)}
            className={
              i === active
                ? "rounded-full bg-espresso px-4 py-2 text-sm font-semibold text-espresso-foreground"
                : "rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-accent"
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
