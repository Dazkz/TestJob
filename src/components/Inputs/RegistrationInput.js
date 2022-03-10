import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../theme';

const CloseButton = ({value, onPress}) => {
  if (value) {
    return (
      <Pressable style={styles.closeIcon} onPress={onPress}>
        <Icon
          {...{
            name: 'close-circle',
            size: 20,
            color: colors.GREY,
          }}
        />
      </Pressable>
    );
  } else {
    return null;
  }
};

const AnimatedText = Animated.createAnimatedComponent(Text);

export default props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    title,
    keyboardType,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);
  const progress = useSharedValue(0);

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(progress.value, [0, 1], [18, -10], Extrapolate.CLAMP),
      paddingHorizontal: progress.value * 5,
      left: interpolate(progress.value, [0, 1], [20, 15]),
    };
  });

  const close = () => {
    onChange(name)('');
    inputRef.current.focus();
    setIsFocused(false);
  };

  useEffect(() => {
    isFocused
      ? (progress.value = withTiming(1))
      : (progress.value = withTiming(0));
  }, [isFocused, progress]);
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.content,
          {
            borderColor: errors[name]
              ? colors.ERROR
              : success
              ? colors.SUCCESS
              : isFocused
              ? colors.BLUE
              : colors.GREY,
          },
        ]}
        onPress={() => {
          inputRef.current.focus();
        }}>
        {!value ? (
          <AnimatedText style={[styles.label, labelAnimatedStyle]}>
            {title}
          </AnimatedText>
        ) : null}
        <TextInput
          {...{
            style: [styles.input],
            ref: inputRef,
            selectionColor: colors.WHITE,
            onFocus: () => {
              setSuccess(false);
              setIsFocused(true);
              setFieldTouched(name, true, true);
            },
            onBlur: () => {
              setIsFocused(false);
              onBlur(name);
              if (value && !errors[name]) {
                setSuccess(true);
              }
            },
            blurOnSubmit: true,
            value,
            onChangeText: text => {
              onChange(name)(text);
            },
            keyboardAppearance: 'default',
            keyboardType,
            disableFullscreenUI: true,
          }}
        />
        <CloseButton {...{value, onPress: () => close()}} />
      </Pressable>
      {errors[name] && touched[name] ? (
        <Text style={styles.errorTextLine}>{errors[name]}</Text>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    color: colors.GREY,
    fontSize: 14,
  },
  container: {
    marginBottom: 15,
  },
  content: {
    width: 320,
    borderWidth: 1,
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: 15.5,
    top: 14.5,
  },
  label: {
    position: 'absolute',
    color: colors.GREY,
    fontSize: 14,
    lineHeight: 17,
    left: 20,
    backgroundColor: colors.BACKGROUND,
    display: 'flex',
    // borderWidth: 1,
    // borderColor: 'white',
    overflow: 'hidden',
  },
  errorTextLine: {
    fontSize: 12,
    lineHeight: 14.4,
    color: colors.ERROR,
    // alignSelf: 'flex-start',
    minWidth: 320,
    marginTop: 2,
  },
});
