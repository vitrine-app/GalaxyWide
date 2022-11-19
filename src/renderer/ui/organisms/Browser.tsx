import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useMessage } from '../../hooks';
import View from '../View';

import GamesSlider from './GamesSlider';

const Browser: React.FC = () => {
  const [view] = useState<View>(View.RecentlyPlayed);
  const { t } = useTranslation();

  const { loading: gamesListLoading, data: gamesList } = useMessage('recentlyPlayedGames');

  if (gamesListLoading || !gamesList) {
    return <div>loading...</div>;
  }

  return (
    <Wrapper>
      <GamesSlider
        active={view === View.RecentlyPlayed}
        gamesList={gamesList}
        label={t('recentlyPlayed.sectionLabel')}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 40vh;
`;

export default Browser;
