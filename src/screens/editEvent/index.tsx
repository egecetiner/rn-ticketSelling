import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {api} from '../../api/api';
import Button from '../../components/Button';
import {eventStore} from '../../stores/eventStore';

const editEvent = ({
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
  const [image, setImage] = useState(eventImage);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
      mediaType: 'photo',
      height: 200,
      width: 370,
    }).then((im) => {
      setImage({mime: im.mime, data: im.data});
    });
  };

  const navigation = useNavigation();
  const [title9, setTitle] = useState(title);
  const [description9, setDescription] = useState(description);
  const [mekan9, setMekan] = useState(mekan);
  const [city9, setCity] = useState(city);
  const [notlar9, setNotlar] = useState(notlar);

  const [date1, setDate1] = useState(new Date());
  const [date9, setDate] = useState(date);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [tickets, setTickets] = useState('');
  const [price, setPrice] = useState('');
  const [biletler9, setBiletler] = useState(biletler);

  const [program1, setProgram1] = useState('');
  const [program2, setProgram2] = useState('');
  const [program3, setProgram3] = useState(new Date());
  const [program9, setProgram] = useState(program);
  const [time, setTime] = useState('Saat');

  const [personalValue, setPersonalValue] = useState('');
  const [personals2, setPersonals2] = useState(personals);

  // güncelle butonu
  const onCheckout = async () => {
    if (!title9) {
      Alert.alert('Başlık boş bırakılamaz.');
      return;
    }

    if (!mekan9) {
      Alert.alert('Lokasyon boş bırakılamaz.');
      return;
    }

    if (!date9) {
      Alert.alert('Tarih boş bırakılamaz.');
      return;
    }

    if (!description9) {
      Alert.alert('Hakkında boş bırakılamaz.');
      return;
    }
    if (!city9) {
      Alert.alert('Şehir boş bırakılamaz.');
      return;
    }
    if (!notlar9) {
      Alert.alert('Notlar boş bırakılamaz.');
      return;
    }
    if (biletler9.length === 0) {
      Alert.alert('Bilet boş bırakılamaz.');
      return;
    }
    if (personals2.length === 0) {
      Alert.alert('Personel boş bırakılamaz.');
      return;
    }

    //refresh
    const wait = (timeout: number) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    const onRefresh = () => {
      eventStore.setRefreshing(true);
      wait(1000).then(() => {
        eventStore.setRefreshing(false);
      });
    };

    //yeni personal eklendiyse personale eventi atıyor

    const isntPersonalAdded = personals2.every((elem: any) =>
      personals.includes(elem),
    );
    if (!isntPersonalAdded) {
      personals2.forEach(async (x: any) => {
        await api.users
          .getAllUsers({phoneNumber: x.split('-')[0]})
          .then(async (data) => {
            let id1 = data.value[0].id;
            let name = data.value[0].name;
            let mail = data.value[0].mail;
            let city = data.value[0].city;
            let adress = data.value[0].adress;
            let identityNumber = data.value[0].identityNumber;
            data.value[0].isPersonal.push(id);

            await api.users.updateUser(
              id1,
              name,
              mail,
              city,
              adress,
              identityNumber,
              data.value[0].isPersonal,
            );
          });
      });
    }

    // personal silindiyse personalden eventi alıyor
    const isntPersonalDeleted = personals.every((elem: any) =>
      personals2.includes(elem),
    );
    if (!isntPersonalDeleted) {
      const a = personals.filter((x: any) => {
        return !personals2.includes(x);
      });

      a.map(async (x: any) => {
        await api.users
          .getAllUsers({phoneNumber: x.split('-')[0]})
          .then(async (data) => {
            let id1 = data.value[0].id;
            let name = data.value[0].name;
            let mail = data.value[0].mail;
            let city = data.value[0].city;
            let adress = data.value[0].adress;
            let identityNumber = data.value[0].identityNumber;
            let isPersonal = data.value[0].isPersonal.filter((x) => {
              return x !== id;
            });

            await api.users.updateUser(
              id1,
              name,
              mail,
              city,
              adress,
              identityNumber,
              isPersonal,
            );
          });
      });
    }
    console.log('burası2', id);

    await api.events
      .updateEvent(
        id,
        title9,
        description9,
        date9,
        mekan9,
        city9,
        program9,
        biletler9,
        personals2,
        notlar9,
        image,
      )
      .then(() => {
        onRefresh;
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'HomeTabs'}],
          }),
        );
      })
      .then(
        Alert.alert(`Etkinlik ${title9} - ${city9} başarıyla güncellendi`),
      );
  };
  // seçilen tarihi Türkçe ayarlıyor
  const confirmDate = (date1) => {
    setOpen(false);
    setDate1(date1);
    let monthNames = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ];
    let monthIndex = date1.getMonth();
    setDate(
      `${date1.toString().split(' ')[2]} ${
        monthNames[monthIndex]
      } ${date1.getFullYear()}`,
    );
  };

  // seçilen saati 0lı formata ayarlıyor
  const confirmDate1 = (date1) => {
    setOpen1(false);
    if (
      date1.getHours().toString().length === 1 &&
      date1.getMinutes().toString().length === 1
    ) {
      const time = `0${date1.getHours()}:0${date1.getMinutes()}`;
      setTime(time);
    } else if (date1.getHours().toString().length === 1) {
      const time = `0${date1.getHours()}:${date1.getMinutes()}`;
      setTime(time);
    } else if (date1.getMinutes().toString().length === 1) {
      const time = `${date1.getHours()}:0${date1.getMinutes()}`;
      setTime(time);
    } else {
      const time = `${date1.getHours()}:${date1.getMinutes()}`;
      setTime(time);
    }
    setProgram3(date1);
  };
  //Program ekleme silme
  const addProgram = () => {
    const result = program9.filter((x) => {
      return x.split(':')[2] === program3;
    });

    if (result.length > 0) {
      Alert.alert('Program saatleri aynı olamaz.');
      setProgram1('');
      setProgram2('');
      setProgram3('');
    } else if (!program1 || !program2 || !program3) {
      Alert.alert('Program boş bırakılamaz.');
    } else {
      setProgram([...program9, `${program1}-${program2}-${time}`]);
      setProgram1('');
      setProgram2('');
      setProgram3(new Date());
      setTime('');

      return;
    }
  };

  const deleteProgram = (i) => {
    const programNew = program9.filter((x) => {
      return x !== i;
    });
    setProgram(programNew);
  };

  //Bilet ekleme silme
  const validatePrice = (price) => {
    {
      if (/(\d+(?:[\.,](?![\.,])\d+)*)/g.test(price)) {
        return true;
      }
      return false;
    }
  };

  const addTickets = () => {
    const result = biletler9.filter((x) => {
      return x.split(':')[0] === tickets;
    });

    if (result.length > 0) {
      Alert.alert('Bilet isimleri aynı olamaz.');
      setTickets('');
      setPrice('');
    } else if (!tickets || !price) {
      Alert.alert('Bilet ve fiyat boş bırakılamaz.');
    } else if (!validatePrice(price)) {
      Alert.alert('Fiyat rakamlardan oluşmalıdır.');
    } else {
      setBiletler([...biletler9, `${tickets}:${price}`]);
      setTickets('');
      setPrice('');

      return;
    }
  };

  const deleteTicket = (i) => {
    const biletlerNew = biletler9.filter((x) => {
      return x !== i;
    });
    setBiletler(biletlerNew);
  };

  // Personal ekleme silme
  const addPersonal = async () => {
    const result = personals2.filter((x) => {
      return x.split('-')[0] === personalValue;
    });

    if (personalValue[0] !== '+') {
      Alert.alert('Örnek telefon formatı: "+90 505 129 25 25"');
      setPersonalValue('');
    } else if (result.length > 0) {
      Alert.alert('Personal daha önce kaydedildi.');
      setPersonalValue('');
    } else {
      await api.users
        .getAllUsers({
          phoneNumber: personalValue.split('+')[1].replace(/\s+/g, ''),
        })
        .then((data) => {
          if (data.value.length === 0) {
            Alert.alert('Kullanıcı bulunamadı.');
          } else {
            setPersonals2([
              ...personals2,
              `${personalValue.split('+')[1].replace(/\s+/g, '')}-${
                data.value[0].name
              }`,
            ]);
            setPersonalValue('');
          }
        });
    }
  };

  const deletePersonal = (i) => {
    const personalsNew2 = personals2.filter((x) => {
      return x !== i;
    });
    setPersonals2(personalsNew2);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 170 : 0}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
        {/* Title */}
        <View style={styles.row}>
          <Text style={styles.label}>Etkinlik Adı</Text>
          <TextInput
            style={styles.input}
            placeholder='Duman'
            value={title9}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.resimrow}>
            <Text style={styles.label}>Etkinlik Resmi</Text>
            <Pressable
              style={{display: image.length == 0 ? 'none' : 'flex'}}
              onPress={() => {
                setImage([]);
              }}>
              <Text style={styles.label2}>Resmi Kaldır</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={choosePhotoFromLibrary}
            style={[
              styles.imageContainer,
              {
                borderWidth: image.length == 0 ? 2 : 0,
                justifyContent: image.length == 0 ? 'center' : null,
                alignItems: image.length == 0 ? 'center' : null,
              },
            ]}>
            {image.length != 0 ? (
              <Image
                style={styles.image}
                source={{uri: `data:${image.mime};base64,${image.data}`}}
              />
            ) : (
              <MaterialIcons
                name='add-to-photos'
                color={'gray'}
                size={70}
              />
            )}
          </Pressable>
        </View>

        {/* Hakkında */}
        <View style={styles.row}>
          <Text style={styles.label}>Hakkında</Text>
          <TextInput
            style={styles.input2}
            placeholder=''
            value={description9}
            onChangeText={setDescription}
            multiline={true}
          />
        </View>

        {/* İl */}
        <View style={styles.row}>
          <Text style={styles.label}>İl</Text>

          <TextInput
            style={styles.input}
            placeholder='Eskişehir'
            value={city9}
            onChangeText={(text) => {
              setCity(text);
            }}
          />
        </View>

        {/* Mekan */}
        <View style={styles.row}>
          <Text style={styles.label}>Mekan</Text>
          <TextInput
            style={styles.input}
            placeholder='Milyon Performance Hall Eskişehir'
            value={mekan9}
            onChangeText={(text) => {
              setMekan(text);
            }}
          />
        </View>

        {/* Tarih */}
        <View style={styles.row}>
          <Text style={styles.label}>Tarih</Text>
          <Pressable style={styles.input} onPress={() => setOpen(true)}>
            <Text>{date9}</Text>
          </Pressable>
          <DatePicker
            modal
            mode='date'
            open={open}
            date={date1}
            onConfirm={confirmDate}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        {/* Program */}

        <View style={styles.row}>
          <Text style={styles.label}>Program</Text>
          <View style={styles.numAdd}>
            <TextInput
              style={[styles.input, {width: 120}]}
              placeholder='Ana Sahne'
              value={program1}
              onChangeText={setProgram1}></TextInput>
            <TextInput
              style={[styles.input, {width: 120}]}
              placeholder='Duman'
              value={program2}
              onChangeText={setProgram2}></TextInput>

            <Pressable
              style={[styles.input, {width: 62}]}
              onPress={() => setOpen1(true)}>
              <Text style={{color: time === 'Saat' ? '#d4cecd' : 'black'}}>
                {time}
              </Text>
            </Pressable>
            <DatePicker
              modal
              is24hourSource='locale'
              mode='time'
              open={open1}
              date={program3}
              onConfirm={confirmDate1}
              onCancel={() => {
                setOpen1(false);
              }}
            />

            <Pressable>
              <Ionicons
                name='add-circle-outline'
                size={35}
                onPress={addProgram}
              />
            </Pressable>
          </View>

          {program9.map((number) => (
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
                <Text style={styles.biletContent23}>
                  {number.split('-')[2]}
                </Text>
              </View>
              <Pressable>
                <MaterialIcons
                  name='delete-outline'
                  size={30}
                  onPress={() => deleteProgram(number)}
                  color={'red'}
                />
              </Pressable>
            </View>
          ))}
        </View>

        {/* Tickets */}

        <View style={styles.row}>
          <Text style={styles.label}>Biletler</Text>
          <View style={styles.numAdd}>
            <TextInput
              style={[styles.input, {width: 220}]}
              placeholder='Ön Satış'
              value={tickets}
              onChangeText={setTickets}></TextInput>
            <TextInput
              style={[styles.input, {width: 70}]}
              placeholder='70.00'
              value={price}
              onChangeText={setPrice}></TextInput>
            <Text style={{paddingRight: 5}}>TL</Text>
            <Pressable>
              <Ionicons
                name='add-circle-outline'
                size={35}
                onPress={addTickets}
              />
            </Pressable>
          </View>

          {biletler9.map((number) => (
            <View style={styles.programContent}>
              <View style={styles.programContent1}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.biletContent21}>
                    {number.split(':')[0]}
                  </Text>
                  <Text style={styles.biletContent22}>
                    {number.split(':')[1]} TL (KDV Dahil)
                  </Text>
                </View>
              </View>
              <Pressable>
                <MaterialIcons
                  name='delete-outline'
                  size={30}
                  onPress={() => deleteTicket(number)}
                  color={'red'}
                />
              </Pressable>
            </View>
          ))}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Notlar</Text>
          <TextInput
            style={[styles.input, {height: 80}]}
            placeholder=''
            value={notlar9}
            onChangeText={setNotlar}
            multiline={true}
          />
        </View>
        {/* Personals */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Bilet Okuyucu Personel Numaraları
          </Text>
          <View style={styles.numAdd}>
            <TextInput
              style={[styles.input, {width: 320}]}
              placeholder='+90 505 129 25 25 '
              value={personalValue}
              keyboardType='phone-pad'
              onChangeText={setPersonalValue}></TextInput>
            <Pressable>
              <Ionicons
                name='add-circle-outline'
                size={35}
                onPress={addPersonal}
              />
            </Pressable>
          </View>

          {personals2.map((number) => (
            <View style={styles.numAdd}>
              <View style={styles.personal}>
                <Text>{number.split('-')[1]}</Text>
                <Text>{`+${number.split('-')[0]}`}</Text>
              </View>
              <Pressable>
                <MaterialIcons
                  name='delete-outline'
                  size={30}
                  onPress={() => deletePersonal(number)}
                  color={'red'}
                />
              </Pressable>
            </View>
          ))}
        </View>

        <Button
          containerStyles={{marginBottom: 20}}
          text='Etkinliği Güncelle'
          onPress={onCheckout}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default editEvent;

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
    height: 40,
    borderWidth: 2,
    borderColor: '#e47911',
    borderRadius: 8,
    placeholderTextColor: 'black',
  },
  input2: {
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 5,
    justifyContent: 'flex-start',
    height: 60,
    borderWidth: 2,
    borderColor: '#e47911',
    borderRadius: 8,
    placeholderTextColor: 'black',
  },
  errorLabel: {
    color: 'red',
  },
  imageContainer: {
    marginVertical: 5,
    flex: 2,
    height: 200,
    borderRadius: 15,
    borderColor: '#e47911',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  numAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  getNum: {
    backgroundColor: 'white',
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',

    marginVertical: 5,

    paddingHorizontal: 8,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    width: 320,
    borderRadius: 8,
  },
  biletContent2: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
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
  biletContent23: {
    fontSize: 20,
    paddingTop: 22,

    fontWeight: '400',
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
    width: 320,
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
    width: 320,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    borderColor: '#e47911',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  resimrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label2: {
    textDecorationLine: 'underline',
  },
});
