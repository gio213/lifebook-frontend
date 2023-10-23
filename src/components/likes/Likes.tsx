import likeIcon from "../../assets/like-icon-default.png";
import likedIncon from "../../assets/liked-icon.png";
import { useState } from "react";
import styled from "styled-components";

export const Likes = (props: any) => {
  const [like, setLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  const handleLike = () => {
    setLike(!like);
    if (like) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
  };

  return (
    <LikeDiv>
      <img
        src={like ? likedIncon : likeIcon}
        alt="like icon"
        onClick={handleLike}
      />
      <p>{likes}</p>
    </LikeDiv>
  );
};
() => {
  const [like, setLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  return (
    <div>
      <img
        src={like ? likedIncon : likeIcon}
        alt="like icon"
        onClick={handleLike}
      />
      <p>{likes}</p>
    </div>
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
