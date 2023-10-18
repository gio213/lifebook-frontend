import io from "socket.io-client";
import { Header } from "../../header/Header";
import styled from "styled-components";
import { LeftSideBar } from "../../left sidebar/LeftSideBar";
import { Cinput } from "../../log in/Login";
import sendIcon from "../../../assets/send-cion.svg";
import { useGetUSerData } from "../../../hooks/useGetUserData";
import { useEffect } from "react";
import { useState } from "react";

export const Messaging = () => {
  const token = document.cookie.split("=")[1];
  const [userData, setUserData] = useState({});
  const [chat, setChat] = useState([]);

  const { getUserData } = useGetUSerData();

  useEffect(() => {
    (async () => {
      const data = await getUserData();
      setUserData(data);
      console.log(data);
      socket.on("chat", (senderChats) => {
        setChat(senderChats);
      });
    })();
  }, []);

  const sendChatToSocket = (chat) => {
    socket.emit("chat", chat);
  };

  const addMessage = (chat) => {
    const newChat = [
      ...chat,
      {
        username: userData.username,
        profilePicture: userData.profile_picture,
      },
    ];
    setChat([...chat, newChat]);
    sendChatToSocket(newChat);
  };

  const socket = io("http://localhost:3000/");
  const sendMessage = () => {
    socket.emit("message", "Hello world");
  };

  const ChatList = () => {
    chat.map((chat, index) => {
      const chatUsername = chat[index].username;
      const chatProfilePicture = chat[index].profilePicture;
      if (chatUsername === userData.username)
        return (
          <BoxSender
            key={index}
            message={chat.message}
            igm={chatProfilePicture}
          />
        );
      return (
        <BoxReceiver
          key={index}
          message={chat.message}
          igm={chatProfilePicture}
        />
      );
    });
  };

  return (
    <div>
      <Header />
      <LeftSideBar />
      <Container>
        <ChatLeftSide>
          <h2 style={{ color: "#5267d3" }}>Lifebook</h2>
          <h1 style={{ fontWeight: "bold" }}>Chats</h1>
          <Cinput
            style={{ fontFamily: "monospace" }}
            placeholder="Search in chats"
          />
        </ChatLeftSide>
        <ChatMiddle>
          <MidleChatHeader>
            <h1 style={{ fontWeight: "bold" }}>Selected user</h1>
            <h1 style={{ fontWeight: "bold" }}>Chat</h1>
          </MidleChatHeader>
          <ChatSpace style={{ display: "flex", alignItems: "center" }}>
            {ChatList()}
          </ChatSpace>
          <ChatInputSend>
            <Cinput
              style={{ fontFamily: "monospace" }}
              placeholder="Type a message"
              onChange={(e) => {
                sendChatToSocket(e.target.value);
              }}
            />
            <img
              src={sendIcon}
              alt="send"
              style={{ width: "20px", height: "20px" }}
              onClick={() => {
                addMessage(chat);
                console.log(chat);
              }}
            />
          </ChatInputSend>
        </ChatMiddle>
        <ChatRightSide>
          <h1 style={{ fontWeight: "bold" }}>Chat info</h1>
        </ChatRightSide>
      </Container>
    </div>
  );
};

export default Messaging;

const Container = styled.div`
  width: 80%;
  height: 700px;
  display: flex;
  justify-content: flex-start;
  margin-top: -730px;
  margin-left: 250px;
  box-sizing: border-box;
  border-radius: 20px;
`;

const ChatLeftSide = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;

  h1,
  p,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: monospace;
  }
`;

const ChatMiddle = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ChatRightSide = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  padding: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  font-family: monospace;
`;

const MidleChatHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-left: 2px solid #f9f9f9;
  border-right: 2px solid #f9f9f9;

  h1,
  p,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: monospace;
  }
`;

const ChatSpace = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  overflow-y: scroll;
  font-family: monospace;
`;

const ChatInputSend = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #f9f9f9;
  align-items: center;
  padding: 20px;
`;

const Receiver = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  background-color: #f9f9f9;
  align-items: center;
  font-family: monospace;
  padding: 20px;
`;

const Sender = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: #f9f9f9;
  align-items: center;
  font-family: monospace;
  padding: 20px;
`;

const BoxReceiver = styled.div`
  width: 80%;
  height: auto;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const BoxSender = styled.div`
  width: 80%;
  height: auto;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
