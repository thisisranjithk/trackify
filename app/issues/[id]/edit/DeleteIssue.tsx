"use client";
import { deletedMessage } from "@/utils/toastHelper";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  reset: () => void;
  issueId: number;
}
const DeleteIssue = ({ reset, issueId }: Props) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useRouter();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setDeleteLoading(true);
      const res = await axios.delete(`/api/issues/${issueId}/edit`);
      if (res.data.success) {
        deletedMessage(res.data.message);
        reset();
        setDeleteLoading(false);
        navigate.push("/issues");
      }
    } catch (error) {
      setDeleteLoading(false);
      console.log(error);
    }
  };

  return (
    <Button
      color="red"
      disabled={deleteLoading}
      onClick={(e) => handleDelete(e)}
    >
      <TrashIcon />
      Delete {deleteLoading && <Spinner />}
    </Button>
  );
};

export default DeleteIssue;
