import React, { Component } from 'react';
import {
  View,
  StatusBar
} from 'react-native';

import { Scene, Router, Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import * as actions from './actions';

import SplashScreen from './components/SplashScreen';

import SignIn from './containers/AuthContainer/Signin';
import SignUp from './containers/AuthContainer/Signup';
import Home from './containers/MainContainer/Home';

class RouterComponent extends Component {

  componentWillMount() {
    this.props.listenToUser();
  }

  render() {
    const { skeleton, container, sceneStyle, navigationBarStyle, titleStyle } = styles;
    return(
      <View style={[container]}>
        <StatusBar
          backgroundColor="rgba(0,0,0,1)"
          translucent
          barStyle="light-content"
        />
        <Router
          sceneStyle={sceneStyle}
          navigationBarStyle={navigationBarStyle}
          titleStyle={titleStyle}>
          <Scene key="auth" initial hideNavBar>
            <Scene key="splash" component={SplashScreen} initial />
            <Scene key="signin" component={SignIn} />
            <Scene key="signup" component={SignUp} />
          </Scene>
          <Scene key="main" hideNavBar>
            <Scene key="home" component={Home} />
          </Scene>
        </Router>
      </View>
    )
  }
}

const styles = {
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  container: {
    flex: 1
  },
  tabBarStyle: {
    position: 'absolute',
    top: 60,
  },
  sceneStyle: {
    backgroundColor: '#F5F6F7'
  },
  navigationBarStyle: {
    backgroundColor: '#2D292A',
    borderBottomWidth: 0,
  },
  titleStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    color: '#FFF',
    letterSpacing: 4,
    fontWeight: '500'
  }
}

export default connect(null, actions)(RouterComponent);
