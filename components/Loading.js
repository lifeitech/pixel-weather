import Lottie from 'lottie-react-native';
import {useTheme } from './theme';

export default function LoadingAnimation() {
    const theme = useTheme();
    return (
      <Lottie source={theme.name == 'light'? require('../assets/dots.json') : require('../assets/bars.json')} autoPlay loop />
    );
  }