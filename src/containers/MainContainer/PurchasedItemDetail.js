import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class PurchasedItemDetail extends Component {

  render() {
    const { brand, category, color, description, imageURL, name, price, size } = this.props;
    const { skeleton, centerEverything, container, contentContainer, imageContainer, imageStyle,
    titleContainer, titleTextStyle, titleStyle, textContainer, textStyle, boldText, rowItem } = styles;
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={[centerEverything, container]}>
            <View style={[imageContainer]}>
              <Image
                style={imageStyle}
                source={{uri: imageURL}}
              />
            </View>
            <View style={[contentContainer]}>
              <View style={[titleContainer]}>
                <Text style={titleStyle}>{name}</Text>
                <Text style={titleTextStyle}> by {brand}</Text>
              </View>
              <View style={textContainer}>
                <View style={rowItem}>
                  <Text style={[textStyle, boldText]}> Category : </Text>
                  <Text style={[textStyle]}>{category}</Text>
                </View>
                <Text style={textStyle}> Available Color : {color}</Text>
                <Text style={textStyle}> Size : {size}</Text>
                <Text style={textStyle}> Price : RM{price}</Text>
                <Text style={textStyle}> Description : </Text>
                <Text style={textStyle}> {description}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
    width: deviceWidth*0.95
  },
  imageContainer: {
    top: 0,
    margin: 10,
    borderRadius: 3,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  imageStyle: {
    width: 240,
    height: 320
  },
  titleContainer: {
    flex:4,
  },
  titleStyle:{
    fontSize:20,
  },
  titleTextStyle: {
    fontSize:13,
    color: '#ff0000',
  },
  textContainer: {
    flex:6,
  },
  textStyle:{
    fontSize:13,
  },
  boldText: {
    fontWeight: '500'
  },
  rowItem: {
    flexDirection: 'row'
  }
}

export default PurchasedItemDetail;
