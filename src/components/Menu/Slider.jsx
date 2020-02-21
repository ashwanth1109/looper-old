import React from 'react';
import styled from '@emotion/styled';

import Looper from './Looper';
import { rifleGreen } from '../../colors';

const Container = styled.div`
  width: ${props => (props.show ? '200px' : '0')};
  height: calc((9 / 16) * 100vw);
  max-height: calc(100vh - 200px);
  min-height: 480px;
  position: absolute;
  top: 0;
  right: 110px;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  width: 200px;
  height: 100%;
  background-color: ${rifleGreen};
  position: absolute;
  left: ${props => (props.show ? '0' : '100%')};
  transition: 0.45s ease-in-out left;
`;

const Slider = ({ showSlider, item }) => {
  switch (item) {
    case 'loop':
      return (
        <Container show={showSlider}>
          <SliderContainer show={showSlider}>
            <Looper />
          </SliderContainer>
        </Container>
      );
    default:
      return null;
  }
};

export default Slider;
