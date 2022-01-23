import React from 'react';
import {StyleSheet, Text} from 'react-native';

// To handle one plus issue, we are adding two spaces at the end of text. This will cause center alignment issue
// so in such places use Text from react-native
const CustomText = function (props: any) {
  return (
    <Text {...props} style={[styles.style, props.style]}>
      {props.children}
      {`  `}
    </Text>
  );
};

const styles = StyleSheet.create({
  style: {
    color: 'black',
  },
});

CustomText.propTypes = {
  style: Text.propTypes.style,
};

export default CustomText;
