"use client";
import { successMessage } from "@/utils/toastHelper";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<IssueForm>();
  const navigate = useRouter();

  return (
    <form
      className="max-w-xl flex flex-col space-y-4"
      onSubmit={handleSubmit(async (data) => {
        const res = await axios.post("/api/issues", data);
        if (res.status === 201) {
          successMessage(res.data.message);
          reset();
          navigate.push("/issues");
        }
      })}
    >
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Issue"}
        </Button>
      </div>
    </form>
  );
};

export default NewIssue;
