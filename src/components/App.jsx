import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';

import useClientDimensions from 'react-client-dimensions';

import VideoPlayer from './VideoPlayer';
import Menu from './Menu';

const Main = styled.div`
  display: flex;
`;

const SearchContainer = styled.div`
  display: flex;
  margin: 16px;
  padding: 32px;
`;

const SearchInput = styled.input`
  flex: 1;
  max-width: 1000px;
  height: 40px;
  padding: 16px;
  font-size: 1.4rem;
  background: transparent;
  outline: none;
  border: 2px solid white;
  border-radius: 4px;
  color: white;
`;

const Button = styled.button`
  height: 40px;
  margin-left: 16px;
  width: 120px;
  border: 2px solid transparent;
`;

export default () => {
  const inputRef = useRef(null);
  const { vw, vh } = useClientDimensions();
  const [videoId, setVideoId] = useState(null);
  console.log('VideoId:', videoId);

  return (
    <div>
      <Main>
        <VideoPlayer videoId={videoId} />
        <Menu />
      </Main>
      <SearchContainer>
        <SearchInput ref={inputRef} />
        <Button
          onClick={() => setVideoId(inputRef.current.value.split('?v=')[1])}
        >
          Search
        </Button>
      </SearchContainer>
    </div>
  );
};
