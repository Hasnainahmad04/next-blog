import React, { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getBlogMetaData } from "../util";
import toast from "react-hot-toast";
// UI Components
import { Dialog, Divider, Slide } from "@mui/material";
import AppButton from "@components/AppButton";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
// Types
import type { OutputData } from "@editorjs/editorjs";
import { BlogPayload } from "@types";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  content: OutputData | undefined;
}

type Value = {
  title: string;
  tags: string[];
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const createPost = async (payload: BlogPayload) => {
  const res = fetch("/api/blog", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return (await res).json();
};

const PublishModal: React.FC<ModalProps> = ({
  content,
  isVisible,
  onClose,
}) => {
  const [{ title, tags }, setValue] = useState<Value>({
    title: "",
    tags: [],
  });
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate: publishPost, isPending } = useMutation({
    mutationFn: createPost,
    mutationKey: ["createPost"],
    onSuccess: () => {
      toast.success("Story Published");
      router.push("/");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { image, paragraph, title: defautlTitle } = getBlogMetaData(content);

  const handleTagChange = (val: string) => {
    const tags = val
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    setValue((val) => ({ ...val, tags }));
  };

  useEffect(() => {
    setValue((val) => ({ ...val, title: defautlTitle }));
  }, [defautlTitle]);

  const handlePublish = () => {
    publishPost({
      userId: session?.user.id!,
      title,
      tags,
      content: content!,
      ...(image ? { thumbnail: image } : {}),
    });
  };

  return (
    <>
      <Dialog
        open={isVisible}
        //@ts-ignore
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen
      >
        <section className="max-w-[1096px] py-[6rem] h-screen self-center flex flex-row max-md:flex-col max-md:py-4 px-4">
          <div className="w-full p-[2.5rem]">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-gray-700 p-8 h-[30px]"
            >
              <IoMdClose />
            </button>
            <h2 className="text-gray-800 font-semibold text-lg">
              Story Preview
            </h2>
            {image ? (
              <Image
                src={image}
                alt="Thumbnail"
                width={400}
                height={200}
                className="w-full my-3"
              />
            ) : (
              <div className="w-full bg-neutral-50 h-[200px] justify-center items-center flex my-3">
                <p className="text-center text-sm  text-neutral-500 mx-[2rem] md:mx-[5rem]">
                  Include a high-quality image in your story to make it more
                  inviting to readers.
                </p>
              </div>
            )}
            <textarea
              className="relative relaw-full text-xl font-semibold outline-none text-gray-800 resize-none text-wrap break-words"
              placeholder="Write a preview title"
              value={title}
              rows={3}
              maxLength={100}
              onChange={(e) =>
                setValue((val) => ({ ...val, title: e.currentTarget?.value }))
              }
            />
            <Divider />

            <p className="line-clamp-4 my-3 text-neutral-700 text-sm">
              {paragraph ?? "Content"}
            </p>
            <Divider />
          </div>
          <div className="w-full p-[2.5rem]">
            <span>Publishing</span>
            <label
              htmlFor="tags"
              className="block text-left my-5 text-neutral-800 text-sm"
            >
              Add or change topics (up to 5) so readers know what your story is
              about
            </label>
            <input
              type="text"
              name="tag"
              id="tags"
              className="w-full border border-gray-400 outline-none p-3"
              placeholder="Add topics followed by commas eg: Java, Typescript"
              onChange={(e) => handleTagChange(e.currentTarget.value)}
            />
            <div className="my-4">
              <AppButton
                title="Publish Now"
                className="px-4 py-2 text-sm"
                disabled={isPending || !title?.length}
                onClick={handlePublish}
              />
            </div>
          </div>
        </section>
      </Dialog>
    </>
  );
};

export default PublishModal;
