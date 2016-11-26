import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  ListView
} from 'react-native';

import ProductItem from './../../components/ProductItem';

class BrandItemList extends Component {

  componentWillMount() {
    const {uid, ...product} = this.props.product
    const newProduct = _.values(product);
    this.createDataSource(newProduct);
  }

  componentWillReceiveProps(nextProps) {
    const {uid, ...product} = this.props.product
    const newProduct = _.values(product);
    this.createDataSource(newProduct);
  }

  createDataSource(newProduct) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(newProduct);
  }

  renderRow(product) {
    return <ProductItem product={product} />;
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
    marginTop: 70,
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


export default BrandItemList;
