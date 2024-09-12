import React from 'react';
import {Button, View} from 'react-native';

export default class SubmitButton extends React.Component {
  render() {
    return (
      <View style={this.props.SubmitButtonStyle}>
        <Button
          onPress={this.props.callback}
          disabled={this.props.disable}
          title={this.props.title}
        />
      </View>
    );
  }
}


