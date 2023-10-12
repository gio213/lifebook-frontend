import { useState, useEffect } from "react";
import { Cinput } from "../log in/Login";
import styled from "styled-components";
import axios from "axios";
export const SearchInput = () => {
  const token = document.cookie.split("=")[1];

  const api = "https://lifebookbackend.up.railway.app/api/user_search";
  const [users, setUsers] = useState<[]>([]);
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const fetchUsers = async (api: string, username: string) => {
    try {
      const response = await axios.post(
        api,
        { username: username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set the content type for the request body
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        // Handle unexpected status codes
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Request failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (username.length > 3) {
      fetchUsers(username);
    }
  }, [username]);

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

      {/* <Modal isModalOpen={isModalOpen}>
        {users?.map(({ username, user_id }) => {
          return (
            <ModalContent key={user_id}>
              <p>{username}</p>
              <button>Follow</button>
            </ModalContent>
          );
        })}
        <CloseButton onClick={() => setIsModalOpen(false)}>X</CloseButton>
      </Modal> */}
    </div>
  );
};

type ModalProps = {
  isModalOpen: boolean;
};

const Modal = styled.div<ModalProps>`
  display: ${({ isModalOpen }) => (isModalOpen ? "absolute" : "none")};
  position: fixed;
  top: 10%;
  left: 25%;
  width: 50%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background-color: red;
  cursor: pointer;
`;
