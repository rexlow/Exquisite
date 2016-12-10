import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  AlertIOS,
  ListView,
  RefreshControl,
  View,
  Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import PurchasedItem from './../../components/PurchasedItem';

import LinearGradient from 'react-native-linear-gradient';
const gradient = {
  gradientStart: [0.3, 1],
  gradientEnd: [1, 0.8]
}

import ActionButton from 'react-native-action-button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const apps = (<MaterialIcon name="apps" size={33} color="white" />)
const add = (<MaterialIcon name="add" size={33} color="white" />)
const money = (<MaterialIcon name="attach-money" size={33} color="white" />)
const account = (<MaterialIcon name="account-circle" size={33} color="white" />)
const storage = (<MaterialIcon name="details" size={33} color="white" />)
const performance = (<MaterialIcon name="equalizer" size={33} color="white" />)

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userCredit: props.profile.userGroup.credit,
      isRefreshing: false
    }
  }

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
    if (nextProps.profile.userGroup.credit) {
      this.setState({ userCredit: nextProps.profile.userGroup.credit})
    }

    if (nextProps.profile.message) {
      Alert.alert(
        'Message',
        nextProps.profile.message
      )
      this.props.getUserGroup()
      this.props.resetMessage()
    }
  }

  createDataSource({ products }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(products);
  }

  renderRow(product) {
    return <PurchasedItem product={product} />;
  }

  reloadCreditPromptHelper() {
    AlertIOS.prompt(
      'Reload credit',
      'Enter amount of credit to reload',
      text => this.reloadCreditHelper(text)
    );
  }

  reloadCreditHelper(amount) {
    if(parseInt(amount) || parseFloat(amount)) {
      if(parseInt(amount)) {
        var newAmount = parseInt(amount)
      } else {
        var newAmount = parseFloat(amount)
      }
      const totalAmount = this.props.profile.userGroup.credit + _.toInteger(amount);
      this.props.reloadCredit(totalAmount)
    } else {
        Alert.alert(
          'Alert',
          'Please enter a valid value'
        )
    }

  }

  //only admin can add product
  renderAdminButton() {
    if (this.props.profile.userType === 'Admin') {
      return (
        <ActionButton buttonColor="#808080" offsetX={0} offsetY={0} icon={apps}>
          <ActionButton.Item buttonColor='#FF4500' title="Add Product" onPress={() => Actions.addProduct()}>
            {add}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#00BFFF' title="Manage Product" onPress={() => Actions.manageProduct()}>
            {storage}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#8B4513' title="Performance" onPress={() => Actions.performance()}>
            {performance}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#FFD700' title="Reload Credit" onPress={() => this.reloadCreditPromptHelper()}>
            {money}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9ACD32' title="Edit Profile" onPress={() => Actions.editProfile()}>
            {account}
          </ActionButton.Item>
        </ActionButton>
      )
    } else {
      return (
        <ActionButton buttonColor="#808080" offsetX={0} offsetY={0} icon={apps}>
          <ActionButton.Item buttonColor='#FFD700' title="Reload Credit" onPress={() => Actions.addProduct()}>
            {money}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9ACD32' title="Edit Profile" onPress={() => Actions.editProfile()}>
            {account}
          </ActionButton.Item>
        </ActionButton>
      )
    }
  }

  render() {
    const { skeleton, skeletonBlue, centerEverything, container, titleContainer, descContainer, title, desc,
      profileContainer, contentContainer, listViewContainer, titleStyle,titleSmallStyle,
      basketStatusContainer, basketStatusText } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[profileContainer, centerEverything]}>
          <View style={titleContainer}>
            <Text style={[title]}>Purchased Item</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>Here's all your product</Text>
            <Text style={[desc]}>Tap to load</Text>
          </View>
        </View>
        <View style={[contentContainer]}>
          <ListView
            contentContainerStyle={listViewContainer}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
                title="Loading data..."
                progressBackgroundColor="#ffff00"
              />
            }
          />
        </View>
        <LinearGradient
          colors={['#f49542', '#ffd34f']}
          start={gradient.gradientStart}
          end={gradient.gradientEnd}
          style={basketStatusContainer}>
          <View>
            <Text style={basketStatusText}>Hello {this.props.profile.userGroup.firstName} {this.props.profile.userGroup.lastName}</Text>
            <Text style={basketStatusText}>Credit Available: RM {this.state.userCredit}</Text>
          </View>
        </LinearGradient>

        {this.renderAdminButton()}
      </View>
    )
  }
}

const styles = {
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  skeletonBlue: {
    borderWidth: 1,
    borderColor: 'blue'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 110
  },
  profileContainer: {
    flex: 2,
    flexDirection: 'column',
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
  contentContainer: {
    flex: 8,
    width: deviceWidth,
    marginBottom: 50
  },
  listViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleStyle: {
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: '400',
    backgroundColor: 'transparent'
  },
  titleSmallStyle: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    backgroundColor: 'transparent'
  },
  basketStatusContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: 50,
    // backgroundColor: '#221F1F',
    justifyContent: 'center'
  },
  basketStatusText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    paddingLeft: 10,
    fontWeight: '500'
  }
}

const mapStateToProps = (state) => {
  var products = []

  if (state.profile.userGroup.purchasedItem) {
    let unfilteredPurchasedItem = state.profile.userGroup.purchasedItem
    let productList = state.api.productList

    //do matching between the entire product list and purchasedItem from user node
    Object.keys(productList).forEach(
      (key) => unfilteredPurchasedItem[key] && (products.push({ ...productList[key] }))
    )
  }

  return {
    products: products,
    profile: state.profile
  };
};

export default connect(mapStateToProps, actions)(Profile);
