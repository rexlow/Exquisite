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
        </ActionButton>
      )
    }
  }

  render() {
    const { centerEverything, container } = styles;
    return(
      <View style={[centerEverything, container]}>
        <Text>Profile</Text>
        {this.renderAdminButton()}
      </View>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, actions)(Profile);
