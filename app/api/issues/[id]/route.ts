import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json(
      {
        success: false,
        message: "Issue Not found!!",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: issue,
    },
    { status: 200 }
  );
}
