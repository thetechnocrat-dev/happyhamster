"use client"

import React, { useState } from 'react';
import { Player, studioProvider, createReactClient } from '@livepeer/react';
import { LivepeerConfig } from '@livepeer/react';
import { QueryClient } from '@tanstack/react-query';
import { Web3Storage } from 'web3.storage';
import axios from 'axios';
import './globals.css'

const UploadImageComponent: React.FC = () => {
  const [fileData, setFileData] = useState<File | null>(null);
  const [returnedImage, setReturnedImage] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state


  const loadImageBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleIPFSLoad = async () => {
    if (!returnedImage) return;

    const client = new Web3Storage({ token: STORAGE_ACCOUNT });  // replace with your API token

    // Convert Data URL to Blob
    const fetchRes = await fetch(returnedImage);
    const blob = await fetchRes.blob();
  
    // Convert Blob to File
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
 
    const cid = await client.put([file]);
    setCid(cid);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setErrorMessage(null);

    const file = event.target.files?.[0];
    if (!file) {
      setErrorMessage("No file selected.");
      setIsLoading(false);
      return;
    }

    // Check for file type
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setErrorMessage("Invalid file type. Only JPEG and PNG are allowed.");
      setIsLoading(false);
      return;
    }

    try {
      const image = await loadImageBase64(file);
      axios({
        method: "POST",
        url: "https://detect.roboflow.com/toy-hamster/2",
        params: {
          api_key: ROBO_ACCOUNT,
          format: "image"
        },
        data: image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        responseType: 'arraybuffer',  // Important for receiving binary data
      })
      .then(function(response) {
        const arrayBufferView = new Uint8Array(response.data);
        const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
        const objectURL = window.URL.createObjectURL(blob);
        setReturnedImage(objectURL);
        setIsLoading(false);
      })
      .catch(function(error) {
        setErrorMessage(`Error: ${error.message}`);
        console.error('Error in API request:', error);
        setErrorMessage(`Error: ${error.message}`);
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error loading image:', error);
      if (error instanceof Error) {
        console.error('Error loading image:', error);
        setErrorMessage(`Error: ${error.message}`);
      } else {
        console.error('Error loading image:', error);
        setErrorMessage(`Error: Unknown error occurred`);
      }
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.playerContainer}>
      <input style={styles.input} type="file" onChange={handleFileChange} />
      { isLoading ? <div>Processing...</div> : null} {/* Loading message */}
      { returnedImage && <img src={returnedImage} alt="Returned Image" style={styles.responsiveImage} /> }
      { returnedImage && <button onClick={handleIPFSLoad} style={styles.button}>Load to IPFS</button> }
      { cid && <p>CID: {cid}</p> }
    </div>
  );
};

export default function App() {
  const client = createReactClient({
    provider: studioProvider({ apiKey: STREAM_CODE }),
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
      <div style={styles.titleContainer}>
        <img src="/logo.png" alt="Happy Hamster Logo" className='logo' />
      </div>
      <div style={styles.container}>
        <div style={styles.descriptionContainer}>
          <h2 style={styles.subTitle}>Our Vision</h2>
          <p style={styles.description}>
            Happy Hamster envisions a world where every pet hamster plays a role in advancing biomedicine. Through a Data DAO, we aim to reward all participants and create an ecosystem that benefits both animals and humans.
          </p>

          <h2 style={styles.subTitle}>Why It Matters</h2>
          <ul style={styles.bulletPoints}>
            <li><b>Over 1 Million Pets</b>: There are over 1 million pet hamsters just in the U.S., representing a large population that could contribute to valuable research. <a href="https://www.marketwatch.com/story/forget-dogs-and-cats-hamsters-are-quickly-becoming-the-it-pet-11642599895" style={styles.link} target="_blank" rel="noopener noreferrer">[Source]</a></li>
            <li><b>Human-Like Immunity</b>: Hamsters have an immune system more similar to humans than mice do, making them excellent models for studying a variety of diseases. <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6781508" style={styles.link} target="_blank" rel="noopener noreferrer">[Source]</a></li>
            <li><b>Ethical Considerations</b>: Each year, 120 million rodents are sacrificed for research in the U.S. By using pet hamsters that are already in homes, we can reduce this number and promote more ethical and cost effective research methods. <a href="https://bmcbiol.biomedcentral.com/articles/10.1186/s12915-021-01184-0" style={styles.link} target="_blank" rel="noopener noreferrer">[Source]</a></li>
          </ul>

          <h2 style={styles.subTitle}>Inspiration</h2>
          <ul style={styles.bulletPoints}>
            <li>Loyal: Raised $27 million to improve the healthspan of dogs.</li>
            <li>Embark: Secured $75 million for pet dog DNA testing.</li>
          </ul>
        </div>

        <h2 style={styles.subTitle}>Tech</h2>
        <br/>

        <p>
          EthGlobal NY 2023 Stream ended, but you can watch a demo on <a href="https://ethglobal.com/showcase/happy-hamster-e57za" style={styles.link} target="_blank" rel="noopener noreferrer">Happy Hamster Eth Global Showcase</a>
        </p>

        <br/>

        <p style={styles.description}>
          LivePeer: Enables pet owners and veterinarians to monitor hamster activity, a feature especially important for pet clinical trials.
        </p>
        <p style={styles.description}>
          IPFS and OpenCV: Utilized for reproducible research results in machine learning models.
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
          Take a screenshot of the livestream above and upload it below to see the hamster detection model in action.
        </p>
        <UploadImageComponent />
        <p style={styles.description}>
        </p>
        <div style={{ height: '100px' }}></div> {/* This empty div serves as extra space */}
      </div>
    </div>
  );
}

const ROBO_ACCOUNT="FUTpJGYv1o8VDN2dR9op"
const STORAGE_ACCOUNT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAwMEFDODdBMTdEZWI3ZmZiQTlhREVBZEZGZmRDOTc1ZjhGOTM0OWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzUzNzU3MTQ3MjUsIm5hbWUiOiJsYWJkYW8ifQ.Dsld2J1AxYPYwMs_kiXCDjDgd6vxhc-4Zk2SbFOYSMk"
const STREAM_CODE="f5369f20-5b48-490c-a3f0-abca6d6d3eee"

const styles = {
  titleContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5D7E1',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5D7E1',
    minHeight: '100vh',
    color: '#000000',
    fontFamily: 'BalsamiqSans'
  },
  description: {
    fontSize: '1.2rem',
    lineHeight: '1.5',
    textAlign: 'center' as 'center',
    maxWidth: '800px',
  },
  playerContainer: {
    width: '80%',
    maxWidth: '700px',
    backgroundColor: '#ffffff', // White background for the player
    borderRadius: '1rem',
    padding: '1rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Simple box shadow
  },
  subTitle: {
    fontSize: '1.6rem',
    margin: '1rem 0',
  },
  descriptionContainer: {
    marginBottom: '2rem',
    maxWidth: '800px',
    textAlign: 'left' as 'left',
  },
  bulletPoints: {
    listStyleType: 'disc',
    marginLeft: '2rem',
    fontSize: '1.2rem',
    lineHeight: '1.5',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '0.5rem',
  },
  input: {
    display: 'block',
    margin: '1rem 0',
    padding: '0.5rem',
  },
  link: {
    color: '#007bff',  // Or any other color
    textDecoration: 'none'
  },
  button: {
    padding: '0.5rem',
    margin: '1rem 0',
    cursor: 'pointer',
    borderRadius: '0.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
  },
  responsiveImage: {
    maxWidth: '100%', // Ensures the image is fully visible in container
    height: 'auto' // Maintains aspect ratio
  }
};
