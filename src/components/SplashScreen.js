import React, { Component } from 'react';
import {
  View,
  Text,
  LayoutAnimation
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Spinner } from './common';

class SplashScreen extends Component {

  constructor(props) {
      super(props);
    }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  componentDidMount() {
    this.processAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  processAuth(props) {
    if(props.auth.user != null) {
      if(props.auth.user.uid) {
        Actions.main({ type: 'reset' });
      }else{
        Actions.signin({ type: 'reset' });
      }
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Exquisite</Text>
        <Text style={styles.desc}>The only event browser for developer</Text>
        <Spinner size="small"/>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 38,
    letterSpacing: 9,
    fontFamily: 'HelveticaNeue-Light',
    paddingBottom: 10
  },
  desc: {
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: 'HelveticaNeue-Thin',
    paddingBottom: 10
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(SplashScreen);
