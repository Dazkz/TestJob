import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import {colors} from '../../theme';

export default ({title, handleSubmit, isValid, loading, setLoading}) => {
  return (
    <Pressable
      {...{
        style: [
          styles.container,
          {backgroundColor: isValid ? colors.BLUE : colors.GREY},
        ],
        onPress: () => {
          handleSubmit();
          setLoading(true);
        },
        disabled: !isValid,
      }}>
      {loading ? (
        <ActivityIndicator {...{color: colors.WHITE, size: 'small'}} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 320,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },
  text: {
    color: colors.WHITE,
  },
});
