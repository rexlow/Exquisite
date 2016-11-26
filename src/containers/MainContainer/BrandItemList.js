import React, { Component } from 'react';
import {
  View,
  Text,
  ListView
} from 'react-native';

class BrandItemList extends Component {

  componentWillMount() {
    this.createDataSource(this.props);
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

  render() {
    console.log(this.props);
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

export default BrandItemList;
