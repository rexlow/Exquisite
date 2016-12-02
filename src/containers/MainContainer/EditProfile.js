'use strict';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input, Spinner } from './../../components/common';
import ButtonComponent from 'react-native-button-component';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';
import firebase from 'firebase';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class EditProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName: props.firstName,
      lastName: props.lastName,
      password: '',
      buttonState: 'save'
    };

    this.buttonStates = {
      save: {
        text: 'SAVE',
        onPress: () => {
          this.setState({ buttonState: 'loading' });
          this.updateProfile();
        },
      },
      loading: {
        spinner: true,
        text: 'SAVING YOUR DATA'
      }
    };
  }

  componentWillMount() {
    this.props.resetMessage();
  }

  componentWillReceiveProps(nextProps) {
    this.propsMessage(nextProps)
  }

  propsMessage(props) {
    console.log(props);
    if (props.message) {
      this.setState({ buttonState: 'save', password: '' })
      Alert.alert('Success', props.message);
      this.props.resetMessage();
    }

    this.setState({ buttonState: 'save', password: '' })
  }

  updateProfile() {
    const { firstName, lastName, password } = this.state;
    this.props.updateProfile(firstName, lastName, password);
  }

  render() {
    const { centerEverything, skeleton, container, textContainer, contentContainer, buttonContainer,
      propWidth, titleContainer, descContainer, title, editTitle, desc, buttonStyle } = styles;
    return (
      <View style={[centerEverything, container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Edit Your Profile</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>Got something new?</Text>
          </View>
        </View>
        <View style={[contentContainer, propWidth]}>
          <Text style={[editTitle]}>First name and last name</Text>
          <View style={{ paddingBottom: 3}}>
            <Input
              propWidth={propWidth}
              placeholder={this.state.firstName}
              onChangeText={(firstName) => this.setState({ firstName })}
              value={this.state.firstName} />
          </View>
          <Input
            propWidth={propWidth}
            placeholder={this.state.lastName}
            onChangeText={(lastName) => this.setState({ lastName })}
            value={this.state.lastName} />
          <View style={{ paddingTop: 20 }}>
            <Text style={[editTitle]}>Change your password</Text>
            <Input
              propWidth={propWidth}
              label="password"
              placeholder="Password"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry />
          </View>
        </View>
        <View style={[centerEverything, buttonContainer]}>
          <ButtonComponent
            style={buttonStyle}
            type='primary'
            shape='reactangle'
            buttonState={this.state.buttonState}
            states={this.buttonStates}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F6F7',
    marginTop: 44
  },
  textContainer: {
    flex: 2,
    height: 100,
    marginTop: 20
  },
  propWidth: {
    width: deviceWidth*0.8
  },
  contentContainer: {
    flex: 6,
  },
  buttonContainer: {
    flex: 2
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
  editTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'left',
    paddingBottom: 10
  },
  desc: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center'
  },
  buttonStyle: {
    height: 40,
    width: deviceWidth*0.7,
    borderRadius: 20,
    margin: 3
  },
}

const mapStateToProps = (state) => {
  return {
    firstName: state.profile.userGroup.firstName,
    lastName: state.profile.userGroup.lastName,
    message: state.profile.message
  }
}

export default connect(mapStateToProps, actions)(EditProfile);
