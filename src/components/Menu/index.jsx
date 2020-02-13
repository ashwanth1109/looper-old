import React from 'react';
import styled from '@emotion/styled';
import Item from './Item';

const Container = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const items = [
  'loop',
  'metronome',
  'sheet',
  'scales',
  'exercise',
  'increase',
  'decrease'
];

const Menu = () => {
  return (
    <Container>
      {items.map(item => {
        return <Item item={item} />;
      })}
    </Container>
  );
};

export default Menu;
