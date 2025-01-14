import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Config from "@/config";
import { useEffect, useRef } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleUserInteraction = () => {
      if (audio) {
        console.log(audio)
        // @ts-ignore
        audio.muted = false; // Unmute the audio
        // @ts-ignore
        audio.play().then(() => console.log('Audio is playing')).catch((err) => console.error('Audio play failed:', err));
      }
      // Remove listeners after interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction); // For mobile devices

    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      if (audio) {
        // @ts-ignore
        audio.pause(); // Stop audio on unmount
        // @ts-ignore
        audio.src = ''; // Clear audio source to release memory
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Wedding Of {Config.brides_man} and {Config.brides_woman}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        {/* Audio Element */}
        <audio loop ref={audioRef}>
          <source src={Config.main_song} type="audio/mpeg" />
        </audio>

        <main className={styles.main}>
          <div className={styles.ctas}>
            <a
              className={styles.primary}
            >
              <Image
                src="/images/envelope.svg"
                alt="Envelope icon"
                width={20}
                height={20}
              />
              Open Invitation
            </a>
          </div>
        </main>
      </div>
    </>
  );
}