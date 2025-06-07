import prisma from "@/prisma/client";
import { createIssueSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validate = createIssueSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: "Issue created successfully",
      data: newIssue,
    },
    { status: 201 }
  );
}
