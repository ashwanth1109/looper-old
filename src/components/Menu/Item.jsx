import React from 'react';
import styled from '@emotion/styled';

import { highlight, overlay } from '../../colors';
import Icon from '../Icon';

const Container = styled.div`
  width: calc(100% - 16px);
  background-color: ${overlay};
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
  border: 1px solid ${highlight};
  border-radius: 4px;
  cursor: pointer;
  transition: 0.45s ease-in-out background-color;
  :hover {
    background-color: ${highlight};
  }
`;

const Item = ({ item, handleClick }) => {
  return (
    <Container onClick={handleClick}>
      <Icon name={item} />
    </Container>
  );
};

export default Item;
