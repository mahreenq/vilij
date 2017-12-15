import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: 'bold'
  },
  buttonStyle: {
    backgroundColor: '#474973',
    paddingVertical: 15,
    borderRadius: 25
  }
};

export { Button };
