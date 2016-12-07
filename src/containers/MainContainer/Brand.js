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
const redeem = (<MaterialIcon name="redeem" size={33} color="white" />)

import ProductItem from './../../components/ProductItem';
import BrandItem from './../../components/BrandItem';

class Brand extends Component {

  state = { isRefreshing: false }

  componentWillMount() {
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
    return <BrandItem product={product} />;
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.props.pullProductData()
  }

  render() {
    const { centerEverything, container, listViewContainer } = styles;
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
      <ActionButton buttonColor="#1E90FF" offsetX={0} offsetY={0} icon={redeem}>
          <ActionButton.Item buttonColor='#FF69B4' title="View Purchased Item" onPress={() => Actions.purchasedItem()}>
            {purchased}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#7B68EE' title="My basket" onPress={() => Actions.basket()}>
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
  },
}

const mapStateToProps = (state) => {
  const payload = _.groupBy(state.api.productList, 'brand')

  const products = _.map(payload, (val, uid) => {
    return { ...val, uid };
  })

  return { products };
}

export default connect(mapStateToProps, actions)(Brand);
