import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Icon} from 'react-native-elements';
import profileScreen from '../screens/profile';
import editProfile from '../screens/profile/editProfile';
import menu from '../screens/profile/menu';

const Stack = createStackNavigator();

const profileStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={profileScreen}
        name='profil'
        options={{
          title: '',
          headerRight: () => (
            <Icon
              onPress={() => {
                console.warn('kankalar');
              }}
              containerStyle={{paddingRight: 15}}
              name='user-friends'
              type='font-awesome-5'></Icon>
          ),
          headerLeft: () => (
            <Icon
              onPress={() => navigation.navigate('menu')}
              containerStyle={{paddingLeft: 15}}
              name='menu'
              type='feather'></Icon>
          ),
        }}
      />
      <Stack.Screen
        component={menu}
        name='menu'
        options={{
          title: 'Menü',
        }}
      />
      <Stack.Screen
        component={editProfile}
        name='editProfile'
        options={{
          title: 'Profilim',
        }}
      />
    </Stack.Navigator>
  );
};

export default profileStack;
