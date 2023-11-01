import { LeftSideBar } from "../left sidebar/LeftSideBar";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUSerData } from "../../hooks/useGetUserData";
import { Cinput } from "../log in/Login";
import { calculateTime } from "../../hooks/useGetUserData";
import io from "socket.io-client";
import { get } from "axios";
export const Messaging = () => {
  const token = document.cookie.split("=")[1];
  const getFollowersApi =
    "https://lifebookbackend.up.railway.app/api/get_current_user_followers";

  const [followers, setFollowers] = useState([]);
  const [followerUsername, setFollowerUsername] = useState("");
  const [followerImg, setFollowerImg] = useState("");
  const [followersId, setFollowersId] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const [currentUserID, setCurrentUserID] = useState<number>(0);
  const [chat, setChat] = useState([]);
  const [messageTxt, setMessageTxt] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [followersID, setFollowersID] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // console.log("online users", onlineUsers);
  // console.log("followers id", followersID);

  const { getUserData } = useGetUSerData();
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
        // console.log(response.data.result);
        setFollowers([...data]);
        setFollowersID(data.map((follower: any) => follower.user_id));
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  };

  const getChat = async () => {
    try {
      const api = "https://lifebookbackend.up.railway.app/api/get_messages";
      const response = await fetch(api, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: followersId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setChat(data);
      } else {
        // Handle the case where the API request is not successful (e.g., response.status is not in the 200s)
        console.error("Failed to fetch chat data");
      }
    } catch (error) {
      // Handle any exceptions that might occur during the API request
      console.error("An error occurred:", error);
    }
  };

  const handleMessage = (e: any) => {
    setMessageTxt(e.target.value);
  };

  const createMessage = async () => {
    const api = "https://lifebookbackend.up.railway.app/api/create_message";

    fetch(api, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiver_id: followersId,
        message_content: messageTxt,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    (async () => {
      const data = await getUserData();
      setCurrentUserID(data.user_id);
    })();
  }, []);

  useEffect(() => {
    getFollowers();
  }, []);

  useEffect(() => {
    if (followersId !== 0) {
      getChat();
    }
  }, [followersId]);

  // initialize socket

  useEffect(() => {
    const newSocket = io("localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [currentUserID]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addUsers", { currentUserID });
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [socket, currentUserID]);

  return (
    <Container>
      <LeftSideBar />

      <LeftSide>
        <h1 style={{ color: "#5267d3", fontFamily: "monospace" }}>Connected</h1>
        <h2 style={{ fontFamily: "monospace" }}>Chats</h2>
        {followers && followers.length > 0 ? (
          followers.map((follower: object) => (
            <ImgUsername
              key={follower.user_id}
              onClick={() => {
                setFollowerUsername(follower.username);
                setFollowerImg(follower.profile_picture);
                setFollowersId(follower.user_id);
                setVisible(true);
              }}
            >
              <FollowerImg src={follower.profile_picture} alt="follower img" />
              <p style={{ fontFamily: "monospace", fontWeight: "bold" }}>
                {follower.username}
              </p>
            </ImgUsername>
          ))
        ) : (
          <p>You don't have any followers.</p>
        )}
      </LeftSide>

      <MddleDiv>
        {visible ? (
          <ImgUsername style={{ backgroundColor: "white" }}>
            <FollowerImg src={followerImg} alt="follower img" />
            <p style={{ fontFamily: "monospace" }}>{followerUsername}</p>
          </ImgUsername>
        ) : (
          <p style={{ fontFamily: "monospace", fontWeight: "bold" }}>
            {" "}
            Click on a follower to start a chat.
          </p>
        )}

        {chat.length === 0 ? (
          <div>
            <p>Start a conversation with {followerUsername}</p>
          </div>
        ) : (
          chat
            .sort((a: any, b: any) => a.message_id - b.message_id)
            .map((message: any, index: number) => {
              return (
                <ChatContainer key={index}>
                  {message.sender_id === currentUserID ? (
                    <CurrentUserChatContainer>
                      <div style={{ width: "100%", textAlign: "center" }}>
                        <CustomP style={{ fontFamily: "monospace" }}>
                          {calculateTime(message.timestamp)}
                        </CustomP>
                      </div>
                      <CurrentUserChat>
                        <p style={{ fontFamily: "monospace" }}>
                          {message.message_content}
                        </p>
                      </CurrentUserChat>
                    </CurrentUserChatContainer>
                  ) : (
                    <ReceiverChatContainer>
                      <CustomP style={{ fontFamily: "monospace" }}>
                        {calculateTime(message.timestamp)}
                      </CustomP>
                      <ReceiverChat>
                        <p style={{ fontFamily: "monospace" }}>
                          {message.message_content}
                        </p>
                      </ReceiverChat>
                    </ReceiverChatContainer>
                  )}
                </ChatContainer>
              );
            })
        )}
        <Cinput
          placeholder="Write message and press enter"
          value={messageTxt}
          onChange={handleMessage}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              if (messageTxt.length > 0) {
                createMessage();
                setMessageTxt("");
                console.log(chat);
              } else {
                alert("Please write a message");
              }
            }
          }}
        />
      </MddleDiv>

      <RightSide>
        <h1 style={{ color: "#5267d3", fontFamily: "monospace" }}>
          Online Users
        </h1>
      </RightSide>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  width: 20%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: #fff;
  padding: 10px;
`;

const ImgUsername = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px #e1e1e1;
  &&:hover {
    background-color: #e1e1e1;
    cursor: pointer;
  }
`;

const FollowerImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
const MddleDiv = styled.div`
  width: 60%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`;

const RightSide = styled.div`
  width: 20%;
  height: 100%;
  border: 1px solid black;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: max-content;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const CurrentUserChatContainer = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: flex-end;
`;

const CurrentUserChat = styled.div`
  width: fit-content;
  display: flex;
  background-color: #5267d3;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  color: #fff;
  border-radius: 10px;
  margin-top: 2px;
  word-wrap: break-word;
  padding: 5px;
  border-radius: 5px;
`;
const ReceiverChatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const ReceiverChat = styled.div`
  width: fit-content;
  display: flex;
  background-color: #c3e3f0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin-top: 2px;
  word-wrap: break-word;
  border-radius: 5px;
  padding: 5px;
`;

const CustomP = styled.p`
  opacity: 0.5;
  font-family: monospace;
`;
