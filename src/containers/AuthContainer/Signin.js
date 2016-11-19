import React, { Component } from 'react';
import {
  Alert,
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import ButtonComponent from 'react-native-button-component';
import { Input, Spinner } from './../../components/common';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;
const dismissKeyboard = require('dismissKeyboard')

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'konyee95@gmail.com',
      password: 'password',
      buttonState: 'signIn',
      error: null
    };

    this.buttonStates = {
      signIn: {
        text: 'SIGN IN',
        onPress: () => {
          this.loginUser();
        },
      },
      loading: {
        spinner: true,
        text: 'SIGNING USER IN'
      }
    };
  }

  componentDidMount() {
    this.processAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  loginUser() {
    const { email, password } = this.state;
    if (email === '' && password === '') {
      Alert.alert('Message', 'Please make sure you have filled in email and password')
    } else if (!this.validateEmail(email)) {
      Alert.alert('Message', 'Please make sure you have a proper email.')
    } else {
      this.setState({ buttonState: 'loading' });
      this.props.loginUser(email, password);
    }
  }

  processAuth(props) {
    if(props.auth.user != null) {
      if(props.auth.user.uid) {
        Actions.main({ type: 'reset' });
      }
    }
    if(props.auth.error) {
      Alert.alert('Alert', props.auth.error);
      this.setState({ buttonState: 'signIn', password: '' });
    }
  }

  render() {
    const {
      skeleton, centerEverything, container, backgroundImage, upperContainer, title, middleContainer, welcomeTitle,
      forgotPasswordContainer, forgotPassword, inputContainer, bottomContainer, bottomText,
      redText, errorText, buttonStyle
    } = styles;

    return(
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <Image source={require('./../../components/Gradient2.jpg')} style={styles.backgroundImage}>
          <View style={[container]}>
            <View style={[upperContainer, centerEverything]}>
              <Text style={title}>EXQUISITE</Text>
            </View>

            <View style={[middleContainer, centerEverything]}>
              <Text style={welcomeTitle}>WELCOME</Text>
              <View style={[centerEverything], {paddingBottom: 30}}>
                <View style={{ paddingBottom: 3 }}>
                  <Input
                    label="email"
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}/>
                </View>
                <View>
                  <Input
                    label="password"
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry={true} />
                </View>
                {/* <View style={forgotPasswordContainer}>
                  <TouchableOpacity onPress={() => Actions.resetPassword()}>
                    <Text style={forgotPassword}>Forgot password?</Text>
                  </TouchableOpacity>
                </View> */}
              </View>

              <ButtonComponent
                style={buttonStyle}
                type='primary'
                shape='rectangle'
                buttonState={this.state.buttonState}
                states={this.buttonStates}
              />

              <Text style={[forgotPassword, errorText]}>{this.state.error}</Text>
            </View>

            <View style={[bottomContainer, centerEverything]}>
              <Text style={bottomText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => Actions.signup()}>
                <Text style={[bottomText], redText}>Create new account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  skeleton: {
    borderColor: 'red',
    borderWidth: 1
  },
  helvMedium: {
    fontFamily: 'HelveticaNeue-Medium',
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    // backgroundColor: '#F5F6F7',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  upperContainer: {
    flex: 2,
    backgroundColor: 'transparent'
  },
  middleContainer: {
    flex: 7,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  title: {
    color: 'white',
    fontSize: 32,
    letterSpacing: 7,
    fontWeight: '400',
    paddingTop: 100
  },
  welcomeTitle: {
    color: 'white',
    fontSize: 23,
    letterSpacing: 4,
    fontWeight: '400',
    paddingBottom: 30,
    backgroundColor: 'transparent'
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    paddingTop: 5,
    backgroundColor: 'transparent'
  },
  forgotPassword: {
    color: 'white',
    fontWeight: '400'
  },
  bottomText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '300',
  },
  redText: {
    color: 'white'
  },
  errorText: {
    paddingTop: 10,
    backgroundColor: 'transparent'
  },
  buttonStyle: {
    height: 40,
    width: deviceWidth*0.7,
    borderRadius: 20,
    shadowColor: '#129793',
    shadowOpacity: 1,
    shadowRadius: 5
  },
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(SignIn);
