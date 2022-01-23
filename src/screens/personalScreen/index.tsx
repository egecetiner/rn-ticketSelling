import auth from '@react-native-firebase/auth';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {api} from '../../api/api';
import ProductItem from '../../components/ProductItem';
import {eventStore} from '../../stores/eventStore';

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const personalScreen = observer(() => {
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    eventStore.setRefreshing(true);
    wait(1000).then(() => {
      eventStore.setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    fetchdata();
  }, [eventStore.refreshing]);

  const fetchdata = async () => {
    const tmp = [...(data || [])];

    await api.users
      .getUser(await auth().currentUser?.uid)
      .then(async (data: any) => {
        await Promise.all(
          data.value.isPersonal.map(async (event: any) => {
            const response = await api.events.getAllEvents({
              id: event,
            });
            if (
              tmp.length === 0 ||
              !tmp.some((elem) => response.value[0].id === elem.id)
            )
              tmp.push(response.value[0]);
          }),
        );
      });

    setData(tmp);
  };

  if (data.length === 0 || data === undefined) {
    return (
      <View style={styles.page1}>
        <Text style={styles.text1}>
          Hiçbir etkinlikte görevli değilsiniz.
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.page2}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={eventStore.refreshing}
              onRefresh={onRefresh}
            />
          }
          data={data}
          renderItem={({item}) => <ProductItem item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  page1: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  page2: {
    padding: 15,
  },
  text1: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    paddingTop: 30,
  },
});
export default personalScreen;
