import React, { Component } from 'react';
import {
  Alert,
  View,
  Text
} from 'react-native';

class AddProduct extends Component {

  render() {
    const { centerEverything, container } = styles;
    return(
      <View style={[centerEverything, container]}>
        <Text>Profile</Text>
      </View>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1
  }
}

export default (AddProduct);
