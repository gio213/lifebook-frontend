import styled from "styled-components";
import landingImg from "../../assets/landingPage.png";
import img from "../../assets/Image.png";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Div>
        <img src={landingImg} alt="landing bicg img" />
      </Div>
      <Div style={{ backgroundColor: "white", gap: "50px" }}>
        <RightSmallDiv>
          <img src={img} alt="small img" />
          <h1>Lifebook</h1>
          <p>Connect with Others</p>
        </RightSmallDiv>
        <BlueBtn onClick={() => navigate("/login")}>Log in 🤔 Register</BlueBtn>
      </Div>
    </Container>
  );
};

export default LandingPage;

export const Container = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 3%;
  font-family: "monospace";
`;

export const Div = styled.div`
  width: 50%;
  height: 100%;
  background-color: #e6e8ec;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 64px;
  display: flex;
  flex-direction: column;
`;

export const RightSmallDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  gap: 20px;
`;

export const BlueBtn = styled.button`
  width: 162px;
  height: 48px;
  padding: 0px 8px;
  border: 0;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: #196bcf;
  color: #ffffff;
  font-size: 16px;
  font-family: "monospace";
  font-weight: bold;
  line-height: 20px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #196bcf;
    opacity: 0.8;
    transition: all 0.2s ease-in-out;
  }
`;
