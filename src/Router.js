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
import ResetPassword from './containers/AuthContainer/ResetPassword';

import Home from './containers/MainContainer/Home';
import Brand from './containers/MainContainer/Brand';
import Profile from './containers/MainContainer/Profile';
import EditProfile from './containers/MainContainer/EditProfile';

import Basket from './containers/MainContainer/Basket';

import AddProduct from './containers/MainContainer/AddProduct';
import ManageProduct from './containers/MainContainer/ManageProduct';
import Performance from './containers/MainContainer/Performance';

import ProductItemDetail from './containers/MainContainer/ProductItemDetail';
import PurchasedItemDetail from './containers/MainContainer/PurchasedItemDetail';
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

  signOutHelper() {
    Alert.alert(
      'Sign out',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => {
          this.props.signOut();
          Actions.auth({ type: 'reset' });
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
            <Scene key="resetPassword" component={ResetPassword} />
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
              key="editProfile"
              component={EditProfile}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="basket"
              component={Basket}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="addProduct"
              component={AddProduct}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="manageProduct"
              component={ManageProduct}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="performance"
              component={Performance}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="productItemDetail"
              component={ProductItemDetail}
              leftButtonIconStyle={{tintColor: '#FFF'}}/>
            <Scene
              key="purchasedItemDetail"
              component={PurchasedItemDetail}
              leftButtonIconStyle={{tintColor: '#FFF'}}/>
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
