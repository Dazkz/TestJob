import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../theme';
import Checkbox from '../Checkboxes/Checkbox';

export default ({value, onPress}) => {
  return (
    <View style={styles.container}>
      <Checkbox
        {...{
          value,
          onPress,
        }}
      />
      <Text style={styles.text} numberOfLines={3}>
        Регистрируясь, вы соглашаетесь с нашими{' '}
        <Text style={styles.refs}>Условиями использования</Text> и{' '}
        <Text style={styles.refs}>Политикой конфиденциальности</Text>.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    minWidth: 320,
    minHeight: 42,
    marginTop: 20,
    flexDirection: 'row',
  },
  text: {
    fontSize: 12,
    lineHeight: 14.4,
    color: colors.GREY,
    marginLeft: 15,
    width: 280,
  },
  refs: {
    textDecorationLine: 'underline',
  },
});
