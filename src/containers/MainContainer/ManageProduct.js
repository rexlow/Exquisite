import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  ListView,
  RefreshControl
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from './../../actions';

import ManageProductItem from './../../components/ManageProductItem';

class ManageProduct extends Component {

  state = { isRefreshing: false }

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.admin.adminMessage !== null) {
      Alert.alert('Successful', nextProps.admin.adminMessage)
      this.createDataSource(this.props)
      this.props.resetApproveMessage();
    }
  }

  createDataSource({ products }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(products);
  }

  renderRow(product) {
    return <ManageProductItem product={product} />;
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
    marginTop: 80,
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
  const products = _.map(state.api.productList, (val, uid) => {
    return {...val, uid};
  })
  return { products: products, admin: state.admin };
}

export default connect(mapStateToProps, actions)(ManageProduct);
