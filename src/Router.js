import React, { Component } from 'react';
import {
  Alert,
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
import AddProduct from './containers/MainContainer/AddProduct';
import Brand from './containers/MainContainer/Brand';
import Profile from './containers/MainContainer/Profile';

import ProductItemDetail from './containers/MainContainer/ProductItemDetail';
import BrandItemList from './containers/MainContainer/BrandItemList';

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

  buyItemHelper(props) {
    Alert.alert(
      'Purchase',
      `Buy 1 ${props.name} \n with RM ${props.price}?`,
      [
        {text: 'Yes', onPress: () => {
          this.props.buyItem(props.uid);
        }},
        {text: 'Cancel', onPress: () => console.log('buy item cancel')}
      ]
    )
  }

  signOutHelper() {
    Alert.alert(
      'Sign out',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => {
          this.props.signOut();
        }},
        {text: 'Cancel', onPress: () => console.log('sign out cancel')}
      ]
    )
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
          <Scene key="main" >
            <Scene key="tabbar" tabs tabBarStyle={tabBarStyle} >
              <Scene key="home" title="Product" component={Home} icon={TabIcon} />
              <Scene key="brand" title="Brand" component={Brand} icon={TabIcon} />
              <Scene
                key="profile"
                title="Profile"
                component={Profile}
                icon={TabIcon}
                rightTitle="Sign Out"
                rightButtonTextStyle={{ color: '#FFF' }}
                onRight={this.signOutHelper.bind(this)} />
            </Scene>
            <Scene
              key="addProduct"
              component={AddProduct}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="productItemDetail"
              component={ProductItemDetail}
              leftButtonIconStyle={{tintColor: '#FFF'}}
              rightTitle="Buy Item"
              rightButtonTextStyle={{ color: '#FFF' }}
              onRight={this.buyItemHelper.bind(this)} />
            <Scene
              key="brandItemList"
              component={BrandItemList}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
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
    color: '#FFF',
    letterSpacing: 4,
    fontWeight: '500'
  },
}

export default connect(null, actions)(RouterComponent);
