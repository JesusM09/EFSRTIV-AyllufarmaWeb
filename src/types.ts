export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  characteristics: string; // Asumido como un JSON de características
}