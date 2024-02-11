import { OutputData } from "@editorjs/editorjs";

const capatialize = (s: string): string => {
  const array = s.split(" ");
  const transformed = array.map(
    (str) => str.at(0)?.toUpperCase() + str.slice(1)
  );
  return transformed.join(" ");
};

const calculateReadingTime = (text: string): string => {
  // Average words per minute
  const averageWPM = 250;

  // Calculate word count (based on whitespace separation)
  const wordCount = text.trim().split(/\s+/).length;

  // Calculate reading time
  const readingTime = Math.ceil(wordCount / averageWPM);

  // Format the reading time
  const formattedReadingTime =
    readingTime > 1 ? readingTime + " mins" : "Less than 1 min";

  return formattedReadingTime;
};

const getTextFromBlocks = (data: OutputData): string => {
  let allText = "";
  data.blocks.forEach((block) => {
    if (block.type === "paragraph") {
      allText += block.data.text + "\n";
    } else if (block.type == "list") {
      block.data.items.forEach((item: string) => (allText += item + "\n"));
    }
  });
  return allText;
};

export { capatialize, calculateReadingTime, getTextFromBlocks };
