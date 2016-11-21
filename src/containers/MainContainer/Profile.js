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

class Profile extends Component {

  constructor(props) {
    super(props)
    console.log(props.profile);
  }

  //only admin can add product
  renderAdminButton() {
    if (this.props.profile.userType === 'Admin') {
      return (
        <ActionButton buttonColor="#e74c3c">
          <ActionButton.Item buttonColor='#9b59b6' title="Add Product" onPress={() => Actions.addProduct()}>
            {add}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='orange' title="Reload Credit" onPress={() => Actions.addProduct()}>
            {money}
          </ActionButton.Item>
        </ActionButton>
      )
    } else {
      return (
        <ActionButton buttonColor="#e74c3c">
          <ActionButton.Item buttonColor='orange' title="Reload Credit" onPress={() => Actions.addProduct()}>
            {money}
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
    fontSize: 22,
    letterSpacing: 3,
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: '500',
  },
  titleSmallStyle: {
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: '400',
    paddingTop: 5
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, actions)(Profile);
