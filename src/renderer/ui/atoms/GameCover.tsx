import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  active: boolean;
  imageUrl: string | null;
};

const GameCover = styled.div<Props>`
  background-image: url(${({ imageUrl }): string => imageUrl ?? ''});
  background-size: cover;
  background-position: top;
  display: inline-flex;
  align-items: center;
  transition: 0.25s ease-out;
  width: 8vw;
  height: 23vh;
  margin: 0 0.75vw;
  filter: saturate(0.8) brightness(0.6);
  box-shadow: #0000005e 0 9px 8px 0;
`;

const activeAnimation = keyframes`
  0% {
    transform: translateY(1vh) scale(1.08);
  }
  100% {
    transform: translateY(0) scale(1);
  }
`;

const reflectActiveAnimation = keyframes`
  0% {
    left: 0;
    visibility: visible;
  }
  95% {
    left: calc(100% - 40px);
    opacity: 10%;
  }
  100% {
    left: calc(100% - 40px);
    opacity: 0;
  
`;

const ActiveGameCover = styled(GameCover)`
  width: 10vw;
  height: 28vh;
  margin: 0 1.25vw;
  filter: saturate(1) brightness(1.1);
  box-shadow: #0000005e 0 12px 8px 0;
  border: #bdbdbd solid 2px;
  animation: ${activeAnimation} 0.3s ease-out 0s 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    width: 50px;
    height: 100%;
    visibility: hidden;
    animation-name: ${reflectActiveAnimation};
    animation-duration: 0.2s;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
    animation-delay: 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    background: linear-gradient(to right, #FFFFFF00 15%, #FFFFFF33 70%, #FFFFFF00 100%);
`;

const GameCoverComponent: React.FC<Props> = (props) =>
  props.active ? <ActiveGameCover {...props} /> : <GameCover {...props} />;

export default GameCoverComponent;
