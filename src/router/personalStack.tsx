import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import personalScreen from '../screens/personalScreen';
import participantScreen from '../screens/personalScreen/participants';

const Stack = createStackNavigator();

const personalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={personalScreen}
        name='Yetkili Etkinlikler'
        options={{title: 'Yetkili Etkinlikler'}}
      />
      <Stack.Screen
        component={participantScreen}
        name='Participant'
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default personalStack;
