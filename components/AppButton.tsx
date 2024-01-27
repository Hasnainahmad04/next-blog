import React from "react";

interface Props {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "green" | "black";
  className?: string;
}

const AppButton: React.FC<Props> = ({
  title,
  onClick,
  variant = "green",
  disabled,
  className,
}) => {
  const background = {
    green: "bg-green-700 hover:bg-green-800 ",
    black: "bg-black",
  };

  return (
    <button
      disabled={disabled}
      className={`duration-200 text-white px-3 py-1 rounded-full  ${background[variant]} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default AppButton;
