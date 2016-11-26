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

class BrandItem extends Component {

  render() {
    console.log(this.props);
    const { uid } = this.props.product;
    const { skeleton, centerEverything, container, textContainer, textStyle, boldText, backgroundImage } = styles;
    return(
      <TouchableWithoutFeedback onPress={() => Actions.brandItemList(this.props.product)}>
        <View style={[container]}>
          <Image source={require('./Brand.jpg')} style={backgroundImage}>
            <View style={[centerEverything, textContainer]}>
              <Text style={[textStyle, boldText]}>{uid}</Text>
            </View>
          </Image>
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
    width: deviceWidth*0.85,
    height: 100,
    // backgroundColor: 'silver',
    // borderWidth: 2,
    borderRadius: 5,
    shadowColor: 'silver',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    margin: 5
  },
  textContainer: {
    flex: 2
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  boldText: {
    fontSize: 36,
    fontFamily: 'HelveticaNeue-Light',
    letterSpacing: 9,
    color: 'white'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
}

export default BrandItem;
