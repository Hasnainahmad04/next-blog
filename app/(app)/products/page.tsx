"use client";
import CustomSelect from "@components/CustomSelect";
import ProductCard from "@components/ProductCard";
import { Options, Product } from "@types";
import { useEffect, useState } from "react";
import { getCategories, getProducts, getProductByCategory } from "./actions";
import { capatialize } from "@util";
import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import Skeleton from "@components/Skeleton";
import { useInView } from "react-intersection-observer";
import Loader from "@components/Loader";

const ProductList = ({ products }: { products: Product[] | undefined }) => {
  return products?.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));
};

const Products = () => {
  const {
    data: products,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    getNextPageParam: (lastPage) => {
      return lastPage.skip + lastPage.limit == lastPage.total
        ? undefined
        : lastPage.skip + lastPage.limit;
    },
    initialPageParam: 0,
    select: ({ pages }): Product[] => {
      return pages.map(({ products }) => products).flat();
    },
  });

  const { data: categories, isFetching: isFetchingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: filteredData,
    mutate,
    isPending,
  } = useMutation({
    mutationFn: (category: string | null) => getProductByCategory(category),
    mutationKey: ["productByCategory"],
  });

  const { ref, inView } = useInView();
  const [isFiltered, setIsFiltered] = useState(false);

  const options: Options[] = [
    { value: null, label: "All" },
    ...(categories?.map((category) => ({
      label: capatialize(category),
      value: category,
    })) || []),
  ];

  const handleChange = (val: any) => {
    mutate(val?.value);
    val ? setIsFiltered(true) : setIsFiltered(false);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFiltered) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="flex justify-end items-end mx-[2.5%]">
        <CustomSelect
          options={options}
          onChange={handleChange}
          placeholder="Select Category..."
          isLoading={isFetchingCategories}
        />
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        {isLoading || isPending ? (
          <Skeleton number={isPending ? 8 : 20} />
        ) : (
          <ProductList
            products={filteredData?.length ? filteredData : products}
          />
        )}
      </div>

      <section
        className="my-3 flex justify-center w-full items-center"
        ref={ref}
      >
        {hasNextPage && inView && isFetchingNextPage && !isFiltered && (
          <div>
            <Loader />
          </div>
        )}
      </section>
    </>
  );
};

export default Products;
