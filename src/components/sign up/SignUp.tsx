import { Container } from "../landing page/LandingPage";
import { Div } from "../landing page/LandingPage";
import sing_up_img from "../../assets/sign_uo_img.png";
import { RightSmallDiv } from "../landing page/LandingPage";
import styled from "styled-components";
import { BlueBtn } from "../landing page/LandingPage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

export const SignUp = () => {
  const api = "https://lifebookbackend.up.railway.app/api/user_register";
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birth_date, setbirth_date] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [profile_picture, setprofile_picture] = useState({} as File);

  const handleUsernameSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDateSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setbirth_date(e.target.value);
    console.log(birth_date);
  };
  const handleGenderSubmit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };

  const handleprofile_pictureSubmit = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setprofile_picture(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const subbmit = () => {
    register();
  };
  const navigate = useNavigate();

  const register = async () => {
    if (!profile_picture) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("birth_date", birth_date);

    try {
      const compressedFile = await imageCompression(profile_picture, {
        maxSizeMB: 1,
      });

      formData.append("profile_picture", compressedFile);

      fetch(api, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert("User registered successfully");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error compressing file:", error);
    }
  };

  return (
    <Container style={{ padding: "0", fontFamily: "monospace" }}>
      <Div
        style={{ backgroundColor: "#1b7be6", borderRadius: "0", gap: "20px" }}
      >
        <img src={sing_up_img} alt="sign up img"></img>
        <h1 style={{ color: "white" }}>Welcome to Lifebook!</h1>
        <p style={{ color: "white" }}>
          Manage your account and access your information
        </p>
      </Div>
      <Div style={{ backgroundColor: "white", borderRadius: "0" }}>
        <RightSmallDiv
          style={{
            width: "500px",
            height: "800px",
            boxShadow: "   0px 0px 10px 0px #e6e8ec",
            gap: "30px",
            padding: "30px",
          }}
        >
          <h1>Sign up</h1>
          <form
            method="post"
            action="/user_register"
            encType="multipart/form-data"
          >
            <CprofileImgDiv>
              <Circle>
                <Cimg
                  src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                  alt="upload img"
                />
              </Circle>
              <label htmlFor="uploadfile">Upload profile profile_picture</label>
              <input
                onChange={handleprofile_pictureSubmit}
                type="file"
                name="profile_picture"
                id="uploadfile"
              />
            </CprofileImgDiv>

            <label htmlFor="username">Username</label>
            <Cinput
              onChange={handleUsernameSubmit}
              value={username}
              type="text"
              name=""
              id="username"
              autoComplete="off"
            />
            <label htmlFor="email">Email</label>
            <Cinput
              onChange={handleEmailSubmit}
              value={email}
              type="email"
              name=""
              id="email"
              autoComplete="off"
            />
            <label htmlFor="password">Password</label>
            <Cinput
              onChange={handlePassSubmit}
              value={password}
              type="password"
              name=""
              id="password"
            />

            <label htmlFor="dateInput">Date of birth</label>
            <Cinput
              onChange={handleDateSubmit}
              value={birth_date}
              type="date"
              name=""
              id="dateInput"
            />
            <label htmlFor="gender">Gender</label>
            <Cselect
              onChange={handleGenderSubmit}
              value={gender}
              name="gender"
              id="gender"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Cselect>
            <RegLogDiv>
              <BlueBtn
                onClick={subbmit}
                style={{
                  width: "100px",
                  height: "35px",
                  fontFamily: "monospace",
                }}
                type="button"
              >
                Sign up
              </BlueBtn>
              <p>Go to login page</p>
              <BlueBtn
                onClick={() => navigate("/login")}
                style={{
                  width: "100px",
                  height: "35px",
                  fontFamily: "monospace",
                }}
              >
                Login
              </BlueBtn>
            </RegLogDiv>
          </form>
        </RightSmallDiv>
      </Div>
    </Container>
  );
};

const Cinput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #e6e8ec;
  border-radius: 4px;
  padding: 0 8px;
  box-sizing: border-box;
  margin-bottom: 16px;
`;

const Cselect = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid #e6e8ec;
  border-radius: 4px;
  padding: 0 8px;
  box-sizing: border-box;
  margin-bottom: 16px;
`;

const Circle = styled.div`
  border-radius: 100% !important;
  overflow: hidden;
  width: 128px;
  height: 128px;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const Cimg = styled.img`
  max-width: 100%;
  height: auto;
`;

const CprofileImgDiv = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #e6e8ec;
  gap: 20px;
`;

const RegLogDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
