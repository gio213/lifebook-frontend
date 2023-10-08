import styled from "styled-components";
import homeIncon from "../../assets/home-icon.svg";
import messageIcon from "../../assets/message-icon.svg";
import { useNavigate } from "react-router-dom";
import followersIcon from "../../assets/followers-icon.svg";
import feedIcon from "../../assets/news-feed-icon.svg";

export const LeftSideBar = () => {
  const navigate = useNavigate();
  return (
    <SidebarDiv>
      <SidebarItemDiv>
        <PearDiv>
          <SideBarIcon
            onClick={() => navigate("/newsfeed")}
            style={{ width: "20px", height: "20px" }}
            src={homeIncon}
            alt="home icon"
          />
          <SideBarText style={{ fontFamily: "monospace" }}>Home</SideBarText>
        </PearDiv>
        <PearDiv>
          <SideBarIcon
            onClick={() => navigate("/profile")}
            style={{ width: "20px", height: "20px" }}
            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            alt="profile icon"
          />
          <SideBarText style={{ fontFamily: "monospace" }}>Profile</SideBarText>
        </PearDiv>
      </SidebarItemDiv>
      <SidebarItemDiv>
        <PearDiv>
          <SideBarText
            style={{
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            Favorites
          </SideBarText>
        </PearDiv>
        <PearDiv>
          <SideBarIcon src={messageIcon} alt="message icon" />
          <SideBarText style={{ fontFamily: "monospace" }}>
            Messages
          </SideBarText>
        </PearDiv>
        <PearDiv>
          <SideBarIcon src={followersIcon} alt="followers icon" />
          <SideBarText style={{ fontFamily: "monospace" }}>
            Followers
          </SideBarText>
        </PearDiv>
        <PearDiv>
          <SideBarIcon src={feedIcon} alt="feed icon" />
          <SideBarText style={{ fontFamily: "monospace" }}>Feed</SideBarText>
        </PearDiv>
      </SidebarItemDiv>
    </SidebarDiv>
  );
};

const SidebarDiv = styled.div`
  width: 15%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const SidebarItemDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #f3f3f3;
  border-top: 2px solid #f3f3f3;
  gap: 10px;
  padding: 10px 0;
`;

const PearDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
`;

const SideBarText = styled.p`
  color: #030303;
  font-size: 16px;
  font-family: "monospace";
  line-height: 21px;
`;
export const SideBarIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
`;