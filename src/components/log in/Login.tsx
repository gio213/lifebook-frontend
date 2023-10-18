import { Container } from "../landing page/LandingPage";
import { Div } from "../landing page/LandingPage";
import sing_up_img from "../../assets/sign_uo_img.png";
import { RightSmallDiv } from "../landing page/LandingPage";
import styled from "styled-components";
import { BlueBtn } from "../landing page/LandingPage";
import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { useEffect } from "react";
import { FormDiv } from "../sign up/SignUp";

export const Login = () => {
  const api = "https://lifebookbackend.up.railway.app/api/user_login";
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const cookie = document.cookie.split("=")[1];

    if (cookie) {
      navigate("/newsfeed");
      return;
    }
  }, []);

  const handleUsernameSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handelEmailSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.token);
        console.log(data);
        document.cookie = `token=${data.token}`;
        if (data.token) {
          alert("You are logged in");
          navigate("/newsfeed");
        }
      })
      .catch((err) => console.log(err));
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
      <Div
        style={{
          backgroundColor: "white",
          borderRadius: "0",
          fontFamily: "monospace",
        }}
      >
        <RightSmallDiv
          style={{
            width: "400px",
            height: "400px",
            boxShadow: "   0px 0px 10px 0px #e6e8ec",
            gap: "30px",
            padding: "30px",
          }}
        >
          <h1 style={{ fontFamily: "monospace" }}>Log in</h1>
          <FormDiv style={{ fontFamily: "monospace" }} action="post">
            <label htmlFor="username">Username</label>
            <Cinput
              autoComplete="username"
              onChange={handleUsernameSubmit}
              value={username}
              type="text"
              name="username"
              id="username"
            />
            <label htmlFor="email">Email</label>
            <Cinput
              autoComplete="email"
              onChange={handelEmailSubmit}
              value={email}
              type="email"
              name="email"
              id="email"
            />
            <label htmlFor="password">Password</label>
            <Cinput
              autoComplete="password"
              onChange={handlePassSubmit}
              value={password}
              type="password"
              name="password"
              id="password"
            />
            <BlueBtn
              onClick={handleSubmit}
              style={{ width: "100px", height: "35px" }}
              type="button"
            >
              Log in
            </BlueBtn>
          </FormDiv>
          <div>
            <p>
              Don't have an account?{" "}
              <BlueBtn
                style={{ width: "100px", height: "30px" }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </BlueBtn>
            </p>
          </div>
        </RightSmallDiv>
      </Div>
    </Container>
  );
};

export const Cinput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #e6e8ec;
  border-radius: 4px;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "monospace";
`;
