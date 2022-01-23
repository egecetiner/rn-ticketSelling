import auth from '@react-native-firebase/auth';
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

const editProfile = observer(() => {
  const [name, setName] = useState(`${userStore.name}`);
  const [mail, setMail] = useState(`${userStore.mail}`);
  const [identityNumber, setIdentityNumber] = useState(
    `${userStore.identityNumber}`,
  );
  const [adress, setAdress] = useState(`${userStore.adress}`);
  const [city, setCity] = useState(`${userStore.city}`);

  const goProfile = async () => {
    if (validateName(name)) {
      if (mail && city && identityNumber && adress) {
        if (validateMail(mail)) {
          await api.users.updateUser(
            await auth().currentUser.uid,
            name,
            mail,
            city,
            adress,
            identityNumber,
          );
          userStore.setName(name);
          userStore.setMail(mail);
          userStore.setCity(city);
          userStore.setAdress(adress);
          userStore.setIdentityNumber(identityNumber);
          Alert.alert('Bilgileriniz başarıyla güncellendi.');
        } else {
          Alert.alert('Hata', 'Lütfen geçerli bir email adresi giriniz.');
        }
      } else {
        Alert.alert('Hata', 'Lütfen adınızı ve email adresinizi giriniz.');
      }
    } else {
      Alert.alert('Hata', 'Lütfen soyadınız giriniz.');
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
  const validateName = (name: any) => {
    {
      if (name.split(' ').length > 1) {
        return true;
      }
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <AntDesign name='idcard' size={70} style={styles.icon} />

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

      <Text style={styles.text2}>Fatura Bilgileri</Text>

      <TextInput
        value={identityNumber}
        style={styles.textInput}
        placeholder='TC Kimlik No'
        onChangeText={(text) => setIdentityNumber(text)}
      />

      <TextInput
        value={city}
        style={styles.textInput}
        placeholder='Şehir'
        onChangeText={(text) => setCity(text)}
      />

      <TextInput
        value={adress}
        style={styles.textInput}
        placeholder='Fatura Adresi'
        onChangeText={(text) => setAdress(text)}
      />

      <Pressable
        onPress={goProfile}
        style={({pressed}) => ({
          ...styles.btnContainer,
          backgroundColor: pressed ? '#9e7549' : '#de6e00',
        })}>
        <Text style={styles.btnText}>Kaydet</Text>
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
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
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

export default editProfile;
