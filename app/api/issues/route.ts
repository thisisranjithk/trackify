import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validate = createIssueSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 });
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
