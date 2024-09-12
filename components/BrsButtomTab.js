import React from 'react';
import {Image, StyleSheet} from 'react-native';
import posize from '../screen/posize.v11';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import DataScreen from '../screen/DataScreen';
import LoadScreen from '../screen/LoadScreen';
// import Unload_BoxBagUnloadForm from '../screen/Unload_BoxBagUnloadForm';
// import SearchScreen from '../screen/SearchScreen';
import {brsStore} from '../storage/brsStore';
import {observer} from 'mobx-react';

// import {unloadBoxBagUnloadModel} from '../model/Unload_BoxBagUnloadModel';r
const PxImage = posize(Image);
const Tab = createBottomTabNavigator();
@observer
class BrsButtomTab extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <Tab.Navigator
        initialRouteName="DataScreen"
        activeColor="#ff6600"
        tabBarOptions={{
          activeTintColor: '#ff6600',
          inactiveTintColor: '#323232',
          labelStyle: {fontSize: 22},
          tabStyle: {width: 100},
          style: {backgroundColor: '#e2e2e2', height: 60},
          navigationOptions: {
            tabBarVisible: false,
          },
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            brsStore.brsButtomTabChange = !brsStore.brsButtomTabChange;
            if (route.name === '資料') {
              iconName = focused
                ? require('../assets/761b1fed5625535cc46367b00ce52254.png')
                : require('../assets/4579f49f79f490bdafd7c69dbb9887d6.png');
            } else if (route.name === '裝載') {
              iconName = focused
                ? require('../assets/287785d3ed39099be7969c05f1ea011a.png')
                : require('../assets/c308783a0e44b0fda1ca0193a94ad6af.png');
            } else if (route.name === '卸載') {
              brsStore.keyboardModal.close();
              brsStore.keyboardOpen = false;
              unloadBoxBagUnloadModel.bagNo = '';
              unloadBoxBagUnloadModel.showBagNo = '';
              unloadBoxBagUnloadModel.done_load = false;
              iconName = focused
                ? require('../assets/067d26e94359dbd62cbacad7aff46c83.png')
                : require('../assets/453ea9c7d087e34296f52af46ce1d498.png');
            } else if (route.name === '查詢') {
              iconName = focused
                ? require('../assets/73a2c122966c6bdcf2d6a11ef96590b6.png')
                : require('../assets/4ed34d9ee471eceaebb3437e9a1e0804.png');
            }

            
            return (
              <PxImage source={iconName} layout={layouts.imgBrsButtomTab} />
            );
          },
        })}>
        {brsStore.dataTab == true && (
          <Tab.Screen name="資料" component={DataScreen} />
        )}

        {brsStore.loadTab == true && (
          <Tab.Screen name="裝載" component={LoadScreen} />
        )}
        {brsStore.unloadTab == true && (
          <Tab.Screen name="卸載" component={Unload_BoxBagUnloadForm} />
        )}
        {brsStore.searchTab == true && (
          <Tab.Screen name="查詢" component={SearchScreen} />
        )}
      </Tab.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  imgBrsButtomTabOuter: {flexGrow: 0, flexShrink: 0, flexBasis: 20},
  imgBrsButtomTabBody: {width: '100%', height: '100%', resizeMode: 'contain'},
});

const layouts = {
  imgBrsButtomTab: {
    xy: [['2fr', '29px', '5fr'], ['24px']],
    outerStyle: styles.imgBrsButtomTabOuter,
    style: styles.imgBrsButtomTabBody,
  },
};

export default BrsButtomTab;
