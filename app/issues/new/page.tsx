import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssue = () => {
  return (
    <div className="max-w-xl flex flex-col space-y-4">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description" size={"3"} />
      <div>
        <Button>Submit New Issue</Button>
      </div>
    </div>
  );
};

export default NewIssue;
