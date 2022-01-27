import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const codeValue = 'ege';

const codeScreen = ({
  route: {
    params: {city, date, mekan, codeValue, title, name, read},
  },
}) => {
  console.log('muhit2', read);
  return (
    <View style={styles.page}>
      <Text style={styles.title}>{`${title} - ${city}`}</Text>

      <QRCode value={codeValue} size={300} />

      <Text style={styles.ticketName}>{name}</Text>

      <Text style={styles.lokasyon}>
        <EvilIcons name='location' size={18} />
        {` ${mekan}`}
      </Text>
      <Text style={styles.date}>
        <Entypo name='calendar' size={18} />
        {`  ${date}`}
      </Text>

      {read ? (
        <View style={styles.readView2}>
          <Text style={styles.read}>Bilet Okutuldu</Text>
        </View>
      ) : (
        <View style={styles.readView1}>
          <Text style={styles.read}>Bilet Aktif</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 50,
  },
  lokasyon: {
    alignSelf: 'center',
    fontSize: 22,
    marginTop: 15,
  },
  date: {
    alignSelf: 'center',
    fontSize: 22,
    marginTop: 15,
  },
  ticketName: {
    alignSelf: 'center',
    fontSize: 22,
    marginTop: 30,
  },

  read: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  readView1: {
    alignSelf: 'center',
    fontSize: 22,
    marginTop: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#42b850',
  },
  readView2: {
    alignSelf: 'center',
    fontSize: 22,
    marginTop: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#ff616e',
  },
});
export default codeScreen;
