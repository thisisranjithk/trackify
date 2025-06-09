import { Skeleton } from "@/app/components/common";
import { Box, Button } from "@radix-ui/themes";

const NewIssueLoading = () => {
  return (
    <Box className="max-w-xl flex flex-col space-y-4">
      <Skeleton height="2rem" className="mb-4" />
      <Skeleton height="15rem" className="mb-4" />
      <div>
        <Button>Create Issue</Button>
      </div>
    </Box>
  );
};

export default NewIssueLoading;
