import { useState, useEffect } from "react";

interface WebPlaybackProps {
  token: string;
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any; 
  }
}

function WebPlayback(props: WebPlaybackProps) {
  const [player, setPlayer] = useState<any>(undefined);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    script.addEventListener("load", () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const playerInstance = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: (cb: (token: string) => void) => { cb(props.token); }, // Ajoutez une annotation de type ici
          volume: 0.5
        });

        setPlayer(playerInstance);

        playerInstance.addListener('ready', ({ device_id }: any) => {
          console.log('Ready with Device ID', device_id);
        });

        playerInstance.addListener('not_ready', ({ device_id }: any) => {
          console.log('Device ID has gone offline', device_id);
        });

        playerInstance.connect();
      };
    });

    document.body.appendChild(script);
  }, [props.token]);

  return (
    <>
      <div className="container">
        <div className="main-wrapper"></div>
      </div>
    </>
  );
}

export default WebPlayback;
