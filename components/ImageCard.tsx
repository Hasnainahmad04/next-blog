import Image from "next/image";
import React from "react";

interface Prop {
  image: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const ImageCard: React.FC<Prop> = ({ image, onClick, isSelected = false }) => {
  return (
    <div
      className={`bg-neutral-100 rounded-lg duration-200 overflow-hidden border border-gray-200 cursor-pointer w-[50px] h-[50px]  flex justify-center items-center ${
        isSelected ? "brightness-90" : ""
      }`}
      onClick={onClick}
    >
      <Image
        src={image}
        alt="Image"
        width={50}
        height={50}
        className="mix-blend-multiply w-full h-full object-contain"
      />
    </div>
  );
};

export default ImageCard;
