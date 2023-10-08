import styled from "styled-components";
import { useState, useEffect } from "react";
import { useGetUSerData } from "../../hooks/useGetUserData";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "../search/Search";
import notificationIcon from "../../assets/notifications-icon.svg";
import { SideBarIcon } from "../left sidebar/LeftSideBar";
export const Header = () => {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { getUserData } = useGetUSerData();

  useEffect(() => {
    (async () => {
      const data = await getUserData();

      setUserData(data);
    })();
  }, []);

  const logOut = () => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate("/login");
  };

  return (
    <Div>
      <div>
        <h1
          style={{
            color: "#5267D3",
            fontSize: "24px",
            fontFamily: "monospace",
            fontWeight: "700",
            lineHeight: "32px",
          }}
        >
          Lifebook
        </h1>
      </div>
      <SearchInput />
      <HeaderRightDiv>
        <SideBarIcon src={notificationIcon} />
        {userData?.username && (
          <h3
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "22px",
              textTransform: "capitalize",
            }}
          >
            {userData.username}
          </h3>
        )}

        <SideBarIcon src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" />
      </HeaderRightDiv>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: white;
  padding: 0 20px;
`;

const Cimg = styled.img`
  width: 30px;
  height: 30px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;

    &:active {
      transform: scale(1);
    }
  }
`;

const CImgDiv = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  gap: 20px;
`;

const HeaderRightDiv = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;