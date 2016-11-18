import React, { Component } from 'react';

import {
  Alert,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import ButtonComponent from 'react-native-button-component';
import { Input } from './../../components/common';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;
const dismissKeyboard = require('dismissKeyboard')

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      buttonState: 'signUp'
    };

    this.buttonStates = {
      signUp: {
        text: 'SIGN UP',
        onPress: () => {
          this.setState({ buttonState: 'loading' });
          this.processRegister();
        },
      },
      loading: {
        spinner: true,
        text: 'SIGNING USER UP'
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  processRegister() {
    const { email, password, firstName, lastName } = this.state;
    if (email === '' || password === '' || firstName === '' || lastName === '') {
      Alert.alert('Message', 'Please make sure you have filled in all the required credentials')
    }
    this.props.registerUser(email, password, firstName, lastName);
  }

  processAuth(props) {
    if(props.auth.user != null) {
      if(props.auth.user.uid) {
        this.setState({ email: '', password: '', firstName: '', lastName: '' });
        Alert.alert('Alert', 'Welcome aboard!', [{text: 'Ok', onPress: () => Actions.pop()}]);
      }
    }
    if(props.auth.error)  {
      this.setState({ email: '', password: '', firstName: '', lastName: '', buttonState: 'signUp' });
    }
  }

  render() {

    const {
      helvMedium, centerEverything, container, upperContainer, title, middleContainer,
      inputContainer, bottomContainer, terms, termsText, buttonStyle, exitFont
    } = styles;

    return(
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[container]}>

          <View style={[upperContainer, centerEverything]}>
            <View style={[centerEverything, { paddingTop: 50 }]}>
              <Text style={title}>CREATE NEW</Text>
              <Text style={title}>ACCOUNT</Text>
            </View>
          </View>
          <View style={[middleContainer, centerEverything]}>
            <View style={[centerEverything]}>
              <Input
                placeholder="First Name"
                onChangeText={(firstName) => this.setState({ firstName })}
                value={this.state.firstName} />
              <Input
                placeholder="Last Name"
                onChangeText={(lastName) => this.setState({ lastName })}
                value={this.state.lastName} />
              <Input
                placeholder="Email Address"
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email} />
              <Input
                placeholder="Password"
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                secureTextEntry />
              <View style={[terms, centerEverything]}>
                <Text style={termsText}>By tapping "Sign Up" you agree</Text>
                <Text style={termsText}>to the terms & conditions</Text>
              </View>
            </View>
          </View>
          <View style={[bottomContainer, centerEverything]}>
            <ButtonComponent
              style={buttonStyle}
              type='primary'
              shape='reactangle'
              buttonState={this.state.buttonState}
              states={this.buttonStates}
            />
            <ButtonComponent
              style={buttonStyle}
              type='primary'
              shape='reactangle'
              text="GO BACK"
              onPress={() => Actions.pop()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  helvMedium: {
    fontFamily: 'HelveticaNeue-Medium',
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  upperContainer: {
    flex: 2,
  },
  middleContainer: {
    flex: 5,
  },
  bottomContainer: {
    flex: 3,
  },
  title: {
    color: '#5B5A5A',
    fontSize: 20,
    letterSpacing: 5,
    fontWeight: '400',
  },
  terms: {
    paddingTop: 10
  },
  termsText: {
    color: '#5B5A5A',
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: '400'
  },
  buttonStyle: {
    backgroundColor: '#129793',
    height: 40,
    width: deviceWidth*0.7,
    borderRadius: 20,
    margin: 3
  },
  exitFont: {
    fontSize: 30,
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(SignUp);
