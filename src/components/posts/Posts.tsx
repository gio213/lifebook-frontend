import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cinput } from "../log in/Login";
import { BlueBtn } from "../landing page/LandingPage";
import LinkPreviewComponent from "../linkPreview/LinkPreview";
import { useGetUSerData } from "../../hooks/useGetUserData";
import axios from "axios";
// import { fetchUrlData } from "../../hooks/useGetUserData";
export const Posts = () => {
  const api =
    "https://lifebookbackend.up.railway.app/api/get_feed_for_auth_user";
  const navigate = useNavigate();
  const [posts, setPosts] = useState<[]>([]);
  const [token, setToken] = useState("");
  const [writePost, setWritePost] = useState<string>("");
  const [comment, setComment] = useState("");
  const [post_id, setPost_id] = useState();

  const [userData, setUserData] = useState({});

  const { getUserData } = useGetUSerData();

  useEffect(() => {
    (async () => {
      const data = await getUserData();

      setUserData(data);
    })();
  }, []);

  const urlRegex = new RegExp(
    "^(https?:\\/\\/)?" +
      // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  const getPosts = async (token = "") => {
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("API request failed");
      }

      const { result } = response.data;

      const postsArray = [];

      for (const post of result) {
        if (!urlRegex.test(post.content)) {
          postsArray.push(post);
        } else {
          const previewData = await fetchUrlData(post.content);

          postsArray.push({ ...post, ...previewData });
        }
      }

      setPosts(postsArray);
    } catch (error) {
      console.error(error);
    }
  };
  const cookieToken = document.cookie.split("=")[1];

  const fetchUrlData = async (url) => {
    try {
      const response = await axios.get(
        `https://jsonlink.io/api/extract?url=${url}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (cookieToken) {
      setToken(cookieToken);
      getPosts(cookieToken);
    } else {
      navigate("/login");
    }
  }, [cookieToken, navigate]);

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

  const handleWritePost = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setWritePost("");
        alert("Post created successfully");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        getPosts(cookieToken);
      });
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>): string => {
    setComment(e.target.value);
    return comment;
  };

  const handlePostClick = (post_id: number): number => {
    setPost_id(post_id);

    return post_id;
  };

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <PostsDiv>
        <InputDiv>
          <ProfileImg
            src={
              userData?.profile_picture ||
              "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            }
            alt="profile picture"
          />
          <Cinput
            style={{
              width: "60%",
              backgroundColor: "#F2F2F2",
              borderRadius: "20px",
              margin: "20px",
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
        {posts.length === 0 && (
          <h1 style={{ fontSize: "30px", fontFamily: "monospace" }}>
            Loading...
          </h1>
        )}
        {writePost.length > 0 && urlRegex.test(writePost) ? (
          <LinkPreviewComponent writePost={writePost} />
        ) : (
          ""
        )}

        {posts?.map(
          ({
            author,
            content,
            created_at,
            post_id,
            images,
            description,
            url,
            title,
            domain,
            index,
            profile_picture,
          }) => {
            const hasContent = images?.[0]?.length > 3;

            return (
              <>
                {hasContent && (
                  <PostDiv key={post_id}>
                    <ProfileImg
                      src={
                        userData?.profile_picture ||
                        "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                      }
                      alt="profile picture"
                      onClick={() => navigate("/profile")}
                    />
                    <p>Author:{author}</p>
                    <PreviewImg
                      key={index}
                      src={images?.[0]}
                      {...{ onClick: () => window.open(url, "_blank") }}
                    />
                    <h5>Title: {title}</h5>
                    <DescriptionDiv>
                      <p>{description}</p>
                    </DescriptionDiv>
                    <p> {calculateTime(created_at)}</p>
                    <Cinput
                      style={{ backgroundColor: "#F2F2F2" }}
                      type="text"
                      placeholder="Write a comment..."
                      value={comment}
                      onChange={handleComment}
                    />
                    <p>Source:{domain}</p>
                  </PostDiv>
                )}
                <PostDiv onClick={() => handlePostClick(post_id)} key={post_id}>
                  <ProfileImg
                    src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                    alt=""
                  />

                  <p>Author:{author}</p>
                  <h5>Post: {content}</h5>

                  <p> {calculateTime(created_at)}</p>
                  <Cinput
                    style={{ backgroundColor: "#F2F2F2" }}
                    type="text"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={handleComment}
                  />
                </PostDiv>
              </>
            );
          }
        )}
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
  word-wrap: break-word;
`;

const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  justify-content: flex-start;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 35px;
  gap: 10px;
  border: 1px solid #8b8a8a;
  transition: all 0.2s ease-in-out;
  font-family: monospace;
  &&:hover {
    transform: scale(1.01);
  }
`;

const InputDiv = styled.div`
  display: flex;
  width: 45%;
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
  }
`;

export const PreviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  width: 350px;
  justify-content: flex-start;
  opacity: 0.8;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 35px;
  gap: 10px;
  border: 1px solid #8b8a8a;
  transition: all 0.2s ease-in-out;
  font-family: monospace;

  &&:hover {
    transform: scale(1.01);
  }
`;

export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  &&:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
const PreviewImg = styled.img`
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  &&:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;

const DescriptionDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  background-color: #c9c3c3;
  border-radius: 20px;
  word-wrap: break-word;
  P {
    max-width: 100%;
  }
`;
