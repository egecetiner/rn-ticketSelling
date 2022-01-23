import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {api} from '../../api/api';
import Button from '../../components/Button';
import {userStore} from '../../stores/userStore';

const ProductScreen = observer(
  ({
    route: {
      params: {
        id,
        date,
        mekan,
        city,
        description,
        program,
        biletler,
        title,
        personals,
        notlar,
        eventImage,
      },
    },
  }) => {
    const navigation = useNavigation();
    const [chosen, setChosen] = useState('');
    const [chosenIndex, setChosenIndex] = useState('');
    const [ticket, setTicket] = useState('');

    useEffect(() => {
      fetchdata();
    }, []);

    const fetchdata = async () => {
      await api.tickets
        .getAllTickets({
          userId: await auth().currentUser?.uid,
          eventId: id,
        })
        .then(async (data1) => {
          setTicket(data1.value);
        });
    };

    const onPressUpdateScreen = () => {
      navigation.navigate('Etkinliği Güncelle', {
        id: id,
        date: date,
        mekan: mekan,
        city: city,
        description: description,
        program: program,
        personals: personals,
        biletler: biletler,
        title: title,
        notlar: notlar,
        eventImage: eventImage,
      });
    };

    const onPressDelete = () => {
      Alert.alert('Etkinliği silmek istediğinize emin misiniz?', '', [
        {
          text: 'Sil',
          onPress: async () => {
            await api.events
              .deleteEvent(id)
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

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
        <View style={styles.upperContainer}>
          <Pressable
            onPress={onPressUpdateScreen}
            style={[
              styles.pressable1,
              {display: userStore.isAdmin ? 'flex' : 'none'},
            ]}>
            <FontAwesome5 name='edit' size={32} style={styles.icon2} />
          </Pressable>
          <Pressable
            onPress={onPressDelete}
            style={[
              styles.pressable1,
              {display: userStore.isAdmin ? 'flex' : 'none'},
            ]}>
            <FontAwesome5
              name='window-close'
              size={35}
              style={styles.icon}
            />
          </Pressable>
          <Text style={styles.title}>{`${title} - ${city}`}</Text>
          <Text style={styles.lokasyon}>
            <EvilIcons name='location' size={18} />
            {` ${mekan}`}
          </Text>
        </View>
        {/* Image */}
        <Image
          style={styles.image}
          source={{
            uri: `data:${eventImage.mime};base64,${eventImage.data}`,
          }}
        />

        {/* Description */}
        <View style={styles.description}>
          <Text style={styles.descriptionTitle}>Hakkında</Text>
          <Text style={styles.descriptionContent}>{description}</Text>
        </View>

        {/* Etkinlik Detayları */}

        <View style={styles.detay}>
          <Text style={styles.descriptionTitle}>Etkinlik Detayları</Text>
          <Text style={styles.detayContent1}>
            <EvilIcons name='location' size={18} />
            {`  ${mekan}`}
          </Text>
          <Text style={styles.detayContent2}>
            <Entypo name='calendar' size={18} />
            {`  ${date}`}
          </Text>
        </View>

        {/* Etkinlik Programı */}
        <View style={{paddingVertical: 15}}>
          <Text style={styles.descriptionTitle}>Etkinlik Programı</Text>

          {program.map((number) => (
            <View style={styles.programContent}>
              <View style={styles.programContent1}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.biletContent21}>
                    {number.split('-')[0]}
                  </Text>
                  <Text style={styles.biletContent22}>
                    {number.split('-')[1]}
                  </Text>
                </View>
                <Text style={styles.time}>{number.split('-')[2]}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Biletler */}
        <View style={styles.detay}>
          <Text style={styles.descriptionTitle}>Biletler</Text>
          <Text style={styles.biletContent1}>
            Lütfen bilet eklemek için seçim yapın.
          </Text>

          {biletler.map((number: any) => (
            <Pressable
              onPress={() => {
                setChosen(number);
                setChosenIndex(biletler.indexOf(number));
                if (chosen === number) {
                  setChosen('');
                  setChosenIndex('');
                }
              }}
              style={[
                styles.biletContent2,
                {backgroundColor: chosen === number ? '#66ba6f' : '#fff'},
              ]}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.biletContent21}>
                  {number.split(':')[0]}
                </Text>
                <Text style={styles.biletContent22}>
                  {number.split(':')[1]} TL (KDV Dahil)
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Notlar */}
        <View
          style={[
            styles.description,
            {borderBottomWidth: 1, paddingBottom: 20, marginBottom: 5},
          ]}>
          <Text style={styles.descriptionTitle}>Notlar</Text>
          <Text style={styles.descriptionContent}>{notlar}</Text>
        </View>

        {/* Personel */}
        <View
          style={[
            styles.description,
            {
              borderBottomWidth: 1,
              paddingBottom: 20,
              marginBottom: 5,
              display: userStore.isAdmin ? 'flex' : 'none',
            },
          ]}>
          <Text style={styles.descriptionTitle}>
            Bilet Okuyucu Personel
          </Text>

          {personals.map((number: any) => (
            <View style={styles.numAdd}>
              <View style={styles.personal}>
                <Text>{number.split('-')[1]}</Text>
                <Text>{`+${number.split('-')[0]}`}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Button */}
        {ticket.length !== 0 ? (
          <Button
            text={'Bilete Git'}
            onPress={() => {
              navigation.navigate('code', {
                date: date,
                mekan: mekan,
                codeValue: ticket[0].ticketId,
                title: title,
                city: city,
                name: ticket[0].ticketName,
                read: ticket[0].read,
              });
            }}
          />
        ) : (
          <Button
            text={'Satın Al'}
            onPress={async () => {
              if (chosen !== '') {
                if (userStore.identityNumber) {
                  await api.iyzico
                    .payment(chosen.split(':')[1], chosenIndex, id)
                    .then(async (data) => {
                      setChosen('');
                      navigation.navigate('Payment', {
                        data: data.value,
                      });
                    });
                } else {
                  Alert.alert(
                    'Faturalandırma için gerekli bilgilerinizi girmelisiniz.',
                  );
                  navigation.navigate('editProfile');
                }
              } else {
                Alert.alert('Lütfen bilet seçimi yapınız.');
              }
            }}
          />
        )}
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    padding: 15,
    paddingTop: 0,
  },
  image: {
    flex: 2,
    height: 200,
    borderRadius: 15,
    resizeMode: 'stretch',
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  upperContainer: {
    marginVertical: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  lokasyon: {
    alignSelf: 'center',
    fontSize: 18,
  },
  description: {
    marginVertical: 20,
    lineHeight: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  descriptionContent: {
    fontSize: 18,
  },
  detay: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 15,
  },
  detayContent1: {
    fontSize: 18,
    marginBottom: 5,
  },
  detayContent2: {
    fontSize: 18,
  },
  biletContent1: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '300',
  },
  biletContent2: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  biletContent21: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  biletContent22: {
    fontSize: 16,
    fontWeight: '300',
  },
  programContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  programContent1: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    width: '50%',
  },
  time: {
    fontSize: 20,
    paddingTop: 21,
    fontWeight: '400',
  },
  pressable1: {position: 'absolute', zIndex: 1},
  icon: {
    color: 'red',
    bottom: 10,
    left: -5,
  },
  icon2: {
    left: 335,
    bottom: 10,
  },
  numAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personal: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical: 5,
    paddingHorizontal: 8,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    borderRadius: 8,
  },
});

export default ProductScreen;
