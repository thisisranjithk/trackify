"use client";
import { ErrorMessage, Spinner } from "@/app/components/common";
import { successMessage } from "@/utils/toastHelper";
import { createIssueSchema } from "@/utils/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IssueForm } from "../../new/page";
import DeleteIssue from "./DeleteIssue";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const EditIssue = () => {
  const { id } = useParams();
  const navigate = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`/api/issues/${id}`);
        const issue = res.data.data;

        // Set the data in form
        reset({
          title: issue.title,
          description: issue.description,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchIssue();
  }, [id]);

  const onUpdateIssue = async (data: IssueForm) => {
    try {
      const res = await axios.put(`/api/issues/${id}/edit`, data);
      if (res.data.success) {
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
      onSubmit={handleSubmit(onUpdateIssue)}
    >
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Flex gap="4">
        <Button type="submit" disabled={isSubmitting}>
          <UpdateIcon />
          Update {isSubmitting && <Spinner />}
        </Button>
        <DeleteIssue issueId={Number(id)} reset={reset} />
      </Flex>
    </form>
  );
};

export default EditIssue;
