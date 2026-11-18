import type { Product } from "@/types";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const mapProduct = (p: FakeStoreProduct): Product => ({
  id: String(p.id),
  name: p.title,
  description: p.description,
  price: p.price,
  category: p.category,
  image: p.image,
});

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(PRODUCTS_URL);
  if (!response.ok) throw new Error("Error al obtener los productos");
  const data: FakeStoreProduct[] = await response.json();
  return data.map(mapProduct);
};
