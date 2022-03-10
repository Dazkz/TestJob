import AsyncStorage from '@react-native-async-storage/async-storage';

export default async values => {
  try {
    const data = await AsyncStorage.getItem('Users');
    if (data !== null) {
      console.log('storedData', data);
      await data.push(values);
      try {
        const json = await JSON.stringify(data);
        await AsyncStorage.setItem('Users', json);
        console.log('SUCCESS:', json);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      const json = await JSON.stringify(values);
      await AsyncStorage.setItem('Users', json);
      console.log('SUCCESS:', json);
    }
  } catch (err) {
    console.log(err.message);
  }
};
