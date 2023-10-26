import styled from "styled-components";

export const NofollowersMessage = () => {
  return (
    <Div>
      <h1 style={{ fontFamily: "monospace" }}>
        Follow people to see their posts
      </h1>
      <p style={{ fontFamily: "monospace" }}>
        When people share photos or text, they'll appear here.
      </p>
      <p style={{ fontFamily: "monospace" }}>
        I am always here,{" "}
        <span style={{ fontWeight: "bold" }}>Search me with Giorgi</span> and
        send me follow request
      </p>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  h1 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    color: #8e8e8e;
    margin-bottom: 10px;
  }
`;
