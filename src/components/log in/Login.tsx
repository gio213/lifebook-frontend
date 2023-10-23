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
import Toast from "../../components/toas messages/ToastMessages";
import { Toaster } from "react-hot-toast";

export const Login = () => {
  const api = "https://lifebookbackend.up.railway.app/api/user_login";
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [loginData, setLoginData] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);

  // const cookie = document.cookie.includes("token");
  useEffect(() => {
    setTimeout(() => {
      if (token && !undefined) {
        navigate("/newsfeed");
        return;
      } else {
        navigate("/login");
      }
    }, 1500);
  }, [token, navigate]);

  const handelEmailSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.token);
        console.log(data);
        const message = data.message;

        setLoginData(message);
        console.log(loginData);

        document.cookie = `token=${data.token}`;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setVisible(true);
      });
  };

  return (
    <Container style={{ padding: "0", fontFamily: "monospace" }}>
      {visible && <Toast message={loginData} setVisible={setVisible} />}
      <Div
        style={{ backgroundColor: "#1b7be6", borderRadius: "0", gap: "20px" }}
      >
        <img src={sing_up_img} alt="sign up img"></img>
        <h1 style={{ color: "white" }}>Welcome to Lifebook!</h1>
        <p style={{ color: "white" }}>Connect with your friends</p>
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

      <Toaster />
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
