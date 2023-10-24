import { useState, useEffect } from "react";
import { Cinput } from "../log in/Login";
import styled from "styled-components";
import axios from "axios";
import { BlueBtn } from "../landing page/LandingPage";
import { ProfileImg } from "../posts/Posts";
import { useGetUSerData } from "../../hooks/useGetUserData";

export const SearchInput = () => {
  const token = document.cookie.split("=")[1];
  const [userData, setUserData] = useState({});

  const { getUserData } = useGetUSerData();

  const api = "https://lifebookbackend.up.railway.app/api/user_search";
  const sendFollowRequestApi =
    " https://lifebookbackend.up.railway.app/api/follow_user_id";
  const [users, setUsers] = useState<[]>([]);
  const [username, setUsername] = useState("");
  const [followee_id, setFollowee_id] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        api,
        { username: username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { result } = response.data;
        const usersAraay = [...result];
        setUsers(usersAraay);
        console.log(usersAraay);

        return response.data;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getUserData();
      setUserData(data);
    })();

    if (username.length > 1) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [username]);

  const sendFollowRequest = () => {
    const follower_id = userData["user_id"];
    console.log(follower_id, followee_id);

    fetch(sendFollowRequestApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        follower_id: follower_id,
        followee_id: followee_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
      });
  };

  return (
    <div>
      <Cinput
        style={{
          width: "500px",
          height: "39px",
          padding: "0px 8px",
          border: "0",
          boxSizing: "border-box",
          borderRadius: "1000px",
          backgroundColor: "#f3f3f3",
          color: "#838383",
          fontSize: "14px",
          fontFamily: "monospace",
          lineHeight: "19px",
          outline: "none",
        }}
        placeholder="Search user"
        value={username}
        onChange={handleSearch}
      />
      {users?.map((user, index) => {
        return (
          <SearchedDiv key={index}>
            <SearchedContent
              onClick={(e) => {
                console.log(user.user_id);
              }}
            >
              <ProfileImg
                src={
                  user.profile_picture
                    ? user.profile_picture
                    : "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                }
                alt="profile"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
              <p>{user.username}</p>
              <BlueBtn
                style={{
                  width: "fit-content",
                  height: "fit-content",
                  fontFamily: "monospace",
                  padding: "5px 10px",
                  fontSize: "12px",
                }}
                onClick={() => {
                  const clickedUserId = user.user_id;
                  setFollowee_id(clickedUserId);
                  if (user.follow_status === "Not Following") {
                    sendFollowRequest();
                  } else if (user.follow_status === "Follow Request Pending") {
                    console.log("need to make cancle request ");
                  } else if (user.follow_status === "Following") {
                    console.log("need to make unfollow request ");
                  }
                }}
              >
                {user.follow_status === "Follow Request Pending"
                  ? "Pending"
                  : user.follow_status === "Not Following"
                  ? "Follow"
                  : "Following"}
              </BlueBtn>
            </SearchedContent>
          </SearchedDiv>
        );
      })}
    </div>
  );
};

const SearchedDiv = styled.div`
  width: 45%;
  /* height: 200px; */
  overflow-y: scroll;

  position: absolute;
  top: 50;
  left: 50;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchedContent = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background-color: #b4b4b4;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 10px;

  animation-name: slide;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;

  @keyframes slide {
    from {
      margin-top: 10px;
      opacity: 0;
    }
    to {
      margin-top: 0px;
      opacity: 1;
    }
  }

  &&:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }

  p {
    font-family: monospace;
    font-weight: bold;
    text-transform: uppercase;
  }
`;
