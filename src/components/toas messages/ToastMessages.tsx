import { useEffect, Dispatch, SetStateAction } from "react";
import toast, { Toaster } from "react-hot-toast";

type PropType = {
  message: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const Toast = (props: PropType) => {
  const { message, setVisible } = props;

  useEffect(() => {
    if (message === "User logged in") {
      toast.success("Login Successful");
    } else if (message === "User does not exist") {
      toast.error("User does not exist");
    } else if (message === "Password is incorrect") {
      toast.error("Incorrect password");
    } else if (message === "Post created") {
      toast.success("Post created successfully");
    } else if (message === "Please fill in all fields") {
      toast.error("Please fill in all fields");
    } else if (message === "Please write something") {
      toast.error("Please write something");
    } else if (message === "That username is already in use") {
      toast.error("That username is already in use");
    } else if (message === "That email is already in use") {
      toast.error("That email is already in use");
    } else if (message === "User registered") {
      toast.success("Registration successful ");
    } else if (message === "Comment created successfully") {
      toast.success("Comment created successfully");
    } else if (message === "Follow request accepted") {
      toast.success("Follow request accepted");
    } else if (message === "Follow request rejected") {
      toast.success("Follow request rejected");
    }

    const id: number = setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return <></>;
};

export default Toast;
