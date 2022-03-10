import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../theme';

export default ({value, onPress}) => {
  return (
    <Pressable
      {...{
        style: [
          styles.container,
          {borderColor: value ? colors.GREY : colors.ERROR},
        ],
        onPress,
      }}>
      {value ? (
        <Icon {...{name: 'checkmark-outline', color: colors.GREY, size: 20}} />
      ) : null}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
