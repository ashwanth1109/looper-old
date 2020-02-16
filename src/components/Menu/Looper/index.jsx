import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Button from './Button';
import loops from '../../../data/loops';
import { SELECT_PART, UNSELECT_PART } from '../../../types/actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 24px;
  width: 100%;
`;

const Heading = styled.h2`
  color: white;
  font-size: 1.4rem;
  margin-bottom: 8px;
`;

const getSelected = createSelector(
  state => state.playerVars,
  playerVars => playerVars.selected
);

const Looper = ({ showSlider }) => {
  const dispatch = useDispatch();
  const selected = useSelector(getSelected);

  const handleClick = (selected, isSelected) => {
    console.log({ isSelected });
    dispatch({
      type: isSelected ? UNSELECT_PART : SELECT_PART,
      payload: { selected }
    });
  };

  return (
    <Container>
      <Heading>Looper</Heading>
      {loops.map(loop => {
        const isSelected = selected.includes(loop.id);
        return (
          <Button
            key={loop.id}
            handleClick={() => handleClick(loop.id, isSelected)}
            loop={loop}
            selected={isSelected}
          />
        );
      })}
    </Container>
  );
};

export default Looper;
