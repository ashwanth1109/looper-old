import React from 'react';
import styled from '@emotion/styled';
import { accentYellow, highlight } from '../../../colors';

const Container = styled.div``;
const TimePoints = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  > div {
    color: white;
  }
`;
const StyledButton = styled.button`
  background: ${props => (props.selected ? accentYellow : 'transparent')};
  outline: none;
  border: 1px solid ${highlight};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: 16px;
`;

const convertSecondsToDisplay = num => {
  if (num < 10) return `00:0${num}`;
  else if (num < 60) return `00:${num}`;
  else {
    const minsRaw = Math.floor(num / 60);
    const secsRaw = num - minsRaw * 60;
    const mins = minsRaw < 10 ? `0${minsRaw}` : `${minsRaw}`;
    const secs = secsRaw < 10 ? `0${secsRaw}` : `${secsRaw}`;

    console.log({ mins, secs });
    return `${mins}:${secs}`;
  }
};

const Button = ({ loop, handleClick, selected }) => {
  return (
    <Container>
      <TimePoints>
        <div>{convertSecondsToDisplay(loop.start)}</div>
        <div>{convertSecondsToDisplay(loop.end)}</div>
      </TimePoints>
      <StyledButton selected={selected} onClick={handleClick}>
        {loop.name}
      </StyledButton>
    </Container>
  );
};

export default Button;
