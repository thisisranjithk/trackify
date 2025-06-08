import { Spinner } from "@radix-ui/themes";

const NewIssueLoading = () => {
  return (
    <p>
      Loading...
      <Spinner size="2" />
    </p>
  );
};

export default NewIssueLoading;
