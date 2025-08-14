import { useScale } from '@/hooks/useScale';
import { AudioPlayerOptions, AudioSource, useAudioPlayer } from 'expo-audio';
import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { DemoButton } from './DemoButton';
import { fractionCompleteFromPosition, ProgressBar } from './ProgressBar';

const source: AudioSource =
  require('@/assets/paza-moduless.mp3') as AudioSource;
const options: AudioPlayerOptions = {
  updateInterval: 1000,
  downloadFirst: false,
};
export default function App() {
  const styles = useAudioStyles();
  const player = useAudioPlayer(source, options);
  const [fractionComplete, setFractionComplete] = useState(0);
  player.addListener('playbackStatusUpdate', (status) => {
    const fraction = fractionCompleteFromPosition(
      status.currentTime,
      status.duration,
    );
    setFractionComplete(fraction);
    // console.log(`Fraction played: ${fraction}`);
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.barContainer}>
          <ProgressBar fractionComplete={fractionComplete} />
        </View>
      </View>
      <View style={styles.buttons}>
        <DemoButton title="Play Sound" onPress={() => player.play()} />
        <DemoButton title="Pause Sound" onPress={() => player.pause()} />
        <DemoButton
          title="Replay Sound"
          onPress={() => {
            player.seekTo(0);
            player.play();
          }}
        />
      </View>
    </View>
  );
}

const useAudioStyles = () => {
  const scale = useScale();
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: Platform.isTV ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    barContainer: {
      borderWidth: 1 * scale,
      borderColor: 'black',
      width: 400 * scale,
    },
    buttons: {
      justifyContent: 'center',
      alignItems: Platform.isTV ? 'flex-start' : 'center',
    },
  });
};
