import React from 'react';
import styled from 'styled-components';

import { useContext } from '../../hooks';

const Showcase: React.FC = () => {
  const { state } = useContext();

  const play = async (): Promise<void> => {
    await window.electron.playGame(state.activeGame!);
  };

  return (
    <Wrapper>
      <Title>{state.activeGame?.name}</Title>
      <button onClick={play}>Play</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90vw;
  height: 50vh;
  padding-top: 10vh;
  margin-left: 10vw;
`;

const Title = styled.div`
  font-size: 4vw;
  color: #ffffffb3;
  font-weight: 300;
`;

export default Showcase;
