import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar
} from 'react-native';

import { Scene, Router, Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import * as actions from './actions';

import SplashScreen from './components/SplashScreen';

import SignIn from './containers/AuthContainer/Signin';
import SignUp from './containers/AuthContainer/Signup';
import Home from './containers/MainContainer/Home';
import Brand from './containers/MainContainer/Brand';

const TabIcon = ({ selected, title}) => {
  return(
    <Text style={{
        color: '#5B5A5A',
        fontWeight: selected ? '600' : '200'
    }}>{title}</Text>
  );
};

class RouterComponent extends Component {

  componentWillMount() {
    this.props.listenToUser();
  }

  render() {
    const { skeleton, container, sceneStyle, navigationBarStyle, titleStyle, tabBarStyle } = styles;
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
            <Scene key="tabbar" tabs tabBarStyle={tabBarStyle} >
              <Scene key="home" title="Home" component={Home} icon={TabIcon} />
              <Scene key="brand" title="Brand" component={Brand} icon={TabIcon} />
            </Scene>
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
