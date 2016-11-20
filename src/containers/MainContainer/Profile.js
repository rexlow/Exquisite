import React, { Component } from 'react';
import {
  Alert,
  View,
  Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class Profile extends Component {

  render() {
    const { centerEverything, container } = styles;
    return(
      <View style={[centerEverything, container]}>
        <Text>Profile</Text>
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

export default connect(null, actions)(Profile);
