import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import personalScreen from '../screens/personalScreen';
import Camera from '../screens/personalScreen/camera';
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
      <Stack.Screen
        component={Camera}
        name='Camera'
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default personalStack;
