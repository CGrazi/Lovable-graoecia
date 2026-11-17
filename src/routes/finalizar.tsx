import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/components/store/cart-provider";
import { getProduct } from "@/data/products";
import { formatBRL, itemKey } from "@/lib/cart";
import {
  checkoutSchema,
  makeOrderNumber,
  PAYMENT_METHODS,
  saveLastOrder,
  UFS,
  type CheckoutData,
} from "@/lib/order";

export const Route = createFileRoute("/finalizar")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido — Grão & Cia" },
      { name: "description", content: "Informe seus dados de entrega e pagamento para concluir seu pedido de cafés." },
      { property: "og:title", content: "Finalizar pedido — Grão & Cia" },
      { property: "og:description", content: "Conclua seu pedido de cafés especiais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function Field({ label, error, children, className }: { label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-sm font-semibold">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}

const fieldClass = "h-11 rounded-xl bg-card";

function CheckoutPage() {
  const { items, subtotal, ready, clear } = useCart();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { payment: "Pix" },
  });

  if (!ready) return <div className="min-h-[50vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-4xl font-semibold">Nada para finalizar ainda</h1>
        <p className="mt-3 text-muted-foreground">Adicione um café ao carrinho para fazer seu pedido.</p>
        <Button asChild variant="hero" size="xl" className="mt-8">
          <Link to="/cafes">Ver os cafés</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = (data: CheckoutData) => {
    saveLastOrder({
      number: makeOrderNumber(),
      createdAt: new Date().toISOString(),
      customer: data,
      items,
      subtotal,
    });
    clear();
    navigate({ to: "/pedido-confirmado" });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pt-14">
      <Link to="/carrinho" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
        ← Voltar ao carrinho
      </Link>
      <h1 className="mt-4 text-5xl font-semibold">Finalizar pedido</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <fieldset className="rounded-3xl bg-card p-7 shadow-soft">
            <legend className="sr-only">Seus dados</legend>
            <h2 className="text-2xl font-semibold">Seus dados</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Nome completo" error={errors.name?.message} className="sm:col-span-2">
                <Input className={fieldClass} autoComplete="name" {...register("name")} />
              </Field>
              <Field label="E-mail" error={errors.email?.message}>
                <Input className={fieldClass} type="email" autoComplete="email" {...register("email")} />
              </Field>
              <Field label="Telefone / WhatsApp" error={errors.phone?.message}>
                <Input className={fieldClass} type="tel" autoComplete="tel" placeholder="(11) 98765-4321" {...register("phone")} />
              </Field>
            </div>
          </fieldset>

          <fieldset className="rounded-3xl bg-card p-7 shadow-soft">
            <legend className="sr-only">Endereço de entrega</legend>
            <h2 className="text-2xl font-semibold">Endereço de entrega</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-6">
              <Field label="CEP" error={errors.cep?.message} className="sm:col-span-2">
                <Input className={fieldClass} inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" {...register("cep")} />
              </Field>
              <Field label="Rua" error={errors.street?.message} className="sm:col-span-4">
                <Input className={fieldClass} autoComplete="address-line1" {...register("street")} />
              </Field>
              <Field label="Número" error={errors.number?.message} className="sm:col-span-2">
                <Input className={fieldClass} {...register("number")} />
              </Field>
              <Field label="Complemento (opcional)" error={errors.complement?.message} className="sm:col-span-4">
                <Input className={fieldClass} autoComplete="address-line2" {...register("complement")} />
              </Field>
              <Field label="Bairro" error={errors.district?.message} className="sm:col-span-2">
                <Input className={fieldClass} {...register("district")} />
              </Field>
              <Field label="Cidade" error={errors.city?.message} className="sm:col-span-3">
                <Input className={fieldClass} autoComplete="address-level2" {...register("city")} />
              </Field>
              <Field label="Estado" error={errors.state?.message} className="sm:col-span-1">
                <select
                  className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  defaultValue=""
                  {...register("state")}
                >
                  <option value="" disabled>UF</option>
                  {UFS.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset className="rounded-3xl bg-card p-7 shadow-soft">
            <legend className="sr-only">Pagamento</legend>
            <h2 className="text-2xl font-semibold">Pagamento</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enviamos as instruções de pagamento e o valor do frete por e-mail ou WhatsApp após o pedido.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-border px-4 py-3 text-sm font-semibold has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                >
                  <input type="radio" value={m} className="accent-primary" {...register("payment")} />
                  {m}
                </label>
              ))}
            </div>
            {errors.payment && <p className="mt-2 text-xs font-medium text-destructive">{errors.payment.message}</p>}

            <Field label="Observações (opcional)" error={errors.notes?.message} className="mt-6">
              <Textarea className="min-h-24 rounded-xl bg-card" placeholder="Ex.: deixar na portaria, é presente…" {...register("notes")} />
            </Field>
          </fieldset>
        </div>

        <aside className="h-fit rounded-3xl bg-espresso p-7 text-espresso-foreground shadow-soft lg:sticky lg:top-24">
          <h2 className="text-2xl font-semibold">Seu pedido</h2>
          <ul className="mt-5 space-y-4">
            {items.map((i) => {
              const p = getProduct(i.slug);
              if (!p) return null;
              return (
                <li key={itemKey(i)} className="flex gap-3 text-sm">
                  <img src={p.image} alt="" width={1024} height={1024} loading="lazy" className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold">{i.quantity}× {p.name}</p>
                    <p className="text-espresso-foreground/60">{i.grind}</p>
                  </div>
                  <p className="font-semibold">{formatBRL(i.price * i.quantity)}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 space-y-2 border-t border-espresso-foreground/15 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-espresso-foreground/70">Frete</span>
              <span>Combinado após o pedido</span>
            </div>
            <div className="flex items-end justify-between pt-2">
              <span className="font-semibold">Total dos cafés</span>
              <span className="font-display text-3xl font-semibold">{formatBRL(subtotal)}</span>
            </div>
          </div>
          <Button type="submit" variant="hero" size="xl" className="mt-7 w-full" disabled={isSubmitting}>
            Confirmar pedido
          </Button>
        </aside>
      </form>
    </div>
  );
}
