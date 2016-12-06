import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../actions';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class BasketItem extends Component {

  removeFromBasketHelper() {
    Alert.alert(
      'Alert',
      'Remove this item from your basket?',
      [
        {text: 'Ok', onPress: () => this.props.removeFromBasket(this.props.product.uid)},
        {text: 'Cancel', onPress: () => console.log('cancel')}
      ]
    )
  }

  render() {
    const { name, price, imageURL, uid } = this.props.product;
    const { skeleton, centerEverything, container, imageContainer, textContainer, imageStyle, textStyle, boldText } = styles;
    return(
      <TouchableWithoutFeedback onPress={() => this.removeFromBasketHelper()}>
        <View style={[container]}>
          <View style={[imageContainer]}>
            <Image
              source={{uri: imageURL}}
              style={imageStyle} />
          </View>
          <View style={[centerEverything, textContainer]}>
            <Text style={[textStyle, boldText]}>{name}</Text>
            <Text style={textStyle}>RM {price}</Text>
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
    flex: 8
  },
  textContainer: {
    flex: 2
  },
  imageStyle: {
    height: 200,
    width: null,
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  boldText: {
    fontWeight: '500'
  }
}

export default connect(null, actions)(BasketItem);
