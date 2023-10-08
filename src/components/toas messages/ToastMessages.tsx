import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export const ToastMessages = ({ token, message, setToggle }) => {
  useEffect(() => {
    switch (token) {
      case "token":
        toast.success(message);
        break;
    }

    return () => {
      setToggle(false);
    };
  });

  return <Toaster position="top-center" reverseOrder={false} />;
};
