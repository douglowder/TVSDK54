import { useScale } from '@/hooks/useScale';
import { Pressable, StyleSheet, Text } from 'react-native';

export const DemoButton = (props: { title: string; onPress: () => void }) => {
  const styles = useVideoStyles();
  return (
    <Pressable
      onPress={() => props.onPress()}
      style={({ pressed, focused }) => [
        styles.button,
        pressed || focused ? { backgroundColor: 'blue' } : {},
      ]}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
};

export const useVideoStyles = () => {
  const scale = useScale();
  return StyleSheet.create({
    button: {
      backgroundColor: 'darkblue',
      margin: 5 * scale,
      borderRadius: 2 * scale,
      padding: 5 * scale,
    },
    buttonText: {
      color: 'white',
      fontSize: 8 * scale,
    },
  });
};
