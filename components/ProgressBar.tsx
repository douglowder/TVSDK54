import { useScale } from '@/hooks/useScale';
import { StyleSheet, View } from 'react-native';

export const ProgressBar = (props: any) => {
  const styles = useProgressBarStyles();
  const progressBarStyles = {
    container: styles.progressContainer,
    left: [styles.progressLeft, { flex: props?.fractionComplete || 0.0 }],
    right: [
      styles.progressRight,
      { flex: 1.0 - props?.fractionComplete || 1.0 },
    ],
  };
  return (
    <View style={progressBarStyles.container}>
      <View style={progressBarStyles.left} />
      <View style={progressBarStyles.right} />
    </View>
  );
};

export const fractionCompleteFromPosition = (
  position: number | undefined,
  duration: number | undefined,
) => {
  return duration !== undefined ? (position ?? 0) / duration : 0;
};

const useProgressBarStyles = () => {
  const scale = useScale();
  const vidHeight = 200 * scale;
  const vidWidth = 2 * vidHeight;
  return StyleSheet.create({
    progressContainer: {
      flexDirection: 'row',
      width: vidWidth,
      height: 5 * scale,
      margin: 0,
    },
    progressLeft: {
      backgroundColor: 'blue',
      borderTopRightRadius: 5 * scale,
      borderBottomRightRadius: 5 * scale,
      flexDirection: 'row',
      height: '100%',
    },
    progressRight: {
      flexDirection: 'row',
      height: '100%',
    },
  });
};
