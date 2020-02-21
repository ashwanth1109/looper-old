import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';

import VideoPlayer from './VideoPlayer';
import Menu from './Menu';
import { useSelector } from 'react-redux';
import Icon from './Icon';
import { overlay, darkOverlay } from '../colors';

const LogoContainer = styled.div`
  position: absolute;
  bottom: 32px;
  left: 32px;
  background-color: ${overlay};
  border-radius: 16px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  width: 100vw;
  position: absolute;
  top: 0;
  display: flex;
  padding: 32px;
  background: ${darkOverlay};
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
  const [videoId, setVideoId] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(0.5);
  console.log('VideoId:', videoId);

  return (
    <div>
      <VideoPlayer videoId={videoId} playbackRate={playbackRate} />
      {/*<Menu setPlaybackRate={setPlaybackRate} />*/}
      <SearchContainer>
        <SearchInput ref={inputRef} />
        <Button
          onClick={() => setVideoId(inputRef.current.value.split('?v=')[1])}
        >
          Search
        </Button>
      </SearchContainer>
      <LogoContainer>
        <Icon name="logo" />
      </LogoContainer>
    </div>
  );
};
