import React from 'react';
import styled from '@emotion/styled';

import { overlay } from '../../colors';
import Icon from '../Icon';

const Container = styled.div`
  width: calc(100% - 16px);
  background-color: ${overlay};
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
  border: 1px solid #ffffff40;
`;

const Item = ({ item }) => {
  return (
    <Container>
      <Icon name={item} />
    </Container>
  );
};

export default Item;
