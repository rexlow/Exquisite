import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  AlertIOS,
  View,
  Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import LinearGradient from 'react-native-linear-gradient';
const gradient = {
  gradientStart: [0.3, 1],
  gradientEnd: [1, 0.8]
}

import ActionButton from 'react-native-action-button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const add = (<MaterialIcon name="add" size={33} color="white" />)
const money = (<MaterialIcon name="attach-money" size={33} color="white" />)
const account = (<MaterialIcon name="account-circle" size={33} color="white" />)
const storage = (<MaterialIcon name="details" size={33} color="white" />)
const equalizer = (<MaterialIcon name="equalizer" size={33} color="white" />)

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userCredit: props.profile.userGroup.credit
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.profile.userGroup.credit) {
      this.setState({ userCredit: nextProps.profile.userGroup.credit})
    }

    if (nextProps.profile.message) {
      Alert.alert(
        'Message',
        nextProps.profile.message
      )
      this.props.resetMessage()
    }
  }

  reloadCreditPromptHelper() {
    AlertIOS.prompt(
      'Reload credit',
      'Enter amount of credit to reload',
      text => this.reloadCreditHelper(text)
    );
  }

  reloadCreditHelper(amount) {
    console.log(this.props.profile.userGroup.credit);
    const totalAmount = this.props.profile.userGroup.credit + _.toInteger(amount);
    this.props.reloadCredit(totalAmount)
  }

  //only admin can add product
  renderAdminButton() {
    if (this.props.profile.userType === 'Admin') {
      return (
        <ActionButton buttonColor="#808080" offsetX={0} offsetY={0} icon={equalizer}>
          <ActionButton.Item buttonColor='#FF4500' title="Add Product" onPress={() => Actions.addProduct()}>
            {add}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#00BFFF' title="Manage Product" onPress={() => Actions.manageProduct()}>
            {storage}
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
        <ActionButton buttonColor="#808080" offsetX={0} offsetY={0} icon={equalizer}>
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
    const { skeleton, skeletonBlue, centerEverything, container, profileContainer, contentContainer,
    titleStyle,titleSmallStyle, basketStatusContainer, basketStatusText } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[profileContainer, centerEverything]}>

        </View>
        <View style={[contentContainer]}>

        </View>
        <LinearGradient
          colors={['#f49542', '#ffd34f']}
          start={gradient.gradientStart}
          end={gradient.gradientEnd}
          style={styles.basketStatusContainer}>
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
  contentContainer: {
    flex: 8
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
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, actions)(Profile);
