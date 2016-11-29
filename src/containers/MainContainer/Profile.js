import React, { Component } from 'react';
import {
  Alert,
  View,
  Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import ActionButton from 'react-native-action-button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const add = (<MaterialIcon name="add" size={33} color="white" />)
const money = (<MaterialIcon name="attach-money" size={33} color="white" />)
const purchased = (<MaterialIcon name="filter-vintage" size={33} color="white" />)
const storage = (<MaterialIcon name="details" size={33} color="white" />)
const basket = (<MaterialIcon name="shopping-basket" size={33} color="white" />)

class Profile extends Component {

  constructor(props) {
    super(props)
    console.log(props.profile);
  }

  //only admin can add product
  renderAdminButton() {
    if (this.props.profile.userType === 'Admin') {
      return (
        <ActionButton buttonColor="#e74c3c" offsetX={0} offsetY={0}>
          <ActionButton.Item buttonColor='#9b59b6' title="Add Product" onPress={() => Actions.addProduct()}>
            {add}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#2b78ff' title="Manage Product" onPress={() => Actions.manageProduct()}>
            {storage}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='orange' title="Reload Credit" onPress={() => Actions.addProduct()}>
            {money}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#f442cb' title="View Purchased Item" onPress={() => Actions.purchasedItem()}>
            {purchased}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="My basket" onPress={() => Actions.basket()}>
            {basket}
          </ActionButton.Item>
        </ActionButton>
      )
    } else {
      return (
        <ActionButton buttonColor="#e74c3c" offsetX={0} offsetY={0}>
          <ActionButton.Item buttonColor='orange' title="Reload Credit" onPress={() => Actions.addProduct()}>
            {money}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#f442cb' title="View Purchased Item" onPress={() => Actions.purchasedItem()}>
            {purchased}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="My basket" onPress={() => Actions.basket()}>
            {basket}
          </ActionButton.Item>
        </ActionButton>
      )
    }
  }

  render() {
    const { skeleton, skeletonBlue, centerEverything, container, profileContainer, contentContainer,
    titleStyle,titleSmallStyle } = styles;
    return(
      <View style={[centerEverything, container]}>
        {this.renderAdminButton()}
        <View style={[profileContainer, centerEverything]}>
          <Text style={titleStyle}>Hello {this.props.profile.userGroup.firstName} {this.props.profile.userGroup.lastName}</Text>
          <Text style={titleSmallStyle}>Credit available: RM {this.props.profile.userGroup.credit}</Text>
        </View>
        <View style={[contentContainer]}>

        </View>
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
  contentContainer: {
    flex: 8
  },
  titleStyle: {
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: '400',
  },
  titleSmallStyle: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, actions)(Profile);
