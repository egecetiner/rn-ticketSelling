import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import settingsScreen from '../screens/settingsScreen';

const Stack = createStackNavigator();

const settingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={settingsScreen}
        name='cart'
        options={{title: 'Ayarlar'}}
      />
    </Stack.Navigator>
  );
};

export default settingsStack;
