"use client";
import { successMessage } from "@/utils/toastHelper";
import { createIssueSchema } from "@/utils/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const navigate = useRouter();

  const onFormSubmit = async (data: IssueForm) => {
    try {
      const res = await axios.post("/api/issues", data);
      if (res.status === 201) {
        successMessage(res.data.message);
        reset();
        navigate.push("/issues");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="max-w-xl flex flex-col space-y-4"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      {errors.title && (
        <Text color="red" as="p" className="pb-2">
          {errors.title.message}
        </Text>
      )}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      {errors.description && (
        <Text color="red" as="p" className="pb-2">
          {errors.description.message}
        </Text>
      )}
      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Issue"}
        </Button>
      </div>
    </form>
  );
};

export default NewIssue;
