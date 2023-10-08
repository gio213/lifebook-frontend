import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cinput } from "../log in/Login";
import { BlueBtn } from "../landing page/LandingPage";
export const Posts = () => {
  const api =
    "https://lifebookbackend.up.railway.app/api/get_feed_for_auth_user";
  const navigate = useNavigate();
  const [posts, setPosts] = useState<[]>([]);
  const [token, setToken] = useState("");
  const [writePost, setWritePost] = useState("");
  const [comment, setComment] = useState("");
  const [post_id, setPost_id] = useState();
  const [expired, setExpired] = useState(false);

  const getPosts = async (token = "") => {
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Handle unauthorized or other errors
        throw new Error("API request failed");
      }

      const data = await response.json();
      setPosts(data.result);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };
  const cookieToken = document.cookie.split("=")[1];

  useEffect(() => {
    // Function to fetch posts

    // Check if the token is present in the cookie or data contains invalid token

    if (cookieToken) {
      setToken(cookieToken);
      getPosts(cookieToken);
    } else {
      // Redirect to another page if the token is not present
      navigate("/login");
    }
  }, [navigate]);

  const calculateTime = (date: string) => {
    const currentDate = new Date();
    const postDate = new Date(date);

    const diff = currentDate.getTime() - postDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);

    // shows days hours minutes seconds
    if (hours > 24) {
      return `${Math.floor(hours / 24)} days ago`;
    } else if (minutes > 60) {
      return `${Math.floor(minutes / 60)} hours ago`;
    } else if (seconds > 60) {
      return `${Math.floor(seconds / 60)} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

  const handleWritePost = (e: any) => {
    setWritePost(e.target.value);
    return writePost;
  };

  const handlePostSubmit = () => {
    fetch("https://lifebookbackend.up.railway.app/api/create_post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: writePost }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWritePost("");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        getPosts(cookieToken);
      });
  };
  // enter press handler
  // const handleKeyPress = (e: any) => {
  //   if (e.key === "Enter" && writePost !== "") {
  //     handlePostSubmit();
  //   }
  // };

  const handleCommentCheck = (e: any) => {
    if (e.key === "Enter" && comment !== "") {
      createComment();
    }
  };

  const handleComment = (e: any) => {
    setComment(e.target.value);
    return comment;
  };

  const createComment = () => {
    fetch("https://lifebookbackend.up.railway.app/api/create_comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: comment, post_id: post_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComment("");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        getPosts(cookieToken);
        createComment();
      });
  };

  const handlePostClick = (post_id) => {
    setPost_id(post_id);
    return post_id;
  };

  return (
    <div style={{ width: "100%" }}>
      <PostsDiv>
        <InputDiv>
          <img
            style={{ width: "30px", height: "30px" }}
            src="  https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png
        "
            alt=""
          />
          <Cinput
            style={{
              width: "60%",
              backgroundColor: "#F2F2F2",
              borderRadius: "20px",
              margin: "0",
            }}
            type="text"
            placeholder="Write a post here..."
            value={writePost}
            onChange={handleWritePost}
          />
          <BlueBtn
            style={{
              width: "80px",
              height: "40px",
              padding: "0px 8px",
              border: "0",
              boxSizing: "border-box",
              borderRadius: "6px",
              backgroundColor: "#196bcf",
              color: "#ffffff",
              fontSize: "16px",
              lineHeight: "20px",
              fontFamily: "monospace",
            }}
            onClick={handlePostSubmit}
          >
            Post
          </BlueBtn>
        </InputDiv>
        {posts.length === 0 && <h1 style={{ fontSize: "30px" }}>Loading...</h1>}

        {posts?.map(({ author, content, created_at, post_id }) => {
          return (
            <PostDiv onClick={() => handlePostClick(post_id)} key={post_id}>
              <img
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                alt=""
              />
              <p>{author}</p>
              <h5>{content}</h5>

              <p> {calculateTime(created_at)}</p>
              <Cinput
                style={{ backgroundColor: "#F2F2F2" }}
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={handleComment}
              />
            </PostDiv>
          );
        })}
      </PostsDiv>
    </div>
  );
};

const PostsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f3f3f3;
`;

const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 300px;
  justify-content: flex-start;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  gap: 10px;
  transition: all 0.2s ease-in-out;
  &&:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;

const InputDiv = styled.div`
  display: flex;
  width: 40%;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  gap: 10px;
  transition: all 0.2s ease-in-out;
  &&:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;
