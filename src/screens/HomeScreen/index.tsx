import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import publicIP from 'react-native-public-ip';
import Feather from 'react-native-vector-icons/Feather';
import {api} from '../../api/api';
import Button from '../../components/Button';
import ProductItem from '../../components/ProductItem';
import {eventStore} from '../../stores/eventStore';
import {userStore} from '../../stores/userStore';

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = observer(() => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const onRefresh = React.useCallback(() => {
    eventStore.setRefreshing(true);
    wait(1000).then(() => {
      eventStore.setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    initializeApp();
    fetchdata();
  }, [eventStore.refreshing]);

  useEffect(() => {
    filterdata();
  }, [searchValue, data, date2]);

  const initializeApp = async () => {
    publicIP()
      .then((ip) => {
        userStore.setIp(ip);
      })
      .catch((error) => {
        console.log(error);
      });

    await api.users.getUser(await auth().currentUser.uid).then((data) => {
      if (typeof data.value.name !== 'string' && userStore.name === '') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Register'}],
          }),
        );
      } else {
        userStore.setMail(data.value.mail);
        userStore.setName(data.value.name);
        userStore.setAdmin(data.value.isAdmin);
        userStore.setIsPersonal(data.value.isPersonal);
        if (data.value.identityNumber) {
          userStore.setIdentityNumber(data.value.identityNumber);
          userStore.setCity(data.value.city);
          userStore.setAdress(data.value.adress);
        }
      }
    });
  };

  const fetchdata = async () => {
    const response = await api.events.getAllEvents();
    await setData(response.value);
  };
  const filterdata = () => {
    const filtered = data.filter((data) => {
      if (date2) {
        return (
          data.title.toLowerCase().includes(searchValue.toLowerCase()) &&
          data.date == date2
        );
      } else {
        return data.title
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
    });
    setFilteredData(filtered);
  };

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

  return (
    <View style={styles.page}>
      <SafeAreaView>
        <View style={styles.searchStyle}>
          <Feather name='search' size={20} />
          <TextInput
            style={styles.searchTextStyle}
            placeholder='Etkinlik Ara'
            placeholderTextColor='grey'
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </View>
      </SafeAreaView>

      {/* Render Product Componet */}
      <View style={styles.view1}>
        <Text style={styles.text1}>Tüm Etkinlikler</Text>

        <Button
          icon={{
            name: 'add-to-list',
            type: 'entypo',
            color: 'white',
            size: 20,
          }}
          iconStyles={[styles.icon]}
          containerStyles={[
            styles.buton,
            {display: userStore.isAdmin ? 'flex' : 'none'},
          ]}
          textStyles={styles.butontext}
          text={'Etkinlik Ekle'}
          onPress={async () => {
            navigation.navigate('Yeni Etkinlik');
          }}></Button>
      </View>
      {/* Tarih */}
      <View>
        <Pressable style={styles.input} onPress={() => setOpen(true)}>
          <Text style={styles.font}>
            {date2 !== '' ? date2 : 'Tarih Filtrele'}
          </Text>
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
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={eventStore.refreshing}
            onRefresh={onRefresh}
          />
        }
        data={filteredData}
        renderItem={({item}) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  page: {
    padding: 15,
    paddingBottom: 115,
  },
  text1: {
    fontSize: 22,
    fontWeight: '800',
  },
  searchStyle: {
    padding: 5,
    paddingLeft: 10,
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  searchTextStyle: {
    height: 40,
    marginLeft: 10,
  },
  buton: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
    backgroundColor: '#e47911',
  },
  butontext: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 5,
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
  },
  input: {
    padding: 5,
    paddingHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
  },
  font: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
