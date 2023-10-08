import { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../header/Header";
import { Posts } from "../posts/Posts";
import { LeftSideBar } from "../left sidebar/LeftSideBar";
export const NewsFeed = () => {
  return (
    <div>
      <Container>
        <Header />
      </Container>
      <PostAndLeftSideBarDiv>
        <LeftSideBar />
        <Posts />
      </PostAndLeftSideBarDiv>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const PostAndLeftSideBarDiv = styled.div`
  display: flex;

  width: 100vw;
`;
