import { useState, useEffect } from "react";
import { Cinput } from "../log in/Login";
import styled from "styled-components";

export const SearchInput = () => {
  return (
    <div>
      <Cinput
        style={{
          width: "500px",
          height: "39px",
          padding: "0px 8px",
          border: "0",
          boxSizing: "border-box",
          borderRadius: "1000px",
          backgroundColor: "#f3f3f3",
          color: "#838383",
          fontSize: "14px",
          fontFamily: "Red Hat Display",
          lineHeight: "19px",
          outline: "none",
        }}
        placeholder="Search user"
      />
    </div>
  );
};
