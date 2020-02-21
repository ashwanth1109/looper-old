import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Item from './Item';
import Slider from './Slider';

const Container = styled.div`
  width: 110px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MenuOverlay = styled.div`
  width: 110px;
  position: absolute;
  top: 0;
  z-index: 100;
`;

const items = [
  'loop',
  'increase',
  'decrease',
  'metronome',
  'sheet',
  'scales',
  'exercise'
];

const Menu = ({ setPlaybackRate }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleClick = useCallback(item => {
    switch (item) {
      case 'increase':
        setPlaybackRate(prev => prev + 0.05);
        break;
      case 'decrease':
        setPlaybackRate(prev => prev - 0.05);
        break;
      default:
        break;
    }
    setShowSlider(prev => !prev);
    setCurrent(item);
  }, []);

  return (
    <Container>
      <MenuOverlay>
        {items.map(item => {
          return (
            <Item
              item={item}
              key={item}
              handleClick={() => handleClick(item)}
            />
          );
        })}
      </MenuOverlay>
      <Slider showSlider={showSlider} item={current} />
    </Container>
  );
};

export default Menu;
