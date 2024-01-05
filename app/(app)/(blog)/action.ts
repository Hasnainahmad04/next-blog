"use server";
import prisma from "@util/client";

const addBlog = async () => {
  await prisma.article.create({
    data: {
      title: "Test",
      userId: "clqnoz6qv00004gehrc14v94l",
      content: "<h1>content</h1>",
      tags: ["javascript"],
      thumbnail: "",
      likes: 1,
    },
  });
};

const getBlogs = async () => {
  const blogs = await prisma.article.findMany({
    include: { author: true },
  });

  return blogs;
};

export { addBlog, getBlogs };
