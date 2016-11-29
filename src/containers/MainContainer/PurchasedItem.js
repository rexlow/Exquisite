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

import ProductItem from './../../components/ProductItem';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class PurchasedItem extends Component {

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

  render() {
    const { skeleton, centerEverything, container, textContainer, contentContainer, titleContainer, descContainer, title, desc, listViewContainer } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Pocket</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>All your purchased item</Text>
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
      </View>
    )
  }
}

const styles = {
  skeleton: {
    borderWidth: 1,
    borderColor: 'blue'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    // marginTop: 110,
  },
  textContainer: {
    flex: 2,
    // height: 80,
    marginTop: 40
  },
  contentContainer: {
    flex: 8
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
  listViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
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

export default connect(mapStateToProps, actions)(PurchasedItem);
