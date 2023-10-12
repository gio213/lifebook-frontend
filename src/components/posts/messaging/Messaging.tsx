import io from "socket.io-client";
import { Header } from "../../header/Header";

export const Messaging = () => {
  const socket = io("http://localhost:3000/");
  const sendMessage = () => {
    socket.emit("message", "Hello world");
  };

  return (
    <div>
      <Header />
      <input placeholder="message" type="text" name="" id="" />
      <button onClick={sendMessage}>Send message </button>
    </div>
  );
};

export default Messaging;
