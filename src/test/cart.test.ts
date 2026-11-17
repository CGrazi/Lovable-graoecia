import { describe, expect, it } from "vitest";
import { addItem, cartCount, cartSubtotal, MAX_QTY, removeItem, setQuantity } from "@/lib/cart";
import { checkoutSchema } from "@/lib/order";
import { products } from "@/data/products";

const item = (slug: string, grind: string, quantity: number, price: number) => ({ slug, grind, quantity, price });

describe("carrinho", () => {
  it("soma o subtotal com preço × quantidade", () => {
    let items = addItem([], item("a", "Em grãos", 2, 52.9));
    items = addItem(items, item("b", "Em grãos", 1, 39.9));
    expect(cartSubtotal(items)).toBe(145.7);
    expect(cartCount(items)).toBe(3);
  });

  it("junta o mesmo café com a mesma moagem numa linha só", () => {
    let items = addItem([], item("a", "Em grãos", 1, 10));
    items = addItem(items, item("a", "Em grãos", 2, 10));
    expect(items).toHaveLength(1);
    expect(items[0]?.quantity).toBe(3);
  });

  it("separa o mesmo café com moagens diferentes", () => {
    let items = addItem([], item("a", "Em grãos", 1, 10));
    items = addItem(items, item("a", "Moagem fina (espresso)", 1, 10));
    expect(items).toHaveLength(2);
  });

  it("limita a quantidade entre 1 e o máximo", () => {
    const items = addItem([], item("a", "Em grãos", 1, 10));
    expect(setQuantity(items, "a__Em grãos", 0)[0]?.quantity).toBe(1);
    expect(setQuantity(items, "a__Em grãos", 999)[0]?.quantity).toBe(MAX_QTY);
  });

  it("remove um item", () => {
    const items = addItem([], item("a", "Em grãos", 1, 10));
    expect(removeItem(items, "a__Em grãos")).toHaveLength(0);
  });

  it("todo café do catálogo tem preço positivo", () => {
    for (const p of products) expect(p.price).toBeGreaterThan(0);
  });
});

describe("formulário de pedido", () => {
  const valid = {
    name: "Maria Silva",
    email: "maria@exemplo.com",
    phone: "(11) 98765-4321",
    cep: "01310-100",
    street: "Av. Paulista",
    number: "1000",
    complement: "",
    district: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    payment: "Pix",
    notes: "",
  };

  it("aceita um pedido completo", () => {
    expect(checkoutSchema.safeParse(valid).success).toBe(true);
  });

  it("recusa CEP sem 8 números", () => {
    expect(checkoutSchema.safeParse({ ...valid, cep: "0131" }).success).toBe(false);
  });

  it("recusa e-mail inválido", () => {
    expect(checkoutSchema.safeParse({ ...valid, email: "maria" }).success).toBe(false);
  });
});
