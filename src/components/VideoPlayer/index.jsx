import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import useNodeSize from 'react-node-size';

import { overlay } from '../../colors';
import Loader from '../Common/Loader';
import Loop from '../../classes/Loop';

const Container = styled.div`
  width: 100%;
  height: calc((9 / 16) * 100vw);
  max-height: calc(100vh - 200px);
  min-height: 480px;
  background-color: ${overlay};
  display: flex;
  align-items: center;
  justify-content: center;
`;

let loadYT;
const VideoPlayer = () => {
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const { setRef, rectValues } = useNodeSize();
  const { width, height } = rectValues || {};
  console.log('Node Dimensions:', width, height);
  useEffect(() => {}, []);

  // let currentLoop;
  // const [loops, setLoops] = useState({});
  // const [startLoopTime, setStartLoop] = useState(0);
  // let player;
  // useEffect(() => {
  //   if (!loadYT) {
  //     loadYT = new Promise(resolve => {
  //       const tag = document.createElement('script');
  //       tag.src = 'https://www.youtube.com/iframe_api';
  //       const firstScriptTag = document.getElementsByTagName('script')[0];
  //       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  //       window.onYouTubeIframeAPIReady = () => resolve(window.YT);
  //     });
  //   }
  //
  //   let done = false;
  //   const stopVideo = () => {
  //     player.stopVideo();
  //   };
  //   const onPlayerStateChange = e => {
  //     console.log('State was changed');
  //     if (e.data === YT.PlayerState.ENDED) {
  //       player.seekTo(10);
  //       e.target.playVideo();
  //     }
  //   };
  //
  //   const onPlayerReady = e => {
  //     e.target.playVideo();
  //   };
  //
  //   loadYT.then(YT => {
  //     player = new YT.Player(playerRef.current, {
  //       height: 390,
  //       width: 640,
  //       videoId: '4y33h81phKU',
  //       rel: 0,
  //       events: {
  //         onStateChange: onPlayerStateChange,
  //         onReady: onPlayerReady
  //       },
  //       iv_load_policy: 0,
  //       playerVars: {
  //         start: 10,
  //         end: 15
  //       }
  //     });
  //   });
  // }, []);
  //
  // const startLoopClicked = () => {
  //   console.log(player.getCurrentTime());
  //   setStartLoop(player.getCurrentTime());
  // };
  //
  // const stopLoopClicked = () => {};

  // return (
  //   <>
  //     <h1>Looper POC</h1>
  //     <div ref={playerRef}></div>
  //     <button onClick={startLoopClicked}>Start Loop</button>
  //     <button>Stop Loop</button>
  //   </>
  // );

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container ref={setRef}>
      <div ref={playerRef} />
    </Container>
  );
};

export default VideoPlayer;
