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

import LinearGradient from 'react-native-linear-gradient';
const gradient = {
  gradientStart: [0.3, 1],
  gradientEnd: [1, 0.8]
}

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Performance extends Component {

  state = { isRefreshing: false, leadingItem: '' }

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentDidMount() {
    this.findLeadingItem(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
    this.findLeadingItem(nextProps)
  }

  createDataSource({ sortRetailersPerformance }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(sortRetailersPerformance);
  }

  renderRow(item) {
    return <PerformanceItem item={item} />;
  }

  findLeadingItem(data) {
    this.setState({
      leadingItem: data.sortRetailersPerformance[0].brand
    })
  }

  render() {
    const { centerEverything, container, listContainer, listViewContainer, skeleton, textContainer,
    titleContainer, descContainer, titleBar, titleBarText, title, desc, basketStatusContainer, basketStatusText } = styles;
    return(
      <View style={[container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Performance</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>How do the retailers perform?</Text>
          </View>
        </View>
        <View style={[listContainer]}>
          <View style={[titleBar]}>
            <Text style={titleBarText}>Retailer</Text>
            <Text style={titleBarText}>Item Sold</Text>
          </View>
          <ListView
            contentContainerStyle={listViewContainer}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </View>
        <LinearGradient
          colors={['#f49542', '#ffd34f']}
          start={gradient.gradientStart}
          end={gradient.gradientEnd}
          style={basketStatusContainer}>
          <View>
            <Text style={basketStatusText}>{this.state.leadingItem} is the best seller!</Text>
          </View>
        </LinearGradient>
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
    marginBottom: 50
  },
  listViewContainer: {
    paddingTop: 20
  },
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  textContainer: {
    flex: 1
  },
  titleContainer: {
    width: deviceWidth*0.8,
  },
  descContainer: {
    width: deviceWidth*0.8,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleBarText: {
    fontSize: 16,
    fontWeight: '500'
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'center'
  },
  desc: {
    color: 'grey',
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center'
  },
  basketStatusContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: 50,
    // backgroundColor: '#221F1F',
    justifyContent: 'center'
  },
  basketStatusText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    paddingLeft: 10,
    fontWeight: '500'
  }
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

  const sortRetailersPerformance = _.orderBy(retailersPerformance, ['count'], ['desc'])

  return { sortRetailersPerformance, admin: state.admin };
}

export default connect(mapStateToProps, actions)(Performance);
