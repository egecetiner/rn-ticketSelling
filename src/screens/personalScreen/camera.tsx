import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {CameraScreen} from 'react-native-camera-kit';

function Camera() {
  const navigation = useNavigation();
  const onRead = (code) => {
    navigation.navigate('Participant', {
      code: code,
    });
  };
  return (
    <CameraScreen
      scanBarcode={true}
      onReadCode={(event) => onRead(event.nativeEvent.codeStringValue)} // optional
      showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
      laserColor='transparent' // (default red) optional, color of laser in scanner frame
      frameColor='white' // (default white) optional, color of border of scanner frame
    />
  );
}

export default Camera;
