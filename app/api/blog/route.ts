import { Prisma } from "@prisma/client";
import { BlogPayload } from "@types";
import { calculateReadingTime, getTextFromBlocks } from "@util";
import prisma from "@util/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const users = await prisma.article.findMany({
      include: { author: true },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    NextResponse.json("Something went wrong", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body: BlogPayload = await req.json();

    const { content, title, tags, thumbnail, userId } = body || {};
    const articleContent = getTextFromBlocks(content);
    const readTime = calculateReadingTime(articleContent);
    const article = await prisma.article.create({
      data: {
        content: JSON.stringify(content, null, 2),
        title,
        tags,
        ...(thumbnail ? { thumbnail } : {}),
        readTime,
        userId,
      },
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.log({ error });

    return NextResponse.json(
      { message: "Something Went Wrong" },
      { status: 500 }
    );
  }
};
