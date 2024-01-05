import ProductCard from "@components/ProductCard";
import { Product } from "@types";
import { getProducts } from "../products/actions";

const ProductList = ({ products }: { products: Product[] }) => {
  return products.map((item) => <ProductCard product={item} key={item.id} />);
};

const Users = async () => {
  const { products } = await getProducts({ pageParam: 0 });

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <ProductList products={products} />
    </div>
  );
};

export default Users;
