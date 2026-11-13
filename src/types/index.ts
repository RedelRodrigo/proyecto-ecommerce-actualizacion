export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  createdAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  username: string;
  role: "admin" | "user";
  loginTime: string;
}
