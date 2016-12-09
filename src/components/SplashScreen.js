import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
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
    console.log(this.props);
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
      <Image source={require('./Gradient3.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.title}>Exquisite</Text>
          <Text style={styles.desc}>A place where shopping is made easy</Text>
          <Spinner size="small"/>
        </View>
      </Image>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    // backgroundColor: '#F5F6F7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 38,
    letterSpacing: 9,
    fontFamily: 'HelveticaNeue-Light',
    paddingBottom: 10,
    backgroundColor: 'transparent'
  },
  desc: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: 'HelveticaNeue-Thin',
    paddingBottom: 10,
    backgroundColor: 'transparent'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(SplashScreen);
