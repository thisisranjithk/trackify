import { Spinner } from "@radix-ui/themes";

const IssueDetailsLoading = () => {
  return (
    <p>
      Loading...
      <Spinner size="2" />
    </p>
  );
};

export default IssueDetailsLoading;
