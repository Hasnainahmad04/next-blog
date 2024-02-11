import { OutputData } from "@editorjs/editorjs";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Options {
  value: string | null;
  label: string;
}
export type BlogPayload = {
  title: string;
  content: OutputData;
  thumbnail?: string;
  tags: string[];
  userId: string;
};
