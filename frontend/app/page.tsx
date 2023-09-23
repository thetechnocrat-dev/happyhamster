"use client"

import { Player, studioProvider, createReactClient } from '@livepeer/react';
import { LivepeerConfig } from '@livepeer/react';
import { QueryClient } from '@tanstack/react-query';


export default function Stream() {
  const client = createReactClient({
    provider: studioProvider({ apiKey: 'fill me in' }),
    queryClient: new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1_000 * 60 * 60, // 1 hour
          retry: 100,
        },
      },
    }),
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // This will make the div take up the full height of the viewport
    }}>
      <div style={{
        width: '50%', // This will make the div take up half the width of its parent
        height: '50%', // This will make the div take up half the height of its parent
      }}>
    <LivepeerConfig client={client}>
      <Player
        title="Happy Hamster"
        playbackId="114b6n4wclqgw4um"
        autoPlay
        muted
      />
    </LivepeerConfig>
    </div>
    </div>
  );
};
