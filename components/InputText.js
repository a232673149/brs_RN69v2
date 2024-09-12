import React from 'react';
import {Text, TextInput, View} from 'react-native';

import {action, observable} from 'mobx';
import {observer} from 'mobx-react';

@observer
class InputText extends React.Component {
  @observable text;

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{padding: 10, fontSize: 18}}>{this.props.title}</Text>
        </View>
        <View
          removeClippedSubviews={true}
          style={{flex: 2, justifyContent: 'center'}}>
          <TextInput
            contextMenuHidden={true}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            placeholder={this.props.placeholder}
            defaultValue={this.props.defaultValue}
            onChangeText={text => (this.text = text)}
            value={this.text}
          />
        </View>
      </View>
    );
  }
}
