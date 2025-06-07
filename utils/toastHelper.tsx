import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { toast } from "sonner";

export const successMessage = (message: string) => {
  return toast.success(message, {
    icon: <IoCheckmarkDoneCircle size={22} color="#12A594" />,
  });
};
