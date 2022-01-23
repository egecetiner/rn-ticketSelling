import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements';

interface ButtonProps {
  text: string;
  onPress: () => void;
  containerStyles?: object;
}

const Button = ({
  iconStyles,
  text,
  onPress,
  containerStyles,
  textStyles,
  icon,
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.root, containerStyles]}>
      <Icon {...icon} style={[styles.icon, iconStyles]} />
      <Text style={[styles.text, textStyles]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e47911',
    marginVertical: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a15e1b',
  },
  text: {
    fontSize: 16,
  },
  icon: {display: 'none'},
});

export default Button;
