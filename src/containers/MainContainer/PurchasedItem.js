import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  RefreshControl,
  TouchableWithoutFeedback
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class PurchasedItem extends Component {

  state = { isRefreshing: false }

  render() {
    const { centerEverything, container, textContainer, contentContainer, titleContainer, descContainer, title, desc, listViewContainer } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Pocket</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>All your purchased item</Text>
          </View>
        </View>
        <View style={contentContainer}>

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
    flex: 1,
    marginTop: 110,
  },
  textContainer: {
    flex: 2,
    // height: 80,
    marginTop: 40
  },
  contentContainer: {
    flex: 8
  },
  titleContainer: {
    width: deviceWidth*0.8,
  },
  descContainer: {
    width: deviceWidth*0.6,
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
  listViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default connect(null, actions)(PurchasedItem);
