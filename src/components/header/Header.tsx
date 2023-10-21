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
import { BlueBtn } from "../landing page/LandingPage";
import closeIcon from "../../assets/close-icon.png";

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

  const handleNotificationClick = () => {
    return notifications.map((notification, index) => {
      if (isShow && notifications.length !== 0) {
        return (
          <NotificationDiv key={notification.notification_id}>
            <CloseBtn
              src={closeIcon}
              alt="close icon"
              onClick={() => setIsShow(false)}
            />
            <NotificationItem>
              <ProfileImg src={notification.sender_profile_picture} alt="" />
              <h3>{notification.sender_name}</h3>
              <p>{`sent you ${notification.type}`}</p>
              <BlueBtn
                style={{
                  width: "fit-content",
                  height: "30px",
                  fontFamily: "monospace",
                }}
              >
                Accept
              </BlueBtn>
              <BlueBtn
                style={{
                  width: "fit-content",
                  height: "30px",
                  fontFamily: "monospace",
                }}
              >
                Decline
              </BlueBtn>
            </NotificationItem>
          </NotificationDiv>
        );
      } else if (isShow && notifications.length == 0) {
        console.log("no notifications");
        return (
          <NotificationDiv key={index}>
            <CloseBtn
              src={closeIcon}
              alt="close icon"
              onClick={() => setIsShow(false)}
            />

            <NotificationItem>
              <h1>No notifications</h1>
            </NotificationItem>
          </NotificationDiv>
        );
      }
    });
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
            onClick={() => setIsShow(true)}
          />
        ) : (
          <AnimateBell
            src={redBellIcon}
            alt=""
            onClick={() => setIsShow(true)}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: 200px;
  overflow-y: scroll;
  z-index: 1000;
  top: 80px;
  right: 50px;
  border-radius: 4px;
  position: absolute;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e8ec;
  background-color: #c3e3f0;
  border-radius: 10px;
  gap: 10px;

  &&:hover {
    cursor: pointer;
    background-color: #e6e8ec;
  }
  && > h3 {
    font-family: "monospace";
    font-weight: bold;

    text-transform: capitalize;
  }
  && > p {
    font-family: "monospace";
  }
`;

const CloseBtn = styled.img`
  width: 15px;
  height: 15px;
  border: none;
  position: absolute;
  z-index: 1000;
  top: -1px;
  right: 1px;
  &&:hover {
    cursor: pointer;
  }
`;
