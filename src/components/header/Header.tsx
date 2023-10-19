import styled from "styled-components";
import { useState, useEffect } from "react";
import { useGetUSerData } from "../../hooks/useGetUserData";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "../search/Search";
import notificationIcon from "../../assets/notifications-icon.svg";
import { SideBarIcon } from "../left sidebar/LeftSideBar";
import { ProfileImg } from "../posts/Posts";
import axios from "axios";
import redBellIcon from "../../assets/red-bell-icon.png";
export const Header = () => {
  const [userData, setUserData] = useState({});
  const [notifications, setNotifications] = useState<[]>([]);
  const token = document.cookie.split("=")[1];
  const [isShow, setIsShow] = useState(false);
  const getNotificationApi =
    "https://lifebookbackend.up.railway.app/api/get_notifications";

  const navigate = useNavigate();
  const { getUserData } = useGetUSerData();

  const getNotifications = async () => {
    try {
      const response = await axios.get(getNotificationApi, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.data;
        const notificationsArray = [...data];
        setNotifications(notificationsArray);

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
      getNotifications();
    })();
  }, []);
  // console.log(notifications);

  const handleNotificationClick = () => {
    return notifications.map(
      (notification, sender_name, sender_profile_picture, type) => {
        return (
          <NotificationDiv>
            <h1>{notification.sender_name}</h1>
            <h1>{notification.type}</h1>
          </NotificationDiv>
        );
      }
    );
  };

  return (
    <Div>
      {isShow && handleNotificationClick()}
      <div style={{ width: "345px" }}>
        <h1
          style={{
            color: "#5267D3",
            fontSize: "24px",
            fontFamily: "monospace",
            fontWeight: "700",
            lineHeight: "32px",
          }}
        >
          Lifebook
        </h1>
      </div>
      <SearchInput />

      <HeaderRightDiv>
        {notifications.length == 0 ? (
          <SideBarIcon
            src={notificationIcon}
            alt=""
            onClick={handleNotificationClick}
          />
        ) : (
          <AnimateBell
            src={redBellIcon}
            alt=""
            onClick={() => {
              handleNotificationClick();
              setIsShow(true);
              console.log("clicked");
            }}
          />
        )}

        {userData?.username && (
          <h3
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "22px",
              textTransform: "capitalize",
            }}
          >
            {userData.username}
          </h3>
        )}

        <ProfileImg
          src={
            userData?.profile_picture ||
            "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          }
          alt="profile picture"
          onClick={() => navigate("/profile")}
        />
      </HeaderRightDiv>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: white;
  padding: 0 20px;
`;

const HeaderRightDiv = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;
const AnimateBell = styled.img`
  width: 20px;
  height: 20px;
  animation: shake 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(10deg);
    }
    20% {
      transform: rotate(0deg);
    }
    30% {
      transform: rotate(-10deg);
    }
    40% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(10deg);
    }
    60% {
      transform: rotate(0deg);
    }
    70% {
      transform: rotate(-10deg);
    }
    80% {
      transform: rotate(0deg);
    }
    90% {
      transform: rotate(10deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  &&:hover {
    cursor: pointer;
    // stop animation
    animation-play-state: paused;
  }
`;
const NotificationDiv = styled.div`
  width: 100px;
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
