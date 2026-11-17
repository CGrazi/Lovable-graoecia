import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Leaf, Truck } from "lucide-react";
import hero from "@/assets/hero-cafe.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/product-card";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grão & Cia — Cafés especiais torrados em pequenos lotes" },
      {
        name: "description",
        content:
          "Cafés especiais de Minas, Bahia e Espírito Santo, torrados toda semana. Escolha seu café, a moagem e receba em casa.",
      },
      { property: "og:title", content: "Grão & Cia — Cafés especiais torrados em pequenos lotes" },
      {
        property: "og:description",
        content: "Cafés especiais brasileiros torrados toda semana, do nosso torrador para a sua xícara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featured = ["mantiqueira-bourbon-amarelo", "chapada-diamantina-natural", "espresso-da-casa"]
  .map((s) => products.find((p) => p.slug === s)!)
  .filter(Boolean);

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={hero}
          alt="Xícara de café fumegante ao lado de grãos torrados e um pacote kraft"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl items-center px-5 py-24">
          <div className="max-w-xl animate-rise text-espresso-foreground">
            <p className="eyebrow text-accent">Torrefação artesanal</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.05] sm:text-6xl">
              Café fresquinho, torrado com calma.
            </h1>
            <p className="mt-5 text-lg text-espresso-foreground/80">
              Selecionamos grãos especiais de pequenos produtores brasileiros e torramos em lotes
              pequenos, toda semana, para chegar perfumado na sua casa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/cafes">Conhecer os cafés</Link>
              </Button>
              <Button asChild variant="cream" size="xl">
                <Link to="/cafes/$slug" params={{ slug: "espresso-da-casa" }}>
                  Nosso espresso
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:grid-cols-3">
          {[
            { icon: Flame, title: "Torra semanal", text: "Torramos às segundas e quintas." },
            { icon: Leaf, title: "Direto do produtor", text: "Microlotes com rastreio de origem." },
            { icon: Truck, title: "Envio para todo o Brasil", text: "Frete combinado após o pedido." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">Os queridinhos</p>
            <h2 className="mt-2 text-4xl font-semibold">Para começar bem o dia</h2>
          </div>
          <Link to="/cafes" className="text-sm font-semibold text-primary hover:underline">
            Ver todos os cafés →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5">
        <div className="grain overflow-hidden rounded-[2rem] bg-espresso px-8 py-14 text-espresso-foreground sm:px-14">
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="eyebrow text-accent">Nossa história</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight">
                Uma pequena torrefação com cheiro de casa de vó.
              </h2>
            </div>
            <p className="text-espresso-foreground/80">
              A Grão &amp; Cia nasceu de uma mesa de cozinha, um torrador pequeno e muita vontade de
              dividir bons cafés. Hoje seguimos do mesmo jeito: provamos cada lote, ajustamos a torra
              à mão e embalamos tudo com cuidado.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
