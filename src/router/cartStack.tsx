import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import codeScreen from '../screens/qrcode';
import ticketScreen from '../screens/ticketScreen';

const Stack = createStackNavigator();

const cartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ticketScreen}
        name='cart'
        options={{title: 'Biletlerim'}}
      />
      <Stack.Screen
        component={codeScreen}
        name='code'
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default cartStack;
