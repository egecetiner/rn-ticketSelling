import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {Icon} from 'react-native-elements';

const SettingsItem = (props: {
  text: string;
  icon: any;
  onPress: () => void;
}) => (
  <Pressable style={styles.settingContainer} onPress={props.onPress}>
    <Text style={styles.settingText}>{props.text}</Text>
    <Icon {...props.icon} />
  </Pressable>
);

const settingsScreen = () => {
  const navigation = useNavigation();
  const signout = async () => {
    try {
      await auth().signOut();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Phone Number'}],
        }),
      );
    } catch (e) {
      Alert.alert(JSON.stringify(e));
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <SettingsItem
        icon={{name: 'file-text', type: 'feather'}}
        text={'Kullanıcı Sözleşmesi'}
        onPress={() => {
          console.warn('oley1');
        }}
      />

      <SettingsItem
        icon={{name: 'shield', type: 'feather'}}
        text={'Gizlilik Politikası'}
        onPress={() => {
          console.warn('oley2');
        }}
      />

      <SettingsItem
        icon={{name: 'basket', type: 'simple-line-icon'}}
        text={'Satış Politikaları'}
        onPress={() => {
          console.warn('oley3');
        }}
      />

      <SettingsItem
        icon={{name: 'mail', type: 'feather'}}
        text={'İletişim'}
        onPress={() => {
          console.warn('oley3');
        }}
      />

      <SettingsItem
        icon={{name: 'log-out', type: 'feather'}}
        text={'Çıkış yap'}
        onPress={() => {
          signout();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    height: '100%',
  },

  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 1,
  },
  settingText: {
    fontSize: 18,
    fontWeight: '400',
  },
});
export default settingsScreen;
