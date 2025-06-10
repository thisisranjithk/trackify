import { IssueStatusBadge } from "@/app/components/common";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return (
    <>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="4" className="my-2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose my-2">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Button mt="4">
        <Pencil2Icon />
        <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
      </Button>
    </>
  );
};

export default IssueDetailsPage;
