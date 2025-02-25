export type SkuCard = {
  newPrice: number;
  oldPrice?: number; 
  sold: number;
  rating: number;
  images: string[]; 
  variants: Record<string, unknown>; 
};

export type ProductCard = {
  name: string;
  slug: string;
  skus: SkuCard[]; 
}

