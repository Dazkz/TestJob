import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Screen from './src/Screen/Screen';
import {colors} from './src/theme';

export default function App() {
  return (
    <>
      <StatusBar
        {...{barStyle: 'light-content', backgroundColor: colors.BACKGROUND}}
      />
      <SafeAreaProvider>
        <Screen />
      </SafeAreaProvider>
    </>
  );
}
