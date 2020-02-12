import React, { useRef, useEffect } from 'react';

let loadYT;
export default () => {
  const playerRef = useRef(null);
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
      if (e.data === YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
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
        events: {
          onStateChange: onPlayerStateChange,
          onReady: onPlayerReady
        }
      });
    });
  }, []);

  return (
    <>
      <h1>Looper POC</h1>
      <div ref={playerRef}></div>
    </>
  );
};
