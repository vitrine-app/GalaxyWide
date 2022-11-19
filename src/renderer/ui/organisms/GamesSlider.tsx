import React, { useEffect, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import styled from 'styled-components';

import Game from '../../../models/Game';
import { useContext } from '../../hooks';
import { setActiveGame } from '../../state/actions';
import GameCover from '../atoms/GameCover';

type Props = {
  active: boolean;
  gamesList: Game[];
  label: string;
};

const GamesSlider: React.FC<Props> = ({ active, gamesList, label }) => {
  const translationOffset = 0;

  const { dispatch } = useContext();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(setActiveGame(gamesList[activeIndex]));
  }, [activeIndex, gamesList]);

  useHotkeys(
    'left',
    () => {
      if (!active || activeIndex - 1 < 0) {
        return;
      }

      setActiveIndex(activeIndex - 1);
    },
    [activeIndex, active],
  );
  useHotkeys(
    'right',
    () => {
      if (!active || activeIndex + 1 >= gamesList.length) {
        return;
      }

      setActiveIndex(activeIndex + 1);
    },
    [activeIndex, active],
  );

  const horizontalTranslation = useMemo(() => {
    if (activeIndex < translationOffset) {
      return 0;
    }

    return activeIndex - translationOffset;
  }, [activeIndex]);

  return (
    <>
      {label}
      <Wrapper>
        <Carousel style={{ transform: `translateX(-${horizontalTranslation * 9.5}vw)` }}>
          {gamesList.map(({ coverImageUrl }, index) => (
            <GameCover active={activeIndex === index} imageUrl={coverImageUrl} key={index} />
          ))}
        </Carousel>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding-left: 15vw;
`;

const Carousel = styled.div`
  white-space: nowrap;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

export default GamesSlider;
