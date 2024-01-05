import { Product } from "@types";

interface response {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const getProducts = async ({ pageParam = 0 }: { pageParam: number }) => {
  const res = await fetch(
    `https://dummyjson.com/products?limit=20&skip=${pageParam}`
  );
  const productResp: response = await res.json();
  return productResp;
};

const getCategories = async () => {
  const res = await fetch("https://dummyjson.com/products/categories");
  const categories: string[] = await res.json();
  return categories;
};

const getProductByCategory = async (category: string | null) => {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const { products }: response = await res.json();
  return products;
};

const getProductById = async (id: string) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product: Product = await res.json();
  return product;
};

export { getCategories, getProducts, getProductByCategory, getProductById };
