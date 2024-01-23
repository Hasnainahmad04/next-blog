"use client";
import AvatarDropdown from "@components/AvatarDropdown";
import { Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Editor from "@components/Editor";
import { OutputData } from "@editorjs/editorjs";

const Nav = ({
  isDisabled = false,
  onPublish,
}: {
  isDisabled?: boolean;
  onPublish?: () => void;
}) => {
  return (
    <div className="w-full flex justify-between items-center text-black">
      <Link href={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="38"
          height="38"
          viewBox="0 0 50 50"
        >
          <path d="M30,43h17l-4-4l-0.027-28.496l3.891-4.49H34.845l-9.24,22.73L15.497,6H3l4,5.091v24.195L1,43h14l-6-7.714V13.75L22,43 l-0.002,0.014L34,13.545V39L30,43z M10.911,41H5.089L8,37.258L10.911,41z M21.922,37.899L10.828,12.938L8.633,8h5.564l9.581,21.556 l0.805,1.81L21.922,37.899z M35.414,40.414L36,39.828V39V13.545v-5.06l0.191-0.47h6.293l-1.022,1.18l-0.489,0.565l0.001,0.747 L41,39.002l0.001,0.827l0.585,0.585L42.172,41h-7.343L35.414,40.414z"></path>
        </svg>
      </Link>

      <div className="flex flex-row gap-3">
        <button
          disabled={isDisabled}
          onClick={onPublish}
          className={`${
            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
          } bg-green-700 rounded-3xl px-3 py-1 text-white hover:bg-green-800 duration-200 ${
            isDisabled && "opacity-30"
          }`}
        >
          Publish
        </button>
        <AvatarDropdown />
      </div>
    </div>
  );
};

const CreateBlog = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [isDialogOpen, setDialogVisibility] = useState(false);
  const [content, setContent] = useState<OutputData | undefined>();

  const log = () => {
    setDialogVisibility(true);
  };

  return (
    <>
      <div className="px-[10%] max-md:px-4">
        <Nav onPublish={log} />

        <Editor data={content} onChange={setContent} holder="editor" />

        <PublishModal
          isVisible={isDialogOpen}
          onClose={() => setDialogVisibility(false)}
          thumbnail={thumbnail}
          content={""}
        />
      </div>
    </>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PublishModal = ({
  isVisible,
  onClose,
  thumbnail,
  content,
}: {
  isVisible: boolean;
  onClose: () => void;
  thumbnail?: string;
  content: string;
}) => {
  return (
    <>
      <Dialog
        open={isVisible}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen
      >
        <div className="px-10 max-md:px-4 py-10 flex justify-end">
          <button onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="py-[5rem] px-[10rem] h-full w-full flex flex-row gap-4 max-md:flex-col max-md:py-4 max-md:px-4">
          <div className="w-full">
            <h2 className="text-gray-800 font-semibold text-sm">
              Story Preview
            </h2>
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="Thumbnail"
                width={400}
                height={200}
                className="my-3"
              />
            ) : (
              <div className="max-md:w-full w-[400px] my-3 bg-gray-200 h-[200px] justify-center items-center flex">
                <p className="font-mono text-center p-6 text-neutral-500  ">
                  Include a high-quality image in your story to make it more
                  inviting to readers.
                </p>
              </div>
            )}
            <textarea
              className="w-full text-3xl outline-none text-gray-800 resize-none"
              placeholder="Title..."
              rows={3}
            />
            <Divider />

            <p
              className="line-clamp-4 my-3"
              dangerouslySetInnerHTML={{ __html: content }}
            ></p>
            <Divider />
          </div>
          <div className="w-full">
            <h2>Publishing</h2>
            <label
              htmlFor="tags"
              className="block text-left my-5 text-gray-400 font-mono text-sm"
            >
              Add or change topics (up to 5) so readers know what your story is
              about
            </label>
            <input
              type="text"
              name="tag"
              id="tags"
              className="w-full border-2 border-gray-400 outline-none p-3"
              placeholder="Add topics followed by commas eg: Java, Typescript"
            />
            <button onClick={onClose}>close</button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateBlog;
