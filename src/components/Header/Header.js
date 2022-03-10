import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import {colors} from '../../theme';

export default () => {
  return (
    <View style={styles.container}>
      <Icon name="arrow-left" size={28} color={colors.GREY} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 28,
    paddingHorizontal: 20,
  },
});
