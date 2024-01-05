import React from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import Link from "next/link";
import { Product } from "@types";

interface Prop {
  product: Product;
}

const ProductCard: React.FC<Prop> = ({
  product: { thumbnail, price, rating, title, id },
}) => {
  return (
    <div className="w-[23%] max-sm:w-full max-md:w-[48%] max-w-sm bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-3 flex flex-col overflow-hidden">
      <Image
        src={thumbnail}
        alt="Image"
        width={200}
        height={200}
        className="rounded-xl w-[12rem] h-[12rem] self-center object-contain my-3"
      />
      <Link href={`/products/${id}`}>
        <h5 className="px-5 my-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 duration-300">
          {title}
        </h5>
      </Link>
      <div className="justify-end flex flex-1 flex-col px-5 pb-3">
        <StarRating rate={rating} />
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {`$${price}`}
          </span>
          <button className="text-white border hover:bg-gray-100 border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg  px-5 py-2.5 text-center">
            <Image src={"/cart.svg"} alt="cart-icon" width={30} height={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
