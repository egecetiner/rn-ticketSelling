import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';
import {api} from '../../api/api';

const Camera = ({
  route: {
    params: {id},
  },
}) => {
  const navigation = useNavigation();
  const [executed, setExecuted] = useState(false);

  const onRead = async (code: any) => {
    await api.tickets.updateTicket(code, true);
    setExecuted(true);
    Alert.alert('Başarılı', 'Bilet başarıyla okundu.');
    navigation.navigate('Participant', {
      id: id,
    });
  };

  return (
    <CameraScreen
      scanBarcode={true}
      onReadCode={(event) =>
        executed ? null : onRead(event.nativeEvent.codeStringValue)
      } // optional
      showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
      laserColor='transparent' // (default red) optional, color of laser in scanner frame
      frameColor='white' // (default white) optional, color of border of scanner frame
    />
  );
};

export default Camera;
