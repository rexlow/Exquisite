import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  ListView,
  RefreshControl,
  Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import ProductItem from './../../components/ProductItem';

class Basket extends Component {
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

  createDataSource({ purchasedItem }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(purchasedItem);
  }

  renderRow(product) {
    return <ProductItem product={product} />;
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.props.pullProductData()
  }

  render(){
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
  let unFilteredItem = state.profile.userGroup.purchasedItem
  let availableItem = state.api.productList

  var purchasedItem = []

  Object.keys(availableItem).forEach(
    (key) => unFilteredItem[key] && (purchasedItem.push({ ...availableItem[key] }))
  )

  return { purchasedItem }
}

export default connect(mapStateToProps, actions)(Basket);
