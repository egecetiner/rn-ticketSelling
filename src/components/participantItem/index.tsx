import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ParticipantItemProps {
  item: {
    name: string;
    read: boolean;
  };
}

const ParticipantItem = ({item}: ParticipantItemProps) => {
  const styles = StyleSheet.create({
    newRoot: {
      flexDirection: 'row',
      paddingHorizontal: 7,
      borderWidth: 1,
      justifyContent: 'space-between',
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 5,
    },
    name: {fontSize: 16},
    read: {fontSize: 14},
    readView: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 3,
      backgroundColor: item.read ? '#ff616e' : '#42b850',
    },
  });

  return (
    <View style={styles.newRoot}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.readView}>
        {item.read ? (
          <Text style={styles.read}>Bilet Okundu</Text>
        ) : (
          <Text style={styles.read}>Bilet Geçerli</Text>
        )}
      </View>
    </View>
  );
};

export default ParticipantItem;
