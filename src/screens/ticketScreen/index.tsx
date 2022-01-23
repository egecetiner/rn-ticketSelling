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
import Foundation from 'react-native-vector-icons/Foundation';
import {api} from '../../api/api';
import ProductItem from '../../components/ProductItem';
import {eventStore} from '../../stores/eventStore';

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ticketScreen = observer(() => {
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
    let tmp = [...(data || [])];

    await api.tickets
      .getAllTickets({userId: await auth().currentUser?.uid})
      .then(async (data1) => {
        await Promise.all(
          data1.value.map(async (ticket) => {
            const response = await api.events.getAllEvents({
              id: ticket.eventId,
            });
            response.value[0].ticketId = ticket.id;
            response.value[0].ticketName = ticket.ticketName;
            response.value[0].read = ticket.read;

            if (
              tmp.length === 0 ||
              !tmp.some((elem) => response.value[0].id === elem.id)
            ) {
              tmp.push(response.value[0]);
              setData(tmp);
            }
          }),
        );
      });
  };

  if (data.length === 0 || data === undefined) {
    return (
      <View style={styles.page1}>
        <Foundation name='ticket' size={100} />
        <Text style={styles.text1}>Henüz bir bilet almadınız.</Text>
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
export default ticketScreen;
