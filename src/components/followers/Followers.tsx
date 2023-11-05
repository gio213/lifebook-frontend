import { useState, useEffect } from "react";
import axios from "axios";
import { LeftSideBar } from "../left sidebar/LeftSideBar";
import styled from "styled-components";
export const Followers = () => {
  const token = document.cookie.split("=")[1];
  const [followers, setFollowers] = useState([]);
  const getFollowersApi =
    "https://lifebookbackend.up.railway.app/api/get_current_user_followers";
  const getFollowers = async () => {
    try {
      const response = await axios.get(getFollowersApi, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.data.result;
        const dataArray = [...data];
        setFollowers(dataArray);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    getFollowers();
  }, []);

  useEffect(() => {
    console.log(followers);
  }, [followers]);

  return (
    <Container>
      <LeftSideBar />
      <FollowersContainer>
        <p>You have {followers.length} follower</p>
        {followers && followers.length > 0 ? (
          followers.map((follower: any) => (
            <FollowersDiv key={follower.user_id}>
              <ImgUsername>
                <FollowerImg src={follower.profile_picture} />
                <p>{follower.username}</p>
              </ImgUsername>
            </FollowersDiv>
          ))
        ) : (
          <p>You don't have followers</p>
        )}
      </FollowersContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const FollowersContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const FollowersDiv = styled.div`
  width: 20%;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &&:hover {
    background-color: #e1e1e1;
    cursor: pointer;
  }
`;

const ImgUsername = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const FollowerImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
