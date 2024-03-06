import styled, { keyframes } from 'styled-components';
const hov = keyframes`
  from {
    transform: translateY(0);
    opacity: 0

  }
  to {
    transform: translateY(-40px);
    opacity: 1

  }
`;

const leave = keyframes`
  from {
    transform: translateY(-40px);
    opacity: 0
  }
  to {
    transform: translateY(-80px);
    opacity: 1
  }
`;

export const AnimationButtonStyle = styled.div`
  .test-box {
    width: 100%;
    height: 40px;
    background-color: black;
    top: 40px;
    animation: none;
  }
  .temp {
    overflow: hidden;
  }
  .temp:hover .test-box {
    animation: ${hov} 0.7s forwards;
  }
  .temp:not(:hover) .test-box {
    animation: ${leave} 0.7s forwards;
  }
`;
