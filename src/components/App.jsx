import React, { useRef, useEffect, useState } from 'react';
import Loop from '../classes/Loop';

let loadYT;
export default () => {
  let currentLoop;
  const playerRef = useRef(null);
  const [loops, setLoops] = useState({});
  const [startLoopTime, setStartLoop] = useState(0);
  let player;
  useEffect(() => {
    if (!loadYT) {
      loadYT = new Promise(resolve => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    }

    let done = false;
    const stopVideo = () => {
      player.stopVideo();
    };
    const onPlayerStateChange = e => {
      console.log('State was changed');
      if (e.data === YT.PlayerState.ENDED) {
        player.seekTo(10);
        e.target.playVideo();
      }
    };

    const onPlayerReady = e => {
      e.target.playVideo();
    };

    loadYT.then(YT => {
      player = new YT.Player(playerRef.current, {
        height: 390,
        width: 640,
        videoId: '4y33h81phKU',
        rel: 0,
        events: {
          onStateChange: onPlayerStateChange,
          onReady: onPlayerReady
        },
        iv_load_policy: 0,
        playerVars: {
          start: 10,
          end: 15
        }
      });
    });
  }, []);

  const startLoopClicked = () => {
    console.log(player.getCurrentTime());
    setStartLoop(player.getCurrentTime());
  };

  const stopLoopClicked = () => {};

  return (
    <>
      <h1>Looper POC</h1>
      <div ref={playerRef}></div>
      <button onClick={startLoopClicked}>Start Loop</button>
      <button>Stop Loop</button>
    </>
  );
};
