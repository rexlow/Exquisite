import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ProductItemDetail extends Component {
  render() {
    const { brand, category, color, description, imageURL, name, price, size } = this.props;
    const { skeleton, centerEverything, container, contentContainer, imageContainer, imageStyle } = styles;
    return(
      <View style={[skeleton, centerEverything, container]}>
        <View style={[imageContainer, skeleton]}>
          <Image
            style={imageStyle}
            source={{uri: imageURL}}
          />
        </View>
        <View style={[contentContainer, skeleton]}>
          <Text>{brand}</Text>
        </View>
      </View>
    )
  }
}

const styles = {
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    marginTop: 64
  },
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    top: 0,
    padding: 10
  },
  imageStyle: {
    width: 240,
    height: 320
  },
}

export default ProductItemDetail;
