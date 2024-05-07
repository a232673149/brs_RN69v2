import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {observer} from 'mobx-react';
import RNPickerSelect from 'react-native-picker-select';
@observer
class PickerSelect extends React.Component {
  render() {
    const {model} = this;
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {this.props.title != '' && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={this.props.titleStyle}>{this.props.title}</Text>
          </View>
        )}

        <View style={{flex: 3.2, justifyContent: 'center'}}>
          <RNPickerSelect
            placeholder={{
              label: this.props.placeholderLabel,
              value: this.props.placeholderValue,
            }}
            items={this.props.pickerSelectItems}
            onValueChange={this.props.onValueChange}
            value={this.props.value}
            useNativeAndroidPickerStyle={this.props.useNativeAndroidPickerStyle}
            disabled={this.props.disabled}
            style={{
              ...pickerSelectStyles,
              placeholder: {
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
          />
        </View>
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 24,
    paddingHorizontal: 6,
    paddingVertical: 0,
    borderWidth: 0,
    borderColor: 'purple',
    borderRadius: 0,
    color: 'black',
    paddingRight: 20, 
  },
});

export default PickerSelect;
