import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {observer} from 'mobx-react';
import {brsStore} from '../storage/brsStore';

@observer
class BusyCursor extends React.Component {
  render() {
    if (!brsStore.displayBusyCursor) {
      return null;
    }

    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 250,
            height: 250,
            borderRadius: 12,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}>
          <ActivityIndicator animating size="large" />
          <Text
            style={{
              fontSize: 26,
              marginTop: 32,
              color: 'white',
              textAlign: 'center',
            }}>
            {brsStore.busyCursorText}
          </Text>
        </View>
      </View>
    );
  }
}

export default BusyCursor;
