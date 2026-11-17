import mantiqueira from "@/assets/cafe-mantiqueira.jpg";
import cerrado from "@/assets/cafe-cerrado.jpg";
import chapada from "@/assets/cafe-chapada.jpg";
import espresso from "@/assets/cafe-espresso.jpg";
import sulDeMinas from "@/assets/cafe-sul-de-minas.jpg";
import caparao from "@/assets/cafe-caparao.jpg";

export type Roast = "Clara" | "Média-clara" | "Média" | "Média-escura" | "Escura";

export type Product = {
  slug: string;
  name: string;
  origin: string;
  variety: string;
  process: string;
  altitude: string;
  roast: Roast;
  score: number;
  notes: string[];
  price: number; // BRL, 250g
  weight: string;
  short: string;
  description: string;
  image: string;
};

export const GRINDS = [
  "Em grãos",
  "Moagem grossa (prensa francesa)",
  "Moagem média (coado)",
  "Moagem fina (espresso)",
] as const;
export type Grind = (typeof GRINDS)[number];

export const products: Product[] = [
  {
    slug: "mantiqueira-bourbon-amarelo",
    name: "Mantiqueira Bourbon Amarelo",
    origin: "Serra da Mantiqueira, MG",
    variety: "Bourbon Amarelo",
    process: "Natural",
    altitude: "1.350 m",
    roast: "Média",
    score: 86,
    notes: ["Caramelo", "Laranja", "Chocolate ao leite"],
    price: 52.9,
    weight: "250 g",
    short: "Doce e redondo, com acidez cítrica delicada.",
    description:
      "Colhido a dedo nas encostas frias da Mantiqueira, este Bourbon Amarelo tem doçura de caramelo e um toque de laranja que aparece conforme a xícara esfria. Perfeito para o café coado de todo dia.",
    image: mantiqueira,
  },
  {
    slug: "cerrado-mineiro-catuai",
    name: "Cerrado Mineiro Catuaí",
    origin: "Cerrado Mineiro, MG",
    variety: "Catuaí Vermelho",
    process: "Natural",
    altitude: "1.100 m",
    roast: "Média-escura",
    score: 84,
    notes: ["Chocolate amargo", "Castanhas", "Rapadura"],
    price: 44.9,
    weight: "250 g",
    short: "Encorpado e achocolatado, aconchego na xícara.",
    description:
      "Um clássico brasileiro: corpo cheio, baixa acidez e final longo de chocolate amargo. Vai muito bem puro ou com leite, no coador, na prensa ou na moka.",
    image: cerrado,
  },
  {
    slug: "chapada-diamantina-natural",
    name: "Chapada Diamantina Natural",
    origin: "Chapada Diamantina, BA",
    variety: "Catuaí Amarelo",
    process: "Natural",
    altitude: "1.250 m",
    roast: "Clara",
    score: 88,
    notes: ["Frutas vermelhas", "Mel", "Floral"],
    price: 64.9,
    weight: "250 g",
    short: "Frutado e floral, para quem gosta de explorar.",
    description:
      "Do sertão baiano vem um dos cafés mais premiados do país. Torra clara para preservar as notas de frutas vermelhas, mel de flores e um perfume floral marcante. Ideal no V60.",
    image: chapada,
  },
  {
    slug: "espresso-da-casa",
    name: "Espresso da Casa",
    origin: "Blend Sul de Minas + Cerrado",
    variety: "Mundo Novo e Catuaí",
    process: "Natural e cereja descascado",
    altitude: "1.000–1.200 m",
    roast: "Escura",
    score: 83,
    notes: ["Cacau", "Melaço", "Crema intensa"],
    price: 39.9,
    weight: "250 g",
    short: "Nosso blend para espresso: intenso e cremoso.",
    description:
      "A receita que servimos no balcão. Torra escura pensada para extrair um espresso de crema espessa, corpo denso e notas de cacau. Também fica ótimo em cappuccinos.",
    image: espresso,
  },
  {
    slug: "sul-de-minas-mundo-novo",
    name: "Sul de Minas Mundo Novo",
    origin: "Carmo de Minas, MG",
    variety: "Mundo Novo",
    process: "Cereja descascado",
    altitude: "1.200 m",
    roast: "Média-clara",
    score: 85,
    notes: ["Mel", "Amêndoas", "Maçã verde"],
    price: 47.9,
    weight: "250 g",
    short: "Leve, limpo e adocicado, para a manhã toda.",
    description:
      "Um café luminoso e equilibrado, com doçura de mel e um frescor de maçã verde. Fácil de gostar e excelente para quem está começando no mundo dos especiais.",
    image: sulDeMinas,
  },
  {
    slug: "caparao-fermentado",
    name: "Caparaó Fermentado",
    origin: "Caparaó, ES",
    variety: "Catucaí",
    process: "Fermentação anaeróbica",
    altitude: "1.400 m",
    roast: "Média-clara",
    score: 89,
    notes: ["Frutas tropicais", "Vinho", "Hibisco"],
    price: 72.9,
    weight: "250 g",
    short: "Edição especial: exótico, vinhoso e surpreendente.",
    description:
      "Microlote em fermentação anaeróbica que traz notas de frutas tropicais maduras, vinho tinto e hibisco. Uma experiência única para ocasiões especiais — tiragem limitada.",
    image: caparao,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
