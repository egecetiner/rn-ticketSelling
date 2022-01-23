import auth from '@react-native-firebase/auth';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';
import Router from './src/router';

const App = observer(() => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={{flex: 1}}>
        <Router initialRouteName='Phone Number' />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <Router initialRouteName='HomeTabs' />
      </View>
    );
  }
});

export default App;
