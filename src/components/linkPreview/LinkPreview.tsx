import { useState, useEffect } from "react";
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
  const scraperApiKey = "pk_59bb0839cc0fa9434896843ae5fe88faee75c033";

  const fetchUrlData = async () => {
    fetch(
      `https://jsonlink.io/api/extract?url=${writePost}&api_key=${scraperApiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        setLinkData(response);

        return response.json();
      })
      .then((data) => {
        console.log(data); // Process the JSON response
        setLinkData(data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  useEffect(() => {
    if (urlRex.test(writePost) && writePost !== "") {
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

export const LinkPreviewDiv = styled.div`
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
