import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';

import Menu from './Menu';
import { useSelector } from 'react-redux';
import Icon from './Icon';
import { overlay, darkOverlay, highlight } from '../colors';
import Loader from './Common/Loader';
import useClientDimensions from 'react-client-dimensions';
import { createSelector } from 'reselect';

const AppContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const LogoContainer = styled.div`
  position: absolute;
  bottom: 32px;
  left: 32px;
  border-radius: 16px;
  cursor: pointer;
  z-index: 1;
  transform: ${props => (props.show ? 'rotate(180deg)' : '')};
  transition: transform 0.8s ease-in-out;
`;

const SearchContainer = styled.div`
  width: 100vw;
  position: absolute;
  top: ${props => (props.show ? '0' : '-100px')};
  display: flex;
  padding: 32px;
  background: ${darkOverlay};
  transition: 0.45s ease-in-out top;
`;

const Input = styled.input`
  height: 40px;
  padding: 16px;
  font-size: 1.4rem;
  background: transparent;
  outline: none;
  border: 2px solid white;
  border-radius: 4px;
  color: white;
`;

const SearchInput = styled(Input)`
  flex: 1;
  max-width: 1000px;
`;

const LoopInfo = styled.div`
  margin: 0 16px;
  font-size: 1.4rem;
  color: white;
`;

const ControlContainer = styled.div`
  width: 100vw;
  position: absolute;
  bottom: ${props => (props.show ? '0' : '-120px')};
  height: 120px;
  background: ${highlight};
  transition: 0.45s ease-in-out bottom;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 150px;
`;

const LoopContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SpeedContainer = styled.div`
  display: flex;
  align-items: center;
`;

const VideoPlayer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${overlay};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpeedDisplay = styled(LoopInfo)``;

const timeInDisplayFormat = time => (time < 10 ? `0${time}` : time);

const convertToTimeFormat = timeInSeconds => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  return `${timeInDisplayFormat(minutes)}:${timeInDisplayFormat(seconds)}`;
};

let player = null;

let loadYT;

const selectPlayerVars = createSelector(
  state => state.playerVars,
  playerVars => playerVars
);

let YTInstance = null;

export default () => {
  const inputRef = useRef(null);
  const [videoId, setVideoId] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(0.5);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);

  const increasePlaybackRate = useCallback(() => {
    const newPlaybackRate =
      playbackRate + 0.05 <= 2
        ? Number((playbackRate + 0.05).toFixed(2))
        : playbackRate;
    setPlaybackRate(newPlaybackRate);
  }, [playbackRate]);

  const decreasePlaybackRate = useCallback(() => {
    const newPlaybackRate =
      playbackRate - 0.05 >= 0.25
        ? Number((playbackRate - 0.05).toFixed(2))
        : playbackRate;
    setPlaybackRate(newPlaybackRate);
  }, [playbackRate]);

  const setStartPoint = useCallback(() => {
    setLoopStart(Math.floor(player.getCurrentTime()));
  }, [player]);

  const setEndPoint = useCallback(() => {
    setLoopEnd(Math.floor(player.getCurrentTime()));
  }, [player]);

  // --------------------- VIDEO PLAYER --------------------------
  // Initialization
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // useNodeSize() - to get dimensions of VideoPlayer Container
  const { vw, vh } = useClientDimensions();

  // const playerVars = useSelector(selectPlayerVars);

  const onPlayerStateChange = useCallback(
    e => {
      if (e.data === YT.PlayerState.ENDED) {
        player.seekTo(loopStart);
        e.target.playVideo();
      }
    },
    [player, loopStart]
  );

  useEffect(() => {
    if (player) {
      player.setPlaybackRate(playbackRate);
    }
  }, [playbackRate]);

  useEffect(() => {
    if (!loadYT && vw && vh) {
      loadYT = new Promise(resolve => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });

      let done = false;
      const stopVideo = () => {
        player.stopVideo();
      };

      const onPlayerReady = e => {
        setLoading(false);
      };

      loadYT.then(YT => {
        YTInstance = YT;
        player = new YT.Player(playerRef.current, {
          height: vh,
          width: vw,
          videoId,
          disablekb: 0,
          modestbranding: 1,
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0
          },
          events: {
            onStateChange: onPlayerStateChange,
            onReady: onPlayerReady
          },
          iv_load_policy: 0
        });
      });
    } else if (player) {
      player.setPlaybackRate(playbackRate);
      player.removeEventListener('onStateChange', onPlayerStateChange);
      player.addEventListener('onStateChange', onPlayerStateChange);
      player.loadVideoById({
        videoId,
        startSeconds: loopStart,
        endSeconds: loopEnd
      });
    }
  }, [vw, vh, loopStart, loopEnd, videoId]);

  return (
    <AppContainer>
      <VideoPlayer>
        {loading ? <Loader /> : null}
        <div ref={playerRef} />
      </VideoPlayer>
      {/*<VideoPlayer*/}
      {/*  videoId={videoId}*/}
      {/*  playbackRate={playbackRate}*/}
      {/*  player={player}*/}
      />
      {/*<Menu setPlaybackRate={setPlaybackRate} />*/}
      <SearchContainer show={showControls}>
        <SearchInput ref={inputRef} />
        <Button
          style={{ marginLeft: '8px' }}
          variant="contained"
          onClick={() => setVideoId(inputRef.current.value.split('?v=')[1])}
        >
          Import
        </Button>
      </SearchContainer>
      <LogoContainer
        onClick={() => setShowControls(prev => !prev)}
        show={showControls}
      >
        <Icon name="logo" />
      </LogoContainer>
      <ControlContainer show={showControls}>
        <LoopContainer>
          <Button
            variant="contained"
            style={{ width: '150px' }}
            onClick={setStartPoint}
          >
            Start Point
          </Button>
          <Button
            variant="contained"
            style={{ width: '150px', marginLeft: '16px' }}
            onClick={setEndPoint}
          >
            End Point
          </Button>
          <LoopInfo>
            Currently looping between: {convertToTimeFormat(loopStart)} and{' '}
            {convertToTimeFormat(loopEnd)}
          </LoopInfo>
        </LoopContainer>
        <SpeedContainer>
          <Button
            variant="contained"
            style={{ width: '150px' }}
            onClick={increasePlaybackRate}
          >
            Increase
          </Button>
          <SpeedDisplay>{playbackRate}x</SpeedDisplay>
          <Button
            variant="contained"
            style={{ width: '150px' }}
            onClick={decreasePlaybackRate}
          >
            Decrease
          </Button>
        </SpeedContainer>
      </ControlContainer>
    </AppContainer>
  );
};
