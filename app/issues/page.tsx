import prisma from "@/prisma/client";
import { getStatusBadgeColor } from "@/utils/helperFunctions";
import { Badge, Button, Table } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <section>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      <Table.Root variant="surface" className="mb-5">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                {issue.title}
                <div className="block md:hidden">
                  <Badge
                    variant="surface"
                    color={getStatusBadgeColor(issue.status)!}
                  >
                    {issue.status}
                  </Badge>
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <Badge
                  variant="surface"
                  color={getStatusBadgeColor(issue.status)!}
                >
                  {issue.status}
                </Badge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </section>
  );
};

export default IssuesPage;
