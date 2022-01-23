import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const QuantitySelector = ({quantity, setQuantity}) => {
  const onMinus = () => {
    setQuantity(Math.max(0, quantity - 1));
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.root}>
      <Pressable onPress={onMinus} style={styles.button}>
        <Text style={styles.butonText}>-</Text>
      </Pressable>

      <Text style={styles.quantity}>{quantity}</Text>

      <Pressable onPress={onPlus} style={styles.button}>
        <Text style={styles.butonText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    width: 100,
  },
  button: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1d1d1',
  },
  butonText: {
    fontSize: 18,
  },
  quantity: {
    color: 'black',
  },
});

export default QuantitySelector;
