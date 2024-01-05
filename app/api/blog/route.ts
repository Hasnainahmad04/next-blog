import prisma from "@util/client";
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
    const body = await req.json();

    return NextResponse.json(body);
  } catch (error) {}
};
