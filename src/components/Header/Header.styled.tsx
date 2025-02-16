import styled from "styled-components";

export const Wrapper = styled.header`
  position: relative;
  width: 100vw;
  background-color: #d9c76c;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  padding-right: 60px;
  padding-left: 60px;
  padding-top: 40px;
  padding-bottom: 40px;
  z-index: 10;
  overflow: hidden;
`;

export const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;
