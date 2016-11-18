import React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions
} from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const Input = ({ placeholder, secureTextEntry, onChangeText, value, propHeight, propWidth, multiline}) => {
  const { inputStyle } = styles;

  return(
    <TextInput
      style={[inputStyle, propHeight, propWidth]}
      autoCapitalize={'none'}
      autoCorrect={false}
      multiline={multiline}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const styles = {
  inputStyle: {
    height: 40,
    width: deviceWidth*0.7,
    borderColor: '#CFD0D1',
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Light',
    paddingLeft: 20,
  }
}

export { Input };
