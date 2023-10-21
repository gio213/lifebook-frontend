import toast, { Toaster } from "react-hot-toast";

const Toast = (props: { message: string; loading: string }) => {
  return (
    <div>
      {props.loading === "Loading" ? toast.loading(props.message) : null}

      <Toaster />
    </div>
  );
};

export default Toast;
