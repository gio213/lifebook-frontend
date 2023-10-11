import { useState, useEffect } from "react";
import ReactLinkify from "react-linkify";
import styled from "styled-components";

const LinkPreviewComponent = ({ writePost }: string) => {
  const [linkData, setLinkData] = useState<object>({});
  const urlRex = new RegExp(
    "^(https?:\\/\\/)?" +
      // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  const fetchUrlData = async () => {
    fetch(`https://jsonlink.io/api/extract?url=${writePost}`)
      .then((res) => res.json())
      .then((data) => {
        setLinkData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (urlRex.test(writePost)) {
      fetchUrlData();
    } else {
      setLinkData({});
    }
  }, [writePost]);

  return (
    <LinkPreviewDiv>
      {linkData?.images && <img src={linkData?.images[0]} alt="" />}
      <h4>{linkData?.title}</h4>
      <p>{linkData?.description}</p>
    </LinkPreviewDiv>
  );
};
export default LinkPreviewComponent;

const LinkPreviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  width: 350px;
  justify-content: flex-start;
  opacity: 0.8;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 35px;
  gap: 10px;
  border: 1px solid #8b8a8a;
  transition: all 0.2s ease-in-out;
  font-family: monospace;
`;
