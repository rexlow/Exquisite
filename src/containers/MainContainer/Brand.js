import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

class Brand extends Component {

  render() {
    console.log('home');
    const { centerEverything, container } = styles;
    return(
      <View style={[centerEverything, container]}>
        <Text>Brand</Text>
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

export default Brand;
