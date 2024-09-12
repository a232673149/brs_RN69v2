import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ManageAccountScreen from '../screen/ManageAccountScreen';
// import SearchScreen from '../screen/SearchScreen';
// import ManageSystemScreen from '../screen/ManageSystemScreen';
// import ManageDeviceScreen from '../screen/ManageDeviceScreen';
import {observer} from 'mobx-react';
const TopTab = createMaterialTopTabNavigator();
@observer
class BrsTopTab extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <TopTab.Navigator>
        <TopTab.Screen name="系統管理" component={ManageSystemScreen} />
        <TopTab.Screen name="設備管理" component={ManageDeviceScreen} />
        <TopTab.Screen name="帳號管理" component={ManageAccountScreen} />
        {false && <TopTab.Screen name="紀錄管理" component={SearchScreen} />}
      </TopTab.Navigator>
    );
  }
}

export default BrsTopTab;
