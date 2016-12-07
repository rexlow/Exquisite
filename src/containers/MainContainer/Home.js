import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  RefreshControl,
  TouchableWithoutFeedback
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import ActionButton from 'react-native-action-button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const purchased = (<MaterialIcon name="filter-vintage" size={33} color="white" />)
const basket = (<MaterialIcon name="shopping-basket" size={33} color="white" />)

import { Spinner } from './../../components/common';
import ProductItem from './../../components/ProductItem';

class Home extends Component {

  state = { isRefreshing: false, userType: 'normalUser' }

  componentWillMount() {
    this.props.getUserGroup();
    this.props.pullProductData();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    if (nextProps) {
      this.setState({ isRefreshing: false })
    }
  }

  createDataSource({ products }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(products);
  }

  renderRow(product) {
    return <ProductItem product={product} />;
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.props.pullProductData()
  }

  render() {
    const { centerEverything, container, listViewContainer, skeleton } = styles;
    return(
      <View style={[centerEverything, container]}>
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
        <ActionButton buttonColor="#e74c3c" offsetX={0} offsetY={0}>
          <ActionButton.Item buttonColor='#f442cb' title="View Purchased Item" onPress={() => Actions.purchasedItem()}>
            {purchased}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="My basket" onPress={() => Actions.basket()}>
            {basket}
          </ActionButton.Item>
        </ActionButton>
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
    marginTop: 110,
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
}

const mapStateToProps = (state) => {
  console.log(state);
  const filteredProducts = _.pickBy(state.api.productList, {'approved': true})

  const products = _.map(filteredProducts, (val, uid) => {
    return {...val, uid};
  })

  return { products };
}

export default connect(mapStateToProps, actions)(Home);
