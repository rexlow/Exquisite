import React, { Component } from 'react';
import {
  Alert,
  View,
  Text
} from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class AddProduct extends Component {

  render() {
    const { centerEverything, container, textContainer, titleContainer, descContainer,
            contentContainer, title, desc } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Add New Products</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>Great journey starts here</Text>
          </View>
        </View>
        <View style={[contentContainer]}>

        </View>
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
  },
  textContainer: {
    flex: 3,
    height: 100,
    marginTop: 20
  },
  titleContainer: {
    width: deviceWidth*0.8,
  },
  descContainer: {
    width: deviceWidth*0.6,
  },
  contentContainer: {
    flex: 7,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'center'
  },
  desc: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center'
  },
}

export default (AddProduct);
