import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  ListView
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from './../../actions';

import ManageProductItem from './../../components/ManageProductItem';
import PerformanceItem from './../../components/PerformanceItem';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Performance extends Component {

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

  createDataSource({ retailersPerformance }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(retailersPerformance);
  }

  renderRow(item) {
    return <PerformanceItem item={item} />;
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.props.pullProductData()
  }

  render() {
    const { centerEverything, container, listContainer, listViewContainer, skeleton, textContainer,
    descContainer, desc } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={descContainer}>
            <Text style={[desc]}>How do the retailers perform?</Text>
          </View>
        </View>
        <View style={[listContainer]}>
          <ListView
            contentContainerStyle={listViewContainer}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </View>
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
  listContainer: {
    flex: 9,
    padding: 12,
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
    flex: 1
  },
  descContainer: {
    width: deviceWidth*0.8,
  },
  desc: {
    color: 'grey',
    fontSize: 20,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'center'
  },
}

const mapStateToProps = (state) => {
  var newList = []
  var existedBrand = []
  var retailersPerformance = []
  let productList = state.api.productList

  //convert object of objects to array of objects
  const newitem = _.map(productList, (val, productID) => {
    return { ...val, productID }
  })

  //create new array of objects that only contains brand and count
  for (var i = 0; i < newitem.length; i++) {
    if (newitem[i].purchasedUser) {
      newList.push({
        brand: newitem[i].brand,
        count: _.size(newitem[i].purchasedUser)
      })
    }
  }

  for (var i = 0; i < newList.length; i++) {
    if (!_.includes(existedBrand, newList[i].brand)) {
      existedBrand.push(newList[i].brand);
      for (var j = i+1; j < newList.length; j++) {
        if (newList[i].brand === newList[j].brand) {
          newList[i].count = newList[i].count + newList[j].count
        }
      }
      retailersPerformance.push(newList[i]) //append to this array if its new
    }
  }

  const products = _.map(state.api.productList, (val, uid) => {
    return {...val, uid};
  })

  return { retailersPerformance, admin: state.admin };
}

export default connect(mapStateToProps, actions)(Performance);
