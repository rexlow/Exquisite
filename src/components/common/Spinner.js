import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size, color }) => {
  return(
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} color={color || 'grey'}/>
    </View>
  )
};

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
}

export { Spinner };
