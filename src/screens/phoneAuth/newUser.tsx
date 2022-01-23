import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {api} from '../../api/api';
import {userStore} from '../../stores/userStore';

const newUser = observer(({navigation}) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');

  const goHome = async () => {
    if (validateName(name)) {
      if (validateMail(mail)) {
        api.users.updateUser(
          await auth().currentUser.uid,
          name,
          mail,
          [],
          null,
        );
        userStore.setName(name);
        userStore.setMail(mail);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'HomeTabs'}],
          }),
        );
      } else {
        Alert.alert('Hata', 'Lütfen geçerli bir email adresi giriniz.');
      }
    } else {
      Alert.alert('Hata', 'Lütfen adınızı ve soyadınızı giriniz.');
    }
  };

  const validateName = (name: any) => {
    {
      if (name.split(' ').length > 1) {
        return true;
      }
      return false;
    }
  };

  const validateMail = (mail: any) => {
    {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      }
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <AntDesign name='idcard' size={70} style={styles.icon} />
      <Text style={styles.text1}>Son Bir Adım</Text>
      <Text style={styles.text2}>Lütfen kullanıcı bilgilerini gir.</Text>
      <TextInput
        value={name}
        style={styles.textInput}
        placeholder='Ad Soyad'
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        value={mail}
        keyboardType='email-address'
        style={styles.textInput}
        placeholder='Email '
        onChangeText={(text) => setMail(text)}
      />
      <View style={styles.view1}>
        <Pressable
          onPress={() => {
            console.warn('kullanıcı sözleşmesi');
          }}>
          <Text style={styles.text3}>Kullanıcı Sözleşmesi</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            console.warn('Gizlilik Politikası');
          }}>
          <Text style={styles.text3}>Gizlilik Politikası</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={goHome}
        style={({pressed}) => ({
          ...styles.btnContainer,
          backgroundColor: pressed ? '#9e7549' : '#de6e00',
        })}>
        <Text style={styles.btnText}>Kayıt Ol</Text>
      </Pressable>
    </View>
  );
});
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
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  icon: {
    marginTop: 70,
    marginBottom: 15,
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
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  view1: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-evenly',
    width: 300,
  },
});

export default newUser;
