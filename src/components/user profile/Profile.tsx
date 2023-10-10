import { useGetUSerData } from "../../hooks/useGetUserData";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../header/Header";
import { BlueBtn } from "../landing page/LandingPage";
import { Cinput } from "../log in/Login";
import { LeftSideBar } from "../left sidebar/LeftSideBar";
export const Profile = () => {
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const token = document.cookie.split("=")[1];

  const { getUserData } = useGetUSerData();

  useEffect(() => {
    (async () => {
      const data = await getUserData();

      setUserData(data);
      console.log(data);
    })();
  }, []);

  const birthDate = userData?.birth_date;

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birthDate2 = new Date(birthDate);
    let age = today.getFullYear() - birthDate2.getFullYear();
    const month = today.getMonth() - birthDate2.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate2.getDate())) {
      age--;
    }

    return age;
  };

  // const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUsername(e.target.value);
  // };
  // const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };
  // const handleoldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setoldPassword(e.target.value);
  // };
  // const handlenewPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setnewPassword(e.target.value);
  // };

  // const resetoldPassword = () => {
  //   const api = "http://lifebookbackend.up.railway.app/api/password_reset";
  //   fetch(api, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       email: email,
  //       oldPassword: oldPassword,
  //       newPassword: newPassword,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <LeftSideBar />

      <ProfileContainer>
        <h1>Profile:</h1>
        <img
          style={{ width: "50px", height: "50px" }}
          src=" https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png
        "
          alt=""
        />
        <h2>Username: {userData?.username}</h2>
        <h2>Email: {userData?.email}</h2>
        <h2>Gender: {userData?.gender}</h2>
        <h2>Age: {userData?.birth_date && calculateAge(birthDate)}</h2>
      </ProfileContainer>
    </div>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 500px;
  backdrop-filter: blur(5px);
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const PassResetDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 500px;
  backdrop-filter: blur(5px);
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
