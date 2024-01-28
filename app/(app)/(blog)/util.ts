import { OutputData } from "@editorjs/editorjs";

const getBlogMetaData = (content: OutputData | undefined) => {
  const title = content?.blocks.find((val) => val.type == "header")?.data.text;
  const image = content?.blocks.find(
    (val) => val.type == "simpleImage" || val.type == "image"
  )?.data?.url;
  const paragraph = content?.blocks.find((val) => val.type == "paragraph")?.data
    .text;

  return { title, image, paragraph };
};

export { getBlogMetaData };
