import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import editEvent from '../screens/editEvent';
import HomeScreen from '../screens/HomeScreen';
import newEvent from '../screens/newEvent';
import paymentScreen from '../screens/payment';
import ProductScreen from '../screens/ProductScreen';
import editProfile from '../screens/profile/editProfile';
import codeScreen from '../screens/qrcode';

const Stack = createStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen component={HomeScreen} name='Etkinlikler' />
      <Stack.Screen
        component={ProductScreen}
        name='ProductDetails'
        options={{title: ''}}
      />
      <Stack.Screen component={newEvent} name='Yeni Etkinlik' />
      <Stack.Screen component={editEvent} name='Etkinliği Güncelle' />
      <Stack.Screen component={paymentScreen} name='Payment' />
      <Stack.Screen
        component={editProfile}
        name='editProfile'
        options={{
          title: 'Profilim',
        }}
      />
      <Stack.Screen
        component={codeScreen}
        name='code'
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
