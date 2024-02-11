"use client";
import { OutputData } from "@editorjs/editorjs";
import { useState } from "react";
import PublishModal from "./PublishModal";
import WriteStoryNavbar from "./WriteStoryNavbar";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@components/Editor"), {
  ssr: false,
});

const CreateBlog = () => {
  const [isDialogOpen, setDialogVisibility] = useState(false);
  const [content, setContent] = useState<OutputData | undefined>();

  const handlePublish = () => {
    setDialogVisibility(true);
  };

  const isDisabled =
    !content || !content.blocks.some((el) => el.type === "paragraph");

  return (
    <>
      <div className="px-[10%] max-md:px-4">
        <WriteStoryNavbar
          onClickPublish={handlePublish}
          isDisabled={isDisabled}
        />

        <Editor data={content} onChange={setContent} holder="editor" />

        <PublishModal
          isVisible={isDialogOpen}
          onClose={() => setDialogVisibility(false)}
          content={content}
        />
      </div>
    </>
  );
};

export default CreateBlog;
