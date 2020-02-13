import React from 'react';
import styled from '@emotion/styled';

import useClientDimensions from 'react-client-dimensions';

import VideoPlayer from './VideoPlayer';
import Menu from './Menu';

const Main = styled.div`
  display: flex;
`;

export default () => {
  const { vw, vh } = useClientDimensions();
  console.log('Dimensions:', vw, vh);

  return (
    <div>
      <Main>
        <VideoPlayer videoId="4y33h81phKU" />
        <Menu />
      </Main>
    </div>
  );
};
