import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {api} from '../api/api';
import cartStack from './cartStack';
import HomeStack from './HomeStack';
import personalStack from './personalStack';
import profileStack from './profileStack';
import settingsStack from './settingsStack';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  const [isPersonal, setIsPersonal] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    await api.users.getUser(await auth().currentUser.uid).then((data) => {
      setIsPersonal(data.value.isPersonal);
    });
    console.log(isPersonal);
  };

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
      tabBarOptions={{
        showLabel: false,
        inactiveTintColor: '#ffbd7d',
        activeTintColor: '#e47911',
      }}>
      <Tab.Screen
        component={HomeStack}
        name='EtkinliklerStack'
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name='calendar' color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={profileStack}
        name='profile'
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name='user' color={color} size={25} />
          ),
        }}
      />

      {isPersonal.length === 0 ? null : (
        <Tab.Screen
          component={personalStack}
          name='personalStack'
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name='qrcode-scan'
                color={color}
                size={25}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        component={cartStack}
        name='shoppingCart'
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name='ticket' color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={settingsStack}
        name='more'
        options={{
          tabBarIcon: ({color}) => (
            <Feather name='settings' color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
