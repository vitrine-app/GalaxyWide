import Vibrant from 'node-vibrant/lib/browser';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useContext } from '../../hooks';
import BackgroundParticles from '../atoms/BackgroundParticles';

const BackgroundImage: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
  const { state } = useContext();

  useEffect(() => {
    const load = async (): Promise<void> => {
      if (!state.activeGame?.coverImageUrl) {
        return;
      }

      const palette = await Vibrant.from(state.activeGame.coverImageUrl).getPalette();

      if (!working || !palette.DarkVibrant) {
        return;
      }

      setBackgroundColor(palette.DarkVibrant.getHex());
    };

    if (!state.activeGame?.coverImageUrl) {
      return;
    }

    let working = true;
    load();
    return () => {
      working = false;
    };
  }, [state.activeGame]);

  return (
    <Wrapper>
      <BackgroundParticles />
      <Gradient backgroundColor={backgroundColor} />
      <BlurredImage backgroundImageUrl={state.activeGame?.backgroundImageUrl ?? ''} />
      <BackgroundColor color={backgroundColor!} />
    </Wrapper>
  );
};

const translate = keyframes`
  from {
    transform: translate(0, 0) scale(1.2);
  }

  to {
    transform: translate(-5vw, 3vh) scale(1.2);
  }
`;

const Wrapper = styled.div``;

const Gradient = styled.div<{ backgroundColor: string | null }>`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: radial-gradient(ellipse, #ffffff00 0%, ${({ backgroundColor }): string => backgroundColor ?? 'black'} 75%)
    calc(50% + 10vw) calc(50% - 10vh) no-repeat;
  filter: brightness(0.2);
  transform: scale(1.3);
`;

const BlurredImage = styled.div<{ backgroundImageUrl: string }>`
  background: url(${({ backgroundImageUrl }): string => backgroundImageUrl}) calc(50% + 5vw) calc(50% - 5vh) no-repeat;
  background-size: cover;
  filter: brightness(1.1);
  opacity: 0.5;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  transition: 0.4s ease;
  transition-delay: 0.3s;
  animation: ${translate} 30s ease-in-out infinite alternate;
`;

const BackgroundColor = styled.div<{ color: string }>`
  background: ${({ color }): string => color};
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -3;
  transition: 0.4s ease;
`;

export default BackgroundImage;
