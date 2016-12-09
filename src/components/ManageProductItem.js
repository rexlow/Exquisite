import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../actions';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const check = (<MaterialIcon name="check" size={26} color="green" />)
const lock = (<MaterialIcon name="lock-outline" size={26} color="orange" />)
const close = (<MaterialIcon name="close" size={26} color="red" />)

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ManageProductItem extends Component {

  renderApproveButton() {
    if (this.props.product.approved) {
      return (
        <View>
          <TouchableWithoutFeedback onPress={() => this.rejectProductHelper()}>
            {lock}
          </TouchableWithoutFeedback>
        </View>
      )
    } else {
      return (
        <View>
          <TouchableWithoutFeedback onPress={() => this.approveProductHelper()}>
            {check}
          </TouchableWithoutFeedback>
        </View>
      )
    }
  }

  approveProductHelper() {
    Alert.alert('Message', 'Approve this product?', [
      {text: 'Ok', onPress: () => this.props.approveProduct(this.props.product.uid)},
      {text: 'Cancel', onPress: () => console.log('dont approve')}
    ])
  }

  rejectProductHelper() {
    Alert.alert('Message', 'Reject this product?', [
      {text: 'Ok', onPress: () => this.props.rejectProduct(this.props.product.uid)},
      {text: 'Cancel', onPress: () => console.log('dont reject')}
    ])
  }

  deleteProductHelper() {
    Alert.alert('Message', 'Delete this product?', [
      {text: 'Ok', onPress: () => this.props.deleteProduct(this.props.product.uid)},
      {text: 'Cancel', onPress: () => console.log('dont delete')}
    ])
  }

  render() {
    const { brand, name, size, price, imageURL, approved } = this.props.product;
    const { skeleton, centerEverything, container, imageContainer, contentContainer,  textContainer, buttonContainer, imageStyle, textStyle, boldText } = styles;
    return(
      <TouchableWithoutFeedback>
        <View style={[container]}>
          <View style={[imageContainer]}>
            <Image
              source={{uri: imageURL}}
              style={imageStyle} />
          </View>
          <View style={[contentContainer]}>
            <View style={[centerEverything, textContainer]}>
              <Text style={[textStyle, boldText]}>{brand}</Text>
              <Text style={[textStyle, boldText]}>{name}</Text>
              <Text style={[textStyle, boldText]}>{size}</Text>
              <Text style={textStyle}>RM {price}</Text>
            </View>
            <View style={[buttonContainer]}>
              {this.renderApproveButton()}
              <View>
                <TouchableWithoutFeedback onPress={() => this.deleteProductHelper()}>
                  {close}
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: deviceWidth*0.9,
    height: 200,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    margin: 5
  },
  imageContainer: {
    flex: 4
  },
  contentContainer: {
    flex: 6
  },
  textContainer: {
    flex: 7
  },
  buttonContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageStyle: {
    height: 200,
    width: null,
  },
  textStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  boldText: {
    fontWeight: '500'
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.admin
  };
};

export default connect(mapStateToProps, actions)(ManageProductItem);
