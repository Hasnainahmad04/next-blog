import React from "react";

export default function Skeleton({ number }: { number: number }) {
  return Array(number)
    .fill(0)
    .map((el, index) => (
      <div
        key={index}
        className="w-[23%] max-sm:w-full max-md:w-[48%] max-w-sm bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-3 h-[400px] flex flex-col overflow-hidden"
      >
        <div className="h-[180px] duration-300 cursor-pointer bg-gray-300 animate-pulse m-3 rounded-lg"></div>
        <div className="mt-5 mx-5  bg-gray-300 h-[2rem] rounded-md animate-pulse"></div>
        <div className="my-2 mx-5  bg-gray-300 h-[2rem] rounded-md animate-pulse"></div>

        <div className="justify-end flex flex-1 flex-col px-5 py-5">
          <div className="bg-gray-300 w-[150px] h-[20px] mb-4 rounded-lg animate-pulse" />
          <div className="flex items-center justify-between">
            <span className="bg-gray-300 w-[100px] h-[30px] rounded-lg animate-pulse" />
            <div className="w-[100px] h-[40px] bg-gray-300 rounded-lg text-sm px-5 py-2.5 animate-pulse" />
          </div>
        </div>
      </div>
    ));
}
