import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {api} from '../../api/api';
import CustomText from './components/CustomText';
import CustomTextInput from './components/CustomTextInput';
import ErrorBoundary from './components/ErrorBoundry';
import FullButtonComponent from './components/FullButtonComponent';
import {Styles} from './Styles';

const OTPScreen = function ({
  route: {
    params: {phoneNumber},
  },
}) {
  const [otpArray, setOtpArray] = useState(['', '', '', '']);

  const [errorMessage, setErrorMessage] = useState('');
  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation();

  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fivthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  const refCallback = (textInputRef) => (node) => {
    textInputRef.current = node;
  };

  useEffect(() => {
    signInWithPhoneNumber();
  }, []);

  async function signInWithPhoneNumber() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (e) {
      console.log(e);
      Alert.alert('Hata', 'Bir şeyler ters gitti. Lütfen tekrar dene.');
    }
  }

  async function confirmCode() {
    try {
      const code = otpArray.join('');
      const response = await confirm.confirm(code);
      if (response) {
        api.users.getUser(await auth().currentUser.uid).then((data) => {
          if (typeof data.value.phoneNumber === 'string') {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'HomeTabs'}],
              }),
            );
          } else {
            api.users.addUser(phoneNumber.split('+')[1]);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Register'}],
              }),
            );
          }
        });
      }
    } catch (e) {
      Alert.alert('Hata', 'Bir şeyler ters gitti. Lütfen tekrar dene.');
    }
  }
  const onOtpChange = (index) => {
    return (value) => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fivthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
      }
    };
  };

  const onOtpKeyPress = (index) => {
    return ({nativeEvent: {key: value}}) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fivthTextInputRef.current.focus();
        }
        if (Platform.OS === 'android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = '';
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  return (
    <ErrorBoundary screenName={'OTPScreen'}>
      <View style={styles.container}>
        <MaterialIcons
          name='sms'
          color={'white'}
          size={100}
          style={styles.icon}
        />
        <Text style={styles.text1}>Onay Kodu</Text>
        <Text style={styles.text2}>{phoneNumber}</Text>
        <View style={styles.view1}>
          {[
            firstTextInputRef,
            secondTextInputRef,
            thirdTextInputRef,
            fourthTextInputRef,
            fivthTextInputRef,
            sixthTextInputRef,
          ].map((textInputRef, index) => (
            <CustomTextInput
              containerStyle={styles.fill}
              value={otpArray[index]}
              onKeyPress={onOtpKeyPress(index)}
              onChangeText={onOtpChange(index)}
              keyboardType={'numeric'}
              maxLength={1}
              style={[styles.otpText, Styles.centerAlignedText]}
              autoFocus={index === 0 ? true : undefined}
              refCallback={refCallback(textInputRef)}
              key={index}
            />
          ))}
        </View>
        {errorMessage ? (
          <CustomText
            style={[
              Styles.negativeText,
              Styles.mt12,
              Styles.centerAlignedText,
            ]}>
            {errorMessage}
          </CustomText>
        ) : null}
        <Pressable
          onPress={() => {
            navigation.navigate('Phone Number');
          }}>
          <Text style={styles.text3}>Yeni numara</Text>
        </Pressable>
        <FullButtonComponent
          type={'fill'}
          text={'Onayla'}
          textStyle={styles.submitButtonText}
          buttonStyle={styles.button}
          onPress={() => confirmCode()}
        />
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#e8b889',
    paddingBottom: 325,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otpText: {
    color: 'black',
    fontSize: 20,
    width: '100%',
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 22,
    paddingTop: 10,
    paddingBottom: 15,
  },
  text3: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 15,
    textDecorationLine: 'underline',
  },
  view1: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  fill: {
    flex: 1,
    marginRight: 15,
    backgroundColor: '#f7f0f0',
  },
  button: {
    backgroundColor: '#de6e00',
    marginTop: 20,
  },
  icon: {
    marginTop: 150,
    marginBottom: 50,
  },
});

export default OTPScreen;
