import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Ring = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  left: 50%;
  transform: translateX(-50%);
  top: 150px;
`;

const RingElement = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: auto;
  border: 8px solid #ffff;
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: lightblue transparent transparent transparent;
`;

const RingElement1 = styled(RingElement)`
  animation-delay: -0.45s;
`;

const RingElement2 = styled(RingElement)`
  animation-delay: -0.3s;
`;

const RingElement3 = styled(RingElement)`
  animation-delay: -0.15s;
`;

export { Ring, RingElement1, RingElement2, RingElement3 };
