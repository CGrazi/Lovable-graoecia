import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-espresso text-espresso-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">Grão &amp; Cia</p>
          <p className="mt-3 max-w-xs text-sm text-espresso-foreground/70">
            Cafés especiais torrados em pequenos lotes, com carinho, toda semana.
          </p>
        </div>
        <div>
          <p className="eyebrow text-accent">Loja</p>
          <ul className="mt-3 space-y-2 text-sm text-espresso-foreground/80">
            <li><Link to="/cafes" className="hover:text-espresso-foreground">Todos os cafés</Link></li>
            <li><Link to="/carrinho" className="hover:text-espresso-foreground">Carrinho</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-accent">Torra fresca</p>
          <p className="mt-3 text-sm text-espresso-foreground/80">
            Torramos às segundas e quintas e enviamos em até 2 dias úteis após a torra.
          </p>
        </div>
      </div>
      <div className="border-t border-espresso-foreground/10 py-5 text-center text-xs text-espresso-foreground/50">
        © {new Date().getFullYear()} Grão &amp; Cia
      </div>
    </footer>
  );
}
