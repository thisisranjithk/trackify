import { Skeleton } from "@/app/components/common";
import { Box, Card, Flex } from "@radix-ui/themes";

const IssueDetailsLoading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="4" className="my-2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose my-2">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailsLoading;
