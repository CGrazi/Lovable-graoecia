export type CartItem = {
  slug: string;
  grind: string;
  quantity: number;
  price: number;
};

export const MIN_QTY = 1;
export const MAX_QTY = 20;

export const clampQty = (n: number) =>
  Math.min(MAX_QTY, Math.max(MIN_QTY, Math.floor(Number.isFinite(n) ? n : MIN_QTY)));

export const itemKey = (i: Pick<CartItem, "slug" | "grind">) => `${i.slug}__${i.grind}`;

export function addItem(items: CartItem[], item: CartItem): CartItem[] {
  const key = itemKey(item);
  const existing = items.find((i) => itemKey(i) === key);
  if (existing) {
    return items.map((i) =>
      itemKey(i) === key ? { ...i, quantity: clampQty(i.quantity + item.quantity) } : i,
    );
  }
  return [...items, { ...item, quantity: clampQty(item.quantity) }];
}

export function setQuantity(items: CartItem[], key: string, quantity: number): CartItem[] {
  return items.map((i) => (itemKey(i) === key ? { ...i, quantity: clampQty(quantity) } : i));
}

export function removeItem(items: CartItem[], key: string): CartItem[] {
  return items.filter((i) => itemKey(i) !== key);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((n, i) => n + i.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0) * 100) / 100;
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const formatBRL = (v: number) => brl.format(v);
