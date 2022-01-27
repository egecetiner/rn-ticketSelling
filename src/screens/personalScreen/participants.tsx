import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {api} from '../../api/api';
import Button from '../../components/Button';
import ParticipantItem from '../../components/participantItem';

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const participantScreen = ({
  route: {
    params: {id},
  },
}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    fetchdata();
  }, [refreshing]);
  useEffect(() => {
    filterdata();
  }, [searchValue, data]);

  const filterdata = () => {
    const filtered = data.filter((data) => {
      return data.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const fetchdata = async () => {
    const tmp = [...(data || [])];
    await api.tickets
      .getAllTickets({
        eventId: id,
      })
      .then(async (data1) => {
        await Promise.all(
          await data1.value.map(async (ticket) => {
            await api.users.getUser(ticket.userId).then(async (data2) => {
              if (
                tmp.length === 0 ||
                !tmp.some((elem) => data2.value.name === elem.name)
              ) {
                tmp.push({name: data2.value.name, read: ticket.read});
                setData(tmp);
              } else if (
                tmp.some(
                  (elem) =>
                    data2.value.name === elem.name &&
                    ticket.read !== elem.read,
                )
              ) {
                const result = tmp.filter(
                  (user) => user.name !== data2.value.name,
                );
                result.push({name: data2.value.name, read: ticket.read});
                setData(result);
              }
            });
          }),
        );
      });
  };

  return (
    <View style={styles.page}>
      <SafeAreaView>
        <View style={styles.searchStyle}>
          <Feather name='search' size={20} />
          <TextInput
            style={styles.searchTextStyle}
            placeholder='Katılımcı Ara'
            placeholderTextColor='grey'
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </View>
      </SafeAreaView>

      {/* Render Product Componet */}
      <View style={styles.view1}>
        <Text style={styles.text1}>Katılımcılar</Text>

        <Button
          icon={{
            name: 'add-to-list',
            type: 'entypo',
            color: 'white',
            size: 20,
          }}
          iconStyles={[styles.icon]}
          containerStyles={[styles.buton]}
          textStyles={styles.butontext}
          text={'Bilet Oku'}
          onPress={() => {
            navigation.navigate('Camera', {
              id: id,
            });
          }}></Button>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={filteredData}
        renderItem={({item}) => <ParticipantItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

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

  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default participantScreen;
