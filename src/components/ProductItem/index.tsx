import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import {Alert, Image, Pressable, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {api} from '../../api/api';
import {userStore} from '../../stores/userStore';
import styles from './styles';

interface ProductItemProps {
  item: {
    id: string;
    date: any;
    mekan: string;
    city: string;
    notlar: string;
    description: string;
    program: string;
    biletler: any;
    title: string;
    personals: any;
    eventImage: any;
    ticketId: string;
    ticketName: string;
    read: boolean;
  };
}

const ProductItem = ({item}: ProductItemProps) => {
  const navigation = useNavigation();
  const route = useRoute();

  const onPress = () => {
    if (route.name === 'Etkinlikler') {
      navigation.navigate('ProductDetails', {
        id: item.id,
        date: item.date,
        mekan: item.mekan,
        city: item.city,
        description: item.description,
        program: item.program,
        personals: item.personals,
        biletler: item.biletler,
        title: item.title,
        notlar: item.notlar,
        eventImage: item.eventImage,
      });
    } else if (route.name === 'cart') {
      navigation.navigate('code', {
        date: item.date,
        mekan: item.mekan,
        codeValue: item.ticketId,
        title: item.title,
        city: item.city,
        name: item.ticketName,
        read: item.read,
      });
    } else if (route.name === 'Yetkili Etkinlikler') {
      navigation.navigate('Participant', {
        id: item.id,
      });
    }
  };
  console.log('item1', item);
  const onPressDelete = () => {
    Alert.alert('Etkinliği silmek istediğinize emin misiniz?', '', [
      {
        text: 'Sil',
        onPress: async () => {
          await api.events
            .deleteEvent(item.id)
            .then(Alert.alert('Etkinlik başarıyla silindi'));

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'HomeTabs'}],
            }),
          );
        },
      },
      {
        text: 'Vazgeç',
        style: 'cancel',
      },
    ]);
  };
  const onPressUpdateScreen = () => {
    navigation.navigate('Etkinliği Güncelle', {
      id: item.id,
      date: item.date,
      mekan: item.mekan,
      city: item.city,
      description: item.description,
      program: item.program,
      personals: item.personals,
      biletler: item.biletler,
      title: item.title,
      notlar: item.notlar,
      eventImage: item.eventImage,
    });
  };
  return (
    <View style={styles.newRoot}>
      <Pressable
        onPress={onPressDelete}
        style={[
          styles.pressable1,
          {display: userStore.isAdmin ? 'flex' : 'none'},
        ]}>
        <FontAwesome5 name='window-close' size={35} style={styles.icon} />
      </Pressable>
      <Pressable
        onPress={onPressUpdateScreen}
        style={[
          styles.pressable2,
          {display: userStore.isAdmin ? 'flex' : 'none'},
        ]}>
        <FontAwesome5 name='edit' size={32} style={styles.icon2} />
      </Pressable>
      <Pressable onPress={onPress}>
        <Image
          style={styles.image}
          source={{
            uri: `data:${item.eventImage.mime};base64,${item.eventImage.data}`,
          }}
        />
        <View style={styles.downContainer}>
          <View style={styles.downLeftContainer}>
            <Text
              style={styles.title}>{`${item.title} - ${item.city}`}</Text>
            <Text style={styles.lokasyon}>
              <EvilIcons name='location' size={18} />
              {item.mekan}
            </Text>
          </View>
          <Divider orientation={'vertical'} width={1} color={'grey'} />
          <View style={styles.downRightContainer}>
            <Text style={styles.date} numberOfLines={2}>
              {`${item.date.split(' ')[0]} ${item.date
                .split(' ')[1]
                .substring(0, 3)}`}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ProductItem;
