import prisma from "@util/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const users = await prisma.user.findMany({
    include: { Article: true, Session: true },
  });
  return NextResponse.json(users);
};
