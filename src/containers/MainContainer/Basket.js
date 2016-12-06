import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  View,
  ListView,
  RefreshControl,
  Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import ActionButton from 'react-native-action-button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const creditCard = (<MaterialIcon name="credit-card" size={33} color="white" />)

import BasketItem from './../../components/BasketItem';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Basket extends Component {
  state = { isRefreshing: false, totalItem: 0, totalPrice: 0 }

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentDidMount() {
    if (this.props.basketItem) {
      this.calculatePrice()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);

    if (nextProps) {
      this.setState({ isRefreshing: false })

    }
    if(nextProps.api) {
      this.removeFromBasketCallback(nextProps.api)
      this.props.getUserGroup() //update basket view
      this.calculatePrice()
    }
  }

  removeFromBasketCallback(props) {
    if (props.message) {
      Alert.alert(
        'Message',
        props.message
      )
      this.props.resetPurchaseMessage()

    }
  }

  createDataSource({ basketItem }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(basketItem);
  }

  renderRow(product) {
    return <BasketItem product={product} />;
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.props.pullProductData()
  }

  checkOutHelper(props) {
    Alert.alert(
      'Check out',
      `Buy ${this.state.totalItem} items with total price of RM ${this.state.totalPrice}?`,
      [
        {text: 'Yes', onPress: () => {
          if (this.props.profile.userGroup.credit >= this.state.totalPrice) {
            console.log(this.props.basketItem);
          } else {
            Alert.alert(
              'Oops', 'Insufficient credit. Please reload and try again'
            )
          }
        }},
        {text: 'Cancel', onPress: () => console.log('buy item cancel')}
      ]
    )
  }

  calculatePrice() {
    console.log('calculating....');
    let basketItem = this.props.basketItem
    var totalPrice = 0
    for (var i = 0; i < basketItem.length; i++) {
      totalPrice += basketItem[i].price
    }
    var roundedPrice = _.round(totalPrice, 2)
    this.setState({ totalItem: basketItem.length, totalPrice: roundedPrice })
  }

  render(){
    const { centerEverything, container, listViewContainer, skeleton, textContainer, contentContainer,
      titleContainer, descContainer, title, desc, basketStatusContainer, basketStatusText } = styles;

    return(
      <View style={[centerEverything, container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Basket</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>Place your item here before checking out</Text>
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
        <View style={basketStatusContainer}>
          <Text style={basketStatusText}>{this.state.totalItem} items in the basket</Text>
          <Text style={basketStatusText}>RM {this.state.totalPrice}</Text>
        </View>
        <ActionButton
          buttonColor="rgb(101, 14, 249)"
          offsetX={0}
          offsetY={0}
          icon={creditCard}
          onPress={this.checkOutHelper.bind(this)}/>
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
    flex: 1,
    marginTop: 50,
  },
  listViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  textContainer: {
    flex: 2,
  },
  contentContainer: {
    flex: 8,
    marginBottom: 50
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
  basketStatusContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: 50,
    backgroundColor: '#221F1F',
    justifyContent: 'center'
  },
  basketStatusText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    paddingLeft: 10,
    fontWeight: '500'
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  var basketItem = []
  const availableItem = state.api.productList
  const unfilteredBasketItem = state.profile.userGroup.basketList

  const mapItem = _.mapValues(availableItem, (val, uid) => {
    return { ...val, uid }
  })

  if (unfilteredBasketItem) {
    Object.keys(unfilteredBasketItem).forEach(
      (key) => unfilteredBasketItem[key] && (basketItem.push({ ...mapItem[key] }))
    )
  }

  return { basketItem, profile: state.profile, api: state.api }
}

export default connect(mapStateToProps, actions)(Basket);
