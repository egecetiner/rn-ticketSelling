import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const PhoneScreen = ({navigation}) => {
  const [phoneNumber, addPhoneNumber] = useState('+90');

  const GetOTP = () => {
    if (phoneNumber && phoneNumber.length > 9) {
      navigation.navigate('OTP Screen', {phoneNumber});
    } else
      Alert.alert(
        'Hata',
        'Lütfen geçerli bir cep telefonu numarası giriniz.',
      );
  };

  return (
    <View style={styles.container}>
      <SimpleLineIcons
        name='screen-smartphone'
        color={'white'}
        size={200}
        style={styles.icon}
      />
      <TextInput
        value={phoneNumber}
        keyboardType='phone-pad'
        style={styles.textInput}
        placeholder='+90 123 456 78 90'
        onChangeText={(text) => addPhoneNumber(text)}
      />
      <Pressable
        onPress={GetOTP}
        style={({pressed}) => ({
          ...styles.btnContainer,
          backgroundColor: pressed ? '#9e7549' : '#de6e00',
        })}>
        <Text style={styles.btnText}>Gönder</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#e8b889',
  },
  btnContainer: {
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    height: 50,
    width: 300,
    borderRadius: 10,
    paddingLeft: 20,
    backgroundColor: '#f7f0f0',
    fontSize: 20,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  icon: {
    marginTop: 150,
    marginBottom: 50,
  },
});

export default PhoneScreen;
