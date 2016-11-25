import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class Brand extends Component {

  render() {
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

const mapStateToProps = (state) => {
  console.log('brand');
  console.log(state);
  const products = _.map(state.api.productList, (val, uid) => {
    return {...val, uid};
  })

  return { products };
}

export default connect(mapStateToProps, actions)(Brand);
