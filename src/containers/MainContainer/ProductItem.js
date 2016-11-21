import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ProductItem extends Component {

  render() {
    const { name, price, imageURL } = this.props.product;
    const { skeleton, centerEverything, container, imageContainer, imageStyle, textStyle } = styles;
    return(
      <TouchableWithoutFeedback onPress={() => Actions.productItemDetail(this.props.product)}>
        <View style={[container]}>
          <View style={[imageContainer]}>
            <Image
              source={{uri: imageURL}}
              style={imageStyle} />
          </View>
          <View style={[centerEverything]}>
            <Text style={textStyle}>{name}</Text>
            <Text style={textStyle}>${price}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    alignItems: 'center',
  },
  container: {
    width: deviceWidth*0.45,
    height: 250,
    backgroundColor: '#FFF',
    // borderWidth: 2,
    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    margin: 5
  },
  imageContainer: {
    flex: 7
  },
  imageStyle: {
    height: 200,
    width: null,
  },
  textStyle: {
    textAlign: 'center'
  }
}

export default ProductItem;
