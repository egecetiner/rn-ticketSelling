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
import {api} from '../../api/api';

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

const menu = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.root}>
      <SettingsItem
        icon={{name: 'account-edit-outline', type: 'material-community'}}
        text={'Profili Düzenle'}
        onPress={() => {
          navigation.navigate('editProfile');
        }}
      />
      <SettingsItem
        icon={{name: 'deleteuser', type: 'antdesign', color: 'red'}}
        text={'Profili sil'}
        onPress={() => {
          Alert.alert(
            'Profilinizi silmek istediğinize emin misiniz?',
            '',
            [
              {
                text: 'Sil',
                onPress: async () => {
                  api.users.deleteUser(await auth().currentUser.uid);
                  await auth().signOut();
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'Phone Number'}],
                    }),
                  );
                },
              },
              {
                text: 'Vazgeç',
                style: 'cancel',
              },
            ],
          );
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
export default menu;
