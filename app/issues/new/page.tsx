"use client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssue = () => {
  return (
    <div className="max-w-xl flex flex-col space-y-4">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE placeholder="Description" />
      <div>
        <Button>Submit New Issue</Button>
      </div>
    </div>
  );
};

export default NewIssue;
