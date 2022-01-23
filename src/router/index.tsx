import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import newUser from '../screens/phoneAuth/newUser';
import OTPScreen from '../screens/phoneAuth/OTPScreen';
import PhoneScreen from '../screens/phoneAuth/PhoneScreen';
import BottomTabNav from './bottomTabNav';

const Root = createStackNavigator();

const Router = (props) => {
  return (
    <NavigationContainer>
      <Root.Navigator
        initialRouteName={props.initialRouteName}
        screenOptions={{headerShown: false}}>
        <Root.Screen component={PhoneScreen} name='Phone Number' />
        <Root.Screen component={OTPScreen} name='OTP Screen' />
        <Root.Screen component={BottomTabNav} name='HomeTabs' />
        <Root.Screen component={newUser} name='Register' />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
