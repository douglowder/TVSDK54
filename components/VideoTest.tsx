import { useInterval } from '@/hooks/useInterval';
import { useScale } from '@/hooks/useScale';
import { useVideoPlayer, VideoPlayerStatus, VideoView } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { DemoButton } from './DemoButton';
import { fractionCompleteFromPosition, ProgressBar } from './ProgressBar';
const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoTest() {
  const styles = useVideoStyles();
  const ref: any = useRef<VideoView>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoStatus, setVideoStatus] = useState<VideoPlayerStatus>('idle');
  const [fractionComplete, setFractionComplete] = useState(0);

  const player = useVideoPlayer(videoSource, (player) => {
    player.addListener('statusChange', (payload) => {
      setVideoStatus(payload.status);
      console.log(`video status = ${payload.status}`);
    });
  });

  useEffect(() => {
    if (player.playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [player.playing]);

  useEffect(() => {
    if (videoStatus === 'readyToPlay') {
      // Autoplay on start
      //      player.play();
    }
  }, [videoStatus]);

  useInterval(() => {
    setFractionComplete(
      fractionCompleteFromPosition(player.currentTime, player.duration),
    );
  }, 1000);

  return (
    <View style={styles.container}>
      <View style={styles.videoStyle}>
        {videoStatus === 'readyToPlay' || Platform.OS === 'android' ? (
          <VideoView
            ref={ref}
            style={styles.videoStyle}
            player={player}
            nativeControls
            contentFit="fill"
            showsTimecodes
            fullscreenOptions={{ enable: true }}
            allowsPictureInPicture
            contentPosition={{ dx: 0, dy: 0 }}
          />
        ) : (
          <View style={styles.videoStyle} />
        )}
        <ProgressBar fractionComplete={fractionComplete} />
      </View>
      <View style={styles.buttons}>
        <DemoButton
          title="Rewind"
          onPress={() => {
            player.currentTime = 0;
            setFractionComplete(
              fractionCompleteFromPosition(player.currentTime, player.duration),
            );
          }}
        />
        <DemoButton
          title="Back 5 sec"
          onPress={() => {
            player.seekBy(-5);
            setFractionComplete(
              fractionCompleteFromPosition(player.currentTime, player.duration),
            );
          }}
        />
        <DemoButton
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (player.playing) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
        <DemoButton
          title="Forward 5 sec"
          onPress={() => {
            player.seekBy(5);
            setFractionComplete(
              fractionCompleteFromPosition(player.currentTime, player.duration),
            );
          }}
        />
        <DemoButton
          title="Full screen"
          onPress={() => {
            ref.current.enterFullscreen();
          }}
        />
      </View>
    </View>
  );
}

export const useVideoStyles = () => {
  const scale = useScale();
  const vidHeight = 200 * scale;
  const vidWidth = 2 * vidHeight;
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: Platform.isTV ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: vidWidth,
      height: vidHeight,
    },
    buttons: {
      justifyContent: 'center',
      alignItems: Platform.isTV ? 'flex-start' : 'center',
    },
  });
};
