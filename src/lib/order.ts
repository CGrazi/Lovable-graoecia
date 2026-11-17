import { z } from "zod";
import type { CartItem } from "./cart";

export const PAYMENT_METHODS = ["Pix", "Cartão de crédito", "Boleto"] as const;

export const UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
] as const;

const digits = (v: string) => v.replace(/\D/g, "");

export const checkoutSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  phone: z
    .string()
    .trim()
    .refine((v) => digits(v).length >= 10 && digits(v).length <= 11, "Telefone com DDD, ex.: (11) 98765-4321"),
  cep: z.string().trim().refine((v) => digits(v).length === 8, "CEP deve ter 8 números"),
  street: z.string().trim().min(3, "Informe a rua").max(150, "Endereço muito longo"),
  number: z.string().trim().min(1, "Informe o número").max(10, "Número muito longo"),
  complement: z.string().trim().max(80, "Complemento muito longo").optional().or(z.literal("")),
  district: z.string().trim().min(2, "Informe o bairro").max(80, "Bairro muito longo"),
  city: z.string().trim().min(2, "Informe a cidade").max(80, "Cidade muito longa"),
  state: z.enum(UFS, { errorMap: () => ({ message: "Escolha o estado" }) }),
  payment: z.enum(PAYMENT_METHODS, { errorMap: () => ({ message: "Escolha a forma de pagamento" }) }),
  notes: z.string().trim().max(500, "Máximo de 500 caracteres").optional().or(z.literal("")),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;

export type PlacedOrder = {
  number: string;
  createdAt: string;
  customer: CheckoutData;
  items: CartItem[];
  subtotal: number;
};

const LAST_ORDER_KEY = "grao-cia-last-order";

export function makeOrderNumber(date = new Date()) {
  const rand = Math.floor(Math.random() * 9000 + 1000);
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `GC-${ymd}-${rand}`;
}

export function saveLastOrder(order: PlacedOrder) {
  window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
}

export function readLastOrder(): PlacedOrder | null {
  try {
    const raw = window.sessionStorage.getItem(LAST_ORDER_KEY);
    return raw ? (JSON.parse(raw) as PlacedOrder) : null;
  } catch {
    return null;
  }
}
