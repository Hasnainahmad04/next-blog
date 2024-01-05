"use client";
import { Options } from "@types";
import React from "react";
import Select from "react-select";

interface Props {
  options: Options[] | undefined;
  placeholder?: string;
  onChange: (val: Options | null) => void;
  isLoading?: boolean;
}

const CustomSelect: React.FC<Props> = ({
  options,
  onChange,
  placeholder,
  isLoading,
}) => {
  return (
    <Select
      options={options}
      className="w-[200px]"
      onChange={(val) => onChange(val)}
      isClearable
      placeholder={placeholder}
      isDisabled={isLoading}
    />
  );
};

export default CustomSelect;
