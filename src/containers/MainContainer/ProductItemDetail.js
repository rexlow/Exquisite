import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from './../../actions';
import { Actions } from 'react-native-router-flux';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ProductItemDetail extends Component {

  componentWillReceiveProps(nextProps) {
    this.buyItemCallback(nextProps);
  }

  buyItemCallback(props) {
    if (props.api.message) {
      const message = props.api.message;
      Alert.alert(
        'Message',
        message,
      [
        {text: 'Return', onPress: () => console.log('Return after ticket reducer')}
      ]);
    }
  }

  render() {
    const { brand, category, color, description, imageURL, name, price, size } = this.props;
    const { skeleton, centerEverything, container, contentContainer, imageContainer, imageStyle } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[imageContainer]}>
          <Image
            style={imageStyle}
            source={{uri: imageURL}}
          />
        </View>
        <View style={[contentContainer, skeleton]}>
          <Text>{brand}</Text>
          <Text>{category}</Text>
          <Text>{color}</Text>
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
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    api: state.api
  }
}

export default connect(mapStateToProps, actions)(ProductItemDetail);
