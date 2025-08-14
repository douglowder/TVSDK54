import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import AudioTest from '@/components/AudioTest';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import VideoTest from '@/components/VideoTest';
import { useScale } from '@/hooks/useScale';

export default function VideoDemoScreen() {
  const scale = useScale();
  const styles = StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: 30 * scale,
      left: 0,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 4 * scale,
    },
  });
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={200 * scale}
          name="videocam-outline"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Audio demo</ThemedText>
      </ThemedView>
      <AudioTest />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Video demo</ThemedText>
      </ThemedView>
      <VideoTest />
    </ParallaxScrollView>
  );
}
