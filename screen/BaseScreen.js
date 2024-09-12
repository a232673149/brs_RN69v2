import React from 'react';
import BrsHeader from '../components/BrsHeader';

export default class BaseScreen extends React.Component {
  renderHeader() {
    return <BrsHeader title={this.title} navigation={this.props.navigation} />;
  }
}
