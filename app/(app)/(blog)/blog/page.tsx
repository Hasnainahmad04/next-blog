import Link from "next/link";
import { LuPencilLine } from "react-icons/lu";

const Blog = () => {
  return (
    <div>
      <div className="flex justify-end mx-10 max-md:mx-4">
        <Link
          href={"/write-story"}
          className="border border-green-700 rounded-md text-green-700 px-3 py-1.5 flex flex-row items-center gap-2 hover:shadow-lg duration-200"
        >
          <LuPencilLine /> Write
        </Link>
      </div>
    </div>
  );
};

export default Blog;
