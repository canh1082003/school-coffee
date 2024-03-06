import styled, { keyframes } from 'styled-components';
const hov = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0
  }
  to {
    transform: translateX(0%);
    opacity: 1
  }
`;
export const Modal = styled.div`
  .modal {
    background-color: rgba(0, 0, 0, 0.7);
    display: none;
    min-width: 100vw;
    min-height: 100vh;
    position: fixed;
    z-index: 99999;
  }
  .modal.active {
    display: block;
  }
  .modal-content {
    position: absolute;
    width: 60vh;
    right: 0;
    min-height: 100vh;
    background-color: white;
    animation: ${hov} 0.7s forwards;
  }
`;
