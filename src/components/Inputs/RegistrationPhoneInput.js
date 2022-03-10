import React, {useRef, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../theme';
import {countryCodesArray} from '../../constants/conts';
import MaskInput from 'react-native-mask-input';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DropDownItem = ({item, onPress}) => {
  return (
    <Pressable
      {...{style: styles.dropDownItem, onPress: () => onPress(item.code)}}>
      <Text style={styles.dropDownItemTitle}>{item.title}</Text>
      <Text style={styles.dropDownItemCode}>{item.code}</Text>
    </Pressable>
  );
};

export default ({
  field: {name, onBlur, onChange, value},
  form: {errors, touched, setFieldTouched},
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState('+7');
  const open = useSharedValue(0);
  const inputRef = useRef(null);

  const dropDownAnimStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(open.value, [0.2, 1], [0, 220], Extrapolate.CLAMP),
      borderBottomWidth: open.value,
    };
  });
  const contentAnimStyle = useAnimatedStyle(() => {
    const v = interpolate(open.value, [0.2, 0], [0, 15], Extrapolate.CLAMP);
    return {
      borderBottomRightRadius: v,
      borderBottomLeftRadius: v,
    };
  });

  const dropDownItemPressHandler = code => {
    inputRef.current.blur();
    setCountryCode(code);
  };
  return (
    <View style={styles.container}>
      <AnimatedPressable
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
          contentAnimStyle,
        ]}
        onPress={() => {
          inputRef.current.focus();
        }}>
        <Pressable
          style={styles.countryCode}
          onPress={() => {
            open.value
              ? (open.value = withTiming(0))
              : (open.value = withTiming(1));
            inputRef.current.blur();
          }}>
          <Text style={styles.countryCodeText}>{countryCode}</Text>
          <Icon {...{name: 'caret-down', color: colors.GREY, size: 12}} />
        </Pressable>
        <View style={styles.divider} />
        <MaskInput
          {...{
            ref: inputRef,
            style: styles.input,
            keyboardType,
            value,
            onChangeText: (masked, unmasked) => onChange(name)(masked),
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
            selectionColor: colors.WHITE,
            disableFullscreenUI: true,
            mask: [
              /\d/,
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ],
          }}
        />
      </AnimatedPressable>
      <Animated.View
        nestedScrollEnabled={true}
        style={[dropDownAnimStyle, styles.dropListContainer]}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={styles.dropList}>
          {countryCodesArray.map((item, index) => {
            return (
              <DropDownItem
                {...{
                  item,
                  onPress: dropDownItemPressHandler,
                  key: Math.random() + index,
                }}
              />
            );
          })}
        </ScrollView>
      </Animated.View>
      {errors[name] && touched[name] ? (
        <Text style={styles.errorTextLine}>{errors[name]}</Text>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 15,
  },
  content: {
    minWidth: 320,
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.GREY,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  countryCode: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCodeText: {
    lineHeight: 14,
    fontSize: 14,
    color: colors.GREY,
    marginRight: 5,
  },
  divider: {
    borderLeftWidth: 1,
    height: 20,
    borderColor: colors.GREY,
    opacity: 0.2,
  },
  input: {
    color: colors.GREY,
    fontSize: 14,
    flex: 1,
    paddingHorizontal: 20,
  },
  dropListContainer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 1,
    borderColor: colors.GREY,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  dropList: {
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 35,
  },
  dropDownItem: {
    // flex: 1,
    paddingVertical: 7.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownItemTitle: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.WHITE,
  },
  dropDownItemCode: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.WHITE,
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
