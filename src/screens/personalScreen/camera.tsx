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
    if (!executed) {
      setExecuted(true);
      await api.tickets.getTicket(code).then(async (data) => {
        if (data.value.read) {
          Alert.alert('Başarısız', 'Bilet geçersiz!');
          navigation.navigate('Participant', {
            id: id,
          });
        } else if (!data.value.read) {
          if (data.value.eventId === id) {
            await api.tickets.updateTicket(code, true);

            await api.users.getUser(data.value.userId).then((data1) => {
              Alert.alert(
                'Başarılı',
                `İsim: ${data1.value.name} Bilet: ${data.value.ticketName}`,
              );
              navigation.navigate('Participant', {
                id: id,
              });
            });
          } else {
            Alert.alert('Başarısız', `Yetkiniz yok`);
            navigation.navigate('Participant', {
              id: id,
            });
          }
        }
      });
    }
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
};

export default Camera;
