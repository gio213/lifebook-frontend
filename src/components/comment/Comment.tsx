import { useState, useEffect } from "react";
import { Cinput } from "../log in/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Toast from "../toas messages/ToastMessages";
export const Comment = (props: { writePost: string; post_id: number }) => {
  const api = "https://lifebookbackend.up.railway.app/api/create_comment";
  const token = document.cookie.split("=")[1];
  const [comment, setComment] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<string>("");

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const createPost = async () => {
    try {
      const response = await axios.post(
        api,
        { post_id: props.post_id, content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);

        return response.data;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    } finally {
      setVisible(true);
    }
  };

  const enterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (comment.length > 0 && e.key === "Enter") {
      createPost();
    }
  };

  useEffect(() => {
    setInterval(() => {
      if (visible) {
        setVisible(false);
      }
    }, 1000);
  }, [visible]);

  return (
    <div>
      {visible && (
        <Toast
          message={"Comment created successfully"}
          setVisible={setVisible}
        />
      )}
      <Cinput
        style={{ fontFamily: "monospace" }}
        type="text"
        placeholder="Write a comment and press enter"
        onChange={handleComment}
        onKeyPress={enterPressed}
      />
    </div>
  );
};
