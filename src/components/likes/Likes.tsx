import likeIcon from "../../assets/like-icon-default.png";
import likedIncon from "../../assets/liked-icon.png";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export const Likes = (props: { post_id: string; likes: number; liked: "" }) => {
  const [like, setLike] = useState<boolean>(false);

  const api = "https://lifebookbackend.up.railway.app/api/post_like";
  const token = document.cookie.split("=")[1];
  const [likes, setLikes] = useState<number>(props.likes);

  const postLike = async () => {
    try {
      const response = await axios.post(
        api,
        { post_id: props.post_id },
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
    }
  };
  const unLikePost = async () => {
    const api = "https://lifebookbackend.up.railway.app/api/unlike_post";
    try {
      axios.delete(api, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          post_id: props.post_id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (props.liked === "true") {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [props.liked]);

  return (
    <LikeDiv>
      {like ? (
        <img
          src={likedIncon}
          alt="like"
          onClick={() => {
            setLike(false);
            unLikePost();
            setLikes(likes - 1);
          }}
        />
      ) : (
        <img
          src={likeIcon}
          alt="like"
          onClick={() => {
            setLike(true);
            postLike();
            setLikes(likes + 1);
          }}
        />
      )}
      <p>{likes}</p>
    </LikeDiv>
  );
};
const LikeDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  p {
    font-size: 14px;
    font-weight: 500;
    color: #6e6e6e;
  }
`;
