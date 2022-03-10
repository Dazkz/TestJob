import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import RegistrationForm from '../components/Forms/RegistrationForm';
import Header from '../components/Header/Header';
import {colors} from '../theme';

export default () => {
  return (
    <SafeAreaView style={styles.area}>
      <Header />
      <KeyboardAvoidingView
        {...{
          styles: styles.keyAvoidingView,
          behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}>
          <View style={styles.container}>
            <Text style={styles.headLine}>Создать аккаунт</Text>
            <RegistrationForm />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    height: '100%',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headLine: {
    width: 320,
    color: colors.WHITE,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
  },
  keyAvoidingView: {
    flex: 1,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  scrollViewContainer: {
    paddingTop: 50,
  },
});
