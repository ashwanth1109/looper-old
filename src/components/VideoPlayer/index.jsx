import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import useNodeSize from 'react-node-size';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { overlay } from '../../colors';
import Loader from '../Common/Loader';
import Loop from '../../classes/Loop';

const Container = styled.div`
  flex: 1;
  height: calc((9 / 16) * 100vw);
  max-height: calc(100vh - 200px);
  min-height: 480px;
  background-color: ${overlay};
  display: flex;
  align-items: center;
  justify-content: center;
`;

let loadYT;

const selectPlayerVars = createSelector(
  state => state.playerVars,
  playerVars => playerVars
);

let player = null;
let YTInstance = null;

const VideoPlayer = ({ videoId }) => {
  // Initialization
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // useNodeSize() - to get dimensions of VideoPlayer Container
  const { setRef, rectValues } = useNodeSize();
  const { width, height } = rectValues || {};

  const playerVars = useSelector(selectPlayerVars);

  const onPlayerStateChange = useCallback(
    e => {
      if (e.data === YT.PlayerState.ENDED) {
        player.seekTo(playerVars.start);
        e.target.playVideo();
      }
    },
    [player, playerVars]
  );

  useEffect(() => {
    if (!loadYT && width && height) {
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
          height,
          width,
          videoId,
          rel: 0,
          events: {
            onStateChange: onPlayerStateChange,
            onReady: onPlayerReady
          },
          iv_load_policy: 0
        });
      });
    } else if (player) {
      player.removeEventListener('onStateChange', onPlayerStateChange);
      player.addEventListener('onStateChange', onPlayerStateChange);
      player.loadVideoById({
        videoId,
        startSeconds: playerVars.start,
        endSeconds: playerVars.end
      });
    }
  }, [width, height, playerVars]);

  return (
    <Container ref={setRef}>
      {loading ? <Loader /> : null}
      <div ref={playerRef} />
    </Container>
  );
};

export default VideoPlayer;

/** CODE GRAVEYARD:
 * // let currentLoop;
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
 * */
