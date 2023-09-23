"use client"

import { Player, studioProvider, createReactClient } from '@livepeer/react';
import { LivepeerConfig } from '@livepeer/react';
import { QueryClient } from '@tanstack/react-query';


export default function App() {
  const client = createReactClient({
    provider: studioProvider({ apiKey: process.env.STREAM_CODE || "" }),
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
    <div style={styles.titleContainer}>
      <div style={styles.logoTitleContainer}>
        <img src="/logo.svg" alt="Logo" />
        <h1 style={styles.title}>Happy Hamster</h1>
      </div>
      <div style={styles.container}>
        <div style={styles.descriptionContainer}>
          <h2 style={styles.subTitle}>Our Mission</h2>
          <p style={styles.description}>
            We're on an exploration to make hamster health a public good. 
          </p>

          <h2 style={styles.subTitle}>Why It Matters</h2>
          <ul style={styles.bulletPoints}>
            <li>There are over 1 million pet hamsters just in the U.S.</li>
            <li>Hamsters have an immune system more similar to humans than mice do.</li>
            <li>Each year, 120 million rodents are sacrificed for research in the U.S.</li>
          </ul>

          <h2 style={styles.subTitle}>The Big Question</h2>
          <p style={styles.description}>
            Could a better understanding of our hamster pets' health help reduce the need for rodent lab animals?
          </p>

          <h2 style={styles.subTitle}>Inspiration</h2>
          <ul style={styles.bulletPoints}>
            <li>LoyalforDogs raised $27 million to improve dog healthspan.</li>
            <li>Embark secured $700 million for pet dog DNA testing.</li>
          </ul>
        </div>

        <h2 style={styles.subTitle}>Tech Ideas</h2>
        <p style={styles.description}>
          LivePeer for vets to monitor hamster health, especially important for pet clinical trials.
        </p>

        <div style={styles.playerContainer}>
          <LivepeerConfig client={client}>
            <Player
              title="Happy Hamster"
              playbackId="114b6n4wclqgw4um"
              autoPlay
              muted
            />
          </LivepeerConfig>
        </div>

        <br/>
        <p style={styles.description}>
          LilyPad for reproducible and verifiable data science
        </p>
        <p>Too implement</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F3E9', // Warm beige background
    color: '#4A3F35', // Warm dark brown text
    minHeight: '100vh',
  },
  titleContainer: {
    color: '#4A3F35', // Warm dark brown text
    backgroundColor: '#F9F3E9', // Warm beige background
    marginBottom: '2rem',
  },
  title: {
    fontSize: '8rem',
    margin: '0',
  },
  description: {
    fontSize: '1.2rem',
    lineHeight: '1.5',
    textAlign: 'center',
    maxWidth: '800px',
  },
  playerContainer: {
    width: '80%',
    backgroundColor: '#ffffff', // White background for the player
    borderRadius: '1rem',
    padding: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Simple box shadow
  },
  subTitle: {
    fontSize: '1.6rem',
    margin: '1rem 0',
    color: '#5D5C61', // Dark gray for emphasis
  },
  descriptionContainer: {
    marginBottom: '2rem',
    maxWidth: '800px',
    textAlign: 'left',
  },
  bulletPoints: {
    listStyleType: 'disc',
    marginLeft: '2rem',
    fontSize: '1.2rem',
    lineHeight: '1.5',
  },
  logoTitleContainer: {
    display: 'flex',
    alignItems: 'center', // This will vertically align the items
    justifyContent: 'center', // This will horizontally align the items
  },
  logo: {
    height: '8rem', // Adjust based on your needs
    marginRight: '1rem', // Optional: Adds some space between the logo and the title
  },
};
