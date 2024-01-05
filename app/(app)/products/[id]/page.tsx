"use client";
import ImageCard from "@components/ImageCard";
import StarRating from "@components/StarRating";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { getProductById } from "../actions";
import { notFound } from "next/navigation";
import Loader from "@components/Loader";

const ProductDetail = ({ params: { id } }: { params: { id: string } }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { data: product, isFetching } = useQuery({
    queryKey: ["Product", id],
    queryFn: () => getProductById(id),
  });

  if (product?.message) return notFound();

  return isFetching ? (
    <div className="flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <section className="flex flex-row gap-6 max-md:flex-col px-10 max-md:px-0">
      <div>
        <div className="w-[300px] h-[300px] max-md:w-full max-md:h-[200px] p-3 bg-neutral-50 flex justify-center items-center mb-5 rounded-lg border border-gray-200">
          <Image
            src={product?.images[selectedImageIndex] ?? ""}
            alt="Image"
            width={300}
            height={300}
            className="rounded-lg mix-blend-multiply max-md:w-full max-md:h-[180px] "
          />
        </div>
        <div className="flex flex-row gap-3 ">
          {product?.images.map((image, index) => (
            <ImageCard
              image={image}
              key={index}
              isSelected={index === selectedImageIndex}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="min-h-[300px] flex flex-col">
        <h2 className="text-3xl font-semibold text-neutral-950">
          {product?.title}
        </h2>
        <p className="my-4 text-gray-500 text-pretty capitalize w-[90%]">
          {product?.description}
        </p>
        <StarRating rate={product?.rating ?? 0} />
        <h1 className="text-3xl text-blue-700 font-medium">{`$${product?.price}`}</h1>
        <div className="flex flex-1 flex-col justify-end">
          <button className="w-[200px] max-md:w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
